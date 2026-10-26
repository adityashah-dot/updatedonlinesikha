import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  mapUniversity,
  mapLocationColleges,
  mapCompareColleges,
  mapFeaturedUniversities,
  getUniversitiesPayload,
  sortUniversities,
  LISTING_SORT_FIELDS,
} from "../src/services/universityApi.js";
import { paginateUniversities, getUniversityPageNumbers } from "../src/services/universityPagination.js";
import { buildCollegeNavigation, resolveNavTarget } from "../src/services/collegeNavigation.js";
import {
  LISTING_COMPLETE,
  LISTING_PARTIAL,
  LISTING_MISSING_OPTIONALS,
  LISTING_EMPTY_ARRAYS,
  LISTING_NULL_FIELDS,
  LISTING_MALFORMED,
  catalogueRecords,
  SEARCH_TERM,
} from "./fixtures/model.mjs";

const originalFetch = globalThis.fetch;

function stubListing(records) {
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ data: { universities: records } }) });
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

/* ---------- A. University data adapter tests ---------- */

test("maps a complete API record with id/slug/name and derived fields", () => {
  const mapped = mapUniversity(LISTING_COMPLETE, 0);

  assert.equal(mapped.id, "complete-university-online");
  assert.equal(mapped.slug, LISTING_COMPLETE.slug);
  assert.equal(mapped.name, LISTING_COMPLETE.collegeName);
  assert.equal(mapped.short, "CUO");
  assert.equal(mapped.location, LISTING_COMPLETE.collegeLocation);
  assert.equal(mapped.established, "2006");
  assert.equal(mapped.rankNote, "NIRF Rank #21");
  assert.equal(mapped.naac, "NAAC A++");
  assert.deepEqual(mapped.approvals, ["NAAC A++", "UGC-DEB"]);
  assert.equal(mapped.logoImage, "https://img.test/complete.png");
  assert.ok(mapped.specs.some((spec) => spec.label === "Programs" && spec.value === "14 Courses"));
  assert.ok(mapped.specs.some((spec) => spec.label === "Highest CTC Record"));
});

test("mapUniversity preserves numeric established years and rejects object values", () => {
  const numeric = mapUniversity({ slug: "numeric-year", collegeName: "Numeric Year", established: 1998 });
  assert.equal(numeric.established, "1998");
  assert.ok(numeric.specs.some((spec) => spec.label === "Established" && spec.value === "1998"));

  const malformed = mapUniversity({ slug: "object-year", collegeName: "Object Year", established: { year: 1998 } });
  assert.equal(malformed.established, "");
  assert.ok(!malformed.specs.some((spec) => spec.label === "Established"));
});

test("partial record maps safely; absent optional fields stay empty (no fabrication)", () => {
  const mapped = mapUniversity(LISTING_PARTIAL, 3);

  assert.equal(mapped.name, LISTING_PARTIAL.collegeName);
  assert.equal(mapped.short, LISTING_PARTIAL.collegeName.slice(0, 3).toUpperCase());
  assert.equal(mapped.rankNote, "");
  /* accreditation genuinely present in the API -> mapped; not fabricated */
  assert.equal(mapped.naac, "NAAC A++");
  assert.equal(mapped.highestPackage, 0);
  assert.ok(mapped.feeLabel.startsWith("\u20B946,000"));
  assert.ok(!mapped.specs.some((spec) => spec.label === "Established"));
  assert.ok(!mapped.specs.some((spec) => spec.label === "Highest CTC Record"));
});

test("record without optionals and empty arrays produces empty strings, never undefined", () => {
  const sparse = mapUniversity(LISTING_MISSING_OPTIONALS, 0);
  assert.equal(sparse.name, LISTING_MISSING_OPTIONALS.collegeName);
  assert.equal(sparse.rankNote, "");
  assert.equal(sparse.logoImage, "");
  assert.deepEqual(sparse.specs.map((s) => s.label).filter((label) => label === "Established"), []);

  const emptyLists = mapUniversity(LISTING_EMPTY_ARRAYS, 0);
  assert.deepEqual(emptyLists.approvals, []);
  assert.equal(emptyLists.naac, "");
  assert.equal(typeof emptyLists.feeLabel, "string");
  assert.equal(emptyLists.feeLabel, "");
});

test("null nested fields are tolerated (no throw, no '[object Object]' leaks)", () => {
  const mapped = mapUniversity(LISTING_NULL_FIELDS, 0);

  assert.equal(mapped.name, LISTING_NULL_FIELDS.collegeName);
  assert.equal(mapped.established, "");
  assert.equal(mapped.rankNote, "");
  assert.equal(mapped.logoImage, "");
  assert.equal(mapped.minFee, null);
  assert.equal(mapped.feeLabel, "");

  const html = JSON.stringify(mapped);
  assert.ok(!/\[object Object\]/.test(html), "no [object Object] artifacts");
  assert.ok(!/undefined/.test(JSON.stringify(mapped.specs)), "no undefined spec values");
});

test("malformed field types are neutralized instead of crashing or leaking", () => {
  const mapped = mapUniversity(LISTING_MALFORMED, 0);

  assert.deepEqual(mapped.approvals, [], "non-array accreditations become []");
  assert.equal(mapped.naac, "");
  assert.equal(mapped.logoImage, "", "non-string/image-object logos become empty");
  assert.equal(mapped.feeLabel, "", "non-numeric fee strings never print as NaN");

  const serialized = JSON.stringify(mapped);
  assert.ok(!/\[object Object\]/.test(serialized));
  assert.ok(!/NaN/.test(serialized));
});

test("mapUniversity tolerates null records and non-array inputs in derived mappers", () => {
  assert.doesNotThrow(() => mapUniversity(null, 0));
  const mapped = mapUniversity(null, 0);
  assert.equal(mapped.name, "University");

  assert.deepEqual(mapLocationColleges(null), []);
  assert.deepEqual(mapCompareColleges("nope"), []);
  assert.deepEqual(mapFeaturedUniversities(undefined), []);

  assert.doesNotThrow(() => mapLocationColleges([null, mapUniversity(null, 0)]));
  assert.doesNotThrow(() => mapCompareColleges([null, mapUniversity(null, 1)]));

  const loc = mapLocationColleges([mapUniversity(null, 0)])[0];
  assert.equal(loc.logoLetter, "UN");
  assert.equal(loc.logoColor, "from-blue-600 to-indigo-800");
});

test("compare mapping joins approvals only from real arrays", () => {
  const comparison = mapCompareColleges([
    mapUniversity(LISTING_COMPLETE, 0),
    mapUniversity(LISTING_MISSING_OPTIONALS, 1),
  ]);
  assert.equal(comparison[0].approvals, "NAAC A++, UGC-DEB");
  assert.equal(comparison[1].approvals, "");
});

/* ---------- Shared pagination + sort safety ---------- */

test("paginateUniversities guards non-array input and clamps the page", () => {
  assert.deepEqual(paginateUniversities(null, 1), []);
  assert.deepEqual(paginateUniversities(undefined, 3), []);
  assert.deepEqual(paginateUniversities([], 2), []);
  /* A page is capped at eight and out-of-range pages clamp to the final page. */
  assert.deepEqual(paginateUniversities([1, 2, 3, 4, 5, 6, 7, 8, 9], 99), [9]);
  assert.deepEqual(paginateUniversities([1, 2, 3, 4, 5, 6, 7, 8, 9], 2), [9]);
  assert.deepEqual(paginateUniversities([1, 2, 3, 4, 5, 6, 7, 8, 9], 0), [1, 2, 3, 4, 5, 6, 7, 8]);
});

test("getUniversityPageNumbers clamps bad bounds", () => {
  assert.deepEqual(getUniversityPageNumbers(0, 3), [1, 2, 3]);
  assert.deepEqual(getUniversityPageNumbers(9, 3), [1, 2, 3]);
  assert.deepEqual(getUniversityPageNumbers(1, 0), [1]);
});

test("sortUniversities orders the whole mapped list by the selected field", () => {
  const universities = catalogueRecords().map((record, index) => mapUniversity(record, index));

  const byLowestFee = sortUniversities(universities, "lowestFee");
  const fees = byLowestFee
    .map((u) => (typeof u.minFee === "number" ? u.minFee : null))
    .filter((fee) => fee !== null);
  for (let i = 1; i < fees.length; i += 1) {
    assert.ok(fees[i - 1] <= fees[i], "numeric fee order is non-decreasing");
  }
  assert.equal(byLowestFee.at(-1).minFee, null, "malformed fee is normalized to unavailable and sorts last");
  assert.equal(byLowestFee.at(-1).feeLabel, "", "malformed fee does not leak into the card label");

  const byHighestFee = sortUniversities(universities, "highestFee");
  assert.ok(byHighestFee[0].minFee >= byHighestFee[1].minFee);

  const byNirf = sortUniversities(universities, "nirf");
  assert.equal(byNirf[0].slug, "complete-university-online", "rank 21 sorts first ahead of unraked entries");

  assert.deepEqual(sortUniversities(universities, "unknown-key"), universities, "unknown sort passthrough");
  assert.deepEqual(sortUniversities(null, "lowestFee"), []);

  /* Sorting must not fabricate or drop fields. */
  byLowestFee.forEach((university) => assert.ok(university.specs != null));
});

test("LISTING_SORT_FIELDS matches the options rendered in the toolbars", () => {
  assert.deepEqual(Object.keys(LISTING_SORT_FIELDS).sort(), ["highestFee", "highestPackage", "lowestFee", "nirf"].sort());
});

test("getUniversitiesPayload applies search, sorts the full list and paginates", async () => {
  const { orderedApiRoutes } = await import("./fixtures/model.mjs");
  globalThis.fetch = async (input) => {
    const url = typeof input === "string" ? input : input.url;
    const routes = orderedApiRoutes();

    const entry = Object.entries(routes).find(([prefix]) => url.startsWith(prefix));
    const { status = 200, json } = entry[1]({ url });

    return { ok: status < 400, status, json: async () => json };
  };

  const page1 = await getUniversitiesPayload({ page: 1, search: SEARCH_TERM });
  assert.equal(page1.onlineUniversities.length, 8, "search results still respect the eight-record page size");
  assert.ok(page1.onlineUniversities.every((university) => university.name.includes("Bulk")));
  assert.equal(page1.pagination.total, 22, "searched catalogue has the 22 bulk records");
  assert.equal(page1.pagination.totalPages, 3);
  assert.equal((await getUniversitiesPayload({ page: 2, search: SEARCH_TERM })).onlineUniversities.length, 8);

  const byLowestFee = await getUniversitiesPayload({ page: 1, sort: "lowestFee" });
  const sortedFees = byLowestFee.onlineUniversities
    .map((university) => university.minFee)
    .filter((fee) => typeof fee === "number");
  for (let i = 1; i < sortedFees.length; i += 1) {
    assert.ok(sortedFees[i - 1] <= sortedFees[i]);
  }
});

/* ---------- Navigation builders (slug/ID mapping safety) ---------- */

test("buildCollegeNavigation tolerates null entries and builds stable tabs", () => {
  assert.deepEqual(buildCollegeNavigation({ entries: null }).tabs, []);

  const nav = buildCollegeNavigation({
    navBase: "complete-university-online",
    entries: [
      { slug: "complete-university-online/courses", navbarTitle: "Courses and Fees" },
      { slug: "complete-university-online", navbarTitle: "Overview" },
    ],
  });

  assert.deepEqual(
    nav.tabs.map((tab) => tab.section),
    ["overview", "courses"]
  );
  assert.equal(nav.tabs[0].href, "/universities/complete-university-online");

  /* With a navBase but no published entries the Overview tab still exists. */
  const fallback = buildCollegeNavigation({ navBase: "solo-university-online", entries: null });
  assert.deepEqual(fallback.tabs.map((tab) => tab.section), ["overview"]);
});

test("resolveNavTarget answers null for unpublished sub pages", () => {
  const entries = [{ slug: "complete-university-online/courses", navbarTitle: "Courses" }];

  assert.equal(resolveNavTarget({ requestedPath: "complete-university-online/unknown", navBase: "complete-university-online", entries }), null);
  assert.equal(resolveNavTarget({ requestedPath: "", entries }), null);

  const target = resolveNavTarget({ requestedPath: "complete-university-online/courses", navBase: "complete-university-online", entries });
  assert.equal(target.kind, "sub");
  assert.equal(target.sub, "courses");
});
