import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const SCREENSHOT_DIR = "C:/Users/GCV/AppData/Local/Temp/opencode/task09g";
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

const LIST_EXPR = `(() => {
  const doc = document;
  const h1 = doc.querySelector("h1");
  const cards = Array.from(doc.querySelectorAll("main article"));
  const links = Array.from(doc.querySelectorAll("main a"));
  return {
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
    h1: h1 ? h1.textContent.trim() : null,
    cardCount: cards.length,
    firstCardLink: links.length ? links[0].getAttribute("href") : null,
    bodyStart: (doc.body.innerText || "").slice(0, 160),
  };
})()`;

const DETAIL_EXPR = `(() => {
  const doc = document;
  const h1 = doc.querySelector("h1");
  const proseSections = Array.from(doc.querySelectorAll("article.bd-prose > section"));
  const faqEl = doc.querySelector("#exam-faq-title");
  const faqDetails = Array.from(doc.querySelectorAll("details"));
  const tocLinks = Array.from(doc.querySelectorAll(".bd-toc a"));
  const tables = Array.from(doc.querySelectorAll(".bd-table-wrap table"));
  const heroFound = Boolean(doc.querySelector("section.rounded-2xl"));
  const title = (doc.querySelector('meta[name="title"]') || {}).content || doc.title;
  const metaDesc = (doc.querySelector('meta[name="description"]') || {}).content || null;
  const canonicalEl = doc.querySelector('link[rel="canonical"]');
  const canonical = canonicalEl ? canonicalEl.getAttribute("href") : null;
  return {
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
    h1: h1 ? h1.textContent.trim() : null,
    proseSectionCount: proseSections.length,
    firstSectionTitle: proseSections[0] ? (proseSections[0].querySelector("h2") || {}).textContent || "" : null,
    faqCount: faqDetails.length,
    hasFaq: Boolean(faqEl),
    tocCount: tocLinks.length,
    tableCount: tables.length,
    heroFound,
    seo: { title, metaDesc, canonical },
  };
})()`;

const NOT_FOUND_EXPR = `(() => {
  const doc = document;
  const h1 = doc.querySelector("h1");
  const text = (doc.querySelector("main") || doc.body).innerText || "";
  return {
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
    h1: h1 ? h1.textContent.trim() : null,
    text: text.slice(0, 200),
  };
})()`;

const BLOG_EXPR = `(() => {
  const doc = document;
  const h1 = doc.querySelector("h1");
  const prose = doc.querySelector("article.bd-prose");
  const faqs = doc.querySelectorAll("details");
  const toc = doc.querySelectorAll(".bd-toc a");
  return {
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
    h1: h1 ? h1.textContent.trim() : null,
    proseFound: Boolean(prose),
    faqCount: faqs.length,
    tocCount: toc.length,
  };
})()`;

const COURSE_EXPR = `(() => {
  const doc = document;
  const h1 = doc.querySelector("h1");
  const prose = doc.querySelector("article.course-prose");
  const cta = doc.querySelector(".bd-inline-cta");
  const faqs = doc.querySelectorAll("details");
  return {
    scrollWidth: doc.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: doc.documentElement.scrollWidth > window.innerWidth,
    h1: h1 ? h1.textContent.trim() : null,
    proseFound: Boolean(prose),
    ctaFound: Boolean(cta),
    faqCount: faqs.length,
  };
})()`;

async function runReview() {
  const spaPort = 3133;
  const chromePort = 9356;

  console.log("Starting SPA static server on port " + spaPort + "...");
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = "http://127.0.0.1:" + spaPort;
  console.log("SPA server ready at " + baseUrl);

  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_task09g");
  fs.mkdirSync(chromeProfile, { recursive: true });

  console.log("Spawning Chrome on port " + chromePort + "...");
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
  const report = {
    exams_listing: {},
    exams_detail_ips: {},
    exams_detail_not_found: {},
    blog_detail: {},
    course_detail: {},
    console_errors: [],
  };

  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    console.log("Connected to Chrome WS: " + wsUrl);
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

    for (const vp of viewports) {
      console.log("\n[Exams Listing] Testing " + vp.name + " (" + vp.width + "x" + vp.height + ")...");
      await cdp.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.width <= 768 });
      await cdp.send("Page.navigate", { url: baseUrl + "/exams" });
      await sleep(3000);

      const listRes = await cdp.send("Runtime.evaluate", { expression: LIST_EXPR, returnByValue: true });
      const lres = listRes.result.value;
      report.exams_listing[vp.name] = { scrollWidth: lres.scrollWidth, innerWidth: lres.innerWidth, hasOverflow: lres.hasOverflow, h1: lres.h1, cardCount: lres.cardCount };
      console.log("  Listing " + vp.name + ": overflow=" + lres.hasOverflow + " h1=" + lres.h1 + " cards=" + lres.cardCount);

      const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(SCREENSHOT_DIR + "/exams_listing_" + vp.name + ".png", Buffer.from(shot.data, "base64"));

      console.log("\n[Exams Detail] Testing " + vp.name + " ...");
      await cdp.send("Page.navigate", { url: baseUrl + "/exams/ips-exam" });
      await sleep(3500);

      const detailRes = await cdp.send("Runtime.evaluate", { expression: DETAIL_EXPR, returnByValue: true });
      const dres = detailRes.result.value;
      report.exams_detail_ips[vp.name] = { scrollWidth: dres.scrollWidth, innerWidth: dres.innerWidth, hasOverflow: dres.hasOverflow, h1: dres.h1, proseSectionCount: dres.proseSectionCount, firstSectionTitle: dres.firstSectionTitle, faqCount: dres.faqCount, hasFaq: dres.hasFaq, tocCount: dres.tocCount, tableCount: dres.tableCount, heroFound: dres.heroFound, seo: dres.seo };
      console.log("  Detail " + vp.name + ": overflow=" + dres.hasOverflow + " h1=" + dres.h1 + " sections=" + dres.proseSectionCount + " faq=" + dres.faqCount + " toc=" + dres.tocCount + " tables=" + dres.tableCount + " hero=" + dres.heroFound);

      const shot2 = await cdp.send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(SCREENSHOT_DIR + "/exams_detail_ips_" + vp.name + ".png", Buffer.from(shot2.data, "base64"));

      console.log("\n[Exams Not Found] Testing " + vp.name + " ...");
      await cdp.send("Page.navigate", { url: baseUrl + "/exams/non-existing-exam" });
      await sleep(3000);
      const nfRes = await cdp.send("Runtime.evaluate", { expression: NOT_FOUND_EXPR, returnByValue: true });
      const nres = nfRes.result.value;
      report.exams_detail_not_found[vp.name] = { scrollWidth: nres.scrollWidth, innerWidth: nres.innerWidth, hasOverflow: nres.hasOverflow, h1: nres.h1, text: nres.text };
      console.log("  NotFound " + vp.name + ": overflow=" + nres.hasOverflow + " h1=" + nres.h1);

      if (vp.name === "desktop_1440") {
        for (const item of [
          { label: "blog_detail", url: baseUrl + "/blog/how-to-choose-online-university-india", expr: BLOG_EXPR },
          { label: "course_detail", url: baseUrl + "/courses/online-mba", expr: COURSE_EXPR },
        ]) {
          await cdp.send("Page.navigate", { url: item.url });
          await sleep(3000);
          const r = await cdp.send("Runtime.evaluate", { expression: item.expr, returnByValue: true });
          const v = r.result.value;
          if (item.label === "blog_detail") report.blog_detail = { scrollWidth: v.scrollWidth, hasOverflow: v.hasOverflow, h1: v.h1, proseFound: v.proseFound, faqCount: v.faqCount, tocCount: v.tocCount };
          else report.course_detail = { scrollWidth: v.scrollWidth, hasOverflow: v.hasOverflow, h1: v.h1, proseFound: v.proseFound, ctaFound: v.ctaFound, faqCount: v.faqCount };
          console.log("  Regression " + item.label + ": overflow=" + v.hasOverflow + " h1=" + v.h1 + " prose=" + v.proseFound);
        }
      }
    }
  } finally {
    if (cdp) {
      try {
        await cdp.send("Runtime.evaluate", { expression: "0", returnByValue: true });
      } catch {}
    }
    await cdp.close();
    chromeProc.kill("SIGKILL");
    await spaServer.close();
  }

  console.log("TASK09G_QA_DONE");
  console.log(JSON.stringify(report, null, 2));
}

runReview().catch((e) => {
  console.error("TASK09G_QA_FAILED", e);
  process.exit(1);
});
