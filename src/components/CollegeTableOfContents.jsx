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
      className={`toc-card ${className}`}
    >
      <h2>{title}</h2>

<ul id={listId} className="space-y-3 overflow-x-auto">
        {visibleItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`text-sm sm:text-[14.5px] leading-relaxed whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#115eaf] font-medium underline"
                    : "text-[#115eaf] hover:text-[#004689] hover:underline font-normal"
                }`}

              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      {showToggle && (
        <div className="toc-more">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
            aria-expanded={isExpanded}
            aria-controls={listId}
          >
            <span>{isExpanded ? "View less" : "View more"}</span>
            <ChevronDown
              strokeWidth={1.5}
              style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
          </button>
        </div>
      )}
    </section>
  );
}
