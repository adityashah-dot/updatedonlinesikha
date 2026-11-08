import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { UniversityData } from '../../types/university';

export interface RecruiterItem {
  name: string;
  logoUrl?: string;
  src?: string;
  url?: string;
  salary?: string;
}

export interface RecruitersGridProps {
  recruiters?: Array<RecruiterItem | string>;
  title?: string;
  subtitle?: string;
  note?: string;
  headingLevel?: 'h2' | 'h3';
  showHeading?: boolean;
  className?: string;
}

export interface UniversityPlacementsProps {
  university?: UniversityData;
  recruiters?: Array<RecruiterItem | string>;
  title?: string;
  subtitle?: string;
  note?: string;
  headingLevel?: 'h2' | 'h3';
  showHeading?: boolean;
  isCourse?: boolean;
}

export const RecruitersGrid: React.FC<RecruitersGridProps> = ({
  recruiters = [],
  title = "Top Corporate Recruiting Partners",
  subtitle = "MNC & Fortune 500 Employers",
  note = "",
  headingLevel = "h3",
  showHeading = true,
  className = "",
}) => {
  if (!recruiters || recruiters.length === 0) return null;

  const HeadingTag = headingLevel === "h2" ? "h2" : "h3";
  const headingClasses = headingLevel === "h2"
    ? "text-lg sm:text-xl font-bold text-[#000f22]"
    : "text-base font-semibold text-slate-900";

  return (
    <div className={`space-y-4 pt-2 ${className}`} data-testid="recruiters-showcase">
      {showHeading && (title || subtitle) ? (
        <div className="flex flex-wrap items-center justify-between gap-1">
          {title ? (
            <HeadingTag className={headingClasses}>
              {title}
            </HeadingTag>
          ) : null}
          {subtitle ? (
            <span className="text-xs text-slate-500">
              {subtitle}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {recruiters.map((recruiter, idx) => {
          const name = typeof recruiter === "string" ? recruiter : (recruiter.name || "Recruiter");
          const logoUrl = typeof recruiter === "object" ? (recruiter.logoUrl || recruiter.src || recruiter.url) : null;

          return (
            <div
              key={idx}
              className="h-24 bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 shadow-xs hover:border-slate-300 transition-colors"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={name}
                  className="max-h-8 max-w-[85px] object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.parentElement?.querySelector(".recruiter-fallback-name");
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
              ) : null}
              <span
                className={`recruiter-fallback-name text-xs font-bold text-slate-800 ${logoUrl ? "hidden" : ""}`}
              >
                {name}
              </span>
              <span className="text-[11px] font-medium text-slate-600 text-center truncate max-w-full">
                {name}
              </span>
            </div>
          );
        })}
      </div>

      {note ? (
        <p className="text-xs text-slate-500 pt-1">
          {note}
        </p>
      ) : null}
    </div>
  );
};

export const UniversityPlacements: React.FC<UniversityPlacementsProps> = ({
  university,
  recruiters: directRecruiters,
  title,
  subtitle,
  note,
  headingLevel,
  showHeading,
  isCourse = false,
}) => {
  if (isCourse || (!university?.placements && directRecruiters)) {
    return (
      <RecruitersGrid
        recruiters={directRecruiters || []}
        title={title}
        subtitle={subtitle}
        note={note}
        headingLevel={headingLevel}
        showHeading={showHeading}
      />
    );
  }

  if (!university || !university.placements) return null;

  return (
    <section id="placements" className="scroll-mt-32 space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          Placements & Career Acceleration
        </h2>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
          {university.placements.intro}
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {university.placements.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-xs"
          >
            <span className="block text-xs font-medium text-slate-500">
              {metric.label}
            </span>
            <span className="block text-2xl font-bold text-slate-900 tabular-nums mt-1">
              {metric.value}
            </span>
            {metric.note && (
              <span className="block text-xs text-slate-500 mt-1">
                {metric.note}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Career Support Services List */}
      {university.placements.supportServices && university.placements.supportServices.length > 0 && (
        <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-700" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Dedicated Career & Placement Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {university.placements.supportServices.map((service, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Recruiters Showcase */}
      {university.placements.recruiters && university.placements.recruiters.length > 0 && (
        <RecruitersGrid
          recruiters={university.placements.recruiters}
          title="Top Corporate Recruiting Partners"
          subtitle="MNC & Fortune 500 Employers"
          note={university.placements.note}
        />
      )}
    </section>
  );
};
