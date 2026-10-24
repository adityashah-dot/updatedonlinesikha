import { Star } from "lucide-react";
export const StudentReviewsSection = ({
  title,
  description,
  testimonials,
  limit = 6
}) => {
  if (!testimonials || testimonials.length === 0) return null;
  return <section
    id="student-reviews"
    className="content-block bg-white border-y border-[#e7eeff] scroll-mt-[100px]"
  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-[18px]">
          <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] tracking-tight font-sans">
            {title}
          </h2>
          <p className="section-description text-xs text-[#74777e] mt-1">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {testimonials.slice(0, limit).map((item, idx) => <div
    key={idx}
    className="bg-[#f9f9ff] p-4 rounded-xl border border-[#e7eeff] flex flex-col justify-between hover:border-[#115eaf] transition-all hover:shadow-sm"
  >
              <div>
                <div className="flex items-center text-amber-500 mb-2 gap-0.5">
                  {[...Array(item.rating || 5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-xs text-[#43474d] italic leading-relaxed font-normal line-clamp-3">
                  &quot;{item.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[#d5e3ff]">
                <div className="w-8 h-8 rounded-full bg-white text-[#115eaf] flex items-center justify-center font-bold text-xs shadow-sm border border-[#e7eeff] shrink-0">
                  {item.avatar || item.studentName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#000f22] truncate">{item.studentName}</div>
                  <div className="text-[11px] text-[#74777e] font-medium truncate">
                    {item.profession || "Online Student"}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default StudentReviewsSection;
