import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Download,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Users,
  Calculator
} from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { BlogsListSection } from "./BlogsListSection";
import { AMITY_PAGE_CONTENT as AMITY } from "../data/universities/amityContent";
import { AMITY_UNIVERSITY_DATA } from "../data/universities/amity";
import { AMITY_SCHOLARSHIP_RULES, AMITY_SCHOLARSHIP_PILLARS } from "../data/universities/amityScholarships";
import { ScholarshipPillarsGrid } from "./university/ScholarshipPillarsGrid";
import { sectionTitle } from "../lib/sectionTitles";
function parseFee(fee) {
  const n = Number(fee.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
const SP = AMITY.scholarshipPage;
const TOC_ITEMS = [
  { id: "scholarship-calculator", label: "Tuition Fee & Savings Calculator" },
  { id: "scholarship-schemes", label: "Scholarship Schemes & Concessions" },
  { id: "highlights", label: sectionTitle(AMITY.shortName, "Scholarships Highlights") },
  { id: "types", label: sectionTitle(AMITY.shortName, "Types of Scholarships") },
  { id: "aonsat", label: sectionTitle(AMITY.shortName, "AONSAT Scholarship") },
  { id: "courses-covered", label: sectionTitle(AMITY.shortName, "Courses Covered") },
  { id: "benefits", label: sectionTitle(AMITY.shortName, "Benefits") },
  { id: "how-to-apply", label: sectionTitle(AMITY.shortName, "How to Apply") },
  { id: "documents", label: sectionTitle(AMITY.shortName, "Documents Required") },
  { id: "comparison", label: sectionTitle(AMITY.shortName, "Scholarship vs AONSAT") },
  { id: "scholarship-faqs", label: sectionTitle(AMITY.shortName, "Scholarship FAQs") },
  { id: "blogs", label: "Blogs" }
];
export const AmityScholarshipsView = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk
}) => {
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0].id);
  const [openFaq, setOpenFaq] = useState(0);
  const [calcCourseId, setCalcCourseId] = useState(AMITY_UNIVERSITY_DATA.courses[0]?.id || "");
  const [calcMarks, setCalcMarks] = useState(78);
  const calcCourse = AMITY_UNIVERSITY_DATA.courses.find((c) => c.id === calcCourseId);
  const calcBase = parseFee(calcCourse?.totalFee || "");
  const calcRule = useMemo(() => {
    let best = null;
    for (const rule of AMITY_SCHOLARSHIP_RULES) {
      const m = rule.condition?.match(/marks\s*>=\s*(\d+)/i);
      if (m && calcMarks >= Number(m[1])) {
        if (!best || rule.percent > best.percent) best = rule;
      }
    }
    return best;
  }, [calcMarks]);
  const calcPercent = calcRule ? calcRule.percent : 0;
  const calcSavings = Math.round(calcBase * calcPercent / 100);
  const calcLabel = calcRule ? calcRule.label : "Standard Grant";
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
            <span className="text-ink-900 font-bold">Scholarship</span>
          </nav>
        </div>
      </div>

      {
    /* HERO — LPU college-hero layout */
  }
      <section className="bg-white text-ink-900 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <img
    src={AMITY.logoImage}
    alt={`${AMITY.shortName} Logo`}
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-brand-100 p-1.5 shadow-sm shrink-0"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
            <div className="min-w-0">
              <h1 className="section-title font-bold tracking-tight font-sans text-ink-900">
                {SP.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[11px] font-bold">
                  #{AMITY.nirfRanking} NIRF Rank
                </span>
                <span className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[11px] font-bold">
                  {AMITY.naacGrade}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[11px] font-bold">
                  UGC-DEB Entitled
                </span>
                <span className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[11px] font-bold">
                  100% Online
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4">
            <div className="lg:col-span-7 space-y-3">
              <p className="section-description text-xs sm:text-sm text-ink-700 font-normal flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                {AMITY.location} · {AMITY.type} · Est. {AMITY.established} ·{" "}
                <span className="inline-flex items-center gap-0.5 font-bold text-accent-700">
                  <Star className="w-3 h-3 fill-accent-500 text-accent-500" />
                  {AMITY.rating}
                </span>
              </p>
              <p className="text-sm text-ink-700 leading-relaxed font-normal">
                {SP.heroDescription}
              </p>
            </div>

            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-brand-100 shadow-xs bg-canvas">
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
            <div className="bg-brand-50 border border-brand-100 px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-ink-900 font-sans">Up to 100%</span>
              <span className="text-[10px] text-ink-500">Fee Waiver</span>
            </div>
            <div className="bg-brand-50 border border-brand-100 px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-brand-600 font-sans">Online</span>
              <span className="text-[10px] text-ink-500">Application Mode</span>
            </div>
            <div className="bg-brand-50 border border-brand-100 px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-ink-900 font-sans">UG &amp; PG</span>
              <span className="text-[10px] text-ink-500">Eligible Programs</span>
            </div>
            <div className="bg-brand-50 border border-brand-100 px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-accent-700 font-sans">Free</span>
              <span className="text-[10px] text-ink-500">AONSAT Registration</span>
            </div>
            <div className="flex items-center gap-3 md:ml-auto">
              <button
    onClick={() => onOpenBrochure()}
    className="px-5 py-2.5 rounded-xl bg-white text-brand-600 border border-brand-600 text-xs sm:text-sm font-bold hover:bg-brand-50 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                <Download className="w-4 h-4" />
                Brochure
              </button>
              <button
    onClick={() => onOpenApply()}
    className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                Apply Now
                <ArrowRight className="w-4 h-4" />
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
    collapsedCount={6}
  />

          {
    /* 0. Scholarship Calculator — matches LPU Scholarships tab */
  }
          {AMITY_SCHOLARSHIP_RULES.length > 0 && <section
    id="scholarship-calculator"
    className="page-section card bg-white rounded-2xl border-2 border-brand-600/30 shadow-lg scroll-mt-[130px]"
  >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="w-full lg:w-3/5 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-brand-100">
                    <Calculator className="w-5 h-5 text-brand-600" />
                    <h3 className="font-bold text-base text-ink-900 font-sans">
                      Calculate Your Net Tuition Fee &amp; Savings
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                      Select Program
                    </label>
                    <select aria-label="Program"
    value={calcCourseId}
    onChange={(e) => setCalcCourseId(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl border border-line-strong text-base sm:text-sm font-semibold text-ink-900 focus:border-brand-600 outline-none"
  >
                      {AMITY_UNIVERSITY_DATA.courses.map((c) => <option key={c.id} value={c.id}>
                          {c.name} ({c.totalFee})
                        </option>)}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <label className="font-bold text-ink-900 uppercase tracking-wider">
                        Qualifying Aggregate Marks: {calcMarks}%
                      </label>
                      <span className="text-brand-600 font-normal">{calcLabel}</span>
                    </div>
                    <input
    type="range"
    min={50}
    max={98}
    value={calcMarks}
    onChange={(e) => setCalcMarks(Number(e.target.value))}
    className="w-full h-2 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
  />
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                      Special Welfare Categories
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {AMITY_SCHOLARSHIP_RULES.filter((r) => r.condition).map((r) => <label
    key={r.id}
    className="tap-chip min-h-[44px] p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all border-brand-100"
  >
                          <input
    type="checkbox"
    checked={Boolean(calcRule && calcRule.id === r.id)}
    readOnly
    className="shrink-0 w-5 h-5 rounded text-brand-600"
  />
                          <span className="font-normal text-ink-900">{r.label}</span>
                        </label>)}
                    </div>
                  </div>
                </div>

                <div className="card w-full lg:w-2/5 rounded-2xl bg-gradient-to-br from-brand-900 to-ink-900 text-white space-y-4 shadow-md">
                  <div className="pb-3 border-b border-white/10">
                    <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider block">
                      Eligible Tuition Waiver
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                      {calcPercent}% Waiver
                    </div>
                    <p className="text-xs text-emerald-400 mt-[7.5px]">
                      Total Fee Savings: ₹{calcSavings.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-brand-200">
                    <div className="flex justify-between">
                      <span className="text-ink-500">Standard Degree Fee:</span>
                      <span className="line-through text-ink-500">₹{calcBase.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Total Tuition:</span>
                      <span className="font-bold text-white text-sm">
                        ₹{(calcBase - calcSavings).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/10">
                      <span className="font-bold">Net Per Semester:</span>
                      <span className="font-extrabold text-brand-400">
                        ₹{Math.round((calcBase - calcSavings) / 4).toLocaleString("en-IN")}/sem
                      </span>
                    </div>
                  </div>

                  <button
    onClick={() => onOpenApply(calcCourseId)}
    className="w-full py-3 rounded-xl bg-brand-600 text-white text-xs font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                    <span>Claim {calcPercent}% Scholarship</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>}

          {
    /* 1. Scholarship Schemes & Concessions — LPU pillars grid */
  }
          <ScholarshipPillarsGrid pillars={AMITY_SCHOLARSHIP_PILLARS} />

          {
    /* 2. Scholarship Highlights */
  }
          <section
    id="highlights"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Scholarships Highlights")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.highlights.intro}
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
                  {SP.highlights.rows.map((row) => <tr key={row.label} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-900">{row.label}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.value}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 2. Types of Scholarships */
  }
          <section
    id="types"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Types of Scholarships")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.types.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Scholarship Type</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                    <th className="py-3 px-4 font-bold">Scholarship Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SP.types.rows.map((row) => <tr key={row.type} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.type}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.eligibility}</td>
                      <td className="py-3.5 px-4 font-normal text-brand-600">{row.benefit}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 3. AONSAT Scholarship */
  }
          <section
    id="aonsat"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "AONSAT Scholarship")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.aonsat.intro}
            </p>
            <ul className="mt-3 space-y-3">
              {SP.aonsat.bullets.map((b) => <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700 leading-relaxed font-normal">{b}</p>
                </li>)}
            </ul>
            <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
              <p className="text-sm font-semibold text-ink-700 leading-relaxed">
                {SP.aonsat.bannerText}
              </p>
              <button
    onClick={onOpenHelpDesk}
    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
                <Users className="w-3.5 h-3.5" />
                Talk to Expert
              </button>
            </div>
          </section>

          {
    /* 4. Courses Covered */
  }
          <section
    id="courses-covered"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Courses Covered")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.coursesCovered.intro}
            </p>
            <h3 className="text-base font-semibold text-ink-900 mt-5">
              {SP.coursesCovered.ugHeading}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SP.coursesCovered.ug.map((row) => <tr key={row.course} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.course}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.duration}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <h3 className="text-base font-semibold text-ink-900 mt-5">
              {SP.coursesCovered.pgHeading}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SP.coursesCovered.pg.map((row) => <tr key={row.course} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.course}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.duration}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 5. Benefits */
  }
          <section
    id="benefits"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Benefits")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.benefits.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Benefit</th>
                    <th className="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SP.benefits.rows.map((row) => <tr key={row.benefit} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.benefit}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.description}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 6. How to Apply */
  }
          <section
    id="how-to-apply"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "How to Apply")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.howToApply.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[18px]">
              {SP.howToApply.steps.map((step, idx) => <div
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
    /* 7. Documents Required */
  }
          <section
    id="documents"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Documents Required")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.documents.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Document</th>
                    <th className="py-3 px-4 font-bold">Required For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SP.documents.rows.map((row) => <tr key={row.document} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.document}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.requiredFor}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 8. Scholarship vs AONSAT */
  }
          <section
    id="comparison"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Scholarship vs AONSAT")}
            </h2>
            <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
              {SP.comparison.intro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-brand-600 text-white">
                    <th className="py-3 px-4 font-bold">Particulars</th>
                    <th className="py-3 px-4 font-bold">Amity Online Scholarship</th>
                    <th className="py-3 px-4 font-bold">AONSAT Scholarship</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SP.comparison.rows.map((row) => <tr key={row.particular} className="hover:bg-brand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-900">{row.particular}</td>
                      <td className="py-3.5 px-4 font-normal text-ink-700">{row.general}</td>
                      <td className="py-3.5 px-4 font-normal text-brand-600">{row.aonsat}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-ink-700 leading-relaxed">
                Ready to apply for Amity Online Scholarship 2026?
              </p>
              <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {
    /* 9. FAQs */
  }
          <section
    id="scholarship-faqs"
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
              {sectionTitle(AMITY.shortName, "Scholarship FAQs")}
            </h2>
            <div className="space-y-3 mt-[18px]">
              {SP.faqs.map((faq, idx) => {
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
    /* 10. Blogs */
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
        </div>
      </div>
    </div>;
};
