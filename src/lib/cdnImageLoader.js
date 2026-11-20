"use client"

import { getCdnImageUrl, ENABLE_IMAGE_CDN } from "./cdnImage";

/**
 * Next.js custom image loader → AWS CloudFront (image.reecomm.com) with direct Amazon S3 fallback.
 * While image.reecomm.com throws 500 errors, loads directly from Amazon S3 (200 OK).
 */
export default function cdnImageLoader({ src, width, quality }) {
  if (!src || typeof src !== "string") return src || "";

  // Local /public assets — pass through (dummy w= for Next.js loader contract)
  if (src.startsWith("/") && !src.startsWith("/cdn-image/")) {
    return `${src}?w=${width || 640}`;
  }

  // =========================================================================
  // CloudFront CDN (image.reecomm.com)
  // When ENABLE_IMAGE_CDN is true, rewrite through CloudFront CDN.
  // When false (default), bypasses image.reecomm.com and serves direct S3 URLs.
  // =========================================================================
  if (ENABLE_IMAGE_CDN) {
    const cdnUrl = getCdnImageUrl(src, {
      width: width || 640,
      quality: quality || 75,
      format: "auto",
      forceCdn: true,
    });

    if (cdnUrl && cdnUrl !== src) {
      return cdnUrl;
    }
  }

  // --- DIRECT AMAZON S3 FALLBACK ---
  // Return the original S3 URL directly so all vehicle images load 100% reliably
  return `${src}${src.includes("?") ? "&" : "?"}w=${width || 640}`;
}
