export const SECTION_ORDER = ["overview", "courses", "admission", "scholarships"];

const SECTION_LABELS = {
  overview: "Overview",
  courses: "Courses",
  admission: "Admission",
  scholarships: "Scholarships",
};

const SECTION_ICONS = {
  overview: "grid_view",
  courses: "menu_book",
  admission: "how_to_reg",
  scholarships: "workspace_premium",
};

export function classifySection(value) {
  const text = String(value || "").toLowerCase();

  if (!text) return "overview";
  if (text.includes("course")) return "courses";
  if (text.includes("admission")) return "admission";
  if (text.includes("scholar")) return "scholarships";

  return "page";
}

export function pageSectionOf(payload) {
  const key = payload?.shortTitle || payload?.navbarTitle || "";

  return classifySection(key);
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

export function buildCollegeNavigation({
  entries = [],
  navBase = "",
  basePath = "/universities",
} = {}) {
  const base = String(navBase || "").trim();
  const tabs = [];
  const seen = new Set();
  const entryList = Array.isArray(entries) ? entries : [];

  entryList.forEach((entry) => {
    const slug = String(entry?.slug || "").trim();
    const title = String(entry?.navbarTitle || entry?.title || "").trim();

    if (!slug) return;

    const isBase = normalize(slug) === normalize(base);
    const isSub = Boolean(base) && slug.startsWith(`${base}/`);
    const section = isBase ? "overview" : classifySection(title || slug);
    const key = section === "page" ? `page:${normalize(slug)}` : section;

    if (seen.has(key)) return;

    seen.add(key);

    tabs.push({
      id: slug,
      title,
      label: SECTION_LABELS[section] || title,
      icon: SECTION_ICONS[section] || "article",
      href: `${basePath}/${slug}`,
      section,
      kind: isBase ? "base" : isSub ? "sub" : "page",
      sub: isSub ? slug.slice(base.length + 1) : "",
      order: entry?.order ?? 0,
    });
  });

  if (base && !tabs.some((tab) => tab.kind === "base")) {
    tabs.unshift({
      id: base,
      title: "Overview",
      label: SECTION_LABELS.overview,
      icon: SECTION_ICONS.overview,
      href: `${basePath}/${base}`,
      section: "overview",
      kind: "base",
      sub: "",
      order: 0,
    });
  }

  const ordered = [...tabs].sort((a, b) => {
    const rank = (tab) => {
      const index = SECTION_ORDER.indexOf(tab.section);

      return index === -1 ? SECTION_ORDER.length : index;
    };

    return rank(a) - rank(b);
  });

  return { tabs: ordered, navBase: base };
}

export function resolveNavTarget({
  requestedPath = "",
  navBase = "",
  entries = [],
} = {}) {
  const path = String(requestedPath || "").trim();

  if (!path) return null;

  const published = (Array.isArray(entries) ? entries : []).find(
    (entry) => normalize(entry?.slug) === normalize(path)
  );

  if (published) {
    const slug = String(published.slug).trim();

    if (normalize(slug) === normalize(navBase)) {
      return { kind: "base", slug, sub: "" };
    }

    if (navBase && slug.startsWith(`${navBase}/`)) {
      return { kind: "sub", slug, sub: slug.slice(navBase.length + 1) };
    }

    return { kind: "page", slug, sub: "" };
  }

  if (normalize(path) === normalize(navBase)) {
    return { kind: "base", slug: navBase, sub: "" };
  }

  if (!path.includes("/")) {
    return { kind: "base", slug: path, sub: "" };
  }

  return null;
}
