import { buildBlogDetail } from "./src/server/blogSsr.js";
const html = await buildBlogDetail("http://localhost:3001", "how-to-choose-online-university-india");
console.log(html ? html : "(null returned)");
