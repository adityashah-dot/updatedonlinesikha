import { useState } from "react";
import { PhoneCall, ShieldCheck, CheckCircle2, User, Phone, BookOpen, Mail } from "lucide-react";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../../services/leadApi";

export const UniversityCounsellingCard = ({ university }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: university.courses[0]?.name || "Online MBA"
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateLeadFields({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      requireName: true,
      requireEmail: true
    });
    if (!validation.valid) {
      setErrorMsg(validation.error);
      return;
    }
    submitLead({
      name: formData.name,
      phone_number: validation.cleanPhone,
      email: validation.cleanEmail,
      preferred_degree: formData.course ? [formData.course] : [],
      preferred_college: university?.name || university?.shortName || "",
      form_name: "Counselling Form in Priority College Page"
    });
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Free & Impartial Guidance</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">
          Speak with a {university.shortName} Admission Expert
        </h3>
        <p className="text-xs text-slate-600">
          Get program fee breakdowns, scholarship eligibility checks, and application help within 15 minutes.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-emerald-900">Request Received!</h4>
          <p className="text-xs text-emerald-700">
            An advisor specializing in {university.shortName} will call you shortly on +91 {formData.phone}.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-emerald-800 underline font-medium mt-1"
          >
            Submit another query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-label="e.g., Rohit Sharma" placeholder="e.g., Rohit Sharma"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-label="rohit.sharma@example.com" placeholder="rohit.sharma@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Mobile Number (+91) *
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-slate-700 pointer-events-none">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                required
                maxLength={10}
                pattern={INDIAN_PHONE_PATTERN}
                title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: sanitizeIndianPhone(e.target.value) })}
                aria-label="Mobile number" placeholder="10-digit mobile number"
                className="w-full pl-14 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Interested Program
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select aria-label="Interested Program"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-900"
              >
                {university.courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Request a callback</span>
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-tight">
            We respect your privacy. No spam or marketing calls.
          </p>
        </form>
      )}
    </div>
  );
};
