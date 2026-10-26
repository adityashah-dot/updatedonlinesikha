import { mkdir, writeFile } from "node:fs/promises";
import { mapOverviewData } from "../src/services/overviewMapper.js";
import { mapUniversity } from "../src/services/universityApi.js";

const API_BASE = (process.env.VITE_API_URL || "https://api.degreefyd.com/api/b2c").replace(/\/$/, "");
const modes = ["online", "distance"];
const concurrency = 5;
const headers = { Accept: "application/json" };
if (process.env.VITE_API_TOKEN) headers.Authorization = `Bearer ${process.env.VITE_API_TOKEN}`;

async function requestJson(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(45000) });
  if (!response.ok) return { httpStatus: response.status, data: null };
  return { httpStatus: response.status, data: await response.json() };
}

function rowsFromListing(result) {
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.universities)) return result.data.universities;
  if (Array.isArray(result?.universities)) return result.universities;
  if (Array.isArray(result?.onlineUniversities)) return result.onlineUniversities;
  return [];
}

async function fetchListingMode(mode) {
  const collected = [];
  let page = 1;
  let totalPages = 1;
  do {
    const params = new URLSearchParams({
      isCollgesNamesRequired: "true",
      isCollgesLocationsRequired: "true",
      mode,
      limit: "500",
      page: String(page),
    });
    const { httpStatus, data } = await requestJson(`${API_BASE}/website/colleges/listing?${params}`);
    if (httpStatus !== 200 || !data) throw new Error(`${mode} listing returned HTTP ${httpStatus}`);
    collected.push(...rowsFromListing(data));
    totalPages = Number(data.pagination?.totalPages || data.data?.pagination?.totalPages || 1);
    page += 1;
  } while (page <= totalPages);
  return collected;
}

function unwrap(payload) {
  return payload?.data?.data || payload?.data || payload;
}

function detailCollegeId(detail) {
  const college = detail?.college_id;
  if (typeof college === "string") return college;
  return college?._id || college?.id || college?.college_id || "";
}

function listFromResponse(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.colleges)) return value.colleges;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.courses)) return value.courses;
  return [];
}

async function mapLimit(items, limit, mapper) {
  const output = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      output[index] = await mapper(items[index], index);
    }
  }));
  return output;
}

function fieldStatus(present, mapped, value) {
  if (!present) return { status: "MISSING_IN_API", apiValue: null };
  if (!mapped) return { status: "MAPPING_BUG", apiValue: value ?? null };
  return { status: "PASS", apiValue: value ?? null };
}

function navSection(entry) {
  const text = `${entry?.navbarTitle || ""} ${entry?.title || ""} ${entry?.slug || ""}`.toLowerCase();
  if (text.includes("course")) return "courses";
  if (text.includes("admission")) return "admission";
  if (text.includes("scholar")) return "scholarships";
  if (text.includes("overview")) return "overview";
  return "other";
}

const listingByMode = Object.fromEntries(await Promise.all(modes.map(async (mode) => [mode, await fetchListingMode(mode)])));
const records = modes.flatMap((mode) => listingByMode[mode].map((record) => ({ ...record, _listingMode: mode })));
const slugCounts = new Map();
for (const record of records) {
  if (record.slug) slugCounts.set(record.slug, (slugCounts.get(record.slug) || 0) + 1);
}

const results = await mapLimit(records, concurrency, async (record) => {
  const slug = String(record.slug || "").trim();
  const listingId = String(record._id || record.id || "");
  const listingName = String(record.collegeName || record.name || record.title || "");
  const mappedListing = mapUniversity(record);
  const result = {
    universityName: listingName,
    slug,
    universityId: listingId,
    detailUrl: slug ? `${API_BASE}/website/colleges/${encodeURIComponent(slug)}` : "",
    listingMode: record._listingMode,
    apiStatus: "NOT_VERIFIED",
    detailRouteStatus: "NOT_VERIFIED_BROWSER",
    overviewStatus: "NOT_VERIFIED",
    coursesStatus: "NOT_VERIFIED",
    admissionStatus: "NOT_VERIFIED",
    otherTabsStatus: "NOT_VERIFIED",
    availableFields: Object.keys(record).filter((key) => record[key] != null && record[key] !== ""),
    detailFields: [],
    collegeFields: [],
    listingCourseCount: record.coursesCount ?? record.counts ?? null,
    courseApiCount: 0,
    missingFields: [],
    brokenSections: [],
    layoutIssues: ["NOT_VERIFIED_BROWSER"],
    runtimeErrors: [],
    testStatus: "NOT_RUN",
    fixStatus: "NONE",
    duplicateSlug: slug ? slugCounts.get(slug) > 1 : false,
    fieldAudit: {},
    sections: [],
    publishedTabs: [],
  };

  if (!slug) {
    result.apiStatus = "INVALID_DATA_MISSING_SLUG";
    result.missingFields.push("slug");
    return result;
  }

  try {
    const detailResponse = await requestJson(result.detailUrl);
    if (detailResponse.httpStatus !== 200 || !detailResponse.data) {
      result.apiStatus = `DETAIL_HTTP_${detailResponse.httpStatus}`;
      result.fixStatus = "UPSTREAM_DETAIL_404";
      result.brokenSections.push("detail-api");
      return result;
    }
    const detail = unwrap(detailResponse.data);
    result.apiStatus = "PASS";
    result.detailFields = Object.keys(detail || {});
    result.collegeFields = Object.keys(detail?.college_id || {});
    const detailId = detailCollegeId(detail);
    const responseSlug = String(detail?.slug || detail?.college_id?.slug || "");
    const idMatches = !listingId || !detailId || listingId === detailId;
    const slugMatches = responseSlug === slug || String(detail?.oldSlug || "") === slug;
    result.detailRouteStatus = idMatches && slugMatches ? "API_IDENTITY_PASS" : "API_IDENTITY_MISMATCH";
    if (!idMatches) result.brokenSections.push(`identity-id:${listingId}:${detailId}`);
    if (!slugMatches) result.brokenSections.push(`identity-slug:${slug}:${responseSlug || "missing"}`);

    const sections = Array.isArray(detail?.sections) ? detail.sections : [];
    result.sections = sections.map((section) => ({
      title: section?.title || "",
      blockTypes: Array.isArray(section?.blocks) ? section.blocks.map((block) => block?.type || "unknown") : [],
    }));
    result.fieldAudit = {
      name: fieldStatus(Boolean(listingName), Boolean(detail?.title || detail?.college_id?.name), detail?.title || detail?.college_id?.name || ""),
      slug: fieldStatus(Boolean(record.slug), slugMatches, responseSlug),
      id: fieldStatus(Boolean(listingId), idMatches, detailId),
      overview: fieldStatus(Boolean(detail?.college_id?.overview || detail?.hero?.description || sections.length), Boolean(detail?.college_id?.overview || detail?.hero?.description || sections.length), detail?.college_id?.overview || detail?.hero?.description || ""),
      fee: (() => {
        const supplied = record.minFee != null || record.maxFee != null;
        const hasPositiveFee = Number(record.minFee) > 0 || Number(record.maxFee) > 0;
        if (!supplied) return { status: "MISSING_IN_API", apiValue: null };
        if (!hasPositiveFee) return { status: "INVALID_DATA", apiValue: { minFee: record.minFee, maxFee: record.maxFee } };
        return fieldStatus(true, Boolean(mappedListing.feeLabel), { minFee: mappedListing.minFee, feeLabel: mappedListing.feeLabel });
      })(),
    };
    result.missingFields = Object.entries(result.fieldAudit).filter(([, field]) => field.status === "MISSING_IN_API").map(([field]) => field);

    let nav = [];
    let courses = [];
    if (detailId) {
      const [navResult, courseResult] = await Promise.all([
        requestJson(`${API_BASE}/website/colleges/navbar-list/${encodeURIComponent(detailId)}?isTest=false`),
        requestJson(`${API_BASE}/website/colleges/courses-new/${encodeURIComponent(detailId)}?page=0&limit=25`),
      ]);
      nav = listFromResponse(navResult.data);
      courses = listFromResponse(courseResult.data);
      result.courseApiCount = courses.length;
      if (navResult.httpStatus !== 200) result.brokenSections.push(`navbar-http-${navResult.httpStatus}`);
      if (courseResult.httpStatus !== 200) result.brokenSections.push(`courses-http-${courseResult.httpStatus}`);
    }
    result.publishedTabs = nav.map((entry) => ({
      slug: entry?.slug || "",
      label: entry?.navbarTitle || entry?.title || "",
      section: navSection(entry),
    }));

    const coursePublished = result.publishedTabs.some((tab) => tab.section === "courses") || sections.some((section) => /course/i.test(section?.title || ""));
    const admissionPublished = result.publishedTabs.some((tab) => tab.section === "admission") || sections.some((section) => /admission/i.test(section?.title || ""));
    result.coursesStatus = coursePublished ? (courses.length || sections.some((section) => /course/i.test(section?.title || "")) ? "DATA_AVAILABLE" : "MISSING_IN_API") : "NOT_PUBLISHED";
    result.admissionStatus = admissionPublished ? "DATA_AVAILABLE" : "NOT_PUBLISHED";
    result.otherTabsStatus = result.publishedTabs.length ? "PASS" : "NO_NAV_RECORDS";

    let mappedOverview = null;
    try {
      const mapped = mapOverviewData(detail, { courses });
      mappedOverview = mapped;
      result.overviewStatus = mapped?.title && mapped?.slug ? "MAPPED" : "MAPPING_BUG";
      if (!mapped?.title || !mapped?.slug) result.brokenSections.push("overview-identity-mapping");
      const mappings = [
        ["highlights", /highlight/i, mapped?.highlights],
        ["coursesFees", /course|fee/i, mapped?.coursesFees],
        ["eligibility", /eligib|selection/i, mapped?.eligibility],
        ["admission", /admission/i, mapped?.admission],
        ["rankings", /ranking|accredit/i, mapped?.rankings],
        ["examinationPattern", /examin|evaluation/i, mapped?.examinationPattern],
        ["placements", /placement/i, mapped?.placements],
        ["scholarships", /scholar/i, mapped?.scholarshipSection],
        ["campus", /campus|gallery/i, mapped?.campus],
      ];
      result.fieldAudit.sections = mappings.map(([field, pattern, mappedValue]) => {
        const sourceSections = sections.filter((section) => pattern.test(section?.title || ""));
        if (!sourceSections.length) return { field, status: "MISSING_IN_API" };
        if (!mappedValue) {
          result.brokenSections.push(`${field}:source-present-map-empty`);
          return { field, status: "MAPPING_BUG", sourceTitles: sourceSections.map((section) => section.title) };
        }
        return { field, status: "PASS", sourceTitles: sourceSections.map((section) => section.title) };
      });
    } catch (error) {
      result.overviewStatus = "MAPPER_EXCEPTION";
      result.runtimeErrors.push(String(error?.stack || error));
    }
    const courseSections = sections.filter((section) => /course/i.test(section?.title || ""));
    const courseSourcePresent = courses.length > 0 || courseSections.length > 0 || Number(record.coursesCount || record.counts || 0) > 0;
    const courseMapped = Boolean(mappedOverview?.coursesFees?.table?.length || mappedOverview?.popularProgrammes?.length || courseSections.length);
    result.fieldAudit.courses = courseSourcePresent
      ? { status: courseMapped ? "PASS" : (courses.length > 0 || courseSections.length > 0 ? "MAPPING_BUG" : "INVALID_DATA"), apiValue: { listingCount: result.listingCourseCount, detailApiCount: courses.length, sectionTitles: courseSections.map((section) => section.title) } }
      : { status: "MISSING_IN_API", apiValue: { listingCount: result.listingCourseCount, detailApiCount: courses.length, sectionTitles: [] } };
    result.coursesStatus = result.fieldAudit.courses.status === "PASS" ? "DATA_AVAILABLE" : result.fieldAudit.courses.status;
    if (result.fieldAudit.courses.status === "MISSING_IN_API") result.missingFields.push("courses");
    if (result.fieldAudit.courses.status === "INVALID_DATA") result.brokenSections.push("courses:listing-count-without-detail-data");
    if (result.fieldAudit.courses.status === "MAPPING_BUG") result.brokenSections.push("courses:source-present-map-empty");
    const mappedSectionAudit = result.fieldAudit.sections || [];
    const richTextCampusOrPlacement = sections.some((section) => {
      const types = (section?.blocks || []).map((block) => block?.type);
      const field = /placement/i.test(section?.title || "")
        ? "placements"
        : /campus|gallery/i.test(section?.title || "")
          ? "campus"
          : "";
      const usesRichTextFallback = types.includes("richtext") &&
        (field === "placements" ? !types.some((type) => ["placement_stats", "resource_grid"].includes(type)) : field === "campus" ? !types.includes("gallery") : false);
      return usesRichTextFallback && mappedSectionAudit.some((item) => item.field === field && item.status === "PASS" && item.sourceTitles?.includes(section.title));
    });
    result.fixStatus = richTextCampusOrPlacement
      ? "SHARED_RICHTEXT_SECTION_MAPPING"
      : "NO_CONFIRMED_MAPPER_DEFECT";
  } catch (error) {
    result.apiStatus = "REQUEST_ERROR";
    result.runtimeErrors.push(String(error?.stack || error));
  }
  return result;
});

const duplicateSlugs = [...slugCounts].filter(([, count]) => count > 1).map(([slug, count]) => ({ slug, count }));
const invalidSlugRecords = results.filter((result) => !result.slug);
const summary = {
  auditedAt: new Date().toISOString(),
  apiBase: API_BASE,
  discovery: {
    modes: Object.fromEntries(modes.map((mode) => [mode, listingByMode[mode].length])),
    totalRecords: records.length,
    uniqueSlugs: slugCounts.size,
    duplicateSlugs,
    invalidSlugRecords: invalidSlugRecords.length,
    pagesRetrieved: "All pages reported by the live API pagination metadata (limit 500 per mode).",
  },
  results: {
    detailApiPass: results.filter((result) => result.apiStatus === "PASS").length,
    detailIdentityPass: results.filter((result) => result.detailRouteStatus === "API_IDENTITY_PASS").length,
    detailIdentityMismatch: results.filter((result) => result.detailRouteStatus === "API_IDENTITY_MISMATCH").length,
    mapperPass: results.filter((result) => result.overviewStatus === "MAPPED").length,
    mapperExceptions: results.filter((result) => result.overviewStatus === "MAPPER_EXCEPTION").length,
    routeBrowserVerified: 0,
    tabsAndPagesBrowserVerified: 0,
    recordsWithMappingBugs: results.filter((result) => result.brokenSections.some((section) => section.includes("source-present-map-empty"))).length,
    sharedRichTextMappingFixes: results.filter((result) => result.fixStatus === "SHARED_RICHTEXT_SECTION_MAPPING").length,
    apiFailureSlugs: results.filter((result) => result.apiStatus !== "PASS").map((result) => ({ slug: result.slug, universityName: result.universityName, status: result.apiStatus })),
    recordsWithMissingFields: results.filter((result) => result.missingFields.length > 0).length,
    missingFieldCounts: results.reduce((counts, result) => {
      for (const field of result.missingFields) counts[field] = (counts[field] || 0) + 1;
      for (const section of result.fieldAudit.sections || []) {
        if (section.status === "MISSING_IN_API") counts[section.field] = (counts[section.field] || 0) + 1;
      }
      return counts;
    }, {}),
    invalidFieldCounts: results.reduce((counts, result) => {
      for (const [field, value] of Object.entries(result.fieldAudit)) {
        if (value?.status === "INVALID_DATA") counts[field] = (counts[field] || 0) + 1;
        if (Array.isArray(value)) {
          for (const section of value) if (section.status === "INVALID_DATA") counts[section.field] = (counts[section.field] || 0) + 1;
        }
      }
      return counts;
    }, {}),
    publishedTabCounts: results.reduce((counts, result) => {
      for (const tab of result.publishedTabs) counts[tab.section] = (counts[tab.section] || 0) + 1;
      return counts;
    }, {}),
  },
  note: "API and mapper checks only. No browser rendering or viewport layout is claimed in this report.",
};

await mkdir("qa/audit", { recursive: true });
await writeFile("qa/audit/university-slugs.json", `${JSON.stringify({ summary, universities: results }, null, 2)}\n`);
await writeFile("qa/audit/university-slug-manifest.json", `${JSON.stringify(results.map(({ universityName, slug, universityId, detailUrl, listingMode }) => ({ universityName, slug, universityId, detailUrl, listingMode })), null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
