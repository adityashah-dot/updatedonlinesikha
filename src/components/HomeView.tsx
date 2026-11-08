import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHero from './HomeHero';
import ViewAllButton from './ViewAllButton';
import SectionHeader from './SectionHeader';
import UniversityCard from './UniversityCard';
import DegreePrograms from './DegreePrograms';
import {
  Search,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Headphones,
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
  const [lead, setLead] = useState({ phone: '', email: '', degree: 'Online MBA' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('Online MBA (Master of Business)');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget (₹12,000 - ₹50,000)');
  const [selectedMode, setSelectedMode] = useState('100% Home AI Proctored');

  return (
    <div className="w-full space-y-6">
      <HomeHero />
      {/* Degree programs */}
      <section id="degrees" className="section bg-white rounded-2xl border border-slate-200/90 shadow-soft">
        <div className="container">
          <SectionHeader title="Popular Online Degree Programs" href="/universities" sub="UGC Section 22 Entitled degrees with 0% interest EMI tuition and 100% remote proctored exams." />

          <DegreePrograms />
        </div>
      </section>

      {/* Featured universities */}
      <section id="universities" className="section soft rounded-2xl border border-slate-200/90 shadow-soft">
        <div className="container">
          <SectionHeader title="Explore Some Popular Universities" href="/universities" sub="Category-1 UGC-entitled institutions with 0% interest EMI options and proctored examinations." />

          <div className="uni-grid">
            {FEATURED_UNIS.map((u) => (
              <UniversityCard
                key={u.id}
                u={{
                  logo: `/images/${u.id}-logo.png`,
                  name: u.name,
                  city: u.short,
                  approvals: [u.naac],
                  highlights: u.bullets,
                  slug: u.id,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Side-by-side counselling section */}
      <section id="counselling-side" className="section bg-white rounded-2xl border border-slate-200/90 shadow-soft">
        <div className="container split">
          <img src="/images/counselling.jpg" alt="Student speaking with a counsellor" />
          <div>
            <h2>Not sure which university fits you?</h2>
            <ul className="tick-list">
              <li>UGC-DEB approved universities only</li>
              <li>Fees, EMI and placement support compared side by side</li>
              <li>Free one-to-one counselling</li>
            </ul>
            <Link to="/career-counselling" className="btn-view-all btn-solid">Talk to a counsellor</Link>
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section id="compare" className="section bg-white rounded-2xl border border-slate-200/90 shadow-soft">
        <div className="container">
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
        </div>
      </section>

      {/* Counselling */}
      <section id="counselling" className="section bg-[#0b2540] text-white rounded-2xl shadow-soft">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[11px] font-semibold">
              <Headphones className="w-3.5 h-3.5 text-blue-300" />
              1-ON-1 EXPERT CAREER ADVICE
            </div>
            <h2 className="font-bold text-white leading-snug">
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

          <div className="lg:col-span-5 bg-white text-[#111c2d] rounded-xl p-5 sm:p-6 shadow-soft">
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
                  className="w-full py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-[13px] font-bold transition-all shadow-soft flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
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
        </div>
      </section>
    </div>
  );
};