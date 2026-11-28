import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Card, Chip, SectionHeader, Skeleton, Button } from "../ui";
import { compactRupees } from "../../services/universityApi";

const LEVELS = [
  ["PG", "Master's"],
  ["UG", "Bachelor's"],
  ["EX", "Executive"],
];

/** Normalises fee strings like "₹74,000 – 1.8 Lakh" or "₹50,000 - ₹2,50,000" to "₹74K – ₹1.8L". */
function formatFee(text) {
  const str = String(text || "");
  // In "₹2.0 – 3.5 Lakh" the unit only follows the last number, so small bare numbers inherit it.
  const lakhRange = /lakh|lac/i.test(str);
  const values = [...str.matchAll(/(\d[\d,]*(?:\.\d+)?)\s*(lakh|lac|l\b|k\b)?/gi)]
    .map(([, num, unit]) => {
      const n = Number(num.replace(/,/g, ""));
      if (!unit) return lakhRange && n < 100 ? n * 100000 : n;
      return /^k/i.test(unit) ? n * 1000 : n * 100000;
    })
    .filter((n) => Number.isFinite(n) && n >= 1000);
  if (!values.length) return str || "On request";
  const parts = [...new Set([Math.min(...values), Math.max(...values)])].map(compactRupees);
  return parts.join(" – ");
}

/**
 * "Find by programme" grid. One markup for all screen sizes:
 * 2 columns on phones, 3 on tablets, 4 on desktop.
 */
export function ProgrammeTiles({ programs, level, onLevelChange, feesLoading }) {
  const visible = programs.filter((p) => p.lv.includes(level));

  return (
    <section aria-labelledby="programmes-heading">
      <SectionHeader
        id="programmes-heading"
        title="Find your programme"
        description="UGC-entitled online degrees, valid on par with regular campus degrees."
        action={<Button to="/courses" variant="ghost" size="sm" className="-ml-3 sm:ml-0">All programmes <ArrowUpRight aria-hidden="true" /></Button>}
      />

      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Programme level">
        {LEVELS.map(([key, label]) => (
          <Chip key={key} selected={level === key} onClick={() => onLevelChange(key)}>
            {label}
          </Chip>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-6 text-sm text-ink-500">No programmes listed at this level yet.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.n}>
              <Card as={Link} to={p.slug ? `/courses/${p.slug}` : "/courses"} interactive className="group flex h-full flex-col p-4">
                <span className="text-xs text-ink-500">{p.y}</span>
                <h3 className="mt-1 font-display text-[15px] sm:text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                  {p.n.replace(/^Online /, "")}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink-500">{p.f}</p>
                <div className="mt-auto pt-3">
                  <span className="block text-[11px] uppercase tracking-wide text-ink-500">Total fee</span>
                  {feesLoading ? (
                    <Skeleton className="mt-1 h-4 w-24" />
                  ) : (
                    <span className="block text-sm font-semibold text-ink-900">{formatFee(p.totalFee)}</span>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProgrammeTiles;
