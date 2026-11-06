import { useEffect } from "react";

const DEFAULT_ORIGIN = "https://www.onlinesiksha.com";

export default function BlogSEO({ blog }) {
  useEffect(() => {
    if (!blog) return;

    const origin = typeof window !== "undefined" ? window.location.origin : DEFAULT_ORIGIN;
    const path = `/blog/${blog.slug || blog.urlSlug || ""}`;
    const canonical = `${origin}${path}`;
    const title = blog.seo?.metaTitle || `${blog.title} | OnlineSiksha`;
    const description = blog.seo?.metaDescription || blog.excerpt || blog.standfirst || "";
    const image = blog.seo?.ogImage || blog.mainImage?.url || null;

    document.title = title;

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

    setMeta("name", "description", description);
    if (blog.seo?.metaKeywords) setMeta("name", "keywords", blog.seo.metaKeywords);
    setMeta("name", "robots", "noindex, nofollow, max-image-preview:large");

    setMeta("property", "og:type", "article");
    setMeta("property", "og:site_name", "OnlineSiksha");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    if (image) setMeta("property", "og:image", image);
    if (blog.publishDate) setMeta("property", "article:published_time", blog.publishDate);
    if (blog.modifiedDate) setMeta("property", "article:modified_time", blog.modifiedDate);
    if (blog.author?.name) setMeta("property", "article:author", blog.author.name);
    if (blog.category) setMeta("property", "article:section", blog.category);

    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);

    let canonicalEl = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonical);

    // JSON-LD
    const scriptId = "onlinesiksha-blog-jsonld";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const graph = [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: blog.title,
        description: description || undefined,
        image: image || undefined,
        datePublished: blog.publishDate || undefined,
        dateModified: blog.modifiedDate || blog.publishDate || undefined,
        articleSection: blog.category || undefined,
        author: blog.author?.name ? { "@type": "Person", name: blog.author.name } : undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        publisher: { "@type": "Organization", name: "OnlineSiksha" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Blogs", item: `${origin}/blog` },
          { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
        ],
      },
    ];

    if (Array.isArray(blog.faqs) && blog.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonical}#faqs`,
        mainEntity: blog.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }

    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [blog]);

  return null;
}
