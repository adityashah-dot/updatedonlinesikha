const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

async function probe(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(900);

  const out = await page.evaluate(() => {
    const pick = (el, props) => {
      const cs = getComputedStyle(el);
      const o = {};
      props.forEach((p) => (o[p] = cs[p]));
      return o;
    };
    const cardProps = ['backgroundColor', 'borderTopWidth', 'borderTopColor', 'borderRadius',
      'boxShadow', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginBottom'];

    const sections = Array.from(document.querySelectorAll('section[id]')).map((s) => {
      const r = s.getBoundingClientRect();
      const h = s.querySelector('h1, h2, h3');
      const hs = h ? getComputedStyle(h) : null;
      const th = s.querySelector('table th');
      const ths = th ? getComputedStyle(th) : null;
      const td = s.querySelector('table td');
      const tds = td ? getComputedStyle(td) : null;
      return {
        id: s.id,
        h: Math.round(r.height),
        card: pick(s, cardProps),
        head: h ? { tag: h.tagName, size: hs.fontSize, weight: hs.fontWeight, color: hs.color, lh: hs.lineHeight, ls: hs.letterSpacing } : null,
        th: ths ? { bg: ths.backgroundColor, color: ths.color, weight: ths.fontWeight, size: ths.fontSize, pad: ths.padding } : null,
        td: tds ? { pad: tds.padding, border: tds.borderTopWidth + ' ' + tds.borderTopColor } : null,
      };
    });

    // palette audit: collect every non-neutral colour used
    const colors = new Set();
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      [cs.color, cs.backgroundColor, cs.borderTopColor].forEach((c) => {
        if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') return;
        const m = c.match(/rgb\((\d+), (\d+), (\d+)\)/);
        if (!m) return;
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        if (r > 240 && g > 240 && b > 240) return;         // white/near-white
        if (Math.abs(r - g) < 6 && Math.abs(g - b) < 6) return; // greys
        colors.add(c);
      });
    });

    return {
      sections,
      hasToc: Boolean(document.querySelector('[class*="table-of-contents"], [class*="TableOfContents"], nav[aria-label*="Table"]')),
      hasSidebar: Boolean(document.querySelector('aside')),
      palette: [...colors].sort(),
    };
  });

  await context.close();
  await browser.close();
  return out;
}

async function main() {
  const targets = [
    ['LPU ADMISSION', `${BASE_URL}/universities/lpu-online?section=admission`],
    ['CU  ADMISSION', `${BASE_URL}/universities/cu-online?section=admission`],
    ['LPU SCHOLARSHIPS', `${BASE_URL}/universities/lpu-online?section=scholarships`],
    ['CU  SCHOLARSHIPS', `${BASE_URL}/universities/cu-online?section=scholarships`],
  ];

  for (const [label, url] of targets) {
    const d = await probe(url);
    console.log(`\n${'='.repeat(94)}\n${label}   toc=${d.hasToc}  sidebar=${d.hasSidebar}\n${'='.repeat(94)}`);
    d.sections.forEach((s) => {
      console.log(`\n  ${s.id}  h=${s.h}`);
      console.log(`    card: bg=${s.card.backgroundColor} border=${s.card.borderTopWidth} ${s.card.borderTopColor} radius=${s.card.borderRadius}`);
      console.log(`          pad=${s.card.paddingTop}/${s.card.paddingBottom}/${s.card.paddingLeft}/${s.card.paddingRight} shadow=${s.card.boxShadow.slice(0, 46)}`);
      if (s.head) console.log(`    head: ${s.head.tag} ${s.head.size} w${s.head.weight} ${s.head.color} lh=${s.head.lh}`);
      if (s.th) console.log(`    th:   bg=${s.th.bg} color=${s.th.color} w${s.th.weight} ${s.th.size} pad=${s.th.pad}`);
      if (s.td) console.log(`    td:   pad=${s.td.pad} border=${s.td.border}`);
    });
    console.log(`\n  PALETTE (${d.palette.length}): ${d.palette.join('  ')}`);
  }
}

main().catch(console.error);
