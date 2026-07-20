import { MAKER_NAME_MAPPING } from "@/data/makers";
import searchSuggestions from "@/data/searchSuggestions.json";

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

    // 4. Add Generic Two-Wheelers URLs
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/search/buy-used-two-wheelers</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    cities.forEach((city) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/search/buy-used-two-wheelers-${city}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    states.forEach((state) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/search/buy-used-two-wheelers-${state}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    // 5. Add Two-Wheeler Brands URLs (e.g. buy-used-hero-two-wheelers)
    const twoWheelerBrands = ["hero", "tvs", "bajaj", "royal-enfield", "yamaha", "ola"];
    twoWheelerBrands.forEach((brand) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/search/buy-used-${brand}-two-wheelers</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    twoWheelerBrands.forEach((brand) => {
      cities.forEach((city) => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/search/buy-used-${brand}-two-wheelers-${city}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    twoWheelerBrands.forEach((brand) => {
      states.forEach((state) => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/search/buy-used-${brand}-two-wheelers-${state}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    // 6. Add Brand Model URLs from searchSuggestions.json
    const modelSuggestions = searchSuggestions.filter((s) => s.type === "model" && s.link);
    const addedLinks = new Set();

    modelSuggestions.forEach((item) => {
      if (!addedLinks.has(item.link)) {
        addedLinks.add(item.link);
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${item.link}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    // 7. Add Category, Body Type, Budget, Fuel & Location Landing Pages
    const staticSeoUrls = [
      "/search/buy-used-cars",
      "/search/buy-used-two-wheelers",
      "/search/buy-used-suv-cars",
      "/search/buy-used-sedan-cars",
      "/search/buy-used-hatchback-cars",
      "/search/buy-used-luxury-cars",
      "/search/buy-used-electric-cars",
      "/search/buy-used-petrol-cars",
      "/search/buy-used-diesel-cars",
      "/search/buy-used-cng-cars",
      "/search/buy-used-cars-under-3-lakhs",
      "/search/buy-used-cars-under-5-lakhs",
      "/search/buy-used-cars-under-10-lakhs",
      "/search/buy-used-cars-under-15-lakhs",
      "/search/buy-used-electric-two-wheelers",
      "/search/buy-used-scooter-two-wheelers",
      "/search/buy-used-sports-bikes-two-wheelers",
      "/search/buy-used-two-wheelers-under-50k",
      "/search/buy-used-two-wheelers-under-1-lakh",
      "/search/buy-used-two-wheelers-under-2-lakh",
      "/search/buy-used-cars-delhi",
      "/search/buy-used-cars-mumbai",
      "/search/buy-used-cars-ahmedabad",
      "/search/buy-used-cars-bangalore",
      "/search/buy-used-cars-pune",
      "/search/buy-used-cars-surat",
      "/search/buy-used-cars-hyderabad",
      "/search/buy-used-cars-jaipur",
      "/search/buy-used-cars-vadodara",
      "/search/buy-used-cars-chennai",
      "/search/buy-used-cars-kolkata",
      "/search/buy-used-cars-rajkot",
      "/search/buy-used-cars-ludhiana",
      "/search/buy-used-cars-nashik",
      "/search/buy-used-cars-chandigarh",
      "/search/buy-used-cars-lucknow",
      "/search/buy-used-cars-gujarat",
      "/search/buy-used-cars-maharashtra",
      "/search/buy-used-cars-punjab",
      "/search/buy-used-cars-rajasthan",
      "/search/buy-used-cars-haryana",
      "/search/buy-used-cars-karnataka",
      "/search/buy-used-cars-tamil-nadu",
      "/search/buy-used-two-wheelers-delhi"
    ];

    staticSeoUrls.forEach((url) => {
      if (!addedLinks.has(url)) {
        addedLinks.add(url);
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${url}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      }
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
