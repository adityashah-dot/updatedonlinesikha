import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { DEGREEFYD_LPU_API } from '../data/apiData';
import { 
  CheckCircle,
  ChevronRight,
  Download,
  Calendar,
  FileText,
  PhoneCall
} from 'lucide-react';

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

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* Breadcrumb Bar */}
      <div className="bg-[#f0f3ff] border-b border-[#e7eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-[#43474d] space-x-2 font-medium">
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
        {/* PAGE HERO */}
        <section
          className="bg-white rounded-2xl border border-[#e1eaff] p-5 sm:p-6 md:p-8 shadow-[0_4px_18px_rgba(21,65,125,0.04)]"
          id="overview"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start">
            <div className="lg:col-span-7 space-y-3">
              <p className="flex items-center gap-[10px] mb-[10px] text-[11px] sm:text-[12px] font-semibold text-[#1763c5] uppercase tracking-[1.6px]">
                <span className="w-7 h-1 rounded-full bg-[#1763e9]" />
                Admissions Open
              </p>

              <h1 className="m-0 mb-[10px] text-[clamp(28px,3vw,42px)] leading-[1.2] tracking-[-1.2px] font-bold text-[#071a34]">
                LPU Online Admission 2026
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
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-white bg-[#1763b5] shadow-[0_3px_8px_rgba(23,99,181,0.14)] hover:bg-[#0d519b] transition-all duration-200"
                >
                  Apply Now
                  <span aria-hidden="true">→</span>
                </button>

                <button
                  onClick={onOpenBrochure}
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 sm:px-5 rounded-[7px] text-[13px] font-semibold text-[#0b2342] bg-white border border-[#17375e] hover:bg-[#f5f8ff] transition-all duration-200"
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

        {/* LPU ONLINE ADMISSION PROCESS 2026 */}
        <section className="page-section" id="admission-process">
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

        {/* ELIGIBILITY & SELECTION CRITERIA TABLE (From API: Section 3) */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-[#e7eeff] pb-4">
            <div className="text-left">
              <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
                LPU Online Eligibility and Selection Criteria
              </h2>
            </div>
            <button
              onClick={onOpenHelpDesk}
              className="text-xs font-bold text-[#115eaf] hover:underline flex items-center gap-1"
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
            <div className="flex justify-center">
              <button
                onClick={() => setShowAllEligibility(!showAllEligibility)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#115eaf] hover:underline"
              >
                {showAllEligibility
                  ? 'Show Less'
                  : `Show All ${DEGREEFYD_LPU_API.eligibilityMatrix.length} Programs`}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllEligibility ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </section>

        {/* IMPORTANT DATES TABLE (From API: Section 11) */}
<section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-[#e7eeff]">
            <div>
              <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
                LPU Online Admission 2026 Dates
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

        {/* SCHOLARSHIPS (From API) */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
          <div>
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans">
              LPU Online Scholarships
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

        {/* EXAMINATION PATTERN (From API) */}
        <section className="page-section card bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
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

        {/* DOCUMENTS REQUIRED & DEB ID */}
        <section className="page-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="card lg:col-span-4 bg-[#0b2540] text-white rounded-2xl shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#b1c8eb] uppercase tracking-wider block">
              Verification Guide
            </span>
            <h2 className="section-title text-xl sm:text-2xl font-bold font-sans">
              Essential Documents for Digital Scrutiny
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

          <div className="card lg:col-span-8 bg-white border border-[#e7eeff] rounded-2xl shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    10th Marksheet & Certificate
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">Proof of Date of Birth and Parent's names validation.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    12th Class Marksheet
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d5e3ff] text-[#004689]">Mandatory</span>
                </div>
                <p className="text-[#74777e]">From CBSE, ICSE, or recognized State Education Board for UG.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#000f22] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#115eaf]" />
                    Graduation Degree / Marksheets
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdcc3] text-[#6e3900]">For PG Tracks</span>
                </div>
                <p className="text-[#74777e]">All semester marksheets + provisional/original degree certificate.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] space-y-1">
                <div className="flex items-center justify-between">
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

        {/* INSTANT COUNSELING CALLBACK BANNER */}
        <section className="page-section card bg-[#0b2540] text-white rounded-2xl border border-[#314865] relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="Mobile Number (+91)"
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none"
                  />
                  <select
                    value={callbackCourse}
                    onChange={(e) => setCallbackCourse(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#c4c6ce] focus:border-[#115eaf] outline-none"
                  >
                    {COURSES_DATA.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-[#115eaf] text-white h-10 rounded-xl font-bold hover:bg-[#004689] active:scale-95 transition-all shadow flex items-center justify-center gap-1.5"
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
      </main>
    </div>
  );
};
