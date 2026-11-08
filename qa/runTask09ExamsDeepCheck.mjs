import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function startStaticSpaServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlObj = new URL(req.url, "http://127.0.0.1:" + port);
      const pathname = decodeURIComponent(urlObj.pathname);
      let filePath = path.join(DIST_DIR, pathname === "/" ? "index.html" : pathname);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": ext === ".html" ? "text/html; charset=utf-8" : ext === ".js" ? "application/javascript; charset=utf-8" : ext === ".css" ? "text/css; charset=utf-8" : "application/octet-stream" });
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
    await new Promise((resolve, reject) => { this.ws.on("open", resolve); this.ws.on("error", reject); });
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
  close() { if (this.ws) this.ws.close(); }
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

const DEEP_EXPR = `(() => {
  const doc = document;
  const proseSections = Array.from(doc.querySelectorAll("article.bd-prose > section"));
  const firstThree = proseSections.slice(0, 3).map((s) => ({
    title: (s.querySelector("h2") || {}).textContent || "",
    h2Count: s.querySelectorAll("h2").length,
    blockCount: s.querySelectorAll("div").length,
  }));
  const faqButtons = Array.from(doc.querySelectorAll('button[id*="-faq-question-"]')).map((b) => b.textContent.trim());
  const tocLinks = Array.from(doc.querySelectorAll(".bd-toc a")).map((a) => a.textContent.trim());
  const cardTitles = Array.from(doc.querySelectorAll("main article")).map((a) => (a.querySelector("h3") || {}).textContent || "");
  const details = Array.from(doc.querySelectorAll("details")).map((d) => d.textContent.trim());
  return { firstThree, faqButtons, tocLinks, cardTitles, details };
})()`;

async function runDeepCheck() {
  const spaPort = 3134;
  const chromePort = 9357;
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = "http://127.0.0.1:" + spaPort;
  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_task09g_deep");
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
  const result = { console_errors: [] };
  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Log.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await cdp.send("Page.navigate", { url: baseUrl + "/exams" });
    await sleep(3000);
    const listRes = await cdp.send("Runtime.evaluate", { expression: "(() => ({ cards: Array.from(document.querySelectorAll('main article')).map(a => ({ title: (a.querySelector('h3') || {}).textContent || '', text: a.textContent.trim().slice(0, 120) })) }))()", returnByValue: true });
    result.listing = listRes.result.value;
    await cdp.send("Page.navigate", { url: baseUrl + "/exams/ips-exam" });
    await sleep(3500);
    const detailRes = await cdp.send("Runtime.evaluate", { expression: DEEP_EXPR, returnByValue: true });
    result.detail = detailRes.result.value;
  } finally {
    try { await cdp.send("Runtime.evaluate", { expression: "0", returnByValue: true }); } catch {}
    await cdp.close();
    chromeProc.kill("SIGKILL");
    await spaServer.close();
  }
  console.log("TASK09G_DEEP_DONE");
  console.log(JSON.stringify(result, null, 2));
}

runDeepCheck().catch((e) => { console.error("TASK09G_DEEP_FAILED", e); process.exit(1); });
