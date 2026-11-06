const courses = [
  { slug: "online-mba", title: "Online MBA", excerpt: "Two-year management degree for working professionals.", category: "Postgraduate", date: "2026-10-20", duration: "2 years", fees: "Rs 1,00,000 - 2,00,000", mode: "Online", eligibility: "Graduation with 50% marks", content: "Course content goes here." },
  { slug: "online-bca", title: "Online BCA", excerpt: "Three-year computer applications degree.", category: "Undergraduate", date: "2026-10-12", duration: "3 years", fees: "Rs 60,000 - 1,20,000", mode: "Online", eligibility: "12th pass", content: "Course content goes here." },
  { slug: "online-bba", title: "Online BBA", excerpt: "Start your management career early.", category: "Undergraduate", date: "2026-10-05", duration: "3 years", fees: "Rs 60,000 - 1,20,000", mode: "Online", eligibility: "12th pass", content: "Course content goes here." },
];
export const getAllCourses = () => [...courses].sort((a, b) => new Date(b.date) - new Date(a.date));
export const getCourse = (slug) => courses.find((c) => c.slug === slug);
