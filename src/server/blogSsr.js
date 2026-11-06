import path from "node:path";
import { readFileSync } from "node:fs";

const CMS = "https://api.degreefyd.com/api/b2c";
const BRAND_FROM = ["DegreeFYD", "DegreeFyd"];
const brandize = (s) => { if (!s) return s; let out = String(s); for (const f of BRAND_FROM) out = out.split(f).join("OnlineSiksha"); return out; };

// ---- tiny TTL cache ----
const ttlMs = 5 * 60 * 1000;
const cache = new Map();
function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.at < ttlMs) return entry.value;
  cache.delete(key);
  return undefined;
}
function setCached(key, value) {
  cache.set(key, { value, at: Date.now() });
}

// ---- fetch helpers (anonymous, public endpoints only) ----
async function cmsGet(pathname, opts = {}) {
  const url = CMS + pathname;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" }, signal: controller.signal, ...opts });
    if (!res.ok) return { ok: false, status: res.status };
    return { ok: true, status: res.status, json: await res.json() };
  } finally {
    clearTimeout(t);
  }
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const esc = (s) => String(s || "")
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

export function injectMetaHtml(template, { title, description, canonical, imageAlt, imageUrl, ogType = "article", robots = "noindex, nofollow", jsonLd }) {
  let html = template;
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  let inserts = "";

  function setMeta(attr, key, value) {
    if (value == null) {
      html = html.replace(new RegExp(`<meta[^>]*${attr}="${esc(key)}"[^>]*>`, "i"), "");
      return;
    }
    const tag = `<meta ${attr}="${esc(key)}" content="${esc(value)}" />`;
    const re = new RegExp(`<meta[^>]*${attr}="${esc(key)}"[^>]*>`, "i");
    if (re.test(html)) {
      html = html.replace(re, tag);
    } else {
      inserts += "\n    " + tag;
    }
  }

  setMeta("name", "description", description);
  setMeta("name", "keywords", null);
  setMeta("name", "robots", robots);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:url", canonical);
  setMeta("property", "og:image", imageUrl);
  setMeta("property", "og:image:alt", imageAlt);
  setMeta("property", "og:site_name", "OnlineSiksha");
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", imageUrl);

  html = html.replace(/<link[^>]*rel=["']canonical["'][^>]*>/i, "");
  html = html.replace(/<script[^>]*id="onlinesiksha-blog-jsonld"[^>]*>[\s\S]*?<\/script>/i, "");
  const canonicalTag = `\n    <link rel="canonical" href="${esc(canonical)}" />`;
  const ldScript = jsonLd ? `\n    <script id="onlinesiksha-blog-jsonld" type="application/ld+json">${jsonLd}</script>` : "";
  html = html.replace(/<\/head>/i, inserts + canonicalTag + ldScript + "\n  </head>");
  return html;
}

function replaceMeta(html, attr, key, value) {
  const attrRegex = new RegExp(`<meta[^>]*${attr}="${esc(key)}"[^>]*>`, "i");
  if (value == null) return html.replace(attrRegex, "");
  return html.replace(attrRegex, `<meta ${attr}="${esc(key)}" content="${esc(value)}" />`);
}

export async function buildBlogListing(origin) {
  const html = readIndexHtml();
  if (!html) return null;
  const title = "Higher Education Blogs & Online Degree Guides | OnlineSiksha";
  const description = "Browse 400+ verified guides on online degrees, UGC-DEB rules, fees, scholarships and admissions. Updated regularly.";
  const canonical = origin + "/blog";
  return injectMetaHtml(html, { title, description, canonical, ogType: "website", robots: "index, follow" });
}

export async function buildBlogDetail(origin, slug) {
  const cacheKey = "detail:" + slug;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await cmsGet(`/blogs/get/${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  const blog = res.json?.data?.blog;
  if (!blog || (blog.status || "").toLowerCase() !== "approved") return null;

  const meta = blog.seo?.meta || {};
  const og = blog.seo?.og || {};
  const twitter = blog.seo?.twitter || {};
  const title = brandize(meta.metaTitle || `${blog.title} | OnlineSiksha`);
  const description = brandize(meta.metaDescription || blog.excerpt || stripHtml(blog.introduction).slice(0, 160) || blog.title);
  const canonical = `${origin}/blog/${blog.urlSlug || slug}`;
  const imageUrl = (blog.mainimage && (blog.mainimage.image?.url || blog.mainimage.image)) || null;
  const imageAlt = (blog.mainimage && blog.mainimage.alt) || null;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: brandize(blog.title),
        description,
        image: imageUrl ? [imageUrl] : undefined,
        datePublished: blog.publishDate || blog.createdAt,
        dateModified: blog.modifiedDate || blog.updatedAt || undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        publisher: { "@type": "Organization", name: "OnlineSiksha" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Blogs", item: `${origin}/blog` },
          { "@type": "ListItem", position: 3, name: brandize(blog.title), item: canonical },
        ],
      },
    ],
  };
  if (Array.isArray(blog.faqs) && blog.faqs.length) {
    ld["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": blog.faqs.slice(0, 10).map(f => ({
        "@type": "Question",
        name: brandize(stripHtml(f.question || f.q || "")),
        acceptedAnswer: { "@type": "Answer", text: brandize(stripHtml(f.answer || f.a || "")) },
      })),
    });
  }

  const html = injectMetaHtml(readIndexHtml(), {
    title,
    description,
    canonical,
    imageAlt,
    imageUrl,
    ogType: "article",
    robots: "noindex, nofollow",
    jsonLd: JSON.stringify(ld),
  });
  setCached(cacheKey, html);
  return html;
}

export async function buildBlogSitemap(origin) {
  const cacheKey = "sitemap";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const slugs = new Map();
  for (let page = 1; page <= 80; page += 1) {
    const res = await cmsGet(`/blogs/get?page=${page}&limit=100`);
    if (!res.ok) break;
    const articles = res.json?.data?.articles || [];
    if (articles.length === 0) break;
    for (const a of articles) {
      const slug = a.urlSlug || a.slug;
      if (slug) slugs.set(slug, a.modifiedDate || a.createdAt || "");
    }
    if (articles.length < 100) break;
  }

  const entries = Array.from(slugs.entries());
  const urls = entries
    .map(([slug, modified]) => {
      const lastmod = modified ? String(modified).slice(0, 10) : "";
      return `<url><loc>${esc(`${origin}/blog/${slug}`)}</loc>${lastmod ? `<lastmod>${esc(lastmod)}</lastmod>` : ""}<changefreq>weekly</changefreq><priority>0.6</priority></url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>${esc(origin + "/blog")}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>\n${urls}\n</urlset>`;
  setCached(cacheKey, xml);
  return xml;
}

function readIndexHtml() {
  const isProd = process.env.NODE_ENV === "production";
  const candidates = isProd ? ["dist/index.html"] : ["index.html"];
  for (const rel of candidates) {
    try { return readFileSync(path.resolve(process.cwd(), rel), "utf8"); } catch {}
  }
  return null;
}
