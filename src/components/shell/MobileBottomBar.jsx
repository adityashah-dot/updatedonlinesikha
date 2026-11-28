import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Building2, Columns3, MessageCircle, Phone, Bot, PhoneCall, ChevronRight } from "lucide-react";
import { Sheet } from "../ui";

const HELPLINE = { display: "1800-889-4422", tel: "+9118008894422" };

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/universities", label: "Universities", icon: Building2 },
  { to: "/compare", label: "Compare", icon: Columns3 },
];

const tabClass = (active) =>
  `flex flex-1 flex-col items-center justify-center gap-0.5 h-14 text-[11px] font-medium transition-colors ${
    active ? "text-brand-600" : "text-ink-500 hover:text-ink-900"
  }`;

/**
 * Phone-only bottom navigation. Replaces the stacked floating call/chat buttons with one
 * thumb-reachable bar; "Talk to us" opens a sheet with every way to reach an advisor.
 */
export function MobileBottomBar({ onOpenChat, onOpenCallback }) {
  const [helpOpen, setHelpOpen] = useState(false);

  const helpOptions = [
    { icon: Phone, title: "Call us", detail: `${HELPLINE.display} · Mon–Sat, 9am–7pm`, href: `tel:${HELPLINE.tel}` },
    { icon: PhoneCall, title: "Request a callback", detail: "An advisor will call you back", onClick: onOpenCallback },
    { icon: Bot, title: "Ask the assistant", detail: "Quick answers about fees, approvals and admissions", onClick: onOpenChat },
  ];

  return (
    <>
      <nav
        aria-label="Primary"
        className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex">
          {TABS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => tabClass(isActive)}>
              {({ isActive }) => (
                <>
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
          <button type="button" onClick={() => setHelpOpen(true)} className={tabClass(helpOpen)} aria-haspopup="dialog">
            <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            <span>Talk to us</span>
          </button>
        </div>
      </nav>

      <Sheet open={helpOpen} onClose={() => setHelpOpen(false)} title="Talk to an advisor">
        <p className="mb-3 text-sm text-ink-500">Free guidance on programmes, fees and admissions. No obligation to apply.</p>
        <ul className="divide-y divide-line rounded-xl border border-line">
          {helpOptions.map(({ icon: Icon, title, detail, href, onClick }) => {
            const content = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-ink-900">{title}</span>
                  <span className="block text-[13px] text-ink-500">{detail}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden="true" />
              </>
            );
            const cls = "flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-canvas";
            return (
              <li key={title}>
                {href ? (
                  <a href={href} className={cls} onClick={() => setHelpOpen(false)}>{content}</a>
                ) : (
                  <button
                    type="button"
                    className={cls}
                    onClick={() => {
                      setHelpOpen(false);
                      onClick?.();
                    }}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Sheet>
    </>
  );
}

export default MobileBottomBar;
