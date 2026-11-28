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
      return <main className="min-h-[60vh] bg-canvas px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-ink-900">This university page could not be displayed</h1>
        <p className="mt-2 max-w-lg text-sm text-ink-700">Please try loading the page again, or return to the university list.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Reload page</button>
          <Link to="/universities" className="rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-600">Browse universities</Link>
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
