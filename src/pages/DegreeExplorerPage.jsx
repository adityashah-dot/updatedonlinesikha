import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEO } from "../components/SEO";
import {
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
  CheckCircle,
  ShieldCheck,
  Sparkles,
  X,
  ChevronRight,
  PhoneCall,
  Headphones,
  Compass
} from "lucide-react";

export const DEGREE_DOMAINS = [
  {
    id: "pg",
    name: "PG Courses",
    tag: "After Graduation",
    description: "Verified UGC-entitled master's degrees with industry specializations & flexible online delivery.",
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
    description: "Rigorous executive diplomas and leadership tracks designed specifically for mid to senior professionals.",
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
    description: "Doctor of Business Administration and practitioner doctorates with global academic recognition.",
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
    description: "Cutting-edge programs in generative AI, agentic systems, MLOps and advanced data science.",
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
    description: "UGC-entitled 3-year bachelor's degrees built for flexible online study with 0% interest EMI options.",
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
    description: "Work integrated learning programs (WILP) and flexible timing engineering courses for working technicians.",
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
    description: "International dual-degrees and credit transfer programs from US, UK & European accredited universities.",
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

export default function DegreeExplorerPage({ onOpenCounseling, onOpenHelpDesk }) {
  const [activeDomainId, setActiveDomainId] = useState("pg");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeDomain = useMemo(() => {
    return DEGREE_DOMAINS.find((d) => d.id === activeDomainId) || DEGREE_DOMAINS[0];
  }, [activeDomainId]);

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
    if (slug.startsWith("courses")) {
      navigate(`/${slug}`);
    } else {
      navigate(`/courses/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#000f22] pb-16">
      <SEO
        title="Browse by Domains - Explore Online Degrees | Online Siksha"
        description="Explore 100+ UGC-entitled online degree programs across PG, UG, Executive, Doctorate, AI and Engineering domains. Compare verified universities, specializations and tuition fees."
      />

      {/* Top Header & Search Hero */}
      <section className="bg-white border-b border-slate-200/80 pt-8 pb-10 shadow-2xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/" className="hover:text-[#115eaf] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#115eaf]">Browse by Domains</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef4ff] text-[#115eaf] text-xs font-semibold mb-3 border border-[#d5e3ff]">
                <Compass className="w-3.5 h-3.5" />
                <span>Degree Explorer &amp; Specialization Matrix</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#000f22]">
                Browse by domains
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Find the right online degree program tailored to your professional goals. Compare verified UGC-entitled universities, specializations, and fee structures.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, e.g. MBA, MCA, AI..."
                  className="w-full h-12 pl-11 pr-10 rounded-2xl border border-slate-200 bg-[#f8fafc] text-sm text-[#000f22] placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11.5px] text-slate-500 overflow-x-auto whitespace-nowrap pb-0.5">
                <span className="font-semibold text-slate-600">Quick:</span>
                {["MBA", "MCA", "BBA", "Data Science", "EMBA"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-[#115eaf] hover:text-[#115eaf] transition-colors cursor-pointer text-slate-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body: Left Domains Sidebar + Right Cards Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Sidebar: Domains Navigation */}
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs lg:sticky lg:top-24">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
                Domain Categories
              </h2>

              <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 [scrollbar-width:none]">
                {DEGREE_DOMAINS.map((domain) => {
                  const isActive = activeDomainId === domain.id && !searchQuery;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => {
                        setActiveDomainId(domain.id);
                        setSearchQuery("");
                      }}
                      className={`whitespace-nowrap lg:whitespace-normal text-left transition-all duration-150 cursor-pointer flex-shrink-0 lg:flex-shrink w-auto lg:w-full ${
                        isActive
                          ? "bg-[#115eaf] text-white rounded-xl p-3 shadow-xs"
                          : "bg-transparent text-[#334155] hover:bg-[#eef4ff]/70 hover:text-[#115eaf] p-3 rounded-xl"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-[13.5px] font-bold leading-tight">
                          {domain.name}
                        </span>
                        <span
                          className={`hidden lg:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            isActive ? "bg-white/20 text-white" : "text-slate-400"
                          }`}
                        >
                          {domain.courses.length}
                        </span>
                      </div>
                      {domain.tag && (
                        <span
                          className={`inline-block mt-1.5 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
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

              {/* Free Counseling Helper Box */}
              <div className="hidden lg:block mt-6 p-4 rounded-xl bg-gradient-to-br from-[#000f22] to-[#115eaf] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Headphones className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Free Advisory
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Need help choosing the right domain?
                </h3>
                <p className="text-[11.5px] text-slate-200 mt-1 leading-relaxed">
                  Our academic advisors provide 100% unbiased, UGC-entitled university counseling.
                </p>
                <button
                  type="button"
                  onClick={onOpenCounseling}
                  className="mt-3 w-full py-2 px-3 rounded-lg bg-white text-[#115eaf] hover:bg-blue-50 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Talk to Counselor</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Content: Course Cards Grid */}
          <main className="lg:col-span-9 xl:col-span-9">
            {/* Domain Header or Search Header */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 mb-6 shadow-2xs">
              {searchResults ? (
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#000f22]">
                      Search Results for &quot;{searchQuery}&quot;
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Showing {searchResults.length} matching degree programs across all domains
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-semibold text-[#115eaf] hover:underline cursor-pointer"
                  >
                    Clear search &amp; show all
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-[#000f22]">
                        {activeDomain.name}
                      </h2>
                      <span className="text-xs font-semibold text-[#115eaf] bg-[#eef4ff] px-2.5 py-0.5 rounded-full border border-[#d5e3ff]">
                        {activeDomain.courses.length} Programs
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {activeDomain.description}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 shrink-0">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      UGC Entitled
                    </span>
                    <span className="flex items-center gap-1 text-[#115eaf] font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      NAAC Accredited
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Course Cards Grid */}
            {displayedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {displayedCourses.map((c) => (
                  <div
                    key={c.id + c.name}
                    onClick={() => handleCourseClick(c.slug)}
                    className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#115eaf] hover:shadow-lg transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative min-h-[195px]"
                  >
                    <div>
                      {/* Top Row: Icon on left + Mint/Green Badge on right */}
                      <div className="flex items-center justify-between min-h-[32px]">
                        <div className="w-8 h-8 rounded-xl bg-[#f0f6ff] flex items-center justify-center shrink-0 text-[#115eaf]">
                          <CourseIcon icon={c.icon} />
                        </div>
                        {c.badge ? (
                          <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#e6f7f0] text-[#0f9d6b] border border-[#a7f3d0]/60">
                            {c.badge}
                          </span>
                        ) : (
                          <div className="w-1" />
                        )}
                      </div>

                      {/* Course Title */}
                      <h3 className="text-sm sm:text-[14.5px] font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors mt-3.5 line-clamp-1 leading-snug">
                        {c.name}
                      </h3>

                      {/* Specializations Tag */}
                      <div className="mt-2.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]/70">
                          {c.specs}
                        </span>
                      </div>

                      {/* University comparison row: 2 lines with dot */}
                      <div className="mt-3 flex items-start gap-1.5 text-xs text-[#334155]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf] shrink-0 mt-1" />
                        <div className="leading-tight">
                          <span>
                            Compare <strong className="font-bold text-[#000f22]">{c.unis}</strong>
                          </span>
                          <span className="block text-[#64748b]">Universities</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#115eaf] group-hover:text-[#084a8c]">
                      <span>View specializations</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center gap-3">
                <Search className="w-10 h-10 text-[#115eaf]/40 mb-1" />
                <h3 className="text-base font-bold text-[#000f22]">
                  No matching courses found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
                  We couldn&apos;t find any programs matching &quot;{searchQuery}&quot;. Try searching for &quot;MBA&quot;, &quot;MCA&quot;, or &quot;Data Science&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 px-4 py-2 text-xs font-bold text-[#115eaf] bg-[#eef4ff] hover:bg-[#d5e3ff] rounded-xl transition-colors cursor-pointer"
                >
                  Clear search &amp; view all domains
                </button>
              </div>
            )}

            {/* Bottom Advisory Trust Section */}
            <div className="mt-10 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#115eaf] bg-[#eef4ff] px-3 py-1 rounded-full mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>OnlineSiksha Assured Comparison</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#000f22]">
                    Still deciding between programs or universities?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                    Get 100% free personalized counseling, detailed semester syllabus breakdowns, fee lock guarantees, and placement track record insights.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenCounseling}
                  className="px-6 py-3 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Free Counseling</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
