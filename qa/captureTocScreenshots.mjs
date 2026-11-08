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
  close() {
    if (this.ws) this.ws.close();
  }
}

async function capture() {
  const port = 4202;
  const server = await startStaticSpaServer(port);

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--remote-debugging-port=9262",
    "--user-data-dir=C:\\Users\\GCV\\AppData\\Local\\Temp\\chrome-qa-inspect-toc8",
    "--no-first-run",
    "--no-default-browser-check",
  ]);

  await new Promise((r) => setTimeout(r, 1500));

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch("http://127.0.0.1:9262/json");
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

    // 1. Desktop 1440
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${port}/exams/ips-exam` });
    await new Promise((r) => setTimeout(r, 2500));

    // Scroll TOC smoothly into viewport center
    const tocBox = (await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const toc = document.querySelector('.exam-toc');
        if (!toc) return null;
        toc.scrollIntoView({ block: 'center' });
        const r = toc.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()`,
      returnByValue: true,
    })).result.value;

    await new Promise((r) => setTimeout(r, 500));

    // Re-query bounding box after scroll
    const finalBox = (await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const toc = document.querySelector('.exam-toc');
        if (!toc) return null;
        const r = toc.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()`,
      returnByValue: true,
    })).result.value;

    console.log("FINAL TOC BOX:", finalBox);

    const ssDesktop = await cdp.send("Page.captureScreenshot", {
      clip: {
        x: Math.max(0, finalBox.x - 20),
        y: Math.max(0, finalBox.y - 20),
        width: finalBox.width + 40,
        height: finalBox.height + 40,
        scale: 1,
      },
    });
    fs.writeFileSync("qa/detail_page_screenshots/toc_desktop_full_card.png", Buffer.from(ssDesktop.data, "base64"));
    console.log("Saved qa/detail_page_screenshots/toc_desktop_full_card.png");

    // Also capture full desktop viewport
    const ssDesktopFull = await cdp.send("Page.captureScreenshot", {});
    fs.writeFileSync("qa/detail_page_screenshots/toc_desktop_page_view.png", Buffer.from(ssDesktopFull.data, "base64"));
    console.log("Saved qa/detail_page_screenshots/toc_desktop_page_view.png");

    // 2. Mobile 390
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await new Promise((r) => setTimeout(r, 800));

    const mobileBox = (await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const toc = document.querySelector('.exam-toc');
        if (!toc) return null;
        toc.scrollIntoView({ block: 'center' });
        const r = toc.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()`,
      returnByValue: true,
    })).result.value;

    await new Promise((r) => setTimeout(r, 500));

    const finalMobileBox = (await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const toc = document.querySelector('.exam-toc');
        if (!toc) return null;
        const r = toc.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()`,
      returnByValue: true,
    })).result.value;

    const ssMobileClip = await cdp.send("Page.captureScreenshot", {
      clip: {
        x: Math.max(0, finalMobileBox.x - 10),
        y: Math.max(0, finalMobileBox.y - 10),
        width: finalMobileBox.width + 20,
        height: finalMobileBox.height + 20,
        scale: 2,
      },
    });
    fs.writeFileSync("qa/detail_page_screenshots/toc_mobile_full_card.png", Buffer.from(ssMobileClip.data, "base64"));
    console.log("Saved qa/detail_page_screenshots/toc_mobile_full_card.png");

    cdp.close();
  } finally {
    chromeProc.kill();
    server.close();
  }
}

capture().catch(console.error);
