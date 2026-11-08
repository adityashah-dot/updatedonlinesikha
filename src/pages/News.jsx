import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getNewsListing, resolveNewsImage, stripHtml, DEFAULT_NEWS_FALLBACK_IMAGE } from "../services/newsApi";
import usePageMeta from "../hooks/usePageMeta";
import "../components/news/news-editorial.css";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  Flame,
  GraduationCap,
  Headphones,
  Newspaper,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

function formatNewsDate(isoDate) {
  if (!isoDate) return "Recent";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
}

function getTimeAgo(isoDate) {
  if (!isoDate) return "Recently updated";
  try {
    const now = new Date();
    const d = new Date(isoDate);
    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0 || Number.isNaN(diffMs)) return "Just now";
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${diffMins || 1}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return formatNewsDate(isoDate);
  } catch {
    return "Recently updated";
  }
}

function getArticleExcerpt(item) {
  if (item.rawHeroDescription) {
    const s = stripHtml(item.rawHeroDescription);
    if (s.length > 20) return s;
  }
  const title = item.title || "";
  if (title.toLowerCase().includes("result") || title.toLowerCase().includes("out")) {
    return "Check official scorecard, rank list, toppers list, passing percentage, and direct download links released by the examination authority.";
  }
  if (title.toLowerCase().includes("ranking") || title.toLowerCase().includes("qs")) {
    return "Explore the latest institutional performance metrics, global standings, academic reputation benchmarks, and verified highlights.";
  }
  if (title.toLowerCase().includes("counselling") || title.toLowerCase().includes("josaa")) {
    return "Get complete details on choice filling deadlines, seat allocation rounds, reporting documentation, and institutional cutoff trends.";
  }
  return "Read the complete verified coverage on entrance schedule, eligibility criteria, admission notices, and official government advisories.";
}

export default function News({ onOpenCounseling }) {
  usePageMeta({
    title: "Latest Education News, Board Results & Exam Alerts | OnlineSiksha",
    description:
      "Get real-time education updates, board exam results, entrance exam alerts, UGC notifications, and institutional rankings verified by OnlineSiksha.",
    noindex: false,
  });

  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [isTickerHovered, setIsTickerHovered] = useState(false);

  // Load news listing
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getNewsListing()
      .then((res) => {
        if (!isMounted) return;
        setArticles(res.articles || []);
        setTotalCount(res.total || (res.articles ? res.articles.length : 0));
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Could not load education news.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [retryKey]);

  // Today's formatted date string for masthead
  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  // Filtered stories based on category & search
  const filteredArticles = useMemo(() => {
    let list = articles;

    if (activeCategory === "results") {
      list = list.filter((a) => {
        const t = (a.title || "").toLowerCase();
        return t.includes("result") || t.includes("scorecard") || t.includes("topper") || t.includes("out");
      });
    } else if (activeCategory === "admissions") {
      list = list.filter((a) => {
        const t = (a.title || "").toLowerCase();
        return t.includes("counselling") || t.includes("admission") || t.includes("josaa") || t.includes("seat");
      });
    } else if (activeCategory === "rankings") {
      list = list.filter((a) => {
        const t = (a.title || "").toLowerCase();
        return t.includes("ranking") || t.includes("qs") || t.includes("asia") || t.includes("ugc");
      });
    } else if (activeCategory === "exam-alerts") {
      list = list.filter((a) => a.category?.toLowerCase() === "exam alerts");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((a) => (a.title || "").toLowerCase().includes(q) || (a.category || "").toLowerCase().includes(q));
    }

    return list;
  }, [articles, activeCategory, searchQuery]);

  // Lead breaking story: Priority to the first isLive story, or the first published story
  const leadStory = useMemo(() => {
    if (articles.length === 0) return null;
    const liveItem = articles.find((a) => a.isLive);
    return liveItem || articles[0];
  }, [articles]);

  // 3 Trending stories alongside lead story
  const trendingStories = useMemo(() => {
    if (!leadStory || articles.length <= 1) return [];
    return articles.filter((a) => a.id !== leadStory.id).slice(0, 3);
  }, [articles, leadStory]);

  // Breaking ticker items
  const flashTickerItems = useMemo(() => {
    if (articles.length === 0) return [];
    const liveFirst = [...articles].sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));
    return liveFirst.slice(0, 4);
  }, [articles]);

  return (
    <main className="news-page pb-16 pt-3 sm:pt-5" aria-label="Education News & Live Desk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. EDITORIAL MASTHEAD */}
        {/* ========================================================= */}
        <header className="border-b border-[#e7eeff] pb-5 mb-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#115eaf] mb-1.5">
                <Radio className="w-3.5 h-3.5 text-[#115eaf] animate-pulse" aria-hidden="true" />
                <span>OnlineSiksha Education Dispatch • Live News Desk</span>
              </div>
              <h1 className="news-listing-h1 text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#000f22] tracking-tight leading-[1.1] mb-2">
                Latest Education News & Live Updates
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#4b5563] max-w-2xl">
                Verified admissions notices, board results, entrance exam notifications, UGC advisories, and institutional rankings.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end text-xs text-[#4b5563] bg-white border border-[#e7eeff] rounded-xl px-3.5 py-2 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
              <span className="font-medium text-[#000f22]">{todayFormatted}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-emerald-700 font-semibold text-[11px]">Real-Time Feed</span>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* 2. BREAKING NEWS FLASH TICKER */}
        {/* ========================================================= */}
        {!loading && !error && flashTickerItems.length > 0 && (
          <aside
            className="mb-6 rounded-xl border border-rose-200/80 bg-linear-to-r from-rose-50/70 via-white to-rose-50/40 p-2 sm:p-2.5 shadow-2xs"
            aria-label="Breaking News Alerts"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Restrained Editorial Alert Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide shrink-0">
                <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" aria-hidden="true" />
                <span className="uppercase tracking-wider text-[11px] font-extrabold">Flash Alerts</span>
              </div>

              {/* Ticker Scrolling Viewport */}
              <div
                className="news-ticker-viewport flex-1 min-w-0 overflow-hidden relative"
                onMouseEnter={() => setIsTickerHovered(true)}
                onMouseLeave={() => setIsTickerHovered(false)}
              >
                <div
                  className={`news-ticker-track flex items-center text-xs font-medium text-[#111c2d] whitespace-nowrap ${isTickerPaused || isTickerHovered ? "news-ticker-paused" : ""}`}
                >
                  {[...flashTickerItems, ...flashTickerItems].map((item, idx) => (
                    <span
                      key={`${item.id || item.slug}-${idx}`}
                      className="inline-flex items-center gap-2 mr-8 shrink-0"
                    >
                      {item.isLive && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold border border-rose-200">
                          LIVE
                        </span>
                      )}
                      <Link
                        to={`/news/${encodeURIComponent(item.slug)}`}
                        className="hover:text-[#115eaf] hover:underline transition-colors font-medium text-[#111c2d]"
                      >
                        {item.title}
                      </Link>
                      <span className="text-[#9ca3af] ml-6 select-none" aria-hidden="true">•</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Pause / Resume Accessible Toggle */}
              <button
                type="button"
                onClick={() => setIsTickerPaused((prev) => !prev)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[#6b7280] hover:text-[#000f22] hover:bg-black/5 transition-colors shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#115eaf]"
                aria-label={isTickerPaused ? "Resume news alert animation" : "Pause news alert animation"}
                title={isTickerPaused ? "Resume alerts" : "Pause alerts"}
              >
                {isTickerPaused ? (
                  <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                )}
              </button>
            </div>
          </aside>
        )}

        {/* ========================================================= */}
        {/* LOADING STATE SKELETON */}
        {/* ========================================================= */}
        {loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e7eeff] p-5 animate-pulse space-y-4">
                <div className="h-64 sm:h-80 bg-[#f0f4f8] rounded-xl w-full" />
                <div className="h-4 bg-[#f0f4f8] rounded w-1/4" />
                <div className="h-8 bg-[#f0f4f8] rounded w-3/4" />
                <div className="h-4 bg-[#f0f4f8] rounded w-full" />
              </div>
              <div className="lg:col-span-4 bg-white rounded-2xl border border-[#e7eeff] p-5 animate-pulse space-y-4">
                <div className="h-6 bg-[#f0f4f8] rounded w-1/3 mb-4" />
                {[1, 2, 3].map((n) => (
                  <div key={n} className="space-y-2 border-b border-[#f0f4f8] pb-3">
                    <div className="h-3 bg-[#f0f4f8] rounded w-1/4" />
                    <div className="h-5 bg-[#f0f4f8] rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ERROR STATE */}
        {/* ========================================================= */}
        {!loading && error && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 sm:p-12 text-center my-6 max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <AlertCircle className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-[#000f22] mb-2">Unable to Load Education News</h2>
            <p className="text-sm text-[#4b5563] mb-6 max-w-md mx-auto">
              We encountered a temporary network issue while connecting to the news feed. Please try again.
            </p>
            <button
              onClick={() => setRetryKey((k) => k + 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-sm font-semibold transition-colors shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. FEATURED 65/35 HERO SECTION */}
        {/* ========================================================= */}
        {!loading && !error && leadStory && (
          <section className="mb-5 sm:mb-6" aria-label="Featured Story and Trending Headlines">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* PRIMARY LEAD STORY (65%) */}
              <article className="lg:col-span-7 xl:col-span-8 group bg-white rounded-2xl border border-[#e7eeff] hover:border-[#b1c8eb] p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative rounded-xl overflow-hidden bg-[#000f22] news-hero-img-wrap mb-4">
                    <img
                      src={leadStory.image?.url || DEFAULT_NEWS_FALLBACK_IMAGE}
                      alt={leadStory.image?.alt || leadStory.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_NEWS_FALLBACK_IMAGE;
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#115eaf] text-white text-xs font-bold tracking-wide uppercase shadow-sm">
                        {leadStory.category || "Exam Alerts"}
                      </span>
                      {leadStory.isLive && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-600 text-white text-xs font-extrabold uppercase tracking-wide shadow-sm">
                          <span className="news-live-dot" aria-hidden="true" />
                          <span>Live Updates</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-2 font-medium">
                    <span>Reported by {leadStory.author?.name || "OnlineSiksha Desk"}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
                    <span>{getTimeAgo(leadStory.approvalDate)}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#000f22] group-hover:text-[#115eaf] transition-colors leading-tight mb-3">
                    <Link to={`/news/${encodeURIComponent(leadStory.slug)}`}>
                      {leadStory.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed news-clamp-3 mb-4">
                    {getArticleExcerpt(leadStory)}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0f4f8] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6b7280]">
                    Published {formatNewsDate(leadStory.approvalDate)}
                  </span>
                  <Link
                    to={`/news/${encodeURIComponent(leadStory.slug)}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#115eaf] hover:text-[#084a8c] transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </article>

              {/* RIGHT COLUMN (35%): TRENDING STORIES + EDUCATION ADVISORY */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 sm:gap-5 self-start">
                {/* 1. TRENDING STORIES STACK */}
                <aside className="bg-white rounded-2xl border border-[#e7eeff] p-4 sm:p-5 shadow-2xs self-start w-full" aria-label="Trending Education Stories">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f0f4f8]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                          <Flame className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <h2 className="text-base font-bold text-[#000f22]">Trending Stories</h2>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Popular Now
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {trendingStories.map((item, idx) => (
                        <article key={item.id || idx} className="group flex gap-3 items-start pb-3.5 border-b border-[#f0f4f8] last:border-b-0 last:pb-0">
                          <span className="w-7 h-7 rounded-full bg-[#f0f5ff] text-[#115eaf] border border-[#d5e3ff] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[11px] text-[#6b7280] mb-1 font-medium">
                              <span className="text-[#115eaf] font-semibold">{item.category || "Exam Alerts"}</span>
                              <span>•</span>
                              <span>{getTimeAgo(item.approvalDate)}</span>
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors leading-snug news-clamp-2">
                              <Link to={`/news/${encodeURIComponent(item.slug)}`}>
                                {item.title}
                              </Link>
                            </h3>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-[#f0f4f8] bg-[#f8fbff] -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3.5 rounded-b-2xl flex items-center justify-between text-xs text-[#115eaf] font-semibold">
                    <span className="text-[#4b5563] text-[11px]">Updated every 30 minutes</span>
                    <Link to="/news" onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })} className="hover:underline flex items-center gap-1">
                      <span>View all headlines</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </aside>

                {/* 2. ADMISSION COUNSELLING & ADVISORY WIDGET */}
                <div data-testid="news-counselling-sidebar" className="bg-linear-to-br from-[#f0f5ff] via-[#f8fbff] to-white rounded-2xl p-4.5 sm:p-5 text-[#000f22] shadow-2xs border border-[#b1c8eb] w-full">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#e7eeff] text-[#115eaf] flex items-center justify-center shrink-0">
                      <Headphones className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#115eaf] block">
                        Free Student Advisory
                      </span>
                      <h3 className="text-sm font-bold text-[#000f22]">Need Higher Education Guidance?</h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#4b5563] leading-relaxed mb-3.5">
                    Talk to verified academic counsellors about UGC-entitled online degrees, semester fee structures, and application deadlines.
                  </p>

                  <div className="space-y-1.5 mb-3.5 text-xs text-[#1e293b]">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>100% Free Career & Course Matching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>UGC & NAAC A++ Accredited Universities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>Zero Cost Pre-Approved EMI Assistance</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (typeof onOpenCounseling === "function") {
                        onOpenCounseling();
                      } else {
                        window.location.href = "tel:1800123456";
                      }
                    }}
                    className="w-full h-8.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    <span>Talk to Admission Expert</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 4. CATEGORY FILTERS & SEARCH BAR */}
        {/* ========================================================= */}
        {!loading && !error && (
          <nav className="mb-5 sm:mb-6 bg-white rounded-xl border border-[#e7eeff] p-3 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3" aria-label="News categories and search">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
              {[
                { id: "all", label: "All News", count: articles.length },
                { id: "exam-alerts", label: "Exam Alerts" },
                { id: "results", label: "Results & Cutoffs" },
                { id: "admissions", label: "Admissions & Counselling" },
                { id: "rankings", label: "Rankings & Policy" },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? "bg-[#115eaf] text-white shadow-2xs"
                        : "bg-[#f8fbff] text-[#4b5563] hover:bg-[#e7eeff] hover:text-[#000f22] border border-[#e7eeff]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {cat.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-[#e7eeff] text-[#115eaf]"}`}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headlines..."
                className="w-full h-8.5 pl-9 pr-8 rounded-lg bg-[#f8fbff] border border-[#e7eeff] text-xs text-[#000f22] placeholder-[#9ca3af] focus:outline-hidden focus:border-[#115eaf] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#000f22]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </nav>
        )}

        {/* ========================================================= */}
        {/* 5. MAIN CHRONOLOGICAL FEED & DESKTOP SIDEBAR */}
        {/* ========================================================= */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* CHRONOLOGICAL FEED (70%) */}
            <section className="lg:col-span-8" aria-label="Chronological News Feed">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#115eaf]" aria-hidden="true" />
                  <h2 className="text-base sm:text-lg font-bold text-[#000f22]">
                    {activeCategory === "all" ? "All Chronological Stories" : "Filtered Stories"}
                  </h2>
                </div>
                <span className="text-xs text-[#6b7280] font-medium">
                  Showing {filteredArticles.length} of {totalCount} Articles
                </span>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#e7eeff] p-8 text-center my-4">
                  <Newspaper className="w-10 h-10 text-[#9ca3af] mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-base font-bold text-[#000f22] mb-1">No News Articles Found</h3>
                  <p className="text-xs text-[#4b5563] mb-4">
                    There are no stories matching your selected category or search filter.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#f0f5ff] text-[#115eaf] text-xs font-semibold hover:bg-[#d5e3ff] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map((item) => (
                    <article
                      key={item.id}
                      className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 overflow-hidden flex flex-col sm:flex-row"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-full sm:w-52 md:w-60 h-44 sm:h-auto shrink-0 relative bg-[#f8fbff] overflow-hidden">
                        <img
                          src={item.image?.url || DEFAULT_NEWS_FALLBACK_IMAGE}
                          alt={item.image?.alt || item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = DEFAULT_NEWS_FALLBACK_IMAGE;
                          }}
                        />
                        {item.isLive && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-extrabold uppercase shadow-sm">
                              <span className="news-live-dot" aria-hidden="true" />
                              <span>Live</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#f0f5ff] text-[#115eaf] text-[11px] font-semibold border border-[#d5e3ff]">
                              {item.category || "Exam Alerts"}
                            </span>
                            <span className="text-[11px] text-[#6b7280]">
                              {getTimeAgo(item.approvalDate)}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors leading-snug news-clamp-2 mb-2">
                            <Link to={`/news/${encodeURIComponent(item.slug)}`}>
                              {item.title}
                            </Link>
                          </h3>

                          <p className="text-xs text-[#4b5563] leading-relaxed news-clamp-2 mb-3">
                            {getArticleExcerpt(item)}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-[#f0f4f8] flex items-center justify-between text-xs">
                          <span className="text-[#6b7280] font-medium text-[11px]">
                            By {item.author?.name || "OnlineSiksha Desk"}
                          </span>
                          <Link
                            to={`/news/${encodeURIComponent(item.slug)}`}
                            className="inline-flex items-center gap-1 font-bold text-[#115eaf] hover:text-[#084a8c] transition-colors group-hover:translate-x-0.5"
                          >
                            <span>Read Story</span>
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination metadata */}
              <div className="mt-8 pt-4 border-t border-[#e7eeff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6b7280]">
                <span>Showing all {filteredArticles.length} published stories</span>
                <span className="font-semibold text-[#115eaf]">
                  Verified Education Journalism • OnlineSiksha
                </span>
              </div>
            </section>

            {/* SIDEBAR WIDGETS (30%) */}
            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24" aria-label="Education resources and counselling">
              {/* WIDGET 1: EXPLORE EXAMS SHORTCUT */}
              <div className="bg-white rounded-2xl border border-[#e7eeff] p-4.5 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#f0f5ff] text-[#115eaf] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#000f22]">Entrance Exams Catalog</h3>
                    <span className="text-[10px] text-[#6b7280]">Complete dates & syllabi</span>
                  </div>
                </div>

                <div className="space-y-2 mb-3.5 text-xs">
                  {[
                    { name: "JEE Main 2027", path: "/exams/jee-main-exam", mode: "Online CBT" },
                    { name: "UPSC Civil Services 2027", path: "/exams/upsc-cse-exam", mode: "National" },
                    { name: "IPS Examination", path: "/exams/ips-exam", mode: "Civil Services" },
                    { name: "CAT 2026", path: "/exams", mode: "Management" },
                  ].map((ex, i) => (
                    <Link
                      key={i}
                      to={ex.path}
                      className="p-2 rounded-lg bg-[#f8fbff] hover:bg-[#f0f5ff] border border-[#f0f4f8] hover:border-[#b1c8eb] flex items-center justify-between transition-colors group"
                    >
                      <span className="font-semibold text-[#000f22] group-hover:text-[#115eaf]">{ex.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#6b7280] border border-[#e7eeff]">
                        {ex.mode}
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/exams"
                  className="w-full h-8 rounded-lg border border-[#115eaf] text-[#115eaf] hover:bg-[#f0f5ff] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View All Exams</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>

              {/* WIDGET 2: INSTANT EXAM ALERTS */}
              <div className="bg-white rounded-2xl border border-[#e7eeff] p-4 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-xs font-bold text-[#000f22]">Stay Ahead with Verified Alerts</h3>
                </div>
                <p className="text-[11px] text-[#4b5563] leading-relaxed">
                  Never miss an application deadline, admit card release, or answer key notification. Bookmark our Live Desk for daily verified updates.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
