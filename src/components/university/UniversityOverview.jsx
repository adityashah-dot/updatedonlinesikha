import { ShieldCheck, CheckCircle2, BookOpen } from "lucide-react";
export const UniversityOverview = ({ university }) => {
  return <section id="overview" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[110px] p-5 sm:p-6 md:p-8 space-y-6">
      {
    /* Editorial Title & Lead */
  }
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#000f22] tracking-[-0.02em] leading-snug">
          About {university.name}
        </h2>
        <div className="mt-2 space-y-2.5 text-[#43474d] text-sm sm:text-base leading-relaxed max-w-4xl">
          {university.overview.introParagraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
        </div>
      </div>

      {
    /* Latest News / Updates Banner (if present) */
  }
      {university.overview.latestNews && <div className="p-4 sm:p-5 rounded-xl bg-[#f0f3ff] border border-[#d5e3ff] flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-blue-900">Latest Admission Update</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span className="text-xs text-blue-700">{university.overview.latestNews.date}</span>
            </div>
            <h3 className="text-sm font-semibold text-[#000f22]">
              {university.overview.latestNews.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#43474d]">
              {university.overview.latestNews.description}
            </p>
          </div>
        </div>}

      {
    /* Institutional Highlights Grid / Table */
  }
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#000f22]">
            Key Institutional Highlights
          </h3>
          <span className="text-xs text-[#43474d] font-medium">
            Verified {university.verifiedYear || "2026"}
          </span>
        </div>

        <div className="bg-white border border-[#e7eeff] rounded-xl overflow-hidden shadow-xs">
          <div className="divide-y divide-[#e7eeff]">
            {university.overview.highlightsTable.map((item, idx) => <div
    key={idx}
    className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:px-6 hover:bg-[#f0f3ff]/60 transition-colors gap-1 sm:gap-4 items-baseline"
  >
                <div className="text-xs sm:text-sm font-medium text-[#43474d]">
                  {item.label}
                </div>
                <div className="sm:col-span-2 text-xs sm:text-sm font-semibold text-[#000f22]">
                  {item.value}
                </div>
              </div>)}
          </div>
        </div>

        {university.overview.highlightsSummary && <p className="text-xs text-[#43474d] leading-normal">
            {university.overview.highlightsSummary}
          </p>}
      </div>

      {
    /* UGC & Legal Validity Callout Card */
  }
      <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            Equivalence & Legal Validity of {university.shortName} Degree
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          As per University Grants Commission (UGC) Open and Distance Learning Regulations and Online
          Programmes Regulations, degrees earned through UGC-entitled online programs from recognized
          universities are treated as <strong className="text-white">fully equivalent</strong> to corresponding
          on-campus regular degrees for government recruitments (UPSC, SSC, State PSCs), corporate employment,
          and admission to higher education across India and globally.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Valid for All Govt Jobs
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            WES & Global Credential Approved
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Equal Status to Full-Time Degrees
          </span>
        </div>
      </div>
    </section>;
};
