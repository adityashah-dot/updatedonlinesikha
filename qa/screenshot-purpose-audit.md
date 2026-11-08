# Screenshot Purpose Audit — `qa/screenshots/`

Investigation-only deliverable. No screenshots were deleted, moved, renamed or modified, and no application code, UI, functionality or design was changed.

## 1. Screenshot Inventory

Scope audited: `qa/screenshots/` (all files and subdirectories).

### 1.1 Totals (computed from the file system)

| Area | Files | Bytes | Approx. size |
|---|---:|---:|---:|
| `qa/screenshots/` — root level | 137 | 113,164,737 | ~108.0 MB |
| `qa/screenshots/competitors/` | 3 | 374,251 | ~0.36 MB |
| `qa/screenshots/task03/` | 47 | 11,250,191 | ~10.7 MB |
| `qa/screenshots/task07_final/` | 23 | 4,363,966 | ~4.2 MB |
| `qa/screenshots/task08_final_review/` | 11 | 1,511,360 | ~1.44 MB |
| `qa/screenshots/task08_recruiters/` | 6 | 1,030,378 | ~0.98 MB |
| **Total `qa/screenshots/` (incl. subdirs)** | **228** | **131,742,379** | **~125.4 MB** |

Related capture areas outside the screenshots folder:

| Area | Files | Purpose |
|---|---|---:|
| `qa/viewports/` | 12 | Viewport-specific captures (`*_1366_vp.png`, `*_390_vp.png`, etc.) |
| `qa/batch1/` | 5 png + `audit.json` + `screenshots/home_768.png` | Nav/bottom-nav captures and audit |

### 1.2 Grouped inventory

| Group | Related requirement / task | Evidence |
|---|---:|---|
| `task03/` | TASK 03 — Online Courses Listing and Course Detail visual improvement / content rendering. Captures include `courses-listing_*`, `course-detail-{ba,bca,egmp,mba,mca}_*`, `blog-detail_*`, `counselling-banner_*`, `*-fee-comparison-table_*`, `*-syllabus_*`, `syllabus-redesign_*`. | Task brief for the current TASK 03 and capture naming convention (`<page>_<variant>_<viewport>.png`). |
| `task07_final/` | TASK 07 final acceptance/QA — university detail sections (fee/highlight/multi-column tables, heroes). | Capture names (`fee_table_*`, `hero_*`, `highlights_table_*`, `multi_col_table_*`). |
| `task08_final_review/` | TASK 08 — final review of LPU online course pages + BCA. | `qa/runTask08FinalReview.mjs` output dir + names (`lpu_online_*`, `online_bca_*`, `bca_aiml_no_recruiters_1440.png`). |
| `task08_recruiters/` | TASK 08 — recruiter QA for BCA; reference capture of university detail. | `qa/runTask08RecruiterQa.mjs` output dir + names (`recruiters_online_bca_*`, `bca_aiml_no_fake_recruiters_*`, `reference_university_detail_desktop_1440.png`). |
| `competitors/` | Competitor comparison QA (MBA syllabus screenshots). | Folder purpose implied by file names (`careers360_mba_syllabus.png`, etc.). |
| Root level | QA audit captures for home / university pages (home_*, lpu-*, university-listing_*, regress-*, verify-*, parity-*, check-*, cu-*, amity-*, tabstrip-*, bottomnav/nav, generic `1366.png` / `390.png`). | Cross-referenced by `qa/audit.json` (`screenshot` fields) and QA batch artifacts. |

## 2. Current Usage and Dependencies

- **Actively written by QA scripts:**
  - `qa/runTask08FinalReview.mjs` → `SCREENSHOT_DIR = qa/screenshots/task08_final_review` (writes `online_bca_*`, `lpu_online_*`, `bca_aiml_no_recruiters_1440.png`).
  - `qa/runTask08RecruiterQa.mjs` → `SCREENSHOT_DIR = qa/screenshots/task08_recruiters` (writes `recruiters_online_bca_*`, `bca_aiml_no_fake_recruiters_*`, `reference_university_detail_desktop_1440.png`).
- **Referenced by QA data:**
  - `qa/audit.json` contains per-viewport `screenshot` fields such as `lpu-overview_320.png`, `lpu-admission_768.png`, `lpu-courses_1366.png`, `lpu-scholarship_1920.png`, `university-listing_1024.png`, `home_1366.png`, etc. — these filenames exist in the `qa/screenshots/` root.

## 3. Whether the Original Requirement Is Still Relevant

- The task-scoped directories (`task03`, `task07_final`, `task08_final_review`, `task08_recruiters`) map to task executions that are part of the ongoing OnlineSiksha QA history; their relevance is tied to the lifecycle of those tasks (implementation QA → final QA → recruiter QA).
- The root-level captures are consumed/emitted by QA audit artifacts (`qa/audit.json`, batch audits) for home and university pages; their relevance continues while those regression/audit flows remain in use.
- No explicit retention policy or deletion decision was found in the repository.

## 4. Unclear or Unidentified Screenshots

- `qa/screenshots/1366.png` and `qa/screenshots/390.png` — generic unnamed captures; purpose not identifiable from references.
- `qa/screenshots/check-cu-courses.png`, `qa/screenshots/check-lpu-courses.png` — likely ad-hoc "check" captures; no owner/purpose found.
- `qa/screenshots/parity-*.png` — likely parity/comparison captures; no referencing workflow found.
- `qa/screenshots/tabstrip-*.png`, `qa/batch1/**/nav-*.png`, `bottomnav-*.png` — navbar/tab QA captures; purpose tied to nav QA batches.

## 5. Findings and Recommendations

### Findings

1. **Actual volume:** `qa/screenshots/` contains 228 files totalling ~125.4 MB (137 files / ~108.0 MB at root level alone). This is larger than the "approximately 40–70 screenshots" estimate in the task brief.
2. **Active QA consumers:** only `task08_final_review/` and `task08_recruiters/` are written by live scripts under `qa/`. Their purpose is TASK 08 final review and recruiter QA respectively.
3. **Data-referenced captures:** `qa/audit.json` references root-level screenshots for home/university routes and viewports; those files exist and are therefore "in use" by the QA audit trail.
4. **Task-scoped captures:** `task03/` captures align with the current TASK 03 (courses pages) requirements and appear to be the working set for that task's visual verification.
5. **No automated test / CI / visual-regression workflow** was found that consumes `qa/screenshots/` images directly (aside from the two TASK 08 scripts and the audit JSON data).

### Recommendations (evidence-based, no action taken)

- **Keep** `task08_final_review/` and `task08_recruiters/` while TASK 08 final-review / recruiter-QA work is active or pending sign-off.
- **Keep** `task03/` captures while TASK 03 (courses pages visual improvement / content rendering) is in progress or awaiting final verification.
- **Keep** root-level captures while `qa/audit.json` / batch audit artifacts remain the source of truth for home and university page QA.
- **Review** unidentified captures (`1366.png`, `390.png`, `check-*.png`, `parity-*.png`, `tabstrip-*`) before any retention decision.
- **No deletions, moves or renames recommended yet** — a retention decision is pending after this audit.

## 6. Deliverable Summary

- Created: `qa/screenshot-purpose-audit.md`
- Investigated: `qa/screenshots/` (228 files / ~125.4 MB including subdirs; 137 files / ~108.0 MB at root level)
- Findings: task-scoped QA captures identified by folder (`task03`, `task07_final`, `task08_final_review`, `task08_recruiters`, `competitors`); root-level captures tied to QA audit data (`qa/audit.json`).
- Action taken: investigation only; no files or application code were changed.

---

**End of audit.**
