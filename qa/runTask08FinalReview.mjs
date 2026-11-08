import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, "qa", "screenshots", "task08_final_review");
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
      const urlObj = new URL(req.url, `http://127.0.0.1:${port}`);
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
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((p) => p.type === "page");
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {}
    await sleep(250);
  }
  throw new Error("Could not connect to Chrome page debugging target");
}

async function runReview() {
  const spaPort = 3133;
  const chromePort = 9355;

  console.log(`Starting SPA static server on port ${spaPort}...`);
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = `http://127.0.0.1:${spaPort}`;
  console.log(`SPA server ready at ${baseUrl}`);

  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_final_review");
  fs.mkdirSync(chromeProfile, { recursive: true });

  console.log(`Spawning Chrome on port ${chromePort}...`);
  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${chromePort}`,
    `--user-data-dir=${chromeProfile}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--window-size=1440,1200",
  ]);

  let cdp;
  const report = {
    online_bca: {},
    lpu_online: {},
    bca_aiml: {},
    recruiter_list_verification: {},
    console_errors: [],
  };

  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    console.log(`Connected to Chrome WS: ${wsUrl}`);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Log.enable");

    const viewports = [
      { name: "desktop_1440", width: 1440, height: 1000 },
      { name: "laptop_1024", width: 1024, height: 900 },
      { name: "tablet_768", width: 768, height: 1024 },
      { name: "mobile_390", width: 390, height: 844 },
      { name: "mobile_360", width: 360, height: 740 },
    ];

    // ==========================================
    // 1. ONLINE BCA TEST ACROSS 5 VIEWPORTS
    // ==========================================
    for (const vp of viewports) {
      console.log(`\n[Online BCA] Testing ${vp.name} (${vp.width}x${vp.height})...`);
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768,
      });

      await cdp.send("Page.navigate", { url: `${baseUrl}/courses/online-bca` });
      await sleep(2500);

      const data = await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          const doc = document;
          const showcase = doc.querySelector('[data-testid="recruiters-showcase"]');
          const cards = showcase ? Array.from(showcase.querySelectorAll('.grid > div')) : [];
          const heading = doc.querySelector('#cms-sec-section-1767375817293') || 
                          Array.from(doc.querySelectorAll('h2')).find(h => /top recruiters/i.test(h.textContent));
          
          let gridCols = 0;
          if (cards.length >= 2) {
            const firstTop = cards[0].getBoundingClientRect().top;
            gridCols = cards.filter(c => Math.abs(c.getBoundingClientRect().top - firstTop) < 5).length;
          }

          const cardNames = cards.map(c => {
            const label = c.querySelector('span:not(.recruiter-fallback-name)');
            const img = c.querySelector('img');
            const fallback = c.querySelector('.recruiter-fallback-name');
            return {
              name: label ? label.textContent.trim() : '',
              hasLogoImg: Boolean(img && img.style.display !== 'none' && img.src),
              logoSrc: img ? img.getAttribute('src') : null,
              hasFallback: Boolean(fallback && !fallback.classList.contains('hidden') && fallback.style.display !== 'none'),
              width: Math.round(c.getBoundingClientRect().width),
              height: Math.round(c.getBoundingClientRect().height),
            };
          });

          return {
            scrollWidth: doc.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
            headingText: heading ? heading.textContent.trim() : null,
            cardCount: cards.length,
            gridCols,
            cardNames,
          };
        })()`,
        returnByValue: true,
      });

      const res = data.result.value;
      report.online_bca[vp.name] = {
        scrollWidth: res.scrollWidth,
        innerWidth: res.innerWidth,
        hasOverflow: res.hasOverflow,
        headingText: res.headingText,
        cardCount: res.cardCount,
        gridCols: res.gridCols,
        cardHeight: res.cardNames[0]?.height,
      };

      if (vp.name === "desktop_1440") {
        report.recruiter_list_verification = {
          count: res.cardNames.length,
          names: res.cardNames.map(c => c.name),
          cardsWithGenuineLogos: res.cardNames.filter(c => c.hasLogoImg).map(c => ({ name: c.name, src: c.logoSrc })),
          cardsWithTextFallback: res.cardNames.filter(c => !c.hasLogoImg).map(c => c.name),
        };
      }

      console.log(`  Cards: ${res.cardCount}, Columns: ${res.gridCols}, Height: ${res.cardNames[0]?.height}px, Overflow: ${res.hasOverflow}`);

      // Scroll to recruiter showcase for screenshot
      await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector('[data-testid="recruiters-showcase"]') || 
                     Array.from(document.querySelectorAll('h2')).find(h => /top recruiters/i.test(h.textContent));
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()`,
      });
      await sleep(500);

      const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
      const filename = path.join(SCREENSHOT_DIR, `online_bca_${vp.name}.png`);
      fs.writeFileSync(filename, Buffer.from(shot.data, "base64"));
      console.log(`  Saved screenshot: ${filename}`);
    }

    // ==========================================
    // 2. UNIVERSITY DETAIL TEST ACROSS 5 VIEWPORTS
    // ==========================================
    for (const vp of viewports) {
      console.log(`\n[LPU Online] Testing ${vp.name} (${vp.width}x${vp.height})...`);
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768,
      });

      await cdp.send("Page.navigate", { url: `${baseUrl}/universities/lpu-online` });
      await sleep(2500);

      const uniData = await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          const doc = document;
          const placementSec = doc.querySelector('#placements');
          const showcase = doc.querySelector('[data-testid="recruiters-showcase"]') ||
                           (placementSec ? placementSec.querySelector('.grid') : null);
          const cards = showcase ? Array.from(showcase.querySelectorAll(':scope > div')) : [];

          let gridCols = 0;
          if (cards.length >= 2) {
            const firstTop = cards[0].getBoundingClientRect().top;
            gridCols = cards.filter(c => Math.abs(c.getBoundingClientRect().top - firstTop) < 5).length;
          }

          return {
            scrollWidth: doc.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
            placementSecFound: Boolean(placementSec),
            recruiterCardsCount: cards.length,
            gridCols,
            cardHeight: cards[0] ? Math.round(cards[0].getBoundingClientRect().height) : null,
          };
        })()`,
        returnByValue: true,
      });

      const uRes = uniData.result.value;
      report.lpu_online[vp.name] = {
        scrollWidth: uRes.scrollWidth,
        innerWidth: uRes.innerWidth,
        hasOverflow: uRes.hasOverflow,
        placementSecFound: uRes.placementSecFound,
        recruiterCardsCount: uRes.recruiterCardsCount,
        gridCols: uRes.gridCols,
        cardHeight: uRes.cardHeight,
      };

      console.log(`  Placement sec found: ${uRes.placementSecFound}, Cards: ${uRes.recruiterCardsCount}, Overflow: ${uRes.hasOverflow}`);

      await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector('#placements');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()`,
      });
      await sleep(500);

      const uniShot = await cdp.send("Page.captureScreenshot", { format: "png" });
      const filename = path.join(SCREENSHOT_DIR, `lpu_online_${vp.name}.png`);
      fs.writeFileSync(filename, Buffer.from(uniShot.data, "base64"));
      console.log(`  Saved screenshot: ${filename}`);
    }

    // ==========================================
    // 3. COURSE WITHOUT RECRUITER DATA
    // ==========================================
    console.log(`\n[Course Without Recruiters] Testing /courses/online-bca-in-ai-and-ml...`);
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: `${baseUrl}/courses/online-bca-in-ai-and-ml` });
    await sleep(2500);

    const bcaAimlEval = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const showcase = document.querySelector('[data-testid="recruiters-showcase"]');
        const recruiterHeadings = Array.from(document.querySelectorAll('h2, h3'))
          .filter(h => /top recruiters/i.test(h.textContent));
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          showcaseFound: Boolean(showcase),
          recruiterHeadingsFound: recruiterHeadings.map(h => h.textContent.trim()),
        };
      })()`,
      returnByValue: true,
    });
    report.bca_aiml = bcaAimlEval.result.value;
    console.log(`  Showcase found: ${report.bca_aiml.showcaseFound}, Headings: ${JSON.stringify(report.bca_aiml.recruiterHeadingsFound)}`);

    const aimlShot = await cdp.send("Page.captureScreenshot", { format: "png" });
    const aimlFilename = path.join(SCREENSHOT_DIR, "bca_aiml_no_recruiters_1440.png");
    fs.writeFileSync(aimlFilename, Buffer.from(aimlShot.data, "base64"));
    console.log(`  Saved screenshot: ${aimlFilename}`);

    report.console_errors = cdp.consoleErrors;

  } finally {
    if (cdp) cdp.close();
    chromeProc.kill();
    spaServer.close();
    try {
      fs.rmSync(chromeProfile, { recursive: true, force: true });
    } catch {}
    console.log("\nCleaned up Chrome and SPA server.");
  }

  const reportFile = path.join(PROJECT_ROOT, "qa", "task08_final_review.json");
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`Report written to ${reportFile}`);
}

runReview().catch((err) => {
  console.error("Review Error:", err);
  process.exit(1);
});
