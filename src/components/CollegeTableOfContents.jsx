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
      className={`mx-3 sm:mx-0 my-3.5 sm:my-5 p-4 sm:p-5 rounded-2xl border border-[#d5e3ff] bg-gradient-to-b from-white via-white to-[#fbfdff] shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#e7eeff]">
        <span className="w-2 h-2 rounded-full bg-[#115eaf]" aria-hidden="true" />
        <h2 className="text-sm sm:text-base font-bold text-[#000f22] tracking-tight m-0">
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
                    ? "font-bold text-[#115eaf]"
                    : "font-medium text-[#334155] hover:text-[#115eaf]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-all ${
                    isActive ? "bg-[#115eaf] scale-125" : "bg-slate-300 group-hover:bg-[#115eaf]"
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
        <div className="mt-3 pt-2.5 border-t border-[#f1f5f9]">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
            aria-expanded={isExpanded}
            aria-controls={listId}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#115eaf] hover:text-[#084a8c] hover:underline cursor-pointer transition-colors"
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
