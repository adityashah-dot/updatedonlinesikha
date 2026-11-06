import { buildBlogDetail } from "./src/server/blogSsr.js";
const html = await buildBlogDetail("http://localhost:3001", "how-to-choose-online-university-india");
console.log("length:", html.length);
console.log("has canonical:", html.includes("<link rel=\"canonical\""));
console.log("has robots:", html.includes("<meta name=\"robots\""));
console.log("has og:image:", html.includes("og:image\""));
console.log("head snippet:");
const i = html.indexOf("</head>");
console.log(html.slice(Math.max(0, i - 800), i + 20));
