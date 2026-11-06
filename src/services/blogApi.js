/**
 * Blog CMS service — detail page.
 *
 * Source of truth: DegreeFYD CMS (live API).
 * Never silently falls back to invented/local article data.
 * If the CMS cannot be reached or the article is unavailable,
 * the caller receives a typed error and renders an error state.
 *
 * Publication-ready endpoint (verified 2026-11):
 *   GET https://api.degreefyd.com/api/b2c/blogs/get/{slug}
 * The endpoint is public (no auth); no token is attached to browser requests.
 */

const DEFAULT_DETAIL_PREFIX = "https://api.degreefyd.com/api/b2c/blogs/get";

function detailUrl(slug) {
  const single = import.meta.env?.VITE_BLOG_SINGLE_URL;
  if (single) return single;
  const base = (import.meta.env?.VITE_BLOG_DETAIL_API_URL || DEFAULT_DETAIL_PREFIX).replace(/\/+$/, "");
  return `${base}/${encodeURIComponent(slug)}`;
}

function buildHeaders() {
  return { Accept: "application/json" };
}

export class BlogNotFoundError extends Error {
  constructor(message, code = "NOT_FOUND") {
    super(message);
    this.name = "BlogNotFoundError";
    this.code = code;
  }
}

export class BlogServiceError extends Error {
  constructor(message, code = "SERVICE_ERROR", status) {
    super(message);
    this.name = "BlogServiceError";
    this.code = code;
    this.status = status;
  }
}

const TIMEOUT_MS = 10000;

export async function getBlogBySlug(slug) {
  const clean = String(slug || "").trim().toLowerCase();
  if (!clean) throw new BlogNotFoundError("Missing slug", "MISSING_SLUG");

  const url = detailUrl(clean);
  let res;
  try {
    res = await fetch(url, { headers: buildHeaders(), signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (e) {
    throw new BlogServiceError("Could not reach the article service", "NETWORK");
  }

  if (res.status === 404) throw new BlogNotFoundError(`No article found for ${clean}`, "NOT_FOUND");
  if (!res.ok) throw new BlogServiceError(`Article service responded with ${res.status}`, "HTTP_ERROR", res.status);

  let json;
  try { json = await res.json(); } catch { throw new BlogServiceError("Article service returned an invalid response", "BAD_JSON"); }

  const blog = extractBlog(json);
  if (!blog) throw new BlogNotFoundError("Article payload was empty", "EMPTY");

  const status = String(blog.status || blog.state || blog.approvalStatus || "").toLowerCase();
  if (status && status !== "approved" && status !== "published" && status !== "live") {
    const err = new BlogNotFoundError("Article is not approved", "NOT_APPROVED");
    err.notApproved = true;
    throw err;
  }

  return {
    blog: normalizeBlogData(blog),
    relatedBlogs: extractRelated(json, clean),
  };
}

/* ---------- listing endpoint (verified 2026-11) ---------- */
const DEFAULT_LIST_URL = "https://api.degreefyd.com/api/b2c/blogs/get";

export async function getBlogsList({ page = 1, limit = 9, search = "", category = "" } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search?.trim()) params.set("search", search.trim());
  if (category?.trim()) params.set("category", category.trim());
  const base = (import.meta.env?.VITE_BLOG_LIST_API_URL || DEFAULT_LIST_URL).replace(/\/+$/, "");
  const url = `${base}?${params.toString()}`;

  let res;
  try {
    res = await fetch(url, { headers: buildHeaders(), signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch {
    throw new BlogServiceError("Could not reach the listing service", "NETWORK");
  }
  if (!res.ok) throw new BlogServiceError(`Listing service responded with ${res.status}`, "HTTP_ERROR", res.status);

  let json;
  try { json = await res.json(); } catch { throw new BlogServiceError("Listing service returned an invalid response", "BAD_JSON"); }
  if (!json || json.status !== true || !json.data) throw new BlogServiceError("Listing service returned an unexpected response", "BAD_ENVELOPE");

  const raw = Array.isArray(json.data.articles) ? json.data.articles : [];
  const articles = raw.map(normalizeListItem).filter((a) => a && a.slug);

  return {
    articles,
    total: Number(json.data.total) || articles.length,
    totalPages: Number(json.data.totalPages) || 1,
    page: Number(page),
    limit: Number(limit),
  };
}

const HTML_ENTITIES = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'",
  hellip: "…", mdash: "—", ndash: "–", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"',
};
function decodeEntities(s) {
  return String(s || "").replace(/&(#?\w+);/g, (m, code) => {
    if (Object.prototype.hasOwnProperty.call(HTML_ENTITIES, code)) return HTML_ENTITIES[code];
    if (code[0] === "#") {
      const num = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      if (!Number.isNaN(num)) { try { return String.fromCodePoint(num); } catch { return m; } }
    }
    return m;
  });
}

function htmlToText(html) {
  return decodeEntities(
    String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, " ")
      .replace(/<[^>]*>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeListItem(raw) {
  if (!raw || typeof raw !== "object") return null;
  const image = resolveImageLike(raw.mainimage || raw.image);
  return {
    slug: toText(raw.urlSlug || raw.slug, ""),
    title: toText(raw.title, "Untitled"),
    category: toText(raw.category, null),
    excerpt: (() => { const t = htmlToText(raw.introduction || raw.excerpt); return t.length > 200 ? t.slice(0, 200).replace(/\s+\S*$/, "") + "…" : t; })(),
    date: parseDate(raw.publishDate || raw.createdAt || raw.date),
    views: typeof raw.views === "number" ? raw.views : null,
    readingTime: toText(raw.readingTime, null),
    image: image ? image.url : null,
    imageAlt: image ? toText(image.alt, null) : null,
  };
}

/* Envelope detection */
function extractBlog(json) {
  if (!json || typeof json !== "object") return null;
  const candidates = [
    json?.data?.blog, json?.data?.article,
    json?.blog, json?.article,
    json?.data,
    json?.result?.blog, json?.result?.article, json?.result,
    Array.isArray(json?.data) ? json.data[0] : null,
    json,
  ];
  return candidates.find((v) => v && typeof v === "object" && !Array.isArray(v) && (v.title || v.sections || v.introduction)) || null;
}

function extractRelated(json, selfSlug) {
  const raw = json?.data?.relatedBlogs || json?.relatedBlogs || json?.result?.relatedBlogs || json?.related || json?.popular || [];
  if (!Array.isArray(raw)) return [];
  return raw
    .map(normalizeRelated)
    .filter((r) => r && r.slug && r.slug !== selfSlug && r.title);
}

function toText(v, fallback = null) {
  if (v == null) return fallback;
  if (typeof v === "string") return v.trim() || fallback;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "object") return v.name || v.title || v.text || fallback;
  return fallback;
}

function toArray(v) {
  return Array.isArray(v) ? v : (v == null ? [] : [v]);
}

function parseDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

const DEFAULT_TOC_BY_BLOCK = (s, idx) => ({
  id: s.key || s.id || `section-${idx + 1}`,
  title: s.tocTitle || s.title || `Section ${idx + 1}`,
  order: s.order != null ? s.order : idx + 1,
});

const BRAND_FROM = ["DegreeFYD", "DegreeFyd"];
const BRAND_TO = "OnlineSiksha";
function brandize(value) {
  if (Array.isArray(value)) return value.map(brandize);
  if (!value || typeof value !== "string") return value;
  let s = value;
  for (const from of BRAND_FROM) s = s.split(from).join(BRAND_TO);
  return s;
}

export function normalizeBlogData(raw) {
  const title = brandize(toText(raw.title));
  const slug = toText(raw.urlSlug || raw.slug) || "";
  const seoRaw = raw.seo && typeof raw.seo === "object" ? raw.seo : {};

  // main image — tolerant of several shapes: string, {url}, {image:{url}}, {image:{image:{url}}}
  const mainImage = resolveImageLike(
    raw.mainimage ?? raw.main_image ?? raw.featuredImage ?? raw.imageUrl ?? raw.image
  );

  // author(s)
  const rawAuthors = toArray(raw.authors ?? raw.author ?? []);
  const a = rawAuthors[0] && typeof rawAuthors[0] === "object" ? rawAuthors[0] : null;
  const author = {
    name: brandize(toText(a?.name ?? raw.authorName ?? raw.author)),
    bio: brandize(toText(a?.bio ?? a?.designation ?? raw.authorBio)),
    image: toText(a?.image ?? raw.authorImage ?? a?.avatar, null),
    role: brandize(toText(a?.designation ?? raw.authorDesignation)),
  };

  // sections
  let sections = toArray(raw.sections);
  if (sections.length === 0 && raw.blocks) sections = [{ key: "content", title: null, order: 1, blocks: toArray(raw.blocks) }];
  sections = sections.map((s, idx) => {
    if (!s || typeof s !== "object") return null;
    const blocks = toArray(s.blocks ?? s.content);
    return {
      key: toText(s.key || s.id, `section-${idx + 1}`),
      id: toText(s.key || s.id, `section-${idx + 1}`),
      title: brandize(toText(s.title)),
      tocTitle: brandize(toText(s.tocTitle || s.title)),
      order: s.order != null && !Number.isNaN(Number(s.order)) ? Number(s.order) : idx + 1,
      blocks: blocks.filter((b) => b && typeof b === "object"),
    };
  }).filter(Boolean);

  // TOC
  let tableOfContents = toArray(raw.tableOfContents ?? raw.toc ?? []);
  if (tableOfContents.length === 0) {
    tableOfContents = [];
    if (raw.introduction || raw.intro) tableOfContents.push({ id: "introduction", title: "Introduction", order: 0 });
    sections.forEach((s, idx) => tableOfContents.push(DEFAULT_TOC_BY_BLOCK(s, idx)));
    if (raw.conclusion) tableOfContents.push({ id: "conclusion", title: "Conclusion", order: sections.length + 1 });
    if (toArray(raw.faqs).length > 0) tableOfContents.push({ id: "faqs", title: "Frequently asked questions", order: sections.length + 2 });
  } else {
    tableOfContents = tableOfContents
      .filter((i) => i && typeof i === "object")
      .map((i, idx) => ({
        id: toText(i.id || i.key, `toc-${idx}`),
        title: brandize(toText(i.title || i.label, `Section ${idx + 1}`)),
        order: i.order != null ? Number(i.order) : idx,
      }));
  }

  // FAQs — question/answer from the CMS arrive wrapped in HTML (e.g. <p>…</p>).
  // They are rendered as plain text, so strip markup and decode entities here.
  const faqs = toArray(raw.faqs)
    .filter((f) => f && typeof f === "object")
    .map((f, i) => ({
      id: f._id || f.id || `faq-${i + 1}`,
      question: brandize(htmlToText(toText(f.question || f.q))),
      answer: brandize(htmlToText(toText(f.answer || f.a))),
    }))
    .filter((f) => f.question && f.answer);

  return {
    _id: toText(raw._id || raw.id),
    blogId: toText(raw.blogId),
    urlSlug: slug,
    slug,
    title,
    status: toText(raw.status, "draft"),
    category: brandize(toText(raw.category || raw.articleSection)),
    tags: toArray(raw.tags).map(brandize).filter(Boolean),
    readingTime: toText(raw.readingTime || raw.readTime, null),
    views: typeof raw.views === "number" ? raw.views : null,
    publishDate: parseDate(raw.publishDate || raw.approvalDate || raw.createdAt || raw.publishedAt),
    modifiedDate: parseDate(raw.modifiedDate || raw.updatedAt || raw.dateModified) || parseDate(raw.publishDate || raw.approvalDate || raw.createdAt),
    author,
    mainImage,
    introduction: brandize(toText(raw.introduction ?? raw.intro)),
    standfirst: brandize(toText(raw.standfirst || raw.excerpt || raw.description || seoRaw.metaDescription)),
    excerpt: brandize(toText(raw.excerpt || raw.description || seoRaw.metaDescription)),
    subheadings: toArray(raw.subheadings).map((s) => brandize(toText(s))).filter(Boolean),
    bulletPoints: toArray(raw.bulletPoints).map((s) => brandize(toText(s))).filter(Boolean),
    sections,
    tableOfContents,
    conclusion: brandize(toText(raw.conclusion)),
    faqs,
    ctas: toArray(raw.ctas).map((c) => (c && typeof c === "object" ? c : { label: toText(c) })),
    ctaButtons: toArray(raw.ctaButtons ?? raw.buttons ?? []).map((c) => (c && typeof c === "object" ? c : { label: toText(c) })),
    references: toArray(raw.references).map((r) => brandize(toText(r))).filter(Boolean),
    seo: {
      metaTitle: brandize(toText(seoRaw?.meta?.metaTitle || seoRaw.metaTitle || raw.metaTitle || raw.title, title || null)),
      metaDescription: brandize(toText(seoRaw?.meta?.metaDescription || seoRaw.metaDescription || raw.metaDescription || raw.excerpt || raw.description, null)),
      metaKeywords: brandize(toText(seoRaw?.meta?.metaKeywords || seoRaw.metaKeywords || raw.metaKeywords, null)),
      canonical: toText(seoRaw?.meta?.canonicalUrl || seoRaw.canonical || raw.canonical, null),
      robotsTag: toText(seoRaw?.settings?.robotsTag, null),
      ogTitle: brandize(toText(seoRaw?.og?.ogTitle, null)),
      ogDescription: brandize(toText(seoRaw?.og?.ogDescription, null)),
      ogImage: toText(seoRaw?.og?.ogImage || seoRaw?.twitter?.twitterImage || mainImage?.url || null, null),
      ogUrl: toText(seoRaw?.og?.ogUrl, null),
    },
  };
}

function normalizeRelated(r) {
  if (!r || typeof r !== "object") return null;
  const img = imgSafe(r);
  const slug = toText(r.urlSlug || r.slug);
  return {
    slug,
    title: toText(r.title),
    excerpt: toText(r.excerpt || r.description),
    category: toText(r.category),
    date: parseDate(r.publishDate || r.date || r.createdAt),
    readingTime: toText(r.readingTime, null),
    image: img,
  };
}

function imgSafe(r) {
  const mi = r?.mainimage ?? r?.featuredImage ?? r?.image ?? r;
  const resolved = resolveImageLike(mi);
  return resolved ? resolved.url : null;
}

// Shared, defensive image resolver used for main + related images.
// Accepts: "<url>" | { image: "<url>", alt | title?| caption? } | { image: { url, alt? } } | { url | src, alt? } | { url | src }
function resolveImageLike(v) {
  if (!v) return null;
  if (typeof v === "string") return { url: v, alt: null };
  if (typeof v !== "object") return null;
  // { image: "<url>", alt: "..." }
  if (typeof v.image === "string") {
    return { url: v.image, alt: toText(v.alt || v.caption || v.title, null) };
  }
  // { image: { url| src, alt } }
  if (v.image && typeof v.image === "object") {
    const u = v.image.url || v.image.src;
    if (u) return { url: u, alt: toText(v.image.alt || v.alt || v.caption, null) };
  }
  // { url| src, alt? }
  const u = v.url || v.src;
  if (u) return { url: u, alt: toText(v.alt || v.caption || v.title, null) };
  return null;
}
