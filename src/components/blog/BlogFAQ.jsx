import { ChevronDown } from "lucide-react";

export default function BlogFAQ({ faqs = [] }) {
  const items = (Array.isArray(faqs) ? faqs : []).filter((f) => f && f.question && f.answer);
  if (items.length === 0) return null;

  return (
    <section id="faqs" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently asked questions</h2>
      <div className="bd-faq">
        {items.map((f, i) => (
          <details key={f.id || i} {...(i === 0 ? { open: true } : {})}>
            <summary>{f.question}<ChevronDown aria-hidden="true" /></summary>
            <div className="a">{f.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
