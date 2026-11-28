import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Users
} from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ProgrammeCardsSection } from "./ProgrammeCardsSection";
import { AdmissionFlowSteps } from "./AdmissionFlowSteps";
import { BlogsListSection } from "./BlogsListSection";
import { CompareCollegesSection } from "./CompareCollegesSection";
import { AMITY_PAGE_CONTENT as AMITY } from "../data/universities/amityContent";
import { sectionTitle } from "../lib/sectionTitles";
import { AMITY_UNIVERSITY_DATA } from "../data/universities/amity";
const TOC_ITEMS = [
  { id: "latest-news", label: sectionTitle(AMITY.shortName, "Latest News & Updates") },
  { id: "highlights", label: sectionTitle(AMITY.shortName, "Highlights") },
  { id: "courses-fees", label: sectionTitle(AMITY.shortName, "Courses and Fees") },
  { id: "popular-programmes", label: sectionTitle(AMITY.shortName, "Popular Programmes") },
  { id: "eligibility-criteria", label: sectionTitle(AMITY.shortName, "Eligibility and Selection Criteria") },
  { id: "admission-process", label: sectionTitle(AMITY.shortName, "Admission Process") },
  { id: "admission-dates", label: sectionTitle(AMITY.shortName, "Admission Important Dates") },
  { id: "rankings", label: sectionTitle(AMITY.shortName, "Rankings and Accreditations") },
  { id: "examination-pattern", label: sectionTitle(AMITY.shortName, "Examination Pattern") },
  { id: "placements", label: sectionTitle(AMITY.shortName, "Placements") },
  { id: "scholarships", label: sectionTitle(AMITY.shortName, "Scholarships") },
  { id: "campus", label: sectionTitle(AMITY.shortName, "Campus") },
  { id: "sample-degree", label: sectionTitle(AMITY.shortName, "Sample Degree") },
  { id: "reviews-section", label: sectionTitle(AMITY.shortName, "Reviews & Ratings") },
  { id: "compare-colleges", label: "Compare Colleges with Amity Online" },
  { id: "blogs", label: "Blogs" },
  { id: "faqs", label: sectionTitle(AMITY.shortName, "Frequently Asked Questions") }
];
const stripHtml = (html) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const AMITY_PROGRAMME_CARDS = AMITY_UNIVERSITY_DATA.courses.map((c) => ({
  id: c.id,
  title: c.name,
  subtitle: `${c.level === "PG" ? "Postgraduate" : "Undergraduate"} Programme`,
  duration: c.duration.replace(/\s*\(.*\)/, ""),
  fee: c.totalFee,
  semesterFee: c.feePerSemester,
  description: c.description,
  mode: "Online",
  specialisations: c.specializations
}));
const CAMPUS_IMAGES = [
  { src: AMITY.gallery.image, alt: "Amity University Online Campus View" },
  { src: AMITY.gallery.image, alt: "Amity University Online Campus Aerial View" }
];
export const AmityOverviewView = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk
}) => {
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0].id);
  const [openFaq, setOpenFaq] = useState(0);
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(".am-exam-reveal"));
    if (!revealNodes.length) return;
    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("show"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
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
  return <div className="space-y-0">
      {
    /* Breadcrumb Bar — same as LPU */
  }
      <div className="bg-brand-50 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-ink-700 space-x-2 font-medium">
            <Link to="/" className="hover:text-brand-600 cursor-pointer">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
            <Link to="/universities" className="hover:text-brand-600 cursor-pointer">
              Colleges
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
            <span className="hover:text-brand-600 cursor-pointer">{AMITY.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
            <span className="text-ink-900 font-bold">Overview</span>
          </nav>
        </div>
      </div>

      {
    /* HERO — LPU college-hero layout */
  }
      <section className="bg-white text-ink-900 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-row items-start gap-3 sm:gap-5">
            <img
              src={AMITY.logo}
              alt="Amity University Online Logo"
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-xl sm:rounded-2xl bg-white border border-line p-1.5 shadow-sm shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="min-w-0">
              <h1 className="section-title text-[18px] sm:text-2xl md:text-3xl font-bold tracking-tight font-sans text-ink-900 max-w-2xl leading-tight">
                {AMITY.title}
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">
                  #{AMITY.nirfRanking} NIRF Rank
                </span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">
                  {AMITY.naacGrade}
                </span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">
                  UGC-DEB Entitled
                </span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">
                  100% Online
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-3 sm:gap-y-4 items-start mt-3 sm:mt-4">
            <div className="order-2 lg:order-none lg:col-span-7 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs sm:text-sm text-ink-700 flex-wrap">
                <p className="section-description text-xs sm:text-sm text-ink-700 font-normal flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{AMITY.location} · {AMITY.type} · Est. {AMITY.established}</span>
                </p>
                <span className="inline-flex items-center gap-1 font-bold text-accent-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-xs shrink-0">
                  <Star className="w-3 h-3 fill-accent-500 text-accent-500" />
                  {AMITY.rating}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal">
                {AMITY.heroDescription}
              </p>
            </div>

            <div className="order-1 lg:order-none lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-line shadow-xs bg-canvas">
                <img
                  src={AMITY.heroImage}
                  alt="Amity University Online Campus"
                  className="w-full h-44 sm:h-60 lg:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3 mt-4 sm:mt-5 lg:mr-[100px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-stretch gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="bg-brand-50 border border-brand-100 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-center min-w-0 lg:min-w-[110px] flex flex-col justify-center">
                <span className="block text-xs sm:text-sm font-bold text-ink-900 font-sans truncate">
                  {AMITY.quickStats.feeRange}
                </span>
                <span className="text-[10px] text-ink-500 mt-0.5">Fee Range</span>
              </div>
              <div className="bg-brand-50 border border-brand-100 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-center min-w-0 lg:min-w-[110px] flex flex-col justify-center">
                <span className="block text-xs sm:text-sm font-bold text-brand-600 font-sans truncate">
                  {AMITY.quickStats.duration}
                </span>
                <span className="text-[10px] text-ink-500 mt-0.5">Duration</span>
              </div>
              <div className="bg-brand-50 border border-brand-100 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-center min-w-0 lg:min-w-[110px] flex flex-col justify-center">
                <span className="block text-xs sm:text-sm font-bold text-ink-900 font-sans truncate">Online</span>
                <span className="text-[10px] text-ink-500 mt-0.5">Mode</span>
              </div>
              <div className="bg-brand-50 border border-brand-100 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-center min-w-0 lg:min-w-[110px] flex flex-col justify-center">
                <span className="block text-xs sm:text-sm font-bold text-accent-700 font-sans truncate">
                  {AMITY.quickStats.placementRate}
                </span>
                <span className="text-[10px] text-ink-500 mt-0.5">Placement Rate</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto lg:ml-auto">
              <button
                onClick={() => onOpenBrochure()}
                className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-white text-brand-600 border border-brand-600 text-xs sm:text-sm font-bold hover:bg-brand-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Brochure
              </button>
              <button
                onClick={() => onOpenApply()}
                className="h-9 sm:h-10 px-4 sm:px-6 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      {
    /* MAIN CONTENT — LPU section-container structure */
  }
      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-10">
        <div className="section-container">
          {
    /* Table of Contents */
  }
          <TableOfContents
    title="Table of contents"
    items={TOC_ITEMS}
    activeId={activeSection}
    onItemClick={(id) => setActiveSection(id)}
    defaultExpanded={false}
    collapsedCount={7}
  />

          {
    /* 1. Latest News */
  }
          <section
    id="latest-news"
    className="page-section card bg-brand-50 rounded-2xl border border-brand-200 scroll-mt-[130px]"
  >
            <h2 className="section-title text-lg sm:text-xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Latest News and Updates")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.latestNews.description}
            </p>
            <ul className="mt-3 space-y-2.5">
              {AMITY.latestNews.bullets.map((b) => <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700 leading-relaxed font-normal">{b}</p>
                </li>)}
            </ul>
            <p className="text-[11px] text-ink-500 font-normal mt-3">
              {AMITY.latestNews.date}
            </p>
          </section>

          {
    /* 2. Highlights */
  }
          <section
    id="highlights"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
<h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans md:whitespace-nowrap">
                 Amity University Online Highlights 2026

              </h2>
              <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2 bg-white text-brand-600 border border-brand-600 rounded-xl text-xs font-bold hover:bg-brand-50 transition-all flex items-center gap-1.5 shadow-xs"
  >
                <Download className="w-3.5 h-3.5" />
                <span>Download Brochure</span>
              </button>
            </div>
            <p className="section-description mt-[18px] text-sm font-normal text-ink-700 leading-relaxed">
              {AMITY.highlightsIntro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Particulars</th>
                    <th className="py-3 px-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.highlightsTable.map((row) => <tr key={row.label} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-900">{row.label}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.value}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>

            <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
              <p className="text-sm font-semibold text-ink-700 leading-relaxed">
                {AMITY.insightsBannerText}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
    onClick={onOpenHelpDesk}
    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
                  <Users className="w-3.5 h-3.5" />
                  Talk to Expert
                </button>
              </div>
            </div>
          </section>

          {
    /* 3. Courses & Fees */
  }
          <section
    id="courses-fees"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Courses and Fees")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.coursesIntro}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {AMITY.paymentOptions.map((opt) => <span
    key={opt}
    className="px-2 py-1 rounded-[7px] bg-white border border-brand-200 text-[11px] font-normal text-ink-700"
  >
                  {opt}
                </span>)}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed font-normal mt-3">
              {AMITY.coursesOutro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                    <th className="py-3 px-4 font-bold">Semester Fee</th>
                    <th className="py-3 px-4 font-bold">Total Fee</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY_UNIVERSITY_DATA.courses.map((c) => <tr key={c.id} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{c.name}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{c.duration}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{c.feePerSemester}</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-600">{c.totalFee}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700 max-w-[220px]">
                        {c.eligibility}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-ink-700 leading-relaxed">
                {AMITY.coursesPage.coursesFees.bannerText}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
    onClick={onOpenHelpDesk}
    className="px-4 py-2.5 bg-white text-brand-600 border border-brand-600 rounded-xl text-xs font-bold hover:bg-brand-50 transition-all flex items-center gap-1.5"
  >
                  <IndianRupee className="w-3.5 h-3.5" />
                  View Fee Structure
                </button>
                <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Apply Now
                </button>
              </div>
            </div>
          </section>

          {
    /* 4. Popular Programmes */
  }
          <ProgrammeCardsSection
    sectionId="popular-programmes"
    title="Amity Online Popular Programmes"
    description={AMITY.popularProgrammesIntro}
    programmes={AMITY_PROGRAMME_CARDS}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenApply={() => onOpenApply()}
  />

          {
    /* 5. Eligibility and Selection Criteria */
  }
          <section
    id="eligibility-criteria"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Eligibility and Selection Criteria")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.eligibility.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.eligibility.rows.map((row) => <tr key={row.course} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.course}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.eligibility}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 6. Admission Process */
  }
          <section
    id="admission-process"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Admission Process")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.admission.intro}
            </p>
            <p className="text-sm font-semibold text-ink-900 mt-4">
              {AMITY.admission.stepsHeading}
            </p>
            <AdmissionFlowSteps steps={AMITY.admission.steps} />
            <h3 className="text-base font-semibold text-ink-900 mt-5">
              {AMITY.admission.docsHeading}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {AMITY.admission.requiredDocuments.map((doc) => <li key={doc} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700 leading-relaxed font-normal">{doc}</p>
                </li>)}
            </ul>
          </section>

          {
    /* 7. Admission Dates */
  }
          <section
    id="admission-dates"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(AMITY.shortName, "Admission Important Dates")}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Intake 2026 Active
              </span>
            </div>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.admissionDates.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Event</th>
                    <th className="py-3 px-4 font-bold">Important Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.admissionDates.table.map((row) => <tr key={row.event} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          {row.event}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.date}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-ink-500 font-normal mt-3">
              {AMITY.admissionDates.note}
            </p>
          </section>

          {
    /* 8. Rankings & Recognitions */
  }
          <section
    id="rankings"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Rankings and Accreditations")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.rankings.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Authority</th>
                    <th className="py-3 px-4 font-bold">Category</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.rankings.table.map((row) => <tr key={row.authority} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.authority}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.category}</td>
                      <td className="py-3.5 px-4 font-normal text-brand-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {row.status}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-ink-700 leading-relaxed">
                {AMITY.rankings.bannerText}
              </p>
              <button
    onClick={onOpenHelpDesk}
    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
                Connect Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {
    /* 9. Placements */
  }
          <section
    id="examination-pattern"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Examination Pattern")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
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
                background: repeating-linear-gradient(180deg, #0b2a4d 0 4px, transparent 4px 9px);
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
                background: #0b2a4d;
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
                color: #101828;
              }
              .am-exam-body p {
                margin: 0;
                font-size: 15px;
                line-height: 1.55;
                color: #344054;
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
              {AMITY.examinations.steps.map((step, index) => <div key={step.title} className="am-exam-step am-exam-reveal">
                  <div>
                    <div className="am-exam-badge">
                      <span>Step {String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="am-exam-body">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>)}
            </div>
          </section>

<section
    id="placements"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Placements")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.placements.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Placement Support</th>
                    <th className="py-3 px-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.placements.table.map((row) => <tr key={row.label} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.label}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.value}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]">
              {AMITY.placements.stats.map((s) => <div
    key={s.label}
    className="p-4 bg-canvas border border-line rounded-xl text-center"
  >
                  <span className="block text-lg font-bold text-brand-600 font-sans tabular-nums">
                    {s.value}
                  </span>
                  <span className="block text-[10px] text-ink-500 font-normal mt-0.5">
                    {s.label}
                  </span>
                </div>)}
            </div>
            <h3 className="text-base font-semibold text-ink-900 mt-5">Top Recruiters</h3>
            <div className="relative overflow-hidden mt-3">
              <div className="flex items-center gap-4 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
                {[
    ...AMITY_UNIVERSITY_DATA.placements.recruiters,
    ...AMITY_UNIVERSITY_DATA.placements.recruiters
  ].map((r, idx) => <div
    key={`${r.name}-${idx}`}
    className="h-20 min-w-[125px] px-3.5 shrink-0 bg-white border border-line rounded-xl p-3 flex flex-col items-center justify-center gap-1 shadow-xs"
  >
                    {r.logoUrl ? <img
    src={r.logoUrl}
    alt={r.name}
    className="max-h-7 max-w-[80px] object-contain"
    loading="lazy"
  /> : <span className="text-xs font-bold text-ink-900">{r.name}</span>}
                    <span className="text-[10px] font-medium text-ink-700 text-center truncate max-w-full">
                      {r.name}
                    </span>
                  </div>)}
              </div>
            </div>
          </section>

          {
    /* 10. Scholarships */
  }
          <section
    id="scholarships"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Scholarships")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AMITY.scholarships.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Scholarship Type</th>
                    <th className="py-3 px-4 font-bold">Benefit</th>
                    <th className="py-3 px-4 font-bold">Eligible For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.scholarships.table.map((row) => <tr key={row.type} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.type}</td>
                      <td className="py-3.5 px-4 font-normal text-brand-600">{row.benefit}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.who}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <ul className="mt-3 space-y-2">
              {AMITY.scholarships.notes.map((n) => <li key={n} className="flex items-start gap-2 text-xs text-ink-700">
                  <span className="text-brand-600 mt-0.5">•</span>
                  {n}
                </li>)}
            </ul>
          </section>

          {
    /* 11. Campus Gallery */
  }
          <section
    id="campus"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(AMITY.shortName, "Campus")}
              </h2>
              <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed font-normal">
                {AMITY.gallery.description}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Mode</th>
                    <th className="py-3 px-4 font-bold">How to Reach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {AMITY.gallery.travel.map((row) => <tr key={row.mode} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-normal text-ink-900 align-top whitespace-nowrap">
                        {row.mode}
                      </td>
                      <td className="py-3.5 px-4 text-ink-700 leading-relaxed font-normal">
                        {row.detail}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>

            <style>{`
              .amity-campus-marquee {
                overflow: hidden;
                position: relative;
                border-radius: 18px;
                border: 1px solid #e6eefa;
                background: #f2f6fc;
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
                border: 1px solid #e6eefa;
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
                color: #344054;
                background: white;
                border-top: 1px solid #e6eefa;
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
                {[...CAMPUS_IMAGES, ...CAMPUS_IMAGES].map((image, index) => <figure key={`${image.src}-${index}`} className="amity-campus-marquee-item">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.alt}</figcaption>
                  </figure>)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 mt-[18px]">
              {["Noida Campus", "Digital Learning", "LMS Access", "Student Support"].map((item) => <span
    key={item}
    className="px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200 text-[11px] font-normal text-brand-600"
  >
                  {item}
                </span>)}
            </div>
            <p className="text-[11px] text-ink-500 font-normal mt-3">{AMITY.gallery.note}</p>
          </section>

          {
    /* 12. Examinations */
  }
          

          {
    /* 13. Sample Degree */
  }
          <section
    id="sample-degree"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Sample Degree")}
            </h2>
            <span className="block w-12 h-[4px] rounded-[4px] bg-brand-600 mt-1" />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-5 items-center mt-3">
              <div className="min-w-0 space-y-2.5">
                <p className="text-[13px] text-ink-700 leading-relaxed font-normal">
                  {AMITY.sampleDegree.description}
                </p>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-ink-700 font-normal leading-relaxed">
                    {AMITY.sampleDegree.badge}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-ink-700 font-normal leading-relaxed">
                    {AMITY.sampleDegree.badge2}
                  </p>
                </div>
                <button
    onClick={() => onOpenBrochure()}
    className="mt-1 px-4 py-2 rounded-xl bg-brand-600 text-white text-[11px] font-bold hover:bg-brand-700 active:scale-95 transition-all inline-flex items-center gap-1.5 shadow-sm"
  >
                  <Download className="w-3.5 h-3.5" />
                  Download Sample Degree Info
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-line shadow-xs bg-white w-full sm:w-56 lg:w-64 shrink-0 justify-self-center sm:justify-self-end">
                <img
    src={AMITY.sampleDegreeImage}
    alt="Amity Online Sample Degree Certificate"
    className="w-full object-contain"
    loading="lazy"
  />
              </div>
            </div>
          </section>

          {
    /* 14. Reviews + FAQs */
  }
          <section
    id="reviews-section"
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Reviews")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
              {AMITY.testimonials.items.map((t) => <div
    key={t.studentName}
    className="p-4 rounded-xl border border-line bg-canvas flex flex-col"
  >
                  <Quote className="w-5 h-5 text-brand-600/40 mb-2" />
                  <p className="text-xs text-ink-700 font-normal leading-relaxed flex-1">
                    {stripHtml(t.text)}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-line">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{t.studentName}</p>
                      <p className="text-[11px] text-ink-500 font-normal">{t.profession}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => <Star
    key={i}
    className={`w-3 h-3 ${i < t.rating ? "fill-accent-500 text-accent-500" : "text-line-strong"}`}
  />)}
                    </div>
                  </div>
                </div>)}
            </div>
          </section>

          {
    /* 15. Compare Colleges */
  }
          <CompareCollegesSection
    title="Compare Colleges with Amity Online"
    description={AMITY.compareIntro}
    logo={AMITY.logoImage}
    name={AMITY.title}
    location={AMITY.location}
    tags={["UGC-DEB Entitled", "NAAC A+", `NIRF #${AMITY.nirfRanking}`, "100% Online"]}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenHelpDesk={onOpenHelpDesk}
  />

          {
    /* 16. Blogs */
  }
          <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    sectionId="blogs"
    className="w-full rounded-2xl border border-line bg-canvas p-4 shadow-sm md:p-6"
    compact
    horizontal
    autoScroll
    showDescriptionOnMobile
    fetchLivePosts
  />

          {/* 17. Frequently Asked Questions — Last Section on Detail Page */}
          <section
            id="faqs"
            className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[130px] p-5 md:p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans m-0">
                {AMITY.faqHeading || "Frequently Asked Questions (Amity Online)"}
              </h2>
            </div>
            <div className="space-y-3">
              {AMITY.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-line rounded-xl overflow-hidden bg-white shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-brand-50/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-ink-900">{faq.question}</span>
                      <span
                        className={`text-brand-600 text-lg font-bold leading-none shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-4 text-xs sm:text-sm text-ink-700 font-normal leading-relaxed border-t border-line pt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Vertical Edge Tab — "Free Apply" */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={() => onOpenApply?.()}
          className="pointer-events-auto hidden h-[200px] w-12 items-center justify-center rounded-l-2xl bg-brand-600 shadow-md transition-colors hover:bg-brand-700 lg:flex cursor-pointer active:scale-95"
          aria-label="Free Apply"
        >
          <span className="block text-white text-sm font-semibold tracking-wide whitespace-nowrap -rotate-90">
            Free Apply
          </span>
        </button>
      </div>
    </div>;
};
