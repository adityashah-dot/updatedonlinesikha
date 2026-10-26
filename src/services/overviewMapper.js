const SECTION_FIELDS = ["key", "title", "id", "name", "slug", "sectionType"];

/** CMS blocks occasionally send a non-array where a list is expected. */
function asList(value) {
  return Array.isArray(value) ? value : [];
}

function readImage(value) {
  if (typeof value === "string") {
    return /^blob:/i.test(value) ? "" : value;
  }
  if (value && typeof value === "object") {
    if (Array.isArray(value)) return readImage(value[0]);
    return value.url || value.src || value.path || "";
  }
  return "";
}

function stripHtml(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\.Or(?=[A-Z])/g, ". Or ")
    .replace(/([a-z])Or(?=[A-Z])/g, "$1 or ")
    .replace(/\bor(?=\d)/gi, "or ")
    .replace(/\s+/g, " ")
    .trim();
}

function textBeforeTable(html) {
  if (typeof html !== "string") return "";
  const idx = html.indexOf("<table");
  return stripHtml(idx === -1 ? html : html.slice(0, idx));
}

function parseHtmlTables(html) {
  if (typeof html !== "string") return [];

  const tables = [];
  const tableRe = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tableMatch;

  while ((tableMatch = tableRe.exec(html)) !== null) {
    const rows = [];
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch;

    while ((rowMatch = rowRe.exec(tableMatch[1])) !== null) {
      const cells = [];
      const cellRe = /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi;
      let cellMatch;

      while ((cellMatch = cellRe.exec(rowMatch[1])) !== null) {
        cells.push(stripHtml(cellMatch[2]));
      }

      if (cells.length) rows.push(cells);
    }

    if (rows.length) tables.push(rows);
  }

  return tables;
}

function pickTable(tables, keywords, columnCount) {
  for (const rows of tables) {
    const header = (rows[0] || []).join(" ").toLowerCase();
    const matchesHeader = keywords.some((keyword) => header.includes(keyword));

    if (matchesHeader && (!columnCount || (rows[0] || []).length === columnCount)) {
      return rows;
    }
  }

  return null;
}

function sectionText(section) {
  return SECTION_FIELDS.map((field) => section?.[field] || "")
    .join(" ")
    .toLowerCase();
}

function findSection(sections, pattern) {
  return (sections || []).find((section) => pattern.test(sectionText(section)));
}

function findSectionByBlock(sections, types) {
  const list = Array.isArray(types) ? types : [types];

  return (sections || []).find((section) =>
    (section?.blocks || []).some((block) => list.includes(block?.type))
  );
}

function findSectionByBlockAndTitle(sections, types, pattern, options = {}) {
  const { fallback = true } = options;
  const list = Array.isArray(types) ? types : [types];

  const match = (sections || []).find(
    (section) =>
      pattern.test(sectionText(section)) &&
      (section?.blocks || []).some((block) => list.includes(block?.type))
  );

  if (match || !fallback) return match;

  return (sections || []).find((section) =>
    (section?.blocks || []).some((block) => list.includes(block?.type))
  );
}

function findSectionByTitle(sections, pattern) {
  return (sections || []).find((section) => pattern.test(section?.title || ""));
}

function blocksOf(section) {
  return section?.blocks || [];
}

function blockOfType(section, type) {
  return blocksOf(section).find((block) => block?.type === type);
}

function blocksOfType(section, type) {
  return blocksOf(section).filter((block) => block?.type === type);
}

function blocksOfAnyType(section, types) {
  return blocksOf(section).filter((block) => types.includes(block?.type));
}

function mapRows(blocks, key) {
  for (const block of blocks || []) {
    const content = block?.content || {};
    const value = content[key] || content.items || content.rows || content.list;

    if (Array.isArray(value)) return value;
  }

  return [];
}

function mapRowFromBlock(section, keys) {
  for (const block of blocksOf(section) || []) {
    const content = block?.content || {};

    for (const key of keys) {
      if (Array.isArray(content[key])) return content[key];
    }
  }

  return [];
}

function richtextOf(section) {
  return blockOfType(section, "richtext")?.content || "";
}

function titleOf(section, fallback) {
  return section?.title || fallback;
}

/** "Online MBA" / "MBA (Online)" -> "mba" (used to match CMS fee rows). */
function normalizeProgramKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/online/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9.]/g, "");
}

const UG_PATTERN = /\b(bachelor|bca|bba|bsc|b\.?com|b\.?a)\b/i;
const PG_PATTERN = /\b(master|mba|mca|msc|m\.?sc|m\.?com|m\.?a)\b/i;

/** Numeric fee from a CMS cell ("₹31,000", "31,000") or a raw number. */
function numFrom(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) && value > 0 ? value : null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function mapFeeTables(tables) {
  const rows = [];

  (tables || []).forEach((table) => {
    if (!Array.isArray(table) || table.length < 2) return;

    const header = table[0].map((cell) => String(cell || "").toLowerCase());
    const durationIdx = header.findIndex((h) => h.includes("duration"));
    const perSemIdx = header.findIndex(
      (h) => h.includes("per semester") || h.includes("per sem")
    );
    const totalIdx = header.findIndex((h) => h.includes("total"));

    table.slice(1).forEach((row) => {
      const program = row[0] || "";

      if (!program) return;

      rows.push({
        program,
        duration: durationIdx >= 0 ? row[durationIdx] || "" : "",
        perSemFee: perSemIdx >= 0 ? row[perSemIdx] || "" : "",
        totalFee: totalIdx >= 0 ? row[totalIdx] || "" : "",
      });
    });
  });

  return rows;
}

function listItemsOf(html) {
  if (typeof html !== "string") return [];

  const items = [];
  const listRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = listRe.exec(html)) !== null) {
    const text = stripHtml(match[1]);

    if (text) items.push(text);
  }

  return items;
}

function mapExaminationSteps(section) {
  const structuredSteps = [];

  for (const block of blocksOf(section)) {
    const content = block?.content || {};
    const lists = [content.steps, content.items, content.rows, content.list];
    const candidates = lists.find((value) => Array.isArray(value) && value.length)
      || lists.find(Array.isArray);
    if (!candidates) continue;

    candidates.forEach((step, index) => {
      if (typeof step === "string") {
        const parts = splitListItem(step);
        structuredSteps.push({
          title: parts.title || `Step ${index + 1}`,
          description: parts.description,
          points: [],
        });
      } else if (step && typeof step === "object") {
        const title = step.title || step.name || step.label || step.heading || `Step ${index + 1}`;
        const description = step.description || step.detail || step.text || step.content || "";
        structuredSteps.push({ title, description: stripHtml(description), points: [] });
      }
    });
  }

  if (structuredSteps.length) return structuredSteps;

  return listItemsOf(richtextOf(section)).map((item, index) => {
    const parts = splitListItem(item);
    return {
      title: parts.title || `Step ${index + 1}`,
      description: parts.description,
      points: [],
    };
  });
}

function examinationIntroOf(section) {
  return stripHtml(String(richtextOf(section) || "").replace(/<(ul|ol)\b[^>]*>[\s\S]*?<\/\1>/gi, " "));
}

function mapCourses(courses, feeRows = []) {
  const feeIndex = new Map(
    feeRows.map((row) => [normalizeProgramKey(row.program), row])
  );

  return (courses || []).map((degree) => {
    const fee = degree.avgFee ?? degree.fee ?? degree.avgFees;
    const years = degree.avgDuration ?? degree.duration;
    const semestersCount = degree.avgDuration
      ? Number(degree.avgDuration) * 2
      : 0;
    const name = degree.degreeName || degree.name || "Programme";
    const level = String(degree.courses?.[0]?.level || "").toLowerCase();
    const feeRow = feeIndex.get(normalizeProgramKey(name));

    let category = "";

    if (level === "ug" || level === "undergraduate") category = "ug";
    else if (level === "pg" || level === "postgraduate") category = "pg";
    else if (level === "diploma" || level === "certificate") category = "diploma";

    if (!category) {
      if (UG_PATTERN.test(name)) category = "ug";
      else if (PG_PATTERN.test(name)) category = "pg";
      else category = "diploma";
    }

    /* Per-Sem / Total fee: the CMS fee-structure table when it publishes one,
       otherwise computed from the courses API (avgFee over semesters). */
    const perSem =
      (feeRow?.perSemFee ? numFrom(feeRow.perSemFee) : null) ??
      (semestersCount > 0 && typeof fee === "number" && fee > 0
        ? Math.round(fee / semestersCount)
        : null);
    const total =
      typeof fee === "number" && fee > 0
        ? fee
        : (numFrom(feeRow?.totalFee) ?? null);

    return {
      degree: name,
      code: degree.slug ? String(degree.slug).split("/").pop() : "",
      courseId: degree.slug ? String(degree.slug).split("/").pop() : "",
      category,
      name,
      mode: degree.mode || degree.courses?.[0]?.mode || "",
      specialisations: (Array.isArray(degree.courses) ? degree.courses : [])
        .map((course) => course?.specialization || "")
        .filter(Boolean),
      specializations: degree.noOfSpecializations
        ? `${degree.noOfSpecializations} specializations available`
        : "",
      duration: years ? `${String(years).replace(/[^0-9.]/g, "")} years` : "",
      semestersCount,
      avgFee: typeof fee === "number" ? fee : numFrom(fee),
      perSemFee: perSem != null ? `₹ ${perSem.toLocaleString("en-IN")}` : "",
      avgFees: total != null ? `₹ ${total.toLocaleString("en-IN")}` : feeRow?.totalFee || "",
      totalFee: total,
    };
  });
}

/** Nicely formatted rows for the morning-template fee tables. */
function mapReviews(testimonials) {
  return (testimonials || [])
    .map((item, index) => {
      const hasRating =
        item.rating !== "" &&
        item.rating !== null &&
        item.rating !== undefined &&
        Number.isFinite(Number(item.rating));
      const ratingValue = hasRating
        ? Math.min(5, Math.max(0, Number(item.rating)))
        : null;

      return {
        studentName: stripHtml(item.studentName || item.name || "Student"),
        avatar: stripHtml(item.avatar || item.studentName || item.name || "S")
          .slice(0, 2)
          .toUpperCase(),
        course: stripHtml(item.course || item.program || ""),
        batch: stripHtml(item.batch || ""),
        text: stripHtml(item.text || item.review || ""),
        rating: ratingValue == null ? 5 : Math.round(ratingValue),
        ratingValue,
        ratingLabel: ratingValue == null ? "" : ratingValue.toFixed(1),
        tag: stripHtml(item.tag || "Verified Learner"),
        profession: stripHtml(item.profession || ""),
        company: stripHtml(item.company || ""),
        location: stripHtml(item.location || ""),
        index,
      };
    })
    .filter((review) => review.studentName || review.text);
}

export function mapBlogs(blogs) {
  return (blogs || []).map((post) => ({
    image: readImage(post.mainimage?.image || post.mainimage || post.image),
    title: post.title || "",
    excerpt: post.excerpt || post.description || "",
    category: post.category || "Blog",
    date: post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-IN") : "",
    slug: post.urlSlug || post.slug || "",
  }));
}

const TOC_TARGETS = [
  { id: "latest-news", match: /latest news|news|update/ },
  { id: "highlights", match: /highlight/ },
  { id: "courses-fees", match: /course|fee/ },
  { id: "popular-programmes", match: /popular programme|popular program/ },
  { id: "eligibility-criteria", match: /eligib|selection/ },
  { id: "admission-process", match: /admission/ },
  { id: "rankings", match: /ranking|accredit/ },
  { id: "examination-pattern", match: /examin|evaluation/ },
  { id: "placements", match: /placement/ },
  { id: "campus", match: /campus|gallery/ },
  { id: "sample-degree", match: /sample degree|certificate/ },
  { id: "reviews-section", match: /review|testimonial/ },
  { id: "compare-colleges", match: /compare/ },
  { id: "blogs", match: /blog/ },
];

function splitListItem(item) {
  const text = String(item || "").trim();
  const index = text.indexOf(":");

  if (index === -1) {
    return { title: text, description: "" };
  }

  return {
    title: text.slice(0, index).trim(),
    description: text.slice(index + 1).trim(),
  };
}

function mapEligibilityRows(rows) {
  if (!rows || !rows.length) return [];

  const header = (rows[0] || []).map((cell) => String(cell || "").toLowerCase());
  const durationIdx = header.findIndex((cell) => /duration/.test(cell));
  const feeIdx = header.findIndex(
    (cell) => /fee|semester|cost|price/.test(cell) && !/total/.test(cell)
  );
  const totalIdx = header.findIndex((cell) => /total/.test(cell));

  return rows.slice(1).map((row) => {
    const cells = Array.isArray(row) ? row : [];

    return {
      course: cells[0] || "",
      eligibility: cells[1] || "",
      selection: cells[2] || "",
      duration: durationIdx >= 0 ? cells[durationIdx] || "" : "",
      feeSem: feeIdx >= 0 ? cells[feeIdx] || "" : "",
      totalFee: totalIdx >= 0 ? cells[totalIdx] || "" : "",
    };
  });
}

function selectionProcessFromIntro(intro) {
  return String(intro || "")
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => /\b(selected|merit|selection process)\b/i.test(sentence))
    .join(" ");
}

function mapToc(payloadToc) {
  if (!Array.isArray(payloadToc) || !payloadToc.length) return [];

  const used = new Set();
  const toc = [];

  payloadToc.forEach((item) => {
    const label = item.label || item.title || "";
    const target = TOC_TARGETS.find(
      (candidate) => !used.has(candidate.id) && candidate.match.test(label.toLowerCase())
    );

    if (!target) return;

    used.add(target.id);
    toc.push({ id: target.id, label, order: item.order ?? toc.length });
  });

  return toc.sort((a, b) => a.order - b.order);
}

function feeRangeOf(college) {
  const min = college.minFee ?? college.minimumFee;
  const max = college.maxFee ?? college.maximumFee;

  if (min != null && max != null && min !== max) {
    return `₹${Math.round(min / 1000)}K – ₹${(max / 100000).toFixed(2)}L`;
  }
  if (min != null) return `₹${Number(min).toLocaleString("en-IN")}`;
  return "";
}

/**
 * Maps the production college payload (plus the auxiliary API responses) into
 * the overview template model — ported from the reference Next.js build.
 */
export function mapOverviewData(payload, extras = {}) {
  const rawPayload = payload?.data?.data || payload?.data || payload;

  if (!rawPayload) return null;

  const rawCollegeId = rawPayload.college_id;
  const college = rawCollegeId && typeof rawCollegeId === "object" ? rawCollegeId : {};

  const collegeId =
    college?._id || college?.id || (typeof rawCollegeId === "string" ? rawCollegeId : "");

  const hero = rawPayload.hero || {};
  const sections = Array.isArray(rawPayload.sections) ? rawPayload.sections : [];

  const highlightsSection = findSectionByBlockAndTitle(sections, ["richtext"], /highlight/i);
  const coursesSection = findSectionByBlockAndTitle(sections, ["richtext", "courses_list"], /course|fee/i);
  const programmesSection = findSectionByBlockAndTitle(sections, ["courses_list", "course_specialization_list"], /popular|all programme|all course/i);
  // Do not reuse another richtext section (often Highlights) when eligibility
  // is absent; that fallback duplicates the Highlights card in the overview.
  const eligibilitySection = findSectionByBlockAndTitle(sections, ["richtext"], /eligib|selection/i, {
    fallback: false,
  });
  const admissionProcessSection = findSectionByBlockAndTitle(sections, ["admission_flow"], /admission process/i);
  const applicationProcessSection = findSectionByBlockAndTitle(sections, ["richtext"], /application process/i);
  const documentsSection = findSectionByBlockAndTitle(sections, ["richtext"], /document/i);
  const admissionDatesSection = findSectionByTitle(sections, /important date|admission date/i);
  const rankingsSection = findSectionByBlockAndTitle(sections, ["richtext", "banner"], /ranking|accredit/i);
  const examinationSection =
    findSectionByBlockAndTitle(sections, ["admission_flow"], /examin|evaluation/i, {
      fallback: false,
    }) || findSectionByTitle(sections, /examin|evaluation/i);
  // Live CMS pages often publish these as rich text even when the title still
  // identifies the semantic section. Keep the prose with the section data.
  const placementsSection = findSectionByBlockAndTitle(sections, ["placement_stats", "resource_grid", "richtext"], /placement/i);
  const campusSection = findSectionByBlockAndTitle(sections, ["gallery", "richtext"], /campus|gallery/i);
  const sampleDegreeSection = findSectionByBlock(sections, ["certificate_grid"]);
  const reviewsSection = findSectionByBlock(sections, ["testimonials"]);
  const compareSection = findSectionByBlock(sections, ["compare"]);
  const blogsSection = findSectionByBlock(sections, ["blogs"]);
  const scholarshipSection = findSectionByTitle(sections, /scholar/i);
  const collegeAndLmsSection = findSectionByTitle(sections, /learning facilit|learning platform|lms/i);

  const highlightsTables = parseHtmlTables(richtextOf(highlightsSection));
  const highlightsRows = pickTable(highlightsTables, ["particular", "details"]) || [];
  const eligibilityTables = parseHtmlTables(richtextOf(eligibilitySection));
  const eligibilityRows = pickTable(eligibilityTables, ["eligibility", "selection"]) || [];
  const rankingsTables = parseHtmlTables(richtextOf(rankingsSection));
  // Some live university payloads publish rankings and approvals under generic
  // two-column headers (for example, Chandigarh uses "Particulars / Details").
  const rankingsRows = pickTable(rankingsTables, [
    "authority",
    "recognition",
    "ranking",
    "body",
    "particular",
    "detail",
  ]) || [];
  const rankingsColumns = (rankingsRows[0] || []).map((cell) => stripHtml(String(cell || "")));
  const campusTables = parseHtmlTables(richtextOf(campusSection));
  const campusRows = pickTable(campusTables, ["mode of transport", "details"]) || [];

  const feeStructureSection = findSectionByTitle(sections, /fee structure/i);
  const feeStructureTables = parseHtmlTables(richtextOf(feeStructureSection));
  const feeStructureRows = mapFeeTables(feeStructureTables);

  const courses = mapCourses(extras.courses, feeStructureRows);
  const programmeSource = extras.programmes?.length ? extras.programmes : extras.courses;
  const programmes = mapCourses(programmeSource, feeStructureRows);

  const placementStats = college.placementStats || {};
  const placementBlock = blockOfType(placementsSection, "placement_stats");
  const placementContent = placementBlock?.content || {};

  const certificateBlock = blockOfType(sampleDegreeSection, "certificate_grid");
  const certificate = (certificateBlock?.content?.certificates || [])[0] || {};

  const news = rawPayload.latestNews || {};
  const examinationSteps = mapExaminationSteps(examinationSection);
  const examinationIntro = examinationIntroOf(examinationSection);

  const approvals = Array.isArray(college.approvals) ? college.approvals : [];
  const naac = approvals.find((approval) => /NAAC/i.test(approval)) || "";

  const result = {
    slug: rawPayload.slug || college.slug || "",
    title: rawPayload.title || hero.title || college.name || "",
    shortTitle: rawPayload.shortTitle || "",
    shortName: college.collegeShortName || hero.subtitle || "",
    name: college.name || rawPayload.title || "",
    location: college.location || "",
    collegeType: college.collegeType || "",
    collegeMode: college.collegeMode || "",
    established: college.established || "",
    rating: college.rating || "",
    nirfRanking: college.nirfRanking || "",
    naac,
    approvals,
    students: college.students ?? null,
    feeRange: feeRangeOf(college),
    duration: extras.duration || "",

    hero: {
      logoImage: readImage(hero.logoImage || college.logo),
      backgroundImage: readImage(hero.backgroundImage || college.collegeImage),
      description: stripHtml(hero.description || ""),
      heroSub: stripHtml(hero.heroSub || hero.subtitle || ""),
      buttons: Array.isArray(hero.buttons) ? hero.buttons : [],
    },

    latestNews: news.title
      ? {
          title: news.title || "",
          description: stripHtml(news.description || ""),
          date: rawPayload.updatedAt ? new Date(rawPayload.updatedAt).toLocaleDateString("en-IN") : "",
          author: rawPayload.createdBy?.username || "",
        }
      : null,

    highlights: highlightsSection
      ? {
          title: titleOf(highlightsSection, ""),
          intro: textBeforeTable(richtextOf(highlightsSection)),
          categories: ["All"],
          items: highlightsRows.slice(1).map((row) => ({
            label: row[0] || "",
            value: row[1] || "",
            category: "Info",
          })),
        }
      : null,

    coursesFees: coursesSection
      ? {
          title: titleOf(coursesSection, ""),
          intro: textBeforeTable(richtextOf(coursesSection)),
          table: courses,
          roiCalculator: "ROI Calculator",
          viewFeeStructure: "View Fee Structure",
          searchPlaceholder: "Search programmes...",
          showing: courses.length ? `Showing 1-${courses.length} out of ${courses.length} Degrees` : "",
        }
      : null,

    feeStructure: feeStructureSection
      ? {
          title: titleOf(feeStructureSection, ""),
          description: textBeforeTable(richtextOf(feeStructureSection)),
          rows: feeStructureRows,
        }
      : null,

    popularProgrammes: programmes,

    eligibility:
      eligibilitySection && (eligibilityRows.length > 1 || textBeforeTable(richtextOf(eligibilitySection)))
        ? {
            title: titleOf(eligibilitySection, ""),
            intro: textBeforeTable(richtextOf(eligibilitySection)),
            selectionProcess: selectionProcessFromIntro(textBeforeTable(richtextOf(eligibilitySection))),
            table: eligibilityRows.slice(1),
            items: mapEligibilityRows(eligibilityRows),
          }
        : null,

    admission:
      admissionProcessSection &&
      (asList(blockOfType(admissionProcessSection, "admission_flow")?.content?.steps).length ||
        textBeforeTable(richtextOf(admissionProcessSection)))
        ? {
            title: titleOf(admissionProcessSection, ""),
            description: textBeforeTable(richtextOf(admissionProcessSection)),
            intro: textBeforeTable(richtextOf(admissionProcessSection)),
            steps: asList(blockOfType(admissionProcessSection, "admission_flow")?.content?.steps).map((step) => ({
              title: step.title || "",
              description: stripHtml(step.description || ""),
            })),
          }
        : null,

    rankings:
      rankingsSection && (rankingsRows.length > 1 || textBeforeTable(richtextOf(rankingsSection)))
        ? {
            title: titleOf(rankingsSection, ""),
            intro: textBeforeTable(richtextOf(rankingsSection)),
            columns: rankingsColumns,
            table: rankingsRows.slice(1).map((row) => ({
              authority: row[0] || "",
              status: row.slice(1).filter(Boolean).join(" — "),
              values: rankingsColumns.map((_, index) => row[index] || ""),
            })),
          }
        : null,

    examinationPattern:
      examinationSection &&
      (examinationSteps.length || examinationIntro)
        ? {
            title: titleOf(examinationSection, ""),
            description: examinationIntro,
            intro: examinationIntro,
            steps: examinationSteps,
          }
        : null,

    placements: placementsSection
      ? {
      title: titleOf(placementsSection, ""),
      intro: textBeforeTable(richtextOf(placementsSection)),
      stats: {
        placementRate: placementContent.placementRate || (placementStats.placementPercentage ? `${placementStats.placementPercentage}%` : ""),
        highestPackage: placementContent.highestPackage || (placementStats.highestPackage ? `₹${placementStats.highestPackage} LPA` : ""),
        hiringPartners: placementContent.hiringPartners || "",
        internshipsCount: placementStats.internshipsCount ?? "—",
      },
      recruiters: (extras.recruiters || []).map((item) => ({
        name: item.displayName || item.title || item.altText || "Recruiter",
        src: readImage(item.url || item.logo),
      })),
    }
      : null,

    campus: campusSection
      ? {
          title: titleOf(campusSection, ""),
          description: textBeforeTable(richtextOf(campusSection)),
          travelTable: campusRows.slice(1).map((row) => ({
            mode: row[0] || "",
            detail: row[1] || "",
          })),
          gallery: (extras.gallery || []).map((item) => item.altText || "").filter(Boolean),
          galleryImages: (extras.gallery || []).map((item) => ({
            imageUrl: readImage(item.imageUrl || item.url),
            altText: item.altText || "",
          })),
        }
      : null,

    sampleDegree:
      sampleDegreeSection && (certificate.imageUrl || certificateBlock?.content?.description)
        ? {
            title: certificate.title || titleOf(sampleDegreeSection, ""),
            description: stripHtml(certificateBlock?.content?.description || ""),
            imageUrl: readImage(certificate.imageUrl || certificate.image),
            altText: certificate.altText || `${rawPayload.title} Degree Certificate`,
          }
        : null,

    reviews: mapReviews(
      extras.reviews?.length
        ? extras.reviews
        : mapRows(blocksOfType(reviewsSection, "testimonials"), "testimonials").length
          ? mapRows(blocksOfType(reviewsSection, "testimonials"), "testimonials")
          : rawPayload.testimonials
    ),
    reviewsMeta: {
      title: titleOf(reviewsSection, ""),
      subtitle: "",
    },

    admissionHighlights: (() => {
      const section = findSectionByBlockAndTitle(
        sections,
        ["richtext"],
        /admission highlight|admission overview/i
      );

      if (!section) return { title: "", description: "", items: [] };

      const tables = parseHtmlTables(richtextOf(section));
      const rows = pickTable(tables, ["particular", "detail"]) || [];

      return {
        title: titleOf(section, ""),
        description: textBeforeTable(richtextOf(section)),
        intro: textBeforeTable(richtextOf(section)),
        items: rows.slice(1).map((row) => ({
          label: row[0] || "",
          value: row[1] || "",
        })),
      };
    })(),
    applicationProcessMeta: { title: titleOf(applicationProcessSection, "") },
    documentsMeta: { title: titleOf(documentsSection, "") },
    scholarshipSection: {
      title: titleOf(scholarshipSection, ""),
      intro: textBeforeTable(richtextOf(scholarshipSection)),
    },
    learningPlatformTitle: "",
    admissionDatesMeta: { title: titleOf(admissionDatesSection, "") },

    faqs: (Array.isArray(rawPayload.faq?.items)
      ? rawPayload.faq.items
      : Array.isArray(rawPayload.faqs)
        ? rawPayload.faqs
        : []
    ).map((item) => ({
      question: item.question || "",
      answer: stripHtml(item.answer || ""),
    })),
    faqsMeta: { title: rawPayload.faq?.heading || "" },

    compareSection: compareSection
      ? {
      title: titleOf(compareSection, ""),
      description: textBeforeTable(richtextOf(compareSection)),
      college: {
        name: rawPayload.title || college.name || "",
        location: college.location || "",
        logo: readImage(college.logo || hero.logoImage),
        approvals,
      },
    }
      : null,

    blogs: mapBlogs(extras.blogs?.length ? extras.blogs : rawPayload.blogs),
    blogsMeta: {
      title: titleOf(blogsSection, ""),
      label: "Blogs",
      description: textBeforeTable(richtextOf(blogsSection)),
    },

    toc: mapToc(rawPayload.toc),

    admissionDates: (() => {
      const structured = mapRows(
        blocksOfAnyType(admissionDatesSection, ["important_dates", "admission_dates", "dates"]),
        "items"
      ).map((item) => ({
        event: item.event || item.title || item.label || "",
        detail: item.detail || item.description || "",
        date: item.date || item.value || "",
        status: item.status || "",
      }));

      if (structured.length) return structured;

      const tables = parseHtmlTables(richtextOf(admissionDatesSection));
      const rows = pickTable(tables, ["event", "date", "detail"]) || [];
      const header = (rows[0] || []).map((cell) => String(cell || "").toLowerCase());
      const statusIdx = header.findIndex((cell) => /status/.test(cell));
      const detailIdx = header.findIndex((cell) => /detail/.test(cell));

      return rows.slice(1).map((row) => ({
        event: row[0] || "",
        detail: detailIdx >= 0 ? row[detailIdx] || "" : "",
        date: row.length > 2 ? row[2] || "" : row[1] || "",
        status: statusIdx >= 0 ? row[statusIdx] || "" : "",
      }));
    })(),

    applicationProcess: (() => {
      const structured = mapRows(
        blocksOfAnyType(applicationProcessSection, ["application_process", "application_steps"]),
        "steps"
      ).map((step) => ({
        title: step.title || step.label || "",
        description: stripHtml(step.description || step.detail || step.text || ""),
      }));

      if (structured.length) return structured;

      return listItemsOf(richtextOf(applicationProcessSection)).map((item) => {
        const parts = splitListItem(item);

        return { title: parts.title, description: parts.description };
      });
    })(),
    applicationProcessDescription: textBeforeTable(richtextOf(applicationProcessSection)),

    documentsRequired: (() => {
      const structured = mapRowFromBlock(documentsSection, ["documents", "documents_required"]);

      if (structured.length) return structured;

      return listItemsOf(richtextOf(documentsSection)).map((item) => ({
        name: item,
        note: "",
      }));
    })(),

    learningPlatform: (() => {
      const structured = mapRows(
        blocksOfAnyType(collegeAndLmsSection, ["learning_platform", "lms_features"]),
        "items"
      ).map((item) => ({
        icon: item.icon || "video",
        title: item.title || item.label || "",
        desc: stripHtml(item.desc || item.description || item.detail || ""),
        meta: item.meta || "",
      }));

      if (structured.length) return structured;

      return listItemsOf(richtextOf(collegeAndLmsSection)).map((item) => ({
        icon: "video",
        title: item,
        desc: "",
        meta: "",
      }));
    })(),

    scholarshipRules: mapRows(
      blocksOfAnyType(scholarshipSection, ["scholarship_calculator", "scholarship_rules"]),
      "rules"
    ).map((rule) => ({
      id: rule.id || rule.title || "",
      label: rule.label || rule.title || "",
      percent: Number(rule.percent || rule.value || 0),
      tag: rule.tag || "",
      condition: rule.condition || "",
    })),

    scholarshipSchemes: listItemsOf(richtextOf(scholarshipSection)).map((item) => {
      const parts = splitListItem(item);

      return {
        name: parts.title || item,
        details: parts.description || item,
      };
    }),

    scholarshipPillars: mapRows(
      blocksOfAnyType(scholarshipSection, ["scholarship_pillars", "scholarship_schemes"]),
      "pillars"
    ).map((pillar) => ({
      id: pillar.id || pillar.title || "",
      title: pillar.title || pillar.name || "",
      body: stripHtml(pillar.body || pillar.description || ""),
      icon: pillar.icon || "award",
      tag: pillar.tag || "",
      tone: pillar.tone || "amber",
      footnote: pillar.footnote || "",
    })),
  };

  // Keep only the table-of-contents entries that point at a rendered section
  const renderedSections = new Set();

  if (result.latestNews) renderedSections.add("latest-news");
  if (result.highlights) renderedSections.add("highlights");
  if (result.coursesFees) renderedSections.add("courses-fees");
  if (result.popularProgrammes.length) renderedSections.add("popular-programmes");
  if (result.eligibility) renderedSections.add("eligibility-criteria");
  if (result.admission) renderedSections.add("admission-process");
  if (result.rankings) renderedSections.add("rankings");
  if (result.examinationPattern) renderedSections.add("examination-pattern");
  if (result.placements) renderedSections.add("placements");
  if (result.campus) renderedSections.add("campus");
  if (result.sampleDegree) renderedSections.add("sample-degree");
  if (result.reviews.length || result.faqs.length) renderedSections.add("reviews-section");
  if (result.compareSection) renderedSections.add("compare-colleges");
  if (result.blogs.length) renderedSections.add("blogs");

  result.toc = result.toc.filter((item) => renderedSections.has(item.id));

  if (
    renderedSections.has("latest-news") &&
    !result.toc.some((item) => item.id === "latest-news")
  ) {
    result.toc.unshift({
      id: "latest-news",
      label: result.latestNews.title || "Latest News & Updates",
      order: -1,
    });
  }

  /* ---- Additive aliases kept for legacy consumers (apiAdapter) ---- */
  result.highlightRows = result.highlights?.items || [];
  result.highlightsTable = result.highlightRows;
  result.highlightsIntro = result.highlights?.intro || "";
  result.eligibilityMatrix = (Array.isArray(result.eligibility?.items)
    ? result.eligibility.items
    : []
  ).map((item) => ({
    course: item.course,
    eligibility: item.eligibility,
    selection: item.selection || "",
    duration: item.duration,
    feeSem: item.feeSem,
    totalFee: item.totalFee,
  }));
  result.admissionProcess = result.admission
    ? {
        title: result.admission.title,
        intro: result.admission.intro || result.admission.description,
        steps: result.admission.steps.map((step, index) => ({ ...step, stepNum: index + 1 })),
      }
    : { title: "", intro: "", steps: [] };
  result.applicationSteps = result.applicationProcess;
  result.importantDates = result.admissionDates || [];
  result.rankingsAndAccreditations = result.rankings
    ? { title: result.rankings.title, intro: result.rankings.intro, columns: result.rankings.columns, table: result.rankings.table }
    : { title: "", intro: "", columns: [], table: [] };
  result.scholarships = {
    description: result.scholarshipSection.intro || "",
    items: (result.scholarshipRules.length
      ? result.scholarshipRules.map((rule) => ({ name: rule.label, details: rule.condition }))
      : result.scholarshipSchemes),
    note: "",
  };
  result.testimonials = result.reviews;
  result.lms = {
    description: result.campus?.description || "",
    features: result.learningPlatform,
  };
  result.topRecruiters = result.placements?.recruiters || [];

  return result;
}
