import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const servicePath = new URL("../src/services/blogApi.js", import.meta.url);
const serviceSource = readFileSync(servicePath, "utf8");
const { getBlogBySlug, normalizeBlogData, BlogNotFoundError, BlogServiceError } = await import(servicePath);

const realSlug = "how-to-choose-online-university-india";

function sampleEnvelope(over = {}) {
  const blog = {
    _id: "blog-1",
    urlSlug: realSlug,
    status: "approved",
    title: "Real title from CMS",
    category: "Tips & Guidance",
    readingTime: "",
    publishDate: null,
    modifiedDate: "2026-11-06T12:14:04.092Z",
    createdAt: "2025-11-27T11:58:02.090Z",
    authors: [],
    mainimage: { image: "https://images.degreefyd.com/blogs/x/main.webp", alt: "Hero alt" },
    introduction: "",
    subheadings: ["Verify UGC-DEB recognition"],
    bulletPoints: [],
    sections: [
      {
        key: "choose",
        title: "How to choose the right online university?",
        tocTitle: "How to choose",
        order: 1,
        blocks: [
          { type: "richtext", content: "<p>Real CMS content.</p>" },
          { type: "table", headers: ["Point", "Check"], rows: [["UGC-DEB", "Verify entitlement"]] },
          { type: "note", designPattern: "tip", title: "Keep approval handy", text: "Screenshot the approval page." },
        ],
      },
    ],
    tableOfContents: [{ id: "choose", title: "How to choose", order: 1 }],
    faqs: [{ question: "Is it valid?", answer: "Yes." }],
    seo: {
      meta: { metaTitle: "Real meta title", metaDescription: "Real meta description.", canonicalUrl: "https://degreefyd.com/blogs/x" },
      og: { ogTitle: "OT", ogDescription: "OD", ogImage: "https://images.degreefyd.com/blogs/x/og.webp", ogUrl: "https://degreefyd.com/blogs/x" },
      twitter: { twitterTitle: "TT", twitterDescription: "TD", twitterImage: "https://images.degreefyd.com/blogs/x/twitter.webp" },
      settings: { robotsTag: "index,follow" },
    },
    ...over,
  };
  return {
    status: "success",
    data: {
      blog,
      relatedBlogs: [
        {
          slug: "other-slug",
          title: "Other article",
          excerpt: "Other excerpt.",
          date: "2026-09-12T00:00:00.000Z",
          category: "Guides",
          image: { image: "https://images.degreefyd.com/blogs/y/main.webp", alt: "Other alt" },
        },
      ],
    },
  };
}

const originalFetch = globalThis.fetch;
let mockStatus = 200;
let mockBody = sampleEnvelope();

globalThis.fetch = async (url) => {
  if (globalThis.fetch.shouldThrow) throw new Error("AbortError: The operation timed out");
  return {
    ok: mockStatus >= 200 && mockStatus < 300,
    status: mockStatus,
    json: async () => mockBody,
  };
};

const cases = [];

cases.push(async () => {
  mockStatus = 200;
  mockBody = sampleEnvelope();
  const { blog, relatedBlogs } = await getBlogBySlug(realSlug);
  assert.equal(blog.title, "Real title from CMS");
  assert.equal(blog.urlSlug, realSlug);
  assert.equal(blog.status, "approved");
  assert.equal(blog.sections.length, 1);
  assert.deepEqual(blog.faqs.map((f) => f.question), ["Is it valid?"]);
  assert.deepEqual(relatedBlogs.map((r) => r.slug), ["other-slug"]);
  assert.equal(relatedBlogs[0].image, "https://images.degreefyd.com/blogs/y/main.webp");
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = sampleEnvelope();
  const { blog } = await getBlogBySlug(realSlug);
  assert.equal(blog.mainImage?.url, "https://images.degreefyd.com/blogs/x/main.webp");
  assert.equal(blog.mainImage?.alt, "Hero alt");
  assert.equal(blog.author.name, null); // authors: [] must not invent a name
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = sampleEnvelope();
  const { blog } = await getBlogBySlug(realSlug);
  assert.equal(blog.seo.metaTitle, "Real meta title");
  assert.equal(blog.seo.metaDescription, "Real meta description.");
  assert.equal(blog.seo.canonical, "https://degreefyd.com/blogs/x");
  assert.equal(blog.seo.ogImage, "https://images.degreefyd.com/blogs/x/og.webp");
  assert.equal(blog.seo.robotsTag, "index,follow");
});

cases.push(async () => {
  mockStatus = 404;
  await assert.rejects(() => getBlogBySlug("missing-slug"), (e) => e instanceof BlogNotFoundError && e.code === "NOT_FOUND");
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { status: "success", data: { blog: { ...sampleEnvelope().data.blog, status: "draft" }, relatedBlogs: [] } };
  await assert.rejects(() => getBlogBySlug("x"), (e) => e.notApproved === true);
});

cases.push(async () => {
  mockStatus = 500;
  await assert.rejects(() => getBlogBySlug("x"), (e) => e instanceof BlogServiceError && e.status === 500);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = sampleEnvelope();
  await assert.rejects(() => getBlogBySlug(""), (e) => e instanceof BlogNotFoundError && e.code === "MISSING_SLUG");
});

cases.push(async () => {
  const out = normalizeBlogData({ title: "Partial", status: "approved" });
  assert.equal(out.title, "Partial");
  assert.deepEqual(out.sections, []);
  assert.deepEqual(out.faqs, []);
  assert.equal(out.author.name, null);
  assert.equal(out.publishDate, null);
});

cases.push(() => {
  assert.ok(!serviceSource.includes("../data/blog"), "Detail service must not import local article data");
});

cases.push(() => {
  globalThis.fetch.shouldThrow = true;
  return getBlogBySlug("x").then(
    () => { throw new Error("expected rejection"); },
    (e) => { assert.equal(e.name, "BlogServiceError"); delete globalThis.fetch.shouldThrow; }
  );
});

const { getBlogsList, BlogServiceError: BlogServiceError2 } = await import(servicePath);

const listingEnvelope = {
  status: true,
  data: {
    articles: [
      { urlSlug: "sample-a", title: "Sample A", category: "Colleges", views: 3, publishDate: null, createdAt: "2026-09-01T00:00:00.000Z", readingTime: "", introduction: "<p>Sample A intro from CMS.</p>", mainimage: { image: "https://images.degreefyd.com/blogs/a/main.webp", alt: "A" } },
      { urlSlug: "sample-b", title: "Sample B", category: "", views: 120, publishDate: null, createdAt: "2026-09-02T00:00:00.000Z", readingTime: "", mainimage: { image: "https://images.degreefyd.com/blogs/b/main.webp", alt: "B" } },
    ],
    total: 26,
    totalPages: 3,
  },
};

cases.push(async () => {
  delete globalThis.fetch.shouldThrow;
  mockStatus = 200;
  mockBody = listingEnvelope;
  const { articles, total, totalPages } = await getBlogsList({ page: 1, limit: 9 });
  assert.equal(total, 26);
  assert.equal(totalPages, 3);
  assert.equal(articles.length, 2);
  assert.equal(articles[0].slug, "sample-a");
  assert.equal(articles[0].image, "https://images.degreefyd.com/blogs/a/main.webp");
  assert.equal(articles[1].category, null);
});

cases.push(async () => {
  mockStatus = 500;
  await assert.rejects(() => getBlogsList({ page: 1 }), (e) => e instanceof BlogServiceError2 && e.status === 500);
});

cases.push(async () => {
  mockStatus = 200;
  mockBody = { status: false };
  await assert.rejects(() => getBlogsList({ page: 1 }), (e) => e instanceof BlogServiceError2 && e.code === "BAD_ENVELOPE");
});

for (const [i, run] of cases.entries()) {
  try {
    await run();
    console.log(`✓ test ${i + 1}`);
  } catch (e) {
    console.error(`✗ test ${i + 1}: ${e.message}`);
    process.exitCode = 1;
  }
}

globalThis.fetch = originalFetch;
