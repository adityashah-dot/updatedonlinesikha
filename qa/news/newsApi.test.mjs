import assert from "node:assert/strict";
import {
  getNewsListing,
  getNewsBySlug,
  cleanSlug,
  stripHtml,
  brandize,
  resolveNewsImage,
  resolveAuthor,
  normalizeNewsListItem,
  normalizeNewsDetail,
  NewsNotFoundError,
  NewsServiceError,
  DEFAULT_NEWS_FALLBACK_IMAGE,
} from "../../src/services/newsApi.js";

// Save original fetch
const originalFetch = globalThis.fetch;

let testCount = 0;
function pass(msg) {
  testCount++;
  console.log(`  ✓ Test ${testCount}: ${msg}`);
}

async function runTests() {
  console.log("Starting News API Service Unit Test Suite...\n");

  // -------------------------------------------------------------
  // Test 1: cleanSlug helper & leading hyphen preservation
  // -------------------------------------------------------------
  {
    assert.equal(cleanSlug(""), "");
    assert.equal(cleanSlug(null), "");
    assert.equal(cleanSlug(undefined), "");
    assert.equal(cleanSlug("  UP-Board-Result-2026  "), "up-board-result-2026");
    // Critical test: Leading hyphen preserved!
    assert.equal(
      cleanSlug("-josaa-2026-counselling-live-updates"),
      "-josaa-2026-counselling-live-updates"
    );
    assert.equal(
      cleanSlug("  -JOSAA-2026-COUNSELLING-LIVE-UPDATES  "),
      "-josaa-2026-counselling-live-updates"
    );
    pass("cleanSlug handles empty, whitespace, and preserves leading hyphen correctly");
  }

  // -------------------------------------------------------------
  // Test 2: stripHtml helper
  // -------------------------------------------------------------
  {
    const raw = '<p data-id="123">Hello &amp; welcome to &quot;OnlineSiksha&quot;! <br/>Latest news.</p>';
    assert.equal(stripHtml(raw), 'Hello & welcome to "OnlineSiksha"! Latest news.');
    assert.equal(stripHtml(""), "");
    assert.equal(stripHtml(null), "");
    pass("stripHtml strips HTML tags and decodes common HTML entities");
  }

  // -------------------------------------------------------------
  // Test 3: brandize helper
  // -------------------------------------------------------------
  {
    const rawText = "Check DegreeFYD ranking and degreefyd.com notices from DegreeFyd team.";
    const result = brandize(rawText);
    assert.equal(result, "Check OnlineSiksha ranking and onlinesiksha.com notices from OnlineSiksha team.");
    pass("brandize replaces DegreeFYD mentions with OnlineSiksha");
  }

  // -------------------------------------------------------------
  // Test 4: resolveNewsImage dual fallback hierarchy
  // -------------------------------------------------------------
  {
    // Case A: hero image present
    const itemA = { hero: { image: "https://example.com/hero.webp" }, thumbnail: { url: "https://example.com/thumb.webp" } };
    assert.equal(resolveNewsImage(itemA).url, "https://example.com/hero.webp");

    // Case B: hero empty, thumbnail present
    const itemB = { hero: { image: "" }, thumbnail: { url: "https://example.com/thumb.webp" } };
    assert.equal(resolveNewsImage(itemB).url, "https://example.com/thumb.webp");

    // Case C: both empty, fallback provided
    const itemC = { hero: { image: "" }, thumbnail: { url: "" } };
    assert.equal(resolveNewsImage(itemC).url, DEFAULT_NEWS_FALLBACK_IMAGE);

    // Case D: item is null
    assert.equal(resolveNewsImage(null).url, DEFAULT_NEWS_FALLBACK_IMAGE);
    pass("resolveNewsImage respects hero -> thumbnail -> fallback hierarchy");
  }

  // -------------------------------------------------------------
  // Test 5: resolveAuthor helper
  // -------------------------------------------------------------
  {
    // Case A: createdBy.username present
    const itemA = { createdBy: { username: "Jiya Tyagi", slug: "jiya-tyagi" } };
    assert.equal(resolveAuthor(itemA).name, "Jiya Tyagi");

    // Case B: createdBy missing, authors array present
    const itemB = { authors: ["Silki Joshi"] };
    assert.equal(resolveAuthor(itemB).name, "Silki Joshi");

    // Case C: both missing
    const itemC = {};
    assert.equal(resolveAuthor(itemC).name, "OnlineSiksha News Desk");
    pass("resolveAuthor handles createdBy, authors array, and default desk fallback");
  }

  // -------------------------------------------------------------
  // Test 6: normalizeNewsListItem & normalizeNewsDetail
  // -------------------------------------------------------------
  {
    const mockRawItem = {
      _id: "news-001",
      pageId: "NWS-001",
      slug: "-josaa-2026-counselling-live-updates",
      title: "JoSAA 2026 Counselling Registration LIVE",
      category: "Exam Alerts",
      isLive: "true",
      approvalDate: "2026-10-17T12:41:08.068Z",
      createdBy: { username: "Jiya Tyagi" },
      hero: { image: "https://example.com/hero.webp" },
      thumbnail: { url: "" },
    };
    const normalized = normalizeNewsListItem(mockRawItem);
    assert.equal(normalized.id, "news-001");
    assert.equal(normalized.slug, "-josaa-2026-counselling-live-updates");
    assert.equal(normalized.isLive, true);
    assert.equal(normalized.author.name, "Jiya Tyagi");
    assert.equal(normalized.image.url, "https://example.com/hero.webp");
    pass("normalizeNewsListItem normalizes keys, dates, live flags, and images");
  }

  // -------------------------------------------------------------
  // Test 7: getNewsListing - Successful listing response
  // -------------------------------------------------------------
  {
    globalThis.fetch = async (url) => {
      assert(url.includes("/news-pages/website/list"));
      return {
        ok: true,
        status: 200,
        json: async () => ({
          status: "success",
          data: {
            articles: [
              {
                _id: "art-1",
                slug: "cuet-ug-2026",
                title: "CUET UG 2026 Result",
                category: "Exam Alerts",
                isLive: true,
                hero: { image: "https://example.com/cuet.webp" },
              },
              {
                _id: "art-2",
                slug: "jee-adv-2026",
                title: "JEE Advanced 2026",
                category: "Exam Alerts",
                isLive: false,
                thumbnail: { url: "https://example.com/jee.webp" },
              },
            ],
            total: 2,
            totalPages: 1,
          },
        }),
      };
    };

    const res = await getNewsListing();
    assert.equal(res.articles.length, 2);
    assert.equal(res.total, 2);
    assert.equal(res.totalPages, 1);
    assert.equal(res.articles[0].slug, "cuet-ug-2026");
    assert.equal(res.articles[0].isLive, true);
    assert.equal(res.articles[1].slug, "jee-adv-2026");
    assert.equal(res.articles[1].isLive, false);
    pass("getNewsListing successfully parses and normalizes articles with pagination");
  }

  // -------------------------------------------------------------
  // Test 8: getNewsListing - Empty listing response
  // -------------------------------------------------------------
  {
    globalThis.fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        status: "success",
        data: {
          articles: [],
          total: 0,
          totalPages: 0,
        },
      }),
    });

    const res = await getNewsListing();
    assert.equal(res.articles.length, 0);
    assert.equal(res.total, 0);
    pass("getNewsListing gracefully handles empty article lists");
  }

  // -------------------------------------------------------------
  // Test 9: getNewsListing - API failure (HTTP 500)
  // -------------------------------------------------------------
  {
    globalThis.fetch = async () => ({
      ok: false,
      status: 500,
      json: async () => ({ error: "Internal Server Error" }),
    });

    await assert.rejects(
      async () => await getNewsListing(),
      (err) => {
        assert(err instanceof NewsServiceError);
        assert.equal(err.code, "HTTP_ERROR");
        assert.equal(err.status, 500);
        return true;
      }
    );
    pass("getNewsListing throws NewsServiceError on HTTP 500");
  }

  // -------------------------------------------------------------
  // Test 10: getNewsListing - Network failure
  // -------------------------------------------------------------
  {
    globalThis.fetch = async () => {
      throw new Error("Failed to connect");
    };

    await assert.rejects(
      async () => await getNewsListing(),
      (err) => {
        assert(err instanceof NewsServiceError);
        assert.equal(err.code, "NETWORK");
        return true;
      }
    );
    pass("getNewsListing throws NewsServiceError on network failure");
  }

  // -------------------------------------------------------------
  // Test 11: getNewsBySlug - Successful detail response
  // -------------------------------------------------------------
  {
    globalThis.fetch = async (url) => {
      assert(url.includes("/news-pages/website/cuet-ug-2026"));
      return {
        ok: true,
        status: 200,
        json: async () => ({
          status: true,
          data: {
            news: {
              _id: "news-123",
              pageId: "NWS-CUET",
              slug: "cuet-ug-2026",
              title: "CUET UG 2026 Scorecard Released",
              category: "Exam Alerts",
              isLive: true,
              createdBy: { username: "Silki Joshi" },
              approvalDate: "2026-10-17T12:35:34.286Z",
              hero: {
                title: "CUET UG",
                description: "<p>NTA has announced the CUET UG 2026 scorecard.</p>",
                image: "https://example.com/cuet-hero.webp",
              },
              sections: [
                {
                  heading: "Highlights",
                  blocks: [
                    { type: "richText", content: "<p>Over 1.3 million candidates appeared.</p>" },
                    { type: "live_news", content: { title: "Live update 1", isLive: "true", newsPageId: "news-123" } },
                  ],
                },
              ],
              tableOfContents: [
                { title: "Highlights", anchor: "#section-0" },
              ],
              pageLevelFaqs: [
                { question: "Where to check?", answer: "<p>Visit cuet.nta.nic.in</p>" },
              ],
              tags: ["cuet 2026", "nta"],
              relatedNews: [],
              seo: {
                meta: {
                  metaTitle: "CUET UG 2026 Scorecard (OUT) Live",
                  metaDescription: "Download CUET UG 2026 scorecards now.",
                },
              },
            },
          },
        }),
      };
    };

    const article = await getNewsBySlug("cuet-ug-2026");
    assert.equal(article.id, "news-123");
    assert.equal(article.slug, "cuet-ug-2026");
    assert.equal(article.isLive, true);
    assert.equal(article.author.name, "Silki Joshi");
    assert.equal(article.hero.cleanExcerpt, "NTA has announced the CUET UG 2026 scorecard.");
    assert.equal(article.sections.length, 1);
    assert.equal(article.sections[0].blocks[0].type, "richText");
    assert.equal(article.sections[0].blocks[1].type, "live_news");
    assert.equal(article.sections[0].blocks[1].content.isLive, true);
    assert.equal(article.tableOfContents.length, 1);
    assert.equal(article.faqs.length, 1);
    assert.equal(article.faqs[0].question, "Where to check?");
    assert.equal(article.tags.length, 2);
    pass("getNewsBySlug parses richText, live_news blocks, TOC, FAQs, and SEO");
  }

  // -------------------------------------------------------------
  // Test 12: getNewsBySlug - Preserves leading hyphen in URL
  // -------------------------------------------------------------
  {
    let requestedUrl = "";
    globalThis.fetch = async (url) => {
      requestedUrl = url;
      return {
        ok: true,
        status: 200,
        json: async () => ({
          status: true,
          data: {
            news: {
              slug: "-josaa-2026-counselling-live-updates",
              title: "JoSAA 2026 Counselling Registration",
            },
          },
        }),
      };
    };

    await getNewsBySlug("-josaa-2026-counselling-live-updates");
    assert(
      requestedUrl.endsWith("/news-pages/website/-josaa-2026-counselling-live-updates"),
      `Expected leading hyphen preserved in URL, got: ${requestedUrl}`
    );
    pass("getNewsBySlug accurately preserves leading-hyphen slugs in API requests");
  }

  // -------------------------------------------------------------
  // Test 13: getNewsBySlug - 404 / Missing article
  // -------------------------------------------------------------
  {
    globalThis.fetch = async () => ({
      ok: false,
      status: 404,
      json: async () => ({ error: "Not Found" }),
    });

    await assert.rejects(
      async () => await getNewsBySlug("non-existent-slug"),
      (err) => {
        assert(err instanceof NewsNotFoundError);
        assert.equal(err.code, "NOT_FOUND");
        return true;
      }
    );
    pass("getNewsBySlug throws NewsNotFoundError on HTTP 404");
  }

  // -------------------------------------------------------------
  // Test 14: getNewsBySlug - Missing or empty slug parameter
  // -------------------------------------------------------------
  {
    await assert.rejects(
      async () => await getNewsBySlug(""),
      (err) => {
        assert(err instanceof NewsNotFoundError);
        assert.equal(err.code, "MISSING_SLUG");
        return true;
      }
    );
    await assert.rejects(
      async () => await getNewsBySlug(null),
      (err) => {
        assert(err instanceof NewsNotFoundError);
        assert.equal(err.code, "MISSING_SLUG");
        return true;
      }
    );
    pass("getNewsBySlug rejects empty or null slug without making API request");
  }

  // -------------------------------------------------------------
  // Test 15: getNewsBySlug - Unexpected empty payload
  // -------------------------------------------------------------
  {
    globalThis.fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        status: true,
        data: { news: null },
      }),
    });

    await assert.rejects(
      async () => await getNewsBySlug("empty-news"),
      (err) => {
        assert(err instanceof NewsNotFoundError);
        return true;
      }
    );
    pass("getNewsBySlug throws NewsNotFoundError when payload data.news is null/empty");
  }

  // -------------------------------------------------------------
  // Test 16: Malformed / Bad JSON Response
  // -------------------------------------------------------------
  {
    globalThis.fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error("SyntaxError: Unexpected token < in JSON");
      },
    });

    await assert.rejects(
      async () => await getNewsListing(),
      (err) => {
        assert(err instanceof NewsServiceError);
        assert.equal(err.code, "BAD_JSON");
        return true;
      }
    );
    pass("getNewsListing throws NewsServiceError on malformed JSON");
  }

  // Restore fetch
  globalThis.fetch = originalFetch;

  console.log(`\n========================================`);
  console.log(`All ${testCount} News API unit tests passed successfully!`);
  console.log(`========================================\n`);
}

runTests().catch((err) => {
  globalThis.fetch = originalFetch;
  console.error("Test suite failed:", err);
  process.exit(1);
});
