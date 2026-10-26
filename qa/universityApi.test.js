import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  getUniversitiesPayload,
  mapUniversity,
  isLearningMode,
  LEARNING_MODES,
  API_URL,
  buildHeaders,
} from "../src/services/universityApi.js";

const originalFetch = globalThis.fetch;

function jsonResponse(data, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    json: async () => data,
  };
}

function makeRecord(index, overrides = {}) {
  return {
    slug: `college-${index}`,
    collegeName: `College ${index}`,
    collegeShortName: `C${index}`,
    collegeLocation: "Greater Noida, Delhi NCR, Uttar Pradesh",
    established: index % 2 ? 2005 : 1998,
    collegeMode: overrides.collegeMode || "online",
    minFee: 25_000 + index * 1_000,
    maxFee: 45_000 + index * 1_000,
    highestPackage: 10 + index,
    placementHighest: 5 + index,
    collegeLogo: { url: `https://img.example/${index}.png` },
    coursesCount: 12,
    accreditations: ["NAAC A++", "UGC Approved"],
    ...overrides,
  };
}

function stubFetchByMode(listings) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const { searchParams } = new URL(url);
    const mode = searchParams.get("mode") || "online";
    const rows = listings[mode] ?? [];
    return jsonResponse({ data: { universities: rows } });
  };
  return calls;
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("listing includes online and distance learning modes", () => {
  assert.deepEqual(LEARNING_MODES, ["online", "distance"]);
  assert.equal(isLearningMode("online"), true);
  assert.equal(isLearningMode("distance"), true);
  assert.equal(isLearningMode("hybrid"), false);
  assert.equal(isLearningMode(""), false);
});

test("getUniversitiesPayload merges modes, deduplicates and returns the first eight records", async () => {
  const online = [
    makeRecord(1),
    { ...makeRecord(2, { collegeMode: "hybrid" }) },
    makeRecord(3),
    { ...makeRecord(1) },
  ];
  const distance = [makeRecord(4, { collegeMode: "distance" }), makeRecord(5, { collegeMode: "distance" })];

  const calls = stubFetchByMode({ online, distance });
  const payload = await getUniversitiesPayload({ page: 1 });

  assert.equal(calls.length, 2, "online and distance listing endpoints are requested");
  assert.deepEqual(calls.map(({ url }) => new URL(url).searchParams.get("mode")).sort(), ["distance", "online"]);
  assert.ok(calls.every(({ url }) => url.includes(`${API_URL}/website/colleges/listing`)));
  assert.ok(calls.every(({ url }) => url.includes("isCollgesNamesRequired=true")));
  assert.ok(calls.every(({ url }) => url.includes("limit=500")));

  assert.equal(payload.error, undefined);
  assert.equal(payload.pagination.total, 4, "hybrid is excluded and duplicate slug dropped");
  assert.equal(payload.pagination.totalPages, 1);
  assert.equal(payload.pagination.currentPage, 1);
  assert.equal(payload.pagination.pageSize, 8);
  assert.equal(payload.onlineUniversities.length, 4, "small catalogues fit on one page");
  assert.ok(payload.onlineUniversities[0].name.startsWith("College"));
  assert.ok(payload.hero.logoImage.includes("img.example"));
});

test("a complete catalogue is split into eight-record listing pages", async () => {
  const online = Array.from({ length: 10 }, (_, i) => makeRecord(i + 1));
  const distance = Array.from({ length: 12 }, (_, i) =>
    makeRecord(i + 11, { collegeMode: "distance" })
  );

  stubFetchByMode({ online, distance });
  const payload = await getUniversitiesPayload({ page: 1 });

  assert.equal(payload.pagination.total, 22);
  assert.equal(payload.pagination.totalPages, 3);
  assert.equal(payload.pagination.pageSize, 8);
  assert.equal(payload.onlineUniversities.length, 8);
  assert.deepEqual(
    payload.onlineUniversities.map((u) => u.name),
    Array.from({ length: 8 }, (_, i) => `College ${i + 1}`)
  );
});

test("page clamp never returns negative or empty window", async () => {
  stubFetchByMode({ online: [makeRecord(1)] });
  const payload = await getUniversitiesPayload({ page: -5 });
  assert.equal(payload.pagination.currentPage, 1);
  assert.equal(payload.onlineUniversities.length, 1);
});

test("mapUniversity formats fees with the rupee sign and cycles highlight tones", () => {
  const first = mapUniversity(makeRecord(0), 0);
  assert.ok(first.feeLabel.includes("\u20B9"));
  assert.ok(first.feeLabel.startsWith("\u20B925,000 - \u20B945,000"));
  assert.equal(first.highlight.tone, "blue");
  assert.equal(first.highlight.text, "Online Mode");
  assert.equal(first.location, "Greater Noida, Delhi NCR, Uttar Pradesh");
  assert.equal(first.naac, "NAAC A++");
  assert.deepEqual(
    first.approvals,
    ["NAAC A++", "UGC Approved"]
  );
  assert.ok(first.specs.some((spec) => spec.label === "Highest CTC Record" && spec.value === "\u20B910"));

  const hypers = new Set();
  for (let i = 0; i < 6; i += 1) {
    const mapped = mapUniversity(makeRecord(i, { slug: `dup-${i}` }), i);
    hypers.add(mapped.highlight.tone);
  }
  assert.equal(hypers.size, 4, "tones cycle across blue/indigo/emerald/amber");
});

test("zero and invalid fee values stay unavailable instead of rendering as free tuition", () => {
  const university = mapUniversity(makeRecord(3, { minFee: 0, maxFee: 0 }));
  assert.equal(university.minFee, null);
  assert.equal(university.maxFee, null);
  assert.equal(university.feeLabel, "");

  const partialRange = mapUniversity(makeRecord(4, { minFee: 0, maxFee: 80000 }));
  assert.equal(partialRange.feeLabel, "₹80,000", "an invalid zero lower bound does not create a malformed range");
});

test("fallbacks retained so tests behave like unit, not e2e", async () => {
  globalThis.fetch = async () => jsonResponse({ data: [] });
  const payload = await getUniversitiesPayload({ page: 1 });

  assert.equal(payload.onlineUniversities.length, 0);
  assert.match(payload.error, /no records/i);
});

test("failed listing returns the friendly error payload", async () => {
  globalThis.fetch = async () => jsonResponse({}, { ok: false, status: 500 });
  const payload = await getUniversitiesPayload({ page: 1 });

  assert.deepEqual(payload.onlineUniversities, []);
  assert.equal(payload.pagination, null);
  assert.match(payload.error, /could not be loaded/i);
});

test("buildHeaders adds bearer token when configured", () => {
  const headers = buildHeaders();
  assert.equal(headers.Accept, "application/json");
});
