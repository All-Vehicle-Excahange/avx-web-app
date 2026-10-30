import { getCdnImageUrl } from "./cdnImage";

/**
 * Next.js custom image loader → AWS CloudFront (image.reecomm.com).
 * Replaces the former ImageKit loader.
 */
export default function cdnImageLoader({ src, width, quality }) {
  if (!src || typeof src !== "string") return src || "";

  // Local /public assets — pass through (dummy w= for Next.js loader contract)
  if (src.startsWith("/") && !src.startsWith("/cdn-image/")) {
    return `${src}?w=${width || 640}`;
  }

  const cdnUrl = getCdnImageUrl(src, {
    width: width || 640,
    quality: quality || 75,
    format: "auto",
  });

  // External / unchanged absolute URLs: preserve Next's width hint for cache busting
  if (
    cdnUrl === src &&
    (src.startsWith("http://") || src.startsWith("https://"))
  ) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width || 640}`;
  }

  return cdnUrl;
}
