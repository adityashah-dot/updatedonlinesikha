import "dotenv/config";
import { loadCollegePage } from "../src/services/collegePageLoader.js";
import { getUniversitiesPayload } from "../src/services/universityApi.js";

const l = await loadCollegePage(["lovely-professional-university-online"]);
console.log(
  "LPU tabs:",
  l.nav.tabs.map((t) => `${t.label} [${t.kind}]`).join(" | ")
);
console.log("LPU section:", l.section, "| unavailable:", !!l.unavailable, "| collegeMode:", l.college.collegeMode);
console.log("LPU overview title:", l.overview.title, "| nav tabs count:", l.nav.tabs.length);

const c = await loadCollegePage(["lovely-professional-university-online", "courses"]);
console.log("LPU/courses -> section:", c.section, "| tabs:", c.nav.tabs.length);

const bad = await loadCollegePage(["lovely-professional-university-online", "scholarships"]);
console.log("unknown sub ->", bad === null ? null : bad.unavailable);

const nonexistent = await loadCollegePage(["not-a-real-college-xyz"]);
console.log("unknown college ->", nonexistent === null ? "null (404)" : "unexpected");

const integral = await loadCollegePage(["integral-university-online"]);
console.log(
  "integral ->",
  integral === null
    ? "null (page not published)"
    : integral.unavailable
      ? "unavailable"
      : `section=${integral.section} title=${integral.overview.title} tabs=${integral.nav.tabs.length}`
);

const listing = await getUniversitiesPayload({ page: 1, search: "" });
const modes = new Set(listing.onlineUniversities.map((u) => u.collegeMode));
console.log(
  "listing online-only? modes:", [...modes].join(",repeat,") || "(none)",
  "| page items:", listing.onlineUniversities.length,
  "| total:", listing.pagination?.total,
  "| error:", listing.error || "none"
);
