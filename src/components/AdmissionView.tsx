import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { DEGREEFYD_LPU_API } from '../data/apiData';
import { 
  CheckCircle,
  ChevronRight,
  Download,
  Calendar,
  FileText,
  PhoneCall,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { TableOfContents, TocItem } from './TableOfContents';

const ADMISSION_TOC_ITEMS: TocItem[] = [
  { id: 'admission-highlights', label: 'LPU Online Admission Highlights 2026' },
  { id: 'admission-dates', label: 'LPU Online Admission Important Dates 2026' },
  { id: 'eligibility-criteria', label: 'LPU Online Eligibility & Selection Criteria 2026' },
  { id: 'admission-process', label: 'LPU Online Admission Process 2026' },
  { id: 'application-process', label: 'LPU Online Application Process 2026' },
  { id: 'documents-required', label: 'LPU Online Documents Required for Admission' },
  { id: 'scholarship-schemes', label: 'LPU Online Scholarship 2026' },
  { id: 'student-reviews', label: 'LPU Online Student Reviews' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'compare', label: 'Compare' },
];

interface AdmissionViewProps {
  onSelectCourse: (course: Course) => void;
  onOpenApply: (courseId?: string) => void;
  onOpenBrochure: () => void;
  onOpenHelpDesk: () => void;
  onOpenEmi: () => void;
  universityNavigation?: React.ReactNode;
}

export const AdmissionView: React.FC<AdmissionViewProps> = ({
  onOpenApply,
  onOpenBrochure,
  onOpenHelpDesk,
  universityNavigation
}) => {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackCourse, setCallbackCourse] = useState('mba');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [showAllEligibility, setShowAllEligibility] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('admission-highlights');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = ADMISSION_TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = ADMISSION_TOC_ITEMS[i];
        let el = document.getElementById(item.id);
        if (!el) {
          if (item.id === 'admission-highlights') el = document.getElementById('admission-overview');
          if (item.id === 'admission-dates') el = document.getElementById('important-dates');
          if (item.id === 'scholarship-schemes') el = document.getElementById('scholarships-schemes');
          if (item.id === 'compare') el = document.getElementById('compare-colleges');
        }
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* Breadcrumb Bar */}
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#43474d] font-medium">
            <span className="hover:text-[#115eaf] cursor-pointer">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">Colleges</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="hover:text-[#115eaf] cursor-pointer">Lovely Professional University Online</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74777e]" />
            <span className="text-[#000f22] font-bold">Admission 2026</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-[10px]">
        {/* 1. LPU ONLINE ADMISSION HIGHLIGHTS 2026 */}
        <section
          className="bg-white rounded-2xl border border-[#e1eaff] p-5 sm:p-6 md:p-8 shadow-[0_4px_18px_rgba(21,65,125,0.04)] scroll-mt-[110px]"
          id="admission-highlights"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <div id="admission-overview" className="scroll-mt-[110px]" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start">
            <div className="lg:col-span-7 space-y-3">
              <p className="flex items-center gap-[10px] mb-[10px] text-[11px] sm:text-[12px] font-semibold text-[#1763c5] uppercase tracking-[1.6px]">
                <span className="w-7 h-1 rounded-full bg-[#1763e9]" />
                Admissions Open 2026
              </p>

              <h1 className="m-0 mb-[10px] text-[clamp(28px,3vw,42px)] leading-[1.2] tracking-[-1.2px] font-bold text-[#071a34]">
                LPU Online Admission Highlights 2026
              </h1>

              <p className="m-0 text-sm text-[#2d3137] leading-relaxed font-normal">
                LPU Online admission 2026 is ongoing for its UG and PG courses. Students can apply for MBA, MCA, BBA and BCA courses through the portal. LPU Online registration 2026 last date for this session is February 28, 2026. Admission follows a merit-based selection process for most online distance learning courses. The official website handles the complete digital application and document verification process. Applicants must check eligibility criteria before paying the registration fee online.
              </p>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-0 bg-[#f7f9ff] border border-[#e1eaff] rounded-[10px] p-2.5 sm:p-3">
                <div className="min-w-0 px-2 sm:px-2.5 py-1 border-r border-[#d7e1f0]">
                  <span className="block mb-1 text-[10px] leading-[1.4] text-[#75849a]">Admission Status</span>
                  <span className="block text-[12px] leading-[1.4] font-semibold text-[#129b55]">● Ongoing</span>
                </div>
                <div className="min-w-0 px-2 sm:px-2.5 py-1 border-r border-[#d7e1f0]">
                  <span className="block mb-1 text-[10px] leading-[1.4] text-[#75849a]">Mode of Application</span>
                  <span className="block text-[12px] leading-[1.4] font-semibold text-[#0b1e3a]">Online</span>
                </div>
                <div className="min-w-0 px-2 sm:px-2.5 py-1 border-r border-[#d7e1f0]">
                  <span className="block mb-1 text-[10px] leading-[1.4] text-[#75849a]">Admission Criteria</span>
                  <span className="block text-[12px] leading-[1.4] font-semibold text-[#0b1e3a]">Merit-based</span>
                </div>
                <div className="min-w-0 px-2 sm:px-2.5 py-1">
                  <span className="block mb-1 text-[10px] leading-[1.4] text-[#75849a]">Registration Fee</span>
                  <span className="block text-[12px] leading-[1.4] font-semibold text-[#1763c5]">₹600</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mt-4">
                <button
                  onClick={() => onOpenApply()}
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-white bg-[#1763b5] shadow-[0_3px_8px_rgba(23,99,181,0.14)] hover:bg-[#0d519b] transition-all duration-200 cursor-pointer"
                >
                  Apply Now
                  <span aria-hidden="true">→</span>
                </button>

                <button
                  onClick={onOpenBrochure}
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-[#0b2342] bg-white border border-[#17375e] hover:bg-[#f5f8ff] transition-all duration-200 cursor-pointer"
                >
                  <Download className="w-[17px] h-[17px]" />
                  Download Brochure
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]">
                <img
                  src={DEGREEFYD_LPU_API.hero.backgroundImage}
                  alt="LPU Online campus and student learning"
                  className="w-full h-48 sm:h-60 lg:h-64 object-cover block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {universityNavigation}

        {/* Table of Contents - Matching Screenshot Exactly */}
        <TableOfContents
          title="Table of contents"
          items={ADMISSION_TOC_ITEMS}
          activeId={activeSection}
          onItemClick={(id) => setActiveSection(id)}
          defaultExpanded={false}
          collapsedCount={6}
        />

        {/* 2. LPU ONLINE ADMISSION IMPORTANT DATES 2026 */}
        <section id="admission-dates" className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs scroll-mt-[110px]">
          <div id="important-dates" className="scroll-mt-[110px]" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-[#e7eeff]">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
                LPU Online Admission Important Dates 2026
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#43474d]">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Intake 2026 Active</span>
            </div>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            Lovely Professional University releases admission dates for its online programs on the official website. Students must complete the application before the deadline and submit required documents such as DEB ID and academic certificates during admission. Check the table below for LPU admission dates:
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f0f3ff] text-[#000f22] font-bold">
                  <th className="py-3 px-4 border-b border-[#e7eeff]">Event</th>
                  <th className="py-3 px-4 border-b border-[#e7eeff]">Important Date</th>
                  <th className="py-3 px-4 border-b border-[#e7eeff]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff]">
                {DEGREEFYD_LPU_API.importantDates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#000f22] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#115eaf]" />
                      <span>{item.event}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#43474d]">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-[#d5e3ff] text-[#004689]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#74777e] italic mt-[18px]">
            Note: Dates are tentative and may be updated by the university. Please refer to the official website or speak to a counselor for the latest information.
          </p>
        </section>

        {/* 3. LPU ONLINE ELIGIBILITY & SELECTION CRITERIA 2026 */}
        <section id="eligibility-criteria" className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs scroll-mt-[110px]">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-[#e7eeff] pb-4">
            <div className="text-left">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                LPU Online Eligibility & Selection Criteria 2026
              </h2>
            </div>
            <button
              onClick={onOpenHelpDesk}
              className="text-xs font-bold text-[#115eaf] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Need Free Eligibility Assessment?</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            Lovely Professional University provides a range of online undergraduate and postgraduate programs. The eligibility criteria depend on the course level, and admission is generally based on academic qualifications and document verification. To be eligible for admission, candidates are required to fill out the online application form, upload the required documents, and pay the program fee. Check the below table for LPU online eligibility and selection criteria:
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0b2540] text-white">
                  <th className="py-3 px-4 font-bold">Course</th>
                  <th className="py-3 px-4 font-bold">Eligibility</th>
                  <th className="py-3 px-4 font-bold">Selection Process</th>
                  <th className="py-3 px-4 font-bold text-right">Tuition Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff]">
                {(showAllEligibility
                  ? DEGREEFYD_LPU_API.eligibilityMatrix
                  : DEGREEFYD_LPU_API.eligibilityMatrix.slice(0, 4)
                ).map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#000f22]">
                      {item.course}
                      <span className="block text-[11px] font-normal text-[#74777e]">{item.duration}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#43474d] max-w-xs">{item.eligibility}</td>
                    <td className="py-3.5 px-4 text-[#115eaf] font-normal">{item.selection}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#000f22]">
                      {item.feeSem} <span className="text-[11px] font-normal text-[#74777e]">/sem</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {DEGREEFYD_LPU_API.eligibilityMatrix.length > 4 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => setShowAllEligibility(!showAllEligibility)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#115eaf] hover:underline cursor-pointer"
              >
                {showAllEligibility
                  ? 'Show Less'
                  : `Show All ${DEGREEFYD_LPU_API.eligibilityMatrix.length} Programs`}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllEligibility ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </section>

        {/* 4. LPU ONLINE ADMISSION PROCESS 2026 */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs scroll-mt-[110px]" id="admission-process">
          <div className="mb-5 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
              LPU Online Admission Process 2026
            </h2>
            <p className="mt-2 text-sm text-[#43474d] leading-relaxed font-normal">
              {DEGREEFYD_LPU_API.admissionProcess.intro}
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-4 left-[10%] right-[10%] h-px bg-[#d5e3ff]" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
              {DEGREEFYD_LPU_API.admissionProcess.steps.map((step, index, steps) => (
                <div key={step.stepNum} className="relative flex items-start gap-3 md:flex-col md:items-center md:gap-0">
                  {index < steps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-[-12px] w-px bg-[#d5e3ff] md:hidden" />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#115eaf] bg-white text-xs font-semibold text-[#115eaf] md:mb-3">
                    {String(step.stepNum).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1 rounded-lg border border-[#e7eeff] bg-white p-3.5 md:w-full md:flex-none">
                    <h3 className="mb-1.5 text-sm font-semibold text-[#000f22] font-sans">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#43474d] font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. LPU ONLINE APPLICATION PROCESS 2026 */}
        <section id="application-process" className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs scroll-mt-[110px]">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-[#e7eeff] pb-4">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                LPU Online Application Process 2026
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#43474d] leading-relaxed">
                Step-by-step digital application guide for candidates applying at lpuonline.com.
              </p>
            </div>
            <button
              onClick={() => onOpenApply()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#115eaf] text-white text-xs font-bold hover:bg-[#004689] transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Start Application
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <div className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#115eaf] text-white font-bold text-xs">
                1
              </span>
              <h3 className="text-sm font-bold text-[#000f22]">Online Registration</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                Visit the official website (lpuonline.com) and register with your active email address and mobile number to generate your student login credentials.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#115eaf] text-white font-bold text-xs">
                2
              </span>
              <h3 className="text-sm font-bold text-[#000f22]">Select Degree & Fill Form</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                Select your preferred program (e.g., MBA, MCA, BCA, BBA), enter your academic history, personal information, and communication address.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#115eaf] text-white font-bold text-xs">
                3
              </span>
              <h3 className="text-sm font-bold text-[#000f22]">Upload Documents & DEB ID</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                Upload scanned copies of 10th, 12th, or graduation marksheets along with government photo identity proof, photograph, and unique UGC-DEB ID.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#115eaf] text-white font-bold text-xs">
                4
              </span>
              <h3 className="text-sm font-bold text-[#000f22]">Fee Payment & Confirmation</h3>
              <p className="text-xs text-[#43474d] leading-relaxed">
                Pay the ₹600 registration fee and semester tuition fee online via UPI, Net Banking, or Credit/Debit Card. Receive your LMS login credentials and admission letter.
              </p>
            </div>
          </div>
        </section>

        {/* EXAMINATION PATTERN (From API) */}
        <section id="examination-pattern" className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs scroll-mt-[110px]">
          <div>
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              LPU Online Examination Pattern
            </h2>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            {DEGREEFYD_LPU_API.examinationPattern.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-[18px]">
            {DEGREEFYD_LPU_API.examinationPattern.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-[#115eaf] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-bold text-xs text-[#000f22]">{step.title}</h3>
                  <p className="text-[11px] text-[#43474d] leading-relaxed mt-[7.5px]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. LPU ONLINE DOCUMENTS REQUIRED FOR ADMISSION */}
        <section id="documents-required" className="page-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-[110px]">
          <div className="card lg:col-span-4 bg-[#0b2540] text-white rounded-2xl shadow-xs space-y-4 p-5 sm:p-6">
            <span className="text-xs font-bold text-[#b1c8eb] uppercase tracking-wider block">
              Verification Guide
            </span>
            <h2 className="section-title text-xl sm:text-2xl font-bold font-sans">
              LPU Online Documents Required for Admission
            </h2>
            <p className="section-description text-xs text-[#b1c8eb] leading-relaxed">
              Ensure all uploaded documents are colored scanned copies of original certificates in PDF or JPEG format (under 5MB).
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#ffdcc3] font-bold">
                <CheckCircle className="w-4 h-4 text-[#ffdcc3]" />
                <span>Is DEB ID Required for LPU Online Admission?</span>
              </div>
              <p className="text-[11px] text-[#b1c8eb]">
                Yes, DEB ID is required for LPU Online admission. The DEB ID (Distance Education Bureau ID) is a unique ID required for students applying to UGC-approved online and distance learning programs in India.
              </p>
            </div>
          </div>

          <div className="card lg:col-span-8 bg-white border border-[#e7eeff] rounded-2xl shadow-xs p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    10th Marksheet & Certificate
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">Proof of Date of Birth and Parent's names validation.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    12th Class Marksheet
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">From CBSE, ICSE, or recognized State Education Board for UG.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    Graduation Degree / Marksheets
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdcc3] text-[#6e3900]">For PG Tracks</span>
                </div>
                <p className="text-[#74777e]">All semester marksheets + provisional/original degree certificate.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    Valid Government Photo ID
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">Aadhaar Card, Passport, Voter ID, or Driving License scan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. LPU ONLINE SCHOLARSHIP 2026 */}
        <section id="scholarship-schemes" className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs scroll-mt-[110px]">
          <div id="scholarships-schemes" className="scroll-mt-[110px]" />
          <div>
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              LPU Online Scholarship 2026
            </h2>
          </div>

          <p className="section-description text-xs sm:text-sm text-[#43474d] leading-relaxed">
            {DEGREEFYD_LPU_API.scholarships.description}
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0b2540] text-white">
                  <th className="py-3 px-4 font-bold">Scholarship / Benefit</th>
                  <th className="py-3 px-4 font-bold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff]">
                {DEGREEFYD_LPU_API.scholarships.items.map((s, idx) => (
                  <tr key={idx} className="hover:bg-[#f0f3ff]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#000f22] align-top">
                      {s.title}
                      <span className="block mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-normal bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]">
                        {s.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#43474d] leading-relaxed">{s.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#74777e] italic mt-[18px]">
            Note: {DEGREEFYD_LPU_API.scholarships.note}
          </p>
        </section>

        {/* INSTANT COUNSELING CALLBACK BANNER */}
        <section id="counseling-callback" className="page-section card bg-[#0b2540] text-white rounded-2xl border border-[#314865] relative overflow-hidden shadow-xl scroll-mt-[110px]">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-5 sm:p-6 md:p-8">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#115eaf] text-white text-xs font-bold uppercase tracking-wide">
                <PhoneCall className="w-3.5 h-3.5" />
                1-on-1 Academic Counseling
              </span>
              <h2 className="section-title text-2xl sm:text-3xl font-extrabold font-sans">
                Have Questions About Document Eligibility or Grants?
              </h2>
              <p className="section-description text-xs sm:text-sm text-[#b1c8eb] max-w-2xl leading-relaxed">
                Speak directly with Online Siksha university counselors for transcript pre-screening, scholarship estimation, and instant enrollment support.
              </p>
            </div>

            {/* Quick Callback Form */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl text-[#000f22] shadow-lg space-y-3">
              <h3 className="font-bold text-sm text-[#000f22] font-sans">Request Instant Callback</h3>
              {!callbackSubmitted ? (
                <form onSubmit={handleCallbackSubmit} className="space-y-2.5 text-xs">
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none text-base sm:text-xs"
                  />
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="Mobile Number (+91)"
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none text-base sm:text-xs"
                  />
                  <select
                    value={callbackCourse}
                    onChange={(e) => setCallbackCourse(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none text-base sm:text-xs"
                  >
                    {COURSES_DATA.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-[#115eaf] text-white h-10 rounded-xl font-bold hover:bg-[#004689] active:scale-95 transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Talk to Expert Counselor</span>
                  </button>
                  <span className="text-[10px] text-[#74777e] text-center block">
                    Average response time: &lt; 15 minutes
                  </span>
                </form>
              ) : (
                <div className="py-4 text-center space-y-2 text-xs">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <span className="font-bold text-[#000f22] block">Callback Requested!</span>
                  <p className="text-[#43474d]">
                    We will call you at +91 {callbackPhone} shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8. LPU ONLINE STUDENT REVIEWS */}
        <section id="student-reviews" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[110px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#e7eeff]">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
                LPU Online Student Reviews
              </h2>
              <p className="section-description text-xs text-[#74777e]">
                Authentic feedback from verified learners and alumni who completed admissions and courses online.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#f0f3ff] border border-[#d5e3ff] p-2.5 rounded-xl shrink-0">
              <div className="text-center">
                <span className="block text-lg font-black text-[#115eaf]">94%</span>
                <span className="text-[9px] text-[#43474d] font-bold">Admission Satisfaction</span>
              </div>
              <div className="h-6 w-px bg-[#d5e3ff]" />
              <div className="text-center">
                <span className="block text-lg font-black text-[#000f22]">4.3 / 5</span>
                <span className="text-[9px] text-[#43474d] font-bold">Overall Rating</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[18px]">
            {DEGREEFYD_LPU_API.testimonials.slice(0, 3).map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-[#e7eeff] hover:border-[#115eaf]/70 hover:shadow-md transition-all p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-amber-400 gap-0.5 items-center">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified Student
                    </span>
                  </div>
                  <p className="text-xs text-[#2d3137] italic leading-relaxed">
                    "{t.review}"
                  </p>
                </div>
                <div className="border-t border-[#e7eeff] pt-2.5 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-xs text-[#000f22]">{t.name}</span>
                    <span className="block text-[10px] text-[#74777e]">{t.course} · Batch {t.batch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. BLOGS */}
        <section id="blogs" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[110px]">
          <div className="flex items-end justify-between gap-3 flex-wrap border-b border-[#e7eeff] pb-4">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                Blogs
              </h2>
              <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal max-w-[850px]">
                {DEGREEFYD_LPU_API.blogs.description}
              </p>
            </div>
            <button
              onClick={() => onOpenHelpDesk()}
              className="h-10 px-4 inline-flex items-center gap-2 rounded-xl border border-[#0b2540] text-[#0b2540] text-xs font-bold hover:bg-[#0b2540] hover:text-white transition-all shrink-0 cursor-pointer"
            >
              View All Blogs
              <span className="text-[#115eaf] text-sm">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
            {DEGREEFYD_LPU_API.blogs.posts.slice(0, 3).map((post, i) => (
              <article
                key={i}
                className="overflow-hidden bg-white border border-[#e7eeff] rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden bg-[#f0f3ff]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 px-2 py-1 rounded-full bg-[#115eaf] text-white text-[10px] font-bold">
                    {post.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] text-[#74777e]">{post.date}</span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#000f22] line-clamp-2 mt-1">
                      {post.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onOpenHelpDesk()}
                    className="text-xs font-bold text-[#115eaf] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
                  >
                    Read Article
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 10. COMPARE */}
        <section id="compare" className="page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[110px]">
          <div id="compare-colleges" className="scroll-mt-[110px]" />
          <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
            Compare
          </h2>
          <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
            {DEGREEFYD_LPU_API.compareSection.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-[#e7eeff] rounded-2xl bg-white shadow-sm mt-[18px]">
            {/* LPU COLLEGE CARD */}
            <div className="min-h-[200px] rounded-xl border border-[#e7eeff] bg-[#f0f3ff] p-4 flex flex-col justify-between">
              <div>
                <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold">
                  Selected College
                </span>

                <div className="flex gap-4 items-center">
                  <div className="w-[80px] h-[65px] shrink-0 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={DEGREEFYD_LPU_API.hero.logoImage}
                      alt="LPU Logo"
                      className="max-w-full max-h-full object-contain p-1"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base leading-tight font-extrabold text-[#000f22] font-sans">
                      {DEGREEFYD_LPU_API.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-[#43474d]">
                      <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
                      Phagwara, Punjab
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {DEGREEFYD_LPU_API.approvals.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white border border-[#d5e3ff] text-[10px] text-[#43474d]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBrochure()}
                className="w-full h-10 mt-3 flex items-center justify-center gap-2 rounded-lg border border-[#115eaf] bg-white text-[#115eaf] text-xs font-bold hover:bg-[#f0f3ff] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Brochure
              </button>
            </div>

            {/* VS */}
            <div className="compare-vs flex items-center justify-center">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#115eaf] text-white text-xs font-extrabold">
                VS
              </span>
            </div>

            {/* ADD COLLEGE CARD */}
            <div className="min-h-[200px] rounded-xl border border-dashed border-[#d5e3ff] bg-[#f9f9ff] p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full border border-[#d5e3ff] bg-white flex items-center justify-center text-[#115eaf] text-xl font-light mb-2">
                +
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#000f22] font-sans">
                  Add Comparison College
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#43474d]">
                  Select another online university to compare admission fees and eligibility.
                </p>
              </div>
              <button
                onClick={() => onOpenHelpDesk()}
                className="w-full h-10 mt-3 rounded-lg bg-[#0b2540] text-white text-xs font-bold hover:bg-[#011c37] transition-all cursor-pointer"
              >
                Add College to Compare
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
