import { useState, useEffect } from "react";
import {
  CheckCircle,
  ChevronRight,
  Download,
  Calendar,
  PhoneCall,
  Star,
  MapPin,
  ArrowRight
} from "lucide-react";
import { TableOfContents } from "../TableOfContents";
import { BlogsListSection } from "../BlogsListSection";
import { SITE_BLOG_POSTS } from "../../data/siteBlogPosts";
import { sectionTitle } from "../../lib/sectionTitles";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../../services/leadApi";
const ADMISSION_TOC_ITEMS = [
  { id: "admission-highlights", label: "Admission Highlights 2026" },
  { id: "admission-dates", label: "Admission Important Dates 2026" },
  { id: "eligibility-criteria", label: "Eligibility & Selection Criteria 2026" },
  { id: "admission-process", label: "Admission Process 2026" },
  { id: "application-process", label: "Application Process 2026" },
  { id: "examination-pattern", label: "Examination Pattern" },
  { id: "documents-required", label: "Documents Required for Admission" },
  { id: "scholarship-schemes", label: "Scholarship 2026" },
  { id: "student-reviews", label: "Student Reviews" },
  { id: "blogs", label: "Blogs" },
  { id: "compare", label: "Compare" }
];
export const UniversityPageAdmission = ({
  university,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  universityNavigation,
  heroDescription,
  statusStats,
  applicationSteps,
  counselingTitle,
  counselingSubtitle
}) => {
  const admissions = university?.admissions || {};
  const campusAndLms = university?.campusAndLms || {};
  const feesAndFinancing = university?.feesAndFinancing || {};
  const quickStats = university?.quickStats || {};
  const importantDates = Array.isArray(university?.importantDates?.items) ? university.importantDates.items : [];
  const examPattern = Array.isArray(campusAndLms.examPattern) ? campusAndLms.examPattern : [];
  const scholarships = Array.isArray(feesAndFinancing.scholarships) ? feesAndFinancing.scholarships : [];
  const eligibilityRows = Array.isArray(admissions.eligibilityMatrix) ? admissions.eligibilityMatrix : Array.isArray(admissions.eligibility) ? admissions.eligibility : [];
  const admissionSteps = Array.isArray(admissions.steps) ? admissions.steps : [];
  const documents = Array.isArray(admissions.requiredDocuments) ? admissions.requiredDocuments : Array.isArray(admissions.documents) ? admissions.documents : [];
  const testimonials = Array.isArray(university?.testimonials) ? university.testimonials : [];
  const [showAllEligibility, setShowAllEligibility] = useState(false);
  const [activeSection, setActiveSection] = useState("admission-highlights");
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackEmail, setCallbackEmail] = useState("");
  const [callbackError, setCallbackError] = useState("");
  const [callbackCourse, setCallbackCourse] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const hasApplicationProcess = Boolean(applicationSteps && applicationSteps.length > 0);
  const hasExamPattern = examPattern.length > 0;
  const hasScholarships = scholarships.length > 0;
  const hasReviews = testimonials.length > 0;
  const hasDocuments = documents.length > 0;
  const tocItems = ADMISSION_TOC_ITEMS.filter((item) => {
    if (item.id === "application-process") return hasApplicationProcess;
    if (item.id === "examination-pattern") return hasExamPattern;
    if (item.id === "documents-required") return hasDocuments;
    if (item.id === "scholarship-schemes") return hasScholarships;
    if (item.id === "student-reviews") return hasReviews;
    return true;
  });
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = tocItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(tocItems[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems.length]);
  const visibleEligibility = showAllEligibility ? eligibilityRows : eligibilityRows.slice(0, 4);
  const dates = importantDates;
  const reviews = testimonials;
  const defaultStats = [
    { label: "Admission Status", value: "Open for 2026" },
    { label: "Mode of Application", value: "Online" },
    { label: "Admission Criteria", value: "Merit-based" },
    { label: "Registration Fee", value: "\u20B91,000" }
  ];
  const stats = statusStats && statusStats.length ? statusStats : defaultStats;
  const heroCopy = heroDescription || `${university.shortName} admission 2026 is open for online UG and PG courses. Candidates must complete the online application, upload the required documents and pay the registration fee on the official university portal. Admission is merit-based and no entrance exam is required.`;
  const defaultApplicationSteps = [
    { title: "Online Registration", description: "[Application step description]" },
    { title: "Select Degree & Fill Form", description: "[Application step description]" },
    { title: "Upload Documents & DEB ID", description: "[Application step description]" },
    { title: "Fee Payment & Confirmation", description: "[Application step description]" }
  ];
  const steps = applicationSteps && applicationSteps.length ? applicationSteps : defaultApplicationSteps;
  return <div className="space-y-0">
      {
    /* 1. ADMISSION HIGHLIGHTS HERO */
  }
      <section
    id="admission-highlights"
    className="page-section card bg-white border border-line rounded-2xl shadow-sm scroll-mt-[110px]"
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start p-5 sm:p-6 md:p-8">
          <div className="lg:col-span-7 space-y-3">
            <p className="flex items-center gap-[10px] mb-[10px] text-[11px] sm:text-[12px] font-semibold text-[#1763c5] uppercase tracking-[1.6px]">
              <span className="w-7 h-1 rounded-full bg-[#1763e9]" />
              Admissions Open 2026
            </p>

            <h1 className="m-0 mb-[10px] uni-title leading-[1.2] tracking-[-1.2px] text-ink-900">
              {sectionTitle(university.shortName, "Admission Highlights")}
            </h1>

            <p className="m-0 text-sm text-ink-700 leading-relaxed font-normal">{heroCopy}</p>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-0 bg-brand-50 border border-brand-100 rounded-[10px] p-2.5 sm:p-3">
              {stats.map((s) => <div key={s.label} className="min-w-0 px-2 sm:px-2.5 py-1 border-r border-line">
                  <span className="block mb-1 text-[10px] leading-[1.4] text-ink-500">{s.label}</span>
                  <span className="block text-[12px] leading-[1.4] font-semibold text-[#129b55]">{s.value}</span>
                </div>)}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <button
    onClick={() => onOpenApply()}
    className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-white bg-brand-600 shadow-sm hover:bg-brand-700 transition-all duration-200 cursor-pointer"
  >
                Apply Now
                <span aria-hidden="true">→</span>
              </button>

              <button
    onClick={onOpenBrochure}
    className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-brand-900 bg-white border border-brand-900 hover:bg-brand-50 transition-all duration-200 cursor-pointer"
  >
                <Download className="w-[17px] h-[17px]" />
                Download Brochure
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:mr-[50px]">
            <div className="rounded-2xl overflow-hidden border border-line shadow-xs bg-canvas">
              <img
    src={university.backgroundImage}
    alt={`${university.name} campus and students`}
    className="w-full h-48 sm:h-60 lg:h-64 object-cover block"
    loading="lazy"
  />
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      {
    /* Table of Contents */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TableOfContents
    title="Table of contents"
    items={tocItems}
    activeId={activeSection}
    onItemClick={(id) => setActiveSection(id)}
    defaultExpanded={false}
    collapsedCount={6}
  />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 pb-10">
        {
    /* 2. ADMISSION IMPORTANT DATES */
  }
        <section id="admission-dates" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-line">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-semibold text-ink-900 font-sans">
                {sectionTitle(university.shortName, "Admission Important Dates")}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-ink-700">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Intake 2026 Active</span>
            </div>
          </div>

          <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed">
            {university.name} releases admission dates for its online programs on the official website. Students must
            complete the application before the deadline and submit required documents such as DEB ID and academic
            certificates during admission. Check the table below for admission dates:
          </p>

          <div className="overflow-hidden overflow-x-auto rounded-xl border border-line bg-white mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-brand-600 text-white">
                  <th className="py-3 px-4 font-bold">Event</th>
                  <th className="py-3 px-4 font-bold">Important Date</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {dates.map((item, idx) => <tr key={idx} className="hover:bg-brand-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-600" />
                      <span>{item.event}</span>
                    </td>
                    <td className="py-3.5 px-4 text-ink-700">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-brand-200 text-brand-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-500 italic mt-[18px]">
            Note: Dates are tentative and may be updated by the university. Please refer to the official website or speak
            to a counselor for the latest information.
          </p>
        </section>

        {
    /* 3. ELIGIBILITY & SELECTION CRITERIA */
  }
        {eligibilityRows.length > 0 && <section id="eligibility-criteria" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-line pb-4">
              <div className="text-left">
                <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                  {sectionTitle(university.shortName, "Eligibility & Selection Criteria")}
                </h2>
              </div>
              <button
    onClick={onOpenHelpDesk}
    className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 cursor-pointer"
  >
                <span>Need Free Eligibility Assessment?</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed">{university.admissions.intro}</p>

            <div className="overflow-hidden overflow-x-auto rounded-xl border border-line bg-white mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                    <th className="py-3 px-4 font-bold">Selection Process</th>
                    <th className="py-3 px-4 font-bold text-right">Tuition Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  {visibleEligibility.map((item, idx) => <tr key={idx} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-900">
                        {item.course}
                        <span className="block text-[11px] font-normal text-ink-500">{item.duration}</span>
                      </td>
                      <td className="py-3.5 px-4 text-ink-700 max-w-xs">{item.eligibility}</td>
                      <td className="py-3.5 px-4 text-brand-600 font-semibold">{item.selection || "Academic Merit Verification"}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-ink-900">
                        {item.feeSem || item.totalFee} <span className="text-[11px] font-normal text-ink-500">/sem</span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>

            {eligibilityRows.length > 4 && <div className="flex justify-center mt-3">
                <button
    onClick={() => setShowAllEligibility(!showAllEligibility)}
    className="tap-hit flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline cursor-pointer"
  >
                  {showAllEligibility ? "Show Less" : `Show All ${eligibilityRows.length} Programs`}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllEligibility ? "rotate-90" : ""}`} />
                </button>
              </div>}
          </section>}

        {
    /* 4. ADMISSION PROCESS */
  }
        {admissionSteps.length > 0 && <section id="admission-process" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
            <div className="mb-5 text-left">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(university.shortName, "Admission Process")}
              </h2>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed font-normal">{university.admissions.intro}</p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-4 left-[10%] right-[10%] h-px bg-brand-200" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
                {admissionSteps.map((step, index) => <div key={index} className="relative flex items-start gap-3 md:flex-col md:items-center md:gap-0">
                    {index < admissionSteps.length - 1 && <div className="absolute left-4 top-8 bottom-[-12px] w-px bg-brand-200 md:hidden" />}
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-600 bg-white text-xs font-semibold text-brand-600 md:mb-3">
                      {String(step.stepNumber).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1 rounded-lg border border-line bg-white p-3.5 md:w-full md:flex-none">
                      <h3 className="mb-1.5 text-sm font-semibold text-ink-900 font-sans">{step.title}</h3>
                      <p className="text-xs leading-relaxed text-ink-700 font-normal">{step.description}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </section>}

        {
    /* 5. APPLICATION PROCESS */
  }
        <section id="application-process" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-line pb-4">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {sectionTitle(university.shortName, "Application Process")}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-ink-700 leading-relaxed">
                Step-by-step digital application guide for candidates applying at {university.officialWebsite || "the official portal"}.
              </p>
            </div>
            <button
    onClick={() => onOpenApply()}
    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-all shadow-xs shrink-0 cursor-pointer"
  >
              Start Application
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {steps.map((step, idx) => <div key={idx} className="p-4 rounded-xl border border-line bg-canvas space-y-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-xs">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-ink-900">{step.title}</h3>
                <p className="text-xs text-ink-700 leading-relaxed">{step.description}</p>
              </div>)}
          </div>
        </section>

        {
    /* 6. EXAMINATION PATTERN */
  }
        {hasExamPattern && <section id="examination-pattern" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-semibold text-ink-900 font-sans">
                {sectionTitle(university.shortName, "Examination Pattern")}
              </h2>
            </div>

            <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed">
              {campusAndLms.intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-[18px]">
              {examPattern.map((step, idx) => <div key={idx} className="p-4 rounded-xl bg-canvas border border-line flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-xs text-ink-900">{step.title}</h3>
                    <p className="text-[11px] text-ink-700 leading-relaxed mt-[7.5px]">{step.description}</p>
                  </div>
                </div>)}
            </div>
          </section>}

        {
    /* 7. DOCUMENTS REQUIRED */
  }
        {hasDocuments && <section id="documents-required" className="page-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-[110px]">
            <div className="card lg:col-span-4 bg-brand-600 text-white rounded-2xl shadow-xs space-y-4 p-5 sm:p-6">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-wider block">
                Verification Guide
              </span>
              <h2 className="section-title text-xl sm:text-2xl font-bold font-sans">
                {sectionTitle(university.shortName, "Documents Required for Admission")}
              </h2>
              <p className="section-description text-xs text-brand-300 leading-relaxed">
                Ensure all uploaded documents are colored scanned copies of original certificates in PDF or JPEG format
                (under 5MB).
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#ffdcc3] font-bold">
                  <CheckCircle className="w-4 h-4 text-[#ffdcc3]" />
                  <span>Is DEB ID Required for Admission?</span>
                </div>
                <p className="text-[11px] text-brand-300">
                  Yes, DEB ID is required for admission. The DEB ID (Distance Education Bureau ID) is a unique ID required
                  for students applying to UGC-approved online and distance learning programs in India.
                </p>
              </div>
            </div>

            <div className="card lg:col-span-8 bg-white border border-line rounded-2xl shadow-xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {documents.map((doc, idx) => <div key={idx} className="p-3.5 rounded-xl border border-line bg-canvas space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-ink-900 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-brand-600" />
                        {doc}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-200 text-brand-700">Required</span>
                    </div>
                    <p className="text-ink-500">[Document note]</p>
                  </div>)}
              </div>
            </div>
          </section>}

        {
    /* 8. SCHOLARSHIP SCHEMES */
  }
        {hasScholarships && <section id="scholarship-schemes" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-semibold text-ink-900 font-sans">
                {sectionTitle(university.shortName, "Scholarship")}
              </h2>
            </div>

            <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed">
              {feesAndFinancing.intro}
            </p>

            <div className="overflow-hidden overflow-x-auto rounded-xl border border-line bg-white mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Scholarship / Benefit</th>
                    <th className="py-3 px-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  {scholarships.map((s, idx) => <tr key={idx} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-900 align-top">
                        {s.title}
                        <span className="block mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-normal bg-brand-50 text-brand-600 border border-brand-200">
                          {s.tag}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-ink-700 leading-relaxed">{s.description}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>}

        {
    /* 9. COUNSELING CALLBACK BANNER */
  }
        <section
    id="counseling-callback"
    className="page-section relative isolate overflow-hidden rounded-[20px] border border-brand-200 bg-gradient-to-br from-brand-50 via-canvas to-white text-brand-900 shadow-sm scroll-mt-[110px]"
  >
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-5 sm:p-6 md:p-8">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ffdf70] bg-accent-50 text-[#dca400] text-xs font-bold uppercase tracking-wide">
                <PhoneCall className="w-3.5 h-3.5 text-[#dca400]" />
                1-on-1 Academic Counseling
              </span>
              <h2 className="section-title font-bold text-brand-900 font-sans">
                {counselingTitle || <>Have Questions About <span className="text-brand-500">Document Eligibility or Grants?</span></>}
              </h2>
              <p className="section-description text-xs sm:text-sm text-ink-500 max-w-2xl leading-relaxed">
                {counselingSubtitle || "Speak directly with Online Siksha university counselors for transcript pre-screening, scholarship estimation, and instant enrollment support."}
              </p>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-2xl text-ink-900 shadow-lg space-y-3">
              <h3 className="font-bold text-sm text-ink-900 font-sans">Request a callback</h3>
              {!callbackSubmitted ? <form
    onSubmit={(e) => {
      e.preventDefault();
      const validation = validateLeadFields({ name: callbackName, phone: callbackPhone, email: callbackEmail, requireName: true, requireEmail: true });
      if (!validation.valid) { setCallbackError(validation.error); return; }
      const matched = (university?.courses || []).find((c) => c.id === callbackCourse);
      submitLead({
        name: callbackName,
        phone_number: validation.cleanPhone,
        email: validation.cleanEmail,
        preferred_degree: [matched?.name || callbackCourse].filter(Boolean),
        preferred_college: university?.name || university?.shortName || "",
        form_name: "Counselling Form in Priority College Page"
      });
      setCallbackSubmitted(true);
    }}
    className="space-y-2.5 text-xs"
  >
                  <input
    type="text"
    required
    value={callbackName}
    onChange={(e) => { setCallbackError(""); setCallbackName(e.target.value); }}
    aria-label="Full Name" placeholder="Full Name"
    className="w-full h-10 px-3 rounded-xl border border-line-strong focus:border-brand-600 outline-none text-base sm:text-xs"
  />
                  <input
    type="email"
    required
    value={callbackEmail}
    onChange={(e) => { setCallbackError(""); setCallbackEmail(e.target.value); }}
    aria-label="Email Address" placeholder="Email Address"
    className="w-full h-10 px-3 rounded-xl border border-line-strong focus:border-brand-600 outline-none text-base sm:text-xs"
  />
                  {callbackError && <p className="text-[11px] text-rose-600 font-semibold">{callbackError}</p>}
                  <input
    type="tel"
    required
    pattern={INDIAN_PHONE_PATTERN} maxLength={10} inputMode="numeric"
    value={callbackPhone}
    onChange={(e) => { setCallbackError(""); setCallbackPhone(sanitizeIndianPhone(e.target.value)); }}
    aria-label="Mobile Number (+91)" placeholder="Mobile Number (+91)"
    className="w-full h-10 px-3 rounded-xl border border-line-strong focus:border-brand-600 outline-none text-base sm:text-xs"
  />
                  <select aria-label="Programme"
    value={callbackCourse}
    onChange={(e) => setCallbackCourse(e.target.value)}
    className="w-full h-10 px-3 rounded-xl border border-line-strong focus:border-brand-600 outline-none text-base sm:text-xs"
  >
                    <option value="">Select a Programme</option>
                    {university.courses.map((c) => <option key={c.id} value={c.id}>
                        {c.name}
                      </option>)}
                  </select>
                  <button
    type="submit"
    className="w-full bg-brand-600 text-white h-10 rounded-xl font-bold hover:bg-brand-700 active:scale-95 transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Talk to Expert Counselor</span>
                  </button>
                  <span className="text-[10px] text-ink-500 text-center block">
                    Average response time: &lt; 15 minutes
                  </span>
                </form> : <div className="py-4 text-center space-y-2 text-xs">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <span className="font-bold text-ink-900 block">Callback Requested!</span>
                  <p className="text-ink-700">We will call you at +91 {callbackPhone} shortly.</p>
                </div>}
            </div>
          </div>
        </section>

        {
    /* 10. STUDENT REVIEWS */
  }
        {hasReviews && <section id="student-reviews" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-line">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-semibold text-ink-900 font-sans">
                  {sectionTitle(university.shortName, "Student Reviews")}
                </h2>
                <p className="section-description text-xs text-ink-500">
                  Authentic feedback from verified learners and alumni who completed admissions and courses online.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-brand-50 border border-brand-200 p-2.5 rounded-xl shrink-0">
                <div className="text-center">
                  <span className="block text-lg font-black text-brand-600">{quickStats.placementRate}</span>
                  <span className="text-[9px] text-ink-700 font-bold">Admission Satisfaction</span>
                </div>
                <div className="h-6 w-px bg-brand-200" />
                <div className="text-center">
                  <span className="block text-lg font-black text-ink-900">{university.rating || "4.3"} / 5</span>
                  <span className="text-[9px] text-ink-700 font-bold">Overall Rating</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[18px]">
              {reviews.slice(0, 3).map((t, idx) => <div
    key={idx}
    className="bg-white rounded-xl border border-line hover:border-brand-600/70 hover:shadow-md transition-all p-4 flex flex-col justify-between gap-3"
  >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-amber-400 gap-0.5 items-center">
                        {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified Student
                      </span>
                    </div>
                    <p className="text-xs text-ink-700 italic leading-relaxed">{t.text}</p>
                  </div>
                  <div className="border-t border-line pt-2.5 flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-xs text-ink-900">{t.studentName}</span>
                      <span className="block text-[10px] text-ink-500">
                        {t.profession || "Online Student"}
                        {t.course ? ` \xB7 ${t.course}` : ""}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>
          </section>}

        {
    /* 11. BLOGS */
  }
        <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    className="page-section card bg-white rounded-2xl border border-line shadow-xs scroll-mt-[110px]"
    compact
    posts={university.blogs && university.blogs.posts ? university.blogs.posts : SITE_BLOG_POSTS}
  />

        {
    /* 12. COMPARE */
  }
        <section id="compare" className="page-section card bg-white border border-line rounded-2xl shadow-xs scroll-mt-[110px]">
          <div id="compare-colleges" className="scroll-mt-[110px]" />
          <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">Compare</h2>
          <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
            Choosing an online university can be tough. We&apos;re here to make it simple.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-line rounded-2xl bg-white shadow-sm mt-[18px]">
            <div className="min-h-[200px] rounded-xl border border-brand-100 bg-brand-50 p-4 flex flex-col justify-between">
              <div>
                <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-brand-100 text-brand-600 text-[11px] font-bold">
                  Selected College
                </span>

                <div className="flex gap-4 items-center">
                  <div className="w-[80px] h-[65px] shrink-0 rounded-lg border border-line bg-white flex items-center justify-center overflow-hidden">
                    <img
    src={university.logoImage}
    alt={`${university.name} logo`}
    className="max-w-full max-h-full object-contain p-1"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base leading-tight font-semibold text-ink-900 font-sans">{university.name}</h3>
                    <p className="flex items-center gap-1.5 text-xs text-ink-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      {university.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {(university.approvals || []).slice(0, 4).map((tag, i) => <span key={i} className="px-2 py-0.5 rounded bg-white border border-brand-200 text-[10px] text-ink-700">
                      {tag}
                    </span>)}
                </div>
              </div>

              <button
    onClick={onOpenBrochure}
    className="w-full h-10 mt-3 flex items-center justify-center gap-2 rounded-lg border border-brand-600 bg-white text-brand-600 text-xs font-bold hover:bg-brand-50 transition-all cursor-pointer"
  >
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
            </div>

            <div className="flex items-center justify-center">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-600 text-white text-xs font-extrabold">
                VS
              </span>
            </div>

            <div className="min-h-[200px] rounded-xl border border-dashed border-line bg-canvas p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full border border-brand-200 bg-white flex items-center justify-center text-brand-600 text-xl font-light mb-2">
                +
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink-900 font-sans">Add Comparison College</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-700">
                  Select another university to compare admission fees and eligibility.
                </p>
              </div>
              <button
    onClick={onOpenHelpDesk}
    className="w-full h-10 mt-3 rounded-lg border-none bg-brand-600 text-white text-xs font-bold hover:bg-brand-900 transition-all cursor-pointer"
  >
                Add College to Compare
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>;
};
export default UniversityPageAdmission;
