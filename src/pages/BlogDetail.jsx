import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import BlogSEO from "../components/blog/BlogSEO";
import BlogHeader from "../components/blog/BlogHeader";
import BlogHero from "../components/blog/BlogHero";
import BlogQuickBrief from "../components/blog/BlogQuickBrief";
import BlogTOC from "../components/blog/BlogTOC";
import BlogArticleContent from "../components/blog/BlogArticleContent";
import BlogFAQ from "../components/blog/BlogFAQ";
import BlogSidebar from "../components/blog/BlogSidebar";
import { getBlogBySlug, BlogNotFoundError } from "../services/blogApi";
import "../components/blog/blog-detail.css";

export default function BlogDetail({ onOpenCounseling }) {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", blog: null, relatedBlogs: [] });
  const [retryKey, setRetryKey] = useState(0);

  const handleCounseling = () => {
    if (onOpenCounseling) onOpenCounseling();
    else window.location.assign("/");
  };

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", blog: null, relatedBlogs: [] });
    window.scrollTo({ top: 0 });

    getBlogBySlug(slug)
      .then((result) => {
        if (cancelled) return;
        setState({ status: "ready", blog: result.blog, relatedBlogs: result.relatedBlogs || [] });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof BlogNotFoundError) {
          setState({ status: err.notApproved ? "not-approved" : "not-found", blog: null, relatedBlogs: [] });
          return;
        }
        setState({ status: "error", blog: null, relatedBlogs: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, retryKey]);

  /* ---------- Loading ---------- */
  if (state.status === "loading") {
    return (
      <main className="blog-detail bd-page" aria-busy="true">
        <div className="container">
          <div className="bd-skeleton" aria-hidden="true">
            <span style={{ width: "35%", height: 18 }} />
            <span style={{ width: "70%", height: 42 }} />
            <span style={{ width: "85%", height: 120 }} />
            <span style={{ width: "100%", height: 240, borderRadius: 12 }} />
            <span style={{ width: "100%", height: 180 }} />
          </div>
        </div>
        <span className="sr-only">Loading article…</span>
      </main>
    );
  }

  /* ---------- Not approved ---------- */
  if (state.status === "not-approved") {
    return (
      <main className="blog-detail bd-page">
        <div className="bd-state">
          <AlertCircle size={40} aria-hidden="true" />
          <h1>Article under review</h1>
          <p>This article is waiting for editorial approval. Please browse the published guides instead.</p>
          <Link className="bd-btn" to="/blog">Browse all blogs</Link>
        </div>
      </main>
    );
  }

  /* ---------- Not found ---------- */
  if (state.status === "not-found") {
    return (
      <main className="blog-detail bd-page">
        <div className="bd-state">
          <BookOpen size={40} aria-hidden="true" />
          <h1>Article not found</h1>
          <p>This article doesn't exist. It may have been removed, moved or renamed.</p>
          <Link className="bd-btn" to="/blog">Browse all blogs</Link>
        </div>
      </main>
    );
  }

  /* ---------- Service unavailable ---------- */
  if (state.status === "error") {
    return (
      <main className="blog-detail bd-page">
        <div className="bd-state">
          <AlertCircle size={40} aria-hidden="true" />
          <h1>Couldn't load this article right now</h1>
          <p>The article service is unavailable. Please check your connection and try again in a moment.</p>
          <button type="button" className="bd-btn" onClick={() => setRetryKey((k) => k + 1)}>
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </button>
        </div>
      </main>
    );
  }

  const { blog, relatedBlogs } = state;

  return (
    <main className="blog-detail bd-page">
      <BlogSEO blog={blog} />

      <div className="container">
        <BlogHeader blog={blog} />

        <div className="bd-layout">
          {/* Main column */}
          <div className="bd-stack">
            <BlogHero image={blog.mainImage} title={blog.title} />
            <BlogQuickBrief subheadings={blog.subheadings} bulletPoints={blog.bulletPoints} />
            <BlogTOC items={blog.tableOfContents} />
            <BlogArticleContent blog={blog} onOpenCounseling={handleCounseling} />
            <BlogFAQ faqs={blog.faqs} />
            <ArticleAuthorCard blog={blog} />
          </div>

          {/* Right sidebar */}
          <BlogSidebar relatedBlogs={relatedBlogs} onOpenCounseling={handleCounseling} />
        </div>
      </div>

      {/* Mobile-only sticky bottom CTA */}
      <div className="bd-sticky-cta">
        <button type="button" className="bd-btn" onClick={handleCounseling}>Connect with an expert</button>
      </div>
    </main>
  );
}

function ArticleAuthorCard({ blog }) {
  if (!blog.author?.bio) return null;
  const initials = (blog.author.name || "A").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <section className="bd-author-card" aria-label="About the author">
      <div className="bd-avatar" aria-hidden="true" style={blog.author.image ? { backgroundImage: `url(${blog.author.image})` } : {}}>{blog.author.image ? null : initials}</div>
      <div>
        <b>{blog.author.name || "OnlineSiksha Desk"}</b>
        <span>{blog.author.bio}</span>
      </div>
    </section>
  );
}
