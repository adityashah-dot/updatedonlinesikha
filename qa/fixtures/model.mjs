/**
 * Canonical fixture payloads for the university template tests.
 *
 * The shapes mirror the production b2c API:
 *  - LISTING endpoint rows (GET /website/colleges/listing)
 *  - college detail payloads (GET /website/colleges/{slug}) with CMS sections
 *  - navbar-list / gallery / courses-new / blogs wrapper shapes
 */

const LISTING_BASE = {
  collegeMode: "online",
  collegeLocation: "Phagwara, Punjab",
  accreditations: ["NAAC A++", "UGC-DEB"],
};

/* ---- Listing records: complete / partial / missing optionals / malformed ---- */

export const LISTING_COMPLETE = {
  ...LISTING_BASE,
  slug: "complete-university-online",
  collegeName: "Complete University Online",
  collegeShortName: "CUO",
  established: "2006",
  coursesCount: 14,
  minFee: 105000,
  maxFee: 165000,
  highestPackage: "8 LPA",
  placementHighest: "5 LPA",
  collegeLogo: { url: "https://img.test/complete.png" },
  nirfRanking: 21,
};

export const LISTING_PARTIAL = {
  ...LISTING_BASE,
  slug: "partial-university-online",
  collegeName: "Partial University Online",
  minFee: 46000,
};

export const LISTING_MISSING_OPTIONALS = {
  collegeMode: "online",
  slug: "sparse-university-online",
  collegeName: "Sparse University Online",
};

export const LISTING_EMPTY_ARRAYS = {
  ...LISTING_BASE,
  slug: "empty-arrays-university-online",
  collegeName: "Empty Arrays University Online",
  accreditations: [],
  months: [],
};

export const LISTING_NULL_FIELDS = {
  ...LISTING_BASE,
  slug: "null-fields-university-online",
  collegeName: "Null Fields University Online",
  established: null,
  minFee: null,
  maxFee: null,
  highestPackage: null,
  nirfRanking: null,
  collegeLogo: null,
  coursesCount: null,
};

export const LISTING_MALFORMED = {
  ...LISTING_BASE,
  slug: "malformed-university-online",
  collegeName: "Malformed University Online",
  accreditations: { accreditation: "NAAC A++" },
  highestPackage: { amount: 8, unit: "LPA" },
  collegeLogo: 42,
  established: { year: 2004 },
  coursesCount: "not-a-number",
  minFee: "n/a",
};

/* Full 28-record catalogue: pagination (10 per page) + sort coverage. */
export function catalogueRecords() {
  const records = [
    LISTING_COMPLETE,
    LISTING_PARTIAL,
    LISTING_MISSING_OPTIONALS,
    LISTING_EMPTY_ARRAYS,
    LISTING_NULL_FIELDS,
    LISTING_MALFORMED,
  ];

  for (let i = 1; i <= 22; i += 1) {
    records.push({
      ...LISTING_BASE,
      slug: `bulk-university-${String(i).padStart(2, "0")}-online`,
      collegeName: `Bulk University ${i} Online`,
      collegeShortName: `B${i}`,
      established: 1990 + i,
      coursesCount: 6 + i,
      minFee: 60000 + i * 2500,
      maxFee: 95000 + i * 2500,
      nirfRanking: 60 - i,
      highestPackage: `${4 + (i % 6)} LPA`,
    });
  }

  return records;
}

/** 30-char search copy that matches only the "Bulk" universities. */
export const SEARCH_TERM = "Bulk University";

export function searchedListingRecords() {
  return catalogueRecords().filter((record) => String(record.collegeName || "").includes("Bulk"));
}

/* ---- College detail payloads ---- */

const COURSE_FEE_TABLE =
  "<table><tr><th>Programme</th><th>Duration</th><th>Per Semester</th><th>Total</th></tr>" +
  "<tr><td>Online MBA</td><td>2 years</td><td>31000</td><td>124000</td></tr>" +
  "<tr><td>Online MCA</td><td>2 years</td><td>27000</td><td>108000</td></tr></table>";

const ELIGIBILITY_TABLE =
  "<table><tr><th>Course</th><th>Eligibility</th><th>Selection</th><th>Duration</th></tr>" +
  "<tr><td>Online MBA</td><td>Bachelor degree (50% aggregate)</td><td>Merit-based</td><td>2 years</td></tr></table>";

const HIGHLIGHTS_TABLE =
  "<table><tr><th>Particulars</th><th>Details</th></tr>" +
  "<tr><td>Recognized</td><td>UGC-DEB Entitled</td></tr>" +
  "<tr><td>Study Mode</td><td>100% Online</td></tr></table>";

export const DETAIL_COMPLETE = {
  slug: "complete-university-online",
  title: "Complete University Online",
  shortTitle: "Online University",
  college_id: {
    _id: "cuo-1",
    name: "Complete University Online",
    slug: "complete-university-online",
    collegeShortName: "CUO",
    location: "Phagwara, Punjab",
    established: "2006",
    collegeMode: "online",
    approvals: ["NAAC A++", "UGC-DEB", "AICTE"],
    minFee: 105000,
    maxFee: 165000,
    rating: 4.6,
    collegeLogo: "/logo.png",
    placementStats: { highestPackage: "810" },
    scholarships: [],
    reviews: [],
  },
  hero: {
    description: "<p>Complete University Online delivers UGC-DEB entitled online degrees.</p>",
    subtitle: "CUO",
    logoImage: "/logo.png",
  },
  latestNews: {
    title: "Admissions Open 2026",
    description: "<p>Applications for the July 2026 session are being accepted.</p>",
  },
  updatedAt: "2026-07-01T00:00:00Z",
  createdBy: { username: "admissions" },
  sections: [
    {
      title: "About the University & Highlights",
      blocks: [{ type: "richtext", content: `<p>Approved by UGC-DEB and NAAC A++ accredited, ${"offering 14 programmes"}</p>${HIGHLIGHTS_TABLE}` }],
    },
    {
      title: "Fee Structure",
      blocks: [{ type: "richtext", content: COURSE_FEE_TABLE }],
    },
    {
      title: "Eligibility Criteria",
      blocks: [{ type: "richtext", content: ELIGIBILITY_TABLE }],
    },
    {
      title: "Admission Process",
      blocks: [
        { type: "admission_flow", content: { steps: [
          { title: "Register Online", description: "<p>Create your application account.</p>" },
          { title: "Submit Documents", description: "<p>Upload scanned marksheets and ID.</p>" },
          { title: "Pay Fees", description: "<p>Choose semester plan or zero-cost EMI.</p>" },
        ] } },
      ],
    },
    {
      title: "Important Dates",
      blocks: [{ type: "important_dates", content: { items: [
        { event: "Applications Open", date: "01 Jun 2026" },
        { event: "Admissions close", date: "31 Jul 2026" },
      ] } }],
    },
    {
      title: "Scholarships",
      blocks: [{ type: "richtext", content: "<ul><li>Merit Grant: up to 20%</li><li>Defense Concession: 100%</li></ul>" }],
    },
    {
      title: "Examination Pattern",
      blocks: [
        { type: "admission_flow", content: { steps: [
          { title: "Online Proctored Exams", description: "<p>Home-proctored, 360-degree scans.</p>" },
        ] } },
      ],
    },
    {
      title: "Placements",
      blocks: [{ type: "placement_stats", content: {
        placementRate: "90%",
        highestPackage: "INR 8 LPA",
        hiringPartners: "300+",
      } }],
      recruiterLogos: [{ altText: "Amazon", url: "https://img.test/amazon.png" }, { altText: "TCS" }],
    },
    {
      title: "Student Reviews",
      blocks: [{ type: "testimonials", content: {
        items: [],
        testimonials: [
          { studentName: "Aarav S.", course: "Online MBA", rating: 5, text: "Great LMS experience." },
          { studentName: "Neha K.", course: "Online MCA", rating: 4, text: "Supportive faculty." },
        ],
      } }],
    },
  ],
  faq: {
    heading: "FAQs",
    items: [
      { question: "Is the degree valid for government jobs?", answer: "Yes, UGC-DEB entitled online degrees are equivalent to on-campus degrees." },
      { question: "Are EMI plans available?", answer: "Zero-cost EMI instalments are supported through finance partners." },
    ],
  },
};

/** Only hero + overview — every optional section is absent. */
export const DETAIL_PARTIAL = {
  slug: "partial-university-online",
  title: "Partial University Online",
  college_id: {
    _id: "puo-1",
    name: "Partial University Online",
    slug: "partial-university-online",
    collegeShortName: "PUO",
    location: "Patiala, Punjab",
    established: "2011",
    collegeMode: "online",
    approvals: ["UGC-DEB"],
  },
  hero: { description: "<p>Partial University Online maintains one public overview page.</p>" },
  sections: [
    {
      title: "About the University",
      blocks: [{ type: "richtext", content: "<p>Bachelor and master online programmes with UGC-DEB entitlement.</p>" }],
    },
  ],
};

/** Detail payload that is not even an object-list of sections. */
export const DETAIL_MALFORMED = {
  slug: "partial-university-online",
  title: "Partial University Online",
  college_id: null,
  hero: "plain-string-hero",
  sections: "not-an-array",
  faq: { items: null },
  latestNews: null,
};

/* navbar-list / courses / blogs wrapper payloads */

export const NAV_COMPLETE = [
  { slug: "complete-university-online", navbarTitle: "Overview", order: 1 },
  { slug: "complete-university-online/courses", navbarTitle: "Courses and Fees", order: 2 },
  { slug: "complete-university-online/admission", navbarTitle: "Admission", order: 3 },
  { slug: "complete-university-online/scholarships", navbarTitle: "Scholarships", order: 4 },
];

export const NAV_PARTIAL = [
  { slug: "partial-university-online", navbarTitle: "Overview", order: 1 },
];

export const COURSES_COMPLETE = [
  {
    degreeName: "Online MBA",
    slug: "/complete-university-online/mba",
    avgFee: 124000,
    avgDuration: 2,
    courses: [{ level: "pg", mode: "online" }],
  },
  {
    degreeName: "Online MCA",
    slug: "/complete-university-online/mca",
    avgFee: 108000,
    avgDuration: 2,
    courses: [{ level: "pg", mode: "online" }],
  },
];

export const BLOGS = [
  { title: "Online MBA guide 2026", excerpt: "How to pick a program.", mainimage: { url: "https://img.test/blog1.png" }, category: "MBA", createdAt: "2026-05-02T00:00:00Z", urlSlug: "online-mba-guide" },
  { title: "UGC-DEB entitlement", excerpt: "Check your university.", mainimage: "", category: "Regulations", createdAt: "2026-05-10T00:00:00Z", urlSlug: "ugc-deb-entitlement" },
];

const B2C = "https://api.degreefyd.com/api/b2c";

/**
 * fetch stub routes covering all endpoints the page loaders hit.
 */
export function apiRoutes({
  listing = catalogueRecords(),
  onlineUniversities = null,
  detailBySlug = {},
  navByCollegeId = {},
  coursesByCollegeId = {},
  blogs = BLOGS,
} = {}) {
  const routes = {
    "https://api.degreefyd.com/api/b2c/website/colleges/listing": ({ url }) => {
      const { searchParams } = new URL(url);
      const search = (searchParams.get("search") || "").toLowerCase();
      const rows = search
        ? search.includes("bulk")
          ? searchedListingRecords()
          : []
        : onlineUniversities || listing;

      return { json: { data: { universities: rows } } };
    },
    "https://api.degreefyd.com/api/b2c/blogs/get-block-blogs": () => ({ json: { data: blogs } }),
    "https://api.degreefyd.com/api/b2c/website/colleges/navbar-list/": ({ url }) => {
      const id = url.split("/navbar-list/")[1]?.split("?")[0] || "";

      return { json: { colleges: navByCollegeId[id] || [] } };
    },
    "https://api.degreefyd.com/api/b2c/website/colleges/gallery": () => ({ json: { data: [] } }),
    "https://api.degreefyd.com/api/b2c/website/colleges/resources": () => ({ json: { data: [] } }),
    "https://api.degreefyd.com/api/b2c/website/colleges/courses-new/": ({ url }) => {
      const id = url.split("/courses-new/")[1]?.split("?")[0] || "";

      return { json: { data: coursesByCollegeId[id] || [] } };
    },
  };

  /* Detail slugs (GET /website/colleges/{slug}) — registered last so
     longer navbar/courses/gallery paths can never collide. */
  routes[`https://api.degreefyd.com/api/b2c/website/colleges/`] = ({ url }) => {
    const slug = decodeURIComponent(url.replace(/^.*\/website\/colleges\//, "").split("?")[0]);

    if (slug.startsWith("gallery?") || slug.startsWith("resources?") || slug.startsWith("navbar-list") || slug.startsWith("courses-new")) {
      return { json: { data: [] } };
    }

    const payload = detailBySlug[slug];

    if (!payload) {
      /* unknown/unpublished slug */
      return { status: 404, json: { message: "not found" } };
    }

    return { json: { data: { data: payload } } };
  };

  return routes;
}

/* URL prefix matching must check the MOST SPECIFIC prefix first. */
export function orderedApiRoutes(options) {
  const routes = apiRoutes(options);
  const entries = Object.entries(routes).sort(
    (a, b) => b[0].length - a[0].length
  );

  return Object.fromEntries(entries);
}
