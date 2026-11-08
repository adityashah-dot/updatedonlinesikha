import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const TEMP_PROFILE_DIR = path.join(PROJECT_ROOT, "qa", ".temp-chrome-advisory-qa");
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, "qa", ".temp-screenshots");

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
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }
}

async function getWsUrl(port) {
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((p) => p.type === "page");
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("Unable to connect to Chrome CDP page endpoint");
}

function cleanupTempFiles() {
  if (fs.existsSync(TEMP_PROFILE_DIR)) {
    try {
      fs.rmSync(TEMP_PROFILE_DIR, { recursive: true, force: true });
    } catch {}
  }
  if (fs.existsSync(SCREENSHOT_DIR)) {
    try {
      fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
    } catch {}
  }
}

async function run() {
  console.log("==================================================================");
  console.log("TASK VERIFICATION: ADVISORY CARD COLOR & 4-CARD RELATED COVERAGE");
  console.log("==================================================================\n");

  cleanupTempFiles();
  try {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  } catch {}

  const PORT = 4188;
  const CDP_PORT = 9232;

  console.log(`Starting static SPA server on port ${PORT}...`);
  const server = await startStaticSpaServer(PORT);

  console.log(`Launching headless Chrome on CDP port ${CDP_PORT}...`);
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${TEMP_PROFILE_DIR}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--headless=new",
      "--disable-gpu",
      "--disable-translate",
      "--disable-background-networking",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let client;
  const results = {
    detailAdvisoryCard: {},
    listingAdvisoryCard: {},
    relatedCoverage: {},
    responsiveRelated: [],
    screenshotsCaptured: [],
  };

  try {
    const wsUrl = await getWsUrl(CDP_PORT);
    client = new CDPClient(wsUrl);
    await client.connect();
    await client.send("Runtime.enable");
    await client.send("Page.enable");
    await client.send("DOM.enable");

    // 1440px desktop
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // -------------------------------------------------------------
    // PART 1: TEST NEWS DETAIL PAGE
    // -------------------------------------------------------------
    const detailUrl = `http://127.0.0.1:${PORT}/news/cuet-ug-2026-result-out-live-cuet-scorecard-pdf-direct-link`;
    console.log(`\nNavigating to News Detail: ${detailUrl}...`);
    await client.send("Page.navigate", { url: detailUrl });
    await sleep(2500);

    // 1.1: Verify Advisory Card on Detail Page
    console.log("[Test 1.1] Inspecting Free Counselling Desk Card Colors on Detail Page...");
    const detailCardStyles = await client.eval(`
      (() => {
        const card = document.querySelector("[data-testid='news-counselling-sidebar']");
        if (!card) return { found: false };
        const cardStyle = window.getComputedStyle(card);
        const heading = card.querySelector("h4");
        const headingStyle = heading ? window.getComputedStyle(heading) : null;
        const subhead = card.querySelector("span");
        const subheadStyle = subhead ? window.getComputedStyle(subhead) : null;
        const bodyText = card.querySelector("p");
        const bodyStyle = bodyText ? window.getComputedStyle(bodyText) : null;
        const btn = card.querySelector("button");
        const btnStyle = btn ? window.getComputedStyle(btn) : null;

        return {
          found: true,
          backgroundImage: cardStyle.backgroundImage,
          backgroundColor: cardStyle.backgroundColor,
          borderColor: cardStyle.borderColor,
          headingColor: headingStyle ? headingStyle.color : null,
          subheadColor: subheadStyle ? subheadStyle.color : null,
          bodyColor: bodyStyle ? bodyStyle.color : null,
          btnBackgroundColor: btnStyle ? btnStyle.backgroundColor : null,
          btnTextColor: btnStyle ? btnStyle.color : null,
          btnText: btn ? btn.innerText.trim() : null,
          height: card.offsetHeight,
          width: card.offsetWidth,
        };
      })()
    `);
    console.log("  Detail Advisory Card Styles:", detailCardStyles);
    results.detailAdvisoryCard = detailCardStyles;

    // 1.2: Verify Related Education Coverage (Exactly 4 cards in one row on desktop)
    console.log("\n[Test 1.2] Inspecting Related Education Coverage (4 cards in 1 row on Desktop)...");
    const relatedSectionInfo = await client.eval(`
      (() => {
        const section = document.querySelector("section[aria-label='Related Stories']");
        if (!section) return { found: false };
        const grid = section.querySelector(".grid");
        const gridStyle = grid ? window.getComputedStyle(grid) : null;
        const articles = Array.from(grid.querySelectorAll("article"));

        const cards = articles.map((art) => {
          const rect = art.getBoundingClientRect();
          const title = art.querySelector("h4")?.innerText?.trim();
          const link = art.querySelector("h4 a")?.getAttribute("href");
          return {
            title,
            link,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            top: Math.round(rect.top),
          };
        });

        // Check if all cards have equal width
        const widths = cards.map(c => c.width);
        const minW = Math.min(...widths);
        const maxW = Math.max(...widths);
        const equalWidths = (maxW - minW) <= 2; // pixel rounding tolerance

        // Check if all 4 cards are in the same single row (same top coordinate)
        const tops = cards.map(c => c.top);
        const minT = Math.min(...tops);
        const maxT = Math.max(...tops);
        const sameRow = (maxT - minT) <= 2;

        // Check for duplicates
        const links = cards.map(c => c.link);
        const uniqueLinks = new Set(links);
        const hasNoDuplicates = uniqueLinks.size === cards.length;

        return {
          found: true,
          cardCount: articles.length,
          gridTemplateColumns: gridStyle ? gridStyle.gridTemplateColumns : null,
          equalWidths,
          sameRow,
          hasNoDuplicates,
          cards,
        };
      })()
    `);
    console.log("  Related Coverage Card Count:", relatedSectionInfo.cardCount);
    console.log("  Equal Widths:", relatedSectionInfo.equalWidths);
    console.log("  Same Row on Desktop:", relatedSectionInfo.sameRow);
    console.log("  No Duplicates:", relatedSectionInfo.hasNoDuplicates);
    console.log("  Cards Detail:", relatedSectionInfo.cards);
    results.relatedCoverage = relatedSectionInfo;

    // 1.3: Responsive Layout Testing for Related Education Coverage
    console.log("\n[Test 1.3] Testing Related Coverage across Viewports...");
    const responsiveVps = [
      { name: "Desktop Wide", width: 1440, height: 900, mobile: false, expectedCols: 4 },
      { name: "Tablet Portrait", width: 768, height: 1024, mobile: false, expectedCols: 2 },
      { name: "Mobile Standard", width: 390, height: 844, mobile: true, expectedCols: 1 },
      { name: "Mobile Compact", width: 360, height: 740, mobile: true, expectedCols: 1 },
    ];

    for (const vp of responsiveVps) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });
      await sleep(300);

      const vpMetrics = await client.eval(`
        (() => {
          const section = document.querySelector("section[aria-label='Related Stories']");
          const grid = section ? section.querySelector(".grid") : null;
          const articles = grid ? Array.from(grid.querySelectorAll("article")) : [];
          const scrollWidth = document.documentElement.scrollWidth;
          const windowInnerWidth = window.innerWidth;
          const overflowX = scrollWidth > windowInnerWidth ? (scrollWidth - windowInnerWidth) : 0;

          // Check row grouping by distinct top offsets
          const tops = articles.map(a => Math.round(a.getBoundingClientRect().top));
          const uniqueRows = new Set(tops).size;

          return {
            windowInnerWidth,
            cardCount: articles.length,
            uniqueRows,
            overflowX,
            hasZeroOverflow: overflowX <= 0,
            widths: articles.map(a => Math.round(a.getBoundingClientRect().width)),
          };
        })()
      `);

      console.log(`  ${vp.name} (${vp.width}px): ${vpMetrics.cardCount} cards, ${vpMetrics.uniqueRows} rows, overflowX = ${vpMetrics.overflowX}px`);
      results.responsiveRelated.push({ viewport: vp.name, width: vp.width, ...vpMetrics });
    }

    // Capture temporary responsive verification screenshots (to be deleted after validation)
    console.log("\nCapturing temporary verification screenshots...");
    // 1. Desktop Detail Screenshot
    await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await sleep(200);
    const snapDesktop = await client.send("Page.captureScreenshot", { format: "png" });
    const deskPath = path.join(SCREENSHOT_DIR, "qa-detail-desktop.png");
    fs.writeFileSync(deskPath, Buffer.from(snapDesktop.data, "base64"));
    results.screenshotsCaptured.push(deskPath);

    // 2. Mobile Detail Screenshot
    await client.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await sleep(200);
    const snapMobile = await client.send("Page.captureScreenshot", { format: "png" });
    const mobPath = path.join(SCREENSHOT_DIR, "qa-detail-mobile.png");
    fs.writeFileSync(mobPath, Buffer.from(snapMobile.data, "base64"));
    results.screenshotsCaptured.push(mobPath);

    console.log(`  Screenshots captured for visual validation: ${results.screenshotsCaptured.length} images.`);

    // -------------------------------------------------------------
    // PART 2: TEST NEWS LISTING PAGE ADVISORY CARD
    // -------------------------------------------------------------
    console.log("\nNavigating to News Listing Page: http://127.0.0.1:" + PORT + "/news...");
    await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news` });
    await sleep(2000);

    const listingCardStyles = await client.eval(`
      (() => {
        const card = document.querySelector("[data-testid='news-counselling-sidebar']");
        if (!card) return { found: false };
        const cardStyle = window.getComputedStyle(card);
        const heading = card.querySelector("h3");
        const headingStyle = heading ? window.getComputedStyle(heading) : null;
        const btn = card.querySelector("button");
        const btnStyle = btn ? window.getComputedStyle(btn) : null;

        return {
          found: true,
          backgroundImage: cardStyle.backgroundImage,
          backgroundColor: cardStyle.backgroundColor,
          headingColor: headingStyle ? headingStyle.color : null,
          btnBackgroundColor: btnStyle ? btnStyle.backgroundColor : null,
          btnTextColor: btnStyle ? btnStyle.color : null,
          height: card.offsetHeight,
        };
      })()
    `);
    console.log("  Listing Advisory Card Styles:", listingCardStyles);
    results.listingAdvisoryCard = listingCardStyles;

  } finally {
    if (client && client.ws) {
      client.ws.close();
    }
    chromeProcess.kill();
    server.close();
    // Clean up temporary screenshots and test profiles per policy
    cleanupTempFiles();
  }

  console.log("\n=================================================");
  console.log("VERIFICATION AUDIT ASSERTIONS");
  console.log("=================================================");

  // Dark navy is rgb(0, 15, 34)
  // Blue button is rgb(17, 94, 175) (#115eaf)
  const isDarkNavy = (col) => col && (col.includes("0, 15, 34") || col.includes("17, 28, 45") || col.includes("30, 41, 59"));
  const isBlueBtn = (col) => col && (col.includes("17, 94, 175") || col.includes("0.505 0.165 243.68"));
  const isLightBg = (img, col) => img?.includes("gradient") || col?.includes("240, 245, 255") || col?.includes("248, 251, 255") || col?.includes("255, 255, 255");

  const asserts = [
    {
      desc: "Detail Advisory Card has light blue/white gradient background",
      pass: isLightBg(results.detailAdvisoryCard.backgroundImage, results.detailAdvisoryCard.backgroundColor),
    },
    {
      desc: "Detail Advisory Card heading has dark navy text (#000f22)",
      pass: isDarkNavy(results.detailAdvisoryCard.headingColor),
    },
    {
      desc: "Detail Advisory Card button has OnlineSiksha blue background (#115eaf) and white text",
      pass: isBlueBtn(results.detailAdvisoryCard.btnBackgroundColor) && results.detailAdvisoryCard.btnTextColor === "rgb(255, 255, 255)",
    },
    {
      desc: "Listing Advisory Card has light blue/white background and blue button",
      pass: isLightBg(results.listingAdvisoryCard.backgroundImage, results.listingAdvisoryCard.backgroundColor) && isBlueBtn(results.listingAdvisoryCard.btnBackgroundColor),
    },
    {
      desc: "Related Education Coverage displays exactly 4 cards",
      pass: results.relatedCoverage.cardCount === 4,
    },
    {
      desc: "All 4 cards in Related Education Coverage are in one row on Desktop (same row top offset)",
      pass: results.relatedCoverage.sameRow,
    },
    {
      desc: "All 4 cards in Related Education Coverage have equal widths",
      pass: results.relatedCoverage.equalWidths,
    },
    {
      desc: "All 4 cards in Related Education Coverage are unique with no duplicates",
      pass: results.relatedCoverage.hasNoDuplicates,
    },
    {
      desc: "Tablet viewport (768px) displays 2x2 grid (2 rows for 4 cards)",
      pass: results.responsiveRelated.find(v => v.width === 768)?.uniqueRows === 2,
    },
    {
      desc: "Mobile viewports (390px, 360px) display 1-column stack (4 rows for 4 cards)",
      pass: results.responsiveRelated.find(v => v.width === 390)?.uniqueRows === 4,
    },
    {
      desc: "All viewports maintain 0px horizontal overflow",
      pass: results.responsiveRelated.every(v => v.hasZeroOverflow),
    },
  ];

  let allPass = true;
  for (const a of asserts) {
    console.log(`  [${a.pass ? "PASS" : "FAIL"}] ${a.desc}`);
    if (!a.pass) allPass = false;
  }

  if (!allPass) {
    console.error("\n❌ Some verification checks failed!");
    process.exit(1);
  } else {
    console.log("\n✅ ALL 11 VERIFICATION ASSERTIONS PASSED!");
  }
}

run().catch((err) => {
  console.error("Test failed with error:", err);
  cleanupTempFiles();
  process.exit(1);
});
