import {
  loadSearchPageUrls,
  URLS_PER_SITEMAP,
  BASE_URL,
} from "@/lib/searchPagesSitemap";

/**
 * Dynamic search-pages sitemap PAGE.
 * URL: /api/sitemap/search-pages/[page].xml
 */
export default async function handler(req, res) {
  try {
    const rawPage = req.query.page;
    const page = parseInt(String(rawPage).replace(".xml", ""), 10);

    if (isNaN(page) || page < 1) {
      res.status(400).send("Invalid page number");
      return;
    }

    const allUrls = loadSearchPageUrls();
    const start = (page - 1) * URLS_PER_SITEMAP;
    const slice = allUrls.slice(start, start + URLS_PER_SITEMAP);
    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const locPath of slice) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${locPath}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
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
    console.error(
      `[sitemap/search-pages/${req.query.page}] Error:`,
      error.message
    );
    res.status(500).send("Internal Server Error");
  }
}
