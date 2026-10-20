const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

// Heights recorded BEFORE this change set (from the earlier measure.cjs run)
const BASELINE = {
  'lpu|overview': [18243, 10229],
  'lpu|courses': [12371, 6590],
  'lpu|admission': [11629, 6168],
  'lpu|scholarships': [4481, 1932],
  'amity|overview': [20876, 12411],
  'amity|courses': [11923, 6427],
  'amity|admission': [14125, 7465],
  'amity|scholarships': [10364, 6339],
  'cu|overview': [20218, 11337],
  'cu|courses': [8386, 4655],
  'cu|admission': [6254, 3746],
  'cu|scholarships': [4479, 2343],
};

const SLUG = { lpu: 'lpu-online', amity: 'amity-online', cu: 'cu-online' };

async function main() {
  const browser = await chromium.launch({ headless: true });
  const rows = [];

  for (const uni of ['lpu', 'amity', 'cu']) {
    for (const tab of ['overview', 'courses', 'admission', 'scholarships']) {
      for (const vp of [{ w: 390, h: 800 }, { w: 1366, h: 900 }]) {
        const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
        const page = await context.newPage();
        const url = tab === 'overview'
          ? `${BASE_URL}/universities/${SLUG[uni]}`
          : `${BASE_URL}/universities/${SLUG[uni]}?section=${tab}`;
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(900);
        const h = await page.evaluate(() => document.body.scrollHeight);

        // structural checks
        const struct = await page.evaluate(() => ({
          sections: document.querySelectorAll('section[id]').length,
          hasTabStrip: Boolean(document.querySelector('.sticky.top-\\[68px\\]')),
          hasToc: Boolean(document.querySelector('[class*="Table of contents"], [class*="table-of-contents"], aside')),
          h1: (document.querySelector('h1')?.innerText || '').slice(0, 42),
          title: document.title.slice(0, 46),
        }));

        const key = `${uni}|${tab}`;
        const base = BASELINE[key];
        const delta = base ? ((h - base[vp.w === 390 ? 0 : 1]) / base[vp.w === 390 ? 0 : 1]) * 100 : null;
        rows.push({ uni, tab, vp: vp.w, h, base: base ? base[vp.w === 390 ? 0 : 1] : null, delta, struct });
        await context.close();
      }
    }
  }

  await browser.close();

  console.log('\nHeight regression vs pre-change baseline');
  console.log('='.repeat(96));
  console.log('Uni'.padEnd(7) + 'Tab'.padEnd(14) + 'Vp'.padEnd(6) + 'Before'.padEnd(9) + 'After'.padEnd(9) + 'Delta'.padEnd(10) + 'Sections');
  console.log('-'.repeat(96));
  for (const r of rows) {
    const d = r.delta === null ? 'n/a' : (r.delta === 0 ? '0%' : r.delta.toFixed(1) + '%');
    console.log(
      r.uni.padEnd(7) + r.tab.padEnd(14) + String(r.vp).padEnd(6) +
      String(r.base).padEnd(9) + String(r.h).padEnd(9) + d.padEnd(10) + r.struct.sections
    );
  }

  console.log('\n\nStructure / SEO checks');
  console.log('='.repeat(96));
  for (const r of rows.filter((x) => x.vp === 390)) {
    console.log(`${r.uni}/${r.tab}  tabStrip=${r.struct.hasTabStrip ? 'Y' : 'n'} toc=${r.struct.hasToc ? 'Y' : 'n'}`);
    console.log(`   H1: ${r.struct.h1}`);
    console.log(`   title: ${r.struct.title}`);
  }
}

main().catch(console.error);
