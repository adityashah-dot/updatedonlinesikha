import { useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { COURSES_DATA } from "./data/coursesData";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";
import { HomeView } from "./components/HomeView";
import { CollegeDetailView } from "./components/CollegeDetailView";
import { UniversityDetailErrorBoundary } from "./components/UniversityDetailErrorBoundary";
import { UniversitiesView } from "./components/UniversitiesView";
import { CourseDetailModal } from "./components/CourseDetailModal";
import { EmiCalculatorModal } from "./components/EmiCalculatorModal";
import { ApplyOnlineModal } from "./components/ApplyOnlineModal";
import { BrochureModal } from "./components/BrochureModal";
import { LmsPortalModal } from "./components/LmsPortalModal";
import { HelpDeskModal } from "./components/HelpDeskModal";
import { LoginModal } from "./components/LoginModal";
import { FloatingActions } from "./components/FloatingActions";
import { CounselorModal } from "./components/CounselorModal";
import { TrackApplicationModal } from "./components/TrackApplicationModal";
import { GeminiChatbot, ChatbotFloatingTrigger } from "./components/chat/GeminiChatbot";
import { BookOpen, GraduationCap, Home, FileText, Building2, Award } from "lucide-react";
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
    if (path.startsWith("/courses")) return "courses";
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
    const onLpuProfile = location.pathname.startsWith("/universities/lpu") || location.pathname.startsWith("/universities/lovely");
    const routes = {
      home: "/",
      universities: "/universities",
      courses: onLpuProfile ? "/universities/lpu-online?section=courses" : "/courses",
      overview: "/universities/lpu-online",
      admission: onLpuProfile ? "/universities/lpu-online?section=admission" : "/admission",
      scholarships: onLpuProfile ? "/universities/lpu-online?section=scholarships" : "/scholarships",
      lms: "/courses",
      degrees: "/",
      compare: "/",
      nirf: "/universities"
    };
    navigate(routes[tab]);
    if (tab === "degrees") scrollToHomeSection("degrees");
    else if (tab === "compare") scrollToHomeSection("compare");
    else window.scrollTo({ top: 0, behavior: "smooth" });
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
  return <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2d] font-sans pb-16 md:pb-0 transition-colors duration-200">
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
  />

      {
    /* Routed Pages with Framer Motion Page Transitions */
  }
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
    path="/"
    element={<PageTransition>
                  <HomeView
      onOpenApply={handleOpenApply}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
    />
                </PageTransition>}
  />

            <Route
    path="/universities/*"
    element={<UniversityDetailErrorBoundary>
                  <PageTransition>
                    <CollegeDetailView
      onSelectCourse={handleOpenCourseDetail}
      onOpenApply={handleOpenApply}
      onOpenBrochure={handleOpenBrochure}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
      onOpenEmi={handleOpenEmi}
      onOpenLms={() => setIsLmsModalOpen(true)}
    />
                  </PageTransition>
                </UniversityDetailErrorBoundary>}
  />

            <Route
    path="/universities"
    element={<PageTransition>
                  <UniversitiesView
      onOpenApply={() => handleOpenApply()}
      onOpenHelpDesk={() => setIsHelpDeskModalOpen(true)}
      onOpenBrochure={() => handleOpenBrochure()}
    />
                </PageTransition>}
  />

            <Route
    path="/courses"
    element={<Navigate to="/universities" replace />}
  />

            <Route
    path="/admission"
    element={<Navigate to="/universities" replace />}
  />

            <Route
    path="/scholarships"
    element={<Navigate to="/universities" replace />}
  />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
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
    /* Mobile Sticky Bottom Navigation Dock */
  }
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#e7eeff] px-3 py-2 flex items-center justify-around shadow-lg">
        <button
    onClick={() => {
      setActiveTab("courses");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === "courses" ? "bg-[#e7eeff] text-[#115eaf]" : "text-[#43474d]"}`}
  >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Courses</span>
        </button>

        <button
    onClick={() => {
      setActiveTab("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === "home" ? "bg-[#e7eeff] text-[#115eaf]" : "text-[#43474d]"}`}
  >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
    onClick={() => {
      setActiveTab("universities");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === "universities" ? "bg-[#e7eeff] text-[#115eaf]" : "text-[#43474d]"}`}
  >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>Universities</span>
        </button>

        <button
    onClick={() => {
      setActiveTab("admission");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === "admission" ? "bg-[#e7eeff] text-[#115eaf]" : "text-[#43474d]"}`}
  >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span>Admission</span>
        </button>

        <button
    onClick={() => {
      setActiveTab("scholarships");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === "scholarships" ? "bg-[#e7eeff] text-[#115eaf]" : "text-[#43474d]"}`}
  >
          <Award className="w-4 h-4 mb-0.5" />
          <span>Scholarship</span>
        </button>

        <button
    onClick={() => handleOpenApply()}
    className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold bg-[#115eaf] text-white shadow"
  >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>Apply</span>
        </button>
      </nav>

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

      <GeminiChatbot
    isOpen={isChatOpen}
    onClose={() => setIsChatOpen(false)}
    onOpenApply={handleOpenApply}
    initialQuery={chatInitialQuery}
  />
    </div>;
}
