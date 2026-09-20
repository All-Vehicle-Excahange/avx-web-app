const WIDTH_BUCKETS = [320, 480, 640, 800, 1080, 1600];

function snapWidth(width) {
  const w = Number(width) || 640;
  for (const bucket of WIDTH_BUCKETS) {
    if (w <= bucket) return bucket;
  }
  return WIDTH_BUCKETS[WIDTH_BUCKETS.length - 1];
}

function isImageKitUrl(src) {
  if (!src || typeof src !== "string") return false;
  if (src.startsWith("/cdn-image/") || src.startsWith("/cdn-image?")) return true;
  try {
    const host = new URL(src).hostname;
    return (
      host === "image.reecomm.com" ||
      host.endsWith(".imagekit.io") ||
      host.includes("imagekit.io")
    );
  } catch {
    return false;
  }
}

/** Extract object path from S3 or ImageKit URL (strip query / tr=). */
function extractPath(src) {
  if (!src) return "";

  if (src.startsWith("/cdn-image/")) {
    return src.replace(/^\/cdn-image\//, "").split("?")[0];
  }

  const s3UrlPattern = /^https?:\/\/[^/]*s3[^/]*\.amazonaws\.com\//;
  if (s3UrlPattern.test(src)) {
    return src.replace(s3UrlPattern, "").split("?")[0];
  }

  if (isImageKitUrl(src) && (src.startsWith("http://") || src.startsWith("https://"))) {
    try {
      const url = new URL(src);
      // ik.imagekit.io/reecommKit/path → drop first path segment (id)
      const parts = url.pathname.replace(/^\//, "").split("/");
      if (url.hostname.endsWith("imagekit.io") && parts.length > 1) {
        return parts.slice(1).join("/");
      }
      // image.reecomm.com/path
      return parts.join("/");
    } catch {
      return src.split("?")[0];
    }
  }

  return src.split("?")[0];
}

function encodePath(path) {
  try {
    return encodeURI(decodeURIComponent(path));
  } catch {
    try {
      return encodeURI(decodeURI(path));
    } catch {
      return path;
    }
  }
}

export default function imageKitLoader({ src, width, quality }) {
  // Local /public assets — pass through (dummy w= for Next.js loader contract)
  if (src.startsWith("/") && !src.startsWith("/cdn-image/")) {
    return `${src}?w=${width}`;
  }

  const bucketedWidth = snapWidth(width);
  const s3UrlPattern = /^https?:\/\/[^/]*s3[^/]*\.amazonaws\.com\//;

  // Non-S3, non-ImageKit absolute URLs — leave alone
  if (
    (src.startsWith("http://") || src.startsWith("https://")) &&
    !s3UrlPattern.test(src) &&
    !isImageKitUrl(src)
  ) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  let path = extractPath(src);
  path = encodePath(path);

  const params = [`w-${bucketedWidth}`, `q-${quality || 75}`, "f-auto"];
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "/cdn-image";
  const cleanEndpoint = endpoint.replace(/\/$/, "");
  return `${cleanEndpoint}/${path}?tr=${params.join(",")}`;
}
