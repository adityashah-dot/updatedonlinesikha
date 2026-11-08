import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCoursesListing } from "../services/courseApi";
import { formatCourseLevelLabel, formatFeeDisplay } from "../services/apiAdapter";
import usePageMeta from "../hooks/usePageMeta";
import CoursesPromoBanner from "../components/CoursesPromoBanner";
import "../components/course-content.css";
import {
  Search,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  CheckCircle,
  Clock,
  Layers
} from "lucide-react";

const LEVEL_TABS = [
  { label: "All Courses", value: "" },
  { label: "Master's (PG)", value: "pg" },
  { label: "Bachelor's (UG)", value: "ug" },
  { label: "Executive / Certificates", value: "diploma" },
];

const TRUST_METRICS = [
  { label: "UGC-DEB Entitled", icon: ShieldCheck },
  { label: "NAAC A++ Recognised", icon: CheckCircle },
  { label: "100% Online Delivery", icon: BookOpen },
  { label: "Zero-Cost EMI Guidance", icon: Layers },
];

function CourseCard({ course, feeText }) {
  const [imgFailed, setImgFailed] = useState(false);
  const slug = course.id;
  const imageSource = (!imgFailed && (course.images?.primary || course.images?.logo || course.images?.hero)) || "";
  const isBanner = Boolean(course.images?.isBanner);
  const displayLevel = course.displayLevel || formatCourseLevelLabel(course.rawLevels || course.level, course.name);

  return (
    <article className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Compact Image Container */}
        <div className="relative h-32 sm:h-36 overflow-hidden bg-gradient-to-br from-[#f0f4f8] via-[#eef4ff] to-[#e7eeff]">
          {imageSource ? (
            <img
              src={imageSource}
              alt={course.images?.alt || course.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className={`w-full h-full ${
                isBanner ? "object-cover object-center group-hover:scale-105" : "object-contain object-center p-4"
              } transition-transform duration-300`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-[#115eaf]">
              <div className="w-9 h-9 rounded-lg bg-white/90 border border-[#d5e3ff] flex items-center justify-center shadow-2xs mb-1">
                <BookOpen className="w-4.5 h-4.5 text-[#115eaf]" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-bold text-[#555960] tracking-wider uppercase">{displayLevel}</span>
            </div>
          )}

          {/* Top category / level pill */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#115eaf] border border-[#d5e3ff] shadow-2xs backdrop-blur-xs">
              {displayLevel}
            </span>
          </div>

          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#000f22]/75 text-white backdrop-blur-xs">
              100% Online
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4">
          <h2 className="text-sm sm:text-[15px] font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-2 leading-snug">
            <Link to={"/courses/" + slug}>{course.name}</Link>
          </h2>
          {course.shortDescription ? (
            <p className="text-xs text-[#555960] line-clamp-2 mt-1 leading-relaxed">
              {course.shortDescription}
            </p>
          ) : null}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3.5 sm:p-4 pt-0">
        {(course.duration || course.semestersCount > 0) ? (
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-[#74777e] mb-2 pb-2 border-b border-[#f0f4f8]">
            {course.duration ? (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                <span>{course.duration}</span>
              </span>
            ) : null}
            {course.semestersCount > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                <span>{course.semestersCount} Semesters</span>
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-2.5">
          <div className="min-w-0">
            <span className="text-[10px] text-[#74777e] block uppercase tracking-wider font-medium">Fee Structure</span>
            <span className="text-xs font-bold text-[#115eaf] block truncate">
              {feeText(course) || "Flexible EMI"}
            </span>
          </div>

          <Link
            to={"/courses/" + slug}
            className="h-8 px-3 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs transition-colors shrink-0"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Courses({ onOpenCounseling }) {
  usePageMeta({
    title: "Online Courses & Online MBA | OnlineSiksha",
    description: "Explore accredited online courses with verified fees, duration, curriculum and university comparisons.",
    noindex: false,
  });

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ status: "loading", courses: [], total: 0, totalPages: 1 });
  const [featuredImgFailed, setFeaturedImgFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDebounced(query.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    setData((prev) => ({ ...prev, status: "loading" }));
    setFeaturedImgFailed(false);

    getCoursesListing({
      page: 1,
      limit: 60,
      search: debounced,
      levels: "",
    })
      .then((result) => {
        if (cancelled) return;
        let list = Array.isArray(result.courses) ? [...result.courses] : [];
        if (selectedLevel) {
          list = list.filter((c) => {
            const dl = String(c.displayLevel || formatCourseLevelLabel(c.rawLevels || c.level, c.name)).toLowerCase();
            if (selectedLevel === "pg") return dl.includes("pg");
            if (selectedLevel === "ug") return dl.includes("ug");
            if (selectedLevel === "diploma") return dl.includes("certificate") || dl.includes("diploma") || dl.includes("doctoral");
            return true;
          });
        }
        // Prioritize courses with genuine CMS images so top rows always showcase visual banners/logos
        list.sort((a, b) => {
          const aHasImg = Boolean(a?.images?.primary || a?.images?.logo || a?.images?.hero) ? 1 : 0;
          const bHasImg = Boolean(b?.images?.primary || b?.images?.logo || b?.images?.hero) ? 1 : 0;
          return bHasImg - aHasImg;
        });

        const totalFiltered = list.length;
        const totalPagesFiltered = Math.max(1, Math.ceil(totalFiltered / 9));
        const start = (page - 1) * 9;
        setData({
          status: "ready",
          courses: list.slice(start, start + 9),
          total: totalFiltered,
          totalPages: totalPagesFiltered,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setData({ status: "error", courses: [], total: 0, totalPages: 1 });
      });

    return () => {
      cancelled = true;
    };
  }, [page, debounced, selectedLevel, retryKey]);

  const pageNumbers = useMemo(() => {
    const total = data.totalPages;
    const current = page;
    const out = [];
    const max = Math.min(total, 10);
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + max - 1);
    start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) out.push(i);
    return out;
  }, [data.totalPages, page]);

  const totalLabel = useMemo(() => {
    if (data.status !== "ready") return "";
    return debounced ? data.total + " matches for \"" + debounced + "\"" : data.total + " courses";
  }, [data.status, data.total, debounced]);

  const featured = useMemo(() => {
    if (data.status !== "ready" || !Array.isArray(data.courses) || data.courses.length === 0) return null;
    const withImage = data.courses.find((c) => c && (c.images?.primary || c.images?.logo || c.images?.hero));
    return withImage || data.courses[0];
  }, [data]);

  const feeText = (course) => {
    if (!course) return "";
    if (course.feeDisplay) return course.feeDisplay;
    if (course.totalFee === null || course.totalFee === undefined || course.totalFee === "") return "";
    const n = Number(course.totalFee);
    if (!Number.isFinite(n) || n <= 0) return "";
    return formatFeeDisplay(n, n);
  };

  const featuredImage = (!featuredImgFailed && featured && (featured.images?.primary || featured.images?.logo || featured.images?.hero)) || "";
  const featuredIsBanner = Boolean(featured?.images?.isBanner);
  const featuredLevel = featured
    ? (featured.displayLevel || formatCourseLevelLabel(featured.rawLevels || featured.level, featured.name))
    : "Online";

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white min-h-screen py-4 sm:py-6">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-xs text-[#74777e]">
          <Link to="/" className="hover:text-[#115eaf] transition-colors">Home</Link>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-[#000f22] font-semibold">Courses</span>
        </nav>

        {/* Hero Section */}
        <section className="rounded-2xl border border-[#e7eeff] bg-gradient-to-br from-[#f8fbff] via-white to-[#f0f5ff] p-4 sm:p-6 lg:p-7 mb-5">
          <div className="grid lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            <div className="lg:col-span-7 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff] mb-2.5">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Online Courses Directory</span>
              </div>
              <h1 className="course-listing-h1 text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#000f22] tracking-tight leading-[1.1] mb-2">
                Explore Accredited Online Courses
              </h1>
              <p className="text-xs sm:text-sm text-[#555960] leading-relaxed max-w-lg mb-4">
                Compare recognized online degrees with verified fee structures, eligibility criteria, semester duration and university accreditations.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-xl">
                <label htmlFor="courses-search" className="relative block flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777e] pointer-events-none" aria-hidden="true" />
                  <input
                    id="courses-search"
                    type="search"
                    placeholder="Search courses (e.g. MBA, MCA, Data Science)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#c4c6ce] text-xs sm:text-sm text-[#000f22] bg-white placeholder:text-[#74777e] outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 transition-all"
                    aria-label="Search online courses"
                  />
                </label>
                {totalLabel ? (
                  <span className="text-xs text-[#43474d] font-medium whitespace-nowrap pl-1 sm:pl-0">
                    {totalLabel}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Featured Course Card */}
            <div className="lg:col-span-5 min-w-0">
              {data.status === "loading" ? (
                <div className="rounded-xl border border-[#e7eeff] bg-white overflow-hidden shadow-2xs">
                  <div className="h-36 sm:h-40 bg-[#f0f3ff] animate-pulse" />
                  <div className="p-3.5 space-y-2">
                    <div className="h-3 w-20 bg-[#f0f3ff] rounded animate-pulse" />
                    <div className="h-4 w-4/5 bg-[#f0f3ff] rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-[#f0f3ff] rounded animate-pulse" />
                  </div>
                </div>
              ) : featured ? (
                <div className="relative rounded-xl border border-[#e7eeff] bg-white overflow-hidden shadow-2xs hover:border-[#b1c8eb] transition-all">
                  <div className="relative h-36 sm:h-40 bg-gradient-to-br from-[#eff5ff] via-[#f0f4f8] to-[#e7eeff] overflow-hidden">
                    {featuredImage ? (
                      <img
                        src={featuredImage}
                        alt={featured.images?.alt || featured.name}
                        loading="eager"
                        onError={() => setFeaturedImgFailed(true)}
                        className={`w-full h-full ${
                          featuredIsBanner ? "object-cover object-center" : "object-contain object-center p-4"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-[#115eaf]">
                        <BookOpen className="w-7 h-7 text-[#115eaf] mb-1" aria-hidden="true" />
                        <span className="text-[11px] font-semibold text-[#555960]">{featuredLevel}</span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#115eaf] text-white shadow-2xs">
                      Featured Pick
                    </span>
                  </div>

                  <div className="p-3.5">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff]">
                      {featuredLevel}
                    </span>
                    <h2 className="mt-1.5 text-sm sm:text-[15px] font-bold text-[#000f22] leading-snug line-clamp-2">
                      <Link to={"/courses/" + featured.id} className="hover:text-[#115eaf] transition-colors">
                        {featured.name}
                      </Link>
                    </h2>
                    {featured.shortDescription ? (
                      <p className="mt-1 text-xs text-[#555960] leading-relaxed line-clamp-2">
                        {featured.shortDescription}
                      </p>
                    ) : null}
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#f0f4f8] gap-2">
                      <span className="text-xs font-bold text-[#115eaf] truncate">
                        {feeText(featured) || "Flexible EMI"}
                      </span>
                      <Link
                        to={"/courses/" + featured.id}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#115eaf] hover:underline shrink-0"
                      >
                        <span>Explore Course</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Trust & Approvals Bar - Responsive grid without fixed min-width overflow */}
        <section className="mb-5 py-2.5 px-3.5 sm:px-5 rounded-xl bg-[#f7f9fc] border border-[#e7eeff]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-[#43474d]">
            {TRUST_METRICS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-1.5 font-medium min-w-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#115eaf] shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Level & Category Filter Tabs */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#e7eeff] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#115eaf]" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#000f22]">
              {selectedLevel ? (LEVEL_TABS.find((t) => t.value === selectedLevel)?.label || "Filtered Courses") : "All Programmes"}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] pb-0.5">
            {LEVEL_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setSelectedLevel(tab.value);
                  setPage(1);
                }}
                className={`h-8 px-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedLevel === tab.value
                    ? "bg-[#115eaf] text-white font-semibold shadow-2xs"
                    : "bg-[#f0f4f8] text-[#43474d] hover:bg-[#e7eeff] hover:text-[#115eaf]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {data.status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[#e7eeff] overflow-hidden bg-white shadow-2xs">
                <div className="h-32 sm:h-36 bg-[#f0f3ff] animate-pulse" />
                <div className="p-3.5 space-y-2">
                  <div className="h-3.5 w-3/4 bg-[#f0f3ff] rounded animate-pulse" />
                  <div className="h-3 w-full bg-[#f0f3ff] rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#f0f3ff] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {data.status === "error" && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3" role="alert">
            <AlertCircle className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#000f22]">We could not load the courses right now.</h2>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">The course listing service is temporarily unavailable. Please try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {data.status === "ready" && data.courses.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#000f22]">No courses match your filter.</h2>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">Try clearing the search or choosing a different degree level.</p>
            {(debounced || selectedLevel) ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedLevel("");
                }}
                className="mt-2 px-4 h-9 rounded-xl border border-[#115eaf] text-[#115eaf] hover:bg-[#eff5ff] text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            ) : null}
          </div>
        )}

        {/* Course Grid */}
        {data.status === "ready" && data.courses.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.courses.map((course) => (
                <CourseCard key={course.id} course={course} feeText={feeText} />
              ))}
            </div>

            {/* Reusable Horizontal Counselling Banner */}
            <div className="my-6 sm:my-7">
              <CoursesPromoBanner
                heading="FREE 1-ON-1 ACADEMIC COUNSELLING"
                title="Need Help Deciding the Right Online Course?"
                message="Get free 1-on-1 counseling on eligibility, recognized universities, and monthly EMI options with our academic advisors."
                ctaLabel="Talk to an Advisor"
                onCtaClick={onOpenCounseling}
              />
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <nav className="mt-6 flex items-center justify-center gap-1.5 flex-wrap" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-[#c4c6ce] text-[#43474d] hover:border-[#115eaf] hover:text-[#115eaf] disabled:opacity-40 disabled:hover:border-[#c4c6ce] disabled:hover:text-[#43474d] disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {pageNumbers.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-label={"Page " + n}
                    aria-current={n === page ? "page" : undefined}
                    className={
                      n === page
                        ? "h-9 min-w-9 px-3 inline-flex items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-colors bg-[#115eaf] text-white border-[#115eaf]"
                        : "h-9 min-w-9 px-3 inline-flex items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-colors bg-white text-[#43474d] border-[#c4c6ce] hover:border-[#115eaf] hover:text-[#115eaf]"
                    }
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  aria-label="Next page"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-[#c4c6ce] text-[#43474d] hover:border-[#115eaf] hover:text-[#115eaf] disabled:opacity-40 disabled:hover:border-[#c4c6ce] disabled:hover:text-[#43474d] disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}
