import { useState, useEffect } from "react";
import { COURSES_DATA } from "../data/coursesData";
import { DEGREEFYD_LPU_API } from "../data/apiData";
import { ProgrammeCardsSection } from "./ProgrammeCardsSection";
import { BlogsListSection } from "./BlogsListSection";
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
  ArrowRight
} from "lucide-react";
import { TableOfContents } from "./TableOfContents";
const RECRUITER_LOGOS = [
  { name: "Amazon", src: "/logos/amazon.jpg" },
  { name: "Cognizant", src: "/logos/cognizant.jpg" },
  { name: "TCS", src: "/logos/tcs.jpg" },
  { name: "Infosys", src: "/logos/infosys.png" },
  { name: "Wipro", src: "/logos/wipro.jpg" },
  { name: "Tech Mahindra", src: "/logos/techmahindra.jpg" },
  { name: "Capgemini", src: "/logos/capgemini.png" },
  { name: "Deloitte", src: "/logos/deloitte.jpg" },
  { name: "Times Internet", src: "/logos/timesinternet.jpg" }
];
const CAMPUS_IMAGES = [
  {
    src: "/images/campusviewlpu.jpeg",
    alt: "Lovely Professional University campus view"
  },
  {
    src: "/images/campusarealpu.jpeg",
    alt: "Lovely Professional University campus aerial view"
  },
  {
    src: "/images/campusviewlpu.jpeg",
    alt: "Lovely Professional University campus view"
  },
  {
    src: "/images/campusarealpu.jpeg",
    alt: "Lovely Professional University campus aerial view"
  }
];
const RecruiterScroll = () => {
  const doubled = [...RECRUITER_LOGOS, ...RECRUITER_LOGOS];
  return <div className="relative overflow-hidden">
      <div className="flex items-center gap-6 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((r, i) => <div
    key={`${r.name}-${i}`}
    className="flex items-center justify-center h-16 min-w-[125px] px-3.5 bg-[#f9f9ff] border border-[#e7eeff] rounded-lg shrink-0"
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
export const OverviewView = ({
  onSelectCourse,
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  universityNavigation
}) => {
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("latest-news");
  const [selectedHighlightCategory, setSelectedHighlightCategory] = useState("All");
  const [selectedReviewCategory, setSelectedReviewCategory] = useState("All");
  const [tocOpen, setTocOpen] = useState(false);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [courseFeeSearch, setCourseFeeSearch] = useState("");
  const [blogIndex, setBlogIndex] = useState(0);
  const [blogVisible, setBlogVisible] = useState(3);
  const [openAdmissionStep, setOpenAdmissionStep] = useState(0);
  const [visibleAdmissionSteps, setVisibleAdmissionSteps] = useState([]);
  const [examStep, setExamStep] = useState(0);
  const ADMISSION_FLOW_STEPS = [
    {
      title: "Online Registration",
      description: "Visit the Lovely Professional University Online official portal and register using personal details such as name, email ID and mobile number. Login credentials are generated after successful registration."
    },
    {
      title: "Application Form Submission",
      description: "Fill out the online application form by selecting the desired programme and entering personal and academic details."
    },
    {
      title: "Document Upload",
      description: "Upload scanned copies of academic documents, identity proof, and photographs as part of the application process."
    },
    {
      title: "Eligibility Verification",
      description: "The university verifies eligibility based on academic qualifications and programme guidelines."
    },
    {
      title: "Fee Payment and Admission Confirmation",
      description: "Admission is confirmed after fee payment. Roll number and LMS login are issued to the student."
    }
  ];
  useEffect(() => {
    const stepNodes = Array.from(document.querySelectorAll(".admission-flow-step"));
    if (!stepNodes.length) return;
    if (!("IntersectionObserver" in window)) {
      setVisibleAdmissionSteps(stepNodes.map((_, index) => index));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.stepIndex ?? 0);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleAdmissionSteps((prev) => prev.includes(index) ? prev : [...prev, index]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.35 }
    );
    stepNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(".exam-step-reveal"));
    if (!revealNodes.length) return;
    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("show"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const EXAM_STEPS = [
    {
      title: "Semester-Based Structure",
      description: "Each programme follows a semester-based academic system.",
      points: [
        "The programme is divided into semesters.",
        "Fees are paid semester-wise.",
        "Every semester ends with an online examination."
      ]
    },
    {
      title: "Continuous Internal Assessment",
      description: "Evaluation is carried out through assignments, quizzes, and academic activities during the semester.",
      points: [
        "Assignments are given during the semester.",
        "Quizzes check your progress along the way.",
        "Academic activities add to your internal assessment."
      ]
    },
    {
      title: "End-Semester Online Examination",
      description: "Online monitoring examinations are conducted at the end of each semester.",
      points: [
        "The exam is conducted online with monitoring.",
        "It takes place at the end of every semester.",
        "It is taken through the digital learning platform."
      ]
    },
    {
      title: "Result Declaration",
      description: "Final results are declared after evaluation. Students meeting the criteria progress to the next semester.",
      points: [
        "Results are declared after evaluation.",
        "Evaluation includes internal assessment and the end-semester exam.",
        "Students who meet the criteria move to the next semester."
      ]
    }
  ];
  const LPU_POPULAR_PROGRAMMES = [
    {
      id: "mba",
      title: "Online MBA",
      subtitle: "Master of Business Administration",
      duration: "2 Years",
      fee: "\u20B91,86,000",
      mode: "Online",
      specialisations: [
        "Finance",
        "Marketing",
        "Human Resource",
        "Data Science",
        "Business Analytics",
        "Operations",
        "International Business",
        "Digital Marketing",
        "IT",
        "Retail",
        "Supply Chain",
        "Agri-Business"
      ]
    },
    {
      id: "mca",
      title: "Online MCA",
      subtitle: "Master of Computer Applications",
      duration: "2 Years",
      fee: "\u20B91,40,000",
      mode: "Online",
      specialisations: [
        "Cloud Computing",
        "AI & Machine Learning",
        "Full Stack Development",
        "Data Science",
        "Cyber Security",
        "Blockchain",
        "AR/VR"
      ]
    },
    {
      id: "bca",
      title: "Online BCA",
      subtitle: "Bachelor of Computer Applications",
      duration: "3 Years",
      fee: "\u20B91,59,000",
      mode: "Online",
      specialisations: ["Cloud & DevOps", "Data Analytics", "AI & ML"]
    },
    {
      id: "bba",
      title: "Online BBA",
      subtitle: "Bachelor of Business Administration",
      duration: "3 Years",
      fee: "\u20B91,38,000",
      mode: "Online",
      specialisations: ["General", "Business Analytics"]
    },
    {
      id: "ba",
      title: "Online BA",
      subtitle: "Bachelor of Arts",
      duration: "3 Years",
      fee: "\u20B91,14,000",
      mode: "Online",
      specialisations: [
        "English",
        "Political Science",
        "Sociology",
        "Psychology",
        "History",
        "Economics",
        "Public Administration",
        "Artificial Intelligence"
      ]
    },
    {
      id: "mcom",
      title: "Online M.Com",
      subtitle: "Master of Commerce",
      duration: "2 Years",
      fee: "\u20B996,000",
      mode: "Online",
      specialisations: ["Finance", "Accounting & Taxation"]
    }
  ];
  const HIGHLIGHT_CATEGORIES = ["All", "Institution", "Academic", "Accreditations", "Technology", "Evaluation", "Info"];
  const TOC_ITEMS = [
    { id: "latest-news", label: "LPU Online Latest News & Updates" },
    { id: "highlights", label: "LPU Online Admission Highlights 2026" },
    { id: "courses-fees", label: "LPU Online Courses and Fees 2026" },
    { id: "popular-programmes", label: "LPU Online Popular Programmes" },
    { id: "eligibility-criteria", label: "LPU Online Eligibility & Selection Criteria 2026" },
    { id: "admission-process", label: "LPU Online Admission Process 2026" },
    { id: "rankings", label: "LPU Online Rankings & Accreditations" },
    { id: "examination-pattern", label: "LPU Online Examination Pattern" },
    { id: "placements", label: "LPU Online Placements" },
    { id: "campus", label: "LPU Online Campus" },
    { id: "sample-degree", label: "LPU Online Sample Degree" },
    { id: "reviews-section", label: "LPU Online Student Reviews & FAQs" },
    { id: "compare-colleges", label: "Compare Colleges" },
    { id: "blogs", label: "Blogs" },
    { id: "related-colleges", label: "Related Colleges" }
  ];
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
      return 3;
    };
    const onResize = () => {
      const v = getVisible();
      setBlogVisible(v);
      setBlogIndex((i) => Math.min(i, Math.max(0, DEGREEFYD_LPU_API.blogs.posts.length - v)));
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
    const errors = {};
    if (!counselingForm.phone || !/^\d{10}$/.test(counselingForm.phone.replace(/\D/g, ""))) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    if (!counselingForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(counselingForm.email)) {
      errors.email = "Enter a valid email address";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
    }
  };
  return <div className="space-y-0">
      {
    /* Breadcrumb Bar */
  }
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-[#43474d] space-x-2 font-medium">
            <span className="hover:text-[#115eaf] cursor-pointer">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">Colleges</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">Lovely Professional University Online</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="text-[#000f22] font-bold">Overview</span>
          </nav>
        </div>
      </div>

      {
    /* HERO SECTION — college-hero layout */
  }
      <section className="bg-white text-[#000f22] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">

          {
    /* College Header: Logo + Title + Meta + Badges */
  }
          <div className="flex flex-row items-start gap-3 sm:gap-5">
            <img
    src={DEGREEFYD_LPU_API.hero.logoImage}
    alt="LPU Logo"
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
            <div className="min-w-0">
              <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]">
                {DEGREEFYD_LPU_API.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">#31 NIRF Rank</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">NAAC A++</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">UGC-DEB</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold">AICTE</span>
              </div>
            </div>
          </div>

          {
    /* Body: location + text left; image top-aligned to location line */
  }
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4">
            <div className="order-2 lg:order-none lg:col-span-7 space-y-3">
              <p className="section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                {DEGREEFYD_LPU_API.location} · Private · Est. {DEGREEFYD_LPU_API.established} ·{" "}
                <span className="inline-flex items-center gap-0.5 font-bold text-[#B45309]">
                  <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                  {DEGREEFYD_LPU_API.rating}
                </span>
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.hero.description}
              </p>
              <p className="text-sm text-[#2d3137] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.hero.heroSub}
              </p>
            </div>

            {
    /* Right: Campus Image — top aligned with location line; 50px to Free Apply */
  }
            <div className="order-1 lg:order-none lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
    src={DEGREEFYD_LPU_API.hero.backgroundImage}
    alt="Lovely Professional University Campus"
    className="w-full h-48 sm:h-60 lg:h-64 object-cover"
    loading="lazy"
  />
              </div>
            </div>
          </div>

          {
    /* Stats + Brochure + Apply Now — same line; 100px from Free Apply edge */
  }
          <div className="flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]">
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">₹46K – ₹1.86L</span>
              <span className="text-[10px] text-[#74777e]">Fee Range</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#115eaf] font-sans">1 – 3 Years</span>
              <span className="text-[10px] text-[#74777e]">Duration</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#000f22] font-sans">Online</span>
              <span className="text-[10px] text-[#74777e]">Semester-based</span>
            </div>
            <div className="bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]">
              <span className="block text-sm font-bold text-[#B45309] font-sans">90%</span>
              <span className="text-[10px] text-[#74777e]">Placement Rate</span>
            </div>
            <div className="flex items-center gap-3 md:ml-auto">
              <button
    onClick={() => onOpenBrochure()}
    className="px-5 py-2.5 rounded-xl bg-white text-[#115eaf] border border-[#115eaf] text-xs sm:text-sm font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                <Download className="w-4 h-4" />
                Brochure
              </button>
              <button
    onClick={() => onOpenApply()}
    className="px-6 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2"
  >
                Apply Now
                <ArrowRight className="w-4 h-4" />
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
            {
    /* Table of Contents - Directly on the Page */
  }
            <TableOfContents
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
            <section id="latest-news" className="page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff] scroll-mt-[130px]">
              <h2 className="section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans">
                {DEGREEFYD_LPU_API.latestNews.title}
              </h2>
              <p className="section-description text-sm text-[#2d3137] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.latestNews.description}
              </p>
              <p className="text-[11px] text-[#74777e] font-normal">
                {DEGREEFYD_LPU_API.latestNews.date} · {DEGREEFYD_LPU_API.latestNews.author}
              </p>
            </section>

            {
    /* 2. Highlights Table 2026 */
  }
            <section id="highlights" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                    LPU Online Highlights 2026
                  </h2>
                </div>
                <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2 min-h-[44px] bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5 shadow-xs"
  >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Factsheet</span>
                </button>
              </div>

              <p className="section-description mt-[18px] text-sm font-normal text-[#2d3137] leading-relaxed">
                {DEGREEFYD_LPU_API.highlightsIntro}
              </p>

              {
    /* Category Filter */
  }
              <div className="flex flex-wrap gap-2 mt-[18px]">
                {HIGHLIGHT_CATEGORIES.map((cat) => <button
    key={cat}
    onClick={() => setSelectedHighlightCategory(cat)}
    className={`tap-chip min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedHighlightCategory === cat ? "bg-[#115eaf] text-white border-[#115eaf]" : "bg-[#f0f3ff] text-[#43474d] border-[#e7eeff] hover:border-[#115eaf]"}`}
  >
                    {cat}
                  </button>)}
              </div>

              {
    /* Highlights Table */
  }
              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-3 px-4 font-bold">Particulars</th>
                      <th className="py-3 px-4 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {(() => {
    const filtered = DEGREEFYD_LPU_API.highlightsTable.filter(
      (row) => selectedHighlightCategory === "All" || row.category === selectedHighlightCategory
    );
    const visible = highlightsExpanded ? filtered : filtered.slice(0, 8);
    return visible.map((row, idx) => <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                          <td className="py-2.5 px-4 font-normal text-[#000f22]">
                            {row.label}
                          </td>
                          <td className="py-2.5 px-4 font-normal text-[#2d3137]">{row.value}</td>
                        </tr>);
  })()}
                  </tbody>
                </table>
              </div>

              {(() => {
    const filtered = DEGREEFYD_LPU_API.highlightsTable.filter(
      (row) => selectedHighlightCategory === "All" || row.category === selectedHighlightCategory
    );
    return filtered.length > 8 && <button
      onClick={() => setHighlightsExpanded(!highlightsExpanded)}
      className="w-full min-h-[44px] py-2 bg-[#f0f3ff] text-[#115eaf] border border-[#d5e3ff] rounded-xl text-xs font-bold hover:bg-[#e7eeff] transition-all mt-[18px]"
    >
                  {highlightsExpanded ? "Show Less" : "Show More Highlights"}
                </button>;
  })()}

              {
    /* CTA */
  }
              <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]">
                <p className="text-sm font-semibold text-[#2d3137] leading-relaxed">
                  Unlock Full College Insights to Choose the Right Program for Your Future
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
    onClick={() => onOpenBrochure()}
    className="px-4 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5"
  >
                    <Download className="w-3.5 h-3.5" />
                    Download Brochure
                  </button>
                  <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Apply Now
                  </button>
                </div>
              </div>
            </section>

            {
    /* 3. Courses & Fees 2026 */
  }
            <section id="courses-fees" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-2xl font-bold text-[#000f22] font-sans">
                  LPU Online Courses and Fees 2026
                </h2>
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.coursesFees.intro}
                </p>
              </div>

              {
    /* Search */
  }
              <div className="relative mt-[18px]">
                <input
    type="text"
    value={courseFeeSearch}
    onChange={(e) => setCourseFeeSearch(e.target.value)}
    placeholder={DEGREEFYD_LPU_API.coursesFees.searchPlaceholder}
    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] text-sm text-[#000f22] font-normal placeholder:text-[#74777e] focus:outline-none focus:border-[#115eaf] focus:bg-white transition-all"
  />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777e]" />
              </div>

              {
    /* Fee Table */
  }
              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-2 px-3 font-bold">Degree</th>
                      <th className="py-2 px-3 font-bold">Duration</th>
                      <th className="py-2 px-3 font-bold">Avg. Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {DEGREEFYD_LPU_API.coursesFees.table.filter(
    (c) => c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())
  ).map((c) => <tr key={c.degree} className="bg-white hover:bg-[#f9f9ff] transition-colors">
                          <td className="py-2 px-3 align-top">
                            <button
    onClick={() => {
      const course = COURSES_DATA.find((x) => x.id === c.courseId);
      if (course) onSelectCourse(course);
    }}
    className="block text-left text-xs sm:text-[13px] font-normal text-[#115eaf] hover:text-[#004689] hover:underline transition-colors"
  >
                              {c.degree}
                            </button>
                            <span className="block text-[10px] text-[#74777e] font-normal leading-tight">{c.specializations}</span>
                          </td>
                          <td className="py-2 px-3 text-[#43474d] font-normal align-top whitespace-nowrap">{c.duration}</td>
                          <td className="py-2 px-3 text-[#115eaf] font-normal align-top whitespace-nowrap">{c.avgFees}</td>
                        </tr>)}
                    {DEGREEFYD_LPU_API.coursesFees.table.filter(
    (c) => c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())
  ).length === 0 && <tr className="bg-white">
                        <td colSpan={3} className="py-6 text-center text-xs text-[#74777e] font-normal">No programmes match your search.</td>
                      </tr>}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#74777e] font-normal mt-[18px]">
                {courseFeeSearch ? `Showing ${DEGREEFYD_LPU_API.coursesFees.table.filter((c) => c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())).length} out of ${DEGREEFYD_LPU_API.coursesFees.table.length} Degrees` : DEGREEFYD_LPU_API.coursesFees.showing}
              </p>

              {
    /* Actions */
  }
              <div className="flex flex-wrap gap-3 mt-[18px]">
                <button className="px-5 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all">
                  {DEGREEFYD_LPU_API.coursesFees.roiCalculator}
                </button>
                <button
    onClick={() => onOpenBrochure()}
    className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm"
  >
                  <Download className="w-3.5 h-3.5" />
                  {DEGREEFYD_LPU_API.coursesFees.viewFeeStructure}
                </button>
              </div>
            </section>

            {
    /* 3b. Popular Programmes (Programme Cards) */
  }
            <ProgrammeCardsSection
    sectionId="popular-programmes"
    title="LPU Online Popular Programmes"
    description="Explore LPU Online’s most popular UG and PG programmes across Management, Computer Applications, Commerce, and Arts — built for working professionals."
    programmes={LPU_POPULAR_PROGRAMMES}
    onOpenBrochure={() => onOpenBrochure()}
    onOpenApply={() => onOpenApply()}
  />

            {
    /* 4. Eligibility and Selection Criteria (From API) */
  }
            <section id="eligibility-criteria" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                  LPU Online Eligibility and Selection Criteria
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-[#115eaf] mt-1" />
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  Lovely Professional University provides a range of online undergraduate and postgraduate programs. The
                  eligibility criteria depend on the course level, and admission is generally based on academic
                  qualifications and document verification. To be eligible for admission, candidates are required to fill
                  out the online application form, upload the required documents, and pay the program fee. Check the below
                  criteria for LPU online eligibility and selection:
                </p>
              </div>

              {
    /* Column Header (desktop only) */
  }
              <div
    aria-hidden="true"
    className="hidden md:grid grid-cols-[1.15fr_1.5fr_1fr] gap-x-8 px-3.5 py-2 border-b-2 border-[#000f22] text-xs font-bold text-[#43474d] mt-[18px]"
  >
                <span>Course</span>
                <span>Eligibility</span>
                <span>Selection Process</span>
              </div>

              {
    /* Criteria List */
  }
              <ul className="list-none">
                {DEGREEFYD_LPU_API.eligibilityMatrix.map((row, i) => <li
    key={i}
    className="grid grid-cols-1 md:grid-cols-[1.15fr_1.5fr_1fr] gap-x-8 gap-y-1 items-center px-3.5 py-[11px] border-b border-[#e7eeff] border-l-[3px] border-l-transparent hover:bg-[#f9f9ff] hover:border-l-[#115eaf] transition-colors"
  >
                    <div className="text-[14.5px] font-medium leading-[1.35] text-[#000f22]">{row.course}</div>

                    <div className="text-[13.5px] leading-[1.45] text-[#43474d]">
                      <span className="md:hidden block text-xs font-semibold text-[#74777e] mb-0.5">Eligibility</span>
                      {row.eligibility}
                    </div>

                    <div className="md:justify-self-start text-xs font-normal leading-[1.35] text-[#115eaf] bg-[#f0f3ff] border border-[#d5e3ff] px-2.5 py-[3px] rounded-[6px]">
                      <span className="md:hidden block text-[10px] font-medium text-[#74777e] mb-0.5">Selection Process</span>
                      {row.selection}
                    </div>
                  </li>)}
              </ul>
            </section>

            {
    /* 5. Admission Process 2026 */
  }
            <section id="admission-process" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                  LPU Online Admission Process 2026
                </h2>
                <span className="block w-16 h-[5px] rounded-[5px] bg-[#115eaf] mt-1" />
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  Lovely Professional University Online follows a simple and transparent online university admission
                  process. Admission to online degree courses is based on academic eligibility criteria specified for each
                  programme. Candidates can apply for LPU online admission 2026 without visiting the campus. Check the
                  below step-by-step Lovely Professional University Online admission process 2026:
                </p>
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
                  background: #0b2540;
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

              <div className="mt-[18px] flex flex-col gap-3">
                {ADMISSION_FLOW_STEPS.map((step, i) => {
    const stepNo = String(i + 1).padStart(2, "0");
    const isVisible = visibleAdmissionSteps.includes(i);
    return <div
      key={i}
      data-step-index={i}
      className={`admission-flow-step ${isVisible ? "is-visible" : ""}`}
    >
                      <div className="admission-flow-left">
                        <div className="admission-flow-badge">
                          <span>Step {stepNo}</span>
                        </div>
                        <div className="admission-flow-conn" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>

                      <div className="admission-flow-body">
                        <h3 className="mb-1 text-[18px] font-semibold leading-[1.35] text-[#000f22] font-sans">
                          {step.title}
                        </h3>
                        <p className="m-0 text-[15px] leading-[1.55] text-[#43474d] font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>;
  })}
              </div>
            </section>

            {
    /* 6. Rankings & Accreditations (From API) */
  }
            <section id="rankings" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-2xl font-extrabold text-[#000f22] font-sans">
                  LPU Online Rankings and Accreditations
                </h2>
                <p className="section-description text-xs text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.rankingsAndAccreditations.intro}
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-3 px-5 font-bold">Authority / Body</th>
                      <th className="py-3 px-5 font-bold">Recognition / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {DEGREEFYD_LPU_API.rankingsAndAccreditations.table.map((r, idx) => <tr key={idx} className={idx % 2 === 0 ? "bg-[#f0f3ff]" : ""}>
                        <td className="py-3 px-5 font-normal text-[#000f22]">{r.authority}</td>
                        <td className="py-3 px-5 text-[#43474d] font-normal">{r.status}</td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </section>

            {
    /* 7. Examination Pattern (Interactive Module) */
  }
            <section id="examination-pattern" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2">
                  LPU Online Examination Pattern
                </h2>
                <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                  Lovely Professional University conducts examinations for its online courses through its digital learning
                  platform. The evaluation system usually includes assignments, internal assessments, and end-term
                  examinations to evaluate students' performance during the course. Check below the Lovely Professional
                  University examination process:
                </p>
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
                  background: repeating-linear-gradient(180deg, #0b2540 0 4px, transparent 4px 9px);
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
                  background: #0b2540;
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
                  color: #000f22;
                }
                .exam-body p {
                  margin: 0;
                  font-size: 15px;
                  line-height: 1.55;
                  color: #43474d;
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

              <div className="mt-[18px]">
                {EXAM_STEPS.map((step, index) => <div key={step.title} className="exam-step exam-step-reveal">
                    <div>
                      <div className="exam-badge">
                        <span>Step {String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                    <div className="exam-body">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>)}
              </div>
            </section>

            {
    /* 8. Placements & Salary Stats (From API) */
  }
            <section id="placements" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-2xl font-extrabold text-[#000f22] font-sans">
                  LPU Online Placements
                </h2>
                <p className="section-description text-xs text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.placements.intro}
                </p>
              </div>

              {
    /* 4 Compact Stat Tiles from API */
  }
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]">
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-[#115eaf] font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.placementRate}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Placement Rate</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-emerald-700 font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.highestPackage}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Highest Package</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-[#000f22] font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.hiringPartners}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Hiring Partners</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center">
                  <span className="block text-xl font-extrabold text-[#B45309] font-sans leading-none">{DEGREEFYD_LPU_API.placements.stats.internshipsCount}</span>
                  <span className="block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5">Internships</span>
                </div>
              </div>

              <div className="mt-[18px]">
                <RecruiterScroll />
              </div>
            </section>

            {
    /* 7. Campus */
  }
            <section id="campus" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <div>
                <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                  LPU Online Campus
                </h2>
                <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal">
                  {DEGREEFYD_LPU_API.campus.description}
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0b2540] text-white">
                      <th className="py-3 px-4 font-bold">Mode of Transport</th>
                      <th className="py-3 px-4 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    {DEGREEFYD_LPU_API.campus.travelTable.map((t, idx) => <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                        <td className="py-3.5 px-4 font-normal text-[#000f22] align-top whitespace-nowrap">{t.mode}</td>
                        <td className="py-3.5 px-4 text-[#43474d] leading-relaxed font-normal">{t.detail}</td>
                      </tr>)}
                  </tbody>
                </table>
              </div>

              {
    /* Campus Photos */
  }
              <style>{`
                .campus-marquee {
                  overflow: hidden;
                  position: relative;
                  border-radius: 18px;
                  border: 1px solid #e7eeff;
                  background: #f0f3ff;
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
                  width: min(320px, 72vw);
                  background: #ffffff;
                  overflow: hidden;
                  border: 1px solid #e7eeff;
                  border-radius: 18px;
                  box-shadow: 0 10px 24px rgba(18, 37, 71, 0.08);
                }
                .campus-marquee-item img {
                  display: block;
                  width: 100%;
                  height: 220px;
                  object-fit: cover;
                  border-radius: 18px 18px 0 0;
                }
                .campus-marquee-item figcaption {
                  padding: 10px 12px;
                  font-size: 12px;
                  color: #43474d;
                  background: white;
                  border-top: 1px solid #e7eeff;
                  border-radius: 0 0 18px 18px;
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
                    width: min(280px, 80vw);
                  }
                  .campus-marquee-item img {
                    height: 180px;
                  }
                }
              `}</style>

              <div className="campus-marquee">
                <div className="campus-marquee-track">
                  {[...CAMPUS_IMAGES, ...CAMPUS_IMAGES].map((image, index) => <figure key={`${image.src}-${index}`} className="campus-marquee-item">
                      <img src={image.src} alt={image.alt} loading="lazy" />
                      <figcaption>{image.alt}</figcaption>
                    </figure>)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 mt-[18px]">
                {DEGREEFYD_LPU_API.campus.gallery.map((g, i) => <span key={i} className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] text-[11px] font-normal text-[#115eaf]">
                    {g}
                  </span>)}
              </div>
            </section>

            {
    /* 8. UGC Sample Degree Section (From API) */
  }
            <section id="sample-degree" className="page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff]">
              {
    /* Top Heading Block (Placed at the top of section) */
  }
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d5e3ff]/70">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                    LPU Online Sample Degree
                  </h2>
                </div>

                <a
    href={DEGREEFYD_LPU_API.sampleDegree.imageUrl}
    target="_blank"
    rel="noreferrer"
    className="px-3.5 py-2 bg-white text-[#115eaf] border border-[#d5e3ff] rounded-xl text-xs font-semibold hover:bg-[#e0ecff] transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
  >
                  <span>View Full-Size Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {
    /* Certificate Content Grid */
  }
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-[18px]">
                <div className="md:col-span-7 space-y-3.5">
                  <p className="text-xs sm:text-sm text-[#2d3137] leading-relaxed font-normal">
                    {DEGREEFYD_LPU_API.sampleDegree.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#2d3137]">
                    <span className="p-1.5 rounded-lg bg-white/80 border border-[#d5e3ff] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      UPSC & PSC Eligible
                    </span>
                    <span className="p-1.5 rounded-lg bg-white/80 border border-[#d5e3ff] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      WES Evaluated (US & Canada)
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
    onClick={() => onOpenApply()}
    className="px-4 py-2 bg-[#115eaf] text-white rounded-lg text-xs font-semibold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center gap-1.5"
  >
                      <span>Apply for Degree Enrollment</span>
                    </button>
                    <button
    onClick={onOpenHelpDesk}
    className="px-3.5 py-2 bg-white text-[#000f22] border border-[#c4c6ce] rounded-lg text-xs font-medium hover:bg-[#f0f3ff] transition-all"
  >
                      Verify Legal Equivalence
                    </button>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-xl overflow-hidden border-2 border-white shadow-md bg-white p-2.5 group hover:shadow-lg transition-all">
                    <img
    src={DEGREEFYD_LPU_API.sampleDegree.imageUrl}
    alt={DEGREEFYD_LPU_API.sampleDegree.altText}
    className="w-full h-auto object-contain rounded group-hover:scale-102 transition-transform duration-300 max-h-64"
  />
                    <div className="text-center pt-1.5 text-[10px] text-[#74777e] font-normal">
                      Specimen UGC-Entitled Degree Format
                    </div>
                  </div>
                </div>
              </div>
            </section>

{
    /* 9. Verified Reviews & FAQs */
  }
            <section id="reviews-section" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              {
    /* Header and Rating Summary Bar */
  }
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#e7eeff]">
                <div>
                  <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans mt-2">
                    LPU Online Reviews
                  </h2>
                  <p className="section-description text-xs text-[#74777e]">
                    Authentic feedback from working executives, entrepreneurs, and graduates studying on LPU e-Connect
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 bg-[#f0f3ff] border border-[#d5e3ff] p-2.5 rounded-xl shrink-0 max-w-full">
                  <div className="text-center">
                    <span className="block text-lg font-black text-[#115eaf]">94%</span>
                    <span className="text-[9px] text-[#43474d] font-bold">Completion Rate</span>
                  </div>
                  <div className="h-6 w-px bg-[#d5e3ff]" />
                  <div className="text-center">
                    <span className="block text-lg font-black text-[#000f22]">25,000+</span>
                    <span className="text-[9px] text-[#43474d] font-bold">Active Learners</span>
                  </div>
                  <div className="h-6 w-px bg-[#d5e3ff]" />
                  <div className="text-center">
                    <span className="block text-lg font-black text-emerald-700">100%</span>
                    <span className="text-[9px] text-[#43474d] font-bold">Verified Profiles</span>
                  </div>
                </div>
              </div>

              {
    /* Review Filter Category Tabs */
  }
              <div className="flex flex-wrap items-center justify-between gap-2 mt-[18px]">
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {["All", "Online MBA", "Online MCA", "Online BBA & BCA", "Online M.Com"].map((cat) => <button
    key={cat}
    onClick={() => setSelectedReviewCategory(cat)}
    className={`px-3 py-1 rounded-lg font-bold transition-all text-[11px] max-md:min-h-[36px] max-md:px-4 ${selectedReviewCategory === cat ? "bg-[#115eaf] text-white shadow-xs" : "bg-[#f0f3ff] text-[#43474d] hover:bg-[#e0ecff] hover:text-[#000f22]"}`}
  >
                      {cat}
                    </button>)}
                </div>

                <span className="text-[11px] text-[#74777e]">
                  Showing authentic verified reviews
                </span>
              </div>

              {
    /* Modern Review Cards Grid */
  }
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[18px]">
                {DEGREEFYD_LPU_API.testimonials.filter((t) => {
    if (selectedReviewCategory === "All") return true;
    if (selectedReviewCategory === "Online MBA") return t.course.includes("MBA");
    if (selectedReviewCategory === "Online MCA") return t.course.includes("MCA");
    if (selectedReviewCategory === "Online BBA & BCA") return t.course.includes("BBA") || t.course.includes("BCA");
    if (selectedReviewCategory === "Online M.Com") return t.course.includes("M.Com");
    return true;
  }).map((t, idx) => <div
    key={idx}
    className="bg-white rounded-xl border border-[#e7eeff] hover:border-[#115eaf]/70 hover:shadow-md transition-all p-3 flex flex-col justify-between gap-2.5 group relative"
  >
                      {
    /* Top Bar: Stars + Tag */
  }
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex text-amber-400 gap-0.5 items-center">
                            {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current text-amber-400" />)}
                            <span className="text-[10px] font-normal text-[#000f22] ml-1.5">5.0</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-normal bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]">
                            <CheckCircle className="w-2.5 h-2.5 text-[#115eaf]" />
                            {t.tag || "Verified Learner"}
                          </span>
                        </div>

                        {
    /* Program Badge */
  }
                        <div className="flex items-center justify-between gap-1 text-[10px]">
                          <span className="font-normal text-[#115eaf] truncate">
                            {t.course}
                          </span>
                          <span className="text-[9px] text-[#74777e] shrink-0 font-normal">
                            {t.batch}
                          </span>
                        </div>

                        {
    /* Review Content */
  }
                        <div className="relative pt-0.5">
                          <p className="text-[11px] text-[#2d3137] leading-relaxed font-normal line-clamp-3">
                            "{t.text}"
                          </p>
                        </div>
                      </div>

                      {
    /* Student Profile Footer */
  }
                      <div className="pt-2 border-t border-[#f0f3ff] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#115eaf] to-[#004689] text-white flex items-center justify-center text-[10px] font-semibold shrink-0 shadow-xs">
                            {t.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-normal text-[11px] text-[#000f22] truncate block">{t.studentName}</span>
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            </div>
                            <span className="text-[10px] text-[#115eaf] font-normal truncate block leading-tight">
                              {t.profession}
                            </span>
                            <span className="text-[9px] text-[#74777e] truncate block font-normal">
                              {t.company}
                            </span>
                          </div>
                        </div>

                        <span className="text-[9px] text-[#74777e] flex items-center gap-0.5 shrink-0 font-normal">
                          <MapPin className="w-2.5 h-2.5 text-[#74777e]" />
                          <span>{t.location}</span>
                        </span>
                      </div>
                    </div>)}
              </div>

              {
    /* Review Callout Action Box */
  }
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f0f3ff] via-white to-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row items-center justify-between gap-3 mt-[18px]">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-bold text-sm text-[#000f22] font-sans">
                    Join 25,000+ ambitious working professionals at LPU Online
                  </h3>
                  <p className="text-xs text-[#43474d]">
                    Admissions for Spring 2026 intake are currently open. Book a 1-on-1 counseling session with our admissions team.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
    onClick={() => onOpenApply()}
    className="px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold shadow hover:bg-[#004689] active:scale-95 transition-all"
  >
                    Apply Now 2026
                  </button>
                  <button
    onClick={() => onOpenHelpDesk()}
    className="px-4 py-2.5 bg-white text-[#000f22] border border-[#000f22] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all"
  >
                    Talk to Counselor
                  </button>
                </div>
              </div>

              {
    /* 12 FAQs directly from API */
  }
              <div className="pt-3 mt-[18px] border-t border-[#e7eeff]">
                <h3 className="section-title text-xl font-bold text-[#000f22] font-sans">
                  Frequently Asked Questions (LPU Online)
                </h3>
                <div className="space-y-[12px] mt-[18px]">
                  {DEGREEFYD_LPU_API.faqs.map((faq, idx) => {
    const isOpen = openFaqIndex === idx;
    return <div key={idx} className="border border-[#e7eeff] rounded-xl overflow-hidden">
                        <button
      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
      className="w-full px-4 py-3 text-left flex items-center justify-between font-medium text-xs sm:text-sm text-[#000f22] hover:text-[#115eaf] bg-white transition-colors"
    >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-[#115eaf] shrink-0 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && <div className="px-4 pb-3 text-xs text-[#43474d] bg-[#f9f9ff] border-t border-[#e7eeff] leading-relaxed">
                            <p className="pt-3 font-normal">{faq.answer}</p>
                          </div>}
                      </div>;
  })}
                </div>
              </div>
            </section>

            {
    /* Compare Colleges */
  }
            <section id="compare-colleges" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                {DEGREEFYD_LPU_API.compareSection.title}
              </h2>
              <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
                {DEGREEFYD_LPU_API.compareSection.description}
              </p>
              {
    /* MAIN COMPARISON BOX */
  }
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-[#e7eeff] rounded-2xl bg-white shadow-sm mt-[18px]">

                {
    /* LPU COLLEGE CARD */
  }
                <div className="min-h-[220px] rounded-xl border border-[#e7eeff] bg-[#f0f3ff] p-4 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold">
                      Selected
                    </span>

                    <div className="flex gap-4 items-center">
                      <div className="w-[115px] h-[85px] shrink-0 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center overflow-hidden">
                        <img
    src={DEGREEFYD_LPU_API.hero.logoImage}
    alt="LPU Logo"
    className="max-w-full max-h-full object-contain p-1.5"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
                      </div>
                      <div>
                        <h3 className="mb-1.5 text-[19px] leading-tight font-extrabold text-[#000f22] font-sans">
                          {DEGREEFYD_LPU_API.title}
                        </h3>
                        <p className="mt-[7.5px] flex items-center gap-1.5 text-sm text-[#43474d]">
                          <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                          Phagwara, Punjab
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {DEGREEFYD_LPU_API.approvals.slice(0, 4).map((tag) => <span key={tag} className="px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]">
                          {tag}
                        </span>)}
                    </div>
                  </div>

                  <button
    onClick={() => onOpenBrochure()}
    className="w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#115eaf] bg-white text-[#115eaf] text-sm font-bold hover:bg-[#f0f3ff] transition-all"
  >
                    <Download className="w-4 h-4" />
                    Brochure
                  </button>
                </div>

                {
    /* VS */
  }
                <div className="compare-vs flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center bg-[#115eaf] text-white text-sm font-extrabold">
                    VS
                  </span>
                </div>

                {
    /* ADD COLLEGE CARD */
  }
                <div className="min-h-[220px] rounded-xl border border-dashed border-[#d5e3ff] bg-[#f9f9ff] p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#d5e3ff] bg-white flex items-center justify-center text-[#115eaf] text-2xl font-light mb-2.5">
                    +
                  </div>
                  <div className="add-content">
                    <h3 className="text-lg font-extrabold text-[#000f22] font-sans">
                      Add College
                    </h3>
                    <p className="mt-[7.5px] text-[13px] leading-relaxed text-[#43474d] font-normal">
                      Select another college to compare side by side.
                    </p>
                  </div>
                  <button
    onClick={() => onOpenHelpDesk()}
    className="w-full h-11 mt-4 rounded-lg border-none bg-[#0b2540] text-white text-sm font-bold hover:bg-[#011c37] transition-all"
  >
                    Add College
                  </button>
                </div>
              </div>
            </section>

            {
    /* Blogs */
  }
            <BlogsListSection
    onOpenHelpDesk={onOpenHelpDesk}
    className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
  />

        </div>
      </div>

      {
    /* Floating TOC Toggle Button */
  }
      <button
    onClick={() => setTocOpen(!tocOpen)}
    className="fixed bottom-36 left-4 z-30 w-11 h-11 rounded-full bg-[#0b2540] text-white shadow-lg flex items-center justify-center hover:bg-[#115eaf] transition-colors md:bottom-6"
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
              <div className="flex items-center justify-between pb-3 border-b border-[#e7eeff]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#115eaf]" />
                  <h3 className="font-bold text-sm text-[#000f22]">Table of Contents</h3>
                </div>
                <button
    onClick={() => setTocOpen(false)}
    className="w-7 h-7 rounded-lg bg-[#f0f3ff] text-[#43474d] flex items-center justify-center hover:bg-[#e7eeff] transition-colors"
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
      className={`block px-3 py-2 rounded-lg text-xs transition-all ${isActive ? "bg-[#eef4ff] text-[#115eaf] font-bold" : "text-[#475569] hover:text-[#000f22] hover:bg-[#f8faff]"}`}
    >
                        {item.label}
                      </a>
                    </li>;
  })}
              </ul>

              {
    /* DEB Advisor Box */
  }
              <div className="bg-[#0b2540] text-white rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#115eaf] text-white flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs leading-tight">UGC-DEB Expert Desk</p>
                    <p className="text-[10px] text-[#b1c8eb]">Online Siksha Advisory</p>
                  </div>
                </div>
                <p className="text-[11px] text-[#b1c8eb] leading-relaxed">
                  Need guidance on degree equivalence, govt job validity, or fee plans?
                </p>
                <button
    onClick={() => {
      onOpenHelpDesk();
      setTocOpen(false);
    }}
    className="w-full py-2 bg-[#115eaf] text-white rounded-lg text-[11px] font-bold hover:bg-[#004689] transition-all"
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

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
        {
    /* Slide-up Panel */
  }
        <div
    className={`w-72 max-w-[calc(100vw-48px)] bg-white border border-[#e7eeff] shadow-2xl rounded-2xl transition-all duration-300 ${counselPanelOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-3 pointer-events-none"}`}
  >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#d5e3ff] flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5 text-[#115eaf]" />
            </div>
            <h3 className="text-xs font-bold text-[#000f22]">Get Free Counselling</h3>
          </div>
          <button
    onClick={() => setCounselPanelOpen(false)}
    className="tap-hit w-11 h-11 rounded-md bg-[#f0f3ff] text-[#43474d] flex items-center justify-center hover:bg-[#e7eeff] transition-colors text-[10px] font-bold"
  >
            ✕
          </button>
        </div>

        <div className="p-4">
          {!formSubmitted ? <form onSubmit={handleCounselingSubmit} className="space-y-2.5" noValidate>
              <div>
                <input
    type="tel"
    required
    pattern="[0-9]{10}"
    value={counselingForm.phone}
    onChange={(e) => {
      setCounselingForm({ ...counselingForm, phone: e.target.value });
      if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
    }}
    placeholder="Phone Number (+91)"
    className={`w-full px-3 py-2 rounded-lg border text-[11px] text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none ${formErrors.phone ? "border-red-500" : "border-[#c4c6ce]"}`}
    aria-invalid={formErrors.phone ? "true" : "false"}
    aria-describedby={formErrors.phone ? "phone-error" : void 0}
  />
                {formErrors.phone && <p id="phone-error" role="alert" aria-live="polite" className="mt-1 text-[11px] text-red-600">{formErrors.phone}</p>}
              </div>
              <div>
                <input
    type="email"
    required
    value={counselingForm.email}
    onChange={(e) => {
      setCounselingForm({ ...counselingForm, email: e.target.value });
      if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
    }}
    placeholder="Email Address"
    className={`w-full px-3 py-2 rounded-lg border text-[11px] text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none ${formErrors.email ? "border-red-500" : "border-[#c4c6ce]"}`}
    aria-invalid={formErrors.email ? "true" : "false"}
    aria-describedby={formErrors.email ? "email-error" : void 0}
  />
                {formErrors.email && <p id="email-error" role="alert" aria-live="polite" className="mt-1 text-[11px] text-red-600">{formErrors.email}</p>}
              </div>
              <select
    value={counselingForm.course}
    onChange={(e) => setCounselingForm({ ...counselingForm, course: e.target.value })}
    className="w-full px-3 py-2 rounded-lg border border-[#c4c6ce] text-[11px] text-[#000f22] focus:border-[#115eaf] outline-none cursor-pointer bg-white"
  >
                {COURSES_DATA.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button
    type="submit"
    className="w-full py-2 min-h-[44px] bg-[#115eaf] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#004689] active:scale-95 transition-all"
  >
                Submit
              </button>
            </form> : <div className="py-4 text-center space-y-1.5 text-[11px] animate-in fade-in">
              <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="font-bold text-[#000f22] block">Callback Requested!</span>
              <p className="text-[#43474d]">We will call you at +91 {counselingForm.phone} shortly.</p>
              <button onClick={() => setFormSubmitted(false)} className="text-[10px] font-bold text-[#115eaf] hover:underline">
                Submit another enquiry
              </button>
            </div>}
        </div>
      </div>

      {
    /* Vertical Edge Tab — "Free Apply" */
  }
      <button
    onClick={() => setCounselPanelOpen(!counselPanelOpen)}
    className="hidden lg:flex w-12 h-[200px] bg-[#115eaf] hover:bg-[#004689] rounded-l-2xl shadow-md items-center justify-center transition-colors"
  >
        <span className="block text-white text-sm font-normal whitespace-nowrap -rotate-90">
          {counselPanelOpen ? "Close" : "Free Apply"}
        </span>
      </button>
      </div>
    </div>;
};
