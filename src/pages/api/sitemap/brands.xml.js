import { MAKER_NAME_MAPPING } from "@/data/makers";
import { getSeoVehicles, getSeoVehicleCount } from "@/services/seo.service";

/**
 * Dedicated brand sitemap for Google crawl:
 *   /search/buy-used-hyundai-cars
 *   /search/buy-used-hyundai-cars-palanpur  (only when inventory exists)
 *
 * URL: /api/sitemap/brands.xml
 */

const BASE_URL = "https://www.reecomm.com";

const VOLUME_BRAND_SLUGS = new Set([
  "hyundai",
  "maruti-suzuki",
  "tata",
  "mahindra",
  "honda",
  "toyota",
  "kia",
  "ford",
  "renault",
  "volkswagen",
  "skoda",
  "mg",
  "nissan",
  "jeep",
]);

const TWO_WHEELER_BRANDS = [
  "hero",
  "tvs",
  "bajaj",
  "royal-enfield",
  "yamaha",
  "ola",
  "honda",
  "suzuki",
  "ktm",
  "ather",
];

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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

export default async function handler(req, res) {
  try {
    const now = new Date().toISOString();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const added = new Set();
    function addUrl(locPath, priority = 0.8, changefreq = "daily") {
      if (!locPath || added.has(locPath)) return;
      added.add(locPath);
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${escapeXml(locPath)}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    const carBrands = Object.values(MAKER_NAME_MAPPING).map((b) => slugify(b));
    const volumeBrands = carBrands.filter((s) => VOLUME_BRAND_SLUGS.has(s));

    // National brand hubs (always) — "Used Hyundai Cars"
    volumeBrands.forEach((b) => {
      addUrl(`/search/buy-used-${b}-cars`, 0.9, "daily");
    });
    TWO_WHEELER_BRANDS.forEach((b) => {
      addUrl(`/search/buy-used-${b}-two-wheelers`, 0.85, "daily");
    });

    // Inventory-backed brand × city / state (avoid empty thin GEO pages)
    const liveBrandCity = new Set();
    const liveBrandState = new Set();
    const liveBrands = new Set();

    try {
      const total = await getSeoVehicleCount();
      const pageSize = 100;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      for (let page = 1; page <= totalPages && page <= 200; page++) {
        const { data: vehicles } = await getSeoVehicles(page, pageSize);
        for (const vehicle of vehicles || []) {
          const brandSlug = slugify(vehicle.makerName);
          if (!brandSlug) continue;
          const citySlug = slugify(
            String(vehicle.cityName || vehicle.address?.city || "").split(",")[0]
          );
          const stateSlug = slugify(
            vehicle.stateName || vehicle.address?.state || ""
          );
          const kind = String(vehicle.vehicleType || "")
            .toUpperCase()
            .includes("TWO")
            ? "two-wheelers"
            : "cars";

          liveBrands.add(`${brandSlug}|${kind}`);
          addUrl(`/search/buy-used-${brandSlug}-${kind}`, 0.9, "daily");
          if (citySlug) {
            const key = `${brandSlug}|${kind}|${citySlug}`;
            if (!liveBrandCity.has(key)) {
              liveBrandCity.add(key);
              addUrl(
                `/search/buy-used-${brandSlug}-${kind}-${citySlug}`,
                0.85,
                "daily"
              );
            }
          }
          if (stateSlug) {
            const key = `${brandSlug}|${kind}|${stateSlug}`;
            if (!liveBrandState.has(key)) {
              liveBrandState.add(key);
              addUrl(
                `/search/buy-used-${brandSlug}-${kind}-${stateSlug}`,
                0.7,
                "weekly"
              );
            }
          }
        }
      }
    } catch (err) {
      console.warn("[brands.xml] inventory inject failed:", err.message);
    }

    // Boost any live brand not already in volume list
    liveBrands.forEach((entry) => {
      const [brand, kind] = entry.split("|");
      addUrl(`/search/buy-used-${brand}-${kind}`, 0.9, "daily");
    });

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=600"
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error("[sitemap/brands.xml] Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
