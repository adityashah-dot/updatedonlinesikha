import { ChevronRight } from "lucide-react";
import { DEGREEFYD_LPU_API } from "../data/apiData";
export const BlogsSection = ({
  onOpenHelpDesk,
  title,
  description,
  className = "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
  sectionId = "blogs"
}) => {
  const blogs = DEGREEFYD_LPU_API.blogs;
  const desc = description ?? blogs.description;
  return <section id={sectionId} className={`${className} scroll-mt-[130px]`}>
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h2 className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
            {title ?? <>
                Latest <span className="text-[#115eaf]">Blogs</span>
              </>}
          </h2>
          <p className="section-description text-sm text-[#43474d] leading-relaxed font-normal max-w-[850px]">
            {desc}
          </p>
        </div>
        <button
    onClick={() => onOpenHelpDesk()}
    className="h-10 px-4 inline-flex items-center gap-2 rounded-xl border border-[#0b2540] text-[#0b2540] text-xs font-bold hover:bg-[#0b2540] hover:text-white transition-all shrink-0 cursor-pointer"
  >
          View All Blogs
          <span className="text-[#115eaf] text-sm">→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]">
        {blogs.posts.slice(0, 3).map((post, i) => <article
    key={i}
    className="overflow-hidden bg-white border border-[#e7eeff] rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
  >
            <div className="relative h-40 overflow-hidden bg-[#f0f3ff]">
              <img
    src={post.image}
    alt={post.title}
    className="w-full h-full object-cover"
    loading="lazy"
  />
              <span className="absolute left-3 top-3 px-2 py-1 rounded-full bg-[#115eaf] text-white text-[10px] font-bold">
                {post.category}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] text-[#74777e]">{post.date}</span>
                <h3 className="font-bold text-xs sm:text-sm text-[#000f22] line-clamp-2 mt-1">
                  {post.title}
                </h3>
              </div>
              <button
    onClick={() => onOpenHelpDesk()}
    className="text-xs font-bold text-[#115eaf] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
  >
                Read Article
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>)}
      </div>
    </section>;
};
