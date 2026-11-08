import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const TEMP_PROFILE_DIR = path.join(PROJECT_ROOT, "qa", ".temp-chrome-detail-qa");

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
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method === "Runtime.consoleAPICalled") {
        if (msg.params.type === "error") {
          const txt = msg.params.args.map((a) => a.value || a.description || "").join(" ");
          this.consoleErrors.push(txt);
        }
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }
}

async function getWsUrl(port) {
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((p) => p.type === "page");
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {
      // wait
    }
    await sleep(200);
  }
  throw new Error("Unable to connect to Chrome CDP page endpoint");
}

function cleanupTempProfile() {
  if (fs.existsSync(TEMP_PROFILE_DIR)) {
    try {
      fs.rmSync(TEMP_PROFILE_DIR, { recursive: true, force: true });
    } catch {
      // Ignore cleanup error on windows locks
    }
  }
}

async function run() {
  console.log("=================================================");
  console.log("TASK 10I: News Detail Template Refinement Verification");
  console.log("=================================================");

  cleanupTempProfile();

  const PORT = 4178;
  const CDP_PORT = 9226;

  console.log(`Starting static SPA server on port ${PORT}...`);
  const server = await startStaticSpaServer(PORT);

  console.log(`Launching headless Chrome on CDP port ${CDP_PORT}...`);
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${TEMP_PROFILE_DIR}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--headless=new",
      "--disable-gpu",
      "--disable-translate",
      "--disable-background-networking",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let client;
  const results = {
    cuetAliasArticle: {},
    canonicalArticle: {},
    secondArticle: {},
    typographyScale: {},
    heroImagePresentation: {},
    sidebarCounselling: {},
    viewports: [],
  };

  try {
    const wsUrl = await getWsUrl(CDP_PORT);
    client = new CDPClient(wsUrl);
    await client.connect();
    await client.send("Runtime.enable");
    await client.send("Page.enable");
    await client.send("DOM.enable");

    // 1440px desktop
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // -------------------------------------------------------------
    // TEST 1: Navigate to Target Prompt Route (CUET Alias)
    // -------------------------------------------------------------
    const targetUrl = `http://127.0.0.1:${PORT}/news/cuet-ug-2026-result-out-live-cuet-scorecard-pdf-direct-link`;
    console.log(`\n[Test 1] Navigating to target CUET URL: ${targetUrl}`);
    await client.send("Page.navigate", { url: targetUrl });
    await sleep(3000);

    const cuetLoaded = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-detail-h1, h1");
        return {
          title: h1 ? h1.innerText.trim() : null,
          hasH1Class: h1 ? h1.classList.contains("news-detail-h1") : false,
          isNotFound: !!document.body.innerText.includes("Article Not Found"),
          hasHeroImg: !!document.querySelector(".news-hero-img-wrap img"),
          hasSidebar: !!document.querySelector("aside"),
        };
      })()
    `);
    console.log("  CUET Target Article Load:", cuetLoaded);
    results.cuetAliasArticle = cuetLoaded;

    // -------------------------------------------------------------
    // TEST 2: Heading Typography Responsive Scale
    // -------------------------------------------------------------
    console.log("\n[Test 2] Heading Typography Scale Verification...");
    
    // Desktop (1440px)
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);
    const typo1440 = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-detail-h1, h1");
        const style = window.getComputedStyle(h1);
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          fontFamily: style.fontFamily,
          letterSpacing: style.letterSpacing,
          color: style.color,
          height: h1.offsetHeight,
          width: h1.offsetWidth,
        };
      })()
    `);

    // Tablet (768px)
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);
    const typo768 = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-detail-h1, h1");
        const style = window.getComputedStyle(h1);
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          height: h1.offsetHeight,
        };
      })()
    `);

    // Mobile (390px)
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await sleep(300);
    const typo390 = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-detail-h1, h1");
        const style = window.getComputedStyle(h1);
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          height: h1.offsetHeight,
        };
      })()
    `);

    // Mobile (360px)
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 740,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await sleep(300);
    const typo360 = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-detail-h1, h1");
        const style = window.getComputedStyle(h1);
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          height: h1.offsetHeight,
        };
      })()
    `);

    results.typographyScale = {
      desktop1440: typo1440,
      tablet768: typo768,
      mobile390: typo390,
      mobile360: typo360,
    };
    console.log("  Typography Scale Results:", results.typographyScale);

    // -------------------------------------------------------------
    // TEST 3: Hero Image Presentation & Neutral Background
    // -------------------------------------------------------------
    console.log("\n[Test 3] Hero Image Presentation Inspection...");
    // Reset to desktop 1440
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);

    const heroDesktop = await client.eval(`
      (() => {
        const wrap = document.querySelector(".news-hero-img-wrap");
        const img = wrap ? wrap.querySelector("img") : null;
        const wrapStyle = wrap ? window.getComputedStyle(wrap) : null;
        const imgStyle = img ? window.getComputedStyle(img) : null;
        return {
          wrapHeight: wrap ? wrap.offsetHeight : null,
          wrapWidth: wrap ? wrap.offsetWidth : null,
          bgColor: wrapStyle ? wrapStyle.backgroundColor : null,
          borderColor: wrapStyle ? wrapStyle.borderColor : null,
          borderRadius: wrapStyle ? wrapStyle.borderRadius : null,
          imgObjectFit: imgStyle ? imgStyle.objectFit : null,
          imgObjectPosition: imgStyle ? imgStyle.objectPosition : null,
        };
      })()
    `);

    // Mobile hero height
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await sleep(300);
    const heroMobile = await client.eval(`
      (() => {
        const wrap = document.querySelector(".news-hero-img-wrap");
        return {
          wrapHeight: wrap ? wrap.offsetHeight : null,
          wrapWidth: wrap ? wrap.offsetWidth : null,
        };
      })()
    `);

    results.heroImagePresentation = {
      desktop: heroDesktop,
      mobile: heroMobile,
    };
    console.log("  Hero Image Presentation:", results.heroImagePresentation);

    // -------------------------------------------------------------
    // TEST 4: Sidebar Counselling Card & Quick Links
    // -------------------------------------------------------------
    console.log("\n[Test 4] Sidebar Counselling Card Inspection...");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);

    const sidebarCard = await client.eval(`
      (() => {
        const card = document.querySelector('[data-testid="news-counselling-sidebar"]');
        const btn = card ? card.querySelector("button") : null;
        const cardStyle = card ? window.getComputedStyle(card) : null;
        const btnStyle = btn ? window.getComputedStyle(btn) : null;
        const aside = document.querySelector("aside");
        const asideStyle = aside ? window.getComputedStyle(aside) : null;
        return {
          cardFound: !!card,
          cardHeight: card ? card.offsetHeight : null,
          cardWidth: card ? card.offsetWidth : null,
          cardPadding: cardStyle ? cardStyle.padding : null,
          cardBorderColor: cardStyle ? cardStyle.borderColor : null,
          btnHeight: btn ? btn.offsetHeight : null,
          btnBgColor: btnStyle ? btnStyle.backgroundColor : null,
          asideRowGap: asideStyle ? asideStyle.rowGap : null,
        };
      })()
    `);
    results.sidebarCounselling = sidebarCard;
    console.log("  Sidebar Counselling Card:", results.sidebarCounselling);

    // -------------------------------------------------------------
    // TEST 5: Responsive Verification & 0px Overflow Check
    // -------------------------------------------------------------
    console.log("\n[Test 5] Viewport Layout & Overflow Verification...");
    const viewports = [
      { name: "Desktop Wide", width: 1440, height: 900, mobile: false },
      { name: "Desktop Standard", width: 1024, height: 768, mobile: false },
      { name: "Tablet Portrait", width: 768, height: 1024, mobile: false },
      { name: "Mobile Large", width: 390, height: 844, mobile: true },
      { name: "Mobile Compact", width: 360, height: 740, mobile: true },
    ];

    for (const vp of viewports) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });
      await sleep(300);

      const metrics = await client.eval(`
        (() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const windowInnerWidth = window.innerWidth;
          const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
          const overflowX = maxScroll > windowInnerWidth ? (maxScroll - windowInnerWidth) : 0;
          return {
            windowInnerWidth,
            scrollWidth,
            clientWidth,
            bodyScrollWidth,
            overflowX,
            hasZeroOverflow: overflowX <= 0,
          };
        })()
      `);

      console.log(`  ${vp.name} (${vp.width}x${vp.height}): overflowX = ${metrics.overflowX}px, zeroOverflow = ${metrics.hasZeroOverflow}`);
      results.viewports.push({ viewport: vp.name, width: vp.width, ...metrics });
    }

    // -------------------------------------------------------------
    // TEST 6: Second Article Check (Chandigarh University)
    // -------------------------------------------------------------
    console.log("\n[Test 6] Second Article Verification (Chandigarh University)...");
    const secondUrl = `http://127.0.0.1:${PORT}/news/chandigarh-university-no-1-private-university-qs-asia-2027`;
    await client.send("Page.navigate", { url: secondUrl });
    await sleep(2500);

    const secondArticleRes = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1.news-detail-h1, h1");
        const wrap = document.querySelector(".news-hero-img-wrap");
        return {
          title: h1 ? h1.innerText.trim() : null,
          hasH1Class: h1 ? h1.classList.contains("news-detail-h1") : false,
          heroWrapHeight: wrap ? wrap.offsetHeight : null,
          isNotFound: !!document.body.innerText.includes("Article Not Found"),
        };
      })()
    `);
    results.secondArticle = secondArticleRes;
    console.log("  Second Article:", secondArticleRes);

  } finally {
    if (client && client.ws) {
      client.ws.close();
    }
    chromeProcess.kill();
    server.close();
    cleanupTempProfile();
  }

  console.log("\n=================================================");
  console.log("VERIFICATION AUDIT COMPLETE");
  console.log("=================================================");
  console.log(JSON.stringify(results, null, 2));

  // Assertions
  const asserts = [
    { desc: "CUET article loaded successfully via prompt route alias", pass: !!results.cuetAliasArticle.title && !results.cuetAliasArticle.isNotFound },
    { desc: "H1 has class news-detail-h1", pass: results.cuetAliasArticle.hasH1Class },
    { desc: "H1 font-size desktop is 34px", pass: results.typographyScale.desktop1440?.fontSize === "34px" },
    { desc: "H1 font-weight desktop is 700", pass: results.typographyScale.desktop1440?.fontWeight === "700" },
    { desc: "H1 font-size tablet is 28px", pass: results.typographyScale.tablet768?.fontSize === "28px" },
    { desc: "H1 font-size mobile is 24px", pass: results.typographyScale.mobile390?.fontSize === "24px" },
    { desc: "Hero wrapper bg color is neutral #f8fbff", pass: results.heroImagePresentation.desktop?.bgColor === "rgb(248, 251, 255)" },
    { desc: "Hero wrapper border is subtle #e7eeff", pass: results.heroImagePresentation.desktop?.borderColor === "rgb(231, 238, 255)" },
    { desc: "Hero wrapper desktop height is <= 380px", pass: results.heroImagePresentation.desktop?.wrapHeight <= 380 },
    { desc: "Hero wrapper mobile height is <= 240px", pass: results.heroImagePresentation.mobile?.wrapHeight <= 240 },
    { desc: "Hero image object-fit is cover", pass: results.heroImagePresentation.desktop?.imgObjectFit === "cover" },
    { desc: "Sidebar counselling card exists and has border", pass: results.sidebarCounselling?.cardFound && results.sidebarCounselling?.cardBorderColor === "rgb(27, 61, 111)" },
    { desc: "All 5 viewports have 0px horizontal overflow", pass: results.viewports.every((v) => v.hasZeroOverflow) },
    { desc: "Second article loads with reusable template styles", pass: !!results.secondArticle.title && !results.secondArticle.isNotFound },
  ];

  console.log("\nTEST SUMMARY ASSERTIONS:");
  let allPass = true;
  for (const a of asserts) {
    console.log(`  [${a.pass ? "PASS" : "FAIL"}] ${a.desc}`);
    if (!a.pass) allPass = false;
  }

  if (!allPass) {
    console.error("\n❌ Some verification checks failed!");
    process.exit(1);
  } else {
    console.log("\n✅ ALL 14 VERIFICATION ASSERTIONS PASSED!");
  }
}

run().catch((err) => {
  console.error("Test failed with error:", err);
  cleanupTempProfile();
  process.exit(1);
});
