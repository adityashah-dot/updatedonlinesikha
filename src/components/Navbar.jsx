import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, User, Menu, ArrowRight, ChevronRight } from "lucide-react";
import MoreMenu from "./MoreMenu";
import { moreMenu } from "../data/navMore";
import { Button, Sheet } from "./ui";

const GLOBAL_LINKS = [
  { tab: "universities", label: "Universities" },
  { tab: "degrees", label: "Degree Explorer" },
  { tab: "compare", label: "Compare" },
];

export const Navbar = ({ activeTab, setActiveTab, onOpenHelpDesk, onOpenLogin, loggedInUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the drawer whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (tab) =>
    activeTab === tab || (tab === "universities" && activeTab === "overview") || (tab === "degrees" && activeTab === "courses");

  const go = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-3 px-4 md:px-8">
        <Link to="/" onClick={() => setActiveTab("home")} className="min-w-0 shrink" aria-label="Online Siksha home">
          <img src="/logo.svg" alt="Online Siksha" className="h-10 w-auto max-w-[140px] object-contain object-left sm:h-12 sm:max-w-[176px]" />
        </Link>

        {/* Desktop navigation (lg and up) */}
        <nav aria-label="Main" className="ml-auto hidden shrink-0 items-center gap-7 text-[14px] lg:flex">
          {GLOBAL_LINKS.map((link) => (
            <button
              key={link.tab}
              type="button"
              onClick={() => go(link.tab)}
              aria-current={isActive(link.tab) ? "page" : undefined}
              className={`border-b-2 pb-1 font-medium transition-colors ${
                isActive(link.tab) ? "border-brand-600 font-semibold text-brand-600" : "border-transparent text-ink-700 hover:text-brand-600"
              }`}
            >
              {link.label}
            </button>
          ))}
          <MoreMenu />
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" onClick={onOpenHelpDesk} className="px-3">
            <span className="sm:hidden">Free counselling</span>
            <span className="hidden sm:inline">Get free counselling</span>
            <ArrowRight className="hidden sm:block" aria-hidden="true" />
          </Button>

          <button
            type="button"
            onClick={onOpenLogin}
            aria-label={loggedInUser ? `Logged in as ${loggedInUser.name}` : "Log in"}
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-sm font-medium text-ink-900 transition-colors hover:border-brand-600 hover:text-brand-600 sm:inline-flex"
          >
            {loggedInUser ? <User className="h-4 w-4" aria-hidden="true" /> : <LogIn className="h-4 w-4" aria-hidden="true" />}
            <span className="max-w-[100px] truncate">{loggedInUser ? loggedInUser.name : "Log in"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-canvas lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" side="right">
        <nav aria-label="Mobile" className="-mx-2">
          {GLOBAL_LINKS.map((link) => (
            <button
              key={link.tab}
              type="button"
              onClick={() => go(link.tab)}
              aria-current={isActive(link.tab) ? "page" : undefined}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-medium ${
                isActive(link.tab) ? "bg-brand-50 text-brand-700" : "text-ink-900 hover:bg-canvas"
              }`}
            >
              {link.label}
              <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden="true" />
            </button>
          ))}
          <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-ink-400">Resources</p>
          {moreMenu.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] ${
                pathname.startsWith(href) ? "bg-brand-50 font-medium text-brand-700" : "text-ink-700 hover:bg-canvas"
              }`}
            >
              <Icon className="h-4 w-4 text-ink-400" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 space-y-2 border-t border-line pt-5">
          <Button block onClick={() => { setMenuOpen(false); onOpenHelpDesk?.(); }}>
            Get free counselling
          </Button>
          <Button block variant="secondary" onClick={() => { setMenuOpen(false); onOpenLogin?.(); }}>
            {loggedInUser ? <User aria-hidden="true" /> : <LogIn aria-hidden="true" />}
            {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Log in"}
          </Button>
        </div>
      </Sheet>
    </header>
  );
};
