import { syncVehicleSitemap } from "@/scripts/syncVehicleSitemap";
import { syncStorefrontSitemap } from "@/scripts/syncStorefrontSitemap";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";

const BASE_URL = "https://www.reecomm.com";
const BATCH = 5;
/** Soft cap per cron run to respect Google Indexing quotas */
const MAX_URL_NOTIFY = 2000;

/**
 * Cron: GET /api/cron/sync-inventory-sitemaps
 *
 * 1) Sync all SEO-active vehicles → public/sitemaps/vehicles*.xml
 * 2) Sync all SEO-active consultants → public/sitemaps/storefronts*.xml
 * 3) Refresh root sitemap pointers + GEO lastmods
 * 4) Notify Google Indexing for sitemaps + capped URL batches
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
    const vehicles = await syncVehicleSitemap();
    const storefronts = await syncStorefrontSitemap();

    let sitemapNotified = 0;
    let urlsNotified = 0;
    let failed = 0;

    const sitemapUrls = [
      vehicles.rootSitemapUrl || `${BASE_URL}/sitemap.xml`,
      vehicles.indexUrl,
      ...(vehicles.pageFiles || []),
      storefronts.indexUrl,
      ...(storefronts.pageFiles || []),
      `${BASE_URL}/api/sitemap/geo-brands.xml`,
      `${BASE_URL}/api/sitemap/brands.xml`,
      `${BASE_URL}/api/sitemap/models.xml`,
      `${BASE_URL}/api/sitemap/search-pages.xml`,
    ];

    for (const url of sitemapUrls) {
      try {
        const r = await notifyGoogleIndexing(url, "URL_UPDATED");
        if (r.success) sitemapNotified++;
        else failed++;
      } catch (e) {
        failed++;
        console.warn(
          "[Cron sync-inventory-sitemaps] sitemap notify failed:",
          e.message
        );
      }
    }

    const locs = [
      ...(vehicles.vehicleLocs || []),
      ...(storefronts.storefrontLocs || []),
    ].slice(0, MAX_URL_NOTIFY);

    for (let i = 0; i < locs.length; i += BATCH) {
      const chunk = locs.slice(i, i + BATCH);
      await Promise.all(
        chunk.map(async (url) => {
          try {
            const r = await notifyGoogleIndexing(url, "URL_UPDATED");
            if (r.success) urlsNotified++;
            else failed++;
          } catch (e) {
            failed++;
            console.warn(
              "[Cron sync-inventory-sitemaps] URL notify failed:",
              e.message
            );
          }
        })
      );
    }

    return res.status(200).json({
      success: true,
      vehicles: {
        totalVehicles: vehicles.totalVehicles,
        seoTotalElements: vehicles.seoTotalElements,
        pages: vehicles.pages,
        indexUrl: vehicles.indexUrl,
      },
      storefronts: {
        totalStorefronts: storefronts.totalStorefronts,
        seoTotalElements: storefronts.seoTotalElements,
        pages: storefronts.pages,
        indexUrl: storefronts.indexUrl,
      },
      googleIndexing: {
        sitemapsNotified: sitemapNotified,
        urlsNotified,
        failed,
        cappedAt: MAX_URL_NOTIFY,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Cron sync-inventory-sitemaps Error]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
