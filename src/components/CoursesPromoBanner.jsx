import { Headphones, ArrowRight, CheckCircle } from "lucide-react";

export default function CoursesPromoBanner({
  heading = "FREE 1-ON-1 ACADEMIC ADVISORY",
  title = "1-on-1 Admission & University Guidance",
  message = "Compare UGC-DEB recognized universities, verified semester fees, and zero-cost EMI options with our academic advisors.",
  ctaLabel = "Talk to an Advisor",
  onCtaClick,
  className = "",
}) {
  const handleCta = () => {
    if (typeof onCtaClick === "function") {
      onCtaClick();
    } else if (typeof window !== "undefined") {
      window.location.href = "/counselling";
    }
  };

  // Keep 'academic advisor' / 'academic advisors' strictly together on the same line
  const renderMessage = (text) => {
    if (typeof text !== "string") return text;
    const parts = text.split(/(academic advisors?)/i);
    return parts.map((part, i) =>
      /academic advisors?/i.test(part) ? (
        <span key={i} className="whitespace-nowrap font-semibold text-[#0b4fa8]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section
      data-testid="course-counselling-banner"
      className={`rounded-xl bg-gradient-to-r from-[#eef5ff] via-[#f6faff] to-white border border-[#cfe0fa] px-3.5 py-2.5 sm:px-4.5 sm:py-3 shadow-2xs ${className}`}
      aria-label="Free 1-on-1 Academic Advisory"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide bg-[#e7eeff] text-[#115eaf] border border-[#c8dcff] shrink-0">
              <Headphones className="w-3 h-3 text-[#115eaf] shrink-0" aria-hidden="true" />
              <span>{title}</span>
            </div>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#000f22] tracking-tight">
              {heading}
            </h3>
          </div>
          <p className="text-xs text-[#43474d] leading-snug">
            {renderMessage(message)}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10.5px] sm:text-[11px] text-[#000f22] font-medium">
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>UGC-DEB Entitled</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Verified Fees &amp; Syllabus</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Flexible EMI Guidance</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleCta}
            className="w-full sm:w-auto h-8.5 sm:h-9 px-4 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold transition-colors shadow-2xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
