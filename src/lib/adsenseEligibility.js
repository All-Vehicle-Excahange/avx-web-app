/**
 * AdSense eligibility — monetize inventory-backed / substantial pages only
 * (low-value content policy). Callers pass `enabled` into AdSenseAd / skip loader.
 *
 * Post-deploy review checklist (manual):
 * 1. Confirm thin search landings stay noindex + ad-ineligible.
 * 2. Confirm short blog posts do not request ads (isBlogAdEligible).
 * 3. Wait 3–7 days after content deploy, then AdSense → Request review.
 */

/** Route prefixes where the AdSense JS loader may be injected. */
export const ADSENSE_LOADER_PREFIXES = [
  "/",
  "/search",
  "/vehicle/details",
  "/blog",
];

/**
 * Minimum live listings before search pages may request AdSense units.
 * Higher than MIN_INDEXABLE_LISTINGS so thin stocked pages stay indexable
 * without monetizing low-value inventory.
 */
export const MIN_ADSENSE_LISTINGS = 5;

/**
 * Minimum article body length before blog detail pages may request AdSense.
 * Keeps doorway / stub posts from monetizing.
 */
export const MIN_BLOG_AD_CONTENT_CHARS = 1200;

/**
 * Whether the current pathname may load adsbygoogle.js.
 * Home is exact "/"; other entries are prefix matches.
 */
export function isAdSenseLoaderPath(pathname = "") {
  const path = String(pathname || "").split("?")[0] || "";
  if (path === "/" || path === "") return true;
  return ADSENSE_LOADER_PREFIXES.some(
    (prefix) =>
      prefix !== "/" && (path === prefix || path.startsWith(`${prefix}/`)),
  );
}

/**
 * Search landing eligibility from SSR SEO props.
 * Empty / noindex / low-inventory landings must not show AdSense units.
 */
export function isSearchLandingAdEligible({
  noindex = false,
  totalCount = 0,
  minListings = MIN_ADSENSE_LISTINGS,
} = {}) {
  if (noindex) return false;
  const n = Number(totalCount);
  if (!Number.isFinite(n) || n < minListings) return false;
  return true;
}

/**
 * Blog article eligibility — substantial unique body only (no thin stubs).
 */
export function isBlogAdEligible(
  post,
  { minChars = MIN_BLOG_AD_CONTENT_CHARS } = {},
) {
  if (!post || typeof post !== "object") return false;
  const raw = String(post.content || "");
  const normalized = raw.replace(/\s+/g, " ").trim();
  return normalized.length >= minChars;
}
