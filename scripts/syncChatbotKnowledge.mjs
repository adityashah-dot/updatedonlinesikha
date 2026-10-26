/**
 * Manual chatbot knowledge sync.
 *
 * Usage: node scripts/syncChatbotKnowledge.mjs [--details=<n>]
 *   --details  max university detail pages to refresh in this run (default 25)
 *
 * Fetches the live online-university listing, refreshes detail-derived
 * knowledge records for new/changed universities (within the detail budget),
 * updates the dataset file data-cache/chatbotDataset.json without duplicating
 * records, deactivates removed universities, and prints a sync summary.
 * On any fetch failure the previous dataset is retained and staleness flagged.
 */

import { syncDataset } from "../src/services/chatbotDataset.mjs";

function argValue(name, fallback) {
  const hit = process.argv.find((arg) => arg.startsWith(name));
  if (!hit) return fallback;
  const eq = hit.indexOf("=");
  return eq === -1 ? fallback : hit.slice(eq + 1);
}

const detailLimit = Math.max(0, parseInt(argValue("--details", "25"), 10) || 0);
const forceAll = process.argv.includes("--force");

syncDataset({ detailLimit, forceAll })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
    if (!result.ok) console.warn(`Dataset retained from previous sync. Reason: ${result.error}`);
    process.exit(result.ok ? 0 : 0); // retention is still a successful command
  })
  .catch((error) => {
    console.error("Unexpected sync failure:", error);
    process.exit(1);
  });
