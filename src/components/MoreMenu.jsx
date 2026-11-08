"use client";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { moreMenu } from "../data/navMore";

export default function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = moreMenu.some((m) => pathname.startsWith(m.href));

  return (
    <div ref={ref} className="more-wrap">
      <button
        type="button"
        className={`more-btn ${open || isActive ? "active" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        More
        <ChevronDown size={16} className={`more-chev ${open ? "flip" : ""}`} />
      </button>

      {open && (
        <ul className="more-panel" role="menu">
          {moreMenu.map(({ label, href, icon: Icon }) => (
            <li key={href} role="none">
              <Link to={href} role="menuitem" className={pathname.startsWith(href) ? "current" : ""}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
