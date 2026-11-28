import { useState } from "react";
import { LogIn, User, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import MoreMenu from "./MoreMenu";
const GLOBAL_LINKS = [
  { tab: "universities", label: "Universities" },
  { tab: "degrees", label: "Degree Explorer" },
  { tab: "compare", label: "Compare" }
];
export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenApply,
  onOpenHelpDesk,
  onOpenLms,
  onOpenChat,
  onOpenLogin,
  loggedInUser,
  onOpenDegreeExplorer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };
  return <header className="sticky top-0 z-40 bg-white transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between gap-4">
        {
    /* Brand */
  }
        <div
    onClick={() => handleNavClick("home")}
    className="flex items-center gap-2.5 group cursor-pointer select-none min-w-0"
  >
          <img
    src="/logo.svg"
    alt="Online Siksha - Higher Education Gateway"
    className="h-11 w-auto max-w-[160px] object-contain object-left sm:h-12 sm:max-w-[176px]"
  />
        </div>

        {
    /* Desktop Navigation Links */
  }
        <nav className="hidden xl:flex items-center gap-6 xl:gap-8 text-[14px] shrink-0 ml-auto">
          {GLOBAL_LINKS.map((link) => {
    const isActive = activeTab === link.tab || link.tab === "universities" && activeTab === "overview" || link.tab === "degrees" && activeTab === "courses";
    return <button
      key={link.tab}
      onClick={() => handleNavClick(link.tab)}
      className={`flex items-center gap-1.5 font-medium transition-colors duration-150 shrink-0 pb-1 border-b-2 ${isActive ? "text-brand-600 border-brand-600 font-semibold" : "text-ink-700 border-transparent hover:text-brand-600"}`}
    >
                {link.label}
                {link.badge && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                    {link.badge}
                  </span>}
              </button>;
  })}
          <MoreMenu />
        </nav>

        {
    /* Action Cluster */
  }
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">


          {
    /* Reduced size Get Free Counselling */
  }
          <button
    onClick={onOpenHelpDesk}
    className="hidden sm:inline-flex items-center justify-center gap-1 min-h-[40px] px-2.5 py-1 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-medium transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
  >
            <span>Get Free Counselling</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {
    /* Login Button */
  }
          {loggedInUser ? <button
    onClick={onOpenLogin}
    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 min-h-[40px] min-w-[40px] rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
    title={`Logged in as ${loggedInUser.email}`}
    aria-label={`Logged in as ${loggedInUser.name}`}
  >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline truncate max-w-[80px] sm:max-w-[100px]">{loggedInUser.name}</span>
            </button> : <button
    onClick={onOpenLogin}
    aria-label="Login"
    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 min-h-[40px] min-w-[40px] rounded-lg border border-slate-300 hover:border-brand-600 text-ink-900 hover:text-brand-600 hover:bg-canvas text-xs font-semibold transition-all cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
  >
              <LogIn className="w-3.5 h-3.5 text-brand-600" />
              <span className="hidden sm:inline">Login</span>
            </button>}

          {
    /* Mobile hamburger */
  }
          <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="xl:hidden p-2 min-h-[40px] min-w-[40px] rounded-lg text-ink-700 hover:bg-brand-50 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
    aria-label="Toggle menu"
    aria-expanded={mobileMenuOpen}
  >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {
    /* Mobile Menu */
  }
      {mobileMenuOpen && <div className="xl:hidden bg-white border-b border-brand-100 px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto animate-fadeIn">
          <div className="space-y-1">
            {GLOBAL_LINKS.map((link) => <button
    key={link.tab}
    onClick={() => handleNavClick(link.tab)}
    className={`w-full text-left min-h-[44px] py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1 ${activeTab === link.tab ? "bg-brand-50 text-brand-600 font-semibold" : "text-ink-700 hover:bg-slate-50"}`}
  >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.badge && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                      {link.badge}
                    </span>}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>)}
          </div>
          <MoreMenu />

          <div className="pt-3 border-t border-brand-100 flex flex-col gap-2">
            <button
    onClick={() => {
      setMobileMenuOpen(false);
      onOpenHelpDesk();
    }}
    className="w-full py-2.5 rounded-lg bg-brand-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
  >
              Get Free Counselling
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
    onClick={() => {
      setMobileMenuOpen(false);
      onOpenLogin?.();
    }}
    className="w-full py-2.5 rounded-lg border border-line-strong text-ink-900 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50"
  >
              <LogIn className="w-4 h-4 text-brand-600" />
              <span>{loggedInUser ? `Logged in: ${loggedInUser.name}` : "Login"}</span>
            </button>
          </div>
        </div>}
    </header>;
};
