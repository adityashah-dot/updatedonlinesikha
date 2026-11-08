import { Link } from "react-router-dom";
import SafeHtml from "./blog/SafeHtml";
import { FaqAccordion } from "./FaqAccordion";
import CoursesPromoBanner from "./CoursesPromoBanner";
import { RecruitersGrid } from "./university/UniversityPlacements";
import { ArrowRight, CheckCircle, Star, BookOpen } from "lucide-react";
import "./course-content.css";

function rewriteInternalHref(href) {
  if (!href || typeof href !== "string") return "";
  const trimmed = href.trim();
  try {
    const u = new URL(trimmed);
    if (/(?:^|\.)degreefyd\.com$/i.test(u.hostname)) {
      const p = u.pathname.replace(/\/+$/, "");
      const cm = p.match(/^\/courses?\/([^/?#]+)/i);
      if (cm) return `/courses/${decodeURIComponent(cm[1])}`;
      const um = p.match(/^\/colleges?\/([^/?#]+)/i);
      if (um) return `/universities/${decodeURIComponent(um[1])}`;
      const bm = p.match(/^\/blogs?\/([^/?#]+)/i);
      if (bm) return `/blog/${decodeURIComponent(bm[1])}`;
      return "";
    }
  } catch {
    // relative path
  }
  return trimmed;
}

function RichtextBlock({ block }) {
  const content = (block && (block.content || block.html || block.text)) || "";
  const title = (block && (block.title || block.heading)) || "";
  const rawLevel = String((block && (block.headingLevel || block.level)) || "h2").toLowerCase();
  const level = rawLevel === "h3" || rawLevel === "3" ? "h3" : rawLevel === "h4" || rawLevel === "4" ? "h4" : rawLevel === "h5" || rawLevel === "5" ? "h5" : "h2";
  const heading = title
    ? level === "h3"
      ? <h3 className="text-base sm:text-lg font-bold text-[#000f22] mt-4 mb-2">{title}</h3>
      : level === "h4"
        ? <h4 className="text-sm sm:text-base font-semibold text-[#000f22] mt-3.5 mb-1.5">{title}</h4>
        : level === "h5"
          ? <h5 className="text-xs sm:text-sm font-semibold text-[#000f22] mt-3 mb-1">{title}</h5>
          : <h2 className="text-lg sm:text-xl font-bold text-[#000f22] mt-5 mb-2.5">{title}</h2>
    : null;
  return (
    <div className="mb-3.5 last:mb-0">
      {heading}
      {content ? <SafeHtml html={content} /> : null}
    </div>
  );
}

function CtaBlock({ block, onOpenCounseling }) {
  const content = (block && block.content) || {};
  const beforeContent = content && content.beforeContent ? String(content.beforeContent) : "";
  const afterContent = content && content.afterContent ? String(content.afterContent) : "";
  const buttons = Array.isArray(content && content.buttons) ? content.buttons : [];
  if (!beforeContent && !afterContent && buttons.length === 0) return null;
  return (
    <div className="my-4 p-4 rounded-xl bg-[#f7faff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="min-w-0">
        {beforeContent ? <SafeHtml html={beforeContent} className="text-xs sm:text-sm text-[#000f22] font-medium [&_p]:mb-0" /> : null}
        {afterContent ? <SafeHtml html={afterContent} className="mt-1 text-xs text-[#555960] [&_p]:mb-0" /> : null}
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        {buttons.length > 0 ? (
          buttons.map((b, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (onOpenCounseling) onOpenCounseling();
                else if (b.url) window.location.href = String(b.url);
                else window.location.href = "/counselling";
              }}
              className="inline-flex items-center gap-1.5 px-3.5 h-8.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>{String(b.text || "Explore Options")}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          ))
        ) : (
          <button
            type="button"
            onClick={() => {
              if (onOpenCounseling) onOpenCounseling();
              else window.location.href = "/counselling";
            }}
            className="inline-flex items-center gap-1.5 px-3.5 h-8.5 rounded-lg bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Get Guidance</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function StepFlowBlock({ block }) {
  const content = (block && block.content) || {};
  const steps = Array.isArray(content.steps) ? content.steps : [];
  const heading = (content && content.heading) ? String(content.heading) : (block && block.title) || "";
  if (steps.length === 0) return null;
  return (
    <div className="my-4">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-[#000f22] mb-2.5">{heading}</h3> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {steps.map((s, i) => (
          <div key={i} className="p-3 rounded-xl border border-[#e7eeff] bg-white flex items-start gap-2.5 shadow-2xs">
            <span className="w-5.5 h-5.5 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-xs sm:text-[13px] text-[#43474d] leading-snug mb-0">
              {s && (s.text || s.title || String(s))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SyllabusBlock({ block, sectionTitle }) {
  const content = (block && block.content) || {};
  const semesters = Array.isArray(content.semesters) ? content.semesters : [];
  const rawHeading = (content && content.heading) ? String(content.heading).trim() : String((block && block.title) || "").trim();
  const isDuplicateHeading = rawHeading && sectionTitle && rawHeading.toLowerCase() === String(sectionTitle).trim().toLowerCase();
  const heading = isDuplicateHeading ? "" : rawHeading;

  if (semesters.length === 0) return null;

  const isSingleCard = semesters.length === 1;

  return (
    <div className="my-4" data-testid="course-syllabus-block">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-[#000f22] mb-3">{heading}</h3> : null}
      <div
        className={`grid grid-cols-1 ${
          isSingleCard ? "" : "md:grid-cols-2"
        } gap-[14px] sm:gap-[16px] items-start`}
      >
        {semesters.map((sem, i) => {
          const coreSubjects = Array.isArray(sem && sem.core_subjects) ? sem.core_subjects.filter(Boolean) : [];
          const electives = Array.isArray(sem && sem.electives) ? sem.electives.filter(Boolean) : [];
          const totalSubjectsCount = coreSubjects.length + electives.length;
          const semTitle = sem && sem.title ? String(sem.title) : `Unit ${i + 1}`;
          const unitNumber = String(i + 1).padStart(2, "0");
          const useMultiColSubjects = isSingleCard && coreSubjects.length >= 8;

          return (
            <div
              key={(sem && sem.id) || i}
              data-testid="syllabus-module-card"
              className="rounded-xl border border-[#dce7fb] bg-[#fbfdff] p-[18px] sm:p-[20px] shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-[#e7eeff]">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <span
                    className="w-6 h-6 rounded-md bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {unitNumber}
                  </span>
                  <h4 className="text-[13px] sm:text-[14px] font-bold text-[#000f22] leading-[1.32] break-words m-0">
                    {semTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  {sem && sem.credits ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e7eeff] text-[#115eaf] whitespace-nowrap">
                      {sem.credits} Credits
                    </span>
                  ) : totalSubjectsCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#eef4ff] text-[#115eaf] whitespace-nowrap">
                      {totalSubjectsCount} {totalSubjectsCount === 1 ? "Subject" : "Subjects"}
                    </span>
                  ) : null}
                </div>
              </div>

              {coreSubjects.length > 0 ? (
                <div>
                  {electives.length > 0 ? (
                    <span className="text-[10px] font-bold text-[#115eaf] uppercase tracking-wider block mb-1.5">
                      Core Subjects
                    </span>
                  ) : null}
                  <ul
                    className={`pl-0 list-none m-0 ${
                      useMultiColSubjects
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-[8px]"
                        : "flex flex-col gap-[8px]"
                    }`}
                  >
                    {coreSubjects.map((sub, j) => (
                      <li key={j} className="text-xs sm:text-[13px] text-[#374151] leading-[1.45] flex items-start gap-2 m-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf] shrink-0 mt-[6px]" aria-hidden="true" />
                        <span className="min-w-0 break-words">{String(sub)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {electives.length > 0 ? (
                <div className={coreSubjects.length > 0 ? "mt-2.5 pt-2.5 border-t border-[#ecf2fc]" : ""}>
                  <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider block mb-1.5">
                    Elective Subjects
                  </span>
                  <ul className="flex flex-col gap-[8px] pl-0 list-none m-0">
                    {electives.map((elective, j) => (
                      <li key={j} className="text-xs sm:text-[13px] text-[#374151] leading-[1.45] flex items-start gap-2 m-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] shrink-0 mt-[6px]" aria-hidden="true" />
                        <span className="min-w-0 break-words">{String(elective)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpecializationListBlock({ block }) {
  const content = (block && block.content) || {};
  const items = Array.isArray(content.items) ? content.items : [];
  const heading = (content && content.heading) ? String(content.heading) : (block && block.title) || "";
  if (items.length === 0) return null;
  return (
    <div className="my-4">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-[#000f22] mb-2.5">{heading}</h3> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item, i) => {
          const label = item && item.label ? String(item.label) : "";
          const rawHref = item && item.isHyperlinkActive ? (item && item.hyperlink ? String(item.hyperlink) : "") : "";
          const href = rewriteInternalHref(rawHref);
          const isInternal = href.startsWith("/");
          return (
            <div key={i} className="px-3 py-2.5 rounded-xl border border-[#e7eeff] bg-white flex items-center gap-2 hover:border-[#b1c8eb] transition-colors shadow-2xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              {href ? (
                isInternal ? (
                  <Link to={href} className="text-xs sm:text-[13px] font-medium text-[#115eaf] hover:underline break-words">
                    {label}
                  </Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-[13px] font-medium text-[#115eaf] hover:underline break-words">
                    {label}
                  </a>
                )
              ) : (
                <span className="text-xs sm:text-[13px] text-[#000f22] font-medium break-words">{label}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatureCardsBlock({ block }) {
  const content = (block && block.content) || {};
  const items = Array.isArray(content.items) ? content.items : [];
  const heading = (content && content.heading) ? String(content.heading) : (block && block.title) || "";
  if (items.length === 0) return null;
  return (
    <div className="my-4">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-[#000f22] mb-2.5">{heading}</h3> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div key={i} className="p-3.5 rounded-xl border border-[#e7eeff] bg-white shadow-2xs">
            {item && item.title ? <h4 className="text-xs sm:text-sm font-bold text-[#000f22] mb-1 mt-0">{String(item.title)}</h4> : null}
            {item && item.description ? <p className="text-xs text-[#555960] leading-relaxed mb-0">{String(item.description).replace(/DegreeFYD/gi, "OnlineSiksha")}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderCourseBlock(block, key, onOpenCounseling, sectionTitle) {
  if (!block || typeof block !== "object") return null;
  const type = String(block.type || "").toLowerCase();
  if (type === "richtext" || type === "html" || type === "text") return <RichtextBlock key={key} block={block} />;
  if (type === "cta" || type === "ctabuttons" || type === "call_to_action") return <CtaBlock key={key} block={block} onOpenCounseling={onOpenCounseling} />;
  if (type === "step_flow" || type === "admission_flow") return <StepFlowBlock key={key} block={block} />;
  if (type === "syllabus" || type === "compare") return <SyllabusBlock key={key} block={block} sectionTitle={sectionTitle} />;
  if (type === "specialization_list") return <SpecializationListBlock key={key} block={block} />;
  if (type === "feature_cards" || type === "feature_list" || type === "courses_list") return <FeatureCardsBlock key={key} block={block} />;
  const fallback = block.content || block.html || block.text || block.value;
  if (fallback) {
    return (
      <div key={key} className="mb-3.5 last:mb-0">
        <SafeHtml html={typeof fallback === "string" ? fallback : ""} />
      </div>
    );
  }
  return null;
}

function resolveCurriculumBannerIndex(sections) {
  if (!Array.isArray(sections) || sections.length === 0) return -1;
  let syllabusSecIdx = -1;
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const hasSylBlock = Array.isArray(s?.blocks) && s.blocks.some((b) => String(b?.type || "").toLowerCase() === "syllabus");
    const hasSylTitle = /syllabus|curriculum|subject/i.test(String(s?.title || ""));
    if (hasSylBlock || hasSylTitle) {
      syllabusSecIdx = i;
      break;
    }
  }
  if (syllabusSecIdx !== -1) {
    const nextSec = sections[syllabusSecIdx + 1];
    if (nextSec && /speciali[sz]ation/i.test(String(nextSec.title || ""))) {
      return syllabusSecIdx + 1;
    }
    return syllabusSecIdx;
  }
  for (let i = 0; i < sections.length; i++) {
    if (/speciali[sz]ation/i.test(String(sections[i]?.title || ""))) {
      return i;
    }
  }
  return Math.min(sections.length - 1, Math.max(0, Math.floor(sections.length / 2)));
}

export default function CourseCmsContent({ course, onOpenCounseling }) {
  const sections = Array.isArray(course && course.sections) ? course.sections : [];
  const courseRecruiters = course && Array.isArray(course.recruiters) ? course.recruiters : [];
  const hasRecruiterSectionInCms = sections.some((s) =>
    /top recruiters|recruiters/i.test(String(s?.title || ""))
  );
  const faqSource = course ? (course.faq || course.faqs) : null;
  const faqItems = (faqSource && Array.isArray(faqSource.items) ? faqSource.items : (Array.isArray(course?.faqs) ? course.faqs : [])) || [];
  const testimonials = Array.isArray(course && course.testimonials) ? course.testimonials : [];
  const overviewHtml = (course && (course.overview || course.shortDescription)) || "";
  const overviewAfterImage = (course && course.overviewAfterImage) || "";

  const banner2SecIdx = resolveCurriculumBannerIndex(sections);

  const handleCounseling = () => {
    if (typeof onOpenCounseling === "function") onOpenCounseling();
    else if (typeof window !== "undefined") window.location.href = "/counselling";
  };

  return (
    <article className="course-prose w-full min-w-0">
      {overviewHtml ? (
        <section className="mb-6" aria-label="Course overview">
          <h2 className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-2.5">Course Overview</h2>
          <SafeHtml html={overviewHtml} />
        </section>
      ) : null}

      {/* Banner 1: Immediately after Course Overview */}
      <div className="my-6">
        <CoursesPromoBanner
          heading="FREE 1-ON-1 ACADEMIC COUNSELLING"
          title="1-on-1 Admission & University Guidance"
          message="Compare UGC-DEB recognized universities, verified semester fees, and zero-cost EMI options with our academic advisors."
          ctaLabel="Get Free Counselling"
          onCtaClick={handleCounseling}
        />
      </div>

      {overviewAfterImage ? (
        <section className="mb-6" aria-label="Course snapshot table">
          <h2 className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-2.5">Course Highlights &amp; Snapshot</h2>
          <SafeHtml html={overviewAfterImage} />
        </section>
      ) : null}

      {sections.map((section, sIdx) => {
        const sectionKey = (section && section.key) || ("course-section-" + (sIdx + 1));
        const rawHeading = (section && section.title) || "";
        const heading = rawHeading.replace(/DegreeFYD/gi, "OnlineSiksha");
        const blocks = Array.isArray(section && section.blocks) ? section.blocks : [];
        const isRecruiterSection = /top recruiters|recruiters/i.test(heading);

        return (
          <div key={sectionKey}>
            <section className="mb-6" aria-labelledby={"cms-sec-" + sectionKey}>
              {heading ? (
                <h2 id={"cms-sec-" + sectionKey} className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-2.5">
                  {heading}
                </h2>
              ) : null}

              {isRecruiterSection && courseRecruiters.length > 0 ? (
                <div className="mb-5">
                  <RecruitersGrid
                    recruiters={courseRecruiters}
                    showHeading={false}
                  />
                </div>
              ) : null}

              <div>
                {blocks.map((block, bIdx) => renderCourseBlock(block, sIdx + "-" + bIdx, handleCounseling, heading))}
              </div>
            </section>

            {/* Banner 2: Immediately after Curriculum / Specialisations */}
            {sIdx === banner2SecIdx ? (
              <div className="my-6">
                <CoursesPromoBanner
                  heading="FREE 1-ON-1 ACADEMIC COUNSELLING"
                  title="Curriculum & Elective Advisory"
                  message="Speak 1-on-1 with our academic counsellors to match curriculum electives and fee structures with your career goals."
                  ctaLabel="Talk to an Academic Advisor"
                  onCtaClick={handleCounseling}
                />
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Fallback for Banner 2 when a course has 0 CMS sections */}
      {sections.length === 0 ? (
        <div className="my-6">
          <CoursesPromoBanner
            heading="FREE 1-ON-1 ACADEMIC COUNSELLING"
            title="Need guidance on syllabus, electives, or university shortlisting?"
            message="Speak 1-on-1 with our academic counsellors to match curriculum electives and fee structures with your career goals."
            ctaLabel="Talk to an Academic Advisor"
            onCtaClick={handleCounseling}
          />
        </div>
      ) : null}

      {/* Standalone Recruiter section if course has verified recruiters but no recruiter section in CMS */}
      {!hasRecruiterSectionInCms && courseRecruiters.length > 0 ? (
        <section className="mb-6" aria-labelledby="course-top-recruiters">
          <h2 id="course-top-recruiters" className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-2.5">
            Top Recruiters for {course && course.name ? course.name : "This Course"}
          </h2>
          <RecruitersGrid
            recruiters={courseRecruiters}
            showHeading={false}
          />
        </section>
      ) : null}

      {faqItems.length > 0 ? (
        <section className="mb-6" aria-labelledby="cms-faq-title">
          <h2 id="cms-faq-title" className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-3">
            Frequently Asked Questions
          </h2>
          <FaqAccordion
            items={faqItems.map((f, i) => ({
              id: (f && f._id) || (f && f.id) || "course-faq-" + i,
              question: (f && f.question) || "",
              answer: (f && f.answer) || "",
            }))}
            renderAnswer={(item) => <SafeHtml html={item.answer} />}
          />
        </section>
      ) : null}

      {testimonials.length > 0 ? (
        <section className="mb-6" aria-labelledby="cms-testi-title">
          <h2 id="cms-testi-title" className="text-lg sm:text-xl font-bold text-[#000f22] mt-0 mb-3">
            What Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-4 rounded-xl border border-[#e7eeff] bg-[#fbfdff] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <SafeHtml html={(t && (t.text || t.quote)) || ""} className="text-xs sm:text-[13px] text-[#43474d] italic [&_p]:mb-0" />
                </div>
                {t && (t.studentName || t.name) ? (
                  <div className="mt-2.5 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#000f22]">{String(t.studentName || t.name)}</span>
                    {t.profession ? <span className="text-[#74777e]">{String(t.profession)}</span> : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
