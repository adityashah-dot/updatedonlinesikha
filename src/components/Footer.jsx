import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Award,
  GraduationCap,
  ExternalLink,
  Headphones,
  ArrowRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { moreMenu } from "../data/navMore";
import { INSTITUTION_HIGHLIGHTS } from "../data/institutionalData";

export const Footer = ({ setActiveTab, onSelectCourse, onOpenApply }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#000f22] text-[#d8e3fb] border-t border-[#0b2540] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#115eaf]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#2563eb]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Value Proposition & Trust Highlights Strip */}
      <div className="border-b border-[#182a44] bg-[#00142e]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#115eaf]/20 border border-[#115eaf]/40 flex items-center justify-center shrink-0 text-[#70aaff]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">UGC-DEB Entitled</p>
                <p className="text-[11px] text-[#8ea8cf] leading-tight mt-0.5">Government Equivalent</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">100% Unbiased Advisory</p>
                <p className="text-[11px] text-[#8ea8cf] leading-tight mt-0.5">Zero Student Bias</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">NAAC 'A+' Accredited</p>
                <p className="text-[11px] text-[#8ea8cf] leading-tight mt-0.5">Top-Ranked Universities</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">Zero-Cost Assistance</p>
                <p className="text-[11px] text-[#8ea8cf] leading-tight mt-0.5">Free Admission Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation & Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#182a44]">
          {/* Brand Summary Column (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" onClick={scrollToTop} className="inline-block">
              <div className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 shadow-sm border border-slate-200 hover:opacity-95 transition-opacity">
                <img
                  src="/logo.svg"
                  alt="Online Siksha - Higher Education Gateway"
                  className="h-10 w-auto"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-[#9bb7df] max-w-sm leading-relaxed">
              Online Siksha is India’s premier higher education admissions and counseling gateway, facilitating admissions for UGC-DEB recognized, NAAC 'A+' accredited universities across India.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#071930] px-2.5 py-1.5 rounded-lg border border-[#1b3456] text-[#b1c8eb]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ISO 9001:2015 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#071930] px-2.5 py-1.5 rounded-lg border border-[#1b3456] text-[#b1c8eb]">
                <CheckCircle className="w-3.5 h-3.5 text-[#70aaff] shrink-0" />
                UGC-DEB Equivalent
              </span>
            </div>

            {/* Helpline quick-contact banner */}
            <div className="p-3.5 rounded-xl bg-[#071930] border border-[#1b3456] flex items-center justify-between gap-3 mt-2 max-w-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#115eaf]/25 flex items-center justify-center text-[#70aaff]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wider text-[#8ea8cf] font-semibold">Student Helpline</p>
                  <a href="tel:18008894422" className="text-xs sm:text-sm font-bold text-white hover:text-[#70aaff] transition-colors">
                    1800-889-4422 (Toll-Free)
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenApply && onOpenApply()}
                className="px-2.5 py-1.5 rounded-lg bg-[#115eaf] hover:bg-[#1570d1] text-white text-[11px] font-bold transition-all shadow-xs cursor-pointer shrink-0"
              >
                Get Call
              </button>
            </div>
          </div>

          {/* Links Grid (8 cols on desktop) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Column 1: Popular Online Degrees */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#70aaff]" />
                Online Degrees
              </h4>
              <ul className="space-y-2 text-xs text-[#9bb7df]">
                <li>
                  <Link to="/courses/online-mba" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online MBA
                  </Link>
                </li>
                <li>
                  <Link to="/courses/online-mca" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online MCA
                  </Link>
                </li>
                <li>
                  <Link to="/courses/online-bca" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online BCA
                  </Link>
                </li>
                <li>
                  <Link to="/courses/online-bba" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online BBA
                  </Link>
                </li>
                <li>
                  <Link to="/courses/online-msc-in-data-science" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online M.Sc Data Science
                  </Link>
                </li>
                <li>
                  <Link to="/courses/online-bcom" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online B.Com
                  </Link>
                </li>
                <li>
                  <Link to="/courses/online-ma" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Online MA
                  </Link>
                </li>
                <li>
                  <Link to="/courses" onClick={scrollToTop} className="text-[#70aaff] font-semibold hover:underline inline-flex items-center gap-1 pt-1">
                    <span>Explore All Courses</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Top Universities */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#70aaff]" />
                Top Universities
              </h4>
              <ul className="space-y-2 text-xs text-[#9bb7df]">
                <li>
                  <Link to="/colleges/amity-university-online" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Amity University Online
                  </Link>
                </li>
                <li>
                  <Link to="/colleges/chandigarh-university-online" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Chandigarh University (CU)
                  </Link>
                </li>
                <li>
                  <Link to="/colleges/lovely-professional-university-online" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    LPU Online
                  </Link>
                </li>
                <li>
                  <Link to="/colleges/manipal-university-online" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Manipal University Online
                  </Link>
                </li>
                <li>
                  <Link to="/colleges/jain-university-online" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Jain University Online
                  </Link>
                </li>
                <li>
                  <Link to="/colleges/dy-patil-university-online" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    D.Y. Patil Online
                  </Link>
                </li>
                <li>
                  <Link to="/universities" onClick={scrollToTop} className="text-[#70aaff] font-semibold hover:underline inline-flex items-center gap-1 pt-1">
                    <span>View All Universities</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Admissions & Tools */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#70aaff]" />
                Student Tools
              </h4>
              <ul className="space-y-2 text-xs text-[#9bb7df]">
                <li>
                  <Link to="/explore-programs" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    AI Degree Explorer
                  </Link>
                </li>
                <li>
                  <Link to="/universities#compare" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Compare Universities
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenApply && onOpenApply()}
                    className="hover:text-white hover:translate-x-0.5 transition-all text-left cursor-pointer"
                  >
                    Fee Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenApply && onOpenApply()}
                    className="hover:text-white hover:translate-x-0.5 transition-all text-left cursor-pointer"
                  >
                    Scholarship Criteria
                  </button>
                </li>
                <li>
                  <Link to="/exams" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Entrance Exams 2026
                  </Link>
                </li>
                <li>
                  <Link to="/news" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Higher Ed News
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={scrollToTop} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    Career & Admission Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Office */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#70aaff]" />
                Direct Support
              </h4>
              <div className="space-y-3 text-xs text-[#9bb7df]">
                <p className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 mt-0.5 text-[#70aaff] shrink-0" />
                  <a href={`mailto:${INSTITUTION_HIGHLIGHTS.email}`} className="hover:text-white transition-colors [overflow-wrap:anywhere]">
                    {INSTITUTION_HIGHLIGHTS.email}
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 mt-0.5 text-[#70aaff] shrink-0" />
                  <a href="tel:18008894422" className="hover:text-white transition-colors">
                    +91 1800-889-4422
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#70aaff] shrink-0" />
                  <span className="leading-relaxed">{INSTITUTION_HIGHLIGHTS.address}</span>
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenApply && onOpenApply()}
                    className="w-full py-2 px-3 rounded-lg bg-[#071930] hover:bg-[#115eaf] text-[#b1c8eb] hover:text-white border border-[#1b3456] text-[11px] font-semibold transition-all text-center cursor-pointer"
                  >
                    Request Callback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. UGC & Regulatory Disclaimer */}
        <div className="py-5 border-b border-[#182a44] text-[11px] leading-relaxed text-[#768dad]">
          <p>
            <strong className="text-[#a5b8d0]">Regulatory Notice:</strong> Online Siksha is an authorized educational information & admissions facilitation platform. All degrees provided through our partner institutions are entitled by the Distance Education Bureau of the University Grants Commission (UGC-DEB) and recognized at par with on-campus conventional degrees under UGC Gazette Notification Regulation 22.
          </p>
        </div>

        {/* 4. Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#768dad]">
          <div>
            © 2026 Online Siksha. All Rights Reserved. Empowering students with authorized digital degrees.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
            <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" onClick={scrollToTop} className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/ugc-compliance" onClick={scrollToTop} className="hover:text-white transition-colors">
              UGC Compliance
            </Link>
            <Link to="/disclaimer" onClick={scrollToTop} className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
