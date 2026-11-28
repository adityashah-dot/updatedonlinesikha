import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Search,
  ChevronRight,
  Download,
  ArrowRight,
  Calculator,
  ChevronDown,
  PhoneCall,
  Award,
  CreditCard,
  Calendar,
  Clock
} from "lucide-react";
import { TableOfContents } from "../TableOfContents";
import { ProgrammeCardsSection } from "../ProgrammeCardsSection";
import { BlogsListSection } from "../BlogsListSection";
import UniversityFeeTable from "./UniversityFeeTable";
import { LmsPlatformSection } from "./LmsPlatformSection";
import { StudentReviewsSection } from "./StudentReviewsSection";
import { SITE_BLOG_POSTS } from "../../data/siteBlogPosts";
import { sectionTitle } from "../../lib/sectionTitles";
const COURSES_TOC_ITEMS = [
  { id: "fee-structure", label: "Fee Structure 2026 (Semester & Total)" },
  { id: "all-courses", label: "Degree Programs Catalog" },
  { id: "admission-dates", label: "Admission Dates & Deadlines" },
  { id: "learning-platform", label: "How You Study (Learning Platform)" },
  { id: "student-reviews", label: "Student Reviews & Ratings" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "blogs", label: "Blogs" },
  { id: "counselor-helpline", label: "Academic Counseling & Helpline" }
];
export const UniversityPageCourses = ({
  university,
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenEmi,
  onOpenHelpDesk,
  universityNavigation,
  registrationFee = "Registration Fee: \u20B91,000 (adjusted during enrollment)",
  coursesExtra,
  counselingForm
}) => {
  const courses = Array.isArray(university?.courses) ? university.courses : [];
  const campusAndLms = university?.campusAndLms || {};
  const quickStats = university?.quickStats || {};
  const importantDates = Array.isArray(university?.importantDates?.items) ? university.importantDates.items : [];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("fee-structure");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = COURSES_TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(COURSES_TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(COURSES_TOC_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const filteredCourses = useMemo(() => {
    const list = courses.filter((course) => {
      const matchesCategory = selectedCategory === "all" || course.level === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || course.name.toLowerCase().includes(q) || (course.code || "").toLowerCase().includes(q) || course.specializations.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
    if (sortBy === "duration") {
      return [...list].sort((a, b) => a.duration.localeCompare(b.duration));
    }
    return list;
  }, [courses, selectedCategory, searchQuery, sortBy]);
  const ugCourses = courses.filter((c) => c.level === "UG");
  const pgCourses = courses.filter((c) => c.level === "PG");
  const diplomaCourses = courses.filter((c) => c.level === "Diploma");
  const hasUG = ugCourses.length > 0;
  const hasPG = pgCourses.length > 0;
  const programmeCards = courses.slice(0, 6).map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.level === "PG" ? "Postgraduate Programme" : c.level === "UG" ? "Undergraduate Programme" : "Diploma Programme",
    duration: c.duration,
    fee: c.totalFee,
    semesterFee: c.perSemFee || c.feePerSemester,
    description: c.description || c.shortDescription || "",
    mode: "Online",
    specialisations: c.specializations
  }));
  const heroMetrics = [
    { value: university.naacGrade || "Accreditation information unavailable", label: "Accreditation Grade" },
    { value: "100% Online", label: "Classes & Exams from Home" },
    { value: quickStats.feeRange || "Fee information unavailable", label: "Total Course Fee" },
    { value: `${courses.length} Programs`, label: "UG & PG Online Degrees" }
  ];
  const emiStarting = quickStats.emiStarting || "";
  const emiNumber = emiStarting ? emiStarting.replace("\u20B9", "").replace("/mo", "") : "";
  const tocItems = COURSES_TOC_ITEMS.filter((item) => {
    if (item.id === "blogs") return true;
    if (item.id === "student-reviews") return Boolean(university.testimonials && university.testimonials.length);
    if (item.id === "faqs") return Boolean(university.faqs && university.faqs.length);
    if (item.id === "counselor-helpline") return Boolean(counselingForm);
    return true;
  }).map((item) => {
    if (item.id === "learning-platform") {
      const platform = campusAndLms.lmsPlatformTitle?.replace(/^How You Study: The /, "") || `${university.shortName} Learning Platform`;
      return { ...item, label: `How You Study (${platform})` };
    }
    if (item.id === "student-reviews") {
      return { ...item, label: `${university.shortName} Student Reviews & Ratings` };
    }
    return item;
  });
  return <div className="space-y-0">
      <div className="bg-brand-50 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-700 font-medium">
            <Link to="/" className="hover:text-brand-600 cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
            <Link to="/universities" className="hover:text-brand-600 cursor-pointer">Colleges</Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
            <span className="hover:text-brand-600 cursor-pointer">{university.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
            <span className="text-ink-900 font-bold">Courses & Fees</span>
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
                <h1 className="uni-title text-ink-900 tracking-tight font-sans leading-tight">
                  {sectionTitle(university.shortName, "Courses & Fees")}
                </h1>
                <p className="section-description text-xs sm:text-sm text-ink-700 max-w-3xl leading-relaxed font-normal">
                  {university.shortName} offers UGC-entitled online UG and PG courses with flexible learning. The university provides live online classes and an industry-specific curriculum designed to help students build practical skills.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-2"
  >
                  <CheckCircle className="w-4 h-4" />
                  <span>Apply Online</span>
                </button>
                <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2.5 rounded-xl bg-white text-ink-900 border border-brand-900 text-xs sm:text-sm font-semibold hover:bg-brand-50 active:scale-95 transition-all shadow-xs flex items-center gap-2"
  >
                  <Download className="w-4 h-4 text-brand-600" />
                  <span>Download Complete Fee Brochure</span>
                </button>
                <button
    onClick={onOpenHelpDesk}
    className="tap-chip px-3.5 py-2.5 rounded-xl text-brand-600 hover:bg-brand-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
  >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to an Academic Counselor</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {heroMetrics.map((m) => <div key={m.label} className="p-4 rounded-xl bg-white border border-brand-100 flex flex-col justify-between">
                    <div className="w-7 h-7 rounded-lg bg-brand-200 text-brand-600 flex items-center justify-center mb-1.5">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink-900 font-sans">{m.value}</div>
                      <div className="text-[11px] text-ink-700 mt-0.5 font-normal">{m.label}</div>
                    </div>
                  </div>)}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl p-4 sm:p-5 bg-white border border-brand-600/25 shadow-md relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-200/50 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-3 border-b border-brand-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs sm:text-sm font-normal text-ink-900">Admissions Open</span>
                  </div>
                </div>

                <div className="space-y-3 py-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-ink-700 block font-normal">Registration Deadline</span>
                      <span className="text-xs sm:text-sm font-normal text-ink-900">
                        {importantDates[0]?.date || ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent-50 flex items-center justify-center shrink-0 text-[#92400E]">
                      <Award className="w-3.5 h-3.5 text-accent-500" />
                    </div>
                    <div>
                      <span className="text-[11px] text-ink-700 block font-normal">Tuition Fee Grant</span>
                      <span className="text-xs sm:text-sm font-normal text-accent-700">Up to 20% Early Bird Concession</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-ink-700 block font-normal">Monthly Payment Option</span>
                      <span className="text-xs sm:text-sm font-normal text-ink-900">
                        {emiNumber ? `Zero-Cost EMI from \u20B9${emiNumber}/month` : "No-cost EMI available"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-100 flex flex-col gap-1.5">
                  <button
    type="button"
    onClick={() => onOpenApply()}
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
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1">
        <TableOfContents
    title="Table of contents"
    items={tocItems}
    activeId={activeSection}
    onItemClick={(id) => setActiveSection(id)}
  />
      </div>

      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-y border-brand-100 shadow-xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
    onClick={() => setSelectedCategory("all")}
    aria-pressed={selectedCategory === "all"}
    className={`tap-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${selectedCategory === "all" ? "bg-brand-600 text-white" : "bg-brand-50 text-ink-700 hover:bg-brand-100"}`}
  >
              All Degrees ({university.courses.length})
            </button>
            {hasUG && <button
    onClick={() => setSelectedCategory("UG")}
    aria-pressed={selectedCategory === "UG"}
    className={`tap-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${selectedCategory === "UG" ? "bg-brand-600 text-white" : "bg-brand-50 text-ink-700 hover:bg-brand-100"}`}
  >
                Undergraduate (UG)
              </button>}
            {hasPG && <button
    onClick={() => setSelectedCategory("PG")}
    aria-pressed={selectedCategory === "PG"}
    className={`tap-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${selectedCategory === "PG" ? "bg-brand-600 text-white" : "bg-brand-50 text-ink-700 hover:bg-brand-100"}`}
  >
                Postgraduate (PG)
              </button>}
            {diplomaCourses.length > 0 && <button
    onClick={() => setSelectedCategory("Diploma")}
    aria-pressed={selectedCategory === "Diploma"}
    className={`tap-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${selectedCategory === "Diploma" ? "bg-brand-600 text-white" : "bg-brand-50 text-ink-700 hover:bg-brand-100"}`}
  >
                Diploma
              </button>}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search by degree name or subject..."
    aria-label="Search courses by degree name or subject"
    className="w-full h-10 pl-9 pr-3 rounded-xl border border-line-strong bg-white text-base sm:text-sm font-normal focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition-all outline-none"
  />
            </div>

            <div className="relative min-w-[140px]">
              <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    aria-label="Sort courses"
    className="w-full h-10 px-3 pr-8 rounded-xl border border-line-strong bg-white text-base sm:text-sm font-normal text-ink-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none appearance-none cursor-pointer"
  >
                <option value="popularity">Sort: Popularity</option>
                <option value="fee-asc">Fee: Low to High</option>
                <option value="fee-desc">Fee: High to Low</option>
                <option value="duration">Duration</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {emiStarting && <section className="page-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-4 bg-gradient-to-r from-brand-200 via-brand-100 to-brand-200 border border-brand-600/30 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0">
                <Calculator className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-ink-900 font-sans">
                    Tuition Fee Concessions & Zero-Cost EMI Support
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#ffdcc3] text-[#6e3900] rounded">
                    0% Interest
                  </span>
                </div>
                <p className="text-[11px] text-ink-700 mt-[7.5px] leading-relaxed">
                  Eligible students can apply for up to a{" "}
                  <strong className="text-ink-900 font-bold">20% Early Bird fee grant</strong> on total tuition.
                  Monthly zero-interest installment options starting from{" "}
                  <strong className="text-brand-600 font-bold">{emiStarting}</strong> are also available through partner banks.
                </p>
              </div>
            </div>
            <button
    type="button"
    onClick={() => onOpenEmi()}
    className="whitespace-nowrap px-6 py-3 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-2 shrink-0"
  >
              <Calculator className="w-4 h-4" />
              <span>Calculate Monthly EMI</span>
            </button>
          </div>
        </section>}

      <section id="fee-structure" className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-[100px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-3">
          <div>
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
              {sectionTitle(university.shortName, "Fee Structure 2026 (Semester & Total)")}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-700 font-normal">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Includes Exam Fees, LMS Access & Digital Material</span>
          </div>
        </div>

        {(hasUG || hasPG) && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hasUG && <UniversityFeeTable
    courses={ugCourses}
    level="UG"
    onSelectCourse={onSelectCourse}
    onOpenApply={onOpenApply}
    registrationFee={registrationFee}
    footerNote="Registration Fee: ₹1,000 (adjusted during enrollment)"
    applyLabel="Apply for UG Programs →"
  />}
            {hasPG && <UniversityFeeTable
    courses={pgCourses}
    level="PG"
    onSelectCourse={onSelectCourse}
    onOpenApply={onOpenApply}
    registrationFee="Specializations selected during second semester"
    footerNote="Specializations selected during second semester"
    applyLabel="Apply for PG Programs →"
  />}
          </div>}

        {diplomaCourses.length > 0 && <div className="mt-5 p-4 sm:p-5 rounded-xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-200 text-brand-600 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-ink-900">
                  Interested in a Shorter Program? Check Diploma Courses
                </h4>
                <p className="mt-[7.5px] text-xs text-ink-700 font-normal">
                  Career-focused diplomas with a total fee of{" "}
                  <strong className="text-ink-900 font-semibold">{diplomaCourses[0].totalFee}</strong> (payable in two
                  semester installments).
                </p>
              </div>
            </div>
            <button
    onClick={() => onSelectCourse(diplomaCourses[0])}
    className="px-3.5 py-1.5 rounded-lg bg-white border border-line-strong text-xs font-semibold text-brand-600 hover:bg-brand-600 hover:text-white transition-all shrink-0"
  >
              Explore Diplomas
            </button>
          </div>}
      </section>

      <section id="all-courses" className="content-block bg-brand-50/50 border-t border-brand-100 scroll-mt-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-3xl mb-[18px]">
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
              {sectionTitle(university.shortName, "All Courses")}
            </h2>
            <p className="section-description text-xs sm:text-sm text-ink-700 font-normal leading-relaxed text-left">
              {university.shortName} popular courses include a variety of UG, PG and other courses across various
              disciplines. The courses offered cover various specialisations, helping students choose programmes suitable for
              their career goals.
            </p>
          </div>

          {filteredCourses.length === 0 ? <div className="text-center py-10 bg-white rounded-xl border border-brand-100">
              <Search className="w-8 h-8 text-ink-500 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-ink-900">No programs match your search</h3>
              <p className="text-xs text-ink-700 mt-[7.5px] font-normal">
                Try resetting filters or searching for terms like &quot;MBA&quot;, &quot;BCA&quot;, &quot;B.Com&quot;, or
                &quot;Science&quot;.
              </p>
              <button
    onClick={() => {
      setSelectedCategory("all");
      setSearchQuery("");
    }}
    className="mt-3 px-3.5 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-medium"
  >
                Reset Filters
              </button>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredCourses.map((course) => <div
    key={course.id}
    className="bg-white rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border border-brand-100 shadow-xs hover:border-brand-600/60 hover:shadow-xs"
  >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
    className={`px-2 py-0.5 text-[10px] font-normal rounded ${course.level === "UG" ? "bg-brand-100 text-brand-900" : course.level === "PG" ? "bg-brand-200 text-brand-700" : "bg-[#ffdcc3] text-[#6e3900]"}`}
  >
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-ink-500 font-normal">
                        <Clock className="w-3 h-3 text-ink-500" />
                        <span>{course.duration}</span>
                      </span>
                    </div>

                    <h3
    className="text-sm sm:text-[15px] font-semibold text-ink-900 font-sans hover:text-brand-600 transition-colors cursor-pointer leading-snug line-clamp-1"
    onClick={() => onSelectCourse(course)}
    title={course.name}
  >
                      {course.name}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-ink-700 mt-[7.5px] line-clamp-2 leading-relaxed font-normal">
                      {course.description || ""}
                    </p>

                    <div className="mt-2.5 pt-2.5 border-t border-brand-50 flex items-baseline justify-between">
                      <span className="text-[10px] text-ink-500 font-normal uppercase tracking-wide">Total Fee</span>
                      <div className="text-right">
                        <span className="text-sm sm:text-[15px] font-normal text-ink-900 font-sans">
                          {course.totalFee}
                        </span>
                        <span className="text-[10px] text-ink-500 font-normal ml-1">({course.feePerSemester})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-1.5 pt-1">
                    <button
    onClick={() => onSelectCourse(course)}
    className="w-full py-1.5 px-2 min-h-[44px] md:min-h-0 rounded-lg bg-brand-600 text-white text-[11px] font-medium text-center hover:bg-brand-700 active:scale-95 transition-all shadow-xs flex items-center justify-center"
  >
                      View Details
                    </button>
                    <button
    onClick={() => onOpenBrochure(course)}
    className="w-full py-1.5 px-2 min-h-[44px] md:min-h-0 rounded-lg bg-brand-50 text-ink-900 hover:bg-brand-100 text-[11px] font-normal flex items-center justify-center gap-1 transition-colors border border-brand-200"
  >
                      <Download className="w-3 h-3 text-brand-600" />
                      <span>Syllabus</span>
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>
      </section>

      {importantDates.length > 0 && <section id="admission-dates" className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-[100px]">
          <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-canvas via-brand-50 to-white shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 px-5 sm:px-6 py-5 border-b border-brand-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
                  {sectionTitle(university.shortName, "Admission Dates")}
                </h2>
              </div>
              <button
    type="button"
    onClick={() => onOpenApply()}
    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-600 bg-white text-brand-600 text-xs sm:text-sm font-semibold hover:bg-brand-100 transition-colors"
  >
                <Calendar className="w-4 h-4" />
                View Admission Portal
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal">
                <button
    type="button"
    onClick={() => onOpenApply()}
    className="font-semibold text-brand-600 hover:underline"
  >
                  {university.shortName} admission
                </button>{" "}
                starts early in the academic year. Candidates need to complete the online application form and upload
                required documents through the official admission portal. Check the table below for admission dates 2026:
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-brand-200 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-brand-600 text-white">
                        <th className="py-3 px-4 font-bold">Event</th>
                        <th className="py-3 px-4 font-bold">Details</th>
                        <th className="py-3 px-4 font-bold">Tentative Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-100 bg-white">
                      {importantDates.map((item, idx) => <tr key={idx} className="hover:bg-brand-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-ink-900">{item.event}</td>
                          <td className="py-3.5 px-4 text-ink-700">{item.mode || "Online"}</td>
                          <td className="py-3.5 px-4 text-brand-600 font-semibold">{item.date}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>}

      {Array.isArray(campusAndLms.lmsPlatform) && campusAndLms.lmsPlatform.length > 0 && <LmsPlatformSection
    title={campusAndLms.lmsPlatformTitle || `How You Study: The ${university.shortName} Learning Platform`}
    items={campusAndLms.lmsPlatform}
  />}

      {programmeCards.length > 0 && <ProgrammeCardsSection
    sectionId="popular-programmes"
    title={sectionTitle(university.shortName, "Popular Programmes")}
    description={`${university.shortName} popular programmes across various disciplines.`}
    programmes={programmeCards}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenApply={() => onOpenApply()}
  />}

      {university.testimonials && university.testimonials.length > 0 && <StudentReviewsSection
    title={`${university.shortName} Reviews`}
    description={`Student feedback for ${university.shortName} online programs.`}
    testimonials={university.testimonials}
  />}

      {coursesExtra}

      <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs max-w-7xl mx-auto"
    compact
    posts={university.blogs && university.blogs.posts ? university.blogs.posts : SITE_BLOG_POSTS}
  />

      {university.faqs && university.faqs.length > 0 && <section id="faqs" className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-[100px]">
          <div className="text-left mb-[18px]">
            <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
              {sectionTitle(university.shortName, "FAQs")}
            </h2>
            <p className="section-description text-xs text-ink-700 font-normal">
              Everything you need to know about admissions, examinations, degree validity, and fee financing.
            </p>
          </div>

          <div className="space-y-2.5">
            {university.faqs.map((faq, idx) => {
    const isOpen = openFaqIndex === idx;
    return <div
      key={idx}
      className="bg-white rounded-xl border border-brand-100 shadow-xs overflow-hidden transition-all"
    >
                  <button
      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
      aria-expanded={isOpen}
      className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-semibold text-xs sm:text-sm text-ink-900 hover:text-brand-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600"
    >
                    <span className="pr-2">{faq.question}</span>
                    <ChevronDown
      className={`w-4 h-4 text-brand-600 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
    />
                  </button>
                  {isOpen && <div className="px-4 sm:px-5 pb-5 pt-0 text-xs text-ink-700 leading-relaxed border-t border-brand-50 mt-1 font-normal">
                      <p className="pt-2">{faq.answer}</p>
                    </div>}
                </div>;
  })}
          </div>
        </section>}

      <section id="counselor-helpline" className="page-section relative isolate overflow-hidden rounded-[20px] border border-brand-200 bg-gradient-to-br from-brand-50 via-canvas to-white p-5 sm:p-6 text-brand-900 shadow-sm scroll-mt-[130px] max-w-7xl mx-auto my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="section-title text-lg sm:text-xl font-bold font-sans tracking-tight">
              Have Questions About Courses, Eligibility, or Fees?
            </h3>
            <p className="section-description text-xs sm:text-sm text-ink-500 font-normal">
                Speak directly with an Online Siksha university advisor. We review your documents, help generate your DEB ID,
              and guide your admission at zero cost.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-brand-700 active:scale-95 transition-all"
  >
              Book Free Counseling Call
            </button>
            <button
    onClick={onOpenHelpDesk}
    className="px-4 py-2.5 rounded-lg border border-line-strong bg-white text-brand-900 text-xs sm:text-sm font-medium hover:bg-brand-50 transition-all flex items-center gap-1.5"
  >
              <PhoneCall className="w-4 h-4 text-brand-400" />
              <span>Call Helpline: 1800-889-4422</span>
            </button>
          </div>
        </div>
      </section>
    </div>;
};
export default UniversityPageCourses;
