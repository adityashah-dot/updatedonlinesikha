import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getNewsBySlug,
  getNewsListing,
  resolveNewsImage,
  cleanSlug,
  DEFAULT_NEWS_FALLBACK_IMAGE,
  NewsNotFoundError,
} from "../services/newsApi";
import usePageMeta from "../hooks/usePageMeta";
import SafeHtml from "../components/blog/SafeHtml";
import { FaqAccordion } from "../components/FaqAccordion";
import "../components/news/news-editorial.css";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Flame,
  GraduationCap,
  Headphones,
  Link2,
  Newspaper,
  Radio,
  RefreshCw,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function formatNewsDateTime(isoDate) {
  if (!isoDate) return "Recently published";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "Recently published";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Recently published";
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
    return formatNewsDateTime(isoDate);
  } catch {
    return "Recently updated";
  }
}

function LiveNewsBlock({ item }) {
  if (!item || typeof item !== "object") return null;
  const title = item.title || "Live Update";
  const isLive = Boolean(item.isLive);

  return (
    <div className="my-5 p-4 rounded-xl border border-rose-200 bg-linear-to-r from-rose-50/70 via-white to-rose-50/30 shadow-2xs">
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-2.5 w-2.5">
          {isLive && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
          {isLive ? "Live Coverage Update" : "Verified Timeline Entry"}
        </span>
      </div>
      <h4 className="text-sm sm:text-base font-bold text-[#000f22] mb-1">{title}</h4>
      <p className="text-xs text-[#4b5563]">
        Real-time bulletin confirmed by the examination desk. Check official portals for verified individual roll-number scorecards.
      </p>
    </div>
  );
}

export default function NewsDetail({ onOpenCounseling }) {
  const { slug } = useParams();
  const normalizedSlug = useMemo(() => cleanSlug(slug), [slug]);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const [fallbackRelated, setFallbackRelated] = useState([]);
  const [copied, setCopied] = useState(false);

  // Scroll to top and reset state when switching slugs (prevents stale data)
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setArticle(null);
  }, [normalizedSlug]);

  // Fetch article detail
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setIsNotFound(false);

    getNewsBySlug(normalizedSlug)
      .then((data) => {
        if (!isMounted) return;
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        if (err instanceof NewsNotFoundError || err.code === "NOT_FOUND" || err.code === "MISSING_SLUG") {
          setIsNotFound(true);
        } else {
          setError(err.message || "Failed to load article.");
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [normalizedSlug, retryKey]);

  // Fetch fallback candidate stories from listing
  useEffect(() => {
    let isMounted = true;
    getNewsListing({ page: 1, limit: 12 })
      .then((res) => {
        if (!isMounted) return;
        setFallbackRelated(res.articles || []);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic SEO Page Meta
  usePageMeta({
    title: article ? `${article.title} | OnlineSiksha News` : "Education News | OnlineSiksha",
    description: article?.seo?.description || article?.hero?.cleanExcerpt || "Latest education news and admission alerts.",
    canonicalUrl: article ? `https://onlinesiksha.com/news/${article.slug}` : "https://onlinesiksha.com/news",
    noindex: isNotFound,
  });

  // Dynamic Open Graph & Twitter Meta Tags
  useEffect(() => {
    if (!article) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "https://onlinesiksha.com";
    const canonical = `${origin}/news/${encodeURIComponent(article.slug)}`;
    const title = article.title ? `${article.title} | OnlineSiksha News` : "Education News | OnlineSiksha";
    const description = article.seo?.description || article.hero?.cleanExcerpt || "Latest education news and admission alerts.";
    const image = article.hero?.image?.url || article.resolvedImage?.url || DEFAULT_NEWS_FALLBACK_IMAGE;

    const setMeta = (attr, val, content) => {
      if (!content) return;
      let el = document.head.querySelector(`meta[${attr}="${val}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("property", "og:type", "article");
    setMeta("property", "og:site_name", "OnlineSiksha");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    if (image) setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);
  }, [article]);

  // Inject JSON-LD Schema (NewsArticle or LiveBlogPosting)
  useEffect(() => {
    if (!article) return;
    const scriptId = "news-article-schema";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const schemaData = article.isLive
      ? {
          "@context": "https://schema.org",
          "@type": "LiveBlogPosting",
          headline: article.title,
          coverageStartTime: article.approvalDate || article.createdAt,
          coverageEndTime: article.updatedAt || new Date().toISOString(),
          datePublished: article.approvalDate || article.createdAt,
          dateModified: article.updatedAt || article.approvalDate,
          description: article.hero?.cleanExcerpt || article.title,
          image: [article.hero?.image?.url || article.resolvedImage?.url || DEFAULT_NEWS_FALLBACK_IMAGE],
          author: {
            "@type": "Person",
            name: article.author?.name || "OnlineSiksha News Desk",
          },
          publisher: {
            "@type": "Organization",
            name: "OnlineSiksha",
            url: "https://onlinesiksha.com",
            logo: {
              "@type": "ImageObject",
              url: "https://onlinesiksha.com/logo.png",
            },
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          datePublished: article.approvalDate || article.createdAt,
          dateModified: article.updatedAt || article.approvalDate,
          description: article.hero?.cleanExcerpt || article.title,
          image: [article.hero?.image?.url || article.resolvedImage?.url || DEFAULT_NEWS_FALLBACK_IMAGE],
          author: [
            {
              "@type": "Person",
              name: article.author?.name || "OnlineSiksha News Desk",
            },
          ],
          publisher: {
            "@type": "Organization",
            name: "OnlineSiksha",
            url: "https://onlinesiksha.com",
            logo: {
              "@type": "ImageObject",
              url: "https://onlinesiksha.com/logo.png",
            },
          },
        };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [article]);

  const handleShare = (platform) => {
    if (!article) return;
    const url = window.location.href;
    const title = article.title;

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard?.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const effectiveRelated = useMemo(() => {
    const primary = Array.isArray(article?.relatedNews) ? article.relatedNews : [];
    const fallback = Array.isArray(fallbackRelated) ? fallbackRelated : [];
    const combined = [...primary, ...fallback];

    const seenSlugs = new Set();
    const result = [];

    for (const item of combined) {
      if (!item || !item.slug) continue;
      const clean = cleanSlug(item.slug);
      // Strictly exclude current article
      if (clean === normalizedSlug) continue;
      // Strictly prevent duplicate stories
      if (seenSlugs.has(clean)) continue;
      seenSlugs.add(clean);
      result.push(item);
      if (result.length >= 4) break;
    }

    return result;
  }, [article, fallbackRelated, normalizedSlug]);

  return (
    <main className="news-page pb-16 pt-3 sm:pt-4" aria-label="News Article Detail">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* BREADCRUMB NAVIGATION */}
        {/* ========================================================= */}
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-1.5 text-xs text-[#6b7280] flex-wrap">
            <li>
              <Link to="/" className="hover:text-[#115eaf] transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" aria-hidden="true" />
            <li>
              <Link to="/news" className="hover:text-[#115eaf] transition-colors">
                News
              </Link>
            </li>
            {article?.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" aria-hidden="true" />
                <li className="text-[#4b5563] font-medium">{article.category}</li>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" aria-hidden="true" />
            <li className="text-[#000f22] font-semibold truncate max-w-[200px] sm:max-w-md">
              {article ? article.title : "Article"}
            </li>
          </ol>
        </nav>

        {/* ========================================================= */}
        {/* LOADING STATE */}
        {/* ========================================================= */}
        {loading && (
          <div className="space-y-6 max-w-4xl mx-auto py-4">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-[#f0f4f8] rounded w-28" />
              <div className="h-10 bg-[#f0f4f8] rounded w-4/5" />
              <div className="h-5 bg-[#f0f4f8] rounded w-2/3" />
              <div className="h-80 bg-[#f0f4f8] rounded-2xl w-full" />
              <div className="space-y-3 pt-4">
                <div className="h-4 bg-[#f0f4f8] rounded w-full" />
                <div className="h-4 bg-[#f0f4f8] rounded w-5/6" />
                <div className="h-4 bg-[#f0f4f8] rounded w-4/6" />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 404 ARTICLE NOT FOUND STATE */}
        {/* ========================================================= */}
        {!loading && isNotFound && (
          <div className="bg-white rounded-2xl border border-[#e7eeff] p-8 sm:p-12 text-center my-8 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <AlertCircle className="w-8 h-8" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#000f22] mb-2">News Article Not Found</h1>
            <p className="text-sm text-[#4b5563] mb-6 max-w-md mx-auto">
              The article you are looking for does not exist or may have been updated. You can browse all verified education news on our live desk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-sm font-semibold transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Return to All News</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#e7eeff] hover:bg-[#f8fbff] text-[#4b5563] text-sm font-semibold transition-colors"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* GENERIC ERROR STATE */}
        {/* ========================================================= */}
        {!loading && !isNotFound && error && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 sm:p-12 text-center my-8 max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <AlertCircle className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-[#000f22] mb-2">Unable to Load Article</h2>
            <p className="text-sm text-[#4b5563] mb-6 max-w-md mx-auto">
              We encountered an issue connecting to the news service. Please try again.
            </p>
            <button
              onClick={() => setRetryKey((k) => k + 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-sm font-semibold transition-colors shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Retry Article</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* ACTIVE ARTICLE DETAIL */}
        {/* ========================================================= */}
        {!loading && !isNotFound && !error && article && (
          <>
            {/* 1. EDITORIAL ARTICLE HEADER */}
            <header className="mb-4 sm:mb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span data-testid="news-category-badge" className="px-2.5 py-0.5 rounded-md bg-[#115eaf] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wide shadow-2xs">
                  {article.category || "Exam Alerts"}
                </span>
                {article.isLive && (
                  <span data-testid="news-live-badge" className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wide shadow-2xs">
                    <span className="news-live-dot" aria-hidden="true" />
                    <span>Live Updates Active</span>
                  </span>
                )}
              </div>

              <h1 className="news-detail-h1 text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#000f22] leading-[1.22] tracking-[-0.015em] mb-2.5 break-words">
                {article.title}
              </h1>

              {/* Lead Summary Callout */}
              {(article.hero?.description || article.hero?.cleanExcerpt) && (
                <div className="border-l-3 border-[#115eaf] pl-3.5 py-1.5 bg-[#f8fbff] rounded-r-xl mt-1.5 mb-3">
                  <SafeHtml
                    html={article.hero?.description || article.hero?.cleanExcerpt}
                    className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal"
                  />
                </div>
              )}

              {/* Author, Date & Share Metadata Bar */}
              <div data-testid="news-byline" className="pt-2.5 border-t border-[#f0f4f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6b7280]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f5ff] text-[#115eaf] border border-[#d5e3ff] flex items-center justify-center font-bold text-xs shrink-0">
                    {article.author?.name ? article.author.name.charAt(0).toUpperCase() : "O"}
                  </div>
                  <div>
                    <div className="font-semibold text-[#000f22]">
                      Reported by {article.author?.name || "OnlineSiksha News Desk"}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#6b7280]">
                      <span>{formatNewsDateTime(article.approvalDate)}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
                      <span>{getTimeAgo(article.approvalDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
                    Share:
                  </span>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                    title="Share on WhatsApp"
                    aria-label="Share on WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-200"
                    title="Share on X"
                    aria-label="Share on X"
                  >
                    <span className="text-xs font-black px-0.5">X</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                  >
                    <span className="text-xs font-black px-0.5">in</span>
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="p-1.5 rounded-lg bg-[#f0f5ff] text-[#115eaf] hover:bg-[#d5e3ff] transition-colors border border-[#d5e3ff] relative"
                    title="Copy Link"
                    aria-label="Copy Link"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    {copied && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#000f22] text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </header>

            {/* 2. MAIN CONTENT & SIDEBAR GRID */}
            <div className="news-detail-layout">
              {/* PRIMARY READING COLUMN */}
              <article className="min-w-0">
                {/* Hero Media Asset */}
                <div className="relative rounded-2xl overflow-hidden bg-[#f8fbff] border border-[#e7eeff] news-hero-img-wrap mb-4 sm:mb-5 shadow-2xs">
                  <img
                    src={article.hero?.image?.url || article.resolvedImage?.url || DEFAULT_NEWS_FALLBACK_IMAGE}
                    alt={article.hero?.image?.alt || article.title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_NEWS_FALLBACK_IMAGE;
                    }}
                  />
                </div>

                {/* Mobile Collapsible TOC (Rendered on tablet/mobile) */}
                {article.tableOfContents && article.tableOfContents.length > 0 && (
                  <div data-testid="news-toc-mobile" className="lg:hidden mb-4 sm:mb-5 bg-white rounded-xl border border-[#e7eeff] p-3.5 shadow-2xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#000f22] mb-2 flex items-center justify-between">
                      <span>In this article</span>
                      <span className="text-[10px] text-[#6b7280] font-normal lowercase">{article.tableOfContents.length} sections</span>
                    </h3>
                    <nav aria-label="Table of contents" className="space-y-1.5 text-xs">
                      {article.tableOfContents.map((toc, idx) => (
                        <a
                          key={toc.id || idx}
                          href={toc.anchor}
                          className="block text-[#115eaf] hover:underline py-0.5"
                        >
                          {toc.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Article Content Sections */}
                <div className="space-y-5">
                  {article.sections && article.sections.length > 0 ? (
                    article.sections.map((sec, secIdx) => (
                      <section key={sec.id || secIdx} id={`section-${secIdx}`} className="pt-0">
                        {sec.heading && (
                          <h2 className="text-lg sm:text-xl font-bold text-[#000f22] mb-3 pb-2 border-b border-[#f0f4f8]">
                            {sec.heading}
                          </h2>
                        )}
                        <div className="space-y-4">
                          {sec.blocks?.map((block, blkIdx) => {
                            if (block.type === "live_news") {
                              return <LiveNewsBlock key={blkIdx} item={block.content} />;
                            }
                            return (
                              <div key={blkIdx} className="news-prose">
                                <SafeHtml html={block.content} />
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    ))
                  ) : (
                    <div className="news-prose">
                      <p>Detailed verification guidelines and official notices will be updated as soon as released.</p>
                    </div>
                  )}
                </div>

                {/* Mid-Article Counselling CTA */}
                <div data-testid="news-counselling-cta" className="my-8 rounded-xl border border-[#b1c8eb] bg-linear-to-r from-[#f0f5ff] via-white to-[#f0f5ff] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#115eaf] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Headphones className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#000f22]">Have Questions About Admissions?</h4>
                      <p className="text-xs text-[#4b5563]">Connect with verified academic counsellors for 100% free guidance.</p>
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
                    className="px-4 py-2 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-2xs"
                  >
                    <span>Talk to Expert</span>
                  </button>
                </div>

                {/* FAQs Section */}
                {article.faqs && article.faqs.length > 0 && (
                  <section data-testid="news-faqs" className="my-8 pt-4 border-t border-[#e7eeff]">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#115eaf]" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-[#000f22]">Frequently Asked Questions</h3>
                    </div>
                    <FaqAccordion items={article.faqs} />
                  </section>
                )}

                {/* Tags Cluster */}
                {article.tags && article.tags.length > 0 && (
                  <div className="my-6 pt-4 border-t border-[#f0f4f8]">
                    <span className="text-xs font-semibold text-[#6b7280] block mb-2">Related Topics:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[#f8fbff] text-[#4b5563] text-xs border border-[#e7eeff] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* STICKY EDITORIAL SIDEBAR (DESKTOP) */}
              <aside className="space-y-3.5 lg:sticky lg:top-24 hidden lg:block" aria-label="Article navigation and advisory">
                {/* Table of Contents */}
                {article.tableOfContents && article.tableOfContents.length > 0 && (
                  <div data-testid="news-toc-desktop" className="bg-white rounded-2xl border border-[#e7eeff] p-4 shadow-2xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#000f22] mb-2.5 pb-2 border-b border-[#f0f4f8] flex items-center justify-between">
                      <span>Table of Contents</span>
                      <span className="text-[10px] text-[#6b7280] font-normal lowercase">{article.tableOfContents.length} sections</span>
                    </h3>
                    <nav aria-label="Table of contents" className="space-y-1 text-xs">
                      {article.tableOfContents.map((toc, idx) => (
                        <a
                          key={toc.id || idx}
                          href={toc.anchor}
                          className="block text-[#4b5563] hover:text-[#115eaf] hover:translate-x-0.5 transition-all py-1 border-l-2 border-transparent hover:border-[#115eaf] pl-2 leading-snug"
                        >
                          {toc.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Counselling Sidebar Widget */}
                <div data-testid="news-counselling-sidebar" className="bg-linear-to-br from-[#f0f5ff] via-[#f8fbff] to-white rounded-2xl p-4 sm:p-4.5 text-[#000f22] shadow-2xs border border-[#b1c8eb]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-7.5 h-7.5 rounded-lg bg-[#e7eeff] text-[#115eaf] flex items-center justify-center shrink-0">
                      <Headphones className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#115eaf] block">
                        Free Counselling Desk
                      </span>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#000f22]">Need Education Advice?</h4>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-[#4b5563] leading-snug mb-3">
                    Speak with verified educational consultants regarding eligibility, fees, and application deadlines.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof onOpenCounseling === "function") {
                        onOpenCounseling();
                      } else {
                        window.location.href = "tel:1800123456";
                      }
                    }}
                    className="w-full h-8.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    <span>Talk to Admission Expert</span>
                  </button>
                </div>

                {/* Quick News & Exams Shortcuts */}
                <div className="bg-white rounded-2xl border border-[#e7eeff] p-4 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#000f22] mb-2 pb-1.5 border-b border-[#f0f4f8]">
                    Education Quick Links
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <Link
                      to="/news"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f8fbff] hover:bg-[#f0f5ff] text-[#000f22] hover:text-[#115eaf] transition-colors"
                    >
                      <span className="font-semibold">All Education News</span>
                      <ArrowRight className="w-3 h-3 text-[#115eaf]" />
                    </Link>
                    <Link
                      to="/exams"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f8fbff] hover:bg-[#f0f5ff] text-[#000f22] hover:text-[#115eaf] transition-colors"
                    >
                      <span className="font-semibold">Entrance Exams 2027</span>
                      <ArrowRight className="w-3 h-3 text-[#115eaf]" />
                    </Link>
                    <Link
                      to="/courses"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f8fbff] hover:bg-[#f0f5ff] text-[#000f22] hover:text-[#115eaf] transition-colors"
                    >
                      <span className="font-semibold">Online Degree Programs</span>
                      <ArrowRight className="w-3 h-3 text-[#115eaf]" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>

            {/* 3. RELATED EDUCATION COVERAGE */}
            {effectiveRelated.length > 0 && (
              <section className="mt-12 pt-8 border-t border-[#e7eeff]" aria-label="Related Stories">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#115eaf]" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#000f22]">Related Education Coverage</h3>
                  </div>
                  <Link
                    to="/news"
                    className="text-xs font-semibold text-[#115eaf] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View All News</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {effectiveRelated.slice(0, 4).map((rel, i) => (
                    <article
                      key={rel.id || i}
                      className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-40 w-full relative bg-[#f8fbff] overflow-hidden">
                          <img
                            src={rel.image?.url || rel.thumbnail?.url || DEFAULT_NEWS_FALLBACK_IMAGE}
                            alt={rel.image?.alt || rel.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_NEWS_FALLBACK_IMAGE;
                            }}
                          />
                          {rel.isLive && (
                            <div className="absolute top-2.5 left-2.5">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-extrabold uppercase shadow-sm">
                                <span className="news-live-dot" aria-hidden="true" />
                                <span>Live</span>
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="flex items-center gap-2 text-[11px] text-[#6b7280] mb-1.5 font-medium">
                            <span className="text-[#115eaf] font-semibold">{rel.category || "Exam Alerts"}</span>
                            <span>•</span>
                            <span>{getTimeAgo(rel.approvalDate)}</span>
                          </div>
                          <h4 className="text-sm font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors leading-snug news-clamp-2">
                            <Link to={`/news/${encodeURIComponent(rel.slug)}`}>
                              {rel.title}
                            </Link>
                          </h4>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <Link
                          to={`/news/${encodeURIComponent(rel.slug)}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#115eaf] hover:text-[#084a8c] transition-colors"
                        >
                          <span>Read Story</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Back to all news button */}
            <div className="mt-5 sm:mt-6">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-5 h-10 rounded-xl border border-[#115eaf] hover:bg-[#f0f5ff] text-[#115eaf] text-xs sm:text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Education News Desk</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
