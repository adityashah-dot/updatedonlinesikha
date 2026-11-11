import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DEGREEFYD_LPU_API } from "../data/apiData";
import { getCollegeBlogs } from "../services/collegeApi";

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
    category: post?.category || "Online Education",
    date: post?.createdAt ? new Date(post.createdAt).toLocaleDateString("en-IN") : "",
    slug: post?.urlSlug || post?.slug || "",
  })).filter((post) => post.title);
}

function fillBlogCarouselPosts(livePosts, fallbackPosts, minimum = 4) {
  const posts = [...(livePosts || [])];
  const keys = new Set(posts.flatMap((post) => [post.slug, post.title]
    .filter(Boolean).map((value) => String(value).trim().toLowerCase())));

  for (const post of (fallbackPosts || [])) {
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
  onOpenHelpDesk = () => {},
  title,
  sub,
  className = "bg-white rounded-2xl border border-[#e7eeff] shadow-xs p-5 md:p-6",
  sectionId = "blogs",
  posts: passedPosts,
  compact = false,
  horizontal = true,
  autoScroll = true,
  showDescriptionOnMobile = true,
  fetchLivePosts = false
}) => {
  const [livePosts, setLivePosts] = useState(null);

  // Always guarantee at least 4 blog posts so desktop renders a full 4-banner layout
  const rawPosts = (passedPosts && passedPosts.length)
    ? passedPosts
    : (livePosts && livePosts.length ? livePosts : DEGREEFYD_LPU_API.blogs.posts);
  const posts = fillBlogCarouselPosts(rawPosts, DEGREEFYD_LPU_API.blogs.posts, 4);

  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!fetchLivePosts || (passedPosts && passedPosts.length >= 4)) return;
    let cancelled = false;
    getCollegeBlogs("", {})
      .then((rows) => {
        const mapped = fillBlogCarouselPosts(
          mapBlogPosts(rows),
          DEGREEFYD_LPU_API.blogs.posts,
          4
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

  const updateScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 6);
    setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 6);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !horizontal) return;
    updateScrollState();
    slider.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      slider.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [horizontal, posts.length]);

  const scrollPrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector("article");
    const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 16;
    const step = (card?.getBoundingClientRect().width || slider.clientWidth / 4) + gap;
    slider.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector("article");
    const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 16;
    const step = (card?.getBoundingClientRect().width || slider.clientWidth / 4) + gap;
    slider.scrollBy({ left: step, behavior: "smooth" });
  };

  useEffect(() => {
    if (!autoScroll || !horizontal || reduceMotion || isHovered || hasFocus || posts.length <= 4 || window.matchMedia("(hover: none)").matches) return;
    const timer = window.setInterval(() => {
      const slider = sliderRef.current;
      if (!slider || slider.scrollWidth <= slider.clientWidth + 2) return;
      const card = slider.querySelector("article");
      const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 16;
      const step = (card?.getBoundingClientRect().width || slider.clientWidth / 4) + gap;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const left = slider.scrollLeft + step >= maxScroll - 2 ? 0 : slider.scrollLeft + step;
      slider.scrollTo({ left, behavior: "smooth" });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [autoScroll, horizontal, reduceMotion, isHovered, hasFocus, posts.length]);

  const sectionTitle = title ?? "Latest Blogs";
  const sectionDescription = sub ?? "Want to learn more before you apply? Our blog has a wealth of information to help you.";

  return (
    <section
      id={sectionId}
      className={`${className} scroll-mt-[130px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div className="min-w-0 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[#000f22] font-sans tracking-tight">
            {sectionTitle}
          </h2>
          <p className={`text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal mt-1 ${showDescriptionOnMobile ? "block" : "hidden sm:block"}`}>
            {sectionDescription}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {horizontal && posts.length > 4 && (
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous blogs"
                className="w-8 h-8 rounded-full border border-[#d5e3ff] bg-white text-[#000f22] flex items-center justify-center hover:bg-[#0b2540] hover:border-[#0b2540] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next blogs"
                className="w-8 h-8 rounded-full border border-[#d5e3ff] bg-white text-[#000f22] flex items-center justify-center hover:bg-[#0b2540] hover:border-[#0b2540] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link
            to="/blog"
            className="btn-view-all btn-outline shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border border-[#0b2540] text-[#0b2540] hover:bg-[#0b2540] hover:text-white transition-all min-h-[36px]"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Blog Cards Container: exactly 4 banners on desktop */}
      <div
        ref={sliderRef}
        aria-label={horizontal ? "Latest blog posts carousel" : undefined}
        role={horizontal ? "region" : undefined}
        aria-roledescription={horizontal ? "carousel" : undefined}
        className={
          horizontal
            ? "flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 mt-3"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3"
        }
      >
        {posts.map((post, i) => (
          <article
            key={`blog-${i}`}
            className={`${horizontal ? "blog-carousel-card" : ""} group min-w-0 bg-white border border-[#e7eeff] rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden`}
          >
            <Link
              to={post.slug ? `/blog/${post.slug}` : "/blog"}
              className="flex flex-col h-full justify-between"
            >
              {/* Card Banner Image */}
              <div className={`relative ${compact ? "h-32" : "h-[145px]"} w-full overflow-hidden bg-[#f0f3ff]`}>
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#0b2540] font-semibold text-sm">
                    Blog
                  </div>
                )}
                <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-[#115eaf] text-white text-[10px] font-bold shadow-xs leading-none">
                  {post.category || "Online Education"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#74777e] mb-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#000f22] line-clamp-2 leading-snug font-sans group-hover:text-[#115eaf] transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-1.5 line-clamp-2 text-xs text-[#43474d] leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#f0f3ff] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#115eaf] group-hover:underline inline-flex items-center gap-1">
                    Read Article <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
