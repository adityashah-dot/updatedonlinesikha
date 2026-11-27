import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Star,
  Download,
  RefreshCw,
  Info,
  HelpCircle,
  Plus,
  PlusCircle,
  ThumbsUp,
  Headphones,
  Building2,
  CreditCard,
  Monitor,
  Briefcase,
  ChevronDown,
  Search,
  X,
  Check,
  GraduationCap,
  FileText,
  Sparkles,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { ALL_UNIVERSITIES } from "../data/universities";
import { getUniversitiesPayload, formatPackage, mapUniversity } from "../services/universityApi";

const DEGREE_OPTIONS = [
  { value: "all", label: "All Degrees (Institutional)", code: "ALL" },
  { value: "mba", label: "Online MBA (2 Years)", code: "MBA" },
  { value: "mca", label: "Online MCA (2 Years)", code: "MCA" },
  { value: "bba", label: "Online BBA (3 Years)", code: "BBA" },
  { value: "bca", label: "Online BCA (3 Years)", code: "BCA" },
  { value: "bcom", label: "Online B.Com (3 Years)", code: "B.Com" },
  { value: "mcom", label: "Online M.Com (2 Years)", code: "M.Com" },
  { value: "ma", label: "Online MA (2 Years)", code: "MA" },
];

const SLUG_ALIASES = {
  "lpu-online": ["lovely-professional-university-online", "lpu-online"],
  "amity-online": ["amity-university-online", "amity-online"],
  "cu-online": ["chandigarh-university-online", "cu-online"],
  "manipal-online": ["manipal-university-online", "mahe-manipal-university-online", "manipal-online"],
  "jain-online": ["jain-university-online", "jain-university-deemed-to-be-online-and-distance-learning", "jain-online"],
  "upes-online": ["upes-online"],
};

function normalizeUniversityProfile(uni, liveMap) {
  const aliases = SLUG_ALIASES[uni.id] || [uni.slug, uni.id];
  let live = null;
  for (const alias of aliases) {
    if (liveMap.has(alias)) {
      live = liveMap.get(alias);
      break;
    }
  }

  const rawNaac = uni.naacGrade || live?.naac || "NAAC A+";
  const shortNaacMatch = rawNaac.match(/NAAC\s+[A-Z+]+/i);
  const shortNaac = shortNaacMatch ? shortNaacMatch[0].toUpperCase() : rawNaac.split("(")[0].trim();
  const cgpaMatch = rawNaac.match(/\(([^)]+)\)/);
  const naacSub = cgpaMatch ? cgpaMatch[1] : "National Assessment & Accreditation Council";

  return {
    id: uni.id,
    slug: uni.slug || live?.slug || uni.id,
    name: uni.name,
    shortName: uni.shortName || live?.short || uni.name,
    location: uni.location || live?.location || "India",
    established: uni.established || live?.established || "—",
    logoImage: live?.logoImage || uni.logoImage || "",
    shortNaac,
    fullNaac: rawNaac,
    naacSub,
    nirfRanking: uni.nirfRanking || (live?.rankNote ? live.rankNote.replace(/\D+/g, "") : ""),
    approvals: Array.isArray(uni.approvals) && uni.approvals.length > 0 ? uni.approvals : live?.approvals || ["UGC-DEB Entitled"],
    feeRange: uni.quickStats?.feeRange || live?.feeRange || live?.feeLabel || "—",
    emiStarting: uni.quickStats?.emiStarting || (live?.minFee ? `₹${Math.round(live.minFee / 24).toLocaleString("en-IN")}/mo` : "Zero-Cost EMI Available"),
    mode: uni.quickStats?.mode || "100% Online Proctored",
    placementRate: uni.quickStats?.placementRate || "90% Placement Support",
    highestPackage: uni.quickStats?.highestPackage || (live?.highestPackage ? formatPackage(live.highestPackage) : "—"),
    avgPackage: uni.quickStats?.avgPackage || (live?.placementHighest ? formatPackage(live.placementHighest) : "—"),
    rating: uni.rating || "4.5",
    lmsName: uni.campusAndLms?.lmsName || `${uni.shortName || uni.name} Digital LMS`,
    lmsFeatures: uni.campusAndLms?.lmsFeatures || [
      "24/7 Recorded Lectures & E-Library Access",
      "Weekend Live Interactive Faculty Sessions",
      "AI-Proctored Home Remote Examinations",
    ],
    examPattern: uni.campusAndLms?.examPattern || [],
    scholarships: uni.feesAndFinancing?.scholarships || [],
    courses: Array.isArray(uni.courses) ? uni.courses : [],
    coursesCount: live?.coursesCount || (Array.isArray(uni.courses) ? uni.courses.length : 10),
    recruiters: uni.placements?.recruiters || [],
    supportServices: uni.placements?.supportServices || [],
    tagline: uni.tagline || "",
  };
}

function normalizeLiveOnlyUniversity(live) {
  const shortNaac = live.naac || "UGC Approved";
  const minFee = live.minFee || live.maxFee || 0;
  const estEmi = minFee > 0 ? `₹${Math.max(1800, Math.round(minFee / 24)).toLocaleString("en-IN")}/mo` : "Flexible EMI Plans";
  const perSem = minFee > 0 ? `₹${Math.round(minFee / 4).toLocaleString("en-IN")} / semester (est.)` : "Semester-wise Fee Plan";

  return {
    id: live.slug || live.id,
    slug: live.slug || live.id,
    name: live.name,
    shortName: live.name.replace(/\s+Online.*$/i, "").trim() || live.short,
    location: live.location || "India",
    established: live.established || "—",
    logoImage: live.logoImage || "",
    shortNaac,
    fullNaac: live.naac ? `${live.naac} Accredited` : "UGC-DEB Recognized",
    naacSub: live.established ? `Established in ${live.established}` : "Verified Statutory Recognition",
    nirfRanking: live.rankNote ? live.rankNote.replace(/\D+/g, "") : "",
    approvals: Array.isArray(live.approvals) && live.approvals.length > 0 ? live.approvals : ["UGC-DEB", "AIU"],
    feeRange: live.feeRange || live.feeLabel || "Fee on Request",
    perSemDefault: perSem,
    emiStarting: estEmi,
    mode: live.collegeMode === "distance" ? "Distance & Digital Learning" : "100% Online Proctored",
    placementRate: "100% Career Support",
    highestPackage: live.highestPackage ? formatPackage(live.highestPackage) : "Verified Placement Cell",
    avgPackage: live.placementHighest ? formatPackage(live.placementHighest) : "Industry Standard CTC",
    rating: "4.4",
    lmsName: `${live.short || "University"} Digital LMS Portal`,
    lmsFeatures: [
      "24/7 Recorded Video Lectures & Digital Study Material",
      "Weekend Live Doubt-Clearing & Faculty Mentorship",
    ],
    examPattern: [],
    scholarships: [
      { title: "Merit & Defense Scholarship", benefit: "Up to 20% Fee Waiver", description: "Armed forces, merit & early-bird concessions" },
    ],
    courses: [],
    coursesCount: live.coursesCount || 8,
    recruiters: [
      { name: "TCS" },
      { name: "Infosys" },
      { name: "Wipro" },
      { name: "Deloitte" },
      { name: "Cognizant" },
      { name: "Capgemini" },
    ],
    supportServices: ["Dedicated Placement Cell & Virtual Job Fairs with Resume Building Support"],
    tagline: "",
  };
}

export default function CompareMatrixPage({ onOpenApply, onOpenHelpDesk, onOpenBrochure }) {
  const navigate = useNavigate();
  const [selectedDegree, setSelectedDegree] = useState("mba");
  const [highlightDiffs, setHighlightDiffs] = useState(false);
  const [selectedIds, setSelectedIds] = useState(["lpu-online", "amity-online", "cu-online"]);
  const [liveUniversities, setLiveUniversities] = useState([]);
  const [swapSlotIndex, setSwapSlotIndex] = useState(null);
  const [swapSearch, setSwapSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    getUniversitiesPayload({ page: 1, sort: "nirf" })
      .then(async () => {
        // Fetch full list across online mode for the swap catalogue
        try {
          const res = await fetch(
            "https://api.degreefyd.com/api/b2c/website/colleges/listing?isCollgesNamesRequired=true&isCollgesLocationsRequired=true&mode=online&limit=200"
          );
          if (!res.ok) return;
          const json = await res.json();
          const rawList =
            json?.data?.onlineUniversities ||
            json?.data?.universities ||
            json?.data?.data ||
            json?.data ||
            [];
          if (!cancelled && Array.isArray(rawList)) {
            setLiveUniversities(rawList.map(mapUniversity));
          }
        } catch {
          // fallback to ALL_UNIVERSITIES when offline
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? "" : prev));
    }, 3500);
  };

  // Build unified catalogue of universities (rich profiles + live API records)
  const catalogue = useMemo(() => {
    const liveMap = new Map();
    for (const u of liveUniversities) {
      if (u.slug) liveMap.set(u.slug, u);
      if (u.id) liveMap.set(u.id, u);
    }

    const richProfiles = ALL_UNIVERSITIES.map((u) => normalizeUniversityProfile(u, liveMap));
    const usedSlugs = new Set(
      richProfiles.flatMap((u) => [u.id, u.slug, ...(SLUG_ALIASES[u.id] || [])])
    );

    const extraLive = liveUniversities
      .filter((u) => u.slug && !usedSlugs.has(u.slug))
      .map(normalizeLiveOnlyUniversity);

    return [...richProfiles, ...extraLive];
  }, [liveUniversities]);

  const activeUniversities = useMemo(() => {
    return selectedIds
      .map((id) => catalogue.find((u) => u.id === id || u.slug === id))
      .filter(Boolean);
  }, [selectedIds, catalogue]);

  const selectedDegreeObj = DEGREE_OPTIONS.find((d) => d.value === selectedDegree) || DEGREE_OPTIONS[0];

  // Helper to resolve course-specific or institutional fee & academic details for a university
  const getDegreeMetrics = (uni) => {
    if (selectedDegree === "all" || !uni.courses?.length) {
      const sampleSem = uni.courses?.[0]?.feePerSemester
        ? `From ${uni.courses[0].feePerSemester} / semester`
        : uni.perSemDefault || "Flexible semester fee structure";
      return {
        feeMain: uni.feeRange,
        feeSub: sampleSem,
        emiAmount: (uni.emiStarting || "").replace(/\/mo$/i, ""),
        courseTitle: "Master of Business Administration / Bachelor's & Master's",
        programsCountLabel: `${uni.coursesCount || uni.courses.length} Programs`,
        programsList:
          uni.courses.length > 0
            ? uni.courses.map((c) => c.code).join(", ")
            : "MBA, MCA, BBA, BCA, B.Com, M.Com, MA",
      };
    }

    const codeTarget = selectedDegreeObj.code.toLowerCase().replace(/[^a-z]/g, "");
    const matchedCourse =
      uni.courses.find(
        (c) =>
          c.code?.toLowerCase().replace(/[^a-z]/g, "") === codeTarget ||
          c.id?.toLowerCase().includes(codeTarget) ||
          c.name?.toLowerCase().includes(selectedDegreeObj.code.toLowerCase())
      ) || uni.courses[0];

    return {
      feeMain: matchedCourse?.totalFee || uni.feeRange,
      feeSub: matchedCourse?.feePerSemester
        ? `${matchedCourse.feePerSemester} / semester`
        : "Semester-wise payment plan",
      emiAmount: (uni.emiStarting || "").replace(/\/mo$/i, ""),
      courseTitle: matchedCourse?.name?.replace(/^Online\s+/i, "") || selectedDegreeObj.label,
      programsCountLabel: `${uni.coursesCount || uni.courses.length} Programs (${matchedCourse?.specializationsCount || matchedCourse?.specializations?.length || 4}+ Electives)`,
      programsList:
        matchedCourse?.specializations?.slice(0, 4).join(", ") ||
        uni.courses.map((c) => c.code).join(", "),
    };
  };

  const handleAddManipalSlot = () => {
    if (selectedIds.length >= 4) return;
    const fourthCandidate =
      !selectedIds.includes("manipal-online")
        ? "manipal-online"
        : !selectedIds.includes("jain-online")
          ? "jain-online"
          : "upes-online";
    setSelectedIds((prev) => [...prev, fourthCandidate]);
    const addedUni = catalogue.find((u) => u.id === fourthCandidate);
    showToast(`${addedUni?.name || "Manipal University Jaipur"} added. Matrix updated with 4 institutions.`);
  };

  const handleRemoveSlot = (indexToRemove) => {
    if (selectedIds.length <= 2) {
      showToast("Keep at least 2 universities in the comparison matrix.");
      return;
    }
    const removedUni = activeUniversities[indexToRemove];
    setSelectedIds((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    showToast(`Removed ${removedUni?.shortName || "university"} from comparison.`);
  };

  const handleSwapSelect = (newUniId) => {
    if (swapSlotIndex === null) return;
    setSelectedIds((prev) => prev.map((id, idx) => (idx === swapSlotIndex ? newUniId : id)));
    const newUni = catalogue.find((u) => u.id === newUniId);
    setSwapSlotIndex(null);
    setSwapSearch("");
    showToast(`Swapped column with ${newUni?.shortName || newUni?.name}.`);
  };

  const isFourCols = activeUniversities.length === 4;
  const gridTemplateClass = isFourCols
    ? "grid-cols-12 lg:grid-cols-[240px_repeat(4,minmax(0,1fr))]"
    : "grid-cols-12";
  const labelColClass = isFourCols ? "col-span-12 lg:col-span-1" : "col-span-12 lg:col-span-3";
  const uniColClass = isFourCols ? "col-span-6 lg:col-span-1" : "col-span-4 lg:col-span-3";
  const diffRowHighlight = highlightDiffs
    ? "bg-amber-50/80 ring-2 ring-amber-200/90"
    : "";

  const filteredCatalogue = useMemo(() => {
    const q = swapSearch.trim().toLowerCase();
    return catalogue.filter((u) => {
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q)
      );
    });
  }, [catalogue, swapSearch]);

  const mobileGridCols = isFourCols ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3";
  const identicalMobileDim = highlightDiffs ? "opacity-45" : "";

  return (
    <div className="w-full bg-[#F8FAFC] text-[#000f22] font-sans antialiased">
      {/* ===================================================================== */}
      {/* MOBILE COMPARE MATRIX VIEW (lg:hidden)                                */}
      {/* ===================================================================== */}
      <div className="lg:hidden flex flex-col w-full pb-8">
        {/* Top Ambient Banner / Breadcrumb & Controls */}
        <section className="px-4 pt-4 pb-2 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-[#74777e]">
            <ShieldCheck className="w-4 h-4 text-[#115eaf]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#43474d]">
              Decision Matrix
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold text-[#115eaf]">
              Compare {activeUniversities.length} Universities
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] leading-[30px] font-bold text-[#000f22] tracking-tight">
              Multi-University Matrix
            </h1>
            <p className="text-[13px] text-[#43474d] leading-snug">
              Evaluate NAAC credentials, statutory UGC approvals, transparent per-semester fee structures, and remote proctoring methods across accredited Indian universities.
            </p>
          </div>

          {/* Active Program Selector & Action Bar */}
          <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#e7eeff] flex flex-col gap-2 mt-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#eef6ff] border border-[#d5e3ff] flex items-center justify-center text-[#115eaf] shrink-0">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#74777e] leading-tight uppercase tracking-wider">
                    Benchmark Degree
                  </span>
                  <span className="text-[14px] font-bold text-[#000f22] truncate">
                    {selectedDegreeObj.label}
                  </span>
                </div>
              </div>

              <div className="relative shrink-0">
                <select
                  aria-label="Change Benchmark Degree"
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="appearance-none px-2.5 py-1.5 pr-6 rounded-lg bg-[#eff4ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold cursor-pointer focus:outline-none"
                >
                  {DEGREE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#115eaf] absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#eff4ff] rounded-lg p-2">
              {/* Interactive Differences Toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  role="switch"
                  aria-checked={highlightDiffs}
                  onClick={() => setHighlightDiffs((prev) => !prev)}
                  className={`w-9 h-5 rounded-full relative transition-colors flex items-center ${
                    highlightDiffs ? "bg-[#115eaf]" : "bg-[#c3c6d5]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                      highlightDiffs ? "translate-x-4.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-[11px] font-semibold text-[#000f22] flex items-center gap-1">
                  <span>Highlight Differences</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#115eaf] inline-block" />
                </span>
              </label>

              {/* PDF Export */}
              <button
                type="button"
                onClick={() => window.print()}
                aria-label="Export Matrix PDF"
                className="flex items-center gap-1 text-[11px] font-semibold text-[#115eaf] hover:text-[#084a8c] px-2.5 py-1 rounded bg-white border border-[#d5e3ff] shadow-2xs active:scale-95 transition-transform"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Matrix</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sticky Horizontal Universities Carousel Header */}
        <section className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md shadow-xs border-y border-[#e7eeff] py-2 px-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-[#74777e] flex items-center gap-1">
              <span>↔</span>
              <span>Swipe horizontally to inspect peers</span>
            </span>
            <span className="text-[11px] text-[#115eaf] font-bold bg-[#eef6ff] border border-[#d5e3ff] px-2 py-0.5 rounded-full">
              {activeUniversities.length} Selected
            </span>
          </div>

          {/* Scrollable Snapshot Cards */}
          <div className="flex gap-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory pb-1">
            {activeUniversities.map((uni, colIdx) => (
              <div
                key={`mob-card-${uni.id}-${colIdx}`}
                className="snap-start shrink-0 w-[240px] bg-white rounded-xl p-3 shadow-xs border border-[#e7eeff] flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#115eaf]/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] flex items-center justify-center font-bold text-[#115eaf] shrink-0 overflow-hidden shadow-2xs p-1">
                      {uni.logoImage ? (
                        <img
                          src={uni.logoImage}
                          alt={uni.shortName}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-[11px] tracking-tight">
                          {uni.shortName.slice(0, 4).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[14px] font-bold text-[#000f22] truncate">
                          {uni.shortName}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                      </div>
                      <span className="text-[11px] text-[#74777e] truncate">
                        {uni.name.split("(")[0].trim()}, {uni.location.split(",")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSwapSlotIndex(colIdx);
                        setSwapSearch("");
                      }}
                      title="Swap University"
                      className="p-1 rounded-md text-[#74777e] hover:text-[#115eaf] hover:bg-[#eff4ff]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    {activeUniversities.length > 3 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(colIdx)}
                        title="Remove University"
                        className="p-1 rounded-md text-[#74777e] hover:text-rose-600 hover:bg-rose-50"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-[#B45309] border border-amber-200/80 font-bold shadow-2xs">
                    {uni.shortNaac}
                  </span>
                  {uni.nirfRanking && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#eef6ff] text-[#115eaf] border border-[#d5e3ff] font-semibold">
                      NIRF #{uni.nirfRanking}
                    </span>
                  )}
                </div>

                <div className="mt-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(selectedDegree === "all" ? "mba" : selectedDegree)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-[#115eaf] text-white text-[11px] font-semibold text-center hover:bg-[#084a8c] active:scale-95 transition-all shadow-2xs"
                  >
                    Apply Now
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/universities/${uni.slug}`)}
                    aria-label={`Details ${uni.shortName}`}
                    className="w-7 h-7 rounded-lg bg-[#eff4ff] border border-[#d5e3ff] text-[#115eaf] flex items-center justify-center active:scale-95"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add 4th Slot Banner */}
          <div className="mt-2 px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#d5e3ff] flex items-center justify-between">
            <span className="text-[11px] text-[#43474d] truncate">
              {selectedIds.length < 4
                ? "Want to benchmark Manipal (MUJ Online) too?"
                : "4 UGC-DEB Universities Active in Matrix"}
            </span>
            {selectedIds.length < 4 ? (
              <button
                type="button"
                onClick={handleAddManipalSlot}
                className="text-[11px] text-[#115eaf] font-bold flex items-center gap-1 shrink-0 pl-2"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleRemoveSlot(3)}
                className="text-[11px] text-rose-600 font-bold shrink-0 pl-2"
              >
                Reset to 3
              </button>
            )}
          </div>
        </section>

        {/* Interactive Matrix Content: Stacked Comparison Sections */}
        <div className="px-4 flex flex-col gap-4 mt-4">
          {/* Category 1: Overview & Accreditations */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 text-[#B45309] flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-[#000f22]">
                    1. Overview &amp; Accreditations
                  </h2>
                  <span className="text-[11px] text-[#74777e]">
                    Statutory entitlements &amp; national rankings
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                All Verified
              </span>
            </div>

            {/* Metric Row 1: UGC DEB Approval (Identical) */}
            <div
              className={`rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] flex flex-col gap-2 transition-all ${identicalMobileDim}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22] flex items-center gap-1">
                  <span>UGC-DEB Statutory Status</span>
                  <HelpCircle className="w-3.5 h-3.5 text-[#74777e]" />
                </span>
                <span className="text-[10px] font-semibold text-[#74777e] uppercase">
                  Statutory Requirement
                </span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2`}>
                {activeUniversities.map((uni, idx) => (
                  <div
                    key={`m-ugc-${uni.id}-${idx}`}
                    className="flex flex-col bg-white p-2 rounded-lg text-center shadow-2xs border border-[#e7eeff]"
                  >
                    <span className="text-[10px] font-semibold text-[#74777e] truncate">
                      {uni.shortName}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>Entitled</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Row 2: NAAC Grade & CGPA (Differs) */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-[#000f22]">
                    NAAC Grade &amp; CGPA
                  </span>
                  <span className="text-[9px] bg-[#eef6ff] text-[#115eaf] px-1.5 py-0.5 rounded font-bold">
                    Key Diff
                  </span>
                </div>
                <span className="text-[11px] text-[#74777e]">Accredited</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2`}>
                {activeUniversities.map((uni, idx) => {
                  const isTopAPlusPlus = /A\+\+/i.test(uni.shortNaac);
                  return (
                    <div
                      key={`m-naac-${uni.id}-${idx}`}
                      className={`flex flex-col bg-white p-2 rounded-lg text-center shadow-2xs border ${
                        isTopAPlusPlus ? "border-amber-300 ring-1 ring-amber-200" : "border-[#e7eeff]"
                      }`}
                    >
                      <span className="text-[10px] font-semibold text-[#74777e] truncate">
                        {uni.shortName}
                      </span>
                      <span
                        className={`text-[13.5px] font-extrabold mt-0.5 ${
                          isTopAPlusPlus ? "text-[#B45309]" : "text-[#000f22]"
                        }`}
                      >
                        {uni.shortNaac.replace(/^NAAC\s+/i, "")}
                      </span>
                      <span className="text-[9.5px] text-[#43474d] truncate">{uni.naacSub}</span>
                      {isTopAPlusPlus && (
                        <span className="mt-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 rounded px-1">
                          Top Tier
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric Row 3: NIRF Ranking Band (Differs) */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  NIRF Ranking Band
                </span>
                <span className="text-[11px] text-[#74777e]">Ministry of Ed.</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2`}>
                {activeUniversities.map((uni, idx) => (
                  <div
                    key={`m-nirf-${uni.id}-${idx}`}
                    className="flex flex-col bg-white p-2 rounded-lg text-center shadow-2xs border border-[#e7eeff]"
                  >
                    <span className="text-[10px] font-semibold text-[#74777e] truncate">
                      {uni.shortName}
                    </span>
                    <span className="text-[14px] text-[#115eaf] font-bold mt-0.5">
                      {uni.nirfRanking ? `#${uni.nirfRanking}` : "Cat-1"}
                    </span>
                    <span className="text-[9px] text-[#74777e] truncate">
                      {uni.location.split(",")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Row 4: Global Mobility & WES */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Global Mobility &amp; Approvals
                </span>
                <span className="text-[11px] text-[#74777e]">US / Canada / Global</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2 text-[10px]`}>
                {activeUniversities.map((uni, idx) => (
                  <div
                    key={`m-wes-${uni.id}-${idx}`}
                    className="bg-white p-2 rounded-lg shadow-2xs border border-[#e7eeff] flex flex-col items-center text-center"
                  >
                    <span className="font-bold text-[#000f22] truncate w-full">
                      {uni.approvals[0] || "UGC-DEB"}
                    </span>
                    <span className="text-[#74777e] text-[9px] mt-0.5 truncate w-full">
                      {uni.approvals.slice(1, 3).join(" • ") || "AIU & WES"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category 2: Fees & Financial Aid Structure */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#eef6ff] border border-[#d5e3ff] text-[#115eaf] flex items-center justify-center">
                  <CreditCard className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-[#000f22]">
                    2. Fees &amp; Financial Aid
                  </h2>
                  <span className="text-[11px] text-[#74777e]">
                    Course fees, per-semester cost &amp; EMI options
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#115eaf] font-bold bg-[#eef6ff] border border-[#d5e3ff] px-2 py-0.5 rounded-full">
                0% EMI
              </span>
            </div>

            {/* Metric Row: Total Degree Cost */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  {selectedDegree === "all"
                    ? "Full Program Fee Range"
                    : `Full ${selectedDegreeObj.code} Program Fee`}
                </span>
                <span className="text-[11px] text-[#74777e]">All Semesters</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2`}>
                {activeUniversities.map((uni, idx) => {
                  const metrics = getDegreeMetrics(uni);
                  return (
                    <div
                      key={`m-fee-${uni.id}-${idx}`}
                      className="flex flex-col bg-white p-2.5 rounded-lg shadow-2xs border border-[#e7eeff]"
                    >
                      <span className="text-[10px] font-semibold text-[#74777e] truncate">
                        {uni.shortName}
                      </span>
                      <span className="text-[12.5px] text-[#000f22] font-extrabold mt-0.5 leading-tight">
                        {metrics.feeMain}
                      </span>
                      <span className="text-[9.5px] text-[#43474d] mt-0.5 truncate">
                        {metrics.feeSub}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric Row: 0% Interest EMI Scheme */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Monthly Outflow (0% EMI)
                </span>
                <span className="text-[11px] text-[#74777e]">No Collateral</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2`}>
                {activeUniversities.map((uni, idx) => {
                  const metrics = getDegreeMetrics(uni);
                  return (
                    <div
                      key={`m-emi-${uni.id}-${idx}`}
                      className="flex flex-col bg-white p-2 rounded-lg text-center shadow-2xs border border-[#e7eeff]"
                    >
                      <span className="text-[10px] font-semibold text-[#74777e] truncate">
                        {uni.shortName}
                      </span>
                      <span className="text-[12.5px] text-[#115eaf] font-bold mt-0.5">
                        {metrics.emiAmount}
                        <span className="text-[9px] font-normal text-[#74777e]">/mo</span>
                      </span>
                      <span className="text-[9px] text-[#74777e]">12-24 mos tenure</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric Row: Merit & Need Scholarships */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Scholarship Discretion
                </span>
                <span className="text-[11px] text-[#74777e]">Merit &amp; Defense</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2 text-center text-[10px]`}>
                {activeUniversities.map((uni, idx) => {
                  const topSch = uni.scholarships?.[0];
                  return (
                    <div
                      key={`m-sch-${uni.id}-${idx}`}
                      className="bg-white p-2 rounded-lg shadow-2xs border border-[#e7eeff] flex flex-col"
                    >
                      <span className="font-bold text-[#000f22] truncate">
                        {topSch?.benefit || "Up to 25%"}
                      </span>
                      <span className="text-[#74777e] text-[9px] mt-0.5 truncate">
                        {topSch?.title || "Defense & Merit"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category 3: Academics, Delivery & Examination */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#e6eeff] text-[#115eaf] flex items-center justify-center">
                  <Monitor className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-[#000f22]">
                    3. Academics &amp; Exams
                  </h2>
                  <span className="text-[11px] text-[#74777e]">
                    LMS platform, live interaction &amp; testing
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#43474d] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full">
                100% Online
              </span>
            </div>

            {/* Metric: Remote Proctoring Mode */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Exam Execution Method
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  Zero Campus Visits
                </span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2 text-[10px]`}>
                {activeUniversities.map((uni, idx) => (
                  <div
                    key={`m-exam-${uni.id}-${idx}`}
                    className="bg-white p-2.5 rounded-lg shadow-2xs border border-[#e7eeff] flex flex-col text-center"
                  >
                    <span className="text-[10px] font-semibold text-[#74777e] truncate">
                      {uni.shortName}
                    </span>
                    <span className="font-bold text-[#000f22] mt-1 leading-tight">
                      {uni.mode.replace(/·.*$/, "").trim()}
                    </span>
                    <span className="text-[#74777e] text-[9px] mt-0.5">AI Proctored</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric: LMS Mobile App Score */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Mobile Learning Tech (LMS)
                </span>
                <span className="text-[11px] text-[#74777e]">App Store Rating</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2 text-center`}>
                {activeUniversities.map((uni, idx) => (
                  <div
                    key={`m-lms-${uni.id}-${idx}`}
                    className="bg-white p-2 rounded-lg shadow-2xs border border-[#e7eeff] flex flex-col items-center"
                  >
                    <span className="text-[10px] font-semibold text-[#74777e] truncate w-full">
                      {uni.lmsName.replace(/\s+LMS.*$/i, "")}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-[12px] text-[#000f22] font-bold">{uni.rating}</span>
                    </div>
                    <span className="text-[9px] text-[#74777e] truncate w-full">
                      {uni.coursesCount}+ Programs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category 4: Placements & Career Services */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <Briefcase className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-[#000f22]">
                  4. Placements &amp; Careers
                </h2>
                <span className="text-[11px] text-[#74777e]">
                  Corporate tie-ups, career fairs &amp; job support
                </span>
              </div>
            </div>

            {/* Placement Support & Highest CTC */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Highest CTC &amp; Support
                </span>
                <span className="text-[11px] text-[#74777e]">Dedicated Desk</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2 text-[10px]`}>
                {activeUniversities.map((uni, idx) => (
                  <div
                    key={`m-plc-${uni.id}-${idx}`}
                    className="bg-white p-2 rounded-lg shadow-2xs border border-[#e7eeff] flex flex-col text-center"
                  >
                    <span className="text-[10px] font-semibold text-[#74777e] truncate">
                      {uni.shortName}
                    </span>
                    <span className="font-extrabold text-emerald-700 text-[12px] mt-1">
                      {uni.highestPackage}
                    </span>
                    <span className="text-[#74777e] text-[9px] mt-0.5 truncate">
                      {uni.avgPackage && uni.avgPackage !== "—"
                        ? `Avg ${uni.avgPackage}`
                        : "100% Career Cell"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent Recruiters */}
            <div className="rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] border-l-4 border-l-[#115eaf] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Top Hiring Partners
                </span>
                <span className="text-[11px] text-[#74777e]">Corporate Network</span>
              </div>
              <div className={`grid ${mobileGridCols} gap-2 text-[10px] text-[#43474d]`}>
                {activeUniversities.map((uni, idx) => {
                  const topRecs =
                    uni.recruiters?.length > 0
                      ? uni.recruiters.slice(0, 3).map((r) => r.name)
                      : ["Amazon", "TCS", "Deloitte"];
                  return (
                    <div
                      key={`m-rec-${uni.id}-${idx}`}
                      className="bg-white p-2 rounded-lg shadow-2xs border border-[#e7eeff] flex flex-col gap-0.5"
                    >
                      <span className="font-bold text-[#115eaf] text-[10.5px] truncate">
                        {uni.shortName}
                      </span>
                      {topRecs.map((rName) => (
                        <span key={rName} className="truncate">
                          {rName}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Degree Equivalence (Identical) */}
            <div
              className={`rounded-xl p-3 bg-[#F8FAFC] border border-[#e7eeff] flex flex-col gap-1.5 transition-all ${identicalMobileDim}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#000f22]">
                  Degree Wording Equivalence
                </span>
                <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  100% Equal
                </span>
              </div>
              <p className="text-[11px] text-[#43474d] leading-snug">
                As per UGC Gazette notifications, online degrees awarded by{" "}
                {activeUniversities.map((u) => u.shortName).join(", ")} hold legal and statutory
                equivalence with on-campus full-time regular degrees for all Central/State Govt
                appointments and corporate roles.
              </p>
            </div>
          </div>

          {/* Section 5: Strategic Decision Guide ("Choose If...") */}
          <div className="flex flex-col gap-2.5 mt-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#115eaf]" />
              <div>
                <h2 className="text-base font-bold text-[#000f22]">Recommendation Verdict</h2>
                <p className="text-[11px] text-[#74777e]">
                  Tailor your pick based on your career trajectory
                </p>
              </div>
            </div>

            {activeUniversities.map((uni, idx) => {
              const metrics = getDegreeMetrics(uni);
              return (
                <div
                  key={`m-verdict-${uni.id}-${idx}`}
                  className="bg-white rounded-xl p-4 shadow-xs border border-[#e7eeff] flex flex-col gap-2 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-[#eef6ff] border border-[#d5e3ff] text-[#115eaf] font-bold text-[11px] flex items-center justify-center shrink-0">
                        {uni.shortName.slice(0, 3).toUpperCase()}
                      </div>
                      <span className="text-[15px] font-bold text-[#000f22] truncate">
                        Choose {uni.shortName} if...
                      </span>
                    </div>
                    <span className="text-[10px] text-[#B45309] bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full font-bold shrink-0">
                      {uni.shortNaac}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#43474d] leading-relaxed">
                    You prioritize <strong className="text-[#000f22]">{uni.shortNaac}</strong>{" "}
                    accreditation
                    {uni.nirfRanking ? ` and NIRF Rank #${uni.nirfRanking}` : ""}, desire a highly
                    rated LMS ({uni.lmsName} {uni.rating}★), and look for an optimal fee structure
                    of <strong className="text-[#000f22]">{metrics.feeMain}</strong> ({metrics.feeSub}
                    ).
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(selectedDegree === "all" ? "mba" : selectedDegree)}
                    className="mt-1 self-start text-[12px] text-[#115eaf] font-bold flex items-center gap-1"
                  >
                    <span>Apply to {uni.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Neutral Guidance Desk Banner */}
          <div className="bg-gradient-to-br from-[#115eaf] to-[#084a8c] text-white rounded-2xl p-4 shadow-md flex flex-col gap-2.5 mt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold leading-snug">
                  Unsure Which One Fits Your Goal?
                </h3>
                <span className="text-[11px] text-white/85">
                  Get neutral, unbiased advisory from certified academic counselors.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <button
                type="button"
                onClick={() => onOpenHelpDesk?.()}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-[#115eaf] text-[13px] font-bold text-center active:scale-[0.98] transition-transform shadow-xs flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free 1-on-1 Guidance</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenBrochure?.()}
                className="w-full py-2 px-4 rounded-xl bg-white/15 text-white text-[12px] font-semibold text-center hover:bg-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Comparative PDF Report</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1 text-white/80 text-[10px] font-semibold">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" /> 100% Free
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" /> No Spam Calls
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" /> UGC Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* DESKTOP COMPARE MATRIX VIEW (hidden lg:block)                         */}
      {/* ===================================================================== */}
      <div className="hidden lg:block">
      {/* Top Command & Filter Deck */}
      <section className="w-full bg-[#eef4ff]/70 py-6 border-b border-[#e7eeff]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Breadcrumb & Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#43474d] text-[13px]">
              <Link to="/" className="hover:text-[#115eaf] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-[#74777e]" />
              <Link to="/universities" className="hover:text-[#115eaf] transition-colors">
                Student Tools
              </Link>
              <ChevronRight className="w-4 h-4 text-[#74777e]" />
              <span className="font-semibold text-[#000f22]">Compare Matrix</span>
            </nav>

            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-semibold tracking-wide">
                UGC-DEB Statutory Equivalency Guaranteed (Gazette Reg. 22)
              </span>
            </div>
          </div>

          {/* Action Panel Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-white p-6 rounded-xl shadow-xs border border-[#e7eeff]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#115eaf] font-bold">
                Institutional Benchmark Engine
              </span>
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#000f22] tracking-tight mt-1 leading-tight">
                Multi-University Decision Matrix
              </h1>
              <p className="text-[13px] text-[#43474d] mt-1 max-w-2xl leading-relaxed">
                Evaluate NAAC credentials, statutory UGC approvals, transparent per-semester fee structures, and remote proctoring methods across accredited Indian universities.
              </p>
            </div>

            {/* Matrix Control Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Degree Selector */}
              <div className="relative min-w-[215px]">
                <label
                  htmlFor="degreeFilter"
                  className="block text-[11px] font-semibold text-[#74777e] mb-1"
                >
                  Target Degree
                </label>
                <div className="relative">
                  <select
                    id="degreeFilter"
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    className="w-full appearance-none bg-[#f8f9ff] border border-[#d5e3ff] text-[13px] font-semibold text-[#000f22] px-3.5 py-2.5 rounded-lg pr-9 shadow-2xs focus:outline-none focus:border-[#115eaf] cursor-pointer"
                  >
                    {DEGREE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-[#74777e]" />
                </div>
              </div>

              {/* Highlight Differences Switch */}
              <div className="flex flex-col justify-end">
                <span className="block text-[11px] font-semibold text-[#74777e] mb-1">
                  Contrast Mode
                </span>
                <button
                  type="button"
                  onClick={() => setHighlightDiffs((prev) => !prev)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border transition-all shadow-2xs text-[13px] font-semibold cursor-pointer ${
                    highlightDiffs
                      ? "bg-[#eef6ff] border-[#115eaf] text-[#115eaf] font-bold"
                      : "bg-[#f8f9ff] border-[#d5e3ff] text-[#43474d] hover:text-[#115eaf]"
                  }`}
                >
                  <span
                    className={`w-7 h-4 rounded-full relative transition-colors flex items-center ${
                      highlightDiffs ? "bg-[#115eaf]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full bg-white shadow-xs transform transition-transform ${
                        highlightDiffs ? "translate-x-3.5" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                  <span>Highlight Differences</span>
                </button>
              </div>

              {/* Export Spec Sheet */}
              <div className="flex flex-col justify-end">
                <span className="block text-[11px] font-semibold text-transparent mb-1 select-none">
                  Print
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#eef6ff] border border-[#d5e3ff] text-[#115eaf] hover:bg-[#115eaf] hover:text-white transition-colors text-[13px] font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF Matrix</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Comparison Layout */}
      <section className="w-full pb-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 mt-4">
          {/* Matrix Master Container */}
          <div className="bg-white rounded-xl shadow-xs border border-[#e7eeff] overflow-hidden">
            {/* Sticky University Crest / Header Rack */}
            <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#e7eeff] transition-all duration-200">
              <div className={`grid ${gridTemplateClass} gap-4 p-4 items-stretch`}>
                {/* Left Header Legend Slot */}
                <div className={`${labelColClass} pr-2 hidden lg:flex flex-col justify-center`}>
                  <span className="text-[11px] text-[#74777e] uppercase tracking-wider font-semibold">
                    Selected For Benchmark
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-bold text-[#000f22]">
                      {activeUniversities.length} of 4 Universities
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-[#eef6ff] text-[#115eaf] font-bold border border-[#d5e3ff]">
                      Active
                    </span>
                  </div>
                  <p className="text-[12px] text-[#74777e] mt-0.5">
                    Parameters verified with UGC-DEB 2025-26 notification
                  </p>
                </div>

                {/* University Header Columns */}
                {activeUniversities.map((uni, colIdx) => (
                  <div
                    key={`${uni.id}-${colIdx}`}
                    className={`${uniColClass} bg-[#f8f9ff] border border-[#e7eeff] p-3 rounded-lg flex flex-col justify-between relative group hover:border-[#115eaf]/50 transition-colors`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#e7eeff] flex items-center justify-center shadow-2xs shrink-0 overflow-hidden p-1">
                        {uni.logoImage ? (
                          <img
                            src={uni.logoImage}
                            alt={uni.shortName}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-[#115eaf]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="inline-flex px-1.5 py-0.5 rounded text-[10.5px] bg-amber-50 text-[#B45309] border border-amber-200/80 font-bold truncate">
                            {uni.shortNaac}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSwapSlotIndex(colIdx);
                                setSwapSearch("");
                              }}
                              title="Swap University"
                              className="p-1 rounded hover:bg-[#e7eeff] text-[#74777e] hover:text-[#115eaf] transition-colors cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            {activeUniversities.length > 3 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSlot(colIdx)}
                                title="Remove Column"
                                className="p-1 rounded hover:bg-rose-50 text-[#74777e] hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <h3
                          className="text-base font-bold text-[#000f22] truncate mt-0.5"
                          title={uni.name}
                        >
                          {uni.shortName}
                        </h3>
                        <p className="text-[12px] text-[#74777e] truncate" title={uni.location}>
                          {uni.name.split("(")[0].trim()}, {uni.location.split(",")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#e7eeff] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenApply?.(selectedDegree === "all" ? "mba" : selectedDegree)}
                        className="flex-1 text-center py-1.5 px-2 bg-[#115eaf] hover:bg-[#084a8c] text-white rounded text-[13px] font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        Apply Now
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/universities/${uni.slug}`)}
                        title="View University Overview & Syllabus"
                        className="p-1.5 rounded border border-[#d5e3ff] bg-white hover:bg-[#eef6ff] text-[#43474d] hover:text-[#115eaf] transition-colors cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MATRIX BODY */}
            <div className="w-full">
              {/* Category 1: Overview & Statutory Recognition */}
              <div>
                <div className="bg-[#e6eeff] px-4 py-2.5 flex items-center justify-between border-b border-[#d5e3ff]">
                  <div className="flex items-center gap-2 text-[#115eaf] text-base font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <span>1. Overview &amp; Statutory Recognition</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#43474d]">
                    {activeUniversities.length} Data Nodes Verified
                  </span>
                </div>

                {/* Row 1.1: UGC-DEB Status */}
                <div
                  className={`grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 hover:bg-[#f8f9ff]/60 transition-colors`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22] flex items-center gap-1.5">
                      <span>UGC-DEB Entitlement Status</span>
                      <HelpCircle
                        className="w-3.5 h-3.5 text-[#74777e]"
                        title="Valid for Govt Exams and Higher Studies"
                      />
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Mandatory Distance Ed Bureau Approval
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`ugc-${uni.id}-${idx}`} className={uniColClass}>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12.5px] font-semibold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>UGC-DEB Entitled ({uni.established})</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 1.2: NAAC Accreditation & Score (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22] flex items-center gap-1.5">
                      <span>NAAC Grade &amp; CGPA</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#eef6ff] text-[#115eaf] font-bold uppercase">
                        Differs
                      </span>
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      National Assessment &amp; Accreditation Council
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`naac-${uni.id}-${idx}`} className={uniColClass}>
                      <div className="text-base font-bold text-[#000f22]">{uni.shortNaac} Grade</div>
                      <div className="text-[12.5px] text-[#43474d]">{uni.naacSub}</div>
                    </div>
                  ))}
                </div>

                {/* Row 1.3: NIRF Ranking Band (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 bg-[#f8f9ff]/30 hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      NIRF Ranking Band
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Ministry of Education, Govt of India
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`nirf-${uni.id}-${idx}`} className={uniColClass}>
                      <span className="inline-flex px-2 py-0.5 rounded text-[12.5px] bg-amber-50 text-[#B45309] border border-amber-200/80 font-bold">
                        {uni.nirfRanking ? `Rank #${uni.nirfRanking} (NIRF)` : "UGC Category-1 Ranked"}
                      </span>
                      <div className="text-[12.5px] text-[#43474d] mt-1">
                        {uni.location}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 1.4: International Credential Recognition */}
                <div
                  className={`grid ${gridTemplateClass} gap-4 p-4 items-center hover:bg-[#f8f9ff]/60 transition-colors`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      Global Mobility &amp; Approvals
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Statutory &amp; global migration equivalency
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`app-${uni.id}-${idx}`} className={`${uniColClass} flex flex-wrap gap-1.5`}>
                      {uni.approvals.slice(0, 4).map((app) => (
                        <span
                          key={app}
                          className="px-2 py-0.5 rounded text-xs bg-[#e6eeff] text-[#000f22] font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Fees & Financial Aid */}
              <div className="border-t border-[#e7eeff]">
                <div className="bg-[#e6eeff] px-4 py-2.5 flex items-center justify-between border-b border-[#d5e3ff]">
                  <div className="flex items-center gap-2 text-[#115eaf] text-base font-bold">
                    <CreditCard className="w-5 h-5" />
                    <span>2. Fees &amp; Financial Aid Structure</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#43474d]">
                    Zero Cost EMI Options Enabled
                  </span>
                </div>

                {/* Row 2.1: Total Degree Fee (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22] flex items-center gap-1.5">
                      <span>
                        {selectedDegree === "all"
                          ? "Full Course Fee Range"
                          : `${selectedDegreeObj.code} Total Program Fee`}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#eef6ff] text-[#115eaf] font-bold uppercase">
                        Differs
                      </span>
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Inclusive of registration &amp; online exams
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => {
                    const metrics = getDegreeMetrics(uni);
                    return (
                      <div key={`fee-${uni.id}-${idx}`} className={uniColClass}>
                        <div className="text-lg font-bold text-[#000f22] tracking-tight">
                          {metrics.feeMain}
                        </div>
                        <div className="text-[12.5px] text-[#43474d] mt-0.5">{metrics.feeSub}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Row 2.2: 0% Interest Monthly EMI (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 bg-[#f8f9ff]/30 hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      0% Interest EMI Scheme
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      No-cost monthly installment plan
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => {
                    const metrics = getDegreeMetrics(uni);
                    return (
                      <div key={`emi-${uni.id}-${idx}`} className={uniColClass}>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-extrabold text-[#115eaf]">
                            {metrics.emiAmount}
                          </span>
                          <span className="text-[12px] text-[#74777e]">/ month</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          0% interest • 12/24 mo tenor
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Row 2.3: Scholarship Concessions */}
                <div
                  className={`grid ${gridTemplateClass} gap-4 p-4 items-center hover:bg-[#f8f9ff]/60 transition-colors`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      Scholarship Concessions
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Defense, Merit, &amp; Special categories
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => {
                    const topSch = uni.scholarships?.[0];
                    return (
                      <div key={`sch-${uni.id}-${idx}`} className={uniColClass}>
                        <span className="text-[13.5px] font-semibold text-[#000f22]">
                          {topSch?.benefit || "Up to 25% Fee Waiver"}
                        </span>
                        <p className="text-[12px] text-[#74777e] mt-0.5 line-clamp-2">
                          {topSch?.title
                            ? `${topSch.title} — ${topSch.description || "Defense, merit & early bird"}`
                            : "Armed personnel, merit & early bird grants"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: Academics & Examination Engine */}
              <div className="border-t border-[#e7eeff]">
                <div className="bg-[#e6eeff] px-4 py-2.5 flex items-center justify-between border-b border-[#d5e3ff]">
                  <div className="flex items-center gap-2 text-[#115eaf] text-base font-bold">
                    <Monitor className="w-5 h-5" />
                    <span>3. Academics, Delivery &amp; Examination</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#43474d]">
                    No Campus Visits Mandatory
                  </span>
                </div>

                {/* Row 3.1: Examination Proctoring Mode (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22] flex items-center gap-1.5">
                      <span>Exam Execution Method</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#eef6ff] text-[#115eaf] font-bold uppercase">
                        Differs
                      </span>
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Evaluation modality for term-end exams
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`exam-${uni.id}-${idx}`} className={uniColClass}>
                      <div className="text-[15px] font-bold text-[#000f22]">{uni.mode}</div>
                      <div className="text-[12px] text-[#43474d] mt-0.5">
                        {uni.examPattern?.[0]?.description ||
                          "AI-proctored online exams from home with flexible slot booking"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 3.2: LMS Architecture & Mobile App */}
                <div
                  className={`grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 bg-[#f8f9ff]/30 hover:bg-[#f8f9ff]/60 transition-colors`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      LMS Mobile App &amp; Tech
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Student portal &amp; digital learning ratings
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`lms-${uni.id}-${idx}`} className={uniColClass}>
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#000f22]">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                        <span>
                          {uni.rating} / 5.0 ({uni.lmsName})
                        </span>
                      </div>
                      <div className="text-[12px] text-[#43474d] mt-0.5 line-clamp-2">
                        {uni.lmsFeatures?.[0] || "Recorded lectures, e-library & live weekend sessions"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 3.3: Total Online Degrees Offered (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      {selectedDegree === "all"
                        ? "Total Accredited Online Degrees"
                        : `${selectedDegreeObj.code} Specializations & Tracks`}
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      UG &amp; PG authorized programs
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => {
                    const metrics = getDegreeMetrics(uni);
                    return (
                      <div key={`prog-${uni.id}-${idx}`} className={uniColClass}>
                        <div className="text-[15px] font-bold text-[#000f22]">
                          {metrics.programsCountLabel}
                        </div>
                        <div className="text-[12px] text-[#43474d] mt-0.5 line-clamp-2">
                          {metrics.programsList}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 4: Placements & Career Services */}
              <div className="border-t border-[#e7eeff]">
                <div className="bg-[#e6eeff] px-4 py-2.5 flex items-center justify-between border-b border-[#d5e3ff]">
                  <div className="flex items-center gap-2 text-[#115eaf] text-base font-bold">
                    <Briefcase className="w-5 h-5" />
                    <span>4. Placements &amp; Career Services</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#43474d]">
                    Alumni Network &amp; Job Fairs
                  </span>
                </div>

                {/* Row 4.1: Highest CTC & Placement Drive (DIFFERENCE ROW) */}
                <div
                  className={`diff-row grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 hover:bg-[#f8f9ff]/60 transition-colors ${diffRowHighlight}`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22] flex items-center gap-1.5">
                      <span>Highest CTC &amp; Placement Support</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#eef6ff] text-[#115eaf] font-bold uppercase">
                        Differs
                      </span>
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Verified placement cell &amp; career outcomes
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`ctc-${uni.id}-${idx}`} className={uniColClass}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-extrabold text-emerald-700">
                          {uni.highestPackage}
                        </span>
                        {uni.avgPackage && uni.avgPackage !== "—" && (
                          <span className="text-[11.5px] font-semibold text-[#43474d] bg-[#f0f3ff] px-2 py-0.5 rounded">
                            Avg: {uni.avgPackage}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#43474d] mt-1 line-clamp-2">
                        {uni.supportServices?.[0] ||
                          "Dedicated placement assistance, mock interviews & virtual job fairs"}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Row 4.2: Hiring Partners Track Record */}
                <div
                  className={`grid ${gridTemplateClass} gap-4 p-4 items-center border-b border-[#e7eeff]/70 bg-[#f8f9ff]/30 hover:bg-[#f8f9ff]/60 transition-colors`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      Prominent Recruiters
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Corporate recruitment partners
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => (
                    <div key={`rec-${uni.id}-${idx}`} className={uniColClass}>
                      <div className="text-[12.5px] text-[#000f22] font-medium leading-relaxed">
                        {uni.recruiters?.length > 0
                          ? uni.recruiters
                              .slice(0, 6)
                              .map((r) => r.name)
                              .join(", ")
                          : "Amazon, TCS, Deloitte, Cognizant, Infosys, Wipro"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 4.3: Degree Certificate Validity Note */}
                <div
                  className={`grid ${gridTemplateClass} gap-4 p-4 items-center hover:bg-[#f8f9ff]/60 transition-colors`}
                >
                  <div className={labelColClass}>
                    <div className="text-[13px] font-semibold text-[#000f22]">
                      Final Degree Wording
                    </div>
                    <div className="text-[12px] text-[#74777e]">
                      Statutory equivalence to on-campus degrees
                    </div>
                  </div>
                  {activeUniversities.map((uni, idx) => {
                    const metrics = getDegreeMetrics(uni);
                    return (
                      <div key={`deg-${uni.id}-${idx}`} className={uniColClass}>
                        <div className="text-[12.5px] text-[#43474d] leading-relaxed">
                          UGC Compliant: Conferred by{" "}
                          <strong className="text-[#000f22]">{uni.shortName}</strong> as{" "}
                          <strong className="text-[#000f22]">{metrics.courseTitle}</strong>; identical
                          validity for Govt / PSU jobs, UPSC &amp; global higher studies.
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Action Shelf */}
              <div className="bg-[#eff4ff] p-4 border-t border-[#d5e3ff] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-[#43474d]">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#d5e3ff] flex items-center justify-center text-[#115eaf] shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[13.5px] font-bold text-[#000f22] block">
                      Need neutral, unbiased academic counseling?
                    </span>
                    <span className="text-[12px] text-[#43474d]">
                      Our certified educational advisors evaluate your specific work experience, budget, and career goals.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.()}
                    className="px-4 py-2.5 rounded-lg bg-white border border-[#d5e3ff] text-[#000f22] hover:bg-[#f8f9ff] hover:border-[#115eaf] text-[13px] font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    Download Comparative PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenHelpDesk?.()}
                    className="px-4 py-2.5 rounded-lg bg-[#115eaf] text-white hover:bg-[#084a8c] text-[13px] font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Book Free 1-on-1 Guidance
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Add University 4th Comparison Slot / Upsell Drawer */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-xs border border-dashed border-[#c2daff] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ff] border border-[#d5e3ff] flex items-center justify-center text-[#115eaf] shrink-0">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#000f22]">
                  {selectedIds.length < 4
                    ? "Want to benchmark Manipal University Jaipur (MUJ Online) too?"
                    : "4 UGC-DEB Universities Active in Comparison Matrix"}
                </h4>
                <p className="text-[13px] text-[#74777e] mt-0.5">
                  OnlineSiksha allows you to compare up to 4 UGC-DEB accredited institutions side-by-side, or swap any column above.
                </p>
              </div>
            </div>
            {selectedIds.length < 4 ? (
              <button
                type="button"
                onClick={handleAddManipalSlot}
                className="px-5 py-2.5 rounded-lg bg-white text-[#115eaf] hover:bg-[#115eaf] hover:text-white border border-[#115eaf] transition-all text-[13px] font-semibold flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Manipal (MUJ) to Matrix</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[13px] font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>4 of 4 Slots Loaded</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(3)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-[#43474d] hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                >
                  Reset to 3 Columns
                </button>
              </div>
            )}
          </div>

          {/* Quick Decision Guide Widget */}
          <div
            className={`grid grid-cols-1 ${
              isFourCols ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
            } gap-4 mt-6`}
          >
            {activeUniversities.map((uni, idx) => {
              const metrics = getDegreeMetrics(uni);
              return (
                <div
                  key={`guide-${uni.id}-${idx}`}
                  className="bg-white p-5 rounded-xl shadow-xs border border-[#e7eeff] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[#115eaf] text-base font-bold mb-2">
                      <ThumbsUp className="w-4 h-4 shrink-0" />
                      <span>Choose {uni.shortName} If...</span>
                    </div>
                    <p className="text-[13px] text-[#43474d] leading-relaxed">
                      You prioritize <strong className="text-[#000f22]">{uni.shortNaac}</strong>{" "}
                      accreditation
                      {uni.nirfRanking ? ` and NIRF Rank #${uni.nirfRanking}` : ""}, seek a transparent
                      fee structure ({metrics.feeMain} • {uni.emiStarting} EMI), and value{" "}
                      {uni.lmsName} digital delivery with{" "}
                      <strong className="text-[#000f22]">{uni.highestPackage}</strong> top placement
                      outcomes.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#f0f3ff] flex items-center justify-between text-xs">
                    <Link
                      to={`/universities/${uni.slug}`}
                      className="font-semibold text-[#115eaf] hover:underline"
                    >
                      Explore {uni.shortName} →
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpenApply?.(selectedDegree === "all" ? "mba" : selectedDegree)}
                      className="font-semibold text-[#43474d] hover:text-[#115eaf] cursor-pointer"
                    >
                      Free Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>

      {/* Swap University Modal Picker */}
      {swapSlotIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSwapSlotIndex(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#e7eeff] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-[#f0f3ff] border-b border-[#e7eeff] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#000f22]">
                  Select University for Benchmark Slot #{swapSlotIndex + 1}
                </h3>
                <p className="text-xs text-[#43474d]">
                  Choose from {catalogue.length} UGC-DEB verified universities
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSwapSlotIndex(null)}
                className="p-1.5 rounded-lg text-[#74777e] hover:text-[#000f22] hover:bg-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-[#e7eeff]">
              <div className="relative">
                <Search className="w-4 h-4 text-[#74777e] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={swapSearch}
                  onChange={(e) => setSwapSearch(e.target.value)}
                  placeholder="Search university by name or city..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#d5e3ff] text-sm text-[#000f22] outline-none focus:border-[#115eaf]"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-[340px] overflow-y-auto divide-y divide-[#f0f3ff] p-2">
              {filteredCatalogue.map((u) => {
                const isAlreadySelected = selectedIds.includes(u.id);
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleSwapSelect(u.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isAlreadySelected
                        ? "bg-[#eef6ff] text-[#115eaf]"
                        : "hover:bg-[#f8f9ff] text-[#000f22]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center shrink-0 overflow-hidden p-1">
                        {u.logoImage ? (
                          <img
                            src={u.logoImage}
                            alt={u.shortName}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Building2 className="w-4 h-4 text-[#115eaf]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold truncate">{u.name}</div>
                        <div className="text-[11px] text-[#74777e] truncate">
                          {u.location} • {u.shortNaac} • {u.feeRange}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#115eaf] shrink-0">
                      {isAlreadySelected ? "Active" : "Select →"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#000f22] text-white px-4 py-3 rounded-xl shadow-xl text-[13px] font-semibold flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
