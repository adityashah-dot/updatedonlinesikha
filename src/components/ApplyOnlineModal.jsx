import { useState } from "react";
import { COURSES_DATA } from "../data/coursesData";
import { INDIAN_STATES, INDIAN_STATES_CITIES } from "../data/indianLocations";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";
import { X, CheckCircle, ArrowRight, ArrowLeft, Clock, FileText, User, Phone, Mail, ChevronDown } from "lucide-react";
export const ApplyOnlineModal = ({
  isOpen,
  onClose,
  preselectedCourseId = "mba",
  emiPlanDetails = null
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    courseId: preselectedCourseId || "mba",
    qualification: "Graduation Completed",
    marksPercentage: "65% - 75%",
    paymentPlan: emiPlanDetails ? "emi" : "early_bird",
    agreedToTerms: true
  });
  const [submittedAppId, setSubmittedAppId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  if (!isOpen) return null;
  const selectedCourse = COURSES_DATA.find((c) => c.id === formData.courseId) || COURSES_DATA[3];
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "phone" ? sanitizeIndianPhone(value) : value
    }));
  };
  const handleNext = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (step === 1) {
      const validation = validateLeadFields({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        requireName: true,
        requireEmail: true
      });
      if (!validation.valid) {
        setErrorMsg(validation.error);
        return;
      }
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      const validation = validateLeadFields({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        requireName: true,
        requireEmail: true
      });
      if (!validation.valid) {
        setErrorMsg(validation.error);
        setStep(1);
        return;
      }
      submitLead({
        name: formData.fullName,
        email: validation.cleanEmail,
        phone_number: validation.cleanPhone,
        state: formData.state ? [formData.state] : [],
        city: formData.city ? [formData.city] : [],
        currentcity: formData.city,
        currentstate: formData.state,
        highest_qualification: formData.qualification,
        preferred_degree: selectedCourse?.name ? [selectedCourse.name] : [],
        studyMode: "Online",
        form_name: "Apply Online Modal Form"
      });
      const randomNum = Math.floor(1e3 + Math.random() * 9e3);
      const generatedId = `OS-LPU-2026-${randomNum}`;
      setSubmittedAppId(generatedId);
      setStep(4);
    }
  };
  const handleReset = () => {
    setStep(1);
    setSubmittedAppId(null);
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
    className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-line relative"
    onClick={(e) => e.stopPropagation()}
  >
        {
    /* Header */
  }
        <div className="px-6 py-5 border-b border-brand-100 flex items-center justify-between bg-brand-50">
          <div>
            <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
              Spring 2026 Admissions Desk
            </span>
            <h3 className="text-lg font-semibold text-ink-900 font-sans">
              Please provide your details to start your application
            </h3>
          </div>
          <button
    onClick={onClose}
    className="p-2 min-h-[44px] text-ink-500 hover:text-ink-900 rounded-lg hover:bg-white transition-colors"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Progress indicator */
  }
        {step < 4 && <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-700 mb-2">
              <span className={step >= 1 ? "text-brand-600" : ""}>1. Basic Details</span>
              <span className={step >= 2 ? "text-brand-600" : ""}>2. Program Track</span>
              <span className={step >= 3 ? "text-brand-600" : ""}>3. Tuition Plan</span>
            </div>
            <div className="w-full bg-brand-100 h-1.5 rounded-full overflow-hidden">
              <div
    className="bg-brand-600 h-full transition-all duration-300 rounded-full"
    style={{ width: `${step / 3 * 100}%` }}
  />
            </div>
          </div>}

        {
    /* Form Body */
  }
        <div className="p-6">
          {step === 1 && <form onSubmit={handleNext} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-[13px] font-semibold text-ink-900 mb-1.5">
                  Full Name (As per 10th Class Marksheet) <span className="text-danger-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    aria-label="Rahul Sharma" placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-ink-900 mb-1.5">
                    Mobile Number (+91) <span className="text-danger-600">*</span>
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
                      required
                      pattern={INDIAN_PHONE_PATTERN}
                      title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      aria-label="Mobile number" placeholder="10-digit Mobile Number"
                      className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 bg-white transition-all"
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
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      aria-label="rahul.sharma@example.com" placeholder="rahul.sharma@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-900 uppercase tracking-wider mb-1.5">
                    State *
                  </label>
                  <div className="relative">
                    <select aria-label="State"
                      required
                      value={formData.state}
                      onChange={(e) => {
                        const selectedState = e.target.value;
                        const cities = INDIAN_STATES_CITIES[selectedState] || [];
                        setFormData((prev) => ({
                          ...prev,
                          state: selectedState,
                          city: cities[0] || ""
                        }));
                      }}
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 bg-white cursor-pointer hover:border-brand-600/50 transition-colors appearance-none"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-900 uppercase tracking-wider mb-1.5">
                    City *
                  </label>
                  <div className="relative">
                    <select aria-label="City"
                      required
                      disabled={!formData.state}
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 bg-white cursor-pointer disabled:bg-brand-50 disabled:text-ink-500 disabled:cursor-not-allowed hover:border-brand-600/50 transition-colors appearance-none"
                    >
                      <option value="">{formData.state ? "Select City" : "Select State first"}</option>
                      {formData.state && (INDIAN_STATES_CITIES[formData.state] || []).map((ct) => <option key={ct} value={ct}>{ct}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
    type="submit"
    className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
  >
                  <span>Continue to Degree Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>}

          {step === 2 && <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Select Desired Degree Program *
                </label>
                <div className="relative">
                  <select aria-label="Desired Degree Program"
                    value={formData.courseId}
                    onChange={(e) => handleInputChange("courseId", e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 cursor-pointer bg-white appearance-none"
                  >
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — ₹{c.totalFee.toLocaleString("en-IN")} ({c.duration})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-100 text-xs space-y-1">
                <span className="font-bold text-ink-900 block">
                  Eligibility Requirement for {selectedCourse.code}:
                </span>
                <p className="text-ink-700">{selectedCourse.eligibility}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Current Highest Educational Qualification *
                </label>
                <div className="relative">
                  <select aria-label="Highest qualification"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange("qualification", e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-line-strong text-sm font-medium text-ink-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 cursor-pointer bg-white appearance-none"
                  >
                    <option value="12th Pass">10+2 Intermediate (CBSE/ICSE/State)</option>
                    <option value="Graduation Completed">Bachelor’s Degree (B.Com/BBA/BCA/B.Sc/BA/B.Tech)</option>
                    <option value="Post Graduation">Master’s Degree or Higher</option>
                    <option value="Diploma Holder">3-Year Polytechnic Diploma</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Qualifying Aggregate Marks Range *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Above 75% (Merit)", "60% - 75%", "50% - 60%"].map((range) => <button
    key={range}
    type="button"
    onClick={() => handleInputChange("marksPercentage", range)}
    className={`p-2.5 min-h-[44px] rounded-xl text-xs font-semibold text-center border transition-all ${formData.marksPercentage === range ? "border-brand-600 bg-brand-100 text-brand-600" : "border-line-strong text-ink-700 hover:bg-brand-50"}`}
  >
                      {range}
                    </button>)}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
    type="button"
    onClick={() => setStep(1)}
    className="w-1/3 py-3 rounded-xl border border-line-strong text-ink-900 font-semibold text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-1.5"
  >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
    type="submit"
    className="w-2/3 py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
  >
                  <span>Next: Fee Option</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>}

          {step === 3 && <form onSubmit={handleNext} className="space-y-4">
              <div className="text-xs text-ink-700">
                Selected Program: <strong className="text-ink-900">{selectedCourse.name}</strong>
              </div>

              {
    /* Payment Plan Options */
  }
              <div className="space-y-3">
                <label
    onClick={() => handleInputChange("paymentPlan", "early_bird")}
    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${formData.paymentPlan === "early_bird" ? "border-brand-600 bg-brand-50" : "border-line-strong/60 hover:bg-slate-50"}`}
  >
                  <input
    type="radio"
    name="plan"
    checked={formData.paymentPlan === "early_bird"}
    onChange={() => handleInputChange("paymentPlan", "early_bird")}
    className="mt-1 text-brand-600 focus:ring-brand-600"
  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-ink-900">Full Semester Payment with 20% Early Bird Grant</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdcc3] text-[#6e3900]">
                        Save ₹{Math.round(selectedCourse.perSemFee * 0.2).toLocaleString("en-IN")}/sem
                      </span>
                    </div>
                    <p className="text-xs text-ink-700 mt-1">
                      Pay tuition semester-by-semester (approx ₹{Math.round(selectedCourse.perSemFee * 0.8).toLocaleString("en-IN")} net per sem).
                    </p>
                  </div>
                </label>

                <label
    onClick={() => handleInputChange("paymentPlan", "emi")}
    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${formData.paymentPlan === "emi" ? "border-brand-600 bg-brand-50" : "border-line-strong/60 hover:bg-slate-50"}`}
  >
                  <input
    type="radio"
    name="plan"
    checked={formData.paymentPlan === "emi"}
    onChange={() => handleInputChange("paymentPlan", "emi")}
    className="mt-1 text-brand-600 focus:ring-brand-600"
  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-ink-900">No-cost EMI plan</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        0% Interest
                      </span>
                    </div>
                    <p className="text-xs text-ink-700 mt-1">
                      Starting at ₹{Math.round(selectedCourse.totalFee * 0.8 / 24).toLocaleString("en-IN")}/month over 12 - 24 months. Subvented interest.
                    </p>
                  </div>
                </label>
              </div>

              {
    /* Terms Checkbox */
  }
              <div className="pt-2 flex items-start gap-2">
                <input
    type="checkbox"
    id="agreeTerms"
    required
    checked={formData.agreedToTerms}
    onChange={(e) => handleInputChange("agreedToTerms", e.target.checked)}
    className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-600 cursor-pointer"
  />
                <label htmlFor="agreeTerms" className="text-xs text-ink-700 cursor-pointer">
                  I confirm that the submitted educational credentials are valid and authorize Online Siksha & LPU CDOE to initiate document verification and send admission updates via Call/WhatsApp.
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
    type="button"
    onClick={() => setStep(2)}
    className="w-1/3 py-3 rounded-xl border border-line-strong text-ink-900 font-semibold text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-1.5"
  >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
    type="submit"
    className="w-2/3 py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
  >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>}

          {step === 4 && <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                  Application Submitted Successfully
                </span>
                <h3 className="text-2xl font-bold text-ink-900 mt-1 font-sans">
                  Welcome to Online Siksha!
                </h3>
                <p className="text-xs text-ink-700 mt-2 max-w-sm mx-auto">
                  Your registration for <strong>{selectedCourse.name}</strong> (Spring 2026 Batch) has been received by our Admissions Officer.
                </p>
              </div>

              {
    /* Reference ID card */
  }
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink-700">Application Reference:</span>
                  <span className="font-mono font-bold text-ink-900 text-sm">{submittedAppId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink-700">Applicant:</span>
                  <span className="font-semibold text-ink-900">{formData.fullName || "Registered Student"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink-700">Registered Mobile:</span>
                  <span className="font-semibold text-ink-900">+91 {formData.phone || "9876543210"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink-700">UGC DEB-ID Support:</span>
                  <span className="font-bold text-emerald-600">Assigned Senior Counselor</span>
                </div>
              </div>

              {
    /* Next Steps callout */
  }
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-sm mx-auto text-xs text-ink-700">
                <div className="p-3 rounded-lg border border-line bg-white flex items-start gap-2">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Call from advisor within 15 mins for transcript review</span>
                </div>
                <div className="p-3 rounded-lg border border-line bg-white flex items-start gap-2">
                  <FileText className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Provisional offer letter sent to {formData.email || "your email"}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
    onClick={handleReset}
    className="px-8 py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow hover:bg-brand-700 transition-all"
  >
                  Done & Return to Catalog
                </button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
