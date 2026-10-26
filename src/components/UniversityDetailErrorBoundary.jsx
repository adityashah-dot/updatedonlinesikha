import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

class DetailErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("University detail page failed to render:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <main className="min-h-[60vh] bg-[#f9f9ff] px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-[#000f22]">This university page could not be displayed</h1>
        <p className="mt-2 max-w-lg text-sm text-[#43474d]">Please try loading the page again, or return to the university list.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-[#115eaf] px-5 py-2.5 text-sm font-semibold text-white">Reload page</button>
          <Link to="/universities" className="rounded-xl border border-[#d5e3ff] bg-white px-5 py-2.5 text-sm font-semibold text-[#115eaf]">Browse universities</Link>
        </div>
      </main>;
    }
    return this.props.children;
  }
}

export function UniversityDetailErrorBoundary({ children }) {
  const { slug } = useParams();
  return <DetailErrorBoundary key={slug}>{children}</DetailErrorBoundary>;
}
