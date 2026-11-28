
import { MapPin, Star, Download, ArrowRight } from "lucide-react";
import { useSiteActions } from "./shell/SiteActionsContext";
import ReadMoreText from "./ReadMoreText";

/**
 * College hero — exact port of the reference hero block
 * (src/components/OverviewView.tsx "HERO SECTION - college-hero layout").
 *
 * Every field is optional: a missing field hides only its own block.
 */
export default function CollegeHero({ overview = {}, college = {}, title, description, fullText = false }) {
  const siteActions = useSiteActions();
  const onOpenApply = siteActions.onOpenApply;
  const onOpenBrochure = siteActions.onOpenBrochure;

  const data = overview || {};
  const hero = data.hero || {};

  const collegeTitle = title || data.title || college.title || college.name || "University";
  const logo = hero.logoImage || college.logo || "";
  const banner = hero.backgroundImage || college.collegeImage || "";

  const badges = [
    data.nirfRanking ? `#${data.nirfRanking} NIRF Rank` : "",
    data.naac || "",
    ...(data.approvals || []).filter((a) => /UGC/i.test(a)).slice(0, 1),
    ...(data.approvals || []).filter((a) => /AICTE/i.test(a)).slice(0, 1),
  ].filter((badge, index, list) => badge && list.indexOf(badge) === index);

  // Only show stats we actually have data for — never render "—" placeholders.
  const stats = [
    { value: data.feeRange, label: "Fee Range", tone: "text-ink-900" },
    { value: data.duration, label: "Duration", tone: "text-brand-600" },
    {
      value: data.collegeMode === "online" ? "Online" : data.collegeMode,
      label: "Mode",
      tone: "text-ink-900",
    },
    {
      value: data.placements?.stats?.placementRate,
      label: "Placement Rate",
      tone: "text-accent-700",
    },
  ].filter((stat) => stat.value && String(stat.value).trim() && String(stat.value).trim() !== "—");

  return (
    <section className="bg-white text-ink-900 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Logo + Title + Badges */}
        <div className="flex flex-row items-start gap-3 sm:gap-5">
          {logo && (
            <img
              src={logo}
              alt={`${collegeTitle} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-line p-1.5 shadow-sm shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <div className="min-w-0">
            <h1 className="section-title font-bold tracking-tight font-sans text-ink-900">
              {collegeTitle}
            </h1>

            {badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-[11px] font-bold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body: copy left, campus image right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4">
          <div className="order-2 lg:order-none lg:col-span-7 space-y-3">
            {(data.location || data.collegeType || data.established || data.rating) && (
              <p className="section-description text-xs sm:text-sm text-ink-700 font-normal flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                {data.location} · {data.collegeType || "University"} · Est.{" "}
                {data.established} ·{" "}
                {data.rating && (
                  <span className="inline-flex items-center gap-0.5 font-bold text-accent-700">
                    <Star className="w-3 h-3 fill-accent-500 text-accent-500" />
                    {data.rating}
                  </span>
                )}
              </p>
            )}

            {(description || hero.description) && (
              <ReadMoreText
                text={description || hero.description}
                lines={4}
                fullText={fullText}
                className="text-sm text-ink-700 leading-relaxed font-normal"
              />
            )}

            {hero.heroSub && (
              <ReadMoreText
                text={hero.heroSub}
                lines={3}
                fullText={fullText}
                className="text-sm text-ink-700 leading-relaxed font-normal"
              />
            )}
          </div>

          {banner && (
            <div className="order-1 lg:order-none lg:col-span-5 lg:mr-[50px]">
              <div className="rounded-2xl overflow-hidden border border-line shadow-xs bg-canvas">
                <img
                  src={banner}
                  alt={`${collegeTitle} Campus`}
                  className="w-full h-48 sm:h-60 lg:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats + Brochure + Apply Now */}
        <div className="flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-brand-50 border border-brand-100 px-4 py-2.5 rounded-xl text-center min-w-[110px]"
            >
              <span
                className={`block text-sm font-bold font-sans ${stat.tone}`}
              >
                {stat.value}
              </span>
              <span className="text-[10px] text-ink-500">{stat.label}</span>
            </div>
          ))}

          <div className="flex items-center gap-3 md:ml-auto">
            <button
              type="button"
              onClick={() => onOpenBrochure()}
              className="px-5 py-2.5 rounded-xl bg-white text-brand-600 border border-brand-600 text-xs sm:text-sm font-bold hover:bg-brand-50 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              Brochure
            </button>
            <button
              type="button"
              onClick={() => onOpenApply()}
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

