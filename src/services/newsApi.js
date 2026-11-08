/**
 * News CMS Service - OnlineSiksha
 *
 * Source of truth: DegreeFYD CMS API
 * Endpoints:
 *   GET /news-pages/website/list -> listing (data.articles, total, totalPages)
 *   GET /news-pages/website/{slug} -> detail (data.news)
 *
 * Adheres to OnlineSiksha service architecture:
 *   - Typed error classes (NewsNotFoundError, NewsServiceError)
 *   - Strict slug normalization preserving leading hyphens
 *   - Dual image fallback hierarchy (hero.image || thumbnail.url || fallback)
 *   - Genuine author extraction from createdBy.username
 *   - Comprehensive normalization for richText, live_news, TOC, FAQs, and SEO
 *   - Brand integrity replacement ("DegreeFYD" -> "OnlineSiksha")
 */

const DEFAULT_BASE = "https://api.degreefyd.com/api/b2c";
const DEFAULT_LIST_PATH = "/news-pages/website/list";
const DEFAULT_DETAIL_PATH = "/news-pages/website/";

const SLUG_ALIASES = {
  "cuet-ug-2026-result-out-live-cuet-scorecard-pdf-direct-link": "cuet-ug-exam-analysis-live-updates",
};

const API_URL =
  import.meta.env?.VITE_API_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_API_URL : undefined) ||
  DEFAULT_BASE;

export const DEFAULT_NEWS_FALLBACK_IMAGE =
  "https://images.degreefyd.com/resources/cuet-ug-city-intimation-slip-2026-live.webp";

export class NewsNotFoundError extends Error {
  constructor(message = "Article not found", code = "NOT_FOUND") {
    super(message);
    this.name = "NewsNotFoundError";
    this.code = code;
  }
}

export class NewsServiceError extends Error {
  constructor(message = "News service error", code = "SERVICE_ERROR", status) {
    super(message);
    this.name = "NewsServiceError";
    this.code = code;
    this.status = status;
  }
}

function buildHeaders() {
  return { Accept: "application/json" };
}

export function cleanSlug(rawSlug) {
  if (rawSlug == null) return "";
  const s = String(rawSlug).trim().toLowerCase();
  // IMPORTANT: Do NOT strip leading hyphens (e.g. "-josaa-2026-counselling-live-updates" is valid)
  return s;
}

export function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function brandize(value) {
  if (Array.isArray(value)) return value.map(brandize);
  if (value && typeof value === "object") {
    const copy = {};
    for (const k of Object.keys(value)) {
      copy[k] = brandize(value[k]);
    }
    return copy;
  }
  if (!value || typeof value !== "string") return value;
  let s = value;
  s = s.split("DegreeFYD").join("OnlineSiksha");
  s = s.split("DegreeFyd").join("OnlineSiksha");
  s = s.split("degreefyd.com").join("onlinesiksha.com");
  return s;
}

export function parseDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function resolveNewsImage(item, fallback = DEFAULT_NEWS_FALLBACK_IMAGE) {
  if (!item) return { url: fallback, alt: null };

  const heroImg =
    typeof item.hero?.image === "string" && item.hero.image.trim()
      ? item.hero.image.trim()
      : typeof item.hero?.image?.url === "string" && item.hero.image.url.trim()
      ? item.hero.image.url.trim()
      : null;

  const thumbImg =
    typeof item.thumbnail?.url === "string" && item.thumbnail.url.trim()
      ? item.thumbnail.url.trim()
      : typeof item.thumbnail?.image === "string" && item.thumbnail.image.trim()
      ? item.thumbnail.image.trim()
      : typeof item.thumbnail === "string" && item.thumbnail.trim()
      ? item.thumbnail.trim()
      : null;

  const alt =
    item.thumbnail?.alt ||
    item.hero?.image?.alt ||
    item.title ||
    "News cover image";

  const url = heroImg || thumbImg || fallback;
  return { url, alt };
}

export function resolveAuthor(item) {
  if (item?.createdBy?.username && typeof item.createdBy.username === "string" && item.createdBy.username.trim()) {
    return {
      name: item.createdBy.username.trim(),
      slug: item.createdBy.slug || "",
      id: item.createdBy._id || null,
    };
  }
  if (Array.isArray(item?.authors) && item.authors.length > 0) {
    const first = item.authors[0];
    if (typeof first === "string" && first.trim()) {
      return { name: first.trim(), slug: "", id: null };
    }
    if (first && typeof first === "object" && first.name) {
      return { name: String(first.name).trim(), slug: first.slug || "", id: first._id || null };
    }
  }
  return {
    name: "OnlineSiksha News Desk",
    slug: "onlinesiksha-news-desk",
    id: null,
  };
}

export function normalizeNewsListItem(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = String(raw._id || raw.id || raw.pageId || "");
  const pageId = String(raw.pageId || id);
  const rawSlug = raw.slug || "";
  const slug = cleanSlug(rawSlug);
  const title = brandize(String(raw.title || "").trim());
  const category = brandize(String(raw.category || "General").trim());
  const isLive = Boolean(raw.isLive === true || raw.isLive === "true");
  const approvalDate = parseDate(raw.approvalDate || raw.createdAt || raw.updatedAt);
  const author = resolveAuthor(raw);
  const resolvedImage = resolveNewsImage(raw);

  const rawHeroImage =
    typeof raw.hero?.image === "string" ? raw.hero.image.trim() : "";
  const rawThumbnailUrl =
    typeof raw.thumbnail?.url === "string" ? raw.thumbnail.url.trim() : "";

  return {
    id,
    pageId,
    slug,
    title,
    category,
    isLive,
    approvalDate,
    author,
    image: resolvedImage,
    thumbnail: {
      url: rawThumbnailUrl || resolvedImage.url,
      alt: raw.thumbnail?.alt || title,
    },
    rawHeroImage,
    rawThumbnailUrl,
  };
}

export function normalizeNewsDetail(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = String(raw._id || raw.id || raw.pageId || "");
  const pageId = String(raw.pageId || id);
  const rawSlug = raw.slug || "";
  const slug = cleanSlug(rawSlug);
  const title = brandize(String(raw.title || "").trim());
  const shortTitle = brandize(String(raw.shortTitle || raw.title || "").trim());
  const category = brandize(String(raw.category || "General").trim());
  const isLive = Boolean(raw.isLive === true || raw.isLive === "true");
  const isRecommended = Boolean(raw.isRecommended === true || raw.isRecommended === "true");

  const approvalDate = parseDate(raw.approvalDate || raw.createdAt || raw.updatedAt);
  const createdAt = parseDate(raw.createdAt || raw.approvalDate);
  const updatedAt = parseDate(raw.updatedAt || raw.modifiedDate || raw.createdAt);

  const author = resolveAuthor(raw);
  const resolvedImage = resolveNewsImage(raw);

  const rawDescription = raw.hero?.description || "";
  const cleanExcerpt = stripHtml(rawDescription);

  const hero = {
    title: brandize(String(raw.hero?.title || "").trim()),
    subtitle: brandize(String(raw.hero?.subtitle || "").trim()),
    description: brandize(rawDescription),
    cleanExcerpt,
    image: {
      url: (typeof raw.hero?.image === "string" && raw.hero.image.trim()) || resolvedImage.url,
      alt: raw.hero?.image?.alt || title,
    },
    buttons: Array.isArray(raw.hero?.buttons) ? raw.hero.buttons : [],
  };

  const thumbnail = {
    url: (typeof raw.thumbnail?.url === "string" && raw.thumbnail.url.trim()) || resolvedImage.url,
    alt: raw.thumbnail?.alt || title,
  };

  // Sections and blocks normalization
  const sections = Array.isArray(raw.sections)
    ? raw.sections.map((sec, secIdx) => {
        const heading = brandize(String(sec.heading || sec.title || "").trim());
        const blocks = Array.isArray(sec.blocks)
          ? sec.blocks.map((blk) => {
              const type = blk.type || "richText";
              if (type === "live_news") {
                return {
                  type: "live_news",
                  content: {
                    title: brandize(blk.content?.title || "Live Updates"),
                    isLive: Boolean(blk.content?.isLive === "true" || blk.content?.isLive === true),
                    newsPageId: blk.content?.newsPageId || id,
                  },
                };
              }
              return {
                type: "richText",
                content: brandize(typeof blk.content === "string" ? blk.content : ""),
              };
            })
          : [];
        return {
          id: `section-${secIdx}`,
          heading,
          blocks,
        };
      })
    : [];

  // Table of Contents normalization
  const tableOfContents = Array.isArray(raw.tableOfContents) && raw.tableOfContents.length > 0
    ? raw.tableOfContents.map((toc, idx) => ({
        id: `toc-${idx}`,
        title: brandize(String(toc.title || `Section ${idx + 1}`).trim()),
        anchor: String(toc.anchor || `#section-${idx}`).trim(),
      }))
    : sections.map((sec, idx) => ({
        id: `toc-${idx}`,
        title: sec.heading || `Section ${idx + 1}`,
        anchor: `#section-${idx}`,
      }));

  // FAQs normalization
  const faqs = Array.isArray(raw.pageLevelFaqs)
    ? raw.pageLevelFaqs
        .filter((f) => f && (f.question || f.q))
        .map((f, idx) => ({
          id: f._id || `faq-${idx}`,
          question: brandize(String(f.question || f.q || "").trim()),
          answer: brandize(String(f.answer || f.a || "").trim()),
        }))
    : [];

  // Tags
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((t) => brandize(String(t).trim())).filter(Boolean)
    : [];

  // Related News
  const relatedNews = Array.isArray(raw.relatedNews)
    ? raw.relatedNews.map(normalizeNewsListItem).filter(Boolean)
    : [];

  // SEO normalization
  const seo = {
    title: brandize(raw.seo?.meta?.metaTitle || title || "News | OnlineSiksha"),
    description: brandize(raw.seo?.meta?.metaDescription || cleanExcerpt || "Latest education news and admission updates."),
    canonicalUrl: raw.seo?.meta?.canonicalUrl || `https://onlinesiksha.com/news/${slug}`,
    og: {
      title: brandize(raw.seo?.og?.ogTitle || raw.seo?.meta?.metaTitle || title),
      description: brandize(raw.seo?.og?.ogDescription || raw.seo?.meta?.metaDescription || cleanExcerpt),
      image: raw.seo?.og?.ogImage || resolvedImage.url,
      url: raw.seo?.og?.ogUrl || `https://onlinesiksha.com/news/${slug}`,
    },
    twitter: {
      title: brandize(raw.seo?.twitter?.twitterTitle || raw.seo?.meta?.metaTitle || title),
      description: brandize(raw.seo?.twitter?.twitterDescription || raw.seo?.meta?.metaDescription || cleanExcerpt),
      image: raw.seo?.twitter?.twitterImage || resolvedImage.url,
    },
    robotsTag: raw.seo?.settings?.robotsTag || "index, follow",
  };

  return {
    id,
    pageId,
    slug,
    title,
    shortTitle,
    category,
    isLive,
    isRecommended,
    approvalDate,
    createdAt,
    updatedAt,
    author,
    hero,
    thumbnail,
    resolvedImage,
    sections,
    tableOfContents,
    faqs,
    tags,
    relatedNews,
    seo,
  };
}

async function fetchJson(url, signal) {
  let response;
  try {
    response = await fetch(url, {
      headers: buildHeaders(),
      signal,
    });
  } catch (err) {
    if (err?.name === "AbortError") {
      throw new NewsServiceError("News request timed out", "TIMEOUT");
    }
    throw new NewsServiceError("Could not reach the news service", "NETWORK");
  }

  if (response.status === 404) {
    throw new NewsNotFoundError("Article not found", "NOT_FOUND");
  }
  if (!response.ok) {
    throw new NewsServiceError(
      "News service responded with " + response.status,
      "HTTP_ERROR",
      response.status
    );
  }

  try {
    return await response.json();
  } catch {
    throw new NewsServiceError("News service returned an invalid response", "BAD_JSON");
  }
}

/**
 * Fetch list of published news articles
 * @param {object} options
 * @returns {Promise<{ articles: Array, total: number, totalPages: number }>}
 */
export async function getNewsListing(options = {}) {
  const base = (options.baseUrl || API_URL || DEFAULT_BASE).replace(/\/+$/, "");
  const url = `${base}${DEFAULT_LIST_PATH}`;
  const timeoutMs = options.timeoutMs || 10000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const json = await fetchJson(url, controller.signal);

    if (!json || typeof json !== "object") {
      throw new NewsServiceError("Malformed listing response", "UNEXPECTED_SHAPE");
    }

    // Expected shape: { status: "success" | true, data: { articles: [...], total, totalPages } }
    const container = json.data || json;
    const rawArticles = Array.isArray(container.articles)
      ? container.articles
      : Array.isArray(container)
      ? container
      : [];

    const articles = rawArticles.map(normalizeNewsListItem).filter(Boolean);
    const total = typeof container.total === "number" ? container.total : articles.length;
    const totalPages = typeof container.totalPages === "number" ? container.totalPages : 1;

    return {
      articles,
      total,
      totalPages,
    };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch a single news article by slug
 * @param {string} rawSlug
 * @param {object} options
 * @returns {Promise<object>} normalized article detail
 */
export async function getNewsBySlug(rawSlug, options = {}) {
  const clean = cleanSlug(rawSlug);
  if (!clean) {
    throw new NewsNotFoundError("Missing news article slug", "MISSING_SLUG");
  }

  const base = (options.baseUrl || API_URL || DEFAULT_BASE).replace(/\/+$/, "");
  const targetSlug = SLUG_ALIASES[clean] || clean;
  // Ensure leading hyphen is preserved and safe URI encoding is used
  const url = `${base}${DEFAULT_DETAIL_PATH}${encodeURIComponent(targetSlug)}`;
  const timeoutMs = options.timeoutMs || 10000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const json = await fetchJson(url, controller.signal);

    if (!json || typeof json !== "object") {
      throw new NewsServiceError("Malformed article response", "UNEXPECTED_SHAPE");
    }

    const payload = json.data?.news || json.data || json.news;
    if (!payload || typeof payload !== "object" || Object.keys(payload).length === 0) {
      throw new NewsNotFoundError(`No news article found for slug: ${clean}`, "NOT_FOUND");
    }

    const normalized = normalizeNewsDetail(payload);
    if (!normalized || !normalized.title) {
      throw new NewsNotFoundError(`Invalid article structure for slug: ${clean}`, "NOT_FOUND");
    }

    return normalized;
  } finally {
    clearTimeout(timer);
  }
}
