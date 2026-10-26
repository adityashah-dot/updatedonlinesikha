import { UNIVERSITY_PAGE_SIZE as LISTING_PAGE_SIZE } from "./universityPagination.js";

const API_URL =
  import.meta.env?.VITE_API_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_API_URL : undefined) ||
  "https://api.degreefyd.com/api/b2c";

const API_TOKEN =
  import.meta.env?.VITE_API_TOKEN ||
  (typeof process !== "undefined" ? process.env?.VITE_API_TOKEN : undefined);

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
  const headers = { Accept: "application/json" };

  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  return headers;
}

function readImage(value) {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    if (Array.isArray(value)) return readImage(value[0]);
    return value.url || value.src || value.path || "";
  }

  return "";
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
  const mode = String(record.collegeMode || "").toLowerCase();

  const approvals = readApprovals(record);
  const rawMinFee = record.minFee == null || record.minFee === "" ? null : Number(record.minFee);
  const rawMaxFee = record.maxFee == null || record.maxFee === "" ? null : Number(record.maxFee);
  const minFee = Number.isFinite(rawMinFee) && rawMinFee > 0 ? rawMinFee : null;
  const maxFee = Number.isFinite(rawMaxFee) && rawMaxFee > 0 ? rawMaxFee : null;

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
  if (record.highestPackage) {
    specs.push({ label: "Highest CTC Record", value: formatFee(record.highestPackage), highlight: true });
  }
  if (record.placementHighest) {
    specs.push({ label: "Avg Package", value: formatFee(record.placementHighest) });
  }
  const established = readText(record.established);
  if (established) {
    specs.push({ label: "Established", value: established });
  }

  const naac = approvals.find((approval) => /NAAC/i.test(approval)) || "";

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
    rankNote: record.nirfRanking ? `NIRF Rank #${record.nirfRanking}` : "",
    naac,
    approvals,
    accreditations: approvals,
    feeLabel,
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
        value: formatFee(university.highestPackage),
        tone: "text-[#115eaf] font-semibold",
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
      highestPackage: university.highestPackage ? formatFee(university.highestPackage) : "",
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
      place: university.highestPackage ? formatFee(university.highestPackage) : "",
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
const LISTING_SORTS = {
  nirf: {
    fields: ["NIRF Rank", "Lowest Fee", "Highest Fee", "Highest CTC"],
    compare: (a, b) => a.nirfRank - b.nirfRank || a.minFeeNumber - b.minFeeNumber,
  },
  lowestFee: {
    compare: (a, b) => a.minFeeNumber - b.minFeeNumber,
  },
  highestFee: {
    compare: (a, b) => b.minFeeNumber - a.minFeeNumber,
  },
  highestPackage: {
    compare: (a, b) => b.packageNumber - a.packageNumber,
  },
};

function withSortKeys(university) {
  return {
    ...university,
    nirfRank: Number(String(university.rankNote || "").match(/(\d+)/)?.[1]) || Number.MAX_SAFE_INTEGER,
    minFeeNumber: firstNumber(university.minFee) ?? Number.MAX_SAFE_INTEGER,
    packageNumber: firstNumber(university.highestPackage) ?? 0,
  };
}

export function sortUniversities(universities, sortId) {
  const sort = LISTING_SORTS[sortId];
  if (!sort) return Array.isArray(universities) ? universities : [];

  return (Array.isArray(universities) ? universities : [])
    .map(withSortKeys)
    .sort(sort.compare)
    .map(({ nirfRank, minFeeNumber, packageNumber, ...university }) => university);
}

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
  nirf: "NIRF Rank",
  lowestFee: "Lowest Fee",
  highestFee: "Highest Fee",
  highestPackage: "Highest CTC",
};

export async function getUniversitiesPayload({ search = "", page = 1, sort = "nirf", signal } = {}) {
  try {
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

    const universities = sortUniversities(records.map(mapUniversity), sort);
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
