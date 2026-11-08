import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExamsListing } from "../services/examApi";
import usePageMeta from "../hooks/usePageMeta";
import "../components/course-content.css";
import {
  AlertCircle,
  BookOpen,
  RefreshCw,
  Search,
  ArrowRight,
  Clock,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle,
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
    <article className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Compact Image Container */}
        <div className="relative h-32 sm:h-36 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#e7eeff]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={(exam.logo && exam.logo.alt) || `${name} logo`}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-contain object-center p-3.5 sm:p-4 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-[#115eaf]">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#d5e3ff] flex items-center justify-center shadow-2xs mb-1">
                <span className="text-sm font-bold tracking-wider text-[#115eaf] uppercase">
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
      <div className="p-3.5 sm:p-4 pt-0">
        {(dateStr || rangeText) ? (
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-[#74777e] mb-2.5 pb-2.5 border-b border-[#f0f4f8]">
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
    <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Exams pagination">
      <button
        type="button"
        className="h-9 px-4 rounded-xl border border-[#d5e3ff] text-[#115eaf] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0f4f8] transition-colors"
        disabled={currentPage <= 1}
        onClick={() => onPage(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={"h-9 min-w-[36px] px-2 rounded-xl text-xs font-semibold transition-colors " + (p === currentPage ? "bg-[#115eaf] text-white" : "border border-[#d5e3ff] text-[#115eaf] hover:bg-[#f0f4f8]")}
          aria-current={p === currentPage ? "page" : undefined}
          onClick={() => onPage(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="h-9 px-4 rounded-xl border border-[#d5e3ff] text-[#115eaf] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0f4f8] transition-colors"
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
    <main className="section">
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-3.5 flex items-center gap-1.5 text-xs text-[#74777e]">
          <Link to="/" className="hover:text-[#115eaf] transition-colors">Home</Link>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-[#000f22] font-semibold">Exams</span>
        </nav>

        <div className="mt-2 mb-6">
          <h1 className="course-listing-h1 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000f22] tracking-tight">
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
            <h1 className="text-base sm:text-lg font-bold text-[#000f22]">We could not load the exams right now.</h1>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">The exam service is temporarily unavailable. Please try again.</p>
            <button type="button" onClick={() => setRetryKey((k) => k + 1)} className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && (
          <>
            <section aria-label="Exam filters" className="mb-6 rounded-xl border border-[#e7eeff] bg-white p-3 sm:p-4">
              <form
                className="flex flex-col sm:flex-row sm:items-end gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
              >
                <div className="flex-1 min-w-0">
                  <label htmlFor="exam-search" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#74777e] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="exam-search"
                      type="search"
                      value={search}
                      onChange={(e) => handleFiltersChange(setSearch)(e.target.value)}
                      placeholder="Search exams..."
                      className="w-full h-10 rounded-xl border border-[#d5e3ff] bg-[#f9f9ff] pl-9 pr-3 text-xs sm:text-sm text-[#000f22] placeholder:text-[#74777e] outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#e7eeff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="exam-category" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5">Category</label>
                    <select
                      id="exam-category"
                      value={category}
                      onChange={(e) => handleFiltersChange(setCategory)(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#e7eeff]"
                    >
                      <option value="">All categories</option>
                      {categoryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exam-level" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5">Level</label>
                    <select
                      id="exam-level"
                      value={level}
                      onChange={(e) => handleFiltersChange(setLevel)(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#e7eeff]"
                    >
                      <option value="">All levels</option>
                      {levelOptions.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exam-stream" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5">Stream</label>
                    <select
                      id="exam-stream"
                      value={stream}
                      onChange={(e) => handleFiltersChange(setStream)(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#e7eeff]"
                    >
                      <option value="">All streams</option>
                      {streamOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:w-44">
                  <label htmlFor="exam-sort" className="block text-[11px] font-bold text-[#43474d] uppercase tracking-wider mb-1.5">Sort by</label>
                  <select
                    id="exam-sort"
                    value={sort}
                    onChange={(e) => handleFiltersChange(setSort)(e.target.value)}
                    className="w-full h-10 rounded-xl border border-[#d5e3ff] bg-white text-xs sm:text-sm text-[#000f22] px-3 outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#e7eeff]"
                  >
                    {sortOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </form>
            </section>

            {exams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {exams.map((exam) => (
                  <ExamCard key={exam.slug} exam={exam} />
                ))}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-3">
                <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
                <h1 className="text-base sm:text-lg font-bold text-[#000f22]">No exams found.</h1>
                <p className="text-xs sm:text-sm text-[#43474d] max-w-md">We could not find exams matching your filters right now.</p>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
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

            {state.status === "ready" && exams.length > 0 && (
              <Pagination pagination={pagination} page={page} onPage={setPage} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
