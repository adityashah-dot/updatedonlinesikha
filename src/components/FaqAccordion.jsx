import { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Shared accessible FAQ accordion (single-open, site convention).
 *
 * - `items`: [{ id?, question, answer }] — plain-string answers, or a
 *   `renderAnswer(item, index)` slot for link-bearing answers.
 * - `variant`: "card" (bordered boxes, as in the university template) or
 *   "list" (divided rows with numbered badge, as on the home page).
 * - Keyboard: question buttons are native buttons (Enter/Space); ArrowUp /
 *   ArrowDown move focus between questions.
 * - ARIA: aria-expanded / aria-controls pairing plus a labelled region per
 *   answer, so the expanded state is exposed to assistive technology.
 */
export function FaqAccordion({
  items,
  variant = "card",
  defaultOpenIndex = 0,
  listClassName = "",
  itemClassName = "",
  buttonClassName = "",
  answerClassName = "",
  renderAnswer,
}) {
  const list = (Array.isArray(items) ? items : []).filter(
    (item) => item && typeof item.question === "string" && item.question.trim()
  );
  const baseId = useId();
  const buttonRefs = useRef([]);
  const keyOf = (item, index) => (item.id != null ? String(item.id) : String(index));
  const [openKey, setOpenKey] = useState(
    list.length ? keyOf(list[Math.min(list.length - 1, Math.max(0, defaultOpenIndex))], Math.max(0, defaultOpenIndex)) : null
  );

  if (!list.length) return null;

  const handleKeyDown = (event, index) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? (index + 1) % list.length : (index - 1 + list.length) % list.length;
    buttonRefs.current[next]?.focus?.();
  };

  const isList = variant === "list";

  return (
    <div className={`${isList ? "divide-y divide-[#e7eeff]" : "space-y-[12px]"}${listClassName ? ` ${listClassName}` : ""}`}>
      {list.map((item, index) => {
        const key = keyOf(item, index);
        const open = openKey === key;
        const buttonId = `${baseId}-faq-question-${index}`;
        const panelId = `${baseId}-faq-answer-${index}`;

        if (isList) {
          return (
            <div key={key} className={`py-3.5 transition-colors${itemClassName ? ` ${itemClassName}` : ""}`}>
              <button
                type="button"
                id={buttonId}
                ref={(node) => { buttonRefs.current[index] = node; }}
                onClick={() => setOpenKey((prevKey) => (prevKey === key ? null : key))}
                onKeyDown={(event) => handleKeyDown(event, index)}
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                className={`w-full text-left flex items-center justify-between gap-4 py-1 text-sm sm:text-[15px] font-semibold text-[#000f22] hover:text-[#115eaf] transition-colors cursor-pointer group${buttonClassName ? ` ${buttonClassName}` : ""}`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#f0f4f8] group-hover:bg-[#d5e3ff] text-[#115eaf] text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors">
                    {index + 1}
                  </span>
                  <span>{item.question}</span>
                </span>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${open ? "rotate-180 bg-[#f0f4f8] text-[#115eaf]" : "text-[#74777e] group-hover:bg-[#f0f4f8]"}`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {open && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`mt-2 pl-7.5 pr-4 text-xs sm:text-[13px] text-[#43474d] leading-relaxed font-normal whitespace-pre-line animate-fade-in${answerClassName ? ` ${answerClassName}` : ""}`}
                >
                  {renderAnswer ? renderAnswer(item, index) : item.answer}
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={key} className={`border border-[#e7eeff] rounded-xl overflow-hidden${itemClassName ? ` ${itemClassName}` : ""}`}>
            <button
              type="button"
              id={buttonId}
              ref={(node) => { buttonRefs.current[index] = node; }}
              onClick={() => setOpenKey((prevKey) => (prevKey === key ? null : key))}
              onKeyDown={(event) => handleKeyDown(event, index)}
              aria-expanded={open}
              aria-controls={open ? panelId : undefined}
              className={`w-full px-4 py-3 text-left flex items-center justify-between gap-3 font-medium text-xs sm:text-sm text-[#000f22] hover:text-[#115eaf] bg-white transition-colors min-h-[44px] group${buttonClassName ? ` ${buttonClassName}` : ""}`}
            >
              <span>{item.question}</span>
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${open ? "rotate-180 bg-[#f0f4f8] text-[#115eaf]" : "text-[#74777e] group-hover:bg-[#f0f4f8]"}`}
              >
                <ChevronDown className="w-4 h-4 text-[#115eaf] shrink-0" />
              </span>
            </button>
            {open && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`px-4 pb-3 text-xs text-[#43474d] bg-[#f9f9ff] border-t border-[#e7eeff] leading-relaxed${answerClassName ? ` ${answerClassName}` : ""}`}
              >
                <p className="pt-3 font-normal">{renderAnswer ? renderAnswer(item, index) : item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordion;
