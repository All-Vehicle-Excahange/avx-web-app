/**
 * Chrome applies EXIF orientation for S3 JPEGs and for blob:/object URLs,
 * but NOT when the same bytes are loaded from image.reecomm.com in an <img>.
 * Fetch → blob URL restores correct orientation for CDN vehicle photos.
 */

const orientedSrcCache = new Map();

export function needsOrientationFix(src) {
  if (!src || typeof src !== "string") return false;
  if (src.startsWith("blob:") || src.startsWith("data:")) return false;
  // Same-origin /cdn-image is oriented by pages/api/cdn-image (sharp.rotate)
  if (src.startsWith("/cdn-image/") || src.includes("/cdn-image/")) return false;
  // Other local /public assets — no fix needed
  if (src.startsWith("/")) return false;
  try {
    const host = new URL(src, "https://www.reecomm.com").hostname.toLowerCase();
    if (host === "image.reecomm.com") return true;
    if (host.endsWith(".imagekit.io") || host.includes("imagekit.io")) return true;
  } catch {
    /* ignore */
  }
  return src.includes("image.reecomm.com");
}

/**
 * @param {string} src
 * @returns {Promise<string>} blob URL (EXIF-honoring) or original src
 */
export function getOrientedImageSrc(src) {
  if (!needsOrientationFix(src)) return Promise.resolve(src);

  const cached = orientedSrcCache.get(src);
  if (cached) return cached;

  const promise = (async () => {
    try {
      const res = await fetch(src, { mode: "cors", credentials: "omit" });
      if (!res.ok) return src;
      const blob = await res.blob();
      if (!blob.type.startsWith("image/")) return src;
      return URL.createObjectURL(blob);
    } catch {
      return src;
    }
  })();

  orientedSrcCache.set(src, promise);
  return promise;
}
