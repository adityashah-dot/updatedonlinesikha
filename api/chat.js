// Vercel serverless function for POST /api/chat (same logic as server.js).
import { handleChatRequest } from '../src/server/chatHandler.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ error: 'Malformed request body.' });
    }
  }
  const { status, body } = await handleChatRequest(payload);
  return res.status(status).json(body);
}
