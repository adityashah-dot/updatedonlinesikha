import "dotenv/config";

const base = process.env.VITE_API_URL || "https://api.degreefyd.com/api/b2c";
const token = process.env.VITE_API_TOKEN;
const headers = { Accept: "application/json", Authorization: `Bearer ${token}` };

const url = `${base}/website/colleges/listing?isCollgesNamesRequired=true&isCollgesLocationsRequired=true&mode=online&limit=6`;
const res = await fetch(url, { headers });
const json = await res.json();

const items = Array.isArray(json?.data) ? json.data : Array.isArray(json?.data?.data) ? json.data.data : Array.isArray(json) ? json : [];
console.log("records:", items.length);
items.forEach((r, i) => {
  console.log(`\n#${i} ${r.collegeName || r.name}`);
  console.log("  collegeLogo:", JSON.stringify(r.collegeLogo).slice(0, 140));
  console.log("  collegeImage:", JSON.stringify(r.collegeImage).slice(0, 140));
  console.log("  collegeMode:", r.collegeMode, "| slug:", r.slug, "| highest:", r.highestPackage, "| placementHighest:", r.placementHighest, "| coursesCount:", r.coursesCount);
});
