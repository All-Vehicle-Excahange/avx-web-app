import fs from "fs";
import path from "path";
import { MAKER_NAME_MAPPING } from "@/data/makers";
import searchSuggestions from "@/data/searchSuggestions.json";
import { getSeoVehicles, getSeoVehicleCount, getSeoConsultations, getSeoConsultationCount } from "@/services/seo.service";
import { getCdnImageUrl } from "@/lib/cdnImage";

const BASE_URL = "https://www.reecomm.com";

/** Prefer allowlisted / stocked GEO URLs — avoid empty brand×city crawl waste. */
function loadSitemapAllowlist() {
  try {
    const filePath = path.join(process.cwd(), "public", "seo_sitemap_slugs.json");
    if (!fs.existsSync(filePath)) return null;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const slugs = data?.slugs;
    if (!Array.isArray(slugs) || !slugs.length) return null;
    return new Set(slugs);
  } catch {
    return null;
  }
}

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

    // Volume brands for city/state grids (excludes exotic luxury → less empty noindex crawl)
    const volumeBrandSlugs = new Set([
      "hyundai",
      "maruti-suzuki",
      "tata",
      "mahindra",
      "honda",
      "toyota",
      "kia",
      "ford",
      "renault",
      "volkswagen",
      "skoda",
      "mg",
      "nissan",
      "jeep",
      "mg-motor",
    ]);
    const volumeCarBrands = carBrands.filter((b) => volumeBrandSlugs.has(b.slug));

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
      "himatnagar",
      "unjha",
      "tharad",
    ];

    const allowlist = loadSitemapAllowlist();
    const slugAllowed = (slug) => {
      if (!allowlist) return true;
      return allowlist.has(slug);
    };

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

    /** Buffer URLs so inventory pass can attach first listing image for Google Images. */
    const urlEntries = new Map();

    function addUrl(locPath, priority = 0.7, changefreq = "weekly") {
      if (!urlEntries.has(locPath)) {
        urlEntries.set(locPath, { priority, changefreq, image: null, imageTitle: "" });
        return;
      }
      const existing = urlEntries.get(locPath);
      if (priority > existing.priority) existing.priority = priority;
      if (changefreq === "daily") existing.changefreq = "daily";
    }

    function attachLandingImage(locPath, imageUrl, imageTitle = "") {
      const entry = urlEntries.get(locPath);
      if (!entry || entry.image || !imageUrl) return;
      const cdn =
        getCdnImageUrl(imageUrl, { preset: "detail" }) || imageUrl;
      entry.image = cdn.startsWith("/") ? `${BASE_URL}${cdn}` : cdn;
      entry.imageTitle = imageTitle || "";
    }

    // 1. Brand-only URLs (hubs — stay indexable even if thin)
    carBrands.forEach((b) => {
      addUrl(`/search/buy-used-${b.slug}-cars`, 0.8, "daily");
    });

    // 2. Brand + City — only when allowlisted / stocked (crawl budget)
    volumeCarBrands.forEach((b) => {
      cities.forEach((city) => {
        const slug = `buy-used-${b.slug}-cars-${city}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.7, "weekly");
        }
      });
    });

    // 3. Brand + State — allowlisted only
    volumeCarBrands.forEach((b) => {
      states.forEach((state) => {
        const slug = `buy-used-${b.slug}-cars-${state}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.6, "weekly");
        }
      });
    });

    // 4. Two-wheeler brand hubs always; GEO only when allowlisted
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
        const slug = `buy-used-${b}-two-wheelers-${city}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.7, "weekly");
        }
      });
      states.forEach((state) => {
        const slug = `buy-used-${b}-two-wheelers-${state}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.6, "weekly");
        }
      });
    });

    cities.forEach((city) => {
      const slug = `buy-used-two-wheelers-${city}`;
      if (slugAllowed(slug)) {
        addUrl(`/search/${slug}`, 0.75, "weekly");
      }
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
        const slug = `buy-used-${brand}-${model}-cars-${city}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.7, "weekly");
        }
      });
      states.forEach((state) => {
        const slug = `buy-used-${brand}-${model}-cars-${state}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.6, "weekly");
        }
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

    // 7. Live inventory + consultant places → GEO brand×city / model×city hubs
    const stockedCities = new Set();
    const stockedStates = new Set();

    // GEO city/state: allowlisted when file present; else volume brands / two-wheelers only
    const canEmitGeo = (slug, brandSlug, kind) => {
      if (allowlist) return slugAllowed(slug);
      return volumeBrandSlugs.has(brandSlug) || kind === "two-wheelers";
    };

    try {
      const consultationCount = await getSeoConsultationCount();
      const consultationPageSize = 100;
      const consultationPages = Math.max(
        1,
        Math.ceil(consultationCount / consultationPageSize),
      );
      for (let page = 1; page <= consultationPages && page <= 20; page++) {
        const { data: stores } = await getSeoConsultations(page, consultationPageSize);
        for (const store of stores || []) {
          const citySlug = slugify(String(store.cityName || "").split(",")[0]);
          const stateSlug = slugify(store.stateName || "");
          if (citySlug) stockedCities.add(citySlug);
          if (stateSlug) stockedStates.add(stateSlug);
        }
      }
    } catch (placeErr) {
      console.warn("[geo-brands] consultant places failed:", placeErr.message);
    }

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

          if (citySlug) stockedCities.add(citySlug);
          if (stateSlug) stockedStates.add(stateSlug);

          const rawImg =
            vehicle.thumbnailUrl ||
            vehicle.imageUrl ||
            (Array.isArray(vehicle.imageUrls) ? vehicle.imageUrls[0] : null) ||
            null;
          const imageTitle = [
            vehicle.yearOfMfg,
            vehicle.makerName,
            vehicle.modelName,
            "| Reecomm",
          ]
            .filter(Boolean)
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

          // National brand/model hubs from live stock (always useful)
          const brandHub = `/search/buy-used-${brandSlug}-${kind}`;
          addUrl(brandHub, 0.75, "daily");
          attachLandingImage(brandHub, rawImg, imageTitle);
          if (modelSlug) {
            const modelHub = `/search/buy-used-${brandSlug}-${modelSlug}-${kind}`;
            addUrl(modelHub, 0.8, "daily");
            attachLandingImage(modelHub, rawImg, imageTitle);
          }

          if (citySlug) {
            const brandCity = `buy-used-${brandSlug}-${kind}-${citySlug}`;
            const cityHub = `buy-used-${kind === "two-wheelers" ? "two-wheelers" : "cars"}-${citySlug}`;
            if (canEmitGeo(brandCity, brandSlug, kind)) {
              const path = `/search/${brandCity}`;
              addUrl(path, 0.75, "weekly");
              attachLandingImage(path, rawImg, imageTitle);
            }
            if (canEmitGeo(cityHub, brandSlug, kind)) {
              const path = `/search/${cityHub}`;
              addUrl(path, 0.8, "daily");
              attachLandingImage(path, rawImg, imageTitle);
            }
            if (modelSlug) {
              const modelCity = `buy-used-${brandSlug}-${modelSlug}-${kind}-${citySlug}`;
              if (canEmitGeo(modelCity, brandSlug, kind)) {
                const path = `/search/${modelCity}`;
                addUrl(path, 0.8, "daily");
                attachLandingImage(path, rawImg, imageTitle);
              }
            }
          }
          if (stateSlug) {
            const brandState = `buy-used-${brandSlug}-${kind}-${stateSlug}`;
            if (canEmitGeo(brandState, brandSlug, kind)) {
              const path = `/search/${brandState}`;
              addUrl(path, 0.65, "weekly");
              attachLandingImage(path, rawImg, imageTitle);
            }
            if (modelSlug) {
              const modelState = `buy-used-${brandSlug}-${modelSlug}-${kind}-${stateSlug}`;
              if (canEmitGeo(modelState, brandSlug, kind)) {
                const path = `/search/${modelState}`;
                addUrl(path, 0.7, "weekly");
                attachLandingImage(path, rawImg, imageTitle);
              }
            }
          }
        }
      }
    } catch (invErr) {
      console.warn("[geo-brands] inventory inject failed:", invErr.message);
    }

    // 8. Volume brand × newly stocked cities (beyond static list) when allowlisted / stocked
    for (const city of stockedCities) {
      if (cities.includes(city)) continue;
      for (const b of volumeCarBrands) {
        const slug = `buy-used-${b.slug}-cars-${city}`;
        if (slugAllowed(slug)) {
          addUrl(`/search/${slug}`, 0.7, "weekly");
        }
      }
      const carCity = `buy-used-cars-${city}`;
      const bikeCity = `buy-used-two-wheelers-${city}`;
      if (slugAllowed(carCity)) addUrl(`/search/${carCity}`, 0.8, "daily");
      if (slugAllowed(bikeCity)) addUrl(`/search/${bikeCity}`, 0.75, "weekly");
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const [locPath, meta] of urlEntries) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${locPath}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${meta.changefreq}</changefreq>\n`;
      xml += `    <priority>${meta.priority}</priority>\n`;
      if (meta.image) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(meta.image)}</image:loc>\n`;
        if (meta.imageTitle) {
          xml += `      <image:title>${escapeXml(meta.imageTitle)}</image:title>\n`;
          xml += `      <image:caption>${escapeXml(meta.imageTitle)}</image:caption>\n`;
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
    console.error("Geo-brands sitemap error:", error);
    res.status(500).send("Internal Server Error");
  }
}
