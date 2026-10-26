import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";
import {
  buildKnowledgeRecords,
  syncDataset,
  detectIntent,
  matchUniversities,
  searchRecords,
  contextualSuggestions,
  answerChat,
  setDatasetPathForTesting,
} from "../src/services/chatbotDataset.mjs";

/* Fixtures mirror the production API field shapes (b2c endpoints).
   Fee strings are ASCII-safe on purpose so the test file cannot degrade
   through console encoding; numeric parsing produces the same result. */
const LISTING_A = {
  collegeName: "Lovely Professional University Online",
  collegeShortName: "LPU",
  slug: "lovely-professional-university-online",
  collegeMode: "online",
  collegeLocation: "Phagwara, Punjab",
  established: "2005",
  minFee: 192000,
  coursesCount: 47,
  accreditations: ["NAAC A++", "UGC-DEB"],
  highestPackage: 810,
};
const LISTING_B = {
  collegeName: "Lovely Professional University Distance Education",
  slug: "lpu-distance-education",
  collegeMode: "online",
  collegeLocation: "Phagwara, Punjab",
  minFee: 120000,
};
const LISTING_C = {
  collegeName: "Demo State University Online",
  slug: "demo-state-university-online",
  collegeMode: "online",
  collegeLocation: "Demo City, State",
  minFee: 50000,
  maxFee: 90000,
  coursesCount: 7,
};

const COURSES_A = [
  {
    degreeName: "Online MBA",
    slug: "/lpu-online/mba",
    avgFee: 124000,
    avgDuration: 2,
    courses: [{ level: "pg", mode: "online" }],
  },
];

const DETAIL_A = {
  slug: "lovely-professional-university-online",
  title: "LPU Online",
  college_id: {
    _id: "lpu-1",
    name: "Lovely Professional University Online",
    slug: "lovely-professional-university-online",
    location: "Phagwara, Punjab",
    established: "2005",
    collegeMode: "online",
    collegeShortName: "LPU",
    approvals: ["NAAC A++", "UGC-DEB", "AICTE"],
    placementStats: { highestPackage: "810" },
  },
  hero: { description: "<p>LPU Online is a UGC-DEB entitled university.</p>" },
  sections: [
    {
      title: "Fee Structure",
      blocks: [
        {
          type: "richtext",
          content: "<table><tr><th>Programme</th><th>Duration</th><th>Per Semester</th><th>Total</th></tr><tr><td>Online MBA</td><td>2 years</td><td>31000</td><td>124000</td></tr></table>",
        },
      ],
    },
    {
      title: "Eligibility Criteria",
      blocks: [
        {
          type: "richtext",
          content: "<table><tr><th>Course</th><th>Eligibility</th><th>Selection</th><th>Duration</th></tr><tr><td>Online MBA</td><td>Bachelor degree (50%)</td><td>Merit-based</td><td>2 years</td></tr></table>",
        },
      ],
    },
    {
      title: "Important Dates",
      blocks: [{ type: "important_dates", content: { items: [{ event: "Admissions close", date: "31 Jul 2026" }] } }],
    },
    {
      title: "Scholarships",
      blocks: [{ type: "richtext", content: "<ul><li>Jai Jawan: 100% for defense personnel</li><li>Student Grant: up to 20%</li></ul>" }],
    },
  ],
  faq: {
    heading: "FAQs",
    items: [{ question: "Does LPU Online provide placement support?", answer: "Yes, placement assistance is provided." }],
  },
};

const REVIEWED_FEE = "<table><tr><th>Programme</th><th>Duration</th><th>Per Semester</th><th>Total</th></tr><tr><td>Online MBA</td><td>2 years</td><td>40000</td><td>160000</td></tr></table>";

function listingDeps(records, details = {}, coursesByCollegeId = {}) {
  return {
    fetchListingImpl: async () => records,
    fetchCollegeDetailImpl: async (slug) => details[slug] ?? (() => { throw new Error("detail 404"); })(),
    fetchCollegeCoursesImpl: async (collegeId) => coursesByCollegeId[collegeId] ?? [],
  };
}

test("buildKnowledgeRecords derives records only from provided API fields", () => {
  const records = buildKnowledgeRecords({ slug: LISTING_A.slug, listing: LISTING_A, detail: null, courses: [], syncedAt: "2026-01-01T00:00:00Z" });
  const categories = records.map((r) => r.category);
  assert.ok(categories.includes("overview"));
  assert.ok(categories.includes("fees"));
  assert.ok(categories.includes("accreditation"));
  /* No detail provided: no eligibility/deadline/scholarship records may be invented */
  assert.ok(!categories.includes("eligibility"));
  assert.ok(!categories.includes("deadlines"));
  assert.ok(!categories.includes("scholarships"));
  records.forEach((r) => {
    assert.equal(r.universityName, LISTING_A.collegeName);
    assert.ok(r.sourceUrl.includes(r.slug));
    assert.ok(r.lastSyncedAt);
    assert.ok(r.contentHash);
  });
});

test("detail-derived records come from published sections only", () => {
  const records = buildKnowledgeRecords({ slug: LISTING_A.slug, listing: LISTING_A, detail: DETAIL_A, courses: COURSES_A, syncedAt: "2026-01-01T00:00:00Z" });
  const fees = records.filter((r) => r.category === "fees" && /Online MBA/.test(r.question));
  assert.equal(fees.length, 1);
  assert.match(fees[0].answer, /31,000/);
  assert.match(fees[0].answer, /1,24,000/);
  const deadlines = records.filter((r) => r.category === "deadlines");
  assert.equal(deadlines.length, 1);
  assert.match(deadlines[0].answer, /31 Jul 2026/);
  const scholarships = records.filter((r) => r.category === "scholarships");
  assert.equal(scholarships.length, 1);
  /* FAQ copied verbatim */
  const faqs = records.filter((r) => r.category === "faqs");
  assert.equal(faqs.length, 1);
  assert.match(faqs[0].answer, /placement assistance/);
  /* unique ids */
  const ids = new Set(records.map((r) => r.id));
  assert.equal(ids.size, records.length);
});

test("sync: hash-based change detection avoids duplication and refreshes when content changes", async () => {
  const cache = path.join(os.tmpdir(), `chatbot-test-${Date.now()}-${process.pid}.json`);
  setDatasetPathForTesting(cache);

  const first = await syncDataset(listingDeps([LISTING_A, LISTING_B], { [LISTING_A.slug]: DETAIL_A }, { "lpu-1": COURSES_A }));
  assert.ok(first.ok);
  const store1 = JSON.parse(fs.readFileSync(cache, "utf8"));
  const count1 = store1.records.length;
  const feeRecord = store1.records.find((r) => /Online MBA/.test(r.question) && r.category === "fees");
  assert.ok(feeRecord, "per-course fee record must exist after detail sync");
  const hash1 = feeRecord.contentHash;
  const syncStamp = store1.records[0].lastSyncedAt;

  /* Identical second sync: no detail fetched, no duplication. */
  const second = await syncDataset(listingDeps([LISTING_A, LISTING_B], { [LISTING_A.slug]: DETAIL_A }, { "lpu-1": COURSES_A }));
  assert.equal(second.detailsFetched, 0);
  const store2 = JSON.parse(fs.readFileSync(cache, "utf8"));
  assert.equal(store2.records.length, count1);
  assert.equal(store2.records.filter((r) => r.category === "fees" && /Online MBA/.test(r.question)).length, 1);

  /* Fee change with unchanged listing: forceAll re-syncs details (the CLI's
     --force path or a detail catch-up run detects CMS-only changes). */
  const DETAIL_CHANGED = JSON.parse(JSON.stringify(DETAIL_A));
  DETAIL_CHANGED.sections[0].blocks[0].content = REVIEWED_FEE;
  const third = await syncDataset({ ...listingDeps([LISTING_A, LISTING_B], { [LISTING_A.slug]: DETAIL_CHANGED }, { "lpu-1": COURSES_A }), forceAll: true });
  assert.equal(third.detailsFetched, 1);
  const store3 = JSON.parse(fs.readFileSync(cache, "utf8"));
  assert.equal(store3.records.length, count1);
  const feeRecord3 = store3.records.find((r) => /Online MBA/.test(r.question) && r.category === "fees");
  assert.notEqual(feeRecord3.contentHash, hash1);
  assert.match(feeRecord3.answer, /40,000/);
  assert.notEqual(feeRecord3.lastSyncedAt, syncStamp);

  setDatasetPathForTesting("");
});

test("sync: removed universities are deactivated, failed syncs retain previous dataset", async () => {
  const cache = path.join(os.tmpdir(), `chatbot-test-${Date.now()}-${process.pid}.json`);
  setDatasetPathForTesting(cache);

  await syncDataset(listingDeps([LISTING_A, LISTING_C], {}, {}));
  const after = JSON.parse(fs.readFileSync(cache, "utf8"));

  /* University removed from listing -> deactivated but retained. */
  await syncDataset(listingDeps([LISTING_C], {}, {}));
  const stored = JSON.parse(fs.readFileSync(cache, "utf8"));
  const removed = stored.records.filter((r) => r.universityId === LISTING_A.slug);
  assert.ok(removed.length > 0);
  removed.forEach((r) => assert.equal(r.isActive, false));
  assert.ok(stored.records.filter((r) => r.universityId === LISTING_C.slug && r.isActive).length > 0);

  /* API outage: dataset retained, stale flagged. */
  await syncDataset({ fetchListingImpl: async () => { throw new Error("upstream 503"); } });
  const retained = JSON.parse(fs.readFileSync(cache, "utf8"));
  assert.equal(retained.records.length, stored.records.length);
  assert.equal(retained.meta.stale, true);
  assert.match(retained.meta.lastSyncError, /upstream 503/);

  setDatasetPathForTesting("");
});

test("retrieval: intent detection, brand matching, and stemming", () => {
  assert.equal(detectIntent("What is the fee of Online MBA at LPU?"), "fees");
  assert.equal(detectIntent("eligibility for admission"), "eligibility");
  assert.equal(detectIntent("compare Amity and Manipal fees"), "compare");

  const dataset = {
    meta: { listingCount: 3 },
    records: []
      .concat(buildKnowledgeRecords({ slug: LISTING_A.slug, listing: LISTING_A, detail: DETAIL_A, courses: COURSES_A, syncedAt: "2026-01-01T00:00:00Z" }))
      .concat(buildKnowledgeRecords({ slug: LISTING_B.slug, listing: LISTING_B, detail: null, courses: [], syncedAt: "2026-01-01T00:00:00Z" }))
      .concat(buildKnowledgeRecords({ slug: LISTING_C.slug, listing: LISTING_C, detail: null, courses: [], syncedAt: "2026-01-01T00:00:00Z" })),
    universities: {
      [LISTING_A.slug]: { name: LISTING_A.collegeName },
      [LISTING_B.slug]: { name: LISTING_B.collegeName },
      [LISTING_C.slug]: { name: LISTING_C.collegeName },
    },
  };

  /* Distinction between similar names: only the online variant wins for "lpu". */
  const matched = matchUniversities(dataset, "What is the fee of Online MBA at LPU?");
  assert.equal(matched.length, 1);
  assert.equal(matched[0].slug, "lovely-professional-university-online");

  /* Stemming: singular "fee" still finds the "fees" record. */
  const records = searchRecords(dataset, { query: "What is the fee of Online MBA at LPU?", intent: "fees", universities: matched });
  assert.ok(records.length > 0);
  assert.ok(records.every((r) => r.universityId === "lovely-professional-university-online"));
  assert.ok(records.some((r) => /31,000/.test(r.answer)));

  /* Non-brand query retrieves records across universities. */
  const generic = searchRecords(dataset, { query: "Which universities offer Online MBA?", intent: "courses", universities: [] });
  assert.ok(generic.length > 0);
});

test("missing information: no verified info answer, no fabricated values, filtered follow-ups", () => {
  const dataset = {
    meta: { listingCount: 1, lastSyncAt: "2026-01-02T00:00:00Z" },
    records: buildKnowledgeRecords({ slug: LISTING_C.slug, listing: LISTING_C, detail: null, courses: [], syncedAt: "2026-01-02T00:00:00Z" }),
    universities: { [LISTING_C.slug]: { name: LISTING_C.collegeName } },
  };
  const suggestions = contextualSuggestions({ intent: "deadlines", universities: [], records: [], dataset });
  assert.ok(suggestions.length <= 5);
  assert.ok(suggestions.every((s, i, all) => all.indexOf(s) === i)); // deduped

  const suggested = contextualSuggestions({ intent: "fees", universities: [ { slug: LISTING_C.slug } ], records: [], dataset });
  assert.ok(!suggested.includes("Are scholarships available?"), "scholarship follow-up must not be offered without scholarship data");
  assert.ok(!suggested.includes("What are the important dates?"), "deadline follow-up must not be offered without deadline data");
});

test("answerChat (no AI key): grounded fallback answers from the dataset and never from thin air", async () => {
  const dataset = {
    meta: { listingCount: 2, lastSyncAt: "2026-01-02T00:00:00Z" },
    records: []
      .concat(buildKnowledgeRecords({ slug: LISTING_A.slug, listing: LISTING_A, detail: DETAIL_A, courses: COURSES_A, syncedAt: "2026-01-02T00:00:00Z" }))
      .concat(buildKnowledgeRecords({ slug: LISTING_C.slug, listing: LISTING_C, detail: null, courses: [], syncedAt: "2026-01-02T00:00:00Z" })),
    universities: { [LISTING_A.slug]: { name: LISTING_A.collegeName }, [LISTING_C.slug]: { name: LISTING_C.collegeName } },
  };

  const missing = await answerChat({ dataset, messages: [{ role: "user", text: "What is the chemistry syllabus at Mars Institute Online?" }], modelChoice: "gemini-3.5-flash" });
  assert.match(missing.text, /don't have verified information/i);
  assert.ok(missing.suggestions.length >= 3);

  const fees = await answerChat({ dataset, messages: [{ role: "user", text: "LPU Online MBA fees?" }], modelChoice: "gemini-3.5-flash" });
  assert.match(fees.text, /31,000/);
  assert.ok(fees.sources.includes("/universities/lovely-professional-university-online"));
  assert.ok(fees.suggestions.length >= 3 && fees.suggestions.length <= 5);
});

test("contextual suggestions stay grounded and capped", () => {
  const dataset = {
    meta: { listingCount: 2, lastSyncAt: "2026-01-02T00:00:00Z" },
    records: buildKnowledgeRecords({ slug: LISTING_A.slug, listing: LISTING_A, detail: DETAIL_A, courses: COURSES_A, syncedAt: "2026-01-02T00:00:00Z" }),
    universities: { [LISTING_A.slug]: { name: LISTING_A.collegeName } },
  };
  const records = searchRecords(dataset, { query: "fees", intent: "fees", universities: [ { slug: LISTING_A.slug } ] });
  const suggestions = contextualSuggestions({ intent: "fees", universities: [ { slug: LISTING_A.slug } ], records, dataset });
  assert.ok(suggestions.length >= 3 && suggestions.length <= 5);
  assert.ok(suggestions.every((s, i, all) => all.indexOf(s) === i));
});
