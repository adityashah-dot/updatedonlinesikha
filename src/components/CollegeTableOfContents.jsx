import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollegeTableOfContents({
  title = "Table of contents",
  items = [],
  activeId,
  onItemClick,
  className = "",
  defaultExpanded = false,
  collapsedCount = 5,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const listId = useId();

  const handleScrollTo = (e, id) => {
    e.preventDefault();

    if (onItemClick) onItemClick(id);

    let element = document.getElementById(id);

    if (!element) {
      if (id === "admission-highlights")
        element =
          document.getElementById("admission-overview") ||
          document.getElementById("highlights");
      if (id === "admission-dates")
        element = document.getElementById("important-dates");
      if (id === "scholarship-schemes")
        element =
          document.getElementById("scholarships-schemes") ||
          document.getElementById("scholarships");
      if (id === "compare") element = document.getElementById("compare-colleges");
    }

    if (element) {
      const yOffset = -105;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      try {
        window.history.pushState(null, "", `#${id}`);
      } catch {
        /* restricted environment */
      }
    }
  };

  const visibleItems = isExpanded ? items : items.slice(0, collapsedCount);
  const showToggle = items.length > collapsedCount;

  return (
    <section
      aria-label="Table of contents"
      className={`mx-3 sm:mx-0 my-3.5 sm:my-5 p-4 sm:p-5 rounded-2xl border border-brand-200 bg-gradient-to-b from-white via-white to-canvas shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-line">
        <h2 className="text-sm sm:text-base font-bold text-ink-900 tracking-tight m-0">
          {title}
        </h2>
      </div>

      <ul id={listId} className="space-y-1.5 list-none p-0 m-0">
        {visibleItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id} className="m-0 p-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`group flex items-start gap-2.5 py-1 text-xs sm:text-[13.5px] leading-snug transition-colors ${
                  isActive
                    ? "font-bold text-brand-600"
                    : "font-medium text-ink-700 hover:text-brand-600"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-all ${
                    isActive ? "bg-brand-600 scale-125" : "bg-slate-300 group-hover:bg-brand-600"
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {showToggle && (
        <div className="mt-3 pt-2.5 border-t border-brand-50">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
            aria-expanded={isExpanded}
            aria-controls={listId}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer transition-colors"
          >
            <span>{isExpanded ? "View less" : "View more"}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </section>
  );
}
