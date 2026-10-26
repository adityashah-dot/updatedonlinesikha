import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  ArrowRight,
  Download,
  CheckCircle,
  ChevronRight,
  Headphones,
  GraduationCap,
  Wallet,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { HomeFaq } from "./HomeFaq";
import { TopCollegesByLocation } from "./TopCollegesByLocation";
import { StudentTestimonials } from "./StudentTestimonials";
import { PopularCoursesMobile } from "./PopularCoursesMobile";
import { BlogsListSection } from "./BlogsListSection";
import { LpuCompareSection } from "./LpuCompareSection";
const TRENDING_FILTERS = [
  "NAAC A++ Only",
  "Under \u20B91 Lakh Total",
  "Zero-Cost EMI",
  "100% Online Exam"
];
const HERO_METRICS = [
  { value: "50+", label: "Entitled Universities" },
  { value: "180+", label: "Recognized Degrees" },
  { value: "5,00,000+", label: "Students Guided", tone: "text-[#115eaf]" },
  { value: "100%", label: "Zero-Cost EMI Options", tone: "text-emerald-700" }
];
const DEGREE_CATEGORIES = ["Master's (PG)", "Bachelor's (UG)", "Executive Tracks"];
const DEGREE_CARDS = [
  {
    title: "Online MBA",
    subtitle: "Master of Business Administration",
    duration: "2 Years \u2022 4 Sems",
    badge: "High Placement Rate",
    badgeTone: "text-emerald-700 bg-emerald-50 border-emerald-200",
    rows: [
      { label: "Specializations:", value: "19+ (Data, Finance, Marketing, HR)" },
      { label: "Avg Career CTC:", value: "\u20B97.2 - 14.5 LPA", tone: "text-[#115eaf] font-semibold" }
    ],
    price: "\u20B918,500",
    explore: "Explore 28 Unis"
  },
  {
    title: "Online MCA",
    subtitle: "Master of Computer Applications",
    duration: "2 Years \u2022 4 Sems",
    badge: "AI & Cloud Ready",
    badgeTone: "text-purple-700 bg-purple-50 border-purple-200",
    rows: [
      { label: "Specializations:", value: "AI, Cloud, Full-Stack, Cyber" },
      { label: "Avg Career CTC:", value: "\u20B96.5 - 16.0 LPA", tone: "text-[#115eaf] font-semibold" }
    ],
    price: "\u20B922,000",
    explore: "Explore 22 Unis"
  },
  {
    title: "Online BBA",
    subtitle: "Bachelor of Business Administration",
    duration: "3 Years \u2022 6 Sems",
    badge: "Entry Degree",
    badgeTone: "text-blue-700 bg-blue-50 border-blue-200",
    rows: [
      { label: "Specializations:", value: "Digital Marketing, Finance, HR" },
      { label: "Eligibility:", value: "10+2 with 50% Any Stream" }
    ],
    price: "\u20B914,000",
    explore: "Explore 19 Unis"
  },
  {
    title: "Online BCA",
    subtitle: "Bachelor of Computer Applications",
    duration: "3 Years \u2022 6 Sems",
    badge: "Tech Career Starter",
    badgeTone: "text-indigo-700 bg-indigo-50 border-indigo-200",
    rows: [
      { label: "Core Tracks:", value: "Full-Stack, Python, Cloud" },
      { label: "Practical Labs:", value: "100% Virtual Cloud Sandbox", tone: "text-emerald-700 font-medium" }
    ],
    price: "\u20B915,000",
    explore: "Explore 17 Unis"
  },
  {
    title: "Online B.Com / M.Com",
    subtitle: "Commerce & Corporate Finance",
    duration: "UG & PG Available",
    badge: "ACCA & US CMA Options",
    badgeTone: "text-amber-800 bg-amber-50 border-amber-200",
    rows: [
      { label: "Accounting Certs:", value: "Integrated ACCA 9-Paper Exemption" },
      { label: "Govt Exam Validity:", value: "100% Valid (UPSC/Banking)", tone: "text-emerald-700 font-medium" }
    ],
    price: "\u20B912,000",
    explore: "Explore 15 Unis"
  },
  {
    title: "Online BA / MA",
    subtitle: "Humanities & Social Sciences",
    duration: "UG & PG Tracks",
    badge: "Affordable Fee",
    badgeTone: "text-slate-700 bg-slate-100 border-slate-300",
    rows: [
      { label: "Disciplines:", value: "Journalism, English, Public Policy" },
      { label: "Best For:", value: "Civil Services Aspirants" }
    ],
    price: "\u20B911,000",
    explore: "Explore 14 Unis"
  }
];
const FEATURED_UNIS = [
  {
    id: "lpu-online",
    name: "Lovely Professional University",
    short: "LPU Online",
    naac: "NAAC A++ (3.68 CGPA)",
    rank: "NIRF #31",
    rows: [
      { label: "Total Fees (2 Yrs):", value: "\u20B91,40,000" },
      { label: "EMI Starts:", value: "\u20B94,950/mo", tone: "text-emerald-700 font-bold" },
      { label: "Exam Mode:", value: "100% Home AI Proctored" },
      { label: "Learning:", value: "Live Lectures + LMS" }
    ]
  },
  {
    id: "amity-online",
    name: "Amity University",
    short: "Amity Online",
    naac: "NAAC A+",
    rank: "NIRF Top 35",
    rows: [
      { label: "Total Fees (2 Yrs):", value: "\u20B91,65,000" },
      { label: "EMI Starts:", value: "\u20B95,833/mo", tone: "text-emerald-700 font-bold" },
      { label: "Ranking:", value: "QS Online MBA Top 10 Asia" },
      { label: "Campus LMS:", value: "beSocial Academic App" }
    ]
  },
  {
    id: "cu-online",
    name: "Chandigarh University",
    short: "CU Online",
    naac: "NAAC A+",
    rank: "QS World Ranked",
    rows: [
      { label: "Total Fees (2 Yrs):", value: "\u20B91,35,000" },
      { label: "EMI Starts:", value: "\u20B94,500/mo", tone: "text-emerald-700 font-bold" },
      { label: "Special Inclusions:", value: "Harvard Certifications" },
      { label: "Placement Drives:", value: "300+ Recruiters" }
    ]
  },
  {
    id: "manipal-online",
    name: "Manipal University Jaipur",
    short: "Online Manipal",
    naac: "NAAC A+ (3.59 CGPA)",
    rank: "Legacy 70+ Yrs",
    rows: [
      { label: "Total Fees (2 Yrs):", value: "\u20B91,75,000" },
      { label: "EMI Starts:", value: "\u20B95,200/mo", tone: "text-emerald-700 font-bold" },
      { label: "Content Partner:", value: "Coursera Access" },
      { label: "Equivalence:", value: "Global WES Recognized" }
    ]
  }
];
const UNI_CHIPS = ["All Unis", "NAAC A++", "NAAC A+"];
export const HomeView = ({ onOpenApply, onOpenHelpDesk }) => {
  const navigate = useNavigate();
  const [degreeTab, setDegreeTab] = useState("Master's (PG)");
  const [selectedDegree, setSelectedDegree] = useState("Online MBA (Master of Business)");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget (\u20B912,000 - \u20B950,000)");
  const [lead, setLead] = useState({ phone: "", email: "", degree: "Online MBA" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [uniChip, setUniChip] = useState(UNI_CHIPS[0]);
  const uniRowRef = useRef(null);
  const filteredFeaturedUnis = uniChip === "NAAC A++" ? FEATURED_UNIS.filter((u) => u.naac.includes("A++")) : uniChip === "NAAC A+" ? FEATURED_UNIS.filter((u) => !u.naac.includes("A++")) : FEATURED_UNIS;
  const selectUniChip = (chip) => {
    setUniChip(chip);
    uniRowRef.current?.scrollTo({ left: 0 });
  };
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleExploreSubmit = (e) => {
    e.preventDefault();
    navigate("/universities");
  };
  return <div className="home-page w-full mx-auto px-4 md:px-6 py-5 space-y-5">
      {
    /* Hero */
  }
      <section className="relative left-1/2 -mt-5 w-[calc(100%+2rem)] -translate-x-1/2 overflow-hidden bg-[#f2f6fb] py-4 md:w-[calc(100%+3rem)] md:py-7">
        <div className="relative z-10 w-full max-w-[1120px] mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e2e8f0] text-[#1f2937] text-[11px] font-semibold tracking-wide shadow-sm text-center">
            <ShieldCheck className="w-4 h-4 text-[#115eaf] shrink-0" />
            <span className="sm:hidden">UGC-DEB • NAAC A++ Approved</span>
            <span className="hidden sm:inline">UGC-DEB • AICTE • NAAC A++ ACCREDITED UNIVERSITIES</span>
          </div>
          <h1 className="text-[clamp(24px,6.5vw,32px)] sm:text-4xl lg:text-5xl font-extrabold font-sans tracking-[-0.02em] leading-[1.15]">
            <span className="block text-[#000f22]">Discover, Compare &amp; Enroll in</span>
            <span className="block bg-gradient-to-r from-[#115eaf] via-[#2563eb] to-[#0d9488] bg-clip-text text-transparent">
              India's Top Online Universities
            </span>
          </h1>
          <p className="text-[#475569] text-[15px] md:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Find government-recognized online degrees designed for working professionals with zero-cost EMI and 100% remote proctored exams.
          </p>

          <div className="mt-5 box-border w-full max-w-[1120px] mx-auto bg-white/85 rounded-2xl border border-[#d5e3ff] p-5 shadow-md text-left">
            <form
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,340px)_minmax(0,330px)_minmax(0,340px)] lg:justify-center gap-3.5 items-stretch"
    onSubmit={handleExploreSubmit}
  >
              {
    /* Select Degree Dropdown */
  }
              <div className="min-h-16 relative bg-white hover:bg-[#f8faff] focus-within:bg-white rounded-xl border border-[#c4c6ce] focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/15 transition-all px-3 py-1.5 flex flex-col justify-center shadow-xs">
                <div className="flex items-center gap-1.5 mb-0.5 leading-none">
                  <GraduationCap className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                  <label htmlFor="select-degree" className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider cursor-pointer truncate">
                    Select Degree Program
                  </label>
                </div>
                <div className="relative flex items-center">
                  <select
    id="select-degree"
    value={selectedDegree}
    onChange={(e) => setSelectedDegree(e.target.value)}
    className="w-full bg-transparent border-0 p-0 pr-6 text-base sm:text-sm text-[#000f22] font-semibold focus:ring-0 cursor-pointer outline-none appearance-none truncate [background-image:none]"
    style={{ backgroundImage: "none" }}
  >
                    <option value="Online MBA (Master of Business)">Online MBA (Master of Business)</option>
                    <option value="Online MCA (Computer Applications)">Online MCA (Computer Applications)</option>
                    <option value="Online BBA (Bachelor of Business)">Online BBA (Bachelor of Business)</option>
                    <option value="Online BCA (Computer Science)">Online BCA (Computer Science)</option>
                    <option value="Online M.Com / B.Com">Online M.Com / B.Com</option>
                    <option value="Online MA / BA">Online MA / BA</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#74777e] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 shrink-0" />
                </div>
              </div>

              {
    /* Budget Per Semester Dropdown */
  }
              <div className="min-h-16 relative bg-white hover:bg-[#f8faff] focus-within:bg-white rounded-xl border border-[#c4c6ce] focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/15 transition-all px-3 py-1.5 flex flex-col justify-center shadow-xs">
                <div className="flex items-center gap-1.5 mb-0.5 leading-none">
                  <Wallet className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                  <label htmlFor="select-budget" className="block text-[11px] font-semibold text-[#43474d] uppercase tracking-wider cursor-pointer truncate">
                    Budget Per Semester
                  </label>
                </div>
                <div className="relative flex items-center">
                  <select
    id="select-budget"
    value={selectedBudget}
    onChange={(e) => setSelectedBudget(e.target.value)}
    className="w-full bg-transparent border-0 p-0 pr-6 text-base sm:text-sm text-[#000f22] font-semibold focus:ring-0 cursor-pointer outline-none appearance-none truncate [background-image:none]"
    style={{ backgroundImage: "none" }}
  >
                    <option value="Any Budget (₹12,000 - ₹50,000)">Any Budget (₹12,000 - ₹50,000)</option>
                    <option value="Under ₹15,000 / semester">Under ₹15,000 / semester</option>
                    <option value="₹15,000 - ₹25,000 / semester">₹15,000 - ₹25,000 / semester</option>
                    <option value="₹25,000 - ₹40,000 / semester">₹25,000 - ₹40,000 / semester</option>
                    <option value="Premium Tier (&gt; ₹40,000 / sem)">Premium Tier (&gt; ₹40,000 / sem)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#74777e] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 shrink-0" />
                </div>
              </div>

              {
    /* Explore Button */
  }
              <div className="md:col-span-2 lg:col-span-1 min-h-16">
                <button
    type="submit"
    className="w-full h-16 min-h-16 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md hover:shadow-lg cursor-pointer px-4"
  >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Explore 50+ Universities</span>
                </button>
              </div>
            </form>

            <div className="mt-3.5 pt-3.5 border-t border-[#d5e3ff]/70 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="text-[#43474d] font-medium mr-0.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Trending Filters:
              </span>
              {TRENDING_FILTERS.map((f) => <button
    key={f}
    type="button"
    onClick={() => scrollTo("universities")}
    className="cursor-pointer inline-flex items-center min-h-9 bg-white px-3 py-1.5 rounded-full border border-[#c4c6ce]/70 text-[#111c2d] hover:border-[#115eaf] hover:text-[#115eaf] transition-colors font-medium text-xs"
  >
                  {f}
                </button>)}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[17px]">
            {HERO_METRICS.map((m) => <div key={m.label} className="p-3 bg-[#f0f4f8]/60 rounded-lg border border-[#c4c6ce]/50 text-center">
                <div className={`text-xl md:text-2xl font-bold ${m.tone || "text-[#000f22]"}`}>{m.value}</div>
                <div className="text-[12px] text-[#43474d] font-normal">{m.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {
    /* Popular Courses — mobile only */
  }
      <PopularCoursesMobile />

      {
    /* Degree programs */
  }
      <section id="degrees" className="w-full bg-transparent p-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[#c4c6ce]/40 gap-3">
          <div>
            <h2 className="text-[20px] sm:text-2xl font-bold text-[#000f22]">Popular Online Degree Programs</h2>
            <p className="text-[13px] text-[#43474d] font-normal mt-0.5">
              Approved under UGC Section 22 with equivalence to conventional regular degrees.
            </p>
          </div>
          <div className="inline-flex flex-nowrap max-w-full overflow-x-auto p-1 bg-[#f0f4f8] rounded-lg border border-[#c4c6ce]/50 text-[11px] font-semibold [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {DEGREE_CATEGORIES.map((cat) => <button
    key={cat}
    type="button"
    onClick={() => setDegreeTab(cat)}
    className={`px-2.5 py-1.5 rounded-md whitespace-nowrap shrink-0 transition-colors ${degreeTab === cat ? "bg-[#115eaf] text-white shadow-sm" : "text-[#43474d] hover:text-[#111c2d]"}`}
  >
                {cat}
              </button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px] mt-[17px]">
          {DEGREE_CARDS.map((card) => <div
    key={card.title}
    className="min-w-0 bg-white rounded-lg border border-[#c4c6ce] hover:border-[#115eaf] transition-all hover:shadow-md p-[17px] flex flex-col justify-between"
  >
              <div>
                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    {card.duration}
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${card.badgeTone}`}>
                    {card.badge}
                  </span>
                </div>
                <div className="flex min-w-0 items-baseline gap-2">
                  <h3 className="shrink-0 text-lg font-bold text-[#000f22]">{card.title}</h3>
                  <p className="min-w-0 max-w-[52%] truncate text-[12px] text-[#43474d] font-normal leading-relaxed" title={card.subtitle}>{card.subtitle}</p>
                </div>
                <div className="mt-2.5 py-2 border-y border-[#c4c6ce]/40 text-[12px] space-y-1.5">
                  {card.rows.map((r) => <div key={r.label} className="flex items-start justify-between text-[#43474d] gap-3">
                      <span className="shrink-0">{r.label}</span>
                      <span className={`min-w-0 max-w-[64%] break-words text-right ${r.tone || "font-medium text-[#000f22]"}`}>{r.value}</span>
                    </div>)}
                </div>
              </div>
              <div className="mt-[3.5px] pt-[3.5px] flex flex-wrap items-center justify-between gap-x-4 gap-y-[3.5px]">
                <div className="min-w-0">
                  <span className="block text-[10px] text-[#43474d]">Starts from</span>
                  <span className="whitespace-nowrap text-[14px] font-bold text-[#000f22]">
                    {card.price} <span className="text-[10px] font-normal text-[#43474d]">/ sem</span>
                  </span>
                </div>
                <button
    type="button"
    onClick={() => scrollTo("universities")}
                  className="shrink-0 px-2.5 py-1.5 min-h-[40px] md:min-h-0 rounded-md bg-[#115eaf] text-white text-[11px] font-semibold hover:bg-[#084a8c] transition-colors"
  >
                  {card.explore}
                </button>
              </div>
            </div>)}
        </div>
      </section>

      {
    /* Featured universities */
  }
      <section id="universities" className="w-full bg-transparent p-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[#c4c6ce]/40 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#115eaf]" />
              <h2 className="text-[17px] sm:text-2xl font-bold text-[#000f22] max-[380px]:whitespace-normal whitespace-nowrap">Explore Some Popular Universities</h2>
            </div>
          </div>
          <button
    type="button"
    onClick={() => navigate("/universities")}
    className="text-[12px] font-semibold text-[#115eaf] hover:underline flex items-center gap-1"
  >
            View All 50+ Universities
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {
    /* Mobile only — chip filters + horizontal snap carousel */
  }
        <div className="md:hidden mt-[17px]">
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {UNI_CHIPS.map((chip) => <button
    key={chip}
    type="button"
    onClick={() => selectUniChip(chip)}
    className={`flex-none h-[26px] px-3.5 rounded-[14px] border bg-white text-[12px] cursor-pointer transition-colors ${uniChip === chip ? "border-[#115eaf] text-[#115eaf] font-semibold" : "border-[#c4c6ce] text-[#43474d]"}`}
  >
                {chip}
              </button>)}
          </div>

          <div
    ref={uniRowRef}
    className="flex gap-2 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
  >
            {filteredFeaturedUnis.map((u) => <article
    key={u.id}
    className="flex-none w-[290px] snap-start border border-[#c4c6ce] rounded-[4px] p-3 bg-white flex flex-col"
  >
                <h3 className="text-[15px] font-bold leading-[1.35] text-[#000f22] line-clamp-2 mb-2.5">
                  {u.name}
                </h3>
                <span className="block text-[12px] text-[#74777e] mb-2.5">{u.short}</span>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{u.rank}</span>
                </div>
                <div className="space-y-1.5 text-[12px] bg-[#f0f4f8]/50 p-2.5 rounded border border-[#c4c6ce]/30 mb-3">
                  {u.rows.map((r) => <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-[#43474d]">{r.label}</span>
                      <span className={`text-right ${r.tone || "font-medium text-[#000f22]"}`}>
                        {r.value}
                      </span>
                    </div>)}
                </div>
                <div className="mt-auto space-y-2">
                  <button
    type="button"
    onClick={() => navigate(`/universities/${u.id}`)}
    className="w-full py-2 min-h-[44px] rounded-md bg-[#115eaf] text-white text-[12px] font-semibold hover:bg-[#084a8c] transition-colors"
  >
                    View Details &amp; Apply
                  </button>
                  <button
    type="button"
    onClick={onOpenHelpDesk}
    className="w-full py-2 min-h-[44px] rounded-md border border-[#74777e] text-[12px] font-medium text-[#43474d] hover:bg-slate-50 flex items-center justify-center gap-1"
  >
                    <Download className="w-3.5 h-3.5" />
                    Download Brochure
                  </button>
                </div>
              </article>)}
          </div>
        </div>

        {
    /* Desktop — original grid */
  }
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-[17px] mt-[17px]">
          {FEATURED_UNIS.map((u) => <div
    key={u.id}
    className="bg-white rounded-lg border border-[#c4c6ce] hover:border-[#115eaf] transition-all hover:shadow-md p-[17px] flex flex-col justify-between"
  >
              <div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{u.rank}</span>
                </div>
                <h3 className="text-lg font-bold text-[#000f22]">{u.name}</h3>
                <p className="text-[12px] text-[#115eaf] font-medium mt-0.5">{u.short}</p>
                <div className="mt-3 space-y-1.5 text-[12px] bg-[#f0f4f8]/50 p-2.5 rounded border border-[#c4c6ce]/30">
                  {u.rows.map((r) => <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-[#43474d]">{r.label}</span>
                      <span className={`text-right ${r.tone || "font-medium text-[#000f22]"}`}>{r.value}</span>
                    </div>)}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
    type="button"
    onClick={() => navigate(`/universities/${u.id}`)}
    className="w-full py-2 min-h-[44px] md:min-h-0 rounded-md bg-[#115eaf] text-white text-[12px] font-semibold hover:bg-[#084a8c] transition-colors"
  >
                  View Details &amp; Apply
                </button>
                <button
    type="button"
    onClick={onOpenHelpDesk}
    className="w-full py-2 min-h-[44px] md:min-h-0 rounded-md border border-[#74777e] text-[12px] font-medium text-[#43474d] hover:bg-slate-50 flex items-center justify-center gap-1"
  >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </button>
              </div>
            </div>)}
        </div>

        {
    /* Mobile only — back to top */
  }
        <button
    type="button"
    aria-label="Back to top"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="md:hidden fixed right-2.5 bottom-[calc(144px+env(safe-area-inset-bottom))] w-11 h-11 flex items-center justify-center border border-[#c4c6ce] rounded-full bg-white cursor-pointer text-[16px] leading-none text-[#000f22] shadow-[0_1px_4px_rgba(0,0,0,0.15)] z-40"
  >
          &uarr;
        </button>
      </section>

      {
    /* Top Colleges by Location */
  }
      <TopCollegesByLocation onOpenBrochure={onOpenHelpDesk} />

      <LpuCompareSection
        onOpenBrochure={onOpenHelpDesk}
        onOpenHelpDesk={onOpenHelpDesk}
      />

      {
    /* Student Testimonials & Social Proof */
  }
      <StudentTestimonials onOpenCounseling={onOpenHelpDesk} />

      {
    /* Counselling Section */
  }
      <section
    id="counselling"
    className="relative isolate overflow-hidden rounded-[20px] bg-gradient-to-br from-[#eef6ff] via-[#f7fbff] to-white border border-[#d0e2fa] text-[#0b1d3a] shadow-sm p-3 sm:p-4"
  >
        {
    /* Subtle ambient lighting */
  }
        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-3 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-4">
          {
    /* Left Column: Copy & Trust Highlights */
  }
          <div className="px-1 sm:px-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ffdf70] bg-[#fffdf2] px-2.5 py-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.2px] text-[#dca400]">
              <Headphones className="w-4 h-4 text-[#dca400]" />
              FREE 1-ON-1 ACADEMIC ADVISORY
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="max-w-[680px] text-[clamp(22px,2.2vw,32px)] font-bold leading-[1.2] tracking-[-0.6px] text-[#0b1d3a]">
                Confused Between 50+ Universities? Speak with an <span className="text-[#3478ed]">Unbiased Academic Expert</span>
              </h2>
              <p className="max-w-[660px] text-xs sm:text-sm text-[#657185] font-normal leading-[1.6]">
                Choosing the right online university impacts your career and finances for years. Our certified advisors provide objective comparisons across UGC-DEB entitlements, syllabus depth, recruiter networks, and genuine fee financing — 100% free with zero sales bias.
              </p>
            </div>

            {
    /* Trust Checkpoints */
  }
            <div className="grid grid-cols-2 max-[380px]:grid-cols-1 gap-x-3 gap-y-3 mt-4 text-[11px] sm:text-xs text-[#0b1d3a]">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free &amp; Unbiased Counseling</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official UGC-DEB &amp; NAAC Data</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0% Interest Monthly EMI Guidance</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Spam &amp; Complete Privacy</span>
              </span>
            </div>
          </div>

          {
    /* Right Column: Callback Request Card */
  }
          <div className="w-full max-w-[460px] justify-self-end rounded-[18px] border border-white/90 bg-white/95 p-3 sm:p-4 text-[#111c2d] shadow-[0_10px_28px_rgba(27,65,112,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <h3 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.5px] text-[#0b1d3a]">
                Request Free Callback
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#087955] bg-[#effdf6] rounded-full border border-[#a5f3d0]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Advisors Online
              </span>
            </div>
            <p className="text-xs text-[#6b7280] font-normal leading-relaxed mb-3">
              Connect with a verified academic advisor within 15 minutes.
            </p>

            {!leadSubmitted ? <form
    className="space-y-2"
    onSubmit={(e) => {
      e.preventDefault();
      setLeadSubmitted(true);
    }}
  >
                <div>
                  <label className="block text-[10px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <div className="flex h-10 rounded-[9px] border border-[#c4c6ce] focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/20 overflow-hidden transition-all bg-white">
                    <span className="bg-[#f0f4f8] text-[#000f22] px-3 text-xs font-semibold border-r border-[#c4c6ce] flex items-center shrink-0">
                      +91
                    </span>
                    <input
    className="w-full border-0 px-3 text-base sm:text-sm text-[#000f22] placeholder:text-[#74777e] outline-none bg-white font-medium"
    placeholder="98765 43210"
    required
    type="tel"
    value={lead.phone}
    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
  />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                    Email Address
                  </label>
                  <input
    className="w-full h-10 rounded-[9px] border border-[#c4c6ce] px-3 text-base sm:text-sm text-[#000f22] placeholder:text-[#74777e] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all"
    placeholder="name@example.com"
    required
    type="email"
    value={lead.email}
    onChange={(e) => setLead({ ...lead, email: e.target.value })}
  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                    Program You're Exploring
                  </label>
                  <select
    className="w-full h-10 rounded-[9px] border border-[#c4c6ce] px-3 text-base sm:text-sm text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all cursor-pointer"
    value={lead.degree}
    onChange={(e) => setLead({ ...lead, degree: e.target.value })}
  >
                    <option>Online MBA (Master of Business)</option>
                    <option>Online MCA (Computer Applications)</option>
                    <option>Online BBA (Bachelor of Business)</option>
                    <option>Online BCA (Computer Applications)</option>
                    <option>Online M.Com / B.Com</option>
                    <option>Online MA / BA Programs</option>
                    <option>Executive PG Diploma</option>
                  </select>
                </div>

                <button
    className="w-full h-10 min-h-10 rounded-[9px] bg-[#1764c0] hover:bg-[#1054a5] text-white text-xs sm:text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
    type="submit"
  >
                  <span>Connect with Academic Advisor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-[#74777e] font-normal pt-1">
                  🔒 Strictly confidential. No marketing spam guaranteed.
                </p>
              </form> : <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#000f22]">Callback Request Confirmed!</h3>
                <p className="text-xs text-[#555960] max-w-xs mx-auto">
                  A senior academic counselor will call you within 15 minutes regarding <strong>{lead.degree}</strong>.
                </p>
                <button
    type="button"
    onClick={() => setLeadSubmitted(false)}
    className="text-xs font-semibold text-[#115eaf] hover:underline pt-2 inline-block cursor-pointer"
  >
                  Submit another inquiry
                </button>
              </div>}
          </div>
        </div>
      </section>

      {
    /* Frequently Asked Questions (Accordion) */
  }
      <HomeFaq onOpenHelpDesk={onOpenHelpDesk} />

      {
    /* Blogs */
  }
      <BlogsListSection onOpenHelpDesk={onOpenHelpDesk} className="w-full rounded-2xl border border-[#dce6f3] bg-[#f4f7fb] p-4 shadow-sm md:p-6" compact horizontal autoScroll showDescriptionOnMobile fetchLivePosts />
    </div>;
};
