import { useState } from "react";
import { ArrowRight, CheckCircle, Headphones } from "lucide-react";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";

export function AcademicExpertCounselingSection({
  id = "counselling",
  compact = false,
}) {
  const [lead, setLead] = useState({ phone: "", email: "", degree: "Online MBA" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden border border-[#d0e2fa] bg-gradient-to-br from-[#eef6ff] via-[#f7fbff] to-white text-[#0b1d3a] shadow-xs ${
        compact
          ? "rounded-2xl p-3.5 sm:p-4 md:p-5"
          : "rounded-[20px] p-4 sm:p-5 md:p-6 shadow-sm"
      }`}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#b9daff]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-64 w-64 rounded-full bg-[#b9daff]/20 blur-3xl" />

      <div
        className={`relative z-10 mx-auto grid grid-cols-1 items-center ${
          compact
            ? "max-w-[1280px] gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6"
            : "max-w-[1320px] gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] lg:gap-7"
        }`}
      >
        {/* Left Column */}
        <div className="px-0.5 sm:px-1">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border border-[#ffdf70] bg-[#fffdf2] font-semibold tracking-[0.2px] text-[#dca400] ${
              compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1.5 text-[10px] sm:text-[11px]"
            }`}
          >
            <Headphones className={compact ? "h-3.5 w-3.5 text-[#dca400]" : "h-4 w-4 text-[#dca400]"} />
            FREE 1-ON-1 ACADEMIC ADVISORY
          </div>

          <div className={compact ? "mt-2 space-y-1" : "mt-4 space-y-2"}>
            <h2
              className={`font-extrabold leading-[1.2] tracking-[-0.5px] text-[#0b1d3a] ${
                compact
                  ? "text-base sm:text-lg lg:text-xl max-w-[620px]"
                  : "text-xl sm:text-2xl lg:text-[28px] max-w-[680px]"
              }`}
            >
              Confused Between 50+ Universities? Speak with an{" "}
              <span className="text-[#3478ed]">Unbiased Academic Expert</span>
            </h2>
            <p
              className={`font-normal text-[#657185] ${
                compact
                  ? "text-[11px] sm:text-xs leading-[1.5] max-w-[580px]"
                  : "text-xs sm:text-sm leading-[1.6] max-w-[660px]"
              }`}
            >
              Choosing the right online university impacts your career and finances for years. Our certified advisors provide objective comparisons across UGC-DEB entitlements, syllabus depth, recruiter networks, and genuine fee financing — 100% free with zero sales bias.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 text-[#0b1d3a] max-[380px]:grid-cols-1 ${
              compact
                ? "mt-2.5 gap-x-2.5 gap-y-1.5 text-[10.5px] sm:text-[11px]"
                : "mt-5 gap-x-3 gap-y-3 text-[11px] sm:text-xs"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>100% Free &amp; Unbiased Counseling</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>Official UGC-DEB &amp; NAAC Data</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>0% Interest Monthly EMI Guidance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>Zero Spam &amp; Complete Privacy</span>
            </span>
          </div>
        </div>

        {/* Right Form Card */}
        <div
          className={`w-full rounded-xl border border-white/90 bg-white/95 text-[#111c2d] shadow-[0_6px_20px_rgba(27,65,112,0.06)] ${
            compact ? "p-3 sm:p-3.5" : "p-4 sm:p-5"
          }`}
        >
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <h3
              className={`font-bold leading-tight tracking-[-0.4px] text-[#0b1d3a] ${
                compact ? "text-sm sm:text-base" : "text-lg sm:text-xl"
              }`}
            >
              Request Free Callback
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a5f3d0] bg-[#effdf6] px-2 py-0.5 text-[10px] font-medium text-[#087955]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Advisors Online
            </span>
          </div>
          <p
            className={`font-normal text-[#6b7280] ${
              compact ? "mb-2 text-[11px] leading-tight" : "mb-4 text-xs sm:text-sm leading-relaxed"
            }`}
          >
            Connect with a verified academic advisor within 15 minutes.
          </p>

          {!leadSubmitted ? (
            <form
              className={compact ? "space-y-2" : "space-y-3"}
              onSubmit={(event) => {
                event.preventDefault();
                setErrorMsg("");
                const validation = validateLeadFields({
                  phone: lead.phone,
                  email: lead.email,
                  requireName: false,
                  requireEmail: true
                });
                if (!validation.valid) {
                  setErrorMsg(validation.error);
                  return;
                }
                submitLead({
                  email: validation.cleanEmail,
                  phone_number: validation.cleanPhone,
                  preferred_degree: lead.degree ? [lead.degree] : [],
                  form_name: "Academic Expert Counseling Form"
                });
                setLeadSubmitted(true);
              }}
            >
              {errorMsg && (
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold">
                  {errorMsg}
                </div>
              )}
              <div className={compact ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "space-y-3"}>
                <div>
                  <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-[#43474d]">
                    Mobile (WhatsApp)
                  </label>
                  <div
                    className={`flex overflow-hidden rounded-lg border border-[#c4c6ce] bg-white transition-all focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/20 ${
                      compact ? "h-9" : "h-11"
                    }`}
                  >
                    <span className="flex shrink-0 items-center border-r border-[#c4c6ce] bg-[#f0f4f8] px-2.5 text-xs font-semibold text-[#000f22]">
                      +91
                    </span>
                    <input
                      className="w-full border-0 bg-white px-2.5 text-xs font-medium text-[#000f22] outline-none placeholder:text-[#74777e]"
                      placeholder="10-digit Mobile Number"
                      required
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      pattern={INDIAN_PHONE_PATTERN}
                      title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                      value={lead.phone}
                      onChange={(event) => setLead({ ...lead, phone: sanitizeIndianPhone(event.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-[#43474d]">
                    Email Address
                  </label>
                  <input
                    className={`w-full rounded-lg border border-[#c4c6ce] bg-white px-2.5 text-xs font-medium text-[#000f22] outline-none transition-all placeholder:text-[#74777e] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 ${
                      compact ? "h-9" : "h-11"
                    }`}
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={lead.email}
                    onChange={(event) => setLead({ ...lead, email: event.target.value })}
                  />
                </div>
              </div>

              <div className={compact ? "grid grid-cols-1 sm:grid-cols-2 gap-2 items-end" : "space-y-3"}>
                <div>
                  <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-[#43474d]">
                    Program You&apos;re Exploring
                  </label>
                  <select
                    className={`w-full cursor-pointer rounded-lg border border-[#c4c6ce] bg-white px-2.5 text-xs font-medium text-[#000f22] outline-none transition-all focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 truncate ${
                      compact ? "h-9" : "h-11"
                    }`}
                    value={lead.degree}
                    onChange={(event) => setLead({ ...lead, degree: event.target.value })}
                  >
                    <option>Online MBA (Master of Business)</option>
                    <option>Online MCA (Computer Applications)</option>
                    <option>Online BBA (Bachelor of Business)</option>
                    <option>Online BCA (Computer Applications)</option>
                    <option>Online M.Com / B.Com</option>
                    <option>Online MA / BA Programs</option>
                    <option>Executive PG Diploma</option>
                  </select>
                </div>

                <div>
                  <button
                    className={`flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#1764c0] text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1054a5] hover:shadow-sm active:scale-[0.99] ${
                      compact ? "h-9" : "h-12 min-h-12 text-sm"
                    }`}
                    type="submit"
                  >
                    <span>Connect with Advisor</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="pt-0.5 text-center text-[9.5px] font-normal text-[#74777e]">
                🔒 Strictly confidential. No marketing spam guaranteed.
              </p>
            </form>
          ) : (
            <div className={`space-y-1.5 text-center ${compact ? "py-3" : "py-6"}`}>
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#000f22]">Callback Request Confirmed!</h3>
              <p className="mx-auto max-w-xs text-[11px] text-[#555960]">
                A senior academic counselor will call you within 15 minutes regarding <strong>{lead.degree}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setLeadSubmitted(false)}
                className="inline-block cursor-pointer pt-1 text-[11px] font-semibold text-[#115eaf] hover:underline"
              >
                Submit another inquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AcademicExpertCounselingSection;
