/**
 * Single source of truth for VDP URL slugs.
 *
 * Location rule (GEO-friendly, deterministic — no cross-vehicle lookup):
 * - If town exists → `{town}-{city}` (e.g. bharkawada-palanpur)
 * - Else → `{city}` only
 *
 * CommonJS so Node scripts (syncVehicleSitemap) and Next webpack can both load it.
 */

function slugifyPart(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCityRaw(data) {
  if (!data) return "";
  return (
    data.cityName ||
    data.city ||
    data.vehicleAddress?.city ||
    data.address?.city ||
    data.location ||
    ""
  )
    .split(",")[0]
    .trim();
}

function getTownRaw(data) {
  if (!data) return "";
  return (
    data.townName ||
    data.town ||
    data.vehicleAddress?.town ||
    data.address?.town ||
    ""
  )
    .split(",")[0]
    .trim();
}

function getLocationPart(data) {
  const city = slugifyPart(getCityRaw(data));
  const town = slugifyPart(getTownRaw(data));
  if (town && city && town !== city) return `${town}-${city}`;
  return city || town || "";
}

function getKind(data) {
  const type = String(data?.vehicleType || data?.bodyType || "").toUpperCase();
  if (type.includes("TWO") || type === "BIKE") return "two-wheelers";
  return "cars";
}

/**
 * Canonical VDP slug for a vehicle record.
 */
function generateVehicleSlug(data) {
  if (!data) return "vehicle";

  const brandPart = slugifyPart(data.makerName || data.makeName || "");
  const modelPart = slugifyPart(data.modelName || "");
  const yearPart = data.yearOfMfg || data.year || "";
  const locationPart = getLocationPart(data);
  const kind = getKind(data);

  return `buy-used-${brandPart}-${modelPart}-${yearPart}-${kind}-${locationPart}`
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .replace(/^-/, "");
}

/**
 * Canonical path: /vehicle/details/{slug}/{id}
 */
function buildCanonicalVehiclePath(vehicle) {
  if (!vehicle?.id) return "/search";
  const slug = generateVehicleSlug(vehicle) || "vehicle";
  return `/vehicle/details/${slug}/${vehicle.id}`;
}

module.exports = {
  slugifyPart,
  getCityRaw,
  getTownRaw,
  getLocationPart,
  getKind,
  generateVehicleSlug,
  buildCanonicalVehiclePath,
};
