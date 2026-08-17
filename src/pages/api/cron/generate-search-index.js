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

    // ── 1. Notify Google Indexing API for Published Vehicles ──────────────
    try {
      const { data: vehicles } = await getSeoVehicles(1, 50);
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
      const { data: consultants } = await getSeoConsultations(1, 50);
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

    return res.status(200).json({
      success: true,
      message: `Search index generated with ${items.length} items. Google Indexing notified for ${vehicleCount} vehicle URLs and ${consultantCount} consultant storefront URLs.`,
      totalEntries: items.length,
      googleIndexing: {
        vehiclesNotified: vehicleCount,
        consultantsNotified: consultantCount,
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
