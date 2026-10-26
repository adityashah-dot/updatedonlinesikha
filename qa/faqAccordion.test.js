import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { installDom, installFetchStub, bootVite, mountElement, click, keydown, qa, textOf } from "./webDom.mjs";
import { UNIVERSITIES_LISTING_FAQS } from "../src/data/universityListingFaqs.js";

let vite;

before(async () => {
  installDom();
  installFetchStub({});
  vite = await bootVite();
});

after(async () => {
  await vite.close();
});

async function mountAccordion(props) {
  const mod = await vite.ssrLoadModule("/src/components/FaqAccordion.jsx");
  return mountElement(React.createElement(mod.FaqAccordion, props));
}

test("renders every configured listing FAQ question", async () => {
  const view = await mountAccordion({ items: UNIVERSITIES_LISTING_FAQS, variant: "card" });
  const buttons = qa(view.container, 'button[id*="-faq-question-"]');

  assert.equal(buttons.length, UNIVERSITIES_LISTING_FAQS.length);
  assert.equal(textOf(buttons[0]), UNIVERSITIES_LISTING_FAQS[0].question);

  const panels = qa(view.container, '[role="region"]');
  assert.equal(panels.length, 1, "single-open accordion: only the default item is expanded");
  assert.ok(
    textOf(panels[0]).includes("Learning Management System"),
    "default answer text renders (first FAQ answer)"
  );

  await view.unmount();
});

test("clicking a question expands it; clicking again collapses it", async () => {
  const view = await mountAccordion({ items: UNIVERSITIES_LISTING_FAQS, variant: "card" });
  const buttons = qa(view.container, 'button[id*="-faq-question-"]');

  assert.equal(buttons[1].getAttribute("aria-expanded"), "false");
  await click(buttons[1]);
  assert.equal(buttons[1].getAttribute("aria-expanded"), "true");
  assert.equal(buttons[0].getAttribute("aria-expanded"), "false", "previous item collapsed (single-open)");

  const secondPanel = view.container.querySelector(`#${(buttons[1].getAttribute("aria-controls") || "").replace(/"/g, '\\"')}`);
  assert.ok(secondPanel, "aria-controls points at the open panel");

  await click(buttons[1]);
  assert.equal(buttons[1].getAttribute("aria-expanded"), "false", "clicking the open item collapses it");
  assert.equal(qa(view.container, '[role="region"]').length, 0);

  await view.unmount();
});

test("keyboard: ArrowDown / ArrowUp move focus between question buttons", async () => {
  const view = await mountAccordion({ items: UNIVERSITIES_LISTING_FAQS, variant: "card" });
  const buttons = qa(view.container, 'button[id*="-faq-question-"]');

  buttons[0].focus();
  await keydown(buttons[0], "ArrowDown");
  assert.equal(document.activeElement, buttons[1], "ArrowDown moves focus to the next question");

  await keydown(buttons[1], "ArrowUp");
  assert.equal(document.activeElement, buttons[0], "ArrowUp moves focus back");

  await keydown(buttons[0], "ArrowUp");
  assert.equal(document.activeElement, buttons[buttons.length - 1], "focus wraps around to the last question");

  await view.unmount();
});

test("empty and malformed item lists render nothing instead of crashing", async () => {
  for (const items of [[], null, undefined, "text", [{ question: "  " }], [{ question: "Q", answer: "A" }]]) {
    const view = await mountAccordion({ items, variant: "card" });

    const valid = (Array.isArray(items) ? items : []).some(
      (item) => item && typeof item.question === "string" && item.question.trim()
    );
    assert.equal(view.container.children.length, valid ? 1 : 0);
    if (valid) assert.ok(view.container.textContent.includes("Q"));

    await view.unmount();
  }
});

test("answer slots can render links (verified official portals)", async () => {
  const view = await mountAccordion({
    items: UNIVERSITIES_LISTING_FAQS,
    variant: "card",
    defaultOpenIndex: 5,
    renderAnswer: (item) =>
      React.createElement(
        React.Fragment,
        null,
        item.answer,
        item.officialUrl
          ? React.createElement("a", { href: item.officialUrl, target: "_blank", rel: "noreferrer" }, item.officialLinkLabel)
          : null
      ),
  });

  const panel = qa(view.container, '[role="region"]')[0];
  const links = qa(panel, "a");
  assert.equal(links.length, 1);
  assert.equal(links[0].getAttribute("href"), "https://deb.ugc.ac.in");
  assert.equal(links[0].getAttribute("rel"), "noreferrer");
  assert.ok(textOf(links[0]).includes("deb.ugc.ac.in"));

  await view.unmount();
});

test("FAQ data file has no fabricated uniform-rule claims", () => {
  assert.equal(UNIVERSITIES_LISTING_FAQS.length, 10);
  UNIVERSITIES_LISTING_FAQS.forEach((item) => {
    assert.ok(item.id && item.question && item.answer);
    assert.ok(!/all universities offer/i.test(item.answer), "no uniform-rules claim");
  });

  for (const link of UNIVERSITIES_LISTING_FAQS.filter((item) => item.officialUrl)) {
    assert.ok(
      /^https:\/\/(deb\.ugc\.ac\.in|www\.ugc\.gov\.in)/.test(link.officialUrl),
      "links only point at official portals"
    );
  }
});
