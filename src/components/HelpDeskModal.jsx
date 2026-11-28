import { useState } from "react";
import { X, Phone, Mail, Clock, MapPin, CheckCircle, Headphones, User } from "lucide-react";
import { INSTITUTION_HIGHLIGHTS } from "../data/institutionalData";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";

export const HelpDeskModal = ({ isOpen, onClose }) => {
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
      form_name: "Help Desk Callback Form"
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-brand-100 overflow-hidden max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-100 flex items-center justify-between bg-brand-50">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink-900 font-sans leading-tight">
                Online Siksha Help Desk
              </h3>
              <p className="text-xs sm:text-[13px] text-ink-700 mt-0.5">
                Authorized Admissions & Student Support
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

        <div className="p-6 space-y-5">
          {/* Quick Direct Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a
              href="tel:18008894422"
              className="p-3.5 rounded-xl border border-brand-100 bg-canvas hover:border-brand-600 transition-all flex flex-col items-center text-center group"
            >
              <Phone className="w-5 h-5 text-brand-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-ink-900">Toll-Free Hotline</span>
              <span className="text-[11px] text-brand-600 font-semibold mt-0.5">1800-889-4422</span>
            </a>

            <a
              href="mailto:helpdesk@onlinesiksha.com"
              className="p-3.5 rounded-xl border border-brand-100 bg-canvas hover:border-brand-600 transition-all flex flex-col items-center text-center group"
            >
              <Mail className="w-5 h-5 text-brand-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-ink-900">Direct Email</span>
              <span className="text-[11px] text-brand-600 font-semibold mt-0.5 truncate max-w-[140px]">
                helpdesk@onlinesiksha.com
              </span>
            </a>
          </div>

          {/* Request Callback Form */}
          <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
            <h4 className="font-semibold text-xs sm:text-[13px] text-ink-900 mb-2.5">
              Request Instant Counselor Callback
            </h4>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Your Full Name" placeholder="Your Full Name"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-line-strong bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none text-sm font-medium text-ink-900 placeholder:text-ink-500"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Your Email Address" placeholder="Your Email Address"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-line-strong bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none text-sm font-medium text-ink-900 placeholder:text-ink-500"
                  />
                </div>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-900 font-bold text-xs gap-1.5">
                    <Phone className="w-4 h-4 text-ink-500" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    pattern={INDIAN_PHONE_PATTERN}
                    title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                    value={phone}
                    onChange={(e) => setPhone(sanitizeIndianPhone(e.target.value))}
                    aria-label="Mobile number" placeholder="10-digit Mobile Number"
                    className="w-full pl-16 pr-3 py-2.5 rounded-lg border border-line-strong bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none text-sm font-medium text-ink-900 placeholder:text-ink-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 min-h-[44px] rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-all shadow-xs cursor-pointer"
                >
                  Schedule Callback (Within 15 Mins)
                </button>
              </form>
            ) : (
              <div className="py-3 text-center space-y-1">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="font-bold text-xs text-ink-900 block">Advisor Assigned!</span>
                <p className="text-[11px] text-ink-700">We will call +91 {phone} shortly.</p>
              </div>
            )}
          </div>

          {/* Operational Hours & Center Address */}
          <div className="space-y-2 text-xs text-ink-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Monday to Saturday: 9:00 AM – 7:00 PM IST</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>{INSTITUTION_HIGHLIGHTS.address}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-brand-100 bg-canvas text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 min-h-[44px] rounded-xl border border-line-strong text-xs font-semibold text-ink-900 hover:bg-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
