import { Link } from "react-router-dom";
import { getAllExams } from "../data/exams";
import usePageMeta from "../hooks/usePageMeta";

export default function Exams() {
  usePageMeta({ title: "Exams | Online Siksha", description: "Exam guides and important dates." });
  const exams = getAllExams();
  return (
    <main className="section">
      <div className="container">
        <nav aria-label="Breadcrumb"><Link to="/">Home</Link> / Exams</nav>
        <h1>Exams</h1>
        <ul>
          {exams.map((e) => (
            <li key={e.slug}>
              <Link to={`/exams/${e.slug}`}>
                <span>{e.category}</span>
                <h2>{e.title}</h2>
                <p>{e.excerpt}</p>
                <time dateTime={e.date}>{e.date}</time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
