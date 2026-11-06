const exams = [
  { slug: "cuet-2027", title: "CUET 2027", excerpt: "Dates, eligibility and pattern.", category: "Entrance", date: "2026-10-18", examDate: "May 2027", mode: "Online", content: "Exam content goes here." },
  { slug: "cat-2026", title: "CAT 2026", excerpt: "Registration, syllabus and cutoffs.", category: "MBA", date: "2026-10-10", examDate: "Nov 2026", mode: "Online", content: "Exam content goes here." },
  { slug: "nmat-2026", title: "NMAT 2026", excerpt: "Pattern, fees and important dates.", category: "MBA", date: "2026-10-02", examDate: "Oct-Dec 2026", mode: "Online", content: "Exam content goes here." },
];
export const getAllExams = () => [...exams].sort((a, b) => new Date(b.date) - new Date(a.date));
export const getExam = (slug) => exams.find((e) => e.slug === slug);
