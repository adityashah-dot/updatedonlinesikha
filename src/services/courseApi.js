import { mapApiCourse } from "./apiAdapter";

/**
 * Course CMS service - listing + detail pages.
 *
 * Source of truth: DegreeFYD course API (courses1).
 * Endpoints:
 *   GET /courses1/listing    -> listing (search, levels, modes, page, limit)
 *   GET /courses1/name/{slug} -> detail
 */

const DEFAULT_BASE = "https://api.degreefyd.com/api/b2c";
const DEFAULT_LIST_PATH = "/courses1/listing";
const DEFAULT_DETAIL_PATH = "/courses1/name/";

const API_URL =
  import.meta.env?.VITE_API_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_API_URL : undefined) ||
  DEFAULT_BASE;

function buildHeaders() {
  return { Accept: "application/json" };
}

export class CourseNotFoundError extends Error {
  constructor(message, code = "NOT_FOUND") {
    super(message);
    this.name = "CourseNotFoundError";
    this.code = code;
  }
}

export class CourseServiceError extends Error {
  constructor(message, code = "SERVICE_ERROR", status) {
    super(message);
    this.name = "CourseServiceError";
    this.code = code;
    this.status = status;
  }
}

async function fetchJson(url) {
  let response;
  try {
    response = await fetch(url, { headers: buildHeaders() });
  } catch {
    throw new CourseServiceError("Could not reach the course service", "NETWORK");
  }
  if (response.status === 404) {
    throw new CourseNotFoundError("No course found", "NOT_FOUND");
  }
  if (!response.ok) {
    throw new CourseServiceError("Course service responded with " + response.status, "HTTP_ERROR", response.status);
  }
  try {
    return await response.json();
  } catch {
    throw new CourseServiceError("Course service returned an invalid response", "BAD_JSON");
  }
}

function isSuccessful(result) {
  if (!result || typeof result !== "object") return false;
  const ok = result.success !== undefined ? result.success : result.status;
  return ok === true;
}

function resolveTotal(result, fallback) {
  const data = result && result.data ? result.data : result;
  const candidates = [];
  if (result && result.pagination) candidates.push(result.pagination.totalRecords, result.pagination.total);
  if (data) candidates.push(data.totalRecords, data.total);
  candidates.push(result ? result.total : undefined, data ? data.total : undefined);
  for (const c of candidates) {
    const n = Number(c);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return fallback;
}

function resolveTotalPages(result, fallback) {
  const data = result && result.data ? result.data : result;
  const candidates = [];
  if (result && result.pagination) candidates.push(result.pagination.totalPages);
  if (data) candidates.push(data.totalPages);
  candidates.push(result ? result.totalPages : undefined, data ? data.totalPages : undefined);
  for (const c of candidates) {
    const n = Number(c);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return fallback;
}

function unwrapCourse(result) {
  if (!result || typeof result !== "object") return null;
  const data = result.data ? result.data : result;
  const candidates = [data ? data.course : null, data ? data : null, result ? result.course : null, data ? data.data : null];
  for (const c of candidates) {
    if (c && typeof c === "object" && (c.title || c.name || c.slug || c.courseTitle || c.degreeName)) return c;
  }
  return null;
}

function toCourseData(raw) {
  const c = Object.assign({}, raw || {});
  c.degreeName = c.degreeName || c.courseTitle || c.degree || c.shortTitle || c.name || "";
  c.avgFee = c.avgFee === undefined ? c.averageCourseFee : c.avgFee;
  c.avgDuration = c.avgDuration === undefined ? c.duration : c.avgDuration;
  c.description = c.description || c.overview;
  c.level = c.level || c.levels;
  const mapped = mapApiCourse(c);
  return mapped;
}

function unwrapCourses(result) {
  if (!result || typeof result !== "object") {
    throw new CourseServiceError("Course listing service returned an unexpected response", "BAD_ENVELOPE");
  }
  if (!isSuccessful(result) || !result.data) {
    throw new CourseServiceError("Course listing service returned an unexpected response", "BAD_ENVELOPE");
  }
  const data = result.data;
  const courses = Array.isArray(data) ? data : (Array.isArray(data.courses) ? data.courses : Array.isArray(result.courses) ? result.courses : []);
  const total = resolveTotal(result, courses.length);
  const totalPages = resolveTotalPages(result, 1);
  const mapped = [];
  for (const c of courses) {
    const m = toCourseData(c);
    if (m) mapped.push(m);
  }
  return { courses: mapped, total, totalPages };
}

export async function getCoursesListing({ search = "", levels, modes, page = 1, limit = 9 } = {}) {
  const params = new URLSearchParams();
  if (search && String(search).trim()) params.set("search", String(search).trim());
  if (levels && String(levels).trim()) params.set("levels", String(levels).trim());
  if (modes && String(modes).trim()) params.set("modes", String(modes).trim());
  params.set("page", String(page));
  params.set("limit", String(limit));

  const url = API_URL + DEFAULT_LIST_PATH + "?";
  const result = await fetchJson(url + params.toString());
  const { courses, total, totalPages } = unwrapCourses(result);
  return { courses: courses, total: total, totalPages: totalPages };
}

export async function getCourseBySlug(slug) {
  const clean = String(slug || "").trim().toLowerCase();
  if (!clean) throw new CourseNotFoundError("Missing slug", "MISSING_SLUG");
  const url = API_URL + DEFAULT_DETAIL_PATH + encodeURIComponent(clean);
  const result = await fetchJson(url);
  const course = unwrapCourse(result);
  if (!course) throw new CourseNotFoundError("No course found for " + clean, "NOT_FOUND");
  const mapped = toCourseData(course);
  if (!mapped) throw new CourseServiceError("Course payload could not be mapped", "BAD_MAP");
  return { course: mapped };
}
