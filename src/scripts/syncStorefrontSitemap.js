#!/usr/bin/env node
/**
 * Sync ALL SEO-active consultants/storefronts into static sitemaps under public/sitemaps/.
 *
 * - Paginates GET /homefeed/consultations/seo (size=100)
 * - Writes public/sitemaps/storefronts-1.xml … storefronts-N.xml
 * - Writes public/sitemaps/storefronts.xml (sitemap index)
 * - Points public/sitemap.xml storefront entry at /sitemaps/storefronts.xml
 *
 * Usage: node src/scripts/syncStorefrontSitemap.js
 *        npm run sync:storefront-sitemap
 */
const fs = require("fs");
const path = require("path");
const { getCdnImageUrl } = require("../lib/cdnImage.cjs");

const SITE_URL = "https://www.reecomm.com";
const PAGE_SIZE = 100;
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SITEMAPS_DIR = path.join(PUBLIC_DIR, "sitemaps");
const ROOT_SITEMAP = path.join(PUBLIC_DIR, "sitemap.xml");

function getApiBase() {
  const envUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "";
  const clean = String(envUrl || "").replace(/\/$/, "");
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean.endsWith("/api/v1/website")
      ? clean
      : `${clean}/api/v1/website`;
  }
  return "https://api.reecomm.online/api/v1/website";
}

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function storefrontLoc(store) {
  const username = store.username || store.userName || store.slug;
  return `${SITE_URL}/auto-consultant/${username}`;
}

async function fetchSeoPage(pageNo, size) {
  const base = getApiBase();
  let url = `${base}/homefeed/consultations/seo?pageNo=${pageNo}&size=${size}`;
  let res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok && pageNo === 1) {
    url = `${base}/homefeed/consultations/seo/unsynced?pageNo=${pageNo}&size=${size}`;
    res = await fetch(url, { headers: { Accept: "application/json" } });
  }
  if (!res.ok) {
    throw new Error(`SEO consultations fetch failed: ${res.status} ${url}`);
  }
  const json = await res.json();
  return {
    data: json?.data || json?.content || [],
    pageResponse: json?.pageResponse || { totalElements: 0, totalPages: 0 },
  };
}

function buildUrlsetXml(stores, nowIso) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const store of stores) {
    const username = store?.username || store?.userName || store?.slug;
    if (!username) continue;

    const loc = storefrontLoc(store);
    const lastmod = store.updatedAt || store.createdAt || nowIso;
    const name =
      store.consultationName ||
      store.name ||
      store.storeName ||
      username;

    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;

    const logo = store.logoUrl || store.profileImageUrl || store.imageUrl;
    if (logo) {
      const logoCdn = getCdnImageUrl(logo, { preset: "thumb" }) || logo;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(logoCdn)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(name)}</image:title>\n`;
      xml += `    </image:image>\n`;
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function buildIndexXml(pageCount, nowIso) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (let page = 1; page <= pageCount; page++) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${SITE_URL}/sitemaps/storefronts-${page}.xml</loc>\n`;
    xml += `    <lastmod>${nowIso}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }
  xml += `</sitemapindex>\n`;
  return xml;
}

function updateRootSitemapPointer(nowIso) {
  if (!fs.existsSync(ROOT_SITEMAP)) {
    throw new Error(`Missing root sitemap: ${ROOT_SITEMAP}`);
  }
  let root = fs.readFileSync(ROOT_SITEMAP, "utf8");
  const staticLoc = `${SITE_URL}/sitemaps/storefronts.xml`;

  root = root.replace(
    /https:\/\/www\.reecomm\.com\/api\/sitemap\/storefronts\.xml/g,
    staticLoc
  );
  root = root.replace(
    new RegExp(
      `(<loc>${staticLoc.replace(/\./g, "\\.")}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`
    ),
    `$1${nowIso}$2`
  );
  root = root.replace(
    /<!-- Storefront Listings \(dynamic, paginated INDEX — all consultants\) -->/,
    "<!-- Storefront Listings (cron-synced static INDEX — all consultants) -->"
  );

  // Refresh lastmod on related dynamic GEO / brand / model / search sitemaps
  for (const apiPath of [
    "geo-brands.xml",
    "brands.xml",
    "models.xml",
    "search-pages.xml",
  ]) {
    const loc = `${SITE_URL}/api/sitemap/${apiPath}`;
    root = root.replace(
      new RegExp(
        `(<loc>${loc.replace(/\./g, "\\.")}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`
      ),
      `$1${nowIso}$2`
    );
  }

  fs.writeFileSync(ROOT_SITEMAP, root, "utf8");
}

function removeStaleStorefrontPages(keepPages) {
  if (!fs.existsSync(SITEMAPS_DIR)) return;
  const keep = new Set(
    Array.from({ length: keepPages }, (_, i) => `storefronts-${i + 1}.xml`)
  );
  for (const name of fs.readdirSync(SITEMAPS_DIR)) {
    if (/^storefronts-\d+\.xml$/.test(name) && !keep.has(name)) {
      fs.unlinkSync(path.join(SITEMAPS_DIR, name));
      console.log(`[syncStorefrontSitemap] Removed stale ${name}`);
    }
  }
}

/**
 * @returns {Promise<{
 *   totalStorefronts: number,
 *   pages: number,
 *   storefrontLocs: string[],
 *   pageFiles: string[],
 *   indexUrl: string,
 * }>}
 */
async function syncStorefrontSitemap() {
  const nowIso = new Date().toISOString();
  console.log("[syncStorefrontSitemap] Fetching SEO consultations…");

  const first = await fetchSeoPage(1, PAGE_SIZE);
  const totalFromApi =
    first.pageResponse?.totalElements ?? (first.data || []).length;
  const totalPagesHint = first.pageResponse?.totalPages;
  let totalPages = Math.max(
    1,
    totalPagesHint || Math.ceil(totalFromApi / PAGE_SIZE) || 1
  );

  const allStores = [...(first.data || [])];
  for (let page = 2; page <= totalPages; page++) {
    const { data, pageResponse } = await fetchSeoPage(page, PAGE_SIZE);
    allStores.push(...(data || []));
    if (pageResponse?.totalPages) {
      totalPages = Math.max(totalPages, pageResponse.totalPages);
    }
    if (!data?.length) break;
  }

  // Deduplicate by username
  const byUser = new Map();
  for (const store of allStores) {
    const username = store?.username || store?.userName || store?.slug;
    if (!username) continue;
    byUser.set(String(username).toLowerCase(), store);
  }
  const uniqueStores = Array.from(byUser.values());
  totalPages = Math.max(1, Math.ceil(uniqueStores.length / PAGE_SIZE));

  if (!fs.existsSync(SITEMAPS_DIR)) {
    fs.mkdirSync(SITEMAPS_DIR, { recursive: true });
  }

  removeStaleStorefrontPages(totalPages);

  const pageFiles = [];
  const storefrontLocs = [];

  for (let page = 1; page <= totalPages; page++) {
    const slice = uniqueStores.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const fileName = `storefronts-${page}.xml`;
    const filePath = path.join(SITEMAPS_DIR, fileName);
    fs.writeFileSync(filePath, buildUrlsetXml(slice, nowIso), "utf8");
    pageFiles.push(`${SITE_URL}/sitemaps/${fileName}`);
    for (const s of slice) {
      storefrontLocs.push(storefrontLoc(s));
    }
    console.log(
      `[syncStorefrontSitemap] Wrote ${fileName} (${slice.length} storefronts)`
    );
  }

  const indexPath = path.join(SITEMAPS_DIR, "storefronts.xml");
  fs.writeFileSync(indexPath, buildIndexXml(totalPages, nowIso), "utf8");
  console.log(
    `[syncStorefrontSitemap] Wrote storefronts.xml index (${totalPages} pages)`
  );

  updateRootSitemapPointer(nowIso);
  console.log(
    `[syncStorefrontSitemap] Updated public/sitemap.xml → ${SITE_URL}/sitemaps/storefronts.xml`
  );

  const result = {
    totalStorefronts: storefrontLocs.length,
    seoTotalElements: totalFromApi,
    pages: totalPages,
    storefrontLocs,
    pageFiles,
    indexUrl: `${SITE_URL}/sitemaps/storefronts.xml`,
    rootSitemapUrl: `${SITE_URL}/sitemap.xml`,
  };

  console.log(
    `[syncStorefrontSitemap] Done: ${result.totalStorefronts} storefront URLs across ${result.pages} page(s)`
  );
  return result;
}

module.exports = {
  syncStorefrontSitemap,
  storefrontLoc,
  PAGE_SIZE,
};

if (require.main === module) {
  syncStorefrontSitemap().catch((err) => {
    console.error("[syncStorefrontSitemap] Failed:", err);
    process.exit(1);
  });
}
