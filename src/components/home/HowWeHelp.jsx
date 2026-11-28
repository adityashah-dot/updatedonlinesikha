import { Columns3, Headphones, FileCheck2 } from "lucide-react";
import { SectionHeader, Button } from "../ui";

const STEPS = [
  {
    icon: Columns3,
    title: "Compare universities",
    body: "See fees, approvals and rankings side by side. Filter by NAAC grade, budget and UGC-DEB status.",
  },
  {
    icon: Headphones,
    title: "Talk to an advisor",
    body: "Get free, one-on-one help shortlisting programmes, checking eligibility and understanding EMI options.",
  },
  {
    icon: FileCheck2,
    title: "Apply with confidence",
    body: "We help with forms, documents and deadlines. You apply directly to the university you choose.",
  },
];

/** Three-step explainer of how Online Siksha helps. */
export function HowWeHelp({ onOpenHelpDesk }) {
  return (
    <section aria-labelledby="how-heading" className="rounded-xl border border-line bg-white p-5 sm:p-8">
      <SectionHeader
        id="how-heading"
        title="How Online Siksha helps"
        description="Choosing an online degree takes three steps. We help at each one, free."
      />
      <ol className="grid gap-6 sm:grid-cols-3 sm:gap-8">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="flex gap-4 sm:flex-col sm:gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-500">Step {i + 1}</p>
              <h3 className="mt-0.5 text-[15px] font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row">
        <Button to="/universities">Browse universities</Button>
        <Button variant="secondary" onClick={onOpenHelpDesk}>Talk to an advisor</Button>
      </div>
    </section>
  );
}

export default HowWeHelp;
