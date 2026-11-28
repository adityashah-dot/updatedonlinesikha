import { UNIVERSITY_PAGE_SIZE as LISTING_PAGE_SIZE } from "./universityPagination.js";

const API_URL =
  import.meta.env?.VITE_API_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_API_URL : undefined) ||
  "https://api.degreefyd.com/api/b2c";

const TONES = ["blue", "indigo", "emerald", "amber"];

export const LEARNING_MODES = ["online", "distance"];

const LEARNING_MODE_SET = new Set(LEARNING_MODES);

export function isLearningMode(mode) {
  return LEARNING_MODE_SET.has(String(mode || "").trim().toLowerCase());
}

function modeLabel(mode) {
  switch (String(mode || "").toLowerCase()) {
    case "online":
      return "100% Online";
    case "distance":
      return "Distance Learning";
    case "hybrid":
      return "Online + Distance";
    default:
      return "";
  }
}

function buildHeaders() {
  return { Accept: "application/json" };
}

function readImage(value) {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    if (Array.isArray(value)) return readImage(value[0]);
    return value.url || value.src || value.path || "";
  }

  return "";
}

/** "₹80K", "₹1.6L", "₹14.3L", "₹1.2Cr" — one consistent compact style. */
export function compactRupees(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "";
  const trim = (x) => String(Number(x.toFixed(1)));
  if (n >= 1e7) return `₹${trim(n / 1e7)}Cr`;
  if (n >= 1e5) return `₹${trim(n / 1e5)}L`;
  return `₹${Math.round(n / 1000)}K`;
}

/** Zero means "not provided" in the CMS, so it never prints as ₹0. Returns "" when unknown. */
function formatFeeRange(record) {
  const toFee = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  const min = toFee(record.minFee ?? record.minimumFee);
  const max = toFee(record.maxFee ?? record.maximumFee);
  if (min && max && min !== max) return `${compactRupees(Math.min(min, max))} – ${compactRupees(Math.max(min, max))}`;
  if (min || max) return compactRupees(min || max);
  return "";
}

/* ---------- Data clean-up for CMS listing records ---------- */

const APPROVAL_ALIASES = [
  [/^naac\s*(grade\s*)?a\s*\+\s*\+$/i, "NAAC A++"],
  [/^naac\s*(grade\s*)?a\s*\+$/i, "NAAC A+"],
  [/^naac\s*(grade\s*)?a$/i, "NAAC A"],
  [/^naac\s*(grade\s*)?b\s*\+\s*\+$/i, "NAAC B++"],
  [/^naac\s*(grade\s*)?b\s*\+$/i, "NAAC B+"],
  [/^(ugc[\s-]*deb|deb|ugc[\s-]*entitled.*)$/i, "UGC-DEB"],
];

/** Trims, fixes spelling variants ("NAAC A ++"), dedupes and drops meaningless bare tags. */
export function normalizeApprovals(list) {
  const seen = new Set();
  const out = [];
  for (const raw of Array.isArray(list) ? list : []) {
    let name = String(raw || "").replace(/\s+/g, " ").trim();
    if (!name) continue;
    for (const [pattern, canonical] of APPROVAL_ALIASES) {
      if (pattern.test(name)) { name = canonical; break; }
    }
    if (/^nirf$/i.test(name)) continue; // a bare "NIRF" tag says nothing about the rank
    const key = name.toUpperCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(name);
  }
  // Drop a bare "NAAC" when a graded NAAC tag is present.
  if (out.some((a) => /^NAAC [AB]/.test(a))) return out.filter((a) => a !== "NAAC");
  return out;
}

/** The CMS tags several open/distance institutions as "online"; detect them by name. */
export function isDistanceInstitution(name) {
  return /open university|distance (education|learning)|\b(cdoe|sde|idol|dde)\b|directorate of distance|centre for distance|center for distance/i.test(String(name || ""));
}

/** Clean NIRF rank (1–300) or null. Ranges like "101-150" and open universities are excluded. */
function cleanNirfRank(value, name) {
  const str = String(value ?? "").trim();
  if (!/^\d{1,3}$/.test(str) || isDistanceInstitution(name)) return null;
  const n = Number(str);
  return n >= 1 && n <= 300 ? n : null;
}

/**
 * The CMS stores packages in mixed units (rupees, LPA, and ambiguous small numbers).
 * Only return a value when the unit is clear; otherwise hide it.
 */
function plausiblePackage(value) {
  if (value == null || value === "") return "";
  if (typeof value === "string" && /lpa|cr|crore|aud/i.test(value)) return formatPackage(value);
  const n = Number(String(value).replace(/[,₹\s]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n >= 100000) return `₹${Number((n / 100000).toFixed(1))} LPA`;
  if (n >= 3 && n <= 100) return `₹${n} LPA`;
  if (HYPHEN_STRIPPED_PACKAGES[n]) return HYPHEN_STRIPPED_PACKAGES[n];
  return "";
}

const HYPHEN_STRIPPED_PACKAGES = {
  520: "\u20B95 \u2013 20 LPA",
  610: "\u20B96 \u2013 10 LPA",
  810: "\u20B98 \u2013 10 LPA",
  1215: "\u20B912 \u2013 15 LPA",
  1620: "\u20B916 \u2013 20 LPA",
  3035: "\u20B930 \u2013 35 LPA",
};

export function formatPackage(value) {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value !== "string" && typeof value !== "number") return "";

  const str = String(value).trim();
  if (!str) return "";

  if (/aud/i.test(str) || str === "80000100000") {
    return "AUD 80K \u2013 100K";
  }

  if (/[-–]/.test(str) && /lpa|cr|crore/i.test(str)) {
    const nums = str.match(/\d+(?:\.\d+)?/g);
    if (nums && nums.length >= 2) {
      const unit = /cr|crore/i.test(str) ? "Cr" : "LPA";
      return `\u20B9${nums[0]} \u2013 ${nums[1]} ${unit}`;
    }
  }

  if (/cr|crore/i.test(str)) {
    const numMatch = str.match(/\d+(?:\.\d+)?/);
    return numMatch ? `\u20B9${numMatch[0]} Cr` : str;
  }

  const cleanNumStr = str.replace(/[,₹\s]/g, "").replace(/lpa?|inr/gi, "");
  const numeric = Number(cleanNumStr);

  if (!Number.isFinite(numeric) || numeric <= 0) return "";

  if (HYPHEN_STRIPPED_PACKAGES[numeric]) {
    return HYPHEN_STRIPPED_PACKAGES[numeric];
  }

  if (numeric > 0 && numeric < 3) {
    return `\u20B9${numeric} Cr`;
  }

  if (numeric >= 100000) {
    const lakhs = Number((numeric / 100000).toFixed(2));
    return `\u20B9${lakhs} LPA`;
  }

  return `\u20B9${numeric} LPA`;
}

function formatFee(value) {
  if (value === null || value === undefined || value === "") return "";

  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0
    ? `\u20B9${numeric.toLocaleString("en-IN")}`
    : "";
}

/** Guards against "[object Object]" leaking into UI strings. */
function readText(value) {
  if (typeof value === "string") return value.trim();

  if (typeof value === "number" && Number.isFinite(value)) return String(value);

  if (value == null) return "";

  return "";
}

function readApprovals(record) {
  const accreditations = record.accreditations || [];

  if (Array.isArray(accreditations)) {
    return accreditations
      .map((item) => (typeof item === "string" ? item : item?.name))
      .filter(Boolean)
      .flatMap((name) => String(name).split(",").map((part) => part.trim()))
      .filter(Boolean);
  }

  return [];
}

export function mapUniversity(recordRaw, index = 0) {
  const record = recordRaw || {};
  const name = record.collegeName || record.name || record.title || "University";
  const short =
    record.collegeShortName || record.short || record.shortName || name.slice(0, 3).toUpperCase();
  const rawMode = String(record.collegeMode || "").toLowerCase();
  const mode = rawMode === "online" && isDistanceInstitution(name) ? "distance" : rawMode;
  const nirfRank = cleanNirfRank(record.nirfRanking, name);

  const approvals = normalizeApprovals(readApprovals(record));
  const rawMinFee = record.minFee == null || record.minFee === "" ? null : Number(record.minFee);
  const rawMaxFee = record.maxFee == null || record.maxFee === "" ? null : Number(record.maxFee);
  const minFee = Number.isFinite(rawMinFee) && rawMinFee > 0 ? rawMinFee : null;
  const maxFee = Number.isFinite(rawMaxFee) && rawMaxFee > 0 ? rawMaxFee : null;

  const feeRange = formatFeeRange(record);
  const feeLabel = minFee != null && maxFee != null && minFee !== maxFee
    ? `${formatFee(minFee)} - ${formatFee(maxFee)}`
    : formatFee(minFee ?? maxFee);

  const specs = [];

  if (mode) {
    specs.push({ label: "Course Mode", value: modeLabel(mode) || record.collegeMode });
  }
  const coursesCount =
    record.coursesCount ?? (record.counts ? parseInt(record.counts, 10) : null);
  if (coursesCount != null && !Number.isNaN(coursesCount)) {
    specs.push({ label: "Programs", value: `${coursesCount} Courses` });
  }
  const highestCtcFormatted = plausiblePackage(record.highestPackage);
  if (highestCtcFormatted) {
    specs.push({ label: "Highest package", value: highestCtcFormatted, highlight: true });
  }
  const established = readText(record.established);
  if (established) {
    specs.push({ label: "Established", value: established });
  }

  const naac = approvals.find((approval) => /^NAAC [AB]/.test(approval)) || "";

  const slug = record.slug || "";

  return {
    id: slug || record._id || record.id || `university-${index}`,
    slug,
    name,
    short,
    logoImage: readImage(record.collegeLogo || record.logo || record.collegeImage),
    campusImage: readImage(record.collegeImage || record.collegeLogo),
    location: record.collegeLocation || record.location || "",
    established: readText(record.established),
    rankNote: nirfRank ? `NIRF #${nirfRank}` : "",
    nirfRank,
    highestPackageLabel: highestCtcFormatted,
    naac,
    approvals,
    accreditations: approvals,
    feeLabel,
    feeRange,
    minFee,
    maxFee,
    highestPackage: record.highestPackage || 0,
    placementHighest: record.placementHighest || 0,
    collegeMode: mode,
    coursesCount: coursesCount ?? null,
    emi: "",
    specs,
    tracks: [],
    highlight: {
      text:
        mode === "online"
          ? "Online Mode"
          : mode === "distance"
            ? "Distance Learning"
            : mode === "hybrid"
              ? "Online + Distance"
              : "Verified 2026",
      tone: TONES[index % TONES.length],
    },
    isLpu: slug === "lovely-professional-university-online",
  };
}

function splitLocation(location) {
  const parts = String(location || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) return { city: "", state: "" };

  return {
    city: parts[parts.length - 1],
    state: parts.length > 1 ? parts[parts.length - 2] : "",
  };
}

const ACCENT_BY_TONE = {
  blue: "#12417a",
  indigo: "#4c1d95",
  emerald: "#0b6b5c",
  amber: "#b45309",
};

const GRADIENT_BY_TONE = {
  blue: "from-blue-600 to-indigo-800",
  indigo: "from-indigo-600 to-violet-800",
  emerald: "from-emerald-600 to-teal-800",
  amber: "from-amber-600 to-amber-800",
};

export function mapFeaturedUniversities(universities) {
  return (universities || []).map((university) => {
    const rows = [];
    const { city, state } = splitLocation(university.location);

    if (university.feeLabel) {
      rows.push({ label: "Total Course Fee:", value: university.feeLabel });
    }
    if (university.coursesCount) {
      rows.push({ label: "Programmes:", value: `${university.coursesCount} Courses` });
    }
    if (university.collegeMode) {
      rows.push({
        label: "Course Mode:",
        value: modeLabel(university.collegeMode) || university.collegeMode,
      });
    }
    if (university.established) {
      rows.push({ label: "Established:", value: readText(university.established) });
    }
    if (university.highestPackage) {
      rows.push({
        label: "Highest Package:",
        value: formatPackage(university.highestPackage),
        tone: "text-brand-600 font-semibold",
      });
    }

    return {
      id: university.id,
      slug: university.slug,
      name: university.name,
      short: university.short,
      logoImage: university.logoImage,
      naac: university.naac,
      rank: university.rankNote,
      location: university.location,
      city,
      state,
      feeLabel: university.feeLabel,
      minFee: university.minFee,
      coursesCount: university.coursesCount,
      mode: modeLabel(university.collegeMode) || university.collegeMode || "",
      established: readText(university.established),
      highestPackage: university.highestPackage ? formatPackage(university.highestPackage) : "",
      rows,
    };
  });
}

export function mapLocationColleges(universities) {
  return (Array.isArray(universities) ? universities : []).map((universityRaw) => {
    const university = universityRaw || {};
    const { city, state } = splitLocation(university.location);
    const tone = university.highlight?.tone || "blue";
    const logoSource = university.short || university.name || "";

    return {
      id: university.id,
      slug: university.slug,
      name: university.name,
      city,
      state,
      locationCategory: city,
      nirf: university.rankNote,
      courses: university.coursesCount ? `${university.coursesCount} courses` : "",
      rating: "",
      totalFees: university.feeLabel,
      logoImage: university.logoImage,
      logoLetter: String(logoSource).slice(0, 2).toUpperCase(),
      logoColor: GRADIENT_BY_TONE[tone] || GRADIENT_BY_TONE.blue,
    };
  });
}

export function mapCompareColleges(universities) {
  return (Array.isArray(universities) ? universities : []).map((universityRaw) => {
    const university = universityRaw || {};
    const tone = university.highlight?.tone || "blue";

    return {
      key: university.slug || university.id,
      slug: university.slug,
      name: university.name,
      short: university.short,
      logo: university.logoImage,
      accent: ACCENT_BY_TONE[tone] || ACCENT_BY_TONE.blue,
      loc: university.location,
      fee: university.minFee || 0,
      rank: university.rankNote,
      mode: modeLabel(university.collegeMode) || university.collegeMode,
      approvals: (university.approvals || []).join(", "),
      place: university.highestPackage ? formatPackage(university.highestPackage) : "",
    };
  });
}

function extractUniversities(result) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.universities)) return result.universities;
  if (Array.isArray(result.onlineUniversities)) return result.onlineUniversities;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.suggestedColleges)) return result.suggestedColleges;
  if (result.data) return extractUniversities(result.data);
  return [];
}


/** First finite number from values like "INR 8-10 LPA" / "₹1,50,000". */
function firstNumber(value) {
  const match = String(value ?? "").match(/[\d.]+/);
  if (!match) return null;
  const number = Number(match[0]);
  return Number.isFinite(number) && number > 0 ? number : null;
}

/* Client-side sorters applied to the FULL mapped list, before the page
   slice — so sorting is never just a re-ordering of the visible 10. */
const byName = (a, b) => String(a.name).localeCompare(String(b.name));
const LISTING_SORTS = {
  // Online first, then UGC-DEB entitled (valid online degrees), then published fees, then NIRF rank.
  recommended: {
    compare: (a, b) =>
      (a.collegeMode === "online" ? 0 : 1) - (b.collegeMode === "online" ? 0 : 1) ||
      (a.approvals.includes("UGC-DEB") ? 0 : 1) - (b.approvals.includes("UGC-DEB") ? 0 : 1) ||
      (a._fee === Number.MAX_SAFE_INTEGER) - (b._fee === Number.MAX_SAFE_INTEGER) ||
      a._nirf - b._nirf ||
      byName(a, b),
  },
  nirf: {
    compare: (a, b) => a._nirf - b._nirf || a._fee - b._fee || byName(a, b),
  },
  lowestFee: {
    compare: (a, b) => a._fee - b._fee || byName(a, b),
  },
  highestFee: {
    compare: (a, b) => (b._fee === Number.MAX_SAFE_INTEGER ? -1 : b._fee) - (a._fee === Number.MAX_SAFE_INTEGER ? -1 : a._fee) || byName(a, b),
  },
};

function withSortKeys(university) {
  return {
    ...university,
    _nirf: university.nirfRank ?? Number.MAX_SAFE_INTEGER,
    _fee: firstNumber(university.minFee ?? university.maxFee) ?? Number.MAX_SAFE_INTEGER,
  };
}

export function sortUniversities(universities, sortId) {
  const sort = LISTING_SORTS[sortId] || LISTING_SORTS.recommended;
  return (Array.isArray(universities) ? universities : [])
    .map(withSortKeys)
    .sort(sort.compare)
    .map(({ _nirf, _fee, ...university }) => university);
}

/* ---------- Listing filters (applied before pagination) ---------- */

export const FEE_BANDS = [
  { id: "under1", label: "Under ₹1L", test: (fee) => fee < 100000 },
  { id: "1to2", label: "₹1L – ₹2L", test: (fee) => fee >= 100000 && fee < 200000 },
  { id: "2to3", label: "₹2L – ₹3L", test: (fee) => fee >= 200000 && fee < 300000 },
  { id: "above3", label: "₹3L and above", test: (fee) => fee >= 300000 },
];

export const APPROVAL_FILTERS = ["UGC-DEB", "AICTE", "AIU", "WES"];
export const NAAC_FILTERS = ["NAAC A++", "NAAC A+", "NAAC A"];
export const MODE_FILTERS = [
  { id: "online", label: "Online" },
  { id: "distance", label: "Distance" },
];

export const EMPTY_LISTING_FILTERS = { modes: [], approvals: [], naac: [], fee: [] };

const startingFee = (u) => u.minFee ?? u.maxFee ?? null;

const FILTER_TESTS = {
  modes: (u, values) => values.includes(u.collegeMode),
  approvals: (u, values) => values.every((v) => u.approvals.includes(v)),
  naac: (u, values) => values.includes(u.naac),
  fee: (u, values) => {
    const fee = startingFee(u);
    return fee != null && FEE_BANDS.some((band) => values.includes(band.id) && band.test(fee));
  },
};

export function countActiveFilters(filters = EMPTY_LISTING_FILTERS) {
  return Object.keys(FILTER_TESTS).reduce((n, key) => n + (filters[key]?.length || 0), 0);
}

function applyFilters(universities, filters, skipKey) {
  return universities.filter((u) =>
    Object.entries(FILTER_TESTS).every(([key, test]) => {
      const values = filters?.[key] || [];
      return key === skipKey || !values.length || test(u, values);
    })
  );
}

/** Per-option counts. Each group is counted with the OTHER groups applied, so numbers match what a click would show. */
function buildFacets(universities, filters) {
  const count = (key, predicate) => applyFilters(universities, filters, key).filter(predicate).length;
  return {
    modes: Object.fromEntries(MODE_FILTERS.map((m) => [m.id, count("modes", (u) => u.collegeMode === m.id)])),
    approvals: Object.fromEntries(APPROVAL_FILTERS.map((a) => [a, count("approvals", (u) => u.approvals.includes(a))])),
    naac: Object.fromEntries(NAAC_FILTERS.map((g) => [g, count("naac", (u) => u.naac === g)])),
    fee: Object.fromEntries(FEE_BANDS.map((band) => [band.id, count("fee", (u) => startingFee(u) != null && band.test(startingFee(u)))])),
  };
}

/* Fetched records are cached briefly so changing a filter or page doesn't refetch ~120 records. */
const LISTING_CACHE_MS = 5 * 60 * 1000;
const listingCache = new Map();

async function fetchListingByMode({ mode, search, signal }) {
  const params = new URLSearchParams({
    isCollgesNamesRequired: "true",
    isCollgesLocationsRequired: "true",
    mode,
    limit: "500",
  });

  if (search) {
    params.set("search", search);
  }

  const response = await fetch(`${API_URL}/website/colleges/listing?${params.toString()}`, {
    headers: buildHeaders(),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${mode} universities: ${response.status}`);
  }

  const result = await response.json();

  return extractUniversities(result);
}

export const LISTING_SORT_FIELDS = {
  recommended: "Recommended",
  nirf: "NIRF rank",
  lowestFee: "Lowest fee",
  highestFee: "Highest fee",
};

async function fetchAllListingRecords({ search, signal }) {
  const cacheKey = search.trim().toLowerCase();
  const cached = listingCache.get(cacheKey);
  if (cached && Date.now() - cached.at < LISTING_CACHE_MS) return cached.records;

  const results = await Promise.allSettled(
    LEARNING_MODES.map((mode) => fetchListingByMode({ mode, search, signal }))
  );

  const fulfilled = results.filter((result) => result.status === "fulfilled");

  if (!fulfilled.length) {
    throw results[0]?.reason || new Error("No learning mode request succeeded");
  }

  const seen = new Set();
  const records = fulfilled
      .flatMap((result) => result.value)
      .filter((record) => isLearningMode(record?.collegeMode))
      .filter((record) => {
        const key = record?.slug || record?._id || record?.id;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });

  // Only cache complete results, so a failed mode request is retried next time.
  if (fulfilled.length === results.length) listingCache.set(cacheKey, { at: Date.now(), records });
  return records;
}

export async function getUniversitiesPayload({ search = "", page = 1, sort = "recommended", filters = EMPTY_LISTING_FILTERS, signal } = {}) {
  try {
    const records = await fetchAllListingRecords({ search, signal });

    const basePayload = {
      hero: { logoImage: "" },
      onlineUniversities: [],
      pagination: { total: 0, totalPages: 1, currentPage: 1, pageSize: LISTING_PAGE_SIZE },
    };

    if (!records.length) {
      return {
        ...basePayload,
        error: search ? "" : "The live university listing returned no records.",
      };
    }

    const mapped = records.map(mapUniversity);
    const universities = sortUniversities(applyFilters(mapped, filters), sort);
    const total = universities.length;
    const totalPages = Math.max(1, Math.ceil(total / LISTING_PAGE_SIZE));
    const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    const start = (currentPage - 1) * LISTING_PAGE_SIZE;

    return {
      hero: {
        logoImage: universities.find((item) => item.logoImage)?.logoImage || "",
      },
      onlineUniversities: universities.slice(start, start + LISTING_PAGE_SIZE),
      pagination: {
        total,
        totalPages,
        currentPage,
        pageSize: LISTING_PAGE_SIZE,
      },
      totalUnfiltered: mapped.length,
      facets: buildFacets(mapped, filters),
    };
  } catch (error) {
    console.error("getUniversitiesPayload failed:", error.message);
    const timedOut = signal?.reason?.message === "University listing request timed out.";

    return {
      hero: { logoImage: "" },
      onlineUniversities: [],
      pagination: null,
      error: timedOut
        ? "The live university list took too long to respond. Please retry."
        : "The live university listing could not be loaded. Please try again shortly.",
    };
  }
}

export async function getUniversityBySlug(slug) {
  try {
    const response = await fetch(
      `${API_URL}/website/colleges/${encodeURIComponent(slug)}`,
      {
        headers: buildHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch university: ${response.status}`);
    }

    const result = await response.json();

    return result?.data?.data || result?.data || result;
  } catch (error) {
    console.error(`getUniversityBySlug failed for ${slug}:`, error.message);
    return null;
  }
}

export { API_URL, buildHeaders };
