import { MAKER_NAME_MAPPING } from "@/data/makers";
import searchSuggestions from "@/data/searchSuggestions.json";

const BASE_URL = "https://www.reecomm.com";

export default async function handler(req, res) {
  try {
    const now = new Date().toISOString();

    const carBrands = Object.values(MAKER_NAME_MAPPING).map(b => ({
      name: b,
      slug: b.toLowerCase().replace(/\s+/g, "-")
    }));

    // Popular Indian cities to map combinations for search landing pages
    const cities = [
      "mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai",
      "kolkata", "pune", "jaipur", "latur", "palanpur", "hansi", "ludhiana",
      "agra", "nashik", "bhopal", "patna", "vadodara", "surat", "rajkot",
      "lucknow", "indore", "chandigarh", "nagpur", "coimbatore"
    ];

    // Popular Indian states
    const states = [
      "maharashtra", "karnataka", "telangana", "gujarat", "tamil-nadu",
      "west-bengal", "punjab", "rajasthan", "uttar-pradesh", "haryana",
      "madhya-pradesh", "andhra-pradesh", "kerala", "bihar"
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const addedLinks = new Set();

    function addUrl(locPath, priority = 0.7, changefreq = "weekly") {
      if (!addedLinks.has(locPath)) {
        addedLinks.add(locPath);
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${locPath}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    // 1. Add Brand-only URLs (e.g. /search/buy-used-kia-cars)
    carBrands.forEach((b) => {
      addUrl(`/search/buy-used-${b.slug}-cars`, 0.8, "daily");
    });

    // 2. Add Brand + City combination URLs (e.g. /search/buy-used-kia-cars-ahmedabad)
    carBrands.forEach((b) => {
      cities.forEach((city) => {
        addUrl(`/search/buy-used-${b.slug}-cars-${city}`, 0.7, "weekly");
      });
    });

    // 3. Add Brand + State combination URLs (e.g. /search/buy-used-kia-cars-gujarat)
    carBrands.forEach((b) => {
      states.forEach((state) => {
        addUrl(`/search/buy-used-${b.slug}-cars-${state}`, 0.6, "weekly");
      });
    });

    // 4. Add Two-Wheeler Brand URLs & City/State combinations
    const twoWheelerBrands = ["hero", "tvs", "bajaj", "royal-enfield", "yamaha", "ola", "honda", "suzuki", "ktm", "ather"];
    twoWheelerBrands.forEach((b) => {
      addUrl(`/search/buy-used-${b}-two-wheelers`, 0.8, "daily");
      cities.forEach((city) => {
        addUrl(`/search/buy-used-${b}-two-wheelers-${city}`, 0.7, "weekly");
      });
      states.forEach((state) => {
        addUrl(`/search/buy-used-${b}-two-wheelers-${state}`, 0.6, "weekly");
      });
    });

    // 5. Add Brand + Model & Brand + Model + City URLs
    const popularCarModels = [
      { brand: "hyundai", model: "grand-i10" },
      { brand: "hyundai", model: "creta" },
      { brand: "hyundai", model: "i20" },
      { brand: "hyundai", model: "verna" },
      { brand: "maruti-suzuki", model: "swift" },
      { brand: "maruti-suzuki", model: "baleno" },
      { brand: "maruti-suzuki", model: "wagon-r" },
      { brand: "maruti-suzuki", model: "brezza" },
      { brand: "mahindra", model: "thar" },
      { brand: "mahindra", model: "xuv700" },
      { brand: "mahindra", model: "scorpio" },
      { brand: "tata", model: "nexon" },
      { brand: "tata", model: "punch" },
      { brand: "tata", model: "harrier" },
      { brand: "toyota", model: "fortuner" },
      { brand: "toyota", model: "innova" },
    ];

    popularCarModels.forEach(({ brand, model }) => {
      addUrl(`/search/buy-used-${brand}-${model}-cars`, 0.8, "daily");
      cities.forEach((city) => {
        addUrl(`/search/buy-used-${brand}-${model}-cars-${city}`, 0.7, "weekly");
      });
      states.forEach((state) => {
        addUrl(`/search/buy-used-${brand}-${model}-cars-${state}`, 0.6, "weekly");
      });
    });

    searchSuggestions.forEach((item) => {
      if (item.link) {
        addUrl(item.link, 0.7, "weekly");
      }
    });

    // 6. Static Category, Body Type, Budget & Fuel Landing Pages
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
      "/search/buy-used-two-wheelers-under-2-lakh"
    ];

    staticSeoUrls.forEach((url) => addUrl(url, 0.8, "daily"));

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Geo-brands sitemap error:", error);
    res.status(500).send("Internal Server Error");
  }
}
