import { useState, useEffect, useRef } from "react";
import { COURSES_DATA } from "../data/coursesData";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";
import {
  X,
  Download,
  FileText,
  CheckCircle,
  ShieldCheck,
  Mail,
  Phone,
  GraduationCap,
  ChevronDown,
  Check
} from "lucide-react";

export const BrochureModal = ({
  isOpen,
  onClose,
  selectedCourse
}) => {
  const [courseId, setCourseId] = useState(selectedCourse ? selectedCourse.id : "all");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedCourse?.id) {
      setCourseId(selectedCourse.id);
    } else if (!selectedCourse) {
      setCourseId("all");
    }
  }, [selectedCourse, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen, isOpen, onClose]);

  if (!isOpen) return null;

  const currentCourse = COURSES_DATA.find((c) => c.id === courseId) || (courseId === "all" ? null : selectedCourse);

  const handleDownload = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateLeadFields({
      phone,
      email,
      requireName: false,
      requireEmail: true
    });
    if (!validation.valid) {
      setErrorMsg(validation.error);
      return;
    }
    submitLead({
      email: validation.cleanEmail,
      phone_number: validation.cleanPhone,
      preferred_degree: currentCourse?.name ? [currentCourse.name] : [],
      form_name: "Download Brochure Form"
    });
    setIsDownloaded(true);
    const officialBrochureUrl = "https://images.degreefyd.com//lpu-online-brochure.pdf";
    const link = document.createElement("a");
    link.href = officialBrochureUrl;
    link.target = "_blank";
    link.download = currentCourse ? currentCourse.brochurePdfName : "LPU_Online_Complete_Brochure_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setIsDownloaded(false);
    setIsDropdownOpen(false);
    setErrorMsg("");
    onClose();
  };

  const selectedTitle = courseId === "all"
    ? "Complete University Prospectus & All 9 Syllabi"
    : currentCourse?.name || "Select Program Curriculum";

  const selectedSubtitle = courseId === "all"
    ? "All Degree Programs (UG & PG)"
    : currentCourse?.duration || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#e7eeff] max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e7eeff] flex items-center justify-between bg-[#f0f3ff]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#115eaf] text-white flex items-center justify-center shadow-xs shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#000f22] font-sans leading-tight">
                {currentCourse ? `Download ${currentCourse.code} Syllabus PDF` : "Download Complete Fee Brochure"}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#43474d] mt-0.5">
                Official curriculum handbook with semester credit breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 min-h-[44px] text-[#74777e] hover:text-[#000f22] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isDownloaded ? (
            <form onSubmit={handleDownload} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}
              {/* Program Curriculum Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-xs sm:text-[13px] font-semibold text-[#1e293b] mb-1.5 flex items-center justify-between">
                  <span>
                    Select Program Curriculum <span className="text-[#e11d48]">*</span>
                  </span>
                  <span className="text-[11px] font-normal text-[#74777e]">
                    {courseId === "all" ? "All Programs" : currentCourse?.code || "Specific Course"}
                  </span>
                </label>

                {/* Custom Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c4c6ce] hover:border-[#115eaf] bg-white text-left transition-all focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 shadow-xs flex items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#e7eeff] text-[#115eaf] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-[#000f22] truncate">
                        {selectedTitle}
                      </span>
                      {selectedSubtitle && (
                        <span className="block text-[11px] text-[#74777e] font-normal">
                          {selectedSubtitle}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#74777e] shrink-0 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-[#115eaf]" : ""
                    }`}
                  />
                </button>

                {/* Custom Floating Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-[#dfe9ff] rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto p-1.5 space-y-1 animate-in fade-in duration-150"
                  >
                    {/* All Prospectus Option */}
                    <button
                      type="button"
                      role="option"
                      aria-selected={courseId === "all"}
                      onClick={() => {
                        setCourseId("all");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-lg flex items-center justify-between gap-2.5 text-left transition-colors cursor-pointer ${
                        courseId === "all"
                          ? "bg-[#e7eeff] text-[#115eaf] font-semibold"
                          : "hover:bg-[#f0f4f8] text-[#000f22]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                            courseId === "all"
                              ? "bg-[#115eaf] text-white"
                              : "bg-[#f0f3ff] text-[#115eaf]"
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-semibold block truncate">
                            Complete University Prospectus & All 9 Syllabi
                          </span>
                          <span className="text-xs text-[#74777e] font-normal block">
                            Full curriculum handbook with all degree programs
                          </span>
                        </div>
                      </div>
                      {courseId === "all" && (
                        <Check className="w-4 h-4 text-[#115eaf] shrink-0" />
                      )}
                    </button>

                    <div className="border-t border-[#f0f3ff] my-1" />

                    {/* Individual Courses */}
                    {COURSES_DATA.map((c) => {
                      const isSelected = courseId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setCourseId(c.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-lg flex items-center justify-between gap-2.5 text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#e7eeff] text-[#115eaf] font-semibold"
                              : "hover:bg-[#f0f4f8] text-[#000f22]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-[11px] font-bold ${
                                isSelected
                                  ? "bg-[#115eaf] text-white"
                                  : "bg-[#f0f3ff] text-[#115eaf]"
                              }`}
                            >
                              {c.code || c.id.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <span className="text-sm font-semibold block truncate">
                                {c.name}
                              </span>
                              <span className="text-xs text-[#74777e] font-normal block">
                                {c.duration} • {c.level || "Degree"}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#115eaf] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Email Address with Form Icon */}
              <div>
                <label className="block text-xs sm:text-[13px] font-semibold text-[#1e293b] mb-1.5">
                  Email Address (To receive PDF copy) <span className="text-[#e11d48]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777e]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c4c6ce] text-sm font-medium text-[#000f22] placeholder:text-[#74777e] focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Mobile Phone with Form Icon */}
              <div>
                <label className="block text-xs sm:text-[13px] font-semibold text-[#1e293b] mb-1.5">
                  Mobile Number (+91) (For SMS Download Link) <span className="text-[#e11d48]">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#000f22] font-bold text-xs gap-1.5">
                    <Phone className="w-4 h-4 text-[#74777e]" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    pattern={INDIAN_PHONE_PATTERN}
                    title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                    value={phone}
                    onChange={(e) => setPhone(sanitizeIndianPhone(e.target.value))}
                    placeholder="10-digit Mobile Number"
                    className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-[#c4c6ce] text-sm font-medium text-[#000f22] placeholder:text-[#74777e] focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Security / Guarantee Badge */}
              <div className="p-3 rounded-xl bg-[#f0f3ff] border border-[#e7eeff] flex items-center gap-2.5 text-xs text-[#43474d]">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <span className="font-medium text-[#2d3748]">
                  100% Free Instant Download. Official PDF dispatched instantly.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#115eaf] text-white font-semibold text-sm shadow hover:bg-[#004689] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure Now</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#000f22] font-sans">
                  Download Started!
                </h4>
                <p className="text-xs sm:text-sm text-[#43474d] mt-1">
                  Your PDF copy has also been dispatched to <strong>{email}</strong>.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#115eaf] text-white font-semibold text-xs sm:text-sm shadow hover:bg-[#004689] transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
