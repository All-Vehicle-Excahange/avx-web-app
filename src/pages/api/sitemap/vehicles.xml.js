import { getSeoVehicleCount } from "@/services/seo.service";

const BASE_URL = "https://www.reecomm.com";
const VEHICLES_PER_SITEMAP = 100;

/**
 * Dynamic vehicle sitemap INDEX.
 *
 * Returns a <sitemapindex> listing paginated vehicle sitemaps:
 *   /api/sitemap/vehicles/1.xml
 *   /api/sitemap/vehicles/2.xml
 *   ...
 *
 * Referenced from the main public/sitemap.xml as one entry.
 */
export default async function handler(req, res) {
  try {
    const totalVehicles = await getSeoVehicleCount();
    const totalPages = Math.max(1, Math.ceil(totalVehicles / VEHICLES_PER_SITEMAP));
    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (let page = 1; page <= totalPages; page++) {
      xml += `  <sitemap>\n`;
      xml += `    <loc>${BASE_URL}/api/sitemap/vehicles/${page}.xml</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `  </sitemap>\n`;
    }

    xml += `</sitemapindex>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=600"
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error("[sitemap/vehicles.xml] Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
}
