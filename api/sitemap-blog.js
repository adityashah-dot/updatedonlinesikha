// Vercel function behind /sitemap-blog.xml (see vercel.json rewrites).
import { buildBlogSitemap } from '../src/server/blogSsr.js';
import { originOf } from '../src/server/seoRoutes.js';

export default async function handler(req, res) {
  try {
    const xml = await buildBlogSitemap(originOf(req));
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap-blog.xml failed:', err?.message);
    res.status(500).setHeader('Content-Type', 'text/plain').send('sitemap unavailable');
  }
}
