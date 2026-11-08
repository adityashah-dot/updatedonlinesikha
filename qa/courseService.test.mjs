import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";
import { Window } from "happy-dom";

const servicePath = new URL("../src/services/courseApi.js", import.meta.url);
const serviceSource = readFileSync(servicePath, "utf8");
const courseApi = await import(servicePath);
const { mapApiCourse } = await import("../src/services/apiAdapter.ts");

const { getCoursesListing, getCourseBySlug, CourseNotFoundError, CourseServiceError } = courseApi;

function courseRecord(over = {}) {
  return {
    _id: "course-1",
    degreeName: "Online MBA",
    slug: "online-mba",
    level: "pg",
    avgFee: 120000,
    avgDuration: 2,
    description: "A verified online MBA record.",
    eligibility: "Bachelor degree with 50 percent",
    credits: 90,
    syllabus: [{ semester: 1, subjects: ["Financial Accounting"], credits: 12 }],
    brochurePdfName: "online-mba-brochure.pdf",
    ...over,
  };
}

function listingEnvelope(courses, totalRecords, totalPages) {
  return {
    success: true,
    data: courses,
    pagination: { totalRecords: totalRecords, totalPages: totalPages, currentPage: 1, limit: 9 },
  };
}

const originalFetch = globalThis.fetch;
let mockStatus = 200;
let mockBody = listingEnvelope([], 0, 1);
const calls = [];

globalThis.fetch = async (url) => {
  calls.push(String(url));
  if (globalThis.fetch.shouldThrow) throw new Error("AbortError: The operation timed out");
  return {
    ok: mockStatus >= 200 && mockStatus < 300,
    status: mockStatus,
    json: async () => mockBody,
  };
};

const cases = [];

cases.push(async () => {
  mockStatus = 200;
  mockBody = listingEnvelope([courseRecord(), courseRecord({ _id: "course-2", degreeName: "Online MCA" })], 2, 1);
  calls.length = 0;
  const res = await getCoursesListing({ page: 1, limit: 9, search: "mba" });
  assert.equal(res.total, 2);
  assert.equal(res.totalPages, 1);
  assert.equal(res.courses.length, 2);
  assert.equal(res.courses[0].name, "Online MBA");
  assert.equal(res.courses[0].level, "PG");
  assert.ok(calls[0].indexOf("/courses1/listing") >= 0);
  assert.ok(calls[0].indexOf("search=mba") >= 0);
  assert.ok(calls[0].indexOf("limit=9") >= 0);
  assert.ok(calls[0].indexOf("page=1") >= 0);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = listingEnvelope([], 0, 1);
  calls.length = 0;
  await getCoursesListing({ levels: "pg", modes: "online", page: 2, limit: 9 });
  assert.ok(calls[0].indexOf("levels=pg") >= 0);
  assert.ok(calls[0].indexOf("modes=online") >= 0);
  assert.ok(calls[0].indexOf("page=2") >= 0);
});

cases.push(async () => {
  mockStatus = 500;
  await assert.rejects(() => getCoursesListing({ page: 1 }), (e) => e instanceof CourseServiceError && e.status === 500);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { status: false };
  await assert.rejects(() => getCoursesListing({ page: 1 }), (e) => e instanceof CourseServiceError && e.code === "BAD_ENVELOPE");
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = listingEnvelope([], 0, 1);
  globalThis.fetch.shouldThrow = true;
  await getCoursesListing({ page: 1 }).then(
    () => { throw new Error("expected rejection"); },
    (e) => { assert.equal(e.name, "CourseServiceError"); assert.equal(e.code, "NETWORK"); }
  );
  delete globalThis.fetch.shouldThrow;
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { data: courseRecord() };
  const res = await getCourseBySlug("online-mba");
  assert.equal(res.course.name, "Online MBA");
  assert.equal(res.course.level, "PG");
  assert.equal(res.course.category, "pg");
});

cases.push(async () => {
  mockStatus = 404;
  mockBody = { data: null };
  await assert.rejects(() => getCourseBySlug("missing-slug"), (e) => e instanceof CourseNotFoundError && e.code === "NOT_FOUND");
});

cases.push(async () => {
  await assert.rejects(() => getCourseBySlug(""), (e) => e instanceof CourseNotFoundError && e.code === "MISSING_SLUG");
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { data: courseRecord({ courseLogo: { image: "https://cdn.example.com/course-logo.webp" } }) };
  const res = await getCourseBySlug("online-mba");
  assert.equal(res.course.images.logo, "https://cdn.example.com/course-logo.webp");
});

cases.push(async () => {
  // Verify courseLogo.url is prioritized over small mortarboard _image.webp
  mockStatus = 200;
  mockBody = {
    data: courseRecord({
      levels: ["Post Graduation"],
      courseLogo: { url: "https://images.degreefyd.com/courses/5420/images/online-mca.webp", alt: "MCA" },
      image: { url: "https://images.DegreeFYD.com/courses/5420/online-mca_image.webp" },
      averageCourseFee: "50,000 - 2,50,000",
      avgFee: undefined,
    }),
  };
  const res = await getCourseBySlug("online-mca");
  assert.equal(res.course.images.primary, "https://images.degreefyd.com/courses/5420/images/online-mca.webp");
  assert.equal(res.course.images.isBanner, true);
  assert.equal(res.course.displayLevel, "PG Degree");
  assert.equal(res.course.level, "POST GRADUATION");
  assert.equal(res.course.feeDisplay, "₹50,000 - ₹2,50,000");
});

cases.push(async () => {
  // Verify level mappings: UG, Certificate, PhD
  mockStatus = 200;
  mockBody = { data: courseRecord({ levels: ["Under Graduation"], degreeName: "Online BCA" }) };
  const ugRes = await getCourseBySlug("online-bca");
  assert.equal(ugRes.course.displayLevel, "UG Degree");

  mockBody = { data: courseRecord({ levels: ["Certificate"], degreeName: "Executive Certificate" }) };
  const certRes = await getCourseBySlug("exec-cert");
  assert.equal(certRes.course.displayLevel, "Certificate");

  mockBody = { data: courseRecord({ levels: ["PhD (Doctorate)"], degreeName: "Online DBA" }) };
  const phdRes = await getCourseBySlug("online-dba");
  assert.equal(phdRes.course.displayLevel, "Doctoral Programme");
});

cases.push(() => {
  assert.ok(!serviceSource.includes("../data/courses"), "Course service must not import local course data");
});

cases.push(async () => {
  const win = new Window();
  globalThis.window = win;
  globalThis.document = win.document;
  globalThis.DOMParser = win.DOMParser;

  const detailsFile = "C:/Users/GCV/.gemini/antigravity/brain/8ca28d1c-780b-4c58-a0fe-7737501c2ebe/scratch/all_39_details.json";
  if (existsSync(detailsFile)) {
    const viteServer = await createServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
      logLevel: "error",
    });
    try {
      const { default: CourseCmsContent } = await viteServer.ssrLoadModule("/src/components/CourseCmsContent.jsx");
      const rawAll = JSON.parse(readFileSync(detailsFile, "utf8")).map((x) => x.data);
      for (const raw of rawAll) {
        const course = mapApiCourse(raw);
        assert.ok(course, `Course failed to map: ${raw.slug}`);
        const html = renderToStaticMarkup(
          React.createElement(
            MemoryRouter,
            null,
            React.createElement(CourseCmsContent, { course, onOpenCounseling: () => {} })
          )
        );
        const bannerCount = (html.match(/data-testid="course-counselling-banner"/g) || []).length;
        assert.equal(bannerCount, 2, `Expected 2 counselling banners for ${course.id}, got ${bannerCount}`);
        const headingCount = (html.match(/FREE 1-ON-1 ACADEMIC COUNSELLING/g) || []).length;
        assert.equal(headingCount, 2, `Expected 2 exact headings for ${course.id}, got ${headingCount}`);
        const textContent = html.replace(/<[^>]+>/g, " ");
        assert.ok(
          !/&lt;\/?(?:p|div|span|table|tr|td|th|ul|ol|li|strong|h[1-6])\b/i.test(textContent),
          `Found literal escaped HTML tags in ${course.id}`
        );

        if (course.id === "post-graduate-certificate-programme-in-executive-general-management") {
          const cardCount = (html.match(/data-testid="syllabus-module-card"/g) || []).length;
          assert.equal(cardCount, 12, "EGMP must render all 12 syllabus module cards");
          assert.ok(html.includes("eam Leadership &amp; Performance"), "EGMP must preserve exact CMS subject text");
          assert.equal(course.semestersCount, 12, "EGMP must report 12 modules");
        }
      }
    } finally {
      await viteServer.close();
    }
  }
});

for (const [i, run] of cases.entries()) {
  try {
    await run();
    console.log("OK test " + (i + 1));
  } catch (e) {
    console.error("FAIL test " + (i + 1) + ": " + e.message);
    process.exitCode = 1;
  }
}

globalThis.fetch = originalFetch;
