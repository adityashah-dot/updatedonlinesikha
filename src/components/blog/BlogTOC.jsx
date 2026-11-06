import { ChevronDown } from "lucide-react";
import { useState } from "react";

const INITIAL_VISIBLE = 5;

export default function BlogTOC({ items = [], scrollOffset = "calc(var(--nav-h) + 24px)" }) {
  const [expanded, setExpanded] = useState(false);
  const list = (Array.isArray(items) ? items : []).filter((i) => i && i.id && i.title);
  if (list.length === 0) return null;

  const hidden = Math.max(0, list.length - INITIAL_VISIBLE);
  const visibleItems = expanded ? list : list.slice(0, INITIAL_VISIBLE);

  const jump = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top, behavior: "smooth" });
    try {
      history.pushState(null, "", "#" + id);
    } catch {}
  };

  return (
    <section className="bd-toc" aria-labelledby="toc-title">
      <h2 id="toc-title">Table of contents</h2>
      <ul id="tocList">
        {visibleItems.map((item, idx) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={(e) => jump(e, item.id)}>{item.title}</a>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <div className="more" data-open={String(expanded)}>
          <button type="button" aria-expanded={expanded} aria-controls="tocList" onClick={() => setExpanded((v) => !v)}>
            <span>{expanded ? "View less" : "View more"}</span>
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
