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

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
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
  async evaluate(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result ? res.result.value : res;
  }
  close() {
    if (this.ws) this.ws.close();
  }
}

async function debugToc() {
  const port = 4200;
  const server = await startStaticSpaServer(port);

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--remote-debugging-port=9260",
    "--user-data-dir=C:\\Users\\GCV\\AppData\\Local\\Temp\\chrome-qa-inspect-toc6",
    "--no-first-run",
    "--no-default-browser-check",
  ]);

  await new Promise((r) => setTimeout(r, 1500));

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch("http://127.0.0.1:9260/json");
        if (res.ok) {
          const list = await res.json();
          const page = list.find((p) => p.type === "page");
          if (page && page.webSocketDebuggerUrl) {
            wsUrl = page.webSocketDebuggerUrl;
            break;
          }
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 200));
    }

    const cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");

    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${port}/exams/ips-exam` });
    await new Promise((r) => setTimeout(r, 2500));

    const debug = await cdp.evaluate(`(() => {
      const nav = document.querySelector('.exam-toc');
      if (!nav) return { error: "not found" };
      const s = window.getComputedStyle(nav);
      const h2 = nav.querySelector('h2');
      const h2s = window.getComputedStyle(h2);
      const ul = nav.querySelector('ul');
      const uls = window.getComputedStyle(ul);

      return {
        nav: {
          height: s.height,
          offsetHeight: nav.offsetHeight,
          clientHeight: nav.clientHeight,
          display: s.display,
          overflow: s.overflow,
          position: s.position,
        },
        h2: {
          height: h2s.height,
          offsetHeight: h2.offsetHeight,
          display: h2s.display,
        },
        ul: {
          height: uls.height,
          offsetHeight: ul.offsetHeight,
          display: uls.display,
          overflow: uls.overflow,
        }
      };
    })()`);

    console.log("DEBUG:", JSON.stringify(debug, null, 2));

    cdp.close();
  } finally {
    chromeProc.kill();
    server.close();
  }
}

debugToc().catch(console.error);
