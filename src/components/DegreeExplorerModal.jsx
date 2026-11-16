import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Search,
  ArrowRight,
  GraduationCap,
  Laptop,
  Globe,
  Briefcase,
  Award,
  Cpu,
  BarChart3,
  BookOpen,
  CreditCard,
  Zap,
} from "lucide-react";

export const DEGREE_DOMAINS = [
  {
    id: "pg",
    name: "PG Courses",
    tag: "After Graduation",
    courses: [
      {
        id: "online-mba",
        name: "Online MBA",
        badge: null,
        specs: "92+ Specializations",
        unis: 132,
        slug: "online-mba",
        icon: "graduation",
      },
      {
        id: "online-global-mba",
        name: "Online Global MBA",
        badge: "Trending ⚡",
        specs: "11+ Specializations",
        unis: 37,
        slug: "online-mba",
        icon: "globe",
      },
      {
        id: "1-year-mba-online",
        name: "1 Year MBA Online",
        badge: "ROI 100% ⚡",
        specs: "7+ Specializations",
        unis: 8,
        slug: "online-mba",
        icon: "briefcase",
      },
      {
        id: "online-mca",
        name: "Online MCA",
        badge: null,
        specs: "24+ Specializations",
        unis: 59,
        slug: "online-mca",
        icon: "laptop",
      },
      {
        id: "online-msc",
        name: "Online M.Sc",
        badge: null,
        specs: "22+ Specializations",
        unis: 45,
        slug: "online-msc-in-data-science",
        icon: "chart",
      },
      {
        id: "ms-degree-online",
        name: "MS Degree Online",
        badge: "Global ⚡",
        specs: "9+ Specializations",
        unis: 16,
        slug: "online-msc-in-data-science",
        icon: "cpu",
      },
      {
        id: "online-ma",
        name: "Online MA",
        badge: null,
        specs: "24+ Specializations",
        unis: 34,
        slug: "online-ma",
        icon: "book",
      },
      {
        id: "online-mcom",
        name: "Online M.Com",
        badge: null,
        specs: "7+ Specializations",
        unis: 29,
        slug: "online-mcom",
        icon: "currency",
      },
    ],
  },
  {
    id: "executive",
    name: "Executive Education",
    tag: "Working Professionals & CXOs",
    courses: [
      {
        id: "executive-mba",
        name: "Executive MBA (EMBA)",
        badge: "CXO Track ⚡",
        specs: "14+ Specializations",
        unis: 24,
        slug: "executive-mba",
        icon: "briefcase",
      },
      {
        id: "executive-pg-diploma",
        name: "Executive Post Graduate Diploma",
        badge: null,
        specs: "8+ Specializations",
        unis: 18,
        slug: "executive-mba",
        icon: "award",
      },
      {
        id: "global-executive-leadership",
        name: "Global Executive Leadership",
        badge: "Global ⚡",
        specs: "5+ Specializations",
        unis: 12,
        slug: "executive-mba",
        icon: "globe",
      },
      {
        id: "senior-management-programme",
        name: "Senior Management Programme",
        badge: null,
        specs: "6+ Specializations",
        unis: 15,
        slug: "executive-mba",
        icon: "graduation",
      },
    ],
  },
  {
    id: "doctorate",
    name: "Doctorate/Ph.D.",
    tag: "Get Dr. Title (After UG + Work Ex)",
    courses: [
      {
        id: "online-dba",
        name: "Online DBA (Doctor of Business)",
        badge: "Get Dr. Title ⚡",
        specs: "14+ Specializations",
        unis: 21,
        slug: "executive-mba",
        icon: "award",
      },
      {
        id: "executive-phd",
        name: "Executive Ph.D. / Fellow Programme",
        badge: "Research ⚡",
        specs: "8+ Specializations",
        unis: 11,
        slug: "executive-mba",
        icon: "book",
      },
      {
        id: "global-doctorate",
        name: "Global Doctorate in Management",
        badge: "WES Recognized ⚡",
        specs: "6+ Specializations",
        unis: 9,
        slug: "executive-mba",
        icon: "globe",
      },
    ],
  },
  {
    id: "ai",
    name: "Gen AI/Agentic AI",
    tag: "Future Proof Career",
    courses: [
      {
        id: "executive-mtech-ai",
        name: "Executive M.Tech in AI & ML",
        badge: "Future Proof ⚡",
        specs: "10+ Specializations",
        unis: 26,
        slug: "online-msc-in-data-science",
        icon: "cpu",
      },
      {
        id: "pgd-genai-mlops",
        name: "PG Diploma in Generative AI & MLOps",
        badge: "Trending ⚡",
        specs: "7+ Specializations",
        unis: 19,
        slug: "online-mca",
        icon: "cpu",
      },
      {
        id: "data-science-agentic-ai",
        name: "Data Science & Agentic AI Track",
        badge: "High CTC ⚡",
        specs: "15+ Specializations",
        unis: 38,
        slug: "online-msc-in-data-science",
        icon: "chart",
      },
    ],
  },
  {
    id: "ug",
    name: "UG Courses",
    tag: "After 12th",
    courses: [
      {
        id: "online-bba",
        name: "Online BBA",
        badge: "High Demand ⚡",
        specs: "18+ Specializations",
        unis: 68,
        slug: "online-bba",
        icon: "briefcase",
      },
      {
        id: "online-bca",
        name: "Online BCA",
        badge: "Tech Starter ⚡",
        specs: "16+ Specializations",
        unis: 54,
        slug: "online-bca",
        icon: "laptop",
      },
      {
        id: "online-bcom",
        name: "Online B.Com",
        badge: null,
        specs: "12+ Specializations",
        unis: 62,
        slug: "online-bcom",
        icon: "currency",
      },
      {
        id: "online-ba",
        name: "Online BA",
        badge: null,
        specs: "22+ Specializations",
        unis: 41,
        slug: "online-ba",
        icon: "book",
      },
      {
        id: "online-bsc",
        name: "Online B.Sc",
        badge: null,
        specs: "14+ Specializations",
        unis: 33,
        slug: "online-bsc",
        icon: "chart",
      },
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    tag: "Flexi Timing",
    courses: [
      {
        id: "btech-wilp",
        name: "B.Tech (Work Integrated Learning)",
        badge: "Flexi Timing ⚡",
        specs: "8+ Specializations",
        unis: 14,
        slug: "courses?search=tech",
        icon: "cpu",
      },
      {
        id: "mtech-flexi",
        name: "M.Tech (Flexible Evening & Weekend)",
        badge: "For Engineers ⚡",
        specs: "11+ Specializations",
        unis: 17,
        slug: "courses?search=tech",
        icon: "cpu",
      },
    ],
  },
  {
    id: "abroad",
    name: "Study Abroad",
    tag: "Global Accreditations",
    courses: [
      {
        id: "global-online-mba",
        name: "Global Online MBA (US/UK)",
        badge: "Dual Degree ⚡",
        specs: "15+ Specializations",
        unis: 28,
        slug: "online-mba",
        icon: "globe",
      },
      {
        id: "international-ms-cs",
        name: "International MS in Computer Science",
        badge: "STEM Eligible ⚡",
        specs: "8+ Specializations",
        unis: 16,
        slug: "online-mca",
        icon: "laptop",
      },
      {
        id: "global-pathway-degrees",
        name: "Global Pathway / Credit Transfer Degrees",
        badge: "Save 70% Fees ⚡",
        specs: "12+ Specializations",
        unis: 22,
        slug: "courses?search=international",
        icon: "award",
      },
    ],
  },
];

function CourseIcon({ icon }) {
  switch (icon) {
    case "globe":
      return <Globe className="w-5 h-5 text-[#115eaf]" />;
    case "briefcase":
      return <Briefcase className="w-5 h-5 text-[#115eaf]" />;
    case "laptop":
      return <Laptop className="w-5 h-5 text-[#115eaf]" />;
    case "chart":
      return <BarChart3 className="w-5 h-5 text-[#115eaf]" />;
    case "cpu":
      return <Cpu className="w-5 h-5 text-[#115eaf]" />;
    case "book":
      return <BookOpen className="w-5 h-5 text-[#115eaf]" />;
    case "currency":
      return <CreditCard className="w-5 h-5 text-[#115eaf]" />;
    case "award":
      return <Award className="w-5 h-5 text-[#115eaf]" />;
    default:
      return <GraduationCap className="w-5 h-5 text-[#115eaf]" />;
  }
}

export function DegreeExplorerModal({ isOpen, onClose }) {
  const [activeDomainId, setActiveDomainId] = useState("pg");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset search when opening
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setActiveDomainId("pg");
    }
  }, [isOpen]);

  const activeDomain = useMemo(() => {
    return (
      DEGREE_DOMAINS.find((d) => d.id === activeDomainId) || DEGREE_DOMAINS[0]
    );
  }, [activeDomainId]);

  // Filtered courses based on search query
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const matched = [];
    DEGREE_DOMAINS.forEach((domain) => {
      domain.courses.forEach((c) => {
        if (
          c.name.toLowerCase().includes(q) ||
          c.specs.toLowerCase().includes(q) ||
          domain.name.toLowerCase().includes(q)
        ) {
          matched.push({ ...c, domainName: domain.name });
        }
      });
    });
    return matched;
  }, [searchQuery]);

  const displayedCourses = searchResults || activeDomain.courses;

  const handleCourseClick = (slug) => {
    onClose();
    if (slug.startsWith("courses")) {
      navigate(`/${slug}`);
    } else {
      navigate(`/courses/${slug}`);
    }
  };

  const handleDomainSelect = (id) => {
    setActiveDomainId(id);
    setSearchQuery("");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="degree-explorer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-[1360px] h-[92vh] max-h-[820px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-4 sm:p-5 md:p-6 overflow-hidden animate-scaleIn">
        {/* Top Header Row matching Reference Layout */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shrink-0 pb-2.5 md:pb-3">
          {/* Left Title: Aligned with domain sidebar */}
          <div className="w-full md:w-[230px] lg:w-[240px] shrink-0 flex items-center justify-between">
            <h2
              id="degree-explorer-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#115eaf]"
            >
              Browse by domains
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Close Degree Explorer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Right Search Input & Desktop Close Button */}
          <div className="flex items-center gap-3 flex-1 md:pl-2">
            <div className="relative w-full">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses and specializations ..."
                className="w-full h-10 sm:h-10.5 pl-11 pr-10 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-[#000f22] placeholder:text-slate-400 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all shadow-2xs"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="hidden md:inline-flex items-center justify-center w-10 h-10 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0 ml-1"
              aria-label="Close Degree Explorer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Left Domains Sidebar + Right Cards Area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0 pt-1 md:pt-2 gap-4 md:gap-6">
          {/* Left Sidebar: Domains (Clean spacing, all 7 categories fit cleanly) */}
          <div className="w-full md:w-[230px] lg:w-[240px] shrink-0 overflow-x-auto md:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1">
            <nav
              className="flex md:flex-col gap-1 md:gap-1.5"
              aria-label="Degree domains"
            >
              {DEGREE_DOMAINS.map((domain) => {
                const isActive = activeDomainId === domain.id && !searchQuery;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => handleDomainSelect(domain.id)}
                    className={`whitespace-nowrap md:whitespace-normal text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#115eaf] text-white rounded-xl p-2.5 sm:px-3 sm:py-2.5 shadow-xs"
                        : "bg-transparent text-[#334155] hover:text-[#115eaf] p-2 sm:px-3 sm:py-2 rounded-xl"
                    }`}
                  >
                    <div className="text-xs sm:text-[13px] font-bold leading-tight">
                      {domain.name}
                    </div>
                    {domain.tag && (
                      <span
                        className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-white text-[#115eaf]"
                            : "bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]/60"
                        }`}
                      >
                        {domain.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Scrollable Content: Course Cards Grid */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pr-1 sm:pr-2 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {/* Search result indicator only when searching */}
            {searchResults && (
              <div className="mb-2.5">
                <h3 className="text-sm font-bold text-[#000f22]">
                  Search Results for &quot;{searchQuery}&quot; ({searchResults.length})
                </h3>
              </div>
            )}

            {/* Cards Grid matching College Vidya layout */}
            {displayedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 pb-4">
                {displayedCourses.map((c) => (
                  <div
                    key={c.id + c.name}
                    onClick={() => handleCourseClick(c.slug)}
                    className="group bg-white rounded-xl border border-slate-200 hover:border-[#115eaf] hover:shadow-md transition-all duration-200 p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer relative min-h-[175px] sm:min-h-[182px]"
                  >
                    <div>
                      {/* Top Row: Icon on left + Mint/Green Badge on right */}
                      <div className="flex items-center justify-between min-h-[28px]">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f0f6ff] flex items-center justify-center shrink-0 text-[#115eaf]">
                          <CourseIcon icon={c.icon} />
                        </div>
                        {c.badge ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6f7f0] text-[#0f9d6b] border border-[#a7f3d0]/60">
                            {c.badge}
                          </span>
                        ) : (
                          <div className="w-1" />
                        )}
                      </div>

                      {/* Course Title */}
                      <h4 className="text-[13.5px] sm:text-[14px] font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors mt-2 sm:mt-2.5 line-clamp-1 leading-snug">
                        {c.name}
                      </h4>

                      {/* Specializations Tag */}
                      <div className="mt-1.5 sm:mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]/70">
                          {c.specs}
                        </span>
                      </div>

                      {/* University comparison row */}
                      <div className="mt-2 sm:mt-2.5 flex items-start gap-1.5 text-[11px] sm:text-[11.5px] text-[#334155]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf] shrink-0 mt-1" />
                        <div className="leading-tight">
                          <span>Compare <strong className="font-bold text-[#000f22]">{c.unis}</strong></span>
                          <span className="block text-[#64748b]">Universities</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Link: Clean, no divider line */}
                    <div className="mt-2 sm:mt-2.5 pt-1 flex items-center justify-between text-[11.5px] sm:text-xs font-semibold text-[#115eaf] group-hover:text-[#084a8c]">
                      <span>View specializations</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-2">
                <Search className="w-8 h-8 text-[#115eaf]/40 mb-1" />
                <h4 className="text-sm font-bold text-[#000f22]">No matching courses found</h4>
                <p className="text-xs text-[#555960] max-w-xs">
                  We couldn&apos;t find any programs matching &quot;{searchQuery}&quot;. Try searching for &quot;MBA&quot;, &quot;MCA&quot;, or &quot;Data Science&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 px-3.5 py-1.5 text-xs font-semibold text-[#115eaf] bg-[#eef4ff] hover:bg-[#d5e3ff] rounded-lg transition-colors cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DegreeExplorerModal;
