import { generateSearchIndex } from "@/scripts/generateSearchIndex";
import { getSeoVehicles } from "@/services/seo.service";
import { generateVehicleUrl } from "@/lib/helper";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";

const BASE_URL = "https://www.reecomm.com";

/**
 * Cron API Handler: GET /api/cron/generate-search-index
 *
 * Single Vercel Cron Task:
 * 1. Regenerates search_index.json
 * 2. Pushes active vehicle URLs to Google Indexing API
 */
export default async function handler(req, res) {
  // Optional security check for CRON_SECRET if configured in environment
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized cron trigger" });
  }

  try {
    const items = await generateSearchIndex();

    // ── 2. Run Google Indexing Push within single Cron job ───────────────
    let googleIndexingSummary = { totalNotified: 0, successCount: 0 };
    try {
      const { data: vehicles } = await getSeoVehicles(1, 100);
      if (vehicles && vehicles.length > 0) {
        let successCount = 0;
        for (const vehicle of vehicles) {
          const relUrl = generateVehicleUrl(vehicle);
          const fullUrl = `${BASE_URL}${relUrl}`;
          const notifyResult = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
          if (notifyResult.success) successCount++;
        }
        googleIndexingSummary = {
          totalNotified: vehicles.length,
          successCount,
        };
      }
    } catch (gErr) {
      console.error("[Cron API Google Indexing Error]:", gErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Search index generated with ${items.length} items. Google Indexing notified for ${googleIndexingSummary.successCount}/${googleIndexingSummary.totalNotified} vehicle URLs.`,
      totalEntries: items.length,
      googleIndexing: googleIndexingSummary,
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
