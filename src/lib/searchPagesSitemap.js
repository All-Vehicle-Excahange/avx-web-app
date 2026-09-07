import fs from "fs";
import path from "path";

export const BASE_URL = "https://www.reecomm.com";
export const URLS_PER_SITEMAP = 4500;

/**
 * Resolve /search/{slug} path from a search_index vehicle_filter item.
 */
export function searchPathFromIndexItem(item) {
  if (!item || item.type !== "vehicle_filter") return null;
  if (item.params?.slug) {
    return `/search/${item.params.slug}`;
  }
  if (typeof item.id === "string" && item.id.startsWith("filter_")) {
    const slug = item.id.slice("filter_".length).replace(/_/g, "-");
    if (slug.startsWith("buy-used-") || slug.includes("cars") || slug.includes("two-wheelers")) {
      return `/search/${slug}`;
    }
  }
  if (item.link && String(item.link).includes("/search/")) {
    try {
      const p = String(item.link).startsWith("http")
        ? new URL(item.link).pathname
        : item.link;
      return p.startsWith("/search/") ? p : null;
    } catch {
      return null;
    }
  }
  return null;
}

function loadSitemapAllowlist() {
  try {
    const allowPath = path.join(process.cwd(), "public", "seo_sitemap_slugs.json");
    if (!fs.existsSync(allowPath)) return null;
    const data = JSON.parse(fs.readFileSync(allowPath, "utf8"));
    const slugs = Array.isArray(data) ? data : data?.slugs;
    if (!Array.isArray(slugs) || slugs.length < 50) return null;
    return new Set(slugs);
  } catch {
    return null;
  }
}

/**
 * Search landing URLs for sitemap shards.
 * When seo_sitemap_slugs.json exists, only allowlisted slugs are emitted
 * (hubs + inventory + focus GEO) — skips empty exotic brand×state doorway URLs.
 */
export function loadSearchPageUrls() {
  try {
    const indexPath = path.join(process.cwd(), "public", "search_index.json");
    if (!fs.existsSync(indexPath)) return [];
    const items = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    if (!Array.isArray(items)) return [];

    const allow = loadSitemapAllowlist();
    const urls = [];
    const seen = new Set();
    for (const item of items) {
      const locPath = searchPathFromIndexItem(item);
      if (!locPath || seen.has(locPath)) continue;
      if (allow) {
        const slug = locPath.replace(/^\/search\//, "");
        if (!allow.has(slug)) continue;
      }
      seen.add(locPath);
      urls.push(locPath);
    }
    return urls;
  } catch (e) {
    console.warn("[sitemap/search-pages] load failed:", e.message);
    return [];
  }
}
