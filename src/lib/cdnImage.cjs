/**
 * CommonJS mirror of cdnImage.js for Node scripts (sitemap sync, etc.).
 * Keep transform defaults aligned with src/lib/cdnImage.js IMAGE_PRESETS.
 */
const CDN_BASE = (
  process.env.NEXT_PUBLIC_CDN_IMAGE_BASE || "https://image.reecomm.com"
).replace(/\/$/, "");

const IMAGE_PRESETS = {
  thumb: { width: 160, quality: 70 },
  card: { width: 400, quality: 70 },
  detail: { width: 1080, quality: 80 },
};

const S3_HOST_PATTERN = /^https?:\/\/[^/]*s3[^/]*\.amazonaws\.com\//i;
const REECOMM_S3_HOSTS = [
  "my-avx-bucket.s3.ap-south-1.amazonaws.com",
  "my-avx-bucket.s3.amazonaws.com",
];

function isHttpUrl(src) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
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
  if (!isHttpUrl(src)) return false;
  try {
    return new URL(src).hostname.toLowerCase() === "image.reecomm.com";
  } catch {
    return false;
  }
}

function extractObjectKey(src) {
  if (!src || typeof src !== "string") return "";
  if (isS3Url(src)) {
    try {
      return new URL(src).pathname.replace(/^\//, "");
    } catch {
      return src.replace(S3_HOST_PATTERN, "").split("?")[0];
    }
  }
  if (isReecommCdnUrl(src)) {
    try {
      return new URL(src).pathname.replace(/^\//, "");
    } catch {
      return src.split("?")[0].replace(/^\//, "");
    }
  }
  if (!isHttpUrl(src) && !src.startsWith("/")) {
    return src.split("?")[0].replace(/^\//, "");
  }
  return "";
}

function encodeObjectKey(path) {
  if (!path) return "";
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
}

function getCdnImageUrl(source, options = {}) {
  if (source == null) return "";
  const src = String(source).trim();
  if (!src) return "";
  if (isHttpUrl(src) && !isS3Url(src) && !isReecommCdnUrl(src)) return src;

  const key = encodeObjectKey(extractObjectKey(src));
  if (!key) return src;

  const preset =
    options.preset && IMAGE_PRESETS[options.preset]
      ? IMAGE_PRESETS[options.preset]
      : null;
  const width = options.width != null ? options.width : preset?.width ?? 400;
  const quality =
    options.quality != null ? options.quality : preset?.quality ?? 70;

  return `${CDN_BASE}/${key}?tr=w-${width},q-${quality},f-auto`;
}

module.exports = { getCdnImageUrl, CDN_BASE, IMAGE_PRESETS };
