import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseBySlug, getCoursesListing } from "../services/courseApi";
import { formatCourseLevelLabel, formatFeeDisplay, formatDurationDisplay } from "../services/apiAdapter";
import usePageMeta from "../hooks/usePageMeta";
import CourseCmsContent from "../components/CourseCmsContent";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Calendar,
  Layers,
  Calculator,
  ShieldCheck,
  Clock
} from "lucide-react";

function formatCourseTitle(title) {
  if (!title) return "";
  // Keep hyphenated parenthetical acronyms like (e-GMP) together on the same line
  return title.replace(/\(([a-zA-Z0-9]+)-([a-zA-Z0-9]+)\)/g, (m, a, b) => `(${a}\u2011${b})`);
}

function RelatedCourseCard({ course }) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = (!imgFailed && (course.images?.primary || course.images?.logo || course.images?.hero)) || "";
  const isBanner = Boolean(course.images?.isBanner);
  const displayLevel = course.displayLevel || formatCourseLevelLabel(course.rawLevels || course.level, course.name);
  const feeStr = course.feeDisplay || formatFeeDisplay(course.totalFee, course.totalFee) || "Flexible EMI";

  return (
    <article className="group bg-white rounded-xl border border-[#e7eeff] hover:border-[#b1c8eb] hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#f0f4f8] via-[#eef4ff] to-[#e7eeff]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={course.images?.alt || course.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className={`w-full h-full ${
                isBanner ? "object-cover object-center group-hover:scale-105" : "object-contain object-center p-4"
              } transition-transform duration-300`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-[#115eaf]">
              <div className="w-8 h-8 rounded-lg bg-white/90 border border-[#d5e3ff] flex items-center justify-center shadow-2xs mb-1">
                <BookOpen className="w-4 h-4 text-[#115eaf]" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-bold text-[#555960] tracking-wider uppercase">{displayLevel}</span>
            </div>
          )}
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#115eaf] border border-[#d5e3ff] shadow-2xs">
            {displayLevel}
          </span>
        </div>

        <div className="p-3.5">
          <h3 className="text-sm font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors leading-snug line-clamp-2">
            <Link to={"/courses/" + course.id}>{course.name}</Link>
          </h3>
          {course.shortDescription ? (
            <p className="text-xs text-[#555960] mt-1 line-clamp-2 leading-relaxed">
              {course.shortDescription}
            </p>
          ) : null}
        </div>
      </div>

      <div className="p-3.5 pt-0">
        {course.duration ? (
          <div className="flex items-center gap-2 text-[11px] text-[#74777e] mb-2 pb-2 border-b border-[#f0f4f8]">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#115eaf]" aria-hidden="true" />
              <span>{course.duration}</span>
            </span>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#115eaf] truncate">
            {feeStr}
          </span>
          <Link
            to={"/courses/" + course.id}
            className="h-7.5 px-2.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs transition-colors shrink-0"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CourseDetail({ onOpenCounseling }) {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", course: null, related: [] });
  const [retryKey, setRetryKey] = useState(0);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const cmsCourse = state.status === "ready" ? state.course : null;
  usePageMeta({
    title: (cmsCourse && cmsCourse.seo && cmsCourse.seo.meta && cmsCourse.seo.meta.metaTitle) || (cmsCourse ? `${cmsCourse.name} | OnlineSiksha` : "Online Course | OnlineSiksha"),
    description: (cmsCourse && cmsCourse.seo && cmsCourse.seo.meta && cmsCourse.seo.meta.metaDescription) || (cmsCourse?.shortDescription || "Explore accredited online course fees, duration, syllabus, eligibility and career prospects."),
    noindex: false,
    canonicalUrl: (cmsCourse && cmsCourse.seo && cmsCourse.seo.meta && cmsCourse.seo.meta.canonicalUrl) || "",
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, status: "loading" }));
    setHeroImgFailed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    getCourseBySlug(slug)
      .then((res) => {
        if (cancelled) return;
        setState((prev) => ({ ...prev, status: "ready", course: res.course || null }));
      })
      .catch((err) => {
        if (cancelled) return;
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
        setState((prev) => ({ ...prev, related: related.slice(0, 3) }));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const course = state.status === "ready" ? state.course : null;

  const feeText = course
    ? (course.feeDisplay || formatFeeDisplay(course.totalFee, course.totalFee))
    : null;
  const perSemText = course && course.perSemFee > 0
    ? formatFeeDisplay(course.perSemFee, course.perSemFee)
    : null;
  const durationText = course
    ? (course.duration || formatDurationDisplay(course.duration))
    : null;
  const displayLevel = course
    ? (course.displayLevel || formatCourseLevelLabel(course.rawLevels || course.level, course.name))
    : "";
  const heroImageSrc = (!heroImgFailed && course && (course.images?.primary || course.images?.logo || course.images?.hero)) || "";
  const isHeroBanner = Boolean(course?.images?.isBanner);
  const semestersCount = course && course.semestersCount > 0 ? course.semestersCount : 0;

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white min-h-screen py-4 sm:py-6">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {state.status === "loading" && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3" role="status" aria-live="polite">
            <div className="h-9 w-9 rounded-full border-3 border-[#e7eeff] border-t-[#115eaf] animate-spin" />
            <p className="text-xs sm:text-sm text-[#555960]">Loading course details...</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="py-14 flex flex-col items-center justify-center text-center gap-3" role="alert">
            <AlertCircle className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h1 className="text-base sm:text-lg font-bold text-[#000f22]">We could not load this course right now.</h1>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">The course service is temporarily unavailable. Please try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && !course && (
          <div className="py-14 flex flex-col items-center justify-center text-center gap-3">
            <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
            <h1 className="text-base sm:text-lg font-bold text-[#000f22]">Course not found.</h1>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-md">The course you are looking for is not available right now.</p>
            <Link to="/courses" className="mt-2 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors">
              <span>Browse All Courses</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {state.status === "ready" && course && (
          <>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-xs text-[#74777e] overflow-x-auto [scrollbar-width:none]">
              <Link to="/" className="hover:text-[#115eaf] transition-colors whitespace-nowrap">Home</Link>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <Link to="/courses" className="hover:text-[#115eaf] transition-colors whitespace-nowrap">Courses</Link>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-[#000f22] font-semibold truncate max-w-[220px] sm:max-w-none">{course.name}</span>
            </nav>

            {/* Course Hero Section - Content-driven height, compact padding, responsive H1 */}
            <section className="rounded-2xl border border-[#e7eeff] bg-gradient-to-br from-[#f8fbff] via-white to-[#f0f5ff] p-4 sm:p-5 lg:py-5 lg:px-6 mb-5 h-auto min-h-0">
              <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                <div className={`${heroImageSrc ? "lg:col-span-7" : "lg:col-span-8"} min-w-0`}>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e7eeff] text-[#115eaf] border border-[#d5e3ff]">
                      {displayLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f7f9fc] text-[#43474d] border border-[#e7eeff]">
                      100% Online Delivery
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      UGC-DEB Entitled
                    </span>
                  </div>

                  <h1 className="course-detail-h1 text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#000f22] tracking-[-0.015em] leading-[1.2] mb-2 break-words">
                    {formatCourseTitle(course.name)}
                  </h1>

                  {(durationText || semestersCount > 0 || course.credits > 0) ? (
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] text-[#115eaf] font-semibold mb-2">
                      {durationText ? <span>{durationText}</span> : null}
                      {durationText && semestersCount > 0 ? <span aria-hidden="true">•</span> : null}
                      {semestersCount > 0 ? (
                        <span>
                          {semestersCount} {semestersCount > 6 ? "Modules" : "Semesters"}
                        </span>
                      ) : null}
                      {course.credits > 0 ? <span aria-hidden="true">•</span> : null}
                      {course.credits > 0 ? <span>{course.credits} Credits</span> : null}
                    </div>
                  ) : null}

                  <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed mb-3.5 max-w-2xl line-clamp-3">
                    {course.shortDescription || "Explore verified syllabus, fees, duration, and admission requirements for this online programme."}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenCounseling) onOpenCounseling();
                        else window.location.href = "/counselling";
                      }}
                      className="inline-flex items-center gap-1.5 px-4.5 h-10 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Talk to an Academic Advisor</span>
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl border border-[#115eaf] hover:bg-[#eff5ff] text-[#115eaf] text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span>Browse All Courses</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className={`${heroImageSrc ? "lg:col-span-5" : "lg:col-span-4"} min-w-0 w-full`}>
                  {/* Genuine CMS Hero Image if available */}
                  {heroImageSrc ? (
                    <div
                      className={`relative rounded-xl overflow-hidden border border-[#d5e3ff] bg-gradient-to-br from-[#eff5ff] to-[#f0f4f8] mb-2 shadow-2xs ${
                        isHeroBanner ? "aspect-[16/9] max-h-[155px] sm:max-h-[165px] lg:max-h-[155px] w-full" : "h-24 flex items-center justify-center p-3"
                      }`}
                    >
                      <img
                        src={heroImageSrc}
                        alt={course.images?.alt || course.name}
                        loading="eager"
                        onError={() => setHeroImgFailed(true)}
                        className={isHeroBanner ? "w-full h-full object-cover object-center" : "max-h-full max-w-full object-contain object-center"}
                      />
                    </div>
                  ) : null}

                  {/* Quick Course Facts Card */}
                  <div className="rounded-xl border border-[#e7eeff] bg-white p-3 sm:py-3 sm:px-3.5 shadow-2xs">
                    <h2 className="text-xs sm:text-[13px] font-bold text-[#000f22] mb-1.5 pb-1.5 border-b border-[#f0f4f8] flex items-center justify-between">
                      <span>Quick Course Facts</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#115eaf]" aria-hidden="true" />
                    </h2>
                    <dl className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-[#74777e] inline-flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#115eaf] shrink-0" aria-hidden="true" />
                          <span>Duration</span>
                        </dt>
                        <dd className="text-[#000f22] font-semibold text-right">{durationText || "Flexible"}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-[#74777e] inline-flex items-center gap-1.5">
                          <Calculator className="w-3.5 h-3.5 text-[#115eaf] shrink-0" aria-hidden="true" />
                          <span>Fee Structure</span>
                        </dt>
                        <dd className="text-[#115eaf] font-bold text-right truncate">{feeText || "Zero-Cost EMI Available"}</dd>
                      </div>
                      {perSemText ? (
                        <div className="flex items-center justify-between gap-3">
                          <dt className="text-[#74777e] inline-flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#115eaf] shrink-0" aria-hidden="true" />
                            <span>Per Semester</span>
                          </dt>
                          <dd className="text-[#000f22] font-semibold text-right">{perSemText}</dd>
                        </div>
                      ) : null}
                      {semestersCount > 0 ? (
                        <div className="flex items-center justify-between gap-3">
                          <dt className="text-[#74777e] inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#115eaf] shrink-0" aria-hidden="true" />
                            <span>{semestersCount > 6 ? "Curriculum Units" : "Semesters"}</span>
                          </dt>
                          <dd className="text-[#000f22] font-semibold text-right">
                            {semestersCount} {semestersCount > 6 ? "Modules" : "Semesters"}
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                </div>
              </div>
            </section>

            {/* Rich CMS Content & Interactive Blocks (includes the 2 required Counselling Banners) */}
            <CourseCmsContent
              course={course}
              onOpenCounseling={() => {
                if (onOpenCounseling) onOpenCounseling();
                else window.location.href = "/counselling";
              }}
            />

            {/* Related Courses Section */}
            {state.related && state.related.length > 0 && (
              <section className="mt-6 mb-4 pt-6 border-t border-[#e7eeff]">
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#115eaf]" aria-hidden="true" />
                    <h2 className="text-lg sm:text-xl font-bold text-[#000f22]">Related Online Courses</h2>
                  </div>
                  <Link to="/courses" className="text-xs font-semibold text-[#115eaf] hover:underline inline-flex items-center gap-1">
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.related.map((c) => (
                    <RelatedCourseCard key={c.id} course={c} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
