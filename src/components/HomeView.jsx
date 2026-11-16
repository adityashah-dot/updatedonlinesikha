import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewAllButton from "./ViewAllButton";
import { getCoursesListing } from "../services/courseApi";
import {
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
import { BlogsListSection } from "./BlogsListSection";

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
      { label: "Avg Career CTC:", value: "\u20B96.5 - 16.0 LPA", tone: "text-[#115eaf] font-semibold" }
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
      { label: "Practical Labs:", value: "100% Virtual Cloud Sandbox", tone: "text-emerald-700 font-medium" }
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
      { label: "Govt Exam Validity:", value: "100% Valid (UPSC/Banking)", tone: "text-emerald-700 font-medium" }
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
    rank: "NIRF #27",
    rows: [
      { label: "Fee Range:", value: "₹80k – ₹1.60L (Course Wise)" },
      { label: "EMI Starts:", value: "₹2,666 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programs:", value: "9+ Courses (UG & PG)" }
    ]
  },
  {
    id: "amity-online",
    name: "Amity University",
    short: "Amity Online",
    naac: "NAAC A+",
    rank: "NIRF #32",
    rows: [
      { label: "Fee Range:", value: "₹1.10L – ₹1.99L (Course Wise)" },
      { label: "EMI Starts:", value: "₹3,333 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programs:", value: "12+ Courses (UG & PG)" }
    ]
  },
  {
    id: "cu-online",
    name: "Chandigarh University",
    short: "CU Online",
    naac: "NAAC A+",
    rank: "NIRF #32",
    rows: [
      { label: "Fee Range:", value: "₹75k – ₹1.50L (Course Wise)" },
      { label: "EMI Starts:", value: "₹2,500 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programs:", value: "8+ Courses (UG & PG)" }
    ]
  },
  {
    id: "manipal-online",
    name: "Manipal University Jaipur",
    short: "Online Manipal",
    naac: "NAAC A+ (3.59 CGPA)",
    rank: "NIRF #64",
    rows: [
      { label: "Fee Range:", value: "₹85k – ₹1.75L (Course Wise)" },
      { label: "EMI Starts:", value: "₹2,916 / mo", tone: "text-emerald-700 font-bold" },
      { label: "Programs:", value: "10+ Courses (UG & PG)" }
    ]
  }
];
const UNI_CHIPS = ["All Unis", "NAAC A++", "NAAC A+"];

const COMPARE_PROGRAMS = [
  { id: "overview", name: "All Programs (Overview Range)" },
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
    exam: "100% Remote AI Web-Cam",
    programs: {
      overview: {
        fees: "₹80,000 – ₹1,60,000",
        perSem: "Starts ₹16,000 / sem",
        emi: "Starts ₹2,666 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,60,000",
        perSem: "₹40,000 / semester",
        emi: "₹5,333 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,40,000",
        perSem: "₹35,000 / semester",
        emi: "₹4,666 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,14,000",
        perSem: "₹19,000 / semester",
        emi: "₹3,166 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,20,000",
        perSem: "₹20,000 / semester",
        emi: "₹3,333 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹96,000",
        perSem: "₹16,000 / semester",
        emi: "₹2,666 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹80,000",
        perSem: "₹20,000 / semester",
        emi: "₹2,666 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  },
  {
    id: "amity-online",
    name: "Amity Online",
    approval: "UGC-DEB / NAAC A+",
    exam: "100% Remote Proctored",
    programs: {
      overview: {
        fees: "₹1,10,000 – ₹1,99,000",
        perSem: "Starts ₹20,000 / sem",
        emi: "Starts ₹3,333 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,99,000",
        perSem: "₹49,750 / semester",
        emi: "₹6,633 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,65,000",
        perSem: "₹41,250 / semester",
        emi: "₹5,500 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,50,000",
        perSem: "₹25,000 / semester",
        emi: "₹4,166 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,40,000",
        perSem: "₹23,333 / semester",
        emi: "₹3,888 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹1,20,000",
        perSem: "₹20,000 / semester",
        emi: "₹3,333 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹1,10,000",
        perSem: "₹27,500 / semester",
        emi: "₹3,666 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  },
  {
    id: "cu-online",
    name: "CU Online",
    approval: "UGC-DEB / NAAC A+",
    exam: "Online LMS Exam",
    programs: {
      overview: {
        fees: "₹75,000 – ₹1,50,000",
        perSem: "Starts ₹15,000 / sem",
        emi: "Starts ₹2,500 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,50,000",
        perSem: "₹37,500 / semester",
        emi: "₹5,000 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,35,000",
        perSem: "₹33,750 / semester",
        emi: "₹4,500 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,05,000",
        perSem: "₹17,500 / semester",
        emi: "₹2,916 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,10,000",
        perSem: "₹18,333 / semester",
        emi: "₹3,055 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹90,000",
        perSem: "₹15,000 / semester",
        emi: "₹2,500 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹85,000",
        perSem: "₹21,250 / semester",
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
        perSem: "Starts ₹17,500 / sem",
        emi: "Starts ₹2,916 / month",
        duration: "2 to 3 Years (UG & PG)"
      },
      mba: {
        fees: "₹1,75,000",
        perSem: "₹43,750 / semester",
        emi: "₹5,833 / month",
        duration: "2 Years (4 Sems)"
      },
      mca: {
        fees: "₹1,50,000",
        perSem: "₹37,500 / semester",
        emi: "₹5,000 / month",
        duration: "2 Years (4 Sems)"
      },
      bba: {
        fees: "₹1,35,000",
        perSem: "₹22,500 / semester",
        emi: "₹3,750 / month",
        duration: "3 Years (6 Sems)"
      },
      bca: {
        fees: "₹1,35,000",
        perSem: "₹22,500 / semester",
        emi: "₹3,750 / month",
        duration: "3 Years (6 Sems)"
      },
      bcom: {
        fees: "₹1,05,000",
        perSem: "₹17,500 / semester",
        emi: "₹2,916 / month",
        duration: "3 Years (6 Sems)"
      },
      mcom: {
        fees: "₹1,00,000",
        perSem: "₹25,000 / semester",
        emi: "₹3,333 / month",
        duration: "2 Years (4 Sems)"
      }
    }
  }
];

const COMPARE_CRITERIA = [
  ["Total fees", "fees"],
  ["Per Semester Fee", "perSem"],
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

const DEGREE_LEVELS = [["Master's (PG)", "PG"], ["Bachelor's (UG)", "UG"], ["Executive Tracks", "EX"]];

export const HomeView = ({ onOpenApply, onOpenHelpDesk }) => {
  const navigate = useNavigate();

  const [selectedDegree, setSelectedDegree] = useState("Online MBA (Master of Business)");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget (\u20B912,000 - \u20B950,000)");
  const [lead, setLead] = useState({ name: "", email: "", phone: "", degree: "Online MBA" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [uniChip, setUniChip] = useState(UNI_CHIPS[0]);
  const [compareColumns, setCompareColumns] = useState([0, 1]);
  const [selectedCompareCourse, setSelectedCompareCourse] = useState("mba");
    const [degreeLevel, setDegreeLevel] = useState("PG");
  const [degreePrograms, setDegreePrograms] = useState(DEGREE_PROGRAMS);
  const uniRowRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    getCoursesListing({ page: 1, limit: 60 })
      .then((res) => {
        if (!isMounted) return;
        const liveCourses = Array.isArray(res?.courses) ? res.courses : [];
        if (liveCourses.length === 0) return;

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
      <HomeHero />

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
          <p className="text-[11px] font-bold tracking-[1.5px] text-[#0b4fa8] uppercase mb-1">DEGREES</p>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#000f22] mb-1">Popular online degree programs</h2>
          <p className="text-[12.5px] text-slate-500 leading-snug mb-3.5">Approved under UGC Section 22 with equivalence to conventional regular degrees.</p>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {DEGREE_LEVELS.map(([label, key]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDegreeLevel(key)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-[12px] font-semibold rounded-lg border-b-2 transition-colors ${
                  degreeLevel === key
                    ? 'text-[#0b4fa8] border-[#0b4fa8] bg-blue-50/80 font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#0b4fa8]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {filteredDegreePrograms.map((p) => {
              const courseHref = p.slug ? `/courses/${p.slug}` : `/courses?search=${encodeURIComponent(p.search || p.n)}`;
              const uniHref = `/universities?search=${encodeURIComponent(p.uniSearch || p.n)}`;
              return (
                <div key={p.n} className="bg-white border border-slate-200/90 rounded-lg p-2.5 sm:p-3 shadow-2xs">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <Link to={courseHref} className="group">
                        <h3 className="text-[14px] font-bold text-[#000f22] group-hover:text-[#0b4fa8] transition-colors leading-tight">{p.n}</h3>
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight truncate">{p.f}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#0b4fa8] bg-[#edf4fd] px-2 py-0.5 rounded border border-[#bed8fb] shrink-0">{p.y}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2 mb-2 pt-2 border-t border-slate-100 text-[10.5px]">
                    <div className="flex flex-col gap-1">
                      <div className="leading-tight">
                        <span className="text-slate-400 font-medium block text-[9.5px] uppercase tracking-wider">{p.lab}</span>
                        <span className="text-slate-700 font-medium line-clamp-1">{p.sp}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-slate-200/80 pl-2">
                      <div className="leading-tight flex items-baseline justify-between gap-1">
                        <div>
                          <span className="text-slate-400 font-medium block text-[9.5px] uppercase tracking-wider">Avg. Placement</span>
                          <span className="text-slate-800 font-semibold">{p.ctc}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 font-medium block text-[9.5px] uppercase tracking-wider">Total Fee</span>
                          <span className="text-[11.5px] font-bold text-[#000f22] block leading-tight">{p.totalFee}</span>
                          <span className="text-[9px] text-slate-500 block leading-tight">{p.sems}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link to={courseHref} className="w-full h-7.5 rounded-md border border-[#0b4fa8] text-[#0b4fa8] text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.98] hover:bg-[#eff5ff] transition-colors text-center">
                      Course Details
                    </Link>
                    <Link to={uniHref} className="w-full h-7.5 rounded-md bg-[#0b4fa8] hover:bg-[#073774] text-white text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.98] transition-colors text-center shadow-2xs">
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
          <div className="hd flex flex-col md:flex-row md:items-end md:justify-between gap-5 flex-wrap mb-7">
            <div>
              <h2 id="degrees-heading" className="text-xl sm:text-2xl font-bold leading-[1.15] tracking-[-0.025em] text-[#000f22]">Popular online degree programs</h2>
              <p className="s mt-2.5 text-[14px] text-[#43474d] max-w-[52ch]">Approved under UGC Section 22 with equivalence to conventional regular degrees.</p>
            </div>
            <div className="tabs flex overflow-x-auto border-b border-[#c4c6ce]" role="tablist" aria-label="Level">
              {DEGREE_LEVELS.map(([label, key], i) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={degreeLevel === key}
                  onClick={() => setDegreeLevel(key)}
                  className={`whitespace-nowrap bg-transparent border-0 border-b-2 -mb-px px-4 py-2.5 min-h-[44px] text-[14px] font-medium cursor-pointer transition-colors ${degreeLevel === key ? "text-[#115eaf] border-[#115eaf]" : "text-[#43474d] border-transparent hover:text-[#000f22]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {filteredDegreePrograms.length === 0 ? (
              <p className="em py-7 text-[14px] text-[#43474d]">No executive programs are listed yet. Connect this tab to your existing data.</p>
            ) : (
              filteredDegreePrograms.map((p, idx) => {
                const courseHref = p.slug ? `/courses/${p.slug}` : `/courses?search=${encodeURIComponent(p.search || p.n)}`;
                const uniHref = `/universities?search=${encodeURIComponent(p.uniSearch || p.n)}`;
                return (
                <div
                  key={p.n + idx}
                  className={`dg grid grid-cols-2 md:grid-cols-[88px_1.5fr_1.6fr_1.1fr_1fr_auto] gap-x-4 gap-y-2 md:gap-4 items-center py-2 md:py-[9px] border-b border-[#e2e8f0] ${idx === 0 ? "border-t-2 border-t-[#000f22]" : ""}`}
                >
                  <span className="du col-span-2 md:col-span-1 order-first md:order-none text-[12px] text-[#475569] font-medium leading-[1.3]">{p.y}</span>
                  <div className="col-span-2 md:col-span-1">
                    <Link
                      to={courseHref}
                      className="group/course block no-underline"
                    >
                      <h3 className="font-bold tracking-[-0.01em] text-[14.5px] leading-[1.25] text-[#000f22] group-hover/course:text-[#0b4fa8] transition-colors">
                        {p.n}
                        <small className="block mt-0.5 text-[11.5px] font-normal text-[#64748b] tracking-normal group-hover/course:text-[#0b4fa8]/80">{p.f}</small>
                      </h3>
                    </Link>
                    {p.tg ? <span className="tg block mt-1 text-[11.5px] text-[#0b4fa8] font-medium">{p.tg}</span> : null}
                  </div>
                  <div className="sp col-span-2 md:col-span-1 text-[12.5px] text-[#475569] leading-[1.25]">
                    <span className="lb block mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">{p.lab}</span>
                    {p.sp}
                  </div>
                  <div className="sp col-span-1 md:col-span-1 text-[12px] text-[#475569] leading-[1.25]">
                    <span className="lb block mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">Avg. Placement</span>
                    <span className="font-medium text-[#1e293b]">{p.ctc}</span>
                  </div>
                  <div className="pr col-span-1 md:col-span-1 text-[12px] text-[#475569] leading-[1.25]">
                    <span className="lb block mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">Total Program Fee</span>
                    <b className="block text-[14.5px] font-bold text-[#000f22] tracking-tight leading-tight">{p.totalFee}</b>
                    <span className="text-[10px] text-[#64748b] block mt-0.5">{p.sems}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 justify-self-start md:justify-self-center md:self-center flex flex-col items-start md:items-center gap-1">
                    <Link
                      className="btn inline-flex items-center justify-center bg-[#0b4fa8] hover:bg-[#073774] text-white border-0 rounded-md px-4 py-1.5 min-h-[34px] text-[12px] font-semibold no-underline cursor-pointer whitespace-nowrap transition-colors shadow-2xs"
                      to={uniHref}
                    >
                      Explore {p.c} Univ.
                    </Link>
                    <Link
                      to={courseHref}
                      className="text-[10.5px] font-semibold text-[#0b4fa8] hover:underline inline-flex items-center gap-0.5"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[#c4c6ce]/40 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#115eaf]" />
              <h2 className="sm:text-2xl font-bold text-[#000f22] max-[380px]:whitespace-normal whitespace-nowrap">Explore Some Popular Universities</h2>
            </div>
          </div>
          <ViewAllButton href="/universities" label="View All 50+ Universities" />
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
                <h3 className="font-bold leading-[1.35] text-[#000f22] line-clamp-2 mb-2.5">
                  {u.name}
                </h3>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  <span className="text-[10.5px] font-medium text-[#64748b] bg-[#f8fafc] px-2 py-0.5 rounded border border-[#e2e8f0]">{u.rank}</span>
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
                  <span className="text-[10.5px] font-medium text-[#64748b] bg-[#f8fafc] px-2 py-0.5 rounded border border-[#e2e8f0]">{u.rank}</span>
                </div>
                <h3 className="text-lg font-bold text-[#000f22]">{u.name}</h3>
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

      <section id="compare" className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-5 md:p-6">
        {/* Header Block: Full Width, Engaging & Clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3.5 border-b border-slate-100">
          <div>
            
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#000f22] leading-tight">
              Compare Universities Side by Side
            </h2>
            <p className="mt-1 text-xs sm:text-[13.5px] text-slate-500 max-w-2xl leading-relaxed">
              Evaluate total course fees, 0% monthly EMI, UGC approvals, and examination modes across accredited online universities.
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
                className="w-full h-9.5 pl-3 pr-8 rounded-lg border border-[#bed8fb] bg-[#f8fbff] text-xs sm:text-[13px] font-bold text-[#000f22] focus:border-[#0b4fa8] focus:ring-2 focus:ring-[#0b4fa8]/15 cursor-pointer appearance-none outline-none"
              >
                {COMPARE_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#0b4fa8] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="mt-3.5 overflow-x-auto [scrollbar-width:thin]">
          <table className="w-full border-collapse min-w-[620px] text-left">
            <thead>
              <tr>
                <th scope="col" className="p-3 w-[150px] sm:w-[170px] align-bottom bg-[#f8fafc] rounded-tl-xl text-xs font-bold uppercase tracking-wider text-slate-500 border-b-2 border-slate-200">
                  Criteria
                </th>
                {compareColumns.map((uniIdx, colIdx) => {
                  const uni = COMPARE_UNIVERSITIES[uniIdx];
                  const isLast = colIdx === compareColumns.length - 1;
                  return (
                    <th
                      key={colIdx}
                      scope="col"
                      className={`p-3 align-top bg-gradient-to-b from-[#f8fbff] to-white border-b-2 border-[#bed8fb] ${isLast ? "rounded-tr-xl" : ""}`}
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <select
                            aria-label={`University ${colIdx + 1}`}
                            value={uniIdx}
                            onChange={(e) => changeCompareColumn(colIdx, Number(e.target.value))}
                            className="w-full h-9 pl-2.5 pr-7 rounded-lg border border-[#bed8fb] bg-white text-xs sm:text-[13px] font-bold text-[#000f22] focus:border-[#0b4fa8] focus:ring-2 focus:ring-[#0b4fa8]/20 cursor-pointer appearance-none truncate outline-none shadow-2xs"
                          >
                            {COMPARE_UNIVERSITIES.map((u, i) => (
                              <option key={i} value={i}>{u.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-[#0b4fa8] pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                        </div>

                        <div className="flex items-center justify-between gap-1 text-[10.5px]">
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 truncate">
                            UGC Entitled
                          </span>
                          <button
                            type="button"
                            onClick={() => navigate(`/universities/${uni.id}`)}
                            className="text-[#0b4fa8] font-bold hover:underline shrink-0"
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
                  <th scope="row" className="p-3 text-xs font-semibold text-[#000f22] bg-[#f8fafc]/80 border-r border-slate-100">
                    {label}
                  </th>
                  {compareColumns.map((uniIdx, colIdx) => {
                    const uni = COMPARE_UNIVERSITIES[uniIdx];
                    const progData = uni.programs[selectedCompareCourse] || uni.programs.overview;
                    const val = key === "approval" ? uni.approval : key === "exam" ? uni.exam : progData[key];
                    return (
                      <td key={colIdx} className="p-3 text-slate-700 leading-snug">
                        {key === "fees" ? (
                          <div>
                            <span className="font-bold text-[#000f22] text-sm sm:text-[14px] block">{val}</span>
                            <span className="text-[10px] text-slate-400">Total Program Investment</span>
                          </div>
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
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <p className="text-[11px] text-slate-500 leading-tight">
            * Data reflected for {COMPARE_PROGRAMS.find((p) => p.id === selectedCompareCourse)?.name || "chosen course"}. Approvals verified via official UGC-DEB notifications.
          </p>

          <button
            type="button"
            onClick={addCompareColumn}
            disabled={compareColumns.length >= 4}
            className="self-start sm:self-auto h-8 px-3.5 rounded-lg border border-[#0b4fa8] text-[#0b4fa8] text-xs font-bold hover:bg-[#edf4fd] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>+ Add University</span>
            <span className="text-[10px] opacity-75">({compareColumns.length}/4)</span>
          </button>
        </div>
      </section>

      {
    /* Student Testimonials & Social Proof */
  }
      <StudentTestimonials onOpenCounseling={onOpenHelpDesk} />

      {
    /* Counselling Section */
  }
      <section
        id="counselling"
        className="relative isolate overflow-hidden rounded-[20px] bg-gradient-to-br from-[#eef6ff] via-[#f7fbff] to-white border border-[#d0e2fa] text-[#0b1d3a] shadow-sm p-4 sm:p-5 md:p-6"
      >
        {/* Subtle ambient lighting */}
        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-8">
          {/* Left Column: Copy & Trust Highlights */}
          <div className="px-1 sm:px-2 flex flex-col justify-center">
            {/* Section 1: Advisory Pill Badge */}
            <div className="mb-3.5 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffdf70] bg-[#fffdf2] px-3 py-1.5 text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.2px] text-[#b47a00] shadow-2xs">
                <Headphones className="w-3.5 h-3.5 text-[#dca400] shrink-0" />
                FREE 1-ON-1 ACADEMIC ADVISORY
              </span>
            </div>

            {/* Section 2 & 3: Heading & Descriptive Paragraph with proper spacing */}
            <div className="space-y-3.5 sm:space-y-4">
              <h2 className="max-w-[680px] text-xl sm:text-2xl md:text-[26px] font-bold leading-tight tracking-tight text-[#0b1d3a]">
                Confused Between 50+ Universities? Speak with an <span className="text-[#115eaf]">Unbiased Academic Expert</span>
              </h2>
              <p className="max-w-[660px] text-xs sm:text-[13.5px] text-[#556377] font-normal leading-relaxed">
                Choosing the right online university impacts your career and finances for years. Our certified advisors provide objective comparisons across UGC-DEB entitlements, syllabus depth, recruiter networks, and genuine fee financing — 100% free with zero sales bias.
              </p>
            </div>

            {/* Trust Checkpoints: with healthy gap between items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mt-5 sm:mt-6 pt-4 border-t border-[#d8e6f8]/70 text-xs text-[#0b1d3a]">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#1e293b]">100% Free &amp; Unbiased Counseling</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#1e293b]">Official UGC-DEB &amp; NAAC Data</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#1e293b]">0% Interest Monthly EMI Guidance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#1e293b]">Zero Spam &amp; Complete Privacy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request Card */}
          <div className="w-full max-w-[460px] justify-self-end rounded-[18px] border border-white/90 bg-white/95 p-3 sm:p-3.5 text-[#111c2d] shadow-[0_8px_20px_rgba(27,65,112,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <h3 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.5px] text-[#0b1d3a]">
                Request Free Callback
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#087955] bg-[#effdf6] rounded-full border border-[#a5f3d0]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Advisors Online
              </span>
            </div>
            <p className="text-xs text-[#6b7280] font-normal leading-relaxed mb-2">
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
                    Full Name
                  </label>
                  <input
                    className="w-full h-9 rounded-[9px] border border-[#c4c6ce] px-3 text-sm text-[#000f22] placeholder:text-[#74777e] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all"
                    placeholder="Enter your name"
                    required
                    type="text"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                    Email Address
                  </label>
                  <input
                    className="w-full h-9 rounded-[9px] border border-[#c4c6ce] px-3 text-sm text-[#000f22] placeholder:text-[#74777e] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all"
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#43474d] uppercase tracking-wider mb-0.5">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <div className="flex h-9 rounded-[9px] border border-[#c4c6ce] focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/20 overflow-hidden transition-all bg-white">
                    <span className="bg-[#f0f4f8] text-[#000f22] px-2.5 text-xs font-semibold border-r border-[#c4c6ce] flex items-center shrink-0">
                      +91
                    </span>
                    <input
                      className="w-full border-0 px-3 text-sm text-[#000f22] placeholder:text-[#74777e] outline-none bg-white font-medium"
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
                    Program You're Exploring
                  </label>
                  <select
    className="w-full h-9 rounded-[9px] border border-[#c4c6ce] px-3 text-base sm:text-sm text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none bg-white font-medium transition-all cursor-pointer"
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

      {/* Education Resource Hub: Courses, Exams, News, Blogs */}
      <section id="education-hub" className="w-full bg-white rounded-2xl border border-[#e7eeff] shadow-xs p-5 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#115eaf]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] tracking-tight font-sans">
                Explore Higher Education Gateways
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal mt-1 max-w-3xl">
              Comprehensive guidance across verified online degree courses, national entrance exams, university news, and expert articles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Courses */}
          <Link
            to="/courses"
            className="group p-5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:bg-white hover:border-[#115eaf] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#e7eeff] text-[#115eaf] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors font-sans">
                Degree Courses
              </h3>
              <p className="text-xs text-[#43474d] leading-relaxed font-normal mt-1.5">
                Explore 35+ accredited online degree courses like MBA, MCA, BCA, BBA with verified syllabus and fee structures.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#115eaf] mt-4 group-hover:underline">
              Browse Courses <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Card 2: Exams */}
          <Link
            to="/exams"
            className="group p-5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:bg-white hover:border-[#115eaf] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#b45309] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors font-sans">
                Entrance Exams
              </h3>
              <p className="text-xs text-[#43474d] leading-relaxed font-normal mt-1.5">
                Check dates, syllabus, cutoff marks and preparation strategies for national exams like CAT, CUET, MAT, and NIMCET.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#115eaf] mt-4 group-hover:underline">
              Check Exam Dates <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Card 3: News */}
          <Link
            to="/news"
            className="group p-5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:bg-white hover:border-[#115eaf] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#dcfce7] text-[#15803d] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors font-sans">
                Education News
              </h3>
              <p className="text-xs text-[#43474d] leading-relaxed font-normal mt-1.5">
                Stay updated with UGC-DEB notifications, university rankings, admission deadlines, and policy circulars.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#115eaf] mt-4 group-hover:underline">
              Read Latest News <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Card 4: Blogs */}
          <Link
            to="/blog"
            className="group p-5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:bg-white hover:border-[#115eaf] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fae8ff] text-[#a21caf] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Library className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors font-sans">
                Educational Blogs
              </h3>
              <p className="text-xs text-[#43474d] leading-relaxed font-normal mt-1.5">
                Expert insights, ROI calculations, online vs distance comparisons, and career roadmap articles.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#115eaf] mt-4 group-hover:underline">
              Explore All Blogs <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Blogs */}
      <BlogsListSection onOpenHelpDesk={onOpenHelpDesk} className="w-full rounded-2xl border border-[#e7eeff] bg-white p-5 md:p-6 shadow-xs" horizontal autoScroll showDescriptionOnMobile fetchLivePosts />

      {/* Frequently Asked Questions (Accordion) - Last Section */}
      <HomeFaq onOpenHelpDesk={onOpenHelpDesk} />
    </div>
  );
};