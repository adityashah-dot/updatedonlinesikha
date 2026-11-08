# TASK 09G - Exams Final Responsive QA & Regression Testing Report

## Scope

Browser-based QA for the implemented Exams pages (TASK 09F):

1. `/exams` - Exams listing.
2. `/exams/ips-exam` - Valid exam detail.
3. `/exams/non-existing-exam` - Invalid exam detail (not-found).

Plus regression spot checks for Blog detail and Course detail.

## Browser QA results (Chrome headless, CDP, 5 viewports)

Harness: `qa/runTask09ExamsFinalQa.mjs` (SPA static server on :3133, Chrome headless :9356).

| Viewport | /exams | /exams/ips-exam | /exams/non-existing-exam | Blog detail | Course detail |
|---|---:|---:|---:|---:|---:|
| desktop_1440 | overflow=false, h1=Exams, cards=10 | overflow=false, h1=IPS..., sections=21, tables=27, hero=true, hasFaq=true, toc=5 | overflow=false, h1=Exam not found | overflow=false, h1=..., prose=true, faq=5, toc=5 | overflow=false, h1=Online MBA, prose=true |
| laptop_1024 | overflow=false, h1=Exams, cards=10 | overflow=false, h1=IPS..., sections=21, tables=27, hero=true, hasFaq=true, toc=5 | overflow=false, h1=Exam not found | - | - |
| tablet_768 | overflow=false, h1=Exams, cards=10 | overflow=false, h1=IPS..., sections=21, tables=27, hero=true, hasFaq=true, toc=5 | overflow=false, h1=Exam not found | - | - |
| mobile_390 | overflow=false, h1=Exams, cards=10 | overflow=false, h1=IPS..., sections=21, tables=27, hero=true, hasFaq=true, toc=5 | overflow=false, h1=Exam not found | - | - |
| mobile_360 | overflow=false, h1=Exams, cards=10 | overflow=false, h1=IPS..., sections=21, tables=27, hero=true, hasFaq=true, toc=5 | overflow=false, h1=Exam not found | - | - |

Findings:
- No horizontal overflow on any tested page/viewport (scrollWidth <= innerWidth).
- Exams listing: h1="Exams", 10 cards rendered (API limit=10 per page), real API data returned (IPS, UPSC CSE/IAS/IFS, PSEB, CBSE, ISC, HBSE, UP Board, CUCET, etc.).
- Exams detail: h1="IPS Exam 2027: Exam Details, Eligibility, Syllabus, Age Limit"; 21 CMS sections rendered; 27 responsive tables rendered; hero present; FAQ section present; TOC rendered first 5 entries with "View more" behaviour; SEO title/description from CMS; canonical null (CMS canonical empty for IPS).
- Not-found: h1="Exam not found", no overflow, friendly copy + back link.

## Deep content check (post-fix)

`qa/runTask09ExamsDeepCheck.mjs` at desktop_1440 confirmed:
- Section headings now render: first three sections -> "Overview", "What Is Indian Police Service (IPS) Exam?", "IPS Exam 2027 Dates and Schedule" (h2Count=1 each).
- FAQ accordion questions render (8 IPS questions).
- TOC links render first 5 entries with correct titles.

## Issue found and fix

- Issue: Exam detail CMS section headings rendered empty (h2Count=0) for all sections.
- Root cause: `src/services/examApi.js` normalization read only `section.title`; the live CMS field is `section.heading` (verified via live detail API: section0 keys = ["heading","blocks"], heading="Overview").
- Fix: `normalizeSection` now reads `s.title || s.heading` (and `tocTitle || s.heading || s.title`).
- Re-verified post-fix via deep browser check (headings render) and exam service QA (9 OK).

## API integration verification

- Listing: `GET /exam-pages/filtered-list?...` -> 200 envelope with `data.exams/pagination/filters`; browser rendered 10 cards from real API data; service tests cover params, envelope, errors (9 cases OK).
- Detail: `GET /exam-pages/website/ips-exam` -> 200, status approved, 21 sections/blocks, richText + tables + FAQs + TOC; service tests normalize and pass (9 cases OK).
- SEO: detail page uses `exam.seo.meta.metaTitle`, `metaDescription`; canonical null when CMS value empty (graceful).

## Regression results

- Blog detail (`/blog/how-to-choose-online-university-india`): prose found, FAQ=5, TOC=5, no overflow at desktop_1440.
- Course detail (`/courses/online-mba`): prose found, no overflow at desktop_1440.
- Existing suites re-run: course QA 12 OK, blog QA 13 OK, exam service QA 9 OK (post-fix).

## Final verification

- `npm run lint` -> PASS.
- `npm run build` -> PASS.
- Existing Blog and Course QA -> PASS (course 12 OK, blog 13 OK).
- Exam service QA -> PASS (9 OK, post-fix).
- Browser QA (exams) -> no console errors, no horizontal overflow at any viewport.

## Deliverable

- Created: `qa/exams/task09g-final-qa-report.md`.

## Remaining limitations

- Filter option lists on listing derive defensively from response `filters` keys; exact CMS field names for options should be confirmed from a live listing payload.
- TOC shows first 5 entries initially with "View more" (existing BlogTOC behaviour).
- FAQ accordion is single-open with first item expanded (existing FaqAccordion behaviour).
- Listing cards show `limit=10` per page; pagination verified at service level only in browser QA (UI pagination present).
- Screenshots from this QA saved outside the repository under `C:/Users/GCV/AppData/Local/Temp/opencode/task09g` (no new screenshots added to repo).

## Next step

Await orchestrator task sequencing after TASK 09G sign-off.
