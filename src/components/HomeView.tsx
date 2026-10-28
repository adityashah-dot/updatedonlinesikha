import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHero from './HomeHero';
import {
  Search,
  ShieldCheck,
  ArrowRight,
  Download,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Headphones,
  GraduationCap,
  Building2,
  Award,
  Sparkles,
  Laptop,
  CreditCard,
  CheckCircle2,
  Star,
  Users,
} from 'lucide-react';

interface HomeViewProps {
  onOpenApply: (courseId?: string) => void;
  onOpenHelpDesk: () => void;
  onOpenChat?: () => void;
  onOpenCounselor?: () => void;
}

const HERO_METRICS = [
  { value: '50+', label: 'Entitled Universities' },
  { value: '180+', label: 'Recognized Degrees' },
  { value: '5,00,000+', label: 'Students Guided', tone: 'text-[#115eaf]' },
  { value: '100%', label: 'Zero-Cost EMI Options', tone: 'text-emerald-700' },
];

const DEGREE_CATEGORIES = ["Master's (PG)", "Bachelor's (UG)", 'Executive Tracks'] as const;

const DEGREE_CARDS = [
  {
    title: 'Online MBA',
    subtitle: 'Master of Business Administration',
    duration: '2 Years • 4 Sems',
    badge: '0% EMI Pre-Approved',
    badgeTone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    bullets: [
      'UGC-DEB & AICTE Entitled Equivalence',
      '0% Interest EMI starting ₹3,080/mo',
      '100% Remote Proctored Exams from Home',
      '19+ High-Growth Specializations',
    ],
    price: '₹18,500',
    emi: '₹3,080/mo',
    explore: 'Explore 28 Unis',
  },
  {
    title: 'Online MCA',
    subtitle: 'Master of Computer Applications',
    duration: '2 Years • 4 Sems',
    badge: 'AI & Cloud Ready',
    badgeTone: 'text-blue-700 bg-blue-50 border-blue-200',
    bullets: [
      'UGC-DEB Approved Regular Equivalence',
      '0% Interest EMI starting ₹3,660/mo',
      'Cloud Sandbox & Virtual AI Labs',
      'Remote Weekend Proctored Exams',
    ],
    price: '₹22,000',
    emi: '₹3,660/mo',
    explore: 'Explore 22 Unis',
  },
  {
    title: 'Online BBA',
    subtitle: 'Bachelor of Business Administration',
    duration: '3 Years • 6 Sems',
    badge: 'Top UG Program',
    badgeTone: 'text-sky-700 bg-sky-50 border-sky-200',
    bullets: [
      'UGC Section 22 Entitled Degree',
      '0% Interest EMI starting ₹2,330/mo',
      'Digital Marketing & FinTech Tracks',
      '10+2 Any Stream (50% Minimum)',
    ],
    price: '₹14,000',
    emi: '₹2,330/mo',
    explore: 'Explore 19 Unis',
  },
  {
    title: 'Online BCA',
    subtitle: 'Bachelor of Computer Applications',
    duration: '3 Years • 6 Sems',
    badge: 'Tech Career Track',
    badgeTone: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    bullets: [
      'UGC Statutory Entitled Bachelors',
      '0% Interest EMI starting ₹2,500/mo',
      '100% Remote AI-Proctored Exams',
      'Full-Stack Web & Python Labs',
    ],
    price: '₹15,000',
    emi: '₹2,500/mo',
    explore: 'Explore 17 Unis',
  },
  {
    title: 'Online B.Com / M.Com',
    subtitle: 'Commerce & Corporate Finance',
    duration: 'UG & PG Tracks Available',
    badge: 'ACCA / US CMA Aligned',
    badgeTone: 'text-amber-800 bg-amber-50 border-amber-200',
    bullets: [
      'UGC-DEB Recognized & Govt Valid',
      '0% Interest EMI starting ₹2,000/mo',
      'Valid for UPSC, Banking & SSC',
      'ACCA 9-Paper Exemption Option',
    ],
    price: '₹12,000',
    emi: '₹2,000/mo',
    explore: 'Explore 15 Unis',
  },
  {
    title: 'Online BA / MA',
    subtitle: 'Liberal Arts & Public Policy',
    duration: 'UG & PG Tracks Available',
    badge: 'Most Affordable',
    badgeTone: 'text-slate-700 bg-slate-100 border-slate-300',
    bullets: [
      'UGC-Entitled Regular Equivalence',
      '0% Interest EMI starting ₹1,830/mo',
      '100% Remote Proctored Exams',
      'Ideal for Working Professionals & Civil Services',
    ],
    price: '₹11,000',
    emi: '₹1,830/mo',
    explore: 'Explore 14 Unis',
  },
];

const FEATURED_UNIS = [
  {
    id: 'lpu-online',
    name: 'Lovely Professional University',
    short: 'LPU Online',
    naac: 'NAAC A++ (3.68 CGPA)',
    rank: 'NIRF #31',
    bullets: [
      'UGC Category-1 Autonomy Entitlement',
      '0% Interest EMI from ₹4,950/month',
      '100% Home AI-Proctored Examinations',
      'Live Weekend Lectures + Mobile LMS',
    ],
    totalFee: '₹1,40,000',
    emi: '₹4,950/mo',
  },
  {
    id: 'amity-online',
    name: 'Amity University',
    short: 'Amity Online',
    naac: 'NAAC A+ Accredited',
    rank: 'QS Asia Top 10',
    bullets: [
      'UGC-DEB & Global WES Recognized',
      '0% Interest EMI from ₹5,833/month',
      '100% Remote Proctored Exams',
      'Dedicated Placement Assistance',
    ],
    totalFee: '₹1,65,000',
    emi: '₹5,833/mo',
  },
  {
    id: 'cu-online',
    name: 'Chandigarh University',
    short: 'CU Online',
    naac: 'NAAC A+ Accredited',
    rank: 'QS World Ranked',
    bullets: [
      'UGC-Entitled + Harvard Certifications',
      '0% Interest EMI from ₹4,500/month',
      'Flexible Weekend Proctored Exams',
      '300+ Active Placement Recruiters',
    ],
    totalFee: '₹1,35,000',
    emi: '₹4,500/mo',
  },
  {
    id: 'manipal-online',
    name: 'Manipal University Jaipur',
    short: 'Online Manipal',
    naac: 'NAAC A++ (3.59 CGPA)',
    rank: '70+ Yrs Academic Legacy',
    bullets: [
      'UGC Category-1 Autonomy Status',
      '0% Interest EMI from ₹5,200/month',
      'Coursera Certified Learning Content',
      '100% Remote Web Proctored Exams',
    ],
    totalFee: '₹1,75,000',
    emi: '₹5,200/mo',
  },
];

type CompareCell = { text: string; tone?: string; badge?: boolean };

const COMPARE_ROWS: { param: string; cells: CompareCell[] }[] = [
  {
    param: 'UGC-DEB Statutory Entitlement',
    cells: [
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
      { text: 'Category-1 Approved', tone: 'text-emerald-700 font-semibold' },
    ],
  },
  {
    param: 'NAAC Accreditation Grade',
    cells: [
      { text: 'A++ (3.68 CGPA)', badge: true },
      { text: 'A+', badge: true },
      { text: 'A+', badge: true },
      { text: 'A++ (3.59 CGPA)', badge: true },
    ],
  },
  {
    param: 'NIRF University Ranking',
    cells: [
      { text: 'Rank #31' },
      { text: 'Top 35 Band' },
      { text: 'Top 40 Band' },
      { text: 'Top 60 Band' },
    ],
  },
  {
    param: 'Total 2-Year Program Fees',
    cells: [
      { text: '₹1,40,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,65,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,35,000', tone: 'font-bold text-[#000f22]' },
      { text: '₹1,75,000', tone: 'font-bold text-[#000f22]' },
    ],
  },
  {
    param: 'Monthly 0-Cost EMI Option',
    cells: [
      { text: '₹4,950 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹5,833 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹4,500 / month', tone: 'text-emerald-700 font-semibold' },
      { text: '₹5,200 / month', tone: 'text-emerald-700 font-semibold' },
    ],
  },
  {
    param: 'Examination Methodology',
    cells: [
      { text: '100% Remote AI Web-Cam' },
      { text: '100% Remote Proctored' },
      { text: 'Online LMS Exam' },
      { text: 'Remote Web Proctored' },
    ],
  },
  {
    param: 'Global WES Recognition (Canada/US)',
    cells: [
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
      { text: 'Yes, Valid', tone: 'text-emerald-700' },
    ],
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenApply,
  onOpenHelpDesk,
  onOpenChat,
  onOpenCounselor,
}) => {
  const navigate = useNavigate();
  const [degreeTab, setDegreeTab] = useState<(typeof DEGREE_CATEGORIES)[number]>("Master's (PG)");
  const [lead, setLead] = useState({ phone: '', email: '', degree: 'Online MBA' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('Online MBA (Master of Business)');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget (₹12,000 - ₹50,000)');
  const [selectedMode, setSelectedMode] = useState('100% Home AI Proctored');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-4 space-y-6">
      <HomeHero />
      {/* Degree programs */}
      <section id="degrees" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 border-b border-slate-200/80 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#000f22]">Popular Online Degree Programs</h2>
            <p className="text-xs sm:text-[13px] text-[#43474d] font-normal mt-0.5">
              UGC Section 22 Entitled degrees with 0% interest EMI tuition and 100% remote proctored exams.
            </p>
          </div>
          <div className="inline-flex p-1 bg-[#f0f4f8] rounded-xl border border-[#c4c6ce]/50 text-[12px] font-semibold">
            {DEGREE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setDegreeTab(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  degreeTab === cat ? 'bg-[#115eaf] text-white shadow-sm' : 'text-[#43474d] hover:text-[#111c2d]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {DEGREE_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#115eaf] transition-all hover:shadow-md p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2.5 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    {card.duration}
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${card.badgeTone}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#000f22]">{card.title}</h3>
                <p className="text-[12px] text-[#43474d] font-normal mt-0.5">{card.subtitle}</p>

                {/* Short Bulleted Highlights */}
                <div className="mt-3 py-2.5 border-y border-slate-100 space-y-1.5 text-xs text-slate-700">
                  {card.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${idx === 1 ? 'text-emerald-600' : 'text-[#115eaf]'}`} />
                      <span className={idx === 1 ? 'font-semibold text-emerald-700' : 'text-slate-700'}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#43474d] block">Tuition Starts From</span>
                  <span className="text-[15px] font-bold text-[#000f22]">
                    {card.price} <span className="text-[11px] font-normal text-[#43474d]">/ sem</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('universities')}
                  className="px-3.5 py-2 rounded-xl bg-[#115eaf] text-white text-[12px] font-semibold hover:bg-[#084a8c] transition-colors cursor-pointer shadow-2xs"
                >
                  {card.explore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured universities */}
      <section id="universities" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 border-b border-slate-200/80 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#115eaf]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#000f22]">Featured NAAC A++ / A+ Online Universities</h2>
            </div>
            <p className="text-xs sm:text-[13px] text-[#43474d] font-normal mt-0.5">
              Category-1 UGC-entitled institutions with 0% interest EMI options and proctored examinations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/universities')}
            className="text-[12px] font-semibold text-[#115eaf] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All 50+ Universities
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {FEATURED_UNIS.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#115eaf] transition-all hover:shadow-md p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {u.naac}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{u.rank}</span>
                </div>
                <h3 className="text-base font-bold text-[#000f22]">{u.name}</h3>
                <p className="text-[12px] text-[#115eaf] font-medium mt-0.5">{u.short}</p>

                {/* Short Bulleted Highlights */}
                <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  {u.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${idx === 1 ? 'text-emerald-600' : 'text-[#115eaf]'}`} />
                      <span className={idx === 1 ? 'font-semibold text-emerald-700' : 'text-slate-700'}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-slate-500">Total Program Fee:</span>
                  <span className="font-bold text-slate-900">{u.totalFee}</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/universities/${u.id}`)}
                  className="w-full py-2 rounded-xl bg-[#115eaf] text-white text-[12px] font-semibold hover:bg-[#084a8c] transition-colors cursor-pointer shadow-2xs"
                >
                  View Details &amp; Apply
                </button>
                <button
                  type="button"
                  onClick={onOpenHelpDesk}
                  className="w-full py-1.5 rounded-xl border border-slate-300 text-[12px] font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison matrix */}
      <section id="compare" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 border-b border-slate-200/80 gap-2 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#000f22]">Statutory Equivalence &amp; University Comparison Matrix</h2>
            <p className="text-xs sm:text-[13px] text-[#43474d] font-normal mt-0.5">
              Side-by-side comparison of UGC Category-1 approvals, 0% EMI monthly tuition, and proctored exam methodology.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>0% Interest EMI Verified</span>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#f0f4f8] text-[#000f22] border-b border-slate-200 font-semibold">
                <th className="p-3.5">Comparison Parameter</th>
                <th className="p-3.5 text-[#115eaf]">LPU Online</th>
                <th className="p-3.5 text-[#115eaf]">Amity Online</th>
                <th className="p-3.5 text-[#115eaf]">CU Online</th>
                <th className="p-3.5 text-[#115eaf]">Manipal Jaipur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {COMPARE_ROWS.map((row) => (
                <tr key={row.param} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-medium text-[#111c2d]">{row.param}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`p-3.5 ${cell.tone || 'text-[#43474d] font-medium'}`}>
                      {cell.badge ? (
                        <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-200">
                          {cell.text}
                        </span>
                      ) : cell.tone === 'text-emerald-700 font-semibold' || cell.tone === 'text-emerald-700' ? (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          {cell.text}
                        </span>
                      ) : (
                        cell.text
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Counselling */}
      <section id="counselling" className="bg-[#0b2540] text-white rounded-2xl shadow-md p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[11px] font-semibold">
              <Headphones className="w-3.5 h-3.5 text-blue-300" />
              1-ON-1 EXPERT CAREER ADVICE
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              Confused Between 50+ Universities? Speak with an Unbiased Academic Expert
            </h2>
            <p className="text-sm text-slate-200 font-normal max-w-xl leading-relaxed">
              Our educational counselors evaluate your profile, eligibility, and budget to match you with UGC-entitled programs with 0% interest EMI options. Free service with ₹0 processing charges.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-200 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Zero Processing Fee (₹0 Charges)
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 0% Interest EMI Assistance
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 100% UGC-DEB Entitled Universities
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 15-Minute Callback Guarantee
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-[#111c2d] rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#000f22] mb-1">Request Free Call Back</h3>
            <p className="text-xs text-[#43474d] font-normal mb-4">
              Response guaranteed within 15 minutes during academic working hours.
            </p>
            {!leadSubmitted ? (
              <form
                className="space-y-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLeadSubmitted(true);
                }}
              >
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:border-[#115eaf] focus-within:ring-1 focus-within:ring-[#115eaf]">
                    <span className="bg-slate-100 text-slate-700 px-3 py-2 text-xs font-semibold border-r border-slate-300 flex items-center">
                      +91
                    </span>
                    <input
                      className="w-full px-3 py-2 text-sm outline-none text-slate-900"
                      placeholder="98765 43210"
                      required
                      type="tel"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Your Email Address
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#115eaf] focus:ring-1 focus:ring-[#115eaf] outline-none text-slate-900"
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Target Degree / Program
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#115eaf] focus:ring-1 focus:ring-[#115eaf] outline-none bg-white cursor-pointer text-slate-900"
                    value={lead.degree}
                    onChange={(e) => setLead({ ...lead, degree: e.target.value })}
                  >
                    <option>Online MBA</option>
                    <option>Online MCA</option>
                    <option>Online BBA / BCA</option>
                    <option>Online M.Com / B.Com</option>
                    <option>Executive Program</option>
                  </select>
                </div>

                <button
                  className="w-full py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-[13px] font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
                  type="submit"
                >
                  Connect with Advisor
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-400 font-normal">
                  By submitting, you consent to receive university admission details over WhatsApp/Call.
                </p>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Request Submitted</h3>
                <p className="text-xs text-slate-600">
                  An academic advisor will contact you shortly regarding {lead.degree}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};