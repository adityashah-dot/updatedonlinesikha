import usePageMeta from "../hooks/usePageMeta";
export default function News() {
  usePageMeta({ title: "News | Online Siksha", description: "News page coming soon." });
  return (
    <main className="section"><div className="container"><h1 className="sr-only">News</h1></div></main>
  );
}
