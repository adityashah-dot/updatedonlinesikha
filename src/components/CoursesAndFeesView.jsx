import { BlogsListSection } from "./BlogsListSection";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Award,
  Calculator,
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  Gift,
  Laptop,
  Layers,
  PhoneCall,
  Search,
  Video,
  BookOpen,
  Smartphone,
  Users,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import { FaqAccordion } from "./FaqAccordion";

import CollegeTableOfContents from "./CollegeTableOfContents";
import { useSiteActions } from "./shell/SiteActionsContext";
import { CURRENT_YEAR } from "../constants/years";

const PLATFORM_ICON = {
  video: Video,
  book: BookOpen,
  smartphone: Smartphone,
  users: Users,
};

const METRIC_ICON = {
  rating: Award,
  online: Laptop,
  fee: CreditCard,
  courses: Layers,
};

const SORT_OPTIONS = [
  { value: "popularity", label: "Sort: Popularity" },
  { value: "fee-asc", label: "Fee: Low to High" },
  { value: "fee-desc", label: "Fee: High to Low" },
  { value: "duration", label: "Duration" },
];

const DEFAULT_FEE_NOTE = "Fees include exam charges, LMS access & digital material";

function numericFee(value) {
  if (typeof value === "number") return value;

  const digits = String(value || "").replace(/[^\d.]/g, "");

  return digits ? Number(digits) : 0;
}

function formatCourseFee(value) {
  if (value == null || value === "") return "—";
  const amount = numericFee(value);
  return amount ? `₹${amount.toLocaleString("en-IN")}` : String(value);
}

function durationYears(value) {
  const match = String(value || "").match(/([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

/**
 * Reusable "Courses & Fees" template.
 *
 * Every value comes from the props (`college` + `coursesData`), which are
 * built from the live CMS/API model in `services/coursesViewMapper.js`.
 * Nothing in this component is college specific.
 */
export default function CoursesAndFeesView({
  college = {},
  coursesData = {},
  overview = {},
  universityNavigation,
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenEmi,
  onOpenHelpDesk,
}) {
  const siteActions = useSiteActions();

  const apply = onOpenApply || siteActions.onOpenApply;
  const brochure = onOpenBrochure || siteActions.onOpenBrochure;
  const helpDesk = onOpenHelpDesk || siteActions.onOpenHelpDesk;
  const emi = onOpenEmi || siteActions.onOpenEmi;

  const [activeSection, setActiveSection] = useState("fee-structure");

  /* FAQ accordion state lives inside the shared FaqAccordion component. */

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [campusImageFailed, setCampusImageFailed] = useState(false);

  const courses = coursesData.courses || [];
  const categories = coursesData.courseCategories || [];
  const tocItems = coursesData.toc || [];
  const metrics = coursesData.metrics || [];
  const admissionInfo = coursesData.admissionInfo || {};
  const universityName =
    overview.shortName || college.college?.shortName || college.name || "";
  const learningPlatformName = String(coursesData.learningPlatform?.title || "")
    .replace(/^How You Study\s*:?\s*(?:The\s+)?/i, "")
    .trim() || (universityName ? `${universityName} Learning Platform` : "Learning Platform");

  // Campus image of the hero slot. The API publishes it on the college
  // record (`college_id.collegeImage`); when it is missing the slot falls
  // back to a neutral placeholder instead of a broken image.
  const campusImage =
    college.college?.collegeImage || overview.hero?.backgroundImage || "";
  const collegeName =
    college.college?.name || college.name || college.title || overview.title || "";

  const visibleCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = courses.filter((course) => {
      const matchesCategory = category === "all" || course.category === category;

      const matchesSearch =
        !query ||
        String(course.name || "").toLowerCase().includes(query) ||
        String(course.code || "").toLowerCase().includes(query) ||
        String(course.shortDescription || "").toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((first, second) => {
      if (sortBy === "fee-asc") {
        return numericFee(first.totalFee) - numericFee(second.totalFee);
      }

      if (sortBy === "fee-desc") {
        return numericFee(second.totalFee) - numericFee(first.totalFee);
      }

      if (sortBy === "duration") {
        return durationYears(first.duration) - durationYears(second.duration);
      }

      return 0;
    });
  }, [courses, category, searchQuery, sortBy]);

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

  const feeRows = courses;
  const reviews = coursesData.reviews || [];
  const faqs = coursesData.faqs || [];
  const blogs = coursesData.blogs || [];
  const learningRows = coursesData.learningPlatform?.items || [];
  const admissionDates = coursesData.admissionDates || [];

  const renderFeeTable = (rows, label, badge, subtitle, key) => (
    <div key={key} className="bg-white rounded-xl border border-brand-100 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="px-5 py-3.5 bg-brand-50 border-b border-brand-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-ink-900">
              {label}
            </h3>
            {subtitle ? (
              <p className="mt-[7.5px] text-xs text-ink-700 font-normal">
                Standard Duration: {subtitle}
              </p>
            ) : null}
          </div>
          <span className="px-2 py-0.5 text-xs font-normal rounded-md bg-brand-200 text-brand-900">
            {badge}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-brand-600 text-white">
                <th className="py-3 px-4 font-bold">Course Name</th>
                <th className="py-3 px-4 font-bold">Duration</th>
                <th className="py-3 px-4 font-bold">Per Sem Fee</th>
                <th className="py-3 px-4 font-bold">Total Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {rows.map((row, idx) => (
                <tr
                  key={`${row.code || row.name}-${idx}`}
                  className="bg-white hover:bg-brand-50/60 transition-colors"
                >
                  <td className="py-3.5 px-4 text-ink-900 font-bold align-top">
                    {row.name}
                    {row.specializations ? (
                      <span className="block text-[10px] text-ink-500 font-normal leading-tight">
                        {row.specializations}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3.5 px-4 text-ink-700 font-normal align-top whitespace-nowrap">
                    {row.duration}
                  </td>
                  <td className="py-3.5 px-4 text-ink-700 font-normal align-top whitespace-nowrap">
                    {row.perSemFee || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-brand-600 font-semibold align-top whitespace-nowrap">
                    {row.avgFees || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-3.5 py-1.5 bg-canvas border-t border-brand-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-ink-700 font-normal">
          {coursesData.coursesFees?.feeNote || DEFAULT_FEE_NOTE}
        </span>
        <span className="px-2 py-0.5 rounded-[7px] bg-white border border-brand-200 text-[11px] font-normal text-ink-700">
          Pay per semester
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-0">
      {/* Breadcrumb */}
      <div className="bg-brand-50 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-ink-700 space-x-2 font-medium">
            <span className="hover:text-brand-600 cursor-pointer">Home</span>
            <span className="text-ink-500">/</span>
            <span className="hover:text-brand-600 cursor-pointer">Colleges</span>
            <span className="text-ink-500">/</span>
            <span className="hover:text-brand-600 cursor-pointer">
              {college.name || college.title || overview.title}
            </span>
            <span className="text-ink-500">/</span>
            <span className="text-ink-900 font-bold">Courses &amp; Fees</span>
          </nav>
        </div>
      </div>

      <section className="content-block relative bg-gradient-to-b from-brand-50 via-canvas to-canvas overflow-hidden border-b border-brand-100/60">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-200 blur-3xl" />
          <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-brand-200 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div>
                <h1 className="section-title font-bold text-ink-900 tracking-tight font-sans leading-tight">
                  {coursesData.coursesFees?.title || overview.title}
                </h1>
                {coursesData.coursesFees?.description ? (
                  <p className="section-description text-xs sm:text-sm text-ink-700 max-w-3xl leading-relaxed font-normal">
                    {coursesData.coursesFees.description}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => apply?.()}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Apply Online</span>
                </button>

                <button
                  type="button"
                  onClick={() => brochure?.()}
                  className="px-4 py-2.5 rounded-xl bg-white text-ink-900 border border-brand-900 text-xs sm:text-sm font-semibold hover:bg-brand-50 active:scale-95 transition-all shadow-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-brand-600" />
                  <span>Download Complete Fee Brochure</span>
                </button>

                <button
                  type="button"
                  onClick={() => helpDesk?.()}
                  className="tap-chip px-3.5 py-2.5 rounded-xl text-brand-600 hover:bg-brand-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to an Academic Counselor</span>
                </button>
              </div>

              {metrics.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {metrics.map((metric) => {
                    const Icon = METRIC_ICON[metric.icon] || Award;

                    return (
                      <div
                        key={metric.label}
                        className="p-4 rounded-xl bg-white border border-brand-100 flex flex-col justify-between"
                      >
                        <div className="w-7 h-7 rounded-lg bg-brand-200 text-brand-600 flex items-center justify-center mb-1.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-ink-900 font-sans">
                            {metric.value}
                          </div>
                          <div className="text-[11px] text-ink-700 mt-0.5 font-normal">
                            {metric.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-4 space-y-4">
              {/* Campus image slot — shows the API image, else a placeholder */}
              <div className="rounded-2xl overflow-hidden border border-brand-100 shadow-xs bg-canvas">
                {campusImage && !campusImageFailed ? (
                  <img
                    src={campusImage}
                    alt={`${collegeName} Campus`}
                    className="w-full h-48 sm:h-60 object-cover"
                    loading="lazy"
                    onError={() => setCampusImageFailed(true)}
                  />
                ) : (
                  <div className="h-48 sm:h-60 w-full flex flex-col items-center justify-center gap-2 text-center px-6 bg-white">
                    <ImageIcon className="w-8 h-8 text-brand-600" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-semibold text-ink-900 font-sans">
                      {collegeName}
                    </span>
                    <span className="text-[11px] font-normal text-ink-500">
                      Campus image placeholder
                    </span>
                  </div>
                )}
              </div>

              {admissionInfo.status || admissionInfo.deadline ? (
                <div className="rounded-xl p-4 sm:p-5 bg-white border border-brand-600/25 shadow-md relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-200/50 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between pb-3 border-b border-brand-100">
                    <div className="flex items-center gap-2">
                      {admissionInfo.status ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      ) : null}
                      <span className="text-xs sm:text-sm font-normal text-ink-900">
                        {admissionInfo.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 py-3.5 text-xs">
                    {admissionInfo.deadline ? (
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[11px] text-ink-700 block font-normal">
                            Registration Deadline
                          </span>
                          <span className="text-xs sm:text-sm font-normal text-ink-900">
                            {admissionInfo.deadline}
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {admissionInfo.grant ? (
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-accent-50 flex items-center justify-center shrink-0 text-[#92400E]">
                          <Award className="w-3.5 h-3.5 text-accent-500" />
                        </div>
                        <div>
                          <span className="text-[11px] text-ink-700 block font-normal">
                            Tuition Fee Grant
                          </span>
                          <span className="text-xs sm:text-sm font-normal text-accent-700">
                            {admissionInfo.grant}
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {admissionInfo.emi ? (
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                          <CreditCard className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[11px] text-ink-700 block font-normal">
                            Monthly Payment Option
                          </span>
                          <span className="text-xs sm:text-sm font-normal text-ink-900">
                            {admissionInfo.emi}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="pt-2 border-t border-brand-100 flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => apply?.()}
                      className="w-full py-2.5 rounded-lg bg-brand-600 text-white text-xs sm:text-sm font-semibold hover:bg-ink-900 active:scale-95 transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-center text-[10px] text-ink-500 font-normal">
                      Direct merit-based admission with online document verification
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-10">
        <div className="section-container">
          <CollegeTableOfContents
            title="Table of contents"
            items={tocItems}
            activeId={activeSection}
            onItemClick={(id) => setActiveSection(id)}
            defaultExpanded={false}
            collapsedCount={6}
          />

          {/* 1. Fee Structure */}
          {feeRows.length > 0 && (
            <section
              id="fee-structure"
              className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[100px]"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-3">
                <div>
                  <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
                    {coursesData.coursesFees?.title}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink-700 font-normal">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Includes Exam Fees, LMS Access &amp; Digital Material</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categories.map((entry) =>
                  renderFeeTable(
                    courses.filter((course) => course.category === entry.key),
                    entry.title,
                    entry.badge,
                    coursesData.coursesFees?.durationLabel,
                    entry.key
                  )
                )}
              </div>
            </section>
          )}

          {/* EMI banner */}
          <section className="content-block">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-brand-100 via-brand-50 to-brand-200 border border-brand-600/30">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[11px] bg-brand-600 text-white flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-ink-900 font-sans">
                    Flexible Fee Payment and Zero-Cost EMI
                  </strong>
                  <p className="mt-0.5 text-[11px] text-ink-700 font-normal">
                    Pay semester-wise and check your monthly plan before you
                    apply.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => emi?.()}
                className="px-5 py-3 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculate EMI
              </button>
            </div>
          </section>

          {/* 2. All Courses */}
          {courses.length > 0 && (
            <section
              id="all-courses"
              className="page-section card bg-brand-50/50 rounded-2xl border border-brand-100 shadow-xs scroll-mt-[100px]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left max-w-3xl mb-[18px]">
                  <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
                    {universityName ? `${universityName} All Courses` : "All Courses"}
                  </h2>
                  {coursesData.coursesFees?.description ? (
                    <p className="section-description text-xs sm:text-sm text-ink-700 font-normal leading-relaxed text-left">
                      {coursesData.coursesFees.description}
                    </p>
                  ) : null}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 mt-[18px]">
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    aria-pressed={category === "all"}
                    className={`tap-chip h-8 px-3.5 rounded-2xl border text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                      category === "all"
                        ? "bg-brand-600 border-brand-600 text-white"
                        : "bg-white border-line text-ink-700"
                    }`}
                  >
                    All Courses ({courses.length})
                  </button>

                  {categories.map((entry) => (
                    <button
                      key={entry.key}
                      type="button"
                      onClick={() => setCategory(entry.key)}
                      aria-pressed={category === entry.key}
                      className={`tap-chip h-8 px-3.5 rounded-2xl border text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                        category === entry.key
                          ? "bg-brand-600 border-brand-600 text-white"
                          : "bg-white border-line text-ink-700"
                      }`}
                    >
                      {entry.badge} ({entry.count})
                    </button>
                  ))}

                  <div className="ml-auto flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      aria-label="Sort programmes"
                      className="h-8 px-2.5 rounded-2xl border border-line bg-white text-xs font-medium text-ink-700 focus:outline-none focus:border-brand-600 cursor-pointer"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative mt-[18px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search programmes" placeholder="Search programmes"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-100 bg-canvas text-sm text-ink-900 font-normal placeholder:text-ink-500 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                </div>

                {visibleCourses.length === 0 ? (
                  <div className="mt-[18px] rounded-xl border border-brand-100 bg-white py-10 text-center">
                    <Search className="mx-auto mb-2 h-8 w-8 text-ink-500" />
                    <h3 className="text-sm font-semibold text-ink-900">No programs match your search</h3>
                    <p className="mt-[7.5px] text-xs font-normal text-ink-700">
                      Try another search or reset your selected filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("all");
                        setSearchQuery("");
                      }}
                      className="mt-3 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-medium text-white"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="mt-[18px] grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {visibleCourses.map((course, idx) => {
                      const level = String(course.category || "").toLowerCase();
                      const levelLabel = level === "pg" ? "PG" : level === "diploma" ? "Diploma" : "UG";
                      const feePerSemester = course.perSemFee || "";
                      const totalFee = course.totalFee ?? course.avgFees;
                      const selectCourse = () => onSelectCourse?.({
                        ...course,
                        level: levelLabel.toUpperCase(),
                        description: course.shortDescription || "",
                      });

                      return (
                        <article
                          key={`${course.code || course.name}-${idx}`}
                          className="relative flex flex-col justify-between rounded-xl border border-brand-100 bg-white p-4 shadow-xs transition-all duration-200 hover:border-brand-600/60 hover:shadow-xs sm:p-5"
                        >
                          <div>
                            <div className="mb-1.5 flex items-center justify-between gap-2">
                              <span className={`rounded px-2 py-0.5 text-[10px] font-normal ${
                                level === "pg"
                                  ? "bg-brand-200 text-brand-700"
                                  : level === "diploma"
                                    ? "bg-[#ffdcc3] text-[#6e3900]"
                                    : "bg-brand-100 text-brand-900"
                              }`}>
                                {levelLabel}
                              </span>
                              {course.duration ? (
                                <span className="flex items-center gap-1 text-[11px] font-normal text-ink-500">
                                  <Calendar className="h-3 w-3" />
                                  {course.duration}
                                </span>
                              ) : null}
                            </div>

                            <button
                              type="button"
                              onClick={selectCourse}
                              title={course.name}
                              className="text-left text-sm font-semibold leading-snug text-ink-900 transition-colors hover:text-brand-600 sm:text-[15px]"
                            >
                              {course.name}
                            </button>
                            {course.shortDescription ? (
                              <p className="mt-[7.5px] line-clamp-2 text-[11px] font-normal leading-relaxed text-ink-700 sm:text-xs">
                                {course.shortDescription}
                              </p>
                            ) : null}

                            <div className="mt-2.5 flex items-baseline justify-between border-t border-brand-50 pt-2.5">
                              <span className="text-[10px] font-normal uppercase tracking-wide text-ink-500">Total Fee</span>
                              <div className="text-right">
                                <span className="text-sm font-normal text-ink-900 sm:text-[15px]">
                                  {formatCourseFee(totalFee)}
                                </span>
                                {feePerSemester ? (
                                  <span className="ml-1 text-[10px] text-ink-500">
                                    ({formatCourseFee(feePerSemester)}/sem)
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={selectCourse}
                              className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-brand-600 px-2 py-1.5 text-center text-[11px] font-medium text-white shadow-xs transition-all hover:bg-brand-700 active:scale-95 md:min-h-0"
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => brochure?.(course)}
                              className="flex min-h-[44px] w-full items-center justify-center gap-1 rounded-lg border border-brand-200 bg-brand-50 px-2 py-1.5 text-[11px] font-normal text-ink-900 transition-colors hover:bg-brand-100 md:min-h-0"
                            >
                              <Download className="h-3 w-3 text-brand-600" />
                              Syllabus
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 3. University Admission Dates */}
          {admissionDates.length > 0 && (
            <section
              id="admission-dates"
              className="page-section relative w-full max-w-full scroll-mt-[100px]"
            >
              <div>
                <div className="overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-canvas via-brand-50 to-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-brand-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h2 className="section-title text-xl sm:text-2xl font-bold tracking-tight text-ink-900">
                      {universityName ? `${universityName} Admission Dates ${CURRENT_YEAR}` : `Admission Dates ${CURRENT_YEAR}`}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => apply?.()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-600 bg-white px-4 py-2.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-100 sm:text-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    View Admission Portal
                  </button>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-xs font-normal leading-relaxed text-ink-700 sm:text-sm">
                    <button
                      type="button"
                      onClick={() => apply?.()}
                      className="font-semibold text-brand-600 hover:underline"
                    >
                      {universityName ? `${universityName} admission` : "University admission"}
                    </button>{" "}
                    applications are submitted online. Check the dates below and use the admission portal to begin your application.
                  </p>

                  <div className="mt-5 overflow-hidden rounded-xl border border-brand-200 bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-brand-600 text-white">
                            <th className="px-4 py-3 font-bold">Event</th>
                            <th className="px-4 py-3 font-bold">Details</th>
                            <th className="px-4 py-3 font-bold">Tentative Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-100">
                          {admissionDates.map((item, idx) => (
                            <tr key={`${item.title}-${idx}`} className="transition-colors hover:bg-brand-50/60">
                              <td className="px-4 py-3.5 font-bold text-ink-900">{item.title}</td>
                              <td className="px-4 py-3.5 text-ink-700">{item.description || "—"}</td>
                              <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-brand-600">{item.date || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </section>
          )}

          {/* 4. Learning Platform */}
          {learningRows.length > 0 && (
            <section
              id="learning-platform"
              className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[100px]"
            >
              <div className="mb-[18px]">
                <h2 className="section-title text-xl sm:text-2xl font-bold tracking-tight text-ink-900">
                  How You Study: The {learningPlatformName}
                </h2>
              </div>

              <ul className="border-t border-brand-100">
                {learningRows.map((item, idx) => {
                  const Icon = PLATFORM_ICON[item.icon] || Video;

                  return (
                    <li
                      key={idx}
                      className="group grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-2 py-5 sm:py-6 border-b border-brand-100"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-[10px] font-normal text-line-strong tabular-nums sm:hidden mt-2.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-ink-900 sm:text-base">
                          {item.title}
                        </h3>
                        {item.description ? (
                          <p className="text-xs text-ink-700 mt-[7.5px] leading-relaxed font-normal max-w-2xl">
                            {item.description}
                          </p>
                        ) : null}
                      </div>

                      {item.meta ? (
                        <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:self-center flex items-center gap-2 text-xs font-medium text-brand-600 whitespace-nowrap">
                          <span>{item.meta}</span>
                          <span>
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                          </span>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* 5. Student Reviews */}
          {reviews.length > 0 && (
            <section
              id="student-reviews"
              className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[100px]"
            >
              <div className="w-full">
                <div className="text-left mb-[18px]">
                  <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
                    {overview.reviewsMeta?.title ||
                      (universityName
                        ? `${universityName} Online Student Reviews & Ratings`
                        : "Student Reviews")}
                  </h2>
                  <p className="section-description text-xs text-ink-500 mt-1">
                    Authentic feedback from working executives, entrepreneurs, and
                    graduates
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {reviews.slice(0, 6).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-canvas p-4 rounded-xl border border-brand-100 flex flex-col justify-between hover:border-brand-600 transition-all hover:shadow-sm"
                    >
                      <div>
                        <div className="flex items-center text-amber-500 mb-2 gap-0.5">
                          {[...Array(Math.max(0, Math.min(5, Math.round(Number(item.rating) || 0))))].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-ink-700 italic leading-relaxed font-normal line-clamp-3">
                          &quot;{item.review}&quot;
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-brand-200">
                        <div className="w-8 h-8 rounded-full bg-white text-brand-600 flex items-center justify-center font-bold text-xs shadow-sm border border-brand-100 shrink-0">
                          {item.avatar || (item.name || "S").charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-ink-900 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-ink-500 font-medium truncate">
                            {item.course || "Online Student"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 7. Blogs */}
          <BlogsListSection
            onOpenHelpDesk={helpDesk}
            sectionId="blogs"
            className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs p-5 md:p-6"
            posts={blogs}
            fetchLivePosts
            horizontal
          />

          {/* 8. Counselor helpline — matches AcademicExpertCounselingSection theme */}
          <section
            id="counselor-helpline"
            className="page-section relative isolate overflow-hidden rounded-[20px] border border-brand-200 bg-gradient-to-br from-brand-50 via-canvas to-white p-5 sm:p-6 text-brand-900 shadow-sm scroll-mt-[130px]"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="section-title text-lg sm:text-xl font-bold text-brand-900 font-sans tracking-tight">
                  {coursesData.counselor?.title ||
                    "Have Questions About Courses, Eligibility, or Fees?"}
                </h3>
                <p className="section-description text-xs sm:text-sm text-ink-500 font-normal">
                  {coursesData.counselor?.description ||
                    "Speak directly with an Online Siksha university advisor. We review your documents, help generate your DEB ID, and guide your admission at zero cost."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => apply?.()}
                  className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-brand-600 active:scale-95 transition-all min-h-[44px]"
                >
                  Book Free Counseling Call
                </button>
                <button
                  type="button"
                  onClick={() => helpDesk?.()}
                  className="px-4 py-2.5 rounded-lg border border-line-strong bg-white text-brand-900 text-xs sm:text-sm font-medium hover:bg-brand-50 transition-all flex items-center gap-1.5 min-h-[44px]"
                >
                  <PhoneCall className="w-4 h-4 text-brand-600" />
                  <span>Call Helpline: 1800-889-4422</span>
                </button>
              </div>
            </div>
          </section>

          {/* FAQs — shared accessible accordion, always last section */}
          {faqs.length > 0 && (
            <section
              id="faqs"
              className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs scroll-mt-[100px] p-5 md:p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans m-0">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-2.5 [&>div]:bg-white [&>div]:rounded-xl [&>div]:shadow-xs">
                <FaqAccordion
                  items={faqs}
                  variant="card"
                  defaultOpenIndex={0}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

