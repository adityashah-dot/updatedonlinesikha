import { spawn } from "node:child_process";
import fs from "node:fs";

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

async function inspectToc() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const chromeProc = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9252",
    "--user-data-dir=C:\\Users\\GCV\\AppData\\Local\\Temp\\chrome-qa-inspect-toc",
    "--no-first-run",
    "--no-default-browser-check",
  ]);

  await new Promise((r) => setTimeout(r, 1500));

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch("http://127.0.0.1:9252/json");
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

    if (!wsUrl) throw new Error("Could not find Chrome page ws target");

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

    await cdp.send("Page.navigate", { url: "http://localhost:5173/exams/ips-exam" });
    await new Promise((r) => setTimeout(r, 3000));

    // Evaluate TOC styles
    const res = await cdp.evaluate(`(() => {
      const nav = document.querySelector('nav[aria-label="Table of contents"]') || document.querySelector('.bd-toc');
      if (!nav) return { error: "nav not found" };
      const h2 = nav.querySelector('h2');
      const ul = nav.querySelector('ul');
      const firstA = nav.querySelector('a');

      const navStyle = window.getComputedStyle(nav);
      const h2Style = h2 ? window.getComputedStyle(h2) : null;
      const ulStyle = ul ? window.getComputedStyle(ul) : null;
      const aStyle = firstA ? window.getComputedStyle(firstA) : null;

      const overflowElements = [];
      nav.querySelectorAll('*').forEach((el) => {
        const s = window.getComputedStyle(el);
        if (el.scrollWidth > el.clientWidth) {
          overflowElements.push({
            tag: el.tagName,
            className: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            offsetWidth: el.offsetWidth,
            overflowX: s.overflowX,
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
          textTransform: h2Style.textTransform,
          letterSpacing: h2Style.letterSpacing,
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
        overflowElements,
        items: Array.from(nav.querySelectorAll('li a')).map(a => ({
          text: a.innerText,
          scrollWidth: a.scrollWidth,
          clientWidth: a.clientWidth,
        })),
      };
    })()`);

    console.log("INSPECT RESULT:", JSON.stringify(res, null, 2));

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
      fs.writeFileSync("qa/detail_page_screenshots/toc_current_inspect.png", Buffer.from(ss.data, "base64"));
      console.log("Screenshot saved to qa/detail_page_screenshots/toc_current_inspect.png");
    }

    cdp.close();
  } finally {
    chromeProc.kill();
  }
}

inspectToc().catch(console.error);
