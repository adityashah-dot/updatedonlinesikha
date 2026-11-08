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
const TEMP_PROFILE_DIR = path.join(PROJECT_ROOT, "qa", ".temp-chrome-listing-fix");

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
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method === "Runtime.consoleAPICalled") {
        if (msg.params.type === "error") {
          const txt = msg.params.args.map((a) => a.value || a.description || "").join(" ");
          this.consoleErrors.push(txt);
        }
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
  console.log("VERIFY NEWS LISTING: TRENDING SIDEBAR RESTRUCTURE & EMPTY SPACE FIX");
  console.log("==================================================================\n");

  cleanupTempProfile();

  const PORT = 4185;
  const CDP_PORT = 9228;

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
    desktopAlignment: {},
    counsellingCardFound: false,
    counsellingModalTrigger: false,
    responsiveStacking: {},
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

    console.log("Navigating to /news listing page...");
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news` });
    await sleep(2500);

    // -------------------------------------------------------------
    // TEST 1: Inspect Desktop 65/35 Right Column Restructure & Heights
    // -------------------------------------------------------------
    console.log("\n[Test 1] Inspecting 65/35 Right Column Restructure at 1440px...");
    const desktopLayout = await client.eval(`
      (() => {
        const heroSection = document.querySelector("section[aria-label='Featured Story and Trending Headlines']");
        const leadCard = heroSection ? heroSection.querySelector("article") : null;
        const rightCol = heroSection ? heroSection.querySelector(".lg\\\\:col-span-5") : null;
        const trendingAside = rightCol ? rightCol.querySelector("aside[aria-label='Trending Education Stories']") : null;
        const counsellingWidget = rightCol ? rightCol.querySelector("[data-testid='news-counselling-sidebar']") : null;

        const leadRect = leadCard ? leadCard.getBoundingClientRect() : {};
        const rightColRect = rightCol ? rightCol.getBoundingClientRect() : {};
        const trendingRect = trendingAside ? trendingAside.getBoundingClientRect() : {};
        const counsellingRect = counsellingWidget ? counsellingWidget.getBoundingClientRect() : {};

        const deltaBottom = Math.abs(leadRect.bottom - rightColRect.bottom);
        const gapBetweenTrendingAndCounselling = counsellingRect.top - trendingRect.bottom;

        return {
          hasLeadCard: !!leadCard,
          hasRightCol: !!rightCol,
          hasTrendingAside: !!trendingAside,
          hasCounsellingWidget: !!counsellingWidget,
          leadHeight: Math.round(leadRect.height),
          rightColHeight: Math.round(rightColRect.height),
          trendingHeight: Math.round(trendingRect.height),
          counsellingHeight: Math.round(counsellingRect.height),
          gapBetweenComponents: Math.round(gapBetweenTrendingAndCounselling),
          deltaBottom: Math.round(deltaBottom),
          isWellBalanced: deltaBottom < 60, // previously was > 280px empty space!
        };
      })()
    `);

    console.log("  Desktop Layout Metrics:", desktopLayout);
    results.desktopAlignment = desktopLayout;
    results.counsellingCardFound = desktopLayout.hasCounsellingWidget;

    // -------------------------------------------------------------
    // TEST 2: Verify Counselling Modal Trigger from the Restructured Card
    // -------------------------------------------------------------
    console.log("\n[Test 2] Testing Counselling Button Modal Trigger...");
    const modalTriggerRes = await client.eval(`
      (async () => {
        const ctaBtn = document.querySelector("[data-testid='news-counselling-sidebar'] button");
        if (!ctaBtn) return false;
        ctaBtn.click();
        await new Promise(r => setTimeout(r, 400));
        const modalText = document.body.innerText;
        const isOpen = modalText.includes("Request Counselor Callback") || modalText.includes("Speak With Academic Expert");
        
        // close modal
        const closeBtn = document.querySelector(".fixed.inset-0 button");
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 300));
        
        return isOpen;
      })()
    `);
    console.log("  Counselling modal triggered successfully:", modalTriggerRes);
    results.counsellingModalTrigger = modalTriggerRes;

    // -------------------------------------------------------------
    // TEST 3: Responsive Viewport Checks & Horizontal Overflow (0px)
    // -------------------------------------------------------------
    console.log("\n[Test 3] Testing Responsive Viewports (1440, 1024, 768, 390, 360)...");
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
          const bodyScrollWidth = document.body.scrollWidth;
          const windowInnerWidth = window.innerWidth;
          const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
          const overflowX = maxScroll > windowInnerWidth ? (maxScroll - windowInnerWidth) : 0;

          // Check component presence & vertical order
          const hero = document.querySelector("section[aria-label='Featured Story and Trending Headlines'] article");
          const trending = document.querySelector("aside[aria-label='Trending Education Stories']");
          const counselling = document.querySelector("[data-testid='news-counselling-sidebar']");
          const filterNav = document.querySelector("nav[aria-label='News categories and search']");
          const feed = document.querySelector("section[aria-label='Chronological News Feed']");

          const heroTop = hero ? hero.getBoundingClientRect().top : 0;
          const trendingTop = trending ? trending.getBoundingClientRect().top : 0;
          const counsellingTop = counselling ? counselling.getBoundingClientRect().top : 0;
          const filterTop = filterNav ? filterNav.getBoundingClientRect().top : 0;
          const feedTop = feed ? feed.getBoundingClientRect().top : 0;

          return {
            windowInnerWidth,
            scrollWidth,
            overflowX,
            hasZeroOverflow: overflowX <= 0,
            heroTop,
            trendingTop,
            counsellingTop,
            filterTop,
            feedTop,
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
  console.log("VERIFICATION AUDIT COMPLETE");
  console.log("=================================================");

  const asserts = [
    { desc: "Lead card and Right Column container are present", pass: results.desktopAlignment.hasLeadCard && results.desktopAlignment.hasRightCol },
    { desc: "Trending Headlines and Counselling Widget are both present in right column", pass: results.desktopAlignment.hasTrendingAside && results.desktopAlignment.hasCounsellingWidget },
    { desc: "Empty void eliminated: Left & Right column heights are well balanced (delta < 60px)", pass: results.desktopAlignment.isWellBalanced },
    { desc: "Clean spacing gap between Trending Stories and Counselling Widget (16-20px)", pass: results.desktopAlignment.gapBetweenComponents >= 16 && results.desktopAlignment.gapBetweenComponents <= 24 },
    { desc: "Counselling button triggers global CounselorModal", pass: results.counsellingModalTrigger },
    { desc: "All 5 viewports have 0px horizontal overflow", pass: results.viewports.every((v) => v.hasZeroOverflow) },
  ];

  console.log("\nTEST SUMMARY ASSERTIONS:");
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
