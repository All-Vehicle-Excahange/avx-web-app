import { MAKER_NAME_MAPPING } from "@/data/makers";

const BASE_URL = "https://www.reecomm.com";

export default async function handler(req, res) {
  try {
    const now = new Date().toISOString();
    const brands = Object.values(MAKER_NAME_MAPPING).map(b => b.toLowerCase().replace(/\s+/g, "-"));
    
    // Popular Indian cities to map combinations for search landing pages
    const cities = [
      "mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai", 
      "kolkata", "pune", "jaipur", "latur", "palanpur", "hansi", "ludhiana",
      "agra", "nashik", "bhopal", "patna", "vadodara", "surat", "rajkot"
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Add Brand-only URLs (e.g. buy-used-maruti-suzuki-cars)
    brands.forEach((brand) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/search/buy-used-${brand}-cars</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // 2. Add Brand + City combination URLs (e.g. buy-used-hyundai-cars-mumbai)
    brands.forEach((brand) => {
      cities.forEach((city) => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/search/buy-used-${brand}-cars-${city}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    // Popular Indian states to map combinations for search landing pages
    const states = [
      "maharashtra", "karnataka", "telangana", "gujarat", "tamil-nadu",
      "west-bengal", "punjab", "rajasthan", "uttar-pradesh", "haryana",
      "madhya-pradesh", "andhra-pradesh", "kerala", "bihar"
    ];

    // 3. Add Brand + State combination URLs (e.g. buy-used-hyundai-cars-haryana)
    brands.forEach((brand) => {
      states.forEach((state) => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/search/buy-used-${brand}-cars-${state}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Geo-brands sitemap error:", error);
    res.status(500).send("Internal Server Error");
  }
}
