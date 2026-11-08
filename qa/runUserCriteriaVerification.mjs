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
              : ext === ".webp"
              ? "image/webp"
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

async function runVerification() {
  const spaPort = 3150;
  const chromePort = 9375;
  const spaServer = await startStaticSpaServer(spaPort);
  const baseUrl = "http://127.0.0.1:" + spaPort;
  const chromeProfile = path.join(PROJECT_ROOT, "scratch_chrome_user_verification");
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
  const results = {};

  try {
    const wsUrl = await findChromeWebSocketUrl(chromePort);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    // 1. Verify /exams/ips-exam (desktop 1440)
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await cdp.send("Page.navigate", { url: `${baseUrl}/exams/ips-exam` });
    await sleep(3500);

    const ipsCheck = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const doc = document;
        const heroDesc = (doc.querySelector(".course-detail-h1 + div + p, .course-detail-h1 + p") || {}).textContent || "";
        const hasRawHtmlInHero = /<[a-z][\\s\\S]*>/i.test(heroDesc);

        // Mid Banner
        const midBanner = doc.querySelector("aside[aria-label='Exam Preparation Guidance']");
        const midBannerHeading = midBanner ? (midBanner.querySelector("h3") || {}).textContent : null;
        const midBannerBtn = midBanner ? midBanner.querySelector("button") : null;
        const midBannerBtnText = midBannerBtn ? midBannerBtn.textContent.trim() : null;

        // Position of mid banner relative to sections
        const allSections = Array.from(doc.querySelectorAll("article.bd-prose section"));
        let midIndex = -1;
        if (midBanner) {
          const parentDiv = midBanner.closest("article.bd-prose > div");
          const allArticleDivs = Array.from(doc.querySelectorAll("article.bd-prose > div"));
          midIndex = allArticleDivs.indexOf(parentDiv);
        }

        // Bottom Banner
        const bottomBanner = doc.querySelector("section[aria-label='Post-Exam Admission & College Guidance']");
        const bottomBannerHeading = bottomBanner ? (bottomBanner.querySelector("h2") || {}).textContent : null;
        const bottomBannerBtns = bottomBanner ? Array.from(bottomBanner.querySelectorAll("button, a")).map(b => b.textContent.trim()) : [];

        // Check contact actions (test button clicking)
        let clickedActionWorks = false;
        if (midBannerBtn) {
          // Verify clicking doesn't throw or crash
          try {
            midBannerBtn.click();
            clickedActionWorks = true;
          } catch(e) {
            clickedActionWorks = false;
          }
        }

        return {
          heroDesc: heroDesc.slice(0, 100),
          hasRawHtmlInHero,
          midBanner: {
            found: !!midBanner,
            heading: midBannerHeading,
            btnText: midBannerBtnText,
            positionIndex: midIndex,
            totalSections: allSections.length,
            actionTriggered: clickedActionWorks
          },
          bottomBanner: {
            found: !!bottomBanner,
            heading: bottomBannerHeading,
            buttons: bottomBannerBtns
          }
        };
      })()`,
      returnByValue: true
    });
    results.ipsExam = ipsCheck.result.value;

    // Capture IPS Exam Mid Banner and Bottom Banner screenshots
    const ipsMidShot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 1400, width: 1440, height: 600, scale: 1 }
    });
    fs.writeFileSync(path.join(SCREENSHOT_DIR, "ips-exam_mid_content_1440.png"), Buffer.from(ipsMidShot.data, "base64"));

    // 2. Verify Content Images on /exams/jee-main-exam
    await cdp.send("Page.navigate", { url: `${baseUrl}/exams/jee-main-exam` });
    await sleep(4000);

    const jeeContentImagesCheck = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const doc = document;
        const proseImages = Array.from(doc.querySelectorAll("article.bd-prose img")).map(img => {
          const style = window.getComputedStyle(img);
          return {
            src: img.src,
            alt: img.alt,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete,
            maxWidth: style.maxWidth,
            borderRadius: style.borderRadius
          };
        });

        const heroLogo = doc.querySelector("section.rounded-2xl img");
        const logoData = heroLogo ? {
          src: heroLogo.src,
          alt: heroLogo.alt,
          naturalWidth: heroLogo.naturalWidth,
          isLogo: true
        } : null;

        return {
          proseImagesCount: proseImages.length,
          proseImages,
          heroLogo: logoData
        };
      })()`,
      returnByValue: true
    });
    results.jeeMainContentImages = jeeContentImagesCheck.result.value;

    // 3. Verify Table Design on /exams/cat-exam
    await cdp.send("Page.navigate", { url: `${baseUrl}/exams/cat-exam` });
    await sleep(3500);

    const tableDesignCheck = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        const doc = document;
        const wraps = Array.from(doc.querySelectorAll(".bd-table-wrap"));
        const tableAudit = wraps.slice(0, 3).map((w, i) => {
          const table = w.querySelector("table");
          const firstTh = w.querySelector("th");
          const thStyle = firstTh ? window.getComputedStyle(firstTh) : null;
          const trs = Array.from(w.querySelectorAll("tbody tr"));
          const rowStyles = trs.slice(0, 2).map(r => {
            const td = r.querySelector("td");
            return td ? {
              bg: window.getComputedStyle(td).backgroundColor,
              padding: window.getComputedStyle(td).padding
            } : null;
          });
          const wrapStyle = window.getComputedStyle(w);
          return {
            index: i,
            thBg: thStyle ? thStyle.backgroundColor : "no-th",
            thColor: thStyle ? thStyle.color : "no-th",
            wrapBorder: wrapStyle.borderColor,
            wrapRadius: wrapStyle.borderRadius,
            overflowX: wrapStyle.overflowX,
            rowStyles
          };
        });
        return {
          totalTablesOnPage: wraps.length,
          tableAudit
        };
      })()`,
      returnByValue: true
    });
    results.catExamTables = tableDesignCheck.result.value;

  } finally {
    if (cdp) await cdp.close();
    chromeProc.kill("SIGKILL");
    await spaServer.close();
  }

  console.log("USER_CRITERIA_VERIFICATION_BEGIN");
  console.log(JSON.stringify(results, null, 2));
  console.log("USER_CRITERIA_VERIFICATION_END");
}

runVerification().catch(e => {
  console.error("VERIFICATION FAILED", e);
  process.exit(1);
});
