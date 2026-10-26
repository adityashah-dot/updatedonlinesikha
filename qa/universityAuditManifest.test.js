import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const audit = JSON.parse(readFileSync(new URL("./audit/university-slugs.json", import.meta.url), "utf8"));
const universities = audit.universities;
const allowedApiStatuses = new Set(["PASS", "DETAIL_HTTP_404"]);

test("live audit manifest covers every discovered listing record exactly once", () => {
  assert.equal(universities.length, audit.summary.discovery.totalRecords);
  assert.equal(audit.summary.discovery.uniqueSlugs, universities.length);
  assert.deepEqual(audit.summary.discovery.duplicateSlugs, []);
  assert.equal(audit.summary.discovery.invalidSlugRecords, 0);
});

for (const university of universities) {
  test(`slug integrity and API identity: ${university.slug || "missing slug"}`, () => {
    assert.match(university.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(university.universityName, "listing record has a display name");
    assert.ok(university.universityId, "listing record has an ID");
    assert.equal(university.duplicateSlug, false);
    assert.ok(allowedApiStatuses.has(university.apiStatus), `unexpected API status ${university.apiStatus}`);

    if (university.apiStatus === "PASS") {
      assert.equal(university.detailRouteStatus, "API_IDENTITY_PASS");
      assert.equal(university.overviewStatus, "MAPPED");
      assert.equal(university.brokenSections.length, 0);
    } else {
      assert.equal(university.apiStatus, "DETAIL_HTTP_404", "only the recorded upstream detail 404 is allowed");
    }

    for (const field of Object.values(university.fieldAudit)) {
      if (Array.isArray(field)) {
        for (const item of field) assert.notEqual(item.status, "MAPPING_BUG");
      } else if (field && typeof field === "object" && "status" in field) {
        assert.notEqual(field.status, "MAPPING_BUG");
      }
    }
  });
}
