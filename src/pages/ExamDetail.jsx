import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getExamBySlug, getExamsListing, ExamNotFoundError } from "../services/examApi";
import usePageMeta from "../hooks/usePageMeta";
import SafeHtml from "../components/blog/SafeHtml";
import { FaqAccordion } from "../components/FaqAccordion";
import BlockRenderer from "../components/blog/BlockRenderer";
import BlogTOC from "../components/blog/BlogTOC";
import "../components/blog/blog-detail.css";
import {
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Headphones,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Compass,
  ChevronDown,
} from "lucide-react";

function formatDate(d) {
  if (!d) return null;
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return String(d);
  }
}

function formatRange(registrationRange) {
  if (!registrationRange || typeof registrationRange !== "object") return null;
  const start = registrationRange.start ? formatDate(registrationRange.start) : "";
  const end = registrationRange.end ? formatDate(registrationRange.end) : "";
  if (!start && !end) return null;
  if (start && end) return start + " - " + end;
  return start || end;
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function ExamHero({ exam, onOpenCounseling }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const mode = (exam && exam.examMode) || "Online";
  const heroButtons = Array.isArray(exam && exam.hero && exam.hero.buttons) ? exam.hero.buttons : [];

  const metaChips = [];
  const examDateStr = exam && exam.examDate ? formatDate(exam.examDate) : null;
  if (examDateStr) metaChips.push({ label: "Exam Date", value: examDateStr });
  const rangeText = formatRange(exam && exam.registrationRange);
  if (rangeText) metaChips.push({ label: "Registration", value: rangeText });
  const resultDateStr = exam && exam.resultDate ? formatDate(exam.resultDate) : null;
  if (resultDateStr) metaChips.push({ label: "Result", value: resultDateStr });

  const category = exam && exam.category ? String(exam.category) : "National Entrance Exam";
  const levelText = Array.isArray(exam && exam.levels) && exam.levels.length > 0
    ? exam.levels.join(", ")
    : (exam && exam.level ? String(exam.level) : null);
  const streamText = Array.isArray(exam && exam.streams) && exam.streams.length > 0
    ? exam.streams.join(", ")
    : (exam && exam.stream ? String(exam.stream) : null);
  const fullForm = exam && (exam.fullForm || exam.conductingBody)
    ? String(exam.fullForm || exam.conductingBody)
    : null;

  const rawDescription =
    exam.hero?.description ||
    (exam.seo && exam.seo.meta && exam.seo.meta.metaDescription) ||
    exam.shortDescription ||
    "";
  const cleanDescription =
    stripHtml(rawDescription) ||
    "Get complete details about exam schedule, registration, syllabus, pattern, eligibility, and participating universities.";

  const isSchool = Boolean(
    exam?.title &&
      (exam.title.includes("Class 12") ||
        exam.title.includes("Class 10") ||
        exam.title.includes("Board") ||
        exam.title.includes("HBSE") ||
        exam.title.includes("CBSE") ||
        exam.title.includes("PSEB") ||
        exam.title.includes("UP Board") ||
        exam.title.includes("ISC"))
  );
  const isCivilServices = Boolean(
    exam?.title &&
      (exam.title.includes("UPSC") ||
        exam.title.includes("IPS") ||
        exam.title.includes("IAS") ||
        exam.title.includes("CSE") ||
        exam.title.includes("IFS"))
  );

  const effectiveLevel = levelText || (isSchool ? "10th / 12th Board" : "National / Graduate Level");
  const effectiveStream = streamText || (category || "All Streams Eligible");
  const effectiveBody =
    fullForm ||
    (isCivilServices
      ? "Union Public Service Commission (UPSC)"
      : isSchool
      ? "Official School Education Board"
      : "National Testing Authority");
  const effectiveRegistration = rangeText || "Annual Online Registration";
  const effectiveExamDate = examDateStr || "Refer Official Schedule";

  const handleCta = () => {
    if (typeof onOpenCounseling === "function") {
      onOpenCounseling();
    } else if (typeof window !== "undefined") {
      window.location.href = "/counselling";
    }
  };

  const hasLogo = Boolean(exam.logo?.url && !logoFailed);

  return (
    <section className="rounded-2xl border border-[#e7eeff] bg-gradient-to-br from-[#f8fbff] via-white to-[#f0f5ff] p-4 sm:p-5 lg:p-6 mb-6 shadow-2xs">
      <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff]">
              {mode}
            </span>
            {category ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f7f9fc] text-[#43474d] border border-[#e7eeff]">
                {category}
              </span>
            ) : null}
            {effectiveLevel ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {effectiveLevel}
              </span>
            ) : null}
          </div>

          <h1 className="course-detail-h1 text-[26px] sm:text-[34px] lg:text-[38px] font-bold text-[#000f22] tracking-[-0.015em] leading-[1.18] mb-2.5 break-words">
            {exam.title}
          </h1>

          {metaChips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] text-[#115eaf] font-semibold mb-3">
              {metaChips.map((chip, i) => (
                <span key={chip.label} className="inline-flex items-center gap-2">
                  {i > 0 ? <span aria-hidden="true" className="text-[#d5e3ff]">•</span> : null}
                  <span>
                    {chip.label}: {chip.value}
                  </span>
                </span>
              ))}
            </div>
          ) : null}

          <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-4 max-w-2xl line-clamp-3">
            {cleanDescription}
          </p>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCta}
              className="inline-flex items-center gap-1.5 px-4.5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <span>Talk to an Exam Mentor</span>
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <Link
              to="/exams"
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl border border-[#115eaf] hover:bg-[#eff5ff] text-[#115eaf] text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Browse All Exams</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            {heroButtons.map((b, i) => {
              const label = (b && (b.text || b.label || b.buttonText)) || "Explore";
              const href = (b && (b.url || b.href || b.link)) || "";
              return href ? (
                <a
                  key={i}
                  href={href}
                  className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl border border-[#cfe0fa] bg-white hover:bg-[#f0f5ff] text-[#000f22] text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
                >
                  <span>{label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : null;
            })}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 min-w-0 w-full">
          <div className="rounded-xl border border-[#d5e3ff] bg-white overflow-hidden shadow-2xs">
            {hasLogo ? (
              <div className="h-20 sm:h-22 px-4 py-2 bg-gradient-to-b from-[#f8fbff] to-white border-b border-[#e7eeff] flex items-center justify-center">
                <img
                  src={exam.logo.url}
                  alt={exam.logo.alt || `${exam.title} logo`}
                  loading="eager"
                  onError={() => setLogoFailed(true)}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#eef5ff] to-[#f8fbff] border-b border-[#e7eeff] flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wide uppercase text-[#115eaf] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
                  <span>Official Exam Summary</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-[#115eaf] border border-[#d5e3ff]">
                  {mode}
                </span>
              </div>
            )}

            <div className="p-3.5">
              <h2 className="text-xs sm:text-[13px] font-bold text-[#000f22] mb-2 pb-1.5 border-b border-[#f0f4f8] flex items-center justify-between">
                <span>Quick Exam Facts</span>
                <span className="text-[10px] font-medium text-[#6b7280]">Key Highlights</span>
              </h2>

              <dl className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2.5">
                  <dt className="text-[#555960]">Exam Mode</dt>
                  <dd className="font-semibold text-[#000f22] text-right">{mode}</dd>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <dt className="text-[#555960]">Academic Level</dt>
                  <dd className="font-semibold text-[#000f22] text-right">{effectiveLevel}</dd>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <dt className="text-[#555960]">Discipline / Stream</dt>
                  <dd className="font-semibold text-[#000f22] text-right truncate max-w-[170px]">{effectiveStream}</dd>
                </div>
                <div className="flex items-start justify-between gap-2.5">
                  <dt className="text-[#555960] shrink-0">Conducting Body</dt>
                  <dd className="font-semibold text-[#000f22] text-right text-[11px] line-clamp-1">{effectiveBody}</dd>
                </div>
                <div className="flex items-start justify-between gap-2.5">
                  <dt className="text-[#555960] shrink-0">Registration</dt>
                  <dd className="font-semibold text-[#000f22] text-right text-[11px]">{effectiveRegistration}</dd>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <dt className="text-[#555960]">Exam Date</dt>
                  <dd className="font-bold text-[#115eaf] text-right">{effectiveExamDate}</dd>
                </div>
                {resultDateStr ? (
                  <div className="flex items-center justify-between gap-2.5">
                    <dt className="text-[#555960]">Result Date</dt>
                    <dd className="font-semibold text-[#000f22] text-right">{resultDateStr}</dd>
                  </div>
                ) : null}
              </dl>

              <button
                type="button"
                onClick={handleCta}
                className="mt-3 w-full h-8.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>Request Free Counselling</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExamMidContentBanner({ exam, onOpenCounseling }) {
  const handleCta = () => {
    if (typeof onOpenCounseling === "function") {
      onOpenCounseling();
    } else if (typeof window !== "undefined") {
      window.location.href = "/counselling";
    }
  };

  const cleanShortTitle = (exam?.shortTitle || exam?.title || "your upcoming exam").replace(/[:\s]+$/, "");

  return (
    <aside
      aria-label="Exam Preparation Guidance"
      className="my-7 rounded-2xl bg-gradient-to-r from-[#eef5ff] via-[#f7fbff] to-white border border-[#cfe0fa] p-4 sm:p-5 shadow-2xs"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#c8dcff] mb-2">
            <Headphones className="w-3 h-3 text-[#115eaf] shrink-0" aria-hidden="true" />
            <span>FREE 1-ON-1 EXAM PREPARATION COUNSELLING</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#000f22] tracking-tight leading-snug">
            Planning for {cleanShortTitle}? Speak with an Advisor
          </h3>
          <p className="mt-1 text-xs sm:text-[13px] text-[#43474d] leading-relaxed">
            Get personalized clarity on syllabus weightage, eligibility benchmarks, and preparation strategy from experienced academic mentors.
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-[#000f22] font-medium">
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Syllabus &amp; Pattern Breakdown</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Eligibility &amp; Cutoff Guidance</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>100% Free &amp; Unbiased Mentorship</span>
            </span>
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleCta}
            className="w-full sm:w-auto h-10 px-5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Talk to an Advisor</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function ExamBottomCtaBanner({ exam, onOpenCounseling }) {
  const handleCta = () => {
    if (typeof onOpenCounseling === "function") {
      onOpenCounseling();
    } else if (typeof window !== "undefined") {
      window.location.href = "/counselling";
    }
  };

  const cleanShortTitle = (exam?.shortTitle || exam?.title || "this exam").replace(/[:\s]+$/, "");

  return (
    <section
      aria-label="Post-Exam Admission & College Guidance"
      className="mt-8 mb-6 rounded-2xl border border-[#b8d3fc] bg-gradient-to-br from-[#f0f6ff] via-white to-[#edf4fe] p-5 sm:p-6 shadow-xs"
    >
      <div className="grid lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-8 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#c8dcff] mb-2">
            <Sparkles className="w-3 h-3 text-[#115eaf] shrink-0" aria-hidden="true" />
            <span>COLLEGE ADMISSION &amp; CUTOFF ADVISORY</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#000f22] tracking-tight leading-snug">
            Aiming for Top Universities Accepting {cleanShortTitle}?
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#43474d] leading-relaxed max-w-2xl">
            Don&apos;t navigate admissions alone. Our senior education advisors match your expected percentile and score with accredited UGC-DEB entitled universities, fee structures, and scholarship options.
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#000f22] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Percentile &amp; Cutoff Match</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Direct University Comparison</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>0% Interest EMI Guidance</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center items-stretch lg:items-end shrink-0">
          <button
            type="button"
            onClick={handleCta}
            className="h-10 px-5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Speak with an Admission Expert</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <Link
            to="/universities"
            className="h-10 px-4 rounded-xl border border-[#115eaf] hover:bg-[#eff5ff] text-[#115eaf] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
          >
            <span>Explore Top Universities</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const VERIFIED_EXAM_DIRECTORY = [
  {
    slug: "upsc-cse-exam",
    title: "UPSC CSE Exam 2027: Notification, Application Form, Exam Date, Eligibility, Syllabus",
    shortTitle: "UPSC CSE 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Civil Services",
  },
  {
    slug: "ias-exam",
    title: "UPSC IAS Exam 2027: Application Dates, Vacancies, Eligibility, Dates, Syllabus",
    shortTitle: "UPSC IAS 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Civil Services",
  },
  {
    slug: "ips-exam",
    title: "IPS Exam 2027: Exam Details, Eligibility, Syllabus, Age Limit",
    shortTitle: "IPS Exam 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Civil Services",
  },
  {
    slug: "ifs-exam",
    title: "UPSC IFS Exam 2027: Application Dates, Vacancies, Eligibility, Syllabus, Pattern",
    shortTitle: "UPSC IFS 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Civil Services",
  },
  {
    slug: "jee-main-exam",
    title: "JEE Main 2027: Dates, Application Form, Eligibility, Pattern, Syllabus",
    shortTitle: "JEE Main 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Engineering",
  },
  {
    slug: "jee-advanced-exam",
    title: "JEE Advanced 2027: Exam Dates, Registration, Eligibility, Syllabus",
    shortTitle: "JEE Advanced",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Engineering",
  },
  {
    slug: "gate-exam",
    title: "GATE 2027: Application, Exam Date, Eligibility, Syllabus, Pattern",
    shortTitle: "GATE 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Engineering",
  },
  {
    slug: "viteee-2026",
    title: "VITEEE 2026: Application, Exam Dates, Eligibility, Syllabus",
    shortTitle: "VITEEE 2026",
    examMode: "Online",
    category: "Engineering",
    stream: "Engineering",
  },
  {
    slug: "cat-exam",
    title: "CAT Exam 2026: Registration, Exam Dates, Eligibility, Syllabus, Pattern",
    shortTitle: "CAT Exam",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "Management",
  },
  {
    slug: "xat-exam",
    title: "XAT 2027: Registration, Exam Dates, Eligibility, Syllabus",
    shortTitle: "XAT 2027",
    examMode: "Online",
    category: "MBA / Management",
    stream: "Management",
  },
  {
    slug: "cmat-exam",
    title: "CMAT Exam 2026: Registration, Eligibility, Exam Pattern & Syllabus",
    shortTitle: "CMAT Exam",
    examMode: "Online",
    category: "MBA / Management",
    stream: "Management",
  },
  {
    slug: "mat-exam",
    title: "MAT Exam 2026: Registration, Dates, Eligibility, Syllabus",
    shortTitle: "MAT Exam",
    examMode: "Hybrid",
    category: "MBA / Management",
    stream: "Management",
  },
  {
    slug: "neet-exam",
    title: "NEET 2026: Registration, Exam Date, Eligibility, Syllabus",
    shortTitle: "NEET 2026",
    examMode: "Written",
    category: "National Level",
    stream: "Medical",
  },
  {
    slug: "cuet-ug-exam",
    title: "CUET UG 2026: Application Form, Exam Dates, Eligibility, Syllabus",
    shortTitle: "CUET UG 2026",
    examMode: "Hybrid",
    category: "Entrance Exams",
    stream: "General Entrance",
  },
  {
    slug: "cuet-pg-exam",
    title: "CUET PG 2027: Application Form, Exam Dates, Eligibility, Syllabus",
    shortTitle: "CUET PG 2027",
    examMode: "Online",
    category: "Entrance Exams",
    stream: "General Entrance",
  },
  {
    slug: "clat-exam",
    title: "CLAT Exam 2026: Application Form, Exam Dates, Eligibility, Syllabus",
    shortTitle: "CLAT Exam",
    examMode: "Written",
    category: "Law",
    stream: "Law",
  },
  {
    slug: "cbse-board-exam",
    title: "CBSE Exam Class 12 2026: Date Sheet (Released), Syllabus, Pattern",
    shortTitle: "CBSE Class 12",
    examMode: "Written",
    category: "Class 12 Exams",
    stream: "School Board",
    logo: {
      url: "https://images.degreefyd.com/exams/exm-cbse-board-exam-002/logo/url/cbse-board-exam-cbse-logo.webp",
      alt: "CBSE Board Logo",
    },
  },
  {
    slug: "hbse-board-exam",
    title: "HBSE 12th Board Exam 2026: Result, Date Sheet, Syllabus, Pattern",
    shortTitle: "HBSE 12th Board",
    examMode: "Written",
    category: "Class 12 Exams",
    stream: "School Board",
    logo: {
      url: "https://images.degreefyd.com/exams/exm-hbse-board-exam-001/logo/url/hbse-board-exam-logo-hbse.webp",
      alt: "HBSE Board Logo",
    },
  },
  {
    slug: "pseb-board-exam",
    title: "PSEB Exam Class 12 2026: Date Sheet, Syllabus, Pattern",
    shortTitle: "PSEB Class 12",
    examMode: "Written",
    category: "Class 12 Exams",
    stream: "School Board",
    logo: {
      url: "https://images.degreefyd.com/exams/exm-psbe-board-exam-001/logo/url/pseb-board-exam-pseb-logo.webp",
      alt: "PSEB Board Logo",
    },
  },
  {
    slug: "up-board-class-12-exam",
    title: "UP Board 12th Exam 2026: Time Table, Syllabus, Model Papers",
    shortTitle: "UP Board 12th",
    examMode: "Written",
    category: "Class 12 Exams",
    stream: "School Board",
    logo: {
      url: "https://images.degreefyd.com/exams/exm-up-board-class-12-exam-001/logo/url/up-board-class-12-exam-up-board.webp",
      alt: "UP Board Logo",
    },
  },
  {
    slug: "isc-board-class-12-exam",
    title: "ISC Class 12 2026: Date Sheet, Syllabus & Results",
    shortTitle: "ISC Class 12",
    examMode: "Written",
    category: "Class 12 Exams",
    stream: "School Board",
    logo: {
      url: "https://images.degreefyd.com/exams/exm-cbse-board-exam-001/logo/url/isc-board-class-12-exam-icse-logo.webp",
      alt: "ISC Board Logo",
    },
  },
];

const POPULAR_EXAMS_LIST = [
  { slug: "jee-main-exam", title: "JEE Main 2027", shortTitle: "JEE Main 2027", mode: "Online", category: "Engineering" },
  { slug: "cat-exam", title: "CAT Exam 2026", shortTitle: "CAT Exam", mode: "Online", category: "Management" },
  { slug: "upsc-cse-exam", title: "UPSC CSE Exam 2027", shortTitle: "UPSC CSE 2027", mode: "Online", category: "Civil Services" },
  { slug: "gate-exam", title: "GATE 2027", shortTitle: "GATE 2027", mode: "Online", category: "Engineering" },
  { slug: "cuet-ug-exam", title: "CUET UG 2026", shortTitle: "CUET UG 2026", mode: "Hybrid", category: "UG Entrance" },
  { slug: "neet-exam", title: "NEET 2026", shortTitle: "NEET 2026", mode: "Written", category: "Medical" },
];

function getEffectiveRelatedExams(exam, apiRelated, allDirectory) {
  if (Array.isArray(apiRelated) && apiRelated.length > 0) {
    return apiRelated;
  }
  const currentSlug = (exam?.slug || exam?.urlSlug || "").toLowerCase();
  const currentTitle = (exam?.title || "").toLowerCase();
  const directory = Array.isArray(allDirectory) && allDirectory.length > 0 ? allDirectory : VERIFIED_EXAM_DIRECTORY;

  let candidates = [];
  if (currentSlug.includes("ips") || currentSlug.includes("upsc") || currentSlug.includes("ias") || currentSlug.includes("ifs")) {
    candidates = directory.filter((x) => ["upsc-cse-exam", "ias-exam", "ips-exam", "ifs-exam"].includes(x.slug));
  } else if (currentSlug.includes("jee") || currentSlug.includes("gate") || currentSlug.includes("viteee") || currentTitle.includes("engineering")) {
    candidates = directory.filter((x) => ["jee-main-exam", "jee-advanced-exam", "gate-exam", "viteee-2026"].includes(x.slug));
  } else if (currentSlug.includes("cat") || currentSlug.includes("xat") || currentSlug.includes("cmat") || currentSlug.includes("mat") || currentTitle.includes("management") || currentTitle.includes("mba")) {
    candidates = directory.filter((x) => ["cat-exam", "xat-exam", "cmat-exam", "mat-exam"].includes(x.slug));
  } else if (currentSlug.includes("board") || currentTitle.includes("board") || currentTitle.includes("class 12") || currentTitle.includes("class 10")) {
    candidates = directory.filter((x) => ["cbse-board-exam", "hbse-board-exam", "up-board-class-12-exam", "isc-board-class-12-exam", "pseb-board-exam"].includes(x.slug));
  }

  const filtered = candidates.filter((x) => x.slug !== currentSlug);
  if (filtered.length >= 2) return filtered.slice(0, 4);

  const sameCat = directory.filter((x) => x.slug !== currentSlug && exam?.category && x.category === exam.category);
  if (sameCat.length >= 2) return sameCat.slice(0, 4);

  return directory.filter((x) => x.slug !== currentSlug).slice(0, 4);
}

function ExamTOC({ items = [] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState("");
  const list = (Array.isArray(items) ? items : []).filter((i) => i && i.id && i.title);

  useEffect(() => {
    if (list.length === 0) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 110;
      let current = "";
      for (const item of list) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      if (current) setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [list]);

  if (list.length === 0) return null;

  const INITIAL_VISIBLE = 6;
  const hidden = Math.max(0, list.length - INITIAL_VISIBLE);
  const visibleItems = expanded ? list : list.slice(0, INITIAL_VISIBLE);

  const jump = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 85;
    window.scrollTo({ top, behavior: "smooth" });
    try {
      history.pushState(null, "", "#" + id);
    } catch {}
    setActiveId(id);
  };

  return (
    <nav className="exam-toc bg-white rounded-xl border border-[#e7eeff] p-3.5 sm:p-4 shadow-2xs overflow-hidden w-full max-w-full shrink-0" aria-label="Table of contents">
      <h2 className="!text-xs font-bold text-[#000f22] uppercase tracking-wider mb-2.5 pb-2 border-b border-[#f0f4f8] flex items-center justify-between">
        <span>Table of contents</span>
        <span className="text-[10px] font-medium text-[#6b7280] lowercase font-normal">{list.length} sections</span>
      </h2>
      <ul className="space-y-1 text-[13px] overflow-hidden w-full">
        {visibleItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="min-w-0 w-full overflow-hidden">
              <a
                href={`#${item.id}`}
                onClick={(e) => jump(e, item.id)}
                className={`block w-full min-w-0 px-2.5 py-1.5 rounded-lg transition-colors leading-snug truncate ${
                  isActive
                    ? "bg-[#eff5ff] text-[#115eaf] font-semibold border-l-2 border-[#115eaf]"
                    : "text-[#43474d] hover:text-[#115eaf] hover:bg-[#f8fbff]"
                }`}
                title={item.title}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2.5 pt-2 border-t border-[#f0f4f8] w-full text-left text-[11px] font-semibold text-[#115eaf] hover:text-[#084a8c] inline-flex items-center justify-between cursor-pointer"
        >
          <span>{expanded ? "Show fewer sections" : `+${hidden} more sections`}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      )}
    </nav>
  );
}

function SidebarDiscoverCard({ relatedExams, popularExams, currentSlug }) {
  const filteredRelated = (relatedExams || []).filter((ex) => (ex.slug || ex.urlSlug) !== currentSlug).slice(0, 3);
  const filteredPopular = (popularExams || []).filter((e) => (e.slug || e.urlSlug) !== currentSlug).slice(0, 4);

  const categories = [
    { label: "All Exams", href: "/exams" },
    { label: "Entrance Exams", href: "/exams?category=Entrance+Exams" },
    { label: "MBA & Management", href: "/exams?category=MBA+%2F+Management" },
    { label: "Engineering", href: "/exams?category=Engineering" },
    { label: "Class 12 Boards", href: "/exams?category=Class+12+Exams" },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#e7eeff] p-3.5 sm:p-4 shadow-2xs divide-y divide-[#f0f4f8]">
      {/* 1. Related Exams */}
      {filteredRelated.length > 0 && (
        <div className="pb-3.5">
          <h3 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
              <span>Related Exams</span>
            </span>
            <span className="text-[10px] font-medium text-[#6b7280]">Curated</span>
          </h3>
          <ul className="space-y-2">
            {filteredRelated.map((ex, idx) => {
              const slug = ex.slug || ex.urlSlug;
              const clean = (ex.shortTitle || ex.title || slug).replace(/[:\s]+$/, "");
              return (
                <li key={slug || idx} className="group flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/exams/${slug}`}
                      className="text-xs font-semibold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-1 leading-snug"
                      title={ex.title || clean}
                    >
                      {clean}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#6b7280]">
                      <span className="px-1.5 py-0.2 rounded bg-[#f0f5ff] text-[#115eaf] font-medium border border-[#d5e3ff]">
                        {ex.examMode || "Online"}
                      </span>
                      {ex.category ? <span className="truncate max-w-[100px]">{ex.category}</span> : null}
                    </div>
                  </div>
                  <Link
                    to={`/exams/${slug}`}
                    className="shrink-0 text-[11px] font-semibold text-[#115eaf] group-hover:text-[#084a8c] inline-flex items-center gap-0.5 pt-0.5"
                    aria-label={`View details of ${clean}`}
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 2. Popular Exams */}
      {filteredPopular.length > 0 && (
        <div className="py-3.5">
          <h3 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
              <span>Popular Exams</span>
            </span>
            <span className="text-[10px] font-semibold text-[#115eaf] bg-[#e7eeff] px-1.5 py-0.5 rounded">Top Picks</span>
          </h3>
          <ul className="space-y-1.5">
            {filteredPopular.map((item, idx) => {
              const clean = (item.shortTitle || item.title || item.slug).replace(/[:\s]+$/, "");
              return (
                <li key={item.slug || idx} className="flex items-center justify-between gap-2 text-xs">
                  <Link
                    to={`/exams/${item.slug}`}
                    className="font-medium text-[#43474d] hover:text-[#115eaf] transition-colors truncate max-w-[180px]"
                    title={item.title || clean}
                  >
                    {clean}
                  </Link>
                  <span className="text-[10px] text-[#6b7280] shrink-0 font-medium px-1.5 py-0.5 rounded bg-[#f8fbff] border border-[#e7eeff]">
                    {item.mode || item.examMode || "Online"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 3. Explore Categories */}
      <div className="pt-3.5">
        <h3 className="text-xs font-bold text-[#000f22] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
          <span>Explore Categories</span>
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.href}
              className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#f8fbff] hover:bg-[#eef5ff] text-[#115eaf] border border-[#d5e3ff] transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarCounsellingCard({ onOpenCounseling }) {
  const handleCta = () => {
    if (typeof onOpenCounseling === "function") {
      onOpenCounseling();
    } else if (typeof window !== "undefined") {
      window.location.href = "/counselling";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#d5e3ff] p-3.5 sm:p-4 shadow-2xs">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-[#115eaf] text-white flex items-center justify-center shrink-0">
          <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#000f22] leading-tight">Free 1-on-1 Counselling</h3>
          <p className="text-[10px] text-[#6b7280]">Senior Academic Mentorship</p>
        </div>
      </div>
      <p className="text-xs text-[#43474d] leading-relaxed mb-3">
        Confused about exam eligibility, syllabus weightage, or college cutoffs? Speak with our certified mentors today.
      </p>
      <div className="space-y-1 mb-3 text-[11px] text-[#000f22] font-medium">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
          <span>100% Free &amp; Unbiased Mentorship</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
          <span>Cutoff &amp; College Admission Match</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCta}
        className="w-full h-8.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
      >
        <span>Request Free Counselling</span>
        <ArrowRight className="w-3 h-3" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function ExamDetail({ onOpenCounseling }) {
  const { slug } = useParams();
  const [state, setState] = useState({
    status: "loading",
    exam: null,
    sections: [],
    toc: [],
    faqs: [],
    relatedExams: [],
  });
  const [listingDirectory, setListingDirectory] = useState(VERIFIED_EXAM_DIRECTORY);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getExamsListing({ limit: 43 })
      .then((res) => {
        if (!cancelled && res?.exams?.length) {
          setListingDirectory(res.exams);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", exam: null, sections: [], toc: [], faqs: [], relatedExams: [] });
    window.scrollTo({ top: 0 });

    getExamBySlug(slug)
      .then((res) => {
        if (cancelled) return;
        setState({
          status: "ready",
          exam: res.exam || null,
          sections: res.sections || [],
          toc: res.toc || [],
          faqs: res.faqs || [],
          relatedExams: res.relatedExams || [],
        });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ExamNotFoundError) {
          setState({
            status: err.notApproved ? "not-approved" : "not-found",
            exam: null,
            sections: [],
            toc: [],
            faqs: [],
            relatedExams: [],
          });
          return;
        }
        setState({ status: "error", exam: null, sections: [], toc: [], faqs: [], relatedExams: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, retryKey]);

  const exam = state.status === "ready" ? state.exam : null;

  usePageMeta({
    title:
      (exam && exam.seo && exam.seo.meta && exam.seo.meta.metaTitle) ||
      (exam ? exam.title + " | Online Siksha" : "Exams | Online Siksha"),
    description:
      (exam && exam.seo && exam.seo.meta && exam.seo.meta.metaDescription) ||
      exam?.shortDescription ||
      "Exam guides and important dates.",
    canonicalUrl: (exam && exam.seo && exam.seo.meta && exam.seo.meta.canonicalUrl) || "",
  });

  const faqHeading = (exam && exam.faqHeadingText) || "Frequently asked questions";
  const midPointIndex = Math.max(1, Math.floor(state.sections.length / 2));
  const effectiveRelated = exam ? getEffectiveRelatedExams(exam, state.relatedExams, listingDirectory) : [];

  return (
    <main className="blog-detail bd-page">
      <div className="container">
        {state.status === "loading" && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3" role="status" aria-live="polite">
            <div className="h-9 w-9 rounded-full border-3 border-[#e7eeff] border-t-[#115eaf] animate-spin" />
            <p className="text-xs sm:text-sm text-[#555960]">Loading exam details...</p>
          </div>
        )}

        {state.status === "not-approved" && (
          <div className="bd-state">
            <BookOpen size={40} aria-hidden="true" />
            <h1>Exam under review</h1>
            <p>This exam page is waiting for editorial approval. Please browse the published exams instead.</p>
            <Link className="bd-btn" to="/exams">Back to all exams</Link>
          </div>
        )}

        {state.status === "not-found" && (
          <div className="bd-state">
            <BookOpen size={40} aria-hidden="true" />
            <h1>Exam not found</h1>
            <p>The exam you are looking for is not available right now.</p>
            <Link className="bd-btn" to="/exams">Back to all exams</Link>
          </div>
        )}

        {state.status === "error" && (
          <div className="bd-state">
            <AlertCircle size={40} aria-hidden="true" />
            <h1>Couldn&apos;t load this exam right now</h1>
            <p>The exam service is temporarily unavailable. Please check your connection and try again in a moment.</p>
            <button type="button" className="bd-btn" onClick={() => setRetryKey((k) => k + 1)}>
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && exam && (
          <>
            <nav aria-label="Breadcrumb" className="mb-3.5 flex items-center gap-1.5 text-xs text-[#74777e] overflow-x-auto [scrollbar-width:none]">
              <Link to="/" className="hover:text-[#115eaf] transition-colors whitespace-nowrap">Home</Link>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <Link to="/exams" className="hover:text-[#115eaf] transition-colors whitespace-nowrap">Exams</Link>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-[#000f22] font-semibold truncate max-w-[220px] sm:max-w-none">{exam.title}</span>
            </nav>

            <ExamHero exam={exam} onOpenCounseling={onOpenCounseling} />

            <div className="bd-layout exam-layout">
              <div className="bd-stack">
                <article className="bd-prose">
                  {state.sections.map((section, i) => {
                    const sectionKey = section.key || section.id || ("section-" + i);
                    const headingId = "exam-h-" + sectionKey;
                    const renderMidBanner = i === midPointIndex;
                    return (
                      <div key={sectionKey}>
                        {renderMidBanner ? (
                          <ExamMidContentBanner exam={exam} onOpenCounseling={onOpenCounseling} />
                        ) : null}
                        <section id={section.id || section.key} aria-labelledby={headingId} className="mb-6">
                          {section.title ? <h2 id={headingId}>{section.title}</h2> : null}
                          {section.blocks.map((block, bIdx) => (
                            <BlockRenderer key={bIdx} block={block} onOpenCounseling={onOpenCounseling} />
                          ))}
                        </section>
                      </div>
                    );
                  })}
                </article>

                {state.faqs.length > 0 ? (
                  <section className="mt-4" aria-labelledby="exam-faq-title">
                    <h2 id="exam-faq-title" className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-3">
                      {faqHeading}
                    </h2>
                    <FaqAccordion
                      items={state.faqs}
                      variant="card"
                      renderAnswer={(item) => <SafeHtml html={item.answer || ""} />}
                    />
                  </section>
                ) : null}

                {/* Bottom Get in Touch Banner (Pre-Related Content) */}
                <ExamBottomCtaBanner exam={exam} onOpenCounseling={onOpenCounseling} />
              </div>

              <aside className="bd-side">
                {state.toc.length > 0 ? <ExamTOC items={state.toc} /> : null}
                <SidebarDiscoverCard
                  relatedExams={effectiveRelated}
                  popularExams={POPULAR_EXAMS_LIST}
                  currentSlug={slug}
                />
                <SidebarCounsellingCard onOpenCounseling={onOpenCounseling} />
              </aside>
            </div>

            {effectiveRelated.length > 0 ? (
              <section className="mt-8 mb-4 pt-6 border-t border-[#e7eeff]">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#115eaf]" aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-bold text-[#000f22]">Related Exams</h2>
                  </div>
                  <Link to="/exams" className="text-xs font-semibold text-[#115eaf] hover:underline inline-flex items-center gap-1">
                    <span>View All Exams</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {effectiveRelated.slice(0, 3).map((rex, i) => (
                    <article
                      key={i}
                      className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden"
                    >
                      {rex.logo?.url ? (
                        <div className="h-20 w-full flex items-center justify-center p-3 bg-[#f8fbff] border-b border-[#f0f4f8]">
                          <img
                            src={rex.logo.url}
                            alt={rex.logo.alt || `${rex.title} logo`}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.parentElement.style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-10 px-3.5 flex items-center gap-2 bg-[#f8fbff] border-b border-[#f0f4f8] text-[#115eaf] text-xs font-semibold">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span className="truncate">{(rex.shortTitle || rex.title || "").replace(/[:\s]+$/, "")}</span>
                        </div>
                      )}
                      <div className="p-3.5">
                        <h3 className="text-sm font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors leading-snug line-clamp-2">
                          <Link to={"/exams/" + (rex.slug || rex.shortTitle || "")}>
                            {(rex.shortTitle || rex.title || rex.slug || "").replace(/[:\s]+$/, "")}
                          </Link>
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#555960]">
                          {rex.examMode ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#f0f5ff] text-[#115eaf] font-medium border border-[#d5e3ff] text-[11px]">
                              {rex.examMode}
                            </span>
                          ) : null}
                          {rex.examDate ? (
                            <span className="text-[11px] text-[#6b7280]">
                              {formatDate(rex.examDate)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="p-3.5 pt-0">
                        <Link
                          to={"/exams/" + (rex.slug || rex.shortTitle || "")}
                          className="h-7.5 px-2.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-6">
              <Link
                to="/exams"
                className="inline-flex items-center gap-2 px-5 h-10 rounded-xl border border-[#115eaf] hover:bg-[#eff5ff] text-[#115eaf] text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>Back to all exams</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
