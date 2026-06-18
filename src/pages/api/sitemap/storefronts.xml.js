import { getSeoConsultationCount } from "@/services/seo.service";

const BASE_URL = "https://www.reecomm.com";
const CONSULTATIONS_PER_SITEMAP = 100;

/**
 * Dynamic storefront sitemap INDEX.
 *
 * Returns a <sitemapindex> listing paginated storefront sitemaps:
 *   /api/sitemap/storefronts/1.xml
 *   /api/sitemap/storefronts/2.xml
 *   ...
 *
 * Referenced from the main public/sitemap.xml.
 */
export default async function handler(req, res) {
  try {
    const totalConsultations = await getSeoConsultationCount();
    const totalPages = Math.max(1, Math.ceil(totalConsultations / CONSULTATIONS_PER_SITEMAP));
    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (let page = 1; page <= totalPages; page++) {
      xml += `  <sitemap>\n`;
      xml += `    <loc>${BASE_URL}/api/sitemap/storefronts/${page}.xml</loc>\n`;
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
    console.error("[sitemap/storefronts.xml] Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
}
