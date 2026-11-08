import { useState, useEffect } from "react";
import SafeHtml from "./SafeHtml";
import { ChevronDown, ArrowRight, Headphones } from "lucide-react";

/*
 * Supports the visible article block taxonomy used by the DegreeFYD CMS:
 * richtext/html/text, table, note/callout/alert, blockquote/quote,
 * cta/ctabuttons, image/figure/gallery, checklist, faq/faqBlock,
 * plus a defensive shape-based renderer for:
 * specialization_list, feature_cards, step_flow, syllabus, admission_flow,
 * placement_stats, testimonials, compare, certificate_grid, courses_list,
 * resource_grid, resources, live_news, blogs.
 * Unknown or malformed blocks render nothing (or a safe fallback when HTML is present), never throw.
 */

export default function BlockRenderer({ block, onOpenCounseling }) {
  if (!block || typeof block !== "object") return null;
  const type = String(block.type || block.blockType || "richtext").toLowerCase();

  switch (type) {
    case "richtext":
    case "html":
    case "text":
      return <RichTextBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "note":
    case "callout":
    case "alert":
      return <NoteBlock block={block} />;
    case "blockquote":
    case "quote":
      return <BlockquoteBlock block={block} />;
    case "cta":
    case "ctabuttons":
    case "call_to_action":
      return <CtaBlock block={block} onOpenCounseling={onOpenCounseling} />;
    case "image":
    case "figure":
      return <FigureBlock block={block} />;
    case "gallery":
      return <GalleryBlock block={block} />;
    case "faq":
    case "faqblock":
    case "faqs":
      return <FaqBlock block={block} />;
    case "checklist":
      return <ChecklistBlock block={block} />;
    case "specialization_list":
    case "feature_cards":
    case "certificate_grid":
    case "courses_list":
    case "resource_grid":
    case "resources":
    case "feature_list":
      return <CardGridBlock block={block} />;
    case "step_flow":
    case "admission_flow":
    case "syllabus":
    case "compare":
      return <DefinitionListBlock block={block} />;
    case "placement_stats":
      return <StatGridBlock block={block} />;
    case "testimonials":
      return <TestimonialBlock block={block} />;
    case "live_news":
    case "blogs":
      return <LinkListBlock block={block} />;
    case "courses":
      return <CourseListBlock block={block} />;
    default:
      if (block.content || block.html || block.text || block.value) {
        return (
          <div className="bd-prose">
            <SafeHtml html={block.content || block.html || block.text || block.value} className="bd-prose" />
          </div>
        );
      }
      return <GenericItemBlock block={block} />;
  }
}

/* ---------- helpers ---------- */
const pick = (block, keys) => {
  for (const k of keys) {
    const v = block?.[k];
    if (v != null && v !== "") return v;
  }
  return null;
};
const asArray = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);
const txt = (v) => (v == null ? "" : String(v).trim());
const stripTags = (v) => txt(String(v ?? "").replace(/<\/?[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " "));

function RichTextBlock({ block }) {
  const content = pick(block, ["content", "html", "text"]) || "";
  const title = txt(pick(block, ["title", "heading"]));
  const level = String(pick(block, ["headingLevel", "level", "h"] || "h2") || "h2").toLowerCase();
  const Tag = level === "h3" ? "h3" : level === "h4" ? "h4" : level === "h5" ? "h5" : "h2";
  return (
    <div className="bd-prose">
      {title ? <Tag>{title}</Tag> : null}
      {content ? <SafeHtml html={content} /> : null}
    </div>
  );
}

function TableBlock({ block }) {
  const title = txt(pick(block, ["title", "caption"]));
  const headers = asArray(pick(block, ["headers", "columns", "head"]));
  const rows = asArray(pick(block, ["rows", "data", "body"])).map((r) => (Array.isArray(r) ? r : Object.values(r || {})));
  if (headers.length === 0 && rows.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h3>{title}</h3> : null}
      <div className="bd-table-wrap">
        <table className="bd-table">
          {headers.length > 0 && (
            <thead>
              <tr>{headers.map((h, i) => <th key={i} scope="col">{typeof h === "object" ? txt(h.title || h.label) : txt(h)}</th>)}</tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{typeof cell === "string" ? <SafeHtml html={cell} as="span" /> : txt(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="bd-hint">Swipe the table sideways to see all columns.</p>
    </div>
  );
}

function NoteBlock({ block }) {
  const pattern = String(pick(block, ["designPattern", "variant", "level", "kind", "type"]) || "info").toLowerCase();
  const title = txt(pick(block, ["title", "heading"]));
  const content = pick(block, ["content", "text", "html"]) || "";
  const warn = pattern === "warning" || pattern === "warn" || pattern === "alert";
  const ok = pattern === "tip" || pattern === "success" || pattern === "ok";
  return (
    <div className={`bd-note ${ok ? "ok" : warn ? "warn" : ""}`}>
      {title ? <strong>{title}</strong> : null}
      {content ? <SafeHtml html={content} as="span" /> : null}
    </div>
  );
}

function BlockquoteBlock({ block }) {
  const content = pick(block, ["content", "quote", "text", "html"]) || "";
  const citation = txt(pick(block, ["citation", "author", "byline"]));
  return (
    <figure className="bd-prose">
      <blockquote>
        <SafeHtml html={content} as="span" />
        {citation ? <figcaption>— {citation}</figcaption> : null}
      </blockquote>
    </figure>
  );
}

function CtaBlock({ block, onOpenCounseling }) {
  const title = txt(pick(block, ["title", "headline"])) || null;
  const description = txt(pick(block, ["description", "content", "subtitle"])) || null;
  const label = txt(pick(block, ["buttonText", "label", "button"])) || "Get free advice";
  const href = pick(block, ["href", "url", "link"]);
  const handleClick = () => {
    if (typeof onOpenCounseling === "function") onOpenCounseling();
    else if (href) window.location.assign(href);
  };
  return (
    <div className="bd-inline-cta">
      <div>
        {title ? <h4>{title}</h4> : null}
        {description ? <p>{description}</p> : null}
      </div>
      {href ? <a className="bd-btn" href={href}><ArrowRight size={16} />{label}</a> : (
        <button type="button" className="bd-btn" onClick={handleClick}><Headphones size={16} />{label}</button>
      )}
    </div>
  );
}

function FigureBlock({ block }) {
  const img = imgOf(block) || (block.image && typeof block.image === "object" ? imgOf(block.image) : null);
  if (!img?.url) return null;
  return (
    <figure className="bd-figure">
      <img src={img.url} alt={img.alt || ""} loading="lazy" />
      {img.alt ? <figcaption>{img.alt}</figcaption> : null}
    </figure>
  );
}

function imgOf(o) {
  if (!o || typeof o !== "object") return null;
  const url = o.url || o.src || o.image || o.image?.url;
  if (!url) return null;
  return { url, alt: txt(o.alt || o.caption || o.title || o.image?.alt) };
}

function GalleryBlock({ block }) {
  const imgs = asArray(pick(block, ["images", "items", "gallery"])).map(imgOf).filter(Boolean);
  if (imgs.length === 0) return null;
  return (
    <div className="bd-gallery">
      {imgs.map((img, i) => <img key={i} src={img.url} alt={img.alt || `Gallery image ${i + 1}`} loading="lazy" />)}
    </div>
  );
}

function FaqBlock({ block }) {
  const items = asArray(pick(block, ["items", "faqs", "questions"]))
    .filter((f) => f && typeof f === "object")
    .map((f, i) => ({ q: stripTags(f.question || f.q), a: stripTags(f.answer || f.a), id: f._id || f.id || `faq-${i}` }))
    .filter((f) => f.q && f.a);
  if (items.length === 0) return null;
  return (
    <section id="faqs" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently asked questions</h2>
      <div className="bd-faq">
        {items.map((f, i) => (
          <details key={f.id} {...(i === 0 ? { open: true } : {})}>
            <summary>{f.q}<ChevronDown aria-hidden="true" /></summary>
            <div className="a">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function CardGridBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "cards", "specializations", "courses", "features", "resources", "certificates"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      <div className="bd-cards">
        {items.map((item, i) => {
          const label = txt(item?.title || item?.name || item?.text || (typeof item === "object" ? "" : item)) || null;
          const detail = txt(item?.description || item?.excerpt || item?.value || "");
          if (!label && !detail) return null;
          return (
            <div key={i}>
              {label ? <strong>{label}</strong> : null}
              {detail ? <span>{detail}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DefinitionListBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "steps", "rows", "compare", "specs"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      <ul className="bd-defs">
        {items.map((item, i) => {
          const key = txt(item?.label || item?.title || item?.name || (typeof item === "object" ? "" : `Item ${i + 1}`));
          const value = txt(item?.value || item?.description || item?.content || (typeof item === "object" ? "" : String(item)));
          return (
            <li key={i}>
              {key ? <strong>{key}</strong> : null}
              {value ? <span>{value}</span> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StatGridBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "stats", "metrics"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      <div className="bd-cards">
        {items.map((item, i) => {
          const value = txt(item?.value);
          const label = txt(item?.label || item?.title);
          return (
            <div key={i}>
              {value ? <strong>{value}</strong> : null}
              {label ? <span>{label}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TestimonialBlock({ block }) {
  const items = asArray(pick(block, ["items", "testimonials", "quotes"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      <div className="bd-defs">
        {items.map((item, i) => {
          const quote = txt(item?.quote || item?.content || item?.text);
          if (!quote) return null;
          const name = txt(item?.name || item?.author);
          return (
            <li key={i}>
              <SafeHtml html={quote} />
              {name ? <strong>{name}</strong> : null}
            </li>
          );
        })}
      </div>
    </div>
  );
}

function LinkListBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "links", "articles", "posts"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      <ul>
        {items.map((item, i) => {
          const label = txt(item?.title || item?.text);
          const href = item?.url || item?.href || item?.link;
          if (!label) return null;
          return (
            <li key={i}>
              {href ? <a href={href}>{label}</a> : <span>{label}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CourseListBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "courses", "programs"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      <ul>
        {items.map((item, i) => {
          const name = txt(item?.title || item?.name);
          const desc = txt(item?.description || item?.excerpt);
          return (
            <li key={i}>
              {name ? <strong>{name}</strong> : null}
              {desc ? <> — {desc}</> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ChecklistBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "list", "steps"])).map((i) => (typeof i === "object" ? txt(i.text || i.label || i.title) : String(i))).filter(Boolean);
  if (items.length === 0) return null;
  const slug = typeof window !== "undefined" ? (window.location.pathname.match(/\/blog\/([^/]+)/) || [])[1] || "blog" : "blog";
  const storageKey = `os-checklist-${slug}`;
  const saved = (() => { try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; } })();
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      <ChecklistClient items={items} storageKey={storageKey} initial={saved} />
    </div>
  );
}

function ChecklistClient({ items, storageKey, initial }) {
  const [state, setState] = useState(() => items.map((_, i) => {
    const v = initial?.[i];
    return typeof v === "boolean" ? v : false;
  }));
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }, [state, storageKey]);
  const done = state.filter(Boolean).length;
  return (
    <>
      <ul className="bd-checklist">
        {items.map((text, i) => (
          <li key={i}>
            <label>
              <input type="checkbox" checked={state[i]} onChange={() => setState((prev) => prev.map((v, j) => (j === i ? !v : v)))} />
              <span>{text}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="bd-progress" aria-live="polite">
        <span>{done} of {items.length} done</span>
        <span className="bd-bar"><i style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} /></span>
        <button type="button" className="bd-linkbtn" onClick={() => setState(items.map(() => false))}>Reset</button>
      </div>
    </>
  );
}

function GenericItemBlock({ block }) {
  const title = txt(pick(block, ["title", "heading"]));
  const items = asArray(pick(block, ["items", "sections", "children"]));
  if (items.length === 0) return null;
  return (
    <div className="bd-prose">
      {title ? <h2>{title}</h2> : null}
      {items.map((item, i) => (
        typeof item === "object" && (item.content || item.html || item.text)
          ? <SafeHtml key={i} html={item.content || item.html || item.text || ""} />
          : null
      ))}
    </div>
  );
}
