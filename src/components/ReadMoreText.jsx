
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ReadMoreText({
  text = "",
  lines = 3,
  className = "",
  wrapperClassName = "",
  buttonClassName = "",
  fullText = false,
  expandLabel = "Read more",
  collapseLabel = "Show less",
  as: Tag = "p",
}) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const textRef = useRef(null);
  const textId = useId();

  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    setExpanded(false);

    const measure = () => {
      setCanExpand(element.scrollHeight > element.clientHeight + 1);
    };

    measure();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [text, lines]);

  useEffect(() => {
    if (expanded) return;

    const element = textRef.current;

    if (element) {
      setCanExpand(element.scrollHeight > element.clientHeight + 1);
    }
  }, [expanded]);

  if (!text) return null;

  return (
    <div className={wrapperClassName}>
      <Tag
        ref={textRef}
        id={textId}
        className={className}
        style={fullText ? undefined : {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "none" : lines,
          overflow: "hidden",
        }}
      >
        {text}
      </Tag>

      {!fullText && canExpand ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded((value) => !value)}
          className={`mt-1.5 inline-flex min-h-[36px] items-center gap-1 rounded-md text-sm font-semibold text-[#115eaf] transition-colors hover:text-[#004689] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115eaf] focus-visible:ring-offset-2 ${buttonClassName}`}
        >
          <span>{expanded ? collapseLabel : expandLabel}</span>
          {expanded ? (
            <ChevronUp aria-hidden="true" className="h-4 w-4" />
          ) : (
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      ) : null}
    </div>
  );
}

