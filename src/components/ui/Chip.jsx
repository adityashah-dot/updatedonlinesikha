/** Toggleable filter chip. Announces its state with aria-pressed. */
export function Chip({ selected = false, count, className = "", children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-sm whitespace-nowrap transition-colors ${
        selected
          ? "bg-brand-600 border-brand-600 text-white"
          : "bg-white border-line-strong text-ink-700 hover:border-brand-600 hover:text-brand-600"
      } ${className}`}
      {...props}
    >
      {children}
      {count != null && (
        <span className={`text-xs ${selected ? "text-white/80" : "text-ink-500"}`}>{count}</span>
      )}
    </button>
  );
}

export default Chip;
