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
        badge: "High ROI",
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
      return <Globe className="w-5 h-5 text-brand-600" />;
    case "briefcase":
      return <Briefcase className="w-5 h-5 text-brand-600" />;
    case "laptop":
      return <Laptop className="w-5 h-5 text-brand-600" />;
    case "chart":
      return <BarChart3 className="w-5 h-5 text-brand-600" />;
    case "cpu":
      return <Cpu className="w-5 h-5 text-brand-600" />;
    case "book":
      return <BookOpen className="w-5 h-5 text-brand-600" />;
    case "currency":
      return <CreditCard className="w-5 h-5 text-brand-600" />;
    case "award":
      return <Award className="w-5 h-5 text-brand-600" />;
    default:
      return <GraduationCap className="w-5 h-5 text-brand-600" />;
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
    <div className="min-h-screen bg-canvas text-ink-900 pb-16">
      <SEO
        title="Browse by Domains - Explore Online Degrees | Online Siksha"
        description="Explore 100+ UGC-entitled online degree programs across PG, UG, Executive, Doctorate, AI and Engineering domains. Compare verified universities, specializations and tuition fees."
      />

      {/* Top Header & Search Hero */}
      <section className="bg-white border-b border-slate-200/80 pt-8 pb-10 shadow-2xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-brand-600">Browse by Domains</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold mb-3 border border-brand-200">
                <Compass className="w-3.5 h-3.5" />
                <span>Degree Explorer &amp; Specialization Matrix</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink-900">
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
                  aria-label="Search courses, MBA, MCA, AI" placeholder="Search courses, e.g. MBA, MCA, AI..."
                  className="w-full h-12 pl-11 pr-10 rounded-2xl border border-slate-200 bg-canvas text-sm text-ink-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all shadow-2xs"
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
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-brand-600 hover:text-brand-600 transition-colors cursor-pointer text-slate-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Domain Category Selector (Full Width & Sticky) */}
      <div className="sticky top-16 z-20 bg-canvas/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-3 mb-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-brand-700 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-slate-200/90 shadow-2xs"
                  }`}
                >
                  <span>{domain.name}</span>
                  <span
                    className={`text-[10.5px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {domain.courses.length}
                  </span>
                  {domain.tag && (
                    <span
                      className={`hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive ? "bg-white text-brand-700" : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      {domain.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Full-Width Content Container */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Domain Description Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 mb-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {searchResults ? (
            <div className="flex items-center justify-between flex-wrap gap-2 w-full">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-ink-900">
                  Search Results for &quot;{searchQuery}&quot;
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {searchResults.length} matching degree programs across all domains
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-semibold text-brand-700 hover:underline cursor-pointer"
              >
                Clear search &amp; view all
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-ink-900">
                    {activeDomain.name}
                  </h2>
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-300">
                    {activeDomain.courses.length} Programs
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {activeDomain.description}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600 shrink-0 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>UGC-DEB Entitled</span>
                </span>
                <span className="flex items-center gap-1.5 text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-300">
                  <Sparkles className="w-3.5 h-3.5 text-brand-700" />
                  <span>NAAC Accredited</span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* Full-Width 4-Column Card Grid */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {displayedCourses.map((c) => (
              <div
                key={c.id + c.name}
                onClick={() => handleCourseClick(c.slug)}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-brand-700 hover:shadow-lg transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative min-h-[210px] shadow-2xs"
              >
                <div>
                  {/* Top: Icon + Optional Badge */}
                  <div className="flex items-center justify-between min-h-[32px] mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-300 flex items-center justify-center shrink-0 text-brand-700 group-hover:scale-105 transition-transform">
                      <CourseIcon icon={c.icon} />
                    </div>
                    {c.badge ? (
                      <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        {c.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Online Degree
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-[15px] sm:text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors line-clamp-1 leading-snug">
                    {c.name}
                  </h3>

                  {/* Specializations Tag */}
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/80">
                      {c.specs}
                    </span>
                  </div>

                  {/* University Comparison Stat */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-brand-700 shrink-0" />
                    <span>
                      Compare <strong className="font-bold text-ink-900">{c.unis}</strong> Universities
                    </span>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-700 group-hover:text-brand-800 transition-colors">
                  <span>Explore Universities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center gap-3">
            <Search className="w-10 h-10 text-brand-700/40 mb-1" />
            <h3 className="text-base font-bold text-ink-900">
              No matching courses found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              We couldn&apos;t find any programs matching &quot;{searchQuery}&quot;. Try searching for &quot;MBA&quot;, &quot;MCA&quot;, or &quot;Data Science&quot;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 px-4 py-2 text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 rounded-xl transition-colors cursor-pointer"
            >
              Clear search &amp; view all domains
            </button>
          </div>
        )}

        {/* Free Academic Counselling Helper Banner (Full Width) */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-ink-900 via-brand-800 to-ink-900 p-5 sm:p-7 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-2.5 backdrop-blur-xs">
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free, no obligation Mentorship</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">
              Confused between different online degree domains?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Speak directly with certified academic counselors for personalized university shortlisting, syllabus breakdowns, and scholarship eligibility.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCounseling}
            className="shrink-0 h-11 px-6 rounded-xl bg-white text-brand-800 hover:bg-brand-50 text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <PhoneCall className="w-4 h-4 text-brand-700" />
            <span>Talk to a Senior Counselor</span>
          </button>
        </div>
      </main>
    </div>
  );
}
