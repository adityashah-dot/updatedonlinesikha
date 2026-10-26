/**
 * Chatbot knowledge engine — server-side only.
 *
 * Pulls the live university listing/detail APIs (same endpoints the site uses:
 *   GET  /website/colleges/listing?mode=online
 *   GET  /website/colleges/{slug}
 *   GET  /website/colleges/courses-new/{collegeId}
 * ), builds a structured, hash-stamped knowledge dataset on disk, and answers
 * student questions via retrieval + grounded generation (Gemini when a key is
 * configured, strict dataset templates otherwise).
 *
 * No facts are invented here: every record's `answer` is composed solely from
 * API fields; fields that are missing are reported as unavailable.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { mapOverviewData } from "./overviewMapper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATASET_DIR = path.join(__dirname, "..", "..", "data-cache");
const DATASET_PATH = path.join(DATASET_DIR, "chatbotDataset.json");

let datasetPathOverride = "";

const DEFAULT_API_BASE = "https://api.degreefyd.com/api/b2c";

const SITE_ORIGIN = (process.env.SITE_ORIGIN || "").replace(/\/$/, "");
const MAX_HISTORY_MESSAGES = 14;
const MAX_USER_MESSAGE_CHARS = 1200;
const RETRIEVAL_LIMIT = 8;
const MODEL_TIMEOUT_MS = 45_000;
const FETCH_TIMEOUT_MS = 20_000;

const INTENTS = ["fees", "courses", "eligibility", "admission", "deadlines", "scholarships", "placements", "accreditation", "exams", "lms", "contact", "overview", "compare", "general"];

const CATEGORY_OF_INTENT = {
  fees: ["fees"],
  courses: ["courses"],
  eligibility: ["eligibility"],
  admission: ["admission"],
  deadlines: ["deadlines"],
  scholarships: ["scholarships"],
  placements: ["placements"],
  accreditation: ["accreditation"],
  exams: ["exams"],
  lms: ["lms"],
  contact: ["contact"],
  overview: ["overview", "accreditation", "lms", "placements", "contact"],
  compare: ["fees", "accreditation", "placements", "courses"],
  general: [],
};

const INTENT_KEYWORDS = {
  fees: /\bfee|fees|cost|tuition|expensive|cheapest|affordable|emi|installment|payment\b/i,
  courses: /\bcourse|courses|program|programme|degree|specialization|mba|mca|bba|bca|b\.?com|msc|ma\b/i,
  eligibility: /\beligib|qualification|criteria|require.*admissi|can i (apply|take|get)\b/i,
  admission: /\badmission|apply|application|enroll|enrol|registration|documents?\b/i,
  deadlines: /\bdeadline|last date|important date|closing date|dates\b/i,
  scholarships: /\bscholarship|financial aid|discount|waiver\b/i,
  placements: /\bplacement|package|salary|recruiter|job|career|ctc\b/i,
  accreditation: /\bnaac|nirf|accredit|recogn|approv|ugc|aicte|valid|ranked|ranking\b/i,
  exams: /\bexam|assessment|evaluation|proctor\b/i,
  lms: /\blms|learning platform|app|library|recorded|live class\b/i,
  contact: /\bcontact|phone|email|website|official\b/i,
  overview: /\babout|overview|tell me|what is|details|info\b/i,
  compare: /\bcompare|versus|vs\.?|difference between|better\b/i,
};

/* Initial suggested questions (Phase 7A) — curated, always available. */
export const INITIAL_SUGGESTIONS = [
  { label: "Universities", prompt: "Which online universities are available?" },
  { label: "Find a course", prompt: "Help me find a course based on my career goal" },
  { label: "Affordable", prompt: "What are the most affordable online universities?" },
  { label: "How to choose", prompt: "How do I choose the right online degree?" },
  { label: "Admission steps", prompt: "What is the admission process for online courses?" },
  { label: "Online MBA", prompt: "Which universities offer online MBA programs?" },
  { label: "Before enrolling", prompt: "What should I check before enrolling in an online university?" },
  { label: "Compare", prompt: "Can you compare two online universities?" },
];

/* ------------------------------------------------------------------ utils */

function sha1(value) {
  return crypto.createHash("sha1").update(String(value)).digest("hex");
}

function apiBase() {
  return (process.env.VITE_API_URL || "").trim() || DEFAULT_API_BASE;
}

function apiHeaders() {
  const headers = { Accept: "application/json" };
  const token = (process.env.VITE_API_TOKEN || "").trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchJson(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...apiHeaders(), ...(options.headers || {}) },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function unwrap(result) {
  return result?.data?.data || result?.data || result;
}

function extractUniversitiesList(result) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.universities)) return result.universities;
  if (Array.isArray(result.onlineUniversities)) return result.onlineUniversities;
  if (Array.isArray(result.data)) return extractUniversitiesList(result.data);
  if (Array.isArray(result.suggestedColleges)) return result.suggestedColleges;
  return [];
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function rupees(value) {
  if (value == null || value === "") return "";
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num) || num <= 0) return String(value);
  return `₹${num.toLocaleString("en-IN")}`;
}

/* ------------------------------------------------------- API data sourcing */

async function fetchListing({ timeoutMs = FETCH_TIMEOUT_MS } = {}) {
  const params = new URLSearchParams({
    isCollgesNamesRequired: "true",
    isCollgesLocationsRequired: "true",
    mode: "online",
    limit: "500",
  });
  const result = await fetchJson(
    `${apiBase()}/website/colleges/listing?${params.toString()}`,
    {},
    timeoutMs
  );
  const records = extractUniversitiesList(result).filter(
    (record) => String(record?.collegeMode || "").toLowerCase() === "online"
  );
  const seen = new Set();
  return records.filter((record) => {
    const key = record?.slug || record?._id || record?.id;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchCollegeDetail(slug, { timeoutMs = FETCH_TIMEOUT_MS } = {}) {
  const result = await fetchJson(
    `${apiBase()}/website/colleges/${encodeURIComponent(slug)}`,
    {},
    timeoutMs
  );
  return unwrap(result);
}

async function fetchCollegeCourses(collegeId, { timeoutMs = FETCH_TIMEOUT_MS } = {}) {
  if (!collegeId) return [];
  const result = await fetchJson(
    `${apiBase()}/website/colleges/courses-new/${encodeURIComponent(collegeId)}?page=0&limit=25`,
    {},
    timeoutMs
  );
  return result?.data || result || [];
}

/* -------------------------------------------------- knowledge record build */

function recordId(slug, category, tag) {
  return `${slug}::${category}::${sha1(tag).slice(0, 10)}`;
}

export function buildKnowledgeRecords(bundle) {
  const out = [];
  let listing = bundle.listing || {};
  const detail = bundle.detail || null;
  const overview = detail ? mapOverviewData(detail, { courses: bundle.courses || [] }) : null;

  const dataSource = bundle.dataSource || "";
  const name = cleanText(listing.collegeName || listing.name || overview?.name || bundle.slug || "University");
  const slug = cleanText(bundle.slug || listing.slug || overview?.slug || "");
  const shortName = cleanText(listing.collegeShortName || overview?.shortName || "");
  const sourceUrl = SITE_ORIGIN ? `${SITE_ORIGIN}/universities/${slug}` : `/universities/${slug}`;
  const lastSyncedAt = bundle.syncedAt || new Date().toISOString();

  const make = (category, tag, question, answerBody) => {
    if (!question || !answerBody) return;
    const id = recordId(slug, category, tag);
    const contentHash = sha1(JSON.stringify({ question, answerBody }));
    out.push({
      id,
      universityId: slug,
      universityName: name,
      slug,
      category,
      question,
      answer: answerBody,
      source: dataSource || "online siksha university API",
      sourceUrl,
      lastSyncedAt,
      contentHash,
      isActive: true,
    });
  };

  /* --------- listing-level facts (always available fields only) --------- */
  const location = cleanText(listing.collegeLocation || overview?.location || "");
  const established = cleanText(listing.established || overview?.established || "");
  const mode = cleanText(listing.collegeMode || overview?.collegeMode || "");
  const coursesCount = listing.coursesCount ?? (listing.counts ? parseInt(listing.counts, 10) : null);
  const approvals = []

    .concat(
      Array.isArray(overview?.approvals)
        ? overview.approvals.map((a) => cleanText(typeof a === "string" ? a : a?.name))
        : (listing.accreditations || []).map((a) => cleanText(typeof a === "string" ? a : a?.name))
    )
    .filter(Boolean);

  const facts = [];
  if (mode) facts.push(`Mode: ${mode}`);
  if (location) facts.push(`Location: ${location}`);
  if (established) facts.push(`Established: ${established}`);
  if (coursesCount != null && !Number.isNaN(coursesCount)) facts.push(`Programmes offered: ${coursesCount}`);
  if (approvals.length) facts.push(`Accreditations: ${approvals.join(", ")}`);

  const listingFee =
    listing.minFee != null ? `Total programme fee range: ${rupees(listing.minFee)}${listing.maxFee && listing.minFee !== listing.maxFee ? ` - ${rupees(listing.maxFee)}` : ""}` : "";

  if (facts.length) make("overview", "basic", `What is ${name}?`,
    `${name}${overview?.hero?.description ? ` — ${overview.hero.description}` : ""}\n${facts.join(" | ")}`);
  if (listingFee) make("fees", "range", `What are the fees at ${name}?`,
    `${listingFee}. Per-course fees: ${sourceUrl}`);

  if (approvals.length || overview?.naac || listing.nirfRanking) {
    const accreditationLines = [];
    if (approvals.length) accreditationLines.push(`Recognitions and approvals: ${approvals.join(", ")}`);
    if (overview?.naac && !accreditationLines.join("").includes(String(overview.naac).toUpperCase()))
      accreditationLines.push(`NAAC: ${cleanText(overview.naac)}`);
    if (listing.nirfRanking || overview?.nirfRanking)
      accreditationLines.push(`NIRF ranking: #${listing.nirfRanking || overview.nirfRanking}`);
    if (overview?.rankings?.table?.length)
      overview.rankings.table.slice(0, 6).forEach((row) => {
        if (row.authority && row.status) accreditationLines.push(`${row.authority}: ${row.status}`);
      });
    make("accreditation", "approvals", `Is ${name} recognized and approved for online degrees?`, accreditationLines.join("\n"));
  }

  if (listing.highestPackage || overview?.placements?.stats?.highestPackage || overview?.placements?.stats?.placementRate) {
    const stats = overview?.placements?.stats || {};
    const lines = [];
    if (stats.highestPackage || listing.highestPackage)
      lines.push(`Highest package (value as published by the university): ${stats.highestPackage || listing.highestPackage}`);
    if (stats.placementRate) lines.push(`Placement rate: ${stats.placementRate}`);
    if (stats.hiringPartners) lines.push(`Hiring partners: ${cleanText(stats.hiringPartners)}`);
    if (overview?.placements?.recruiters?.length)
      lines.push(`Top recruiters: ${overview.placements.recruiters.slice(0, 10).map((r) => cleanText(r.name)).join(", ")}`);
    make("placements", "stats", `What are the placement statistics at ${name}?`, lines.join("\n"));
  }

  /* ------------- detail-level facts (only when published) --------------- */
  if (overview) {
    const courses = overview.coursesFees?.table || overview.popularProgrammes || [];

    if (courses.length) {
      const degreeList = courses
        .slice(0, 25)
        .map((row) => `${row.name}${row.duration ? ` (${row.duration})` : ""}`)
        .join("; ");
      make("courses", "list", `What courses and programs does ${name} offer online?`,
        `${courses.length} online programme(s): ${degreeList}`);

      courses.forEach((row, index) => {
        const feeBits = [];
        if (row.perSemFee) feeBits.push(`Fee: ${row.perSemFee} per semester`);
        if (row.totalFee != null || row.avgFees) {
          const total = row.totalFee != null ? rupees(row.totalFee) : cleanText(row.avgFees);
          if (total) feeBits.push(`Total program fee: ${total}`);
        }
        if (row.semestersCount) feeBits.push(`Duration: ${Math.round(row.semestersCount / 2)} years (semesters: ${row.semestersCount})`);
        if (row.specializations) feeBits.push(cleanText(row.specializations));
        else if (row.specialisations?.length)
          feeBits.push(`Specializations: ${row.specialisations.join(", ")}`);
        make("fees", `course-${index}`, `What is the fee of ${row.name} at ${name}?`,
          feeBits.length ? feeBits.join(" | ") : `Fee details not published. Check ${sourceUrl}`);
      });
    }

    if (Array.isArray(overview.eligibilityMatrix) && overview.eligibilityMatrix.length) {
      overview.eligibilityMatrix.forEach((row, index) => {
        const bits = [];
        if (row.eligibility) bits.push(`Eligibility: ${cleanText(row.eligibility)}`);
        if (row.duration) bits.push(`Duration: ${cleanText(row.duration)}`);
        if (row.selection && row.selection !== "Merit-based") bits.push(`Selection: ${cleanText(row.selection)}`);
        else if (row.selection) bits.push("Selection: Merit-based");
        if (row.feeSem) bits.push(`Fee per semester: ${rupees(row.feeSem)}`);
        make("eligibility", `row-${index}`,
          row.course ? `What is the eligibility for ${cleanText(row.course)} at ${name}?` : `What is the eligibility at ${name}?`,
          bits.join(" | "));
      });
    }

    if (overview.admissionProcess?.steps?.length || overview.applicationSteps?.length) {
      const steps = overview.admissionProcess?.steps?.length
        ? overview.admissionProcess.steps
        : overview.applicationSteps;
      const stepLines = steps
        .slice(0, 10)
        .map((step, i) => `${i + 1}. ${cleanText(step.title)}${step.description ? ` — ${step.description}` : ""}`);
      const documents = (overview.documentsRequired || []).map((d) => cleanText(d.name || d)).filter(Boolean);
      const body = `${cleanText(overview.admissionProcess?.intro || overview.applicationProcessDescription || "")}\n${stepLines.join("\n")}${documents.length ? `\nDocuments: ${documents.join(", ")}` : ""}`;
      make("admission", "process", `What is the admission process at ${name}?`, body);
    }

    if (overview.importantDates?.length) {
      const deadlineLines = overview.importantDates.slice(0, 10).map((row) =>
        `${cleanText(row.event)}: ${cleanText(row.date)}${row.status ? ` (${cleanText(row.status)})` : ""}`
      );
      make("deadlines", "dates", `What are the admission deadlines and important dates for ${name}?`, deadlineLines.join("\n"));
    }

    const scholarships = overview.scholarships?.items || [];
    if (scholarships.length) {
      const lines = scholarships.slice(0, 8).map((item) =>
        `${cleanText(item.name)}${item.details ? ` — ${cleanText(item.details)}` : ""}`);
      make("scholarships", "list", `Are scholarships or discounts available at ${name}?`,
        [cleanText(overview.scholarships.description), lines.join("\n")].filter(Boolean).join("\n"));
    }

    if (overview.examinationPattern?.steps?.length || overview.examinationPattern?.intro) {
      const examLines = overview.examinationPattern.steps.map((s, i) =>
        `${i + 1}. ${cleanText(s.title || s)}${s.description ? ` — ${cleanText(s.description)}` : ""}`);
      make("exams", "pattern", `How are exams conducted at ${name}?`,
        `${cleanText(overview.examinationPattern.intro)}\n${examLines.join("\n")}`);
    }

    if (overview.lms?.features?.length) {
      make("lms", "features", `What is the learning platform or LMS at ${name}?`,
        overview.lms.features.slice(0, 8).map((f) => `${cleanText(f.title)}${f.desc ? ` — ${cleanText(f.desc)}` : ""}`).join("\n"));
    }

    if (overview.faqs?.length) {
      overview.faqs.slice(0, 10).forEach((faq, index) => {
        if (faq.question && faq.answer)
          make("faqs", `faq-${index}`, `${cleanText(faq.question)} (${shortName || name})`, cleanText(faq.answer));
      });
    }
  }

  return out;
}

/* ------------------------------------------------------------- sync engine */

function mergeRecords(existingRecords, records) {
  const merged = new Map();
  existingRecords.filter((r) => r && r.isActive).forEach((r) => merged.set(r.id, r));
  records.forEach((r) => {
    const previous = merged.get(r.id);
    if (!previous || previous.contentHash !== r.contentHash) {
      merged.set(r.id, r); // new or updated (non-fabricated) copy
    }
  });
  return [...merged.values()];
}

export async function syncDataset({
  fetchListingImpl = fetchListing,
  fetchCollegeDetailImpl = fetchCollegeDetail,
  fetchCollegeCoursesImpl = fetchCollegeCourses,
  detailLimit = 0,
  forceAll = false,
  now = new Date(),
} = {}) {
  const existing = loadDatasetStore() || { meta: {}, records: [], universities: {} };

  let listingRecords;
  try {
    listingRecords = await fetchListingImpl();
  } catch (error) {
    /* Retain the last positively synced dataset; report staleness. */
    existing.meta = {
      ...existing.meta,
      lastSyncAt: now.toISOString(),
      lastSyncError: error.message,
      stale: true,
    };
    saveDatasetStore(existing);
    return { ok: false, stale: true, error: error.message, retainedRecords: existing.records.length };
  }

  const syncedAt = now.toISOString();
  const previousUniversities = existing.universities || {};
  const next = {
    meta: {
      ...existing.meta,
      source: apiBase(),
      lastSyncAt: syncedAt,
      lastSyncError: "",
      stale: false,
      listingCount: listingRecords.length,
    },
    records: [],
    universities: {},
  };

  /* Existing records keyed by university to avoid duplication; removed
     universities are deactivated, not deleted. */
  const keptByUniversity = new Map();
  (existing.records || []).forEach((record) => {
    if (record?.isActive && record?.universityId)
      keptByUniversity.set(record.universityId, (keptByUniversity.get(record.universityId) || []).concat([record]));
  });

  /* Detail refresh budget: prioritize universities that are new, whose
     listing content changed since the last sync, or that have never had a
     successful detail sync (progressive catch-up); `forceAll` refreshes everything. */
  const detailQueue = [];
  listingRecords.forEach((raw) => {
    const slug = cleanText(raw.slug || raw._id || raw.id);
    if (!slug) return;
    const listingHash = sha1(JSON.stringify(raw));
    const prior = previousUniversities[slug];
    if (forceAll || !prior || prior.listingHash !== listingHash || !prior.detailSyncedAt) {
      next.universities[slug] = { ...prior, name: cleanText(raw.collegeName), listingHash, updatedAt: syncedAt };
      detailQueue.push(slug);
    } else {
      next.universities[slug] = prior;
    }
  });

  /* Every university always receives listing-level knowledge records; the
     detail budget only decides which universities get detail enrichment. */
  for (const raw of listingRecords) {
    const slug = cleanText(raw.slug || raw._id || raw.id);
    if (!slug || keptByUniversity.has(slug) === false) {
      const listingBundle = { slug, listing: raw, detail: null, courses: [], dataSource: "degreefyd university API (b2c)", syncedAt };
      keptByUniversity.set(slug, mergeRecords(keptByUniversity.get(slug) || [], buildKnowledgeRecords(listingBundle)));
    }
  }

  let detailFetchCount = 0;
  for (const slug of detailQueue) {
    if (detailLimit && detailFetchCount >= detailLimit) break;
    const raw = listingRecords.find((r) => cleanText(r.slug || r._id || r.id) === slug);
    try {
      const detail = await fetchCollegeDetailImpl(slug);
      await sleep(150);
      let courses = [];
      const collegeMeta = detail?.college_id || detail;
      const collegeId = collegeMeta?._id || collegeMeta?.id || "";
      if (collegeId) {
        try {
          courses = await fetchCollegeCoursesImpl(collegeId);
        } catch {
          courses = [];
        }
      }
      next.universities[slug] = {
        ...next.universities[slug],
        detailHash: sha1(JSON.stringify(detail).slice(0, 8000)),
        detailSyncedAt: syncedAt,
      };
      const bundle = { slug, listing: raw, detail, courses, dataSource: "degreefyd university API (b2c)", syncedAt };
      keptByUniversity.set(slug, mergeRecords(keptByUniversity.get(slug) || [], buildKnowledgeRecords(bundle)));
      detailFetchCount++;
    } catch (error) {
      /* Detail fetch failure: keep listing-level facts only, never overwrite good data with empty values. */
      console.warn(`Detail sync failed for ${slug}: ${error.message}`);
    }
  }

  /* Universities no longer returned by the API are deactivated. */
  const activeSlugs = new Set(detailQueue.concat(Object.keys(previousUniversities)));
  [ ...keptByUniversity.keys() ].forEach((slug) => {
    if (!listingRecords.some((r) => cleanText(r.slug || r._id || r.id) === slug)) {
      keptByUniversity.get(slug).forEach((record) => {
        if (record.slug === slug) record.isActive = false;
      });
    }
  });

  next.records = [ ...keptByUniversity.values() ].flat();
  next.meta.recordCount = next.records.length;
  next.meta.activeRecordCount = next.records.filter((r) => r.isActive).length;

  saveDatasetStore(next);
  return {
    ok: true,
    stores: next.meta.listingCount,
    universities: Object.keys(next.universities).length,
    records: next.meta.recordCount,
    activeRecords: next.meta.activeRecordCount,
    detailsFetched: detailFetchCount,
    stale: false,
  };
}

function loadDatasetStore() {
  try {
    if (fs.existsSync(datasetPathOverride || DATASET_PATH)) {
      return JSON.parse(fs.readFileSync(datasetPathOverride || DATASET_PATH, "utf8"));
    }
  } catch (error) {
    console.error("Failed to read chatbot dataset:", error.message);
  }
  return null;
}

function saveDatasetStore(store) {
  fs.mkdirSync(path.dirname(datasetPathOverride || DATASET_PATH), { recursive: true });
  fs.writeFileSync(datasetPathOverride || DATASET_PATH, JSON.stringify(store, null, 1), "utf8");
}

/* Test hook: point the store at a temporary file for regression tests. */
export function setDatasetPathForTesting(testPath) {
  datasetPathOverride = testPath || "";
}

/* ------------------------------------------------------------ retrieval */

const STOP_WORDS = new Set(["a", "an", "the", "and", "or", "for", "of", "in", "on", "to", "is", "are", "what", "which", "how", "i", "me", "my", "can", "you", "it", "at", "be", "do", "does", "tell", "give", "about", "with", "should", "there", "university", "universities", "online", "institute", "education", "distance", "program", "programs", "programme", "programmes", "study", "studies"]);

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9₹. ]+/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t && !STOP_WORDS.has(t) && t.length > 1);
}

export function detectIntent(query) {
  const q = query.toLowerCase();
  if (INTENT_KEYWORDS.compare.test(q)) return "compare";
  const scored = Object.entries(INTENT_KEYWORDS)
    .map(([intent, re]) => [intent, (q.match(new RegExp(re.source, "gi")) || []).length])
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);
  return scored[0]?.[0] || "general";
}

const UNIVERSITY_ALIASES = {
  lpu: "lovely professional university",
  "lovely professional": "lovely professional university",
  cu: "chandigarh university",
  chandigarh: "chandigarh university",
  amity: "amity university online",
  manipal: "manipal university online",
  jain: "jain university online",
  upes: "upes online",
};

const normalizeUniKey = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/* Resolve universities mentioned in a query. Distinguishes similarly named
   universities (e.g. LPU Online vs LPU Distance Education) and prefers the
   learning-mode variants this portal lists. */
export function matchUniversities(dataset, query, limit = 3) {
  const q = normalizeUniKey(query);
  const universities = dataset.universities || {};
  const entries = Object.entries(universities).map(([slug, meta]) => ({
    slug,
    normalizedName: normalizeUniKey(meta.name),
  }));

  const scoreBySlug = new Map();
  const bump = (slug, score) => scoreBySlug.set(slug, Math.max(scoreBySlug.get(slug) || 0, score));

  for (const [alias, fragment] of Object.entries(UNIVERSITY_ALIASES)) {
    if (new RegExp(`\\b${alias.replace(/ /g, "\\s+")}\\b`, "i").test(query)) {
      const fragmentTokens = fragment.split(" ");
      for (const { slug, normalizedName } of entries) {
        if (!normalizedName) continue;
        if (normalizedName === fragment) bump(slug, 120);
        else if (normalizedName.startsWith(fragment)) bump(slug, 100);
        else if (normalizedName.includes(fragment)) bump(slug, 80);
        else {
          const nameTokens = normalizedName.split(" ");
          if (fragmentTokens.every((t) => nameTokens.includes(t))) bump(slug, 70);
        }
      }
    }
  }

  for (const { slug, normalizedName } of entries) {
    if (!normalizedName) continue;
    if (q.includes(normalizedName)) bump(slug, 100);
    else {
      const nameTokens = new Set(normalizedName.split(" "));
      const qTokens = tokenize(query);
      const hits = [...new Set(qTokens.filter((token) => nameTokens.has(token) && token.length >= 4))];
      if (hits.length) bump(slug, hits.length * 20);
    }
  }

  /* Prefer online-mode listings over distance-education twins of the same brand. */
  for (const { slug, normalizedName } of entries) {
    if (/online/.test(normalizedName) || /online/.test(normalizeUniKey(slug))) {
      const current = scoreBySlug.get(slug);
      if (current) scoreBySlug.set(slug, current + 25);
    }
  }

  return [...scoreBySlug.entries()]
    .map(([slug, score]) => ({ slug, name: (universities[slug] || {}).name || slug, score }))
    .sort((a, b) => b.score - a.score)
    .filter((match, index, all) => {
      /* An unambiguous brand mention (score >= 100) wins outright; a compare
         request keeps 2 strong matches; otherwise only reasonably strong
         candidates (>= 60) may answer. */
      const top = all[0];
      if (top.score >= 100) {
        if (INTENT_KEYWORDS.compare.test(query)) return match.score >= 100 && index < 2;
        return index === 0;
      }
      return match.score >= 60;
    })
    .slice(0, limit);
}

export function searchRecords(dataset, { query, intent, universities }) {
  const records = (dataset.records || []).filter((r) => r && r.isActive);
  const qTokens = tokenize(query);
  const scored = [];

  /* Light plural stemming so "fee"/"fees" and "course"/"courses" match. */
  const stem = (token) => (token.length > 3 && token.endsWith("s") ? token.slice(0, -1) : token);
  const qStems = new Set(qTokens.map(stem));

  for (const record of records) {
    /* University match: when specific universities are requested, keep only
       their records; otherwise every record is retrievable. */
    if (universities?.length) {
      const match = universities.some((u) => u.slug === record.universityId);
      if (!match && intent !== "general") continue;
    }

    let score = 0;
    const recTokens = tokenize(`${record.question} ${record.universityName}`);
    const recStems = new Set(recTokens.map(stem));
    const answerStems = new Set(tokenize(record.answer).map(stem));
    for (const stem of qStems) {
      if (recStems.has(stem)) score += 3;
      else if (answerStems.has(stem)) score += 1;
    }
    const categories = CATEGORY_OF_INTENT[intent] || [];
    if (categories.includes(record.category)) score += 2;

    /* Without an identified brand, require some substantive overlap; brand
       context makes single-word follow-ups ("fees?") retrievable. */
    const minScore = universities?.length ? 1 : 6;
    if (score >= minScore) scored.push({ record, score });
  }

  scored.sort((a, b) => b.score - a.score);

  /* Prefer a balanced mix: strongest matches first, then fill with general facts. */
  const selected = [];
  const seen = new Set();
  for (const { record } of scored) {
    if (selected.length >= RETRIEVAL_LIMIT) break;
    if (seen.has(record.id)) continue;
    seen.add(record.id);
    selected.push(record);
  }
  return selected;
}

/* ---------------------------------------------------------- answer logic */

function formatRecordFacts(records) {
  return records
    .map((record, index) => {
      const uni = record.universityName || "Unknown university";
      return `[${index + 1}] (${uni} | ${record.category} | source: ${record.sourceUrl})\nQ: ${record.question}\nA: ${record.answer}`;
    })
    .join("\n\n");
}

function buildSystemInstruction(records, dataset, intent) {
  const syncedAt = dataset.meta?.lastSyncAt || "unknown";
  const policy = `You are the Siksha Advisor — the admissions assistant for Online Siksha, an online-university guidance portal for UGC-DEB entitled online degrees in India.

CONTEXTUAL / STRICT DATASET USE:
- Answer strictly from the VERIFIED FACTS below, which were retrieved from the university database (last synchronized: ${syncedAt}).
- If a fact (fee, deadline, eligibility requirement, approval body, or course availability) is not present in those facts, explicitly say you do not have verified information and point the student to the university's detail page or its official website. NEVER invent or guess values.
- Ambient context from the conversation (previous assistant answers) may shape tone and follow-ups, but numbers must come only from the VERIFIED FACTS.
- When multiple facts concern different universities, label clearly which university each statement belongs to.
- Comparison requests (intent: ${intent}): compare only attributes present in the retrieved facts (fees, accreditations, placements, courses). Refuse to compare values that are not in the facts and say so.
- Records marked "Fee details not published" or similar mean the value is NOT available — report it as unavailable rather than suggesting a number.
- Formatting: concise bullet points, bold key numbers; stay friendly and student-first; for enrollment nudge students to click Apply Online or ask for the free counsellor callback.`;
  return `${policy}\n\nVERIFIED FACTS (${records.length} records retrieved):\n${records.length
    ? formatRecordFacts(records)
    : "(No records retrieved for this question. Say you could not find verified information.)"}`;
}

/* Grounded, no-hallucination template answer when the AI model is unavailable. */
function templateAnswer(query, { intent, universities, records, dataset }) {
  if (!records.length) {
    const total = dataset.meta?.listingCount || 0;
    const names = Object.values(dataset.universities || {})
      .map((u) => u.name)
      .filter(Boolean)
      .slice(0, 6);
    return {
      text: `I don't have verified information for this in the university database.\n\nYou can ask me about the ${total} online universities listed on Online Siksha, such as:\n- ${names.join("\n- ")}\n\nFor official university-specific details, always check the university's admission page or university's official website.`,
      suggestions: contextualSuggestions({ intent: "general", universities: [], records: [], dataset }),
    };
  }

  const fields = ["fees", "courses", "eligibility", "admission", "deadlines", "scholarships", "placements", "accreditation", "exams", "lms"];
  const lines = [];
  let mention = "";
  if (universities.length === 1) {
    const meta = (dataset.universities || {})[universities[0].slug] || {};
    mention = `Here is what I have for **${meta.name || universities[0].slug}** (synced: ${
      (dataset.meta?.lastSyncAt || "").slice(0, 10) || "unknown"
    }):\n`;
  } else if (universities.length > 1) {
    mention = `Here is a comparison across the universities I could match:\n`;
  }

  for (const record of records.slice(0, 5)) {
    const answerLines = String(record.answer)
      .split("\n")
      .filter(Boolean)
      .slice(0, 8);
    lines.push(
      `- **${record.universityName}** (${record.category}):\n  ${answerLines.join("\n  ")}\n  source: ${record.sourceUrl}`
    );
  }

  const caveats = `*${
    dataset.meta?.stale
      ? `Notice: the last synchronization had an issue (recorded: ${dataset.meta?.lastSyncAt || "unknown"}), so some values may be outdated.`
      : `Data last verified from the university database on ${(dataset.meta?.lastSyncAt || "").slice(0, 10) || "unknown"}.`
  }*\nSometimes a specific value isn't published; based on what I have, I'll say so rather than guess.`;

  return {
    text: `${mention}${lines.join("\n")}\n\n${caveats}`,
    suggestions: contextualSuggestions({ intent, universities, records, dataset }),
  };
}

const FOLLOW_UPS_BASE = {
  fees: ["What courses does this university offer?", "Are scholarships available?", "Is this university recognized?", "How can I apply?", "Can you compare it with another university?"],
  courses: ["What is the eligibility?", "What is the fee?", "What is the admission process?", "Is this university recognized?"],
  eligibility: ["What is the admission process?", "What are the fees?", "What other courses are offered?"],
  admission: ["What are the important dates?", "What documents are required?", "What is the eligibility?", "What are the fees?"],
  deadlines: ["What is the admission process?", "What are the fees?", "Are scholarships available?"],
  scholarships: ["What are the fees?", "What is the eligibility?", "What courses are offered?"],
  placements: ["Which courses have the best placements?", "What are the fees?", "Is the university recognized?"],
  accreditation: ["Which courses does this university offer?", "What are the fees?", "How can I apply?"],
  exams: ["What is the admission process?", "Can I apply online?", "What are the fees?"],
  lms: ["What courses does this university offer?", "What are the fees?", "How can I apply?"],
  contact: ["Which courses does this university offer?", "What are the fees?", "How can I apply?"],
  overview: ["Which courses does this university offer?", "What are the fees?", "Is the university recognized?", "How can I apply?"],
  compare: ["Which university has lower fees?", "How do their eligibility requirements differ?", "What other information should I compare?"],
  general: ["Which online universities are available?", "Which universities offer online MBA programs?", "What should I check before enrolling?"],
};

const STATIC_POLICY_SUGGESTIONS = new Set([
  "Are scholarships available?",
  "How do their eligibility requirements differ?",
  "Which university has lower fees?",
]);

/* Contextual suggestions grounded in the dataset: a follow-up is offered only
   when the matched university's records can actually answer it. */
export function contextualSuggestions({ intent, universities, records, dataset }) {
  const base = FOLLOW_UPS_BASE[intent] || FOLLOW_UPS_BASE.general;
  const activeRecords = (dataset?.records || []).filter((r) => r && r.isActive);
  const dataPresent = new Set(activeRecords.map((r) => r.category));

  if (universities?.length) {
    const uniSlugs = new Set(universities.map((u) => u.slug));
    const uniCategories = new Set(activeRecords.filter((r) => uniSlugs.has(r.universityId)).map((r) => r.category));
    const retrieved = new Set((records || []).map((r) => r.category));
    /* Union: retrieved categories from this answer plus full capability of the matched university. */
    dataPresent.clear();
    uniCategories.forEach((c) => dataPresent.add(c));
    retrieved.forEach((c) => dataPresent.add(c));
    if (universities.length > 1) {
      /* Comparisons need the attribute on at least one side to be discussable. */
      activeRecords.forEach((r) => {
        if (uniSlugs.has(r.universityId)) dataPresent.add(r.category);
      });
    }
  }
  const out = [];

  for (const suggestion of base) {
    if (out.length >= 5) break;
    if (out.some((existing) => existing.toLowerCase() === suggestion.toLowerCase())) continue;

    if (/scholarship/i.test(suggestion) && !dataPresent.has("scholarships")) continue;
    if (/deadlines|dates/i.test(suggestion) && !dataPresent.has("deadlines")) continue;
    if (/exam/i.test(suggestion) && !dataPresent.has("exams")) continue;
    if (/eligib/i.test(suggestion) && !dataPresent.has("eligibility") && !dataPresent.has("admission")) continue;
    if (/placement/i.test(suggestion) && !dataPresent.has("placements")) continue;
    if (/fee/i.test(suggestion) && intent !== "fees" && !dataPresent.has("fees")) continue;
    if (/recogn/i.test(suggestion) && !dataPresent.has("accreditation")) continue;
    if (/courses? does this univer/i.test(suggestion) && !dataPresent.has("courses")) continue;
    if (/lower fees/i.test(suggestion) && !dataPresent.has("fees")) continue;
    out.push(suggestion);
  }
  return out;
}

export function suggestInitialQuestions(dataset) {
  const starterPool = [...INITIAL_SUGGESTIONS];
  if (dataset.meta?.listingCount) {
    starterPool.splice(0, 1, { label: "Universities", prompt: `Which online universities are available? (there are ${dataset.meta.listingCount} listed)` });
  }
  return starterPool.slice(0, 6).map((s) => s.prompt);
}

/* --------------------------------------------------------------- answer */

export async function answerChat({ messages, dataset, modelChoice, aiFactory }) {
  const history = messages.slice(-MAX_HISTORY_MESSAGES);
  const lastUser = [ ...history ].reverse().find((m) => m.role === "user");
  const query = lastUser?.text || "";

  const activeDataset = dataset || loadDatasetStore() || { meta: { listingCount: 0 }, records: [], universities: {} };

  /* Recent university context: prefer current question, fall back to the
     previous message when the user asks a follow-up ("what about fees?"). */
  let universities = matchUniversities(activeDataset, query);
  if (!universities.length) {
    const earlierUser = [ ...history ].reverse().slice(1).find((m) => m.role === "user");
    if (earlierUser) universities = matchUniversities(activeDataset, earlierUser.text || "");
  }

  const intent = detectIntent(query);
  const records = searchRecords(activeDataset, { query, intent, universities });

  const freshnessNote = activeDataset.meta?.stale
    ? `Note: the university database could not be refreshed at the last attempt (${activeDataset.meta.lastSyncAt || "unknown"}), so some answers may reflect older verified information.`
    : "";

  let text;
  if (process.env.GEMINI_API_KEY && aiFactory) {
    const ai = aiFactory();
    const contents = history.map((m) => ({
      role: m.role === "model" || m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const modelCall = ai.models.generateContent({
      model: modelChoice === "gemini-3.1-flash-lite" ? "gemini-3.1-flash-lite" : "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: buildSystemInstruction(records, activeDataset, intent),
        temperature: 0.35,
      },
    });

    const response = await Promise.race([
      modelCall,
      new Promise((_, reject) => setTimeout(() => reject(new Error("AI model timed out")), MODEL_TIMEOUT_MS)),
    ]);

    text = response.text || "";
    if (!text) {
      const fallback = templateAnswer(query, { intent, universities, records, dataset: activeDataset });
      text = fallback.text;
    }
  } else {
    const fallback = templateAnswer(query, { intent, universities, records, dataset: activeDataset });
    text = fallback.text;
  }

  const suggestions = contextualSuggestions({ intent, universities, records, dataset: activeDataset });
  const sources = [ ...new Set(records.map((r) => r.sourceUrl)) ].slice(0, 3).map((url) => url);

  return { text: text || "Please rephrase your question — I did not find any verified information yet.", suggestions, sources, dataNote: freshnessNote };
}

export function datasetStatusOf() {
  const store = loadDatasetStore();
  if (!store) return { synced: false, stale: true, recordCount: 0 };
  return {
    synced: Boolean(store.meta?.lastSyncAt),
    stale: Boolean(store.meta?.stale) || !store.meta?.lastSyncAt,
    lastSyncAt: store.meta?.lastSyncAt || "",
    lastSyncError: store.meta?.lastSyncError || "",
    listingCount: store.meta?.listingCount || 0,
    recordCount: (store.records || []).length,
    activeRecordCount: (store.records || []).filter((r) => r?.isActive).length,
  };
}

export { DATASET_PATH, INTENTS };
