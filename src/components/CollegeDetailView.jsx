import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, Calculator, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OverviewView } from "./OverviewView";
import { AdmissionView } from "./AdmissionView";
import { ScholarshipsView } from "./ScholarshipsView";
import { CoursesAndFeesView } from "./CoursesAndFeesView";
import { DEGREEFYD_LPU_API } from "../data/apiData";
import { getUniversityBySlug } from "../data/universities";
import { UniversityHero } from "./university/UniversityHero";
import { UniversityOverview } from "./university/UniversityOverview";
import { UniversityPageCourses } from "./university/UniversityPageCourses";
import { UniversityPageAdmission } from "./university/UniversityPageAdmission";
import { UniversityPageScholarships } from "./university/UniversityPageScholarships";
import { UniversityCourses } from "./university/UniversityCourses";
import { CU_PAGE_CONTENT } from "../data/universities/cuContent";
import { CU_SCHOLARSHIP_RULES, CU_SCHOLARSHIP_PILLARS } from "../data/universities/cuScholarships";
import { UniversityAdmissions } from "./university/UniversityAdmissions";
import { UniversityFees } from "./university/UniversityFees";
import { UniversityPlacements } from "./university/UniversityPlacements";
import { UniversityRankings } from "./university/UniversityRankings";
import { UniversityLms } from "./university/UniversityLms";
import { UniversityDates } from "./university/UniversityDates";
import { UniversityFaq } from "./university/UniversityFaq";
import { UniversityRelated } from "./university/UniversityRelated";
import { CuOverviewView } from "./CuOverviewView";
import { AmityOverviewView } from "./AmityOverviewView";
import { AmityAdmissionView } from "./AmityAdmissionView";
import { AmityCoursesView } from "./AmityCoursesView";
import { AmityScholarshipsView } from "./AmityScholarshipsView";
import { BlogsListSection } from "./BlogsListSection";
import { SEO } from "../components/SEO";
import { COURSES_DATA } from "../data/coursesData";
const SLUG_ALIASES = {
  lpu: "lpu-online",
  "lpu-online": "lpu-online",
  "lovely-professional-university": "lpu-online",
  amity: "amity-online",
  "amity-online": "amity-online",
  "amity-university-online": "amity-online",
  cu: "cu-online",
  "cu-online": "cu-online",
  "chandigarh-university": "cu-online",
  "chandigarh-university-distance": "cu-online",
  "chandigarh-university-online": "cu-online",
  manipal: "manipal-online",
  "manipal-online": "manipal-online",
  "online-manipal": "manipal-online",
  jain: "jain-online",
  "jain-online": "jain-online",
  upes: "upes-online",
  "upes-online": "upes-online"
};
const LPU_TABS = [
  { id: "overview", label: "Overview", icon: "grid_view" },
  { id: "courses", label: "Courses", icon: "menu_book" },
  { id: "admission", label: "Admission", icon: "school" },
  { id: "scholarships", label: "Scholarships", icon: "workspace_premium" }
];
const parseSection = (value) => {
  if (value === "courses" || value === "admission" || value === "scholarships" || value === "lms") return value;
  return "overview";
};
export const CollegeDetailView = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  onOpenEmi,
  onOpenLms
}) => {
  const { slug = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const normalizedSlug = slug.toLowerCase();
  const collegeId = SLUG_ALIASES[normalizedSlug] || normalizedSlug;
  const college = DEGREEFYD_LPU_API.onlineUniversities.find((c) => c.id === collegeId) || getUniversityBySlug(collegeId);
  const universityData = getUniversityBySlug(collegeId);
  const [lpuSection, setLpuSection] = useState(() => parseSection(searchParams.get("section")));
  useEffect(() => {
    setLpuSection(parseSection(searchParams.get("section")));
  }, [searchParams]);
  if (!college) {
    return <>
        <SEO
      title="University Not Found | Online Siksha"
      description="The university page you're looking for could not be found."
    />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#f9f9ff]">
          <h1 className="text-8xl font-black text-[#115eaf]/20 mb-2 tracking-tighter">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#000f22] mb-3">University Not Found</h2>
          <p className="text-[#43474d] mb-8 max-w-md text-sm">
            We couldn't find the online university you're looking for. It may have been removed or the link might be broken.
          </p>
          <Link
      to="/universities"
      className="px-6 py-3 bg-[#115eaf] text-white text-sm font-semibold rounded-xl hover:bg-[#004689] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
    >
            <ArrowLeft className="w-4 h-4" />
            Browse All Universities
          </Link>
        </div>
      </>;
  }
  const handleTabClick = (tab) => {
    if (tab === "lms") {
      onOpenLms();
      return;
    }
    setLpuSection(tab);
    if (tab === "overview") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ section: tab }, { replace: true });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSelectUniversityCourse = (item) => {
    const match = COURSES_DATA.find((c) => c.id === item.id);
    if (match) {
      onSelectCourse(match);
      return;
    }
    const level = item.level === "PG" ? "pg" : item.level === "UG" ? "ug" : "diploma";
    onSelectCourse({
      id: item.id,
      code: item.code || item.name,
      name: item.name,
      shortDescription: item.description || "",
      category: level,
      level: item.level,
      duration: item.duration,
      semestersCount: 0,
      perSemFee: 0,
      totalFee: 0,
      credits: 0,
      eligibility: item.eligibility,
      careerProspects: {
        avgPackage: item.careerProspects?.avgPackage || "",
        highestPackage: item.careerProspects?.highestPackage || "",
        roles: item.careerProspects?.roles || []
      },
      syllabus: (item.syllabus || []).map((s) => ({ ...s, credits: 0 })),
      specializations: item.specializations,
      brochurePdfName: ""
    });
  };
  const universityNavigation = <div className="sticky top-[68px] z-30 bg-white border-b border-[#e7eeff] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LPU_TABS.map((tab) => {
    const isActive = lpuSection === tab.id;
    return <button
      key={tab.id}
      onClick={() => handleTabClick(tab.id)}
      className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-medium transition-colors ${isActive ? "bg-[#115eaf] text-white font-semibold shadow-xs" : "text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]"}`}
    >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>;
  })}
          <button
    onClick={() => handleTabClick("lms")}
    className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-medium transition-colors text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]"
  >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">devices</span>
            <span>LMS Portal</span>
          </button>
        </div>
      </div>
    </div>;
  const isLpu = collegeId === "lpu-online" || collegeId === "lpu";
  if (isLpu) {
    return <div className="uni-detail">
        {lpuSection === "overview" && <OverviewView
      onSelectCourse={onSelectCourse}
      onOpenApply={onOpenApply}
      onOpenBrochure={onOpenBrochure}
      onOpenHelpDesk={onOpenHelpDesk}
      universityNavigation={universityNavigation}
    />}

        {lpuSection === "courses" && <CoursesAndFeesView
      onSelectCourse={onSelectCourse}
      onOpenApply={onOpenApply}
      onOpenBrochure={onOpenBrochure}
      onOpenEmi={onOpenEmi}
      onOpenHelpDesk={onOpenHelpDesk}
      universityNavigation={universityNavigation}
    />}

        {lpuSection === "admission" && <AdmissionView
      onSelectCourse={onSelectCourse}
      onOpenApply={onOpenApply}
      onOpenBrochure={() => onOpenBrochure()}
      onOpenHelpDesk={onOpenHelpDesk}
      onOpenEmi={() => onOpenEmi()}
      universityNavigation={universityNavigation}
    />}

        {lpuSection === "scholarships" && <ScholarshipsView
      onOpenApply={onOpenApply}
      onOpenHelpDesk={onOpenHelpDesk}
      universityNavigation={universityNavigation}
    />}
      </div>;
  }
  const isAmity = collegeId === "amity-online" || collegeId === "amity";
  if (isAmity) {
    const title = `Amity University Online - Courses, Fees & Admission 2026 | Online Siksha`;
    const description = lpuSection === "courses" ? "Amity Online courses and fees 2026: MBA, MCA, BBA, BCA, B.Com, MA. Semester-wise fees, eligibility, specialisations and admission dates." : lpuSection === "admission" ? "Amity Online admission 2026: important dates, eligibility criteria, step-by-step application process, documents required and scholarships." : lpuSection === "scholarships" ? "Amity Online scholarships 2026: merit-based, defence, alumni, AONSAT and sports fee waivers, plus zero-cost EMI options." : "Amity University Online UGC-entitled degrees: MBA, MCA, BBA, BCA, B.Com, MA. NAAC A+, NIRF #22. Fees, eligibility, admissions, placements.";
    return <>
        <SEO title={title} description={description} />
        <div className="uni-detail min-h-screen bg-[#f9f9ff]">
        {lpuSection === "overview" && <AmityOverviewView
      universityNavigation={universityNavigation}
      onOpenApply={onOpenApply}
      onOpenBrochure={() => onOpenBrochure()}
      onOpenHelpDesk={onOpenHelpDesk}
    />}

        {lpuSection === "courses" && <AmityCoursesView
      universityNavigation={universityNavigation}
      onOpenApply={onOpenApply}
      onOpenBrochure={() => onOpenBrochure()}
      onOpenEmi={() => onOpenEmi()}
      onOpenHelpDesk={onOpenHelpDesk}
      onSelectCourse={onSelectCourse}
    />}

        {lpuSection === "admission" && <AmityAdmissionView
      universityNavigation={universityNavigation}
      onOpenApply={onOpenApply}
      onOpenBrochure={() => onOpenBrochure()}
      onOpenHelpDesk={onOpenHelpDesk}
    />}

        {lpuSection === "scholarships" && <AmityScholarshipsView
      universityNavigation={universityNavigation}
      onOpenApply={onOpenApply}
      onOpenBrochure={() => onOpenBrochure()}
      onOpenHelpDesk={onOpenHelpDesk}
    />}
        </div>
      </>;
  }
  if (universityData) {
    const isCu = collegeId === "cu-online" || collegeId === "cu";
    const cuTitle = lpuSection === "courses" ? "CU Online Courses and Fees 2026 - Programs, Eligibility & Admission | Online Siksha" : lpuSection === "admission" ? "CU Online Admission 2026 - Process, Dates, Eligibility & Fees | Online Siksha" : lpuSection === "scholarships" ? "CU Online Scholarships 2026 - Fee Waivers, EMI & Concessions | Online Siksha" : "Chandigarh University Online - Courses, Fees & Admission 2026 | Online Siksha";
    const cuDescription = lpuSection === "courses" ? "CU Online courses and fees 2026: MBA, MCA, BBA, BCA, M.Com, MA. Semester-wise fees, eligibility, specialisations and admission dates." : lpuSection === "admission" ? "CU Online admission 2026: important dates, eligibility criteria, step-by-step application process, documents required and scholarships." : lpuSection === "scholarships" ? "CU Online scholarships 2026: early bird, merit-based and defence fee concessions, plus zero-cost EMI options." : "Chandigarh University Online UGC-entitled degrees: MBA, MCA, BBA, BCA, M.Com, MA. NAAC A+, NIRF #19. Fees, eligibility, admissions, placements.";
    if (isCu && lpuSection === "overview") {
      return <>
          <SEO title={cuTitle} description={cuDescription} />
          <div className="uni-detail min-h-screen bg-[#f9f9ff]">
            <CuOverviewView
        universityNavigation={universityNavigation}
        onOpenApply={onOpenApply}
        onOpenBrochure={() => onOpenBrochure()}
        onOpenHelpDesk={onOpenHelpDesk}
      />
          </div>
        </>;
    }
    if (isCu && lpuSection === "courses") {
      return <>
          <SEO title={cuTitle} description={cuDescription} />
          <div className="uni-detail min-h-screen bg-[#f9f9ff]">
            <UniversityPageCourses
        university={universityData}
        onSelectCourse={handleSelectUniversityCourse}
        onOpenApply={onOpenApply}
        onOpenBrochure={() => onOpenBrochure()}
        onOpenEmi={onOpenEmi}
        onOpenHelpDesk={onOpenHelpDesk}
        universityNavigation={universityNavigation}
      />
          </div>
        </>;
    }
    if (isCu && lpuSection === "admission") {
      return <>
          <SEO title={cuTitle} description={cuDescription} />
          <div className="uni-detail min-h-screen bg-[#f9f9ff]">
            <UniversityPageAdmission
        university={universityData}
        onSelectCourse={handleSelectUniversityCourse}
        onOpenApply={onOpenApply}
        onOpenBrochure={() => onOpenBrochure()}
        onOpenHelpDesk={onOpenHelpDesk}
        universityNavigation={universityNavigation}
        heroDescription={CU_PAGE_CONTENT.heroDescription}
        statusStats={CU_PAGE_CONTENT.admission.statusStats}
        applicationSteps={CU_PAGE_CONTENT.admission.applicationProcess.steps}
      />
          </div>
        </>;
    }
    if (isCu && lpuSection === "scholarships") {
      return <>
          <SEO title={cuTitle} description={cuDescription} />
          <div className="uni-detail min-h-screen bg-[#f9f9ff]">
            <UniversityPageScholarships
        university={universityData}
        onOpenApply={onOpenApply}
        onOpenHelpDesk={onOpenHelpDesk}
        universityNavigation={universityNavigation}
        scholarshipRules={CU_SCHOLARSHIP_RULES}
        pillars={CU_SCHOLARSHIP_PILLARS}
      />
          </div>
        </>;
    }
    return <>
        {isCu && <SEO title={cuTitle} description={cuDescription} />}
        <div className="uni-detail min-h-screen bg-[#f9f9ff]">
        {
      /* Top Hero Banner */
    }
        <UniversityHero
      university={universityData}
      onOpenApply={onOpenApply}
      onOpenBrochure={() => onOpenBrochure()}
      onOpenEmi={() => onOpenEmi()}
      onOpenCounselor={onOpenHelpDesk}
    />

        {
      /* Sticky 4-Page Navigation Tab Bar */
    }
        {universityNavigation}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <main className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
      key={lpuSection}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="section-container"
    >
                  {
      /* PAGE 1: OVERVIEW PAGE */
    }
                  {lpuSection === "overview" && <div className="section-container">
                      <UniversityOverview university={universityData} />
                      <UniversityPlacements university={universityData} />
                      <UniversityRankings university={universityData} />
                      <UniversityLms university={universityData} onOpenLms={onOpenLms} />
                      <UniversityFaq university={universityData} />
                      <UniversityRelated currentUniversityId={universityData.id} />
                    </div>}

                  {
      /* PAGE 2: COURSES & FEES PAGE */
    }
                  {lpuSection === "courses" && <div className="section-container">
                      <UniversityCourses
      university={universityData}
      onOpenApply={onOpenApply}
      onOpenEmi={onOpenEmi}
      onSelectCourse={onSelectCourse}
    />
                      <UniversityFees
      university={universityData}
      onOpenEmi={() => onOpenEmi()}
      onOpenApply={() => onOpenApply()}
    />
                    </div>}

                  {
      /* PAGE 3: ADMISSION PAGE */
    }
                  {lpuSection === "admission" && <div className="section-container">
                      <UniversityAdmissions
      university={universityData}
      onOpenApply={() => onOpenApply()}
    />
                      <UniversityDates
      university={universityData}
      onOpenApply={() => onOpenApply()}
    />
                    </div>}

                  {
      /* PAGE 4: SCHOLARSHIPS & FINANCING PAGE */
    }
                  {lpuSection === "scholarships" && <div className="section-container">
                      <UniversityFees
      university={universityData}
      onOpenEmi={() => onOpenEmi()}
      onOpenApply={() => onOpenApply()}
    />
                    </div>}
                </motion.div>
              </AnimatePresence>

              {
      /* CU: blogs section at the end of the admission & scholarships tabs */
    }
              {isCu && (lpuSection === "admission" || lpuSection === "scholarships") && <div className="section-container mt-6">
                  <BlogsListSection
      onOpenHelpDesk={onOpenHelpDesk}
      className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
    />
                </div>}
            </main>

            {
      /* Sidebar */
    }
            <aside className="lg:col-span-4 space-y-3 lg:sticky lg:top-24">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Direct Candidate Assistance
                </h4>
                <div className="space-y-2">
                  <button
      type="button"
      onClick={() => onOpenBrochure()}
      className="w-full py-2.5 px-3.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-between"
    >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-slate-500" />
                      <span>Download Official Brochure</span>
                    </span>
                    <span className="text-[11px] text-slate-400">PDF</span>
                  </button>

                  <button
      type="button"
      onClick={() => onOpenEmi()}
      className="w-full py-2.5 px-3.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-between"
    >
                    <span className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-slate-500" />
                      <span>Check Monthly EMI Plans</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold">0% Interest</span>
                  </button>

                  <button
      type="button"
      onClick={onOpenHelpDesk}
      className="w-full py-2.5 px-3.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-between"
    >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                      <span>Admission Help Desk</span>
                    </span>
                    <span className="text-[11px] text-blue-600 font-bold">Toll Free</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
        </div>
      </>;
  }
  return null;
};
