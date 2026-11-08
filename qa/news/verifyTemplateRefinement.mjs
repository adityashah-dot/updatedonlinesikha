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
const TEMP_PROFILE_DIR = path.join(PROJECT_ROOT, "qa", ".temp-chrome-refinement-qa");

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

  close() {
    try {
      this.ws.close();
    } catch {}
  }
}

async function getWsUrl(port) {
  for (let i = 0; i < 30; i++) {
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
  throw new Error("Could not connect to Chrome debugging port");
}

const VIEWPORTS = [
  { name: "Desktop Large", width: 1440, height: 900 },
  { name: "Desktop Small", width: 1024, height: 768 },
  { name: "Tablet Portrait", width: 768, height: 1024 },
  { name: "Mobile Standard", width: 390, height: 844 },
  { name: "Mobile Compact", width: 360, height: 740 },
];

async function runRefinementVerification() {
  console.log("==================================================================");
  console.log("TASK 10H – NEWS LISTING TEMPLATE UI REFINEMENT VERIFICATION");
  console.log("==================================================================\n");

  const PORT = 4182;
  const server = await startStaticSpaServer(PORT);
  console.log(`[Setup] SPA static server running on http://127.0.0.1:${PORT}`);

  try {
    fs.mkdirSync(TEMP_PROFILE_DIR, { recursive: true });
  } catch {}

  const CDP_PORT = 9222;
  const chromeProc = spawn(
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
    typography: {},
    ticker: {},
    trendingSpacing: {},
    viewports: [],
  };

  try {
    const wsUrl = await getWsUrl(CDP_PORT);
    client = new CDPClient(wsUrl);
    await client.connect();
    await client.send("Runtime.enable");
    await client.send("Page.enable");
    await client.send("DOM.enable");

    // Set 1440px viewport
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log("\nNavigating to /news listing page...");
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news` });
    await sleep(2500);

    // -------------------------------------------------------------
    // TEST 1: Heading Typography Verification
    // -------------------------------------------------------------
    console.log("\n[Test 1] Heading Typography Inspection...");
    const typoDesktop = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-listing-h1, h1");
        const style = window.getComputedStyle(h1);
        return {
          text: h1?.innerText?.trim(),
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          color: style.color,
          letterSpacing: style.letterSpacing,
          hasNewsListingClass: h1.classList.contains("news-listing-h1"),
        };
      })()
    `);

    // Tablet typography
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);
    const typoTablet = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-listing-h1, h1");
        const style = window.getComputedStyle(h1);
        return { fontSize: style.fontSize, fontWeight: style.fontWeight };
      })()
    `);

    // Mobile typography
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await sleep(300);
    const typoMobile = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-listing-h1, h1");
        const style = window.getComputedStyle(h1);
        return { fontSize: style.fontSize, fontWeight: style.fontWeight };
      })()
    `);

    // Reset to desktop
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);

    results.typography = {
      text: typoDesktop.text,
      fontFamily: typoDesktop.fontFamily,
      fontWeight: typoDesktop.fontWeight,
      fontSizeDesktop: typoDesktop.fontSize,
      fontSizeTablet: typoTablet.fontSize,
      fontSizeMobile: typoMobile.fontSize,
      passed:
        typoDesktop.hasNewsListingClass &&
        typoDesktop.fontWeight === "700" &&
        typoDesktop.fontSize === "42px" &&
        typoTablet.fontSize === "34px" &&
        typoMobile.fontSize === "28px",
    };

    console.log(`  ✓ Heading Target: "${typoDesktop.text}"`);
    console.log(`  ✓ Font Family: ${typoDesktop.fontFamily}`);
    console.log(`  ✓ Font Weight: ${typoDesktop.fontWeight} (Bold / 700)`);
    console.log(`  ✓ Responsive Scale: Desktop=${typoDesktop.fontSize} (42px) | Tablet=${typoTablet.fontSize} (34px) | Mobile=${typoMobile.fontSize} (28px)`);
    console.log(`  ✓ Typography Verification: ${results.typography.passed ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // TEST 2: Flash Alerts Ticker Usability & Controls
    // -------------------------------------------------------------
    console.log("\n[Test 2] Flash Alerts Ticker Inspection & Pause/Resume Control...");

    const tickerInitial = await client.eval(`
      (() => {
        const aside = document.querySelector("aside[aria-label='Breaking News Alerts']");
        const badge = aside ? aside.querySelector("div") : null;
        const track = document.querySelector(".news-ticker-track");
        const pauseBtn = aside ? aside.querySelector("button") : null;
        const links = track ? Array.from(track.querySelectorAll("a")) : [];
        const trackStyle = track ? window.getComputedStyle(track) : {};

        return {
          hasAside: !!aside,
          badgeText: badge?.innerText?.replace(/\\s+/g, " ")?.trim(),
          hasTrack: !!track,
          animationName: trackStyle.animationName,
          playState: trackStyle.animationPlayState,
          hasPauseBtn: !!pauseBtn,
          pauseBtnAria: pauseBtn?.getAttribute("aria-label"),
          linkCount: links.length,
          sampleHref: links[0]?.getAttribute("href"),
        };
      })()
    `);

    // Test clicking the pause button
    console.log("  Testing Pause button interaction...");
    await client.eval(`
      (() => {
        const pauseBtn = document.querySelector("aside[aria-label='Breaking News Alerts'] button");
        if (pauseBtn) pauseBtn.click();
      })()
    `);
    await sleep(300);

    const tickerPaused = await client.eval(`
      (() => {
        const track = document.querySelector(".news-ticker-track");
        const pauseBtn = document.querySelector("aside[aria-label='Breaking News Alerts'] button");
        const trackStyle = window.getComputedStyle(track);
        return {
          hasPausedClass: track.classList.contains("news-ticker-paused"),
          playState: trackStyle.animationPlayState,
          pauseBtnAria: pauseBtn?.getAttribute("aria-label"),
        };
      })()
    `);

    // Test clicking resume button
    console.log("  Testing Resume button interaction...");
    await client.eval(`
      (() => {
        const resumeBtn = document.querySelector("aside[aria-label='Breaking News Alerts'] button");
        if (resumeBtn) resumeBtn.click();
      })()
    `);
    await sleep(300);

    const tickerResumed = await client.eval(`
      (() => {
        const track = document.querySelector(".news-ticker-track");
        const pauseBtn = document.querySelector("aside[aria-label='Breaking News Alerts'] button");
        const trackStyle = window.getComputedStyle(track);
        return {
          hasPausedClass: track.classList.contains("news-ticker-paused"),
          playState: trackStyle.animationPlayState,
          pauseBtnAria: pauseBtn?.getAttribute("aria-label"),
        };
      })()
    `);

    // Test prefers-reduced-motion
    console.log("  Testing prefers-reduced-motion: reduce...");
    await client.send("Emulation.setEmulatedMedia", {
      media: "screen",
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    await sleep(300);

    const reducedMotionState = await client.eval(`
      (() => {
        const track = document.querySelector(".news-ticker-track");
        const style = window.getComputedStyle(track);
        return {
          animation: style.animation,
          animationName: style.animationName,
        };
      })()
    `);

    // Reset media emulation
    await client.send("Emulation.setEmulatedMedia", { media: "screen", features: [] });
    await sleep(200);

    const tickerPass =
      tickerInitial.hasAside &&
      tickerInitial.hasTrack &&
      tickerInitial.hasPauseBtn &&
      tickerPaused.hasPausedClass &&
      tickerPaused.playState === "paused" &&
      !tickerResumed.hasPausedClass &&
      reducedMotionState.animationName === "none";

    results.ticker = {
      badgeText: tickerInitial.badgeText,
      initialPlayState: tickerInitial.playState,
      pausedPlayState: tickerPaused.playState,
      resumedPlayState: tickerResumed.playState,
      reducedMotionAnimationName: reducedMotionState.animationName,
      passed: tickerPass,
    };

    console.log(`  ✓ Ticker Label: "${tickerInitial.badgeText}"`);
    console.log(`  ✓ Initial Animation Play State: ${tickerInitial.playState}`);
    console.log(`  ✓ Pause Button Clicked: class="news-ticker-paused", playState="${tickerPaused.playState}", aria="${tickerPaused.pauseBtnAria}"`);
    console.log(`  ✓ Resume Button Clicked: class removed, playState="${tickerResumed.playState}", aria="${tickerResumed.pauseBtnAria}"`);
    console.log(`  ✓ Reduced-Motion Emulation: animationName="${reducedMotionState.animationName}" (none)`);
    console.log(`  ✓ Flash Alerts Usability & Accessibility: ${tickerPass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // TEST 3: Trending Stories Empty Space & Height Inspection
    // -------------------------------------------------------------
    console.log("\n[Test 3] Trending Stories Spacing & Height Inspection...");
    const trendingLayout = await client.eval(`
      (() => {
        const heroArticle = document.querySelector("section[aria-label='Featured Story and Trending Headlines'] article");
        const trendingAside = document.querySelector("aside[aria-label='Trending Education Stories']");
        const trendingList = trendingAside ? trendingAside.querySelector(".space-y-3\\\\.5") : null;
        const stories = trendingAside ? Array.from(trendingAside.querySelectorAll("article")) : [];
        const footerBar = trendingAside ? trendingAside.querySelector(".rounded-b-2xl") : null;

        const heroRect = heroArticle ? heroArticle.getBoundingClientRect() : {};
        const asideRect = trendingAside ? trendingAside.getBoundingClientRect() : {};

        // Measure distance between last story and footer bar
        const lastStory = stories[stories.length - 1];
        const lastStoryRect = lastStory ? lastStory.getBoundingClientRect() : {};
        const footerRect = footerBar ? footerBar.getBoundingClientRect() : {};
        const distanceToFooter = footerRect.top - lastStoryRect.bottom;

        return {
          hasSelfStart: trendingAside ? trendingAside.classList.contains("self-start") : false,
          heroHeight: Math.round(heroRect.height),
          asideHeight: Math.round(asideRect.height),
          storyCount: stories.length,
          distanceToFooter: Math.round(distanceToFooter),
          isCompact: asideRect.height < heroRect.height,
        };
      })()
    `);

    const spacingPass =
      trendingLayout.hasSelfStart &&
      trendingLayout.isCompact &&
      trendingLayout.distanceToFooter <= 20;

    results.trendingSpacing = {
      heroHeight: trendingLayout.heroHeight,
      asideHeight: trendingLayout.asideHeight,
      distanceToFooter: trendingLayout.distanceToFooter,
      passed: spacingPass,
    };

    console.log(`  ✓ Trending Aside has "self-start": ${trendingLayout.hasSelfStart}`);
    console.log(`  ✓ Lead Hero Height: ${trendingLayout.heroHeight}px | Trending Aside Height: ${trendingLayout.asideHeight}px`);
    console.log(`  ✓ Trending aside is natural height (not stretched): ${trendingLayout.isCompact}`);
    console.log(`  ✓ Distance between story 3 and footer bar: ${trendingLayout.distanceToFooter}px (clean compact spacing)`);
    console.log(`  ✓ Trending Spacing Verification: ${spacingPass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // TEST 4: Responsive Viewport Overflow Audit (1440, 1024, 768, 390, 360px)
    // -------------------------------------------------------------
    console.log("\n[Test 4] Responsive Viewport Audit for 0px Overflow...");
    for (const vp of VIEWPORTS) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 1024,
      });
      await sleep(350);

      const overflow = await client.eval(`
        (() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const bodyWidth = document.body.scrollWidth;
          return {
            docWidth,
            winWidth,
            bodyWidth,
            hasHorizontalOverflow: docWidth > winWidth || bodyWidth > winWidth,
            overflowDiff: Math.max(0, docWidth - winWidth, bodyWidth - winWidth),
          };
        })()
      `);

      const vpResult = {
        viewport: vp.name,
        width: vp.width,
        scrollWidth: overflow.docWidth,
        overflowDiff: overflow.overflowDiff,
        passed: !overflow.hasHorizontalOverflow,
      };
      results.viewports.push(vpResult);

      console.log(
        `  ${vpResult.passed ? "✓ PASS" : "✗ FAIL"}: ${vp.name.padEnd(20)} | Width: ${vp.width}px | Scroll: ${overflow.docWidth}px | Overflow: ${overflow.overflowDiff}px`
      );
    }
  } finally {
    if (client) client.close();
    chromeProc.kill();
    server.close();

    // Clean up temporary profile
    try {
      fs.rmSync(TEMP_PROFILE_DIR, { recursive: true, force: true });
    } catch {}
  }

  const allVpPass = results.viewports.every((v) => v.passed);
  console.log("\n==================================================================");
  console.log("FINAL TEMPLATE REFINEMENT QA SUMMARY:");
  console.log(`1. Heading Typography Hierarchy: ${results.typography.passed ? "PASSED (Matches Courses/Exams scale)" : "FAILED"}`);
  console.log(`2. Flash Alerts Usability & Accessibility: ${results.ticker.passed ? "PASSED (Accessible Pause/Resume & Reduced-Motion)" : "FAILED"}`);
  console.log(`3. Trending Stories Compact Spacing: ${results.trendingSpacing.passed ? "PASSED (No excessive empty void, self-start height)" : "FAILED"}`);
  console.log(`4. Zero Horizontal Scrollbar across all 5 viewports: ${allVpPass ? "PASSED (0px overflow)" : "FAILED"}`);
  console.log("==================================================================\n");

  const overall = results.typography.passed && results.ticker.passed && results.trendingSpacing.passed && allVpPass;
  if (!overall) {
    throw new Error("One or more refinement verification checks failed!");
  }

  return results;
}

runRefinementVerification().catch((err) => {
  console.error("Refinement QA script failed:", err);
  process.exit(1);
});
