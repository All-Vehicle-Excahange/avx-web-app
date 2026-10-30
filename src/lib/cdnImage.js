/**
 * AWS CloudFront image CDN helpers for https://image.reecomm.com
 * Transform syntax (verified live): ?tr=w-{width},q-{quality},f-auto
 */

export const CDN_BASE = (
  process.env.NEXT_PUBLIC_CDN_IMAGE_BASE || "https://image.reecomm.com"
).replace(/\/$/, "");

/** Centralized size/quality presets for website image contexts. */
export const IMAGE_PRESETS = {
  thumb: { width: 160, quality: 70 },
  card: { width: 400, quality: 70 },
  mobileGallery: { width: 600, quality: 75 },
  detail: { width: 1080, quality: 80 },
  zoom: { width: 1600, quality: 85 },
};

const WIDTH_BUCKETS = [160, 320, 400, 480, 600, 640, 800, 1080, 1600];

const S3_HOST_PATTERN = /^https?:\/\/[^/]*s3[^/]*\.amazonaws\.com\//i;
const REECOMM_S3_HOSTS = [
  "my-avx-bucket.s3.ap-south-1.amazonaws.com",
  "my-avx-bucket.s3.amazonaws.com",
];

function snapWidth(width) {
  const w = Number(width);
  if (!Number.isFinite(w) || w <= 0) return 640;
  for (const bucket of WIDTH_BUCKETS) {
    if (w <= bucket) return bucket;
  }
  return WIDTH_BUCKETS[WIDTH_BUCKETS.length - 1];
}

function snapQuality(quality, fallback = 75) {
  const q = Number(quality);
  if (!Number.isFinite(q) || q <= 0) return fallback;
  return Math.min(100, Math.max(1, Math.round(q)));
}

function isHttpUrl(src) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

function isLocalPublicPath(src) {
  return (
    typeof src === "string" &&
    src.startsWith("/") &&
    !src.startsWith("/cdn-image/")
  );
}

function isS3Url(src) {
  if (!isHttpUrl(src)) return false;
  if (S3_HOST_PATTERN.test(src)) return true;
  try {
    const host = new URL(src).hostname.toLowerCase();
    return REECOMM_S3_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

function isReecommCdnUrl(src) {
  if (!src || typeof src !== "string") return false;
  if (src.startsWith("/cdn-image/") || src.startsWith("/cdn-image?")) return true;
  if (!isHttpUrl(src)) return false;
  try {
    const host = new URL(src).hostname.toLowerCase();
    if (host === "image.reecomm.com") return true;
    if (host.endsWith(".imagekit.io") || host.includes("imagekit.io")) return true;
    if (host === "www.reecomm.com" || host === "reecomm.com") {
      return new URL(src).pathname.startsWith("/cdn-image");
    }
    return false;
  } catch {
    return false;
  }
}

function isTransformable(src) {
  if (!src || typeof src !== "string") return false;
  if (isLocalPublicPath(src)) return false;
  if (isS3Url(src) || isReecommCdnUrl(src)) return true;
  // Bare S3 object key (no scheme)
  if (!isHttpUrl(src) && !src.startsWith("/")) return true;
  return false;
}

/**
 * Extract S3 object key / CDN path from mixed source formats.
 */
export function extractObjectKey(src) {
  if (!src || typeof src !== "string") return "";

  if (src.startsWith("/cdn-image/")) {
    return src.replace(/^\/cdn-image\//, "").split("?")[0];
  }

  if (isS3Url(src)) {
    try {
      const url = new URL(src);
      return url.pathname.replace(/^\//, "");
    } catch {
      return src.replace(S3_HOST_PATTERN, "").split("?")[0];
    }
  }

  if (isHttpUrl(src) && isReecommCdnUrl(src)) {
    try {
      const url = new URL(src);
      const parts = url.pathname.replace(/^\//, "").split("/").filter(Boolean);
      // ik.imagekit.io/reecommKit/path → drop ImageKit id segment
      if (url.hostname.toLowerCase().includes("imagekit.io") && parts.length > 1) {
        return parts.slice(1).join("/");
      }
      if (
        (url.hostname === "www.reecomm.com" || url.hostname === "reecomm.com") &&
        parts[0] === "cdn-image"
      ) {
        return parts.slice(1).join("/");
      }
      return parts.join("/");
    } catch {
      return src.split("?")[0].replace(/^\//, "");
    }
  }

  // Bare object key
  return src.split("?")[0].replace(/^\//, "");
}

function encodeObjectKey(path) {
  if (!path) return "";
  try {
    return path
      .split("/")
      .map((segment) => {
        try {
          return encodeURIComponent(decodeURIComponent(segment));
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join("/");
  } catch {
    return path;
  }
}

function buildTrParam({ width, quality, format = "auto" }) {
  const parts = [`w-${width}`, `q-${quality}`];
  if (format === "auto" || format === undefined || format === null) {
    parts.push("f-auto");
  } else if (format) {
    parts.push(`f-${format}`);
  }
  return parts.join(",");
}

/**
 * Build a CloudFront image URL for Reecomm S3 assets.
 *
 * @param {string | null | undefined} source
 * @param {{ width?: number, quality?: number, format?: "auto" | string, preset?: keyof typeof IMAGE_PRESETS }} [options]
 * @returns {string}
 */
export function getCdnImageUrl(source, options = {}) {
  if (source == null) return "";
  const src = String(source).trim();
  if (!src) return "";

  // Local public assets — leave for Next / static hosting
  if (isLocalPublicPath(src)) return src;

  // External absolute URLs that are not our S3/CDN — unchanged
  if (isHttpUrl(src) && !isTransformable(src)) {
    return src;
  }

  if (!isTransformable(src)) {
    return src;
  }

  const preset =
    options.preset && IMAGE_PRESETS[options.preset]
      ? IMAGE_PRESETS[options.preset]
      : null;

  const width = snapWidth(
    options.width != null ? options.width : preset?.width ?? 640,
  );
  const quality = snapQuality(
    options.quality != null ? options.quality : preset?.quality ?? 75,
  );
  const format = options.format === undefined ? "auto" : options.format;

  const key = encodeObjectKey(extractObjectKey(src));
  if (!key) return src;

  const tr = buildTrParam({ width, quality, format });
  return `${CDN_BASE}/${key}?tr=${tr}`;
}

export default getCdnImageUrl;
