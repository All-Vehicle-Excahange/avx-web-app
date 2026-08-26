import fs from "fs";
import path from "path";
import { generateSearchIndex } from "@/scripts/generateSearchIndex";
import {
  getSeoVehicles,
  getSeoConsultations,
  getSeoVehicleCount,
  getSeoConsultationCount,
} from "@/services/seo.service";
import { generateVehicleUrl } from "@/lib/helper";
import { notifyGoogleIndexing } from "@/lib/googleIndexing";
import { loadSearchPageUrls } from "@/lib/searchPagesSitemap";

const BASE_URL = "https://www.reecomm.com";
const PAGE_SIZE = 100;
const BATCH = 5;
/** Soft cap per cron run to respect Google Indexing quotas */
const MAX_VEHICLE_NOTIFY = 2000;
const MAX_CONSULTANT_NOTIFY = 2000;
const MAX_SEARCH_NOTIFY = 500;

/**
 * Cron API Handler: GET /api/cron/generate-search-index
 * Optional: ?only=storefronts  — Google notify for storefronts page 1 only (no vehicles/search burn)
 */
export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: "Unauthorized cron trigger" });
  }

  const only = String(req.query.only || "").toLowerCase();

  // Lightweight path: storefronts / storefronts/1.xml only
  if (only === "storefronts" || only === "storefront") {
    try {
      let consultantCount = 0;
      let deletedCount = 0;
      let sitemapCount = 0;
      const page = Math.max(1, parseInt(String(req.query.page || "1"), 10) || 1);

      // Priority SERP fix for Aabad Motors
      try {
        const d = await notifyGoogleIndexing(
          `${BASE_URL}/auto-consultant/aabadmotors487206`,
          "URL_DELETED"
        );
        if (d.success) deletedCount++;
        const u = await notifyGoogleIndexing(
          `${BASE_URL}/auto-consultant/aabadmotors`,
          "URL_UPDATED"
        );
        if (u.success) consultantCount++;
      } catch (e) {
        console.warn("[Cron] aabad priority notify failed:", e.message);
      }

      for (const sm of [
        `${BASE_URL}/api/sitemap/storefronts.xml`,
        `${BASE_URL}/api/sitemap/storefronts/${page}.xml`,
      ]) {
        try {
          const r = await notifyGoogleIndexing(sm, "URL_UPDATED");
          if (r.success) sitemapCount++;
        } catch (e) {
          console.warn("[Cron] storefront sitemap notify failed:", e.message);
        }
      }

      const { data: consultants } = await getSeoConsultations(page, PAGE_SIZE);
      for (let i = 0; i < (consultants || []).length; i += BATCH) {
        const chunk = consultants.slice(i, i + BATCH);
        await Promise.all(
          chunk.map(async (store) => {
            try {
              if (!store.username) return;
              if (store.username === "aabadmotors") return; // already priority-updated
              const fullUrl = `${BASE_URL}/auto-consultant/${store.username}`;
              const r = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
              if (r.success) consultantCount++;
              if (
                store.previousUsername &&
                store.previousUsername !== store.username
              ) {
                const oldUrl = `${BASE_URL}/auto-consultant/${store.previousUsername}`;
                const d = await notifyGoogleIndexing(oldUrl, "URL_DELETED");
                if (d.success) deletedCount++;
              }
            } catch (e) {
              console.warn("[Cron] storefront notify failed:", e.message);
            }
          })
        );
      }

      return res.status(200).json({
        success: true,
        mode: "storefronts-only",
        page,
        googleIndexing: {
          consultantsNotified: consultantCount,
          previousUsernamesDeleted: deletedCount,
          sitemapsNotified: sitemapCount,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[Cron storefronts-only Error]:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  try {
    const items = await generateSearchIndex();

    let vehicleCount = 0;
    let consultantCount = 0;
    let deletedCount = 0;
    let categoryCount = 0;
    let sitemapCount = 0;
    let sampleVehicles = [];

    // ── 1. Vehicles (paginate all pages, soft-capped) ─────────────────────
    try {
      const totalVehicles = await getSeoVehicleCount();
      const totalPages = Math.max(1, Math.ceil(totalVehicles / PAGE_SIZE));
      let notified = 0;
      for (let page = 1; page <= totalPages && notified < MAX_VEHICLE_NOTIFY; page++) {
        const { data: vehicles } = await getSeoVehicles(page, PAGE_SIZE);
        if (page === 1) sampleVehicles = vehicles || [];
        if (!vehicles?.length) continue;
        for (let i = 0; i < vehicles.length && notified < MAX_VEHICLE_NOTIFY; i += BATCH) {
          const chunk = vehicles.slice(i, i + BATCH);
          await Promise.all(
            chunk.map(async (vehicle) => {
              try {
                const fullUrl = `${BASE_URL}${generateVehicleUrl(vehicle)}`;
                const r = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
                if (r.success) {
                  vehicleCount++;
                  notified++;
                }
              } catch (e) {
                console.warn("[Cron] vehicle notify failed:", e.message);
              }
            })
          );
        }
      }
    } catch (vErr) {
      console.error("[Cron API Vehicles Google Indexing Error]:", vErr.message);
    }

    // ── 2. Consultants: URL_UPDATED current + URL_DELETED previousUsername ─
    try {
      const totalConsults = await getSeoConsultationCount();
      const totalPages = Math.max(1, Math.ceil(totalConsults / PAGE_SIZE));
      let notified = 0;
      for (let page = 1; page <= totalPages && notified < MAX_CONSULTANT_NOTIFY; page++) {
        const { data: consultants } = await getSeoConsultations(page, PAGE_SIZE);
        if (!consultants?.length) continue;
        for (let i = 0; i < consultants.length && notified < MAX_CONSULTANT_NOTIFY; i += BATCH) {
          const chunk = consultants.slice(i, i + BATCH);
          await Promise.all(
            chunk.map(async (store) => {
              try {
                if (!store.username) return;
                const fullUrl = `${BASE_URL}/auto-consultant/${store.username}`;
                const r = await notifyGoogleIndexing(fullUrl, "URL_UPDATED");
                if (r.success) {
                  consultantCount++;
                  notified++;
                }
                if (
                  store.previousUsername &&
                  store.previousUsername !== store.username
                ) {
                  const oldUrl = `${BASE_URL}/auto-consultant/${store.previousUsername}`;
                  const d = await notifyGoogleIndexing(oldUrl, "URL_DELETED");
                  if (d.success) deletedCount++;
                }
              } catch (e) {
                console.warn("[Cron] consultant notify failed:", e.message);
              }
            })
          );
        }
      }
    } catch (cErr) {
      console.error(
        "[Cron API Consultants Google Indexing Error]:",
        cErr.message
      );
    }

    // ── 3. Search category / slug pages ───────────────────────────────────
    try {
      const dynamicSlugs = new Set([
        "buy-used-cars",
        "buy-used-two-wheelers",
        "buy-used-cars-under-2-lakhs",
        "buy-used-cars-under-5-lakhs",
        "buy-used-cars-under-10-lakhs",
      ]);

      (sampleVehicles || []).forEach((vehicle) => {
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

        if (brandSlug) dynamicSlugs.add(`buy-used-${brandSlug}-${kindSlug}`);
        if (brandSlug && modelSlug)
          dynamicSlugs.add(`buy-used-${brandSlug}-${modelSlug}-${kindSlug}`);
        if (citySlug) dynamicSlugs.add(`buy-used-cars-${citySlug}`);
        if (brandSlug && citySlug)
          dynamicSlugs.add(`buy-used-${brandSlug}-${kindSlug}-${citySlug}`);
      });

      // Also take a slice from search_index-driven search-pages
      try {
        loadSearchPageUrls()
          .slice(0, MAX_SEARCH_NOTIFY)
          .forEach((p) => {
            const slug = p.replace(/^\/search\//, "");
            if (slug) dynamicSlugs.add(slug);
          });
      } catch (_) {
        /* ignore */
      }

      const slugList = Array.from(dynamicSlugs).slice(0, MAX_SEARCH_NOTIFY);
      for (let i = 0; i < slugList.length; i += BATCH) {
        const chunk = slugList.slice(i, i + BATCH);
        await Promise.all(
          chunk.map(async (slug) => {
            try {
              const r = await notifyGoogleIndexing(
                `${BASE_URL}/search/${slug}`,
                "URL_UPDATED"
              );
              if (r.success) categoryCount++;
            } catch (e) {
              console.warn("[Cron] search notify failed:", e.message);
            }
          })
        );
      }
    } catch (catErr) {
      console.error(
        "[Cron API Categories Google Indexing Error]:",
        catErr.message
      );
    }

    // ── 4. Sitemap indexes ────────────────────────────────────────────────
    const SITEMAP_URLS = new Set([
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/pages-sitemap.xml`,
      `${BASE_URL}/api/sitemap/vehicles.xml`,
      `${BASE_URL}/api/sitemap/storefronts.xml`,
      `${BASE_URL}/api/sitemap/geo-brands.xml`,
      `${BASE_URL}/api/sitemap/search-pages.xml`,
    ]);

    try {
      const sitemapsDir = path.join(process.cwd(), "public", "sitemaps");
      if (fs.existsSync(sitemapsDir)) {
        fs.readdirSync(sitemapsDir).forEach((file) => {
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
      for (let i = 0; i < sitemapList.length; i += BATCH) {
        const chunk = sitemapList.slice(i, i + BATCH);
        await Promise.all(
          chunk.map(async (sitemapUrl) => {
            try {
              const r = await notifyGoogleIndexing(sitemapUrl, "URL_UPDATED");
              if (r.success) sitemapCount++;
            } catch (e) {
              console.warn("[Cron] sitemap notify failed:", e.message);
            }
          })
        );
      }
    } catch (smErr) {
      console.error("[Cron API Sitemaps Google Indexing Error]:", smErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Search index generated with ${items.length} items. Google Indexing notified.`,
      totalEntries: items.length,
      googleIndexing: {
        vehiclesNotified: vehicleCount,
        consultantsNotified: consultantCount,
        previousUsernamesDeleted: deletedCount,
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
