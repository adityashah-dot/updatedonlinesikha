import { useEffect, useRef } from "react";

export const ExaminationPatternSteps = ({ steps = [] }) => {
  const flowRef = useRef(null);

  useEffect(() => {
    const nodes = Array.from(flowRef.current?.querySelectorAll(".exam-step-reveal") || []);
    if (!nodes.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("show"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 10% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps]);

  if (!steps.length) return null;

  return <>
      <style>{`
        .exam-step {
          --exam-badge-w: 78px;
          position: relative;
          display: grid;
          grid-template-columns: calc(var(--exam-badge-w) + 18px) minmax(0, 1fr);
          padding-bottom: 30px;
        }
        .exam-step:last-child { padding-bottom: 0; }
        .exam-step:not(:last-child)::before {
          content: "";
          position: absolute;
          left: calc(var(--exam-badge-w) / 2 - 5px);
          top: 40px;
          bottom: 6px;
          width: 3px;
          background: repeating-linear-gradient(180deg, #0b2540 0 4px, transparent 4px 9px);
          animation: exam-flow-down 0.9s linear infinite;
        }
        @keyframes exam-flow-down {
          from { background-position: 0 0; }
          to { background-position: 0 9px; }
        }
        .exam-badge {
          width: var(--exam-badge-w);
          height: 34px;
          display: grid;
          place-items: center;
          background: #0b2540;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
        }
        .exam-badge span { padding-right: 6px; }
        .exam-body h3 {
          margin: 2px 0 3px;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.35;
          color: #000f22;
        }
        .exam-body p {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: #43474d;
        }
        .exam-step-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .exam-step-reveal.show { opacity: 1; transform: none; }
        @media (max-width: 640px) {
          .exam-step { --exam-badge-w: 66px; }
          .exam-badge { font-size: 12px; }
          .exam-body h3 { font-size: 16px; }
          .exam-body p { font-size: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .exam-step::before, .exam-step-reveal {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div ref={flowRef} className="mt-[18px]">
        {steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className="exam-step exam-step-reveal">
            <div>
              <div className="exam-badge">
                <span>Step {String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="exam-body">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>;
};
