import { useEffect } from "react";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

// Updates the existing <head> tags from index.html (or the blog SSR) instead of
// rendering a second set, so every page has exactly one title/description.
export const SEO = ({ title, description, canonical, robots }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    }
    if (description) {
      upsertMeta('meta[name="description"]', { name: "description", content: description });
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    }
    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
    // Pages can opt out of indexing (e.g. 404). Reset to the default when they unmount.
    if (robots) {
      upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
      return () => document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, canonical, robots]);

  return null;
};

export default SEO;
