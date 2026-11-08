import SafeHtml from "./SafeHtml";
import BlockRenderer from "./BlockRenderer";

export default function BlogArticleContent({ blog, onOpenCounseling }) {
  if (!blog) return null;
  const sections = Array.isArray(blog.sections) ? blog.sections : [];

  return (
    <article className="bd-prose">
      {blog.introduction ? (
        <section id="introduction" aria-label="Introduction">
          <SafeHtml html={blog.introduction} />
        </section>
      ) : null}

      {sections.map((section) => (
        <section key={section.key || section.id} id={section.id || section.key} aria-labelledby={`h-${section.id || section.key}`}>
          {section.title ? <h2 id={`h-${section.id || section.key}`}>{section.title}</h2> : null}
          {section.blocks.length > 0 ? section.blocks.map((block, bIdx) => (
            <BlockRenderer key={bIdx} block={block} onOpenCounseling={onOpenCounseling} />
          )) : null}
        </section>
      ))}

      {blog.conclusion ? (
        <section id="conclusion" aria-labelledby="conclusion-title">
          <h2 id="conclusion-title">Conclusion</h2>
          <SafeHtml html={blog.conclusion} />
        </section>
      ) : null}

      {blog.references && blog.references.length > 0 ? (
        <section id="references" aria-labelledby="references-title">
          <h3 id="references-title">Sources</h3>
          <ul>
            {blog.references.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>
      ) : null}

      {blog.tags && blog.tags.length > 0 ? (
        <ul className="bd-defs" aria-label="Tags">
          {blog.tags.map((tag, i) => <li key={i}><strong>{tag}</strong></li>)}
        </ul>
      ) : null}
    </article>
  );
}
