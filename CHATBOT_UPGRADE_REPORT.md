# Online Siksha AI Chatbot — Grounded-Knowledge Upgrade Report

## 1. Exact data flow (source of truth)

```
College API (api.degreefyd.com/api/b2c, Bearer VITE_API_TOKEN)
  GET /website/colleges/listing?...&mode=online&limit=500    → 118 universities (slugs, locations)
      │  (whenever the live UI needs the same data it reads src/services/collegeApi.js —
      │   the server engine re-implements fetchers because it runs in Node, not Vite)
  GET /website/colleges/{slug}                               → detail (overview, fees table, placements, sections)
  GET /website/colleges/courses-new/{collegeId}?page=0&limit=25 → per-course fee/duration data
      ▼
src/services/chatbotDataset.mjs  (server-only module)
  buildKnowledgeRecords() — mirrors the live page mappers (src/services/overviewMapper.js,
  collegePageLoader.js); nothing is invented: a record exists only if the API field exists.
      ▼
data-cache/chatbotDataset.json   (single source of truth for the bot)
      ▼
server.js /api/chat  → answerChat() → grounded Gemini call OR template fallback
      ▼
src/components/chat/GeminiChatbot.jsx (existing chatbot UI, unchanged design)
```

No second chatbot was created; the existing `GeminiChatbot.jsx` + Gemini API provider remain.

## 2. Hash-stamped structured dataset

- Every record carries: `universityId` (slug), `universityName`, `category` (overview, fees, accreditation,
  placements, courses, eligibility, admission, deadlines, exams, scholarships, faqs), `question`, `answer`,
  `source` ("online-program-listing" | "college-detail" | "college-courses" | "course fees"), `sourceUrl`,
  `lastSyncedAt`, `isActive`, and a SHA-1 `contentHash` of the exact facts emitted.
- Universities block carries `listingHash` (hash of the raw listing entry) + `detailSyncedAt`.
- Current live dataset: **118 universities / 2244 records / ~2.1 MB** in `data-cache/chatbotDataset.json`.
- One real API gap found and handled: `mangalayatan-university-distance-and-online-programs` returns HTTP 404
  on the detail endpoint — the bot keeps that university's listing-level facts instead of dropping it.

## 3. What sync refreshes, when, and how to configure

- Syncs run: at server boot; every `CHATBOT_SYNC_INTERVAL_HOURS` (if > 0); via CLI
  `npm run sync:knowledge` (`node scripts/syncChatbotKnowledge.mjs`, `--details=N` budgets detail fetches,
  `--force` re-fetches all details); or protected POST `/api/chatbot/sync`.
- Detail-fetch budget logic: a university's detail pages are re-fetched when (a) it is new, (b) its
  `listingHash` changed, or (c) it has no `detailSyncedAt` yet (progressive catch-up — used to complete the
  first 25/118 → 117/118 enrichment over two runs; re-runs with no API changes fetch 0 details).
- Failure retention: if the listing API fails, the previous dataset is retained and bot answers keep working
  (unit-tested). If a detail 404s, only that university's detail facts are skipped; records stay consistent.
- Content-hash dedupe means unchanged facts update nothing; changed facts update in place (no duplication).

## 4. Retrieval & answer pipeline

`answerChat()` (chatbotDataset.mjs):
1. `detectIntent` → fees / admission / eligibility / placements / compare / courses / overview / general.
2. `matchUniversities` — brand matching via name tokens + curated `UNIVERSITY_ALIASES` (LPU, CU, Jain, Amity,
   Manipal, and the online/distance twins per brand), with the online-program preference, top-score
   threshold, and 2-match allowance for explicit comparison queries.
3. `searchRecords` — intent-boosted, stemmed keyword scoring over active records; balanced mix across
   overview/fees/admission/eligibility; without a brand match a substantive overlap (score ≥ 6) is required.
4. If an AI key exists: Gemini (`temperature: 0.35`, 45 s timeout) with a system instruction that restricts
   answers to the provided records; otherwise a template answer that renders only dataset facts.
5. Response: `{ text, sources (≤3 /universities/{slug} links), suggestions, dataNote (sync staleness) }`.

## 5. Hallucination protections (verified end-to-end)

- Model temperature 0.35 + grounded system prompt ("never invent fees, dates, deadlines; if the records do
  not contain it, say so").
- Fallback path (no/partial AI): templates render **only** record fields; unknown questions produce
  "I don't have verified information for this in the university database." (tested).
- Records exist only from API-provided fields; the stale hand-written data in
  `src/data/chatbotKnowledge.js` is no longer used by the backend (left untouched, now dead export).
- Staleness surfaced to users via `dataNote` ("verified 2026-10-25, may change — check the official page").

## 6. Suggestions

- Initial: 8 curated starters (`QUICK_TOPICS`, Phase 7A) as chips in the existing chat UI.
- Contextual: after each assistant answer, ≤5 data-grounded follow-ups. Ground rule: a follow-up is offered
  only when the matched university's records can actually answer it (dataset-driven, capped, deduped;
  unit-tested including the missing-info case).

## 7. Protected backend

- Rate limit: 30 requests/min/IP on `/api/chat` → **429** after 30 (verified).
- Input validation: ≤16 messages, ≤1200 chars each, roles normalized; bad payloads → 400 (verified).
- Body limit: `express.json({ limit: "64kb" })` with a parse-error handler.
- `GET /api/chatbot/status`: sync state only, no secrets (verified).
- `POST /api/chatbot/sync`: requires `x-admin-token` matching `ADMIN_SYNC_TOKEN`; without it → **403**
  (verified), with it → 200 sync summary (verified).
- Optional scheduled auto-sync via `CHATBOT_SYNC_INTERVAL_HOURS`.
- New optional env vars: `ADMIN_SYNC_TOKEN`, `CHATBOT_SYNC_INTERVAL_HOURS`, `CHAT_RATE_LIMIT`, `SITE_ORIGIN`
  (used to build absolute source links; relative `/universities/{slug}` when unset).

## 8. Verification results

| Check | Result |
| --- | --- |
| Chatbot engine unit tests (`qa/chatbotKnowledge.test.js`) | 8/8 pass (record schema, derived-fields-only, detail-sections-only, hash/no-dupe/refresh, deactivation+retention, retrieval/brand-matching, missing-info non-fabrication, contextual suggestions) |
| Pre-existing suite (`universityApi`, `universityPagination`) | 10/10 pass — total **18/18** |
| `npm run lint` (tsc --noEmit) | clean |
| `npm run build` (vite) | success (frontend bundle +~1.4 kB from chat UI changes) |
| `qa/probeViteRender.mjs` (detail-view regression) | all OK (Overview/Courses/Admission/Scholarships for lpu-online, amity, cu, manipal, dmiher, jain) |
| Live server smoke (production mode, empty AI key) | `/api/chat` LPU-fee → grounded answer (₹50,000/sem, ₹2,00,000 total — LPU's own published FAQ), sources=1, suggestions=4; generic "hi" → honest no-data answer |
| Admin sync endpoint | 403 without token, 200 with token |
| Rate limit | 30 OK then 429 |

## 9. Suggested next steps (not implemented — awaiting approval)

- Delete now-dead twins: `src/components/chat/GeminiChatbot.tsx` (the live component is the `.jsx`) — plus
  the previously flagged dead-mapper cleanup, only with your approval.
- `src/data/chatbotKnowledge.js` is unused by the backend; its thin FAQ answers are superseded by the
  dataset. Candidate for deletion after you confirm nothing imports it.
- One-time `ADMIN_SYNC_TOKEN` must be set in the production `.env` (currently unset → sync endpoint always 403).
- If you want scheduled auto-refresh, set `CHATBOT_SYNC_INTERVAL_HOURS` (e.g. 6) in production; otherwise run
  `npm run sync:knowledge` in a cron/task-scheduler job.
- `mangalayatan-university-distance-and-online-programs` detail endpoint 404s upstream — worth reporting to
  the CMS team; the bot gracefully degrades for that one university.
- Gemini model IDs remain as configured (`gemini-3.5-flash` / eligibility via `modelChoice`); no capability
  was assumed or changed.
