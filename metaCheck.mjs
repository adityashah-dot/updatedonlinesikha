import { injectMetaHtml } from "./src/server/blogSsr.js";
import { readFileSync } from "node:fs";
const template = readFileSync("index.html", "utf8");
const html = injectMetaHtml(template, { title: "new", description: "DSK", canonical: "http://x/", ogType: "article", robots: "noindex, nofollow" });
const m = html.match(/<meta[^>]*name="description"[^>]*>/g);
console.log("description meta tags:");
if (m) m.forEach(x => console.log("  " + x));
else console.log("(none)");
