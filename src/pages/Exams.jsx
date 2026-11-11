import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExamsListing } from "../services/examApi";
import usePageMeta from "../hooks/usePageMeta";
import {
  AlertCircle,
  BookOpen,
  RefreshCw,
  Search,
  ArrowRight,
  Clock,
  Calendar,
} from "lucide-react";

const DEFAULT_SORT = "recommended-exams";

function asOptions(value) {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : Array.isArray(value.items) ? value.items : Array.isArray(value.options) ? value.options : [];
  const out = [];
  for (const v of arr) {
    const label = typeof v === "string" ? v : (v && (v.slug || v.name || v.title)) || "";
    const trimmed = String(label || "").trim();
    if (trimmed) out.push(trimmed);
  }
  return out;
}

function formatExamDate(d) {
  if (!d) return null;
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return null;
  }
}

function formatRange(registrationRange) {
  if (!registrationRange || typeof registrationRange !== "object") return null;
  const start = formatExamDate(registrationRange.start);
  const end = formatExamDate(registrationRange.end);
  if (start && end) return `${start} – ${end}`;
  return start || end || null;
}

function cleanTitle(str) {
  if (!str) return "";
  return String(str).replace(/[:\s]+$/, "").trim();
}

function getExamInitials(name) {
  const text = cleanTitle(name);
  const upperMatch = text.match(/\b[A-Z]{2,6}\b/);
  if (upperMatch) return upperMatch[0];
  const words = text.split(/[\s-]+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return text.slice(0, 3).toUpperCase();
}

function getExamContext(exam) {
  const title = (exam.title || "").toLowerCase();
  const slug = (exam.slug || "").toLowerCase();
  if (slug.includes("ips") || slug.includes("ias") || slug.includes("cse") || slug.includes("ifs") || title.includes("upsc")) {
    return "Civil Services";
  }
  if (slug.includes("board") || title.includes("board") || title.includes("class 12") || title.includes("class 10")) {
    return "Board Exam";
  }
  if (slug.includes("jee") || slug.includes("gate") || slug.includes("viteee") || title.includes("engineering")) {
    return "Engineering";
  }
  if (slug.includes("cat") || slug.includes("xat") || slug.includes("mat") || slug.includes("cmat") || title.includes("management")) {
    return "Management";
  }
  if (slug.includes("neet") || title.includes("medical")) {
    return "Medical";
  }
  if (slug.includes("clat") || slug.includes("ailet") || title.includes("law")) {
    return "Law";
  }
  return "National Level";
}

function ExamCard({ exam }) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = (!imgFailed && exam.logo && exam.logo.url) || "";
  const mode = exam.examMode || "Online";
  const dateStr = formatExamDate(exam.examDate);
  const rangeText = formatRange(exam.registrationRange);
  const detailHref = "/exams/" + exam.slug;
  const name = cleanTitle(exam.shortTitle || exam.title || exam.slug);
  const initials = getExamInitials(name);
  const contextTag = getExamContext(exam);

  return (
    <article className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden h-full">
      <div>
        {/* Compact Image Container */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#e7eeff]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={(exam.logo && exam.logo.alt) || `${name} logo`}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-contain object-center p-3.5 sm:p-4 transition-transform duration-300 group-hover:scale-103"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-[#115eaf]">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#d5e3ff] flex items-center justify-center shadow-2xs mb-1">
                <span className="text-xs font-bold tracking-wider text-[#115eaf] uppercase">
                  {initials}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#555960] tracking-wider uppercase mt-0.5">
                {contextTag}
              </span>
            </div>
          )}

          {/* Top category / mode pill */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#115eaf] border border-[#d5e3ff] shadow-2xs backdrop-blur-xs">
              {mode}
            </span>
          </div>

          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#000f22]/75 text-white backdrop-blur-xs">
              {contextTag}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4">
          <h2 className="text-sm sm:text-[15px] font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-2 leading-snug">
            <Link to={detailHref}>{name}</Link>
          </h2>
          {exam.fullForm ? (
            <p className="text-xs text-[#555960] line-clamp-2 mt-1 leading-relaxed">
              {exam.fullForm}
            </p>
          ) : (
            <p className="text-xs text-[#74777e] line-clamp-2 mt-1 leading-relaxed">
              Official schedule, eligibility benchmarks, test pattern, and cutoff guidance.
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3.5 sm:p-4 pt-0 mt-auto">
        {(dateStr || rangeText) ? (
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#74777e] mb-2.5 pb-2 border-b border-[#f0f4f8]">
            {dateStr ? (
              <span className="inline-flex items-center gap-1 text-[#43474d] font-medium">
                <Clock className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                <span>Exam: {dateStr}</span>
              </span>
            ) : null}
            {rangeText ? (
              <span className="inline-flex items-center gap-1 text-[#43474d] font-medium">
                <Calendar className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                <span>Reg: {rangeText}</span>
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-2.5">
          <div className="min-w-0">
            <span className="text-[10px] text-[#74777e] block uppercase tracking-wider font-medium">Exam Mode</span>
            <span className="text-xs font-bold text-[#115eaf] block truncate">
              {mode} Examination
            </span>
          </div>

          <Link
            to={detailHref}
            className="h-8 px-3 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs transition-colors shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Pagination({ pagination, page, onPage }) {
  const totalPages = Number(pagination && pagination.totalPages) > 0 ? Number(pagination.totalPages) : 1;
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8 mb-4 flex-wrap" aria-label="Exams pagination">
      <button
        type="button"
        className="h-9 px-3.5 rounded-lg border border-[#d5e3ff] text-[#115eaf] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0f4f8] transition-colors cursor-pointer"
        disabled={currentPage <= 1}
        onClick={() => onPage(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={
            "h-9 min-w-9 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer " +
            (p === currentPage ? "bg-[#115eaf] text-white border border-[#115eaf] shadow-xs" : "border border-[#d5e3ff] text-[#115eaf] hover:bg-[#f0f4f8]")
          }
          aria-current={p === currentPage ? "page" : undefined}
          onClick={() => onPage(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="h-9 px-3.5 rounded-lg border border-[#d5e3ff] text-[#115eaf] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0f4f8] transition-colors cursor-pointer"
        disabled={currentPage >= totalPages}
        onClick={() => onPage(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}

export default function Exams() {
  const [state, setState] = useState({ status: "loading", data: null });
  const [retryKey, setRetryKey] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [stream, setStream] = useState("");
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, status: "loading" }));
    getExamsListing({ search, category, level, stream, sort, page, limit: 10 })
      .then((res) => {
        if (cancelled) return;
        setState({
          status: "ready",
          data: { ...res, search, category, level, stream, sort, page },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ status: "error", data: null });
      });
    return () => {
      cancelled = true;
    };
  }, [search, category, level, stream, sort, page, retryKey]);

  usePageMeta({ title: "Exams | Online Siksha", description: "Exam guides and important dates." });

  const data = state.data;
  const exams = (data && data.exams) || [];
  const pagination = (data && data.pagination) || {};
  const filters = (data && data.filters) || {};

  const categoryOptions = asOptions(filters.categories || filters.examCategories);
  const levelOptions = asOptions(filters.levels || filters.levelsList);
  const streamOptions = asOptions(filters.streams || filters.streamList);
  const sortOptions = Array.isArray(filters.sorts) && filters.sorts.length > 0 ? asOptions(filters.sorts) : [DEFAULT_SORT];

  const handleFiltersChange = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white min-h-screen py-4 sm:py-6">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-2.5 flex items-center gap-1.5 text-xs text-[#74777e]">
          <Link to="/" className="hover:text-[#115eaf] transition-colors">Home</Link>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-[#000f22] font-semibold">Exams</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#000f22] tracking-tight leading-snug">
            National &amp; State Entrance Exams
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#555960] max-w-2xl leading-relaxed">
            Verified schedules, eligibility benchmarks, test patterns, and syllabus breakdowns for civil services, management, engineering, and school board exams.
          </p>
        </div>

        {state.status === "loading" && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3" role="status" aria-live="polite">
            <div className="h-9 w-9 rounded-full border-3 border-[#e7eeff] border-t-[#115eaf] animate-spin" />
            <p className="text-xs sm:text-sm text-[#555960]">Loading exams...</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="py-14 flex flex-col items-center justify-center text-center gap-3" role="alert">
            <AlertCircle className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#000f22]">We could not load the exams right now.</h2>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">The exam service is temporarily unavailable. Please try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-2 inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && (
          <>
            {/* Filter Controls Bar */}
            <section aria-label="Exam filters" className="mb-6 rounded-xl border border-[#d5e3ff] bg-[#fbfdff] p-3.5 sm:p-4.5 shadow-2xs">
              <form
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
              >
                {/* Search Field (appropriately wider) */}
                <div className="sm:col-span-2 lg:col-span-4 min-w-0">
                  <label htmlFor="exam-search" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5 truncate">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#74777e] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    <input
                      id="exam-search"
                      type="search"
                      value={search}
                      onChange={(e) => handleFiltersChange(setSearch)(e.target.value)}
                      placeholder="Search exams (e.g. UPSC, JEE, CAT)..."
                      className="w-full h-10 rounded-lg border border-[#d5e3ff] bg-white pl-9 pr-3 text-xs sm:text-sm text-[#000f22] placeholder:text-[#74777e] outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-2xs transition-colors"
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className="sm:col-span-1 lg:col-span-2 min-w-0">
                  <label htmlFor="exam-category" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5 truncate">
                    Category
                  </label>
                  <select
                    id="exam-category"
                    value={category}
                    onChange={(e) => handleFiltersChange(setCategory)(e.target.value)}
                    className="w-full h-10 rounded-lg border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-2xs transition-colors cursor-pointer truncate"
                  >
                    <option value="">All categories</option>
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Level Dropdown */}
                <div className="sm:col-span-1 lg:col-span-2 min-w-0">
                  <label htmlFor="exam-level" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5 truncate">
                    Level
                  </label>
                  <select
                    id="exam-level"
                    value={level}
                    onChange={(e) => handleFiltersChange(setLevel)(e.target.value)}
                    className="w-full h-10 rounded-lg border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-2xs transition-colors cursor-pointer truncate"
                  >
                    <option value="">All levels</option>
                    {levelOptions.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Stream Dropdown */}
                <div className="sm:col-span-1 lg:col-span-2 min-w-0">
                  <label htmlFor="exam-stream" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5 truncate">
                    Stream
                  </label>
                  <select
                    id="exam-stream"
                    value={stream}
                    onChange={(e) => handleFiltersChange(setStream)(e.target.value)}
                    className="w-full h-10 rounded-lg border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-2xs transition-colors cursor-pointer truncate"
                  >
                    <option value="">All streams</option>
                    {streamOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div className="sm:col-span-1 lg:col-span-2 min-w-0">
                  <label htmlFor="exam-sort" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5 truncate">
                    Sort by
                  </label>
                  <select
                    id="exam-sort"
                    value={sort}
                    onChange={(e) => handleFiltersChange(setSort)(e.target.value)}
                    className="w-full h-10 rounded-lg border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-2xs transition-colors cursor-pointer truncate"
                  >
                    {sortOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </form>
            </section>

            {/* Exam Cards Grid */}
            {exams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {exams.map((exam) => (
                  <div key={exam.slug} className="w-full col-span-1 flex flex-col">
                    <ExamCard exam={exam} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 flex flex-col items-center justify-center text-center gap-3">
                <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
                <h2 className="text-base sm:text-lg font-bold text-[#000f22]">No exams found.</h2>
                <p className="text-xs sm:text-sm text-[#43474d] max-w-md">We could not find exams matching your filters right now.</p>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setLevel("");
                    setStream("");
                    setSort(DEFAULT_SORT);
                    setPage(1);
                  }}
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {state.status === "ready" && exams.length > 0 && (
              <Pagination pagination={pagination} page={page} onPage={setPage} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
