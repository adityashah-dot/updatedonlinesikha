import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { DEGREEFYD_LPU_API } from "../data/apiData";
import { getCollegeBlogs } from "../services/collegeApi";
const PAGE_SIZE = 4;

function readBlogImage(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    if (Array.isArray(value)) return readBlogImage(value[0]);
    return value.url || value.src || value.path || "";
  }
  return "";
}

function mapBlogPosts(rows) {
  return (Array.isArray(rows) ? rows : []).map((post) => ({
    image: readBlogImage(post?.mainimage?.image || post?.mainimage || post?.image),
    title: post?.title || "",
    excerpt: post?.excerpt || post?.description || "",
    category: post?.category || "Blog",
    date: post?.createdAt ? new Date(post.createdAt).toLocaleDateString("en-IN") : "",
    slug: post?.urlSlug || post?.slug || "",
  })).filter((post) => post.title);
}

function fillBlogCarouselPosts(livePosts, fallbackPosts, minimum = 5) {
  const posts = [...livePosts];
  const keys = new Set(posts.flatMap((post) => [post.slug, post.title]
    .filter(Boolean).map((value) => String(value).trim().toLowerCase())));

  for (const post of fallbackPosts) {
    if (posts.length >= minimum) break;
    const postKeys = [post.slug, post.title]
      .filter(Boolean).map((value) => String(value).trim().toLowerCase());
    if (postKeys.some((key) => keys.has(key))) continue;
    posts.push(post);
    postKeys.forEach((key) => keys.add(key));
  }

  return posts;
}

export const BlogsListSection = ({
  onOpenHelpDesk,
  title,
  className = "bg-white rounded-xl border border-[#c4c6ce]/60 shadow-sm p-5 md:p-7",
  sectionId = "blogs",
  posts: passedPosts,
  compact = false,
  horizontal = true,
  autoScroll = true,
  showDescriptionOnMobile = false,
  fetchLivePosts = false
}) => {
  const [livePosts, setLivePosts] = useState(null);
  const posts = passedPosts ?? livePosts ?? DEGREEFYD_LPU_API.blogs.posts;
  const [shown, setShown] = useState(PAGE_SIZE);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!fetchLivePosts || passedPosts != null) return;
    let cancelled = false;
    getCollegeBlogs("", {})
      .then((rows) => {
        const mapped = fillBlogCarouselPosts(
          mapBlogPosts(rows),
          DEGREEFYD_LPU_API.blogs.posts,
        );
        if (!cancelled && mapped.length) setLivePosts(mapped);
      })
      .catch(() => {
        // Keep the checked-in posts visible when the live endpoint is unavailable.
      });
    return () => { cancelled = true; };
  }, [fetchLivePosts, passedPosts]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener?.("change", updateMotionPreference);
    return () => media.removeEventListener?.("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!autoScroll || !horizontal || reduceMotion || isHovered || hasFocus || posts.length < 5 || window.matchMedia("(hover: none)").matches) return;
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
  }, [autoScroll, horizontal, reduceMotion, isHovered, hasFocus, posts.length]);

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
        <div>
          <h2 className="text-2xl font-bold text-[#000f22] tracking-tight">
            {title ?? "Latest Blogs"}
          </h2>
          {showDescriptionOnMobile && <p className="mt-1 text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal">
            {DEGREEFYD_LPU_API.blogs.description}
          </p>}
        </div>
        <button type="button" onClick={() => onOpenHelpDesk()} className="h-8 shrink-0 self-start rounded-xl border border-[#0b2540] px-2.5 text-[10px] font-bold text-[#0b2540] transition-all hover:bg-[#0b2540] hover:text-white cursor-pointer sm:h-10 sm:px-4 sm:text-xs">
          View All Blogs
        </button>
      </div>

      <div className="hidden md:grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
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
        <button
    type="button"
    onClick={() => onOpenHelpDesk()}
    className="h-8 px-2.5 inline-flex items-center justify-center rounded-xl border border-[#0b2540] text-[#0b2540] text-[10px] font-bold hover:bg-[#0b2540] hover:text-white transition-all shrink-0 cursor-pointer sm:h-10 sm:px-4 sm:text-xs"
  >
          View All Blogs
        </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        aria-label={horizontal ? "Latest blog posts carousel" : undefined}
        role={horizontal ? "region" : undefined}
        aria-roledescription={horizontal ? "carousel" : undefined}
        className={`${horizontal ? "flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" : "hidden md:grid grid-cols-1 md:grid-cols-4"} ${compact ? "gap-3 mt-3 pb-2" : "gap-4 mt-[18px]"}`}
      >
        {posts.map((post, i) => <article
    key={`desktop-${i}`}
    style={horizontal ? { flex: "0 0 max(140px, calc((100% - 36px) / 4))" } : undefined}
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
