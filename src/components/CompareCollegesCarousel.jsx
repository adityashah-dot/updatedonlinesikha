import { useEffect, useRef, useState } from "react";
import { MapPin, X, ChevronRight } from "lucide-react";
const COLLEGES = {
  amity: {
    name: "Amity University Online",
    short: "AMITY",
    logo: "https://images.DegreeFYD.com/colleges/6812/amity_university_online_courses_and_admission_2025_logo.webp",
    accent: "#12417a",
    loc: "Noida, Uttar Pradesh",
    fee: 165e3,
    rank: "QS Asia-Pacific Ranked",
    mode: "100% Online",
    approvals: "UGC-DEB, AICTE, NAAC A+",
    place: "500+ hiring partners"
  },
  cu: {
    name: "Chandigarh University Online",
    short: "CU",
    logo: "https://images.DegreeFYD.com/colleges/9842/chandigarh_university_online_courses_and_admission_2025_logo.webp",
    accent: "#8b1e2d",
    loc: "Mohali, Punjab",
    fee: 135e3,
    rank: "NIRF #19 (Online)",
    mode: "100% Online",
    approvals: "UGC-DEB, NAAC A+",
    place: "300+ recruiters"
  },
  lpu: {
    name: "Lovely Professional University Online",
    short: "LPU",
    logo: "https://images.DegreeFYD.com/colleges/7190/lovely_professional_university_online_course_logo.webp",
    accent: "#e2531f",
    loc: "Phagwara, Punjab",
    fee: 14e4,
    rank: "NIRF #31",
    mode: "100% Online",
    approvals: "UGC-DEB, AICTE, NAAC A++",
    place: "90% placement assistance"
  },
  manipal: {
    name: "Manipal University Jaipur Online",
    short: "MANIPAL",
    accent: "#c2410c",
    loc: "Jaipur, Rajasthan",
    fee: 175e3,
    rank: "NIRF #64",
    mode: "100% Online",
    approvals: "UGC-DEB, NAAC A++ (3.59 CGPA)",
    place: "92% placement rate"
  },
  jain: {
    name: "Jain University Online",
    short: "JAIN",
    accent: "#0b6b5c",
    loc: "Bangalore, Karnataka",
    fee: 15e4,
    rank: "NIRF #68",
    mode: "100% Online",
    approvals: "UGC-DEB, NAAC A++ (3.71 CGPA)",
    place: "Job portal access"
  }
};
const INITIAL_PAIRS = [
  ["amity", "cu"],
  ["lpu", "manipal"],
  ["jain", "amity"]
];
const inr = (v) => "\u20B9" + v.toLocaleString("en-IN");
export const CompareCollegesCarousel = () => {
  const [pairs, setPairs] = useState(INITIAL_PAIRS);
  const [cur, setCur] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const [pickOpen, setPickOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const trackRef = useRef(null);
  const curRef = useRef(0);
  const pausedRef = useRef(false);
  const pairsRef = useRef(pairs);
  pairsRef.current = pairs;
  const anyOpen = compareOpen || pickOpen;
  const go = (i) => {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: reduceMotion ? "auto" : "smooth" });
  };
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (anyOpen || reduceMotion) return;
    const t = window.setInterval(() => {
      if (pausedRef.current) return;
      const next = (curRef.current + 1) % pairsRef.current.length;
      curRef.current = next;
      setCur(next);
      go(next);
    }, 3200);
    return () => window.clearInterval(t);
  }, [anyOpen, reduceMotion, pairs.length]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setCompareOpen(false);
        setPickOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== curRef.current) {
      curRef.current = i;
      setCur(i);
    }
  };
  const openCompare = () => setCompareOpen(true);
  const openPick = () => {
    setSelected([]);
    setError("");
    setPickOpen(true);
  };
  const toggleSelected = (key) => {
    setSelected(
      (prev) => prev.includes(key) ? prev.filter((k) => k !== key) : prev.length >= 2 ? prev : [...prev, key]
    );
    setError("");
  };
  const addPair = () => {
    if (selected.length !== 2) {
      setError("Select exactly two colleges.");
      return;
    }
    const idx = pairs.length;
    setPairs((prev) => [...prev, selected]);
    curRef.current = idx;
    setCur(idx);
    setPickOpen(false);
    setSelected([]);
    requestAnimationFrame(() => requestAnimationFrame(() => go(idx)));
  };
  const renderColumn = (key) => {
    const c = COLLEGES[key];
    const hasLogo = Boolean(c.logo);
    return <div className="min-h-[220px] min-w-0 rounded-xl border border-[#e7eeff] bg-[#f0f3ff] p-4 flex flex-col justify-between">
        <div>
          <span className="inline-flex mb-2 px-2 py-1 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold">
            Selected
          </span>
          <div className="flex gap-4 items-center">
          <div className="w-[115px] h-[85px] shrink-0 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center overflow-hidden">
          {hasLogo && <img
      src={c.logo}
      alt={`${c.name} logo`}
      className="max-w-full max-h-full object-contain p-1.5"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        const fallback = e.currentTarget.nextElementSibling;
        if (fallback) fallback.classList.remove("hidden");
      }}
    />}
          <span
      className={`text-[19px] font-extrabold tracking-wide ${hasLogo ? "hidden" : ""}`}
      style={{ color: c.accent }}
    >
            {c.short}
          </span>
          </div>
          <div className="min-w-0">
            <div className="mb-1.5 text-[19px] font-extrabold leading-tight text-[#000f22]">{c.name}</div>
            <div className="mt-[7.5px] flex items-center gap-1.5 text-sm text-[#43474d]">
              <MapPin className="w-3.5 h-3.5 text-[#115eaf] shrink-0" />
              <span className="min-w-0 break-words">{c.loc}</span>
            </div>
          </div>
          </div>
        </div>
      </div>;
  };
  const [aKey, bKey] = pairs[Math.min(cur, pairs.length - 1)];
  const a = COLLEGES[aKey];
  const b = COLLEGES[bKey];
  const cheaper = a.fee < b.fee ? 0 : b.fee < a.fee ? 1 : -1;
  const rows = [
    { label: "Total Fees", x: inr(a.fee), y: inr(b.fee), win: cheaper },
    { label: "Ranking", x: a.rank, y: b.rank, win: -1 },
    { label: "Mode", x: a.mode, y: b.mode, win: -1 },
    { label: "Approvals", x: a.approvals, y: b.approvals, win: -1 },
    { label: "Location", x: a.loc, y: b.loc, win: -1 },
    { label: "Placement", x: a.place, y: b.place, win: -1 }
  ];
  return <section
    id="compare-colleges-carousel"
    className="page-section card scroll-mt-[130px] rounded-2xl border border-[#e7eeff] bg-white shadow-xs"
  >
      <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
        Compare Colleges with LPU Online
      </h2>
      <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal">
        Choosing an online university can be tough. We&apos;re here to make it simple.
      </p>

        <div className="mt-[18px] w-full rounded-2xl border border-[#e7eeff] bg-white p-4 shadow-sm">
        <div
    ref={trackRef}
    onScroll={onScroll}
    onPointerEnter={() => pausedRef.current = true}
    onPointerLeave={() => pausedRef.current = false}
    onTouchStart={() => pausedRef.current = true}
    onTouchEnd={() => pausedRef.current = false}
    onFocus={() => pausedRef.current = true}
    onBlur={() => pausedRef.current = false}
    tabIndex={0}
    aria-label="College comparison pairs"
    className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none"
  >
          {pairs.map((pair, i) => <div key={`${pair[0]}-${pair[1]}-${i}`} className="flex-none w-full snap-center px-0.5">
              <div className="relative grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] gap-3 items-stretch">
                {renderColumn(pair[0])}
                <div className="hidden items-center justify-center sm:flex">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center bg-[#115eaf] text-white text-sm font-extrabold">
                    VS
                  </span>
                </div>
                {renderColumn(pair[1])}
              </div>
            </div>)}
        </div>

        <button
    type="button"
    onClick={openCompare}
    className="flex items-center justify-center gap-1 mx-auto mt-4 h-11 px-5 rounded-lg bg-[#115eaf] text-white text-sm font-bold hover:bg-[#084a8c] transition-colors cursor-pointer"
  >
          Compare
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1.5 justify-center mt-5">
        {pairs.map((_, i) => <button
    key={i}
    type="button"
    aria-label={`Pair ${i + 1}`}
    onClick={() => {
      curRef.current = i;
      setCur(i);
      go(i);
    }}
    className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
  >
            <span
    className={`block w-[7px] h-[7px] rounded-full transition-colors ${i === cur ? "bg-[#115eaf]" : "bg-[#c4c6ce]"}`}
  />
          </button>)}
      </div>

      <button
    type="button"
    onClick={openPick}
    className="block mx-auto mt-6 px-5 py-2 rounded-md border border-[#115eaf] bg-white text-[#115eaf] text-sm font-medium hover:bg-[#f0f3ff] transition-colors cursor-pointer"
  >
        Compare More
      </button>

      {compareOpen && <div
    className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#0f3a5c]/50"
    onClick={(e) => {
      if (e.target === e.currentTarget) setCompareOpen(false);
    }}
  >
          <div
    role="dialog"
    aria-modal="true"
    aria-label="Side-by-side comparison"
    className="bg-white w-full sm:max-w-[460px] max-h-[88vh] overflow-auto rounded-t-2xl sm:rounded-2xl p-4 sm:p-5"
  >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#000f22]">Side-by-side comparison</h3>
              <button
    type="button"
    aria-label="Close"
    onClick={() => setCompareOpen(false)}
    className="text-[#74777e] hover:text-[#000f22] cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr>
                  <td className="w-[28%]" />
                  <td className="py-2.5 px-1.5 font-semibold text-[13px] text-[#000f22]">{a.name}</td>
                  <td className="py-2.5 px-1.5 font-semibold text-[13px] text-[#000f22]">{b.name}</td>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => <tr key={r.label}>
                    <th className="py-2.5 pr-1.5 text-left align-top font-medium text-[#43474d] border-b border-[#e7eeff]">
                      {r.label}
                    </th>
                    <td
    className={`py-2.5 px-1.5 align-top border-b border-[#e7eeff] ${r.win === 0 ? "text-emerald-700 font-semibold" : "text-[#000f22]"}`}
  >
                      {r.x}
                    </td>
                    <td
    className={`py-2.5 px-1.5 align-top border-b border-[#e7eeff] ${r.win === 1 ? "text-emerald-700 font-semibold" : "text-[#000f22]"}`}
  >
                      {r.y}
                    </td>
                  </tr>)}
              </tbody>
            </table>
            <p className="text-[11px] text-[#74777e] mt-2.5">
              Green marks the lower fee. Fee figures are indicative and subject to university revision.
            </p>
          </div>
        </div>}

      {pickOpen && <div
    className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#0f3a5c]/50"
    onClick={(e) => {
      if (e.target === e.currentTarget) setPickOpen(false);
    }}
  >
          <div
    role="dialog"
    aria-modal="true"
    aria-label="Pick two colleges"
    className="bg-white w-full sm:max-w-[460px] max-h-[88vh] overflow-auto rounded-t-2xl sm:rounded-2xl p-4 sm:p-5"
  >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#000f22]">Pick two colleges</h3>
              <button
    type="button"
    aria-label="Close"
    onClick={() => setPickOpen(false)}
    className="text-[#74777e] hover:text-[#000f22] cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-2">
              {Object.entries(COLLEGES).map(([key, c]) => {
    const on = selected.includes(key);
    return <label
      key={key}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-[13px] cursor-pointer transition-colors ${on ? "border-[#115eaf] bg-[#f0f3ff]" : "border-[#c4c6ce]"}`}
    >
                    <input
      type="checkbox"
      checked={on}
      onChange={() => toggleSelected(key)}
      className="accent-[#115eaf]"
    />
                    <span className="min-w-0">
                      <span className="block font-medium text-[#000f22]">{c.name}</span>
                      <span className="block text-[11px] text-[#43474d]">{c.loc}</span>
                    </span>
                  </label>;
  })}
            </div>

            <p className="text-[12px] text-red-600 min-h-[18px] mt-2">{error}</p>
            <button
    type="button"
    onClick={addPair}
    className="w-full h-[38px] rounded-md bg-[#115eaf] text-white text-sm font-medium hover:bg-[#084a8c] transition-colors cursor-pointer"
  >
              Add comparison
            </button>
          </div>
        </div>}
    </section>;
};
