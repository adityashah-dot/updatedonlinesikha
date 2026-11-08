import { Headphones, ArrowRight, CheckCircle } from "lucide-react";

export default function CoursesPromoBanner({
  heading = "FREE 1-ON-1 ACADEMIC COUNSELLING",
  title = "Need help choosing the right online programme?",
  message = "Speak with academic advisors to compare UGC-DEB approved universities, semester fees, and EMI eligibility.",
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

  return (
    <section
      data-testid="course-counselling-banner"
      className={`rounded-xl bg-gradient-to-r from-[#eef5ff] via-[#f6faff] to-white border border-[#cfe0fa] px-4 py-3.5 sm:px-5 sm:py-4 shadow-2xs ${className}`}
      aria-label="Free 1-on-1 Academic Counselling"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        <div className="min-w-0 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide bg-[#e7eeff] text-[#115eaf] border border-[#c8dcff] mb-1.5">
            <Headphones className="w-3 h-3 text-[#115eaf] shrink-0" aria-hidden="true" />
            <span>{title}</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#000f22] tracking-tight leading-snug">
            {heading}
          </h3>
          <p className="mt-0.5 text-xs text-[#43474d] leading-relaxed">
            {message}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11px] text-[#000f22] font-medium">
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>UGC-DEB Entitled Options</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Fee &amp; Curriculum Comparison</span>
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
            className="w-full sm:w-auto h-9.5 px-4.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-[13px] font-semibold transition-colors shadow-2xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
