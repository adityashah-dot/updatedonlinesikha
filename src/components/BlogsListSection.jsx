import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { DEGREEFYD_LPU_API } from "../data/apiData";
const PAGE_SIZE = 3;
export const BlogsListSection = ({
  onOpenHelpDesk,
  title,
  className = "bg-white rounded-xl border border-[#c4c6ce]/60 shadow-sm p-5 md:p-7",
  sectionId = "blogs",
  posts: passedPosts,
  compact = false,
  horizontal = false
}) => {
  const posts = passedPosts ?? DEGREEFYD_LPU_API.blogs.posts;
  const [shown, setShown] = useState(PAGE_SIZE);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector("article");
    const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 12;
    const step = (card?.getBoundingClientRect().width || slider.clientWidth) + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const next = slider.scrollLeft + step * direction;
    const left = next > maxScroll - 2 ? 0 : next < 0 ? maxScroll : next;
    slider.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener?.("change", updateMotionPreference);
    return () => media.removeEventListener?.("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!horizontal || reduceMotion || isHovered || hasFocus || posts.length < 5) return;
    const timer = window.setInterval(() => {
      const slider = sliderRef.current;
      if (!slider || slider.scrollWidth <= slider.clientWidth + 2) return;
      const card = slider.querySelector("article");
      const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 12;
      const step = (card?.getBoundingClientRect().width || slider.clientWidth) + gap;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const left = slider.scrollLeft + step >= maxScroll - 2 ? 0 : slider.scrollLeft + step;
      slider.scrollTo({ left, behavior: "smooth" });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [horizontal, reduceMotion, isHovered, hasFocus, posts.length]);

  const sliderControls = horizontal ? (
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" aria-label="Previous blog" onClick={() => scrollSlider(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e3ff] bg-white text-[#115eaf] shadow-sm transition hover:bg-[#f0f6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115eaf]">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button type="button" aria-label="Next blog" onClick={() => scrollSlider(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e3ff] bg-white text-[#115eaf] shadow-sm transition hover:bg-[#f0f6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115eaf]">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  ) : null;

  return <section
    id={sectionId}
    className={`${className} scroll-mt-[130px]`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onFocus={() => setHasFocus(true)}
    onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
    }}
  >
      <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
        <h2 className="text-2xl font-bold text-[#000f22] tracking-tight">
          {title ?? "Latest Blogs"}
        </h2>
        {sliderControls}
      </div>

      <div className="hidden md:flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
            {title ?? <>
                Latest Blogs
              </>}
          </h2>
          <p className="text-sm text-[#43474d] leading-relaxed font-normal max-w-[850px]">
            {DEGREEFYD_LPU_API.blogs.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
        {sliderControls}
        <button
    type="button"
    onClick={() => onOpenHelpDesk()}
    className="h-10 px-4 inline-flex items-center gap-2 rounded-xl border border-[#0b2540] text-[#0b2540] text-xs font-bold hover:bg-[#0b2540] hover:text-white transition-all shrink-0 cursor-pointer"
  >
          View All Blogs
          <span className="text-[#115eaf] text-sm">→</span>
        </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        aria-label={horizontal ? "Latest blog posts carousel" : undefined}
        role={horizontal ? "region" : undefined}
        aria-roledescription={horizontal ? "carousel" : undefined}
        className={`${horizontal ? "flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" : "hidden md:grid grid-cols-1 md:grid-cols-3"} ${compact ? "gap-3 mt-3 pb-2" : "gap-4 mt-[18px]"}`}
      >
        {posts.map((post, i) => <article
    key={`desktop-${i}`}
    style={horizontal ? { flex: "0 0 max(220px, calc((100% - 36px) / 4))" } : undefined}
    className={`${horizontal ? "snap-start" : ""} group overflow-hidden bg-white border border-[#e7eeff] rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
  >
            <div className={`relative ${compact ? "h-28" : "h-40"} overflow-hidden bg-[#f0f3ff]`}>
              {post.image ? <img
    src={post.image}
    alt={post.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    loading="lazy"
  /> : <div className="w-full h-full flex items-center justify-center text-[#0b2540] font-semibold text-sm">Blog</div>}
              <span className="absolute left-3 top-3 px-2 py-1 rounded-full bg-[#115eaf] text-white text-[10px] font-bold">
                {post.category ?? "Online Education"}
              </span>
            </div>
            <div className={`${compact ? "p-3" : "p-4"} flex-1 flex flex-col justify-between space-y-2`}>
              <div>
                <span className="text-[10px] text-[#74777e]">{post.date}</span>
                <h3 className="font-bold text-xs sm:text-sm text-[#000f22] line-clamp-2 mt-1">
                  {post.title}
                </h3>
              </div>
              <button
    type="button"
    onClick={() => onOpenHelpDesk()}
    className="text-xs font-bold text-[#115eaf] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
  >
                Read Article
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>)}
      </div>

      <ul className={`${horizontal ? "hidden" : "md:hidden grid gap-3"} list-none`}>
        {posts.slice(0, shown).map((post, i) => <li key={i}>
            <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onOpenHelpDesk();
    }}
    className="group flex gap-3 p-2.5 border border-[#e7eeff] rounded-xl bg-white hover:border-[#c9d6e0] hover:shadow-[0_2px_8px_rgba(15,58,92,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115eaf] focus-visible:ring-offset-2 transition-all"
  >
              <div className="flex-none w-[112px] h-[84px] rounded-lg overflow-hidden bg-gradient-to-br from-[#e7eeff] to-[#d5e3ff] flex items-center justify-center text-[#0b2540] font-semibold text-xs text-center p-1.5">
                {post.image ? <img
    src={post.image}
    alt=""
    loading="lazy"
    className="w-full h-full object-cover block"
  /> : "Blog"}
              </div>

              <div className="min-w-0 flex flex-col justify-between py-0.5">
                <h3 className="text-sm font-medium leading-snug text-[#115eaf] line-clamp-3 group-hover:underline">
                  {post.title}
                </h3>
                <span className="flex items-center gap-1.5 text-xs text-[#74777e] mt-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>
            </a>
          </li>)}
      </ul>

      {!horizontal && shown < posts.length && <button
    type="button"
    onClick={() => setShown(posts.length)}
    className="md:hidden block mx-auto mt-5 h-11 px-5 rounded-lg border border-[#0b2540] bg-white text-[#0b2540] text-sm font-medium hover:bg-[#f0f6fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115eaf] focus-visible:ring-offset-2 transition-colors cursor-pointer"
  >
          View More
        </button>}
    </section>;
};
