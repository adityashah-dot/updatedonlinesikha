import { useState } from "react";
import { ArrowRight, CheckCircle, Headphones } from "lucide-react";

export function AcademicExpertCounselingSection({ id = "counselling" }) {
  const [lead, setLead] = useState({ phone: "", email: "", degree: "Online MBA" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden rounded-[20px] border border-[#d0e2fa] bg-gradient-to-br from-[#eef6ff] via-[#f7fbff] to-white p-4 text-[#0b1d3a] shadow-sm sm:p-5 md:p-6"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#b9daff]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-80 w-80 rounded-full bg-[#b9daff]/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] lg:gap-7">
        <div className="px-1 sm:px-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ffdf70] bg-[#fffdf2] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.2px] text-[#dca400] sm:text-[11px]">
            <Headphones className="h-4 w-4 text-[#dca400]" />
            FREE 1-ON-1 ACADEMIC ADVISORY
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="max-w-[680px] text-[clamp(22px,2.2vw,32px)] font-bold leading-[1.2] tracking-[-0.6px] text-[#0b1d3a]">
              Confused Between 50+ Universities? Speak with an <span className="text-[#3478ed]">Unbiased Academic Expert</span>
            </h2>
            <p className="max-w-[660px] text-xs font-normal leading-[1.6] text-[#657185] sm:text-sm">
              Choosing the right online university impacts your career and finances for years. Our certified advisors provide objective comparisons across UGC-DEB entitlements, syllabus depth, recruiter networks, and genuine fee financing — 100% free with zero sales bias.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 text-[11px] text-[#0b1d3a] max-[380px]:grid-cols-1 sm:text-xs">
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" /><span>100% Free &amp; Unbiased Counseling</span></span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" /><span>Official UGC-DEB &amp; NAAC Data</span></span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" /><span>0% Interest Monthly EMI Guidance</span></span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" /><span>Zero Spam &amp; Complete Privacy</span></span>
          </div>
        </div>

        <div className="w-full rounded-[18px] border border-white/90 bg-white/95 p-4 text-[#111c2d] shadow-[0_10px_28px_rgba(27,65,112,0.08)] sm:p-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight tracking-[-0.5px] text-[#0b1d3a] sm:text-xl">Request Free Callback</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a5f3d0] bg-[#effdf6] px-2.5 py-1.5 text-[11px] font-medium text-[#087955]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Advisors Online
            </span>
          </div>
          <p className="mb-4 text-xs font-normal leading-relaxed text-[#6b7280] sm:text-sm">Connect with a verified academic advisor within 15 minutes.</p>

          {!leadSubmitted ? (
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                setLeadSubmitted(true);
              }}
            >
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#43474d]">Mobile Number (WhatsApp Enabled)</label>
                <div className="flex h-11 overflow-hidden rounded-[9px] border border-[#c4c6ce] bg-white transition-all focus-within:border-[#115eaf] focus-within:ring-2 focus-within:ring-[#115eaf]/20">
                  <span className="flex shrink-0 items-center border-r border-[#c4c6ce] bg-[#f0f4f8] px-3 text-xs font-semibold text-[#000f22]">+91</span>
                  <input className="w-full border-0 bg-white px-3 text-base font-medium text-[#000f22] outline-none placeholder:text-[#74777e] sm:text-sm" placeholder="98765 43210" required type="tel" value={lead.phone} onChange={(event) => setLead({ ...lead, phone: event.target.value })} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#43474d]">Email Address</label>
                <input className="h-11 w-full rounded-[9px] border border-[#c4c6ce] bg-white px-3 text-base font-medium text-[#000f22] outline-none transition-all placeholder:text-[#74777e] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 sm:text-sm" placeholder="name@example.com" required type="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#43474d]">Program You&apos;re Exploring</label>
                <select className="h-11 w-full cursor-pointer rounded-[9px] border border-[#c4c6ce] bg-white px-3 text-base font-medium text-[#000f22] outline-none transition-all focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 sm:text-sm" value={lead.degree} onChange={(event) => setLead({ ...lead, degree: event.target.value })}>
                  <option>Online MBA (Master of Business)</option>
                  <option>Online MCA (Computer Applications)</option>
                  <option>Online BBA (Bachelor of Business)</option>
                  <option>Online BCA (Computer Applications)</option>
                  <option>Online M.Com / B.Com</option>
                  <option>Online MA / BA Programs</option>
                  <option>Executive PG Diploma</option>
                </select>
              </div>

              <button className="flex h-12 min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#1764c0] text-xs font-medium text-white shadow-md transition-all hover:bg-[#1054a5] hover:shadow-lg active:scale-[0.99] sm:text-sm" type="submit">
                <span>Connect with Academic Advisor</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="pt-1 text-center text-[10px] font-normal text-[#74777e]">🔒 Strictly confidential. No marketing spam guaranteed.</p>
            </form>
          ) : (
            <div className="space-y-2 py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600"><CheckCircle className="h-6 w-6" /></div>
              <h3 className="text-base font-bold text-[#000f22]">Callback Request Confirmed!</h3>
              <p className="mx-auto max-w-xs text-xs text-[#555960]">A senior academic counselor will call you within 15 minutes regarding <strong>{lead.degree}</strong>.</p>
              <button type="button" onClick={() => setLeadSubmitted(false)} className="inline-block cursor-pointer pt-2 text-xs font-semibold text-[#115eaf] hover:underline">Submit another inquiry</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AcademicExpertCounselingSection;
