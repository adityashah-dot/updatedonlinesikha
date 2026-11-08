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

async function captureSections() {
  const spaPort = 3144;
  const chromePort = 9368;
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = "http://127.0.0.1:" + spaPort;
  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_section_qa");
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

  let cdp;
  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await cdp.send("Page.navigate", { url: `${baseUrl}/exams/cat-exam` });
    await sleep(3500);

    // 1. Capture Mid Banner
    const midBox = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector("aside[aria-label='Exam Preparation Guidance']");
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        const rect = el.getBoundingClientRect();
        return { x: 0, y: Math.max(0, window.scrollY + rect.top - 50), width: 1440, height: rect.height + 100 };
      })()`,
      returnByValue: true,
    });
    await sleep(600);
    if (midBox.result.value) {
      const midShot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...midBox.result.value, scale: 1 },
      });
      fs.writeFileSync(path.join(SCREENSHOT_DIR, "cat-exam_mid_banner_1440.png"), Buffer.from(midShot.data, "base64"));
    }

    // 2. Capture a Table in context
    const tableBox = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector(".bd-table-wrap");
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        const rect = el.getBoundingClientRect();
        return { x: 0, y: Math.max(0, window.scrollY + rect.top - 60), width: 1440, height: Math.min(rect.height + 140, 600) };
      })()`,
      returnByValue: true,
    });
    await sleep(600);
    if (tableBox.result.value) {
      const tableShot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...tableBox.result.value, scale: 1 },
      });
      fs.writeFileSync(path.join(SCREENSHOT_DIR, "cat-exam_table_1440.png"), Buffer.from(tableShot.data, "base64"));
    }

    // 3. Capture Bottom CTA Banner
    const bottomBox = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector("section[aria-label='Post-Exam Admission & College Guidance']");
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        const rect = el.getBoundingClientRect();
        return { x: 0, y: Math.max(0, window.scrollY + rect.top - 50), width: 1440, height: rect.height + 100 };
      })()`,
      returnByValue: true,
    });
    await sleep(600);
    if (bottomBox.result.value) {
      const bottomShot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...bottomBox.result.value, scale: 1 },
      });
      fs.writeFileSync(path.join(SCREENSHOT_DIR, "cat-exam_bottom_banner_1440.png"), Buffer.from(bottomShot.data, "base64"));
    }

    // 4. Capture Related Exams
    const relatedBox = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector("section:has(article)");
        const lastSection = Array.from(document.querySelectorAll("section")).find(s => (s.querySelector("h2") || {}).textContent?.includes("Related Exams"));
        const target = lastSection || el;
        if (!target) return null;
        target.scrollIntoView({ block: 'center' });
        const rect = target.getBoundingClientRect();
        return { x: 0, y: Math.max(0, window.scrollY + rect.top - 40), width: 1440, height: Math.min(rect.height + 100, 700) };
      })()`,
      returnByValue: true,
    });
    await sleep(600);
    if (relatedBox.result.value) {
      const relatedShot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...relatedBox.result.value, scale: 1 },
      });
      fs.writeFileSync(path.join(SCREENSHOT_DIR, "cat-exam_related_exams_1440.png"), Buffer.from(relatedShot.data, "base64"));
    }
  } finally {
    if (cdp) await cdp.close();
    chromeProc.kill("SIGKILL");
    await spaServer.close();
  }
  console.log("SECTIONS_CAPTURED_SUCCESSFULLY");
}

captureSections().catch((e) => {
  console.error("CAPTURE SECTIONS FAILED:", e);
  process.exit(1);
});
