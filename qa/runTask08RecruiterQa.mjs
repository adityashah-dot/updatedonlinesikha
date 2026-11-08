import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, "qa", "screenshots", "task08_recruiters");
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

async function runTask08Qa() {
  const spaPort = 3125;
  const chromePort = 9348;

  console.log(`Starting SPA static server on port ${spaPort}...`);
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = `http://127.0.0.1:${spaPort}`;
  console.log(`SPA server ready at ${baseUrl}`);

  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_task08");
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
  const metricsReport = {};

  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    console.log(`Connected to Chrome page WS: ${wsUrl}`);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("Runtime.enable");

    const viewports = [
      { name: "desktop_1440", width: 1440, height: 1000 },
      { name: "laptop_1024", width: 1024, height: 900 },
      { name: "tablet_768", width: 768, height: 1024 },
      { name: "mobile_390", width: 390, height: 844 },
    ];

    // 1. Audit Online BCA: /courses/online-bca
    metricsReport["online_bca"] = {};
    for (const vp of viewports) {
      console.log(`\nTesting /courses/online-bca at ${vp.name} (${vp.width}x${vp.height})...`);
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768,
      });

      await cdp.send("Page.navigate", { url: `${baseUrl}/courses/online-bca` });
      await sleep(2500);

      // Measure recruiter showcase
      const evalRes = await cdp.send("Runtime.evaluate", {
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

          const cardMetrics = cards.map(c => {
            const rect = c.getBoundingClientRect();
            const img = c.querySelector('img');
            const fallback = c.querySelector('.recruiter-fallback-name');
            const label = c.querySelector('span:not(.recruiter-fallback-name)');
            return {
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              hasImg: Boolean(img && img.style.display !== 'none'),
              imgSrc: img ? img.getAttribute('src') : null,
              imgWidth: img ? Math.round(img.getBoundingClientRect().width) : 0,
              imgHeight: img ? Math.round(img.getBoundingClientRect().height) : 0,
              hasFallback: Boolean(fallback && !fallback.classList.contains('hidden') && fallback.style.display !== 'none'),
              labelText: label ? label.textContent.trim() : '',
            };
          });

          return {
            scrollWidth: doc.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
            headingText: heading ? heading.textContent.trim() : null,
            headingTag: heading ? heading.tagName : null,
            showcaseFound: Boolean(showcase),
            cardCount: cards.length,
            gridCols,
            firstCard: cardMetrics[0] || null,
            sampleCards: cardMetrics.slice(0, 12),
          };
        })()`,
        returnByValue: true,
      });

      const metrics = evalRes.result.value;
      metricsReport["online_bca"][vp.name] = metrics;
      console.log(`  Heading: "${metrics.headingText}" (${metrics.headingTag})`);
      console.log(`  Showcase found: ${metrics.showcaseFound}, Cards: ${metrics.cardCount}, Grid columns: ${metrics.gridCols}, Overflow: ${metrics.hasOverflow}`);
      if (metrics.firstCard) {
        console.log(`  First card size: ${metrics.firstCard.width}x${metrics.firstCard.height}px, Image: ${metrics.firstCard.imgSrc}`);
      }

      // Scroll to recruiter showcase for screenshot
      await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector('[data-testid="recruiters-showcase"]') || 
                     Array.from(document.querySelectorAll('h2')).find(h => /top recruiters/i.test(h.textContent));
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()`,
      });
      await sleep(600);

      const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
      const filename = path.join(SCREENSHOT_DIR, `recruiters_online_bca_${vp.name}.png`);
      fs.writeFileSync(filename, Buffer.from(shot.data, "base64"));
      console.log(`  Saved screenshot: ${filename}`);
    }

    // 2. Audit University Detail: /universities/lpu-online for direct visual comparison
    console.log(`\nTesting /universities/lpu-online at desktop_1440 for design reference comparison...`);
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: `${baseUrl}/universities/lpu-online` });
    await sleep(2500);

    await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('#placements') || 
                   Array.from(document.querySelectorAll('h2, h3')).find(h => /recruiting partners|placements/i.test(h.textContent));
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`,
    });
    await sleep(600);
    const uniShot = await cdp.send("Page.captureScreenshot", { format: "png" });
    const uniFilename = path.join(SCREENSHOT_DIR, "reference_university_detail_desktop_1440.png");
    fs.writeFileSync(uniFilename, Buffer.from(uniShot.data, "base64"));
    console.log(`  Saved screenshot: ${uniFilename}`);

    // 3. Audit /courses/online-bca-in-ai-and-ml (Course without recruiter data in API)
    console.log(`\nTesting /courses/online-bca-in-ai-and-ml to verify graceful handling when no recruiter data in API...`);
    await cdp.send("Page.navigate", { url: `${baseUrl}/courses/online-bca-in-ai-and-ml` });
    await sleep(2500);

    const bcaAimlEval = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const showcase = document.querySelector('[data-testid="recruiters-showcase"]');
        const recruiterHeadings = Array.from(document.querySelectorAll('h2, h3'))
          .filter(h => /top recruiters/i.test(h.textContent));
        return {
          showcaseFound: Boolean(showcase),
          recruiterHeadingsFound: recruiterHeadings.map(h => h.textContent.trim()),
        };
      })()`,
      returnByValue: true,
    });
    metricsReport["online_bca_aiml"] = bcaAimlEval.result.value;
    console.log(`  Online BCA in AI & ML - Showcase rendered: ${metricsReport["online_bca_aiml"].showcaseFound}`);
    console.log(`  Recruiter headings found: ${JSON.stringify(metricsReport["online_bca_aiml"].recruiterHeadingsFound)}`);

    const noRecruiterShot = await cdp.send("Page.captureScreenshot", { format: "png" });
    const noRecruiterFilename = path.join(SCREENSHOT_DIR, "bca_aiml_no_fake_recruiters_desktop_1440.png");
    fs.writeFileSync(noRecruiterFilename, Buffer.from(noRecruiterShot.data, "base64"));
    console.log(`  Saved screenshot: ${noRecruiterFilename}`);

  } finally {
    if (cdp) cdp.close();
    chromeProc.kill();
    spaServer.close();
    try {
      fs.rmSync(chromeProfile, { recursive: true, force: true });
    } catch {}
    console.log("Cleaned up Chrome and SPA server.");
  }

  const reportPath = path.join(PROJECT_ROOT, "qa", "task08_recruiters_qa.json");
  fs.writeFileSync(reportPath, JSON.stringify(metricsReport, null, 2));
  console.log(`\nTask 08 QA metrics report saved to ${reportPath}`);
}

runTask08Qa().catch((err) => {
  console.error("Task 08 QA Error:", err);
  process.exit(1);
});
