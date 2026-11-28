import { ArrowRight, Download } from "lucide-react";

const MAX_SPECS = 3;

export const ProgrammeCardsSection = ({
  sectionId,
  title,
  description,
  programmes = [],
  onOpenBrochure,
  onOpenApply,
}) => (
  <section
    id={sectionId}
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
    <h2 className="section-title text-lg sm:text-xl font-bold text-ink-900 font-sans">
      {title}
    </h2>
    <span className="block w-12 h-[4px] rounded-[4px] bg-brand-600 mt-1" />
    {description ? (
      <p className="section-description text-[13px] text-ink-700 leading-relaxed font-normal">
        {description}
      </p>
    ) : null}

    <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 mt-3">
      {programmes.map((programme) => {
        const specialisations = Array.isArray(programme.specialisations)
          ? programme.specialisations.filter(Boolean)
          : [];
        const uniqueSpecs = [...new Set(specialisations.map((s) => String(s).trim()).filter(Boolean))];
        const visibleSpecs = uniqueSpecs.slice(0, MAX_SPECS);
        const extraCount = Math.max(0, uniqueSpecs.length - MAX_SPECS);
        const subtitle = programme.level || programme.subtitle;
        const secondaryFee = programme.semesterFee || programme.mode;
        const secondaryFeeLabel = programme.semesterFee ? "Per Semester" : "Mode";

        return (
          <article
            key={programme.id || programme.title}
            className="flex min-w-0 flex-col rounded-xl border border-brand-100 border-l-[3px] border-l-brand-600 bg-white p-4 shadow-xs transition-colors hover:border-l-brand-700 sm:p-4"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <span className="inline-flex rounded-md bg-brand-100 px-2 py-1 text-[10px] font-medium text-brand-700">
                {subtitle || "Online Programme"}
              </span>
              {programme.duration ? (
                <span className="shrink-0 text-right text-[11px] leading-tight text-ink-500">
                  {programme.duration}
                  <span className="block text-[9px]">Duration</span>
                </span>
              ) : null}
            </div>

            <h3
              className="line-clamp-2 text-sm font-semibold leading-snug text-ink-900 font-sans"
              title={programme.title || ""}
            >
              {programme.title}
            </h3>

            {programme.description ? (
              <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-ink-700 sm:text-xs">
                {programme.description}
              </p>
            ) : null}

            <div className="mt-3 grid grid-cols-2 gap-3 border-y border-brand-50 py-2.5">
              <div className="min-w-0">
                <span className="block break-words text-xs leading-4 font-medium text-ink-900">
                  {programme.fee || "Fee not listed"}
                </span>
                <span className="block text-[9px] uppercase tracking-wide text-ink-500">
                  Total Fee
                </span>
              </div>
              <div className="min-w-0 border-l border-brand-100 pl-3">
                <span className="block break-words text-xs leading-4 font-medium text-brand-600">
                  {secondaryFee || "Online"}
                </span>
                <span className="block text-[9px] uppercase tracking-wide text-ink-500">
                  {secondaryFeeLabel}
                </span>
              </div>
            </div>

            {visibleSpecs.length > 0 ? (
              <div className="mt-2.5">
                <h4 className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-ink-500">
                  Specialisations
                </h4>
                <div className="flex flex-wrap gap-1">
                  {visibleSpecs.map((specialisation) => (
                    <span
                      key={specialisation}
                      className="rounded-[5px] border border-brand-200 bg-brand-50 px-1.5 py-0.5 text-[10px] leading-tight text-ink-700"
                    >
                      {specialisation}
                    </span>
                  ))}
                  {extraCount > 0 ? (
                    <span className="rounded-[5px] border border-brand-200 px-1.5 py-0.5 text-[10px] leading-tight font-semibold text-brand-600">
                      +{extraCount}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}

            {(onOpenBrochure || onOpenApply) ? (
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {onOpenBrochure ? (
                  <button
                    type="button"
                    onClick={onOpenBrochure}
                    className="min-h-10 rounded-lg border border-brand-600 bg-white px-2 text-[11px] font-semibold text-brand-600 transition-colors hover:bg-brand-50"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <Download className="h-3 w-3" />
                      Brochure
                    </span>
                  </button>
                ) : null}
                {onOpenApply ? (
                  <button
                    type="button"
                    onClick={onOpenApply}
                    className="min-h-10 rounded-lg bg-brand-600 px-2 text-[11px] font-semibold text-white transition-colors hover:bg-brand-700 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-1">
                      Apply Now
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  </section>
);
