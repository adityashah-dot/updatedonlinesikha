import { FaqAccordion } from "./FaqAccordion";
import { UNIVERSITIES_LISTING_FAQS } from "../data/universityListingFaqs";

/** Listing FAQ follows the same card and accordion treatment as university overviews. */
export function UniversitiesFaq({ onOpenHelpDesk }) {
  return (
    <section id="faqs" aria-labelledby="universities-faq-heading" className="scroll-mt-24 bg-white rounded-2xl border border-[#e7eeff] p-4 sm:p-5 md:p-6 shadow-xs">
      <div className="pt-3 mt-[18px] border-t border-[#e7eeff]">
        <h2 id="universities-faq-heading" className="section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans">
          Online Universities — Frequently Asked Questions
        </h2>

        <div className="mt-[18px]">
          <FaqAccordion
            items={UNIVERSITIES_LISTING_FAQS}
            variant="card"
            defaultOpenIndex={0}
            renderAnswer={(item) => (
              <>
                {item.answer}
                {item.officialUrl ? (
                <>
                  {" "}
                  <a
                    href={item.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#115eaf] font-semibold hover:underline"
                  >
                    {item.officialLinkLabel || "Official website"}
                  </a>
                </>
                ) : null}
              </>
            )}
          />
        </div>

        {onOpenHelpDesk ? (
          <button
            type="button"
            onClick={onOpenHelpDesk}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[#f0f3ff] px-4 py-2 text-xs font-semibold text-[#115eaf] transition-colors hover:bg-[#115eaf] hover:text-white"
          >
            Have another question? Talk to an Advisor
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default UniversitiesFaq;
