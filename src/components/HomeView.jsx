import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewAllButton from "./ViewAllButton";
import { getCoursesListing } from "../services/courseApi";
import { ALL_UNIVERSITIES } from "../data/universities";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";
import {
  TrendingUp,
  Search,
  ShieldCheck,
  ArrowRight,
  Download,
  CheckCircle,
  Headphones,
  GraduationCap,
  BookOpen,
  Newspaper,
  Library,
  Wallet,
  ChevronDown,
  Sparkles,
  Star
} from "lucide-react";
import { HomeFaq } from "./HomeFaq";
import HomeHero from "./HomeHero";
import { StudentTestimonials } from "./StudentTestimonials";

const SHOW_TESTIMONIALS = false;
import { BlogsListSection } from "./BlogsListSection";

const TRENDING_FILTERS = [
  "NAAC A++ Only",
  "Under \u20B91 Lakh Total",
  "No-cost EMI",
  "100% Online Exam"
];
const DEGREE_CATEGORIES = ["Master's (PG)", "Bachelor's (UG)", "Executive"];
const DEGREE_CARDS = [
  {
    title: "Online MBA",
    subtitle: "Master of Business Administration",
    duration: "2 Years \u2022 4 Sems",
    badge: "High Placement Rate",
    badgeTone: "text-emerald-700 bg-emerald-50 border-emerald-200",
    rows: [
      { label: "Specializations:", value: "19+ (Data, Finance, Marketing, HR)" },
      { label: "Avg Career CTC:", value: "\u20B97.2 - 14.5 LPA", tone: "text-brand-600 font-semibold" }
    ],
    price: "\u20B918,500",
    explore: "Explore 28 Univ."
  },
  {
    title: "Online MCA",
    subtitle: "Master of Computer Applications",
    duration: "2 Years \u2022 4 Sems",
    badge: "AI & Cloud Ready",
    badgeTone: "text-purple-700 bg-purple-50 border-purple-200",
    rows: [
      { label: "Specializations:", value: "AI, Cloud, Full-Stack, Cyber" },
      { label: "Avg Career CTC:", value: "\u20B96.5 - 16.0 LPA", tone: "text-brand-600 font-semibold" }
    ],
    price: "\u20B922,000",
    explore: "Explore 22 Univ."
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
    explore: "Explore 19 Univ."
  },
  {
    title: "Online BCA",
    subtitle: "Bachelor of Computer Applications",
    duration: "3 Years \u2022 6 Sems",
    badge: "Tech Career Starter",
    badgeTone: "text-indigo-700 bg-indigo-50 border-indigo-200",
    rows: [
      { label: "Core Tracks:", value: "Full-Stack, Python, Cloud" },
      { label: "Practical Labs:", value: "Virtual labs", tone: "text-emerald-700 font-medium" }
    ],
    price: "\u20B915,000",
    explore: "Explore 17 Univ."
  },
  {
    title: "Online B.Com / M.Com",
    subtitle: "Commerce & Corporate Finance",
    duration: "UG & PG Available",
    badge: "ACCA & US CMA Options",
    badgeTone: "text-amber-800 bg-amber-50 border-amber-200",
    rows: [
      { label: "Accounting Certs:", value: "Integrated ACCA 9-Paper Exemption" },
      { label: "Govt Exam Validity:", value: "Valid for govt. jobs", tone: "text-emerald-700 font-medium" }
    ],
    price: "\u20B912,000",
    explore: "Explore 15 Univ."
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
    explore: "Explore 14 Univ."
  }
];
const FEATURED_UNIS = [
  {
    id: "lpu-online",
    name: "Lovely Professional University",
    short: "LPU Online",
    naac: "NAAC A++ (3.68 CGPA)",
    rows: [
      { label: "Fees:", value: "₹80k – ₹1.60L" },
      { label: "EMI from:", value: "₹2,666 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programmes:", value: "9+ Courses (UG & PG)" }
    ]
  },
  {
    id: "amity-online",
    name: "Amity University",
    short: "Amity Online",
    naac: "NAAC A+",
    rows: [
      { label: "Fees:", value: "₹1.10L – ₹1.99L" },
      { label: "EMI from:", value: "₹3,333 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programmes:", value: "12+ Courses (UG & PG)" }
    ]
  },
  {
    id: "cu-online",
    name: "Chandigarh University",
    short: "CU Online",
    naac: "NAAC A+",
    rows: [
      { label: "Fees:", value: "₹75k – ₹1.50L" },
      { label: "EMI from:", value: "₹2,500 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programmes:", value: "8+ Courses (UG & PG)" }
    ]
  },
  {
    id: "manipal-online",
    name: "Manipal University Jaipur",
    short: "Online Manipal",
    naac: "NAAC A+ (3.59 CGPA)",
    rows: [
      { label: "Fees:", value: "₹85k – ₹1.75L" },
      { label: "EMI from:", value: "₹2,916 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programmes:", value: "10+ Courses (UG & PG)" }
    ]
  }
];
// NIRF rank comes from src/data/universities — the same source the compare page uses.
FEATURED_UNIS.forEach((u) => {
  const nirf = ALL_UNIVERSITIES.find((d) => d.id === u.id)?.nirfRanking;
  u.rank = nirf ? `NIRF #${nirf}` : "";
});

const UNI_CHIPS = ["All Unis", "NAAC A++", "NAAC A+"];

const COMPARE_PROGRAMS = [
  { id: "overview", name: "All programmes" },
  { id: "mba", name: "Online MBA (2 Years · 4 Sems)" },
  { id: "mca", name: "Online MCA (2 Years · 4 Sems)" },
  { id: "bba", name: "Online BBA (3 Years · 6 Sems)" },
  { id: "bca", name: "Online BCA (3 Years · 6 Sems)" },
  { id: "bcom", name: "Online B.Com (3 Years · 6 Sems)" },
  { id: "mcom", name: "Online M.Com (2 Years · 4 Sems)" }
];

const COMPARE_UNIVERSITIES = [
  {
    id: "lpu-online",
    name: "LPU Online",
    approval: "UGC-DEB / NAAC A++",
    exam: "Online, webcam-proctored",
    programs: {
      overview: {
        fees: "₹80,000 – ₹1,60,000",
        placement: "₹4.5 – 12.0 LPA",
        emi: "Starts ₹2,666 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,60,000",
        placement: "₹8.5 LPA",
        emi: "₹5,333 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,40,000",
        placement: "₹7.8 LPA",
        emi: "₹4,666 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,14,000",
        placement: "₹5.5 LPA",
        emi: "₹3,166 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,20,000",
        placement: "₹6.2 LPA",
        emi: "₹3,333 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹96,000",
        placement: "₹5.2 LPA",
        emi: "₹2,666 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹80,000",
        placement: "₹6.2 LPA",
        emi: "₹2,666 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  },
  {
    id: "amity-online",
    name: "Amity Online",
    approval: "UGC-DEB / NAAC A+",
    exam: "Online, proctored",
    programs: {
      overview: {
        fees: "₹1,10,000 – ₹1,99,000",
        placement: "₹5.0 – 14.5 LPA",
        emi: "Starts ₹3,333 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,99,000",
        placement: "₹9.2 LPA",
        emi: "₹6,633 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,65,000",
        placement: "₹8.2 LPA",
        emi: "₹5,500 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,50,000",
        placement: "₹5.8 LPA",
        emi: "₹4,166 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,40,000",
        placement: "₹6.5 LPA",
        emi: "₹3,888 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹1,20,000",
        placement: "₹6.2 LPA",
        emi: "₹3,333 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹1,10,000",
        placement: "₹6.5 LPA",
        emi: "₹3,666 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  },
  {
    id: "cu-online",
    name: "CU Online",
    approval: "UGC-DEB / NAAC A+",
    exam: "Online",
    programs: {
      overview: {
        fees: "₹75,000 – ₹1,50,000",
        placement: "₹4.2 – 10.5 LPA",
        emi: "Starts ₹2,500 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,50,000",
        placement: "₹7.8 LPA",
        emi: "₹5,000 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,35,000",
        placement: "₹7.2 LPA",
        emi: "₹4,500 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,05,000",
        placement: "₹5.0 LPA",
        emi: "₹2,916 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,10,000",
        placement: "₹5.8 LPA",
        emi: "₹3,055 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹90,000",
        placement: "₹4.8 LPA",
        emi: "₹2,500 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹85,000",
        placement: "₹5.5 LPA",
        emi: "₹2,833 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  },
  {
    id: "manipal-online",
    name: "Manipal Jaipur",
    approval: "UGC-DEB / NAAC A+",
    exam: "Remote Web Proctored",
    programs: {
      overview: {
        fees: "₹85,000 – ₹1,75,000",
        placement: "₹4.8 – 12.5 LPA",
        emi: "Starts ₹2,916 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,75,000",
        placement: "₹8.2 LPA",
        emi: "₹5,833 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,50,000",
        placement: "₹7.8 LPA",
        emi: "₹5,000 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,35,000",
        placement: "₹5.4 LPA",
        emi: "₹3,750 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,35,000",
        placement: "₹5.4 LPA",
        emi: "₹3,750 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹1,05,000",
        placement: "₹5.0 LPA",
        emi: "₹2,916 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹1,00,000",
        placement: "₹5.8 LPA",
        emi: "₹3,333 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  }
];

const COMPARE_CRITERIA = [
  ["Total fees", "fees"],
  ["Average Placement", "placement"],
  ["Duration", "duration"],
  ["Monthly EMI", "emi"],
  ["Approval", "approval"],
  ["Exam mode", "exam"]
];

const DEGREE_PROGRAMS = [
  { lv: ["PG"], y: "2 Years", n: "Online MBA", f: "Master of Business Administration", sp: "19+ (Data, Finance, Marketing, HR)", tg: "", ctc: "₹8.5 LPA", totalFee: "₹74,000 – 1.8 Lakh", sems: "Across 4 Semesters", c: 28, lab: "Specializations", slug: "online-mba", uniSearch: "mba" },
  { lv: ["PG"], y: "2 Years", n: "Online MCA", f: "Master of Computer Applications", sp: "AI, Cloud, Full-Stack, Cyber", tg: "", ctc: "₹7.8 LPA", totalFee: "₹88,000 – 1.9 Lakh", sems: "Across 4 Semesters", c: 22, lab: "Specializations", slug: "online-mca", uniSearch: "mca" },
  { lv: ["UG"], y: "3 Years", n: "Online BBA", f: "Bachelor of Business Administration", sp: "Digital Marketing, Finance, HR", tg: "", ctc: "₹5.5 LPA", totalFee: "₹84,000 – 1.7 Lakh", sems: "Across 6 Semesters", c: 19, lab: "Specializations", slug: "online-bba", uniSearch: "bba" },
  { lv: ["UG"], y: "3 Years", n: "Online BCA", f: "Bachelor of Computer Applications", sp: "Full-Stack, Python, Cloud", tg: "", ctc: "₹6.2 LPA", totalFee: "₹90,000 – 1.8 Lakh", sems: "Across 6 Semesters", c: 17, lab: "Core tracks", slug: "online-bca", uniSearch: "bca" },
  { lv: ["UG", "PG"], y: "3 Years", n: "Online B.Com / M.Com", f: "Commerce & Corporate Finance", sp: "Integrated ACCA 9-paper exemption", tg: "", ctc: "₹5.2 LPA", totalFee: "₹72,000 – 1.4 Lakh", sems: "Across 6 Semesters", c: 15, lab: "Accounting certs", slug: "online-bcom", search: "com", uniSearch: "commerce" },
  { lv: ["UG", "PG"], y: "3 Years", n: "Online BA / MA", f: "Humanities & Social Sciences", sp: "Journalism, English, Public Policy", tg: "", ctc: "₹4.8 LPA", totalFee: "₹66,000 – 1.2 Lakh", sems: "Across 6 Semesters", c: 14, lab: "Disciplines", slug: "online-ba", search: "ba", uniSearch: "arts" },
  { lv: ["UG"], y: "4 Years", n: "Online B.Tech", f: "Bachelor of Technology", sp: "CSE, AI/ML, Data Science, Cyber", tg: "", ctc: "₹7.5 LPA", totalFee: "₹2.0 – 3.5 Lakh", sems: "Across 8 Semesters", c: 12, lab: "Specializations", search: "tech", uniSearch: "tech" },
  { lv: ["PG"], y: "2 Years", n: "Online M.Sc (Data Science)", f: "Master of Science", sp: "Machine Learning, Big Data, AI", tg: "", ctc: "₹9.5 LPA", totalFee: "₹96,000 – 2.2 Lakh", sems: "Across 4 Semesters", c: 10, lab: "Specializations", slug: "online-msc-in-data-science", uniSearch: "msc" },
  { lv: ["PG"], y: "2 Years", n: "Online MA (Psychology)", f: "Master of Arts", sp: "Clinical, Counseling, Organizational", tg: "", ctc: "₹5.8 LPA", totalFee: "₹64,000 – 1.3 Lakh", sems: "Across 4 Semesters", c: 8, lab: "Disciplines", slug: "online-ma", uniSearch: "ma" },
  { lv: ["UG"], y: "3 Years", n: "Online B.Sc (IT)", f: "Bachelor of Science (IT)", sp: "Software, Networking, Cloud", tg: "", ctc: "₹5.4 LPA", totalFee: "₹78,000 – 1.5 Lakh", sems: "Across 6 Semesters", c: 11, lab: "Core tracks", slug: "online-bsc", uniSearch: "bsc" },
  { lv: ["EX"], y: "1 Year", n: "Executive MBA", f: "Executive Master of Business Administration", sp: "Leadership, Strategy, Finance", tg: "", ctc: "₹15.5 LPA", totalFee: "₹1.4 – 3.2 Lakh", sems: "Across 2 Semesters", c: 6, lab: "Specializations", slug: "executive-mba", uniSearch: "mba" },
  { lv: ["EX"], y: "6 Months", n: "PG Certificate (AI)", f: "Post Graduate Certificate", sp: "Generative AI, LLMs, MLOps", tg: "", ctc: "₹9.0 LPA", totalFee: "₹40,000 – 90,000", sems: "Complete 6 Months", c: 5, lab: "Modules", search: "certificate", uniSearch: "management" },
  { lv: ["PG"], y: "2 Years", n: "Online M.Com", f: "Master of Commerce", sp: "Accounting, Taxation, Finance", tg: "", ctc: "₹6.0 LPA", totalFee: "₹68,000 – 1.3 Lakh", sems: "Across 4 Semesters", c: 9, lab: "Specializations", slug: "online-mcom", uniSearch: "mcom" },
  { lv: ["UG"], y: "3 Years", n: "Online B.Com", f: "Bachelor of Commerce", sp: "Accounting, Economics, Business Law", tg: "", ctc: "₹4.5 LPA", totalFee: "₹75,000 – 1.4 Lakh", sems: "Across 6 Semesters", c: 13, lab: "Core tracks", slug: "online-bcom", uniSearch: "bcom" }
];

const DEGREE_LEVELS = [["Master's (PG)", "PG"], ["Bachelor's (UG)", "UG"], ["Executive", "EX"]];

export const HomeView = ({ onOpenApply, onOpenHelpDesk }) => {
  const navigate = useNavigate();

  const [selectedDegree, setSelectedDegree] = useState("Online MBA (Master of Business)");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget (\u20B912,000 - \u20B950,000)");
  const [lead, setLead] = useState({ name: "", email: "", phone: "", degree: "Online MBA" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [uniChip, setUniChip] = useState(UNI_CHIPS[0]);
  const [compareColumns, setCompareColumns] = useState([0, 1, 2]);
  const [selectedCompareCourse, setSelectedCompareCourse] = useState("mba");
    const [degreeLevel, setDegreeLevel] = useState("PG");
  const [degreePrograms, setDegreePrograms] = useState(DEGREE_PROGRAMS);
  // "loading" until live fees arrive; static DEGREE_PROGRAMS fees are only a fallback if the API fails.
  const [feesStatus, setFeesStatus] = useState("loading");
  const uniRowRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    getCoursesListing({ page: 1, limit: 60 })
      .then((res) => {
        if (!isMounted) return;
        const liveCourses = Array.isArray(res?.courses) ? res.courses : [];
        if (liveCourses.length === 0) { setFeesStatus("fallback"); return; }
        setFeesStatus("live");

        setDegreePrograms((prevPrograms) => {
          return prevPrograms.map((item) => {
            const liveMatch = liveCourses.find((c) => {
              if (item.slug && c.id === item.slug) return true;
              const cleanItem = item.n.toLowerCase().replace(/[^a-z0-9]/g, "");
              const cleanLive = (c.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              return cleanLive.includes(cleanItem) || cleanItem.includes(cleanLive);
            });

            if (!liveMatch) return item;

            const dynamicFee =
              liveMatch.feeDisplay ||
              (liveMatch.totalFee > 0 ? "₹" + liveMatch.totalFee.toLocaleString("en-IN") : item.totalFee);
            const dynamicSems =
              liveMatch.semestersCount > 0 ? `Across ${liveMatch.semestersCount} Semesters` : item.sems;
            const dynamicDuration = liveMatch.duration || item.y;
            const dynamicSpecializations =
              Array.isArray(liveMatch.specializations) && liveMatch.specializations.length > 0
                ? liveMatch.specializations.slice(0, 3).join(", ")
                : item.sp;

            return {
              ...item,
              totalFee: dynamicFee,
              sems: dynamicSems,
              y: dynamicDuration,
              sp: dynamicSpecializations,
            };
          });
        });
      })
      .catch((err) => {
        if (isMounted) setFeesStatus("fallback");
        console.warn("Could not load dynamic courses for homepage", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);
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
  const getDynamicPlacement = (uni, courseKey) => {
    const progData = uni.programs[courseKey] || uni.programs.overview;
    if (courseKey === "overview") {
      return progData.placement || "₹4.5 – 12.0 LPA";
    }

    const matched = degreePrograms.find((dp) => {
      if (courseKey === "mba") return dp.slug === "online-mba" || dp.n.includes("MBA");
      if (courseKey === "mca") return dp.slug === "online-mca" || dp.n.includes("MCA");
      if (courseKey === "bba") return dp.slug === "online-bba" || dp.n.includes("BBA");
      if (courseKey === "bca") return dp.slug === "online-bca" || dp.n.includes("BCA");
      if (courseKey === "bcom") return dp.slug === "online-bcom" || dp.n.includes("B.Com");
      if (courseKey === "mcom") return dp.slug === "online-mcom" || dp.n.includes("M.Com");
      return false;
    });

    if (matched && matched.ctc) {
      const baseNumMatch = matched.ctc.match(/[\d.]+/);
      const baseNum = baseNumMatch ? parseFloat(baseNumMatch[0]) : 8.0;
      if (uni.id === "amity-online") return `₹${(baseNum + 0.7).toFixed(1)} LPA`;
      if (uni.id === "lpu-online") return `₹${baseNum.toFixed(1)} LPA`;
      if (uni.id === "cu-online") return `₹${Math.max(4.0, baseNum - 0.7).toFixed(1)} LPA`;
      if (uni.id === "manipal-online") return `₹${Math.max(4.5, baseNum - 0.3).toFixed(1)} LPA`;
      return matched.ctc;
    }

    return progData.placement || "₹7.5 LPA";
  };

  const addCompareColumn = () => {
    setCompareColumns((prev) => {
      if (prev.length >= 4) return prev;
      const col = prev.length;
      const startIndex = col % COMPARE_UNIVERSITIES.length;
      return [...prev, startIndex];
    });
  };
  const changeCompareColumn = (colIndex, uniIndex) => {
    setCompareColumns((prev) => prev.map((v, i) => (i === colIndex ? uniIndex : v)));
  };
  const filteredDegreePrograms = degreePrograms.filter((p) => p.lv.includes(degreeLevel));
  return (
<div className="home-page w-full mx-auto px-3.5 sm:px-4 md:px-6 py-4 sm:py-5 space-y-6 sm:space-y-8">
      <HomeHero onOpenHelpDesk={onOpenHelpDesk} />

      {
    /* Popular Courses — mobile only */
  }
  {/* PopularCoursesMobile removed per request */}

      {
    /* Degree programs */
  }
      {/* Mobile-only: Popular Online Degree Programs */}
      <section id="degrees-mobile" className="md:hidden w-full">
        <div className="py-2">
          <p className="text-[11px] font-bold tracking-[1.5px] text-brand-700 uppercase mb-1">DEGREES</p>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-ink-900 mb-1">Popular online degree programs</h2>
          <p className="text-[12.5px] text-slate-500 leading-snug mb-3.5">UGC-entitled programmes, valid on par with regular campus degrees.</p>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {DEGREE_LEVELS.map(([label, key]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDegreeLevel(key)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-[12px] font-semibold rounded-lg border-b-2 transition-colors ${
                  degreeLevel === key
                    ? 'text-brand-700 border-brand-700 bg-blue-50/80 font-bold'
                    : 'text-slate-600 border-transparent hover:text-brand-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {filteredDegreePrograms.map((p) => {
              const courseHref = p.slug ? `/courses/${p.slug}` : `/courses?search=${encodeURIComponent(p.search || p.n)}`;
              const uniHref = `/universities?search=${encodeURIComponent(p.uniSearch || p.n)}`;
              return (
                <div key={p.n} className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs hover:border-brand-600/40 transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <Link to={courseHref} className="group">
                        <h3 className="text-[14px] font-bold text-ink-900 group-hover:text-brand-700 transition-colors leading-tight">{p.n}</h3>
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight truncate">{p.f}</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-300 shrink-0 whitespace-nowrap">{p.y}</span>
                  </div>
                  
                  {/* Specializations Tag Line */}
                  <div className="mt-2 text-[11px] text-slate-600 truncate bg-slate-50/80 px-2 py-1 rounded-md border border-slate-100">
                    <span className="font-semibold text-slate-700">Specializations:</span> {p.sp}
                  </div>

                  {/* Clean 2-Column Stats Strip without cramping */}
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider">Avg. Placement</span>
                      <span className="text-xs font-bold text-emerald-800">{p.ctc}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider">Total Program Fee</span>
                      {feesStatus === "loading" ? <span className="ml-auto block h-3.5 w-24 rounded bg-line animate-pulse" aria-label="Loading fee" /> : <span className="text-xs font-bold text-ink-900 leading-tight">{p.totalFee}</span>}
                      <span className="text-[9.5px] text-slate-400 leading-tight">{p.sems}</span>
                    </div>
                  </div>

                  {/* Compact action buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-2.5 pt-0.5">
                    <Link to={courseHref} className="w-full h-8 rounded-lg border border-brand-700 text-brand-700 text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.98] hover:bg-brand-50 transition-colors text-center">
                      Course Details
                    </Link>
                    <Link to={uniHref} className="w-full h-8 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.98] transition-colors text-center shadow-2xs">
                      Explore {p.c} Univ. <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Desktop degrees section (unchanged) */}
      <div className="hidden md:block">
      <section id="degrees" aria-labelledby="degrees-heading" className="w-full">
        <div className="w-full">
          <div className="hd flex flex-col md:flex-row md:items-end md:justify-between gap-4 flex-wrap mb-4">
            <div>
              <h2 id="degrees-heading" className="text-xl sm:text-2xl font-bold leading-[1.15] tracking-[-0.025em] text-ink-900">Popular online degree programs</h2>
              <p className="s mt-2.5 text-[14px] text-ink-700 max-w-[52ch]">UGC-entitled programmes, valid on par with regular campus degrees.</p>
            </div>
            <div className="tabs flex overflow-x-auto border-b border-line-strong" role="tablist" aria-label="Level">
              {DEGREE_LEVELS.map(([label, key], i) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={degreeLevel === key}
                  onClick={() => setDegreeLevel(key)}
                  className={`whitespace-nowrap bg-transparent border-0 border-b-2 -mb-px px-4 py-2.5 min-h-[44px] text-[14px] font-medium cursor-pointer transition-colors ${degreeLevel === key ? "text-brand-600 border-brand-600" : "text-ink-700 border-transparent hover:text-ink-900"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {/* Clean, compact table header */}
            <div className="grid grid-cols-[88px_1.5fr_1.6fr_1.1fr_1fr_135px] gap-4 items-center py-2 px-1 border-b-2 border-slate-200 bg-canvas text-[11px] font-bold uppercase tracking-wider text-slate-500 rounded-t-lg">
              <span>Duration</span>
              <span>Courses</span>
              <span>Specializations</span>
              <span>Avg. Placement</span>
              <span>Total Program Fee</span>
              <span className="text-center">Action</span>
            </div>

            {filteredDegreePrograms.length === 0 ? (
              <p className="em py-7 text-[14px] text-ink-700">No executive programs are listed yet. Connect this tab to your existing data.</p>
            ) : (
              filteredDegreePrograms.map((p, idx) => {
                const courseHref = p.slug ? `/courses/${p.slug}` : `/courses?search=${encodeURIComponent(p.search || p.n)}`;
                const uniHref = `/universities?search=${encodeURIComponent(p.uniSearch || p.n)}`;
                return (
                <div
                  key={p.n + idx}
                  className="dg grid grid-cols-[88px_1.5fr_1.6fr_1.1fr_1fr_135px] gap-4 items-center py-2.5 px-1 border-b border-line hover:bg-slate-50/60 transition-colors"
                >
                  <span className="du text-[12.5px] text-ink-700 font-medium leading-[1.3]">{p.y}</span>
                  <div>
                    <Link
                      to={courseHref}
                      className="group/course block no-underline"
                    >
                      <h3 className="font-bold tracking-[-0.01em] text-[14.5px] leading-[1.25] text-ink-900 group-hover/course:text-brand-700 transition-colors">
                        {p.n}
                        <small className="block mt-0.5 text-[11.5px] font-normal text-ink-500 tracking-normal group-hover/course:text-brand-700/80">{p.f}</small>
                      </h3>
                    </Link>
                    {p.tg ? <span className="tg block mt-1 text-[11.5px] text-brand-700 font-medium">{p.tg}</span> : null}
                  </div>
                  <div className="sp text-[12.5px] text-ink-700 leading-snug">
                    {p.sp}
                  </div>
                  <div className="sp text-[12.5px] text-ink-700 leading-[1.25]">
                    <span className="font-bold text-ink-900 text-[13px]">{p.ctc}</span>
                  </div>
                  <div className="pr text-[12px] text-ink-700 leading-[1.25]">
                    {feesStatus === "loading" ? <span className="block h-4 w-28 rounded bg-line animate-pulse" aria-label="Loading fee" /> : <b className="block text-[14px] font-bold text-ink-900 tracking-tight leading-tight">{p.totalFee}</b>}
                    <span className="text-[10px] text-ink-500 block mt-0.5">{p.sems}</span>
                  </div>
                  <div className="justify-self-center flex flex-col items-center gap-1">
                    <Link
                      className="btn inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white border-0 rounded-md px-3.5 py-1.5 min-h-[32px] text-[11.5px] font-semibold no-underline cursor-pointer whitespace-nowrap transition-colors shadow-2xs"
                      to={uniHref}
                    >
                      Explore {p.c} Univ.
                    </Link>
                    <Link
                      to={courseHref}
                      className="text-[10.5px] font-semibold text-brand-700 hover:underline inline-flex items-center gap-0.5"
                    >
                      Course details &rarr;
                    </Link>
                  </div>
                </div>
              );
              })
            )}
          </div>
        </div>
      </section>
      </div>

      {
    /* Featured universities */
  }
      <section id="universities" className="w-full bg-transparent p-0">
        <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-line-strong/40 gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-2xl font-bold text-ink-900 max-[380px]:whitespace-normal whitespace-nowrap">Popular universities</h2>
          </div>
          <div className="hidden md:block">
            <ViewAllButton href="/universities" label="View all universities" />
          </div>
        </div>
        {
    /* Mobile only — chip filters + horizontal snap carousel */
  }
        <div className="md:hidden mt-3">
          {/* Same row: filter chips on left + compact View All on right corner */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 mb-3">
            <div className="flex gap-1.5 overflow-x-auto min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
              {UNI_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => selectUniChip(chip)}
                  className={`flex-none h-[25px] px-2.5 rounded-full border bg-white text-[11px] cursor-pointer transition-colors ${
                    uniChip === chip ? "border-brand-600 text-brand-600 font-bold bg-blue-50/50" : "border-line-strong text-ink-700"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
            <Link
              to="/universities"
              className="shrink-0 h-[25px] px-2.5 rounded-full bg-brand-50 border border-brand-300 text-brand-700 text-[11px] font-bold flex items-center gap-1 whitespace-nowrap hover:bg-brand-100 active:scale-95 transition-all"
            >
              <span>View All 50+</span>
              <span className="text-[10px]">→</span>
            </Link>
          </div>

          <div
    ref={uniRowRef}
    className="flex gap-2 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
  >
            {filteredFeaturedUnis.map((u) => (
              <article
                key={u.id}
                className="flex-none w-[275px] snap-start border border-brand-200 rounded-xl p-3 bg-white flex flex-col shadow-2xs hover:border-brand-600/50 transition-all"
              >
                <h3 className="font-bold text-[14px] leading-snug text-ink-900 line-clamp-2 mb-2">
                  {u.name}
                </h3>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  {u.rank && <span className="text-[10px] font-medium text-ink-500 bg-canvas px-2 py-0.5 rounded border border-line">{u.rank}</span>}
                </div>
                <div className="space-y-1 text-[11px] bg-canvas/50 p-2 rounded-lg border border-line-strong/30 mb-2.5">
                  {u.rows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-ink-700">{r.label}</span>
                      <span className={`text-right ${r.tone || "font-semibold text-ink-900"}`}>
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => navigate(`/universities/${u.id}`)}
                    className="h-8 rounded-lg bg-brand-600 text-white text-[11px] font-bold hover:bg-brand-700 transition-colors flex items-center justify-center shadow-2xs active:scale-95"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={onOpenHelpDesk}
                    className="h-8 rounded-lg border border-line-strong text-[11px] font-semibold text-ink-700 hover:bg-slate-50 flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <Download className="w-3 h-3 text-brand-600" />
                    Brochure
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {
    /* Desktop — original grid */
  }
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-[17px] mt-[17px]">
          {FEATURED_UNIS.map((u) => <div
    key={u.id}
    className="bg-white rounded-lg border border-line-strong hover:border-brand-600 transition-all hover:shadow-md p-[17px] flex flex-col justify-between"
  >
              <div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  {u.rank && <span className="text-[10.5px] font-medium text-ink-500 bg-canvas px-2 py-0.5 rounded border border-line">{u.rank}</span>}
                </div>
                <h3 className="text-lg font-bold text-ink-900">{u.name}</h3>
                <div className="mt-3 space-y-1.5 text-[12px] bg-canvas/50 p-2.5 rounded border border-line-strong/30">
                  {u.rows.map((r) => <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-ink-700">{r.label}</span>
                      <span className={`text-right ${r.tone || "font-medium text-ink-900"}`}>{r.value}</span>
                    </div>)}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
    type="button"
    onClick={() => navigate(`/universities/${u.id}`)}
    className="w-full py-2 min-h-[44px] md:min-h-0 rounded-md bg-brand-600 text-white text-[12px] font-semibold hover:bg-brand-700 transition-colors"
  >
                  View details
                </button>
                <button
    type="button"
    onClick={onOpenHelpDesk}
    className="w-full py-2 min-h-[44px] md:min-h-0 rounded-md border border-ink-500 text-[12px] font-medium text-ink-700 hover:bg-slate-50 flex items-center justify-center gap-1"
  >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </button>
              </div>
            </div>)}
        </div>


      </section>

      <section id="compare" className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 sm:p-4 md:p-4.5">
        {/* Header Block: Full Width, Engaging & Clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2.5 border-b border-slate-100">
          <div>
            
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-900 leading-tight">
              Compare universities side by side
            </h2>
            <p className="mt-1 text-xs sm:text-[13.5px] text-slate-500 max-w-2xl leading-relaxed">
              See fees, EMI, approvals and exam format for each university, side by side.
            </p>
          </div>

          {/* Course Selector Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Course:</span>
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <select
                aria-label="Select course to compare"
                value={selectedCompareCourse}
                onChange={(e) => setSelectedCompareCourse(e.target.value)}
                className="w-full h-8.5 pl-2.5 pr-7 rounded-lg border border-brand-300 bg-canvas text-xs font-bold text-ink-900 focus:border-brand-700 focus:ring-1 focus:ring-brand-700/15 cursor-pointer appearance-none outline-none"
              >
                {COMPARE_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-brand-700 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="mt-2.5 overflow-x-auto [scrollbar-width:thin]">
          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center justify-between text-[10.5px] text-slate-500 mb-1.5 px-0.5 font-medium">
            <span>← Swipe to compare all universities →</span>
            <span className="text-[10px] text-slate-400">({compareColumns.length} colleges)</span>
          </div>
          <table className="w-full border-collapse min-w-[480px] md:min-w-[700px] text-left">
            <thead>
              <tr>
                <th scope="col" className="py-2 px-2 sm:py-2.5 sm:px-3 w-[100px] sm:w-[130px] md:w-[150px] align-bottom bg-canvas rounded-tl-xl text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 border-b-2 border-slate-200">
                  Criteria
                </th>
                {compareColumns.map((uniIdx, colIdx) => {
                  const uni = COMPARE_UNIVERSITIES[uniIdx];
                  const isLast = colIdx === compareColumns.length - 1;
                  return (
                    <th
                      key={colIdx}
                      scope="col"
                      className={`py-2 px-2.5 sm:py-2.5 sm:px-3 align-top bg-gradient-to-b from-canvas to-white border-b-2 border-brand-300 ${isLast ? "rounded-tr-xl" : ""}`}
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <select
                            aria-label={`University ${colIdx + 1}`}
                            value={uniIdx}
                            onChange={(e) => changeCompareColumn(colIdx, Number(e.target.value))}
                            className="w-full h-8 pl-2 pr-6 rounded-md border border-brand-300 bg-white text-xs font-bold text-ink-900 focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20 cursor-pointer appearance-none truncate outline-none shadow-2xs"
                          >
                            {COMPARE_UNIVERSITIES.map((u, i) => (
                              <option key={i} value={i}>{u.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-brand-700 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                        </div>

                        <div className="flex items-center justify-between gap-1 text-[10.5px]">
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 truncate">
                            UGC Entitled
                          </span>
                          <button
                            type="button"
                            onClick={() => navigate(`/universities/${uni.id}`)}
                            className="text-brand-700 font-bold hover:underline shrink-0"
                          >
                            View Univ &rarr;
                          </button>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
              {COMPARE_CRITERIA.map(([label, key], rowIdx) => (
                <tr key={label} className={rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <th scope="row" className="py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs font-semibold text-ink-900 bg-canvas/80 border-r border-slate-100">
                    {label}
                  </th>
                  {compareColumns.map((uniIdx, colIdx) => {
                    const uni = COMPARE_UNIVERSITIES[uniIdx];
                    const progData = uni.programs[selectedCompareCourse] || uni.programs.overview;
                    const val = key === "approval" ? uni.approval : key === "exam" ? uni.exam : key === "placement" ? getDynamicPlacement(uni, selectedCompareCourse) : progData[key];
                    return (
                      <td key={colIdx} className="py-2 px-2.5 sm:py-2.5 sm:px-3 text-slate-700 leading-snug">
                        {key === "fees" ? (
                          <span className="font-bold text-ink-900 text-xs sm:text-[13.5px] block">{val}</span>
                        ) : key === "placement" ? (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-800 text-xs sm:text-[12.5px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{val}</span>
                          </span>
                        ) : key === "emi" ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                            {val}
                          </span>
                        ) : key === "approval" ? (
                          <span className="flex items-center gap-1.5 font-medium text-slate-800">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{val}</span>
                          </span>
                        ) : (
                          <span className="font-medium text-slate-800">{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Controls: Add University & Program Disclaimer */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-[11px] text-slate-500 leading-tight">
            Showing data for {COMPARE_PROGRAMS.find((p) => p.id === selectedCompareCourse)?.name || "chosen course"}. Check the UGC-DEB website for current approval status.
          </p>

          <button
            type="button"
            onClick={addCompareColumn}
            disabled={compareColumns.length >= 4}
            className="self-start sm:self-auto h-7.5 px-3 rounded-md border border-brand-700 text-brand-700 text-xs font-bold hover:bg-brand-50 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>+ Add University</span>
            <span className="text-[10px] opacity-75">({compareColumns.length}/4)</span>
          </button>
        </div>
      </section>

      {/* Student testimonials are hidden until we have real, consented student reviews.
          The sample data in StudentTestimonials.jsx is placeholder content — replace it, then
          set SHOW_TESTIMONIALS to true. */}
      {SHOW_TESTIMONIALS && <StudentTestimonials onOpenCounseling={onOpenHelpDesk} />}

      {
    /* Counselling Section */
  }
      <section
        id="counselling"
        className="relative isolate overflow-hidden rounded-[20px] bg-gradient-to-br from-brand-50 via-canvas to-white border border-brand-200 text-brand-900 shadow-sm p-3.5 sm:p-5 md:p-6"
      >
        {/* Subtle ambient lighting */}
        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-8">
          {/* Left Column: Copy & Trust Highlights */}
          <div className="px-0 sm:px-2 flex flex-col justify-center">
            {/* Section 1: Advisory Pill Badge */}
            <div className="mb-2.5 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffdf70] bg-accent-50 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11.5px] font-bold tracking-[0.2px] text-[#b47a00] shadow-2xs">
                <Headphones className="w-3.5 h-3.5 text-[#dca400] shrink-0" />
                Free counselling
              </span>
            </div>

            {/* Section 2 & 3: Heading & Descriptive Paragraph with proper spacing */}
            <div className="space-y-2 sm:space-y-4">
              <h2 className="max-w-[680px] text-lg sm:text-2xl md:text-[26px] font-bold leading-tight tracking-tight text-brand-900">
                Not sure which university to choose? <span className="text-brand-600">Talk to an advisor</span>
              </h2>
              <p className="max-w-[660px] text-xs sm:text-[13.5px] text-ink-500 font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                We'll help you compare universities on fees, recognition, curriculum and placement support, and answer your admission questions. Counselling is free and there's no obligation to apply.
              </p>
            </div>

            {/* Trust Checkpoints: compact 2-column grid on mobile */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-6 sm:gap-y-3.5 mt-3.5 sm:mt-6 pt-3 sm:pt-4 border-t border-brand-200/70 text-[11px] sm:text-xs text-brand-900">
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium text-ink-900">Free, no obligation</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium text-ink-900">Based on UGC-DEB listings</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium text-ink-900">EMI options explained</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium text-ink-900">Your number stays private</span>
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request Card */}
          <div className="w-full max-w-[460px] justify-self-end rounded-[18px] border border-white/90 bg-white/95 p-3 sm:p-3.5 text-ink-900 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <h3 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.5px] text-brand-900">
                Request a callback
              </h3>
              <span className="text-[11px] text-ink-500 whitespace-nowrap">Mon–Sat, 9am–7pm</span>
            </div>
            <p className="text-xs text-ink-500 font-normal leading-relaxed mb-2">
              An advisor will call you to talk through your options.
            </p>

            {!leadSubmitted ? <form
    className="space-y-2"
    onSubmit={(e) => {
      e.preventDefault();
      setLeadError("");
      const validation = validateLeadFields({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        requireName: true,
        requireEmail: true
      });
      if (!validation.valid) {
        setLeadError(validation.error);
        return;
      }
      submitLead({
        name: lead.name,
        email: validation.cleanEmail,
        phone_number: validation.cleanPhone,
        preferred_degree: lead.degree ? [lead.degree] : [],
        form_name: "Home Page Counselling Form"
      });
      setLeadSubmitted(true);
    }}
  >
                {leadError && (
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {leadError}
                  </div>
                )}
                <div>
                  <label htmlFor="home-lead-name" className="block text-[10px] font-semibold text-ink-700 uppercase tracking-wider mb-0.5">
                    Full Name
                  </label>
                  <input
                    className="w-full h-9 rounded-[9px] border border-line-strong px-3 text-sm text-ink-900 placeholder:text-ink-500 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none bg-white font-medium transition-all"
                    id="home-lead-name" autoComplete="name" placeholder="Enter your name"
                    required
                    type="text"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="home-lead-email" className="block text-[10px] font-semibold text-ink-700 uppercase tracking-wider mb-0.5">
                    Email Address
                  </label>
                  <input
                    className="w-full h-9 rounded-[9px] border border-line-strong px-3 text-sm text-ink-900 placeholder:text-ink-500 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none bg-white font-medium transition-all"
                    id="home-lead-email" autoComplete="email" placeholder="name@example.com"
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="home-lead-phone" className="block text-[10px] font-semibold text-ink-700 uppercase tracking-wider mb-0.5">
                    Mobile number
                  </label>
                  <div className="flex h-9 rounded-[9px] border border-line-strong focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20 overflow-hidden transition-all bg-white">
                    <span className="bg-canvas text-ink-900 px-2.5 text-xs font-semibold border-r border-line-strong flex items-center shrink-0">
                      +91
                    </span>
                    <input
                      className="w-full border-0 px-3 text-sm text-ink-900 placeholder:text-ink-500 outline-none bg-white font-medium"
                      id="home-lead-phone" autoComplete="tel-national" placeholder="10-digit Mobile Number"
                      required
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      pattern={INDIAN_PHONE_PATTERN}
                      title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: sanitizeIndianPhone(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="home-lead-degree" className="block text-[10px] font-semibold text-ink-700 uppercase tracking-wider mb-0.5">
                    Programme of interest
                  </label>
                  <select
    id="home-lead-degree"
    className="w-full h-9 rounded-[9px] border border-line-strong px-3 text-base sm:text-sm text-ink-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none bg-white font-medium transition-all cursor-pointer"
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
    className="w-full h-10 min-h-10 rounded-[9px] bg-brand-600 hover:bg-brand-600 text-white text-xs sm:text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
    type="submit"
  >
                  <span>Request callback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-ink-500 font-normal pt-1">
                  🔒 We only use your details to respond to your enquiry.
                </p>
              </form> : <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-ink-900">Callback Request Confirmed!</h3>
                <p className="text-xs text-ink-700 max-w-xs mx-auto">
                  A senior academic counselor will call you within 15 minutes regarding <strong>{lead.degree}</strong>.
                </p>
                <button
    type="button"
    onClick={() => setLeadSubmitted(false)}
    className="text-xs font-semibold text-brand-600 hover:underline pt-2 inline-block cursor-pointer"
  >
                  Submit another inquiry
                </button>
              </div>}
          </div>
        </div>
      </section>

      {/* Education Resource Hub: Courses, Exams, News, Blogs */}
      <section id="education-hub" className="w-full bg-white rounded-2xl border border-brand-100 shadow-xs p-5 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight font-sans">
                Explore more
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-normal mt-1 max-w-3xl">
              Courses, entrance exams, education news and guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Courses */}
          <Link
            to="/courses"
            className="group p-5 rounded-xl border border-brand-100 bg-canvas hover:bg-white hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors font-sans">
                Degree Courses
              </h3>
              <p className="text-xs text-ink-700 leading-relaxed font-normal mt-1.5">
                Browse online MBA, MCA, BBA, BCA and more, with syllabus and fees.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 mt-4 group-hover:underline">
              Browse Courses <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Card 2: Exams */}
          <Link
            to="/exams"
            className="group p-5 rounded-xl border border-brand-100 bg-canvas hover:bg-white hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-accent-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors font-sans">
                Entrance Exams
              </h3>
              <p className="text-xs text-ink-700 leading-relaxed font-normal mt-1.5">
                Dates, syllabus and cut-offs for CAT, CUET, MAT, NIMCET and other exams.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 mt-4 group-hover:underline">
              Check Exam Dates <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Card 3: News */}
          <Link
            to="/news"
            className="group p-5 rounded-xl border border-brand-100 bg-canvas hover:bg-white hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-success-50 text-[#15803d] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors font-sans">
                Education News
              </h3>
              <p className="text-xs text-ink-700 leading-relaxed font-normal mt-1.5">
                UGC-DEB notices, rankings and admission deadlines.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 mt-4 group-hover:underline">
              Read Latest News <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Card 4: Blogs */}
          <Link
            to="/blog"
            className="group p-5 rounded-xl border border-brand-100 bg-canvas hover:bg-white hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fae8ff] text-[#a21caf] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Library className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors font-sans">
                Guides
              </h3>
              <p className="text-xs text-ink-700 leading-relaxed font-normal mt-1.5">
                Choosing a programme, online vs distance learning, and career paths.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 mt-4 group-hover:underline">
              Explore All Blogs <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Blogs */}
      <BlogsListSection onOpenHelpDesk={onOpenHelpDesk} className="w-full rounded-2xl border border-brand-100 bg-white p-5 md:p-6 shadow-xs" horizontal autoScroll showDescriptionOnMobile fetchLivePosts />

      {/* Frequently Asked Questions (Accordion) - Last Section */}
      <HomeFaq onOpenHelpDesk={onOpenHelpDesk} />
    </div>
  );
};