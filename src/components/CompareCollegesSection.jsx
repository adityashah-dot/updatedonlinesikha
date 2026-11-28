import { MapPin, Download } from "lucide-react";
export const CompareCollegesSection = ({
  title,
  description,
  logo,
  name,
  location,
  tags,
  onOpenBrochure,
  onOpenHelpDesk,
  sectionId = "compare-colleges"
}) => {
  return <section
    id={sectionId}
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
      <h2 className="section-title text-lg sm:text-xl font-bold text-ink-900 font-sans">
        {title ?? "Compare"}
      </h2>
      <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
        {description}
      </p>

      {
    /* MAIN COMPARISON BOX — same as LPU */
  }
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-brand-100 rounded-2xl bg-white shadow-sm mt-[18px]">
        {
    /* SELECTED COLLEGE CARD */
  }
        <div className="min-h-[220px] rounded-xl border border-brand-100 bg-brand-50 p-4 flex flex-col justify-between">
          <div>
            <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-brand-100 text-brand-600 text-[11px] font-bold">
              Selected
            </span>

            <div className="flex gap-4 items-center">
              <div className="w-[115px] h-[85px] shrink-0 rounded-lg border border-brand-100 bg-white flex items-center justify-center overflow-hidden">
                {logo ? <img
                  src={logo}
                  alt={`${name} Logo`}
                  className="max-w-full max-h-full object-contain p-1.5"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                /> : null}
                <span className={`text-[17px] font-semibold text-brand-600 ${logo ? "hidden" : ""}`} aria-label={`${name} Logo`}>
                  {String(name || "").split(/\s+/).map((part) => part[0]).join("").slice(0, 4)}
                </span>
              </div>
              <div>
                <h3 className="mb-1.5 leading-tight font-extrabold text-ink-900 font-sans">
                  {name}
                </h3>
                <p className="mt-[7.5px] flex items-center gap-1.5 text-sm text-ink-700">
                  <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  {location}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => <span
    key={tag}
    className="px-2 py-1 rounded-[7px] bg-white border border-brand-200 text-[11px] font-normal text-ink-700"
  >
                  {tag}
                </span>)}
            </div>
          </div>

          <button
    onClick={() => onOpenBrochure?.()}
    className="w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg border border-brand-600 bg-white text-brand-600 text-sm font-bold hover:bg-brand-50 transition-all"
  >
            <Download className="w-4 h-4" />
            Brochure
          </button>
        </div>

        {
    /* VS */
  }
        <div className="compare-vs flex items-center justify-center">
          <span className="w-11 h-11 rounded-full flex items-center justify-center bg-brand-600 text-white text-sm font-extrabold">
            VS
          </span>
        </div>

        {
    /* ADD COLLEGE CARD */
  }
        <div className="min-h-[220px] rounded-xl border border-dashed border-brand-200 bg-canvas p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full border border-brand-200 bg-white flex items-center justify-center text-brand-600 text-2xl font-light mb-2.5">
            +
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-ink-900 font-sans">Add College</h3>
            <p className="mt-[7.5px] text-[13px] leading-relaxed text-ink-700 font-normal">
              Select another college to compare side by side.
            </p>
          </div>
          <button
    onClick={() => onOpenHelpDesk?.()}
    className="w-full h-11 mt-4 rounded-lg border-none bg-brand-600 text-white text-sm font-bold hover:bg-brand-900 transition-all"
  >
            Add College
          </button>
        </div>
      </div>
    </section>;
};
