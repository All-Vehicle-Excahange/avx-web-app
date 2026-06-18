import { getSeoVehicles } from "@/services/seo.service";

const BASE_URL = "https://www.reecomm.com";
const VEHICLES_PER_PAGE = 100;

/**
 * Generate SEO-friendly slug from vehicle data.
 * Mirrors the generateVehicleSlug() from @/lib/helper.js — but runs server-side
 * without any client-side imports.
 */
function generateSlug(vehicle) {
  const brand = (vehicle.makerName || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const model = (vehicle.modelName || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const year = vehicle.yearOfMfg || "";
  const city = (vehicle.cityName || vehicle.address?.city || "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return `buy-used-${brand}-${model}-${year}-cars-${city}`
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .replace(/^-/, "");
}

/**
 * Dynamic vehicle sitemap PAGE.
 *
 * URL: /api/sitemap/vehicles/[page] (handles /api/sitemap/vehicles/[page].xml as well)
 *
 * Returns a <urlset> with up to 100 vehicle URLs for the given page number.
 * Each URL matches the existing detail page route: /vehicle/details/{slug}/{id}
 */
export default async function handler(req, res) {
  try {
    // Extract page number from URL: "1.xml" or "1" → 1
    const rawPage = req.query.page;
    const page = parseInt(String(rawPage).replace(".xml", ""), 10);

    if (isNaN(page) || page < 1) {
      res.status(400).send("Invalid page number");
      return;
    }

    const result = await getSeoVehicles(page, VEHICLES_PER_PAGE);
    const vehicles = result.data || [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const vehicle of vehicles) {
      if (!vehicle.id) continue;

      const slug = generateSlug(vehicle);
      const loc = `${BASE_URL}/vehicle/details/${slug}/${vehicle.id}`;
      const lastmod = vehicle.updatedAt || vehicle.createdAt || new Date().toISOString();

      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;

      // Add image tag if thumbnailUrl exists (helps Google Images indexing)
      if (vehicle.thumbnailUrl) {
        const title = `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim();
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(vehicle.thumbnailUrl)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(title)}</image:title>\n`;
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=600"
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error(`[sitemap/vehicles/${req.query.page}] Error:`, error.message);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Escape special XML characters to prevent malformed XML.
 */
function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
