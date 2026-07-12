import { getSeoConsultations } from "@/services/seo.service";

const BASE_URL = "https://www.reecomm.com";
const CONSULTATIONS_PER_PAGE = 100;

/**
 * Dynamic storefront sitemap PAGE.
 *
 * URL: /api/sitemap/storefronts/[page] (handles /api/sitemap/storefronts/[page].xml)
 */
export default async function handler(req, res) {
  try {
    const rawPage = req.query.page;
    const page = parseInt(String(rawPage).replace(".xml", ""), 10);

    if (isNaN(page) || page < 1) {
      res.status(400).send("Invalid page number");
      return;
    }

    const result = await getSeoConsultations(page, CONSULTATIONS_PER_PAGE);
    const storefronts = result.data || [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const store of storefronts) {
      if (!store.username) continue;

      const loc = `${BASE_URL}/auto-consultant/${store.username}`;
      const lastmod = store.updatedAt || store.createdAt || new Date().toISOString();

      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;

      if (store.logoUrl) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(store.logoUrl)}</image:loc>\n`;
        if (store.consultationName) {
          xml += `      <image:title>${escapeXml(store.consultationName)}</image:title>\n`;
        }
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
    console.error(`[sitemap/storefronts/${req.query.page}] Error:`, error.message);
    res.status(500).send("Internal Server Error");
  }
}

function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
