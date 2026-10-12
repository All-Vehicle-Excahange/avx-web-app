/**
 * AdSense eligibility — monetize inventory pages only (AdSense low-value policy).
 * No UI: callers pass `enabled` into AdSenseAd / skip the loader.
 */

/** Route prefixes where the AdSense JS loader may be injected. */
export const ADSENSE_LOADER_PREFIXES = [
  "/",
  "/search",
  "/vehicle/details",
  "/auto-consultant",
];

/**
 * Whether the current pathname may load adsbygoogle.js.
 * Home is exact "/"; other entries are prefix matches.
 */
export function isAdSenseLoaderPath(pathname = "") {
  const path = String(pathname || "").split("?")[0] || "";
  if (path === "/" || path === "") return true;
  return ADSENSE_LOADER_PREFIXES.some(
    (prefix) => prefix !== "/" && (path === prefix || path.startsWith(`${prefix}/`))
  );
}

/**
 * Search landing eligibility from SSR SEO props.
 * Empty / noindex landings must not show AdSense units.
 */
export function isSearchLandingAdEligible({
  noindex = false,
  totalCount = 0,
  minListings = 1,
} = {}) {
  if (noindex) return false;
  const n = Number(totalCount);
  if (!Number.isFinite(n) || n < minListings) return false;
  return true;
}
