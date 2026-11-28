import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Download,
  ArrowRight,
  ChevronRight,
  Calendar,
  FileText,
  Users,
  BadgeCheck
} from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { AdmissionFlowSteps } from "./AdmissionFlowSteps";
import { BlogsListSection } from "./BlogsListSection";
import { CompareCollegesSection } from "./CompareCollegesSection";
import { AMITY_PAGE_CONTENT as AMITY } from "../data/universities/amityContent";
import { sectionTitle } from "../lib/sectionTitles";
import { AMITY_UNIVERSITY_DATA } from "../data/universities/amity";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";
const AP = AMITY.admissionPage;
const TOC_ITEMS = [
  { id: "admission-highlights", label: sectionTitle(AMITY.shortName, "Admission Highlights") },
  { id: "admission-dates", label: sectionTitle(AMITY.shortName, "Admission Important Dates") },
  { id: "eligibility-criteria", label: sectionTitle(AMITY.shortName, "Eligibility & Selection Criteria") },
  { id: "admission-process", label: sectionTitle(AMITY.shortName, "Admission Process") },
  { id: "application-process", label: sectionTitle(AMITY.shortName, "Application Process") },
  { id: "examination-pattern", label: sectionTitle(AMITY.shortName, "Examination Pattern") },
  { id: "documents-required", label: sectionTitle(AMITY.shortName, "Documents Required for Admission") },
  { id: "scholarship-schemes", label: sectionTitle(AMITY.shortName, "Scholarship") },
  { id: "admission-faqs", label: sectionTitle(AMITY.shortName, "Admission FAQs") },
  { id: "student-reviews", label: sectionTitle(AMITY.shortName, "Student Reviews") },
  { id: "blogs", label: "Blogs" },
  { id: "compare-colleges", label: "Compare" }
];
const ELIGIBILITY_VISIBLE = 6;
export const AmityAdmissionView = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk
}) => {
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0].id);
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllEligibility, setShowAllEligibility] = useState(false);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackEmail, setCallbackEmail] = useState("");
  const [callbackCourse, setCallbackCourse] = useState("");
  const [callbackError, setCallbackError] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
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
  const eligibilityRows = showAllEligibility ? AP.eligibility.rows : AP.eligibility.rows.slice(0, ELIGIBILITY_VISIBLE);
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
            <span className="text-ink-900 font-bold">Admission</span>
          </nav>
        </div>
      </div>

      {
    /* HERO — Admission Highlights */
  }
      <section className="bg-white text-ink-900 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Admissions Open 2026
              </span>
              <h1 className="section-title font-bold tracking-tight font-sans text-ink-900">
                {AP.title}
              </h1>
              <p className="section-description text-xs sm:text-sm text-ink-700 font-normal flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                {AMITY.location} · {AMITY.type} · Est. {AMITY.established}
              </p>
              <p className="text-sm text-ink-700 leading-relaxed font-normal">
                {AP.heroDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                {AP.statusStats.map((s) => <div
    key={s.label}
    className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-center"
  >
                    <span className="block text-sm font-bold text-brand-600 font-sans tabular-nums">
                      {s.value}
                    </span>
                    <span className="block text-[10px] text-ink-500 font-normal mt-0.5">
                      {s.label}
                    </span>
                  </div>)}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
    onClick={() => onOpenApply()}
    className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
    onClick={() => onOpenBrochure()}
    className="px-5 py-2.5 rounded-xl bg-white text-brand-600 border border-brand-600 text-xs sm:text-sm font-bold hover:bg-brand-50 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                  <Download className="w-4 h-4" />
                  Download Brochure
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-brand-100 shadow-xs bg-canvas">
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
    collapsedCount={6}
  />

          {
    /* 1. Admission Highlights */
  }
          <section
    id="admission-highlights"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(AMITY.shortName, "Admission Highlights")}
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
              {AP.highlights.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Particulars</th>
                    <th className="py-3 px-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {AP.highlights.rows.map((row) => <tr key={row.label} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-900">{row.label}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.value}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 2. Admission Dates */
  }
          <section
    id="admission-dates"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
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
              {AP.dates.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Event</th>
                    <th className="py-3 px-4 font-bold">Important Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {AP.dates.rows.map((row) => <tr key={row.event} className="hover:bg-brand-50/60 transition-colors">
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
            <p className="text-[11px] text-ink-500 font-normal mt-3">{AP.dates.note}</p>
          </section>

          {
    /* 3. Eligibility & Selection Criteria */
  }
          <section
    id="eligibility-criteria"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(AMITY.shortName, "Eligibility & Selection Criteria")}
              </h2>
              <button
    onClick={onOpenHelpDesk}
    className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
  >
                Need Free Eligibility Assessment?
              </button>
            </div>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AP.eligibility.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                    <th className="py-3 px-4 font-bold">Selection Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {eligibilityRows.map((row) => <tr key={row.course} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.course}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.eligibility}</td>
                      <td className="py-3.5 px-4 font-normal text-brand-600">{row.selection}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            {AP.eligibility.rows.length > ELIGIBILITY_VISIBLE && <button
    type="button"
    onClick={() => setShowAllEligibility((v) => !v)}
    className="mt-3 px-4 py-2 rounded-xl border border-brand-600 text-brand-600 text-xs font-bold hover:bg-brand-50 transition-all cursor-pointer"
  >
                {showAllEligibility ? "Show Less" : `Show All ${AP.eligibility.rows.length} Courses`}
              </button>}
          </section>

          {
    /* 4. Admission Process */
  }
          <section
    id="admission-process"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Admission Process")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AP.admissionProcess.intro}
            </p>
            <AdmissionFlowSteps steps={AP.admissionProcess.steps} />
          </section>

          {
    /* 5. Application Process */
  }
          <section
    id="application-process"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(AMITY.shortName, "Application Process")}
              </h2>
              <button
    onClick={() => onOpenApply()}
    className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
                Start Application
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AP.applicationProcess.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[18px]">
              {AP.applicationProcess.steps.map((step, idx) => <div
    key={step.title}
    className="p-4 rounded-xl border border-brand-100 bg-canvas flex items-start gap-3"
  >
                  <span className="w-8 h-8 rounded-lg bg-brand-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink-900">{step.title}</h3>
                    <p className="text-xs text-ink-700 font-normal mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>)}
            </div>
          </section>

          {
    /* 6. Examination Pattern — matches LPU Admission tab */
  }
          <section
    id="examination-pattern"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              Amity University Online Examination Pattern
            </h2>
            <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed">
              Amity University Online conducts semester-based examinations through a secure online proctored system. The
              evaluation combines continuous internal assessments with end-term examinations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-[18px]">
              {(AP.examination?.steps ?? []).map((step, idx) => <div
    key={idx}
    className="p-4 rounded-xl bg-canvas border border-brand-100 flex gap-3 items-start"
  >
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-xs text-ink-900">{step.title}</h3>
                    <p className="text-[11px] text-ink-700 leading-relaxed mt-[7.5px]">{step.description}</p>
                  </div>
                </div>)}
            </div>
          </section>

          {
    /* 7. Documents Required */
  }
          <section
    id="documents-required"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Documents Required for Admission")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-[18px]">
              {
    /* Dark guide card */
  }
              <div className="lg:col-span-4 rounded-2xl bg-brand-900 p-5 text-white flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verification Guide
                  </span>
                  <h3 className="text-lg font-bold font-sans mt-3">
                    Keep Your Documents Ready
                  </h3>
                  <p className="text-[13px] text-brand-300 leading-relaxed font-normal mt-2">
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

              {
    /* Documents grid */
  }
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AP.documents.items.map((doc) => <div
    key={doc.name}
    className="p-4 rounded-xl border border-brand-100 bg-canvas flex items-start gap-2.5"
  >
                    <FileText className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-ink-900 leading-snug">
                        {doc.name}
                      </p>
                      <span
    className={`inline-block mt-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${doc.tag === "Mandatory" ? "bg-brand-100 text-brand-600 border border-brand-200" : doc.tag === "For PG Tracks" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-brand-50 text-ink-500 border border-brand-100"}`}
  >
                        {doc.tag}
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>
          </section>

          {
    /* 7. Scholarship Schemes */
  }
          <section
    id="scholarship-schemes"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Scholarship")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {AP.scholarships.intro}
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
                <tbody className="divide-y divide-brand-100">
                  {AP.scholarships.table.map((row) => <tr key={row.type} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.type}</td>
                      <td className="py-3.5 px-4 font-normal text-brand-600">{row.benefit}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.who}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <ul className="mt-3 space-y-2">
              {AP.scholarships.notes.map((n) => <li key={n} className="flex items-start gap-2 text-xs text-ink-700">
                  <span className="text-brand-600 mt-0.5">•</span>
                  {n}
                </li>)}
            </ul>
          </section>

          {
    /* 9. Admission Callback Banner — matches LPU counseling-callback */
  }
          <section
    id="counseling-callback"
    className="page-section relative isolate overflow-hidden rounded-[20px] border border-brand-200 bg-gradient-to-br from-brand-50 via-canvas to-white p-5 sm:p-6 text-brand-900 shadow-sm scroll-mt-[130px]"
  >
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="section-title text-2xl sm:text-3xl font-bold text-brand-900 font-sans">
                  Not Sure Which <span className="text-brand-500">Program Fits You?</span>
                </h2>
                <p className="section-description text-xs sm:text-sm text-ink-500 max-w-2xl leading-relaxed mt-2">
                  Get a free admission counselling session. Our experts will help you with
                  eligibility, fees, scholarships, and the right programme for your career goals.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-900">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Verified admission support
                  </span>
                </div>
              </div>

              <div className="rounded-[18px] border border-white/90 bg-white/95 p-4 sm:p-5 text-ink-900 shadow-sm">
                {callbackError && (
                  <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {callbackError}
                  </div>
                )}
                {callbackSubmitted ? (
                  <div className="py-4 text-center space-y-2 text-xs">
                    <BadgeCheck className="w-8 h-8 text-emerald-600 mx-auto" />
                    <span className="font-bold text-ink-900 block">Callback Requested!</span>
                    <p className="text-ink-700">We will call you at +91 {callbackPhone} shortly.</p>
                  </div>
                ) : (
                <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    aria-label="Your Name *" placeholder="Your Name *"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-line-strong bg-white text-sm text-ink-900 outline-none focus:border-brand-600 transition-colors"
                  />
                  <input
                    type="email"
                    aria-label="Email Address *" placeholder="Email Address *"
                    required
                    value={callbackEmail}
                    onChange={(e) => setCallbackEmail(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-line-strong bg-white text-sm text-ink-900 outline-none focus:border-brand-600 transition-colors"
                  />
                  <div className="relative flex items-center sm:col-span-2">
                    <span className="absolute left-3 text-xs font-bold text-ink-900">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      pattern={INDIAN_PHONE_PATTERN}
                      title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                      required
                      aria-label="10-digit Mobile Number *" placeholder="10-digit Mobile Number *"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(sanitizeIndianPhone(e.target.value))}
                      className="w-full pl-11 pr-3 py-2.5 rounded-xl border border-line-strong bg-white text-sm text-ink-900 outline-none focus:border-brand-600 transition-colors"
                    />
                  </div>
                  <select aria-label="Programme"
                    value={callbackCourse}
                    onChange={(e) => setCallbackCourse(e.target.value)}
                    className="sm:col-span-2 px-3 py-2.5 rounded-xl border border-line-strong bg-white text-sm outline-none focus:border-brand-600 transition-colors text-ink-900"
                  >
                    <option value="">Select a Programme</option>
                    {AMITY_UNIVERSITY_DATA.courses.map((c) => <option key={c.id} value={c.id}>
                        {c.name}
                      </option>)}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCallbackError("");
                    const validation = validateLeadFields({
                      name: callbackName,
                      phone: callbackPhone,
                      email: callbackEmail,
                      requireName: true,
                      requireEmail: true
                    });
                    if (!validation.valid) {
                      setCallbackError(validation.error);
                      return;
                    }
                    const selectedCourse = AMITY_UNIVERSITY_DATA.courses.find((c) => c.id === callbackCourse);
                    submitLead({
                      name: callbackName,
                      phone_number: validation.cleanPhone,
                      email: validation.cleanEmail,
                      preferred_degree: [selectedCourse?.name || callbackCourse].filter(Boolean),
                      preferred_college: "Amity University Online",
                      form_name: "Counselling Form in Priority College Page"
                    });
                    setCallbackSubmitted(true);
                  }}
                  className="w-full mt-3 px-5 py-3 rounded-xl bg-brand-600 text-white text-sm font-bold shadow-md hover:bg-brand-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Request Callback
                  <ArrowRight className="w-4 h-4" />
                </button>
                </>
                )}
                <p className="text-[10px] text-ink-500 text-center mt-2">
                  🔒 We only use your details to respond to your enquiry.
                </p>
              </div>
            </div>
          </section>

          {
    /* 9. Admission FAQs */
  }
          <section
    id="admission-faqs"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Admission FAQs")}
            </h2>
            <div className="space-y-3 mt-[18px]">
              {AP.faqs.map((faq, idx) => {
    const isOpen = openFaq === idx;
    return <div
      key={idx}
      className="border border-brand-100 rounded-xl overflow-hidden bg-white"
    >
                    <button
      type="button"
      onClick={() => setOpenFaq(isOpen ? null : idx)}
      className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-brand-50/50 transition-colors"
    >
                      <span className="text-sm font-semibold text-ink-900">{faq.question}</span>
                      <span
      className={`text-brand-600 text-lg leading-none shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
    >
                        +
                      </span>
                    </button>
                    {isOpen && <p className="px-4 pb-4 text-xs sm:text-sm text-ink-700 font-normal leading-relaxed border-t border-brand-100 pt-3">
                        {faq.answer}
                      </p>}
                  </div>;
  })}
            </div>
          </section>

          {
    /* 10. Student Reviews */
  }
          <section
    id="student-reviews"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                  {AP.testimonials.title}
                </h2>
                <p className="text-xs text-ink-500 font-normal mt-1">
                  Real feedback from Amity Online learners
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
              {AP.testimonials.items.map((t) => <div
    key={t.studentName}
    className="p-4 rounded-xl border border-brand-100 bg-canvas flex flex-col"
  >
                  <span className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold mb-2">
                    <BadgeCheck className="w-3 h-3" />
                    Verified Student
                  </span>
                  <p className="text-xs text-ink-700 font-normal leading-relaxed flex-1">
                    {t.text}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-brand-100">
                    <p className="text-sm font-semibold text-ink-900">{t.studentName}</p>
                    <p className="text-[11px] text-ink-500 font-normal">{t.profession}</p>
                  </div>
                </div>)}
            </div>
          </section>

          {
    /* 11. Blogs */
  }
          <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    sectionId="blogs"
    className="w-full rounded-2xl border border-brand-100 bg-canvas p-4 shadow-sm md:p-6"
    compact
    horizontal
    autoScroll
    showDescriptionOnMobile
    fetchLivePosts
  />

          {
    /* 12. Compare */
  }
          <CompareCollegesSection
    title="Compare"
    description={AMITY.compareIntro}
    logo={AMITY.logoImage}
    name={AMITY.title}
    location={AMITY.location}
    tags={["UGC-DEB Entitled", "NAAC A+", `NIRF #${AMITY.nirfRanking}`, "100% Online"]}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenHelpDesk={onOpenHelpDesk}
  />
        </div>
      </div>
    </div>;
};
