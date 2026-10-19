import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  ArrowRight,
  ChevronRight,
  Calendar,
  IndianRupee,
  Star,
  Users,
  Calculator,
  BadgeCheck,
} from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import { ProgrammeCardsSection, ProgrammeCardData } from './ProgrammeCardsSection';
import { BlogsListSection } from './BlogsListSection';
import { CompareCollegesSection } from './CompareCollegesSection';
import { AMITY_PAGE_CONTENT as AMITY } from '../data/universities/amityContent';
import { AMITY_UNIVERSITY_DATA } from '../data/universities/amity';

interface AmityCoursesViewProps {
  universityNavigation?: React.ReactNode;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenEmi: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
}

const CP = AMITY.coursesPage;

const TOC_ITEMS = [
  { id: 'courses-fees', label: CP.coursesFees.title },
  { id: 'admission-dates', label: CP.admissionDates.title },
  { id: 'fee-structure', label: CP.feeStructure.title },
  { id: 'learning-system', label: CP.learningSystem.title },
  { id: 'all-courses', label: CP.streamWise.title },
  { id: 'student-reviews', label: CP.testimonials.title },
  { id: 'courses-faqs', label: CP.faqHeading },
  { id: 'blogs', label: 'Blogs' },
  { id: 'compare-colleges', label: 'Compare' },
];

const AMITY_PROGRAMME_CARDS: ProgrammeCardData[] = AMITY_UNIVERSITY_DATA.courses.map((c) => ({
  id: c.id,
  title: c.name,
  subtitle: `${c.level === 'PG' ? 'Postgraduate' : 'Undergraduate'} Programme`,
  duration: c.duration.replace(/\s*\(.*\)/, ''),
  fee: c.totalFee,
  mode: 'Online',
  specialisations: c.specializations,
}));

const HERO_METRICS = [
  { value: 'NAAC A+', label: 'Accreditation Grade' },
  { value: '100% Online', label: 'Classes & Exams from Home' },
  { value: '₹99K – ₹2.5L', label: 'Total Course Fee' },
  { value: `${AMITY_UNIVERSITY_DATA.courses.length} Programs`, label: 'UG & PG Online Degrees' },
];

export const AmityCoursesView: React.FC<AmityCoursesViewProps> = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenEmi,
  onOpenHelpDesk,
}) => {
  const [activeSection, setActiveSection] = useState<string>(TOC_ITEMS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-0">
      {/* Breadcrumb Bar — same as LPU */}
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-[#43474d] space-x-2 font-medium">
            <Link to="/" className="hover:text-[#115eaf] cursor-pointer">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <Link to="/universities" className="hover:text-[#115eaf] cursor-pointer">
              Colleges
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">{AMITY.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="text-[#000f22] font-bold">Courses &amp; Fees</span>
          </nav>
        </div>
      </div>

      {/* HERO — gradient courses hero with metrics + admissions card */}
      <section className="bg-gradient-to-br from-[#0b2540] via-[#0d3a66] to-[#115eaf] text-white border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-5 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Admissions Open for 2026
              </span>
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans mt-3">
                {CP.title}
              </h1>
              <p className="text-sm text-[#b1c8eb] leading-relaxed font-normal mt-3 max-w-[640px]">
                {CP.heroDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                {HERO_METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-white/10 border border-white/15 text-center backdrop-blur-sm"
                  >
                    <span className="block text-sm font-bold font-sans">{m.value}</span>
                    <span className="block text-[10px] text-[#b1c8eb] font-normal mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={() => onOpenApply()}
                  className="px-6 py-2.5 rounded-xl bg-white text-[#115eaf] text-xs sm:text-sm font-bold shadow hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Apply Online
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenBrochure()}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white border border-white/25 text-xs sm:text-sm font-bold hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Fee Brochure
                </button>
                <button
                  onClick={() => onOpenHelpDesk()}
                  className="px-5 py-2.5 rounded-xl bg-transparent text-white border border-white/25 text-xs sm:text-sm font-bold hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Talk to Academic Counselor
                </button>
              </div>
            </div>

            {/* Admissions Open card */}
            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl bg-white text-[#000f22] border border-white/20 shadow-lg p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold font-sans">Amity Online Admissions</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    Open
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-xl bg-[#f9f9ff] border border-[#e7eeff]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#115eaf]" />
                      <span className="text-[10px] text-[#74777e] font-normal">
                        {CP.admissionCard.deadlineLabel}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#000f22] mt-1">
                      {CP.admissionCard.deadline}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f9f9ff] border border-[#e7eeff]">
                    <div className="flex items-center gap-1.5">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-[#74777e] font-normal">
                        {CP.admissionCard.grantLabel}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#000f22] mt-1">
                      {CP.admissionCard.grant}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f9f9ff] border border-[#e7eeff]">
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-[#115eaf]" />
                      <span className="text-[10px] text-[#74777e] font-normal">
                        {CP.admissionCard.emiLabel}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#000f22] mt-1">
                      {CP.admissionCard.emi}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenApply()}
                  className="w-full mt-4 px-5 py-3 rounded-xl bg-[#115eaf] text-white text-sm font-bold hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-[#74777e] text-center mt-2 leading-relaxed">
                  {CP.admissionCard.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      {/* MAIN CONTENT — LPU section-container structure */}
      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-10">
        <div className="section-container">
          {/* Table of Contents */}
          <TableOfContents
            title="Table of contents"
            items={TOC_ITEMS}
            activeId={activeSection}
            onItemClick={(id) => setActiveSection(id)}
            defaultExpanded={false}
            collapsedCount={6}
          />

          {/* 1. EMI Banner */}
          <section className="page-section rounded-2xl bg-[#0b2540] text-white shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold font-sans">
                      {CP.feeStructure.emiBannerTitle}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                      0% Interest
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#b1c8eb] leading-relaxed font-normal mt-1.5">
                    {CP.feeStructure.emiBannerText}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenEmi()}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-[#0b2540] text-xs font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5" />
                Calculate Monthly EMI
              </button>
            </div>
          </section>

          {/* 2. Courses and Fees */}
          <section
            id="courses-fees"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {CP.coursesFees.title}
            </h2>
            <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
              {CP.coursesFees.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                    <th className="py-3 px-4 font-bold">Semester Fee</th>
                    <th className="py-3 px-4 font-bold">Total Fee</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AMITY_UNIVERSITY_DATA.courses.map((c) => (
                    <tr key={c.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{c.name}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{c.duration}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{c.feePerSemester}</td>
                      <td className="py-2.5 px-4 font-semibold text-[#115eaf]">{c.totalFee}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137] max-w-[220px]">
                        {c.eligibility}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                {CP.coursesFees.bannerText}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={onOpenHelpDesk}
                  className="px-4 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5"
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  View Fee Structure
                </button>
                <button
                  onClick={() => onOpenApply()}
                  className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </section>

          {/* 3. Admission Dates */}
          <section
            id="admission-dates"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {CP.admissionDates.title}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Intake 2026 Active
              </span>
            </div>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CP.admissionDates.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Event</th>
                    <th className="py-3 px-4 font-bold">Session</th>
                    <th className="py-3 px-4 font-bold">Tentative Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {CP.admissionDates.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                          {row.event}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.session}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Fee Structure */}
          <section
            id="fee-structure"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {CP.feeStructure.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CP.feeStructure.intro}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[18px]">
              <div>
                <h3 className="text-base font-semibold text-[#000f22]">
                  {CP.feeStructure.ugHeading}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-3">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0b2540] text-white">
                        <th className="py-3 px-4 font-bold">Program</th>
                        <th className="py-3 px-4 font-bold">Total Course Fees (Approx)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {CP.feeStructure.ug.map((row) => (
                        <tr key={row.program} className="hover:bg-[#f0f3ff]/60 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-[#000f22]">
                            {row.program}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-[#115eaf]">{row.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#000f22]">
                  {CP.feeStructure.pgHeading}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-3">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0b2540] text-white">
                        <th className="py-3 px-4 font-bold">Program</th>
                        <th className="py-3 px-4 font-bold">Total Course Fees (Approx)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {CP.feeStructure.pg.map((row) => (
                        <tr key={row.program} className="hover:bg-[#f0f3ff]/60 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-[#000f22]">
                            {row.program}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-[#115eaf]">{row.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#000f22] mt-5">Payment Options</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {CP.feeStructure.paymentOptions.map((opt) => (
                <span
                  key={opt}
                  className="px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]"
                >
                  {opt}
                </span>
              ))}
            </div>
          </section>

          {/* 5. Learning System */}
          <section
            id="learning-system"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {CP.learningSystem.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CP.learningSystem.intro}
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CP.learningSystem.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff]"
                >
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">{b}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. All Courses Stream Wise */}
          <ProgrammeCardsSection
            sectionId="all-courses"
            title={CP.streamWise.title}
            description={CP.streamWise.intro}
            programmes={AMITY_PROGRAMME_CARDS}
            onOpenBrochure={() => onOpenBrochure()}
            onOpenApply={() => onOpenApply()}
          />

          {/* 7. Student Reviews */}
          <section
            id="student-reviews"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {CP.testimonials.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
              {CP.testimonials.items.map((t) => (
                <div
                  key={t.studentName}
                  className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] flex flex-col"
                >
                  <span className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold mb-2">
                    <BadgeCheck className="w-3 h-3" />
                    Verified Student
                  </span>
                  <p className="text-xs text-[#2d3137] font-normal leading-relaxed flex-1">
                    {t.text}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#e7eeff]">
                    <div>
                      <p className="text-sm font-semibold text-[#000f22]">{t.studentName}</p>
                      <p className="text-[11px] text-[#74777e] font-normal">{t.profession}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < t.rating
                              ? 'fill-[#D97706] text-[#D97706]'
                              : 'text-[#c4c6ce]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Courses FAQs */}
          <section
            id="courses-faqs"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {CP.faqHeading}
            </h2>
            <div className="space-y-3 mt-[18px]">
              {CP.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#e7eeff] rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#f0f3ff]/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#000f22]">{faq.question}</span>
                      <span
                        className={`text-[#115eaf] text-lg leading-none shrink-0 transition-transform ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-4 text-xs sm:text-sm text-[#43474d] font-normal leading-relaxed border-t border-[#e7eeff] pt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 9. Blogs */}
          <BlogsListSection
            onOpenHelpDesk={onOpenHelpDesk}
            sectionId="blogs"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
          />

          {/* 10. Compare */}
          <CompareCollegesSection
            title="Compare"
            description={AMITY.compareIntro}
            logo={AMITY.logoImage}
            name={AMITY.title}
            location={AMITY.location}
            tags={['UGC-DEB Entitled', 'NAAC A+', `NIRF #${AMITY.nirfRanking}`, '100% Online']}
            onOpenBrochure={() => onOpenBrochure()}
            onOpenHelpDesk={onOpenHelpDesk}
          />
        </div>
      </div>
    </div>
  );
};
