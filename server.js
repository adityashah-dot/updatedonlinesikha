import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { answerChat, syncDataset, datasetStatusOf } from './src/services/chatbotDataset.mjs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Server-side initialization of Gemini SDK
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/* Simple fixed-window rate limiter for the chat API. */
const RATE_LIMIT_MAX = Number(process.env.CHAT_RATE_LIMIT || 30); // requests / minute / IP
const rateBuckets = new Map();

function rateLimitChat(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const minute = Math.floor(Date.now() / 60_000);
  const bucket = rateBuckets.get(ip);

  if (!bucket || bucket.minute !== minute) {
    rateBuckets.set(ip, { minute, count: 1 });
    if (rateBuckets.size > 10_000) rateBuckets.clear();
    return next();
  }

  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }
  return next();
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '64kb' }));
  app.use((err, req, res, next) => {
    if (err?.type === 'entity.parse.failed' || err?.type === 'entity.too.large') {
      return res.status(400).json({ error: 'Malformed request body.' });
    }
    next(err);
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Server-side Chat API: retrieval-grounded over the synchronized dataset,
  // with Gemini generation when GEMINI_API_KEY is configured.
  app.post('/api/chat', rateLimitChat, async (req, res) => {
    try {
      const { messages, modelChoice = 'gemini-3.5-flash' } = req.body || {};

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }
      if (messages.length > 16) {
        return res.status(400).json({ error: 'Conversation is too long. Please reset the chat.' });
      }
      const normalized = messages.map((m) => {
        const role = m.role === 'model' || m.role === 'assistant' ? 'model' : 'user';
        const text = String(m.text || '').slice(0, 1200).trim();
        return { role, text };
      });
      if (normalized.some((m) => !m.text)) {
        return res.status(400).json({ error: 'Invalid message payload.' });
      }

      const result = await answerChat({
        messages: normalized,
        modelChoice,
        aiFactory: () => ai,
      });

      return res.json({
        text: result.text,
        suggestions: result.suggestions,
        sources: result.sources,
        model: process.env.GEMINI_API_KEY ? modelChoice : 'grounded-dataset',
      });
    } catch (err) {
      console.error('Error generating chat response:', err);
      return res.status(502).json({
        error: 'The advisor is temporarily unavailable. Please try again shortly.',
      });
    }
  });

  // Dataset status (sync freshness, counts). No secrets exposed.
  app.get('/api/chatbot/status', (req, res) => {
    try {
      res.json(datasetStatusOf());
    } catch (error) {
      res.status(500).json({ error: 'Status unavailable.' });
    }
  });

  // Protected manual sync. Requires x-admin-token === ADMIN_SYNC_TOKEN.
  app.post('/api/chatbot/sync', (req, res) => {
    const expectedToken = process.env.ADMIN_SYNC_TOKEN || '';
    const providedToken = req.get('x-admin-token') || '';

    if (!expectedToken || providedToken !== expectedToken) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    const detailLimit = Math.max(0, parseInt(req.body?.detailLimit ?? '0', 10) || 0);
    syncDataset({ detailLimit })
      .then((result) => res.json(result))
      .catch((error) => {
        console.error('Manual chatbot sync failed:', error);
        res.status(500).json({ error: 'Sync failed. Retained previous dataset.' });
      });
  });

  // Optional scheduled synchronization (env-gated: CHATBOT_SYNC_INTERVAL_HOURS > 0).
  const syncIntervalHours = Number(process.env.CHATBOT_SYNC_INTERVAL_HOURS || 0);
  if (syncIntervalHours > 0) {
    const intervalMs = syncIntervalHours * 60 * 60 * 1000;
    setInterval(() => {
      syncDataset({ detailLimit: 25 }).catch((error) =>
        console.error('Scheduled chatbot sync failed:', error.message)
      );
    }, intervalMs);
    console.log(`Chatbot dataset sync scheduled every ${syncIntervalHours}h`);
  }

  // Vite development middleware or static production serve
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware attached successfully');
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    const addr = server.address();
    console.log(`Online Siksha server listening on http://0.0.0.0:${PORT}`);
    console.log('Server address:', JSON.stringify(addr));
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
}

startServer();
