import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal panel that slides in from the bottom (mobile sheets) or the right (drawers).
 * Handles overlay click, Esc, body scroll lock, focus trap and focus return.
 */
export function Sheet({ open, onClose, title, side = "bottom", footer, children, className = "" }) {
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);
  // Keep the latest onClose without re-running the open/close effect on every parent render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusFirst = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector(FOCUSABLE);
      (first || panelRef.current)?.focus();
    });

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  const isBottom = side === "bottom";
  const panelMotion = isBottom
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-ink-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => onCloseRef.current?.()}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : undefined}
            tabIndex={-1}
            {...panelMotion}
            transition={{ type: "tween", duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className={`absolute bg-white flex flex-col outline-none shadow-2xl ${
              isBottom
                ? "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-xl pb-[env(safe-area-inset-bottom)]"
                : "top-0 right-0 h-full w-[min(88vw,360px)]"
            } ${className}`}
          >
            {isBottom && <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-line-strong" aria-hidden="true" />}
            <div className="flex items-center justify-between gap-3 px-5 pt-3 pb-3 border-b border-line">
              <h2 className="font-display text-base font-semibold text-ink-900">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="-mr-2 h-10 w-10 inline-flex items-center justify-center rounded-lg text-ink-500 hover:bg-canvas hover:text-ink-900"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>
            {footer && <div className="border-t border-line px-5 py-3">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Sheet;
