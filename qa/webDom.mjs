/**
 * DOM test harness for the university template tests.
 *
 * Boots a Vite dev server in middleware mode (JSX transpile + their own dev
 * pipeline), registers happy-dom as the DOM and mounts components through
 * react-dom/client so interactions (click / keyboard) can be driven.
 *
 * External APIs are stubbed by overriding globalThis.fetch BEFORE any
 * service module is loaded — see `installFetchStub`.
 */

import { Window } from "happy-dom";

export function installDom() {
  const window = new Window({ url: "http://localhost:3000/" });
  const {
    document,
    Event,
    KeyboardEvent,
    MouseEvent,
    CustomEvent,
    HTMLElement,
  } = window;

  globalThis.window = window;
  globalThis.document = document;
  globalThis.Event = Event;
  globalThis.KeyboardEvent = KeyboardEvent;
  globalThis.MouseEvent = MouseEvent;
  globalThis.CustomEvent = CustomEvent;
  globalThis.HTMLElement = HTMLElement;
  globalThis.Element = window.Element;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  /* happy-dom has no native IntersectionObserver; match the app's fallback
     behavior by allowing observed nodes to remain non-intersecting. */
  if (!("IntersectionObserver" in window)) {
    window.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  globalThis.IntersectionObserver = window.IntersectionObserver;

  /* Vite dev client shims referenced by component modules. */
  globalThis.matchMedia = window.matchMedia?.bind(window) ??
    ((query) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));

  if (typeof window.requestAnimationFrame !== "function") {
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
    window.cancelAnimationFrame = (id) => clearTimeout(id);
  }

  return window;
}

/**
 * fetch stub with an URL-handler map. Handlers receive the Request and
 * respond with { status, json } payloads; unmatched requests fail loudly.
 */
export function installFetchStub(routes) {
  const calls = [];

  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input.url;

    const entry = Object.entries(routes).find(([prefix]) => url.startsWith(prefix));

    calls.push({ url, matched: Boolean(entry) });

    if (!entry) {
      throw new Error(`fetch stub: unexpected request ${url}`);
    }

    const [, handler] = entry;
    const { status = 200, json = null, text = null } = handler({ url, init, input });

    return new Response(text !== null ? text : JSON.stringify(json), {
      status,
      headers: { "content-type": "application/json" },
    });
  };

  return { calls, routes };
}

export async function bootVite() {
  const { createServer } = await import("vite");

  const server = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
    logLevel: "error",
  });

  return server;
}

const { createRoot } = await import("react-dom/client");
const { act } = await import("react");

/** Mount `element` into a fresh div attached to document.body. */
export async function mountElement(element, { router } = {}) {
  const React = await import("react");
  const { MemoryRouter } = await import("react-router-dom");
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  await act(async () => {
    root.render(
      router
        ? React.createElement(MemoryRouter, null, element)
        : element
    );
  });

  return {
    container,
    async unmount() {
      await act(async () => { root.unmount(); });
      container.remove();
    },
  };
}

export function click(node) {
  return act(async () => {
    node.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });
}

export function keydown(node, key) {
  return act(async () => {
    node.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  });
}

/**
 * happy-dom + React 19 refuse to fire text-input onChange from synthetic
 * input/change events (selects and clicks work). Drive the wired React
 * handler directly, then still dispatch the DOM events for non-React listeners.
 */
export async function changeValue(node, value) {
  await act(async () => {
    const protoDesc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(node), "value");
    if (protoDesc?.set) protoDesc.set.call(node, value);
    else node.value = value;

    const propsKey = Object.keys(node).find((key) => key.startsWith("__reactProps$"));
    if (propsKey && typeof node[propsKey]?.onChange === "function") {
      node[propsKey].onChange({
        target: node,
        currentTarget: node,
        bubbles: true,
        cancelable: true,
        nativeEvent: null,
        preventDefault() {},
        stopPropagation() {},
      });
    }

    node.dispatchEvent(new window.Event("input", { bubbles: true, cancelable: true }));
    node.dispatchEvent(new window.Event("change", { bubbles: true, cancelable: true }));
  });
}

export function q(root, selector) {
  return root.querySelector(selector);
}

export function qa(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

export function textOf(node) {
  return node ? node.textContent.trim() : "";
}
