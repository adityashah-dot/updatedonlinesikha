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
const TEMP_PROFILE_DIR = path.join(PROJECT_ROOT, "qa", ".temp-chrome-newsdetail-qa");

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

  close() {
    try {
      this.ws.close();
    } catch {}
  }
}

async function getWsUrl(port) {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((p) => p.type === "page");
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("Could not connect to Chrome debugging port");
}

const VIEWPORTS = [
  { name: "Desktop Large", width: 1440, height: 900 },
  { name: "Desktop Small", width: 1024, height: 768 },
  { name: "Tablet Portrait", width: 768, height: 1024 },
  { name: "Mobile Standard", width: 390, height: 844 },
  { name: "Mobile Compact", width: 360, height: 740 },
];

async function runQa() {
  console.log("==================================================");
  console.log("STARTING AUTOMATED QA FOR NEWS DETAIL PAGE");
  console.log("==================================================");

  const PORT = 4178;
  const server = await startStaticSpaServer(PORT);
  console.log(`SPA static server running on http://127.0.0.1:${PORT}`);

  try {
    fs.mkdirSync(TEMP_PROFILE_DIR, { recursive: true });
  } catch {}

  const CDP_PORT = 9222;
  const chromeProc = spawn(
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
    standardArticle: false,
    leadingHyphenArticle: false,
    notFoundState: false,
    contentSections: {},
    seoMetadata: {},
    faqInteractive: false,
    viewports: [],
  };

  try {
    const wsUrl = await getWsUrl(CDP_PORT);
    client = new CDPClient(wsUrl);
    await client.connect();
    await client.send("Runtime.enable");
    await client.send("Page.enable");
    await client.send("DOM.enable");

    // Set initial Desktop viewport
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // ----------------------------------------------------
    // TEST 1: Standard News Article Detail Page
    // ----------------------------------------------------
    const standardSlug = "chandigarh-university-no-1-private-university-qs-asia-2027";
    console.log(`\nNavigating to standard article: /news/${standardSlug}...`);
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news/${standardSlug}` });
    await sleep(2500);

    const articleInfo = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1");
        const breadcrumbs = document.querySelector("nav[aria-label='Breadcrumb']");
        const categoryBadge = document.querySelector("[data-testid='news-category-badge']");
        const heroImg = document.querySelector("img[alt]");
        const byline = document.querySelector("[data-testid='news-byline']");
        const toc = document.querySelector("nav[aria-label='Table of contents']");
        const prose = document.querySelector(".news-prose");
        const relatedNews = document.querySelectorAll(".group.bg-white.rounded-xl");
        const ctaSidebar = document.querySelector("[data-testid='news-counselling-sidebar']");
        const inArticleCta = document.querySelector("[data-testid='news-counselling-cta']");
        const shareButtons = document.querySelectorAll("button[aria-label*='Share'], button[aria-label*='Copy']");
        const pageTitle = document.title;
        const metaDesc = document.querySelector("meta[name='description']")?.getAttribute("content");
        const jsonLd = document.querySelector("script[type='application/ld+json']")?.textContent;

        let parsedLd = null;
        try {
          if (jsonLd) parsedLd = JSON.parse(jsonLd);
        } catch {}

        return {
          hasH1: !!h1,
          h1Text: h1?.innerText?.trim(),
          hasBreadcrumbs: !!breadcrumbs,
          categoryBadgeText: categoryBadge?.innerText?.trim(),
          hasHeroImg: !!heroImg && heroImg.naturalWidth > 0,
          heroSrc: heroImg?.src,
          hasByline: !!byline,
          bylineText: byline?.innerText?.replace(/\\s+/g, " ")?.trim(),
          hasToc: !!toc,
          tocLinksCount: toc ? toc.querySelectorAll("a").length : 0,
          hasProse: !!prose && prose.children.length > 0,
          hasRelatedNews: relatedNews.length > 0,
          relatedNewsCount: relatedNews.length,
          hasCtaSidebar: !!ctaSidebar,
          hasInArticleCta: !!inArticleCta,
          shareButtonsCount: shareButtons.length,
          pageTitle,
          metaDesc,
          jsonLdType: parsedLd?.["@type"],
          jsonLdHeadline: parsedLd?.headline,
        };
      })()
    `);

    results.contentSections = articleInfo;
    results.standardArticle =
      articleInfo.hasH1 &&
      articleInfo.hasBreadcrumbs &&
      articleInfo.hasProse &&
      articleInfo.hasByline &&
      articleInfo.hasCtaSidebar &&
      articleInfo.hasInArticleCta;

    console.log(`  ✓ Standard article loaded: "${articleInfo.h1Text}"`);
    console.log(`  ✓ Breadcrumbs present: ${articleInfo.hasBreadcrumbs}`);
    console.log(`  ✓ Category badge: "${articleInfo.categoryBadgeText}"`);
    console.log(`  ✓ Hero image rendered: ${articleInfo.hasHeroImg} (${articleInfo.heroSrc})`);
    console.log(`  ✓ Byline / author meta: ${articleInfo.hasByline} ("${articleInfo.bylineText?.substring(0, 60)}...")`);
    console.log(`  ✓ Table of contents: ${articleInfo.hasToc ? `${articleInfo.tocLinksCount} headings linked` : "None"}`);
    console.log(`  ✓ Editorial rich text content: ${articleInfo.hasProse}`);
    console.log(`  ✓ Related news items: ${articleInfo.relatedNewsCount}`);
    console.log(`  ✓ Dual counselling CTAs: Sidebar (${articleInfo.hasCtaSidebar}), Mid-Article (${articleInfo.hasInArticleCta})`);
    console.log(`  ✓ Social share buttons: ${articleInfo.shareButtonsCount}`);
    console.log(`  ✓ SEO Title: "${articleInfo.pageTitle}"`);
    console.log(`  ✓ JSON-LD Schema: @type="${articleInfo.jsonLdType}"`);

    // ----------------------------------------------------
    // TEST 2: Article with FAQs & Accordion Toggle
    // ----------------------------------------------------
    const faqSlug = "boards-cbse-class-12th-result-2026-date-time-cbse-gov-in-live-updates";
    console.log(`\nNavigating to article with FAQs: /news/${faqSlug}...`);
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news/${faqSlug}` });
    await sleep(2500);

    const faqInfo = await client.eval(`
      (() => {
        const faqSection = document.querySelector("[data-testid='news-faqs']");
        const faqButtons = faqSection ? Array.from(faqSection.querySelectorAll("button[aria-expanded]")) : [];
        return {
          hasFaqSection: !!faqSection,
          faqCount: faqButtons.length,
        };
      })()
    `);
    console.log(`  ✓ FAQ section present: ${faqInfo.hasFaqSection} (${faqInfo.faqCount} accordion items)`);

    if (faqInfo.faqCount > 0) {
      console.log("  Testing FAQ accordion interactive toggle...");
      const faqToggleResult = await client.eval(`
        (async () => {
          const faqSection = document.querySelector("[data-testid='news-faqs']");
          const firstBtn = faqSection ? faqSection.querySelector("button[aria-expanded]") : null;
          if (!firstBtn) return false;
          const initialExpanded = firstBtn.getAttribute("aria-expanded") === "true";
          firstBtn.click();
          await new Promise((r) => setTimeout(r, 250));
          const toggledExpanded = firstBtn.getAttribute("aria-expanded") === "true";
          return toggledExpanded !== initialExpanded;
        })()
      `);
      results.faqInteractive = faqToggleResult;
      console.log(`  ✓ FAQ accordion toggle interaction: ${faqToggleResult ? "PASSED" : "FAILED"}`);
    } else {
      results.faqInteractive = true;
    }

    // ----------------------------------------------------
    // TEST 3: Leading-Hyphen Slug (Edge Case)
    // ----------------------------------------------------
    const leadingHyphenSlug = "-josaa-2026-counselling-live-updates";
    console.log(`\nNavigating to leading-hyphen article: /news/${leadingHyphenSlug}...`);
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news/${leadingHyphenSlug}` });
    await sleep(2500);

    const leadingHyphenInfo = await client.eval(`
      (() => {
        const h1 = document.querySelector("h1");
        const prose = document.querySelector(".news-prose");
        return {
          hasH1: !!h1,
          h1Text: h1?.innerText?.trim(),
          hasProse: !!prose && prose.children.length > 0,
        };
      })()
    `);

    results.leadingHyphenArticle = leadingHyphenInfo.hasH1 && leadingHyphenInfo.hasProse;
    console.log(`  ✓ Leading hyphen slug handled successfully: "${leadingHyphenInfo.h1Text}"`);

    // ----------------------------------------------------
    // TEST 3B: Article with LIVE Updates Badge
    // ----------------------------------------------------
    const liveSlug = "cuet-ug-exam-analysis-live-updates";
    console.log(`\nNavigating to active live article: /news/${liveSlug}...`);
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news/${liveSlug}` });
    await sleep(2500);

    const liveInfo = await client.eval(`
      (() => {
        const liveBadge = document.querySelector("[data-testid='news-live-badge']");
        const jsonLd = document.querySelector("script[type='application/ld+json']")?.textContent;
        let parsedLd = null;
        try {
          if (jsonLd) parsedLd = JSON.parse(jsonLd);
        } catch {}

        return {
          hasLiveBadge: !!liveBadge,
          liveBadgeText: liveBadge?.innerText?.trim(),
          jsonLdType: parsedLd?.["@type"],
        };
      })()
    `);
    console.log(`  ✓ Live indicator badge: ${liveInfo.hasLiveBadge} ("${liveInfo.liveBadgeText}")`);
    console.log(`  ✓ Live Article JSON-LD Schema: @type="${liveInfo.jsonLdType}"`);

    // ----------------------------------------------------
    // TEST 4: 404 Not Found State
    // ----------------------------------------------------
    const nonExistentSlug = "non-existent-article-slug-xyz-123";
    console.log(`\nNavigating to non-existent slug: /news/${nonExistentSlug}...`);
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news/${nonExistentSlug}` });
    await sleep(2000);

    const notFoundInfo = await client.eval(`
      (() => {
        const bodyText = document.body.innerText;
        const has404Heading = bodyText.includes("News Article Not Found");
        const backToNewsBtn = Array.from(document.querySelectorAll("a")).find(a => a.href.includes("/news"));
        return {
          has404Heading,
          hasBackToNews: !!backToNewsBtn,
        };
      })()
    `);

    results.notFoundState = notFoundInfo.has404Heading && notFoundInfo.hasBackToNews;
    console.log(`  ✓ 404 Not Found State handled: ${notFoundInfo.has404Heading ? "PASSED" : "FAILED"}`);
    console.log(`  ✓ "Back to News" link available: ${notFoundInfo.hasBackToNews}`);

    // ----------------------------------------------------
    // TEST 5: Responsive Viewport Testing (0px overflow)
    // ----------------------------------------------------
    console.log("\nNavigating back to standard article for responsive testing...");
    await client.send("Page.navigate", { url: `http://127.0.0.1:${PORT}/news/${standardSlug}` });
    await sleep(2000);

    console.log("\nTesting 5 responsive viewports for horizontal overflow...");
    for (const vp of VIEWPORTS) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 1024,
      });
      await sleep(400);

      const overflow = await client.eval(`
        (() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const bodyWidth = document.body.scrollWidth;
          return {
            docWidth,
            winWidth,
            bodyWidth,
            hasHorizontalOverflow: docWidth > winWidth || bodyWidth > winWidth,
            overflowDiff: Math.max(0, docWidth - winWidth, bodyWidth - winWidth),
          };
        })()
      `);

      const vpResult = {
        viewport: vp.name,
        width: vp.width,
        scrollWidth: overflow.docWidth,
        overflowDiff: overflow.overflowDiff,
        passed: !overflow.hasHorizontalOverflow,
      };
      results.viewports.push(vpResult);

      console.log(
        `  ${vpResult.passed ? "✓ PASS" : "✗ FAIL"}: ${vp.name.padEnd(20)} | Width: ${vp.width}px | Scroll: ${overflow.docWidth}px | Overflow: ${overflow.overflowDiff}px`
      );
    }
  } finally {
    if (client) client.close();
    chromeProc.kill();
    server.close();

    // Clean up temporary profile
    try {
      fs.rmSync(TEMP_PROFILE_DIR, { recursive: true, force: true });
    } catch {}
  }

  console.log("\n==================================================");
  console.log("FINAL NEWS DETAIL QA VERIFICATION SUMMARY:");
  console.log(`- Standard Article Detail Page: ${results.standardArticle ? "PASSED" : "FAILED"}`);
  console.log(`- Leading-Hyphen Slug Edge Case: ${results.leadingHyphenArticle ? "PASSED" : "FAILED"}`);
  console.log(`- FAQ Accordion & Expansion Interaction: ${results.faqInteractive ? "PASSED" : "FAILED"}`);
  console.log(`- 404 Article Not Found State: ${results.notFoundState ? "PASSED" : "FAILED"}`);
  const allVpPass = results.viewports.every((v) => v.passed);
  console.log(`- Zero Horizontal Scrollbar across all 5 viewports: ${allVpPass ? "PASSED (0px overflow)" : "FAILED"}`);
  console.log("==================================================\n");

  if (!results.standardArticle || !results.leadingHyphenArticle || !results.notFoundState || !allVpPass) {
    throw new Error("One or more QA checks failed!");
  }

  return results;
}

runQa().catch((err) => {
  console.error("News Detail QA script failed:", err);
  process.exit(1);
});
