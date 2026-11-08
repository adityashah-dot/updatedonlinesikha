# TASK 09B - OnlineSiksha Exams Page Research and Codebase Audit

Source of truth (TASK 09A research): C:\degreefyd01\Aboutus_dyf\qa\exams-research\

## 1. Existing Codebase Audit (OnlineSiksha)

- Routes (src/App.jsx): /exams -> Exams, /exams/:slug -> ExamDetail.
- src/pages/Exams.jsx: consumes local getAllExams (src/data/exams.js); usePageMeta({ title: "Exams | Online Siksha", description: "Exam guides and important dates." }); breadcrumb Home / Exams; h1 Exams; simple ul of exams (Link to /exams/${slug}) each with category, h2 title, p excerpt, time date.
- src/pages/ExamDetail.jsx: getExam(slug); usePageMeta({ title: exam ? `${exam.title} | Online Siksha` : "Page not found | Online Siksha", description: exam?.excerpt }); not found -> "Exam not found" + Back to all exams; else breadcrumb Home / Exams / {title}; h1 title; p category + time; dl Exam date / Mode; article exam.content; Back to all exams.
- src/data/exams.js: mock exams: cuet-2027 (CUET 2027, Entrance, 2026-10-18, examDate May 2027, Online, "Dates, eligibility and pattern."), cat-2026 (CAT 2026, MBA, 2026-10-10, Nov 2026, Online, "Registration, syllabus and cutoffs."), nmat-2026 (NMAT 2026, MBA, 2026-10-02, Oct-Dec 2026, Online, "Pattern, fees and important dates."). content: "Exam content goes here." getAllExams sorts date desc; getExam finds by slug. Content is placeholder only.
- API layer: no dedicated exam service/mapper in src/services yet; CourseData (src/services/apiAdapter.ts) carries exam-related fields: overview.examinationPattern.intro + examPattern.steps (Array<any>), faq, testimonials, images {banner, primary, isBanner, alt}, seo, topRecruiters, recruiters; relatedExams not yet surfaced in OS mapper (DegreeFYD revamp reads exam.relatedExams).
- Reusable components available: src/components/ExaminationPatternSteps.jsx, SectionHeader.jsx, BlogsListSection.jsx/BlogsSection.jsx, ProgrammeCardsSection.jsx, FaqAccordion.jsx, StudentTestimonials.jsx, AdmissionFlowSteps.jsx, CollegeTableOfContents.jsx/TableOfContents.jsx, CompareCollegesSection.jsx, CourseCmsContent.jsx, CoursesPromoBanner.jsx, src/components/blog/* (BlockRenderer, BlogTOC, BlogFAQ, BlogSEO, SafeHtml, BlogHero, BlogHeader, BlogQuickBrief, BlogArticleContent, BlogSidebar, blog-detail.css), src/components/university/* sections, src/components/ui.
- Design/stack constraints: design system tokens (--primary #115eaf, radius 8, Poppins), no new packages, no navbar/footer changes, no production implementation in this task.

## 2. Competitor Research Findings

- Careers360: "List of Exams in India" hub; ~677 exams; filters (sort by popularity/application/exam/result dates/upcoming; stream, degree, mode, education level, exam type, classes, exam category, medium); per-exam content links: Application, Exam Pattern, Admit Card, Answer Key, Result, Cutoff, Preparation Tips, Counselling, College Predictor, Dates, Syllabus, FAQs; plus ebooks, mock tests, rank boosters, articles; subdomain-per-stream pattern (engineering., medicine., design., law., mba., university., competition., pharmacy., hospitality., studyabroad.); bottom sections Top Exams, College, Predictors and Ebooks, Resources.
- Collegedunia: "Entrance Exams in India"; category list (Engineering, Medical, Management, Science, Law, Arts, Pharmacy, Computer Applications, Education, Design, Architecture, Commerce, Paramedical, Agriculture, Dental, Class 12/10 Exams, Hotel Management, Mass Communications, Vocational Courses, Veterinary Sciences, Study Abroad Exams, Animation, Aviation); exam cards (JEE Main 2027, CUET 2027, JEE Advanced 2027, CAT 2026, TS EAMCET 2027, GATE 2027, BITSAT 2027, GMAT 2026, NMAT 2026, XAT 2027, CMAT 2027, OJEE 2027, GPAT 2027...) with mode, Exam Date, Application Form, Result Announce; sub-pages /exams/{slug}, /application-process, /exam-pattern, /practice-papers, /results, /mock-test.
- Shiksha: /exams returned 403 during research (bot protection); inspection pending.
- CollegeDekho: /exams redirected to a colleges article (Top Colleges in India 2026); not treated as an exam-listing finding.

## 3. Listing Blueprint (proposal)

- /exams hub: search + filters; exam cards: exam name with year, short name, mode, exam date, application window, result date; CTAs Apply Now / exam detail.

## 4. Detail Blueprint (proposal)

- /exams/{slug}: hero with exam name/year/mode; dates timeline; exam pattern via ExaminationPatternSteps; syllabus; important dates; FAQs via FaqAccordion/SafeHtml; related exams; resources.

## 5. DegreeFYD Data to OnlineSiksha Mapping

- Endpoints: /exam-pages/filtered-list (listing; params search/category/level/stream/sort default recommended-exams, page, limit=10; response success/data/filters/pagination), /exam-pages/website/{slug} (detail; json.data.exam; relatedexams fallback; revamp_exams reads exam.relatedExams), /exam-pages/toc-title/{id} (TOC; pageSliderTitle, slug), /sitemap (data.exams with slug, approvalDate), /redirects/check, /exam-pages/related-exams, /exam-pages/top-related-exams.
- Detail fields: seo meta/og/twitter/settings.robotsTag/canonical https://degreefyd.com/exams/${slug}, JSON-LD transformExamToSEOSchema; sections/toc/faqs/images{logo,hero}/topRecruiters.
- TOC mapping pageSliderTitle -> slug; sections -> BlogsRender -> BlockRenderer block types (richtext, banner, cta, gallery, specialization_list, spec_list, feature_cards, step_flow, syllabus, admission_flow, placement_stats, step_flow_with_desc, testimonials, image, compare, certificate_grid, blogs, faq, courses_list, course_specialization_list, resource_grid, resources, faqBlock, live_news).

## 6. Reusable Component Recommendations

- Reuse: ExaminationPatternSteps.jsx; FaqAccordion.jsx + SafeHtml.jsx; BlogsListSection/BlogsSection; ProgrammeCardsSection; SectionHeader; StudentTestimonials; AdmissionFlowSteps; CompareCollegesSection; blog/BlockRenderer etc.
- Likely new components (post-research, future task): ExamsListSection; ExamDetailHero; ExamDatesTimeline; RelatedExamsSection.

## 7. Missing Data and Implementation Risks

- OS exam content is placeholder ("Exam content goes here."); only 3 mock exams.
- No exam API service/mapper; apiAdapter exam fields partial (overview.examinationPattern).
- Content scale: exams render 22-45 headings; large content volumes.
- Competitor fidelity: Shiksha not captured (403); CollegeDekho listing not captured (redirect).

## 8. Desktop and Mobile Recommendations

- Hub: filterable grid/list; mobile: stacked cards/accordion.
- Detail: single column flow; pattern/syllabus/FAQ sections; responsive.

## 9. Deliverable Status

- TASK 09B research deliverable written: qa/exams/task09b-exams-research.md
- No production code changes in this task.

