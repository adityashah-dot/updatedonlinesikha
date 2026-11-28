// Vercel function behind /robots.txt (see vercel.json rewrites).
import { buildRobotsTxt, originOf } from '../src/server/seoRoutes.js';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(buildRobotsTxt(originOf(req)));
}
