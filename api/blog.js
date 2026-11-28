// Vercel function behind /blog and /blog/:slug: serves the SPA shell with per-article
// title, description, Open Graph tags and JSON-LD injected for crawlers and link previews.
import { buildBlogListing, buildBlogDetail } from '../src/server/blogSsr.js';
import { originOf } from '../src/server/seoRoutes.js';

async function spaShell(origin) {
  const response = await fetch(`${origin}/index.html`);
  return response.ok ? response.text() : null;
}

export default async function handler(req, res) {
  const origin = originOf(req);
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : '';
  let html = null;
  try {
    html = slug ? await buildBlogDetail(origin, slug) : await buildBlogListing(origin);
  } catch (err) {
    console.error('blog meta injection failed:', err?.message);
  }
  // Unknown slug or template unavailable: fall back to the plain SPA shell (the app shows its own state).
  if (!html) html = await spaShell(origin);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
  res.status(html ? 200 : 502).send(html || 'Temporarily unavailable');
}
