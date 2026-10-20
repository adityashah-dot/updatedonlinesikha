const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';
const SLUG = { lpu: 'lpu-online', amity: 'amity-online', cu: 'cu-online' };

async function dump(uni, tab, vp) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await context.newPage();
  const url = tab === 'overview'
    ? `${BASE_URL}/universities/${SLUG[uni]}`
    : `${BASE_URL}/universities/${SLUG[uni]}?section=${tab}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(900);

  const out = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('section[id]')).map((s) => {
      const r = s.getBoundingClientRect();
      const h = s.querySelector('h1, h2, h3');
      const cs = h ? getComputedStyle(h) : null;
      return {
        id: s.id,
        h: Math.round(r.height),
        heading: h ? h.innerText.trim().slice(0, 48) : '',
        tag: h ? h.tagName : '',
        size: cs ? cs.fontSize : '',
        weight: cs ? cs.fontWeight : '',
        pad: getComputedStyle(s).paddingTop + '/' + getComputedStyle(s).paddingBottom,
        radius: getComputedStyle(s).borderRadius,
        bg: getComputedStyle(s).backgroundColor,
      };
    });
    // any h2 without a section wrapper
    const looseH2 = Array.from(document.querySelectorAll('h2'))
      .filter((h) => !h.closest('section[id]'))
      .map((h) => h.innerText.trim().slice(0, 48));
    return { secs, looseH2, docH: document.body.scrollHeight };
  });

  await context.close();
  await browser.close();
  return out;
}

async function main() {
  for (const tab of ['overview', 'courses', 'admission', 'scholarships']) {
    for (const vp of [{ w: 390, h: 800 }, { w: 1366, h: 900 }]) {
      console.log(`\n${'='.repeat(92)}\n${tab.toUpperCase()} @ ${vp.w}\n${'='.repeat(92)}`);
      for (const uni of ['lpu', 'amity', 'cu']) {
        const d = await dump(uni, tab, vp);
        console.log(`\n--- ${uni.toUpperCase()} (docH=${d.docH}) ---`);
        d.secs.forEach((s, i) => {
          console.log(
            `  ${String(i + 1).padStart(2)}. ${s.id.padEnd(22)} h=${String(s.h).padEnd(6)} ` +
            `${s.tag.padEnd(3)} ${s.size.padEnd(8)} w${s.weight.padEnd(4)} r=${s.radius.padEnd(6)} ` +
            `pad=${s.pad.padEnd(9)} "${s.heading}"`
          );
        });
        if (d.looseH2.length) console.log(`  loose h2: ${JSON.stringify(d.looseH2)}`);
      }
    }
  }
}

main().catch(console.error);
