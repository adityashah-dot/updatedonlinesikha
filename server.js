import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { syncDataset, datasetStatusOf } from './src/services/chatbotDataset.mjs';
import { injectMetaHtml, buildBlogListing, buildBlogDetail, buildBlogSitemap } from './src/server/blogSsr.js';
import { registerSeoRoutes } from './src/server/seoRoutes.js';
import { handleChatRequest } from './src/server/chatHandler.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    const { status, body } = await handleChatRequest(req.body);
    res.status(status).json(body);
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

  // In development, let Vite serve the default transformed HTML (no meta injection) so HMR works.
  registerSeoRoutes(app);

  app.get('/sitemap-blog.xml', async (req, res) => {
    try {
      const origin = `${req.protocol}://${req.get('host')}`;
      const xml = await buildBlogSitemap(origin);
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.send(xml);
    } catch (err) {
      console.error('sitemap-blog.xml failed:', err?.message);
      res.status(500).type('text/plain').send('sitemap unavailable');
    }
  });

  app.get('/blog', async (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') return next();
    try {
      const origin = `${req.protocol}://${req.get('host')}`;
      const html = await buildBlogListing(origin);
      if (html) return res.status(200).type('html').send(html);
      next();
    } catch (err) {
      console.error('blog listing meta injection failed:', err?.message);
      next();
    }
  });

  app.get(/^\/blog\/([^/]+)$/, async (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') return next();
    try {
      const origin = `${req.protocol}://${req.get('host')}`;
      const slug = decodeURIComponent(req.params[0]);
      const html = await buildBlogDetail(origin, slug);
      if (html) return res.status(200).type('html').send(html);
      next();
    } catch (err) {
      console.error('blog detail meta injection failed:', err?.message);
      next();
    }
  });

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
