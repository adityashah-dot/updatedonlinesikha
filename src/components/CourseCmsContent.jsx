import { useState } from "react";
import { Link } from "react-router-dom";
import SafeHtml from "./blog/SafeHtml";
import { FaqAccordion } from "./FaqAccordion";
import CoursesPromoBanner from "./CoursesPromoBanner";
import {
  ArrowRight,
  CheckCircle,
  Star,
  BookOpen,
  Clock,
  Sparkles,
  Award,
  Check,
  ChevronRight,
  Quote,
  Headphones
} from "lucide-react";
import "./course-content.css";

const DEFAULT_VERIFIED_RECRUITERS = [
  { name: "Amazon", logo: "/logos/amazon.jpg" },
  { name: "Deloitte", logo: "/logos/deloitte.jpg" },
  { name: "TCS", logo: "/logos/tcs.jpg" },
  { name: "Wipro", logo: "/logos/wipro.jpg" },
  { name: "Infosys", logo: "/logos/infosys.png" },
  { name: "Cognizant", logo: "/logos/cognizant.jpg" },
  { name: "Capgemini", logo: "/logos/capgemini.png" },
  { name: "Tech Mahindra", logo: "/logos/techmahindra.jpg" }
];

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

function RichtextBlock({ block, sectionTitle }) {
  const content = (block && (block.content || block.html || block.text)) || "";
  const title = (block && (block.title || block.heading)) || "";
  const rawLevel = String((block && (block.headingLevel || block.level)) || "h2").toLowerCase();
  const level = rawLevel === "h3" || rawLevel === "3" ? "h3" : rawLevel === "h4" || rawLevel === "4" ? "h4" : rawLevel === "h5" || rawLevel === "5" ? "h5" : "h2";
  const sanitizedTitle = String(title).replace(/DegreeFYD/gi, "OnlineSiksha").trim();

  // Suppress block sub-heading when the block only renders a table (with no introductory prose)
  // or when the block title duplicates the parent section title.
  const hasTable = /<table\b/i.test(content);
  const textOutsideTable = hasTable
    ? content
        .replace(/<table\b[\s\S]*?<\/table>/gi, "")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/gi, " ")
        .trim()
    : "";
  const isStandaloneTableBlock = hasTable && textOutsideTable.length === 0;
  const isDuplicateTitle =
    sanitizedTitle &&
    sectionTitle &&
    sanitizedTitle.toLowerCase() === String(sectionTitle).trim().toLowerCase();

  const shouldShowHeading = Boolean(sanitizedTitle && !isStandaloneTableBlock && !isDuplicateTitle);

  const heading = shouldShowHeading
    ? level === "h3"
      ? <h3 className="text-base sm:text-lg font-bold text-ink-900 mt-4 mb-2">{sanitizedTitle}</h3>
      : level === "h4"
        ? <h4 className="text-sm sm:text-base font-semibold text-ink-900 mt-3.5 mb-1.5">{sanitizedTitle}</h4>
        : level === "h5"
          ? <h5 className="text-xs sm:text-sm font-semibold text-ink-900 mt-3 mb-1">{sanitizedTitle}</h5>
          : <h2 className="text-lg sm:text-xl font-bold text-ink-900 mt-5 mb-2.5">{sanitizedTitle}</h2>
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
  const heading = String((content && content.heading) || (block && block.title) || (content && content.description) || "1-on-1 Academic & Admission Guidance").replace(/DegreeFYD/gi, "OnlineSiksha");
  const subtext = String((content && content.subtext) || (block && block.description && block.title ? block.description : "") || "Connect with certified online degree advisors to compare UGC-entitled universities, fee structures, and specialisations.").replace(/DegreeFYD/gi, "OnlineSiksha");
  const rawButtons = Array.isArray(content.buttons)
    ? content.buttons
    : Array.isArray(block && block.buttons)
      ? block.buttons
      : [];

  return (
    <div className="my-3 sm:my-3.5 px-3.5 py-3 sm:px-4.5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-brand-50 via-brand-50 to-brand-100 border border-brand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs overflow-hidden relative">
      <div className="min-w-0 flex-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold tracking-wide bg-brand-100 text-brand-600 border border-brand-200 mb-1 sm:mb-1.5 shrink-0">
          <Headphones className="w-3 h-3 text-brand-600 shrink-0" />
          <span>University counselling</span>
        </div>
        <h3 className="text-sm sm:text-[15px] font-bold text-ink-900 mb-0.5 sm:mb-1 leading-snug">{heading}</h3>
        <p className="text-xs sm:text-[12.5px] text-ink-700 mb-0 leading-relaxed">{subtext}</p>
      </div>

      <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-1.5 sm:pt-0 border-t sm:border-0 border-brand-200/60">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-brand-200 shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/images/studentfigmaimg.webp"
              alt="Academic Advisor"
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.currentTarget.src = "/logos/amazon.jpg"; }}
            />
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-bold text-ink-900 leading-tight">Free Guidance</span>
            <span className="block text-[10px] text-emerald-700 font-semibold leading-tight">Free counselling</span>
          </div>
        </div>

        {rawButtons.length > 0 ? (
          rawButtons.map((btn, i) => {
            const rawHref = btn && btn.link ? String(btn.link) : "";
            const href = rewriteInternalHref(rawHref);
            const isCounselingAction = !href || /counsel|apply|advis/i.test(href);
            if (isCounselingAction) {
              return (
                <button
                  key={i}
                  type="button"
                  onClick={onOpenCounseling}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-8.5 sm:h-9 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>{btn.label || btn.title || "Get Guidance"}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              );
            }
            return (
              <a
                key={i}
                href={href}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-8.5 sm:h-9 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>{btn.label || btn.title || "Learn More"}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            );
          })
        ) : (
          <button
            type="button"
            onClick={onOpenCounseling}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-8.5 sm:h-9 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Get Guidance</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Modern Connected Stepper Timeline for Admission Steps
 * Inspired by Dribbble & EdTech interactive application pathways
 */
function StepFlowBlock({ block }) {
  const content = (block && block.content) || {};
  const steps = Array.isArray(content.steps) ? content.steps : [];
  const heading = String((content && content.heading) || (block && block.title) || "").replace(/DegreeFYD/gi, "OnlineSiksha");
  const [activeStep, setActiveStep] = useState(0);

  if (steps.length === 0) return null;

  const stepIcons = [BookOpen, Award, CheckCircle, Sparkles];

  return (
    <div className="my-5">
      {heading ? (
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm sm:text-base font-bold text-ink-900 m-0">{heading}</h3>
          <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
            {steps.length} Simple Steps
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
        {steps.map((s, i) => {
          const rawText = String(s && (s.text || s.title || String(s))).replace(/DegreeFYD/gi, "OnlineSiksha");
          const stepNum = String(i + 1).padStart(2, "0");
          const IconComponent = stepIcons[i % stepIcons.length];
          const isSelected = activeStep === i;

          return (
            <div
              key={i}
              onClick={() => setActiveStep(i)}
              className={`group relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? "border-brand-600 bg-gradient-to-b from-brand-50 via-white to-white shadow-md -translate-y-1 ring-2 ring-brand-600/15"
                  : "border-brand-100 bg-white hover:border-brand-600/40 hover:-translate-y-1 hover:shadow-sm"
              }`}
            >
              <div>
                {/* Top Step Pill & Micro Status */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-xs scale-105"
                        : "bg-brand-50 text-brand-600 border border-brand-200 group-hover:bg-brand-600 group-hover:text-white"
                    }`}>
                      {stepNum}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                        Step {i + 1}
                      </span>
                      <span className="text-[11px] font-extrabold text-ink-900 leading-tight block">
                        {i === 0 ? "Application" : i === 1 ? "Verification" : i === 2 ? "Enrollment" : "Access"}
                      </span>
                    </div>
                  </div>
                  <IconComponent className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                    isSelected ? "text-brand-600" : "text-slate-400 group-hover:text-brand-600"
                  }`} />
                </div>

                <p className="text-xs sm:text-[13px] text-ink-700 font-medium leading-relaxed mb-0">
                  {rawText}
                </p>
              </div>

              {/* Bottom Subtle Step Status */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-50 flex items-center justify-between text-[10px] font-semibold tracking-wider">
                <span className={isSelected ? "text-brand-600 font-bold" : "text-slate-400"}>
                  {i === 0 ? "Start Journey" : i === steps.length - 1 ? "Get LMS Login" : "Verified Process"}
                </span>
                <span className="text-brand-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SyllabusBlock({ block, sectionTitle }) {
  const content = (block && block.content) || {};
  const semesters = Array.isArray(content.semesters) ? content.semesters : [];
  const rawHeading = (content && content.heading) ? String(content.heading).trim() : String((block && block.title) || "").trim();
  const isDuplicateHeading = rawHeading && sectionTitle && rawHeading.toLowerCase() === String(sectionTitle).trim().toLowerCase();
  const heading = isDuplicateHeading ? "" : rawHeading.replace(/DegreeFYD/gi, "OnlineSiksha");

  if (semesters.length === 0) return null;

  const isSingleCard = semesters.length === 1;

  return (
    <div className="my-4" data-testid="course-syllabus-block">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-ink-900 mb-3">{heading}</h3> : null}
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
              className="rounded-xl border border-brand-200 bg-canvas p-[18px] sm:p-[20px] shadow-2xs hover:border-brand-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-brand-100">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <span
                    className="w-6 h-6 rounded-md bg-brand-100 text-brand-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {unitNumber}
                  </span>
                  <h4 className="text-[13px] sm:text-[14px] font-bold text-ink-900 leading-[1.32] break-words m-0">
                    {semTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  {sem && sem.credits ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-600 whitespace-nowrap">
                      {sem.credits} Credits
                    </span>
                  ) : totalSubjectsCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 text-brand-600 whitespace-nowrap">
                      {totalSubjectsCount} {totalSubjectsCount === 1 ? "Subject" : "Subjects"}
                    </span>
                  ) : null}
                </div>
              </div>

              {coreSubjects.length > 0 ? (
                <div>
                  {electives.length > 0 ? (
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block mb-1.5">
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
                      <li key={j} className="text-xs sm:text-[13px] text-ink-700 leading-[1.45] flex items-start gap-2 m-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0 mt-[6px]" aria-hidden="true" />
                        <span className="min-w-0 break-words">{String(sub)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {electives.length > 0 ? (
                <div className={coreSubjects.length > 0 ? "mt-2.5 pt-2.5 border-t border-brand-100" : ""}>
                  <span className="text-[10px] font-bold text-accent-700 uppercase tracking-wider block mb-1.5">
                    Elective Subjects
                  </span>
                  <ul className="flex flex-col gap-[8px] pl-0 list-none m-0">
                    {electives.map((elective, j) => (
                      <li key={j} className="text-xs sm:text-[13px] text-ink-700 leading-[1.45] flex items-start gap-2 m-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-[6px]" aria-hidden="true" />
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

/**
 * Modern Interactive Skills Gained Cloud
 * Inspired by Coursera, Reforge & Pinterest Tag Clusters
 */
function SkillsGainedBlock({ items = [], heading = "" }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  if (!items || items.length === 0) return null;

  return (
    <div className="my-5">
      <div className="flex items-center justify-between mb-3.5">
        {heading ? <h3 className="text-sm sm:text-base font-bold text-ink-900 m-0">{heading}</h3> : null}
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Industry Verified
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item, i) => {
          const label = item && item.label ? String(item.label) : String(item || "");
          const isSelected = selectedSkill === i;
          return (
            <button
              type="button"
              key={i}
              onClick={() => setSelectedSkill(isSelected ? null : i)}
              className={`group px-3.5 py-2 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-brand-600 border-brand-600 text-white shadow-sm -translate-y-0.5 scale-102"
                  : "bg-white border-brand-200 hover:bg-gradient-to-r hover:from-brand-50 hover:to-brand-50 hover:border-brand-600 hover:-translate-y-0.5 hover:shadow-xs"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                isSelected
                  ? "bg-white text-brand-600"
                  : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white"
              }`}>
                ✓
              </span>
              <span className={`text-xs sm:text-[12.5px] font-semibold transition-colors ${
                isSelected ? "text-white" : "text-ink-900 group-hover:text-brand-600"
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Modern Interactive Specialization Cards (capped at 6 by default for user-friendly scanning)
 */
const INITIAL_SPECIALIZATIONS_COUNT = 6;

function SpecializationListBlock({ block, isSkillsSection = false, course, sectionTitle }) {
  const [showAll, setShowAll] = useState(false);
  const content = (block && block.content) || {};
  const items = Array.isArray(content.items) ? content.items : [];
  const rawHeading = String((content && content.heading) || (block && block.title) || "").replace(/DegreeFYD/gi, "OnlineSiksha").trim();
  const isDuplicateHeading = rawHeading && sectionTitle && rawHeading.toLowerCase() === String(sectionTitle).trim().toLowerCase();
  const heading = isDuplicateHeading ? "" : rawHeading;

  if (items.length === 0) return null;

  if (isSkillsSection) {
    return <SkillsGainedBlock items={items} heading={heading} />;
  }

  const visibleItems = showAll ? items : items.slice(0, INITIAL_SPECIALIZATIONS_COUNT);
  const remainingCount = items.length - INITIAL_SPECIALIZATIONS_COUNT;
  const fallbackDuration = course?.duration || "";
  const fallbackFee = course?.feeDisplay || "";

  return (
    <div className="my-5">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-ink-900 mb-3.5">{heading}</h3> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {visibleItems.map((item, i) => {
          const label = item && item.label ? String(item.label) : String(item?.title || item?.name || "");
          const rawHref = item && item.isHyperlinkActive ? (item && item.hyperlink ? String(item.hyperlink) : "") : "";
          const href = rewriteInternalHref(rawHref);
          const isInternal = href.startsWith("/");
          const itemDuration = item?.duration || fallbackDuration;
          const itemFee = item?.fee || item?.fees || fallbackFee;
          const isHighDemand = /artificial intelligence|machine learning|data science|cyber security|cloud|finance|business analytics/i.test(label);
          const isTrending = /generative ai|full-stack|devops|blockchain|marketing|strategy|leadership|operations/i.test(label);

          return (
            <div
              key={i}
              className="group p-4 rounded-2xl border border-brand-200 bg-white hover:border-brand-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-brand-600 mt-1.5 group-hover:scale-125 transition-transform shrink-0" aria-hidden="true" />
                    {href ? (
                      isInternal ? (
                        <Link to={href} className="text-xs sm:text-[13.5px] font-bold text-ink-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-[13.5px] font-bold text-ink-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                          {label}
                        </a>
                      )
                    ) : (
                      <span className="text-xs sm:text-[13.5px] text-ink-900 font-bold group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">{label}</span>
                    )}
                  </div>
                </div>

                {(itemDuration || itemFee) ? (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-4.5 mt-1.5 mb-2 text-[11px] text-ink-700">
                    {itemDuration ? (
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-brand-600 shrink-0" aria-hidden="true" />
                        <span>{itemDuration}</span>
                      </span>
                    ) : null}
                    {itemFee ? (
                      <span className="inline-flex items-center gap-1 font-bold text-brand-600">
                        <span>{itemFee}</span>
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-brand-50 mt-1">
                {isHighDemand ? (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
                    High Demand
                  </span>
                ) : isTrending ? (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-50 text-brand-600 border border-brand-200">
                    Trending Track
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-50 text-ink-700 border border-slate-200/80">
                    UGC Entitled
                  </span>
                )}
                {href ? (
                  isInternal ? (
                    <Link to={href} className="text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                      <span>Explore</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                      <span>Explore</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  )
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700">
                    0% EMI Available
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {items.length > INITIAL_SPECIALIZATIONS_COUNT && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-600 bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <span>
              {showAll
                ? "Show Top 6 Specializations"
                : `View All ${items.length} Specializations (+${remainingCount} More)`}
            </span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>
      )}
    </div>
  );
}

function FeatureCardsBlock({ block }) {
  const content = (block && block.content) || {};
  const items = Array.isArray(content.items) ? content.items : [];
  const heading = String((content && content.heading) || (block && block.title) || "").replace(/DegreeFYD/gi, "OnlineSiksha");
  if (items.length === 0) return null;
  return (
    <div className="my-5">
      {heading ? <h3 className="text-sm sm:text-base font-bold text-ink-900 mb-3">{heading}</h3> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {items.map((item, i) => (
          <div key={i} className="group p-4 rounded-2xl border border-brand-100 bg-white shadow-2xs hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-md transition-all duration-300">
            {item && item.title ? (
              <h4 className="text-xs sm:text-sm font-bold text-ink-900 group-hover:text-brand-600 transition-colors mb-1.5 mt-0 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                <span>{String(item.title).replace(/DegreeFYD/gi, "OnlineSiksha")}</span>
              </h4>
            ) : null}
            {item && item.description ? (
              <p className="text-xs text-ink-700 leading-relaxed mb-0 pl-3.5">
                {String(item.description).replace(/DegreeFYD/gi, "OnlineSiksha")}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderCourseBlock(block, key, onOpenCounseling, sectionTitle, isRecruiterSection, isSkillsSection, course) {
  if (!block || typeof block !== "object") return null;
  const type = String(block.type || "").toLowerCase();

  // If this is the recruiter section, suppress raw text list!
  if (isRecruiterSection && (type === "specialization_list" || type === "specialisations")) {
    return null;
  }

  if (type === "richtext" || type === "html" || type === "text") return <RichtextBlock key={key} block={block} sectionTitle={sectionTitle} />;
  if (type === "cta" || type === "ctabuttons" || type === "call_to_action" || type === "banner") return <CtaBlock key={key} block={block} onOpenCounseling={onOpenCounseling} />;
  if (type === "step_flow" || type === "admission_flow") return <StepFlowBlock key={key} block={block} />;
  if (type === "syllabus" || type === "compare") return <SyllabusBlock key={key} block={block} sectionTitle={sectionTitle} />;
  if (type === "specialization_list") return <SpecializationListBlock key={key} block={block} isSkillsSection={isSkillsSection} course={course} sectionTitle={sectionTitle} />;
  if (type === "feature_cards" || type === "feature_list" || type === "courses_list") return <FeatureCardsBlock key={key} block={block} />;
  const fallback = block.content || block.html || block.text || block.value;
  if (fallback) {
    return (
      <div key={key} className="mb-3.5 last:mb-0">
        <SafeHtml html={typeof fallback === "string" ? fallback.replace(/DegreeFYD/gi, "OnlineSiksha") : ""} />
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
  const rawSections = Array.isArray(course && course.sections) ? course.sections : [];
  const sections = rawSections.length > 0 ? rawSections : (
    Array.isArray(course?.syllabus) && course.syllabus.length > 0 ? [
      {
        title: "Curriculum & Syllabus",
        blocks: [
          {
            type: "syllabus",
            title: "Course Curriculum Overview",
            content: {
              semesters: course.syllabus.map((s) => ({
                id: `sem-${s.semester}`,
                title: `Semester ${s.semester}`,
                credits: s.credits,
                core_subjects: (s.subjects || []).map((sub) => (typeof sub === "string" ? sub : sub.name || sub.title)),
                electives: []
              }))
            }
          }
        ]
      }
    ] : []
  );
  const courseRecruiters = (course && Array.isArray(course.recruiters) && course.recruiters.length > 0)
    ? course.recruiters
    : DEFAULT_VERIFIED_RECRUITERS;

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
          <h2 className="text-lg sm:text-xl font-bold text-ink-900 mt-0 mb-2.5">Course Overview</h2>
          <SafeHtml html={overviewHtml} />
        </section>
      ) : null}

      {/* Banner 1: Immediately after Course Overview */}
      <div className="my-3.5 sm:my-4">
        <CoursesPromoBanner
          heading="Free counselling"
          title="1-on-1 Admission & University Guidance"
          message="Compare UGC-DEB recognized universities, verified semester fees, and zero-cost EMI options with our academic advisors."
          ctaLabel="Get Free Counselling"
          onCtaClick={handleCounseling}
        />
      </div>

      {overviewAfterImage ? (
        <section className="mb-6" aria-label="Course snapshot table">
          <h2 className="text-lg sm:text-xl font-bold text-ink-900 mt-0 mb-2.5">Course Highlights &amp; Snapshot</h2>
          <SafeHtml html={overviewAfterImage} />
        </section>
      ) : null}

      {sections.map((section, sIdx) => {
        const sectionKey = (section && section.key) || ("course-section-" + (sIdx + 1));
        const rawHeading = (section && section.title) || "";
        let heading = rawHeading.replace(/DegreeFYD/gi, "OnlineSiksha");

        // Canonical rename mappings:
        const isAdmissionSteps = /admission process|admission steps/i.test(heading);
        const isSkillsSection = /skills gained|skills you learn/i.test(heading);
        const isRecruiterSection = /top recruiters|recruiters/i.test(heading);
        const isWhyChoose = /why choose|top reason to choose/i.test(heading);

        if (isAdmissionSteps) {
          heading = "Admission Steps";
        } else if (isSkillsSection) {
          heading = "Skill Gained";
        } else if (isRecruiterSection) {
          heading = "Top Recruiters";
        } else if (isWhyChoose) {
          heading = "Why Choose OnlineSiksha";
        }

        const blocks = Array.isArray(section && section.blocks) ? section.blocks : [];

        return (
          <div key={sectionKey}>
            <section className="mb-6" aria-labelledby={"cms-sec-" + sectionKey}>
              {heading ? (
                <div className="flex items-center gap-2 mb-3">
                  <h2 id={"cms-sec-" + sectionKey} className="text-lg sm:text-xl font-bold text-ink-900 m-0">
                    {heading}
                  </h2>
                </div>
              ) : null}

              {/* Verified Recruiter Logos Image Scroll (continuous marquee animation with gradient fade edges) */}
              {isRecruiterSection ? (
                <div className="my-4 overflow-hidden relative py-4 bg-gradient-to-r from-canvas via-white to-canvas rounded-2xl border border-brand-200/80 shadow-2xs">
                  {/* Left & Right Gradient Fade Masks */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

                  <div className="flex gap-4 w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] items-center">
                    {[...courseRecruiters, ...courseRecruiters, ...courseRecruiters].map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="h-13 w-32 px-3.5 py-2 bg-white rounded-xl border border-brand-100 flex items-center justify-center shrink-0 shadow-2xs hover:scale-108 hover:border-brand-600/40 hover:shadow-xs transition-all duration-300 cursor-pointer"
                      >
                        <img src={r.logo} alt={r.name} className="max-h-8 max-w-[95px] object-contain transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div>
                {blocks.map((block, bIdx) =>
                  renderCourseBlock(block, sIdx + "-" + bIdx, handleCounseling, heading, isRecruiterSection, isSkillsSection, course)
                )}
              </div>
            </section>

            {/* Banner 2: Immediately after Curriculum / Specialisations */}
            {sIdx === banner2SecIdx ? (
              <div className="my-3.5 sm:my-4">
                <CoursesPromoBanner
                  heading="Free counselling"
                  title="Curriculum & Elective Advisory"
                  message="Speak 1-on-1 with our academic advisors to match curriculum electives and fee structures with your career goals."
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
        <div className="my-3.5 sm:my-4">
          <CoursesPromoBanner
            heading="Free counselling"
            title="Need guidance on syllabus, electives, or university shortlisting?"
            message="Speak 1-on-1 with our academic advisors to match curriculum electives and fee structures with your career goals."
            ctaLabel="Talk to an Academic Advisor"
            onCtaClick={handleCounseling}
          />
        </div>
      ) : null}

      {/* Standalone Recruiter section if course has verified recruiters but no recruiter section in CMS */}
      {!hasRecruiterSectionInCms && courseRecruiters.length > 0 ? (
        <section className="mb-6" aria-labelledby="course-top-recruiters">
          <div className="flex items-center gap-2 mb-3">
            <h2 id="course-top-recruiters" className="text-lg sm:text-xl font-bold text-ink-900 m-0">
              Top Recruiters
            </h2>
          </div>
          <div className="my-4 overflow-hidden relative py-3.5 bg-gradient-to-r from-canvas via-white to-canvas rounded-2xl border border-brand-200/80 shadow-2xs">
            <div className="flex gap-4 w-max animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused] items-center">
              {[...courseRecruiters, ...courseRecruiters].map((r, rIdx) => (
                <div
                  key={rIdx}
                  className="h-12 w-28 px-3 py-1.5 bg-white rounded-xl border border-brand-100 flex items-center justify-center shrink-0 shadow-2xs hover:scale-105 transition-transform"
                >
                  <img src={r.logo} alt={r.name} className="max-h-7 max-w-[90px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Modern Pinterest/Dribbble Social Proof Testimonial Cards */}
      {testimonials.length > 0 ? (
        <section className="mb-6" aria-labelledby="cms-testi-title">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2">
              <h2 id="cms-testi-title" className="text-lg sm:text-xl font-bold text-ink-900 m-0">
                What Learners Say
              </h2>
            </div>
          </div>
          <div className="flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 gap-4 pb-2">
            {testimonials.map((t, i) => {
              const studentName = String(t && (t.studentName || t.name || `Learner ${i + 1}`)).trim().replace(/DegreeFYD/gi, "OnlineSiksha");
              const initial = studentName.charAt(0).toUpperCase() || "L";
              const quote = (t && (t.text || t.quote)) || "";
              return (
                <div
                  key={i}
                  className="group relative w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-start p-5 rounded-2xl border border-brand-100 bg-gradient-to-b from-white via-white to-canvas shadow-2xs hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-600/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <Quote className="w-6 h-6 text-brand-600/10 absolute top-4 right-4 pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60 shadow-2xs">
                        ✓ Verified Learner
                      </span>
                    </div>
                    <SafeHtml html={quote} className="text-xs sm:text-[13.5px] text-ink-700 leading-relaxed italic [&_p]:mb-0" />
                  </div>
                  <div className="mt-4 pt-3 border-t border-canvas flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-brand-600 to-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {initial}
                    </div>
                    <div>
                      <p className="text-xs sm:text-[13px] font-bold text-ink-900 leading-tight m-0">{studentName}</p>
                      <p className="text-[10.5px] text-ink-500 leading-tight m-0 mt-0.5">{course?.name || "Online Degree"} Graduate</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
}
