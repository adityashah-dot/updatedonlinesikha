export interface CourseData {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  category: string;
  level: string;
  duration: string;
  semestersCount: number;
  perSemFee: number;
  totalFee: number;
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

function mapApiCourses(courses: any[]): CourseData[] {
  if (!Array.isArray(courses)) return [];
  
  return courses.map((course, index) => {
    const courseData = course || {};
    const courseName = courseData.degreeName || courseData.name || courseData.title || "";
    const courseId = courseData.slug || courseName.toLowerCase().replace(/[^a-z]/g, "") || `course-${index}`;
    const avgFee = Number(courseData.avgFee) || 0;
    const avgDuration = Number(courseData.avgDuration) || 0;
    const semestersCount = avgDuration > 0 ? avgDuration * 2 : 1;
    
    return {
      id: courseId,
      code: courseName || courseData.code || "",
      name: courseName,
      shortDescription: courseData.description || "",
      category: courseData.level === "pg" ? "pg" : courseData.level === "ug" ? "ug" : courseData.level ? "diploma" : "",
      level: courseData.level ? String(courseData.level).toUpperCase() : "",
      duration: courseData.duration || (avgDuration ? `${avgDuration} Years` : ""),
      semestersCount,
      perSemFee: Math.round(avgFee / semestersCount) || avgFee,
      totalFee: avgFee * semestersCount || avgFee,
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
      brochurePdfName: courseData.brochurePdfName || ""
    };
  });
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
