import { useState } from "react";
import { X, PhoneCall, CheckCircle, User, Phone, Mail } from "lucide-react";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";

export const CounselorModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateLeadFields({
      name,
      phone,
      email,
      requireName: true,
      requireEmail: true
    });
    if (!validation.valid) {
      setErrorMsg(validation.error);
      return;
    }
    submitLead({
      name,
      phone_number: validation.cleanPhone,
      email: validation.cleanEmail,
      form_name: "Request Counselor Callback Modal"
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-brand-100 overflow-hidden max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-100 flex items-center justify-between bg-brand-50">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink-900 font-sans leading-tight">
                Request Counselor Callback
              </h3>
              <p className="text-xs sm:text-[13px] text-ink-700 mt-0.5">
                Get expert guidance on courses, fees & admissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 min-h-[44px] text-ink-500 hover:text-ink-900 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-[13px] font-semibold text-ink-900 mb-1.5">
                  Full Name <span className="text-danger-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Enter your full name" placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line-strong text-sm text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-brand-600/15 focus:border-brand-600 outline-none transition-all bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-[13px] font-semibold text-ink-900 mb-1.5">
                  Email Address <span className="text-danger-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="your.email@example.com" placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line-strong text-sm text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-brand-600/15 focus:border-brand-600 outline-none transition-all bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-[13px] font-semibold text-ink-900 mb-1.5">
                  Phone Number (+91) <span className="text-danger-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-900 font-bold text-xs gap-1.5">
                    <Phone className="w-4 h-4 text-ink-500" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern={INDIAN_PHONE_PATTERN}
                    title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                    value={phone}
                    onChange={(e) => setPhone(sanitizeIndianPhone(e.target.value))}
                    aria-label="Mobile number" placeholder="10-digit Mobile Number"
                    className="w-full pl-16 pr-4 py-2.5 rounded-lg border border-line-strong text-sm text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-brand-600/15 focus:border-brand-600 outline-none transition-all bg-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Callback</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-bold text-ink-900">Callback Requested!</h4>
              <p className="text-xs sm:text-sm text-ink-700">
                Our counselor will call you at +91 {phone} within 30 minutes during working hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 min-h-[44px] bg-brand-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-brand-700 transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
