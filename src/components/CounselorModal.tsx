import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle } from 'lucide-react';
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from '../services/leadApi';

interface CounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounselorModal: React.FC<CounselorModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
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
      form_name: 'Request Counselor Callback Modal'
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#e7eeff] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e7eeff] flex items-center justify-between bg-[#f0f3ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#000f22] font-sans">
                Request Counselor Callback
              </h3>
              <p className="text-xs text-[#43474d]">
                Get expert guidance on courses, fees & admissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#74777e] hover:text-[#000f22] rounded-lg hover:bg-white transition-colors"
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
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">Phone Number (+91) *</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-[#000f22]">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern={INDIAN_PHONE_PATTERN}
                    title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                    value={phone}
                    onChange={(e) => setPhone(sanitizeIndianPhone(e.target.value))}
                    placeholder="10-digit Mobile Number"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 active:scale-[0.98] transition-all shadow"
              >
                Request Callback
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-bold text-[#000f22]">Callback Requested!</h4>
              <p className="text-sm text-[#43474d]">
                Our counselor will call you at +91 {phone} within 30 minutes during working hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#115eaf] text-white rounded-xl text-sm font-semibold hover:bg-[#004689] transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
