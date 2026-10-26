import test from "node:test";
import assert from "node:assert/strict";
import { getUniversityPageNumbers, paginateUniversities, UNIVERSITY_PAGE_SIZE } from "../src/services/universityPagination.js";

test("university pages contain eight records and preserve API order", () => {
  const universities = Array.from({ length: 19 }, (_, index) => ({ id: `college-${index + 1}` }));

  assert.equal(UNIVERSITY_PAGE_SIZE, 8);
  assert.deepEqual(paginateUniversities(universities, 1).map((college) => college.id), universities.slice(0, 8).map((college) => college.id));
  assert.deepEqual(paginateUniversities(universities, 2).map((college) => college.id), universities.slice(8, 16).map((college) => college.id));
  assert.deepEqual(paginateUniversities(universities, 3).map((college) => college.id), universities.slice(16).map((college) => college.id));
});

test("pagination numbers stay compact for long listings", () => {
  assert.deepEqual(getUniversityPageNumbers(1, 15), [1, 2, 3, "ellipsis", 15]);
  assert.deepEqual(getUniversityPageNumbers(8, 15), [1, "ellipsis", 7, 8, 9, "ellipsis", 15]);
  assert.deepEqual(getUniversityPageNumbers(15, 15), [1, "ellipsis", 13, 14, 15]);
});
