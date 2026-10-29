function mapApiCourses(courses) {
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
      syllabus: (Array.isArray(courseData.syllabus) ? courseData.syllabus : []).map((s) => ({
        semester: s.semester || 1,
        subjects: s.subjects || [],
        credits: s.credits || 0
      })),
      specializations: (Array.isArray(courseData.courses) ? courseData.courses : Array.isArray(courseData.specializations) ? courseData.specializations : Array.isArray(courseData.specialisations) ? courseData.specialisations : []).map(
        (c) => typeof c === "string" ? c : c.specialization
      ).filter(Boolean),
      brochurePdfName: courseData.brochurePdfName || ""
    };
  });
}
export function adaptApiCollegeToUniversityData(college, overview) {
  const collegeData = college?.college_id || college;
  const overviewData = overview || college?.overview || {};
  const courses = mapApiCourses(Array.isArray(overviewData?.popularProgrammes) ? overviewData.popularProgrammes : Array.isArray(overviewData?.coursesFees?.table) ? overviewData.coursesFees.table : []);
  const importantDates = Array.isArray(overviewData?.importantDates) ? overviewData.importantDates : [];
  const examPattern = Array.isArray(overviewData?.examinationPattern?.steps) ? overviewData.examinationPattern.steps : [];
  const lmsFeatures = Array.isArray(overviewData?.lms?.features) ? overviewData.lms.features : [];
  const scholarships = Array.isArray(overviewData?.scholarships?.items) ? overviewData.scholarships.items : [];
  const placementStats = overviewData?.placements?.stats || {};
  const rankingRows = Array.isArray(overviewData?.rankingsAndAccreditations?.table) ? overviewData.rankingsAndAccreditations.table : [];
  const minFee = Number(collegeData?.minFee ?? college?.minFee) || 0;
  const maxFee = Number(collegeData?.maxFee ?? college?.maxFee) || 0;
  const feeRange = minFee && maxFee ? minFee === maxFee ? `\u20B9${minFee.toLocaleString("en-IN")}` : `\u20B9${minFee.toLocaleString("en-IN")} \u2013 \u20B9${maxFee.toLocaleString("en-IN")}` : minFee || maxFee ? `\u20B9${(minFee || maxFee).toLocaleString("en-IN")}` : "Fee information unavailable";
  const durationValues = courses.map((course) => course.duration).filter(Boolean);
  const duration = durationValues.length ? [...new Set(durationValues)].join(" \u2013 ") : "Duration information unavailable";
  const recruiters = Array.isArray(overviewData?.topRecruiters) ? overviewData.topRecruiters : [];
  const approvals = Array.isArray(collegeData?.approvals || college?.approvals) ? collegeData?.approvals || college?.approvals : [];
  const naacGrade = approvals.find((approval) => typeof approval === "string" && /naac/i.test(approval)) || "";
  const placements = [
    ["Placement rate", placementStats.placementRate],
    ["Highest package", placementStats.highestPackage],
    ["Average package", placementStats.avgPackage],
    ["Hiring partners", placementStats.hiringPartners]
  ].filter(([, value]) => value !== void 0 && value !== null && value !== "").map(([label, value]) => ({ label, value: String(value) }));
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
        highestPackage: "\u20B97.25 LPA",
        avgPackage: "\u20B93 LPA",
        hiringPartners: "100+",
        internshipsCount: "80+"
      },
      topRecruiters: recruiters,
      metrics: placements,
      supportServices: [],
      recruiters: recruiters.map((recruiter) => typeof recruiter === "string" ? { name: recruiter } : recruiter),
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
      scholarships: scholarships.map((item) => ({
        title: item.name || item.title || "",
        benefit: item.benefit || item.tag || "",
        description: item.description || item.details || "",
        tag: item.tag || ""
      })),
      scholarshipsNote: overviewData?.scholarships?.note || ""
    },
    faqs: overviewData?.faqs || [],
    testimonials: overviewData?.testimonials || [],
    blogs: (Array.isArray(overviewData?.blogs) ? overviewData.blogs : Array.isArray(overviewData?.blogs?.posts) ? overviewData.blogs.posts : []) || [],
    overview: overviewData
  };
}
