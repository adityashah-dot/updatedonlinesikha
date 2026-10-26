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
  Users,
  Briefcase
} from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { ProgrammeCardsSection } from "./ProgrammeCardsSection";
import { AdmissionFlowSteps } from "./AdmissionFlowSteps";
import { BlogsListSection } from "./BlogsListSection";
import { sectionTitle } from "../lib/sectionTitles";
import { CU_PAGE_CONTENT as CU } from "../data/universities/cuContent";
import { getRelatedUniversities } from "../data/universities";
const TOC_ITEMS = [
  { id: "latest-news", label: sectionTitle(CU.shortName, "Latest News & Updates") },
  { id: "why-choose", label: "Why Choose Chandigarh University Online?" },
  { id: "highlights", label: sectionTitle(CU.shortName, "Highlights") },
  { id: "courses-fees", label: sectionTitle(CU.shortName, "Courses and Fees") },
  { id: "popular-programmes", label: sectionTitle(CU.shortName, "Popular Programmes") },
  { id: "eligibility-criteria", label: sectionTitle(CU.shortName, "Eligibility and Selection Criteria") },
  { id: "admission-process", label: sectionTitle(CU.shortName, "Admission Process") },
  { id: "rankings", label: sectionTitle(CU.shortName, "Rankings and Accreditations") },
  { id: "examination-pattern", label: sectionTitle(CU.shortName, "Examination Pattern") },
  { id: "placements", label: sectionTitle(CU.shortName, "Placements") },
  { id: "scholarships", label: sectionTitle(CU.shortName, "Scholarships") },
  { id: "campus", label: sectionTitle(CU.shortName, "Campus") },
  { id: "sample-degree", label: sectionTitle(CU.shortName, "Sample Degree") },
  { id: "admission-deadline", label: sectionTitle(CU.shortName, "Admission Dates") },
  { id: "reviews-section", label: sectionTitle(CU.shortName, "Reviews & FAQs") },
  { id: "compare-colleges", label: "Compare Colleges with CU Online" },
  { id: "blogs", label: "Blogs" }
];
const stripHtml = (html) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const CU_PROGRAMME_CARDS = CU.courses.map((c) => ({
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
  { src: CU.campus.image, alt: "Chandigarh University Online Campus View" },
  { src: CU.campus.image, alt: "Chandigarh University Online Campus Aerial View" }
];
export const CuOverviewView = ({
  universityNavigation,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk
}) => {
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0].id);
  const [openFaq, setOpenFaq] = useState(0);
  const related = getRelatedUniversities("cu-online", 3);
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
    const revealNodes = Array.from(document.querySelectorAll(".exam-step-reveal"));
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
            <span className="hover:text-[#115eaf] cursor-pointer">{CU.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="text-[#000f22] font-bold">Overview</span>
          </nav>
        </div>
      </div>

      {
    /* HERO — LPU college-hero layout */
  }
      <section className="bg-white text-[#000f22] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-row items-start gap-3 sm:gap-5">
            <img
    src={CU.logoImage}
    alt={`${CU.shortName} Logo`}
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
            <div className="min-w-0">
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]">
                {CU.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  #{CU.nirfRanking} NIRF Rank
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  {CU.naacGrade}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">
                  UGC Entitled
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
                <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                {CU.location} · {CU.type} · Est. {CU.established} ·{" "}
                <span className="inline-flex items-center gap-0.5 font-bold text-[#B45309]">
                  <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                  {CU.rating}
                </span>
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {CU.heroDescription}
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">{CU.heroSub}</p>
            </div>

            <div className="order-1 lg:order-none lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
    src={CU.heroImage}
    alt="Chandigarh University Online Campus"
    className="w-full h-48 sm:h-60 lg:h-64 object-cover"
    loading="lazy"
  />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]">
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">
                {CU.quickStats.feeRange}
              </span>
              <span className="text-[10px] text-[#74777e]">Fee Range</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#115eaf] font-sans">
                {CU.quickStats.duration}
              </span>
              <span className="text-[10px] text-[#74777e]">Duration</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">Online</span>
              <span className="text-[10px] text-[#74777e]">Semester-based</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#B45309] font-sans">
                {CU.quickStats.placementRate}
              </span>
              <span className="text-[10px] text-[#74777e]">Placement Rate</span>
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
    className="page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff] scroll-mt-[130px]"
  >
            <h2 className="section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Latest News and Updates")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.latestNews.description}
            </p>
            <p className="text-[11px] text-[#74777e] font-normal">{CU.latestNews.date}</p>
          </section>

          {
    /* 2. Why Choose */
  }
          <section
    id="why-choose"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              Why Choose Chandigarh University Online?
            </h2>
            {CU.whyChoose.paragraphs.map((p, idx) => <p
    key={idx}
    className="section-description text-sm text-[#2d3137] leading-relaxed font-normal"
  >
                {p}
              </p>)}
            <ul className="mt-3 space-y-3">
              {CU.whyChoose.bullets.map((b) => <li key={b.title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                    <strong className="font-semibold text-[#000f22]">{b.title}</strong> {b.text}
                  </p>
                </li>)}
            </ul>

            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                Unlock Full College Insights to Choose the Right Program for Your Future
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

          {
    /* 3. Highlights */
  }
          <section
    id="highlights"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {sectionTitle(CU.shortName, "Highlights")}
              </h2>
              <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2 min-h-[44px] bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5 shadow-xs"
  >
                <Download className="w-3.5 h-3.5" />
                <span>Download Factsheet</span>
              </button>
            </div>
            <p className="section-description mt-[18px] text-sm font-normal text-[#2d3137] leading-relaxed">
              {CU.highlightsIntro}
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
                  {CU.highlightsTable.map((row, idx) => <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-normal text-[#000f22]">{row.label}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 4. Courses & Fees */
  }
          <section
    id="courses-fees"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Courses and Fees")}
            </h2>
            <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
              {CU.coursesIntro}
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
                  {CU.courses.map((c) => <tr key={c.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
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
                Need a custom fee breakdown or EMI plan for CU Online courses?
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

          {
    /* 5. Popular Programmes */
  }
          <ProgrammeCardsSection
    sectionId="popular-programmes"
    title="CU Online Popular Programmes"
    description={CU.popularProgrammesIntro}
    programmes={CU_PROGRAMME_CARDS}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenApply={() => onOpenApply()}
  />

          {
    /* 6. Eligibility and Selection Criteria */
  }
          <section
    id="eligibility-criteria"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Eligibility and Selection Criteria")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.eligibility.intro}
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
                  {CU.eligibility.rows.map((row) => <tr key={row.course} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.course}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.eligibility}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.selection}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 7. Admission Process */
  }
          <section
    id="admission-process"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Admission Process")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.admission.intro}
            </p>
            <AdmissionFlowSteps
    steps={CU.admission.steps.map((s) => ({
      title: s.title,
      description: s.description
    }))}
  />
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Program Type</th>
                    <th className="py-3 px-4 font-bold">Eligibility</th>
                    <th className="py-3 px-4 font-bold">Duration</th>
                    <th className="py-3 px-4 font-bold">Total Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {CU.admission.eligibilityMatrix.map((row) => <tr key={row.course} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.course}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.eligibility}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.duration}</td>
                      <td className="py-2.5 px-4 font-semibold text-[#115eaf]">{row.totalFee}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 7. Rankings & Accreditations */
  }
          <section
    id="rankings"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Rankings and Accreditations")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.rankings.intro}
            </p>
            <ul className="mt-3 space-y-3">
              {CU.rankings.bullets.map((b) => <li key={b.title} className="flex items-start gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                    <strong className="font-semibold text-[#000f22]">{b.title}</strong> {b.text}
                  </p>
                </li>)}
            </ul>
            <p className="text-sm text-[#2d3137] leading-relaxed font-normal mt-3">
              {CU.rankings.outro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0b2540] text-white">
                    <th className="py-3 px-4 font-bold">Authority</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff]">
                  {CU.rankings.table.map((row) => <tr key={row.authority} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.authority}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.status}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
              <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                Ready to apply? Let a CU Online expert assist you.
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

          {
    /* 8. Placements */
  }
          <section
    id="examination-pattern"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Examination Pattern")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.examination.intro}
            </p>
            <style>{`
              .cu-exam-step {
                --cu-exam-badge-w: 78px;
                position: relative;
                display: grid;
                grid-template-columns: calc(var(--cu-exam-badge-w) + 18px) minmax(0, 1fr);
                padding-bottom: 30px;
              }
              .cu-exam-step:last-child {
                padding-bottom: 0;
              }
              .cu-exam-step:not(:last-child)::before {
                content: "";
                position: absolute;
                left: calc(var(--cu-exam-badge-w) / 2 - 5px);
                top: 40px;
                bottom: 6px;
                width: 3px;
                background: repeating-linear-gradient(180deg, #0b2540 0 4px, transparent 4px 9px);
                animation: cu-exam-flow-down 0.9s linear infinite;
              }
              @keyframes cu-exam-flow-down {
                from { background-position: 0 0; }
                to { background-position: 0 9px; }
              }
              .cu-exam-badge {
                width: var(--cu-exam-badge-w);
                height: 34px;
                display: grid;
                place-items: center;
                background: #0b2540;
                color: #fff;
                font-size: 13px;
                font-weight: 600;
                clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
              }
              .cu-exam-badge span {
                padding-right: 6px;
              }
              .cu-exam-body h3 {
                margin: 2px 0 3px;
                font-size: 18px;
                font-weight: 600;
                line-height: 1.35;
                color: #000f22;
              }
              .cu-exam-body p {
                margin: 0;
                font-size: 15px;
                line-height: 1.55;
                color: #43474d;
              }
              .exam-step-reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
              }
              .exam-step-reveal.show {
                opacity: 1;
                transform: none;
              }
              @media (max-width: 640px) {
                .cu-exam-step {
                  --cu-exam-badge-w: 66px;
                }
                .cu-exam-badge {
                  font-size: 12px;
                }
                .cu-exam-body h3 {
                  font-size: 16px;
                }
                .cu-exam-body p {
                  font-size: 14px;
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .cu-exam-step::before,
                .exam-step-reveal {
                  animation: none !important;
                  transition: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                }
              }
            `}</style>
            <div className="mt-[18px]">
              {CU.examination.steps.map((step, index) => <div key={step.title} className="cu-exam-step exam-step-reveal">
                  <div>
                    <div className="cu-exam-badge">
                      <span>Step {String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="cu-exam-body">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>)}
            </div>
          </section>

<section
    id="placements"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Placements")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.placements.intro}
            </p>
            <ul className="mt-3 space-y-3">
              {CU.placements.bullets.map((b) => <li key={b.title} className="flex items-start gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#115eaf] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                    <strong className="font-semibold text-[#000f22]">{b.title}</strong>: {b.text}
                  </p>
                </li>)}
            </ul>
            <p className="text-sm text-[#2d3137] leading-relaxed font-normal mt-3">
              {CU.placements.outro}
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
                  {CU.placements.table.map((row) => <tr key={row.authority} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.authority}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.status}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]">
              {CU.placements.stats.map((s) => <div
    key={s.label}
    className="p-4 bg-[#f9f9ff] border border-[#e7eeff] rounded-xl text-center"
  >
                  <span className="block text-lg font-bold text-[#115eaf] font-sans tabular-nums">
                    {s.value}
                  </span>
                  <span className="block text-[10px] text-[#74777e] font-normal mt-0.5">
                    {s.label}
                  </span>
                </div>)}
            </div>
            <h3 className="text-base font-semibold text-[#000f22] mt-5">Top Recruiters</h3>
            <div className="relative overflow-hidden mt-3">
              <div className="flex items-center gap-4 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
                {[...CU.placements.recruiters, ...CU.placements.recruiters].map((r, idx) => <div
    key={`${r.name}-${idx}`}
    className="h-20 min-w-[125px] px-3.5 shrink-0 bg-white border border-[#e7eeff] rounded-xl p-3 flex flex-col items-center justify-center gap-1 shadow-xs"
  >
                    {r.logoUrl ? <img
    src={r.logoUrl}
    alt={r.name}
    className="max-h-7 max-w-[80px] object-contain"
    loading="lazy"
  /> : <span className="text-xs font-bold text-[#000f22]">{r.name}</span>}
                    <span className="text-[10px] font-medium text-[#43474d] text-center truncate max-w-full">
                      {r.name}
                    </span>
                  </div>)}
              </div>
            </div>
          </section>

          {
    /* 9. Scholarships */
  }
          <section
    id="scholarships"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Scholarships")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.scholarships.intro}
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
                  {CU.scholarships.table.map((row) => <tr key={row.type} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#000f22]">{row.type}</td>
                      <td className="py-2.5 px-4 font-normal text-[#115eaf]">{row.benefit}</td>
                      <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.who}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {
    /* 10. Campus Gallery */
  }
          <section
    id="campus"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {sectionTitle(CU.shortName, "Campus")}
              </h2>
              <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal">
                {CU.campus.description}
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
                  {CU.campus.travelTable.map((row) => <tr key={row.mode} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-3.5 px-4 font-normal text-[#000f22] align-top whitespace-nowrap">
                        {row.mode}
                      </td>
                      <td className="py-3.5 px-4 text-[#43474d] leading-relaxed font-normal">
                        {row.detail}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>

            <style>{`
              .cu-campus-marquee {
                overflow: hidden;
                position: relative;
                border-radius: 18px;
                border: 1px solid #e7eeff;
                background: #f0f3ff;
                margin-top: 18px;
                padding: 10px;
              }
              .cu-campus-marquee-track {
                display: flex;
                align-items: stretch;
                gap: 14px;
                width: max-content;
                padding-right: 10px;
                animation: cu-campus-marquee 24s linear infinite;
              }
              .cu-campus-marquee-track:hover {
                animation-play-state: paused;
              }
              .cu-campus-marquee-item {
                flex: 0 0 auto;
                width: min(320px, 72vw);
                background: #ffffff;
                overflow: hidden;
                border: 1px solid #e7eeff;
                border-radius: 18px;
                box-shadow: 0 10px 24px rgba(18, 37, 71, 0.08);
              }
              .cu-campus-marquee-item img {
                display: block;
                width: 100%;
                height: 220px;
                object-fit: cover;
                border-radius: 18px 18px 0 0;
              }
              .cu-campus-marquee-item figcaption {
                padding: 10px 12px;
                font-size: 11px;
                color: #43474d;
                background: white;
                border-top: 1px solid #e7eeff;
                border-radius: 0 0 18px 18px;
              }
              @keyframes cu-campus-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @media (max-width: 640px) {
                .cu-campus-marquee { padding: 8px; }
                .cu-campus-marquee-track { gap: 10px; }
                .cu-campus-marquee-item { width: min(280px, 80vw); }
                .cu-campus-marquee-item img { height: 180px; }
              }
            `}</style>

            <div className="cu-campus-marquee">
              <div className="cu-campus-marquee-track">
                {[...CAMPUS_IMAGES, ...CAMPUS_IMAGES].map((image, index) => <figure key={`${image.src}-${index}`} className="cu-campus-marquee-item">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.alt}</figcaption>
                  </figure>)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 mt-[18px]">
              {["Mohali Campus", "Study Anywhere", "Digital LMS", "Career Support"].map((item) => <span
    key={item}
    className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] text-[11px] font-normal text-[#115eaf]"
  >
                  {item}
                </span>)}
            </div>
          </section>

          {
    /* 11. Examination Pattern */
  }
          

          {
    /* 11. Sample Degree */
  }
          <section
    id="sample-degree"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Sample Degree")}
            </h2>
            <span className="block w-12 h-[4px] rounded-[4px] bg-[#115eaf] mt-1" />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-5 items-center mt-3">
              <div className="min-w-0 space-y-2.5">
                <p className="text-[13px] text-[#2d3137] leading-relaxed font-normal">
                  {CU.sampleDegree.description}
                </p>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#2d3137] font-normal leading-relaxed">
                    Same legal validity as a regular on-campus degree — not marked as online or distance.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#2d3137] font-normal leading-relaxed">
                    Valid for government jobs, private sector roles, and higher education.
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
    src={CU.sampleDegree.image}
    alt="CU Online Sample Degree Certificate"
    className="w-full object-contain"
    loading="lazy"
  />
              </div>
            </div>
          </section>

          {
    /* 12. Admission Deadline */
  }
          <section
    id="admission-deadline"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Admission Dates")}
            </h2>
            <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
              {CU.admissionDeadline.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-[18px]">
              {CU.admissionDeadline.dates.map((d) => <div
    key={d.event}
    className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff]"
  >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#115eaf]" />
                    <span
    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${d.status === "Active" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-amber-50 text-amber-900 border border-amber-200"}`}
  >
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#43474d] font-normal">{d.event}</p>
                  <p className="text-sm font-semibold text-[#000f22] mt-0.5">{d.date}</p>
                </div>)}
            </div>
            <h3 className="text-base font-semibold text-[#000f22] mt-5">
              {CU.admissionDeadline.h3}
            </h3>
            <p className="text-sm text-[#2d3137] leading-relaxed font-normal mt-2">
              {CU.admissionDeadline.body}
            </p>
            <button
    onClick={() => onOpenApply()}
    className="mt-4 px-6 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#004689] active:scale-95 transition-all inline-flex items-center gap-2"
  >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

          {
    /* 13. Reviews + FAQs */
  }
          <section
    id="reviews-section"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              {sectionTitle(CU.shortName, "Reviews")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
              {CU.testimonials.items.map((t) => <div
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
                      {Array.from({ length: 5 }).map((_, i) => <Star
    key={i}
    className={`w-3 h-3 ${i < t.rating ? "fill-[#D97706] text-[#D97706]" : "text-[#c4c6ce]"}`}
  />)}
                    </div>
                  </div>
                </div>)}
            </div>

            <h3 className="text-lg font-bold text-[#000f22] font-sans mt-6">
              Frequently Asked Questions (CU Online)
            </h3>
            <div className="space-y-3 mt-3">
              {CU.faqs.map((faq, idx) => {
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
    /* 14. Compare Colleges */
  }
          <section
    id="compare-colleges"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]"
  >
            <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              Compare Colleges with CU Online
            </h2>
            <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
              {CU.compareIntro}
            </p>

            {
    /* MAIN COMPARISON BOX — same as LPU */
  }
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-[#e7eeff] rounded-2xl bg-white shadow-sm mt-[18px]">
              {
    /* CU COLLEGE CARD */
  }
              <div className="min-h-[220px] rounded-xl border border-[#e7eeff] bg-[#f0f3ff] p-4 flex flex-col justify-between">
                <div>
                  <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold">
                    Selected
                  </span>

                  <div className="flex gap-4 items-center">
                    <div className="w-[115px] h-[85px] shrink-0 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center overflow-hidden">
                      <img
    src={CU.logoImage}
    alt="CU Online Logo"
    className="max-w-full max-h-full object-contain p-1.5"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-[19px] leading-tight font-extrabold text-[#000f22] font-sans">
                        {CU.title}
                      </h3>
                      <p className="mt-[7.5px] flex items-center gap-1.5 text-sm text-[#43474d]">
                        <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                        {CU.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {["UGC Entitled", "NAAC A+", "NIRF #19", "100% Online"].map((tag) => <span
    key={tag}
    className="px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]"
  >
                        {tag}
                      </span>)}
                  </div>
                </div>

                <button
    onClick={() => onOpenBrochure()}
    className="w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#115eaf] bg-white text-[#115eaf] text-sm font-bold hover:bg-[#f0f3ff] transition-all"
  >
                  <Download className="w-4 h-4" />
                  Brochure
                </button>
              </div>

              {
    /* VS */
  }
              <div className="flex items-center justify-center">
                <span className="w-11 h-11 rounded-full flex items-center justify-center bg-[#115eaf] text-white text-sm font-extrabold">
                  VS
                </span>
              </div>

              {
    /* ADD COLLEGE CARD */
  }
              <div className="min-h-[220px] rounded-xl border border-dashed border-[#d5e3ff] bg-[#f9f9ff] p-4 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full border border-[#d5e3ff] bg-white flex items-center justify-center text-[#115eaf] text-2xl font-light mb-2.5">
                  +
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#000f22] font-sans">Add College</h3>
                  <p className="mt-[7.5px] text-[13px] leading-relaxed text-[#43474d] font-normal">
                    Select another college to compare side by side.
                  </p>
                </div>
                <button
    onClick={() => onOpenHelpDesk()}
    className="w-full h-11 mt-4 rounded-lg border-none bg-[#0b2540] text-white text-sm font-bold hover:bg-[#011c37] transition-all"
  >
                  Add College
                </button>
              </div>
            </div>
          </section>

          {
    /* 15. Blogs */
  }
          <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    sectionId="blogs"
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
    compact
  />
        </div>
      </div>
    </div>;
};
