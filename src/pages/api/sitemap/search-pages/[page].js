import {
  loadSearchPageUrls,
  URLS_PER_SITEMAP,
  BASE_URL,
} from "@/lib/searchPagesSitemap";
import { getSeoVehicles, getSeoVehicleCount } from "@/services/seo.service";
import { getCdnImageUrl } from "@/lib/cdnImage";

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

/**
 * Build path → first listing image for stocked search landings (capped inventory scan).
 */
async function buildLandingImageMap(neededPaths) {
  const needed = new Set(neededPaths);
  const images = new Map();
  if (!needed.size) return images;

  try {
    const total = await getSeoVehicleCount();
    const pageSize = 100;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const MAX_PAGES = 30;

    for (let page = 1; page <= totalPages && page <= MAX_PAGES; page++) {
      if (images.size >= needed.size) break;
      const { data: vehicles } = await getSeoVehicles(page, pageSize);
      for (const vehicle of vehicles || []) {
        const brandSlug = slugify(vehicle.makerName);
        const modelSlug = slugify(vehicle.modelName);
        const citySlug = slugify(
          String(vehicle.cityName || vehicle.address?.city || "").split(",")[0]
        );
        const kind = String(vehicle.vehicleType || "")
          .toUpperCase()
          .includes("TWO")
          ? "two-wheelers"
          : "cars";
        if (!brandSlug) continue;

        const rawImg =
          vehicle.thumbnailUrl ||
          vehicle.imageUrl ||
          (Array.isArray(vehicle.imageUrls) ? vehicle.imageUrls[0] : null) ||
          null;
        if (!rawImg) continue;

        const cdn = getCdnImageUrl(rawImg, { preset: "detail" }) || rawImg;
        const imageLoc = cdn.startsWith("/") ? `${BASE_URL}${cdn}` : cdn;
        const title = [
          vehicle.yearOfMfg,
          vehicle.makerName,
          vehicle.modelName,
          "| Reecomm",
        ]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        const candidates = [
          `/search/buy-used-${brandSlug}-${kind}`,
          modelSlug
            ? `/search/buy-used-${brandSlug}-${modelSlug}-${kind}`
            : null,
          citySlug
            ? `/search/buy-used-${kind === "two-wheelers" ? "two-wheelers" : "cars"}-${citySlug}`
            : null,
          citySlug
            ? `/search/buy-used-${brandSlug}-${kind}-${citySlug}`
            : null,
          citySlug && modelSlug
            ? `/search/buy-used-${brandSlug}-${modelSlug}-${kind}-${citySlug}`
            : null,
        ].filter(Boolean);

        for (const path of candidates) {
          if (!needed.has(path) || images.has(path)) continue;
          images.set(path, { loc: imageLoc, title });
        }
      }
    }
  } catch (err) {
    console.warn("[sitemap/search-pages] image enrich failed:", err.message);
  }

  return images;
}

/**
 * Dynamic search-pages sitemap PAGE.
 *
 * URL: /api/sitemap/search-pages/[page]
 * Also handles /api/sitemap/search-pages/[page].xml (same pattern as vehicles/storefronts).
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
    const imageMap = await buildLandingImageMap(slice);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const locPath of slice) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${locPath}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      const img = imageMap.get(locPath);
      if (img?.loc) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(img.loc)}</image:loc>\n`;
        if (img.title) {
          xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
          xml += `      <image:caption>${escapeXml(img.title)}</image:caption>\n`;
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
    console.error(
      `[sitemap/search-pages/${req.query.page}] Error:`,
      error.message
    );
    res.status(500).send("Internal Server Error");
  }
}
