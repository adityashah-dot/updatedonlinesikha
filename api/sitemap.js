// Vercel function behind /sitemap.xml (see vercel.json rewrites).
import { buildSitemapXml, originOf } from '../src/server/seoRoutes.js';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(buildSitemapXml(originOf(req)));
}
