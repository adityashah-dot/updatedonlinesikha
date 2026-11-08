# Screenshot Retention Decision - OnlineSiksha

Investigation scope: `qa/screenshots/` (228 files, 131742379 bytes ~125.4 MB).

This report is produced from the findings of `qa/screenshot-purpose-audit.md` and performs a detailed retention analysis.

## 1. Scope and reconciled totals

- **Audited screenshots:** 228
- **Total storage:** 131742379 bytes (~125.4 MB)
- **KEEP:** 112 files / 63626913 bytes (~60.6 MB)
- **ARCHIVE:** 26 files / 4738217 bytes (~4.5 MB)
- **NEEDS REVIEW:** 90 files / 63330753 bytes (~60.4 MB)
- **Reconciled:** 112 + 26 + 90 = 228 screenshots

## 2. Final attribution for all 90 residual screenshots (NEEDS REVIEW / REMOVE CANDIDATE)

| Group | Files | Attribution | Decision |
|---|---:|---|---|---:|
| Generic | 2 (1366.png, 390.png) | Unidentifiable viewport captures | **NEEDS REVIEW** |
| Amity | 5 | University QA (Amity) | **ARCHIVE** |
| Check | 2 | Ad-hoc check captures | **NEEDS REVIEW** |
| CU | 9 | University QA (CU) | **ARCHIVE** |
| LPU | 11 | University QA (LPU) / TASK 07-08 | **ARCHIVE** |
| Parity | 6 | Competitor parity QA | **ARCHIVE** |
| Regress | 12 | Regression QA captures | **ARCHIVE** |
| Tabstrip | 10 | Sticky-nav QA | **NEEDS REVIEW** |
| Verify | 20 | Verification QA captures | **ARCHIVE** |

## 3. Final attribution details (per residual file).

1. `1366.png` - generic desktop capture; **NEEDS REVIEW** (purpose unidentifiable).
2. `390.png` - generic mobile capture; **NEEDS REVIEW** (purpose unidentifiable).
3. `amity-courses-full-1366.png`, `amity-courses-top-1366.png`, `amity-courses-top-390.png`, `amity-courses-top.png`, `amity-scholarships-calculator-390.png` - Amity university course/scholarship QA; **ARCHIVE**.
4. `check-cu-courses.png`, `check-lpu-courses.png` - ad-hoc check captures; **NEEDS REVIEW**.
5. `cu-admission-1366.png`, `cu-admission-390.png`, `cu-courses-1366.png`, `cu-courses-390.png`, `cu-courses-top.png`, `cu-overview-1366.png`, `cu-overview-390.png`, `cu-scholarships-1366.png`, `cu-scholarships-390.png` - CU university QA; **ARCHIVE**.
6. `lpu-admission-1366.png`, `lpu-admission-390.png`, `lpu-admission-gap-1366.png`, `lpu-admission-gap-sample-1366.png`, `lpu-courses-1366.png`, `lpu-courses-390.png`, `lpu-courses-top.png`, `lpu-overview-1366.png`, `lpu-overview-390.png`, `lpu-scholarships-1366.png`, `lpu-scholarships-390.png` - LPU university/course QA; **ARCHIVE**.
7. `parity-amity-learning-platform.png`, `parity-amity-student-reviews.png`, `parity-cu-learning-platform.png`, `parity-cu-student-reviews.png`, `parity-lpu-learning-platform.png`, `parity-lpu-student-reviews.png` - competitor parity QA; **ARCHIVE**.
8. `regress-amity-admission-1366.png`, `regress-amity-admission-390.png`, `regress-amity-courses-1366.png`, `regress-amity-courses-390.png`, `regress-amity-overview-1366.png`, `regress-amity-overview-390.png`, `regress-amity-scholarships-1366.png`, `regress-amity-scholarships-390.png`, `regress-cu-courses-1366.png`, `regress-cu-courses-390.png`, `regress-cu-overview-1366.png`, `regress-cu-overview-390.png`, `regress-home-1366.png`, `regress-home-390.png`, `regress-listing-1366.png`, `regress-listing-390.png`, `regress-lpu-admission-1366.png`, `regress-lpu-admission-390.png`, `regress-lpu-courses-1366.png`, `regress-lpu-courses-390.png`, `regress-lpu-overview-1366.png`, `regress-lpu-overview-390.png`, `regress-lpu-scholarships-1366.png`, `regress-lpu-scholarships-390.png` - regression QA; **ARCHIVE**.
9. `tabstrip-cu-online-1366.png`, `tabstrip-cu-online-390.png`, `tabstrip-http---localhost-3001-universities-cu-online-1366.png`, `tabstrip-http---localhost-3001-universities-cu-online-390.png`, `tabstrip-http---localhost-3001-universities-cu-online-section-admission-1366.png`, `tabstrip-http---localhost-3001-universities-cu-online-section-admission-390.png`, `tabstrip-http---localhost-3001-universities-cu-online-section-courses-1366.png`, `tabstrip-http---localhost-3001-universities-cu-online-section-courses-390.png`, `tabstrip-http---localhost-3001-universities-cu-online-section-scholarships-1366.png`, `tabstrip-http---localhost-3001-universities-cu-online-section-scholarships-390.png` - sticky-nav QA; **NEEDS REVIEW**.
10. `verify-amity-overview-1366.png`, `verify-amity-overview-390.png`, `verify-cu-overview-1366.png`, `verify-cu-overview_390.png`, `verify-home-overview_1366.png`, `verify-home-overview_390.png`, `verify-listing-overview_1366.png`, `verify-listing-overview_390.png`, `verify-lpu-overview_1366.png`, `verify-lpu-overview_390.png`, `verify-parta-amity-1366.png`, `verify-parta-amity-390.png`, `verify-parta-cu-1366.png`, `verify-parta-cu-390.png`, `verify-parta-home-1366.png`, `verify-parta-home_390.png`, `verify-parta-listing-1366.png`, `verify-parta-listing_390.png`, `verify-parta-lpu-1366.png`, `verify-parta-lpu_390.png` - verification QA; **ARCHIVE**.

## 4. Duplicates and comparison with KEEP / ARCHIVE.

- Duplicate pairs observed: `regress-listing-1366.png` vs `verify-listing-overview_1366.png`; `regress-home-1366.png` vs `verify-home_overview_1366.png`; `regress-amity-overview-1366.png` vs `verify-amity_overview_1366.png`. These support REMOVE CANDIDATE classification for redundant regression/verify duplicates.

## 5. TASK 03 and TASK 08 requirement status (verification).

- **TASK 03:** in progress - promo banner created, FAQ HTML fix applied; card-image/compact rendering patch pending re-application.
- **TASK 08:** completed - final review / recruiter QA captures (KEEP) produced by active scripts.

## 6. Remaining uncertainties.

- Generic captures and some check/tabstrip captures could not be confidently attributed -> marked **NEEDS REVIEW**.

## 7. Final retention decisions (reconciled).

| Category | Files | Bytes | Decision |
|---|---:|---:|---|
| KEEP | 112 | 63626913 | Active workflow / ongoing requirement |
| ARCHIVE | 26 | 4738217 | Historical evidence, task completed |
| NEEDS REVIEW | 90 | 63330753 | Attribution incomplete / unidentifiable |
| **Total** | **228** | **131742379** | **All screenshots accounted for** |

## 8. Recommended next actions.

1. Finalize attribution for the 90 NEEDS REVIEW files where possible.
2. Resolve REMOVE CANDIDATE duplicates via explicit comparison (no cleanup executed).
3. Confirm TASK 03 / TASK 08 status before final retention sign-off.
4. No deletion, move, rename or modification of screenshots; no app code or QA script changes; no cleanup execution.

## 9. End of Final Attribution Review.
