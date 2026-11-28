// Shared chat request handling for the Express server (server.js) and the
// Vercel serverless function (api/chat.js), so both behave identically.
import { GoogleGenAI } from '@google/genai';
import { answerChat } from '../services/chatbotDataset.mjs';

let aiClient = null;
const getAi = () => {
  if (!aiClient) aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  return aiClient;
};

/**
 * Validates a chat request body and returns { status, body } for the response.
 * Never throws; upstream failures become a 502 with a friendly message.
 */
export async function handleChatRequest(payload) {
  try {
    const { messages, modelChoice = 'gemini-3.5-flash' } = payload || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return { status: 400, body: { error: 'Messages array is required.' } };
    }
    if (messages.length > 16) {
      return { status: 400, body: { error: 'Conversation is too long. Please reset the chat.' } };
    }
    const normalized = messages.map((m) => ({
      role: m?.role === 'model' || m?.role === 'assistant' ? 'model' : 'user',
      text: String(m?.text || '').slice(0, 1200).trim(),
    }));
    if (normalized.some((m) => !m.text)) {
      return { status: 400, body: { error: 'Invalid message payload.' } };
    }

    const result = await answerChat({ messages: normalized, modelChoice, aiFactory: getAi });

    return {
      status: 200,
      body: {
        text: result.text,
        suggestions: result.suggestions,
        sources: result.sources,
        model: process.env.GEMINI_API_KEY ? modelChoice : 'grounded-dataset',
      },
    };
  } catch (err) {
    console.error('Error generating chat response:', err);
    return { status: 502, body: { error: 'The advisor is temporarily unavailable. Please try again shortly.' } };
  }
}
