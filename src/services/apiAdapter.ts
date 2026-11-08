export interface CourseData {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  overview?: string;
  overviewAfterImage?: string;
  category: string;
  level: string;
  rawLevels?: string[];
  displayLevel?: string;
  duration: string;
  semestersCount: number;
  perSemFee: number;
  totalFee: number;
  feeDisplay?: string;
  credits: number;
  eligibility: string;
  careerProspects: {
    avgPackage: string;
    highestPackage: string;
    roles: string[];
  };
  syllabus: Array<{
    semester: number;
    subjects: string[];
    credits: number;
  }>;
  specializations: string[];
  brochurePdfName: string;
  sections?: Array<{
    key: string;
    title: string;
    tocTitle?: string | null;
    headingLevel?: number | null;
    order: number;
    blocks: Array<{
      type: string;
      title?: string | null;
      headingLevel?: number | null;
      designPattern?: string | null;
      content: any;
    }>;
  }>;
  toc?: Array<{ id: string; title: string; order: number }>;
  faqs?: Array<{ question: string; answer: string; id?: string }>;
  faq?: { items: Array<{ question: string; answer: string; id?: string }> };
  testimonials?: Array<{ studentName: string; profession?: string; text: string; rating?: number | null; id?: string }>;
  images?: {
    logo?: string;
    hero?: string;
    banner?: string;
    primary?: string;
    isBanner?: boolean;
    alt?: string;
  };
  seo?: {
    meta?: { metaTitle?: string; metaDescription?: string; canonicalUrl?: string };
    og?: { ogTitle?: string; ogDescription?: string; ogImage?: string; ogUrl?: string };
    twitter?: { twitterTitle?: string; twitterDescription?: string; twitterImage?: string };
    settings?: { robotsTag?: string };
  };
  topRecruiters?: string[] | Array<{ name: string; logoUrl?: string }>;
  recruiters?: Array<{ name: string; logoUrl?: string; salary?: string }>;
}

export interface UniversityData {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  location: string;
  established: string;
  rating: string;
  nirfRanking: string;
  approvals: string[];
  logo: string;
  collegeImage: string;
  collegeMode: string;
  collegeType: string;
  website: string;
  minFee: number;
  maxFee: number;
  placementStats: {
    placementPercentage: number;
    highestPackage: number;
  };
  logoImage: string;
  backgroundImage: string;
  naacGrade: string;
  verifiedYear: string;
  type: string;
  tagline: string;
  quickStats: {
    feeRange: string;
    duration: string;
    mode: string;
    placementRate: string;
    highestPackage: string;
    emiStarting: string;
  };
  importantDates: { note: string; items: Array<any> };
  campusAndLms: {
    intro: string;
    lmsName: string;
    lmsFeatures: string[];
    lmsPlatformTitle: string;
    lmsPlatform: string[];
    examPattern: Array<any>;
    sampleDegree: any;
    campusDetails: any;
  };
  feesAndFinancing: {
    intro: string;
    emiOptionsDescription: string;
    scholarships: Array<any>;
    scholarshipsNote: string;
  };
  courses: CourseData[];
  highlights: Array<{
    label: string;
    value: string;
    category: string;
  }>;
  admissions: {
    intro: string;
    steps: Array<{
      stepNum: number;
      title: string;
      description: string;
    }>;
    importantDates: Array<{
      event: string;
      date: string;
      mode: string;
      status: string;
    }>;
    eligibility: Array<{
      course: string;
      eligibility: string;
      selection: string;
      duration: string;
      feeSem: string;
    }>;
    documents: string[];
    eligibilityMatrix: Array<any>;
    requiredDocuments: string[];
  };
  scholarships: {
    description: string;
    items: Array<{
      title: string;
      details: string;
      tag: string;
    }>;
    note: string;
  };
  placements: {
    intro: string;
    stats: {
      placementRate: string;
      highestPackage: string;
      avgPackage: string;
      hiringPartners: string;
      internshipsCount: string;
    };
    topRecruiters: string[];
    metrics: Array<{ label: string; value: string }>;
    supportServices: string[];
    recruiters: Array<{ name: string; logoUrl?: string }>;
    note: string;
  };
  rankings: Array<{
    authority: string;
    status: string;
  }>;
  rankingsAndAccreditations: { intro: string; table: Array<any> };
  campus: {
    description: string;
    travelTable: Array<{
      mode: string;
      detail: string;
    }>;
    gallery: string[];
  };
  lms: {
    name: string;
    description: string;
    features: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  testimonials: Array<{
    studentName: string;
    text: string;
    rating: number;
    course: string;
    batch: string;
  }>;
  blogs: Array<{
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
  }>;
  overview: any;
}

export function extractImageUrl(val: any): string {
  if (!val) return "";
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (/^(https?:|\/)/i.test(trimmed)) return trimmed;
    return "";
  }
  if (typeof val === "object") {
    if (val.url && typeof val.url === "string") {
      const u = val.url.trim();
      if (/^(https?:|\/)/i.test(u)) return u;
    }
    if (val.image) {
      const extracted = extractImageUrl(val.image);
      if (extracted) return extracted;
    }
    if (val.src && typeof val.src === "string") {
      const s = val.src.trim();
      if (/^(https?:|\/)/i.test(s)) return s;
    }
  }
  return "";
}

export function stripHtmlToText(html: any): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export const VERIFIED_RECRUITER_LOGOS: Record<string, string> = {
  amazon: "/logos/amazon.jpg",
  capgemini: "/logos/capgemini.png",
  cognizant: "/logos/cognizant.jpg",
  deloitte: "/logos/deloitte.jpg",
  infosys: "/logos/infosys.png",
  tcs: "/logos/tcs.jpg",
  "tata consultancy services": "/logos/tcs.jpg",
  "tech mahindra": "/logos/techmahindra.jpg",
  "times internet": "/logos/timesinternet.jpg",
  wipro: "/logos/wipro.jpg",
};

export function lookupVerifiedRecruiterLogo(name: string): string | undefined {
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  for (const [key, logoPath] of Object.entries(VERIFIED_RECRUITER_LOGOS)) {
    if (normalized === key || normalized.includes(key) || key.includes(normalized)) {
      return logoPath;
    }
  }
  return undefined;
}

export function formatCourseLevelLabel(rawLevel: any, courseName: string = ""): string {
  const levels = Array.isArray(rawLevel) ? rawLevel : [rawLevel];
  const combined = levels.filter(Boolean).map((l) => String(l).trim().toLowerCase()).join(" ");
  if (combined.includes("phd") || combined.includes("doctor")) return "Doctoral Programme";
  if (combined.includes("cert")) return "Certificate";
  if (combined.includes("diploma")) return "Diploma";
  const hasPg = combined.includes("pg") || combined.includes("post grad") || combined.includes("master");
  const hasUg = combined.includes("ug") || combined.includes("under grad") || combined.includes("bachelor");
  if (hasPg && hasUg) return "Integrated Degree";
  if (hasPg) return "PG Degree";
  if (hasUg) return "UG Degree";

  // Infer from courseName if level array is empty
  const nameLower = String(courseName || "").toLowerCase();
  if (/\b(phd|dba|doctorate)\b/.test(nameLower)) return "Doctoral Programme";
  if (/\b(certificate|certification)\b/.test(nameLower)) return "Certificate";
  if (/\b(pgdm|mba|mca|msc|m\.sc|mcom|m\.com|ma|majmc)\b/.test(nameLower)) return "PG Degree";
  if (/\b(bca|bba|bcom|b\.com|bsc|b\.sc|ba|bajmc)\b/.test(nameLower)) return "UG Degree";
  return "Online Degree";
}

export function formatFeeDisplay(rawFee: any, numericFee: number = 0): string {
  if (numericFee > 0 && Number.isFinite(numericFee)) {
    return "₹" + Math.round(numericFee).toLocaleString("en-IN");
  }
  if (!rawFee || typeof rawFee !== "string") return "";
  const trimmed = rawFee.trim();
  if (!trimmed) return "";
  let cleaned = trimmed.replace(/\bINR\s*/gi, "₹").replace(/₹\s+/g, "₹");
  // Format bare 6+ digit numbers like "600000 - 1200000"
  cleaned = cleaned.replace(/\b(\d{5,8})\b/g, (m) => Number(m).toLocaleString("en-IN"));
  if (!cleaned.includes("₹") && /\d/.test(cleaned)) {
    cleaned = "₹" + cleaned.replace(/(\s*[-–]\s*)(?!₹)(\d)/g, "$1₹$2");
  }
  return cleaned;
}

export function formatDurationDisplay(rawDuration: any, numericYears: number = 0): string {
  if (typeof rawDuration === "string" && rawDuration.trim()) {
    const t = rawDuration.trim();
    if (/^[0-9.]+$/.test(t)) {
      const n = Number(t);
      return n === 1 ? "1 Year" : `${n} Years`;
    }
    return t.replace(/\b(\d+)\s+Month$/i, (_, d) => (Number(d) === 1 ? "1 Month" : `${d} Months`));
  }
  if (numericYears > 0 && Number.isFinite(numericYears)) {
    return numericYears === 1 ? "1 Year" : `${numericYears} Years`;
  }
  return "";
}

function mapApiCourses(courses: any[]): CourseData[] {
  if (!Array.isArray(courses)) return [];
  
  return courses.map((course, index) => {
    const courseData = course || {};
    const courseName = courseData.degreeName || courseData.courseTitle || courseData.name || courseData.title || "";
    const courseId = courseData.slug || courseName.toLowerCase().replace(/[^a-z]/g, "") || `course-${index}`;
    const rawFeeVal = courseData.avgFee !== undefined ? courseData.avgFee : courseData.averageCourseFee;
    const avgFee = typeof rawFeeVal === "number" ? rawFeeVal : (/^\d+$/.test(String(rawFeeVal || "").trim()) ? Number(rawFeeVal) : 0);
    const rawDurVal = courseData.duration || courseData.avgDuration || "";
    const parsedYearsMatch = String(rawDurVal).match(/^(\d+(?:\.\d+)?)\s*(?:years?|yrs?)?$/i);
    const avgDuration = Number(courseData.avgDuration) || (parsedYearsMatch ? Number(parsedYearsMatch[1]) : 0);

    // Count actual semesters from syllabus block if present, else derive from years
    let syllabusSemCount = 0;
    if (Array.isArray(courseData.sections)) {
      for (const sec of courseData.sections) {
        if (Array.isArray(sec && sec.blocks)) {
          for (const blk of sec.blocks) {
            if (blk && blk.type === "syllabus" && Array.isArray(blk.content?.semesters)) {
              syllabusSemCount = blk.content.semesters.length;
              break;
            }
          }
        }
        if (syllabusSemCount > 0) break;
      }
    }
    const isMonthsOrRange = /month|[-–]/i.test(String(rawDurVal));
    const semestersCount = syllabusSemCount > 0
      ? syllabusSemCount
      : (!isMonthsOrRange && avgDuration > 0 ? Math.round(avgDuration * 2) : 0);

    const rawLevelsArr = Array.isArray(courseData.levels)
      ? courseData.levels.map((l: any) => String(l || "").trim()).filter(Boolean)
      : (courseData.level || courseData.levels ? [String(courseData.level || courseData.levels).trim()] : []);
    const rawLevel = rawLevelsArr[0] || "";
    const levelStr = String(rawLevel || "").trim();
    const displayLevel = formatCourseLevelLabel(rawLevelsArr.length ? rawLevelsArr : levelStr, courseName);
    const category = displayLevel === "PG Degree" || displayLevel === "Integrated Degree"
      ? "pg"
      : displayLevel === "UG Degree"
        ? "ug"
        : "diploma";

    const rawOverview = courseData.overview || courseData.description || "";
    const cleanExcerpt = stripHtmlToText(rawOverview);
    const shortDesc = courseData.shortDescription && typeof courseData.shortDescription === "string" && !courseData.shortDescription.includes("<")
      ? stripHtmlToText(courseData.shortDescription)
      : cleanExcerpt;

    const logoUrl = extractImageUrl(courseData.courseLogo) || extractImageUrl(courseData.logo) || "";
    const rawImageUrl = extractImageUrl(courseData.image) || extractImageUrl(courseData.banner) || extractImageUrl(courseData.heroImage) || "";
    // Determine which image is the rich banner illustration vs small mortarboard icon
    const isLogoRichBanner = /\/logo\/course-logo-|\/images\/[a-z0-9-]+\.webp/i.test(logoUrl);
    const isRawImageSmallIcon = /_image\.webp$/i.test(rawImageUrl);
    const primaryUrl = isLogoRichBanner
      ? logoUrl
      : (rawImageUrl && !isRawImageSmallIcon ? rawImageUrl : (logoUrl || rawImageUrl || ""));
    const isBanner = Boolean(primaryUrl && !/_image\.webp$/i.test(primaryUrl));
    const altText = (courseData.courseLogo && courseData.courseLogo.alt) || (courseData.image && courseData.image.alt) || courseName;

    const faqItems = Array.isArray(courseData.faq && courseData.faq.items)
      ? courseData.faq.items
      : Array.isArray(courseData.faqs)
        ? courseData.faqs
        : [];

    const totalFeeNumeric = avgFee > 0 ? avgFee : 0;
    const feeDisplay = formatFeeDisplay(rawFeeVal, totalFeeNumeric);
    const durationDisplay = formatDurationDisplay(rawDurVal, avgDuration);

    // Extract course recruiters if available (either from courseData.topRecruiters or from a CMS recruiter section)
    const rawTopRecruiters = Array.isArray(courseData.topRecruiters) ? courseData.topRecruiters : [];
    let parsedRecruiters: Array<{ name: string; logoUrl?: string; salary?: string }> = [];

    if (rawTopRecruiters.length > 0) {
      parsedRecruiters = rawTopRecruiters.map((item: any, idx: number) => {
        if (typeof item === "string") {
          const isUrl = /^https?:\/\/|^\//i.test(item);
          if (isUrl) {
            return {
              name: `Hiring Partner ${idx + 1}`,
              logoUrl: item,
            };
          }
          return {
            name: item,
            logoUrl: lookupVerifiedRecruiterLogo(item),
          };
        }
        const name = item?.name || item?.title || `Hiring Partner ${idx + 1}`;
        const logoUrl = item?.logoUrl || item?.src || item?.url || lookupVerifiedRecruiterLogo(name);
        return { name, logoUrl };
      });
    }

    // Also check CMS sections for genuine recruiter tables/lists (e.g. "Top Recruiters for Online BCA")
    if (parsedRecruiters.length === 0 && Array.isArray(courseData.sections)) {
      const recruiterSec = courseData.sections.find((s: any) =>
        /top recruiters|recruiters/i.test(String(s?.title || s?.key || ""))
      );
      if (recruiterSec && Array.isArray(recruiterSec.blocks)) {
        for (const blk of recruiterSec.blocks) {
          const content = String(blk?.content || "");
          if (content.includes("<table")) {
            const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gi;
            const cellRegex = /<td[^>]*>(.*?)<\/td>/gi;
            let match;
            let isHeader = true;
            while ((match = rowRegex.exec(content)) !== null) {
              const rowHtml = match[1];
              const cells: string[] = [];
              let cellMatch;
              while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
                cells.push(cellMatch[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim());
              }
              if (cells.length >= 1) {
                if (isHeader) {
                  isHeader = false;
                  continue;
                }
                const name = cells[0];
                const salary = cells[1] || "";
                if (name && !/company|mnc|recruiter|firm/i.test(name)) {
                  parsedRecruiters.push({
                    name,
                    salary,
                    logoUrl: lookupVerifiedRecruiterLogo(name),
                  });
                }
              }
            }
          }
        }
        // Prioritize verified companies that have genuine logos available, followed by other verified companies
        if (parsedRecruiters.length > 0) {
          parsedRecruiters.sort((a, b) => {
            if (a.logoUrl && !b.logoUrl) return -1;
            if (!a.logoUrl && b.logoUrl) return 1;
            return 0;
          });
        }
      }
    }

    return {
      id: courseId,
      code: courseData.code || courseData.degree || courseData.courseTitleHighlight || courseName || "",
      name: courseName,
      shortDescription: shortDesc,
      overview: rawOverview,
      overviewAfterImage: courseData.overviewAfterImage || "",
      category,
      level: levelStr ? levelStr.toUpperCase() : displayLevel,
      rawLevels: rawLevelsArr,
      displayLevel,
      duration: durationDisplay,
      semestersCount,
      perSemFee: semestersCount > 0 && totalFeeNumeric > 0 ? Math.round(totalFeeNumeric / semestersCount) : totalFeeNumeric,
      totalFee: totalFeeNumeric,
      feeDisplay,
      credits: courseData.credits || 0,
      eligibility: courseData.eligibility || "",
      careerProspects: {
        avgPackage: courseData.avgPackage || "",
        highestPackage: courseData.highestPackage || "",
        roles: Array.isArray(courseData.roles) ? courseData.roles : []
      },
      syllabus: (Array.isArray(courseData.syllabus) ? courseData.syllabus : []).map((s: any) => ({
        semester: s.semester || 1,
        subjects: s.subjects || [],
        credits: s.credits || 0
      })),
      specializations: (Array.isArray(courseData.courses) ? courseData.courses : Array.isArray(courseData.specializations) ? courseData.specializations : Array.isArray(courseData.specialisations) ? courseData.specialisations : []).map((c: any) =>
        typeof c === "string" ? c : c.specialization
      ).filter(Boolean),
      brochurePdfName: courseData.brochurePdfName || "",
      sections: Array.isArray(courseData.sections) ? courseData.sections.map((s: any) => ({
        key: s && s.key ? String(s.key) : "",
        title: s && s.title ? String(s.title) : "",
        tocTitle: s && s.tocTitle ? String(s.tocTitle) : String(s && s.title || ""),
        headingLevel: s && s.headingLevel != null ? Number(s.headingLevel) : null,
        order: s && s.order != null ? Number(s.order) : 0,
        blocks: Array.isArray(s && s.blocks) ? s.blocks.map((b: any) => ({
          type: b && b.type ? String(b.type) : "richtext",
          title: b && b.title != null ? String(b.title) : null,
          headingLevel: b && b.headingLevel != null ? Number(b.headingLevel) : null,
          designPattern: b && b.designPattern != null ? String(b.designPattern) : null,
          content: b ? b.content : null,
        })) : [],
      })) : [],
      toc: Array.isArray(courseData.toc) ? courseData.toc.map((t: any) => ({ id: String(t && t.id || ""), title: String(t && t.title || ""), order: t && t.order != null ? Number(t.order) : 0 })) : [],
      faqs: faqItems.map((f: any) => ({
        id: f && f._id ? String(f._id) : "",
        question: stripHtmlToText(String(f && f.question || "")),
        answer: String(f && f.answer || "")
      })),
      faq: {
        items: faqItems.map((f: any) => ({
          id: f && f._id ? String(f._id) : "",
          question: stripHtmlToText(String(f && f.question || "")),
          answer: String(f && f.answer || "")
        }))
      },
      testimonials: Array.isArray(courseData.testimonials) ? courseData.testimonials.map((t: any) => ({ id: t && t._id ? String(t._id) : "", studentName: String(t && t.studentName || t && t.name || ""), profession: t && t.profession ? String(t.profession) : "", text: String(t && t.text || t && t.quote || ""), rating: t && t.rating != null ? Number(t.rating) : null })) : [],
      images: {
        logo: logoUrl,
        hero: rawImageUrl,
        banner: isBanner ? primaryUrl : "",
        primary: primaryUrl,
        isBanner,
        alt: altText,
      },
      seo: {
        meta: courseData.seo && courseData.seo.meta ? courseData.seo.meta : {},
        og: courseData.seo && courseData.seo.og ? courseData.seo.og : {},
        twitter: courseData.seo && courseData.seo.twitter ? courseData.seo.twitter : {},
        settings: courseData.seo && courseData.seo.settings ? courseData.seo.settings : {},
      },
      topRecruiters: rawTopRecruiters,
      recruiters: parsedRecruiters,
    };
  });
}

export function mapApiCourse(course: any): CourseData | null {
  const mapped = mapApiCourses([course]);
  return mapped.length ? mapped[0] : null;
}

export function adaptApiCollegeToUniversityData(college: any, overview: any): UniversityData {
  const collegeData = college?.college_id || college;
  const overviewData = overview || college?.overview || {};
  const courses = mapApiCourses(Array.isArray(overviewData?.popularProgrammes)
    ? overviewData.popularProgrammes
    : Array.isArray(overviewData?.coursesFees?.table) ? overviewData.coursesFees.table : []);
  const importantDates = Array.isArray(overviewData?.importantDates) ? overviewData.importantDates : [];
  const examPattern = Array.isArray(overviewData?.examinationPattern?.steps) ? overviewData.examinationPattern.steps : [];
  const lmsFeatures = Array.isArray(overviewData?.lms?.features) ? overviewData.lms.features : [];
  const scholarships = Array.isArray(overviewData?.scholarships?.items) ? overviewData.scholarships.items : [];
  const placementStats = overviewData?.placements?.stats || {};
  const rankingRows = Array.isArray(overviewData?.rankingsAndAccreditations?.table) ? overviewData.rankingsAndAccreditations.table : [];
  const minFee = Number(collegeData?.minFee ?? college?.minFee) || 0;
  const maxFee = Number(collegeData?.maxFee ?? college?.maxFee) || 0;
  const feeRange = minFee && maxFee
    ? minFee === maxFee ? `₹${minFee.toLocaleString("en-IN")}` : `₹${minFee.toLocaleString("en-IN")} – ₹${maxFee.toLocaleString("en-IN")}`
    : minFee || maxFee ? `₹${(minFee || maxFee).toLocaleString("en-IN")}` : "Fee information unavailable";
  const durationValues = courses.map(course => course.duration).filter(Boolean);
  const duration = durationValues.length ? [...new Set(durationValues)].join(" – ") : "Duration information unavailable";
  const recruiters = Array.isArray(overviewData?.topRecruiters) ? overviewData.topRecruiters : [];
  const approvals = Array.isArray(collegeData?.approvals || college?.approvals) ? (collegeData?.approvals || college?.approvals) : [];
  const naacGrade = approvals.find((approval: any) => typeof approval === "string" && /naac/i.test(approval)) || "";
  const placements = [
    ["Placement rate", placementStats.placementRate],
    ["Highest package", placementStats.highestPackage],
    ["Average package", placementStats.avgPackage],
    ["Hiring partners", placementStats.hiringPartners]
  ].filter(([, value]) => value !== undefined && value !== null && value !== "").map(([label, value]) => ({ label, value: String(value) }));
  
  return {
    id: collegeData?._id || college?.id || "",
    name: collegeData?.name || college?.name || overviewData?.title || "",
    shortName: collegeData?.collegeShortName || college?.shortName || overviewData?.subtitle || "",
    slug: collegeData?.slug || college?.slug || "",
    location: collegeData?.location || college?.location || "",
    established: collegeData?.established || college?.established || "",
    rating: collegeData?.rating || college?.rating || "",
    nirfRanking: collegeData?.nirfRanking || college?.nirfRanking || "",
    approvals,
    logo: collegeData?.logo || college?.logo || overviewData?.hero?.logoImage || "",
    logoImage: collegeData?.logo || college?.logo || overviewData?.hero?.logoImage || "",
    collegeImage: collegeData?.collegeImage || college?.collegeImage || overviewData?.hero?.backgroundImage || "",
    backgroundImage: collegeData?.collegeImage || college?.collegeImage || overviewData?.hero?.backgroundImage || "",
    collegeMode: collegeData?.collegeMode || college?.collegeMode || "online",
    collegeType: collegeData?.collegeType || college?.collegeType || "",
    website: collegeData?.website || college?.website || "",
    minFee,
    maxFee,
    naacGrade,
    verifiedYear: "",
    type: collegeData?.collegeType || college?.collegeType || "",
    tagline: overviewData?.hero?.subtitle || "",
    quickStats: {
      feeRange,
      duration,
      mode: collegeData?.collegeMode || college?.collegeMode || "",
      placementRate: placementStats.placementRate == null ? "" : String(placementStats.placementRate),
      highestPackage: placementStats.highestPackage == null ? "" : String(placementStats.highestPackage),
      emiStarting: ""
    },
    placementStats: collegeData?.placementStats || college?.placementStats || {},
    courses,
    highlights: overviewData?.highlightsTable || [],
    admissions: {
      intro: overviewData?.admissionProcess?.intro || "",
      steps: overviewData?.admissionProcess?.steps || [],
      importantDates,
      eligibility: overviewData?.eligibilityMatrix || [],
      documents: overviewData?.documentsRequired || [],
      eligibilityMatrix: overviewData?.eligibilityMatrix || [],
      requiredDocuments: overviewData?.documentsRequired || []
    },
    scholarships: overviewData?.scholarships || {
      description: "",
      items: [],
      note: ""
    },
    placements: {
      intro: overviewData?.placements?.intro || "",
      stats: overviewData?.placements?.stats || {
        placementRate: "90%",
        highestPackage: "₹7.25 LPA",
        avgPackage: "₹3 LPA",
        hiringPartners: "100+",
        internshipsCount: "80+"
      },
      topRecruiters: recruiters,
      metrics: placements,
      supportServices: [],
      recruiters: recruiters.map((recruiter: any) => typeof recruiter === "string" ? { name: recruiter } : recruiter),
      note: overviewData?.placements?.note || ""
    },
    rankings: overviewData?.rankingsAndAccreditations?.table || [],
    rankingsAndAccreditations: {
      intro: overviewData?.rankingsAndAccreditations?.intro || "",
      table: rankingRows
    },
    campus: {
      description: overviewData?.campus?.description || "",
      travelTable: overviewData?.campus?.travelTable || [],
      gallery: overviewData?.campus?.gallery || []
    },
    lms: {
      name: overviewData?.lms?.name || "",
      description: overviewData?.lms?.description || "",
      features: overviewData?.lms?.features || []
    },
    campusAndLms: {
      intro: overviewData?.examinationPattern?.intro || overviewData?.lms?.description || overviewData?.campus?.description || "",
      lmsName: overviewData?.lms?.name || "",
      lmsFeatures,
      lmsPlatformTitle: overviewData?.lms?.name || "",
      lmsPlatform: lmsFeatures,
      examPattern,
      sampleDegree: overviewData?.sampleDegree || null,
      campusDetails: overviewData?.campus || {}
    },
    importantDates: {
      note: overviewData?.importantDatesNote || "",
      items: importantDates
    },
    feesAndFinancing: {
      intro: overviewData?.scholarships?.description || "",
      emiOptionsDescription: "",
      scholarships: scholarships.map((item: any) => ({
        title: item.name || item.title || "",
        benefit: item.benefit || item.tag || "",
        description: item.description || item.details || "",
        tag: item.tag || ""
      })),
      scholarshipsNote: overviewData?.scholarships?.note || ""
    },
    faqs: overviewData?.faqs || [],
    testimonials: overviewData?.testimonials || [],
    blogs:
      (Array.isArray(overviewData?.blogs)
        ? overviewData.blogs
        : Array.isArray(overviewData?.blogs?.posts)
          ? overviewData.blogs.posts
          : []) || [],
    overview: overviewData
  };
}
