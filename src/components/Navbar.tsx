import React, { useState } from 'react';
import { TabType } from '../types';
import { LogIn, User, Menu, X, ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenApply: () => void;
  onOpenHelpDesk: () => void;
  onOpenLms: () => void;
  onOpenChat?: () => void;
  onOpenChatWithQuery?: (query: string) => void;
  onOpenLogin?: () => void;
  loggedInUser?: { name: string; email: string } | null;
}

const GLOBAL_LINKS: { tab: TabType; label: string; badge?: string }[] = [
  { tab: 'universities', label: 'Universities' },
  { tab: 'degrees', label: 'Degree Explorer' },
  { tab: 'compare', label: 'Compare Matrix' },
  { tab: 'scholarships', label: 'Scholarships 2026', badge: 'NEW' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApply,
  onOpenHelpDesk,
  onOpenLms,
  onOpenChat,
  onOpenLogin,
  loggedInUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-[#c4c6ce]/40 transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer select-none shrink-0"
        >
          <img
            src="/logo.svg"
            alt="Online Siksha - Higher Education Gateway"
            className="h-11 w-auto sm:h-12"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] shrink-0">
          {GLOBAL_LINKS.map((link) => {
            const isActive =
              activeTab === link.tab ||
              (link.tab === 'universities' && activeTab === 'overview') ||
              (link.tab === 'degrees' && activeTab === 'courses');
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`flex items-center gap-1.5 font-medium transition-colors duration-150 shrink-0 pb-1 border-b-2 ${
                  isActive
                    ? 'text-[#115eaf] border-[#115eaf] font-semibold'
                    : 'text-[#43474d] border-transparent hover:text-[#115eaf]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Ask AI Advisor</span>
              <span className="sm:hidden">AI</span>
            </button>
          )}

          {/* Reduced size Get Free Counselling */}
          <button
            onClick={onOpenHelpDesk}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#115eaf] hover:bg-[#084a8c] text-white text-[11px] font-medium transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
          >
            <span>Get Free Counselling</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Login Button */}
          {loggedInUser ? (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:bg-emerald-100"
              title={`Logged in as ${loggedInUser.email}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span className="truncate max-w-[80px] sm:max-w-[100px]">{loggedInUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 hover:border-[#115eaf] text-[#000f22] hover:text-[#115eaf] hover:bg-[#f0f4f8] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-[#115eaf]" />
              <span>Login</span>
            </button>
          )}

          {/* Dark Mode Toggle (Shifted after Login) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-[#f0f4f8] transition-all cursor-pointer shadow-2xs flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#43474d] hover:bg-[#f0f3ff] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e7eeff] px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto animate-fadeIn">
          {/* Appearance Toggle Row */}
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#f0f4f8] border border-[#c4c6ce]/60">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              Appearance
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-slate-800 shadow-2xs border border-[#c4c6ce]/70 cursor-pointer flex items-center gap-1.5"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1">
            {GLOBAL_LINKS.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-between cursor-pointer ${
                  activeTab === link.tab ? 'bg-[#f0f3ff] text-[#115eaf] font-semibold' : 'text-[#43474d] hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.badge && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                      {link.badge}
                    </span>
                  )}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#e7eeff] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpDesk();
              }}
              className="w-full py-2.5 rounded-lg bg-[#115eaf] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              Get Free Counselling
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin?.();
              }}
              className="w-full py-2.5 rounded-lg border border-[#c4c6ce] text-[#000f22] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50"
            >
              <LogIn className="w-4 h-4 text-[#115eaf]" />
              <span>{loggedInUser ? `Logged in: ${loggedInUser.name}` : 'Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
