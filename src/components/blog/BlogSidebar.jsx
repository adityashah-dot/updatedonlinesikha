import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function BlogSidebar({ relatedBlogs = [], onOpenCounseling }) {
  const items = Array.isArray(relatedBlogs) ? relatedBlogs.filter((r) => r && r.title && r.slug) : [];

  return (
    <aside className="bd-side" aria-label="Sidebar">
      {/* CTA card — mirrors the approved mockup sidebar CTA */}
      <section className="bd-cta">
        <h3>Need help choosing a university?</h3>
        <p>Talk to a free counsellor and get a shortlist that fits your goals and budget.</p>
        <button type="button" className="bd-btn bd-btn-block" onClick={() => onOpenCounseling?.()}>
          Get free advice
        </button>
      </section>

      {/* Related articles — rendered only when CMS provides them */}
      {items.length > 0 ? (
        <section className="bd-related" aria-labelledby="related-reads-title">
          <h3 id="related-reads-title">Related Reads</h3>
          <ul>
            {items.slice(0, 2).map((item) => (
              <li key={item.slug}>
                <Link to={`/blog/${item.slug}`}>
                  <span className="thumb" aria-hidden="true" style={item.image ? { backgroundImage: `url(${item.image})` } : {}}>
                    {item.image ? null : <BookOpen />}
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    {item.date ? <small>{formatDate(item.date)}</small> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}

function formatDate(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
