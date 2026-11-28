// robots.txt and sitemap.xml for the main (non-blog) pages.
// Blog URLs are listed separately in /sitemap-blog.xml (see blogSsr.js).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STATIC_PATHS = [
  '/',
  '/universities',
  '/explore-programs',
  '/compare',
  '/courses',
  '/blog',
  '/exams',
  '/news',
];

// University ids are read from the data files so new universities are picked up automatically.
function universityPaths() {
  const dir = path.join(__dirname, '..', 'data', 'universities');
  const files = ['lpu', 'amity', 'cu', 'manipal', 'jain', 'upes'];
  return files
    .map((name) => {
      try {
        const src = fs.readFileSync(path.join(dir, `${name}.js`), 'utf8');
        const match = src.match(/\bid:\s*"([a-z0-9-]+)"/);
        return match ? `/universities/${match[1]}` : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/** Origin of the incoming request, honouring proxy headers (Vercel, load balancers). */
export function originOf(req) {
  const header = (name) => (typeof req.get === 'function' ? req.get(name) : req.headers?.[name]);
  const proto = String(header('x-forwarded-proto') || req.protocol || 'https').split(',')[0].trim();
  const host = header('x-forwarded-host') || header('host');
  return `${proto}://${host}`;
}

export function buildRobotsTxt(origin) {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    `Sitemap: ${origin}/sitemap-blog.xml`,
    '',
  ].join('\n');
}

export function buildSitemapXml(origin) {
  const urls = [...STATIC_PATHS, ...universityPaths()]
    .map((p) => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function registerSeoRoutes(app) {
  app.get('/robots.txt', (req, res) => res.type('text/plain').send(buildRobotsTxt(originOf(req))));
  app.get('/sitemap.xml', (req, res) => res.type('application/xml; charset=utf-8').send(buildSitemapXml(originOf(req))));
}
