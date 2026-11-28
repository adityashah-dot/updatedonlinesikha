import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, SlidersHorizontal, MapPin, Star, BadgeCheck, CreditCard, Monitor, Clock, Video, TrendingUp, Download, ChevronDown, HelpCircle, ShieldCheck, ChevronLeft, ChevronRight, List, LayoutGrid, X, Award, Globe, ClipboardCheck, Laptop, Hourglass, BarChart3, Smartphone, Handshake, Building2, Users, Brain, PiggyBank, Briefcase, Fuel, Trophy, Flame, ScrollText, IndianRupee, GraduationCap, BookOpen, } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { getUniversitiesPayload, mapLocationColleges } from '../services/universityApi';
import { getCollegeBlogs } from '../services/collegeApi';
import { BlogsListSection } from './BlogsListSection';
import { TopCollegesByLocation } from './UniversitiesByCity';
import { UniversitiesFaq } from './UniversitiesFaq';
import { AcademicExpertCounselingSection } from './AcademicExpertCounselingSection';
import { LpuCompareSection } from './LpuCompareSection';

const CATEGORY_OPTIONS = [
  { id: 'all', label: 'All Degree Categories', icon: GraduationCap },
  { id: 'management', label: 'Management (MBA, BBA)', icon: Briefcase },
  { id: 'technology', label: 'Technology & IT (MCA, BCA)', icon: Laptop },
  { id: 'commerce', label: 'Commerce & Finance (M.Com, B.Com)', icon: IndianRupee },
  { id: 'arts', label: 'Arts & Humanities (MA, BA)', icon: BookOpen },
];

const LISTING_REQUEST_TIMEOUT_MS = 15000;

const TRENDING = [
    { icon: Flame, label: 'NAAC A++ Only', id: 'naac' },
    { icon: ScrollText, label: 'UGC-DEB 100% Entitled', id: 'ugc' },
    { icon: IndianRupee, label: 'Fees under ₹1 Lakh', id: 'fees' },
    { icon: GraduationCap, label: 'Online MBA Top Picks', id: 'mba' },
    { icon: Briefcase, label: '100% Placement Support', id: 'placement' },
    { icon: CreditCard, label: 'Zero Cost EMI', id: 'emi' },
];
const DEGREE_FILTERS = [
    'Postgraduate (MBA, MCA, M.Com)',
    'Undergraduate (BBA, BCA, BA)',
    'Executive & PG Diploma',
];
const TOOLBAR_QUICK_CHIPS = ['100% Entitled', 'NAAC A++', 'EMI Available', 'UGC-DEB'];
const universityHref = (university) => {
    const slug = university?.slug || '';
    return slug ? `/universities/${slug}` : '';
};

const APPROVAL_FILTERS = [
    { label: 'UGC-DEB Approved', count: 48, checked: true },
    { label: 'NAAC A++ Grade', count: 18, checked: true },
    { label: 'NAAC A+ Grade', count: 24, checked: false },
    { label: 'AICTE Approved', count: 36, checked: true },
    { label: 'NIRF Top 50 Ranked', count: 12, checked: false },
    { label: 'WES / Global Recognized', count: 15, checked: false },
];
const FEE_RANGES = [
    'Under ₹80,000',
    '₹80,000 - ₹1,50,000',
    '₹1,50,000 - ₹2,50,000',
    'Above ₹2,50,000',
];
const EXAM_MODES = ['100% Online Proctored', 'Designated Center Based'];
const PAYMENT_MODES = ['No-Cost Monthly EMI', 'Pay-Per-Semester Plan'];
const DEGREES = [
    {
        level: 'Postgraduate',
        tone: 'blue',
        price: 'From ₹18,500/sem',
        title: 'Online MBA',
        duration: 'Duration: 2 Years (4 Semesters)',
        count: 'Explore 24+ Universities',
        tracks: ['Finance', 'Marketing', 'Business Analytics', 'HR Management'],
    },
    {
        level: 'Postgraduate',
        tone: 'indigo',
        price: 'From ₹22,000/sem',
        title: 'Online MCA',
        duration: 'Duration: 2 Years (4 Semesters)',
        count: 'Explore 18+ Universities',
        tracks: ['AI & Machine Learning', 'Cloud Computing', 'Full Stack', 'Cyber Security'],
    },
    {
        level: 'Undergraduate',
        tone: 'emerald',
        price: 'From ₹14,000/sem',
        title: 'Online BBA',
        duration: 'Duration: 3 Years (6 Semesters)',
        count: 'Explore 20+ Universities',
        tracks: ['Digital Marketing', 'International Business', 'Banking & Finance', 'General Mgmt'],
    },
    {
        level: 'Undergraduate',
        tone: 'emerald',
        price: 'From ₹15,000/sem',
        title: 'Online BCA',
        duration: 'Duration: 3 Years (6 Semesters)',
        count: 'Explore 16+ Universities',
        tracks: ['Data Science', 'Cyber Security', 'Cloud Architecture', 'Web Dev'],
    },
    {
        level: 'Postgraduate',
        tone: 'blue',
        price: 'From ₹12,000/sem',
        title: 'Online M.Com',
        duration: 'Duration: 2 Years (4 Semesters)',
        count: 'Explore 12+ Universities',
        tracks: ['Accounting & Finance', 'FinTech', 'International Trade', 'Taxation'],
    },
    {
        level: 'Postgraduate',
        tone: 'amber',
        price: 'From ₹11,000/sem',
        title: 'Online MA',
        duration: 'Duration: 2 Years (4 Semesters)',
        count: 'Explore 15+ Universities',
        tracks: ['English', 'Economics', 'Journalism & Mass Comm', 'Psychology'],
    },
];
const VERIFICATION = [
    {
        icon: ShieldCheck,
        tone: 'blue',
        title: 'UGC-DEB Entitlement',
        body: 'Verify whether the university is specifically listed on deb.ugc.ac.in for the specific academic year. Both Category-I institutions and universities with NAAC score ≥ 3.26 are eligible.',
    },
    {
        icon: Award,
        tone: 'amber',
        title: 'NAAC Grading Significance',
        body: 'Institutions holding NAAC A++ (CGPA > 3.51) and NAAC A+ (CGPA > 3.26) maintain the highest pedagogical standard, faculty ratio, digital LMS infrastructure, and research citations.',
    },
    {
        icon: Globe,
        tone: 'emerald',
        title: 'WES & Global Acceptance',
        body: 'Degrees evaluated by World Education Services (WES) are recognized across Canada, USA, UK, and European immigration and postgraduate admission systems identically to on-campus credentials.',
    },
];
const toneMap = {
    blue: { badge: 'bg-brand-50', border: 'border-brand-200', text: 'text-brand-600', solid: 'bg-brand-600' },
    indigo: { badge: 'bg-brand-200', border: 'border-[#c7d2fe]', text: 'text-[#3730a3]', solid: 'bg-[#4f46e5]' },
    emerald: { badge: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', solid: 'bg-emerald-600' },
    amber: { badge: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', solid: 'bg-amber-500' },
};
const specIconByLabel = {
    'Exam Mode': Monitor,
    Examination: ClipboardCheck,
    Exams: Laptop,
    'Exam Pattern': Laptop,
    'Degree Duration': Clock,
    'Course Duration': Hourglass,
    'Live Sessions': Video,
    'Live Masterclasses': Video,
    'Highest CTC Record': TrendingUp,
    'Avg Package': BarChart3,
    'LMS Delivery': Smartphone,
    'Hiring Partners': Handshake,
    'Corporate Tie-ups': Building2,
    'Global Alumni': Globe,
    'Career Assistance': Users,
    Mentorship: Brain,
    Scholarships: PiggyBank,
    'Job Fair Access': Briefcase,
    Specialization: Fuel,
    'Alumni Status': Trophy,
};

/* Live blog payloads come mapped from the CMS API. */
function readBlogImage(value) {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
        if (Array.isArray(value)) return readBlogImage(value[0]);
        return value.url || value.src || value.path || '';
    }
    return '';
}

function mapBlogs(blogs) {
    return (blogs || []).map((post) => ({
        image: readBlogImage(post.mainimage?.image || post.mainimage || post.image),
        title: post.title || '',
        excerpt: post.excerpt || post.description || '',
        category: post.category || 'Blog',
        date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN') : '',
        slug: post.urlSlug || post.slug || '',
    }));
}

export const UniversitiesView = ({ onOpenApply, onOpenHelpDesk, onOpenBrochure }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    /* Live data: the component owns the listing request exactly like the
     * server page does in the reference build — page + search drive
     * GET /website/colleges/listing (online + distance merged, 8 per page). */
    const [universities, setUniversities] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [listingRetry, setListingRetry] = useState(0);

    const [view, setView] = useState('list');
    const [sortOpt, setSortOpt] = useState('nirf');
    const [activeTrending, setActiveTrending] = useState(null);
    const [degreeChecked, setDegreeChecked] = useState([true, true, false]);
    const [approvalChecked, setApprovalChecked] = useState(APPROVAL_FILTERS.map((a) => a.checked));
    const [feeRange, setFeeRange] = useState(1);
    const [examChecked, setExamChecked] = useState([true, false]);
    const [paymentChecked, setPaymentChecked] = useState([true, true]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [quickChips, setQuickChips] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);

    /* Live listing fetch (re-runs whenever the page or search changes). */
    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort(new Error('University listing request timed out.'));
        }, LISTING_REQUEST_TIMEOUT_MS);
        setLoading(true);

        getUniversitiesPayload({ page, search, sort: sortOpt, signal: controller.signal })
            .then((payload) => {
                if (cancelled) return;
                setUniversities(payload?.onlineUniversities || []);
                setPagination(payload?.pagination || null);
                setError(payload?.error || '');
                setLoading(false);
            })
            .catch((loadError) => {
                if (cancelled) return;
                setError(loadError?.message || 'The live university listing could not be loaded.');
                setUniversities([]);
                setPagination(null);
                setLoading(false);
            })
            .finally(() => clearTimeout(timeoutId));

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [page, search, sortOpt, listingRetry]);

    /* Keep the search field in sync when the active search changes. */
    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    /* Live blogs, fetched once (same call the listing page makes). */
    useEffect(() => {
        let cancelled = false;
        getCollegeBlogs('', {})
            .then((rows) => {
                if (!cancelled) setBlogs(mapBlogs(rows));
            })
            .catch(() => {
                if (!cancelled) setBlogs([]);
            });
        return () => { cancelled = true; };
    }, []);

    /* Runs the search against the live listing API (GET /website/colleges/listing
     * with `search`) and resets the pagination to the first page. */
    const runSearch = () => {
        const query = searchInput.trim();
        setPage(1);
        setSearch(query);
    };

    const gotoPage = (number) => {
        const totalPages = pagination?.totalPages || 1;
        setPage(Math.min(Math.max(1, number), totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleQuickChip = (chip) => {
        setQuickChips((prev) => prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]);
    };
    const resetFilters = () => {
        setDegreeChecked([true, true, false]);
        setApprovalChecked(APPROVAL_FILTERS.map((a) => a.checked));
        setFeeRange(1);
        setExamChecked([true, false]);
        setPaymentChecked([true, true]);
    };
    const locationColleges = useMemo(() => mapLocationColleges(universities || []), [universities]);
    const totalPages = pagination?.totalPages || 1;
    const paginationNumbers = (() => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const numbers = [1, 2, 3];

        if (page > 3 && page < totalPages) numbers.push(page);
        if (page > 3) numbers.push('...');

        numbers.push(totalPages);

        return numbers;
    })();
    const filterBody = (<>
      <div className="pt-4 divide-y divide-brand-100">
        {/* Degree Level */}
        <div className="pb-5">
          <h2 className="text-xs font-bold text-ink-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Degree Level</span>
            <ChevronDown className="w-4 h-4 text-ink-500"/>
          </h2>
          <div className="space-y-2.5">
            {DEGREE_FILTERS.map((d, i) => (<label key={d} className="flex items-center gap-2.5 cursor-pointer py-1">
                <input type="checkbox" checked={degreeChecked[i]} onChange={() => setDegreeChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))} className="w-4 h-4 rounded text-brand-600 border-line-strong"/>
                <span className="text-[13px] font-normal text-ink-900">{d}</span>
              </label>))}
          </div>
        </div>

        {/* Approvals */}
        <div className="py-5">
          <h2 className="text-xs font-bold text-ink-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Approvals &amp; Accreditations</span>
            <ChevronDown className="w-4 h-4 text-ink-500"/>
          </h2>
          <div className="space-y-2.5">
            {APPROVAL_FILTERS.map((a, i) => (<label key={a.label} className="flex items-center justify-between gap-2 cursor-pointer py-1">
                <span className="flex items-center gap-2.5 min-w-0">
                  <input type="checkbox" checked={approvalChecked[i]} onChange={() => setApprovalChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))} className="w-4 h-4 rounded text-brand-600 border-line-strong shrink-0"/>
                  <span className="text-[13px] font-normal text-ink-900">{a.label}</span>
                </span>
                <span className="text-[11px] font-semibold text-ink-500 bg-brand-50 px-2 py-0.5 rounded-full shrink-0">
                  {a.count}
                </span>
              </label>))}
          </div>
        </div>

        {/* Fee */}
        <div className="py-5">
          <h2 className="text-xs font-bold text-ink-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Total Course Fee</span>
            <ChevronDown className="w-4 h-4 text-ink-500"/>
          </h2>
          <div className="space-y-2">
            {FEE_RANGES.map((f, i) => (<label key={f} className="flex items-center gap-2.5 cursor-pointer py-1">
                <input type="radio" name="fee_filter" checked={feeRange === i} onChange={() => setFeeRange(i)} className="w-4 h-4 text-brand-600 border-line-strong"/>
                <span className="text-[13px] font-normal text-ink-900">{f}</span>
              </label>))}
          </div>
        </div>

        {/* Exam Mode */}
        <div className="py-5">
          <h2 className="text-xs font-bold text-ink-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Examination Mode</span>
            <ChevronDown className="w-4 h-4 text-ink-500"/>
          </h2>
          <div className="space-y-2.5">
            {EXAM_MODES.map((m, i) => (<label key={m} className="flex items-center gap-2.5 cursor-pointer py-1">
                <input type="checkbox" checked={examChecked[i]} onChange={() => setExamChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))} className="w-4 h-4 rounded text-brand-600 border-line-strong"/>
                <span className="text-[13px] font-normal text-ink-900">{m}</span>
              </label>))}
          </div>
        </div>

        {/* Payment */}
        <div className="pt-5">
          <h2 className="text-xs font-bold text-ink-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Payment Flexibility</span>
            <ChevronDown className="w-4 h-4 text-ink-500"/>
          </h2>
          <div className="space-y-2.5">
            {PAYMENT_MODES.map((m, i) => (<label key={m} className="flex items-center gap-2.5 cursor-pointer py-1">
                <input type="checkbox" checked={paymentChecked[i]} onChange={() => setPaymentChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))} className="w-4 h-4 rounded text-brand-600 border-line-strong"/>
                <span className="text-[13px] font-normal text-ink-900">{m}</span>
              </label>))}
          </div>
        </div>
      </div>

      {/* Sidebar promo */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <BadgeCheck className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink-900">Confused about approvals?</h3>
            <p className="text-xs font-normal text-ink-700 mt-1 leading-snug">
              Talk to an unbiased UGC counsellor to verify your degree validity and fee waivers.
            </p>
            <button onClick={onOpenHelpDesk} className="mt-2.5 text-xs font-semibold text-brand-600 hover:underline inline-flex items-center min-h-[44px]">
              <span>Book 1-on-1 Call</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1"/>
            </button>
          </div>
        </div>
      </div>
    </>);
    return (<div className="pb-20 md:pb-8">
      {/* ================= HERO & DISCOVERY SEARCH BAR ================= */}
      <section className="uv-hero relative overflow-hidden border-b border-brand-100 bg-brand-50 pt-3 pb-3.5 sm:pt-6 sm:pb-4 shadow-sm">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-brand-100/80 via-brand-50/40 to-success-50/50 blur-2xl"/>
        <div className="absolute -left-12 top-10 h-36 w-36 rounded-full bg-[#93c5fd]/10 blur-3xl"/>
        <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-[#a7f3d0]/10 blur-3xl"/>

        <div className="uv-search-shell relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Header: Restored Desktop Heading + Mobile Compact Heading */}
          <div className="text-center max-w-3xl mx-auto mb-3 md:mb-6">
            {/* Desktop Accreditation Tag */}
            <div className="hidden md:block mb-2 text-xs font-semibold text-brand-600">
              <span>Accredited by UGC, AICTE &amp; NAAC</span>
              <span className="text-line-strong mx-2 font-normal">|</span>
              <span>Session 2026–27 Open</span>
            </div>

            {/* Desktop Heading (Restored) */}
            <h1 className="hidden md:block text-3xl lg:text-4xl font-bold text-ink-900 tracking-tight leading-tight">
              Explore Top UGC-DEB Approved
              <span className="text-brand-600 block mt-0.5">Online Universities in India</span>
            </h1>
            <p className="hidden md:block text-sm text-ink-700 font-normal leading-relaxed mt-2.5 max-w-2xl mx-auto">
              Compare verified universities, programs, fees,
              <br className="hidden sm:block" /> and admission details — all in one place.
            </p>

            {/* Mobile-Only Heading */}
            <h1 className="md:hidden text-lg sm:text-2xl font-extrabold text-ink-900 tracking-tight leading-snug m-0">
              Top Online Universities in India <span className="text-brand-600">(2026)</span>
            </h1>
            <p className="md:hidden text-xs text-ink-700 mt-1 font-normal leading-relaxed">
              Compare UGC-DEB approved universities, accredited programs &amp; verified fees.
            </p>
          </div>

          {/* Search Console - Sleek & Compact */}
          <div className="uv-search-card bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-brand-200 shadow-sm max-w-5xl mx-auto">
            <div className="uv-search-fields grid grid-cols-1 md:grid-cols-[minmax(0,6fr)_minmax(0,4fr)_150px] gap-2.5">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-brand-600 w-4 h-4"/>
                <input
                  type="search"
                  name="search"
                  aria-label="Search university or degree"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      runSearch();
                    }
                  }}
                  placeholder="Search university or degree (e.g. LPU, Online MCA)..."
                  className="w-full h-10 sm:h-11 pl-9 pr-3 bg-canvas hover:bg-white focus:bg-white rounded-xl border border-line-strong text-ink-900 placeholder:text-ink-500 text-xs sm:text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition-all font-medium"
                />
              </div>

              {/* Custom White Degree Category Dropdown (Never Black) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full h-10 sm:h-11 px-3 bg-canvas hover:bg-white rounded-xl border border-line-strong text-ink-900 text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-all focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    {React.createElement(selectedCategory.icon || GraduationCap, { className: "w-4 h-4 text-brand-600 shrink-0" })}
                    <span className="truncate">{selectedCategory.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-ink-500 shrink-0 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {categoryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-brand-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setCategoryOpen(false);
                            if (cat.id !== 'all') {
                              setSearchInput(cat.id === 'management' ? 'MBA' : cat.id === 'technology' ? 'MCA' : cat.id === 'commerce' ? 'M.Com' : 'MA');
                            }
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-[13px] font-medium flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isSelected ? 'bg-brand-50 text-brand-600 font-bold' : 'text-ink-900 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                            <span>{cat.label}</span>
                          </div>
                          {isSelected && <span className="text-brand-600 text-xs font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={runSearch}
                  className="w-full h-10 sm:h-11 px-4 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>Find Universities</span>
                  <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {/* Trending pills */}
            <div className="uv-trending flex items-center gap-2 pt-2.5 mt-2.5 border-t border-brand-100">
              <span className="text-[10px] text-ink-500 uppercase font-bold tracking-wider whitespace-nowrap shrink-0">
                Trending:
              </span>
              <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto hide-scrollbar">
                {TRENDING.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTrending(activeTrending === t.id ? null : t.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 min-h-[30px] rounded-full text-[10.5px] transition-colors whitespace-nowrap shrink-0 font-medium border cursor-pointer ${
                        activeTrending === t.id
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-white text-ink-900 border-brand-200 hover:bg-brand-50 hover:border-brand-600'
                      }`}
                    >
                      <Icon className="w-3 h-3 shrink-0"/>
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN: FILTERS + LISTING ================= */}
      <main className="uv-listing max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-0 bg-brand-50 rounded-t-[18px] sm:rounded-t-[28px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-brand-200 p-5 shadow-xs sticky top-20 hidden lg:block">
            <div className="flex items-center justify-between pb-4 border-b border-brand-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-600"/>
                <span className="text-sm font-bold text-ink-900">Filters</span>
                <span className="bg-brand-50 text-brand-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  5 Active
                </span>
              </div>
              <button onClick={resetFilters} className="text-brand-600 text-xs hover:underline font-semibold">
                Reset
              </button>
            </div>
            {filterBody}
          </aside>

          {/* RIGHT LISTINGS */}
          <section className="lg:col-span-9 space-y-2.5 sm:space-y-5" id="university-listings-container">
            {/* Toolbar */}
            <div>
            {/* Toolbar - mobile */}
            <div className="md:hidden bg-white border border-line rounded-xl p-2">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setFiltersOpen(true)} aria-label="Open filters" className="shrink-0 h-11 px-3.5 inline-flex items-center gap-2 border border-line rounded-[10px] bg-white text-sm font-medium text-[#14171a] cursor-pointer">
                  <SlidersHorizontal className="w-4 h-4 text-brand-600"/>
                  <span>Filter</span>
                  {quickChips.length > 0 && (<span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-brand-600 text-white text-[11px] flex items-center justify-center">
                      {quickChips.length}
                    </span>)}
                </button>

                <div className="relative flex-1 min-w-0">
                  <select aria-label="Sort by" value={sortOpt} onChange={(e) => setSortOpt(e.target.value)} className="w-full h-11 border border-line rounded-[10px] pl-3 pr-8 bg-white text-[13px] font-medium text-[#14171a] appearance-none cursor-pointer truncate focus:outline-none">
                    <option value="nirf">NIRF Rank</option>
                    <option value="lowestFee">Lowest Fee</option>
                    <option value="highestFee">Highest Fee</option>
                    <option value="highestPackage">Highest CTC</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500 pointer-events-none"/>
                </div>

                <div className="shrink-0 flex border border-line rounded-[10px] overflow-hidden">
                  <button type="button" onClick={() => setView('list')} aria-label="List view" aria-pressed={view === 'list'} className={`w-11 h-11 flex items-center justify-center cursor-pointer ${view === 'list' ? 'bg-brand-600 text-white' : 'bg-white text-ink-500'}`}>
                    <List className="w-4 h-4"/>
                  </button>
                  <button type="button" onClick={() => setView('grid')} aria-label="Grid view" aria-pressed={view === 'grid'} className={`w-11 h-11 flex items-center justify-center cursor-pointer ${view === 'grid' ? 'bg-brand-600 text-white' : 'bg-white text-ink-500'}`}>
                    <LayoutGrid className="w-4 h-4"/>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {TOOLBAR_QUICK_CHIPS.map((chip) => {
            const on = quickChips.includes(chip);
            return (<button key={chip} type="button" onClick={() => toggleQuickChip(chip)} aria-pressed={on} className={`tap-chip flex-none h-8 px-3.5 rounded-2xl border text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${on
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                    : 'bg-white border-line text-[#14171a]'}`}>
                      {chip}
                    </button>);
        })}
              </div>
            </div>

            {/* Toolbar - desktop */}
            <div className="hidden md:block">
            <div className="bg-brand-50 border border-brand-200 rounded-[16px] sm:rounded-[20px] p-2 shadow-sm">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] items-stretch gap-2">
                <div className="h-[50px] rounded-[14px] border border-brand-200 bg-canvas flex items-center justify-center shadow-none">
                  <button onClick={() => setFiltersOpen(true)} className="lg:hidden inline-flex items-center gap-1.5 font-semibold text-[11.5px] text-ink-900">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600"/>
                    <span>Filters</span>
                  </button>
                  <span className="hidden lg:inline-flex items-center gap-1.5 font-semibold text-[11.5px] text-ink-900">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600"/>
                    Filters
                  </span>
                </div>

                <div className="h-[50px] rounded-[14px] border border-brand-200 bg-success-50 flex items-center justify-center px-1.5 text-center shadow-none">
                  <span className="inline-flex items-center justify-center rounded-[9px] border border-[#bfe7d5] bg-success-50 px-2 py-1 text-[11.5px] font-bold text-[#0f766e] tracking-tight leading-none shadow-none">
                    100% Entitled
                  </span>
                </div>

                <div className="h-[50px] rounded-[14px] border border-brand-200 bg-canvas flex items-center gap-1.5 px-1.5 shadow-none overflow-hidden">
                  <div className="flex-1 min-w-0">
                    <select aria-label="Sort by" value={sortOpt} onChange={(e) => setSortOpt(e.target.value)} className="h-full w-full border-0 bg-transparent rounded-[10px] text-ink-900 text-[11px] font-medium focus:outline-none focus:ring-0 cursor-pointer appearance-none px-1 leading-none">
                      <option value="nirf">NIRF Rank</option>
                      <option value="lowestFee">Lowest Fee</option>
                      <option value="highestFee">Highest Fee</option>
                      <option value="highestPackage">Highest CTC</option>
                    </select>
                  </div>

                  <div className="flex items-center border border-brand-200 rounded-[9px] p-0.5 bg-brand-100 shrink-0 shadow-none">
                    <button onClick={() => setView('list')} title="List View" aria-label="Switch to List View" className={`w-11 h-11 rounded-[7px] transition-all duration-150 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1 ${view === 'list'
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-ink-500 bg-transparent hover:bg-white'}`}>
                      <List className="w-3.5 h-3.5"/>
                    </button>
                    <button onClick={() => setView('grid')} title="Grid View" aria-label="Switch to Grid View" className={`w-11 h-11 rounded-[7px] transition-all duration-150 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1 ${view === 'grid'
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-ink-500 bg-transparent hover:bg-white'}`}>
                      <LayoutGrid className="w-3.5 h-3.5"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>

            {/* University cards */}
            {loading ? (<div className="bg-white rounded-2xl border border-brand-200 p-8 text-center">
              <p className="text-sm font-semibold text-ink-900">Loading universities...</p>
              <p className="text-[13px] text-ink-700 font-normal mt-1">
                Fetching the live university list.
              </p>
            </div>) : null}
            {!loading && (!universities || !universities.length) ? (<div className="bg-white rounded-2xl border border-brand-200 p-8 text-center">
              <p className="text-sm font-semibold text-ink-900">
                {error ? 'University list unavailable' : search ? `No universities found for "${search}"` : 'No universities found'}
              </p>
              <p className="text-[13px] text-ink-700 font-normal mt-1">
                {error || (search ? 'Try a different university name, city or keyword.' : 'The live university list is empty right now. Please try again shortly.')}
              </p>
              {error ? (
                <button
                  type="button"
                  onClick={() => setListingRetry((attempt) => attempt + 1)}
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Try again
                </button>
              ) : null}
            </div>) : null}
            {!loading && search && (universities || []).length > 0 && (
            <p className="text-[13px] font-normal text-ink-700">
              {pagination?.total || universities.length} universities matching
              {" "}
              <span className="font-semibold text-ink-900">"{search}"</span>
            </p>
            )}
            <div className={view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300'
            : 'space-y-5'}>
              {(universities || []).map((u) => (<article key={u.id} onClick={() => { const href = universityHref(u); if (href) navigate(href); }} className="bg-white rounded-2xl border border-brand-200 p-2.5 sm:p-4 md:p-5 shadow-xs hover:shadow-xl hover:border-brand-600 transition-all duration-300 relative flex flex-col cursor-pointer">
                  {/* ===== Mobile card ===== */}
                  {!isDesktop && (<div className="flex flex-col">
                    {/* Head: logo + name + location + NIRF Rank on the Right Side */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex gap-2.5 min-w-0 flex-1">
                        <div className="w-[52px] h-[52px] shrink-0 rounded-xl border border-brand-100 bg-white flex items-center justify-center overflow-hidden shadow-2xs">
                          {u.logoImage ? (
                            <img src={u.logoImage} alt={`${u.short} logo`} className="w-full h-full object-contain p-1" onError={(e) => { e.target.style.display = 'none'; }}/>
                          ) : (
                            <span className="text-[12px] font-bold text-brand-600">{u.short}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-bold text-[14.5px] text-ink-900 leading-tight line-clamp-2" title={u.name}>
                            {u.name}
                          </h2>
                          <p className="text-[11px] text-ink-500 mt-1">
                            {u.location} &middot; Est. {u.established}
                          </p>
                        </div>
                      </div>

                      {/* NIRF Rank Badge on the Right Side */}
                      {u.rankNote ? (
                        <div className="shrink-0 pt-0.5">
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold text-amber-900 bg-amber-50 border border-amber-200/90 shadow-2xs whitespace-nowrap">
                            <Trophy className="w-3 h-3 text-amber-600 fill-amber-500 shrink-0" />
                            {u.rankNote}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {/* Accreditations chips */}
                    <div className="flex gap-1.5 overflow-x-auto mt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {u.naac ? (
                        <span className="flex-none flex items-center h-5 px-2 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-bold whitespace-nowrap">
                          {u.naac}
                        </span>
                      ) : null}
                      {(u.approvals || []).map((a) => (
                        <span key={a} className="flex-none flex items-center h-5 px-2 rounded-md bg-brand-50 text-brand-600 border border-brand-200 text-[10px] font-semibold whitespace-nowrap">
                          {a}
                        </span>
                      ))}
                    </div>

                    {/* Fee box */}
                    <div className="bg-canvas border border-brand-100 rounded-xl px-3 py-2 mt-2 flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <span className="block text-[10px] text-ink-500 font-semibold uppercase tracking-wider">Fee Range</span>
                        <span className="text-base font-bold text-ink-900">
                          {u.feeRange || u.feeLabel}
                        </span>
                      </div>
                      {u.emi ? (<span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-0.5">
                        EMI from {u.emi}
                      </span>) : null}
                    </div>

                    {/* Facts */}
                    <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100">
                      {(u.specs || []).slice(0, 3).map((s) => (<div key={s.label} className="min-w-0">
                          <span className="block text-[9.5px] text-ink-500 uppercase tracking-wider truncate">{s.label}</span>
                          <span className={`text-xs font-bold block truncate ${s.highlight ? 'text-emerald-700' : 'text-ink-900'}`}>
                            {s.value}
                          </span>
                        </div>))}
                    </div>

                    {/* Popular tracks */}
                    {(u.tracks || []).length > 0 ? (<div className="flex gap-1.5 mt-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {(u.tracks || []).map((t) => (<span key={t} className="flex-none border border-brand-100 rounded-md px-2 py-0.5 text-[11px] text-ink-900 bg-slate-50/50 whitespace-nowrap">
                        {t}
                      </span>))}
                    </div>) : null}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 mt-2.5">
                      <button type="button" onClick={(e) => {
                    e.stopPropagation();
                    onOpenBrochure();
                }} className="h-8.5 rounded-lg bg-white border border-brand-600 text-brand-600 text-xs font-bold hover:bg-brand-50 transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95">
                        Brochure
                      </button>
                      <button type="button" onClick={(e) => {
                    e.stopPropagation();
                    const href = universityHref(u);
                    if (href) navigate(href);
                }} className="h-8.5 rounded-lg bg-brand-600 border border-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95">
                        View Details
                      </button>
                    </div>
                  </div>)}

                  {/* ===== Desktop card ===== */}
                  {isDesktop && (<div className="flex flex-col flex-1">
                  {/* Top row: identity + fee */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-2.5 border-b border-brand-100">
                    <div className="flex items-start gap-3">
                      <div className="w-[72px] h-[72px] sm:w-14 sm:h-14 rounded-xl bg-brand-50 border border-brand-200 flex flex-col items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        {u.logoImage ? (<img src={u.logoImage} alt={`${u.short} Logo`} className="w-16 h-16 sm:w-12 sm:h-12 object-contain rounded-lg bg-white p-0.5" onError={(e) => {
                        e.target.style.display = 'none';
                    }}/>) : (<>
                            <span className="text-lg font-bold text-brand-600 tracking-tight">
                              {u.short}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-ink-700 -mt-0.5">
                              Online
                            </span>
                          </>)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="text-base sm:text-lg font-bold text-ink-900 leading-snug line-clamp-2" title={u.name}>
                            {u.name}
                          </h2>
                          {(() => {
                            const tone = toneMap[u.highlight?.tone] || toneMap.blue;
                            return (
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0 ${tone.badge} ${tone.text} ${tone.border}`}>
                                <BadgeCheck className="w-3 h-3"/>
                                {u.highlight?.text}
                              </span>
                            );
                          })()}
                        </div>

                        <p className="text-[13px] font-normal text-ink-700 flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 text-ink-500"/>
                            {u.location}
                          </span>
                          {u.established ? (<>
                            <span>•</span>
                            <span>{u.established}</span>
                          </>) : null}
                          
                        </p>

                        <div className={`flex flex-wrap items-center ${u.isLpu || u.id === 'cu-online' ? 'gap-1.5' : 'gap-2'} mt-2`}>
                          {u.naac ? (<span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow-xs shrink-0">
                            <Star className="w-3 h-3 text-amber-600 fill-amber-500"/>
                            {u.naac}
                          </span>) : null}
                          {u.approvals.slice(0, 2).map((a) => (<span key={a} className="px-2.5 py-1 bg-brand-50 text-brand-600 border border-brand-200 rounded-lg text-[11px] font-semibold shrink-0">
                              {a}
                            </span>))}
                        </div>
                      </div>
                    </div>

                    {/* Fee box */}
                    <div className="text-left md:text-right bg-canvas md:bg-transparent p-3 md:p-0 rounded-xl shrink-0 border md:border-0 border-brand-100">
                      <span className="block text-[11px] text-ink-500 font-semibold uppercase">
                        Fee Range
                      </span>
                      <div className="text-xl font-bold text-ink-900">
                        {u.feeRange || u.feeLabel}

                      </div>
                      {u.emi ? (<div className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1 bg-emerald-50 text-emerald-800 rounded-full text-[11px] font-semibold border border-emerald-200/60 shadow-xs">
                        <CreditCard className="w-3 h-3"/>
                        EMI starts {u.emi}
                      </div>) : null}
                    </div>
                  </div>

                    {/* Spec grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 my-0 bg-canvas rounded-xl px-3 border border-brand-100 text-center sm:text-left">
                      {(u.specs || []).filter((s) => s.label.toLowerCase() !== 'established').map((s) => {
                      const Icon = specIconByLabel[s.label] || Monitor;
                    return (<div key={s.label} className="min-w-0">
                          <span className="text-[10px] text-ink-500 font-semibold uppercase block">
                            {s.label}
                          </span>
                          <span className={`text-[13px] font-medium flex items-center justify-center sm:justify-start gap-1 mt-0.5 ${s.highlight ? 'text-emerald-700' : 'text-ink-900'}`}>
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${s.highlight ? 'text-emerald-600' : 'text-brand-600'}`}/>
                            {s.value}
                          </span>
                        </div>);
                })}
                  </div>

                    {/* Tracks + CTAs */}
                    <div className="flex flex-col gap-2 pt-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(u.tracks || []).length > 0 ? (<>
                          <span className="text-[11px] text-ink-500 uppercase font-semibold mr-1">
                            Popular Tracks:
                          </span>
                          {(u.tracks || []).slice(0, 4).map((t) => (<span key={t} onClick={(e) => e.stopPropagation()} className="px-3 py-1 bg-white border border-brand-200 rounded-full text-xs font-medium text-ink-900 hover:border-brand-600 transition-colors cursor-pointer">
                            {t}
                          </span>))}
                          {(u.tracks || []).length > 4 && (<span onClick={(e) => e.stopPropagation()} className="px-3 py-1 bg-brand-50 border border-brand-200 rounded-full text-xs font-semibold text-brand-600 cursor-pointer">
                            +{u.tracks.length - 4} more
                          </span>)}
                        </>) : null}
                      </div>

                    <div className="flex flex-row items-center justify-between gap-2 pt-2 border-t border-canvas mt-1.5 w-full">
                      <div className="flex items-center gap-1.5 text-xs text-ink-700 font-normal">
                        {u.established ? (
                          <>
                            <Clock className="w-3.5 h-3.5 text-ink-500 shrink-0" />
                            <span>Established in {u.established}</span>
                          </>
                        ) : (
                          <span />
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                      <button onClick={(e) => {
                    e.stopPropagation();
                    onOpenBrochure();
                }} className="px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-200 text-ink-900 text-[11px] font-semibold border border-brand-200 transition-colors flex items-center gap-1 min-h-[44px]">
                        <Download className="w-4 h-4"/>
                        <span>Brochure</span>
                      </button>
                      <button onClick={(e) => {
                    e.stopPropagation();
                    onOpenApply();
                }} className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-semibold transition-all shadow-sm active:scale-95 flex items-center gap-1 min-h-[44px]">
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>
                  </div>
                  </div>)}
                </article>))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && <div className="flex items-center justify-between pt-6 border-t border-brand-100">
              <button aria-label="Previous page" onClick={() => gotoPage(Math.max(1, page - 1))} className={`px-2 sm:px-4 py-2 rounded-lg bg-white border border-brand-200 text-ink-700 hover:text-ink-900 text-xs font-medium flex items-center justify-center gap-1 transition-colors min-h-[44px] min-w-[44px] shrink-0 ${page <= 1 ? 'opacity-40 pointer-events-none' : ''}`}>
                <ChevronLeft className="w-4 h-4"/>
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="flex items-center gap-0.5 sm:gap-1 mx-1 sm:mx-2">
                {paginationNumbers.map((number, index) => number === '...' ? (<span key={`gap-${index}`} className="hidden sm:inline px-1 sm:px-2 text-ink-500">...</span>) : (<button key={number} onClick={() => gotoPage(number)} aria-current={number === page ? 'page' : undefined} className={`w-11 h-11 md:w-9 md:h-9 shrink-0 rounded-lg text-xs font-semibold flex items-center justify-center ${number === page
            ? 'bg-brand-600 text-white'
            : 'hover:bg-brand-50 text-ink-900 font-medium'}`}>
                  {number}
                </button>))}
              </div>
              <button aria-label="Next page" onClick={() => gotoPage(page + 1)} className={`px-2 sm:px-4 py-2 rounded-lg bg-white border border-brand-200 text-brand-600 text-xs font-medium flex items-center justify-center gap-1 hover:bg-brand-50 transition-colors min-h-[44px] min-w-[44px] shrink-0 ${page >= totalPages ? 'opacity-40 pointer-events-none' : ''}`}>
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4"/>
              </button>
            </div>}
          </section>
        </div>
      </main>

      {/* ================= LOWER CONTENT SECTIONS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 space-y-8">
        {/* Online universities by city (ported from the reference home page) */}
        <TopCollegesByLocation onOpenBrochure={onOpenHelpDesk} colleges={locationColleges}/>

        <LpuCompareSection
          sectionId="compare-colleges"
          onOpenBrochure={onOpenBrochure}
          onOpenHelpDesk={onOpenHelpDesk}
        />
{/* ================= DEGREES GRID ================= */}
      <section>
        <div className="bg-white rounded-2xl border border-brand-200 p-5 md:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] text-brand-600 uppercase font-bold tracking-wider">
                High-Impact Academic Degrees
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-ink-900 mt-1">
                Explore Top Online Degrees &amp; Specializations
              </h2>
              <p className="text-sm font-normal text-ink-700 mt-1.5">
                Find UGC-DEB entitled programs recognized by corporates and global licensing boards
                across industries.
              </p>
            </div>
            <button onClick={onOpenHelpDesk} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-600 text-xs font-semibold transition-colors self-start md:self-auto">
              <span>Degree Advisory</span>
              <HelpCircle className="w-3.5 h-3.5"/>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEGREES.map((d) => {
            const tone = toneMap[d.tone];
            return (<div key={d.title} className="p-5 rounded-2xl bg-canvas border border-brand-100 hover:shadow-md hover:border-brand-600 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${tone.badge} ${tone.text} ${tone.border}`}>
                        {d.level}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700">{d.price}</span>
                    </div>
                    <h3 className="font-bold text-ink-900">{d.title}</h3>
                    <p className="text-xs text-ink-500 font-normal mt-0.5">{d.duration}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                      {d.tracks.map((t) => (<span key={t} className="px-2 py-0.5 bg-white border border-brand-100 rounded-md text-[11px] text-ink-700">
                          {t}
                        </span>))}
                    </div>
                  </div>
                  <button onClick={() => onOpenApply()} className="w-full py-2 px-3 rounded-xl bg-white hover:bg-brand-600 hover:text-white text-brand-600 text-xs font-semibold border border-brand-200 transition-colors flex items-center justify-center gap-1 shadow-xs">
                    <span>{d.count}</span>
                    <ArrowRight className="w-3 h-3"/>
                  </button>
                </div>);
        })}
          </div>
        </div>
      </section>

      {/* ================= VERIFICATION EXPLAINER ================= */}
      <section>
        <div className="bg-white rounded-2xl border border-brand-200 p-6 md:p-8 shadow-xs">
          <div className="w-full mb-6 pb-4 border-b border-brand-100">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] text-brand-600 uppercase font-bold tracking-wider bg-brand-50 border border-brand-200 mb-2">
              Government Regulatory Framework
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
              How to Verify Online Degree Entitlements
            </h2>
            <p className="text-xs sm:text-sm font-normal text-ink-700 mt-2 leading-relaxed w-full">
              As per the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations, online degrees from entitled higher education institutions have full equivalence with conventional on-campus degrees for govt jobs, higher studies, and global corporate employment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFICATION.map((v) => {
            const tone = toneMap[v.tone];
            const Icon = v.icon;
            return (<div key={v.title} className="p-5 rounded-xl bg-canvas border border-brand-100">
                  <div className={`w-10 h-10 rounded-lg ${tone.badge} ${tone.text} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5"/>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900">{v.title}</h3>
                  <p className="text-[13px] font-normal text-ink-700 mt-1.5 leading-relaxed">
                    {v.body}
                  </p>
                </div>);
        })}
          </div>
        </div>
      </section>

      <AcademicExpertCounselingSection id="university-listing-counselling" />

      {/* ================= BLOGS ================= */}
        <BlogsListSection onOpenHelpDesk={onOpenHelpDesk} className="w-full rounded-2xl border border-brand-100 bg-white p-5 md:p-6 shadow-xs" horizontal autoScroll showDescriptionOnMobile fetchLivePosts />

        {/* Listing-page FAQ — placed last after Blogs just like on the Home page */}
        <UniversitiesFaq onOpenHelpDesk={onOpenHelpDesk} />
      </div>

      {/* ================= MOBILE FULL-SCREEN FILTER OVERLAY ================= */}
      {filtersOpen && (<div className="fixed inset-0 z-[60] bg-white flex flex-col lg:hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100 shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600"/>
              <span className="text-sm font-bold text-ink-900">Filters</span>
              <span className="bg-brand-50 text-brand-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                5 Active
              </span>
            </div>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-700 hover:text-ink-900">
              <X className="w-5 h-5"/>
            </button>
          </div>

          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-2">
            {filterBody}
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-brand-100 p-4 flex items-center gap-3 bg-white">
            <button onClick={resetFilters} className="px-4 py-3 rounded-xl border border-brand-200 text-brand-600 text-sm font-semibold hover:bg-brand-50 transition-colors min-h-[44px]">
              Reset
            </button>
            <button onClick={() => setFiltersOpen(false)} className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all shadow-sm active:scale-95 min-h-[44px]">
              Show Results
            </button>
          </div>
        </div>)}

      {/* Vertical Edge Tab — "Free Apply" */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={() => onOpenApply?.()}
          className="pointer-events-auto hidden h-[200px] w-12 items-center justify-center rounded-l-2xl bg-brand-600 shadow-md transition-colors hover:bg-brand-700 lg:flex cursor-pointer active:scale-95"
          aria-label="Free Apply"
        >
          <span className="block text-white text-sm font-semibold tracking-wide whitespace-nowrap -rotate-90">
            Free Apply
          </span>
        </button>
      </div>

      {/* hide-scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>);
};
