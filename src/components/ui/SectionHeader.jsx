/**
 * Heading block used at the top of page sections.
 * `action` is an optional node (usually a <Button>) shown on the right on desktop
 * and under the text on mobile.
 */
export function SectionHeader({ as: Heading = "h2", eyebrow, title, description, action, id, className = "" }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5 sm:mb-6 ${className}`}>
      <div className="min-w-0">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1.5">{eyebrow}</p>}
        <Heading id={id} className="font-display text-xl sm:text-2xl font-bold text-ink-900 tracking-[-0.01em]">
          {title}
        </Heading>
        {description && <p className="mt-1.5 text-sm sm:text-[15px] text-ink-500 max-w-2xl">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeader;
