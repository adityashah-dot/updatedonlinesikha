import { CURRENT_YEAR } from "../constants/years";
export function sectionTitle(shortName, topic, year = CURRENT_YEAR) {
  const base = shortName.replace(/\s+Online$/i, "").trim();
  return `${base} Online ${topic} ${year}`;
}
