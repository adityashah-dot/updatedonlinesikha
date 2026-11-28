import { Link } from "react-router-dom";
import { MapPin, Download, ArrowRight, Trophy, BookOpen, TrendingUp } from "lucide-react";
import { Badge, Button, Card } from "../ui";

const MAX_APPROVALS = 3;

function Logo({ university }) {
  if (university.logoImage) {
    return (
      <img
        src={university.logoImage}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-1.5"
      />
    );
  }
  return <span className="text-sm font-bold text-brand-700">{String(university.short || "").slice(0, 3)}</span>;
}

/**
 * One responsive card for the universities listing (same markup on mobile and desktop).
 * Shows only facts we actually have; missing data is omitted, never faked.
 */
export function UniversityResultCard({ university: u, onOpenBrochure }) {
  const href = u.slug ? `/universities/${u.slug}` : "";
  const otherApprovals = u.approvals.filter((a) => a !== u.naac);
  const visibleApprovals = otherApprovals.slice(0, MAX_APPROVALS);
  const hiddenCount = otherApprovals.length - visibleApprovals.length;
  const meta = [u.location, u.established && `Est. ${u.established}`].filter(Boolean).join(" · ");

  const facts = [
    u.nirfRank && { icon: Trophy, label: "NIRF rank", value: `#${u.nirfRank}` },
    u.coursesCount && { icon: BookOpen, label: "Programmes", value: String(u.coursesCount) },
    u.highestPackageLabel && { icon: TrendingUp, label: "Highest package", value: u.highestPackageLabel },
  ].filter(Boolean);

  return (
    <Card as="article" interactive className="relative p-4 sm:p-5">
      <div className="flex gap-3 sm:gap-4">
        <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-lg border border-line bg-white flex items-center justify-center overflow-hidden">
          <Logo university={u} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-base sm:text-lg font-semibold leading-snug text-ink-900">
                {href ? (
                  <Link to={href} className="hover:text-brand-600 after:absolute after:inset-0 after:rounded-xl">
                    {u.name}
                  </Link>
                ) : (
                  u.name
                )}
              </h3>
              {meta && (
                <p className="mt-0.5 flex items-center gap-1 text-[13px] text-ink-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{meta}</span>
                </p>
              )}
            </div>

            <div className="sm:text-right shrink-0 mt-1 sm:mt-0">
              <p className="text-[11px] uppercase tracking-wide text-ink-500">Fees</p>
              <p className={`font-display font-bold ${u.feeRange ? "text-lg text-ink-900" : "text-sm text-ink-500"}`}>
                {u.feeRange || "On request"}
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {u.collegeMode && (
              <Badge tone={u.collegeMode === "online" ? "success" : "neutral"}>
                {u.collegeMode === "online" ? "Online" : "Distance"}
              </Badge>
            )}
            {u.naac && <Badge tone="warning">{u.naac}</Badge>}
            {visibleApprovals.map((a) => (
              <Badge key={a}>{a}</Badge>
            ))}
            {hiddenCount > 0 && <Badge>+{hiddenCount}</Badge>}
          </div>
        </div>
      </div>

      {facts.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-canvas px-3 py-2.5">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="flex items-center gap-1 text-[11px] text-ink-500">
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </dt>
              <dd className="mt-0.5 truncate text-sm font-semibold text-ink-900">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* relative + z-10 keeps the buttons clickable above the card-wide link overlay */}
      <div className="relative z-10 mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
        <Button variant="secondary" size="sm" onClick={() => onOpenBrochure?.()}>
          <Download aria-hidden="true" /> Brochure
        </Button>
        {href && (
          <Button to={href} size="sm">
            View details <ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export default UniversityResultCard;
