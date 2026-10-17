import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Download,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Quote,
  IndianRupee,
  Trophy,
  Users,
  Briefcase,
} from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import { ProgrammeCardsSection, ProgrammeCardData } from './ProgrammeCardsSection';
import { AdmissionFlowSteps } from './AdmissionFlowSteps';
import { BlogsSection } from './BlogsSection';
import { CompareCollegesSection } from './CompareCollegesSection';
import { AMITY_PAGE_CONTENT as AMITY } from '../data/universities/amityContent';
import { AMITY_UNIVERSITY_DATA } from '../data/universities/amity';

interface AmityOverviewViewProps {
  universityNavigation?: React.ReactNode;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenHelpDesk: () => void;
}

const TOC_ITEMS = [
  { id: 'latest-news', label: AMITY.latestNews.title },
  { id: 'highlights', label: 'Amity University Online Highlights 2026' },
  { id: 'courses-fees', label: 'Amity University Online Courses and Fees 2026' },
  { id: 'popular-programmes', label: 'Amity Online Popular Programmes' },
  { id: 'eligibility', label: AMITY.eligibility.title },
  { id: 'admission-process', label: AMITY.admission.title },
  { id: 'admission-dates', label: AMITY.admissionDates.title },
  { id: 'rankings', label: AMITY.rankings.title },
  { id: 'placements', label: AMITY.placements.title },
  { id: 'scholarships', label: AMITY.scholarships.title },
  { id: 'campus', label: AMITY.gallery.title },
  { id: 'examinations', label: AMITY.examinations.title },
  { id: 'sample-degree', label: AMITY.sampleDegree.title },
  { id: 'reviews-section', label: AMITY.testimonials.title },
  { id: 'blogs', label: 'Blogs' },
  { id: 'compare-colleges', label: 'Compare Colleges with Amity Online' },
];

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const AMITY_PROGRAMME_CARDS: ProgrammeCardData[] = AMITY_UNIVERSITY_DATA.courses.map((c) => ({
  id: c.id,
  title: c.name,
  subtitle: `${c.level === 'PG' ? 'Postgraduate' : 'Undergraduate'} Programme`,
  duration: c.duration.replace(/\s*\(.*\)/, ''),
  fee: c.totalFee,
  mode: 'Online',
  specialisations: c.specializations,
}));

const CAMPUS_IMAGES = [
  { src: AMITY.gallery.image, alt: 'Amity University Online Campus View' },
  { src: AMITY.gallery.image, alt: 'Amity University Online Campus Aerial View' },
];

export const AmityOverviewView: React.FC<AmityOverviewViewProps> = ({
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

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll('.am-exam-reveal')) as HTMLElement[];
    if (!revealNodes.length) return;

    if (!('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('show'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('show');
            }, index * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
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
            <span className="text-[#000f22] font-bold">Overview</span>
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
                {AMITY.title}
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
                {AMITY.heroDescription}
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
              <span className="block text-sm font-bold text-[#000f22] font-sans">
                {AMITY.quickStats.feeRange}
              </span>
              <span className="text-[10px] text-[#74777e]">Fee Range</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#115eaf] font-sans">
                {AMITY.quickStats.duration}
              </span>
              <span className="text-[10px] text-[#74777e]">Duration</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">Online</span>
              <span className="text-[10px] text-[#74777e]">Semester-based</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#B45309] font-sans">
                {AMITY.quickStats.placementRate}
              </span>
              <span className="text-[10px] text-[#74777e]">Placement Rate</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
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
            collapsedCount={7}
          />

          {/* 1. Latest News */}
          <section
            id="latest-news"
            className="page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff] scroll-mt-[130px]"
          >
            <h2 className="section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans">
              {AMITY.latestNews.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.latestNews.description}
            </p>
            <ul className="mt-3 space-y-2.5">
              {AMITY.latestNews.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#115eaf] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">{b}</p>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#74777e] font-normal mt-3">
              {AMITY.latestNews.date}
            </p>
          </section>

          {/* 2. Highlights */}
          <section
            id="highlights"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                Amity University Online Highlights 2026
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
              {AMITY.highlightsIntro}
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
                  {AMITY.highlightsTable.map((row) => (
                    <tr key={row.label} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-normal text-[#000f22]">{row.label}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                {AMITY.insightsBannerText}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={onOpenHelpDesk}
                  className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Users className="w-3.5 h-3.5" />
                  Talk to Expert
                </button>
              </div>
            </div>
          </section>

          {/* 3. Courses & Fees */}
          <section
            id="courses-fees"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-2xl font-bold text-[#000f22] font-sans">
              Amity University Online Courses and Fees 2026
            </h2>
            <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
              {AMITY.coursesIntro}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {AMITY.paymentOptions.map((opt) => (
                <span
                  key={opt}
                  className="px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]"
                >
                  {opt}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#43474d] leading-relaxed font-normal mt-3">
              {AMITY.coursesOutro}
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
                {AMITY.coursesPage.coursesFees.bannerText}
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
                  <CheckCircle className="w-3.5 h-3.5" />
                  Apply Now
                </button>
              </div>
            </div>
          </section>

          {/* 4. Popular Programmes */}
          <ProgrammeCardsSection
            sectionId="popular-programmes"
            title="Amity Online Popular Programmes"
            description={AMITY.popularProgrammesIntro}
            programmes={AMITY_PROGRAMME_CARDS}
            onOpenBrochure={() => onOpenBrochure()}
            onOpenApply={() => onOpenApply()}
          />

          {/* 5. Eligibility and Selection Criteria */}
          <section
            id="eligibility"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.eligibility.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.eligibility.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AMITY.eligibility.rows.map((row) => (
                    <tr key={row.course} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.course}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Admission Process */}
          <section
            id="admission-process"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.admission.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.admission.intro}
            </p>
            <p className="text-sm font-semibold text-[#000f22] mt-4">
              {AMITY.admission.stepsHeading}
            </p>
            <AdmissionFlowSteps steps={AMITY.admission.steps} />
            <h3 className="text-base font-semibold text-[#000f22] mt-5">
              {AMITY.admission.docsHeading}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {AMITY.admission.requiredDocuments.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">{doc}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 7. Admission Dates */}
          <section
            id="admission-dates"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {AMITY.admissionDates.title}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Intake 2026 Active
              </span>
            </div>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.admissionDates.intro}
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
                  {AMITY.admissionDates.table.map((row) => (
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
            <p className="text-[11px] text-[#74777e] font-normal mt-3">
              {AMITY.admissionDates.note}
            </p>
          </section>

          {/* 8. Rankings & Recognitions */}
          <section
            id="rankings"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.rankings.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.rankings.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Authority</th>
                    <th className="py-3 px-4 font-bold">Category</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AMITY.rankings.table.map((row) => (
                    <tr key={row.authority} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.authority}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.category}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">
                        <span className="inline-flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                {AMITY.rankings.bannerText}
              </p>
              <button
                onClick={onOpenHelpDesk}
                className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
              >
                Connect Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* 9. Placements */}
          <section
            id="placements"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.placements.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.placements.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Placement Support</th>
                    <th className="py-3 px-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AMITY.placements.table.map((row) => (
                    <tr key={row.label} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.label}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]">
              {AMITY.placements.stats.map((s) => (
                <div
                  key={s.label}
                  className="p-4 bg-[#f9f9ff] border border-[#e7eeff] rounded-xl text-center"
                >
                  <span className="block text-lg font-bold text-[#115eaf] font-sans tabular-nums">
                    {s.value}
                  </span>
                  <span className="block text-[10px] text-[#74777e] font-normal mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <h3 className="text-base font-semibold text-[#000f22] mt-5">Top Recruiters</h3>
            <div className="relative overflow-hidden mt-3">
              <div className="flex items-center gap-4 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
                {[
                  ...AMITY_UNIVERSITY_DATA.placements.recruiters,
                  ...AMITY_UNIVERSITY_DATA.placements.recruiters,
                ].map((r, idx) => (
                  <div
                    key={`${r.name}-${idx}`}
                    className="h-20 min-w-[125px] px-3.5 shrink-0 bg-white border border-[#e7eeff] rounded-xl p-3 flex flex-col items-center justify-center gap-1 shadow-xs"
                  >
                    {r.logoUrl ? (
                      <img
                        src={r.logoUrl}
                        alt={r.name}
                        className="max-h-7 max-w-[80px] object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs font-bold text-[#000f22]">{r.name}</span>
                    )}
                    <span className="text-[10px] font-medium text-[#43474d] text-center truncate max-w-full">
                      {r.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. Scholarships */}
          <section
            id="scholarships"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.scholarships.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.scholarships.intro}
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
                  {AMITY.scholarships.table.map((row) => (
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
              {AMITY.scholarships.notes.map((n) => (
                <li key={n} className="flex items-start gap-2 text-xs text-[#43474d]">
                  <span className="text-[#115eaf] mt-0.5">•</span>
                  {n}
                </li>
              ))}
            </ul>
          </section>

          {/* 11. Campus Gallery */}
          <section
            id="campus"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {AMITY.gallery.title}
              </h2>
              <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal">
                {AMITY.gallery.description}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Mode</th>
                    <th className="py-3 px-4 font-bold">How to Reach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {AMITY.gallery.travel.map((row) => (
                    <tr key={row.mode} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-3.5 px-4 font-normal text-[#000f22] align-top whitespace-nowrap">
                        {row.mode}
                      </td>
                      <td className="py-3.5 px-4 text-[#43474d] leading-relaxed font-normal">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <style>{`
              .amity-campus-marquee {
                overflow: hidden;
                position: relative;
                border-radius: 18px;
                border: 1px solid #e7eeff;
                background: #f0f3ff;
                margin-top: 18px;
                padding: 10px;
              }
              .amity-campus-marquee-track {
                display: flex;
                align-items: stretch;
                gap: 14px;
                width: max-content;
                padding-right: 10px;
                animation: amity-campus-marquee 24s linear infinite;
              }
              .amity-campus-marquee-track:hover {
                animation-play-state: paused;
              }
              .amity-campus-marquee-item {
                flex: 0 0 auto;
                width: min(320px, 72vw);
                background: #ffffff;
                overflow: hidden;
                border: 1px solid #e7eeff;
                border-radius: 18px;
                box-shadow: 0 10px 24px rgba(18, 37, 71, 0.08);
              }
              .amity-campus-marquee-item img {
                display: block;
                width: 100%;
                height: 220px;
                object-fit: cover;
                border-radius: 18px 18px 0 0;
              }
              .amity-campus-marquee-item figcaption {
                padding: 10px 12px;
                font-size: 11px;
                color: #43474d;
                background: white;
                border-top: 1px solid #e7eeff;
                border-radius: 0 0 18px 18px;
              }
              @keyframes amity-campus-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @media (max-width: 640px) {
                .amity-campus-marquee { padding: 8px; }
                .amity-campus-marquee-track { gap: 10px; }
                .amity-campus-marquee-item { width: min(280px, 80vw); }
                .amity-campus-marquee-item img { height: 180px; }
              }
            `}</style>

            <div className="amity-campus-marquee">
              <div className="amity-campus-marquee-track">
                {[...CAMPUS_IMAGES, ...CAMPUS_IMAGES].map((image, index) => (
                  <figure key={`${image.src}-${index}`} className="amity-campus-marquee-item">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 mt-[18px]">
              {['Noida Campus', 'Digital Learning', 'LMS Access', 'Student Support'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] text-[11px] font-normal text-[#115eaf]"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#74777e] font-normal mt-3">{AMITY.gallery.note}</p>
          </section>

          {/* 12. Examinations */}
          <section
            id="examinations"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.examinations.title}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {AMITY.examinations.intro}
            </p>
            <style>{`
              .am-exam-step {
                --am-exam-badge-w: 78px;
                position: relative;
                display: grid;
                grid-template-columns: calc(var(--am-exam-badge-w) + 18px) minmax(0, 1fr);
                padding-bottom: 30px;
              }
              .am-exam-step:last-child {
                padding-bottom: 0;
              }
              .am-exam-step:not(:last-child)::before {
                content: "";
                position: absolute;
                left: calc(var(--am-exam-badge-w) / 2 - 5px);
                top: 40px;
                bottom: 6px;
                width: 3px;
                background: repeating-linear-gradient(180deg, #0b2540 0 4px, transparent 4px 9px);
                animation: am-exam-flow-down 0.9s linear infinite;
              }
              @keyframes am-exam-flow-down {
                from { background-position: 0 0; }
                to { background-position: 0 9px; }
              }
              .am-exam-badge {
                width: var(--am-exam-badge-w);
                height: 34px;
                display: grid;
                place-items: center;
                background: #0b2540;
                color: #fff;
                font-size: 13px;
                font-weight: 600;
                clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
              }
              .am-exam-badge span {
                padding-right: 6px;
              }
              .am-exam-body h3 {
                margin: 2px 0 3px;
                font-size: 18px;
                font-weight: 600;
                line-height: 1.35;
                color: #000f22;
              }
              .am-exam-body p {
                margin: 0;
                font-size: 15px;
                line-height: 1.55;
                color: #43474d;
              }
              .am-exam-reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
              }
              .am-exam-reveal.show {
                opacity: 1;
                transform: none;
              }
              @media (max-width: 640px) {
                .am-exam-step {
                  --am-exam-badge-w: 66px;
                }
                .am-exam-badge {
                  font-size: 12px;
                }
                .am-exam-body h3 {
                  font-size: 16px;
                }
                .am-exam-body p {
                  font-size: 14px;
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .am-exam-step::before,
                .am-exam-reveal {
                  animation: none !important;
                  transition: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                }
              }
            `}</style>
            <div className="mt-[18px]">
              {AMITY.examinations.steps.map((step, index) => (
                <div key={step.title} className="am-exam-step am-exam-reveal">
                  <div>
                    <div className="am-exam-badge">
                      <span>Step {String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className="am-exam-body">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 13. Sample Degree */}
          <section
            id="sample-degree"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans">
              {AMITY.sampleDegree.title}
            </h2>
            <span className="block w-12 h-[4px] rounded-[4px] bg-[#115eaf] mt-1" />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-5 items-center mt-3">
              <div className="min-w-0 space-y-2.5">
                <p className="text-[13px] text-[#2d3137] leading-relaxed font-normal">
                  {AMITY.sampleDegree.description}
                </p>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#2d3137] font-normal leading-relaxed">
                    {AMITY.sampleDegree.badge}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#2d3137] font-normal leading-relaxed">
                    {AMITY.sampleDegree.badge2}
                  </p>
                </div>
                <button
                  onClick={() => onOpenBrochure()}
                  className="mt-1 px-4 py-2 rounded-xl bg-[#115eaf] text-white text-[11px] font-bold hover:bg-[#004689] active:scale-95 transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sample Degree Info
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#e7eeff] shadow-xs bg-white w-full sm:w-56 lg:w-64 shrink-0 justify-self-center sm:justify-self-end">
                <img
                  src={AMITY.sampleDegreeImage}
                  alt="Amity Online Sample Degree Certificate"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* 14. Reviews + FAQs */}
          <section
            id="reviews-section"
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
          >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {AMITY.testimonials.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
              {AMITY.testimonials.items.map((t) => (
                <div
                  key={t.studentName}
                  className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] flex flex-col"
                >
                  <Quote className="w-5 h-5 text-[#115eaf]/40 mb-2" />
                  <p className="text-xs text-[#2d3137] font-normal leading-relaxed flex-1">
                    {stripHtml(t.text)}
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

            <h3 className="text-lg font-bold text-[#000f22] font-sans mt-6">
              {AMITY.faqHeading}
            </h3>
            <div className="space-y-3 mt-3">
              {AMITY.faqs.map((faq, idx) => {
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

          {/* 15. Blogs */}
          <BlogsSection
            onOpenHelpDesk={onOpenHelpDesk}
            description={AMITY.blogsIntro}
            className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
          />

          {/* 16. Compare Colleges */}
          <CompareCollegesSection
            title="Compare Colleges with Amity Online"
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
