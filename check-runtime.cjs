const { chromium } = require('playwright');

const SLUG = { lpu: 'lpu-online', amity: 'amity-online', cu: 'cu-online' };
const BASE_URL = 'http://localhost:3001';

const PAGES = [
  ['amity', 'amity', 'scholarships'],
  ['amity-adm', 'amity', 'admission'],
  ['amity-crs', 'amity', 'courses'],
  ['amity-ovw', 'amity', 'overview'],
  ['cu-sch', 'cu', 'scholarships'],
  ['cu-adm', 'cu', 'admission'],
  ['cu-crs', 'cu', 'courses'],
  ['cu-ovw', 'cu', 'overview'],
  ['lpu-sch', 'lpu', 'scholarships'],
  ['lpu-crs', 'lpu', 'courses'],
  ['lpu-adm', 'lpu', 'admission'],
  ['lpu-ovw', 'lpu', 'overview'],
];

(async () => {
  const browser = await chromium.launch();
  let bad = 0;
  for (const [name, uni, tab] of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    const errs = [];
    page.on('console', (m) => {
      const t = m.text();
      if (m.type() === 'error' && !/vite|websocket/i.test(t)) errs.push(t);
    });
    page.on('pageerror', (e) => {
      if (!/vite|websocket/i.test(e.message)) errs.push('PAGEERROR: ' + e.message);
    });
    const url = tab === 'overview'
      ? `${BASE_URL}/universities/${SLUG[uni]}`
      : `${BASE_URL}/universities/${SLUG[uni]}?section=${tab}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(900);
    const ids = await page.$$eval('section[id]', (els) => els.map((e) => e.id));
    const tocLabels = await page.$$eval('[id*="toc"] a, nav a', (els) =>
      els.map((e) => e.textContent.trim()).filter((t) => t.length > 2)
    );
    console.log(`\n${name}  url=${url}`);
    console.log(`  sections(${ids.length}): ${ids.join(', ')}`);
    console.log(`  toc(${tocLabels.length}): ${tocLabels.slice(0, 20).join(' | ')}`);
    if (errs.length) { bad++; console.log('  ERRORS:'); errs.slice(0, 5).forEach((e) => console.log('   ! ' + e.slice(0, 200))); }
    else console.log('  no page errors');
    await page.close();
  }
  await browser.close();
  console.log(`\n${bad === 0 ? 'ALL CLEAN' : bad + ' page(s) with errors'}`);
})();
