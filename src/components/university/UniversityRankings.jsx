import { ShieldCheck } from "lucide-react";
export const UniversityRankings = ({ university }) => {
  return <section id="accreditations" className="scroll-mt-32 space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          Government Recognitions & Accreditations
        </h2>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
          {university.rankingsAndAccreditations.intro}
        </p>
      </div>

      <div className="bg-white border border-[#dfe9ff] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-[#0b2540] text-white font-bold">
              <th className="py-3 px-4 font-bold w-1/3">Statutory Council / Ranking Body</th>
              <th className="py-3 px-4 font-bold">Recognition Status & Equivalence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7eeff] text-[#43474d]">
            {university.rankingsAndAccreditations.table.map((row, idx) => <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 align-top">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{row.authority}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 sm:px-6 align-top">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded text-xs inline-block mb-1">
                    {row.status}
                  </span>
                  {row.description && <p className="text-xs text-slate-600 mt-1 leading-normal">
                      {row.description}
                    </p>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </section>;
};
