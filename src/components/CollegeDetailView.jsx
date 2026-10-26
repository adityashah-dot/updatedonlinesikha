import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import OverviewView from "./OverviewView";
import CollegeAdmission from "./AdmissionView";
import CollegeScholarships from "./ScholarshipsView";
import CollegeCourses from "./CollegeCourses";
import { SiteActionsContext } from "./shell/SiteActionsContext";
import { loadCollegePage } from "../services";
import { SEO } from "../components/SEO";
import { COURSES_DATA } from "../data/coursesData";

const TAB_ICONS = {
  overview: "grid_view",
  courses: "menu_book",
  admission: "how_to_reg",
  scholarships: "workspace_premium",
  scholarship: "workspace_premium",
};

const getTabIcon = (label) => {
  const key = String(label || "").toLowerCase().replace(/\s+/g, "");
  return TAB_ICONS[key] || "article";
};

const parseSection = (value) => {
  if (value === "courses" || value === "admission" || value === "scholarships" || value === "scholarship" || value === "lms") return value;
  return "overview";
};

const NAV_TAB_IDS_WITH_HIDDEN_SCROLLBAR = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export const CollegeDetailView = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  onOpenEmi,
  onOpenLms
}) => {
  const params = useParams();
  const { slug = params["*"] || "" } = params;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const normalizedSlug = slug.toLowerCase();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(() => parseSection(searchParams.get("section")));

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const slugParts = normalizedSlug.split("/").filter(Boolean);
        const loaded = await loadCollegePage(slugParts);
        setPageData(loaded);
      } catch (error) {
        console.error("Failed to load college page:", error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [normalizedSlug]);

  useEffect(() => {
    setActiveSection(parseSection(searchParams.get("section")));
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#f9f9ff]">
        <Loader2 className="w-10 h-10 text-[#115eaf] animate-spin" />
      </div>
    );
  }

  /* The content is rendered only when the CMS published it: an unknown
   * slug, an unpublished page, or a non online/distance college all answer
   * the same Not Found card — the Overview is never re-labelled. */
  const unavailable = !pageData || pageData.unavailable || !pageData.college || !pageData.overview;
  if (unavailable) {
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

  const { college, overview, section, nav } = pageData;
  const navTabs = nav?.tabs || [];

  /* The requested tab must be one of the pages the CMS published. */
  const publishedSections = new Set(["overview", "lms"]);
  navTabs.forEach((tab) => {
    if (tab.kind === "base") publishedSections.add("overview");
    else if (tab.kind === "sub") {
      if (tab.section === "page") publishedSections.add(tab.sub);
      else publishedSections.add(tab.section);
    }
  });
  if (!publishedSections.has(activeSection)) {
    const publishedPage = navTabs.find(
      (tab) =>
        (tab.kind === "page" && tab.id === activeSection) ||
        (tab.kind === "sub" && tab.section === "page" && tab.sub === activeSection)
    );
    if (!publishedPage) {
      return <>
          <SEO
        title="Page Not Found | Online Siksha"
        description="The university page you're looking for could not be found."
      />
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#f9f9ff]">
            <h1 className="text-8xl font-black text-[#115eaf]/20 mb-2 tracking-tighter">404</h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000f22] mb-3">Page Not Found</h2>
            <p className="text-[#43474d] mb-8 max-w-md text-sm">
              The CMS has not published this page for {college?.name || "this university"}.
            </p>
            <Link
          to={`/universities/${pageData.collegeSlug}`}
          className="px-6 py-3 bg-[#115eaf] text-white text-sm font-semibold rounded-xl hover:bg-[#004689] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Link>
          </div>
        </>;
    }
  }

  const handleTabClick = (tab) => {
    if (tab === "lms" || tab?.section === "lms") {
      onOpenLms();
      return;
    }
    if (tab.section === "overview" || tab.kind === "base" || tab === "overview") {
      setActiveSection("overview");
      setSearchParams({}, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (tab.kind === "page" || (tab.kind === "sub" && tab.section === "page")) {
      /* Standalone CMS pages keep their own URL segment. */
      navigate(`/${tab.href.replace(/^\/+/, "")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveSection(tab.section);
    setSearchParams({ section: tab.section }, { replace: true });
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
        <div className={`flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1.5 ${NAV_TAB_IDS_WITH_HIDDEN_SCROLLBAR}`}>
          {navTabs.map((tab) => {
    const isActive = tab.kind === "base"
      ? activeSection === "overview"
      : tab.kind === "sub"
        ? tab.section === "page"
          ? false
          : activeSection === tab.section
        : false;
    return <button
      key={tab.id || tab.slug || tab.label}
      onClick={() => handleTabClick(tab)}
      className={`shrink-0 flex items-center gap-1 px-2.5 py-1 min-h-[36px] rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${isActive ? "bg-[#115eaf] text-white font-semibold shadow-xs" : "text-[#43474d] hover:bg-[#f0f3ff] hover:text-[#115eaf]"}`}
    >
                <span className="material-symbols-outlined text-[14px] sm:text-[16px] leading-none">{getTabIcon(tab.label)}</span>
                <span>{tab.label}</span>
              </button>;
  })}
        </div>
      </div>
    </div>;

  /* Folder-1 shell actions: modals must always show the university the
     visitor is currently browsing. */
  const siteActions = {
    onOpenApply,
    onOpenBrochure,
    onOpenHelpDesk,
    onOpenEmi,
    onOpenLms,
    onSelectCourse: handleSelectUniversityCourse,
    activeCollege: {
      id: college.id || "",
      name: college.name || overview.title || "",
      shortName: college.shortName || "",
      slug: college.slug || pageData.collegeSlug || "",
    },
  };

  const seoTitle = `${college.name || overview.title} - Courses, Fees & Admission 2026 | Online Siksha`;
  const seoDescription = activeSection === "courses"
    ? `${college.shortName || college.name} online courses and fees 2026: program-wise semester and total fees, eligibility, specialisations and admission dates.`
    : activeSection === "admission"
      ? `${college.shortName || college.name} online admission 2026: important dates, eligibility criteria, application process, documents required and scholarships.`
      : activeSection === "scholarships"
        ? `${college.shortName || college.name} online scholarships 2026: fee waivers and concessions, plus zero-cost EMI options.`
        : `${college.name} online degrees: approvals, fees, eligibility, admissions and placements — verified university profile.`;

  return <>
      <SEO title={seoTitle} description={seoDescription} />
      <SiteActionsContext.Provider value={siteActions}>
        <div className="uni-detail">
          {activeSection === "courses" && <CollegeCourses
        college={{ name: college.name, shortName: college.shortName, college: college }}
        overview={overview}
        universityNavigation={universityNavigation}
        onSelectCourse={handleSelectUniversityCourse}
        onOpenApply={onOpenApply}
        onOpenBrochure={onOpenBrochure}
        onOpenEmi={onOpenEmi}
        onOpenHelpDesk={onOpenHelpDesk}
      />}

          {activeSection === "admission" && <CollegeAdmission
        college={{ name: college.name, shortName: college.shortName, scholarships: college.scholarships }}
        overview={overview}
        universityNavigation={universityNavigation}
      />}

          {activeSection === "scholarships" && <CollegeScholarships
        college={{ name: college.name, shortName: college.shortName, scholarships: college.scholarships }}
        overview={overview}
        universityNavigation={universityNavigation}
      />}

          {(activeSection === "overview" || activeSection === "lms") && <OverviewView
        collegeData={overview}
        onSelectCourse={handleSelectUniversityCourse}
        onOpenApply={onOpenApply}
        onOpenBrochure={onOpenBrochure}
        onOpenHelpDesk={onOpenHelpDesk}
        universityNavigation={universityNavigation}
      />}
        </div>
      </SiteActionsContext.Provider>
    </>;
};
