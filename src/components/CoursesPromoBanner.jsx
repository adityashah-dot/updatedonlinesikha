import { Headphones, ArrowRight } from "lucide-react";

export default function CoursesPromoBanner({
  heading = "1-on-1 Academic & Admission Guidance",
  title = "Verified University Advisory",
  message = "Connect with certified online degree advisors to compare UGC-entitled universities, fee structures, and specialisations.",
  ctaLabel = "Get Guidance",
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

  const cleanHeading = String(heading || "1-on-1 Academic & Admission Guidance").replace(/DegreeFYD/gi, "OnlineSiksha");
  const cleanMessage = String(message || "Connect with certified online degree advisors to compare UGC-entitled universities, fee structures, and specialisations.").replace(/DegreeFYD/gi, "OnlineSiksha");
  const cleanTitle = String(title || "Verified University Advisory").replace(/DegreeFYD/gi, "OnlineSiksha");

  return (
    <section
      data-testid="course-counselling-banner"
      className={`my-3 sm:my-3.5 px-3.5 py-3 sm:px-4.5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#eef4ff] via-[#f5f8ff] to-[#edf4ff] border border-[#d5e3ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs overflow-hidden relative ${className}`}
      aria-label="Verified Academic Advisory"
    >
      <div className="min-w-0 flex-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold tracking-wide bg-[#e0ecff] text-[#115eaf] border border-[#c2daff] mb-1 sm:mb-1.5 shrink-0">
          <Headphones className="w-3 h-3 text-[#115eaf] shrink-0" aria-hidden="true" />
          <span>{cleanTitle}</span>
        </div>
        <h3 className="text-sm sm:text-[15px] font-bold text-[#000f22] mb-0.5 sm:mb-1 leading-snug">
          {cleanHeading}
        </h3>
        <p className="text-xs sm:text-[12.5px] text-[#43474d] mb-0 leading-relaxed">
          {cleanMessage}
        </p>
      </div>

      <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-1.5 sm:pt-0 border-t sm:border-0 border-[#d5e3ff]/60">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[#d5e3ff] shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/images/studentfigmaimg.png"
              alt="Academic Advisor"
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.currentTarget.src = "/logos/amazon.jpg"; }}
            />
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-bold text-[#000f22] leading-tight">Free Guidance</span>
            <span className="block text-[10px] text-emerald-700 font-semibold leading-tight">100% Unbiased</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCta}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-8.5 sm:h-9 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
