import { Link } from "react-router-dom";
import { Search, Home } from "lucide-react";
import { SEO } from "../components/SEO";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-5 py-16">
      <SEO title="Page not found | Online Siksha" description="The page you were looking for could not be found." robots="noindex" />
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-900">Page not found</h1>
        <p className="mt-3 text-ink-500">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="h-11 px-5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors">
            <Home className="w-4 h-4" /> Go to homepage
          </Link>
          <Link to="/universities" className="h-11 px-5 rounded-lg border border-line-strong bg-white text-ink-900 hover:border-brand-600 hover:text-brand-600 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors">
            <Search className="w-4 h-4" /> Browse universities
          </Link>
        </div>
      </div>
    </section>
  );
}
