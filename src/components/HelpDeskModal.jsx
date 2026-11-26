import { useState } from "react";
import { X, Phone, Mail, Clock, MapPin, CheckCircle, Headphones, User } from "lucide-react";
import { INSTITUTION_HIGHLIGHTS } from "../data/institutionalData";

export const HelpDeskModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#e7eeff] overflow-hidden max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e7eeff] flex items-center justify-between bg-[#f0f3ff]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#115eaf] text-white flex items-center justify-center shadow-xs shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#000f22] font-sans leading-tight">
                Online Siksha Help Desk
              </h3>
              <p className="text-xs sm:text-[13px] text-[#43474d] mt-0.5">
                Authorized Admissions & Student Support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 min-h-[44px] text-[#74777e] hover:text-[#000f22] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Direct Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a
              href="tel:18008894422"
              className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:border-[#115eaf] transition-all flex flex-col items-center text-center group"
            >
              <Phone className="w-5 h-5 text-[#115eaf] mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-[#000f22]">Toll-Free Hotline</span>
              <span className="text-[11px] text-[#115eaf] font-semibold mt-0.5">1800-889-4422</span>
            </a>

            <a
              href="mailto:helpdesk@onlinesiksha.com"
              className="p-3.5 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] hover:border-[#115eaf] transition-all flex flex-col items-center text-center group"
            >
              <Mail className="w-5 h-5 text-[#115eaf] mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-[#000f22]">Direct Email</span>
              <span className="text-[11px] text-[#115eaf] font-semibold mt-0.5 truncate max-w-[140px]">
                helpdesk@onlinesiksha.com
              </span>
            </a>
          </div>

          {/* Request Callback Form */}
          <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#d5e3ff]">
            <h4 className="font-semibold text-xs sm:text-[13px] text-[#000f22] mb-2.5">
              Request Instant Counselor Callback
            </h4>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777e]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#c4c6ce] bg-white focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none text-sm font-medium text-[#000f22] placeholder:text-[#74777e]"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777e]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit Mobile Number"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#c4c6ce] bg-white focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none text-sm font-medium text-[#000f22] placeholder:text-[#74777e]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 min-h-[44px] rounded-lg bg-[#115eaf] text-white text-sm font-semibold hover:bg-[#004689] transition-all shadow-xs cursor-pointer"
                >
                  Schedule Callback (Within 15 Mins)
                </button>
              </form>
            ) : (
              <div className="py-3 text-center space-y-1">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="font-bold text-xs text-[#000f22] block">Advisor Assigned!</span>
                <p className="text-[11px] text-[#43474d]">We will call +91 {phone} shortly.</p>
              </div>
            )}
          </div>

          {/* Operational Hours & Center Address */}
          <div className="space-y-2 text-xs text-[#43474d]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#115eaf] shrink-0" />
              <span>Monday to Saturday: 9:00 AM – 7:00 PM IST</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#115eaf] shrink-0 mt-0.5" />
              <span>{INSTITUTION_HIGHLIGHTS.address}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#e7eeff] bg-[#f9f9ff] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 min-h-[44px] rounded-xl border border-[#c4c6ce] text-xs font-semibold text-[#000f22] hover:bg-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
