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
    return debounced ? data.total + " matches for \"" + debounced + "\"" : data.total + " articles";
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
    <main className="w-full bg-white min-h-screen py-8 md:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-[#74777e]">
          <Link to="/" className="hover:text-[#115eaf] transition-colors">Home</Link>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-[#000f22] font-semibold">Blogs &amp; Guides</span>
        </nav>

        <section className="rounded-3xl border border-[#e7eeff] bg-white px-5 py-10 sm:px-10 lg:px-12 mb-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff] mb-4">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Research &amp; Guidance</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#000f22] tracking-tight leading-[1.12] mb-4">
                Education Insights. Better Decisions.
              </h1>
              <p className="text-sm sm:text-base text-[#555960] leading-relaxed max-w-md mb-6">
                Stay informed with verified guidance on UGC-DEB entitlements, curriculum deep dives, zero-cost EMI options, and career transitions across India's top universities.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="blog-search" className="relative block flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777e] pointer-events-none" aria-hidden="true" />
                  <input
                    id="blog-search"
                    type="search"
                    placeholder="Search articles (e.g. online MBA, UGC-DEB, scholarships)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#c4c6ce] text-sm sm:text-base text-[#000f22] bg-white placeholder:text-[#74777e] outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20"
                    aria-label="Search articles"
                  />
                </label>
                {totalLabel ? <span className="text-xs sm:text-sm text-[#43474d] whitespace-nowrap">{totalLabel}</span> : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              {data.status === "loading" ? (
                <div className="rounded-2xl border border-[#e7eeff] bg-white overflow-hidden">
                  <div className="h-56 sm:h-64 bg-[#f0f3ff] animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-28 bg-[#f0f3ff] rounded animate-pulse" />
                    <div className="h-5 w-4/5 bg-[#f0f3ff] rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-[#f0f3ff] rounded animate-pulse" />
                  </div>
                </div>
              ) : featured ? (
                <div className="relative rounded-2xl border border-[#e7eeff] bg-white overflow-hidden shadow-sm">
                  {featured.image ? (
                    <img src={featured.image} alt={featured.imageAlt || featured.title} className="w-full h-56 sm:h-64 object-cover" loading="lazy" />
                  ) : (
                    <div className="h-56 sm:h-64 bg-[#f0f3ff] flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-[#115eaf]" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-5">
                    {featured.category ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff]">
                        {featured.category}
                      </span>
                    ) : null}
                    <h2 className="mt-3 text-lg font-bold text-[#000f22] leading-snug">
                      <Link to={"/blog/" + featured.slug}>{featured.title}</Link>
                    </h2>
                    {featured.excerpt ? <p className="mt-2 text-sm text-[#555960] leading-relaxed line-clamp-3">{featured.excerpt}</p> : null}
                    <Link to={"/blog/" + featured.slug} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#115eaf] hover:underline">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {topics.length > 0 ? (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
              <button
                type="button"
                onClick={() => setQuery("")}
                className={!query.trim() ? "h-9 px-4 rounded-full border text-xs font-semibold transition-colors bg-[#115eaf] text-white border-[#115eaf]" : "h-9 px-4 rounded-full border text-xs font-semibold transition-colors bg-white text-[#43474d] border-[#c4c6ce] hover:border-[#115eaf] hover:text-[#115eaf]"}
              >
                All
              </button>
              {topics.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setQuery(c)}
                  className={isTopicActive(c) ? "h-9 px-4 rounded-full border text-xs font-semibold transition-colors bg-[#115eaf] text-white border-[#115eaf]" : "h-9 px-4 rounded-full border text-xs font-semibold transition-colors bg-white text-[#43474d] border-[#c4c6ce] hover:border-[#115eaf] hover:text-[#115eaf]"}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {data.status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-[#e7eeff] overflow-hidden">
                <div className="h-48 bg-[#f0f3ff] animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-24 bg-[#f0f3ff] rounded animate-pulse" />
                  <div className="h-5 w-4/5 bg-[#f0f3ff] rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-[#f0f3ff] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {data.status === "error" && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3" role="alert">
            <AlertCircle className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#000f22]">We couldn&apos;t load the articles right now.</h2>
            <p className="text-sm text-[#43474d] max-w-md">The listing service is unavailable. Please check your connection and try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-2 inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {data.status === "ready" && data.articles.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3">
            <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#000f22]">No articles match your search.</h2>
            <p className="text-sm text-[#43474d] max-w-md">Try a shorter or different search term.</p>
            {debounced ? (
              <button type="button" onClick={() => setQuery("")} className="mt-2 px-5 h-11 rounded-xl border border-[#115eaf] text-[#115eaf] hover:bg-[#eff5ff] text-xs sm:text-sm font-semibold transition-colors">
                Clear search
              </button>
            ) : null}
          </div>
        )}

        {data.status === "ready" && data.articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.articles.map((b) => {
                const slug = b.slug;
                const dateText = formatDate(b.date);
                return (
                  <article key={slug} className="group bg-white rounded-2xl border border-[#e7eeff] hover:border-[#b1c8eb] overflow-hidden transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-[#f0f3ff]">
                        {b.image ? (
                          <img src={b.image} alt={b.imageAlt || b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : null}
                        {b.category ? (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#115eaf] shadow-sm">
                            {b.category}
                          </span>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-[#74777e] mb-2.5">
                          {dateText ? <span>{dateText}</span> : null}
                          {b.readingTime ? (
                            <>
                              {dateText ? <span aria-hidden="true">/</span> : null}
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                                {b.readingTime}
                              </span>
                            </>
                          ) : null}
                          {b.views != null ? (
                            <>
                              {b.readingTime ? <span aria-hidden="true">/</span> : null}
                              <span>{b.views} views</span>
                            </>
                          ) : null}
                        </div>
                        <h2 className="text-lg font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-2 leading-snug">
                          <Link to={"/blog/" + slug}>{b.title}</Link>
                        </h2>
                        {b.excerpt ? <p className="text-xs sm:text-[13px] text-[#555960] line-clamp-2 mt-2 leading-relaxed">{b.excerpt}</p> : null}
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <Link to={"/blog/" + slug} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#115eaf] group-hover:underline">
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {data.totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2 flex-wrap" aria-label="Pagination">
                <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page" className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-[#c4c6ce] text-[#43474d] hover:border-[#115eaf] hover:text-[#115eaf] disabled:opacity-40 disabled:hover:border-[#c4c6ce] disabled:hover:text-[#43474d] disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {pageNumbers.map((n) => (
                  <button key={n} type="button" onClick={() => setPage(n)} aria-label={"Page " + n} aria-current={n === page ? "page" : undefined} className={n === page ? "h-10 min-w-10 px-3 inline-flex items-center justify-center rounded-xl border text-sm font-semibold transition-colors bg-[#115eaf] text-white border-[#115eaf]" : "h-10 min-w-10 px-3 inline-flex items-center justify-center rounded-xl border text-sm font-semibold transition-colors bg-white text-[#43474d] border-[#c4c6ce] hover:border-[#115eaf] hover:text-[#115eaf]"}>
                  {n}
                </button>
              ))}
                <button type="button" onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages} aria-label="Next page" className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-[#c4c6ce] text-[#43474d] hover:border-[#115eaf] hover:text-[#115eaf] disabled:opacity-40 disabled:hover:border-[#c4c6ce] disabled:hover:text-[#43474d] disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            )}
          </>
        )}

        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#f7f9fc] border border-[#e7eeff] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-[#000f22] mb-1">Need Help Deciding on the Right Online University?</h3>
            <p className="text-xs sm:text-sm text-[#555960]">Our certified academic counselors provide 100% free comparisons across UGC entitlements, fees, and career placements.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onOpenCounseling) onOpenCounseling();
              else window.location.href = "/counselling";
            }}
            className="px-5 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
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
