import { useState } from "react";
import { X, Search, Clock, Phone, Mail, User } from "lucide-react";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";

export const TrackApplicationModal = ({ isOpen, onClose }) => {
  const [applicationId, setApplicationId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateLeadFields({
      name,
      phone,
      email,
      requireName: false,
      requireEmail: true
    });
    if (!validation.valid) {
      setErrorMsg(validation.error);
      return;
    }
    submitLead({
      name: name || `Applicant (${applicationId})`,
      email: validation.cleanEmail,
      phone_number: validation.cleanPhone,
      student_comment: applicationId ? [`Application ID: ${applicationId}`] : [],
      form_name: "Track Application Modal Form",
      source: "OS"
    });
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#e7eeff] overflow-hidden max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e7eeff] flex items-center justify-between bg-[#f0f3ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#115eaf] text-white flex items-center justify-center shadow-xs">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#000f22] font-sans">
                Track Application Status
              </h3>
              <p className="text-xs text-[#43474d]">
                Enter your application ID & contact details to check status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[44px] text-[#74777e] hover:text-[#000f22] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!searched ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">
                  Application ID <span className="text-[#e11d48]">*</span>
                </label>
                <input
                  type="text"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                  placeholder="e.g. OS-LPU-2026-0123"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777e]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">
                  Registered Email Address <span className="text-[#e11d48]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777e]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">
                  Registered Mobile Number (+91) <span className="text-[#e11d48]">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#000f22] font-bold text-xs gap-1.5">
                    <Phone className="w-4 h-4 text-[#74777e]" />
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
                    placeholder="10-digit Mobile Number"
                    className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-[#115eaf]/20 focus:border-[#115eaf] outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#115eaf] text-white rounded-xl text-sm font-bold hover:bg-[#084a8c] active:scale-[0.98] transition-all shadow cursor-pointer"
              >
                Track Application
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#d5e3ff] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#000f22]">Application ID</span>
                  <span className="text-xs font-mono text-[#115eaf]">{applicationId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-600">Under Review</span>
                </div>
                <p className="text-xs text-[#43474d]">
                  Your application is being reviewed by the admissions team. Updates will be sent to <strong>{email}</strong> and <strong>+91 {phone}</strong>.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSearched(false)}
                  className="flex-1 py-2.5 min-h-[44px] bg-[#f0f3ff] text-[#115eaf] border border-[#d5e3ff] rounded-xl text-sm font-semibold hover:bg-[#e0ecff] transition-all cursor-pointer"
                >
                  Track Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 min-h-[44px] bg-[#115eaf] text-white rounded-xl text-sm font-semibold hover:bg-[#084a8c] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
