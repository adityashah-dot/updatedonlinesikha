import fs from "fs";
const p = "C:/Users/GCV/Downloads/updatedonlinesiksha/src/pages/Courses.jsx";
let s = fs.readFileSync(p, "utf8");

const o1 = 'import { Search, ArrowRight, BookOpen, Sparkles, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";';
const n1 = 'import { Search, ArrowRight, BookOpen, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";\nimport SafeHtml from "../components/blog/SafeHtml";\nimport CoursesPromoBanner from "../components/CoursesPromoBanner";';
if (!s.includes(o1)) { console.log("NOT_FOUND_1"); process.exit(1); }
s = s.replace(o1, n1);

const o2 = `              ) : featured ? (
                <div className="relative rounded-2xl border border-[#e7eeff] bg-white overflow-hidden shadow-sm">
                  <div className="h-56 sm:h-64 bg-[#f0f3ff] flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-[#115eaf]" aria-hidden="true" />
                  </div>`;
const n2 = `              ) : featured ? (
                <div className="relative rounded-2xl border border-[#e7eeff] bg-white overflow-hidden shadow-sm">
                  {(featured.images && (featured.images.logo || featured.images.hero)) ? (
                    <img src={featured.images.logo || featured.images.hero} alt={featured.name || ""} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#f0f3ff]">
                      <BookOpen className="w-10 h-10 text-[#115eaf]" aria-hidden="true" />
                    </div>
                  )}`;
if (!s.includes(o2)) { console.log("NOT_FOUND_2"); process.exit(1); }
s = s.replace(o2, n2);

const o3 = `                return (
                  <article key={slug} className="group bg-white rounded-2xl border border-[#e7eeff] hover:border-[#b1c8eb] overflow-hidden transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-[#f0f3ff]">
                        {b.category ? (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#115eaf] shadow-sm">
                            {b.category}
                          </span>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <h2 className="text-lg font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-2 leading-snug">
                          <Link to={"/courses/" + slug}>{b.name}</Link>
                        </h2>
                        {b.shortDescription ? <p className="text-xs sm:text-[13px] text-[#555960] line-clamp-2 mt-2 leading-relaxed">{b.shortDescription}</p> : null}
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#74777e] mb-2.5">
                        {b.level ? <span>{b.level}</span> : null}
                        {b.duration ? <span>{b.duration}</span> : null}
                      </div>
                      {feeText(b) ? <div className="text-sm font-semibold text-[#115eaf] mb-3">{feeText(b)}</div> : null}
                      <Link to={"/courses/" + slug} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#115eaf] group-hover:underline">
                        <span>Explore Course</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );`;
const n3 = `                return (
                  <article key={slug} className="group bg-white rounded-2xl border border-[#e7eeff] hover:border-[#b1c8eb] overflow-hidden transition-all duration-300 flex flex-col">
                    <div className="relative h-40 overflow-hidden bg-[#f0f3ff]">
                      {(b.images && (b.images.logo || b.images.hero)) ? (
                        <img src={b.images.logo || b.images.hero} alt={b.name || b.code || ""} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-[#115eaf]" aria-hidden="true" />
                        </div>
                      )}
                      {b.category ? (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#115eaf] shadow-sm">
                          {b.category}
                        </span>
                      ) : null}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="text-base font-bold text-[#000f22] group-hover:text-[#115eaf] transition-colors line-clamp-2 leading-snug">
                        <Link to={"/courses/" + slug}>{b.name}</Link>
                      </h2>
                      {b.shortDescription ? <p className="text-[11px] sm:text-[12px] text-[#555960] line-clamp-2 mt-1.5 leading-relaxed"><SafeHtml html={b.shortDescription} /></p> : null}
                      <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-[11px] text-[#74777e]">
                        {b.level ? <span>{b.level}</span> : null}
                        {b.duration ? <span>{b.duration}</span> : null}
                      </div>
                      {feeText(b) ? <div className="text-xs font-semibold text-[#115eaf] mt-2.5 mb-3">{feeText(b)}</div> : null}
                      <Link to={"/courses/" + slug} className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#115eaf] group-hover:underline">
                        <span>Explore Course</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );`;
if (!s.includes(o3)) { console.log("NOT_FOUND_3"); process.exit(1); }
s = s.replace(o3, n3);

const o4 = `        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#f7f9fc] border border-[#e7eeff] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-[#000f22] mb-1">Need help choosing the right online course?</h3>
            <p className="text-xs sm:text-sm text-[#555960]">Free academic counselling available.</p>
          </div>
          <button type="button" onClick={() => { if (onOpenCounseling) onOpenCounseling(); else window.location.href = "/counselling"; }} className="px-5 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#084a8c] text-white text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer">
            <span>Talk to an Academic Advisor</span>
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>`;
const n4 = `        <CoursesPromoBanner
          title="Need help choosing the right online course?"
          message="Free academic counselling available."
          ctaLabel="Talk to an Academic Advisor"
          onCtaClick={() => { if (onOpenCounseling) onOpenCounseling(); else window.location.href = "/counselling"; }}
        />`;
if (!s.includes(o4)) { console.log("NOT_FOUND_4"); process.exit(1); }
s = s.replace(o4, n4);

const o5 = '<section className="rounded-3xl border border-[#e7eeff] bg-white px-5 py-10 sm:px-10 lg:px-12 mb-10">';
const n5 = '<section className="rounded-3xl border border-[#e7eeff] bg-white px-5 py-10 sm:px-10 lg:px-12 mb-8">';
if (!s.includes(o5)) { console.log("NOT_FOUND_5"); process.exit(1); }
s = s.replace(o5, n5);

const o6 = '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">';
const n6 = '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">';
if (!s.includes(o6)) { console.log("NOT_FOUND_6"); process.exit(1); }
s = s.replace(o6, n6);

fs.writeFileSync(p, s, "utf8");
console.log("COURSES_PATCH_OK");
