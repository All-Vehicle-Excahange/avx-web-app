import sharp from "sharp";

const UPSTREAM = (
  process.env.NEXT_PUBLIC_CDN_IMAGE_BASE || "https://image.reecomm.com"
).replace(/\/$/, "");

export const config = {
  api: {
    responseLimit: false,
  },
};

/**
 * Same-origin image proxy: fetch from AWS CDN (keeps tr= transforms),
 * then bake EXIF orientation into pixels with sharp.rotate().
 *
 * Chrome ignores EXIF for image.reecomm.com <img> URLs; after rotate()
 * the file is upright with Orientation=1.
 */
export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end("Method Not Allowed");
  }

  const parts = req.query.path;
  const path = Array.isArray(parts) ? parts.join("/") : String(parts || "");
  if (!path || path.includes("..") || path.startsWith("/")) {
    return res.status(400).end("Bad path");
  }

  const tr = typeof req.query.tr === "string" ? req.query.tr : "";
  const upstream = `${UPSTREAM}/${path}${tr ? `?tr=${tr}` : ""}`;

  try {
    const upstreamRes = await fetch(upstream, {
      headers: {
        Accept: "image/avif,image/webp,image/*,*/*",
        "User-Agent": "reecomm-cdn-orient/1.0",
      },
    });

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).end();
    }

    const incomingType = upstreamRes.headers.get("content-type") || "image/jpeg";
    const buf = Buffer.from(await upstreamRes.arrayBuffer());

    // sharp.rotate() with no args = apply EXIF orientation, then reset tag
    const pipeline = sharp(buf, { failOn: "none" }).rotate();

    let out;
    let outType;
    if (incomingType.includes("webp")) {
      out = await pipeline.webp({ quality: 80 }).toBuffer();
      outType = "image/webp";
    } else if (incomingType.includes("png")) {
      out = await pipeline.png().toBuffer();
      outType = "image/png";
    } else if (incomingType.includes("avif")) {
      out = await pipeline.avif({ quality: 65 }).toBuffer();
      outType = "image/avif";
    } else {
      out = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      outType = "image/jpeg";
    }

    res.setHeader("Content-Type", outType);
    res.setHeader(
      "Cache-Control",
      "public, max-age=31536000, stale-while-revalidate=86400, immutable",
    );
    res.setHeader("X-Reecomm-Orient", "1");
    if (req.method === "HEAD") {
      res.setHeader("Content-Length", String(out.length));
      return res.status(200).end();
    }
    return res.status(200).send(out);
  } catch (err) {
    console.error("[cdn-image] orient proxy failed", upstream, err);
    return res.status(502).end("Bad Gateway");
  }
}
