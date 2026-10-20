import { CURRENT_YEAR } from '../constants/years';

// Builds "{Name} Online {Topic} {Year}".
// shortName may already end in " Online" (e.g. "CU Online", "LPU Online") — strip it
// so the pattern is applied exactly once.
export function sectionTitle(shortName: string, topic: string, year = CURRENT_YEAR): string {
  const base = shortName.replace(/\s+Online$/i, '').trim();
  return `${base} Online ${topic} ${year}`;
}