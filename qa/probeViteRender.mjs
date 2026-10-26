import "dotenv/config";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "spa",
  logLevel: "error",
});

const { loadCollegePage } = await server.ssrLoadModule("/src/services/collegePageLoader.js");
const { OverviewView } = await server.ssrLoadModule("/src/components/OverviewView.jsx");
const CollegeCourses = (await server.ssrLoadModule("/src/components/CollegeCourses.jsx")).default;
const AdmissionView = (await server.ssrLoadModule("/src/components/AdmissionView.jsx")).default;
const ScholarshipsView = (await server.ssrLoadModule("/src/components/ScholarshipsView.jsx")).default;
const { SiteActionsContext } = await server.ssrLoadModule("/src/components/shell/SiteActionsContext.jsx");

const noop = () => {};
const actions = Object.fromEntries(
  ["onOpenApply", "onOpenBrochure", "onOpenHelpDesk", "onOpenEmi", "onOpenLms", "onSelectCourse", "setActiveCollege"]
    .map((key) => [key, noop])
);

for (const slug of ["integral-university-online", "dmiher-university-online", "lpu-online"]) {
  const page = await loadCollegePage([slug]);
  if (!page || page.unavailable) { console.log(`${slug}: unavailable`); continue; }
  const o = page.overview;
  const rich = [
    `title=${o.title}`,
    `hero=${o.hero?.description?.length || 0}`,
    `highlights=${(o.highlights?.items || []).length}`,
    `feeRows=${(o.coursesFees?.table || []).length}`,
    `perSem=${(o.coursesFees?.table || []).filter((r) => r.perSemFee).length}`,
    `total=${(o.coursesFees?.table || []).filter((r) => r.totalFee).length}`,
    `elig=${(o.eligibility?.items || []).length}`,
    `dates=${(o.admissionDates || []).length}`,
    `steps=${(o.admission?.steps || []).length}`,
    `placements=${o.placements ? JSON.stringify(o.placements.stats) : "absent"}`,
    `gallery=${(o.campus?.gallery || []).length}`,
    `reviews=${(o.reviews || []).length}`,
    `faqs=${(o.faqs || []).length}`,
    `blogs=${(o.blogs || []).length}`,
  ].join(" ");
  console.log(`${slug}: ${rich}`);

  const collegeModel = {
    name: page.college.name,
    shortName: page.college.shortName,
    college: page.college,
  };

  const cases = [
    ["OverviewView", OverviewView, { collegeData: o, onSelectCourse: noop, onOpenApply: noop, onOpenBrochure: noop, onOpenHelpDesk: noop }],
    ["CollegeCourses", CollegeCourses, { college: collegeModel, overview: o }],
    ["CollegeAdmission", AdmissionView, { college: collegeModel, overview: o }],
    ["CollegeScholarships", ScholarshipsView, { college: collegeModel, overview: o }],
  ];

  for (const [name, View, props] of cases) {
    try {
      const html = renderToStaticMarkup(
        React.createElement(SiteActionsContext.Provider, { value: actions, children: React.createElement(View, props) })
      );
      const brand = slug.split("-")[0];
      console.log(`${slug}/${name}: OK length=${html.length} brandMatches=${(html.match(new RegExp(brand, "gi")) || []).length}`);
    } catch (err) {
      console.log(`${slug}/${name}: CRASH -> ${err.message}\n${(err.stack || "").split("\n").slice(1, 4).join("\n")}`);
    }
  }
}

await server.close();
