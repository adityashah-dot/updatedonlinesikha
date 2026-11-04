import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function UniversityCard({ u }) {
  return (
    <article className="uni-card">
      <div className="uni-top">
        <img src={u.logo} alt={`${u.name} logo`} width={56} height={56} />
        <div>
          <h3>{u.name}</h3>
          <p className="muted"><MapPin size={14} /> {u.city}</p>
        </div>
      </div>
      <div className="uni-tags">
        {u.approvals.map((a) => <span key={a}>{a}</span>)}
      </div>
      <ul className="uni-points">
        {u.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
      </ul>
      <div className="uni-actions">
        <Link to={`/universities/${u.slug}`} className="btn-view-all btn-outline">Know more</Link>
        <Link to={`/apply?u=${u.slug}`} className="btn-view-all btn-solid">Apply now</Link>
      </div>
    </article>
  );
}
