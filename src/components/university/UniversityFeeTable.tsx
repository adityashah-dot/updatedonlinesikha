import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { UniversityCourseItem } from '../../types/university';

interface UniversityFeeTableProps {
  courses: UniversityCourseItem[];
  level: 'UG' | 'PG';
  onSelectCourse: (course: UniversityCourseItem) => void;
  onOpenApply: (courseId?: string) => void;
  registrationFee: string;
  footerNote: string;
  applyLabel: string;
}

const UniversityFeeTable: React.FC<UniversityFeeTableProps> = ({
  courses,
  level,
  onSelectCourse,
  onOpenApply,
  registrationFee,
  footerNote,
  applyLabel,
}) => {
  if (courses.length === 0) return null;

  const isUG = level === 'UG';
  const heading = isUG ? 'Undergraduate (UG) Programs' : 'Postgraduate (PG) Programs';
  const duration = isUG ? 'Standard Duration: 3 Years / 6 Semesters' : 'Standard Duration: 2 Years / 4 Semesters';
  const badgeBg = isUG ? 'bg-[#d3e4ff] text-[#011c37]' : 'bg-[#d5e3ff] text-[#004689]';
  const badgeText = isUG ? 'UG Degrees' : 'PG Degrees';

  return (
    <div className="bg-white rounded-xl border border-[#e7eeff] overflow-hidden flex flex-col justify-between">
      <div>
        <div className="px-5 py-3.5 bg-[#f0f3ff] border-b border-[#e7eeff] flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-[#000f22] font-sans">{heading}</h3>
            <p className="mt-[7.5px] text-xs text-[#43474d] font-normal">{duration}</p>
          </div>
          <span className={`px-2 py-0.5 text-xs font-normal rounded-md ${badgeBg}`}>{badgeText}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e7eeff] text-[#43474d] text-xs font-semibold bg-[#f9f9ff]">
                <th className="py-2.5 px-5">Course Name</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Per Sem Fee</th>
                <th className="py-2.5 px-3">Total Fee</th>
                <th className="py-2.5 px-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7eeff]">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
                  <td className="py-2.5 px-5 font-normal text-[#000f22]">
                    {c.code}
                    <span className="block text-[11px] font-normal text-[#74777e]">{c.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#43474d] font-normal">{c.duration.split(' ')[0]} Years</td>
                  <td className="py-2.5 px-3 font-normal text-[#000f22]">{c.feePerSemester}</td>
                  <td className="py-2.5 px-3 font-normal text-[#115eaf]">{c.totalFee}</td>
                  <td className="py-2.5 px-5 text-right">
                    <button
                      onClick={() => onSelectCourse(c)}
                      className="tap-hit inline-flex items-center text-[#115eaf] font-medium text-xs hover:underline"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3.5 bg-[#f9f9ff] border-t border-[#e7eeff] flex flex-wrap items-center justify-between gap-2 text-xs text-[#43474d] font-normal">
        <span>{registrationFee}</span>
        <button
          onClick={() => onOpenApply(courses[0]?.id)}
          className="text-[#115eaf] font-semibold hover:underline"
        >
          {applyLabel}
        </button>
      </div>
    </div>
  );
};

export default UniversityFeeTable;
