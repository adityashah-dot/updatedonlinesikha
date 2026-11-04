import ViewAllButton from "./ViewAllButton";

export default function SectionHeader({ title, href, sub }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {href && <ViewAllButton href={href} />}
    </div>
  );
}
