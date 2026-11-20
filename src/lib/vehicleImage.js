const isCleanImageUrl = (url) => {
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  return Boolean(
    trimmed &&
      trimmed !== "/big_card_car.jpg" &&
      trimmed !== "null" &&
      trimmed !== "undefined"
  );
};

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
  if (isCleanImageUrl(thumb)) return thumb.trim();

  if (Array.isArray(vehicle.vehicleImages) && vehicle.vehicleImages.length) {
    const firstStill = [...vehicle.vehicleImages]
      .filter((item) => item && !item.isVideo && isCleanImageUrl(item.imageUrl))
      .sort(
        (a, b) =>
          (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0),
      )[0];
    if (firstStill?.imageUrl) return String(firstStill.imageUrl).trim();
  }

  if (Array.isArray(vehicle.imageUrls) && vehicle.imageUrls.length) {
    for (const entry of vehicle.imageUrls) {
      if (isCleanImageUrl(entry)) return entry.trim();
      const url = entry?.url || entry?.photoUrl || entry?.imageUrl;
      if (isCleanImageUrl(url)) return url.trim();
    }
  }

  return null;
}
