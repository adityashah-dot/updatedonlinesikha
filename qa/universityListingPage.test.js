import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { installDom, installFetchStub, bootVite, mountElement, click, changeValue, qa, q, textOf } from "./webDom.mjs";
import {
  orderedApiRoutes,
  LISTING_COMPLETE,
  LISTING_PARTIAL,
  LISTING_MALFORMED,
  catalogueRecords,
} from "./fixtures/model.mjs";

let vite;

before(async () => {
  installDom();
  vite = await bootVite();
});

after(async () => {
  await vite.close();
});

async function mountListing(routes, initialEntry = "/universities") {
  const mod = await vite.ssrLoadModule("/src/components/UniversitiesView.jsx");
  const routerDom = await import("react-router-dom");

  const locations = [];
  function LocationSpy() {
    const location = routerDom.useLocation();
    locations.push(location.pathname + location.search);
    return null;
  }

  const React = await import("react");
  const element = React.createElement(
    routerDom.MemoryRouter,
    { initialEntries: [initialEntry] },
    React.createElement(routerDom.Routes, null,
      React.createElement(routerDom.Route, { path: "/universities", element: React.createElement(mod.UniversitiesView, { onOpenApply: () => {}, onOpenHelpDesk: () => {}, onOpenBrochure: () => {} }) })
    ),
    React.createElement(LocationSpy)
  );

  const view = await mountElement(element);
  return { view, locations };
}

function defaultRoutes(overrides = {}) {
  return orderedApiRoutes({
    ...overrides,
  });
}

test("listing renders eight universities at a time with correct data and the FAQ section", async () => {
  installFetchStub(defaultRoutes());
  const { view } = await mountListing(defaultRoutes());
  const { container } = view;

  const cards = qa(container, 'section[id="university-listings-container"] article');
  assert.equal(cards.length, 8, "only the first eight universities render on page one");
  assert.ok(textOf(cards[0]).includes("Complete University Online"), "first card is the NIRF #21 university");
  assert.ok(textOf(cards[0]).includes("Phagwara"));
  assert.ok(textOf(cards[0]).includes("NAAC A++"));

  const faqQuestions = qa(container, '#faqs button[id*="-faq-question-"]');
  assert.equal(faqQuestions.length, 10, "all configured listing FAQ questions render");
  assert.ok(container.querySelector("#faqs h2.section-title"), "listing FAQ uses the university overview section heading style");
  assert.ok(!container.querySelector('#faqs [class*="md:grid"]'), "listing FAQ keeps the overview's single-column accordion layout");
  await click(faqQuestions[2]);
  assert.equal(faqQuestions[2].getAttribute("aria-expanded"), "true", "FAQ expands on the listing page");

  await view.unmount();
});

test("clicking a university card navigates to /universities/{slug}", async () => {
  installFetchStub(defaultRoutes());
  const { view, locations } = await mountListing(defaultRoutes());
  const { container } = view;

  const cards = qa(container, 'section[id="university-listings-container"] article');
  assert.ok(cards.length, "cards render");

  await click(cards[0]);
  assert.ok(
    locations.at(-1).startsWith("/universities/complete-university-online"),
    `navigation happened to the detail route (got ${locations.at(-1)})`
  );

  await view.unmount();
});

test("sort select re-sorts the full list before pagination", async () => {
  installFetchStub(defaultRoutes());
  const { view } = await mountListing(defaultRoutes());
  const { container } = view;

  const sortSelect = qa(container, 'select[aria-label="Sort by"]')[0];
  assert.ok(sortSelect, "sort select is rendered");

  await React.act(async () => {
    const setter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(sortSelect),
      "value"
    )?.set;
    setter?.call(sortSelect, "lowestFee");
    sortSelect.dispatchEvent(new window.Event("change", { bubbles: true }));
  });

  /* Wait for the refetch to settle. */
  await new Promise((resolve) => setTimeout(resolve, 250));

  const cards = qa(container, 'section[id="university-listings-container"] article');
  assert.ok(cards.length, "cards still render after sorting");
  assert.ok(
    textOf(cards[0]).includes("Partial University Online"),
    "cheapest university (46,000 minFee) is first after sorting by lowest fee"
  );

  await view.unmount();
});

test("pagination controls appear when the catalogue spans multiple pages", async () => {
  installFetchStub(defaultRoutes());
  const { view } = await mountListing(defaultRoutes());
  const { container } = view;

  const cards = qa(container, 'section[id="university-listings-container"] article');
  assert.equal(cards.length, 8);
  assert.ok(container.querySelector('button[aria-label="Next page"]'));

  await view.unmount();
});

test("compare is capped at two universities", async () => {
  installFetchStub(defaultRoutes());
  const { view } = await mountListing(defaultRoutes());
  const { container } = view;

  const checkboxes = qa(container, 'section[id="university-listings-container"] article input[type="checkbox"]');

  await click(checkboxes[0]);
  await click(checkboxes[1]);
  await click(checkboxes[2]);

  const checked = qa(container, 'section[id="university-listings-container"] article input[type="checkbox"]').filter(
    (box) => box.checked
  );
  assert.equal(checked.length, 2, "at most two universities can be selected for comparison");

  await view.unmount();
});

test("error and empty states render instead of blank pages", async () => {
  installFetchStub({
    "https://api.degreefyd.com/api/b2c/website/colleges/listing": () => ({ status: 500, json: { message: "boom" } }),
    "https://api.degreefyd.com/api/b2c/blogs/get-block-blogs": () => ({ status: 500, json: {} }),
  });

  const { view } = await mountListing();
  const { container } = view;

  assert.ok(textOf(container).includes("University list unavailable"), "error state renders");

  await view.unmount();

  installFetchStub(defaultRoutes({ listing: [] }));
  const emptyView = await mountListing(defaultRoutes({ listing: [] }));
  /* A failed/empty server listing surfaces the unavailable state... */
  assert.ok(textOf(emptyView.view.container).includes("University list unavailable"));
  /* ...and a search that matches nothing renders the no-results state.
   * The live API filters server-side, so the stub returns no records for
   * any request that carries ?search= but full pages otherwise. */
  const searchRoutes = orderedApiRoutes({
    "https://api.degreefyd.com/api/b2c/website/colleges/listing": ({ url }) => ({
      json: url.includes("search=")
        ? { data: { universities: [] } }
        : { data: { universities: catalogueRecords() } },
    }),
  });
  installFetchStub(searchRoutes);
  const searchView = await mountListing(searchRoutes);
  const searchInput = searchView.view.container.querySelector('input[placeholder*="Search" i], input[placeholder*="search" i]');
  assert.ok(searchInput, "search input renders");
  await changeValue(searchInput, "zzz-no-match");
  const searchButton = searchView.view.container.querySelector("button.uv-find-btn");
  if (searchButton) {
    await click(searchButton);
  } else {
    searchInput.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
  }
  for (let i = 0; i < 20 && !textOf(searchView.view.container).includes("No universities found"); i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(textOf(searchView.view.container).includes("No universities found"));

  await emptyView.view.unmount();
  await searchView.view.unmount();
});

test("malformed record fields never leak artifacts into the page", async () => {
  installFetchStub(defaultRoutes({
    listing: [LISTING_MALFORMED, LISTING_COMPLETE],
    onlineUniversities: null,
  }));

  const { view } = await mountListing(defaultRoutes({
    listing: [LISTING_MALFORMED, LISTING_COMPLETE],
  }));
  const { container } = view;

  const html = container.innerHTML;
  assert.ok(!/\[object Object\]/.test(html), "no [object Object]");
  assert.ok(!/NaN/.test(html), "no NaN");
  assert.ok(!/undefined/.test(html), "no undefined text nodes");
  assert.ok(textOf(container).includes("Malformed University Online"));

  await view.unmount();
});
