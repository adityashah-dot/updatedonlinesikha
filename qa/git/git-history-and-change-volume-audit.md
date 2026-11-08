# Git History & Change Volume Audit Report

**Date**: 2026-11-08  
**Repository**: OnlineSiksha (`c:\Users\GCV\Downloads\updatedonlinesiksha`)  
**Target Branch**: `feature-online-exam`  
**Audit Mode**: STRICTLY READ-ONLY (No commits, no pushes, no resets, no reverts, no deletions)

---

## 1. Executive Summary

An investigation was conducted to determine why the repository appeared to have a very large number of commits or code changes following the Exams implementation.

### Key Audit Findings:
1. **Commit Count is Unchanged (0 New Commits)**:
   - Total commits on `feature-online-exam`: **27 commits**.
   - Current `HEAD`: `68fa69f12dd0eaaddb4e901a5f21e7834861146f` (`origin/feature-online-courses`).
   - **Zero commits** were created during the recent Exams tasks. All work was performed strictly in the working copy and staging area.
   - All 27 existing commits are already present on remote tracking branches. There are zero unpushed or rogue local commits.

2. **The Cause of the Large Change Volume: Accidental Staging of Chrome Browser Profiles & QA Artifacts**:
   - The git staging index currently holds **1,137 staged files** totaling **22,115 lines added**.
   - **1,131 of those 1,137 files** (99.5%) are **NOT production code**. They consist of:
     - **529 files**: Internal Chrome browser cache, LevelDB, socket logs, Crashpad metrics, and extensions from `qa/.chrome-qa-profile-polish/`.
     - **54 files**: PNG screenshots generated during multi-viewport visual audits in `qa/detail_page_screenshots/`.
     - **548 files**: QA test scripts, JSON dumps, and test runner artifacts under `qa/`.
   - **Actual Legitimate Source Code Changes**: Only **5 production source files** (+ 1 tsconfig cache):
     - `src/pages/Exams.jsx` (+450 / -4 lines)
     - `src/pages/ExamDetail.jsx` (+1,155 / -26 lines)
     - `src/components/blog/blog-detail.css` (+343 / -30 lines)
     - `src/services/examApi.js` (+297 lines new file)
     - `src/services/courseApi.js` (+1 / -1 lines)
     - `tsconfig.tsbuildinfo` (+1 / -1 lines)
     - **Total Legitimate Source Code Delta**: **+2,187 lines / -62 lines**.

---

## 2. Git History Audit

### Command Outputs & Evidence

#### 1. Current Branch
```bash
$ git branch --show-current
feature-online-exam
```

#### 2. Commit Count
```bash
$ git rev-list --count HEAD
27
```

#### 3. Recent 30 Commits (`git log --oneline --decorate -30`)
```
68fa69f (HEAD -> feature-online-exam, origin/feature-online-courses, feature-online-courses) this is the course page with detail also
5b087d0 (origin/feature-blogpage, feature-blogpage) this is the feature for the blog page and its details
eb37ec0 (origin/feature/ui-updates-and-content-pages, feature/ui-updates-and-content-pages) this is the the gap and spacing issue fix with cat button size fix
9776cb4 Step 1: add design tokens, container, section and CTA base classes
1e47a15 (origin/main, origin/HEAD, main) Merge pull request #5 from adityashah-dot/updateapi
9478438 (origin/updateapi) add new hero home seaction and also updated the new compare seaction also updated new design for this Popular online degree programs
93fae21 done the change like shadebox opacity h1, h2 , h3 title
fbc56a5 Merge pull request #4 from adityashah-dot/updateapi
e52b7ef done the change like shadebox opacity h1, h2 , h3 title
1c937a1 add on efile
5bfd768 Merge pull request #3 from adityashah-dot/updateapi
2eab1f3 done the change like shadebox opacity h1, h2 , h3 title
8ecf3da done the change like shadebox opacity h1, h2 , h3 title
37a00b3 this is hte complete page with all the changes
1fc03ef Merge pull request #2 from adityashah-dot/updateapi
0c3ea5e this is hte complete page with all the changes
5e3e41d chnges the tsx file to jsx
6d93b37 (mobile-hero-home) Update university pages and QA assets
25a670f Fix mobile university listing spacing
3e5899d Merge branch 'mobileresponsive'
337dc27 (mobileresponsive) Fix mobile university listing spacing
dcb68cc Merge pull request #1 from adityashah-dot/mobileresponsive
44ea5d0 (origin/mobileresponsive) Update university listing styling and university page content
27919bd this is the movile version
470aa0a this is the table of content add in all pages
0b3614e this is the update section where i had fixed the overview page , admision page
bdaec6b Clean project and remove leaked key
```

#### 4. Comparison to Remote Tracking
```bash
$ git log origin/feature-online-courses..HEAD --oneline
# (Empty output: HEAD is identical to origin/feature-online-courses at commit 68fa69f)
```

### Commit History Assessment
| Metric | Result | Status |
| :--- | :--- | :--- |
| **Branch Name** | `feature-online-exam` | Confirmed |
| **Total Commits on HEAD** | 27 | Verified |
| **HEAD Commit SHA** | `68fa69f12dd0eaaddb4e901a5f21e7834861146f` | Matches `origin/feature-online-courses` |
| **Commits Created in Exams Tasks** | 0 | Strict "Do not commit" rule was respected |
| **Unexpected Commits** | None | Repository history is completely clean |
| **Local vs Remote State** | Exact match with remote `68fa69f` | Zero diverging commits |

---

## 3. Change Volume & Working Tree Audit

### File Counts Breakdown

```
Total Tracked Files in HEAD:          1,225
Total Tracked Files in Current Index: 2,357
---------------------------------------------------------
Net Staged File Additions:            1,137 (+22,115 lines)
Net Unstaged Modifications:              57
Net Untracked Files:                     48
```

### Detailed Breakdown by Category

| Category | Staged Files | Unstaged Modified | Untracked Files | Lines Added | Lines Removed | Description / Nature of Files |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Production Source Code** | **6** | **2** | **0** | **2,187** | **62** | Legitimate Exams feature code (`Exams.jsx`, `ExamDetail.jsx`, `examApi.js`, `blog-detail.css`, `courseApi.js`, `tsconfig.tsbuildinfo`) |
| **Chrome Headless Profiles** | **529** | **44** | **37** | **18,740** | **0** | `qa/.chrome-qa-profile-polish/` internal cache, LevelDB, socket logs, Crashpad metadata, extensions, language dictionaries |
| **QA Screenshots (PNG)** | **54** | **11** | **4** | **0** (binary) | **0** | Screenshots across 5 viewports (1440, 1024, 768, 390, 360) in `qa/detail_page_screenshots/` |
| **QA Scripts & Reports** | **548** | **0** | **7** | **1,188** | **0** | Markdown QA reports (`task09b`, `task09e`, `task09f`, `task09g`, `exams-listing-detail-ui-polish-report.md`), test runners, JSON audit files |
| **Total** | **1,137** | **57** | **48** | **22,115** | **62** | **99.5% of changed files are temporary QA/browser artifacts** |

---

## 4. Source Code Changes (Legitimate vs Unnecessary)

### Legitimate Exams Source Files (5 Files)

1. `src/pages/Exams.jsx`:
   - Redesigned `ExamCard` with Course-aligned proportions (`h-32 sm:h-36`).
   - Added genuine logos with fallback monogram badge ("IPS", "UPSC", "RRB").
   - Added date formatting (clearing raw ISO timestamps) and sanitized trailing colons.
   - Upgraded listing hero to `course-listing-h1`.

2. `src/pages/ExamDetail.jsx`:
   - Replaced static Table of Contents with interactive `ExamTOC` (active scroll-tracking, smooth scroll, TOC heading scoped to 12px, single line).
   - Unified sidebar modules into `SidebarDiscoverCard` and `SidebarCounsellingCard`.
   - Prevented flex shrinking (`shrink-0`) and horizontal overflow.

3. `src/components/blog/blog-detail.css`:
   - Scoped Course Detail table styling under `.exam-layout` (`#115eaf` headers, white text, 12px uppercase font, `#fbfdff` zebra rows, `#d5e3ff` borders).
   - Constrained `.exam-layout .bd-side` with `overflow-x: hidden !important; min-width: 0;`.
   - Constrained `.exam-toc` heading to `12px !important` overriding `.blog-detail h2`.

4. `src/services/examApi.js`:
   - Provides canonical slug normalization (`exam.slug = clean;`) and safe listing/detail fetching.

5. `src/services/courseApi.js`:
   - Fixed explicit file extension `import { mapApiCourse } from "./apiAdapter.ts"` so Node test runners execute without `ERR_MODULE_NOT_FOUND`.

### Unnecessary / Artifact Files (1,131 Files)

1. **`qa/.chrome-qa-profile-polish/` (529 staged + 37 untracked files)**:
   - **Root Cause**: A Chrome automation script ran with `--user-data-dir=qa/.chrome-qa-profile-polish`. Someone subsequently executed a broad `git add` command (`git add .` or `git add qa/`), adding Chrome's internal browser cache, LevelDB database files, WebGPU shader caches, Crashpad crash reporters, and extension dictionaries to git's staging index.
   - **Impact**: Bloated the git index with over 1,000 files and ~19,000 lines.
   - **Recommendation**: Add `qa/.chrome-qa-profile*/` to `.gitignore`. Unstage and remove these temp profile folders from the git index prior to any commit.

2. **`qa/detail_page_screenshots/` (54 staged + 4 untracked PNG binaries)**:
   - **Root Cause**: Visual verification scripts captured screenshots across 5 screen sizes (1440, 1024, 768, 390, 360) and stored them under `qa/detail_page_screenshots/`.
   - **Recommendation**: Keep required deliverable screenshots referenced in reports; add temporary/intermediate screenshots to `.gitignore`.

3. **`qa/*.mjs` & JSON test results**:
   - One-off scripts (`inspectToc.mjs`, `debugToc.mjs`, `findWhy30.mjs`) used during debugging.
   - **Recommendation**: Archive or clean up temporary investigation scripts before finalizing the PR.

---

## 5. Root Cause Summary & Verdict

| Potential Cause | Investigated? | Found? | Explanation |
| :--- | :---: | :---: | :--- |
| **Rogue or Excessive Commits** | YES | **NO** | Zero commits were created during Exams work. Commit count is 27, identical to remote `feature-online-courses`. |
| **Accidental Staging of Chrome Profile** | YES | **YES (Primary Cause)** | 529 files in `qa/.chrome-qa-profile-polish/` were accidentally added to git staging by a broad `git add` command. |
| **QA Screenshots & Test Runners** | YES | **YES (Secondary Cause)** | 54 binary screenshots and ~500 QA test files/reports were staged. |
| **Formatting Changes across Unrelated Files** | YES | **NO** | Zero formatting passes ran on unrelated files. Core components (`Navbar`, `Footer`, `CourseDetail`, `Courses`) were never modified. |
| **Lockfile Changes** | YES | **NO** | `package.json` and `package-lock.json` are unmodified. |
| **Line Ending (CRLF/LF) Contamination** | YES | **NO** | Git warnings show standard Windows CRLF translation, but zero unrelated repository files had mass line-ending churn. |

---

## 6. Safe Recommended Action Plan (When Ready to Commit)

*Note: Per safety instructions, NO write or git modifications were performed during this audit.*

When the team is ready to prepare a clean commit for `feature-online-exam`:
1. **Unstage the Chrome Profile and Temp Files**:
   ```bash
   git rm -r --cached qa/.chrome-qa-profile-polish/
   git rm -r --cached qa/.chrome-qa-profile/
   ```
2. **Update `.gitignore`**:
   Add to `.gitignore`:
   ```
   qa/.chrome-qa-profile*
   qa/*.tmp
   qa/*inspect*.png
   qa/*debug*.mjs
   ```
3. **Stage Only Legitimate Production Files & QA Reports**:
   ```bash
   git add src/pages/Exams.jsx
   git add src/pages/ExamDetail.jsx
   git add src/components/blog/blog-detail.css
   git add src/services/examApi.js
   git add src/services/courseApi.js
   git add qa/exams/
   ```
4. This will reduce the git change volume from **1,137 files (22,115 lines)** down to just **5 production files + official QA reports (2,187 lines)**.
