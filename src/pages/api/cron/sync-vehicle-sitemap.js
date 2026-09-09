import { syncVehicleSitemap } from "@/scripts/syncVehicleSitemap";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";

const BASE_URL = "https://www.reecomm.com";
const BATCH = 5;
/** Soft cap per cron run to respect Google Indexing quotas */
const MAX_VEHICLE_NOTIFY = 2000;

/**
 * Cron: GET /api/cron/sync-vehicle-sitemap
 *
 * 1) Paginate all SEO-active vehicles → write public/sitemaps/vehicles*.xml
 * 2) Point root sitemap at the static vehicle index
 * 3) Notify Google Indexing for sitemaps + vehicle URLs (soft-capped)
 */
export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: "Unauthorized cron trigger" });
  }

  try {
    const sync = await syncVehicleSitemap();

    let sitemapNotified = 0;
    let vehiclesNotified = 0;
    let failed = 0;

    const sitemapUrls = [
      sync.rootSitemapUrl || `${BASE_URL}/sitemap.xml`,
      sync.indexUrl,
      ...(sync.pageFiles || []),
    ];

    for (const url of sitemapUrls) {
      try {
        const r = await notifyGoogleIndexing(url, "URL_UPDATED");
        if (r.success) sitemapNotified++;
        else failed++;
      } catch (e) {
        failed++;
        console.warn("[Cron sync-vehicle-sitemap] sitemap notify failed:", e.message);
      }
    }

    const locs = (sync.vehicleLocs || []).slice(0, MAX_VEHICLE_NOTIFY);
    for (let i = 0; i < locs.length; i += BATCH) {
      const chunk = locs.slice(i, i + BATCH);
      await Promise.all(
        chunk.map(async (url) => {
          try {
            const r = await notifyGoogleIndexing(url, "URL_UPDATED");
            if (r.success) vehiclesNotified++;
            else failed++;
          } catch (e) {
            failed++;
            console.warn(
              "[Cron sync-vehicle-sitemap] vehicle notify failed:",
              e.message
            );
          }
        })
      );
    }

    return res.status(200).json({
      success: true,
      sync: {
        totalVehicles: sync.totalVehicles,
        seoTotalElements: sync.seoTotalElements,
        pages: sync.pages,
        indexUrl: sync.indexUrl,
      },
      googleIndexing: {
        sitemapsNotified: sitemapNotified,
        vehiclesNotified,
        failed,
        cappedAt: MAX_VEHICLE_NOTIFY,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Cron sync-vehicle-sitemap Error]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
