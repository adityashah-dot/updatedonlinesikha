import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import * as rd from "react-router-dom";
import { installDom, installFetchStub, bootVite, mountElement, click, qa, textOf } from "./webDom.mjs";
import {
  orderedApiRoutes,
  DETAIL_COMPLETE,
  DETAIL_PARTIAL,
  DETAIL_MALFORMED,
  NAV_COMPLETE,
  NAV_PARTIAL,
  COURSES_COMPLETE,
} from "./fixtures/model.mjs";
import { readFileSync } from "node:fs";

const liveSlugAudit = JSON.parse(
  readFileSync(new URL("./audit/university-slugs.json", import.meta.url), "utf8")
);

let vite;
let legacySlugAliases = {};

before(async () => {
  installDom();
  vite = await bootVite();
  legacySlugAliases = (await vite.ssrLoadModule("/src/services/collegePageLoader.js")).LEGACY_SLUG_ALIASES;
});

after(async () => {
  await vite.close();
});

async function mountDetail(slug, options = {}) {
  const mod = await vite.ssrLoadModule("/src/components/CollegeDetailView.jsx");
  const locations = [];
  function LocationSpy() {
    const location = rd.useLocation();
    locations.push(location.pathname + location.search);
    return null;
  }
  const element = React.createElement(
    rd.MemoryRouter,
    { initialEntries: [slug] },
    React.createElement(rd.Routes, null,
      React.createElement(rd.Route, {
        path: "/universities/*",
        element: React.createElement(mod.CollegeDetailView, {
          onSelectCourse: () => {},
          onOpenApply: () => {},
          onOpenBrochure: () => {},
          onOpenHelpDesk: () => {},
          onOpenEmi: () => {},
          onOpenLms: () => {},
        }),
      })
    ),
    React.createElement(LocationSpy)
  );
  const view = await mountElement(element);
  return { view, locations };
}

async function waitFor(container, needle, tries = 40) {
  for (let i = 0; i < tries; i += 1) {
    if (textOf(container).includes(needle)) return true;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return false;
}

test("complete detail page renders the canonical section order", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: { "complete-university-online": DETAIL_COMPLETE },
    navByCollegeId: { "cuo-1": NAV_COMPLETE },
    coursesByCollegeId: { "cuo-1": COURSES_COMPLETE },
  }));

  const { view } = await mountDetail("/universities/complete-university-online");
  const { container } = view;

  assert.ok(await waitFor(container, "Complete University Online"), `detail content loads: ${textOf(container).slice(0, 400)}`);

  const order = [
    "latest-news",
    "highlights",
    "courses-fees",
    "eligibility-criteria",
    "admission-process",
    "rankings",
    "examination-pattern",
    "placements",
    "reviews-section",
    "compare-colleges",
    "blogs",
    "faqs",
  ];
  const positions = order.map((id) => {
    const section = container.querySelector(`#${id}`);
    return section ? container.innerHTML.indexOf(`id="${id}"`) : -1;
  });
  const found = order.filter((id, index) => positions[index] >= 0);

  assert.ok(found.length >= 8, `most canonical sections render (got ${found.length}: ${found.join(", ")})`);

  const sorted = found.map((id) => container.innerHTML.indexOf(`id="${id}"`));
  assert.deepEqual([...sorted].sort((a, b) => a - b), sorted, "sections appear in the canonical order");

  const html = container.innerHTML;
  assert.ok(!/\[object Object\]/.test(html), "no [object Object]");
  assert.ok(!/undefined/.test(html), "no undefined text nodes");

  await view.unmount();
});

test("detail page tabs drive ?section= and swap the template", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: { "complete-university-online": DETAIL_COMPLETE },
    navByCollegeId: { "cuo-1": NAV_COMPLETE },
    coursesByCollegeId: { "cuo-1": COURSES_COMPLETE },
  }));

  const { view } = await mountDetail("/universities/complete-university-online");
  const { container } = view;
  assert.ok(await waitFor(container, "Complete University Online"), `detail content loads: ${textOf(container).slice(0, 400)}`);

  const tab = qa(container, "button").find((button) => textOf(button).includes("Courses"));
  assert.ok(tab, `courses tab renders from the CMS navbar list: ${qa(container, "button").map(textOf).join(" | ")}`);
  await click(tab);

  await waitFor(container, "Fee Structure");
  assert.ok(container.querySelector("#fee-structure"), "courses template renders the fee structure");
  assert.ok(container.querySelector("#all-courses"), "courses template renders the course list");
  assert.ok(container.querySelector("#faqs"), "courses template keeps the FAQ accordion");

  await view.unmount();
});

test("Chandigarh University overview breadcrumbs navigate to their routes", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: {
      "chandigarh-university-online": {
        ...DETAIL_COMPLETE,
        slug: "chandigarh-university-online",
        title: "Chandigarh University Online",
      },
    },
    navByCollegeId: { "cuo-1": NAV_COMPLETE },
    coursesByCollegeId: { "cuo-1": COURSES_COMPLETE },
  }));

  const { view, locations } = await mountDetail("/universities/chandigarh-university-online");
  const { container } = view;
  assert.ok(await waitFor(container, "Chandigarh University Online"), "the Chandigarh overview loads");

  const breadcrumb = container.querySelector('nav[aria-label="Breadcrumb"]');
  const links = qa(breadcrumb, "a");
  assert.deepEqual(links.map((link) => link.getAttribute("href")), [
    "/",
    "/universities",
    "/universities/chandigarh-university-online",
    "/universities/chandigarh-university-online",
  ]);

  await click(links[1]);
  assert.equal(locations.at(-1), "/universities", "the Colleges breadcrumb opens the listing route");

  await view.unmount();
});

for (const university of liveSlugAudit.universities) {
  test(`direct detail route safely handles live slug ${university.slug || "missing-slug"}`, async () => {
    const validDetail = university.apiStatus === "PASS";
    const canonicalSlug = legacySlugAliases[university.slug] || university.slug;
    const detail = validDetail ? {
      slug: canonicalSlug,
      title: university.universityName,
      shortTitle: "Overview",
      college_id: {
        _id: university.universityId,
        name: university.universityName,
        slug: canonicalSlug,
        collegeShortName: university.universityName,
        collegeMode: university.listingMode,
        approvals: [],
        scholarships: [],
        reviews: [],
      },
      hero: {},
      sections: [],
      faq: { items: [] },
      faqs: [],
      toc: [],
    } : null;
    const nav = university.publishedTabs.map((tab) => ({
      slug: tab.slug === university.slug ? canonicalSlug : tab.slug,
      navbarTitle: ({ overview: "Overview", courses: "Courses", admission: "Admission", scholarships: "Scholarships" })[tab.section] || tab.label,
    }));
    const routes = orderedApiRoutes({
      detailBySlug: validDetail ? { [canonicalSlug]: detail } : {},
      navByCollegeId: { [university.universityId]: nav },
      coursesByCollegeId: { [university.universityId]: [] },
    });
    installFetchStub(routes);

    const { view } = await mountDetail(`/universities/${university.slug}`);
    const { container } = view;
    if (validDetail) {
      assert.ok(await waitFor(container, university.universityName), `correct identity renders for ${university.slug}`);
      for (const tab of nav) {
        assert.ok(textOf(container).includes(tab.navbarTitle), `published navigation tab appears: ${tab.navbarTitle}`);
      }
      for (const tab of nav.filter((item) => !/^overview$/i.test(item.navbarTitle))) {
        const tabButton = qa(container, "button").find((button) => textOf(button).includes(tab.navbarTitle));
        assert.ok(tabButton, `published page tab is interactive: ${tab.navbarTitle}`);
        await click(tabButton);
        assert.ok(qa(container, "h1").some((heading) => textOf(heading).trim()), `the ${tab.section} tab renders a page heading`);
        assert.ok(!textOf(container).includes("University Not Found"), `the ${tab.section} page stays available`);
      }
      assert.ok(!/\[object Object\]|undefined|NaN/.test(container.innerHTML), "no malformed values render");
    } else {
      assert.ok(await waitFor(container, "University Not Found"), `upstream 404 is surfaced for ${university.slug}`);
    }
    await view.unmount();
  });
}

test("admission section keeps its canonical blocks", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: { "complete-university-online": DETAIL_COMPLETE },
    navByCollegeId: { "cuo-1": NAV_COMPLETE },
    coursesByCollegeId: { "cuo-1": COURSES_COMPLETE },
  }));

  const { view } = await mountDetail("/universities/complete-university-online?section=admission");
  const { container } = view;

  await waitFor(container, "Admission");
  assert.ok(container.querySelector("#admission-process"), "admission process renders");
  assert.ok(container.querySelector("#admission-faqs"), "admission FAQs render");
  assert.equal(container.querySelector("#admission-highlights"), null, "the admission highlights card is removed");
  assert.ok(!textOf(container).includes("Admission Information"), "the admission information label is removed");
  assert.ok(!qa(container, "button").some((button) => textOf(button).trim() === "Read more"), "admission hero descriptions display in full");
  assert.ok(qa(container, "h2").every((heading) => !heading.className.includes("font-extrabold")), "section headings use the shared bold weight");
  const toc = container.querySelector('section[aria-label="Table of contents"]');
  const viewMore = qa(toc, "button").find((button) => textOf(button).includes("View more"));
  assert.ok(viewMore, "the TOC shows a labeled expand control");
  await click(viewMore);
  assert.ok(textOf(toc).includes("View less"), "the TOC shows the matching collapse label");

  await view.unmount();
});

test("partial data renders hero + overview without crashing", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: { "partial-university-online": DETAIL_PARTIAL },
    navByCollegeId: { "puo-1": NAV_PARTIAL },
    coursesByCollegeId: { "puo-1": [] },
  }));

  const { view } = await mountDetail("/universities/partial-university-online");
  const { container } = view;

  assert.ok(await waitFor(container, "Partial University Online"), "partial page still renders");
  assert.ok(container.querySelector("#highlights") || textOf(container).includes("Bachelor and master"), "overview content renders");

  const html = container.innerHTML;
  assert.ok(!/NaN/.test(html), "no NaN");
  assert.ok(!/\[object Object\]/.test(html), "no [object Object]");

  await view.unmount();
});

test("malformed detail payload never crashes the page", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: { "partial-university-online": DETAIL_MALFORMED },
    navByCollegeId: { "": NAV_PARTIAL },
    coursesByCollegeId: { "": [] },
  }));

  const { view } = await mountDetail("/universities/partial-university-online");
  const { container } = view;

  const loaded = await waitFor(container, "404") || await waitFor(container, "Partial University Online");
  assert.ok(loaded, "either the 404 card or a guarded render answers malformed data");

  const html = container.innerHTML;
  assert.ok(!/\[object Object\]/.test(html), "no [object Object]");
  assert.ok(!/undefined/.test(html), "no undefined text nodes");

  await view.unmount();
});

test("unknown slug renders the 404 card", async () => {
  installFetchStub(orderedApiRoutes({
    detailBySlug: { "complete-university-online": DETAIL_COMPLETE },
    navByCollegeId: { "cuo-1": NAV_COMPLETE },
  }));

  const { view } = await mountDetail("/universities/unknown-university-online");
  const { container } = view;

  assert.ok(await waitFor(container, "University Not Found"), "404 card renders for unknown slug");

  await view.unmount();
});
