import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseBySlug, getCoursesListing } from "../services/courseApi";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, INDIAN_PHONE_REGEX, EMAIL_REGEX } from "../services/leadApi";
import { formatCourseLevelLabel, formatFeeDisplay, formatDurationDisplay } from "../services/apiAdapter";
import { COURSES_DATA } from "../data/coursesData";
import { INDIAN_STATES } from "../data/indianLocations";
import usePageMeta from "../hooks/usePageMeta";
import CourseCmsContent from "../components/CourseCmsContent";
import { FaqAccordion } from "../components/FaqAccordion";
import SafeHtml from "../components/blog/SafeHtml";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Calendar,
  ShieldCheck,
  Clock,
  User,
  ChevronDown,
  Tag,
  CheckCircle2,
  Check,
  Percent,
  Handshake,
  Lock,
  Star,
  GraduationCap,
  Headphones,
  Award,
  Building2,
  Briefcase,
  PhoneCall,
  Layers
} from "lucide-react";

function formatCourseTitle(title) {
  if (!title) return "";
  return title.replace(/\(([a-zA-Z0-9]+)-([a-zA-Z0-9]+)\)/g, (m, a, b) => `(${a}\u2011${b})`);
}

function getCourseShortTitle(title) {
  if (!title) return "Degree";
  const match = title.match(/\(([A-Z0-9\s\-]+)\)/i);
  if (match) return match[1].trim();
  const m2 = title.match(/Online\s+([A-Za-z]{2,5})\b/i);
  if (m2) return m2[1].toUpperCase();
  if (title.length > 25) {
    return title.replace(/^Online\s+/i, "").split(" in ")[0];
  }
  return title.replace(/^Online\s+/i, "");
}

function RelatedCourseCard({ course }) {
  const [imgFailed, setImgFailed] = useState(false);
  const slug = course.id;
  const imgSrc = (!imgFailed && (course.images?.primary || course.images?.logo || course.images?.hero)) || "";
  const isBanner = Boolean(course.images?.isBanner);
  const displayLevel = course.displayLevel || formatCourseLevelLabel(course.rawLevels || course.level, course.name);
  const feeStr = course.feeDisplay || formatFeeDisplay(course.totalFee, course.totalFee) || "Flexible EMI";

  return (
    <article className="blog-carousel-card group min-w-0 bg-white rounded-xl border border-line hover:border-brand-300 hover:shadow-xs overflow-hidden transition-all duration-200 flex flex-col justify-between h-full">
      <Link to={"/courses/" + slug} className="flex flex-col h-full justify-between">
        <div>
          {/* Compact Image Container: h-36 on mobile, h-38 on desktop (same size as Blog.jsx) */}
          <div className="relative h-36 sm:h-38 w-full overflow-hidden bg-brand-50">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={course.images?.alt || course.name}
                loading="lazy"
                onError={() => setImgFailed(true)}
                className={`w-full h-full ${
                  isBanner ? "object-cover object-center group-hover:scale-102" : "object-contain object-center p-3.5"
                } transition-transform duration-300`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-600/40">
                <BookOpen className="w-7 h-7" aria-hidden="true" />
              </div>
            )}
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-brand-600 shadow-2xs backdrop-blur-xs border border-brand-200">
              {displayLevel}
            </span>
          </div>

          {/* Compact Card Content (same dimensions & typography as Blog.jsx) */}
          <div className="p-3.5">
            <div className="flex items-center gap-1.5 text-[10.5px] text-ink-500 mb-1.5">
              {course.duration ? (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-600" aria-hidden="true" />
                  {course.duration}
                </span>
              ) : null}
              {course.duration && feeStr ? (
                <span aria-hidden="true" className="text-slate-300">•</span>
              ) : null}
              {feeStr ? (
                <span className="font-semibold text-brand-600 truncate">{feeStr}</span>
              ) : null}
            </div>
            <h3 className="text-xs sm:text-[14px] font-bold text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
              {course.name}
            </h3>
            {course.shortDescription ? (
              <p className="text-[11px] sm:text-xs text-ink-700 line-clamp-2 mt-1 leading-relaxed">
                {course.shortDescription}
              </p>
            ) : null}
          </div>
        </div>

        {/* Compact Card Footer */}
        <div className="p-3.5 pt-0 mt-auto">
          <div className="pt-2.5 border-t border-brand-50 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand-600 group-hover:underline">
              <span>Explore Course</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function findLocalCourse(slug) {
  if (!slug) return null;
  const clean = String(slug).toLowerCase().trim();
  const stripped = clean.replace(/^online-/, "");
  return COURSES_DATA.find(
    (c) => c.id === clean || c.slug === clean || c.id === stripped || (c.code && c.code.toLowerCase() === stripped) || clean.includes(c.id.toLowerCase())
  ) || null;
}

export default function CourseDetail({ onOpenCounseling }) {
  const { slug } = useParams();
  const initialLocal = findLocalCourse(slug);
  const [state, setState] = useState({
    status: initialLocal ? "ready" : "loading",
    course: initialLocal || null,
    related: []
  });
  const [retryKey, setRetryKey] = useState(0);

  // Form State
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    state: "",
    specialisation: "Not sure yet",
  });
  const [errors, setErrors] = useState({});
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const cmsCourse = state.status === "ready" ? state.course : null;
  usePageMeta({
    title: (cmsCourse && cmsCourse.seo && cmsCourse.seo.meta && cmsCourse.seo.meta.metaTitle) || (cmsCourse ? `${cmsCourse.name} | OnlineSiksha` : "Online Course | OnlineSiksha"),
    description: (cmsCourse && cmsCourse.seo && cmsCourse.seo.meta && cmsCourse.seo.meta.metaDescription) || (cmsCourse?.shortDescription || "Explore accredited online course fees, duration, syllabus, eligibility and career prospects."),
    noindex: false,
    canonicalUrl: (cmsCourse && cmsCourse.seo && cmsCourse.seo.meta && cmsCourse.seo.meta.canonicalUrl) || "",
  });

  useEffect(() => {
    let cancelled = false;
    if (!state.course) {
      setState((prev) => ({ ...prev, status: "loading" }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    getCourseBySlug(slug)
      .then((res) => {
        if (cancelled) return;
        if (res && res.course) {
          setState((prev) => ({ ...prev, status: "ready", course: res.course }));
        } else {
          const fallback = findLocalCourse(slug);
          if (fallback) {
            setState((prev) => ({ ...prev, status: "ready", course: fallback }));
          } else {
            setState({ status: "ready", course: null, related: [] });
          }
        }
      })
      .catch((err) => {
        if (cancelled) return;
        const fallback = findLocalCourse(slug);
        if (fallback) {
          setState((prev) => ({ ...prev, status: "ready", course: fallback }));
          return;
        }
        if (err && (err.name === "CourseNotFoundError" || err.code === "NOT_FOUND" || err.code === "MISSING_SLUG")) {
          setState({ status: "ready", course: null, related: [] });
        } else {
          setState({ status: "error", course: null, related: [] });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, retryKey]);

  useEffect(() => {
    let cancelled = false;
    getCoursesListing({ page: 1, limit: 15 })
      .then((res) => {
        if (cancelled) return;
        const related = (Array.isArray(res.courses) ? res.courses : [])
          .filter((c) => c && c.id && c.id !== String(slug))
          .sort((a, b) => {
            const aImg = Boolean(a?.images?.primary || a?.images?.logo || a?.images?.hero) ? 1 : 0;
            const bImg = Boolean(b?.images?.primary || b?.images?.logo || b?.images?.hero) ? 1 : 0;
            return bImg - aImg;
          });
        setState((prev) => ({ ...prev, related: related.slice(0, 4) }));
      })
      .catch(() => {
        if (cancelled) return;
        const localRelated = COURSES_DATA.filter((c) => c.id !== slug).slice(0, 4);
        setState((prev) => ({ ...prev, related: localRelated }));
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const course = state.status === "ready" ? state.course : null;
  const courseShortTitle = course ? getCourseShortTitle(course.name) : "Degree";

  const feeText = course
    ? (course.feeDisplay || formatFeeDisplay(course.totalFee, course.totalFee))
    : null;
  const perSemText = course && course.perSemFee > 0
    ? formatFeeDisplay(course.perSemFee, course.perSemFee)
    : null;
  const durationText = course
    ? (course.duration || formatDurationDisplay(course.duration))
    : null;

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const cleanPhone = sanitizeIndianPhone(leadForm.phone);
    const cleanEmail = (leadForm.email || "").trim();

    if (!leadForm.name.trim()) newErrors.name = "Name is required";
    if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number starting with 6, 7, 8, 9, or 2";
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!leadForm.state) newErrors.state = "State is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    submitLead({
      name: leadForm.name,
      email: cleanEmail,
      phone_number: cleanPhone,
      state: leadForm.state ? [leadForm.state] : [],
      currentstate: leadForm.state || "",
      preferred_degree: course?.name ? [course.name] : [],
      studyMode: "Online",
      form_name: "Course Detail Counselling Form"
    });
    setLeadSubmitted(true);
  };

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-canvas min-h-screen py-2 sm:py-5">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-6">
        {state.status === "loading" && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3" role="status" aria-live="polite">
            <div className="h-9 w-9 rounded-full border-3 border-brand-100 border-t-brand-600 animate-spin" />
            <p className="text-xs sm:text-sm text-ink-700">Loading course details...</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="py-14 flex flex-col items-center justify-center text-center gap-3" role="alert">
            <AlertCircle className="w-8 h-8 text-brand-600" aria-hidden="true" />
            <h1 className="text-base sm:text-lg font-bold text-ink-900">We could not load this course right now.</h1>
            <p className="text-xs sm:text-sm text-ink-700 max-w-md">The course service is temporarily unavailable. Please try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && !course && (
          <div className="py-14 flex flex-col items-center justify-center text-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-600" aria-hidden="true" />
            <h1 className="text-base sm:text-lg font-bold text-ink-900">Course not found.</h1>
            <p className="text-xs sm:text-sm text-ink-700 max-w-md">The course you are looking for is not available right now.</p>
            <Link to="/courses" className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-colors">
              <span>Browse All Courses</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {state.status === "ready" && course && (
          <>
            {/* FIRST SECTION: CLEAN UNBOXED HERO WITH BALANCED 2-COLUMN PROPORTIONS */}
            {(() => {
              const rawSpecs = course.specializations;
              let specOptions = [];
              if (Array.isArray(rawSpecs)) {
                specOptions = rawSpecs.map((s) => (typeof s === "string" ? s : s?.name || s?.title)).filter(Boolean);
              } else if (typeof rawSpecs === "string") {
                specOptions = rawSpecs.split(",").map((s) => s.trim()).filter(Boolean);
              }
              if (specOptions.length === 0) {
                specOptions = [
                  "Marketing Management",
                  "Finance Management",
                  "Human Resource Management",
                  "Business Analytics",
                  "Operations & Supply Chain",
                  "Software Engineering & IT",
                  "General / Core Track"
                ];
              }

              // University Logo Marquee Rows (Matching Reference Screenshot)
              const uniRow1 = [
                { name: "DPU Online", slug: "dr-dy-patil-university-online", code: "DPU", sub: "Online", color: "text-[#991b1b]" },
                { name: "LPU Online", slug: "lovely-professional-university-online", code: "LPU", sub: "Online", color: "text-brand-600", icon: "☀️" },
                { name: "JIIT Online", slug: "jiit-online", code: "JIIT", sub: "Online", color: "text-ink-900" },
                { name: "Online Manipal", slug: "manipal-university-jaipur-online", code: "MANIPAL", sub: "Online", color: "text-[#b91c1c]", icon: "🏛️" },
                { name: "Amity Online", slug: "amity-university-online", code: "AMITY", sub: "Online", color: "text-ink-900", icon: "🎓" },
                { name: "Chandigarh Univ", slug: "chandigarh-university-online", code: "CU", sub: "Online", color: "text-danger-600" },
              ];

              const uniRow2 = [
                { name: "Bennett Online", slug: "bennett-university-online", code: "BENNETT", sub: "Univ", color: "text-ink-900", tag: "Times" },
                { name: "Amrita Online", slug: "amrita-vishwa-vidyapeetham-online", code: "AMRITA", sub: "Online", color: "text-[#9f1239]", isPill: true },
                { name: "VGU Online", slug: "vgu-online", code: "VGU", sub: "Jaipur", color: "text-[#ea580c]" },
                { name: "Sharda Online", slug: "sharda-university-online", code: "SHARDA", sub: "Online", color: "text-[#1d4ed8]" },
                { name: "Jain Online", slug: "jain-university-online", code: "JAIN", sub: "Online", color: "text-ink-900" },
                { name: "UPES Online", slug: "upes-online", code: "UPES", sub: "Online", color: "text-success-600" },
              ];

              // Hiring Partners (Recruiters with smooth marquee like in college details pages)
              const recruiters = [
                { name: "Amazon", logo: "/logos/amazon.jpg" },
                { name: "Deloitte", logo: "/logos/deloitte.jpg" },
                { name: "TCS", logo: "/logos/tcs.jpg" },
                { name: "Wipro", logo: "/logos/wipro.jpg" },
                { name: "Infosys", logo: "/logos/infosys.png" },
                { name: "Cognizant", logo: "/logos/cognizant.jpg" },
                { name: "Capgemini", logo: "/logos/capgemini.png" },
                { name: "Tech Mahindra", logo: "/logos/techmahindra.jpg" }
              ];

              return (
                <section aria-labelledby="course-h1" className="w-full mb-6 pt-1">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    
                    {/* LEFT COLUMN (lg:col-span-7): Increased width for dynamic info, Marquee, Quick Specs, Star Benefits, Recruiter Marquee & Counsellor Card */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3.5">
                      
                      {/* Top: 2-Row Infinite Scrolling University Marquee */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                            Leading Online Universities
                          </span>
                          <span className="text-[11px] font-semibold text-brand-600">
                            100+ UGC Entitled
                          </span>
                        </div>

                        {/* Two Moving Rows of Rounded White Logo Cards */}
                        <div className="space-y-2 overflow-hidden relative py-0.5 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
                          {/* Row 1 */}
                          <div className="flex gap-2 w-max animate-[marquee_26s_linear_infinite] hover:[animation-play-state:paused]">
                            {[...uniRow1, ...uniRow1, ...uniRow1].map((uni, idx) => (
                              <Link
                                key={`r1-${uni.name}-${idx}`}
                                to={`/universities/${uni.slug}`}
                                className="h-[42px] px-3.5 rounded-xl bg-white border border-line shadow-2xs hover:shadow-xs hover:border-brand-600 transition-all flex items-center justify-center shrink-0 cursor-pointer min-w-[126px]"
                              >
                                <span className="text-xs font-extrabold text-ink-900 tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                                  {uni.icon && <span className="text-xs">{uni.icon}</span>}
                                  <span className={uni.color}>{uni.code}</span>
                                  <span className="text-[10px] font-bold text-ink-500">{uni.sub}</span>
                                </span>
                              </Link>
                            ))}
                          </div>

                          {/* Row 2 */}
                          <div className="flex gap-2 w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
                            {[...uniRow2, ...uniRow2, ...uniRow2].map((uni, idx) => (
                              <Link
                                key={`r2-${uni.name}-${idx}`}
                                to={`/universities/${uni.slug}`}
                                className="h-[42px] px-3.5 rounded-xl bg-white border border-line shadow-2xs hover:shadow-xs hover:border-brand-600 transition-all flex items-center justify-center shrink-0 cursor-pointer min-w-[126px]"
                              >
                                <span className="text-xs font-extrabold text-ink-900 tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                                  {uni.isPill ? (
                                    <span className="px-2 py-0.5 rounded bg-[#9f1239] text-white font-bold text-[10px] tracking-wide">
                                      {uni.code} {uni.sub}
                                    </span>
                                  ) : (
                                    <>
                                      {uni.tag && (
                                        <span className="text-[8px] font-bold text-ink-700 bg-slate-100 px-1 py-0.5 rounded">
                                          {uni.tag}
                                        </span>
                                      )}
                                      <span className={uni.color}>{uni.code}</span>
                                      <span className="text-[10px] font-bold text-ink-500">{uni.sub}</span>
                                    </>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Main Value Proposition Callout */}
                      <div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-ink-900 leading-snug">
                          India's leading Online Universities on a Single Platform within two minutes
                        </h2>
                        <p className="text-xs text-ink-700 mt-1 leading-relaxed">
                          Compare approvals, transparent fee structures, syllabus, live exam modes and placement support side by side.
                        </p>
                      </div>

                      {/* Dynamic Course Highlights Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="bg-white border border-line rounded-xl p-2.5 shadow-2xs text-left">
                          <span className="block text-[10px] font-bold text-ink-500 uppercase tracking-wider">Duration</span>
                          <span className="text-xs font-extrabold text-ink-900">{durationText || "2 - 3 Years"}</span>
                        </div>
                        <div className="bg-white border border-line rounded-xl p-2.5 shadow-2xs text-left">
                          <span className="block text-[10px] font-bold text-ink-500 uppercase tracking-wider">Semester Fee</span>
                          <span className="text-xs font-extrabold text-brand-600 truncate block">{perSemText ? `${perSemText}` : (feeText || "Starts ₹15k")}</span>
                        </div>
                        <div className="bg-white border border-line rounded-xl p-2.5 shadow-2xs text-left">
                          <span className="block text-[10px] font-bold text-ink-500 uppercase tracking-wider">Approvals</span>
                          <span className="text-xs font-extrabold text-emerald-700">UGC-DEB • NAAC</span>
                        </div>
                        <div className="bg-white border border-line rounded-xl p-2.5 shadow-2xs text-left">
                          <span className="block text-[10px] font-bold text-ink-500 uppercase tracking-wider">Exam Mode</span>
                          <span className="text-xs font-extrabold text-ink-900">100% Online</span>
                        </div>
                      </div>

                      {/* Star Feature Bullet Points */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-medium text-ink-900">
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>100+ Universities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>30x Comparison Factors</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>Free Expert Consultation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>Quick Loan Facility</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>Celebrating 1 lac+ admissions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>Post Admission Support</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>Exclusive Student Community</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-brand-600 text-brand-600 shrink-0" />
                          <span>Job + Internship Portal</span>
                        </li>
                      </ul>

                      {/* Recruiter Placement Marquee (Smoothly Moving like College Details Pages) */}
                      <div className="bg-canvas border border-line rounded-xl p-2.5 sm:p-3 shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-ink-900 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                            <span>Top Hiring Partners for Online {courseShortTitle} Graduates</span>
                          </span>
                          <span className="text-[10px] font-bold text-brand-600">500+ Companies</span>
                        </div>
                        
                        {/* Continuous Moving Marquee of Hiring Partner Logos */}
                        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-0.5">
                          <div className="flex items-center gap-3 w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
                            {[...recruiters, ...recruiters, ...recruiters].map((rec, i) => (
                              <div
                                key={`rec-${rec.name}-${i}`}
                                className="flex items-center justify-center h-10 min-w-[105px] px-3 bg-white border border-line rounded-lg shrink-0 shadow-2xs"
                              >
                                <img
                                  src={rec.logo}
                                  alt={rec.name}
                                  className="max-h-5 max-w-[80px] object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Academic Counsellors High-Trust Banner (Flush with bottom of right column) */}
                      <div className="rounded-xl border border-brand-200 bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 p-3.5 text-white shadow-xs flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-amber-300 text-[10.5px] font-bold uppercase tracking-wider mb-0.5">
                            <Sparkles className="w-3 h-3" />
                            <span>Free counselling</span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white">
                            Speak with Senior Academic Counsellors
                          </h3>
                          <p className="text-[10.5px] text-slate-300 mt-0.5">
                            Verified advisors ready to help you compare programs and secure scholarships.
                          </p>
                        </div>
                        <div className="flex flex-col items-end shrink-0 gap-1">
                          <div className="flex -space-x-1.5">
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-brand-600 flex items-center justify-center font-bold text-[10px] text-white">
                              AS
                            </div>
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">
                              RK
                            </div>
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-600 flex items-center justify-center font-bold text-[10px] text-white">
                              VD
                            </div>
                          </div>
                          <span className="text-[9.5px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active Now
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: LEAD FORM CARD (lg:col-span-5) */}
                    <div className="lg:col-span-5 bg-white rounded-2xl border border-line p-3.5 sm:p-5 shadow-sm flex flex-col justify-between h-full">
                      
                      {/* Header with compact, clean dynamic title */}
                      <div className="text-center mb-2.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-[11px] font-semibold text-brand-600 mb-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>{course.name}</span>
                        </div>
                        <h1 id="course-h1" className="text-base sm:text-lg lg:text-xl font-extrabold text-ink-900 tracking-tight leading-snug">
                          <span className="text-brand-600">Compare &amp; Apply</span> for Online {courseShortTitle}
                        </h1>
                      </div>

                      {/* Benefit Badges */}
                      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2.5">
                        <div className="flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-bold text-emerald-800">
                          <Percent className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Get Online Discount of up to 15%</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10.5px] font-bold text-brand-600">
                          <Handshake className="w-3 h-3 text-brand-600 shrink-0" />
                          <span>OnlineSiksha Promise: Lowest Price</span>
                        </div>
                      </div>

                      {!leadSubmitted ? (
                        <form onSubmit={handleLeadSubmit} noValidate className="space-y-2.5">
                          
                          {/* Row 1: Full Name & Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label htmlFor="lead-name" className="block text-[11.5px] font-bold text-ink-900 mb-1">
                                Full Name <span className="text-rose-500">*</span>
                              </label>
                              <input
                                id="lead-name"
                                type="text"
                                placeholder="Full Name"
                                value={leadForm.name}
                                onChange={(e) => {
                                  setLeadForm({ ...leadForm, name: e.target.value });
                                  if (errors.name) setErrors({ ...errors, name: null });
                                }}
                                className={`w-full h-9.5 px-3 rounded-lg border text-xs sm:text-[13px] font-medium text-ink-900 placeholder:text-ink-400 outline-none bg-white transition-all ${
                                  errors.name ? "border-rose-400 focus:border-rose-500" : "border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                                }`}
                              />
                              {errors.name && <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{errors.name}</p>}
                            </div>

                            <div>
                              <label htmlFor="lead-email" className="block text-[11.5px] font-bold text-ink-900 mb-1">
                                Email Address <span className="text-rose-500">*</span>
                              </label>
                              <input
                                id="lead-email"
                                type="email"
                                placeholder="name@example.com"
                                value={leadForm.email}
                                onChange={(e) => {
                                  setLeadForm({ ...leadForm, email: e.target.value });
                                  if (errors.email) setErrors({ ...errors, email: null });
                                }}
                                className={`w-full h-9.5 px-3 rounded-lg border text-xs sm:text-[13px] font-medium text-ink-900 placeholder:text-ink-400 outline-none bg-white transition-all ${
                                  errors.email ? "border-rose-400 focus:border-rose-500" : "border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                                }`}
                              />
                              {errors.email && <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{errors.email}</p>}
                            </div>
                          </div>

                          {/* Row 2: Phone Number & State */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label htmlFor="lead-phone" className="block text-[11.5px] font-bold text-ink-900 mb-1">
                                Phone Number <span className="text-rose-500">*</span>
                              </label>
                              <div className="flex">
                                <span className="h-9.5 px-2.5 border border-line-strong border-r-0 rounded-l-lg bg-brand-50 text-ink-900 font-bold text-xs flex items-center justify-center shrink-0">
                                  🇮🇳 +91
                                </span>
                                <input
                                  id="lead-phone"
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={10}
                                  pattern={INDIAN_PHONE_PATTERN}
                                  title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                                  placeholder="10-digit Phone"
                                  value={leadForm.phone}
                                  onChange={(e) => {
                                    setLeadForm({ ...leadForm, phone: sanitizeIndianPhone(e.target.value) });
                                    if (errors.phone) setErrors({ ...errors, phone: null });
                                  }}
                                  className={`w-full h-9.5 px-3 rounded-r-lg border text-xs sm:text-[13px] font-medium text-ink-900 placeholder:text-ink-400 outline-none bg-white transition-all ${
                                    errors.phone ? "border-rose-400 focus:border-rose-500" : "border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                                  }`}
                                />
                              </div>
                              {errors.phone && <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{errors.phone}</p>}
                            </div>

                            <div>
                              <label htmlFor="lead-state" className="block text-[11.5px] font-bold text-ink-900 mb-1">
                                State <span className="text-rose-500">*</span>
                              </label>
                              <div className="relative">
                                <select
                                  id="lead-state"
                                  value={leadForm.state}
                                  onChange={(e) => {
                                    setLeadForm({ ...leadForm, state: e.target.value });
                                    if (errors.state) setErrors({ ...errors, state: null });
                                  }}
                                  className={`w-full h-9.5 pl-3 pr-8 rounded-lg border text-xs sm:text-[13px] font-medium text-ink-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 outline-none bg-white appearance-none cursor-pointer ${
                                    errors.state ? "border-rose-400" : "border-line-strong"
                                  }`}
                                >
                                  <option value="">Select State</option>
                                  {INDIAN_STATES.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-ink-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                              {errors.state && <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{errors.state}</p>}
                            </div>
                          </div>

                          {/* Row 3: Specialization (Full Width) */}
                          <div>
                            <label htmlFor="lead-spec" className="block text-[11.5px] font-bold text-ink-900 mb-1">
                              Specialization <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                id="lead-spec"
                                value={leadForm.specialisation}
                                onChange={(e) => setLeadForm({ ...leadForm, specialisation: e.target.value })}
                                className="w-full h-10 pl-3 pr-8 rounded-lg border border-line-strong text-xs sm:text-[13px] font-medium text-ink-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 outline-none bg-white appearance-none cursor-pointer"
                              >
                                <option value="Not sure yet">Select specialization (or explore all)</option>
                                {specOptions.map((spec) => (
                                  <option key={spec} value={spec}>
                                    {spec}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-ink-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* OnlineSiksha Assured Guarantee Box */}
                          <div className="rounded-xl border border-brand-300 bg-canvas p-3">
                            <div className="flex items-center justify-between mb-2">
                              <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="w-3.5 h-3.5 rounded accent-brand-600"
                                />
                                <span className="text-[11.5px] font-bold text-ink-900">
                                  OnlineSiksha Assured
                                </span>
                              </label>
                              <span className="text-[10.5px] font-semibold text-brand-600 hover:underline cursor-pointer">
                                Learn more about OS Assured &rarr;
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-line">
                              <div className="flex flex-col items-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-brand-600 mb-0.5" />
                                <span className="text-[10px] font-bold text-ink-900 leading-tight">100% Free Guidance</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Lock className="w-3.5 h-3.5 text-brand-600 mb-0.5" />
                                <span className="text-[10px] font-bold text-ink-900 leading-tight">5 Days Fees Lock</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Headphones className="w-3.5 h-3.5 text-brand-600 mb-0.5" />
                                <span className="text-[10px] font-bold text-ink-900 leading-tight">Post Admission Help</span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <button
                            type="submit"
                            className="w-full h-11 sm:h-11.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm sm:text-base font-extrabold shadow-sm hover:shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-1"
                          >
                            <span>Find Best University in 2 Mins</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          {/* Security & TRAI Consent */}
                          <div className="text-center pt-0.5 space-y-1">
                            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <Lock className="w-3 h-3 text-emerald-600" />
                              <span>Your personal information is secure with us</span>
                            </div>
                            <p className="text-[9.5px] leading-relaxed text-ink-500">
                              I agree and consent to receive all communications at the mobile number provided, even if registered under DND/NCPR. All counselling is 100% free and unbiased.
                            </p>
                          </div>

                        </form>
                      ) : (
                        <div className="text-center py-6 space-y-2.5">
                          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                          <h3 className="text-lg font-bold text-ink-900">Thanks, we have received your request!</h3>
                          <p className="text-xs sm:text-sm text-ink-700 max-w-md mx-auto">
                            A senior academic advisor will call you within 15 minutes regarding <strong>{course.name}</strong> to share syllabus, compare top approved universities, and provide zero-cost EMI guidance.
                          </p>
                          <button
                            type="button"
                            onClick={() => setLeadSubmitted(false)}
                            className="mt-2 px-4 py-2 rounded-xl bg-brand-50 border border-brand-600 text-brand-600 text-xs font-bold hover:bg-brand-600 hover:text-white transition-colors cursor-pointer"
                          >
                            Submit Another Query
                          </button>
                        </div>
                      )}

                    </div>

                  </div>
                </section>
              );
            })()}

            {/* Rich CMS Content & Interactive Blocks */}
            <CourseCmsContent
              course={course}
              onOpenCounseling={() => {
                if (onOpenCounseling) onOpenCounseling();
                else window.location.href = "/counselling";
              }}
            />

            {/* Related Courses Section — Same 4-card template & dimensions as Home Page Blogs */}
            {state.related && state.related.length > 0 && (
              <section className="mt-8 mb-4 w-full rounded-2xl border border-line bg-white p-5 md:p-6 shadow-xs">
                <div className="mb-3.5 sm:mb-4">
                  <div className="flex items-center justify-between gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-ink-900 font-sans tracking-tight m-0">
                      Related Online Courses
                    </h2>
                    <Link
                      to="/courses"
                      className="shrink-0 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white transition-all shadow-2xs active:scale-95 leading-none"
                    >
                      <span>View all</span>
                      <ArrowRight size={12} className="shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal mt-1">
                    Compare other UGC-DEB entitled online degree programs with verified fees and flexible EMI plans.
                  </p>
                </div>
                <div className="flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 mt-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                  {state.related.slice(0, 4).map((c) => (
                    <RelatedCourseCard key={c.id} course={c} />
                  ))}
                </div>
              </section>
            )}

            {/* Frequently Asked Questions — Last Section on Detail Page */}
            {(() => {
              const faqSource = course ? (course.faq || course.faqs) : null;
              const faqItems = (faqSource && Array.isArray(faqSource.items) ? faqSource.items : (Array.isArray(course?.faqs) ? course.faqs : [])) || [];
              if (!faqItems.length) return null;
              return (
                <section className="mt-8 mb-6 pt-6 border-t border-line" aria-labelledby="course-faq-title">
                  <div className="flex items-center gap-2 mb-3.5">
                    <h2 id="course-faq-title" className="text-lg sm:text-xl font-bold text-ink-900 m-0">
                      Frequently Asked Questions ({course?.name || "Online Course"})
                    </h2>
                  </div>
                  <FaqAccordion
                    items={faqItems.map((f, i) => ({
                      id: (f && f._id) || (f && f.id) || "course-faq-" + i,
                      question: String((f && f.question) || "").replace(/DegreeFYD/gi, "OnlineSiksha"),
                      answer: String((f && f.answer) || "").replace(/DegreeFYD/gi, "OnlineSiksha"),
                    }))}
                    renderAnswer={(item) => <SafeHtml html={item.answer} />}
                  />
                </section>
              );
            })()}
          </>
        )}
      </div>
    </main>
  );
}
