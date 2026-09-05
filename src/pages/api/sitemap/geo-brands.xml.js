import { MAKER_NAME_MAPPING } from "@/data/makers";
import searchSuggestions from "@/data/searchSuggestions.json";
import { getSeoVehicles, getSeoVehicleCount } from "@/services/seo.service";

const BASE_URL = "https://www.reecomm.com";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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

export default async function handler(req, res) {
  try {
    const now = new Date().toISOString();

    const carBrands = Object.values(MAKER_NAME_MAPPING).map((b) => ({
      name: b,
      slug: slugify(b),
    }));

    // Focus + live inventory cities for brand×city landings (cars and bikes stay separate).
    const cities = [
      "mumbai",
      "delhi",
      "bangalore",
      "hyderabad",
      "ahmedabad",
      "chennai",
      "kolkata",
      "pune",
      "jaipur",
      "latur",
      "hansi",
      "ludhiana",
      "agra",
      "nashik",
      "bhopal",
      "patna",
      "vadodara",
      "surat",
      "rajkot",
      "lucknow",
      "indore",
      "chandigarh",
      "nagpur",
      "coimbatore",
      "palanpur",
      "gandhinagar",
      "visnagar",
      "kanodar",
      "siddhpur",
      "mehsana",
      "chhota-udepur",
    ];

    const states = [
      "maharashtra",
      "karnataka",
      "telangana",
      "gujarat",
      "tamil-nadu",
      "west-bengal",
      "punjab",
      "rajasthan",
      "uttar-pradesh",
      "haryana",
      "madhya-pradesh",
      "andhra-pradesh",
      "kerala",
      "bihar",
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

    // 1. Brand-only URLs
    carBrands.forEach((b) => {
      addUrl(`/search/buy-used-${b.slug}-cars`, 0.8, "daily");
    });

    // 2. Brand + City
    carBrands.forEach((b) => {
      cities.forEach((city) => {
        addUrl(`/search/buy-used-${b.slug}-cars-${city}`, 0.7, "weekly");
      });
    });

    // 3. Brand + State
    carBrands.forEach((b) => {
      states.forEach((state) => {
        addUrl(`/search/buy-used-${b.slug}-cars-${state}`, 0.6, "weekly");
      });
    });

    // 4. Two-wheeler brand / city / state
    const twoWheelerBrands = [
      "hero",
      "tvs",
      "bajaj",
      "royal-enfield",
      "yamaha",
      "ola",
      "honda",
      "suzuki",
      "ktm",
      "ather",
    ];
    twoWheelerBrands.forEach((b) => {
      addUrl(`/search/buy-used-${b}-two-wheelers`, 0.8, "daily");
      cities.forEach((city) => {
        addUrl(`/search/buy-used-${b}-two-wheelers-${city}`, 0.7, "weekly");
      });
      states.forEach((state) => {
        addUrl(`/search/buy-used-${b}-two-wheelers-${state}`, 0.6, "weekly");
      });
    });

    cities.forEach((city) => {
      addUrl(`/search/buy-used-two-wheelers-${city}`, 0.75, "weekly");
    });

    // 5. Popular brand + model (+ city/state)
    const popularCarModels = [
      { brand: "hyundai", model: "grand-i10" },
      { brand: "hyundai", model: "creta" },
      { brand: "hyundai", model: "i20" },
      { brand: "hyundai", model: "verna" },
      { brand: "hyundai", model: "santro-xing" },
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
      { brand: "ford", model: "ecosport" },
      { brand: "honda", model: "city" },
      { brand: "honda", model: "amaze" },
      { brand: "kia", model: "seltos" },
      { brand: "kia", model: "sonet" },
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

    // 6. Static category landings
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
    ];
    staticSeoUrls.forEach((url) => addUrl(url, 0.8, "daily"));

    // 7. Inject inventory brand+model(+city/state) from live SEO vehicles
    try {
      const total = await getSeoVehicleCount();
      const pageSize = 100;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const MAX_INVENTORY_PAGES = 200;
      for (let page = 1; page <= totalPages && page <= MAX_INVENTORY_PAGES; page++) {
        const { data: vehicles } = await getSeoVehicles(page, pageSize);
        for (const vehicle of vehicles || []) {
          const brandSlug = slugify(vehicle.makerName);
          const modelSlug = slugify(vehicle.modelName);
          const citySlug = slugify(
            String(vehicle.cityName || vehicle.address?.city || "").split(",")[0]
          );
          const stateSlug = slugify(vehicle.stateName || vehicle.address?.state || "");
          const kind = String(vehicle.vehicleType || "")
            .toUpperCase()
            .includes("TWO")
            ? "two-wheelers"
            : "cars";
          if (!brandSlug) continue;

          addUrl(`/search/buy-used-${brandSlug}-${kind}`, 0.75, "daily");
          if (modelSlug) {
            addUrl(`/search/buy-used-${brandSlug}-${modelSlug}-${kind}`, 0.8, "daily");
          }
          if (citySlug) {
            addUrl(`/search/buy-used-${brandSlug}-${kind}-${citySlug}`, 0.75, "weekly");
            if (modelSlug) {
              addUrl(
                `/search/buy-used-${brandSlug}-${modelSlug}-${kind}-${citySlug}`,
                0.8,
                "daily"
              );
            }
          }
          if (stateSlug) {
            addUrl(`/search/buy-used-${brandSlug}-${kind}-${stateSlug}`, 0.65, "weekly");
            if (modelSlug) {
              addUrl(
                `/search/buy-used-${brandSlug}-${modelSlug}-${kind}-${stateSlug}`,
                0.7,
                "weekly"
              );
            }
          }
        }
      }
    } catch (invErr) {
      console.warn("[geo-brands] inventory inject failed:", invErr.message);
    }

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=600"
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error("Geo-brands sitemap error:", error);
    res.status(500).send("Internal Server Error");
  }
}
