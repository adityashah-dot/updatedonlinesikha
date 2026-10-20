# PLACEHOLDER CONTENT TRACKER

> Every item below contains **placeholder copy or placeholder data** that must be replaced
> with real CU / Amity content. Placeholders are written in **square brackets** so they are
> greppable and visible on the page.
>
> **Search:** `grep -rn "\[[A-Z][a-z]" src/data/universities/ src/components/university/`
> or use the table below.

**Last audited:** after the Amity Scholarships calculator + pillars parity work (Section Alignment workstream).

---

## HOW TO USE THIS FILE

1. Open the linked file + line.
2. Replace the whole bracketed string with your real content.
3. Remove the row from this table.
4. Re-run the audit (commands at the bottom) to confirm the page still matches LPU.

---

## CU ONLINE (`cu-online`)

### Overview tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| CU-O-01 | `bullets: []` | `src/data/universities/cuContent.ts:44` | `placements` — bullet list | Empty array — supply 3–4 real bullets |
| CU-O-02 | `bullets: []` | `src/data/universities/cuContent.ts:286` | `rankings` — bullet list | Empty array — supply real ranking bullets |
| CU-O-03 | `bullets: []` | `src/data/universities/cuContent.ts:314` | `why-choose` — bullet list | Empty array — supply real "why choose" bullets |

### Courses tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| CU-C-01 | `[Registration fee details]` | `src/components/university/UniversityPageCourses.tsx` | `fee-structure` — UG footer | Replace with CU's real registration fee |
| CU-C-02 | `[Specializations selected during second semester]` | `src/components/university/UniversityPageCourses.tsx` | `fee-structure` — PG footer | Replace with CU's real rule |
| CU-C-03 | `[Popular programmes description]` | `src/components/university/UniversityPageCourses.tsx` | `popular-programmes` | Generic copy |
| CU-C-04 | `[How you study description]` | `src/components/university/UniversityPageCourses.tsx` | `learning-platform` | Now driven by `campusAndLms.lmsPlatform` — verify the 4 rows |
| CU-C-05 | `lmsPlatform[].desc` | `src/data/universities/cu.ts` | `learning-platform` — 4 rows | Written from CU's real `lmsFeatures`; confirm wording |

### Learning Platform rows (new — needs sign-off)

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| LP-CU-01 | `lmsPlatformTitle` | `src/data/universities/cu.ts` | `learning-platform` heading | "How You Study: The CU Digital Learning Platform" |
| LP-AM-01 | `lmsPlatformTitle` | `src/data/universities/amity.ts` | `learning-platform` heading | "How You Study: The Amity Amigo Learning Platform" |
| LP-AM-02 | `lmsPlatform[].desc` | `src/data/universities/amity.ts` | `learning-platform` — 4 rows | Written from Amity's real `lmsFeatures`; confirm wording |

### Admission tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| CU-A-01 | `[Application step description]` ×4 | `src/data/universities/cuContent.ts:221-224` | `application-process` — 4 steps | Primary source (data-driven) |
| CU-A-02 | `[Application step description]` ×4 | `src/components/university/UniversityPageAdmission.tsx:120-123` | `application-process` — fallback | Template fallback when data is absent |
| CU-A-03 | `[Document note]` | `src/components/university/UniversityPageAdmission.tsx:450` | `documents-required` — per-document note | Doc *names* are real; the note is not |
| CU-A-04 | `// PLACEHOLDER - replace with real CU Online admission stats.` | `src/data/universities/cuContent.ts:205` | `admission-highlights` — 4 stat tiles | Stats exist but are unverified |

### Scholarships tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| CU-S-01 | `[Pillar body — …]` ×6 | `src/data/universities/cuScholarships.ts:34,42,50,58,66,74` | `scholarship-schemes` — 6 pillar cards | Replace all 6 bodies with real scheme descriptions |
| CU-S-02 | **temporary percentages** | `src/data/universities/cuScholarships.ts` (`CU_SCHOLARSHIP_RULES`) | `scholarship-calculator` | Rule `percent` values are illustrative, **not real**. Confirm before launch |
| CU-S-03 | `Early Bird` / `Merit` / `Defence` rule labels | `src/data/universities/cuScholarships.ts` | `scholarship-calculator` | Rule `condition` strings (`marks >= N`) also need confirming |

---

## AMITY ONLINE (`amity-online`)

### Overview tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| AM-O-01 | *(none outstanding)* | `src/data/universities/amityContent.ts` | `reviews-section`, `overview` | Real content already in place |

### Courses tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| AM-C-01 | `[Counseling strip copy]` | `src/components/AmityCoursesView.tsx` | `counselor-helpline` | New section — LPU has it, Amity didn't |
| AM-C-02 | `[Registration fee details]` | `src/components/AmityCoursesView.tsx` | `fee-structure` — UG footer | Replace with Amity's real registration fee (₹1,100 in `amityContent.ts`) |
| AM-C-03 | `[Specializations selected during second semester]` | `src/components/AmityCoursesView.tsx` | `fee-structure` — PG footer | |
| AM-C-04 | `[Diploma callout copy]` | `src/components/AmityCoursesView.tsx` | diploma callout | Only if Amity has diploma courses |

### Admission tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| AM-A-01 | `[Examination pattern step]` | `src/components/AmityAdmissionView.tsx` | `examination-pattern` | New section — mirrors LPU's `examination-pattern` |
| AM-A-02 | `[Callback form title]` | `src/components/AmityAdmissionView.tsx` | `counseling-callback` | Dark banner form |
| AM-A-03 | `[Application process step]` | `src/data/universities/amityContent.ts` | `application-process` | Verify 4 steps exist |

### Scholarships tab

| # | Placeholder | File : line | Section it feeds | Notes |
|---|-------------|-------------|------------------|-------|
| AM-S-01 | `[Pillar body — …]` ×6 | `src/data/universities/amityScholarships.ts:41,49,57,65,73,81` | `scholarship-schemes` — 6 pillar cards | New LPU-parity section; replace all 6 bodies |
| AM-S-02 | **temporary percentages** (12 / 20 / 25 / 50) | `src/data/universities/amityScholarships.ts` (`AMITY_SCHOLARSHIP_RULES`) | `scholarship-calculator` | **Illustrative only.** Amity's real waiver % must be supplied |
| AM-S-03 | `Early Bird` / `Merit` / `Defence` rule labels | `src/data/universities/amityScholarships.ts` | `scholarship-calculator` | Rule `condition` strings (`marks >= N`) also need confirming |

> Amity's own scholarship sections (`highlights`, `types`, `aonsat`, `courses-covered`,
> `benefits`, `how-to-apply`, `documents`, `comparison`, `scholarship-faqs`) are **intentionally
> unchanged** — they are Amity-specific extras, not placeholders.

---

## CROSS-CUTTING (both universities)

| # | Placeholder | File : line | Notes |
|---|-------------|-------------|-------|
| X-01 | `SITE_BLOG_POSTS` | `src/data/siteBlogPosts.ts` | LPU's 5 posts render on CU + Amity. Supply per-university posts. |
| X-02 | `Latest News` `author` | `src/data/apiData.ts` | LPU shows "By Himanshi, Content Creator" — CU/Amity show none |
| X-03 | Campus marquee images | `CuOverviewView.tsx` / `AmityOverviewView.tsx` | Both reuse **one** image twice with 2 alt texts. Supply real campus photos. |
| X-04 | Recruiter logos | `cu.ts` / `amity.ts` | Both list the same 7–8 MNCs. Verify CU's real list. |
| X-05 | `campusDetails` missing | `src/data/universities/cu.ts` | CU has no `campusAndLms.campusDetails`; Amity does (`amity.ts:274`). Section hides for CU. |
| X-06 | `testimonials` | `src/data/universities/cu.ts:434` | 5 entries present — **verify wording** before launch |

---

## HOW TO VERIFY A FIX LANDED

```bash
npm run lint          # tsc --noEmit — must be clean
node analyze.cjs      # section order + computed styles per tab
node design.cjs       # computed card/table/palette comparison vs LPU
node regress2.cjs     # height regression vs recorded LPU baselines
node check-runtime.cjs # section ids + console errors on every tab
```

Expected after all fixes:
- `lpu/*` rows → `0%` (except LPU admission, already approved at −1.1% / −0.3%)
- `amity/*` → growth only from the sections intentionally added
- `cu/*` → new section counts matching LPU

---

## FINAL SECTION PARITY MAP (verified)

LPU is the master. Every LPU section id exists on CU and Amity with the same
title pattern (`{Name} Online {Topic} {Year}`) and the same relative order.
Only entries marked *(extra)* have no LPU counterpart.

### Overview

| LPU (14) | CU (17) | Amity (16) |
|---|---|---|
| latest-news | latest-news | latest-news |
| highlights | **why-choose** *(extra)* | highlights |
| courses-fees | courses-fees | courses-fees |
| popular-programmes | popular-programmes | popular-programmes |
| eligibility-criteria | eligibility-criteria | eligibility-criteria |
| admission-process | admission-process | admission-process |
| — | — | **admission-dates** *(extra)* |
| rankings | rankings | rankings |
| examination-pattern | examination-pattern | examination-pattern |
| placements | placements | placements |
| — | **scholarships** *(extra)* | **scholarships** *(extra)* |
| campus | campus | campus |
| sample-degree | sample-degree | sample-degree |
| — | **admission-deadline** *(extra)* | — |
| reviews-section | reviews-section | reviews-section |
| compare-colleges | compare-colleges | compare-colleges |
| blogs | blogs | blogs |

### Courses

| LPU (8) | CU (9) | Amity (10) |
|---|---|---|
| fee-structure | fee-structure | **courses-fees** *(extra — summary table)* |
| all-courses | all-courses | **admission-dates** *(extra)* |
| admission-dates | admission-dates | fee-structure |
| learning-platform | learning-platform | learning-platform |
| — | **popular-programmes** *(extra)* | all-courses |
| student-reviews | student-reviews | student-reviews |
| faqs | faqs | faqs |
| blogs | blogs | blogs |
| counselor-helpline | counselor-helpline | **compare-colleges** *(extra)* |
| — | — | counselor-helpline |

> Amity's `courses-fees` (summary table) is complementary to `fee-structure`
> (detailed UG/PG breakdown) — its "View Fee Structure" button deep-links to
> the latter. No duplication.

### Learning Platform & Student Reviews — shared components (LPU-identical)

Both sections are now rendered by shared components used by CU **and** Amity:

| Component | File | Renders | Layout (measured, 1366px) |
|---|---|---|---|
| `LmsPlatformSection` | `src/components/university/LmsPlatformSection.tsx` | `learning-platform` | `x=43 w=1280`, content `x=75` — identical to LPU |
| `StudentReviewsSection` | `src/components/university/StudentReviewsSection.tsx` | `student-reviews` | `x=0 w=1366` full-bleed `bg-white`, content `x=43` — identical to LPU |

| | LPU | CU | Amity |
|---|---|---|---|
| Section heading | "How You Study: The LPU e-Connect Platform" | "How You Study: The CU Digital Learning Platform" | "How You Study: The Amity Amigo Learning Platform" |
| TOC label | "How You Study (LPU e-Connect Platform)" | "How You Study (CU Digital Learning Platform)" | "How You Study (Amity Amigo Learning Platform)" |
| Reviews heading | "LPU Online Reviews" | "CU Online Reviews" | "Amity Online Reviews" |
| Reviews TOC label | "LPU Online Student Reviews & Ratings" | "CU Online Student Reviews & Ratings" | "Amity Online Student Reviews & Ratings" |

> Amity's Courses page was restructured so `fee-structure`, `learning-platform`,
> `all-courses`, `student-reviews` and `counselor-helpline` render at **page level**
> (siblings of the card container) exactly like LPU's Courses tab.

### Admission

| LPU (12) | CU (12) | Amity (13) |
|---|---|---|
| admission-highlights | admission-highlights | admission-highlights |
| admission-dates | admission-dates | admission-dates |
| eligibility-criteria | eligibility-criteria | eligibility-criteria |
| admission-process | admission-process | admission-process |
| application-process | application-process | application-process |
| examination-pattern | examination-pattern | examination-pattern |
| documents-required | documents-required | documents-required |
| scholarship-schemes | scholarship-schemes | scholarship-schemes |
| counseling-callback | counseling-callback | counseling-callback |
| student-reviews | student-reviews | **admission-faqs** *(extra)* |
| blogs | blogs | student-reviews |
| compare | compare | blogs |
| — | — | compare-colleges |

### Scholarships

| LPU (2) | CU (5) | Amity (12) |
|---|---|---|
| scholarship-calculator | **scholarship-overview** *(extra — hero)* | scholarship-calculator |
| scholarship-schemes | scholarship-calculator | scholarship-schemes |
| — | scholarship-schemes | **highlights** *(extra)* |
| — | blogs | **types, aonsat, courses-covered, benefits, how-to-apply, documents, comparison, scholarship-faqs** *(8 extras)* |
| — | counselor-helpline | blogs |

> Amity's nine scholarship sections (`highlights` … `scholarship-faqs`) are
> **Amity-specific extras**, intentionally kept unchanged per requirement.

