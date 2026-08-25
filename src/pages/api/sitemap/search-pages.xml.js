import {
  loadSearchPageUrls,
  URLS_PER_SITEMAP,
  BASE_URL,
} from "@/lib/searchPagesSitemap";

/**
 * Dynamic search-pages sitemap INDEX.
 */
export default async function handler(req, res) {
  try {
    const urls = loadSearchPageUrls();
    const totalPages = Math.max(1, Math.ceil(Math.max(urls.length, 1) / URLS_PER_SITEMAP));
    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (let page = 1; page <= totalPages; page++) {
      xml += `  <sitemap>\n`;
      xml += `    <loc>${BASE_URL}/api/sitemap/search-pages/${page}.xml</loc>\n`;
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
    console.error("[sitemap/search-pages.xml] Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
}
