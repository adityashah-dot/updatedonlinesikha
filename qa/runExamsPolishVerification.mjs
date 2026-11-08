import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, "qa", "detail_page_screenshots");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function startStaticSpaServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlObj = new URL(req.url, "http://127.0.0.1:" + port);
      const pathname = decodeURIComponent(urlObj.pathname);
      let filePath = path.join(DIST_DIR, pathname === "/" ? "index.html" : pathname);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        return res.end(fs.readFileSync(filePath));
      }
      const indexHtml = path.join(DIST_DIR, "index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(indexHtml));
    });
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 1;
    this.callbacks = new Map();
    this.consoleErrors = [];
  }

  async connect() {
    const WebSocket = (await import("ws")).default;
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.on("open", resolve);
      this.ws.on("error", reject);
    });
    this.ws.on("message", (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
        this.consoleErrors.push(msg.params.args.map((a) => a.value || a.description).join(" "));
      }
      if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
        this.consoleErrors.push(msg.params.entry.text);
      }
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function findChromeWebSocketUrl(port) {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch("http://127.0.0.1:" + port + "/json");
      if (res.ok) {
        const list = await res.json();
        const page = list.find((p) => p.type === "page");
        if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
      }
    } catch {}
    await sleep(250);
  }
  throw new Error("Could not connect to Chrome page debugging target");
}

const LISTING_AUDIT_EXPR = `(() => {
  const doc = document;
  const cards = Array.from(doc.querySelectorAll("main article"));
  const h1 = doc.querySelector("h1");
  const rawIsoFound = /\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}/.test(doc.body.innerText);
  const colonTitleFound = cards.some(c => {
    const title = (c.querySelector("h2") || {}).textContent || "";
    return title.trim().endsWith(":");
  });

  const cardDetails = cards.slice(0, 6).map(c => {
    const title = (c.querySelector("h2") || {}).textContent || "";
    const img = c.querySelector("img");
    const emblem = c.querySelector(".relative span.text-sm.font-bold");
    const dateRow = c.querySelector("div.border-b");
    const modeBadge = c.querySelector(".relative .absolute.top-2.left-2 span");
    return {
      title,
      hasImage: Boolean(img),
      imgSrc: img ? img.src : null,
      hasMonogramFallback: Boolean(emblem),
      initials: emblem ? emblem.textContent.trim() : null,
      mode: modeBadge ? modeBadge.textContent.trim() : null,
      dateRowText: dateRow ? dateRow.textContent.trim() : null,
      height: c.offsetHeight,
      width: c.offsetWidth,
    };
  });

  return {
    h1Text: h1 ? h1.textContent.trim() : null,
    totalCards: cards.length,
    rawIsoFound,
    colonTitleFound,
    sampleCards: cardDetails,
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
  };
})()`;

const DETAIL_SIDEBAR_TABLE_EXPR = `(() => {
  const doc = document;
  const side = doc.querySelector("aside.bd-side");
  const tocNav = doc.querySelector("aside.bd-side nav[aria-label='Table of contents']");
  const tocLinks = Array.from(doc.querySelectorAll("aside.bd-side nav[aria-label='Table of contents'] a"));
  const discoverCard = doc.querySelector("aside.bd-side > div:nth-child(2)");
  const counsellingCard = doc.querySelector("aside.bd-side > div:nth-child(3)");

  const tables = Array.from(doc.querySelectorAll(".bd-table-wrap table"));
  const firstTable = tables[0];
  const firstTh = firstTable ? firstTable.querySelector("th") : null;
  const firstTd = firstTable ? firstTable.querySelector("td") : null;
  const evenTrTd = firstTable ? firstTable.querySelector("tbody tr:nth-child(even) td") : null;
  const wrap = doc.querySelector(".bd-table-wrap");

  const thStyle = firstTh ? window.getComputedStyle(firstTh) : null;
  const tdStyle = firstTd ? window.getComputedStyle(firstTd) : null;
  const evenTdStyle = evenTrTd ? window.getComputedStyle(evenTrTd) : null;
  const wrapStyle = wrap ? window.getComputedStyle(wrap) : null;
  const h1 = doc.querySelector("h1");
  const h2 = doc.querySelector(".bd-prose h2");
  const p = doc.querySelector(".bd-prose p");

  return {
    hasSide: Boolean(side),
    hasTocNav: Boolean(tocNav),
    tocLinksCount: tocLinks.length,
    hasDiscoverCard: Boolean(discoverCard),
    hasCounsellingCard: Boolean(counsellingCard),
    totalTables: tables.length,
    tableStyles: {
      wrapBorder: wrapStyle ? wrapStyle.border : null,
      wrapRadius: wrapStyle ? wrapStyle.borderRadius : null,
      thBg: thStyle ? thStyle.backgroundColor : null,
      thColor: thStyle ? thStyle.color : null,
      thFontSize: thStyle ? thStyle.fontSize : null,
      thFontWeight: thStyle ? thStyle.fontWeight : null,
      thTextTransform: thStyle ? thStyle.textTransform : null,
      tdPadding: tdStyle ? tdStyle.padding : null,
      tdBorderBottom: tdStyle ? tdStyle.borderBottomColor : null,
      evenTdColor: evenTdStyle ? evenTdStyle.backgroundColor : null,
    },
    colors: {
      h1Color: h1 ? window.getComputedStyle(h1).color : null,
      h2Color: h2 ? window.getComputedStyle(h2).color : null,
      pColor: p ? window.getComputedStyle(p).color : null,
      pLineHeight: p ? window.getComputedStyle(p).lineHeight : null,
    },
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
  };
})()`;

async function main() {
  const SERVER_PORT = 4195;
  const CHROME_PORT = 9248;
  console.log("Starting production static SPA server on port " + SERVER_PORT + "...");
  const server = await startStaticSpaServer(SERVER_PORT);

  const userDataDir = path.join(PROJECT_ROOT, "qa", ".chrome-qa-profile-polish");
  fs.mkdirSync(userDataDir, { recursive: true });

  console.log("Launching Chrome on port " + CHROME_PORT + "...");
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--remote-debugging-port=" + CHROME_PORT,
      "--user-data-dir=" + userDataDir,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--window-size=1440,900",
    ],
    { stdio: "ignore" }
  );

  let cdp;
  try {
    const wsUrl = await findChromeWebSocketUrl(CHROME_PORT);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    await cdp.send("Runtime.enable");

    const VIEWPORTS = [
      { name: "desktop-1440", width: 1440, height: 900 },
      { name: "laptop-1024", width: 1024, height: 768 },
      { name: "tablet-768", width: 768, height: 1024 },
      { name: "mobile-390", width: 390, height: 844 },
      { name: "small-mobile-360", width: 360, height: 800 },
    ];

    const results = {
      listing: [],
      detail: [],
    };

    console.log("\n================ PART 1: EXAMS LISTING PAGE (/exams) ================\n");

    for (const vp of VIEWPORTS) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768,
      });

      await cdp.send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/exams` });
      await sleep(2500);

      const evalRes = await cdp.send("Runtime.evaluate", {
        expression: LISTING_AUDIT_EXPR,
        returnByValue: true,
      });

      const audit = evalRes.result.value;

      const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
      const shotFile = `exams_listing_${vp.name}.png`;
      const shotPath = path.join(SCREENSHOT_DIR, shotFile);
      fs.writeFileSync(shotPath, Buffer.from(shot.data, "base64"));

      console.log(`[Listing] Viewport: ${vp.name} (${vp.width}x${vp.height})`);
      console.log(`  - Total cards rendered: ${audit.totalCards}`);
      console.log(`  - Raw ISO timestamps detected: ${audit.rawIsoFound ? "FAIL" : "PASS (0 found)"}`);
      console.log(`  - Trailing colon titles detected: ${audit.colonTitleFound ? "FAIL" : "PASS (0 found)"}`);
      console.log(`  - Horizontal Overflow: ${audit.hasOverflow ? "FAIL" : "PASS (0px)"} (${audit.scrollWidth} / ${audit.innerWidth})`);
      console.log(`  - Sample Card 1: "${audit.sampleCards[0]?.title}" | hasImg: ${audit.sampleCards[0]?.hasImage} | fallback: ${audit.sampleCards[0]?.hasMonogramFallback} (${audit.sampleCards[0]?.initials}) | dates: "${audit.sampleCards[0]?.dateRowText}"`);
      console.log(`  - Screenshot saved: ${shotFile}`);

      results.listing.push({ viewport: vp.name, width: vp.width, audit, screenshot: shotFile });
    }

    console.log("\n================ PART 2: EXAMS DETAIL PAGES ================\n");

    const DETAIL_TARGETS = [
      { slug: "ips-exam", title: "IPS Exam 2027" },
      { slug: "upsc-cse-exam", title: "UPSC CSE Exam 2027" },
      { slug: "jee-main-exam", title: "JEE Main 2027" },
    ];

    for (const target of DETAIL_TARGETS) {
      console.log(`\n----- Detail Page: /exams/${target.slug} -----\n`);
      for (const vp of VIEWPORTS) {
        await cdp.send("Emulation.setDeviceMetricsOverride", {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width <= 768,
        });

        await cdp.send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/exams/${target.slug}` });
        await sleep(2500);

        const evalRes = await cdp.send("Runtime.evaluate", {
          expression: DETAIL_SIDEBAR_TABLE_EXPR,
          returnByValue: true,
        });

        const audit = evalRes.result.value;

        const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
        const shotFile = `${target.slug}_polish_${vp.name}.png`;
        const shotPath = path.join(SCREENSHOT_DIR, shotFile);
        fs.writeFileSync(shotPath, Buffer.from(shot.data, "base64"));

        console.log(`[${target.slug}] Viewport: ${vp.name} (${vp.width}x${vp.height})`);
        console.log(`  - Horizontal Overflow: ${audit.hasOverflow ? "FAIL" : "PASS (0px)"}`);
        console.log(`  - Sidebar: hasTocNav=${audit.hasTocNav} (${audit.tocLinksCount} links), hasDiscoverCard=${audit.hasDiscoverCard}, hasCounsellingCard=${audit.hasCounsellingCard}`);
        console.log(`  - Tables: ${audit.totalTables} tables found`);
        if (vp.width >= 1024) {
          console.log(`  - Table Header Styles: bg=${audit.tableStyles.thBg}, color=${audit.tableStyles.thColor}, size=${audit.tableStyles.thFontSize}, weight=${audit.tableStyles.thFontWeight}`);
          console.log(`  - Table Row Zebra: even=${audit.tableStyles.evenTdColor}, tdPadding=${audit.tableStyles.tdPadding}`);
          console.log(`  - Typography: H1=${audit.colors.h1Color}, H2=${audit.colors.h2Color}, Body=${audit.colors.pColor}`);
        }
        console.log(`  - Screenshot saved: ${shotFile}`);

        results.detail.push({ slug: target.slug, viewport: vp.name, width: vp.width, audit, screenshot: shotFile });
      }
    }

    fs.writeFileSync(
      path.join(PROJECT_ROOT, "qa", "exams-listing-detail-audit-results.json"),
      JSON.stringify(results, null, 2)
    );
    console.log("\n>>> ALL EXAM POLISH QA CHECKS COMPLETED SUCCESSFULLY <<<");
  } finally {
    if (cdp) cdp.close();
    chromeProcess.kill();
    server.close();
  }
}

main().catch((err) => {
  console.error("FATAL ERROR IN QA SCRIPT:", err);
  process.exit(1);
});
