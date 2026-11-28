import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { COURSES_DATA } from "../data/coursesData";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, INDIAN_PHONE_REGEX, EMAIL_REGEX } from "../services/leadApi";
import { useSiteActions } from "./shell/SiteActionsContext";
import CollegeTableOfContents from "./CollegeTableOfContents";
import SectionHeader from "./SectionHeader";
import { AdmissionFlowSteps } from "./AdmissionFlowSteps";
import { ExaminationPatternSteps } from "./ExaminationPatternSteps";
import { FaqAccordion } from "./FaqAccordion";
import { ProgrammeCardsSection } from "./ProgrammeCardsSection";
import { BlogsListSection } from "./BlogsListSection";
import ReadMoreText from "./ReadMoreText";
import { CURRENT_YEAR } from "../constants/years";
import { collegeSectionTitle } from "../lib/collegeTitle";
import { sanitizeSectionHeading } from "../services/overviewMapper";

import {
  CheckCircle,
  ChevronRight,
  Download,
  ShieldCheck,
  Star,
  PhoneCall,
  FileText,
  UserCheck,
  MapPin,
  ExternalLink,
  ChevronDown,
  Search,
  Clock,
  ArrowRight
} from "lucide-react";
const RecruiterScroll = ({ recruiters = [] }) => {
  const doubled = [...recruiters, ...recruiters];
  if (!recruiters.length) return null;
  return <div className="relative overflow-hidden">
      <div className="flex items-center gap-6 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((r, i) => <div
    key={`${r.name}-${i}`}
    className="flex items-center justify-center h-16 min-w-[125px] px-3.5 bg-canvas border border-brand-100 rounded-lg shrink-0"
  >
            <img
    src={r.src}
    alt={r.name}
    className="max-h-[34px] max-w-[100px] object-contain"
  />
          </div>)}
      </div>
    </div>;
};
const getCampusImageName = (altText, collegeData) => {
  let name = String(altText || "").trim();
  const prefixes = [collegeData?.title, collegeData?.shortTitle, collegeData?.shortName]
    .filter(Boolean)
    .flatMap((prefix) => [prefix, `${prefix} Online`, `${prefix} Distance Education`])
    .sort((a, b) => b.length - a.length);

  const matchingPrefix = prefixes.find((prefix) =>
    name.toLowerCase().startsWith(`${prefix} `.toLowerCase())
  );
  if (matchingPrefix) name = name.slice(matchingPrefix.length);

  return name
    .replace(/^[\s:–—-]+/, "")
    .replace(/^(?:online|distance education)\s+/i, "")
    .trim() || "Campus";
};
const OverviewView = ({
  collegeData,
  onSelectCourse,
  onOpenApply: onOpenApplyProp,
  onOpenBrochure: onOpenBrochureProp,
  onOpenHelpDesk: onOpenHelpDeskProp,
  universityNavigation
}) => {
  const siteActions = useSiteActions();
  const onOpenApply = onOpenApplyProp || siteActions.onOpenApply;
  const onOpenBrochure = onOpenBrochureProp || siteActions.onOpenBrochure;
  const onOpenHelpDesk = onOpenHelpDeskProp || siteActions.onOpenHelpDesk;
  const onSelectCourseHandler = onSelectCourse || siteActions.onSelectCourse;
  const [counselingForm, setCounselingForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "mba",
    state: "",
    city: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [counselPanelOpen, setCounselPanelOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("latest-news");
  const [selectedHighlightCategory, setSelectedHighlightCategory] = useState("All");
  const [selectedReviewCategory, setSelectedReviewCategory] = useState("All");
  const [tocOpen, setTocOpen] = useState(false);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [courseFeeSearch, setCourseFeeSearch] = useState("");
  const [showAllFeeRows, setShowAllFeeRows] = useState(false);
  const [blogIndex, setBlogIndex] = useState(0);
  const [blogVisible, setBlogVisible] = useState(4);
  const campusMarqueeImages = (() => {
    const images = (collegeData?.campus?.galleryImages || [])
      .filter((item) => item?.imageUrl)
      .map((item) => ({
        imageUrl: item.imageUrl,
        altText: item.altText || `${collegeData?.shortName || collegeData?.title} Campus View`,
        name: getCampusImageName(item.altText || `${collegeData?.shortName || collegeData?.title} Campus View`, collegeData),
      }));

    if (!images.length && collegeData?.hero?.backgroundImage) {
      images.push({
        imageUrl: collegeData.hero.backgroundImage,
        altText: `${collegeData?.shortName || collegeData?.title} Campus`,
        name: "Campus",
      });
    }

    return images.length ? [...images, ...images] : [];
  })();
  const EXAM_STEPS = collegeData?.examinationPattern?.steps?.length ? collegeData.examinationPattern.steps : [];
  const ADMISSION_FLOW_STEPS = collegeData?.admission?.steps?.length ? collegeData.admission.steps : [];
  const certificateImage = collegeData?.sampleDegree?.imageUrl || "";
  const HIGHLIGHT_CATEGORIES = collegeData?.highlights?.categories?.length ? collegeData.highlights.categories : ["All"];
  const REVIEW_CATEGORIES = ["All", ...(collegeData?.reviews?.map(r => r.course).filter(Boolean) ? [...new Set(collegeData.reviews.map(r => r.course).filter(Boolean))] : [])];
  // Fee table rows of the "Courses and Fees" section. Only the first five
  // degrees are shown; the rest stay collapsed behind the "Read more" button.
  const FEE_ROWS_PREVIEW = 5;
  const filteredFeeRows = (collegeData?.coursesFees?.table || []).filter((c) =>
    String(c.degree || "").toLowerCase().includes(courseFeeSearch.toLowerCase())
  );
  const visibleFeeRows =
    showAllFeeRows || courseFeeSearch
      ? filteredFeeRows
      : filteredFeeRows.slice(0, FEE_ROWS_PREVIEW);

  // The table of contents comes from the CMS (`toc` of the page). When the
  // CMS publishes none, the list is built from the sections this university
  // actually renders — never from a fixed, another-university list.
  const TOC_ITEMS = (() => {
    const cName = collegeData?.shortName || collegeData?.title || "";
    if (collegeData?.toc?.length) {
      return collegeData.toc.map((item) => ({
        ...item,
        label: sanitizeSectionHeading(item.label, item.label, cName),
      }));
    }

    const sections = [
      ["latest-news", collegeData?.latestNews?.title],
      ["highlights", collegeData?.highlights?.title],
      ["courses-fees", collegeData?.coursesFees?.title],
      ["popular-programmes", `${cName} Popular Programmes`.trim()],
      ["eligibility-criteria", collegeData?.eligibility?.title],
      [
        "admission-process",
        collegeData?.admission?.title || collegeSectionTitle(cName, `Admission Process ${CURRENT_YEAR}`),
        ADMISSION_FLOW_STEPS.length > 0,
      ],
      ["rankings", collegeData?.rankings?.title],
      [
        "examination-pattern",
        collegeData?.examinationPattern?.title || collegeSectionTitle(cName, "Examination Pattern"),
        EXAM_STEPS.length > 0,
      ],
      ["placements", collegeData?.placements?.title],
      ["campus", collegeData?.campus?.title],
      ["sample-degree", collegeData?.sampleDegree?.title],
      ["reviews-section", collegeData?.reviewsMeta?.title],
      ["compare-colleges", collegeData?.compareSection?.title],
      ["blogs", collegeData?.blogsMeta?.title],
      ["faqs", collegeData?.faqsMeta?.title || (collegeData?.faqs?.length ? `Frequently Asked Questions (${cName})` : null)],
    ];

    return sections
      .filter(([, label, isVisible]) => Boolean(label) && isVisible !== false)
      .map(([id, label], index) => ({
        id,
        label: sanitizeSectionHeading(label, label, cName),
        order: index,
      }));
  })();
  const hasPerCourseSelection = Boolean(
    collegeData?.eligibility?.items?.some((row) => row.selection)
  );
  // Review summary — every number comes from the API. A figure the CMS does
  // not publish is not shown at all (no invented values).
  const REVIEW_SUMMARY = (() => {
    const reviews = collegeData?.reviews || [];
    const scored = reviews
      .map((review) => Number(review?.ratingValue))
      .filter((value) => Number.isFinite(value) && value > 0);

    const average = scored.length
      ? scored.reduce((sum, value) => sum + value, 0) / scored.length
      : 0;

    const collegeRating = Number(collegeData?.rating);
    const ratingValue = average || (Number.isFinite(collegeRating) ? collegeRating : 0);

    const stats = [];

    if (collegeData?.students != null && collegeData.students !== "") {
      stats.push({
        value: Number(collegeData.students).toLocaleString("en-IN"),
        label: "Active Learners",
        tone: "text-ink-900",
      });
    }

    return {
      rating: ratingValue ? `${ratingValue.toFixed(1)} / 5.0 Rating` : "",
      count: reviews.length ? `${reviews.length} Verified Reviews` : "",
      stats,
    };
  })();
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
    const getVisible = () => {
      if (window.innerWidth <= 700) return 1;
      if (window.innerWidth <= 1050) return 2;
      return 4;
    };
    const onResize = () => {
      const v = getVisible();
      setBlogVisible(v);
      setBlogIndex((i) => Math.min(i, Math.max(0, (collegeData?.blogs || []).length - v)));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const handleTocClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleCounselingSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    const cleanPhone = sanitizeIndianPhone(counselingForm.phone);
    const cleanEmail = (counselingForm.email || "").trim();
    if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit Indian phone number starting with 6, 7, 8, 9, or 2";
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      errs.email = "Enter a valid email address";
    }
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});
    const matchedCourse = COURSES_DATA.find((c) => c.id === counselingForm.course);
    submitLead({
      email: cleanEmail,
      phone_number: cleanPhone,
      preferred_degree: [matchedCourse?.name || counselingForm.course].filter(Boolean),
      preferred_college: collegeData?.title || collegeData?.shortName || "",
      form_name: "Counselling Form in Priority College Page"
    });
    setFormSubmitted(true);
  };
  const handleOverviewApply = () => {
    setCounselPanelOpen(false);
    onOpenApply?.();
  };
  const collegeOverviewHref = `/universities/${collegeData?.slug || ""}`;
  return <div className="space-y-0">
      {
    /* Breadcrumb Bar */
  }
      <div className="bg-brand-50 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-ink-700 font-medium">
            <Link to="/" className="shrink-0 hover:text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">Home</Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 text-ink-500 shrink-0" />
            <Link to="/universities" className="shrink-0 hover:text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">Colleges</Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 text-ink-500 shrink-0" />
            <Link to={collegeOverviewHref} className="shrink-0 hover:text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
              {collegeData?.title}
            </Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 text-ink-500 shrink-0" />
            <Link to={collegeOverviewHref} aria-current="page" className="shrink-0 font-bold text-ink-900 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
              {collegeData?.shortTitle || "Overview"}
            </Link>
          </nav>
        </div>
      </div>

      {
    /* HERO SECTION — college-hero layout */
  }
      <section className="bg-white text-ink-900 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">

          {
    /* College Header: Logo + Title + Meta + Badges */
  }
          <div className="flex flex-row items-start gap-3 sm:gap-5">
            <img
              src={collegeData?.hero?.logoImage}
              alt={`${collegeData?.shortName || collegeData?.title || "College"} Logo`}
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-xl sm:rounded-2xl bg-white border border-brand-100 p-1.5 shadow-sm shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="min-w-0">
              <h1 className="uni-title text-[18px] sm:text-2xl md:text-3xl tracking-tight font-sans text-ink-900 font-bold leading-tight">
                {collegeData?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                {collegeData?.nirfRanking && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">#{collegeData.nirfRanking} NIRF Rank</span>}
                {collegeData?.naac && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">{collegeData.naac}</span>}
                {collegeData?.rating && (
                  <span className="inline-flex items-center gap-1 font-bold text-accent-700 bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full border border-amber-200/60 text-[10px] sm:text-[11px] shrink-0">
                    <Star className="w-3 h-3 fill-accent-500 text-accent-500" />
                    {collegeData.rating}
                  </span>
                )}
                {collegeData?.approvals?.filter(a => /UGC/i.test(a)).slice(0, 1).map(a => <span key={a} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">{a}</span>)}
                {collegeData?.approvals?.filter(a => /AICTE/i.test(a)).slice(0, 1).map(a => <span key={a} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[10px] sm:text-[11px] font-bold">{a}</span>)}
              </div>
            </div>
          </div>

          {/* Body: location + text left; image top-aligned to location line */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-3 sm:gap-y-4 items-start mt-3 sm:mt-4">
            <div className="order-2 lg:order-none lg:col-span-7 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs sm:text-sm text-ink-700 flex-wrap">
                <p className="section-description text-xs sm:text-sm text-ink-700 font-normal flex items-center gap-1.5 mb-0">
                  <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{collegeData?.location} · {collegeData?.collegeType || "University"} · Est. {collegeData?.established}</span>
                </p>
              </div>
              <ReadMoreText fullText
                text={collegeData?.hero?.description}
                lines={3}
                className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal"
              />
              {collegeData?.hero?.heroSub &&
                ![collegeData?.title, collegeData?.shortName]
                  .filter(Boolean)
                  .some(
                    (name) =>
                      name.trim().toLowerCase() ===
                      collegeData.hero.heroSub.trim().toLowerCase()
                  ) && (
                  <ReadMoreText fullText
                    text={collegeData.hero.heroSub}
                    lines={2}
                    className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal"
                  />
                )}
            </div>

            {/* Right: Campus Image — top aligned with location line; 50px to Free Apply */}
            <div className="order-1 lg:order-none lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-brand-100 shadow-xs bg-canvas">
                <img
                  src={collegeData?.hero?.backgroundImage}
                  alt={collegeData?.hero?.backgroundImage ? `${collegeData?.title} Campus` : `${collegeData?.title} Campus`}
                  className="w-full h-44 sm:h-60 lg:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Stats + Brochure + Apply Now — balanced 2x2 grid on mobile, inline on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3 mt-4 sm:mt-5 lg:mr-[100px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-stretch gap-2 sm:gap-3 w-full lg:w-auto">
              {[
                { value: collegeData?.feeRange, label: "Fee Range", tone: "text-ink-900" },
                { value: collegeData?.duration, label: "Duration", tone: "text-brand-600" },
                { value: collegeData?.collegeMode === "online" ? "Online" : collegeData?.collegeMode, label: "Mode", tone: "text-ink-900" },
                { value: collegeData?.placements?.stats?.placementRate, label: "Placement Rate", tone: "text-accent-700" },
              ]
                // Hide stats we have no data for instead of showing "—".
                .filter((stat) => stat.value && String(stat.value).trim() && String(stat.value).trim() !== "—")
                .map((stat) => (
                  <div key={stat.label} className="bg-brand-50 border border-brand-100 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-center min-w-0 lg:min-w-[110px] flex flex-col justify-center">
                    <span className={`block text-xs sm:text-sm font-bold ${stat.tone} font-sans truncate`}>{stat.value}</span>
                    <span className="text-[10px] text-ink-500 mt-0.5">{stat.label}</span>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto lg:ml-auto">
              <button
                onClick={() => onOpenBrochure()}
                className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-white text-brand-600 border border-brand-600 text-xs sm:text-sm font-bold hover:bg-brand-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Brochure
              </button>
              <button
                type="button"
                onClick={handleOverviewApply}
                className="h-9 sm:h-10 px-4 sm:px-6 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {universityNavigation}

      {
    /* MAIN CONTENT */
  }
      <div className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="section-container">
            <CollegeTableOfContents
              title="Table of contents"
              items={TOC_ITEMS}
              activeId={activeSection}
              onItemClick={(id) => setActiveSection(id)}
              defaultExpanded={false}
              collapsedCount={7}
            />

            {
    /* 1. Latest News and Updates */
  }
            {(collegeData?.latestNews) && (
                <section id="latest-news" className="page-section card bg-brand-50 rounded-2xl border border-brand-200 scroll-mt-[130px]">
              <h2 className="section-title text-lg sm:text-xl font-bold text-ink-900 font-sans">
                {collegeData?.latestNews?.title}
              </h2>
              <ReadMoreText fullText
                text={collegeData?.latestNews?.description}
                lines={3}
                wrapperClassName="mt-1"
                className="text-sm text-ink-700 leading-relaxed font-normal"
              />
              <p className="text-[11px] text-ink-500 font-normal">
                {collegeData?.latestNews?.date} · {collegeData?.latestNews?.author}
              </p>
            </section>
              )}

            {
    /* 2. Highlights Table 2026 */
  }
            {(collegeData?.highlights) && (
                <section id="highlights" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink-900 font-sans mt-2">
                    {sanitizeSectionHeading(collegeData?.highlights?.title, `${collegeData?.shortName || collegeData?.title} Highlights`, collegeData?.shortName || collegeData?.title)}
                  </h2>
                </div>
                <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2 bg-white text-brand-600 border border-brand-600 rounded-xl text-xs font-bold hover:bg-brand-50 transition-all flex items-center gap-1.5 shadow-xs"
  >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Factsheet</span>
                </button>
              </div>

              <ReadMoreText fullText
                text={collegeData?.highlights?.intro}
                lines={3}
                wrapperClassName="mt-[18px]"
                className="text-sm font-normal text-ink-700 leading-relaxed"
              />

              {
    /* Category Filter */
  }
              <div className="flex flex-wrap gap-2 mt-[18px]">
                {HIGHLIGHT_CATEGORIES.map((cat) => <button
    key={cat}
    onClick={() => setSelectedHighlightCategory(cat)}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedHighlightCategory === cat ? "bg-brand-600 text-white border-brand-600" : "bg-brand-50 text-ink-700 border-brand-100 hover:border-brand-600"}`}
  >
                    {cat}
                  </button>)}
              </div>

              {
    /* Highlights Table */
  }
              <div className="overflow-x-auto rounded-xl border border-brand-100 mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-brand-600 text-white">
                      <th className="py-3 px-4 font-bold">Particulars</th>
                      <th className="py-3 px-4 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100">
                    {(() => {
    const filtered = collegeData?.highlights?.items.filter(
      (row) => selectedHighlightCategory === "All" || row.category === selectedHighlightCategory
    );
    const visible = highlightsExpanded ? filtered : filtered.slice(0, 8);
    return visible.map((row, idx) => <tr key={idx} className="hover:bg-brand-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-ink-900">
                            {row.label}
                          </td>
                          <td className="py-3.5 px-4 font-normal text-ink-700">{row.value}</td>
                        </tr>);
  })()}
                  </tbody>
                </table>
              </div>

              {(() => {
    const filtered = collegeData?.highlights?.items.filter(
      (row) => selectedHighlightCategory === "All" || row.category === selectedHighlightCategory
    );
    return filtered.length > 8 && <button
      onClick={() => setHighlightsExpanded(!highlightsExpanded)}
      className="w-full py-2 bg-brand-50 text-brand-600 border border-brand-200 rounded-xl text-xs font-bold hover:bg-brand-100 transition-all mt-[18px]"
    >
                  {highlightsExpanded ? "Show Less" : "Show More Highlights"}
                </button>;
  })()}

              {/* CTA */}
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 mt-[18px]">
                <p className="text-sm font-medium text-ink-700 leading-relaxed">
                  Unlock Full College Insights to Choose the Right Program for Your Future
                </p>
                <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:flex-row sm:gap-2.5 shrink-0">
                  <button
                    onClick={() => onOpenBrochure()}
                    className="px-3 py-2.5 bg-white text-brand-600 border border-brand-600 rounded-xl text-xs font-bold hover:bg-brand-50 transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>Download Brochure</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOverviewApply}
                    className="px-3 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            </section>
              )}

            {
    /* 3. Courses & Fees 2026 */
  }
            {(collegeData?.coursesFees) && (
                <section id="courses-fees" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[18px] sm:text-2xl font-bold text-ink-900 font-sans leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.coursesFees?.title, `${collegeData?.shortName || collegeData?.title} Courses and Fees`, collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.coursesFees?.title, `${collegeData?.shortName || collegeData?.title} Courses and Fees`, collegeData?.shortName || collegeData?.title)}
                </h2>
                <ReadMoreText fullText
                  text={collegeData?.coursesFees?.intro}
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-sm text-ink-700 leading-relaxed font-normal"
                />
              </div>

              {/* Search */}
              <div className="relative mt-[18px]">
                <input
    type="text"
    value={courseFeeSearch}
    onChange={(e) => setCourseFeeSearch(e.target.value)}
    aria-label="Search programmes"
    placeholder={collegeData?.coursesFees?.searchPlaceholder}
    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-100 bg-canvas text-sm text-ink-900 font-normal placeholder:text-ink-500 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
  />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
              </div>

              {/* Fee Table */}
              <div className="overflow-hidden rounded-xl border border-brand-200 bg-white mt-[18px]">
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-max">
                  <thead>
                    <tr className="bg-brand-600 text-white">
                      <th className="py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm">Degree</th>
                      <th className="py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm">Duration</th>
                      <th className="py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm">Sem Fees</th>
                      <th className="py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm">Total Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100">
                    {visibleFeeRows.map((c) => <tr key={c.degree} className="bg-white hover:bg-brand-50/60 transition-colors">
                          <td className="py-3 px-3 sm:px-4 align-top min-w-[150px] sm:min-w-[190px]">
                            <button
    onClick={() => {
      const course = COURSES_DATA.find((x) => x.id === c.courseId);
      if (course) onSelectCourseHandler(course);
    }}
    className="block text-left text-xs sm:text-sm font-bold text-ink-900 hover:text-brand-600 hover:underline transition-colors"
  >
                              {c.degree}
                            </button>
                            {c.specializations ? (
                              <span className="block text-[11px] text-ink-500 font-normal leading-tight mt-0.5 whitespace-nowrap">
                                {c.specializations}
                              </span>
                            ) : null}
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-ink-700 font-normal align-top whitespace-nowrap">{c.duration}</td>
                          <td className="py-3 px-3 sm:px-4 text-ink-700 font-normal align-top whitespace-nowrap">{c.perSemFee || "—"}</td>
                          <td className="py-3 px-3 sm:px-4 text-brand-600 font-semibold align-top whitespace-nowrap">{c.avgFees || "—"}</td>
                        </tr>)}
                    {filteredFeeRows.length === 0 && <tr className="bg-white">
                        <td colSpan={4} className="py-6 text-center text-xs text-ink-500 font-normal">No programmes match your search.</td>
                      </tr>}
                  </tbody>
                </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-[18px]">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-xs text-ink-500 font-normal m-0">
                    {courseFeeSearch
                      ? `Showing ${filteredFeeRows.length} out of ${filteredFeeRows.length} degrees`
                      : `Showing ${visibleFeeRows.length} out of ${filteredFeeRows.length} degrees`}
                  </p>
                  {filteredFeeRows.length > FEE_ROWS_PREVIEW && !courseFeeSearch ? (
                    <button
                      type="button"
                      onClick={() => setShowAllFeeRows((value) => !value)}
                      aria-expanded={showAllFeeRows}
                      className="px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 text-xs font-semibold hover:bg-brand-100 transition-colors flex items-center gap-1.5"
                    >
                      <span>
                        {showAllFeeRows
                          ? "Show less"
                          : `Read more (${filteredFeeRows.length - FEE_ROWS_PREVIEW} more)`}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${showAllFeeRows ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-5 py-2.5 bg-white text-brand-600 border border-brand-600 rounded-xl text-xs font-bold hover:bg-brand-50 transition-all">
                    {collegeData?.coursesFees?.roiCalculator}
                  </button>
                  <button
                    onClick={() => onOpenBrochure()}
                    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {collegeData?.coursesFees?.viewFeeStructure}
                  </button>
                </div>
              </div>
            </section>
              )}

            {
    /* 2b. Popular Programmes (Programme Cards) */
  }
            {(collegeData?.popularProgrammes?.length) && (
              <ProgrammeCardsSection
                sectionId="popular-programmes"
                title={`${collegeData?.shortName || collegeData?.title} Popular Programmes`}
                description={`Explore ${collegeData?.shortName || collegeData?.title}'s most popular UG and PG programmes, with duration, fees and specialisations for each.`}
                programmes={(collegeData?.popularProgrammes || []).map((programme) => ({
                  id: programme.courseId || programme.degree,
                  title: programme.degree,
                  subtitle: programme.specializations || programme.category || "",
                  duration: programme.duration || "",
                  fee: programme.avgFees || "",
                  semesterFee: programme.perSemFee || "",
                  description: programme.description || programme.shortDescription || "",
                  mode: programme.mode || "",
                  specialisations: programme.specialisations?.length
                    ? programme.specialisations
                    : programme.specializations
                      ? [programme.specializations]
                      : [],
                }))}
                onOpenBrochure={onOpenBrochure}
                onOpenApply={onOpenApply}
              />
              )}

            {
    /* 3. Eligibility and Selection Criteria (From API) */
  }
            {(collegeData?.eligibility) && (
                <section id="eligibility-criteria" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[17px] sm:text-2xl font-bold text-ink-900 font-sans mt-2 tracking-tight leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.eligibility?.title, `${collegeData?.shortName || collegeData?.title} Eligibility and Selection Criteria`, collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.eligibility?.title, `${collegeData?.shortName || collegeData?.title} Eligibility and Selection Criteria`, collegeData?.shortName || collegeData?.title)}
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-brand-600 mt-1" />
                <ReadMoreText fullText
                  text={
                    collegeData?.eligibility?.intro ||
                    `${collegeData?.title} provides a range of online undergraduate and postgraduate programs. The eligibility criteria depend on the course level, and admission is generally based on academic qualifications and document verification. To be eligible for admission, candidates are required to fill out the online application form, upload the required documents, and pay the program fee. Check the below criteria for online eligibility and selection:`
                  }
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-sm text-ink-700 leading-relaxed font-normal text-justify [text-justify:inter-word]"
                />
              </div>

              {!hasPerCourseSelection && collegeData?.eligibility?.selectionProcess && (
                <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
                  <h3 className="text-xs font-bold text-brand-600 mb-1">Selection Process</h3>
                  <p className="m-0 text-sm text-ink-700 leading-relaxed text-justify [text-justify:inter-word]">
                    {collegeData.eligibility.selectionProcess}
                  </p>
                </div>
              )}

              {/* Eligibility Table — Matches DegreeFYD style */}
              <div className="mt-5 overflow-hidden rounded-xl border border-brand-200 bg-white">
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-max">
                    <thead>
                      <tr className="bg-brand-600 text-white">
                        <th className="px-3 sm:px-4 py-2.5 font-semibold text-xs sm:text-sm">Course</th>
                        <th className="px-3 sm:px-4 py-2.5 font-semibold text-xs sm:text-sm">Eligibility</th>
                        {hasPerCourseSelection && <th className="px-3 sm:px-4 py-2.5 font-semibold text-xs sm:text-sm">Selection Process</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-100">
                      {collegeData?.eligibility?.items.map((row, i) => (
                        <tr key={i} className="bg-white transition-colors hover:bg-brand-50/60">
                          <td className="px-3 sm:px-4 py-3 font-bold text-ink-900 align-top whitespace-nowrap">{row.course}</td>
                          <td className="px-3 sm:px-4 py-3 text-ink-700 align-top min-w-[200px] sm:min-w-[280px]">
                            <ReadMoreText
                              fullText
                              text={row.eligibility}
                              lines={3}
                              className="text-xs sm:text-sm leading-relaxed text-ink-700 text-justify [text-justify:inter-word]"
                            />
                          </td>
                          {hasPerCourseSelection && (
                            <td className="px-3 sm:px-4 py-3 font-semibold text-brand-600 align-top whitespace-nowrap">
                              {row.selection}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
              )}

            {
    /* 5. Admission Process 2026 (Accordion) */
  }
                        {ADMISSION_FLOW_STEPS.length > 0 && (
                <section id="admission-process" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[18px] sm:text-2xl font-bold text-ink-900 font-sans mt-2 leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.admission?.title, collegeSectionTitle(collegeData?.shortName || collegeData?.title, `Admission Process ${CURRENT_YEAR}`), collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.admission?.title, collegeSectionTitle(collegeData?.shortName || collegeData?.title, `Admission Process ${CURRENT_YEAR}`), collegeData?.shortName || collegeData?.title)}
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-brand-600 mt-1" />
                <ReadMoreText fullText
                  text={
                    collegeData?.admission?.intro ||
                    `${collegeData?.title} follows a simple and transparent online university admission process. Admission to online degree courses is based on academic eligibility criteria specified for each programme. Candidates can apply without visiting the campus. Check the below step-by-step admission process:`
                  }
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-sm text-ink-700 leading-relaxed font-normal text-justify [text-justify:inter-word]"
                />
              </div>

              <style>{`
    .admission-flow-step {
      --admission-badge-w: 78px;
      display: grid;
      grid-template-columns: calc(var(--admission-badge-w) + 18px) minmax(0, 1fr);
      gap: 0.625rem;
    }
    .admission-flow-left {
      display: flex;
      flex-direction: column;
    }
    .admission-flow-badge {
      position: relative;
      width: var(--admission-badge-w);
      height: 34px;
      display: grid;
      place-items: center;
      background: #0b2a4d;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
      letter-spacing: 0.02em;
    }
    .admission-flow-badge span {
      padding-right: 6px;
    }
    .admission-flow-conn {
      flex: 1;
      min-height: 42px;
      padding-right: 8px;
      margin-bottom: 4px;
      width: var(--admission-badge-w);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      opacity: 0;
    }
    .admission-flow-conn i {
      display: block;
      width: 9px;
      height: 9px;
      border-right: 2.5px solid #115eaf;
      border-bottom: 2.5px solid #115eaf;
      transform: rotate(45deg);
      opacity: 0.22;
    }
    .admission-flow-step:last-child .admission-flow-conn {
      display: none;
    }
    .admission-flow-body {
      padding: 2px 0 26px;
      opacity: 0;
      transform: translateY(14px);
    }
    .admission-flow-step.is-visible .admission-flow-badge {
      clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
      transition: clip-path 0.3s cubic-bezier(0.2, 0.9, 0.25, 1);
    }
    .admission-flow-step.is-visible .admission-flow-body {
      opacity: 1;
      transform: none;
      transition: opacity 0.3s ease 0.1s, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s;
    }
    .admission-flow-step.is-visible .admission-flow-conn {
      opacity: 1;
      transition: opacity 0.3s ease 0.35s;
    }
    .admission-flow-step.is-visible .admission-flow-conn i {
      animation: admission-wave 0.9s ease-in-out infinite;
    }
    .admission-flow-step.is-visible .admission-flow-conn i:nth-child(2) {
      animation-delay: 0.15s;
    }
    .admission-flow-step.is-visible .admission-flow-conn i:nth-child(3) {
      animation-delay: 0.3s;
    }
    @keyframes admission-wave {
      0%, 100% {
        opacity: 0.2;
        transform: rotate(45deg) translate(0, 0);
      }
      45% {
        opacity: 1;
        transform: rotate(45deg) translate(2px, 2px);
      }
    }
    @media (max-width: 640px) {
      .admission-flow-step {
        --admission-badge-w: 66px;
        gap: 0.5rem;
      }
      .admission-flow-badge {
        height: 30px;
        font-size: 12px;
      }
      .admission-flow-body h3 {
        font-size: 16px;
      }
      .admission-flow-body p {
        font-size: 14px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .admission-flow-body,
      .admission-flow-conn,
      .admission-flow-badge {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .admission-flow-step.is-visible .admission-flow-conn i {
        animation: none !important;
      }
    }
  `}</style>

              <AdmissionFlowSteps steps={ADMISSION_FLOW_STEPS} />
            </section>
          )}

            {
    /* 6. Rankings & Accreditations (From API) */
  }
            {(collegeData?.rankings) && (
                <section id="rankings" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[18px] sm:text-2xl font-bold text-ink-900 font-sans leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.rankings?.title, `${collegeData?.shortName || collegeData?.title} Rankings and Accreditations`, collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.rankings?.title, `${collegeData?.shortName || collegeData?.title} Rankings and Accreditations`, collegeData?.shortName || collegeData?.title)}
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-brand-600 mt-1" />
                <ReadMoreText fullText
                  text={collegeData?.rankings?.intro}
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-xs text-ink-700 leading-relaxed font-normal text-justify [text-justify:inter-word]"
                />
              </div>

              {collegeData?.rankings?.table?.length > 0 && <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-brand-200 mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-max">
                  <thead>
                    <tr className="bg-brand-600 text-white">
                      {(collegeData?.rankings?.columns?.length ? collegeData.rankings.columns : ["Authority / Body", "Recognition / Status"]).map((column, columnIndex) => (
                        <th key={`${column}-${columnIndex}`} className="py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100">
                    {collegeData?.rankings?.table.map((r, idx) => <tr key={idx} className="bg-white hover:bg-brand-50/60 transition-colors">
                        {(collegeData?.rankings?.columns?.length ? r.values : [r.authority, r.status]).map((value, columnIndex) => (
                          <td key={columnIndex} className={`py-3 px-3 sm:px-4 ${columnIndex === 0 ? "font-bold text-ink-900" : "font-normal text-ink-700"}`}>{value}</td>
                        ))}
                      </tr>)}
                  </tbody>
                </table>
              </div>}
            </section>
              )}

            {
    /* 7. Examination Pattern (Interactive Module) */
  }
            {EXAM_STEPS.length > 0 && (
                <section id="examination-pattern" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[18px] sm:text-2xl font-bold text-ink-900 font-sans mt-2 leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.examinationPattern?.title, collegeSectionTitle(collegeData?.shortName || collegeData?.title, "Examination Pattern"), collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.examinationPattern?.title, collegeSectionTitle(collegeData?.shortName || collegeData?.title, "Examination Pattern"), collegeData?.shortName || collegeData?.title)}
                </h2>
                <ReadMoreText fullText
                  text={
                    collegeData?.examinationPattern?.intro ||
                    `${collegeData?.title} conducts examinations for its online courses through its digital learning platform. The evaluation system usually includes assignments, internal assessments, and end-term examinations to evaluate students' performance during the course. Check below the examination process:`
                  }
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-sm text-ink-700 leading-relaxed font-normal"
                />
              </div>

              <style>{`
    .exam-step {
      --exam-badge-w: 78px;
      position: relative;
      display: grid;
      grid-template-columns: calc(var(--exam-badge-w) + 18px) minmax(0, 1fr);
      padding-bottom: 30px;
    }
    .exam-step:last-child {
      padding-bottom: 0;
    }
    .exam-step:not(:last-child)::before {
      content: "";
      position: absolute;
      left: calc(var(--exam-badge-w) / 2 - 5px);
      top: 40px;
      bottom: 6px;
      width: 3px;
      background: repeating-linear-gradient(180deg, #0b2a4d 0 4px, transparent 4px 9px);
      animation: exam-flow-down 0.9s linear infinite;
    }
    @keyframes exam-flow-down {
      from { background-position: 0 0; }
      to { background-position: 0 9px; }
    }
    .exam-badge {
      width: var(--exam-badge-w);
      height: 34px;
      display: grid;
      place-items: center;
      background: #0b2a4d;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
    }
    .exam-badge span {
      padding-right: 6px;
    }
    .exam-body h3 {
      margin: 2px 0 3px;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.35;
      color: #101828;
    }
    .exam-body p {
      margin: 0;
      font-size: 15px;
      line-height: 1.55;
      color: #344054;
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
      .exam-step {
        --exam-badge-w: 66px;
      }
      .exam-badge {
        font-size: 12px;
      }
      .exam-body h3 {
        font-size: 16px;
      }
      .exam-body p {
        font-size: 14px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .exam-step::before,
      .exam-step-reveal {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `}</style>

              <ExaminationPatternSteps steps={EXAM_STEPS} />
            </section>
          )}

            {
    /* 8. Placements & Salary Stats (From API) */
  }
            {(collegeData?.placements) && (
                <section id="placements" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[18px] sm:text-2xl font-bold text-ink-900 font-sans leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.placements?.title, `${collegeData?.shortName || collegeData?.title} Placements`, collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.placements?.title, `${collegeData?.shortName || collegeData?.title} Placements`, collegeData?.shortName || collegeData?.title)}
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-brand-600 mt-1" />
                <ReadMoreText fullText
                  text={
                    collegeData?.placements?.intro ||
                    `${collegeData?.title} offers placement assistance and career support services in online courses.`
                  }
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal text-justify [text-justify:inter-word]"
                />
              </div>

              {/* 4 Compact Stat Tiles from API */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]">
                <div className="p-3.5 rounded-xl bg-canvas border border-brand-100 text-center">
                  <span className="block text-xl font-extrabold text-brand-600 font-sans leading-none">{collegeData?.placements?.stats.placementRate}</span>
                  <span className="block text-[10px] font-normal text-ink-700 uppercase tracking-wide mt-1.5">Placement Rate</span>
                </div>
                <div className="p-3.5 rounded-xl bg-canvas border border-brand-100 text-center">
                  <span className="block text-xl font-extrabold text-emerald-700 font-sans leading-none">{collegeData?.placements?.stats.highestPackage}</span>
                  <span className="block text-[10px] font-normal text-ink-700 uppercase tracking-wide mt-1.5">Highest Package</span>
                </div>
                <div className="p-3.5 rounded-xl bg-canvas border border-brand-100 text-center">
                  <span className="block text-xl font-extrabold text-ink-900 font-sans leading-none">{collegeData?.placements?.stats.hiringPartners}</span>
                  <span className="block text-[10px] font-normal text-ink-700 uppercase tracking-wide mt-1.5">Hiring Partners</span>
                </div>
                {collegeData?.placements?.stats.internshipsCount && collegeData.placements.stats.internshipsCount !== "—" && (
                <div className="p-3.5 rounded-xl bg-canvas border border-brand-100 text-center">
                  <span className="block text-xl font-extrabold text-accent-700 font-sans leading-none">{collegeData.placements.stats.internshipsCount}</span>
                  <span className="block text-[10px] font-normal text-ink-700 uppercase tracking-wide mt-1.5">Internships</span>
                </div>
                )}
              </div>

              <div className="mt-[18px]">
                <RecruiterScroll recruiters={collegeData?.placements?.recruiters || []} />
              </div>
            </section>
              )}

            {
    /* 7. Campus */
  }
            {(collegeData?.campus) && (
                <section id="campus" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <div>
                <h2 className="section-title text-[18px] sm:text-2xl font-bold text-ink-900 font-sans leading-snug line-clamp-1" title={sanitizeSectionHeading(collegeData?.campus?.title, `${collegeData?.shortName || collegeData?.title} Campus`, collegeData?.shortName || collegeData?.title)}>
                  {sanitizeSectionHeading(collegeData?.campus?.title, `${collegeData?.shortName || collegeData?.title} Campus`, collegeData?.shortName || collegeData?.title)}
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-brand-600 mt-1" />
                <ReadMoreText fullText
                  text={collegeData?.campus?.description}
                  lines={3}
                  wrapperClassName="mt-1"
                  className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal text-justify [text-justify:inter-word]"
                />
              </div>

              {Boolean(collegeData?.campus?.travelTable && collegeData.campus.travelTable.length > 0) && (
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-brand-200 mt-[18px]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-max">
                    <thead>
                      <tr className="bg-brand-600 text-white">
                        <th className="py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm">Mode of Transport</th>
                        <th className="py-3 px-4 font-bold">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-100">
                      {collegeData?.campus?.travelTable.map((t, idx) => <tr key={idx} className="hover:bg-brand-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-ink-900 align-top whitespace-nowrap">{t.mode}</td>
                          <td className="py-3.5 px-4 text-ink-700 leading-relaxed font-normal">{t.detail}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              )}

              {
    /* Campus Photos */
  }
              <style>{`
                .campus-marquee {
                  overflow: hidden;
                  position: relative;
                  border-radius: 18px;
                  border: 1px solid #e6eefa;
                  background: #f2f6fc;
                  margin-top: 18px;
                  padding: 10px;
                }
                .campus-marquee-track {
                  display: flex;
                  align-items: stretch;
                  gap: 14px;
                  width: max-content;
                  padding-right: 10px;
                  animation: campus-marquee 24s linear infinite;
                }
                .campus-marquee-track:hover {
                  animation-play-state: paused;
                }
                .campus-marquee-item {
                  flex: 0 0 auto;
                  width: min(360px, 78vw);
                  background: #ffffff;
                  overflow: hidden;
                  border: 1px solid #e6eefa;
                  border-radius: 20px;
                  box-shadow: 0 12px 28px rgba(18, 37, 71, 0.12);
                }
                .campus-marquee-item img {
                  display: block;
                  width: 100%;
                  height: 240px;
                  object-fit: cover;
                  object-position: center;
                  transition: transform 320ms ease;
                }
                .campus-marquee-item:hover img {
                  transform: scale(1.04);
                }
                .campus-marquee-item figcaption {
                  padding: 12px 14px;
                  font-size: 13px;
                  font-weight: 600;
                  color: #344054;
                  background: white;
                  border-top: 1px solid #e6eefa;
                }
                @keyframes campus-marquee {
                  from {
                    transform: translateX(0);
                  }
                  to {
                    transform: translateX(-50%);
                  }
                }
                @media (max-width: 640px) {
                  .campus-marquee {
                    padding: 8px;
                  }
                  .campus-marquee-track {
                    gap: 10px;
                  }
                  .campus-marquee-item {
                    width: min(320px, 84vw);
                  }
                  .campus-marquee-item img {
                    height: 210px;
                  }
                }
              `}</style>

              <div className="campus-marquee">
                <div className="campus-marquee-track">
                  {campusMarqueeImages.map((image, index) => (
                    <figure key={`${image.imageUrl}-${index}`} className="campus-marquee-item">
                      <img src={image.imageUrl} alt={image.altText} loading="lazy" />
                      <figcaption>{image.name}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>

            </section>
              )}

            {
    /* 8. UGC Sample Degree Section (From API) */
  }
            {(collegeData?.sampleDegree) && (
                <section id="sample-degree" className="page-section card bg-brand-50 rounded-2xl border border-brand-200">
              {
    /* Top Heading Block (Placed at the top of section) */
  }
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-200/70">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-normal flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      UGC-DEB Validated & Govt Approved
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-white text-brand-600 text-[11px] font-normal border border-brand-200">
                      100% Equivalent
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                    {collegeData?.sampleDegree?.title || `${collegeData?.shortName || collegeData?.title} Sample Degree`}
                  </h2>
                </div>

                {certificateImage ? (
                  <a
                    href={certificateImage}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-white text-brand-600 border border-brand-200 rounded-xl text-xs font-semibold hover:bg-brand-100 transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <span>View Full-Size Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
              </div>

              {
    /* Certificate Content Grid */
  }
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-[18px]">
                <div className="md:col-span-7 space-y-3.5">
                  <ReadMoreText fullText
                    text={collegeData?.sampleDegree?.description}
                    lines={3}
                    className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal"
                  />
                  
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-700">
                    <span className="p-1.5 rounded-lg bg-white/80 border border-brand-200 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      UPSC & PSC Eligible
                    </span>
                    <span className="p-1.5 rounded-lg bg-white/80 border border-brand-200 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      WES Evaluated (US & Canada)
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
    type="button"
    onClick={handleOverviewApply}
    className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-1.5"
  >
                      <span>Apply for Degree Enrollment</span>
                    </button>
                    <button
    onClick={onOpenHelpDesk}
    className="px-3.5 py-2 bg-white text-ink-900 border border-line-strong rounded-lg text-xs font-medium hover:bg-brand-50 transition-all"
  >
                      Verify Legal Equivalence
                    </button>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-xl overflow-hidden border-2 border-white shadow-md bg-white p-2.5 group hover:shadow-lg transition-all">
                    {certificateImage ? (
                      <img
                        src={certificateImage}
                        alt={collegeData?.sampleDegree?.altText}
                        className="w-full h-auto object-contain rounded group-hover:scale-102 transition-transform duration-300 max-h-64"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          event.currentTarget.parentElement
                            ?.querySelector("[data-certificate-fallback]")
                            ?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <div
                      data-certificate-fallback
                      className={`${certificateImage ? "hidden" : ""} flex min-h-[180px] flex-col items-center justify-center gap-2 rounded bg-canvas px-4 text-center`}
                    >
                      <FileText className="h-10 w-10 text-brand-600" />
                      <span className="text-xs font-medium text-ink-500">
                        Certificate preview unavailable
                      </span>
                    </div>
                    <div className="text-center pt-1.5 text-[10px] text-ink-500 font-normal">
                      Specimen UGC-Entitled Degree Format
                    </div>
                  </div>
                </div>
              </div>
            </section>
              )}

{
    /* 9. Verified Reviews & FAQs */
  }
            {Boolean(collegeData?.reviews?.length) && (
                <section id="reviews-section" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              {
    /* Header and Rating Summary Bar */
  }
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2.5 border-b border-brand-100">
                <div>
                  <div className="flex items-center gap-2">
                    {REVIEW_SUMMARY.rating && (
                    <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-normal flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {REVIEW_SUMMARY.rating}
                    </span>
                    )}
                    {REVIEW_SUMMARY.count && (
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-normal">
                      {REVIEW_SUMMARY.count}
                    </span>
                    )}
                  </div>
                  <h2 className="section-title text-xl sm:text-2xl font-extrabold text-ink-900 font-sans mt-2">
                    {collegeData?.reviewsMeta?.title || `${collegeData?.shortName || collegeData?.title} Reviews`}
                  </h2>
                  <p className="text-xs text-ink-500 m-0 mt-1 leading-relaxed">
                    {collegeData?.reviewsMeta?.subtitle || `Authentic feedback from students of ${collegeData?.shortName || collegeData?.title}`}
                  </p>
                </div>
              </div>

              {
    /* Review Filter Category Tabs */
  }
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {REVIEW_CATEGORIES.map((cat) => <button
    key={cat}
    onClick={() => setSelectedReviewCategory(cat)}
    className={`px-3 py-1 rounded-lg font-bold transition-all text-[11px] max-md:min-h-[36px] max-md:px-4 ${selectedReviewCategory === cat ? "bg-brand-600 text-white shadow-xs" : "bg-brand-50 text-ink-700 hover:bg-brand-100 hover:text-ink-900"}`}
  >
                      {cat}
                    </button>)}
                </div>

                <span className="text-[11px] text-ink-500">
                  Showing authentic verified reviews
                </span>
              </div>

              {
    /* Modern Review Cards Grid */
  }
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {(collegeData?.reviews || []).filter((t) => {
    if (selectedReviewCategory === "All") return true;
    return (t.course || "").toLowerCase().includes(selectedReviewCategory.toLowerCase());
  }).map((t, idx) => <div
    key={idx}
    className="bg-white rounded-xl border border-brand-100 hover:border-brand-600/70 hover:shadow-md transition-all p-3 flex flex-col justify-between gap-2.5 group relative"
  >
                      {
    /* Top Bar: Stars + Tag */
  }
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-3">
                          {Number(t.ratingValue) > 0 ? (
                            <div className="flex text-amber-400 gap-0.5 items-center">
                              {[...Array(Math.max(0, Math.min(5, Math.round(Number(t.rating) || 0))))].map((_, i) => <Star key={i} className="w-3 h-3 fill-current text-amber-400" />)}
                              <span className="text-[10px] font-normal text-ink-900 ml-1.5">{t.ratingLabel || t.ratingValue}</span>
                            </div>
                          ) : (
                            <span aria-hidden="true" />
                          )}
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-normal bg-brand-50 text-brand-600 border border-brand-200">
                            <CheckCircle className="w-2.5 h-2.5 text-brand-600" />
                            {t.tag || "Verified Learner"}
                          </span>
                        </div>

                        {
    /* Program Badge */
  }
                        <div className="flex items-center justify-between gap-1 text-[10px]">
                          <span className="font-normal text-brand-600 truncate">
                            {t.course}
                          </span>
                          <span className="text-[9px] text-ink-500 shrink-0 font-normal">
                            {t.batch}
                          </span>
                        </div>

                        {
    /* Review Content */
  }
                        <div className="relative pt-0.5">
                          <ReadMoreText fullText
                            text={`"${t.text}"`}
                            lines={3}
                            buttonClassName="text-xs"
                            className="text-[11px] text-ink-700 leading-relaxed font-normal"
                          />
                        </div>
                      </div>

                      {
    /* Student Profile Footer */
  }
                      <div className="pt-2 border-t border-brand-50 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-brand-700 text-white flex items-center justify-center text-[10px] font-semibold shrink-0 shadow-xs">
                            {t.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-normal text-[11px] text-ink-900 truncate block">{t.studentName}</span>
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            </div>
                            <span className="text-[10px] text-brand-600 font-normal truncate block leading-tight">
                              {t.profession}
                            </span>
                            <span className="text-[9px] text-ink-500 truncate block font-normal">
                              {t.company}
                            </span>
                          </div>
                        </div>

                        <span className="text-[9px] text-ink-500 flex items-center gap-0.5 shrink-0 font-normal">
                          <MapPin className="w-2.5 h-2.5 text-ink-500" />
                          <span>{t.location}</span>
                        </span>
                      </div>
                    </div>)}
              </div>

              {
    /* Review Callout Action Box */
  }
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-50 via-white to-brand-50 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-3 mt-[18px]">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-sm text-ink-900 font-sans">
                    Join {collegeData?.students ? `${Number(collegeData.students).toLocaleString("en-IN")}+` : "thousands of"} ambitious working professionals at {collegeData?.shortName || collegeData?.title}
                  </h4>
                  <p className="text-xs text-ink-700">
                    Admissions are currently open. Book a 1-on-1 counseling session with our admissions team.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
    type="button"
    onClick={handleOverviewApply}
    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow hover:bg-brand-700 active:scale-95 transition-all"
  >
                    Apply Now {CURRENT_YEAR}
                  </button>
                  <button
    onClick={() => onOpenHelpDesk()}
    className="px-4 py-2.5 bg-white text-ink-900 border border-ink-900 rounded-xl text-xs font-bold hover:bg-brand-50 active:scale-95 transition-all"
  >
                    Talk to Counselor
                  </button>
                </div>
              </div>
            </section>
              )}

            {
    /* Compare Colleges */
  }
            {(collegeData?.compareSection) && (
                <section id="compare-colleges" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans">
                {collegeData?.compareSection?.title}
              </h2>
              <p className="section-description text-sm text-ink-700 leading-relaxed font-normal">
                {collegeData?.compareSection?.description}
              </p>
              {
    /* MAIN COMPARISON BOX */
  }
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-brand-100 rounded-2xl bg-white shadow-sm mt-[18px]">

                {
    /* COLLEGE CARD */
  }
                <div className="min-h-[220px] rounded-xl border border-brand-100 bg-brand-50 p-4 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-brand-100 text-brand-600 text-[11px] font-bold">
                      Selected
                    </span>

                    <div className="flex gap-4 items-center">
                      <div className="w-[115px] h-[85px] shrink-0 rounded-lg border border-brand-100 bg-white flex items-center justify-center overflow-hidden">
                        <img
    src={collegeData?.hero?.logoImage}
    alt={`${collegeData?.shortName || collegeData?.title || "College"} Logo`}
    className="max-w-full max-h-full object-contain p-1.5"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
                      </div>
                      <div>
                        <h3 className="mb-1.5 leading-tight font-extrabold text-ink-900 font-sans">
                          {collegeData?.title}
                        </h3>
                        <p className="mt-[7.5px] flex items-center gap-1.5 text-sm text-ink-700">
                          <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          {collegeData?.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {collegeData?.approvals.slice(0, 4).map((tag) => <span key={tag} className="px-2 py-1 rounded-[7px] bg-white border border-brand-200 text-[11px] font-normal text-ink-700">
                          {tag}
                        </span>)}
                    </div>
                  </div>

                  <button
    onClick={() => onOpenBrochure()}
    className="w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg border border-brand-600 bg-white text-brand-600 text-sm font-bold hover:bg-brand-50 transition-all"
  >
                    <Download className="w-4 h-4" />
                    Brochure
                  </button>
                </div>

                {
    /* VS */
  }
                <div className="compare-vs flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center bg-brand-600 text-white text-sm font-extrabold">
                    VS
                  </span>
                </div>

                {
    /* ADD COLLEGE CARD */
  }
                <div className="min-h-[220px] rounded-xl border border-dashed border-brand-200 bg-canvas p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border border-brand-200 bg-white flex items-center justify-center text-brand-600 text-2xl font-light mb-2.5">
                    +
                  </div>
                  <div className="add-content">
                    <h3 className="text-lg font-extrabold text-ink-900 font-sans">
                      Add College
                    </h3>
                    <p className="mt-[7.5px] text-[13px] leading-relaxed text-ink-700 font-normal">
                      Select another college to compare side by side.
                    </p>
                  </div>
                  <button
    onClick={() => onOpenHelpDesk()}
    className="w-full h-11 mt-4 rounded-lg border-none bg-brand-600 text-white text-sm font-bold hover:bg-brand-900 transition-all"
  >
                    Add College
                  </button>
                </div>
              </div>
            </section>
              )}

            {
    /* Blogs */
  }
            <BlogsListSection
              onOpenHelpDesk={onOpenHelpDesk}
              sectionId="blogs"
              title={collegeData?.blogsMeta?.title || "Latest Blogs"}
              sub={collegeData?.blogsMeta?.description || "Guides to help you choose a programme and university."}
              className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs p-5 md:p-6"
              posts={collegeData?.blogs}
              fetchLivePosts
              horizontal
            />

            {/* 12. Frequently Asked Questions — Last Section on Detail Page */}
            {Boolean(collegeData?.faqs?.length) && (
              <section id="faqs" className="page-section card bg-white rounded-2xl border border-brand-100 shadow-xs p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="section-title text-xl sm:text-2xl font-bold text-ink-900 font-sans m-0">
                    {collegeData?.faqsMeta?.title || `Frequently Asked Questions (${collegeData?.shortName || collegeData?.title})`}
                  </h2>
                </div>
                <FaqAccordion
                  items={collegeData?.faqs || []}
                  variant="card"
                  defaultOpenIndex={0}
                />
              </section>
            )}
        </div>
      </div>

            {
    /* Floating TOC Toggle Button */
  }
      <button
    onClick={() => setTocOpen(!tocOpen)}
    className="fixed bottom-6 left-4 z-30 hidden h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-colors hover:bg-brand-600 md:flex"
    aria-label="Toggle Table of Contents"
  >
        <FileText className="w-5 h-5" />
      </button>

      {
    /* TOC Slide-in Panel */
  }
      {tocOpen && <div className="fixed inset-0 z-40 flex justify-start">
          {
    /* Backdrop */
  }
          <div className="absolute inset-0 bg-black/30" onClick={() => setTocOpen(false)} />

          {
    /* Panel */
  }
          <div className="relative w-72 max-w-[85vw] bg-white shadow-2xl h-full overflow-y-auto animate-slide-in-left">
            <div className="p-5 space-y-5">
              {
    /* Header */
  }
              <div className="flex items-center justify-between pb-3.5 border-b border-brand-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <h3 className="font-bold text-sm text-ink-900">Table of Contents</h3>
                </div>
                <button
    onClick={() => setTocOpen(false)}
    className="w-7 h-7 rounded-lg bg-brand-50 text-ink-700 flex items-center justify-center hover:bg-brand-100 transition-colors"
  >
                  <span className="text-xs font-bold">✕</span>
                </button>
              </div>

              {
    /* TOC Links */
  }
              <ul className="space-y-1">
                {TOC_ITEMS.map((item) => {
    const isActive = activeSection === item.id;
    return <li key={item.id}>
                      <a
      href={`#${item.id}`}
      onClick={(e) => {
        handleTocClick(e, item.id);
        setTocOpen(false);
      }}
      className={`block px-3 py-2 rounded-lg text-xs transition-all ${isActive ? "bg-brand-50 text-brand-600 font-bold" : "text-ink-700 hover:text-ink-900 hover:bg-canvas"}`}
    >
                        {item.label}
                      </a>
                    </li>;
  })}
              </ul>

              {
    /* DEB Advisor Box */
  }
              <div className="bg-brand-600 text-white rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs leading-tight">UGC-DEB Expert Desk</p>
                    <p className="text-[10px] text-brand-300">Online Siksha Advisory</p>
                  </div>
                </div>
                <p className="text-[11px] text-brand-300 leading-relaxed">
                  Need guidance on degree equivalence, govt job validity, or fee plans?
                </p>
                <button
    onClick={() => {
      onOpenHelpDesk();
      setTocOpen(false);
    }}
    className="w-full py-2 bg-brand-600 text-white rounded-lg text-[11px] font-bold hover:bg-brand-700 transition-all"
  >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>}

      {
    /* Floating Counselling FAB + Slide-up Panel (right edge, vertical center) */
  }
      {counselPanelOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setCounselPanelOpen(false)} />}

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none">
        {
    /* Slide-up Panel */
  }
        <div
    className={`w-72 max-w-[calc(100vw-48px)] bg-white border border-brand-100 shadow-2xl rounded-2xl transition-all duration-300 ${counselPanelOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-3 pointer-events-none"}`}
  >
        <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-200 flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <h3 className="text-xs font-bold text-ink-900">Get Free Counselling</h3>
          </div>
          <button
    onClick={() => setCounselPanelOpen(false)}
    className="w-6 h-6 rounded-md bg-brand-50 text-ink-700 flex items-center justify-center hover:bg-brand-100 transition-colors text-[10px] font-bold"
  >
            ✕
          </button>
        </div>

        <div className="p-4">
          {!formSubmitted ? <form onSubmit={handleCounselingSubmit} className="space-y-2.5">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[11px] font-bold text-ink-900">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  pattern={INDIAN_PHONE_PATTERN}
                  title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                  value={counselingForm.phone}
                  onChange={(e) => { setCounselingForm({ ...counselingForm, phone: sanitizeIndianPhone(e.target.value) }); if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" }); }}
                  aria-label="Mobile number" placeholder="10-digit Mobile Number"
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border text-[11px] text-ink-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none ${formErrors.phone ? "border-red-500" : "border-line-strong"}`}
                  aria-invalid={formErrors.phone ? "true" : "false"}
                  aria-describedby={formErrors.phone ? "phone-error" : undefined}
                />
              </div>
              {formErrors.phone && (
                <p id="phone-error" role="alert" aria-live="polite" className="mt-1 text-[11px] text-red-600">{formErrors.phone}</p>
              )}
              <input
    type="email"
    required
    value={counselingForm.email}
    onChange={(e) => { setCounselingForm({ ...counselingForm, email: e.target.value }); if (formErrors.email) setFormErrors({ ...formErrors, email: "" }); }}
    aria-label="Email Address" placeholder="Email Address"
    className={`w-full px-3 py-2 rounded-lg border text-[11px] text-ink-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none ${formErrors.email ? "border-red-500" : "border-line-strong"}`}
    aria-invalid={formErrors.email ? "true" : "false"}
    aria-describedby={formErrors.email ? "email-error" : undefined}
  />
              {formErrors.email && (
                <p id="email-error" role="alert" aria-live="polite" className="mt-1 text-[11px] text-red-600">{formErrors.email}</p>
              )}
              <select
    aria-label="Programme of interest"
    value={counselingForm.course}
    onChange={(e) => setCounselingForm({ ...counselingForm, course: e.target.value })}
    className="w-full px-3 py-2 rounded-lg border border-line-strong text-[11px] text-ink-900 focus:border-brand-600 outline-none cursor-pointer bg-white"
  >
                {COURSES_DATA.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button
    type="submit"
    className="w-full py-2 min-h-[44px] bg-brand-600 text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-brand-700 active:scale-95 transition-all"
  >
                Submit
              </button>
            </form> : <div className="py-4 text-center space-y-1.5 text-[11px] animate-in fade-in">
              <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="font-bold text-ink-900 block">Callback Requested!</span>
              <p className="text-ink-700">We will call you at +91 {counselingForm.phone} shortly.</p>
              <button onClick={() => setFormSubmitted(false)} className="text-[10px] font-bold text-brand-600 hover:underline">
                Submit another enquiry
              </button>
            </div>}
        </div>
      </div>

      {/* Vertical Edge Tab — "Free Apply" */}
      <button
        type="button"
        onClick={handleOverviewApply}
        className="pointer-events-auto hidden h-[200px] w-12 items-center justify-center rounded-l-2xl bg-brand-600 shadow-md transition-colors hover:bg-brand-700 lg:flex cursor-pointer active:scale-95"
        aria-label="Free Apply"
      >
        <span className="block text-white text-sm font-semibold tracking-wide whitespace-nowrap -rotate-90">
          Free Apply
        </span>
      </button>
      </div>
    </div>;
};
export {
  OverviewView
};
export default OverviewView;

