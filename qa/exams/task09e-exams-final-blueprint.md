# TASK 09E - Finalize OnlineSiksha Exams Listing and Detail Design

## 1. Source and Verified Reference Data

- Real verified exam: IPS Exam (slug: `ips-exam`).
- Listing API `GET /exam-pages/filtered-list` with `sort=recommended-exams`, `page=1`, `limit=10`: HTTP 200; `data` contains `exams`, `pagination`, `filters`; pagination `currentPage=1`, `totalPages=5`, `totalRecords=43`.
- Detail API `GET /exam-pages/website/ips-exam`: HTTP 200; `status=true`; `data.exam` plus `sliderContent` (1 record) and `samplePapers=null`.
- IPS exam metadata: `_id=6ae3c0105ce230ea6d757505`, `pageId=EXM-EXAM-PAGE-012`, `slug=ips-exam`, `status=approved`, `title="IPS Exam 2027: Exam Details, Eligibility, Syllabus, Age Limit"`, `shortTitle="IPS Exam 2027:"`, `pageType=parent`, `pageSliderTitle=Overview`, `examMode=Online`, `fullForm=null`, `examDate=null`, `registrationRange={start:null,end:null}`, `resultDate=null`, `tags=[]`, `isRecommended=false`, `approvalDate=2026-11-06T17:19:17.222Z`.
- Sections: 21 sections, 21 blocks, all block type `richText`. HTML tables inside rich text: 27. FAQs: 8 via `pageLevelFaqs` (`faqHeadingText` = "IPS Exam 2027 FAQs"). Related exams: 0. Images: 0. Sample papers: null. Hero: empty. SEO: partial (metaTitle/metaDescription present, canonical empty; robots `index, follow`).
- Renderer: `BlockRenderer` supports `richtext` and `richText` -> `RichTextBlock`; sections via `BlogsRender` -> section id fallback `section-${index}`; TOC via `tableOfContents` anchors `#section-0`..#section-20.

Design note: the IPS record is a real content reference only. Other exams may have different section counts, block types, dates, images, related exams and sample papers; the design must be data-driven and conditional.

## 2. Design Foundation (must reuse OnlineSiksha visual identity)

- Typography: Poppins (`font-sans` stack), weights used across headings/body.
- Tokens: primary `#115eaf`, primary-hover `#084a8c`, primary-soft `#e7eeff`, primary-border `#d5e3ff`, heading `#000f22`, text `#1f2937`, text-2 `#43474d`, text-muted `#6b7280`, border `#c4c6ce`, radius `8px`, container widths from existing layout.
- Reuse existing components rather than inventing new ones:
  - Listing: `BlogsListSection`/`BlogsSection` card patterns, `SectionHeader`, `ProgrammeCardsSection` card pattern, `CoursesPromoBanner` pattern if needed.
  - Detail: `CourseCmsContent`, `BlogArticleContent`, `BlogTOC`/`TableOfContents`, `BlogFAQ`/`FaqAccordion`, `SafeHtml`, `BlogHero`/`BlogHeader`, `BlogQuickBrief`, `BlogSidebar`, `ExaminationPatternSteps`, `AdmissionFlowSteps`, `StudentTestimonials`, `CompareCollegesSection`, `BlogsListSection`.
  - Shared block rendering: `src/components/blog/BlockRenderer.jsx` (richtext/richText, banner, cta, gallery, spec_list, feature_cards, step_flow, syllabus, admission_flow, placement_stats, step_flow_with_desc, testimonials, image, compare, certificate_grid, blogs, faq, courses_list, course_specialization_list, resource_grid, resources, faqBlock, live_news).
- Do not change navbar/footer. No new packages. No production code changes in this task.

## 3. Exams Listing Page - `/exams` - Final Design

### 3.1 Content blocks

1. Breadcrumb: Home / Exams.
2. Page header: h1 "Exams", description "Exam guides and important dates." (from existing usePageMeta).
3. Toolbar: search field; filters - Category, Level, Stream; sort (default `recommended-exams`).
4. Results: exam cards grid/list.
5. Pagination.
6. States: loading, empty, error.

### 3.2 Visual layout - Desktop (mockup)

```
+--------------------------------------------------------------------------+
| Breadcrumb: Home / Exams                                                  |
|                                                                              |
|  [ H1: Exams ]                                                            |
|  [ p: Exam guides and important dates. ]                                  |
|                                                                              |
|  [ Search....................... ]              [ Sort v]                 |
|  [ Category v ] [ Level v ] [ Stream v ]                                 |
|                                                                              |
|  Filters sidebar (optional)            |  Exam cards grid (2-3 col)      |
|  - Categories                         |  +-----------------------------+   |
|  - Levels                             |  | Card: logo/title/mode/dates|   |
|  - Streams                            |  +-----------------------------+   |
|                                       |  | Card ...                     |   |
|                                       |  +-----------------------------+   |
|                                       |                                  |
|                                       |  Pagination                     |
+--------------------------------------------------------------------------+
```

Design decision: use a top toolbar (search + filter selects + sort) for simplicity and consistency with existing list pages, OR sidebar on desktop. Final design: top toolbar row + responsive card grid; filters as selects/chips that collapse on mobile into a filter row or drawer. To stay close to existing patterns (Blog/Course lists use search + category chips), use: search + horizontal filter chips/selects + results grid.

### 3.3 Tablet and mobile

- Tablet (768): single column; toolbar stacks (search full width; filters 2-col grid).
- Mobile (<640): single column; card grid 1 col; filters in a collapsible row or select-based; pagination compact.

### 3.4 Exam card design

- Card: white bg, border, radius 8, padding 16-20; hover border primary + soft shadow.
- Card content: logo area (56-72px rounded square or circle; fallback exam-icon if no logo - IPS logo empty), title (Poppins, 2-line clamp, primary heading color), fullForm (small muted text) when present, mode badge (Online/Offline/Both) - primary-soft bg, primary text; meta rows: Exam date, Registration range, Result date - only when data exists; muted "To be announced" when null is a graceful empty state (not fabricated content).
- Footer/action: "View Details" link -> `/exams/${slug}` (slug-based navigation), styled as text link with arrow or primary button.

### 3.5 States

- Loading: skeleton cards (3-6) with shimmer.
- Empty: icon + "No exams found." + "Reset filters" action.
- Error: message + "Try again" action.

### 3.6 Pagination

- From `pagination` (currentPage, totalPages, totalRecords); numbered buttons + prev/next; resets to page 1 on filter change.

## 4. Exam Detail Page - `/exams/:slug` - Final Design

### 4.1 Hero

- Breadcrumb: Home / Exams / {exam title}.
- Hero band (soft primary background): h1 exam title (fallback shortTitle when title long? design: use title; shortTitle used for card display), meta chips row: Mode (examMode), Exam date (when present), Registration (when present), Result (when present). CTA row from `hero.buttons` (renders only when non-empty; IPS hero buttons empty -> design renders no fabricated CTA).
- Right side or below: no image for IPS -> design uses icon/illustration placeholder only when image present; otherwise omit.

### 4.2 Body layout

- Main column + right sidebar (desktop): TOC sticky (from `tableOfContents` anchors #section-N; fallback section-${index}). Mobile: TOC collapses (chips/accordion).
- Main column: sections in order. Each section: h2 (headingLevel default h2) + richText content (SafeHtml) with responsive tables.
- Content column max-width ~820px for text; wider for data-heavy sections? Keep single column for simplicity, consistent with blog article.

### 4.3 Section rendering spec

- `<section id={section.key || section.id || section-${index}}>` with heading `section.title || section.heading`, headingLevel default h2, tocTitle passed to SectionHeading.
- Rich text: paragraphs, lists, headings, links, inline HTML tables. Render via SafeHtml; tables wrapped in overflow container, styled with border/radius, header row primary-soft.
- Spacing: section padding block ~48px; first section tighter.

### 4.4 FAQ

- Render when `pageLevelFaqs.length > 0`; heading from `faqHeadingText` stripped of HTML; items with question + HTML answer -> FaqAccordion + SafeHtml.
- Placement: after content sections (full width) or in sidebar. Design: after content, full-width section, max-width 820.

### 4.5 Optional sections

- Related exams: render only when data exists (IPS: empty -> hidden). Reuse SimilarExams/Online_Exams pattern.
- Sample papers: only when present (IPS: null -> hidden).
- Other block types: render when block type present; unknown types -> null.

### 4.6 States and fallbacks

- Detail not found: "Exam not found" + back to all exams (existing behavior).
- Loading: skeleton hero/sections/TOC/FAQ.
- Missing optional data (hero, dates, images, related, sample papers): conditional rendering; graceful empty states; no fabricated values.

### 4.7 Visual layout - Desktop / Tablet / Mobile (ASCII)

Desktop:
```
+--------------------------------------------------+
| Breadcrumb: Home / Exams / IPS Exam 2027        |
|                                                  |
| [ Hero band: h1, meta chips, CTA (if any) ]    |
|                                                  |
|  [ TOC sidebar ]  [ section-0 ... section-20 ]   |
|   (sticky)         [ richText w/ tables ]        |
|                  [ FAQ ]                          |
+--------------------------------------------------+
```

Tablet: TOC collapses to top chips or hidden (content first). Mobile: single column; TOC as collapsible.

## 5. IPS Content-to-Design Mapping (21 sections)

Map verified IPS sections to design elements (design reference only):

| # | Section heading | Design element |
|---|---|---|
| 0 | Overview | Rich text intro under h2 |
| 1 | What Is Indian Police Service (IPS) Exam? | Rich text + HTML table |
| 2 | IPS Exam 2027 Dates and Schedule | Rich text + HTML table (dates) |
| 3 | IPS Eligibility Criteria 2027 | Rich text + 5 HTML tables |
| 4 | UPSC IPS Exam Pattern 2027 | Rich text + 4 HTML tables |
| 5 | UPSC IPS Syllabus | Rich text + 3 HTML tables |
| 6 | UPSC IPS Notification 2027 | Rich text + table |
| 7 | IPS Exam 2027 Application Form | Rich text + table |
| 8 | IPS Vacancies 2027 | Rich text + table |
| 9 | Services in the UPSC CSE | Rich text + table |
| 10 | IPS Selection Process 2027 | Rich text + table |
| 11 | UPSC CSE Result 2027 for IPS | Rich text |
| 12 | UPSC CSE Admit Card 2027 | Rich text |
| 13 | UPSC CSE Exam Analysis 2026 | Rich text + table |
| 14 | IPS Training and Career Progression | Rich text + table |
| 15 | IPS Rank Structure | Rich text + table |
| 16 | IPS Exam Preparation Tips 2027 | Rich text |
| 17 | IPS Salary 2027 | richText |
| 18 | Difference Between IAS and IPS | Rich text |
| 19 | IPS Physical Fitness Preparation | Rich text + table |
| 20 | IPS Exam Books and Study Material | Rich text |

## 6. Responsive and UX requirements

- Breakpoints: mobile (<640), tablet (768), desktop (>=1024) consistent with existing system.
- Tables: horizontal scroll wrapper on all breakpoints.
- Font scaling: Poppins with clamp or existing heading sizes.
- TOC: desktop sticky left; mobile collapsible (details/summary or in-page chips).
- Cards: 1 col mobile, 2 col tablet, 3-4 col desktop.

## 7. Design-only constraints and next step

- No production code changes, no new packages, no commit/push/deploy in this task.
- No fabricated exam content; design uses verified IPS data and graceful fallbacks for missing fields.
- Do not assume identical CMS blocks across exams; design renders optional sections conditionally.

## 8. Deliverable Status

- Design blueprint created: `qa/exams/task09e-exams-final-blueprint.md`.
- Next: await design approval before implementation.
