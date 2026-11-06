export default function BlogHero({ image, title }) {
  if (!image?.url) return null;
  return (
    <figure className="bd-hero">
      <img src={image.url} alt={image.alt || title || "Blog hero image"} width="1200" height="675" fetchPriority="high" />
    </figure>
  );
}
