import React from 'react';
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Download,
  GraduationCap,
  Calculator,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { UniversityData } from '../../types/university';

interface UniversityHeroProps {
  university: UniversityData;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenEmi: () => void;
  onOpenCounselor?: () => void;
}

export const UniversityHero: React.FC<UniversityHeroProps> = ({
  university,
  onOpenApply,
  onOpenBrochure,
  onOpenEmi,
  onOpenCounselor,
}) => {
  const logoImg = university.logoImage ? (
    <img
      src={university.logoImage}
      alt={`${university.name} official logo`}
      className="max-h-full max-w-full object-contain"
      referrerPolicy="no-referrer"
    />
  ) : (
    <GraduationCap className="w-12 h-12 text-blue-800" />
  );

  const topBadges = (
    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#115eaf]">
      <span className="inline-flex items-center gap-2 bg-[#f0f3ff] border border-[#d5e3ff] rounded-full px-2.5 py-1">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Admissions Open {university.verifiedYear || '2026'}
      </span>
      {university.officialWebsite && (
        <a
          href={`https://${university.officialWebsite}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#43474d] hover:text-[#115eaf]"
        >
          <span>{university.officialWebsite}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );

  const metaRow = (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#43474d] font-medium">
      <span className="text-[#115eaf] font-bold">{university.type || 'UGC-DEB Entitled'}</span>
      <span aria-hidden="true">·</span>
      <span className="flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-slate-400" />
        {university.location}
      </span>
      <span aria-hidden="true">·</span>
      <span className="flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        Est. {university.established}
      </span>
      {university.rating && (
        <>
          <span aria-hidden="true">·</span>
          <span className="text-amber-700 font-semibold">★ {university.rating} ({university.reviewsCount || '1.2k+'} reviews)</span>
        </>
      )}
    </div>
  );

  const taglineEl = (
    <p className="m-0 text-sm sm:text-base text-[#43474d] leading-relaxed">
      {university.tagline}
    </p>
  );

  const badges = (
    <div className="flex flex-wrap items-center gap-2 pt-0.5">
      {university.naacGrade && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          {university.naacGrade}
        </span>
      )}
      {university.nirfRanking && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          NIRF #{university.nirfRanking}
        </span>
      )}
      {university.approvals?.slice(0, 4).map((app, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full"
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          {app}
        </span>
      ))}
    </div>
  );

  const actions = (
    <>
      <button
        type="button"
        onClick={() => onOpenApply()}
        className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-white bg-[#1763b5] shadow-[0_3px_8px_rgba(23,99,181,0.14)] hover:bg-[#0d519b] transition-all duration-200 cursor-pointer"
      >
        Apply Now
        <span aria-hidden="true">→</span>
      </button>

      <button
        type="button"
        onClick={onOpenBrochure}
        className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-[#0b2342] bg-white border border-[#17375e] hover:bg-[#f5f8ff] transition-all duration-200 cursor-pointer"
      >
        <Download className="w-[17px] h-[17px]" />
        Download Brochure
      </button>

      {university.quickStats.emiStarting && (
        <button
          type="button"
          onClick={onOpenEmi}
          className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-[#115eaf] bg-[#f0f3ff] border border-[#d5e3ff] hover:bg-[#e6eeff] transition-all duration-200 cursor-pointer"
        >
          <Calculator className="w-[16px] h-[16px]" />
          EMI from {university.quickStats.emiStarting}
        </button>
      )}

      {onOpenCounselor && (
        <button
          type="button"
          onClick={onOpenCounselor}
          className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-[#0b2342] bg-white border border-[#d5e3ff] hover:bg-[#f8fbff] transition-all duration-200 cursor-pointer"
        >
          <PhoneCall className="w-[16px] h-[16px] text-emerald-600" />
          Free Counselling
        </button>
      )}
    </>
  );

  const imageBlock = (
    <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
      {university.backgroundImage ? (
        <img
          src={university.backgroundImage}
          alt={university.name}
          className="w-full h-56 sm:h-64 lg:h-[330px] object-cover block"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-56 sm:h-64 lg:h-[330px] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900" />
      )}
    </div>
  );

  const stats = (
    <>
      <div className="p-4 bg-[#f8faff] rounded-xl border border-[#e7eeff]">
        <span className="block text-[10px] text-[#43474d] font-medium uppercase tracking-[0.08em]">Fee Range</span>
        <span className="block text-base font-bold text-[#000f22] tabular-nums mt-1">{university.quickStats.feeRange}</span>
      </div>
      <div className="p-4 bg-[#f8faff] rounded-xl border border-[#e7eeff]">
        <span className="block text-[10px] text-[#43474d] font-medium uppercase tracking-[0.08em]">Duration</span>
        <span className="block text-base font-bold text-[#000f22] mt-1">{university.quickStats.duration}</span>
      </div>
      <div className="p-4 bg-[#f8faff] rounded-xl border border-[#e7eeff]">
        <span className="block text-[10px] text-[#43474d] font-medium uppercase tracking-[0.08em]">Mode</span>
        <span className="block text-base font-bold text-[#000f22] mt-1 truncate" title={university.quickStats.mode}>{university.quickStats.mode}</span>
      </div>
      <div className="p-4 bg-[#f8faff] rounded-xl border border-[#e7eeff]">
        <span className="block text-[10px] text-[#43474d] font-medium uppercase tracking-[0.08em]">Placement</span>
        <span className="block text-base font-bold text-emerald-700 tabular-nums mt-1">{university.quickStats.placementRate}</span>
      </div>
      <div className="p-4 bg-[#f8faff] rounded-xl border border-[#e7eeff]">
        <span className="block text-[10px] text-[#43474d] font-medium uppercase tracking-[0.08em]">Highest</span>
        <span className="block text-base font-bold text-[#115eaf] tabular-nums mt-1">{university.quickStats.highestPackage}</span>
      </div>
      <div className="p-4 bg-[#f8faff] rounded-xl border border-[#e7eeff]">
        <span className="block text-[10px] text-[#43474d] font-medium uppercase tracking-[0.08em]">EMI</span>
        <span className="block text-base font-bold text-[#000f22] tabular-nums mt-1">{university.quickStats.emiStarting}</span>
      </div>
    </>
  );

  return (
    <div className="relative bg-white border-b border-[#e7eeff]">
      {/* ===== Mobile (<= 767px): logo + name, then image, then text ===== */}
      <div className="md:hidden max-w-7xl mx-auto px-4 py-5">
        {topBadges}

        <div className="mt-4 flex items-start gap-3">
          <div className="w-16 h-16 rounded-xl bg-white border border-[#e7eeff] shadow-sm p-2 flex items-center justify-center shrink-0">
            {logoImg}
          </div>
          <h1 className="min-w-0 flex-1 m-0 text-[clamp(24px,6.5vw,32px)] font-extrabold tracking-[-0.02em] leading-[1.15] text-[#071a34]">
            {university.name}
          </h1>
        </div>

        <div className="mt-4">{imageBlock}</div>

        <div className="mt-4">{metaRow}</div>
        <div className="mt-2">{taglineEl}</div>
        <div className="mt-3">{badges}</div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">{actions}</div>

        <div className="mt-6 grid grid-cols-2 gap-3 pt-5 border-t border-[#e7eeff]">{stats}</div>
      </div>

      {/* ===== Desktop / tablet (>= 768px): unchanged ===== */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              {topBadges}

              <div className="mt-4 flex items-start gap-3 sm:gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white border border-[#e7eeff] shadow-sm p-2.5 flex items-center justify-center shrink-0">
                  {logoImg}
                </div>

                <div className="min-w-0 flex-1 space-y-2.5">
                  {metaRow}
                  <h1 className="m-0 text-[clamp(28px,3vw,42px)] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#071a34]">
                    {university.name}
                  </h1>
                  {taglineEl}
                  {badges}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">{actions}</div>
            </div>

            <div className="lg:col-span-5 lg:ml-2">{imageBlock}</div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-6 border-t border-[#e7eeff]">
            {stats}
          </div>
        </div>
      </div>
    </div>
  );
};
