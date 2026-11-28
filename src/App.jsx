'use client';

import { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { COURSES_DATA } from "./data/coursesData";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";
import { HomeView } from "./components/HomeView";
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Exams = lazy(() => import("./pages/Exams"));
const ExamDetail = lazy(() => import("./pages/ExamDetail"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const CollegeDetailView = lazy(() => import("./components/CollegeDetailView").then((m) => ({ default: m.CollegeDetailView })));
const UniversitiesView = lazy(() => import("./components/UniversitiesView").then((m) => ({ default: m.UniversitiesView })));
import { CourseDetailModal } from "./components/CourseDetailModal";
import { EmiCalculatorModal } from "./components/EmiCalculatorModal";
import { ApplyOnlineModal } from "./components/ApplyOnlineModal";
import { BrochureModal } from "./components/BrochureModal";
import { LmsPortalModal } from "./components/LmsPortalModal";
import { HelpDeskModal } from "./components/HelpDeskModal";
import { LoginModal } from "./components/LoginModal";
import { FloatingActions } from "./components/FloatingActions";
import { MobileBottomBar } from "./components/shell/MobileBottomBar";
import { CounselorModal } from "./components/CounselorModal";
import { TrackApplicationModal } from "./components/TrackApplicationModal";
import { DegreeExplorerModal } from "./components/DegreeExplorerModal";
const DegreeExplorerPage = lazy(() => import("./pages/DegreeExplorerPage"));
const CompareMatrixPage = lazy(() => import("./pages/CompareMatrixPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { GeminiChatbot, ChatbotFloatingTrigger } from "./components/chat/GeminiChatbot";
import { SEO } from "./components/SEO";

// Shown briefly while a lazily loaded page downloads.
const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading page">
    <span className="h-6 w-6 rounded-full border-2 border-line border-t-brand-600 animate-spin" />
  </div>
);
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeToTab = (path, search = "") => {
    if (path.startsWith("/universities/lpu") || path.startsWith("/universities/lovely")) {
      if (search.includes("section=courses")) return "courses";
      if (search.includes("section=admission")) return "admission";
      if (search.includes("section=scholarships")) return "scholarships";
      return "overview";
    }
    if (path.startsWith("/universities/amity")) return "universities";
    if (path.startsWith("/explore") || path.startsWith("/degree-explorer")) return "degrees";
    if (path.startsWith("/compare")) return "compare";
    if (path.startsWith("/courses")) return "courses";
    if (path.startsWith("/exams")) return "exams";
    if (path.startsWith("/news")) return "news";
    if (path.startsWith("/blog")) return "blog";
    if (path.startsWith("/admission")) return "admission";
    if (path.startsWith("/scholarships")) return "scholarships";
    if (path.startsWith("/universities")) return "universities";
    if (path.startsWith("/colleges")) return "universities";
    return "home";
  };
  const activeTab = routeToTab(location.pathname, location.search);
  const scrollToHomeSection = (id) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);
  };
  const setActiveTab = (tab) => {
    if (tab === "degrees") {
      setIsDegreeExplorerOpen(true);
      return;
    }
    const onLpuProfile = location.pathname.startsWith("/universities/lpu") || location.pathname.startsWith("/universities/lovely");
    const routes = {
      home: "/",
      universities: "/universities",
      courses: onLpuProfile ? "/universities/lpu-online?section=courses" : "/courses",
      exams: "/exams",
      news: "/news",
      blog: "/blog",
      overview: "/universities/lpu-online",
      admission: onLpuProfile ? "/universities/lpu-online?section=admission" : "/admission",
      scholarships: onLpuProfile ? "/universities/lpu-online?section=scholarships" : "/scholarships",
      lms: "/courses",
      degrees: "/explore-programs",
      compare: "/compare",
      nirf: "/universities"
    };
    navigate(routes[tab]);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyCourseId, setApplyCourseId] = useState("mba");
  const [emiPlanDetails, setEmiPlanDetails] = useState(null);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [emiCourseId, setEmiCourseId] = useState("mba");
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [selectedCourseForBrochure, setSelectedCourseForBrochure] = useState(null);
  const [isLmsModalOpen, setIsLmsModalOpen] = useState(false);
  const [isHelpDeskModalOpen, setIsHelpDeskModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isDegreeExplorerOpen, setIsDegreeExplorerOpen] = useState(false);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState("");
  const handleOpenCourseDetail = (course) => {
    setSelectedCourseForDetail(course);
  };
  const handleSelectCourseById = (courseId) => {
    const course = COURSES_DATA.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourseForDetail(course);
    }
  };
  const handleOpenApply = (courseId) => {
    if (courseId) {
      setApplyCourseId(courseId);
    }
    setEmiPlanDetails(null);
    setIsApplyModalOpen(true);
  };
  const handleOpenEmi = (courseId) => {
    if (courseId) {
      setEmiCourseId(courseId);
    }
    setIsEmiModalOpen(true);
  };
  const handleApplyWithEmi = (courseId, emiAmount, tenure) => {
    setApplyCourseId(courseId);
    setEmiPlanDetails({ emiAmount, tenure });
    setIsApplyModalOpen(true);
  };
  const handleOpenBrochure = (course) => {
    setSelectedCourseForBrochure(course || null);
    setIsBrochureModalOpen(true);
  };
  const handleOpenChatWithQuery = (query) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };
  return <div className="min-h-screen flex flex-col bg-canvas text-ink-900 font-sans pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0 transition-colors duration-200">
      {
    /* Top Application Bar */
  }
      <Navbar
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    onOpenApply={() => handleOpenApply()}
    onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
    onOpenLms={() => setIsLmsModalOpen(true)}
    onOpenChat={() => setIsChatOpen(true)}
    onOpenLogin={() => setIsLoginModalOpen(true)}
    loggedInUser={loggedInUser}
    onOpenDegreeExplorer={() => setIsDegreeExplorerOpen(true)}
  />

      {
    /* Routed Pages with Framer Motion Page Transitions */
  }
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route
    path="/"
    element={<PageTransition>
                  <SEO
      title="Online Siksha – Compare UGC-Entitled Online Degrees in India"
      description="Compare 50+ UGC-entitled online universities in India. Check MBA, MCA, BBA and BCA fees, eligibility and admissions, and get free one-on-one counselling."
    />
                  <HomeView
      onOpenApply={handleOpenApply}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
    />
                </PageTransition>}
  />

            <Route
    path="/universities/:slug"
    element={<PageTransition>
                  <CollegeDetailView
      onSelectCourse={handleOpenCourseDetail}
      onOpenApply={handleOpenApply}
      onOpenBrochure={handleOpenBrochure}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
      onOpenEmi={handleOpenEmi}
      onOpenLms={() => setIsLmsModalOpen(true)}
    />
                </PageTransition>}
  />

            <Route
    path="/universities/*"
    element={<PageTransition>
                  <CollegeDetailView
      onSelectCourse={handleOpenCourseDetail}
      onOpenApply={handleOpenApply}
      onOpenBrochure={handleOpenBrochure}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
      onOpenEmi={handleOpenEmi}
      onOpenLms={() => setIsLmsModalOpen(true)}
    />
                </PageTransition>}
  />

            <Route
    path="/universities"
    element={<PageTransition>
                  <SEO
      title="Online Universities - Compare & Apply | Online Siksha"
      description="Compare UGC-entitled online universities in India. Fees, courses, eligibility, placements, and admission details."
    />
                  <UniversitiesView
      onOpenApply={() => handleOpenApply()}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
      onOpenBrochure={() => handleOpenBrochure()}
    />
                </PageTransition>}
  />

            <Route
    path="/explore-programs"
    element={<PageTransition><DegreeExplorerPage onOpenCounseling={() => setIsCounselorModalOpen(true)} onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)} /></PageTransition>}
  />
            <Route path="/degree-explorer" element={<Navigate to="/explore-programs" replace />} />
            <Route path="/explore" element={<Navigate to="/explore-programs" replace />} />
            <Route path="/compare" element={<PageTransition><SEO title="Compare Online Universities Matrix | Online Siksha" description="Benchmark UGC-DEB entitled online universities side-by-side across NAAC grades, NIRF ranks, semester fees, 0% EMI, and placements." /><CompareMatrixPage onOpenApply={handleOpenApply} onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)} onOpenBrochure={() => handleOpenBrochure()} /></PageTransition>} />
            <Route path="/compare-matrix" element={<Navigate to="/compare" replace />} />

            <Route
    path="/courses"
    element={<PageTransition><Courses onOpenCounseling={() => setIsCounselorModalOpen(true)} onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)} /></PageTransition>}
  />

            <Route
    path="/courses/:slug"
    element={<PageTransition><CourseDetail onOpenCounseling={() => setIsCounselorModalOpen(true)} onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)} /></PageTransition>}
  />

            <Route
    path="/admission"
    element={<Navigate to="/universities" replace />}
  />

            <Route
    path="/scholarships"
    element={<Navigate to="/universities" replace />}
  />

            <Route
    path="/blog"
    element={<PageTransition><Blog /></PageTransition>}
  />
            <Route
    path="/blog/:slug"
    element={<PageTransition><BlogDetail onOpenCounseling={() => setIsCounselorModalOpen(true)} onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)} /></PageTransition>}
  />
            <Route
    path="/exams"
    element={<PageTransition><Exams /></PageTransition>}
  />
            <Route
    path="/exams/:slug"
    element={<PageTransition><ExamDetail /></PageTransition>}
  />
            <Route
    path="/news"
    element={<PageTransition><News onOpenCounseling={() => setIsCounselorModalOpen(true)} /></PageTransition>}
  />
            <Route
    path="/news/:slug"
    element={<PageTransition><NewsDetail onOpenCounseling={() => setIsCounselorModalOpen(true)} /></PageTransition>}
  />

            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </main>

      {
    /* Institutional Desktop Footer */
  }
      <Footer
    setActiveTab={setActiveTab}
    onSelectCourse={handleSelectCourseById}
    onOpenApply={() => handleOpenApply()}
  />

      {
    /* Modals Container */
  }
      <CourseDetailModal
    course={selectedCourseForDetail}
    isOpen={selectedCourseForDetail !== null}
    onClose={() => setSelectedCourseForDetail(null)}
    onOpenApply={(courseId) => {
      setSelectedCourseForDetail(null);
      handleOpenApply(courseId);
    }}
    onOpenBrochure={(course) => {
      setSelectedCourseForDetail(null);
      handleOpenBrochure(course);
    }}
    onOpenEmi={(courseId) => {
      setSelectedCourseForDetail(null);
      handleOpenEmi(courseId);
    }}
  />

      <EmiCalculatorModal
    isOpen={isEmiModalOpen}
    onClose={() => setIsEmiModalOpen(false)}
    initialCourseId={emiCourseId}
    onApplyWithEmi={handleApplyWithEmi}
  />

      <ApplyOnlineModal
    isOpen={isApplyModalOpen}
    onClose={() => {
      setIsApplyModalOpen(false);
      setEmiPlanDetails(null);
    }}
    preselectedCourseId={applyCourseId}
    emiPlanDetails={emiPlanDetails}
  />

      <BrochureModal
    isOpen={isBrochureModalOpen}
    onClose={() => setIsBrochureModalOpen(false)}
    selectedCourse={selectedCourseForBrochure}
  />

      <LmsPortalModal
    isOpen={isLmsModalOpen}
    onClose={() => setIsLmsModalOpen(false)}
    onOpenApply={() => {
      setIsLmsModalOpen(false);
      handleOpenApply();
    }}
  />

      <HelpDeskModal
    isOpen={isHelpDeskModalOpen}
    onClose={() => setIsHelpDeskModalOpen(false)}
  />

      <LoginModal
    isOpen={isLoginModalOpen}
    onClose={() => setIsLoginModalOpen(false)}
    onLoginSuccess={(user) => {
      setLoggedInUser(user);
    }}
  />

      <TrackApplicationModal
    isOpen={isTrackModalOpen}
    onClose={() => setIsTrackModalOpen(false)}
  />

      <CounselorModal
    isOpen={isCounselorModalOpen}
    onClose={() => setIsCounselorModalOpen(false)}
  />

      <DegreeExplorerModal
        isOpen={isDegreeExplorerOpen}
        onClose={() => setIsDegreeExplorerOpen(false)}
  />

      {
    /* Floating Bottom Action Buttons */
  }
      <FloatingActions
    onOpenCounselorModal={() => setIsCounselorModalOpen(true)}
    onOpenTrackModal={() => setIsTrackModalOpen(true)}
  />

      {
    /* Floating AI Chatbot Trigger & Chat Window */
  }
      <ChatbotFloatingTrigger onClick={() => setIsChatOpen(true)} />

      {/* Phone-only bottom navigation (replaces the floating buttons below 768px) */}
      <MobileBottomBar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCallback={() => setIsCounselorModalOpen(true)}
      />

      <GeminiChatbot
    isOpen={isChatOpen}
    onClose={() => setIsChatOpen(false)}
    onOpenApply={handleOpenApply}
    initialQuery={chatInitialQuery}
  />
    </div>;
}

