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
const TEMP_PROFILE_DIR = path.join(PROJECT_ROOT, "qa", ".temp-chrome-spacing-qa");

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

function cleanupTempProfile() {
  if (fs.existsSync(TEMP_PROFILE_DIR)) {
    try {
      fs.rmSync(TEMP_PROFILE_DIR, { recursive: true, force: true });
    } catch {}
  }
}

async function run() {
  console.log("==================================================================");
  console.log("VERIFY VERTICAL WHITESPACE FIXES ACROSS NEWS TEMPLATES");
  console.log("==================================================================\n");

  cleanupTempProfile();

  const PORT = 4195;
  const CDP_PORT = 9238;

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
    detailSpacing: {},
    listingSpacing: {},
    viewports: [],
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
    // TEST 1: News Detail Page Vertical Whitespace Check
    // -------------------------------------------------------------
    const detailUrl = `http://127.0.0.1:${PORT}/news/cuet-ug-2026-result-out-live-cuet-scorecard-pdf-direct-link`;
    console.log(`\nNavigating to News Detail: ${detailUrl}...`);
    await client.send("Page.navigate", { url: detailUrl });
    await sleep(2500);

    const detailData = await client.eval(`
      (() => {
        const section = document.querySelector("section[aria-label='Related Stories']");
        const grid = section ? section.querySelector(".grid") : null;
        const lastCard = grid ? grid.querySelector("article:last-child") : null;
        const backBtn = Array.from(document.querySelectorAll("a")).find(a => a.innerText.includes("Back to Education"));
        const btnWrapper = backBtn ? backBtn.closest("div") : null;

        const gridRect = grid ? grid.getBoundingClientRect() : {};
        const cardRect = lastCard ? lastCard.getBoundingClientRect() : {};
        const btnRect = backBtn ? backBtn.getBoundingClientRect() : {};
        const wrapperStyle = btnWrapper ? window.getComputedStyle(btnWrapper) : null;

        const gapFromCardToBtn = Math.round(btnRect.top - cardRect.bottom);

        return {
          hasSection: !!section,
          hasGrid: !!grid,
          hasBackBtn: !!backBtn,
          cardBottom: Math.round(cardRect.bottom),
          btnTop: Math.round(btnRect.top),
          gapFromCardToBtn,
          wrapperMarginTop: wrapperStyle ? wrapperStyle.marginTop : null,
          wrapperPaddingTop: wrapperStyle ? wrapperStyle.paddingTop : null,
          isTightAndNatural: gapFromCardToBtn >= 18 && gapFromCardToBtn <= 28, // exactly ~20-24px
        };
      })()
    `);

    console.log("  News Detail Spacing Result:", detailData);
    results.detailSpacing = detailData;

    // -------------------------------------------------------------
    // TEST 2: News Listing Page Vertical Whitespace Check
    // -------------------------------------------------------------
    console.log(`\nNavigating to News Listing Page: http://127.0.0.1:${PORT}/news...`);
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news` });
    await sleep(2000);

    const listingData = await client.eval(`
      (() => {
        const heroSection = document.querySelector("section[aria-label='Featured Story and Trending Headlines']");
        const rightCol = heroSection ? heroSection.querySelector(".lg\\\\:col-span-5") : null;
        const ctaWidget = rightCol ? rightCol.querySelector("[data-testid='news-counselling-sidebar']") : null;
        const leadCard = heroSection ? heroSection.querySelector("article") : null;
        const nav = document.querySelector("nav[aria-label='News categories and search']");

        const heroRect = heroSection ? heroSection.getBoundingClientRect() : {};
        const ctaRect = ctaWidget ? ctaWidget.getBoundingClientRect() : {};
        const leadRect = leadCard ? leadCard.getBoundingClientRect() : {};
        const navRect = nav ? nav.getBoundingClientRect() : {};

        const heroStyle = heroSection ? window.getComputedStyle(heroSection) : null;
        const gapFromHeroToNav = Math.round(navRect.top - heroRect.bottom);
        const gapFromCtaToNav = Math.round(navRect.top - ctaRect.bottom);

        return {
          hasHeroSection: !!heroSection,
          hasNav: !!nav,
          heroMarginBottom: heroStyle ? heroStyle.marginBottom : null,
          gapFromHeroToNav,
          gapFromCtaToNav,
          isTightAndNatural: gapFromHeroToNav >= 18 && gapFromHeroToNav <= 28, // reduced to ~20-24px
        };
      })()
    `);

    console.log("  News Listing Spacing Result:", listingData);
    results.listingSpacing = listingData;

    // -------------------------------------------------------------
    // TEST 3: Responsive Viewports Check (0px Horizontal Overflow)
    // -------------------------------------------------------------
    console.log("\nTesting Viewports for 0px Overflow...");
    const viewports = [
      { name: "Desktop Wide", width: 1440, height: 900, mobile: false },
      { name: "Desktop Small", width: 1024, height: 768, mobile: false },
      { name: "Tablet Portrait", width: 768, height: 1024, mobile: false },
      { name: "Mobile Standard", width: 390, height: 844, mobile: true },
      { name: "Mobile Compact", width: 360, height: 740, mobile: true },
    ];

    for (const vp of viewports) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });
      await sleep(300);

      const metrics = await client.eval(`
        (() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const windowInnerWidth = window.innerWidth;
          const overflowX = scrollWidth > windowInnerWidth ? (scrollWidth - windowInnerWidth) : 0;
          return {
            windowInnerWidth,
            scrollWidth,
            overflowX,
            hasZeroOverflow: overflowX <= 0,
          };
        })()
      `);

      console.log(`  ${vp.name} (${vp.width}px): overflowX = ${metrics.overflowX}px, zeroOverflow = ${metrics.hasZeroOverflow}`);
      results.viewports.push({ viewport: vp.name, width: vp.width, ...metrics });
    }

  } finally {
    if (client && client.ws) {
      client.ws.close();
    }
    chromeProcess.kill();
    server.close();
    cleanupTempProfile();
  }

  console.log("\n=================================================");
  console.log("VERIFICATION ASSERTIONS");
  console.log("=================================================");

  const asserts = [
    {
      desc: "Detail page: Back button is present",
      pass: results.detailSpacing.hasBackBtn,
    },
    {
      desc: "Detail page: Gap between 4 cards and back button is reduced and natural (20-24px)",
      pass: results.detailSpacing.isTightAndNatural,
    },
    {
      desc: "Detail page: Redundant paddingTop on button wrapper removed",
      pass: results.detailSpacing.wrapperPaddingTop === "0px",
    },
    {
      desc: "Listing page: Next section (nav) starts closer to preceding content (20-24px gap)",
      pass: results.listingSpacing.isTightAndNatural,
    },
    {
      desc: "Listing page: Hero section marginBottom reduced to 20-24px",
      pass: results.listingSpacing.heroMarginBottom === "20px" || results.listingSpacing.heroMarginBottom === "24px",
    },
    {
      desc: "All 5 viewports maintain 0px horizontal overflow",
      pass: results.viewports.every((v) => v.hasZeroOverflow),
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
    console.log("\n✅ ALL 6 VERIFICATION ASSERTIONS PASSED!");
  }
}

run().catch((err) => {
  console.error("Test failed with error:", err);
  cleanupTempProfile();
  process.exit(1);
});
