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

const SIDEBAR_AUDIT_EXPR = `(() => {
  const doc = document;
  const side = doc.querySelector("aside.bd-side");
  const toc = doc.querySelector(".bd-toc");
  const cards = Array.from(doc.querySelectorAll(".exam-sidebar-card"));
  const h1 = doc.querySelector("h1");
  const h2 = doc.querySelector(".bd-prose h2");
  const h3 = doc.querySelector(".bd-prose h3");
  const p = doc.querySelector(".bd-prose p");
  const table = doc.querySelector(".bd-table-wrap table");
  const th = doc.querySelector(".bd-table-wrap th");
  const midBanner = doc.querySelector("aside[aria-label='Exam Preparation Guidance']");
  const bottomBanner = doc.querySelector("section[aria-label='Post-Exam Admission & College Guidance']");
  const heroCard = doc.querySelector("section.rounded-2xl .rounded-xl");
  const heroLeft = doc.querySelector("section.rounded-2xl > div > div:first-child");

  const h1Style = h1 ? window.getComputedStyle(h1) : null;
  const h2Style = h2 ? window.getComputedStyle(h2) : null;
  const h3Style = h3 ? window.getComputedStyle(h3) : null;
  const pStyle = p ? window.getComputedStyle(p) : null;
  const thStyle = th ? window.getComputedStyle(th) : null;
  const sideStyle = side ? window.getComputedStyle(side) : null;

  return {
    hasSide: Boolean(side),
    sideDisplay: sideStyle ? sideStyle.display : null,
    sidePosition: sideStyle ? sideStyle.position : null,
    hasToc: Boolean(toc),
    sidebarCardsCount: cards.length,
    sidebarHeadings: cards.map(c => (c.querySelector("h3") || {}).textContent || ""),
    hasMidBanner: Boolean(midBanner),
    hasBottomBanner: Boolean(bottomBanner),
    heroLeftHeight: heroLeft ? heroLeft.offsetHeight : 0,
    heroCardHeight: heroCard ? heroCard.offsetHeight : 0,
    typography: {
      h1Color: h1Style ? h1Style.color : null,
      h2Color: h2Style ? h2Style.color : null,
      h3Color: h3Style ? h3Style.color : null,
      pColor: pStyle ? pStyle.color : null,
      pLineHeight: pStyle ? pStyle.lineHeight : null,
      thBg: thStyle ? thStyle.backgroundColor : null,
      thColor: thStyle ? thStyle.color : null,
    },
    tableFound: Boolean(table),
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
  };
})()`;

async function main() {
  const SERVER_PORT = 4192;
  const CHROME_PORT = 9244;
  console.log("Starting production static SPA server on port " + SERVER_PORT + "...");
  const server = await startStaticSpaServer(SERVER_PORT);

  const userDataDir = path.join(PROJECT_ROOT, "qa", ".chrome-qa-profile");
  fs.mkdirSync(userDataDir, { recursive: true });

  console.log("Launching headless Chrome on port " + CHROME_PORT + "...");
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

    const TARGETS = [
      { slug: "ips-exam", title: "IPS Exam 2027" },
      { slug: "upsc-cse-exam", title: "UPSC CSE Exam 2027" },
      { slug: "jee-main-exam", title: "JEE Main 2027" },
    ];

    const VIEWPORTS = [
      { name: "desktop-1440", width: 1440, height: 900 },
      { name: "laptop-1024", width: 1024, height: 768 },
      { name: "tablet-768", width: 768, height: 1024 },
      { name: "mobile-390", width: 390, height: 844 },
      { name: "small-mobile-360", width: 360, height: 800 },
    ];

    const results = [];

    for (const target of TARGETS) {
      console.log(`\n================ Testing /exams/${target.slug} ================\n`);
      const targetUrl = `http://127.0.0.1:${SERVER_PORT}/exams/${target.slug}`;

      for (const vp of VIEWPORTS) {
        await cdp.send("Emulation.setDeviceMetricsOverride", {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width <= 768,
        });

        await cdp.send("Page.navigate", { url: targetUrl });
        // Wait for rendering and dynamic queries to complete
        await sleep(2500);

        const evalResult = await cdp.send("Runtime.evaluate", {
          expression: SIDEBAR_AUDIT_EXPR,
          returnByValue: true,
        });

        const audit = evalResult.result.value;

        // Take screenshot
        const screenshotShot = await cdp.send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: false,
        });
        const shotFilename = `${target.slug}_${vp.name}.png`;
        const shotPath = path.join(SCREENSHOT_DIR, shotFilename);
        fs.writeFileSync(shotPath, Buffer.from(screenshotShot.data, "base64"));

        console.log(`[${target.slug}] Viewport: ${vp.name} (${vp.width}x${vp.height})`);
        console.log(`  - Horizontal Overflow: ${audit.hasOverflow ? "FAIL" : "PASS (0px)"} (scrollWidth=${audit.scrollWidth}, innerWidth=${audit.innerWidth})`);
        console.log(`  - Has Sidebar: ${audit.hasSide}, Sidebar Cards: ${audit.sidebarCardsCount}, Headings: ${audit.sidebarHeadings.join(" | ")}`);
        console.log(`  - Has Mid Banner: ${audit.hasMidBanner}, Has Bottom Banner: ${audit.hasBottomBanner}`);
        console.log(`  - Hero Left H: ${audit.heroLeftHeight}px, Hero Card H: ${audit.heroCardHeight}px`);
        if (vp.width >= 1024) {
          console.log(`  - Colors: H1=${audit.typography.h1Color}, H2=${audit.typography.h2Color}, H3=${audit.typography.h3Color}, Body=${audit.typography.pColor}, TableHeader=${audit.typography.thBg}`);
        }
        console.log(`  - Screenshot saved: ${shotPath}`);

        results.push({
          slug: target.slug,
          viewport: vp.name,
          width: vp.width,
          audit,
          screenshot: shotPath,
        });
      }
    }

    console.log("\n>>> ALL TESTS COMPLETED SUCCESSFULLY <<<");
    fs.writeFileSync(
      path.join(PROJECT_ROOT, "qa", "task-final-exam-detail-audit.json"),
      JSON.stringify(results, null, 2)
    );
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
