import {
  fetchCollegePage,
  getCollegeNavbarList,
  getCollegeCourses,
  getCollegeGallery,
  getCollegeRecruiters,
  getCollegeBlogs,
} from "./collegeApi";
import { mapOverviewData } from "./overviewMapper";
import {
  buildCollegeNavigation,
  pageSectionOf,
  resolveNavTarget,
} from "./collegeNavigation";
import { isLearningMode } from "./universityApi";

const IS_TEST = false;

/** CMS image fields arrive as strings, {url|src|path} objects or arrays. */
function readImage(value) {
  if (typeof value === "string") {
    return /^blob:/i.test(value) ? "" : value;
  }
  if (Array.isArray(value)) return readImage(value[0]);
  if (value && typeof value === "object") {
    return value.url || value.src || value.path || "";
  }
  return "";
}

export const LEGACY_SLUG_ALIASES = {
  "lpu-online": "lovely-professional-university-online",
  "lovely-professional-university": "lovely-professional-university-online",
  "cu-online": "chandigarh-university-online",
  "chandigarh-university": "chandigarh-university-online",
  "chandigarh-university-distance": "chandigarh-university-online",
  "amity-online": "amity-university-online",
  "amity-university": "amity-university-online",
  "amity": "amity-university-online",
  "manipal-online": "manipal-university-online",
  "online-manipal": "manipal-university-online",
  "manipal": "manipal-university-online",
  "jain-online": "jain-university-online",
  "jain-university": "jain-university-online",
  "jain": "jain-university-online",
  "upes-online": "upes-online",
  "upes": "upes-online"
};

export function resolveLegacySlug(slugParts) {
  const { collegeName, sub, fullSlug } = splitSlug(slugParts);

  const canonical = LEGACY_SLUG_ALIASES[collegeName.toLowerCase()];

  if (!canonical) return null;

  return {
    collegeName: canonical,
    sub,
    fullSlug: `${canonical}${sub ? `/${sub}` : ""}`,
    path: `/${canonical}${sub ? `/${sub}` : ""}`,
  };
}

export function splitSlug(slugParam) {
  const segments = (Array.isArray(slugParam) ? slugParam : [slugParam])
    .flatMap((part) => String(part ?? "").split("/"))
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    collegeName: segments[0] || "",
    sub: segments.slice(1).join("/"),
    fullSlug: segments.join("/"),
  };
}

export function toPlainText(value) {
  if (typeof value !== "string") return "";

  return value
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

/** A payload is usable only when it actually carries college data. */
function hasCollegeData(payload) {
  if (!payload || typeof payload !== "object") return false;

  return Boolean(
    payload.slug ||
      payload.title ||
      payload.college_id ||
      payload.navbarTitle ||
      payload.hero ||
      Array.isArray(payload.sections)
  );
}

export function withSection(slugParam, sectionParam) {
  const { collegeName } = splitSlug(slugParam);
  const section = String(sectionParam || "").trim();

  if (!section) return splitSlug(slugParam);

  return {
    collegeName,
    sub: section,
    fullSlug: `${collegeName}/${section}`,
  };
}

/**
 * Shared college page loader (ports the reference Next.js build).
 *
 * - Tabs exist only for pages the CMS publishes (`GET .../navbar-list/{id}`).
 *   A college whose API sends only its overview page keeps exactly one tab.
 * - A requested sub page that is not published answers `unavailable: true`
 *   so the route can show 404 — the Overview is never re-labelled.
 */
export async function loadCollegePage(slugParts, options = {}) {
  const { basePath = "/universities", sectionParam = "" } = options;
  const { collegeName, sub, fullSlug } = withSection(slugParts, sectionParam);

  if (!collegeName) return null;

  /* Legacy ids ("lpu-online", "manipal"…) resolve to the canonical slug. */
  const legacy = resolveLegacySlug([fullSlug]);
  const baseName = legacy?.collegeName || collegeName;
  const baseSub = legacy ? legacy.sub || sub : sub;
  const baseUrl = legacy?.fullSlug || fullSlug;

  let payload = await fetchCollegePage(baseName, "").catch(() => {});

  if (!hasCollegeData(payload) && baseUrl.includes("/")) {
    payload = await fetchCollegePage(baseUrl, "").catch(() => {});
  }

  if (!hasCollegeData(payload)) return null;

  const rawCollege = payload?.college_id || payload;
  const college = {
    id: rawCollege?._id || rawCollege?.college_id || rawCollege?.id || "",
    name: rawCollege?.name || payload?.title || "",
    shortName: rawCollege?.collegeShortName || "",
    slug: rawCollege?.slug || baseName,
    location: rawCollege?.location || "",
    established: rawCollege?.established || "",
    rating: rawCollege?.rating || "",
    nirfRanking: rawCollege?.nirfRanking || "",
    naac: (rawCollege?.approvals || []).find((a) => /NAAC/i.test(String(typeof a === "string" ? a : a?.name || ""))) || "",
    approvals: rawCollege?.approvals || [],
    logo: readImage(rawCollege?.logo),
    collegeImage: readImage(rawCollege?.collegeImage),
    collegeMode: rawCollege?.collegeMode || "",
    collegeType: rawCollege?.collegeType || "",
    students: rawCollege?.students || "",
    website: rawCollege?.website || "",
    minFee: rawCollege?.minFee ?? 0,
    maxFee: rawCollege?.maxFee ?? 0,
    placementStats: rawCollege?.placementStats || {},
    scholarships: rawCollege?.scholarships || [],
    reviews: rawCollege?.reviews || [],
    contact: rawCollege?.contact || {},
  };

  // This portal only serves learning-mode universities: a regular campus
  // page reachable by direct URL answers as unavailable (404).
  const collegeMode = String(college.collegeMode || "").toLowerCase();

  if (collegeMode && !isLearningMode(collegeMode)) {
    return { unavailable: true, college, nav: null, collegeSlug: college.slug };
  }

  const collegeId = college.id || "";
  const collegeSlug = college.slug || collegeName;

  const [navEntries, courses, gallery, recruiters, blogs] = await Promise.all([
    getCollegeNavbarList(collegeId, IS_TEST).catch(() => []),
    getCollegeCourses(collegeId).catch(() => []),
    getCollegeGallery(collegeId).catch(() => []),
    getCollegeRecruiters(collegeId).catch(() => []),
    getCollegeBlogs(collegeId).catch(() => []),
  ]);

  const nav = buildCollegeNavigation({
    entries: navEntries,
    navBase: collegeSlug,
    basePath,
  });

  const target = resolveNavTarget({
    requestedPath: baseUrl,
    navBase: collegeSlug,
    entries: navEntries,
  });

  if (!target) {
    return { unavailable: true, college, nav, collegeSlug };
  }

  if (target.kind === "sub") {
    const subPayload = await fetchCollegePage(baseName, target.sub).catch(() => {});

    if (!hasCollegeData(subPayload)) {
      return { unavailable: true, college, nav, collegeSlug };
    }

    payload = subPayload;
  } else if (target.kind === "page") {
    const pagePayload = await fetchCollegePage(target.slug, "").catch(() => {});

    if (!hasCollegeData(pagePayload)) {
      return { unavailable: true, college, nav, collegeSlug };
    }

    payload = pagePayload;
  }

  const overview = mapOverviewData(payload, {
    courses,
    gallery,
    recruiters,
    blogs,
    reviews: rawCollege?.reviews,
  });

  if (!overview || !overview.title) {
    return { unavailable: true, college, nav, collegeSlug };
  }

  const section =
    target.kind === "base" ? "overview" : pageSectionOf(payload);

  return {
    college,
    nav,
    overview,
    section,
    sub,
    fullSlug,
    collegeSlug,
    navEntries,
    rawPayload: payload,
  };
}
