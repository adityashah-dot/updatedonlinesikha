import { useMemo } from "react";

/**
 * Robust HTML sanitizer for rich CMS content.
 * 
 * Protects against XSS attacks while preserving all legitimate formatting:
 * - Headings (h1 - h6)
 * - Paragraphs, breaks, rules (p, br, hr)
 * - Lists (ul, ol, li)
 * - Formatting (strong, b, em, i, u, s, mark, small, sub, sup, span)
 * - Links (a) with secure rel="noopener noreferrer"
 * - Tables (table, thead, tbody, tfoot, tr, th, td)
 * - Quotes & Code (blockquote, pre, code)
 * - Media (img, figure, figcaption)
 * 
 * Disallows scripts, iframes, objects, forms, inline event handlers (on*),
 * and dangerous protocols (javascript:, data:, vbscript:).
 */
const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "span", "div", "br", "hr",
  "ul", "ol", "li",
  "strong", "b", "em", "i", "u", "s", "mark", "small", "sub", "sup",
  "a",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  "blockquote", "pre", "code",
  "img", "figure", "figcaption",
]);

const ALLOWED_ATTRS = new Set([
  "href", "target", "rel", "src", "alt", "title",
  "class", "id", "width", "height", "loading",
  "scope", "colspan", "rowspan",
]);

const SAFE_URL_PATTERN = /^(https?:|mailto:|tel:|\/|#|\.\/)/i;

/* Matches links that navigate to DegreeFYD (CMS host). Images served from the CDN (src=) are kept as-is; only <a> navigation is rewritten. */
const DEGREEIFYD_LINK_RE = /^https?:\/\/[^/]*\bdegreefyd\.com\b/i;

/*
 * DegreeFYD URLs are mirrored on OnlineSiksha wherever an equivalent route exists:
 *   /blogs/{slug}   -> /blog/{slug}
 *   /colleges/{slug}-> /universities/{slug}
 * Anything else (e.g. /courses, /exams) is rendered as plain text so the reader
 * never leaves for a DegreeFYD page. No equivalent page => no external destination.
 */
function rewriteDegreefydHref(href) {
  try {
    const u = new URL(href);
    if (!/(?:^|\.)degreefyd\.com$/i.test(u.hostname)) return null;
    const path = u.pathname.replace(/\/+$/, "");
    const blogMatch = path.match(/^\/blogs?\/([^/?#]+)/i);
    if (blogMatch) return `/blog/${decodeURIComponent(blogMatch[1])}`;
    const collegeMatch = path.match(/^\/colleges?\/([^/?#]+)/i);
    if (collegeMatch) return `/universities/${decodeURIComponent(collegeMatch[1])}`;
    return null;
  } catch {
    return null;
  }
}

export function sanitizeHtml(rawHtml) {
  if (!rawHtml || typeof rawHtml !== "string") return "";

  // Headless / Node SSR fallback
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    let out = rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "")
      .replace(/\shref\s*=\s*['"]\s*javascript:[^'"]*['"]/gi, ' href="#"')
      .replace(/\ssrc\s*=\s*['"]\s*javascript:[^'"]*['"]/gi, "");
    // Strip anchors whose href points to DegreeFYD; rewrite to OnlineSiksha when possible.
    out = out.replace(/<a\b([^>]*)\bhref\s*=\s*['"]([^'"]*)['"]([^>]*)>([\s\S]*?)<\/a>/gi, (m, pre, href, post, inner) => {
      if (!DEGREEIFYD_LINK_RE.test(href)) return m;
      const mapped = rewriteDegreefydHref(href);
      return mapped ? `<a href="${mapped}">${inner}</a>` : inner;
    });
    // Wrap bare tables so they scroll inside the column on narrow screens.
    out = out.replace(/<table\b[\s\S]*?<\/table>/gi, (m) => `<div class="bd-table-wrap">${m}</div>`);
    out = replaceVisibleBrand(out);
    return out;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    function cleanNode(node) {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const tagName = child.tagName.toLowerCase();

          // Remove disallowed tags entirely
          if (!ALLOWED_TAGS.has(tagName)) {
            child.remove();
            continue;
          }

          // Rewrite DegreeFYD anchors before attribute validation
          if (tagName === "a") {
            const href = child.getAttribute("href") || "";
            if (DEGREEIFYD_LINK_RE.test(href)) {
              const mapped = rewriteDegreefydHref(href);
              if (mapped) {
                child.setAttribute("href", mapped);
                child.setAttribute("rel", "noopener noreferrer");
                child.removeAttribute("target");
              } else {
                // Unwrap: replace <a> with its inner content
                const parent = child.parentNode;
                while (child.firstChild) parent.insertBefore(child.firstChild, child);
                parent.removeChild(child);
                continue;
              }
            }
          }

          // Preserve inline emphasis: CMS stores some pseudo-headings as
          // <span style="font-weight:700;font-size:24px">. The style attribute is
          // stripped, so promote bold spans to <strong> to keep them visually
          // distinct from body text without introducing a new typography system.
          if (tagName === "span") {
            const style = (child.getAttribute("style") || "").toLowerCase();
            const m = style.match(/font-weight\s*:\s*(\d{3}|bold|bolder)/);
            const weight = m ? (m[1] === "bold" ? 700 : m[1] === "bolder" ? 700 : parseInt(m[1], 10)) : 0;
            if (weight >= 600 && child.children.length === 0) {
              const strong = doc.createElement("strong");
              while (child.firstChild) strong.appendChild(child.firstChild);
              child.parentNode.replaceChild(strong, child);
              continue;
            }
          }

          // Strip disallowed or dangerous attributes
          const attrs = Array.from(child.attributes);
          for (const attr of attrs) {
            const attrName = attr.name.toLowerCase();

            // Strip event handlers (onclick, onerror, etc.)
            if (attrName.startsWith("on")) {
              child.removeAttribute(attr.name);
              continue;
            }

            // Only allow whitelisted attributes
            if (!ALLOWED_ATTRS.has(attrName)) {
              child.removeAttribute(attr.name);
              continue;
            }

            // Validate URLs for href and src
            if (attrName === "href" || attrName === "src") {
              const val = attr.value.trim();
              if (!SAFE_URL_PATTERN.test(val)) {
                child.removeAttribute(attr.name);
              }
            }
          }

          // Enforce secure target="_blank"
          if (tagName === "a" && child.getAttribute("target") === "_blank") {
            child.setAttribute("rel", "noopener noreferrer");
          }

          // Recursively clean children
          cleanNode(child);
        } else if (child.nodeType === Node.COMMENT_NODE) {
          child.remove();
        }
      }
    }

    cleanNode(doc.body);

    // Wrap bare CMS tables so they scroll inside the column instead of
    // forcing horizontal page overflow on narrow screens.
    Array.from(doc.body.querySelectorAll("table")).forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains("bd-table-wrap")) return;
      const wrap = doc.createElement("div");
      wrap.className = "bd-table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });

    Array.from(doc.body.querySelectorAll("p, h2, h3, h4, h5, h6")).forEach((el) => {
      const text = (el.textContent || "").trim();
      if (text) return;
      const tag = el.tagName;
      const isPara = tag === "P";
      const kids = Array.from(el.childNodes).filter((n) => n.nodeType === 1);
      const onlyBr = kids.length > 0 && kids.every((k) => k.tagName === "BR");
      if (isPara && (kids.length === 0 || onlyBr)) { el.remove(); return; }
      if (tag.length === 3 && tag[0] === "H") { el.remove(); return; }
    });

    let html = doc.body.innerHTML;
    html = replaceVisibleBrand(html);
    return html;
  } catch {
    return "";
  }
}

/* Replace visible DegreeFYD brand text with OnlineSiksha. Images/URLs served from images.degreefyd.com are untouched. */
function replaceVisibleBrand(html) {
  return html
    .replace(/(^|[^a-zA-Z0-9])DegreeFYD(?![a-zA-Z0-9])/gi, "$1OnlineSiksha")
    .replace(/(^|[^a-zA-Z0-9])DegreeFyd(?![a-zA-Z0-9])/gi, "$1OnlineSiksha");
}

/**
 * SafeHtml component renders sanitized HTML safely.
 */
export default function SafeHtml({ html, className = "", as = "div", ...props }) {
  const sanitized = useMemo(() => sanitizeHtml(html), [html]);
  const Component = as;

  if (!sanitized) return null;

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
      {...props}
    />
  );
}
