import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ViewAllButton({ href, label = "View all" }) {
  return (
    <Link to={href} className="btn-view-all btn-outline">
      {label} <ArrowRight size={16} />
    </Link>
  );
}
