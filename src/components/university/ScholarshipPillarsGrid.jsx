import { Award, Shield, Clock, Heart, UserCheck } from "lucide-react";
const PILLAR_ICON = {
  award: <Award className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  user: <UserCheck className="w-5 h-5" />,
  star: <Award className="w-5 h-5" />
};
const PILLAR_ICON_BG = {
  award: "bg-accent-50 text-[#92400E]",
  shield: "bg-brand-100 text-brand-600",
  clock: "bg-accent-50 text-[#92400E]",
  heart: "bg-brand-50 text-brand-600",
  user: "bg-brand-50 text-brand-600",
  star: "bg-brand-100 text-brand-600"
};
const PILLAR_TAG = {
  amber: "bg-[#ffdcc3] text-[#6e3900]",
  blue: "bg-brand-200 text-brand-700",
  green: "bg-success-50 text-[#129b55]"
};
export const ScholarshipPillarsGrid = ({
  pillars,
  sectionId = "scholarship-schemes"
}) => {
  if (!pillars.length) return null;
  return <section id={sectionId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-[100px]">
      {pillars.map((p, idx) => <div
    key={idx}
    className="card bg-white border border-brand-100 rounded-2xl shadow-xs flex flex-col justify-between hover:border-brand-600 transition-all"
  >
          <div>
            <div
    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${PILLAR_ICON_BG[p.icon || "award"] || PILLAR_ICON_BG.award}`}
  >
              {PILLAR_ICON[p.icon || "award"] || PILLAR_ICON.award}
            </div>
            {p.tag && <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${PILLAR_TAG[p.tone || "amber"]}`}>
                {p.tag}
              </span>}
            <h3 className="section-title font-bold text-base text-ink-900 font-sans mt-2">{p.title}</h3>
            <p className="text-xs text-ink-700 leading-relaxed">{p.body}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-brand-100 text-xs font-bold text-brand-600">
            {p.footnote || "Subject to Verification"}
          </div>
        </div>)}
    </section>;
};
export default ScholarshipPillarsGrid;
