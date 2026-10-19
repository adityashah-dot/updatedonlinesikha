import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Download,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import { BlogsListSection } from './BlogsListSection';
import { AMITY_PAGE_CONTENT as AMITY } from '../data/universities/amityContent';

interface AmityScholarshipsViewProps {
  universityNavigation?: React.ReactNode;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenHelpDesk: () => void;
}

const SP = AMITY.scholarshipPage;

const TOC_ITEMS = [
  { id: 'highlights', label: SP.highlights.title },
  { id: 'types', label: SP.types.title },
  { id: 'aonsat', label: SP.aonsat.title },
  { id: 'courses-covered', label: SP.coursesCovered.title },
  { id: 'benefits', label: SP.benefits.title },
  { id: 'how-to-apply', label: SP.howToApply.title },
  { id: 'documents', label: SP.documents.title },
  { id: 'comparison', label: SP.comparison.title },
  { id: 'scholarship-faqs', label: SP.faqHeading },
  { id: 'blogs', label: 'Blogs' },
];

export const AmityScholarshipsView: React.FC<AmityScholarshipsViewProps> = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
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
            <span className="text-[#000f22] font-bold">Scholarship</span>
          </nav>
        </div>
      </div>

      {/* HERO — LPU college-hero layout */}
      <section className="bg-white text-[#000f22] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <img
              src={AMITY.logoImage}
              alt={`${AMITY.shortName} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]">
                {SP.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  #{AMITY.nirfRanking} NIRF Rank
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  {AMITY.naacGrade}
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
            <div className="lg:col-span-7 space-y-3">
              <p className="section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                {AMITY.location} · {AMITY.type} · Est. {AMITY.established} ·{' '}
                <span className="inline-flex items-center gap-0.5 font-bold text-[#B45309]">
                  <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                  {AMITY.rating}
                </span>
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {SP.heroDescription}
              </p>
            </div>

            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
                  src={AMITY.heroImage}
                  alt="Amity University Online Campus"
                  className="w-full h-48 sm:h-60 lg:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]">
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">Up to 100%</span>
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
              <span className="text-[10px] text-[#74777e]">AONSAT Registration</span>
            </div>
            <div className="flex items-center gap-3 md:ml-auto">
              <button
                onClick={() => onOpenBrochure()}
                className="px-5 py-2.5 rounded-xl bg-white text-[#115eaf] border border-[#115eaf] text-xs sm:text-sm font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
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

          {/* 1. Scholarship Highlights */}
          <section
            id="highlights"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.highlights.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.highlights.intro}
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
                  {SP.highlights.rows.map((row) => (
                    <tr key={row.label} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-normal text-[#000f22]">{row.label}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Types of Scholarships */}
          <section
            id="types"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.types.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.types.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Scholarship Type</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                    <th className="py-3 px-4 font-bold">Scholarship Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {SP.types.rows.map((row) => (
                    <tr key={row.type} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.type}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.eligibility}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. AONSAT Scholarship */}
          <section
            id="aonsat"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.aonsat.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.aonsat.intro}
            </p>
            <ul className="mt-3 space-y-3">
              {SP.aonsat.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">{b}</p>
                </li>
              ))}
            </ul>
            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                {SP.aonsat.bannerText}
              </p>
              <button
                onClick={onOpenHelpDesk}
                className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Users className="w-3.5 h-3.5" />
                Talk to Expert
              </button>
            </div>
          </section>

          {/* 4. Courses Covered */}
          <section
            id="courses-covered"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.coursesCovered.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.coursesCovered.intro}
            </p>
            <h3 className="text-base font-semibold text-[#000f22] mt-5">
              {SP.coursesCovered.ugHeading}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {SP.coursesCovered.ug.map((row) => (
                    <tr key={row.course} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.course}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="text-base font-semibold text-[#000f22] mt-5">
              {SP.coursesCovered.pgHeading}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {SP.coursesCovered.pg.map((row) => (
                    <tr key={row.course} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.course}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Benefits */}
          <section
            id="benefits"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.benefits.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.benefits.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Benefit</th>
                    <th className="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {SP.benefits.rows.map((row) => (
                    <tr key={row.benefit} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.benefit}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. How to Apply */}
          <section
            id="how-to-apply"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.howToApply.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.howToApply.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[18px]">
              {SP.howToApply.steps.map((step, idx) => (
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

          {/* 7. Documents Required */}
          <section
            id="documents"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.documents.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.documents.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Document</th>
                    <th className="py-3 px-4 font-bold">Required For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {SP.documents.rows.map((row) => (
                    <tr key={row.document} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.document}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.requiredFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. Scholarship vs AONSAT */}
          <section
            id="comparison"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.comparison.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {SP.comparison.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Particulars</th>
                    <th className="py-3 px-4 font-bold">Amity Online Scholarship</th>
                    <th className="py-3 px-4 font-bold">AONSAT Scholarship</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {SP.comparison.rows.map((row) => (
                    <tr key={row.particular} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.particular}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.general}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.aonsat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                Ready to apply for Amity Online Scholarship 2026?
              </p>
              <button
                onClick={() => onOpenApply()}
                className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
              >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* 9. FAQs */}
          <section
            id="scholarship-faqs"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {SP.faqHeading}
            </h2>
            <div className="space-y-3 mt-[18px]">
              {SP.faqs.map((faq, idx) => {
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

          {/* 10. Blogs */}
          <BlogsListSection
            onOpenHelpDesk={onOpenHelpDesk}
            sectionId="blogs"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
          />
        </div>
      </div>
    </div>
  );
};
