const TONES = {
  neutral: "bg-canvas text-ink-700 border-line",
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  success: "bg-success-50 text-success-600 border-success-600/15",
  warning: "bg-accent-50 text-accent-700 border-accent-500/20",
};

/** Small label for facts like approvals, accreditation or mode. Not for actions. */
export function Badge({ tone = "neutral", className = "", children, ...props }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium leading-5 whitespace-nowrap [&_svg]:w-3.5 [&_svg]:h-3.5 ${TONES[tone] || TONES.neutral} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
