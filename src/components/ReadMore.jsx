"use client";
import { useState } from "react";

export default function ReadMore({ children, lines = 3 }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={`rm-text ${open ? "" : "rm-clamp"}`} style={{ "--lines": lines }}>
        {children}
      </div>
      <button className="rm-btn" onClick={() => setOpen(!open)}>
        {open ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
