import { getSeoVehicles, getSeoVehicleCount } from "@/services/seo.service";

/**
 * Dedicated model sitemap for Google crawl:
 *   /search/buy-used-hyundai-creta-cars
 *   /search/buy-used-hyundai-creta-cars-palanpur  (only when inventory exists)
 *
 * URL: /api/sitemap/models.xml
 */

const BASE_URL = "https://www.reecomm.com";

/** Curated high-intent models (national hubs always included). */
const POPULAR_CAR_MODELS = [
  { brand: "hyundai", model: "grand-i10" },
  { brand: "hyundai", model: "creta" },
  { brand: "hyundai", model: "i20" },
  { brand: "hyundai", model: "verna" },
  { brand: "hyundai", model: "santro-xing" },
  { brand: "maruti-suzuki", model: "swift" },
  { brand: "maruti-suzuki", model: "baleno" },
  { brand: "maruti-suzuki", model: "wagon-r" },
  { brand: "maruti-suzuki", model: "brezza" },
  { brand: "maruti-suzuki", model: "ertiga" },
  { brand: "maruti-suzuki", model: "vitara-brezza" },
  { brand: "maruti-suzuki", model: "swift-dzire" },
  { brand: "mahindra", model: "thar" },
  { brand: "mahindra", model: "xuv700" },
  { brand: "mahindra", model: "scorpio" },
  { brand: "tata", model: "nexon" },
  { brand: "tata", model: "punch" },
  { brand: "tata", model: "harrier" },
  { brand: "toyota", model: "fortuner" },
  { brand: "toyota", model: "innova" },
  { brand: "ford", model: "ecosport" },
  { brand: "honda", model: "city" },
  { brand: "honda", model: "amaze" },
  { brand: "kia", model: "seltos" },
  { brand: "kia", model: "sonet" },
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

    // Curated national model hubs — "Used Hyundai Creta"
    POPULAR_CAR_MODELS.forEach(({ brand, model }) => {
      addUrl(`/search/buy-used-${brand}-${model}-cars`, 0.9, "daily");
    });

    // Live inventory: every brand+model (+ city/state when stock exists)
    try {
      const total = await getSeoVehicleCount();
      const pageSize = 100;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      for (let page = 1; page <= totalPages && page <= 200; page++) {
        const { data: vehicles } = await getSeoVehicles(page, pageSize);
        for (const vehicle of vehicles || []) {
          const brandSlug = slugify(vehicle.makerName);
          const modelSlug = slugify(vehicle.modelName);
          if (!brandSlug || !modelSlug) continue;

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

          addUrl(
            `/search/buy-used-${brandSlug}-${modelSlug}-${kind}`,
            0.9,
            "daily"
          );
          if (citySlug) {
            addUrl(
              `/search/buy-used-${brandSlug}-${modelSlug}-${kind}-${citySlug}`,
              0.85,
              "daily"
            );
          }
          if (stateSlug) {
            addUrl(
              `/search/buy-used-${brandSlug}-${modelSlug}-${kind}-${stateSlug}`,
              0.7,
              "weekly"
            );
          }
        }
      }
    } catch (err) {
      console.warn("[models.xml] inventory inject failed:", err.message);
    }

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=600"
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error("[sitemap/models.xml] Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
