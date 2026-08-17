import { generateSearchIndex } from "@/scripts/generateSearchIndex";
import { getSeoVehicles, getSeoConsultations } from "@/services/seo.service";
import { generateVehicleUrl } from "@/lib/helper";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";

const BASE_URL = "https://www.reecomm.com";

const POPULAR_SEARCH_SLUGS = [
  "buy-used-cars",
  "buy-used-two-wheelers",
  "buy-used-hyundai-creta-cars",
  "buy-used-maruti-suzuki-swift-cars",
  "buy-used-mahindra-thar-cars",
  "buy-used-tata-nexon-cars",
  "buy-used-cars-palanpur",
  "buy-used-cars-ahmedabad",
  "buy-used-cars-surat",
  "buy-used-cars-rajkot",
  "buy-used-cars-mumbai",
  "buy-used-cars-delhi",
  "buy-used-cars-under-2-lakhs",
  "buy-used-cars-under-5-lakhs",
  "buy-used-cars-under-10-lakhs",
  "buy-used-cars-under-15-lakhs",
  "buy-used-cars-under-20-lakhs",
  "buy-used-cars-under-25-lakhs",
];

/**
 * Cron API Handler: GET /api/cron/generate-search-index
 *
 * Single Vercel Cron Task:
 * 1. Regenerates search_index.json
 * 2. Pushes active vehicle URLs to Google Indexing API
 * 3. Pushes auto consultant storefront URLs to Google Indexing API
 * 4. Pushes high-value popular category search URLs to Google Indexing API
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

    // ── 1. Notify Google Indexing API for Published Vehicles ──────────────
    try {
      const { data: vehicles } = await getSeoVehicles(1, 10);
      if (vehicles && vehicles.length > 0) {
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
      const { data: consultants } = await getSeoConsultations(1, 5);
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

    // ── 3. Notify Google Indexing API for Popular Category Pages ─────────
    try {
      const batchSize = 5;
      for (let i = 0; i < POPULAR_SEARCH_SLUGS.length; i += batchSize) {
        const chunk = POPULAR_SEARCH_SLUGS.slice(i, i + batchSize);
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

    return res.status(200).json({
      success: true,
      message: `Search index generated with ${items.length} items. Google Indexing notified for ${vehicleCount} vehicles, ${consultantCount} storefronts, and ${categoryCount} popular search pages.`,
      totalEntries: items.length,
      googleIndexing: {
        vehiclesNotified: vehicleCount,
        consultantsNotified: consultantCount,
        categoriesNotified: categoryCount,
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
