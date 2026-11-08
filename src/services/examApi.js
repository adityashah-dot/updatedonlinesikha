/**
 * Exam CMS service - listing + detail pages.
 *
 * Source of truth: DegreeFYD CMS (live API).
 * Endpoints (verified via TASK 09A / TASK 09E research):
 *   GET /exam-pages/filtered-list -> listing (search, category, level, stream, sort, page, limit)
 *   GET /exam-pages/website/{slug} -> detail
 *
 * Never silently falls back to invented/local exam data.
 * Callers receive typed errors and render loading/error/not-found states.
 */

const DEFAULT_BASE = "https://api.degreefyd.com/api/b2c";
const DEFAULT_LIST_PATH = "/exam-pages/filtered-list";
const DEFAULT_DETAIL_PATH = "/exam-pages/website/";

const API_URL =
  import.meta.env?.VITE_API_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_API_URL : undefined) ||
  DEFAULT_BASE;

function buildHeaders() {
  return { Accept: "application/json" };
}

export class ExamNotFoundError extends Error {
  constructor(message, code = "NOT_FOUND") {
    super(message);
    this.name = "ExamNotFoundError";
    this.code = code;
  }
}

export class ExamServiceError extends Error {
  constructor(message, code = "SERVICE_ERROR", status) {
    super(message);
    this.name = "ExamServiceError";
    this.code = code;
    this.status = status;
  }
}

async function fetchJson(url) {
  let response;
  try {
    response = await fetch(url, { headers: buildHeaders() });
  } catch {
    throw new ExamServiceError("Could not reach the exam service", "NETWORK");
  }
  if (response.status === 404) throw new ExamNotFoundError("No exam found", "NOT_FOUND");
  if (!response.ok) throw new ExamServiceError("Exam service responded with " + response.status, "HTTP_ERROR", response.status);
  try {
    return await response.json();
  } catch {
    throw new ExamServiceError("Exam service returned an invalid response", "BAD_JSON");
  }
}

function isSuccessful(result) {
  if (!result || typeof result !== "object") return false;
  const ok = result.success !== undefined ? result.success : result.status;
  return ok === true;
}

function toText(v, fallback = null) {
  if (v == null) return fallback;
  if (typeof v === "string") return v.trim() || fallback;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "object") return v.name || v.title || v.text || fallback;
  return fallback;
}

function toArray(v) {
  return Array.isArray(v) ? v : v == null ? [] : [v];
}

function parseDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function resolveImageLike(v) {
  if (!v) return null;
  if (typeof v === "string") {
    const s = v.trim();
    return s ? { url: s, alt: null } : null;
  }
  if (typeof v !== "object") return null;
  if (typeof v.image === "string" && v.image.trim()) {
    return { url: v.image.trim(), alt: toText(v.alt || v.caption || v.title, null) };
  }
  if (v.image && typeof v.image === "object") {
    const u = typeof (v.image.url || v.image.src) === "string" ? (v.image.url || v.image.src).trim() : null;
    if (u) return { url: u, alt: toText(v.image.alt || v.alt || v.caption, null) };
  }
  const u = typeof (v.url || v.src) === "string" ? (v.url || v.src).trim() : null;
  if (u) return { url: u, alt: toText(v.alt || v.caption || v.title, null) };
  return null;
}

function brandize(value) {
  if (Array.isArray(value)) return value.map(brandize);
  if (!value || typeof value !== "string") return value;
  let s = value;
  s = s.split("DegreeFYD").join("OnlineSiksha");
  s = s.split("DegreeFyd").join("OnlineSiksha");
  return s;
}

function normalizeSection(s, idx) {
  if (!s || typeof s !== "object") return null;
  const fallbackId = "section-" + idx;
  const key = toText(s.key || s.id, fallbackId) || fallbackId;
  const blocks = Array.isArray(s.blocks)
    ? s.blocks
    : Array.isArray(s.content)
      ? s.content
      : [];
  return {
    key,
    id: key,
    title: brandize(toText(s.title || s.heading)),
    tocTitle: brandize(toText(s.tocTitle || s.heading || s.title)),
    order: Number.isFinite(Number(s.order)) ? Number(s.order) : idx + 1,
    blocks: blocks.filter((b) => b && typeof b === "object"),
  };
}

function normalizeToc(entries) {
  const list = Array.isArray(entries) ? entries : [];
  const out = [];
  for (const e of list) {
    if (!e || typeof e !== "object") continue;
    const id = String(toText(e.anchor || e.id) || "").replace(/^#/, "");
    const title = toText(e.title);
    if (!id || !title) continue;
    out.push({ id, title, order: Number(e.order) || 0 });
  }
  return out;
}

function normalizeFaqs(entries) {
  const list = Array.isArray(entries) ? entries : [];
  const out = [];
  for (const f of list) {
    if (!f || typeof f !== "object") continue;
    const question = toText(f.question || f.q);
    const answer = typeof f.answer === "string" ? f.answer : typeof f.a === "string" ? String(f.a) : "";
    if (!question || !answer) continue;
    out.push({
      id: toText(f._id || f.id) || "exam-faq-" + (out.length + 1),
      question,
      answer,
    });
  }
  return out;
}

export async function getExamsListing({ search = "", category = "", level = "", stream = "", sort = "recommended-exams", page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams();
  if (search && String(search).trim()) params.set("search", String(search).trim());
  if (category && String(category).trim()) params.set("category", String(category).trim());
  if (level && String(level).trim()) params.set("level", String(level).trim());
  if (stream && String(stream).trim()) params.set("stream", String(stream).trim());
  params.set("sort", String(sort || "recommended-exams"));
  params.set("page", String(page || 1));
  params.set("limit", String(limit || 10));

  const url = API_URL + DEFAULT_LIST_PATH + "?" + params.toString();
  const result = await fetchJson(url);
  if (!isSuccessful(result)) throw new ExamServiceError("Exam listing service returned an unexpected response", "BAD_ENVELOPE");

  const data = (result && result.data) ? result.data : result;
  const rawExams = Array.isArray(data) ? data : Array.isArray(data.exams) ? data.exams : [];
  const exams = [];
  for (const raw of rawExams) {
    const mapped = mapExamListItem(raw);
    if (mapped) exams.push(mapped);
  }

  const pagination = (result && result.pagination) || (data && data.pagination) || {};
  const filters = (result && result.filters) || (data && data.filters) || {};
  const totalRaw = (pagination && (pagination.totalRecords != null ? pagination.totalRecords : pagination.total)) ?? (data && (data.totalRecords != null ? data.totalRecords : data.total)) ?? exams.length;
  const total = Number(totalRaw) > 0 ? Number(totalRaw) : exams.length;
  const totalPages = Number((pagination && pagination.totalPages) != null ? pagination.totalPages : (data && data.totalPages) != null ? data.totalPages : 1) || 1;

  return { exams, pagination, filters, total, totalPages };
}

function mapExamListItem(raw) {
  if (!raw || typeof raw !== "object") return null;
  const slug = toText(raw.urlSlug || raw.slug);
  if (!slug) return null;
  const registrationRange = raw.registrationRange && typeof raw.registrationRange === "object" ? raw.registrationRange : null;
  const children = Array.isArray(raw.children) ? raw.children : [];
  return {
    slug,
    title: brandize(toText(raw.title)),
    shortTitle: brandize(toText(raw.shortTitle)),
    fullForm: toText(raw.fullForm),
    pageSliderTitle: toText(raw.pageSliderTitle),
    examMode: toText(raw.examMode) || "Online",
    examDate: parseDate(raw.examDate),
    registrationRange,
    resultDate: parseDate(raw.resultDate),
    isRecommended: Boolean(raw.isRecommended),
    logo: resolveImageLike(raw.logo || raw.logoImage),
    children,
  };
}

let listingLogosCache = null;
let listingLogosPromise = null;

export async function getListingLogosMap() {
  if (listingLogosCache) return listingLogosCache;
  if (!listingLogosPromise) {
    listingLogosPromise = getExamsListing({ limit: 100 })
      .then((res) => {
        const map = new Map();
        for (const ex of res.exams || []) {
          if (ex.slug && ex.logo && ex.logo.url) {
            map.set(ex.slug, ex.logo);
          }
        }
        listingLogosCache = map;
        return map;
      })
      .catch(() => new Map());
  }
  return listingLogosPromise;
}

export async function getExamBySlug(slug) {
  const clean = String(slug || "").trim().toLowerCase();
  if (!clean) throw new ExamNotFoundError("Missing slug", "MISSING_SLUG");

  const url = API_URL + DEFAULT_DETAIL_PATH + encodeURIComponent(clean);
  const result = await fetchJson(url);
  const data = (result && result.data) ? result.data : result;
  const exam = (data && data.exam) ? data.exam : (result && result.exam ? result.exam : null);
  if (!exam || typeof exam !== "object") throw new ExamNotFoundError("No exam found for " + clean, "NOT_FOUND");
  exam.slug = clean;

  const status = String(exam.status || exam.approvalStatus || "").toLowerCase();
  if (status && status !== "approved" && status !== "published" && status !== "live") {
    const err = new ExamNotFoundError("Exam is not approved", "NOT_APPROVED");
    err.notApproved = true;
    throw err;
  }

  // Pre-load / retrieve logos map to resolve genuine logos for exam and related exams
  let logoMap = new Map();
  try {
    logoMap = await getListingLogosMap();
  } catch {
    // Graceful fallback if listing API is unreachable
  }

  const examLogo = resolveImageLike(exam.logo || exam.logoImage || exam.image) || (clean ? logoMap.get(clean) : null) || null;
  exam.logo = examLogo;

  const sections = (Array.isArray(exam.sections) ? exam.sections : [])
    .map((s, i) => normalizeSection(s, i))
    .filter(Boolean);

  const toc = normalizeToc(Array.isArray(exam.tableOfContents) ? exam.tableOfContents : []);
  if (toc.length === 0 && sections.length > 0) {
    for (const s of sections) toc.push({ id: s.id, title: s.title, order: s.order });
  }

  const faqs = normalizeFaqs(exam.pageLevelFaqs);

  const rawRelated = Array.isArray(exam.relatedExams) ? exam.relatedExams : [];
  const relatedExams = rawRelated.map((rex) => {
    if (!rex || typeof rex !== "object") return null;
    const rexSlug = toText(rex.slug || rex.urlSlug);
    const existingLogo = resolveImageLike(rex.logo || rex.logoImage || rex.image);
    const mappedLogo = (rexSlug && logoMap.get(rexSlug)) || existingLogo || null;
    return {
      ...rex,
      slug: rexSlug,
      title: brandize(toText(rex.title)),
      shortTitle: brandize(toText(rex.shortTitle || rex.title)),
      examMode: toText(rex.examMode),
      logo: mappedLogo,
    };
  }).filter(Boolean);

  const hero = exam.hero && typeof exam.hero === "object" ? exam.hero : null;
  const seo = exam.seo && typeof exam.seo === "object" ? exam.seo : null;
  const sliderContent = Array.isArray(exam.sliderContent) ? exam.sliderContent : exam.sliderContent ? [exam.sliderContent] : [];
  const samplePapers = exam.samplePapers || null;

  return { exam, sections, toc, faqs, relatedExams, hero, seo, sliderContent, samplePapers };
}
