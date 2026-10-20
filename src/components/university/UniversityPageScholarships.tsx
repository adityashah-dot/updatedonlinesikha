import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Sparkles,
  Calculator,
  ArrowRight,
  ChevronRight,
  UserCheck,
  PhoneCall,
} from 'lucide-react';
import { TableOfContents, TocItem } from '../TableOfContents';
import { BlogsListSection } from '../BlogsListSection';
import { SITE_BLOG_POSTS } from '../../data/siteBlogPosts';
import { sectionTitle } from '../../lib/sectionTitles';
import type { UniversityData } from '../../types/university';
import { ScholarshipPillarsGrid } from './ScholarshipPillarsGrid';
import type { ScholarshipPillar } from './ScholarshipPillarsGrid';

export interface ScholarshipRule {
  id: string;
  label: string;
  /** Percentage of tuition waived when this rule applies. */
  percent: number;
  /** Optional chip shown on the pillar card. */
  tag?: string;
  /** Optional condition text, e.g. "marks >= 85". */
  condition?: string;
}

export type { ScholarshipPillar };

interface UniversityPageScholarshipsProps {
  university: UniversityData;
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
  universityNavigation?: React.ReactNode;
  /** Per-university calculator rules. Calculator is hidden when empty. */
  scholarshipRules?: ScholarshipRule[];
  /** Six pillar cards. Pillars are hidden when empty. */
  pillars?: ScholarshipPillar[];
  /** Minimum marks slider range. */
  marksMin?: number;
  marksMax?: number;
}

const SCHOLARSHIPS_TOC_ITEMS: TocItem[] = [
  { id: 'scholarship-overview', label: 'Scholarships Overview' },
  { id: 'scholarship-calculator', label: 'Tuition Fee & Savings Calculator' },
  { id: 'scholarship-schemes', label: 'Scholarship Schemes & Concessions' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'counselor-helpline', label: 'Academic Counseling & Helpline' },
];

export const UniversityPageScholarships: React.FC<UniversityPageScholarshipsProps> = ({
  university,
  onOpenApply,
  onOpenHelpDesk,
  universityNavigation,
  scholarshipRules = [],
  pillars = [],
  marksMin = 50,
  marksMax = 98,
}) => {
  const [calcCourseId, setCalcCourseId] = useState(university.courses[0]?.id || '');
  const [marks, setMarks] = useState<number>(78);
  const [activeSection, setActiveSection] = useState<string>('scholarship-overview');

  const hasCalculator = scholarshipRules.length > 0;
  const hasPillars = pillars.length > 0;

  const tocItems = SCHOLARSHIPS_TOC_ITEMS.filter((item) => {
    if (item.id === 'scholarship-calculator') return hasCalculator;
    if (item.id === 'scholarship-schemes') return hasPillars;
    return true;
  });

  // Best matching rule: highest percent whose condition is met.
  const matchedRule = useMemo(() => {
    if (!hasCalculator) return null;
    let best: ScholarshipRule | null = null;
    for (const rule of scholarshipRules) {
      if (!rule.condition) {
        if (!best) best = rule;
        continue;
      }
      const m = rule.condition.match(/marks\s*>=\s*(\d+)/i);
      if (m && marks >= Number(m[1])) {
        if (!best || rule.percent > best.percent) best = rule;
      }
    }
    return best;
  }, [scholarshipRules, marks, hasCalculator]);

  const selectedCourse = university.courses.find((c) => c.id === calcCourseId) || university.courses[0];
  const totalFee = selectedCourse ? parseFee(selectedCourse.totalFee) : 0;
  const waiverPercent = matchedRule ? matchedRule.percent : 0;
  const savings = Math.round((totalFee * waiverPercent) / 100);
  const netPayable = totalFee - savings;

  const marksLabel = matchedRule ? matchedRule.label : 'Standard Grant';

  return (
    <div className="space-y-0">
      {/* Breadcrumb */}
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#43474d] font-medium">
            <Link to="/" className="hover:text-[#115eaf] cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <Link to="/universities" className="hover:text-[#115eaf] cursor-pointer">Colleges</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">{university.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="text-[#000f22] font-bold">Scholarships & Grants 2026</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-white border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <img
              src={university.logoImage}
              alt={`${university.shortName} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]">
                {sectionTitle(university.shortName, 'Scholarships')}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  #{university.nirfRanking} NIRF Rank
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  {university.naacGrade}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  UGC-DEB Entitled
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  100% Online
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4">
            <div className="order-2 lg:order-none lg:col-span-7 space-y-3">
              <p className="section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5 flex-wrap">
                {university.location} · {university.type} · Est. {university.established} ·{' '}
                <span className="inline-flex items-center gap-0.5 font-bold text-[#B45309]">{university.rating}</span>
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {university.feesAndFinancing.intro}
              </p>
            </div>

            <div className="order-1 lg:order-none lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
                  src={university.backgroundImage}
                  alt={`${university.name} Campus`}
                  className="w-full h-48 sm:h-60 lg:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]">
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">
                {hasCalculator ? `Up to ${Math.max(...scholarshipRules.map((r) => r.percent))}%` : 'Fee Concession'}
              </span>
              <span className="text-[10px] text-[#74777e]">Fee Waiver</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#115eaf] font-sans">Online</span>
              <span className="text-[10px] text-[#74777e]">Application Mode</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">UG &amp; PG</span>
              <span className="text-[10px] text-[#74777e]">Eligible Programs</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#B45309] font-sans">Free</span>
              <span className="text-[10px] text-[#74777e]">Counseling Support</span>
            </div>
            <div className="flex items-center gap-3 md:ml-auto">
              <button
                onClick={onOpenHelpDesk}
                className="px-5 py-2.5 rounded-xl bg-white text-[#115eaf] border border-[#115eaf] text-xs sm:text-sm font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Brochure
              </button>
              <button
                onClick={() => onOpenApply()}
                className="px-6 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-[10px]">
        {/* Table of Contents */}
        <TableOfContents
          title="Table of contents"
          items={tocItems}
          activeId={activeSection}
          onItemClick={(id) => setActiveSection(id)}
        />

        {/* OVERVIEW */}
        <section id="scholarship-overview" className="page-section text-center max-w-3xl mx-auto scroll-mt-[100px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            Fee Waivers &amp; Concessions 2026
          </span>
          <h1 className="section-title mt-3 text-3xl sm:text-4xl font-bold text-[#000f22] tracking-tight font-sans">
            {sectionTitle(university.shortName, 'Scholarships')}
          </h1>
          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            Check your eligibility for university fee concessions. Discounts are offered for high academic scorers,
            serving military and defence personnel, early enrolment applicants, and university alumni.
          </p>
        </section>

        {/* CALCULATOR */}
        {hasCalculator && (
          <section
            id="scholarship-calculator"
            className="page-section card bg-white rounded-2xl border-2 border-[#115eaf]/30 shadow-lg scroll-mt-[100px]"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="w-full lg:w-3/5 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#e7eeff]">
                  <Calculator className="w-5 h-5 text-[#115eaf]" />
                  <h3 className="font-bold text-base text-[#000f22] font-sans">
                    Calculate Your Net Tuition Fee &amp; Savings
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#000f22] uppercase tracking-wider mb-1.5">
                    Select Program
                  </label>
                  <select
                    value={calcCourseId}
                    onChange={(e) => setCalcCourseId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c4c6ce] text-base sm:text-sm font-semibold text-[#000f22] focus:border-[#115eaf] outline-none"
                  >
                    {university.courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.totalFee})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <label className="font-bold text-[#000f22] uppercase tracking-wider">
                      Qualifying Aggregate Marks: {marks}%
                    </label>
                    <span className="text-[#115eaf] font-normal">{marksLabel}</span>
                  </div>
                  <input
                    type="range"
                    min={marksMin}
                    max={marksMax}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-full h-2 bg-[#e7eeff] rounded-lg appearance-none cursor-pointer accent-[#115eaf]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#000f22] uppercase tracking-wider mb-2">
                    Special Welfare Categories
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {scholarshipRules
                      .filter((r) => r.condition)
                      .map((r) => (
                        <label
                          key={r.id}
                          className="tap-chip min-h-[44px] p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all border-[#e7eeff]"
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(matchedRule && matchedRule.id === r.id)}
                            readOnly
                            className="shrink-0 w-5 h-5 rounded text-[#115eaf]"
                          />
                          <span className="font-normal text-[#000f22]">{r.label}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              <div className="card w-full lg:w-2/5 rounded-2xl bg-gradient-to-br from-[#0b2540] to-[#000f22] text-white space-y-4 shadow-md">
                <div className="pb-3 border-b border-white/10">
                  <span className="text-[11px] font-bold text-[#b1c8eb] uppercase tracking-wider block">
                    Eligible Tuition Waiver
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">{waiverPercent}% Waiver</div>
                  <p className="text-xs text-emerald-400 mt-[7.5px]">
                    Total Fee Savings: ₹{savings.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#d8e3fb]">
                  <div className="flex justify-between">
                    <span className="text-[#768dad]">Standard Degree Fee:</span>
                    <span className="line-through text-[#768dad]">₹{totalFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Total Tuition:</span>
                    <span className="font-bold text-white text-sm">₹{netPayable.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-white/10">
                    <span className="font-bold">Net Per Semester:</span>
                    <span className="font-extrabold text-[#70aaff]">
                      ₹{Math.round(netPayable / (selectedCourse ? 4 : 1)).toLocaleString('en-IN')}/sem
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenApply(calcCourseId)}
                  className="w-full py-3 rounded-xl bg-[#115eaf] text-white text-xs font-bold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Claim {waiverPercent}% Scholarship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PILLARS */}
        {hasPillars && <ScholarshipPillarsGrid pillars={pillars} />}

        {/* BLOGS */}
        <BlogsListSection
          onOpenHelpDesk={onOpenHelpDesk}
          className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
          posts={university.blogs && university.blogs.posts ? university.blogs.posts : SITE_BLOG_POSTS}
        />

        {/* COUNSELOR CTA */}
        <section id="counselor-helpline" className="content-block bg-[#0b2540] text-white scroll-mt-[100px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="section-title text-lg sm:text-xl font-bold font-sans tracking-tight">
                Have Questions About Courses, Eligibility, or Fees?
              </h3>
              <p className="section-description text-xs sm:text-sm text-[#b1c8eb] font-normal">
                Speak directly with an Online Siksha university advisor. We review your documents, help generate your
                DEB ID, and guide your admission at zero cost.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenApply()}
                className="px-5 py-2.5 rounded-lg bg-[#115eaf] text-white text-xs sm:text-sm font-semibold shadow hover:bg-[#004689] active:scale-95 transition-all"
              >
                Book Free Counseling Call
              </button>
              <button
                onClick={onOpenHelpDesk}
                className="px-4 py-2.5 rounded-lg border border-[#768dad]/40 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-[#70aaff]" />
                <span>Call Helpline: 1800-889-4422</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function parseFee(fee: string): number {
  const digits = fee.replace(/[^\d]/g, '');
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

export default UniversityPageScholarships;
