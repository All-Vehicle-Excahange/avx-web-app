import fs from "fs";
import path from "path";
import { generateSearchIndex } from "@/scripts/generateSearchIndex";
import { getSeoVehicles, getSeoConsultations } from "@/services/seo.service";
import { generateVehicleUrl } from "@/lib/helper";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";

const BASE_URL = "https://www.reecomm.com";

/**
 * Cron API Handler: GET /api/cron/generate-search-index
 *
 * Single Vercel Cron Task:
 * 1. Regenerates search_index.json
 * 2. Pushes active vehicle URLs to Google Indexing API
 * 3. Pushes auto consultant storefront URLs to Google Indexing API
 * 4. Pushes high-value popular category search URLs to Google Indexing API
 * 5. Pushes all main & state XML sitemaps to Google Indexing API
 */
export default async function handler(req, res) {
  // Optional security check for CRON_SECRET if configured in environment
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized cron trigger" });
  }

  try {
    const items = await generateSearchIndex();

    let vehicleCount = 0;
    let consultantCount = 0;
    let categoryCount = 0;
    let vehiclesList = [];

    // ── 1. Notify Google Indexing API for Published Vehicles ──────────────
    try {
      const { data: vehicles } = await getSeoVehicles(1, 100);
      if (vehicles && vehicles.length > 0) {
        vehiclesList = vehicles;
        const batchSize = 5;
        for (let i = 0; i < vehicles.length; i += batchSize) {
          const chunk = vehicles.slice(i, i + batchSize);
          await Promise.all(
            chunk.map(async (vehicle) => {
              const relUrl = generateVehicleUrl(vehicle);
              const fullUrl = `${BASE_URL}${relUrl}`;
              const notifyResult = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
              if (notifyResult.success) vehicleCount++;
            })
          );
        }
      }
    } catch (vErr) {
      console.error("[Cron API Vehicles Google Indexing Error]:", vErr.message);
    }

    // ── 2. Notify Google Indexing API for Auto Consultant Storefronts ────
    try {
      const { data: consultants } = await getSeoConsultations(1, 100);
      if (consultants && consultants.length > 0) {
        const batchSize = 5;
        for (let i = 0; i < consultants.length; i += batchSize) {
          const chunk = consultants.slice(i, i + batchSize);
          await Promise.all(
            chunk.map(async (store) => {
              if (!store.username) return;
              const fullUrl = `${BASE_URL}/auto-consultant/${store.username}`;
              const notifyResult = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
              if (notifyResult.success) consultantCount++;
            })
          );
        }
      }
    } catch (cErr) {
      console.error("[Cron API Consultants Google Indexing Error]:", cErr.message);
    }

    // ── 3. Notify Google Indexing API for Dynamic Search Category Slugs ──
    try {
      const dynamicSlugs = new Set([
        "buy-used-cars",
        "buy-used-two-wheelers",
        "buy-used-cars-under-2-lakhs",
        "buy-used-cars-under-5-lakhs",
        "buy-used-cars-under-10-lakhs",
      ]);

      // Dynamically extract all active brand, model, city & brand+city combinations from live vehicles
      if (vehiclesList && vehiclesList.length > 0) {
        vehiclesList.forEach((vehicle) => {
          const brandSlug = (vehicle.makerName || "")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
          const modelSlug = (vehicle.modelName || "")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
          const citySlug = (vehicle.cityName || vehicle.address?.city || "")
            .split(",")[0]
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
          const kindSlug = (vehicle.vehicleType || "")
            .toUpperCase()
            .includes("TWO")
            ? "two-wheelers"
            : "cars";

          if (brandSlug) {
            dynamicSlugs.add(`buy-used-${brandSlug}-${kindSlug}`);
          }
          if (brandSlug && modelSlug) {
            dynamicSlugs.add(`buy-used-${brandSlug}-${modelSlug}-${kindSlug}`);
          }
          if (citySlug) {
            dynamicSlugs.add(`buy-used-cars-${citySlug}`);
          }
          if (brandSlug && citySlug) {
            dynamicSlugs.add(`buy-used-${brandSlug}-${kindSlug}-${citySlug}`);
          }
          if (brandSlug && modelSlug && citySlug) {
            dynamicSlugs.add(`buy-used-${brandSlug}-${modelSlug}-${kindSlug}-${citySlug}`);
          }
        });
      }

      const slugList = Array.from(dynamicSlugs);
      const batchSize = 5;
      for (let i = 0; i < slugList.length; i += batchSize) {
        const chunk = slugList.slice(i, i + batchSize);
        await Promise.all(
          chunk.map(async (slug) => {
            const fullUrl = `${BASE_URL}/search/${slug}`;
            const notifyResult = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
            if (notifyResult.success) categoryCount++;
          })
        );
      }
    } catch (catErr) {
      console.error("[Cron API Categories Google Indexing Error]:", catErr.message);
    }

    // ── 4. Notify Google Indexing API for XML Sitemap Index Files ────────
    let sitemapCount = 0;
    const SITEMAP_URLS = new Set([
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/pages-sitemap.xml`,
      `${BASE_URL}/api/sitemap/vehicles.xml`,
      `${BASE_URL}/api/sitemap/vehicles/1.xml`,
      `${BASE_URL}/api/sitemap/storefronts.xml`,
      `${BASE_URL}/api/sitemap/storefronts/1.xml`,
      `${BASE_URL}/api/sitemap/geo-brands.xml`,
    ]);

    // Discover state XML sitemaps in public/sitemaps
    try {
      const sitemapsDir = path.join(process.cwd(), "public", "sitemaps");
      if (fs.existsSync(sitemapsDir)) {
        const files = fs.readdirSync(sitemapsDir);
        files.forEach((file) => {
          if (file.endsWith(".xml")) {
            SITEMAP_URLS.add(`${BASE_URL}/sitemaps/${file}`);
          }
        });
      }
    } catch (fsErr) {
      console.error("[Cron API Reading sitemaps directory Error]:", fsErr.message);
    }

    const sitemapList = Array.from(SITEMAP_URLS);
    try {
      const batchSize = 5;
      for (let i = 0; i < sitemapList.length; i += batchSize) {
        const chunk = sitemapList.slice(i, i + batchSize);
        await Promise.all(
          chunk.map(async (sitemapUrl) => {
            const notifyResult = await notifyGoogleIndexing(sitemapUrl, "URL_UPDATED");
            if (notifyResult.success) sitemapCount++;
          })
        );
      }
    } catch (smErr) {
      console.error("[Cron API Sitemaps Google Indexing Error]:", smErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Search index generated with ${items.length} items. Google Indexing notified for ${vehicleCount} vehicles, ${consultantCount} storefronts, ${categoryCount} popular categories, and ${sitemapCount} XML sitemaps.`,
      totalEntries: items.length,
      googleIndexing: {
        vehiclesNotified: vehicleCount,
        consultantsNotified: consultantCount,
        categoriesNotified: categoryCount,
        sitemapsNotified: sitemapCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Cron API Error]:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to execute cron task",
    });
  }
}
