import React from 'react';
import { Award, Shield, Clock, Heart, UserCheck } from 'lucide-react';

/** Icon key used by a scholarship pillar card. */
export type ScholarshipPillarIcon = 'award' | 'shield' | 'clock' | 'heart' | 'user' | 'star';

/** Colour tone of the pillar's tag chip. */
export type ScholarshipPillarTone = 'amber' | 'blue' | 'green';

/** A single scholarship scheme card (LPU `scholarship-schemes` grid). */
export interface ScholarshipPillar {
  title: string;
  body: string;
  icon?: ScholarshipPillarIcon;
  tag?: string;
  tone?: ScholarshipPillarTone;
  footnote?: string;
}

const PILLAR_ICON: Record<string, React.ReactNode> = {
  award: <Award className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  user: <UserCheck className="w-5 h-5" />,
  star: <Award className="w-5 h-5" />,
};

const PILLAR_ICON_BG: Record<string, string> = {
  award: 'bg-[#FFFBEB] text-[#92400E]',
  shield: 'bg-[#e7eeff] text-[#115eaf]',
  clock: 'bg-[#FFFBEB] text-[#92400E]',
  heart: 'bg-[#f0f3ff] text-[#115eaf]',
  user: 'bg-[#f0f3ff] text-[#115eaf]',
  star: 'bg-[#e7eeff] text-[#115eaf]',
};

const PILLAR_TAG: Record<string, string> = {
  amber: 'bg-[#ffdcc3] text-[#6e3900]',
  blue: 'bg-[#d5e3ff] text-[#004689]',
  green: 'bg-[#e0f2e9] text-[#129b55]',
};

interface ScholarshipPillarsGridProps {
  pillars: ScholarshipPillar[];
  sectionId?: string;
}

/**
 * LPU-style six pillar scholarship schemes grid.
 * Renders nothing when `pillars` is empty so the section (and its TOC entry) is hidden.
 */
export const ScholarshipPillarsGrid: React.FC<ScholarshipPillarsGridProps> = ({
  pillars,
  sectionId = 'scholarship-schemes',
}) => {
  if (!pillars.length) return null;

  return (
    <section id={sectionId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-[100px]">
      {pillars.map((p, idx) => (
        <div
          key={idx}
          className="card bg-white border border-[#e7eeff] rounded-2xl shadow-xs flex flex-col justify-between hover:border-[#115eaf] transition-all"
        >
          <div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                PILLAR_ICON_BG[p.icon || 'award'] || PILLAR_ICON_BG.award
              }`}
            >
              {PILLAR_ICON[p.icon || 'award'] || PILLAR_ICON.award}
            </div>
            {p.tag && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${PILLAR_TAG[p.tone || 'amber']}`}>
                {p.tag}
              </span>
            )}
            <h3 className="section-title font-bold text-base text-[#000f22] font-sans mt-2">{p.title}</h3>
            <p className="text-xs text-[#43474d] leading-relaxed">{p.body}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#e7eeff] text-xs font-bold text-[#115eaf]">
            {p.footnote || 'Subject to Verification'}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ScholarshipPillarsGrid;
