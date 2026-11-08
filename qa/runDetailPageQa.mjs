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
              : ext === ".png"
              ? "image/png"
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

const DETAIL_INSPECT_EXPR = `(() => {
  const doc = document;
  const docEl = doc.documentElement;
  const body = doc.body;

  // Overflow check
  const scrollWidth = docEl.scrollWidth;
  const clientWidth = docEl.clientWidth;
  const innerWidth = window.innerWidth;
  const hasHorizontalOverflow = scrollWidth > innerWidth + 1;

  // Hero inspection
  const heroHeading = (doc.querySelector("h1.course-detail-h1") || {}).textContent || "";
  const heroLogoImg = doc.querySelector("section.rounded-2xl img");
  const heroLogo = heroLogoImg ? {
    src: heroLogoImg.src,
    alt: heroLogoImg.alt,
    complete: heroLogoImg.complete,
    naturalWidth: heroLogoImg.naturalWidth,
    naturalHeight: heroLogoImg.naturalHeight
  } : null;
  const quickFacts = Array.from(doc.querySelectorAll("dl div")).map(d => ({
    term: (d.querySelector("dt") || {}).textContent || "",
    value: (d.querySelector("dd") || {}).textContent || ""
  }));

  // Mid-content Banner inspection
  const midBanner = doc.querySelector("aside[aria-label='Exam Preparation Guidance']");
  const midBannerData = midBanner ? {
    found: true,
    heading: (midBanner.querySelector("h3") || {}).textContent || "",
    buttonText: (midBanner.querySelector("button") || {}).textContent || "",
    checks: Array.from(midBanner.querySelectorAll("span")).map(s => s.textContent.trim()).filter(t => t.length > 5)
  } : { found: false };

  // Bottom CTA Banner inspection
  const bottomBanner = doc.querySelector("section[aria-label='Post-Exam Admission & College Guidance']");
  const bottomBannerData = bottomBanner ? {
    found: true,
    heading: (bottomBanner.querySelector("h2") || {}).textContent || "",
    buttons: Array.from(bottomBanner.querySelectorAll("button, a")).map(b => b.textContent.trim())
  } : { found: false };

  // Table inspection
  const tableWrappers = Array.from(doc.querySelectorAll(".bd-table-wrap"));
  const tables = tableWrappers.map((w, idx) => {
    const table = w.querySelector("table");
    const ths = Array.from(w.querySelectorAll("th")).map(th => {
      const style = window.getComputedStyle(th);
      return {
        text: th.textContent.trim(),
        bgColor: style.backgroundColor,
        color: style.color
      };
    });
    const trs = Array.from(w.querySelectorAll("tbody tr"));
    const rowBgColors = trs.slice(0, 3).map(tr => {
      const td = tr.querySelector("td");
      return td ? window.getComputedStyle(td).backgroundColor : "";
    });
    return {
      index: idx,
      headersCount: ths.length,
      rowsCount: trs.length,
      headers: ths.slice(0, 3),
      rowBgColors: rowBgColors,
      scrollWidth: w.scrollWidth,
      clientWidth: w.clientWidth,
      isScrollable: w.scrollWidth > w.clientWidth
    };
  });

  // Related Exams inspection
  const relatedCards = Array.from(doc.querySelectorAll("section article, .grid article")).map(a => {
    const title = (a.querySelector("h3") || {}).textContent || "";
    const img = a.querySelector("img");
    return {
      title,
      hasImage: !!img,
      imageSrc: img ? img.src : null,
      imageNaturalWidth: img ? img.naturalWidth : 0
    };
  });

  return {
    hasHorizontalOverflow,
    scrollWidth,
    innerWidth,
    heroHeading,
    heroLogo,
    quickFactsCount: quickFacts.length,
    quickFacts,
    midBanner: midBannerData,
    bottomBanner: bottomBannerData,
    tablesCount: tables.length,
    sampleTables: tables.slice(0, 3),
    relatedCardsCount: relatedCards.length,
    relatedCards: relatedCards.slice(0, 3)
  };
})()`;

async function runQa() {
  const spaPort = 3140;
  const chromePort = 9362;
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = "http://127.0.0.1:" + spaPort;
  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_detail_qa");
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

  const examsToTest = ["cat-exam", "hbse-board-exam", "gate-exam"];
  const summary = {};

  let cdp;
  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    for (const examSlug of examsToTest) {
      summary[examSlug] = {};
      for (const vp of viewports) {
        await cdp.send("Emulation.setDeviceMetricsOverride", {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.mobile,
        });

        const url = `${baseUrl}/exams/${examSlug}`;
        await cdp.send("Page.navigate", { url });
        await sleep(3500);

        const evalRes = await cdp.send("Runtime.evaluate", {
          expression: DETAIL_INSPECT_EXPR,
          returnByValue: true,
        });

        if (evalRes.exceptionDetails) {
          console.error("EXPR EXCEPTION:", evalRes.exceptionDetails);
        }

        const data = evalRes.result.value || {};

        // Capture screenshot of the top hero & content
        const screenshotRes = await cdp.send("Page.captureScreenshot", {
          format: "png",
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height * 2, 2200), scale: 1 },
        });

        const shotFilename = `${examSlug}_${vp.label}.png`;
        const shotPath = path.join(SCREENSHOT_DIR, shotFilename);
        fs.writeFileSync(shotPath, Buffer.from(screenshotRes.data, "base64"));

        summary[examSlug][vp.label] = {
          hasHorizontalOverflow: data.hasHorizontalOverflow,
          scrollWidth: data.scrollWidth,
          innerWidth: data.innerWidth,
          heroLogoOk: data.heroLogo ? (data.heroLogo.complete && data.heroLogo.naturalWidth > 0) : "no-logo",
          midBannerFound: data.midBanner.found,
          bottomBannerFound: data.bottomBanner.found,
          tablesCount: data.tablesCount,
          quickFactsCount: data.quickFactsCount,
          screenshot: shotPath,
          sampleTable: data.sampleTables[0] || null,
        };
      }
    }
  } finally {
    if (cdp) await cdp.close();
    chromeProc.kill("SIGKILL");
    await spaServer.close();
  }

  console.log("DETAIL_PAGE_QA_SUMMARY_BEGIN");
  console.log(JSON.stringify(summary, null, 2));
  console.log("DETAIL_PAGE_QA_SUMMARY_END");
}

runQa().catch((err) => {
  console.error("QA RUNNER ERROR:", err);
  process.exit(1);
});
