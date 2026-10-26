import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock,
  CreditCard,
  Download,
  MapPin,
  Monitor,
  Star,
  TrendingUp,
  Video,
} from 'lucide-react';
import { DEGREEFYD_LPU_API } from '../data/apiData';

const FEATURE_ICONS = {
  'Exam Mode': Monitor,
  'Degree Duration': Clock,
  'Live Sessions': Video,
  'Highest CTC Record': TrendingUp,
};

export default function UniversityListingCard({
  university,
  isCompared,
  compareDisabled = false,
  onOpen,
  onOpenApply,
  onOpenBrochure,
  onToggleCompare,
}) {
  const u = university;
  const approvals = (u.approvals || []).filter((approval) => approval && approval !== u.naac).slice(0, 2);
  const tracks = u.tracks || [];
  const showOnwards = u.feeLabel && u.feeLabel !== 'Fee on request' && u.feeMin != null && u.feeMax == null && !/onwards/i.test(u.feeLabel);

  return (
    <article
      onClick={onOpen}
      className="relative flex min-w-0 cursor-pointer flex-col rounded-2xl border border-[#d5e3ff] bg-white p-5 shadow-xs transition-all duration-300 hover:border-[#115eaf] hover:shadow-xl md:p-6"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-[#e7eeff] pb-2.5 md:flex-row md:items-start">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#d5e3ff] bg-[#f0f3ff] shadow-xs">
            {u.logoImage || u.isLpu ? (
              <img
                src={u.logoImage || DEGREEFYD_LPU_API.hero.logoImage}
                alt={`${u.short} logo`}
                className="h-14 w-14 rounded-xl bg-white object-contain p-1"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <>
                <span className="text-lg font-bold tracking-tight text-[#115eaf]">{u.short}</span>
                <span className="-mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#43474d]">Online</span>
              </>
            )}
          </div>

          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2 className="line-clamp-2 text-base font-bold leading-snug text-[#000f22] sm:text-lg" title={u.name}>{u.name}</h2>
              {u.highlight?.text && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50">
                  <BadgeCheck className="h-3 w-3" />{u.highlight.text}
                </span>
              )}
            </div>

            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] font-normal text-[#43474d]">
              {u.location && <span className="inline-flex items-center gap-0.5"><MapPin className="h-3.5 w-3.5 text-[#74777e]" />{u.location}</span>}
              {u.established && <span>{u.location ? '•' : `Est. ${u.established}`}</span>}
              {u.established && u.location && <span>Est. {u.established}</span>}
              {u.rankNote && <span className="line-clamp-1 font-semibold text-[#B45309]" title={u.rankNote}>{u.rankNote}</span>}
            </p>

            {(u.naac || approvals.length > 0) && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {u.naac && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-900">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-600" />{u.naac}
                  </span>
                )}
                {approvals.map((approval) => (
                  <span key={approval} className="inline-flex shrink-0 items-center rounded-lg border border-[#d5e3ff] bg-[#f0f3ff] px-2.5 py-1 text-[11px] font-semibold text-[#115eaf]">{approval}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] p-3 text-left md:border-0 md:bg-transparent md:p-0 md:text-right">
          <span className="block text-[11px] font-semibold uppercase text-[#74777e]">Total Program Fee</span>
          <div className="text-xl font-bold text-[#000f22]">
            {u.feeLabel || 'Fee on request'}
            {showOnwards && <span className="text-xs font-normal text-[#43474d]"> onwards</span>}
          </div>
          {u.emi && (
            <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 shadow-xs">
              <CreditCard className="h-3 w-3" />EMI starts {u.emi}
            </div>
          )}
        </div>
      </div>

      <div className="my-4 grid grid-cols-2 gap-3 rounded-xl border border-[#e1e9ff] bg-[#f8f9ff] px-4 py-4 text-center sm:grid-cols-4 sm:text-left md:gap-4">
        {u.specs.map((feature) => {
          const Icon = FEATURE_ICONS[feature.label] || Building2;
          return (
            <div key={feature.label} className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase text-[#74777e]">{feature.label}</span>
              <span className={`mt-0.5 flex items-center justify-center gap-1 text-[13px] font-medium sm:justify-start ${feature.highlight ? 'text-emerald-700' : 'text-[#000f22]'}`}>
                <Icon className={`h-3.5 w-3.5 shrink-0 ${feature.highlight ? 'text-emerald-600' : 'text-[#115eaf]'}`} />
                <span className="min-w-0 break-words">{feature.value || '—'}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col justify-between gap-2.5 pt-2 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] font-semibold uppercase text-[#74777e]">Popular Tracks:</span>
          {tracks.slice(0, 4).map((track) => (
            <span key={track} onClick={(event) => event.stopPropagation()} className="cursor-pointer rounded-full border border-[#d5e3ff] bg-white px-3 py-1 text-xs font-medium text-[#000f22] transition-colors hover:border-[#115eaf]">{track}</span>
          ))}
          {tracks.length > 4 && (
            <span onClick={(event) => event.stopPropagation()} className="cursor-pointer rounded-full border border-[#d5e3ff] bg-[#f0f3ff] px-3 py-1 text-xs font-semibold text-[#115eaf]">+{tracks.length - 4} more</span>
          )}
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:shrink-0">
          <label onClick={(event) => event.stopPropagation()} className="flex min-h-11 cursor-pointer select-none items-center gap-1.5 py-1.5 text-[13px] font-medium text-[#43474d] hover:text-[#000f22] sm:mr-2">
            <input type="checkbox" checked={isCompared} disabled={compareDisabled} onChange={onToggleCompare} className="h-4 w-4 rounded border-[#c4c6ce] text-[#115eaf] disabled:cursor-not-allowed disabled:opacity-50" />
            <span>Compare</span>
          </label>
          <button onClick={(event) => { event.stopPropagation(); onOpenBrochure(); }} className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-[#d5e3ff] bg-[#f0f3ff] px-3.5 py-1.5 text-xs font-semibold text-[#000f22] transition-colors hover:bg-[#dee8ff]">
            <Download className="h-4 w-4" /><span>Brochure</span>
          </button>
          <button onClick={(event) => { event.stopPropagation(); onOpenApply(); }} className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-[#115eaf] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#004689] active:scale-95">
            <span>Apply Now</span><ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
