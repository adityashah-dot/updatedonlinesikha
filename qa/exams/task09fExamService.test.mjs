import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getExamsListing, getExamBySlug, ExamNotFoundError, ExamServiceError } from "../../src/services/examApi.js";

const servicePath = new URL("../../src/services/examApi.js", import.meta.url);
const serviceSource = readFileSync(servicePath, "utf8");

function examListRecord(over = {}) {
  return {
    examCategories: [],
    examDate: null,
    examMode: "Online",
    fullForm: null,
    isRecommended: false,
    levels: [],
    logo: { url: "", alt: "" },
    pageSliderTitle: "Overview",
    registrationRange: { start: null, end: null },
    resultDate: null,
    shortTitle: "IPS Exam 2027:",
    slug: "ips-exam",
    streams: [],
    title: "IPS Exam 2027: Exam Details, Eligibility, Syllabus, Age Limit",
    children: [],
    ...over,
  };
}

function listingEnvelope(exams, totalRecords, totalPages) {
  return {
    success: true,
    data: {
      exams,
      pagination: { currentPage: 1, totalPages, totalRecords, limit: 10 },
      filters: { categories: ["Entrance"], levels: ["ug"], streams: ["engineering"] },
    },
    pagination: { currentPage: 1, totalPages, totalRecords, limit: 10 },
  };
}

const originalFetch = globalThis.fetch;
let mockStatus = 200;
let mockBody = listingEnvelope([examListRecord()], 1, 1);
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
  mockBody = listingEnvelope([examListRecord(), examListRecord({ slug: "cat-2026", shortTitle: "CAT 2026:", examMode: "Online" })], 2, 1);
  calls.length = 0;
  const res = await getExamsListing({ page: 1, limit: 10, sort: "recommended-exams" });
  assert.equal(res.exams.length, 2);
  assert.equal(res.total, 2);
  assert.equal(res.totalPages, 1);
  assert.ok(calls[0].indexOf("/exam-pages/filtered-list") >= 0);
  assert.ok(calls[0].indexOf("sort=recommended-exams") >= 0);
  assert.ok(calls[0].indexOf("limit=10") >= 0);
  assert.ok(calls[0].indexOf("page=1") >= 0);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = listingEnvelope([], 0, 1);
  calls.length = 0;
  const res = await getExamsListing({ search: "ips", category: "Entrance", level: "ug", stream: "engineering", page: 2, limit: 10 });
  assert.equal(res.exams.length, 0);
  assert.ok(calls[0].indexOf("search=ips") >= 0);
  assert.ok(calls[0].indexOf("category=Entrance") >= 0);
  assert.ok(calls[0].indexOf("level=ug") >= 0);
  assert.ok(calls[0].indexOf("stream=engineering") >= 0);
  assert.ok(calls[0].indexOf("page=2") >= 0);
});

cases.push(async () => {
  mockStatus = 500;
  await assert.rejects(() => getExamsListing({ page: 1 }), (e) => e instanceof ExamServiceError && e.status === 500);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { status: false };
  await assert.rejects(() => getExamsListing({ page: 1 }), (e) => e instanceof ExamServiceError && e.code === "BAD_ENVELOPE");
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = listingEnvelope([], 0, 1);
  globalThis.fetch.shouldThrow = true;
  await getExamsListing({ page: 1 }).then(
    () => {
      throw new Error("expected rejection");
    },
    (e) => {
      assert.equal(e.name, "ExamServiceError");
      assert.equal(e.code, "NETWORK");
    }
  );
  delete globalThis.fetch.shouldThrow;
});

function ipsDetail() {
  const headings = [
    "Overview",
    "What Is Indian Police Service (IPS) Exam?",
    "IPS Exam 2027 Dates and Schedule",
    "IPS Eligibility Criteria 2027",
    "UPSC IPS Exam Pattern 2027",
    "UPSC IPS Syllabus",
    "UPSC IPS Notification 2027",
    "IPS Exam 2027 Application Form",
    "IPS Vacancies 2027",
    "Services in the UPSC Civil Services Examination",
    "IPS Selection Process 2027",
    "UPSC CSE Result 2027 for IPS Aspirants",
    "UPSC CSE Admit Card 2027",
    "UPSC CSE Exam Analysis 2026",
    "IPS Training and Career Progression",
    "IPS Rank Structure",
    "IPS Exam Preparation Tips 2027",
    "IPS Salary 2027",
    "Difference Between IAS and IPS",
    "IPS Physical Fitness Preparation",
    "IPS Exam Books and Study Material",
  ];

  const sections = headings.map((title, i) => ({
    key: null,
    id: null,
    title,
    tocTitle: title,
    order: i + 1,
    blocks: [
      {
        type: "richText",
        content: "<p>Verified rich text content for section " + i + ".</p><table><thead><tr><th>Col A</th><th>Col B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>",
        headingLevel: "h2",
      },
    ],
  }));

  const toc = headings.map((title, i) => ({ title, anchor: "#section-" + i, order: i + 1 }));

  const faqs = [];
  for (let i = 1; i <= 8; i += 1) {
    faqs.push({
      question: "IPS FAQ question " + i,
      answer: "<p>IPS FAQ answer " + i + ".</p>",
      _id: "exam-faq-" + i,
    });
  }

  return {
    status: true,
    data: {
      exam: {
        _id: "6ae3c0105ce230ea6d757505",
        pageId: "EXM-EXAM-PAGE-012",
        slug: "ips-exam",
        status: "approved",
        title: "IPS Exam 2027: Exam Details, Eligibility, Syllabus, Age Limit",
        shortTitle: "IPS Exam 2027:",
        pageType: "parent",
        parentId: null,
        pageSliderTitle: "Overview",
        examMode: "Online",
        fullForm: null,
        examDate: null,
        registrationRange: { start: null, end: null },
        resultDate: null,
        examCategories: [],
        levels: [],
        streams: [],
        tags: [],
        shortDescription: null,
        isRecommended: false,
        approvalDate: "2026-11-06T17:19:17.222Z",
        createdAt: "2026-11-06T17:19:17.296Z",
        updatedAt: "2026-11-06T17:19:17.296Z",
        modifiedDate: "2026-10-29T21:52:16.958Z",
        createdBy: { username: "Pooja Sharma" },
        authors: [{ name: "Pooja Sharma" }],
        logo: { url: "", alt: "" },
        rightSideBar: { heading: "Discover All Essential Exam Information" },
        hero: { title: "", subtitle: "", description: "", image: "", buttons: [] },
        seo: {
          meta: {
            metaTitle: "IPS Exam 2027: Eligibility, Syllabus, Salary, Exam Pattern",
            metaDescription: "Get complete details on IPS Exam 2027, including eligibility criteria, age limit, syllabus, exam pattern, application fee, vacancies, salary, and selection process.",
            canonicalUrl: "",
          },
          og: { ogTitle: "", ogDescription: "", ogImage: "", ogUrl: "" },
          twitter: { twitterTitle: "", twitterDescription: "", twitterImage: "" },
          settings: { robotsTag: "index, follow" },
          tag_code: { headerCode: "", footerCode: "" },
        },
        tableOfContents: toc,
        faqs: null,
        pageLevelFaqs: faqs,
        relatedExams: [],
        sliderContent: [{ slug: "ips-exam" }],
        samplePapers: null,
        sections,
      },
    },
  };
}

cases.push(async () => {
  mockStatus = 200;
  mockBody = ipsDetail();
  calls.length = 0;
  const res = await getExamBySlug("ips-exam");
  assert.ok(res.exam);
  assert.equal(res.exam.slug, "ips-exam");
  assert.equal(res.exam.status, "approved");
  assert.equal(res.sections.length, 21);
  assert.equal(res.sections[0].id, "section-0");
  assert.equal(res.sections[0].blocks.length, 1);
  assert.equal(String(res.sections[0].blocks[0].type).toLowerCase(), "richtext");
  assert.equal(res.toc.length, 21);
  assert.equal(res.toc[0].id, "section-0");
  assert.equal(res.faqs.length, 8);
  assert.equal(res.relatedExams.length, 0);
  assert.equal(res.samplePapers, null);
  assert.equal(res.hero && res.hero.buttons.length, 0);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { status: true, data: { exam: null } };
  await assert.rejects(() => getExamBySlug("missing-slug"), (e) => e instanceof ExamNotFoundError && e.code === "NOT_FOUND");
});

cases.push(async () => {
  mockStatus = 404;
  mockBody = { status: false, data: null };
  await assert.rejects(() => getExamBySlug("ips-exam"), (e) => e instanceof ExamNotFoundError && e.code === "NOT_FOUND");
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { status: true, data: { exam: { slug: "draft-exam", status: "draft" } } };
  await assert.rejects(() => getExamBySlug("draft-exam"), (e) => e instanceof ExamNotFoundError && e.notApproved === true);
});

for (const fn of cases) {
  await fn();
}

console.log("OK exam service cases: " + cases.length);
console.log("DONE");
