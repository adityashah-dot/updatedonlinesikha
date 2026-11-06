import { Link, useParams } from "react-router-dom";
import { getExam } from "../data/exams";
import usePageMeta from "../hooks/usePageMeta";

export default function ExamDetail() {
  const { slug } = useParams();
  const exam = getExam(slug);
  usePageMeta({ title: exam ? `${exam.title} | Online Siksha` : "Page not found | Online Siksha", description: exam?.excerpt });
  if (!exam) {
    return (
      <main className="section"><div className="container">
        <h1>Exam not found</h1>
        <Link to="/exams">Back to all exams</Link>
      </div></main>
    );
  }
  return (
    <main className="section">
      <div className="container">
        <nav aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/exams">Exams</Link> / {exam.title}</nav>
        <h1>{exam.title}</h1>
        <p>{exam.category} · <time dateTime={exam.date}>{exam.date}</time></p>
        <dl><dt>Exam date</dt><dd>{exam.examDate}</dd><dt>Mode</dt><dd>{exam.mode}</dd></dl>
        <article>{exam.content}</article>
        <Link to="/exams">Back to all exams</Link>
      </div>
    </main>
  );
}
