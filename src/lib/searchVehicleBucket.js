/**
 * Pick the primary vehicle list + pageResponse for search landings.
 * Prefer priceMatch when it has vehicles or a positive total; otherwise topPicks.
 * Avoids the empty-array trap: `[] || topPicks` never falls through.
 */

function asVehicleArray(bucket) {
  if (!bucket) return [];
  if (Array.isArray(bucket?.vehicles)) return bucket.vehicles;
  if (Array.isArray(bucket)) return bucket;
  if (Array.isArray(bucket?.content)) return bucket.content;
  return [];
}

/**
 * @param {object|null|undefined} searchData - API `data` (or full payload with priceMatch/topPicks)
 * @returns {{ vehicles: array, pageResponse: object, source: 'priceMatch'|'topPicks'|'none' }}
 */
export function pickPrimaryVehicleBucket(searchData) {
  const root = searchData?.priceMatchVehicles || searchData?.topPicksVehicles
    ? searchData
    : searchData?.data || searchData || {};

  const priceVehicles = asVehicleArray(root.priceMatchVehicles);
  const topVehicles = asVehicleArray(root.topPicksVehicles);
  const pricePR = root.priceMatchVehicles?.pageResponse || null;
  const topPR = root.topPicksVehicles?.pageResponse || null;

  const priceTotal =
    typeof pricePR?.totalElements === "number" ? pricePR.totalElements : null;
  const topTotal =
    typeof topPR?.totalElements === "number" ? topPR.totalElements : null;

  if (priceVehicles.length > 0 || (priceTotal != null && priceTotal > 0)) {
    return {
      vehicles: priceVehicles,
      pageResponse: pricePR || {},
      source: "priceMatch",
    };
  }

  if (topVehicles.length > 0 || (topTotal != null && topTotal > 0)) {
    return {
      vehicles: topVehicles,
      pageResponse: topPR || {},
      source: "topPicks",
    };
  }

  if (pricePR || priceVehicles.length || topPR || topVehicles.length) {
    return {
      vehicles: priceVehicles.length ? priceVehicles : topVehicles,
      pageResponse: pricePR || topPR || {},
      source: pricePR ? "priceMatch" : topPR ? "topPicks" : "none",
    };
  }

  return { vehicles: [], pageResponse: {}, source: "none" };
}

/**
 * Header / SEO total: never under-report vs vehicles currently shown.
 */
export function resolveDisplayTotalElements(pageResponse, vehicles = []) {
  const apiTotal =
    typeof pageResponse?.totalElements === "number"
      ? pageResponse.totalElements
      : 0;
  const shown = Array.isArray(vehicles) ? vehicles.length : 0;
  return Math.max(apiTotal, shown);
}
