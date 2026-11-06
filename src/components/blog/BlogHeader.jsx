import { Link } from "react-router-dom";
import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function BlogHeader({ blog }) {
  const [copied, setCopied] = useState(false);
  if (!blog) return null;

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator?.share) {
      try { await navigator.share({ title: blog.title, url }); return; } catch {}
    }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };

  const author = blog.author || {};
  const initials = (author.name || "A").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const updated = formatDate(blog.modifiedDate || blog.publishDate);
  const published = formatDate(blog.publishDate);

  return (
    <header className="bd-title-block">
      {/* Breadcrumb */}
      <nav className="bd-crumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blogs</Link></li>
          <li aria-current="page">{blog.title}</li>
        </ol>
      </nav>

      {/* Category chip (only when provided) */}
      {blog.category ? <span className="bd-chip">{blog.category}</span> : null}

      <h1>{blog.title}</h1>
      {blog.standfirst ? <p className="bd-lede">{blog.standfirst}</p> : null}

      {/* Byline row */}
      <div className="bd-byline">
        {author.name && (
          <div className="bd-author">
            <div className="bd-avatar" aria-hidden="true" style={author.image ? { backgroundImage: `url(${author.image})` } : {}}>
              {author.image ? null : initials}
            </div>
            <div>
              <b>{author.name}</b>
              {author.bio || author.role ? <span>{author.bio || author.role}</span> : null}
            </div>
          </div>
        )}
        {updated ? (
          <div className="updated">
            <em>Last updated</em>
            <time dateTime={blog.modifiedDate || blog.publishDate}>{updated}</time>
          </div>
        ) : published ? (
          <div className="updated">
            <em>Published</em>
            <time dateTime={blog.publishDate}>{published}</time>
          </div>
        ) : null}
        {blog.readingTime ? (
          <div className="updated">
            <em>Reading time</em>
            <span>{blog.readingTime}</span>
          </div>
        ) : null}
        <button type="button" className="bd-linkbtn bd-share" onClick={share} aria-label="Share this article">
          {copied ? <><Check size={14} /> Copied</> : <><Share2 size={14} /> Share</>}
        </button>
      </div>
    </header>
  );
}

function formatDate(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
