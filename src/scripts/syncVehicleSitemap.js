#!/usr/bin/env node
/**
 * Sync ALL SEO-active vehicles into static sitemaps under public/sitemaps/.
 *
 * - Paginates GET /homefeed/vehicles/seo (size=100) until every page is fetched
 * - Writes public/sitemaps/vehicles-1.xml … vehicles-N.xml
 * - Writes public/sitemaps/vehicles.xml (sitemap index)
 * - Points public/sitemap.xml vehicle entry at /sitemaps/vehicles.xml
 *
 * Usage: node src/scripts/syncVehicleSitemap.js
 *        npm run sync:vehicle-sitemap
 */
const fs = require("fs");
const path = require("path");

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

function generateSlug(vehicle) {
  const brand = (vehicle.makerName || vehicle.makeName || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const model = (vehicle.modelName || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const year = vehicle.yearOfMfg || vehicle.year || "";
  const city = (vehicle.cityName || vehicle.address?.city || "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const type = String(vehicle.vehicleType || vehicle.bodyType || "").toUpperCase();
  const kind =
    type.includes("TWO") || type === "BIKE" ? "two-wheelers" : "cars";

  return `buy-used-${brand}-${model}-${year}-${kind}-${city}`
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .replace(/^-/, "");
}

function collectImages(vehicle) {
  const images = [];
  if (vehicle.thumbnailUrl) images.push(vehicle.thumbnailUrl);
  if (Array.isArray(vehicle.imageUrls)) {
    vehicle.imageUrls.forEach((img) => {
      if (img && typeof img === "string" && !images.includes(img)) {
        images.push(img);
      }
    });
  }
  if (Array.isArray(vehicle.vehiclePhotos)) {
    vehicle.vehiclePhotos.forEach((img) => {
      const url = typeof img === "string" ? img : img?.url || img?.photoUrl;
      if (url && !images.includes(url)) images.push(url);
    });
  }
  if (Array.isArray(vehicle.vehicleImages)) {
    vehicle.vehicleImages.forEach((img) => {
      const url = typeof img === "string" ? img : img?.imageUrl || img?.url;
      if (url && !images.includes(url)) images.push(url);
    });
  }
  return images;
}

function vehicleLoc(vehicle) {
  return `${SITE_URL}/vehicle/details/${generateSlug(vehicle)}/${vehicle.id}`;
}

async function fetchSeoPage(pageNo, size) {
  const base = getApiBase();
  const url = `${base}/homefeed/vehicles/seo?pageNo=${pageNo}&size=${size}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`SEO vehicles fetch failed: ${res.status} ${url}`);
  }
  const json = await res.json();
  return {
    data: json?.data || [],
    pageResponse: json?.pageResponse || { totalElements: 0, totalPages: 0 },
  };
}

function buildUrlsetXml(vehicles, nowIso) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const vehicle of vehicles) {
    if (!vehicle?.id) continue;

    const loc = vehicleLoc(vehicle);
    const lastmod =
      vehicle.updatedAt || vehicle.createdAt || nowIso;
    const city = (vehicle.cityName || vehicle.address?.city || "")
      .split(",")[0]
      .trim();
    const fuel = String(vehicle.fuelType || "").replace(/_/g, " ");
    const title =
      `${vehicle.yearOfMfg || ""} ${vehicle.makerName || vehicle.makeName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim();
    const caption = [title, fuel, city ? `in ${city}` : "", "| Reecomm"]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;

    for (const imgUrl of collectImages(vehicle)) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(caption)}</image:caption>\n`;
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
    xml += `    <loc>${SITE_URL}/sitemaps/vehicles-${page}.xml</loc>\n`;
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
  const staticLoc = `${SITE_URL}/sitemaps/vehicles.xml`;

  // Replace dynamic API vehicles index with cron-synced static index
  root = root.replace(
    /https:\/\/www\.reecomm\.com\/api\/sitemap\/vehicles\.xml/g,
    staticLoc
  );
  // Also refresh if already pointing at static path (idempotent lastmod bump for that block)
  root = root.replace(
    new RegExp(
      `(<loc>${staticLoc.replace(/\./g, "\\.")}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`
    ),
    `$1${nowIso}$2`
  );

  // Comment clarity
  root = root.replace(
    /<!-- Vehicle Listings \(dynamic, paginated INDEX — all pages\) -->/,
    "<!-- Vehicle Listings (cron-synced static INDEX — all SEO-active pages) -->"
  );

  fs.writeFileSync(ROOT_SITEMAP, root, "utf8");
}

function removeStaleVehiclePages(keepPages) {
  if (!fs.existsSync(SITEMAPS_DIR)) return;
  const keep = new Set(
    Array.from({ length: keepPages }, (_, i) => `vehicles-${i + 1}.xml`)
  );
  for (const name of fs.readdirSync(SITEMAPS_DIR)) {
    if (/^vehicles-\d+\.xml$/.test(name) && !keep.has(name)) {
      fs.unlinkSync(path.join(SITEMAPS_DIR, name));
      console.log(`[syncVehicleSitemap] Removed stale ${name}`);
    }
  }
}

/**
 * @returns {Promise<{
 *   totalVehicles: number,
 *   pages: number,
 *   vehicleLocs: string[],
 *   pageFiles: string[],
 *   indexUrl: string,
 * }>}
 */
async function syncVehicleSitemap() {
  const nowIso = new Date().toISOString();
  console.log("[syncVehicleSitemap] Fetching SEO vehicles…");

  const first = await fetchSeoPage(1, PAGE_SIZE);
  const totalVehicles =
    first.pageResponse?.totalElements ?? (first.data || []).length;
  const totalPages = Math.max(1, Math.ceil(totalVehicles / PAGE_SIZE));

  const allVehicles = [...(first.data || [])];
  for (let page = 2; page <= totalPages; page++) {
    const { data } = await fetchSeoPage(page, PAGE_SIZE);
    allVehicles.push(...(data || []));
  }

  if (!fs.existsSync(SITEMAPS_DIR)) {
    fs.mkdirSync(SITEMAPS_DIR, { recursive: true });
  }

  removeStaleVehiclePages(totalPages);

  const pageFiles = [];
  const vehicleLocs = [];

  for (let page = 1; page <= totalPages; page++) {
    const slice = allVehicles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const fileName = `vehicles-${page}.xml`;
    const filePath = path.join(SITEMAPS_DIR, fileName);
    fs.writeFileSync(filePath, buildUrlsetXml(slice, nowIso), "utf8");
    pageFiles.push(`${SITE_URL}/sitemaps/${fileName}`);
    for (const v of slice) {
      if (v?.id) vehicleLocs.push(vehicleLoc(v));
    }
    console.log(
      `[syncVehicleSitemap] Wrote ${fileName} (${slice.length} vehicles)`
    );
  }

  const indexPath = path.join(SITEMAPS_DIR, "vehicles.xml");
  fs.writeFileSync(indexPath, buildIndexXml(totalPages, nowIso), "utf8");
  console.log(`[syncVehicleSitemap] Wrote vehicles.xml index (${totalPages} pages)`);

  updateRootSitemapPointer(nowIso);
  console.log(
    `[syncVehicleSitemap] Updated public/sitemap.xml → ${SITE_URL}/sitemaps/vehicles.xml`
  );

  const result = {
    totalVehicles: vehicleLocs.length,
    seoTotalElements: totalVehicles,
    pages: totalPages,
    vehicleLocs,
    pageFiles,
    indexUrl: `${SITE_URL}/sitemaps/vehicles.xml`,
    rootSitemapUrl: `${SITE_URL}/sitemap.xml`,
  };

  console.log(
    `[syncVehicleSitemap] Done: ${result.totalVehicles} vehicle URLs across ${result.pages} page(s)`
  );
  return result;
}

module.exports = {
  syncVehicleSitemap,
  vehicleLoc,
  PAGE_SIZE,
};

if (require.main === module) {
  syncVehicleSitemap().catch((err) => {
    console.error("[syncVehicleSitemap] Failed:", err);
    process.exit(1);
  });
}
