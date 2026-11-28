import { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { FaqAccordion } from "./FaqAccordion";
const FAQ_ITEMS = [
  {
    category: "validity",
    question: "Are online degrees recognized by UGC & AICTE and valid for UPSC/Govt jobs?",
    answer: "Yes. Under the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations 2020, online degrees entitled by the UGC Distance Education Bureau (UGC-DEB) and AICTE are recognized on par with conventional campus degrees. They are legally valid for all Central and State Government examinations (UPSC Civil Services, SSC, Banking, Defense, and State PSCs) as well as for higher education admissions in India."
  },
  {
    category: "validity",
    question: "Are online degrees from Indian universities recognized abroad for WES and PR?",
    answer: "Yes. Online degrees from NAAC A++ and A+ accredited Indian universities (including LPU, Amity, Chandigarh University, and Manipal) are accepted by World Education Services (WES) for Canada and USA immigration points (Express Entry PR) as well as for admission into foreign master's and doctoral programs."
  },
  {
    category: "exams",
    question: "How are semester examinations conducted in online degree programs?",
    answer: "Exams are held online with remote proctoring. You take them from home on a computer with a webcam and microphone. Exam rules and time slots vary by university, so check the programme page or ask an advisor for details."
  },
  {
    category: "fees",
    question: "How do 0% interest monthly EMI financing plans work?",
    answer: "All featured universities offer zero-cost monthly EMI options through verified banking partners and NBFCs. Rather than paying the full semester fee upfront, your tuition is split into 6, 9, or 12 equal monthly installments with zero interest and zero loan processing fee. Pre-approval requires only basic identity and KYC documentation."
  },
  {
    category: "admissions",
    question: "What is the eligibility criteria for Online MBA and MCA programs?",
    answer: "For Online MBA: Any Bachelor's degree (10+2+3 pattern) from a recognized university with at least 50% aggregate marks (45% for reserved categories). No CAT/MAT score is mandatory.\nFor Online MCA: BCA, B.Sc Computer Science/IT, or any graduate with Mathematics/Statistics at 10+2 or Bachelor's level with at least 50% marks."
  },
  {
    category: "exams",
    question: "Do I ever need to visit the physical university campus during the course?",
    answer: "No physical campus visits are required for coursework or exams. All live lectures, recorded video modules, e-books, assignments, and semester tests are delivered via the university's Learning Management System (LMS) or mobile app. However, students are always welcome to attend the annual on-campus convocation ceremony in person."
  },
  {
    category: "placements",
    question: "What placement assistance and career support do online students receive?",
    answer: "Enrolled students get access to the university's dedicated placement cell. This includes virtual job fairs, 1-on-1 resume building, LinkedIn optimization workshops, AI mock interview training, and direct interview opportunities with 300+ hiring partners (including Amazon, Cognizant, TCS, Deloitte, and Tech Mahindra)."
  },
  {
    category: "validity",
    question: 'Does the degree certificate state "Online" or mention mode of study?',
    answer: "As per UGC regulations, degree certificates issued by entitled universities specify the degree name and the university. While UGC mandates mentioning the delivery mode, the legal standing, credit weightage, curriculum rigor, and alumni benefits are equivalent to regular on-campus graduates under UGC guidelines."
  }
];
const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "validity", label: "UGC & Legal Validity" },
  { id: "exams", label: "Exams & LMS" },
  { id: "fees", label: "Fees & EMI" },
  { id: "admissions", label: "Eligibility & Admissions" },
  { id: "placements", label: "Placements & Career" }
];
export const HomeFaq = ({ onOpenHelpDesk }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredFaqs = FAQ_ITEMS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );
  return <section id="faqs" className="bg-white rounded-xl border border-line-strong/60 shadow-sm p-5 md:p-7">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-4 border-b border-line-strong/40 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[13px] text-ink-700 font-normal mt-0.5">
            Common questions about recognition, exams, fees and admissions.
          </p>
        </div>

        {
    /* Quick Help Trigger */
  }
        <button
    type="button"
    onClick={onOpenHelpDesk}
    className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
  >
          <span>Have another question? Talk to an advisor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {
    /* Category Pills */
  }
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-line-strong/30 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => <button
    key={cat.id}
    type="button"
    onClick={() => setActiveCategory(cat.id)}
    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${activeCategory === cat.id ? "bg-brand-600 text-white font-semibold shadow-xs" : "bg-canvas text-ink-700 hover:bg-line hover:text-ink-900"}`}
  >
            {cat.label}
          </button>)}
      </div>

      {
    /* Accordion List (shared accessible accordion) */
  }
      <div className="mt-2">
        <FaqAccordion items={filteredFaqs} variant="list" defaultOpenIndex={0} key={activeCategory} />
      </div>

      {
    /* Bottom Assistance Banner */
  }
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-canvas via-brand-100 to-canvas border border-line-strong/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-ink-900">
              Still deciding?
            </p>
            <p className="text-[11px] sm:text-xs text-ink-700 font-normal">
              Talk to an advisor about programmes, fees and admissions. It's free.
            </p>
          </div>
        </div>
        <button
    type="button"
    onClick={onOpenHelpDesk}
    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shadow-xs cursor-pointer"
  >
          Talk to an advisor
        </button>
      </div>
    </section>;
};
