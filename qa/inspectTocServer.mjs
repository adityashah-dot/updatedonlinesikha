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

async function main() {
  const port = 4195;
  const server = await startStaticSpaServer(port);
  console.log("SPA server listening on port", port);

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--remote-debugging-port=9255",
    "--user-data-dir=C:\\Users\\GCV\\AppData\\Local\\Temp\\chrome-qa-inspect-toc2",
    "--no-first-run",
    "--no-default-browser-check",
  ]);

  await new Promise((r) => setTimeout(r, 1500));

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch("http://127.0.0.1:9255/json");
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

    if (!wsUrl) throw new Error("Could not find wsUrl");

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
    await new Promise((r) => setTimeout(r, 3000));

    const tocData = await cdp.evaluate(`(() => {
      const nav = document.querySelector('nav[aria-label="Table of contents"]') || document.querySelector('.bd-toc');
      if (!nav) return { error: "nav not found" };
      const h2 = nav.querySelector('h2');
      const ul = nav.querySelector('ul');
      const firstA = nav.querySelector('a');

      const navStyle = window.getComputedStyle(nav);
      const h2Style = h2 ? window.getComputedStyle(h2) : null;
      const ulStyle = ul ? window.getComputedStyle(ul) : null;
      const aStyle = firstA ? window.getComputedStyle(firstA) : null;

      const elementsWithOverflow = [];
      nav.querySelectorAll('*').forEach((el) => {
        const s = window.getComputedStyle(el);
        if (el.scrollWidth > el.clientWidth) {
          elementsWithOverflow.push({
            tag: el.tagName,
            className: el.className,
            text: el.innerText ? el.innerText.slice(0, 40) : "",
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            offsetWidth: el.offsetWidth,
            overflowX: s.overflowX,
            overflowY: s.overflowY,
          });
        }
      });

      return {
        nav: {
          className: nav.className,
          scrollWidth: nav.scrollWidth,
          clientWidth: nav.clientWidth,
          offsetWidth: nav.offsetWidth,
          overflowX: navStyle.overflowX,
          overflowY: navStyle.overflowY,
        },
        h2: h2 ? {
          text: h2.innerText,
          fontSize: h2Style.fontSize,
          lineHeight: h2Style.lineHeight,
          fontWeight: h2Style.fontWeight,
          margin: h2Style.margin,
          padding: h2Style.padding,
        } : null,
        ul: ul ? {
          scrollWidth: ul.scrollWidth,
          clientWidth: ul.clientWidth,
          overflowX: ulStyle.overflowX,
        } : null,
        firstA: firstA ? {
          fontSize: aStyle.fontSize,
          lineHeight: aStyle.lineHeight,
          padding: aStyle.padding,
          text: firstA.innerText,
          scrollWidth: firstA.scrollWidth,
          clientWidth: firstA.clientWidth,
        } : null,
        elementsWithOverflow,
      };
    })()`);

    console.log("DESKTOP TOC DATA:", JSON.stringify(tocData, null, 2));

    const clip = await cdp.evaluate(`(() => {
      const nav = document.querySelector('nav[aria-label="Table of contents"]') || document.querySelector('.bd-toc');
      if (!nav) return null;
      const r = nav.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    })()`);

    if (clip) {
      const ss = await cdp.send("Page.captureScreenshot", {
        clip: {
          x: Math.max(0, clip.x - 20),
          y: Math.max(0, clip.y - 20),
          width: clip.width + 40,
          height: clip.height + 40,
          scale: 1,
        },
      });
      fs.writeFileSync("qa/detail_page_screenshots/toc_desktop_current.png", Buffer.from(ss.data, "base64"));
      console.log("Desktop screenshot saved to qa/detail_page_screenshots/toc_desktop_current.png");
    }

    // 2. Mobile 390
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await new Promise((r) => setTimeout(r, 1000));

    const mobileTocData = await cdp.evaluate(`(() => {
      const nav = document.querySelector('nav[aria-label="Table of contents"]') || document.querySelector('.bd-toc');
      if (!nav) return { error: "nav not found" };
      const h2 = nav.querySelector('h2');
      const h2Style = h2 ? window.getComputedStyle(h2) : null;
      const elementsWithOverflow = [];
      nav.querySelectorAll('*').forEach((el) => {
        const s = window.getComputedStyle(el);
        if (el.scrollWidth > el.clientWidth) {
          elementsWithOverflow.push({
            tag: el.tagName,
            className: el.className,
            text: el.innerText ? el.innerText.slice(0, 40) : "",
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            offsetWidth: el.offsetWidth,
            overflowX: s.overflowX,
            overflowY: s.overflowY,
          });
        }
      });
      return {
        h2: h2 ? {
          text: h2.innerText,
          fontSize: h2Style.fontSize,
          lineHeight: h2Style.lineHeight,
        } : null,
        elementsWithOverflow,
      };
    })()`);

    console.log("MOBILE TOC DATA:", JSON.stringify(mobileTocData, null, 2));

    const mobileClip = await cdp.evaluate(`(() => {
      const nav = document.querySelector('nav[aria-label="Table of contents"]') || document.querySelector('.bd-toc');
      if (!nav) return null;
      const r = nav.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    })()`);

    if (mobileClip) {
      const ss = await cdp.send("Page.captureScreenshot", {
        clip: {
          x: Math.max(0, mobileClip.x - 10),
          y: Math.max(0, mobileClip.y - 10),
          width: mobileClip.width + 20,
          height: mobileClip.height + 20,
          scale: 1,
        },
      });
      fs.writeFileSync("qa/detail_page_screenshots/toc_mobile_current.png", Buffer.from(ss.data, "base64"));
      console.log("Mobile screenshot saved to qa/detail_page_screenshots/toc_mobile_current.png");
    }

    cdp.close();
  } finally {
    chromeProc.kill();
    server.close();
  }
}

main().catch(console.error);
