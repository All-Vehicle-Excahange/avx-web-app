/** Fallback when vehicle thumbnail / gallery image fails to load. */
export const VEHICLE_IMAGE_FALLBACK = "/big_card_car.jpg";

/**
 * Best available still image for a vehicle card / compare thumb.
 * Prefers thumbnailUrl, then first non-video gallery image, then loose image fields.
 */
export function resolveVehicleImageSrc(vehicle) {
  if (!vehicle || typeof vehicle !== "object") return null;

  const thumb =
    vehicle.thumbnailUrl ||
    vehicle.image ||
    vehicle.imageUrl ||
    null;
  if (typeof thumb === "string" && thumb.trim()) return thumb.trim();

  if (Array.isArray(vehicle.vehicleImages) && vehicle.vehicleImages.length) {
    const firstStill = [...vehicle.vehicleImages]
      .filter((item) => item && !item.isVideo && item.imageUrl)
      .sort(
        (a, b) =>
          (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0),
      )[0];
    if (firstStill?.imageUrl) return String(firstStill.imageUrl).trim();
  }

  if (Array.isArray(vehicle.imageUrls) && vehicle.imageUrls.length) {
    for (const entry of vehicle.imageUrls) {
      if (typeof entry === "string" && entry.trim()) return entry.trim();
      const url = entry?.url || entry?.photoUrl || entry?.imageUrl;
      if (typeof url === "string" && url.trim()) return url.trim();
    }
  }

  return null;
}
