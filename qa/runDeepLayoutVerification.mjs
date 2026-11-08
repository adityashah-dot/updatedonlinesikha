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

function startStaticSpaServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlObj = new URL(req.url, "http://127.0.0.1:" + port);
      const pathname = decodeURIComponent(urlObj.pathname);
      let filePath = path.join(DIST_DIR, pathname === "/" ? "index.html" : pathname);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          "Content-Type":
            ext === ".html"
              ? "text/html; charset=utf-8"
              : ext === ".js"
              ? "application/javascript; charset=utf-8"
              : ext === ".css"
              ? "text/css; charset=utf-8"
              : ext === ".webp"
              ? "image/webp"
              : "application/octet-stream",
        });
        return res.end(fs.readFileSync(filePath));
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(path.join(DIST_DIR, "index.html")));
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

const MEASURE_EXPR = `(() => {
  const doc = document;
  const docEl = doc.documentElement;
  const innerWidth = window.innerWidth;
  const scrollWidth = docEl.scrollWidth;
  const hasHorizontalOverflow = scrollWidth > innerWidth + 1;

  // Layout measurements
  const layout = doc.querySelector(".exam-layout");
  const layoutStyle = layout ? window.getComputedStyle(layout) : null;
  const mainCol = doc.querySelector(".exam-layout > .bd-stack");
  const prose = doc.querySelector(".exam-layout .bd-prose");
  const aside = doc.querySelector(".exam-layout > aside");
  const toc = doc.querySelector(".exam-layout .bd-toc");

  const layoutMeasurements = {
    layoutGridCols: layoutStyle ? layoutStyle.gridTemplateColumns : null,
    mainColWidth: mainCol ? Math.round(mainCol.getBoundingClientRect().width) : 0,
    proseWidth: prose ? Math.round(prose.getBoundingClientRect().width) : 0,
    asideWidth: aside ? Math.round(aside.getBoundingClientRect().width) : 0,
    tocWidth: toc ? Math.round(toc.getBoundingClientRect().width) : 0,
    isTocSticky: aside ? window.getComputedStyle(aside).position : null,
  };

  // Hero measurements
  const heroSection = doc.querySelector("section.rounded-2xl");
  const heroRect = heroSection ? heroSection.getBoundingClientRect() : { width: 0, height: 0 };
  const heroLeft = heroSection ? heroSection.querySelector(".min-w-0") : null;
  const heroCard = heroSection ? heroSection.querySelector(".shadow-2xs") : null;
  const heroLeftRect = heroLeft ? heroLeft.getBoundingClientRect() : { width: 0, height: 0 };
  const heroCardRect = heroCard ? heroCard.getBoundingClientRect() : { width: 0, height: 0 };

  const heroMeasurements = {
    heroTotalHeight: Math.round(heroRect.height),
    heroTotalWidth: Math.round(heroRect.width),
    leftColWidth: Math.round(heroLeftRect.width),
    leftColHeight: Math.round(heroLeftRect.height),
    cardWidth: Math.round(heroCardRect.width),
    cardHeight: Math.round(heroCardRect.height),
    heightDelta: Math.abs(Math.round(heroLeftRect.height - heroCardRect.height)),
  };

  // Banners Check
  const midBanner = doc.querySelector("aside[aria-label='Exam Preparation Guidance']");
  const midBtn = midBanner ? midBanner.querySelector("button") : null;
  const bottomBanner = doc.querySelector("section[aria-label='Post-Exam Admission & College Guidance']");
  const bottomBtn = bottomBanner ? bottomBanner.querySelector("button") : null;

  const banners = {
    midFound: !!midBanner,
    midHeading: midBanner ? (midBanner.querySelector("h3") || {}).textContent : null,
    midHasClickableBtn: !!midBtn,
    bottomFound: !!bottomBanner,
    bottomHeading: bottomBanner ? (bottomBanner.querySelector("h2") || {}).textContent : null,
    bottomHasClickableBtn: !!bottomBtn,
  };

  // Table audit
  const tables = Array.from(doc.querySelectorAll(".bd-table-wrap")).map((w, idx) => {
    const table = w.querySelector("table");
    const th = w.querySelector("th");
    const thStyle = th ? window.getComputedStyle(th) : null;
    const firstTd = w.querySelector("tbody td");
    const tdStyle = firstTd ? window.getComputedStyle(firstTd) : null;
    return {
      index: idx,
      thBg: thStyle ? thStyle.backgroundColor : "none",
      thColor: thStyle ? thStyle.color : "none",
      tdPadding: tdStyle ? tdStyle.padding : "none",
      isScrollable: w.scrollWidth > w.clientWidth,
      scrollWidth: w.scrollWidth,
      clientWidth: w.clientWidth,
    };
  });

  return {
    hasHorizontalOverflow,
    scrollWidth,
    innerWidth,
    layout: layoutMeasurements,
    hero: heroMeasurements,
    banners,
    tablesCount: tables.length,
    sampleTable: tables[0] || null,
  };
})()`;

async function runDeepVerification() {
  const spaPort = 3155;
  const chromePort = 9380;
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = "http://127.0.0.1:" + spaPort;
  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_deep_layout");
  fs.mkdirSync(chromeProfile, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--remote-debugging-port=" + chromePort,
    "--user-data-dir=" + chromeProfile,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--window-size=1440,1200",
  ]);

  const viewports = [
    { label: "desktop-1440", width: 1440, height: 1000, mobile: false },
    { label: "desktop-1024", width: 1024, height: 900, mobile: false },
    { label: "tablet-768", width: 768, height: 1024, mobile: true },
    { label: "mobile-390", width: 390, height: 844, mobile: true },
    { label: "mobile-360", width: 360, height: 800, mobile: true },
  ];

  const results = { ipsExam: {}, upscExam: {}, jeeMainImages: null };

  let cdp;
  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    // 1. Audit /exams/ips-exam across all 5 viewports
    for (const vp of viewports) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });

      await cdp.send("Page.navigate", { url: `${baseUrl}/exams/ips-exam` });
      await sleep(3500);

      const evalRes = await cdp.send("Runtime.evaluate", {
        expression: MEASURE_EXPR,
        returnByValue: true,
      });

      const shotRes = await cdp.send("Page.captureScreenshot", {
        format: "png",
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height * 2, 2200), scale: 1 },
      });
      const shotPath = path.join(SCREENSHOT_DIR, `ips-exam_${vp.label}.png`);
      fs.writeFileSync(shotPath, Buffer.from(shotRes.data, "base64"));

      results.ipsExam[vp.label] = {
        ...evalRes.result.value,
        screenshot: shotPath,
      };
    }

    // 2. Audit /exams/upsc-cse-exam across viewports
    for (const vp of [viewports[0], viewports[3]]) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });

      await cdp.send("Page.navigate", { url: `${baseUrl}/exams/upsc-cse-exam` });
      await sleep(3500);

      const evalRes = await cdp.send("Runtime.evaluate", {
        expression: MEASURE_EXPR,
        returnByValue: true,
      });

      const shotRes = await cdp.send("Page.captureScreenshot", {
        format: "png",
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height * 2, 2200), scale: 1 },
      });
      const shotPath = path.join(SCREENSHOT_DIR, `upsc-cse-exam_${vp.label}.png`);
      fs.writeFileSync(shotPath, Buffer.from(shotRes.data, "base64"));

      results.upscExam[vp.label] = {
        ...evalRes.result.value,
        screenshot: shotPath,
      };
    }

    // 3. Audit Content Images on /exams/jee-main-exam
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: `${baseUrl}/exams/jee-main-exam` });
    await sleep(3500);

    const jeeRes = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const doc = document;
        const proseImgs = Array.from(doc.querySelectorAll(".bd-prose img")).map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          displayedWidth: Math.round(img.getBoundingClientRect().width),
          displayedHeight: Math.round(img.getBoundingClientRect().height)
        }));
        const heroLogo = doc.querySelector("section.rounded-2xl img");
        return {
          contentImagesCount: proseImgs.length,
          contentImages: proseImgs,
          heroLogo: heroLogo ? {
            src: heroLogo.src,
            alt: heroLogo.alt,
            naturalWidth: heroLogo.naturalWidth,
            naturalHeight: heroLogo.naturalHeight,
          } : null,
        };
      })()`,
      returnByValue: true,
    });
    results.jeeMainImages = jeeRes.result.value;

  } finally {
    if (cdp) await cdp.close();
    chromeProc.kill("SIGKILL");
    await spaServer.close();
  }

  console.log("DEEP_LAYOUT_VERIFICATION_COMPLETE");
  console.log(JSON.stringify(results, null, 2));
}

runDeepVerification().catch((e) => {
  console.error("VERIFICATION FAILED", e);
  process.exit(1);
});
