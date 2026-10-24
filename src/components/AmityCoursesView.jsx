import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  ArrowRight,
  ChevronRight,
  Calendar,
  IndianRupee,
  Star,
  Calculator,
  BadgeCheck,
  Award,
  CheckCircle,
  PhoneCall
} from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ProgrammeCardsSection } from "./ProgrammeCardsSection";
import { BlogsListSection } from "./BlogsListSection";
import { CompareCollegesSection } from "./CompareCollegesSection";
import { LmsPlatformSection } from "./university/LmsPlatformSection";
import { StudentReviewsSection } from "./university/StudentReviewsSection";
import { AMITY_PAGE_CONTENT as AMITY } from "../data/universities/amityContent";
import { AMITY_UNIVERSITY_DATA } from "../data/universities/amity";
import { sectionTitle } from "../lib/sectionTitles";
const CP = AMITY.coursesPage;
const TOC_ITEMS = [
  { id: "courses-fees", label: sectionTitle(AMITY.shortName, "Courses and Fees") },
  { id: "admission-dates", label: sectionTitle(AMITY.shortName, "Admission Dates") },
  { id: "fee-structure", label: sectionTitle(AMITY.shortName, "Fee Structure 2026 (Semester & Total)") },
  { id: "learning-platform", label: "How You Study (Amity Amigo Learning Platform)" },
  { id: "all-courses", label: sectionTitle(AMITY.shortName, "All Courses") },
  { id: "student-reviews", label: `${AMITY.shortName} Student Reviews & Ratings` },
  { id: "faqs", label: sectionTitle(AMITY.shortName, "Courses FAQs") },
  { id: "blogs", label: "Blogs" },
  { id: "compare-colleges", label: "Compare" },
  { id: "counselor-helpline", label: "Academic Counseling & Helpline" }
];
const AMITY_PROGRAMME_CARDS = AMITY_UNIVERSITY_DATA.courses.map((c) => ({
  id: c.id,
  title: c.name,
  subtitle: `${c.level === "PG" ? "Postgraduate" : "Undergraduate"} Programme`,
  duration: c.duration.replace(/\s*\(.*\)/, ""),
  fee: c.totalFee,
  mode: "Online",
  specialisations: c.specializations
}));
const HERO_METRICS = [
  { value: "NAAC A+", label: "Accreditation Grade" },
  { value: "100% Online", label: "Classes & Exams from Home" },
  { value: "\u20B999K - \u20B92.5L", label: "Total Course Fee" },
  { value: `${AMITY_UNIVERSITY_DATA.courses.length} Programs`, label: "UG & PG Online Degrees" }
];
const HERO_METRIC_ICONS = [
  <Star key="star" className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />,
  <Award key="award" className="w-3.5 h-3.5 text-[#115eaf]" />,
  <IndianRupee key="fee" className="w-3.5 h-3.5 text-[#115eaf]" />,
  <BadgeCheck key="programs" className="w-3.5 h-3.5 text-[#115eaf]" />
];
const HERO_METRIC_ICON_BG = [
  "bg-[#FFFBEB] text-[#92400E]",
  "bg-[#f0f3ff] text-[#115eaf]",
  "bg-[#f0f3ff] text-[#115eaf]",
  "bg-[#f0f3ff] text-[#115eaf]"
];
export const AmityCoursesView = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenEmi,
  onOpenHelpDesk,
  onSelectCourse
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
  return <div className="space-y-0">
      {
    /* Breadcrumb Bar — same as LPU */
  }
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

      {
    /* HERO — LPU-style light courses hero with metrics + admissions card */
  }
      <section className="content-block relative bg-gradient-to-b from-[#f0f3ff] via-[#f9f9ff] to-[#f9f9ff] overflow-hidden border-b border-[#e7eeff]/60">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#d5e3ff] blur-3xl" />
          <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-[#d8e3fb] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {
    /* Left 8 Columns: Hero Content */
  }
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#e7eeff] text-[11px] font-bold text-[#115eaf]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Admissions Open for 2026
                </span>
                <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000f22] tracking-tight font-sans leading-tight mt-3">
                  {CP.title}
                </h1>
                <p className="section-description text-xs sm:text-sm text-[#43474d] max-w-3xl leading-relaxed font-normal mt-2">
                  {CP.heroDescription}
                </p>
              </div>

              {
    /* Action Buttons */
  }
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-semibold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center gap-2"
  >
                  <CheckCircle className="w-4 h-4" />
                  <span>Apply Online</span>
                </button>
                <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2.5 rounded-xl bg-white text-[#000f22] border border-[#0b2540] text-xs sm:text-sm font-semibold hover:bg-[#f0f3ff] active:scale-95 transition-all shadow-xs flex items-center gap-2"
  >
                  <Download className="w-4 h-4 text-[#115eaf]" />
                  <span>Download Complete Fee Brochure</span>
                </button>
                <button
    onClick={() => onOpenHelpDesk()}
    className="tap-chip px-3.5 py-2.5 rounded-xl text-[#115eaf] hover:bg-[#dee8ff] text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
  >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to an Academic Counselor</span>
                </button>
              </div>

              {
    /* 4 Informational Metric Cards */
  }
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {HERO_METRICS.map((m, i) => <div
    key={m.label}
    className="p-4 rounded-xl bg-white border border-[#e7eeff] flex flex-col justify-between"
  >
                    <div
    className={`w-7 h-7 rounded-lg ${HERO_METRIC_ICON_BG[i]} flex items-center justify-center mb-1.5`}
  >
                      {HERO_METRIC_ICONS[i]}
                    </div>
                    <span className="text-sm font-bold text-[#000f22] font-sans">{m.value}</span>
                    <span className="text-[11px] text-[#43474d] font-normal mt-0.5">{m.label}</span>
                  </div>)}
              </div>
            </div>

            {
    /* Right 4 Columns: Admissions Open card */
  }
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white text-[#000f22] border border-[#e7eeff] shadow-xs p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#e7eeff]">
                  <h3 className="text-base font-bold font-sans">Amity Online Admissions</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    Open
                  </span>
                </div>

                <div className="space-y-3 py-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#f0f3ff] flex items-center justify-center shrink-0 text-[#115eaf]">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#43474d] block font-normal">
                        {CP.admissionCard.deadlineLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-normal text-[#000f22]">
                        {CP.admissionCard.deadline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0 text-[#92400E]">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#43474d] block font-normal">
                        {CP.admissionCard.grantLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-normal text-[#B45309]">
                        {CP.admissionCard.grant}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#f0f3ff] flex items-center justify-center shrink-0 text-[#115eaf]">
                      <IndianRupee className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#43474d] block font-normal">
                        {CP.admissionCard.emiLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-normal text-[#000f22]">
                        {CP.admissionCard.emi}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e7eeff] flex flex-col gap-1.5">
                  <button
    type="button"
    onClick={() => onOpenApply()}
    className="w-full py-2.5 rounded-lg bg-[#0b2540] text-white text-xs sm:text-sm font-semibold hover:bg-[#000f22] active:scale-95 transition-all flex items-center justify-center gap-2 shadow"
  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-center text-[10px] text-[#74777e] font-normal">
                    {CP.admissionCard.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      {
    /* MAIN CONTENT — LPU section-container structure */
  }
      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
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
    /* 1. EMI Banner */
  }
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

          {
    /* 2. Courses and Fees */
  }
          <section
    id="courses-fees"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(AMITY.shortName, "Courses and Fees")}
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
                  {AMITY_UNIVERSITY_DATA.courses.map((c) => <tr key={c.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{c.name}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{c.duration}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{c.feePerSemester}</td>
                      <td className="py-2.5 px-4 font-semibold text-[#115eaf]">{c.totalFee}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137] max-w-[220px]">
                        {c.eligibility}
                      </td>
                    </tr>)}
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

          {
    /* 3. Admission Dates */
  }
          <section
    id="admission-dates"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
                {sectionTitle(AMITY.shortName, "Admission Dates")}
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
                  {CP.admissionDates.rows.map((row, idx) => <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                          {row.event}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.session}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.date}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>

        {
    /* FEE TRANSPARENCY MATRIX (SIDE-BY-SIDE TABLES) - LPU Style */
  }
        <section id="fee-structure" className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-[100px]">            <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-3">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] tracking-tight font-sans">
                {sectionTitle(AMITY.shortName, "Fee Structure 2026 (Semester & Total)")}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#43474d] font-normal">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Includes Exam Fees, LMS Access & Digital Material</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {
    /* Table 1: Undergraduate (UG) Programs */
  }
            <div className="bg-white rounded-xl border border-[#e7eeff] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="px-5 py-3.5 bg-[#f0f3ff] border-b border-[#e7eeff] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-[#000f22] font-sans">Undergraduate (UG) Programs</h3>
                    <p className="mt-[7.5px] text-xs text-[#43474d] font-normal">Standard Duration: 3 Years / 6 Semesters</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-normal rounded-md bg-[#d3e4ff] text-[#011c37]">
                    UG Degrees
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#e7eeff] text-[#43474d] text-xs font-semibold bg-[#f9f9ff]">
                        <th className="py-2.5 px-5">Course Name</th>
                        <th className="py-2.5 px-3">Duration</th>
                        <th className="py-2.5 px-3">Per Sem Fee</th>
                        <th className="py-2.5 px-3">Total Fee</th>
                        <th className="py-2.5 px-5 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {(() => {
    const ugCourses = AMITY_UNIVERSITY_DATA.courses.filter((c) => c.level === "UG");
    return ugCourses.map((c) => <tr key={c.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
                            <td className="py-2.5 px-5 font-normal text-[#000f22]">
                              {c.code}
                              <span className="block text-[11px] font-normal text-[#74777e]">{c.name}</span>
                            </td>
                            <td className="py-2.5 px-3 text-[#43474d] font-normal">{c.duration.split(" ")[0]} Years</td>
                            <td className="py-2.5 px-3 font-normal text-[#000f22]">{c.feePerSemester}</td>
                            <td className="py-2.5 px-3 font-normal text-[#115eaf]">{c.totalFee}</td>
                            <td className="py-2.5 px-5 text-right">
                              <button
      onClick={() => onSelectCourse?.(c)}
      className="tap-hit inline-flex items-center text-[#115eaf] font-medium text-xs hover:underline"
    >
                                <span>View</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                              </button>
                            </td>
                          </tr>);
  })()}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-3.5 bg-[#f9f9ff] border-t border-[#e7eeff] flex flex-wrap items-center justify-between gap-2 text-xs text-[#43474d] font-normal">
                <span>Registration Fee: ₹1,100 (adjusted during enrollment)</span>
                <button
    onClick={() => onOpenApply()}
    className="text-[#115eaf] font-semibold hover:underline"
  >
                  Apply for UG Programs →
                </button>
              </div>
            </div>

            {
    /* Table 2: Postgraduate (PG) Programs */
  }
            <div className="bg-white rounded-xl border border-[#e7eeff] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="px-5 py-3.5 bg-[#f0f3ff] border-b border-[#e7eeff] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-[#000f22] font-sans">Postgraduate (PG) Programs</h3>
                    <p className="mt-[7.5px] text-xs text-[#43474d] font-normal">Standard Duration: 2 Years / 4 Semesters</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-normal rounded-md bg-[#d5e3ff] text-[#004689]">
                    PG Degrees
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#e7eeff] text-[#43474d] text-xs font-semibold bg-[#f9f9ff]">
                        <th className="py-2.5 px-5">Course Name</th>
                        <th className="py-2.5 px-3">Duration</th>
                        <th className="py-2.5 px-3">Per Sem Fee</th>
                        <th className="py-2.5 px-3">Total Fee</th>
                        <th className="py-2.5 px-5 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7eeff]">
                      {(() => {
    const pgCourses = AMITY_UNIVERSITY_DATA.courses.filter((c) => c.level === "PG");
    return pgCourses.map((c) => <tr key={c.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
                            <td className="py-2.5 px-5 font-normal text-[#000f22]">
                              {c.code}
                              <span className="block text-[11px] font-normal text-[#74777e]">{c.name}</span>
                            </td>
                            <td className="py-2.5 px-3 text-[#43474d] font-normal">{c.duration.split(" ")[0]} Years</td>
                            <td className="py-2.5 px-3 font-normal text-[#000f22]">{c.feePerSemester}</td>
                            <td className="py-2.5 px-3 font-normal text-[#115eaf]">{c.totalFee}</td>
                            <td className="py-2.5 px-5 text-right">
                              <button
      onClick={() => onSelectCourse?.(c)}
      className="tap-hit inline-flex items-center text-[#115eaf] font-medium text-xs hover:underline"
    >
                                <span>View</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                              </button>
                            </td>
                          </tr>);
  })()}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-3.5 bg-[#f9f9ff] border-t border-[#e7eeff] flex flex-wrap items-center justify-between gap-2 text-xs text-[#43474d] font-normal">
                <span>Specializations selected during second semester</span>
                <button
    onClick={() => onOpenApply()}
    className="text-[#115eaf] font-semibold hover:underline"
  >
                  Apply for PG Programs →
                </button>
              </div>
            </div>
          </div>

          {
    /* 1-Year Diploma Special Callout Box */
  }
          <div className="mt-5 p-4 sm:p-5 rounded-xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#d8e3fb] text-[#115eaf] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-[#000f22]">
                  Interested in a Shorter Program? Check Diploma Courses
                </h4>
                <p className="mt-[7.5px] text-xs text-[#43474d] font-normal">
                  Career-focused diplomas with flexible payment options. Contact our counselors for details.
                </p>
              </div>
            </div>
            <button
    onClick={() => onOpenHelpDesk()}
    className="px-3.5 py-1.5 rounded-lg bg-white border border-[#c4c6ce] text-xs font-semibold text-[#115eaf] hover:bg-[#115eaf] hover:text-white transition-all shrink-0"
  >
              Explore Diplomas
            </button>
          </div>

          <p className="text-sm font-semibold text-[#000f22] mt-5">Payment Options</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {CP.feeStructure.paymentOptions.map((opt) => <span
    key={opt}
    className="px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]"
  >
                {opt}
              </span>)}
          </div>
        </section>

        {
    /* 5. Learning Platform — LPU "How You Study" structure */
  }
        <LmsPlatformSection
    title={AMITY_UNIVERSITY_DATA.campusAndLms.lmsPlatformTitle || `How You Study: The ${AMITY.shortName} Learning Platform`}
    items={AMITY_UNIVERSITY_DATA.campusAndLms.lmsPlatform || []}
  />

        {
    /* 6. All Courses Stream Wise */
  }
        <ProgrammeCardsSection
    sectionId="all-courses"
    title={sectionTitle(AMITY.shortName, "All Courses")}
    description={CP.streamWise.intro}
    programmes={AMITY_PROGRAMME_CARDS}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenApply={() => onOpenApply()}
  />

        {
    /* 7. Student Reviews — LPU reviews structure */
  }
        <StudentReviewsSection
    title={`${AMITY.shortName} Reviews`}
    description={`Authentic feedback from working executives, entrepreneurs, and graduates studying on ${AMITY_UNIVERSITY_DATA.campusAndLms.lmsName}`}
    testimonials={CP.testimonials.items}
  />

      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="section-container">
          {
    /* 8. Courses FAQs */
  }
          <section
    id="faqs"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(AMITY.shortName, "Courses FAQs")}
            </h2>
            <div className="space-y-3 mt-[18px]">
              {CP.faqs.map((faq, idx) => {
    const isOpen = openFaq === idx;
    return <div
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
      className={`text-[#115eaf] text-lg leading-none shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
    >
                        +
                      </span>
                    </button>
                    {isOpen && <p className="px-4 pb-4 text-xs sm:text-sm text-[#43474d] font-normal leading-relaxed border-t border-[#e7eeff] pt-3">
                        {faq.answer}
                      </p>}
                  </div>;
  })}
            </div>
          </section>

          {
    /* 9. Blogs */
  }
          <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    sectionId="blogs"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
  />

          {
    /* 10. Compare */
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

      {
    /* 11. Counselor CTA Strip — matches LPU Courses tab */
  }
      <section
    id="counselor-helpline"
    className="content-block bg-[#0b2540] text-white scroll-mt-[130px]"
  >
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
    </div>;
};
