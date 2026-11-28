import { BlogsListSection } from "./BlogsListSection";

import { useState, useEffect } from "react";
import {
  Award,
  Shield,
  Clock,
  Heart,
  UserCheck,
  CheckCircle,
  Download,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

import CollegeHero from "./CollegeHero";
import CollegeTableOfContents from "./CollegeTableOfContents";
import { useSiteActions } from "./shell/SiteActionsContext";
import { collegeBase, collegeSectionTitle } from "../lib/collegeTitle";
import { CURRENT_YEAR } from "../constants/years";

const PILLAR_ICON = {
  award: Award,
  shield: Shield,
  clock: Clock,
  heart: Heart,
  user: UserCheck,
};

const PILLAR_ICON_BG = {
  award: "bg-accent-50 text-[#92400E]",
  shield: "bg-brand-100 text-brand-600",
  clock: "bg-accent-50 text-[#92400E]",
  heart: "bg-brand-50 text-brand-600",
  user: "bg-brand-50 text-brand-600",
  star: "bg-brand-100 text-brand-600",
};

const PILLAR_TAG = {
  amber: "bg-[#ffdcc3] text-[#6e3900]",
  blue: "bg-brand-200 text-brand-700",
  green: "bg-success-50 text-[#129b55]",
};

/**
 * College Scholarships page — port of the reference "Scholarships" tab
 * (src/components/ScholarshipsView.tsx).
 *
 * The calculator only renders when the API provides scholarship rules.
 * Sections without data are hidden instead of being filled with placeholders.
 */
export default function CollegeScholarships({
  college = {},
  overview = {},
  universityNavigation,
}) {
  const siteActions = useSiteActions();
  const onOpenApply = siteActions.onOpenApply;
  const onOpenBrochure = siteActions.onOpenBrochure;
  const onOpenHelpDesk = siteActions.onOpenHelpDesk;

  const [activeSection, setActiveSection] = useState("scholarship-calculator");
  const [calcCourseId, setCalcCourseId] = useState("");
  const [marks, setMarks] = useState(78);

  const data = overview || {};
  const shortName = data.shortName || college.shortName || college.name || "";

  const scholarships = college.scholarships || [];
  const rules = data.scholarshipRules || [];
  const pillars = data.scholarshipPillars || [];
  const blogs = data.blogs || [];
  const courses = college.courses || [];

  const tocItems = [
    { id: "scholarship-overview", label: data.scholarshipSection?.title || `Scholarships Overview ${CURRENT_YEAR}` },
    { id: "scholarship-calculator", label: "Interactive Tuition Fee & Savings Calculator" },
    { id: "scholarship-schemes", label: data.scholarshipSection?.title || "Scholarship Schemes & Concessions" },
    { id: "blogs", label: "Blogs" },
    { id: "counselor-helpline", label: "Academic Counseling & Helpline" },
  ].filter((item) => {
    if (item.id === "scholarship-overview") return Boolean(data.scholarshipSection?.intro);
    if (item.id === "scholarship-calculator") return rules.length > 0;
    if (item.id === "scholarship-schemes")
      return pillars.length > 0 || scholarships.length > 0;
    if (item.id === "blogs") return blogs.length > 0;
    return true;
  });

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

  const selectedCourse =
    courses.find((c) => c.name === calcCourseId) || courses[0] || null;
  const baseFee = Number(selectedCourse?.fee || 0) || 0;

  const matchedRule = rules.reduce((best, rule) => {
    const m = String(rule.condition || "").match(/marks\s*>=\s*(\d+)/i);
    if (!m || marks < Number(m[1])) return best;
    if (!best || (rule.percent || 0) > (best.percent || 0)) return rule;
    return best;
  }, null);

  const percent = matchedRule?.percent || 0;
  const savings = Math.round((baseFee * percent) / 100);

  const schemeCards = pillars.length
    ? pillars
    : scholarships.map((scholarship, idx) => ({
        id: `sch-${idx}`,
        title: scholarship.name,
        body: scholarship.eligibility,
        tag: scholarship.type,
        footnote: scholarship.amount
          ? `Up to ${scholarship.amount}`
          : "Subject to Verification",
        icon: "award",
        tone: "amber",
      }));

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
              {college.name || data.title}
            </span>
            <span className="text-ink-500">/</span>
            <span className="text-ink-900 font-bold">Scholarships</span>
          </nav>
        </div>
      </div>

      <CollegeHero
        overview={data}
        college={college}
        title={data.title || "Scholarships & Fee Discounts"}
        description={
          data.hero?.description ||
          "Fee waivers, merit scholarships and zero-cost EMI options for online degree programmes."
        }
      />

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

          {/* 0. Scholarship overview */}
          {data.scholarshipSection?.intro && (
            <section
              id="scholarship-overview"
              className="page-section text-center max-w-3xl mx-auto scroll-mt-[100px]"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 text-[#92400E] border border-[#FDE68A] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                Fee Waivers &amp; Concessions {CURRENT_YEAR}
              </span>
              <h1 className="section-title mt-3 font-bold text-ink-900 tracking-tight font-sans">
                {data.title || "Scholarships & Fee Discounts"}
              </h1>
              <p className="section-description text-xs sm:text-sm text-ink-700 leading-relaxed">
                {data.scholarshipSection.intro}
              </p>
            </section>
          )}

          {/* 1. Scholarship calculator */}
          {rules.length > 0 && (
            <section
              id="scholarship-calculator"
              className="page-section card bg-white rounded-2xl border-2 border-brand-600/30 shadow-xs"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="w-full lg:w-3/5 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-line">
                    <span className="w-5 h-5 rounded-md bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold">
                      %
                    </span>
                    <h3 className="font-bold text-base text-ink-900 font-sans">
                      Calculate Your Net Tuition Fee &amp; Savings
                    </h3>
                  </div>

                  {courses.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                        Select Programme
                      </label>
                      <select aria-label="Programme"
                        value={calcCourseId}
                        onChange={(e) => setCalcCourseId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-line-strong text-base sm:text-sm font-semibold text-ink-900 focus:border-brand-600 outline-none"
                      >
                        {courses.map((course) => (
                          <option key={course.name} value={course.name}>
                            {course.name}
                            {course.fee ? ` (${course.fee})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <label className="font-bold text-ink-900 uppercase tracking-wider">
                        Qualifying Aggregate Marks: {marks}%
                      </label>
                      <span className="text-brand-600 font-normal">
                        {matchedRule?.label || "Standard Grant"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={98}
                      value={marks}
                      onChange={(e) => setMarks(Number(e.target.value))}
                      className="w-full h-2 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    />
                  </div>

                  {rules.filter((r) => r.condition).length > 0 && (
                    <div>
                      <span className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                        Special Welfare Categories
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {rules
                          .filter((r) => r.condition)
                          .map((r) => (
                            <label
                              key={r.id}
                              className="tap-chip min-h-[44px] p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all border-brand-100"
                            >
                              <input
                                type="checkbox"
                                checked={Boolean(matchedRule && matchedRule.id === r.id)}
                                readOnly
                                className="shrink-0 w-5 h-5 rounded text-brand-600"
                              />
                              <span className="font-normal text-ink-900">{r.label}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="card w-full lg:w-2/5 rounded-2xl bg-gradient-to-br from-brand-900 to-ink-900 text-white space-y-4 shadow-md">
                  <div className="pb-3 border-b border-white/10">
                    <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider block">
                      Eligible Tuition Waiver
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                      {percent}% Waiver
                    </div>
                    <p className="text-xs text-emerald-400 mt-[7.5px]">
                      Total Fee Savings: ₹{savings.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-brand-200">
                    <div className="flex justify-between">
                      <span className="text-ink-500">Standard Degree Fee:</span>
                      <span className="line-through text-ink-500">
                        ₹{baseFee.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Total Tuition:</span>
                      <span className="font-bold text-white text-sm">
                        ₹{(baseFee - savings).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/10">
                      <span className="font-bold">Net Per Semester:</span>
                      <span className="font-extrabold text-brand-400">
                        ₹{Math.round((baseFee - savings) / 4).toLocaleString("en-IN")}
/sem
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenApply()}
                    className="w-full py-3 rounded-xl bg-brand-600 text-white text-xs font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span>Claim {percent}% Scholarship</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 2. Scholarship schemes (pillars) */}
          {schemeCards.length > 0 && (
            <section
              id="scholarship-schemes"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-[100px]"
            >
              {schemeCards.map((pillar, idx) => {
                const Icon = PILLAR_ICON[pillar.icon] || Award;

                return (
                  <div
                    key={pillar.id || idx}
                    className="card bg-white border border-line rounded-2xl shadow-xs flex flex-col justify-between hover:border-brand-600 transition-all"
                  >
                    <div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                          PILLAR_ICON_BG[pillar.icon] || PILLAR_ICON_BG.award
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {pillar.tag ? (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            PILLAR_TAG[pillar.tone] || PILLAR_TAG.amber
                          }`}
                        >
                          {pillar.tag}
                        </span>
                      ) : null}

                      <h3 className="section-title font-bold text-base text-ink-900 font-sans mt-2">
                        {pillar.title}
                      </h3>
                      {pillar.body ? (
                        <p className="text-xs text-ink-700 leading-relaxed">
                          {pillar.body}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-4 pt-3 border-t border-line text-xs font-bold text-brand-600">
                      {pillar.footnote || "Subject to Verification"}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* 3. Blogs */}
          <BlogsListSection
            onOpenHelpDesk={onOpenHelpDesk}
            sectionId="blogs"
            className="page-section card bg-white rounded-2xl border border-line shadow-xs p-5 md:p-6"
            posts={blogs}
            fetchLivePosts
            horizontal
          />

          {/* 4. Counselor helpline */}
          <section id="counselor-helpline" className="page-section relative isolate overflow-hidden rounded-[20px] border border-brand-200 bg-gradient-to-br from-brand-50 via-canvas to-white p-5 sm:p-6 text-brand-900 shadow-sm scroll-mt-[130px] max-w-7xl mx-auto my-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="section-title text-lg sm:text-xl font-bold font-sans tracking-tight">
                  Need Help Choosing the Right Scholarship?
                </h3>
                <p className="section-description text-xs sm:text-sm text-brand-300 font-normal">
                  Talk to an unbiased academic counsellor about fee waivers, EMI
                  options and admission eligibility — completely free.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenApply()}
                  className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-brand-700 active:scale-95 transition-all min-h-[44px]"
                >
                  Apply Now
                </button>
                <button
                  type="button"
                  onClick={onOpenHelpDesk}
                  className="px-4 py-2.5 rounded-lg border border-line-strong bg-white text-brand-900 text-xs sm:text-sm font-medium hover:bg-brand-50 transition-all flex items-center gap-1.5 min-h-[44px]"
                >
                  <PhoneCall className="w-4 h-4 text-brand-400" />
                  <span>Call Helpline: 1800-889-4422</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

