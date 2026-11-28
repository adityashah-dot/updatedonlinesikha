import { useState, useId } from "react";
import { COURSES_DATA } from "../data/coursesData";
import { X, Calculator, ArrowRight, ShieldCheck } from "lucide-react";
export const EmiCalculatorModal = ({
  isOpen,
  onClose,
  onApplyWithEmi,
  initialCourseId = "mba"
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [tenure, setTenure] = useState(24);
  const [includeEarlyBird, setIncludeEarlyBird] = useState(true);
  const [downPayment, setDownPayment] = useState(0);
  const programSelectId = useId();
  const earlyBirdCheckboxId = useId();
  const downPaymentInputId = useId();
  if (!isOpen) return null;
  const currentCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[3];
  const rawFee = currentCourse.totalFee;
  const discountedFee = includeEarlyBird ? Math.round(rawFee * 0.8) : rawFee;
  const principalAfterDownPayment = Math.max(0, discountedFee - downPayment);
  const monthlyEmi = Math.round(principalAfterDownPayment / tenure);
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
    className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brand-100 relative"
    onClick={(e) => e.stopPropagation()}
  >
        {
    /* Header */
  }
        <div className="px-6 py-5 border-b border-brand-100 flex items-center justify-between bg-brand-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink-900 font-sans">
                Zero-Cost EMI & Tuition Calculator
              </h3>
              <p className="text-xs text-ink-700">
                Instant monthly financing calculations with 0% interest subvention
              </p>
            </div>
          </div>
          <button
    onClick={onClose}
    className="p-2 min-h-[44px] text-ink-500 hover:text-ink-900 rounded-lg hover:bg-white transition-colors"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Content */
  }
        <div className="p-6 space-y-6">
          {
    /* Select Course */
  }
          <div>
            <label htmlFor={programSelectId} className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Select Degree Program
            </label>
            <select
    id={programSelectId}
    value={selectedCourseId}
    onChange={(e) => setSelectedCourseId(e.target.value)}
    className="w-full px-4 py-3 rounded-xl border border-line-strong text-base sm:text-sm font-semibold text-ink-900 bg-white focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition-all cursor-pointer"
  >
              {COURSES_DATA.map((course) => <option key={course.id} value={course.id}>
                  {course.name} — ₹{course.totalFee.toLocaleString("en-IN")} ({course.duration})
                </option>)}
            </select>
          </div>

          {
    /* Early Bird Grant Toggle */
  }
          <div className="p-4 rounded-xl bg-brand-100/60 border border-brand-300 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
    type="checkbox"
    id={earlyBirdCheckboxId}
    checked={includeEarlyBird}
    onChange={(e) => setIncludeEarlyBird(e.target.checked)}
    className="w-5 h-5 rounded text-brand-600 focus:ring-brand-600 cursor-pointer"
  />
              <label htmlFor={earlyBirdCheckboxId} className="cursor-pointer">
                <span className="text-sm font-bold text-ink-900 block">
                  Apply 20% Early Bird Scholarship Grant
                </span>
                <span className="text-xs text-brand-600 font-medium">
                  Saves ₹{Math.round(rawFee * 0.2).toLocaleString("en-IN")} on overall tuition
                </span>
              </label>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#ffdcc3] text-[#6e3900]">
              Guaranteed
            </span>
          </div>

          {
    /* Tenure Selection */
  }
          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Select Repayment Tenure (Months)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[6, 12, 18, 24].map((t) => <button
    key={t}
    type="button"
    onClick={() => setTenure(t)}
    className={`py-3 px-2 rounded-xl text-center font-bold text-sm transition-all ${tenure === t ? "bg-brand-600 text-white shadow-sm ring-2 ring-brand-600/30" : "bg-brand-50 text-ink-900 hover:bg-brand-100"}`}
  >
                  <span className="block text-base">{t} Mo</span>
                  <span className={`text-[10px] block font-normal ${tenure === t ? "text-blue-100" : "text-ink-500"}`}>
                    {t <= 12 ? "No-cost" : "No Interest"}
                  </span>
                </button>)}
            </div>
          </div>

          {
    /* Down Payment Slider */
  }
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={downPaymentInputId} className="text-xs font-bold text-ink-900 uppercase tracking-wider">
                Optional Down Payment
              </label>
              <span className="text-sm font-bold text-brand-600">
                ₹{downPayment.toLocaleString("en-IN")}
              </span>
            </div>
            <input
    id={downPaymentInputId}
    type="range"
    min={0}
    max={Math.min(5e4, discountedFee / 2)}
    step={2e3}
    value={downPayment}
    onChange={(e) => setDownPayment(Number(e.target.value))}
    className="w-full h-2 max-md:h-3 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
  />
            <div className="flex justify-between text-[11px] text-ink-500 mt-1">
              <span>₹0 (Zero Down Payment)</span>
              <span>₹{Math.min(5e4, Math.round(discountedFee / 2)).toLocaleString("en-IN")}</span>
            </div>
          </div>

          {
    /* Calculation Result Callout Box */
  }
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-900 to-ink-900 text-white space-y-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-brand-300 uppercase tracking-wider font-semibold">
                  Calculated Monthly Installment
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  ₹{monthlyEmi.toLocaleString("en-IN")} <span className="text-sm font-normal text-brand-300">/ month</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  0% Interest Rate
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-brand-200">
              <div>
                <span className="text-ink-500 block">Standard Fee:</span>
                <span className="font-semibold line-through text-ink-500">
                  ₹{rawFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <span className="text-ink-500 block">Net Tuition:</span>
                <span className="font-bold text-white">
                  ₹{discountedFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <span className="text-ink-500 block">Total Interest:</span>
                <span className="font-bold text-emerald-400">
                  ₹0 (Subvented)
                </span>
              </div>
            </div>
          </div>

          {
    /* Trust points */
  }
          <div className="flex items-center gap-2 text-xs text-ink-700 bg-brand-50 p-3 rounded-xl border border-brand-100">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
            <span>
              Partnered with <strong>HDFC, ICICI, LiquiLoans & Propelld</strong> for zero-paperwork paperless digital approvals in under 10 minutes.
            </span>
          </div>
        </div>

        {
    /* Footer Actions */
  }
        <div className="p-6 border-t border-brand-100 bg-canvas flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
    onClick={onClose}
    className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl border border-line-strong text-ink-900 font-semibold text-sm hover:bg-white transition-colors"
  >
            Close
          </button>
          <button
    onClick={() => {
      onApplyWithEmi(selectedCourseId, monthlyEmi, tenure);
      onClose();
    }}
    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
            <span>Proceed with ₹{monthlyEmi.toLocaleString("en-IN")}/mo Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>;
};
