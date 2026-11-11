import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogsList } from "../services/blogApi";
import usePageMeta from "../hooks/usePageMeta";
import { Clock, ArrowRight, BookOpen, Sparkles, Search, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";

export default function Blog({ onOpenCounseling }) {
  usePageMeta({
    title: "Higher Education Blogs & Online Degree Guides | OnlineSiksha",
    description: "Explore verified articles, UGC regulations, fee comparisons, and university admission insights written by higher education experts.",
    noindex: false,
  });

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ status: "loading", articles: [], total: 0, totalPages: 1 });

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

    getBlogsList({ page, limit: 9, search: debounced })
      .then((result) => {
        if (cancelled) return;
        setData({ status: "ready", articles: result.articles, total: result.total, totalPages: result.totalPages });
      })
      .catch(() => {
        if (cancelled) return;
        setData({ status: "error", articles: [], total: 0, totalPages: 1 });
      });

    return () => {
      cancelled = true;
    };
  }, [page, debounced, retryKey]);

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
    return debounced ? `${data.total} matches for "${debounced}"` : `${data.total} articles`;
  }, [data.status, data.total, debounced]);

  const featured = useMemo(() => {
    if (data.status !== "ready" || !Array.isArray(data.articles) || data.articles.length === 0) return null;
    const withImage = data.articles.find((b) => b && b.image);
    return withImage || data.articles[0];
  }, [data]);

  const topics = useMemo(() => {
    const seen = new Set();
    const out = [];
    const list = Array.isArray(data.articles) ? data.articles : [];
    for (const b of list) {
      const c = String((b && b.category) || "").trim();
      if (!c) continue;
      const k = c.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(c);
    }
    return out;
  }, [data.articles]);

  const isTopicActive = (c) => String(query || "").trim().toLowerCase() === String(c || "").trim().toLowerCase();

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white min-h-screen py-4 sm:py-5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-2.5 flex items-center gap-1.5 text-xs text-[#74777e]">
          <Link to="/" className="hover:text-[#115eaf] transition-colors">Home</Link>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-[#000f22] font-semibold">Blogs &amp; Guides</span>
        </nav>

        {/* Hero Section - Reduced Background Shade Opacity (98% pure white with ultra-subtle tint) */}
        <section className="rounded-xl border border-[#e7eeff] bg-gradient-to-br from-[#fafcff] via-white to-[#f7faff] p-4 sm:p-5 lg:p-6 mb-5 shadow-none">
          <div className="grid lg:grid-cols-12 gap-5 lg:gap-7 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e7eeff]/75 text-[#115eaf] border border-[#d5e3ff]/80 mb-2">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Research &amp; Guidance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#000f22] tracking-tight leading-snug mb-2">
                Education Insights. Better Decisions.
              </h1>
              <p className="text-xs sm:text-sm text-[#555960] leading-relaxed max-w-xl mb-3.5 sm:mb-4">
                Stay informed with verified guidance on UGC-DEB entitlements, curriculum deep dives, zero-cost EMI options, and career transitions across India&apos;s top universities.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-xl">
                <label htmlFor="blog-search" className="relative block flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777e] pointer-events-none" aria-hidden="true" />
                  <input
                    id="blog-search"
                    type="search"
                    placeholder="Search articles (e.g. online MBA, UGC-DEB, scholarships)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-9.5 pl-9 pr-3 rounded-lg border border-[#d5e3ff] text-xs sm:text-sm text-[#000f22] bg-white placeholder:text-[#74777e] outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-2xs transition-colors"
                    aria-label="Search articles"
                  />
                </label>
                {totalLabel ? (
                  <span className="text-[11px] sm:text-xs font-medium text-[#555960] whitespace-nowrap bg-white border border-[#e2e8f0] px-2.5 py-1.5 rounded-lg shadow-2xs self-start sm:self-center">
                    {totalLabel}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Right Content / Featured Article (Reduced size by 10-15%) */}
            <div className="lg:col-span-5">
              {data.status === "loading" ? (
                <div className="rounded-xl border border-[#e7eeff] bg-white overflow-hidden shadow-2xs">
                  <div className="h-32 sm:h-36 bg-[#f0f3ff] animate-pulse" />
                  <div className="p-3.5 space-y-2">
                    <div className="h-3 w-20 bg-[#f0f3ff] rounded animate-pulse" />
                    <div className="h-4 w-4/5 bg-[#f0f3ff] rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-[#f0f3ff] rounded animate-pulse" />
                  </div>
                </div>
              ) : featured ? (
                <div className="relative rounded-xl border border-[#e7eeff] bg-white overflow-hidden shadow-2xs group hover:border-[#b1c8eb] transition-all">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      className="w-full h-32 sm:h-36 object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-32 sm:h-36 bg-[#f0f3ff] flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-3 sm:p-3.5">
                    {featured.category ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff]">
                        {featured.category}
                      </span>
                    ) : null}
                    <h2 className="mt-1.5 text-xs sm:text-sm font-bold text-[#000f22] leading-snug line-clamp-2 group-hover:text-[#115eaf] transition-colors">
                      <Link to={"/blog/" + featured.slug}>{featured.title}</Link>
                    </h2>
                    {featured.excerpt ? (
                      <p className="mt-1 text-[11px] sm:text-xs text-[#555960] leading-relaxed line-clamp-2">
                        {featured.excerpt}
                      </p>
                    ) : null}
                    <Link
                      to={"/blog/" + featured.slug}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#115eaf] hover:underline"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Topics Filter Bar */}
        {topics.length > 0 ? (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2 items-center" role="group" aria-label="Filter by topic">
              <button
                type="button"
                onClick={() => setQuery("")}
                className={
                  !query.trim()
                    ? "h-7.5 px-3 rounded-lg border text-xs font-semibold transition-all bg-[#115eaf] text-white border-[#115eaf] shadow-xs cursor-pointer"
                    : "h-7.5 px-3 rounded-lg border text-xs font-semibold transition-all bg-white text-[#43474d] border-[#d5e3ff] hover:border-[#115eaf] hover:text-[#115eaf] hover:bg-[#f8fbff] cursor-pointer"
                }
              >
                All
              </button>
              {topics.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setQuery(c)}
                  className={
                    isTopicActive(c)
                      ? "h-7.5 px-3 rounded-lg border text-xs font-semibold transition-all bg-[#115eaf] text-white border-[#115eaf] shadow-xs cursor-pointer"
                      : "h-7.5 px-3 rounded-lg border text-xs font-semibold transition-all bg-white text-[#43474d] border-[#d5e3ff] hover:border-[#115eaf] hover:text-[#115eaf] hover:bg-[#f8fbff] cursor-pointer"
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Loading State */}
        {data.status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[#e7eeff] overflow-hidden bg-white shadow-2xs">
                <div className="h-36 sm:h-38 bg-[#f0f3ff] animate-pulse" />
                <div className="p-3.5 space-y-2">
                  <div className="h-3 w-16 bg-[#f0f3ff] rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-[#f0f3ff] rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-[#f0f3ff] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {data.status === "error" && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3" role="alert">
            <AlertCircle className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#000f22]">We couldn&apos;t load the articles right now.</h2>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">The listing service is unavailable. Please check your connection and try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-2 inline-flex items-center gap-2 px-4 h-9.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {data.status === "ready" && data.articles.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#000f22]">No articles match your search.</h2>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">Try a shorter or different search term.</p>
            {debounced ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-2 px-4 h-9.5 rounded-lg border border-[#115eaf] text-[#115eaf] hover:bg-[#eff5ff] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Clear search
              </button>
            ) : null}
          </div>
        )}

        {/* Article Cards Grid - Compact Dimensions & Slightly Reduced Image Height */}
        {data.status === "ready" && data.articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.articles.map((b) => {
                const slug = b.slug;
                const dateText = formatDate(b.date);
                return (
                  <article
                    key={slug}
                    className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-xs overflow-hidden transition-all duration-200 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Compact Image Container: h-36 on mobile, h-38 on desktop (aspect ~16:10) */}
                      <div className="relative h-36 sm:h-38 overflow-hidden bg-[#f0f3ff]">
                        {b.image ? (
                          <img
                            src={b.image}
                            alt={b.imageAlt || b.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#115eaf]/40">
                            <BookOpen className="w-7 h-7" aria-hidden="true" />
                          </div>
                        )}
                        {b.category ? (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#115eaf] shadow-2xs backdrop-blur-xs border border-[#d5e3ff]">
                            {b.category}
                          </span>
                        ) : null}
                      </div>

                      {/* Compact Card Content */}
                      <div className="p-3.5">
                        <div className="flex items-center gap-1.5 text-[10.5px] text-[#74777e] mb-1.5">
                          {dateText ? <span>{dateText}</span> : null}
                          {b.readingTime ? (
                            <>
                              {dateText ? <span aria-hidden="true" className="text-slate-300">•</span> : null}
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                                {b.readingTime}
                              </span>
                            </>
                          ) : null}
                          {b.views != null ? (
                            <>
                              {b.readingTime ? <span aria-hidden="true" className="text-slate-300">•</span> : null}
                              <span>{b.views} views</span>
                            </>
                          ) : null}
                        </div>
                        <h2 className="text-xs sm:text-[14px] font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-2 leading-snug">
                          <Link to={"/blog/" + slug}>{b.title}</Link>
                        </h2>
                        {b.excerpt ? (
                          <p className="text-[11px] sm:text-xs text-[#555960] line-clamp-2 mt-1 leading-relaxed">
                            {b.excerpt}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {/* Compact Card Footer */}
                    <div className="p-3.5 pt-0 mt-auto">
                      <Link
                        to={"/blog/" + slug}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#115eaf] group-hover:underline"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <nav className="mt-7 mb-4 flex items-center justify-center gap-1.5 flex-wrap" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="h-8.5 w-8.5 inline-flex items-center justify-center rounded-lg border border-[#d5e3ff] text-[#115eaf] hover:bg-[#f0f4f8] disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                        ? "h-8.5 min-w-8.5 px-2.5 inline-flex items-center justify-center rounded-lg border text-xs font-semibold transition-colors bg-[#115eaf] text-white border-[#115eaf] shadow-xs cursor-pointer"
                        : "h-8.5 min-w-8.5 px-2.5 inline-flex items-center justify-center rounded-lg border text-xs font-semibold transition-colors bg-white text-[#43474d] border-[#d5e3ff] hover:border-[#115eaf] hover:text-[#115eaf] hover:bg-[#f8fbff] cursor-pointer"
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
                  className="h-8.5 w-8.5 inline-flex items-center justify-center rounded-lg border border-[#d5e3ff] text-[#115eaf] hover:bg-[#f0f4f8] disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </>
        )}

        {/* Counseling CTA Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#f0f4f8] via-[#f8fbff] to-white border border-[#d5e3ff] flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-2xs">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-bold text-[#000f22] mb-0.5">
              Need Help Deciding on the Right Online University?
            </h3>
            <p className="text-xs text-[#555960] leading-relaxed">
              Our certified academic counselors provide 100% free comparisons across UGC entitlements, fees, and career placements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onOpenCounseling) onOpenCounseling();
              else window.location.href = "/counselling";
            }}
            className="px-4 py-2 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-2xs flex items-center gap-1.5 active:scale-98 cursor-pointer"
          >
            <span>Talk to an Academic Advisor</span>
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </main>
  );
}

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
