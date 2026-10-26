/**
 * FAQ data for the university listing page (/universities).
 *
 * Written for students browsing Online Siksha's online-program university
 * listing. Answers stay factual about the platform (what the site shows,
 * where to verify, how the flow works) and deliberately avoid claiming
 * uniform rules across universities — fees, eligibility, admission dates
 * and exam policies are set by each university, and specific decisions
 * always belong on that university's own pages or the official portal.
 */

export const OFFICIAL_ARIIA_PORTAL_URL = "https://deb.ugc.ac.in";
export const OFFICIAL_UGC_PORTAL_URL = "https://www.ugc.gov.in";
export const UNIVERSITIES_LIST_URL = "/universities";

export const UNIVERSITIES_LISTING_FAQS = [
  {
    id: "what-is-online-university",
    question: "What is an online university?",
    answer:
      "An online university (or an entitled university running online programmes) delivers UGC-recognised degrees entirely through a Learning Management System — recorded and live classes, e-content, assignments and proctored exams — without requiring travel or in-person attendance on a campus. Every university listed on Online Siksha operates in an approved online or distance-learning mode.",
  },
  {
    id: "how-to-choose",
    question: "How do I choose the right online university?",
    answer:
      "Start with recognition (UGC-DEB entitlement and a strong NAAC grade), then compare the fee pattern, program specialisations, LMS quality, exam mode and placement support for your specific course. Use the filters on this page to shortlist universities, read their Online Siksha profile pages, and talk to a counsellor before deciding — the \u201cbest\u201d university depends on the degree, budget and career you have in mind.",
  },
  {
    id: "compare-courses-fees",
    question: "How can I compare online university courses and fees?",
    answer:
      "Tick the Compare checkbox on any two university cards on this page to see them side by side, or open a university's detail page for the full course-and-fees section. Program fees differ significantly between universities (the range shown on each card comes from the university's own published data), so always compare on the basis of total program fee for your specific course, not the brochure-wide minimum.",
  },
  {
    id: "eligibility-check",
    question: "What eligibility requirements should I check before applying?",
    answer:
      "Ask specifically: the required entry qualification (e.g. a recognised bachelor's degree, with or without mathematics), minimum marks, whether any entrance or work-experience rule applies, documentation deadlines, and reserved-category relaxations if relevant. University profile pages on Online Siksha carry the published eligibility for each program, but the university's own admission page stays the final word.",
  },
  {
    id: "how-to-apply",
    question: "How do I apply for admission to an online university?",
    answer:
      "The common pattern is: shortlist programs, submit an application with scanned documents, pay the application or first-semester fee, and complete document verification (usually fully online, with exams either at home or at a designated centre depending on the university). Use the Apply Online button on Online Siksha for assisted applications, or apply directly through the university's official admission portal.",
  },
  {
    id: "verify-recognition",
    question: "How can I verify a university's recognition or accreditation?",
    answer:
      "For online degrees, the verification point is UGC-DEB entitlement: the university and the specific program must be listed on the UGC Distance Education Bureau portal (deb.ugc.ac.in) for the relevant academic year. NAAC grades, AICTE approvals and NIRF ranks are published by their respective bodies. Online Siksha card and profile pages show these credentials, and you can always cross-check them on the official portals before paying any fee.",
    officialUrl: OFFICIAL_ARIIA_PORTAL_URL,
    officialLinkLabel: "Verify on deb.ugc.ac.in",
  },
  {
    id: "scholarships-financial-assistance",
    question: "Are scholarships or financial assistance available?",
    answer:
      "Yes — universities typically offer merit-based concessions, alumni and defence/civil-service waivers, and some publish early-application discounts. Availability differs per university and usually per intake, so read each university's Scholarships section for its published schemes before relying on one. Zero-cost EMI through finance partners is widely used to spread the semester tuition into monthly instalments.",
  },
  {
    id: "course-duration",
    question: "How can I find the duration of an online course?",
    answer:
      "Each university card lists the number of programs; the university's Courses and Fees section lists every online program with its published duration (typically 2 years / 4 semesters for MBAs and MCAs, 3 years / 6 semesters for most undergraduate degrees) alongside per-semester and total fee. Degrees can only be completed in the standard minimum duration laid down by UGC for that program.",
  },
  {
    id: "before-enrolling",
    question: "What should I check before enrolling in an online degree?",
    answer:
      "Verify UGC-DEB entitlement for that program, the exam mode (with what in-person requirements, if any), the total cost including exam and study-material charges, the refund policy, and how a session's academic calendar (live classes, LMS access, examination windows) is supported. Keep copies of the fee-receipt and admission letter, and take time to compare at least two universities on this list for the same program before paying.",
  },
  {
    id: "official-information",
    question: "Where can I find official university admission information?",
    answer:
      "The university's own official website is the authoritative source for admission dates, fees and program rules — Online Siksha profile pages link there, and published Online Siksha data is verified against the university's public pages. Regulatory status is stated on the UGC (ugc.gov.in) and UGC-DEB portals. Be cautious of fee claims that do not appear on an official university page or admission letter.",
    officialUrl: OFFICIAL_UGC_PORTAL_URL,
    officialLinkLabel: "Visit ugc.gov.in",
  },
];

export default UNIVERSITIES_LISTING_FAQS;
