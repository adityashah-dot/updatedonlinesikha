import { GraduationCap, Laptop, Briefcase, BookOpen, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  { title: "Online MBA", icon: GraduationCap, line: "2 years, for working professionals", href: "/courses/online-mba" },
  { title: "Online BCA / MCA", icon: Laptop, line: "Build a career in IT", href: "/courses/online-bca" },
  { title: "Online BBA", icon: Briefcase, line: "Start management early", href: "/courses/online-bba" },
  { title: "Online BA / MA", icon: BookOpen, line: "Flexible humanities degrees", href: "/courses/online-ba" },
  { title: "Online B.Com / M.Com", icon: Calculator, line: "Finance and accounting", href: "/courses/online-bcom" },
];

export default function DegreePrograms() {
  return (
    <div className="deg-grid">
      {programs.map(({ title, icon: Icon, line, href }) => (
        <Link to={href} key={title} className="deg-card">
          <span className="deg-icon"><Icon size={24} /></span>
          <h3>{title}</h3>
          <p className="muted">{line}</p>
          <span className="deg-link">Explore →</span>
        </Link>
      ))}
    </div>
  );
}
