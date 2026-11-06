import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function BlogQuickBrief({ subheadings = [], bulletPoints = [] }) {
  const points = (subheadings.length > 0 ? subheadings : bulletPoints).map((s) => (typeof s === "string" ? s.trim() : "")).filter(Boolean);
  if (points.length === 0) return null;
  return (
    <section className="bd-brief" aria-labelledby="brief-title">
      <h2 id="brief-title">The quick brief</h2>
      <ul>
        {points.slice(0, 12).map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </section>
  );
}
