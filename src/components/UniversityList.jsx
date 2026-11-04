"use client";
import { useState, useMemo } from "react";
import UniversityCard from "./UniversityCard";

export default function UniversityList({ all }) {
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");
  const cities = [...new Set((all || []).map((u) => u.city))];

  const list = useMemo(
    () => (all || []).filter((u) =>
      (!city || u.city === city) &&
      (u.name || "").toLowerCase().includes(q.toLowerCase())),
    [all, city, q]
  );

  return (
    <>
      <div className="filters">
        <input placeholder="Search university" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All locations</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="uni-grid wrap">{list.map((u) => <UniversityCard key={u.slug} u={u} />)}</div>
    </>
  );
}
