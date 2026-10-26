import { test } from "node:test";
import assert from "node:assert/strict";
import { mapOverviewData } from "../src/services/overviewMapper.js";

test("Amity eligibility and rankings sections map the live CMS table shapes", () => {
  const overview = mapOverviewData({
    slug: "amity-university-online",
    title: "Amity University Online",
    college_id: {
      name: "Amity University Online",
      collegeShortName: "Amity Online",
      collegeMode: "online",
      approvals: [],
    },
    sections: [
      {
        title: "Amity University Online Eligibility and Selection Criteria",
        blocks: [{
          type: "richtext",
          content: "<p>Admission is primarily based on merit in the qualifying examination. Candidates are selected based on their academic performance and fulfillment of eligibility criteria.</p><table><tbody><tr><td>Course</td><td>Eligibility</td></tr><tr><td>BCA</td><td>Pass Class 12</td></tr></tbody></table>",
        }],
      },
      {
        title: "Amity University Online Rankings and Recognitions",
        blocks: [{
          type: "richtext",
          content: "<p>Rankings from published bodies.</p><table><tbody><tr><td>Ranking Body</td><td>Category</td><td>Rank (2024)</td></tr><tr><td>QS World University Rankings 2024</td><td>Online MBA Programs (Asia-Pacific)</td><td>Top 10</td></tr></tbody></table>",
        }],
      },
    ],
  });

  assert.equal(overview.eligibility.title, "Amity University Online Eligibility and Selection Criteria");
  assert.equal(overview.eligibility.items[0].selection, "", "no per-course selection value is invented");
  assert.match(overview.eligibility.selectionProcess, /merit in the qualifying examination/i);
  assert.match(overview.eligibility.selectionProcess, /academic performance/i);

  assert.equal(overview.rankings.title, "Amity University Online Rankings and Recognitions");
  assert.deepEqual(overview.rankings.columns, ["Ranking Body", "Category", "Rank (2024)"]);
  assert.deepEqual(overview.rankings.table[0].values, [
    "QS World University Rankings 2024",
    "Online MBA Programs (Asia-Pacific)",
    "Top 10",
  ]);
  assert.equal(overview.rankings.table[0].status, "Online MBA Programs (Asia-Pacific) — Top 10");
});

test("a missing eligibility section does not reuse Highlights in the overview", () => {
  const overview = mapOverviewData({
    slug: "dr-babasaheb-ambedkar-open-university",
    title: "Dr. Babasaheb Ambedkar Open University Distance Education",
    college_id: {
      _id: "baou-live-id",
      name: "Dr. Babasaheb Ambedkar Open University",
      collegeShortName: "BAOU",
      collegeMode: "distance",
      approvals: [],
    },
    sections: [
      {
        title: "BAOU Highlights 2026",
        blocks: [{ type: "richtext", content: "<p>Verified BAOU highlights content.</p>" }],
      },
      {
        title: "BAOU Courses & Fees",
        blocks: [{ type: "richtext", content: "<p>Course fee details.</p>" }],
      },
      {
        title: "BAOU Popular Programmes",
        blocks: [{ type: "courses_list", content: { items: [] } }],
      },
      {
        title: "BAOU Admission Process",
        blocks: [{ type: "admission_flow", content: { steps: [{ title: "Apply" }] } }],
      },
    ],
  });

  assert.equal(overview.highlights.title, "BAOU Highlights 2026", "the top Highlights section is retained");
  assert.equal(overview.eligibility, null, "a missing eligibility section stays hidden instead of duplicating Highlights");
});

