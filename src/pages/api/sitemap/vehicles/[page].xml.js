import { getSeoVehicles } from "@/services/seo.service";

const BASE_URL = "https://www.reecomm.com";
const VEHICLES_PER_PAGE = 100;

/**
 * Generate SEO-friendly slug from vehicle data.
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

function collectImages(vehicle) {
  const images = [];
  if (vehicle.thumbnailUrl) images.push(vehicle.thumbnailUrl);
  if (Array.isArray(vehicle.imageUrls)) {
    vehicle.imageUrls.forEach((img) => {
      if (img && typeof img === "string" && !images.includes(img)) images.push(img);
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

/**
 * Dynamic vehicle sitemap PAGE (live .xml route).
 * Emits all photos with title + caption for Google Images.
 */
export default async function handler(req, res) {
  try {
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
      const lastmod =
        vehicle.updatedAt || vehicle.createdAt || new Date().toISOString();
      const city = (vehicle.cityName || vehicle.address?.city || "")
        .split(",")[0]
        .trim();
      const fuel = String(vehicle.fuelType || "").replace(/_/g, " ");
      const title =
        `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim();
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

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
