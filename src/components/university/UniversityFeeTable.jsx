import { ArrowRight } from "lucide-react";
const UniversityFeeTable = ({
  courses,
  level,
  onSelectCourse,
  onOpenApply,
  registrationFee,
  footerNote,
  applyLabel
}) => {
  if (courses.length === 0) return null;
  const isUG = level === "UG";
  const heading = isUG ? "Undergraduate (UG) Programs" : "Postgraduate (PG) Programs";
  const duration = isUG ? "Standard Duration: 3 Years / 6 Semesters" : "Standard Duration: 2 Years / 4 Semesters";
  const badgeBg = isUG ? "bg-brand-200 text-brand-900" : "bg-brand-200 text-brand-700";
  const badgeText = isUG ? "UG Degrees" : "PG Degrees";
  return <div className="bg-white rounded-xl border border-brand-100 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="px-5 py-3.5 bg-brand-50 border-b border-brand-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-ink-900 font-sans">{heading}</h3>
            <p className="mt-[7.5px] text-xs text-ink-700 font-normal">{duration}</p>
          </div>
          <span className={`px-2 py-0.5 text-xs font-normal rounded-md ${badgeBg}`}>{badgeText}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-brand-600 text-white">
                <th className="py-3 px-4 font-bold">Course Name</th>
                <th className="py-3 px-4 font-bold">Duration</th>
                <th className="py-3 px-4 font-bold">Per Sem Fee</th>
                <th className="py-3 px-4 font-bold">Total Fee</th>
                <th className="py-3 px-4 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {courses.map((c) => <tr key={c.id} className="bg-white hover:bg-brand-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-ink-900">
                    {c.code}
                    <span className="block text-[11px] font-normal text-ink-500">{c.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-ink-700 font-normal">{c.duration.split(" ")[0]} Years</td>
                  <td className="py-3.5 px-4 font-normal text-ink-900">{c.feePerSemester}</td>
                  <td className="py-3.5 px-4 font-normal text-brand-600">{c.totalFee}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
    onClick={() => onSelectCourse(c)}
    className="tap-hit inline-flex items-center text-brand-600 font-medium text-xs hover:underline"
  >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3.5 bg-canvas border-t border-brand-100 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-700 font-normal">
        <span>{registrationFee}</span>
        <button
    onClick={() => onOpenApply(courses[0]?.id)}
    className="text-brand-600 font-semibold hover:underline"
  >
          {applyLabel}
        </button>
      </div>
    </div>;
};
export default UniversityFeeTable;
