import React from 'react';
import { Video, BookOpen, Smartphone, Users, CheckCircle, Download } from 'lucide-react';
import type { UniversityLmsPlatformIcon, UniversityLmsPlatformItem } from '../../types/university';

const PLATFORM_ICON: Record<UniversityLmsPlatformIcon, React.ReactNode> = {
  video: <Video className="w-4 h-4" />,
  book: <BookOpen className="w-4 h-4" />,
  smartphone: <Smartphone className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
};

const PLATFORM_META_ICON: Record<UniversityLmsPlatformIcon, React.ReactNode> = {
  video: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />,
  book: <Download className="w-3.5 h-3.5" />,
  smartphone: <Smartphone className="w-3.5 h-3.5" />,
  users: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />,
};

interface LmsPlatformSectionProps {
  /** Heading, e.g. "How You Study: The Amity Amigo Learning Platform". */
  title: string;
  items: UniversityLmsPlatformItem[];
}

/**
 * "How You Study" platform list — mirrors LPU's `learning-platform` section:
 * a border-topped list where every row is an icon, a title, a description and
 * a trailing meta tag.
 */
export const LmsPlatformSection: React.FC<LmsPlatformSectionProps> = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section
      id="learning-platform"
      className="content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-[100px]"
    >
      <div className="mb-[18px]">
        <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] tracking-tight font-sans">
          {title}
        </h2>
      </div>

      <ul className="border-t border-[#e7eeff]">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="group grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-4 sm:gap-x-6 gap-y-2 py-5 sm:py-6 border-b border-[#e7eeff]"
          >
            {/* Icon + Index */}
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-[#eef4ff] text-[#115eaf] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#115eaf] group-hover:text-white">
                {PLATFORM_ICON[item.icon] || PLATFORM_ICON.video}
              </span>
              <span className="text-[10px] font-normal text-[#c4c6ce] tabular-nums sm:hidden mt-2.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title + Description */}
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-[#000f22] font-sans">
                {item.title}
              </h3>
              <p className="text-xs text-[#43474d] mt-[7.5px] leading-relaxed font-normal max-w-2xl">
                {item.desc}
              </p>
            </div>

            {/* Meta Tag */}
            <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:self-center flex items-center gap-2 text-xs font-medium text-[#115eaf] whitespace-nowrap">
              <span>{item.meta}</span>
              <span className="text-[#115eaf]">{PLATFORM_META_ICON[item.icon] || PLATFORM_META_ICON.video}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LmsPlatformSection;
