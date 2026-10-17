import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Download,
  ArrowRight,
  ChevronRight,
  Calendar,
  FileText,
  Users,
  BadgeCheck,
} from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import { AdmissionFlowSteps } from './AdmissionFlowSteps';
import { BlogsSection } from './BlogsSection';
import { CompareCollegesSection } from './CompareCollegesSection';
import { AMITY_PAGE_CONTENT as AMITY } from '../data/universities/amityContent';
import { AMITY_UNIVERSITY_DATA } from '../data/universities/amity';

interface AmityAdmissionViewProps {
  universityNavigation?: React.ReactNode;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenHelpDesk: () => void;
}

const AP = AMITY.admissionPage;

const TOC_ITEMS = [
  { id: 'admission-highlights', label: AP.highlights.title },
  { id: 'admission-dates', label: AP.dates.title },
  { id: 'eligibility-criteria', label: AP.eligibility.title },
  { id: 'admission-process', label: AP.admissionProcess.title },
  { id: 'application-process', label: AP.applicationProcess.title },
  { id: 'documents-required', label: AP.documents.title },
  { id: 'scholarship-schemes', label: AP.scholarships.title },
  { id: 'admission-faqs', label: AP.faqHeading },
  { id: 'student-reviews', label: AP.testimonials.title },
  { id: 'blogs', label: 'Blogs' },
  { id: 'compare-colleges', label: 'Compare' },
];

const ELIGIBILITY_VISIBLE = 6;

export const AmityAdmissionView: React.FC<AmityAdmissionViewProps> = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
}) => {
  const [activeSection, setActiveSection] = useState<string>(TOC_ITEMS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllEligibility, setShowAllEligibility] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackCourse, setCallbackCourse] = useState('');

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

  const eligibilityRows = showAllEligibility
    ? AP.eligibility.rows
    : AP.eligibility.rows.slice(0, ELIGIBILITY_VISIBLE);

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
            <span className="text-[#000f22] font-bold">Admission</span>
          </nav>
        </div>
      </div>

      {/* HERO — Admission Highlights */}
      <section className="bg-white text-[#000f22] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Admissions Open 2026
              </span>
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]">
                {AP.title}
              </h1>
              <p className="section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                {AMITY.location} · {AMITY.type} · Est. {AMITY.established}
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {AP.heroDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                {AP.statusStats.map((s) => (
                  <div
                    key={s.label}
                    className="p-3 bg-[#f0f3ff] border border-[#e7eeff] rounded-xl text-center"
                  >
                    <span className="block text-sm font-bold text-[#115eaf] font-sans tabular-nums">
                      {s.value}
                    </span>
                    <span className="block text-[10px] text-[#74777e] font-normal mt-0.5">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => onOpenApply()}
                  className="px-6 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenBrochure()}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#115eaf] border border-[#115eaf] text-xs sm:text-sm font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Brochure
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
                  src={AMITY.heroImage}
                  alt="Amity University Online Admission"
                  className="w-full h-48 sm:h-60 lg:h-72 object-cover"
                  loading="lazy"
                />
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

          {/* 1. Admission Highlights */}
          <section
            id="admission-highlights"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {AP.highlights.title}
              </h2>
              <button
                onClick={() => onOpenBrochure()}
                className="px-4 py-2 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Brochure</span>
              </button>
            </div>
            <p className="section-description mt-[18px] text-sm font-normal text-[#2d3137] leading-relaxed">
              {AP.highlights.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Particulars</th>
                    <th className="py-3 px-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AP.highlights.rows.map((row) => (
                    <tr key={row.label} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-normal text-[#000f22]">{row.label}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Admission Dates */}
          <section
            id="admission-dates"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {AP.dates.title}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Intake 2026 Active
              </span>
            </div>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AP.dates.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Event</th>
                    <th className="py-3 px-4 font-bold">Important Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AP.dates.rows.map((row) => (
                    <tr key={row.event} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                          {row.event}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#74777e] font-normal mt-3">{AP.dates.note}</p>
          </section>

          {/* 3. Eligibility & Selection Criteria */}
          <section
            id="eligibility-criteria"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {AP.eligibility.title}
              </h2>
              <button
                onClick={onOpenHelpDesk}
                className="text-xs font-bold text-[#115eaf] hover:underline cursor-pointer"
              >
                Need Free Eligibility Assessment?
              </button>
            </div>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AP.eligibility.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                    <th className="py-3 px-4 font-bold">Selection Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {eligibilityRows.map((row) => (
                    <tr key={row.course} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.course}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.eligibility}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.selection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {AP.eligibility.rows.length > ELIGIBILITY_VISIBLE && (
              <button
                type="button"
                onClick={() => setShowAllEligibility((v) => !v)}
                className="mt-3 px-4 py-2 rounded-xl border border-[#115eaf] text-[#115eaf] text-xs font-bold hover:bg-[#f0f3ff] transition-all cursor-pointer"
              >
                {showAllEligibility
                  ? 'Show Less'
                  : `Show All ${AP.eligibility.rows.length} Courses`}
              </button>
            )}
          </section>

          {/* 4. Admission Process */}
          <section
            id="admission-process"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AP.admissionProcess.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AP.admissionProcess.intro}
            </p>
            <AdmissionFlowSteps steps={AP.admissionProcess.steps} />
          </section>

          {/* 5. Application Process */}
          <section
            id="application-process"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {AP.applicationProcess.title}
              </h2>
              <button
                onClick={() => onOpenApply()}
                className="px-4 py-2 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
              >
                Start Application
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AP.applicationProcess.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[18px]">
              {AP.applicationProcess.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] flex items-start gap-3"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#115eaf] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#000f22]">{step.title}</h3>
                    <p className="text-xs text-[#43474d] font-normal mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Documents Required */}
          <section
            id="documents-required"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AP.documents.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-[18px]">
              {/* Dark guide card */}
              <div className="lg:col-span-4 rounded-2xl bg-[#0b2540] p-5 text-white flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verification Guide
                  </span>
                  <h3 className="text-lg font-bold font-sans mt-3">
                    Keep Your Documents Ready
                  </h3>
                  <p className="text-[13px] text-[#b1c8eb] leading-relaxed font-normal mt-2">
                    {AP.documents.intro}
                  </p>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/10">
                  <p className="text-[11px] text-white/85 leading-relaxed">
                    Tip: Upload colour scans in PDF/JPEG format, each under 5MB, to avoid
                    verification delays.
                  </p>
                </div>
              </div>

              {/* Documents grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AP.documents.items.map((doc) => (
                  <div
                    key={doc.name}
                    className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] flex items-start gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-[#115eaf] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#000f22] leading-snug">
                        {doc.name}
                      </p>
                      <span
                        className={`inline-block mt-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          doc.tag === 'Mandatory'
                            ? 'bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff]'
                            : doc.tag === 'For PG Tracks'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-[#f0f3ff] text-[#74777e] border border-[#e7eeff]'
                        }`}
                      >
                        {doc.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Scholarship Schemes */}
          <section
            id="scholarship-schemes"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AP.scholarships.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AP.scholarships.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Scholarship Type</th>
                    <th className="py-3 px-4 font-bold">Benefit</th>
                    <th className="py-3 px-4 font-bold">Eligible For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AP.scholarships.table.map((row) => (
                    <tr key={row.type} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.type}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.benefit}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-3 space-y-2">
              {AP.scholarships.notes.map((n) => (
                <li key={n} className="flex items-start gap-2 text-xs text-[#43474d]">
                  <span className="text-[#115eaf] mt-0.5">•</span>
                  {n}
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Admission Callback Banner */}
          <section className="page-section rounded-2xl bg-[#0b2540] text-white shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="section-title text-2xl sm:text-3xl font-extrabold font-sans">
                  Not Sure Which Program Fits You?
                </h2>
                <p className="section-description text-xs sm:text-sm text-[#b1c8eb] max-w-2xl leading-relaxed mt-2">
                  Get a free admission counselling session. Our experts will help you with
                  eligibility, fees, scholarships, and the right programme for your career goals.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/85">
                    <Users className="w-3.5 h-3.5" />
                    10,000+ students guided
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/85">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified admission support
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 text-[#000f22]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] text-sm outline-none focus:border-[#115eaf] transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] text-sm outline-none focus:border-[#115eaf] transition-colors"
                  />
                  <select
                    value={callbackCourse}
                    onChange={(e) => setCallbackCourse(e.target.value)}
                    className="sm:col-span-2 px-3 py-2.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] text-sm outline-none focus:border-[#115eaf] transition-colors text-[#43474d]"
                  >
                    <option value="">Select a Programme</option>
                    {AMITY_UNIVERSITY_DATA.courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenHelpDesk()}
                  className="w-full mt-3 px-5 py-3 rounded-xl bg-[#115eaf] text-white text-sm font-bold hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Request Callback
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-[#74777e] text-center mt-2">
                  By submitting, you agree to be contacted by DegreeFYD admission counsellors.
                </p>
              </div>
            </div>
          </section>

          {/* 9. Admission FAQs */}
          <section
            id="admission-faqs"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AP.faqHeading}
            </h2>
            <div className="space-y-3 mt-[18px]">
              {AP.faqs.map((faq, idx) => {
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

          {/* 10. Student Reviews */}
          <section
            id="student-reviews"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                  {AP.testimonials.title}
                </h2>
                <p className="text-xs text-[#74777e] font-normal mt-1">
                  Real feedback from Amity Online learners
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
              {AP.testimonials.items.map((t) => (
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
                  <div className="mt-3 pt-2.5 border-t border-[#e7eeff]">
                    <p className="text-sm font-semibold text-[#000f22]">{t.studentName}</p>
                    <p className="text-[11px] text-[#74777e] font-normal">{t.profession}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Blogs */}
          <BlogsSection
            onOpenHelpDesk={onOpenHelpDesk}
            description={AMITY.blogsIntro}
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
          />

          {/* 12. Compare */}
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
