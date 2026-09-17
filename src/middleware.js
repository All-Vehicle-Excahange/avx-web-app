/**
 * Next.js Edge Middleware — Universal Vehicle Link Redirect
 *
 * Handles /c/{id}, /car/{id}, /vehicle/details/{uuid}, and
 * /vehicle/details/{slug}/{uuid} (canonical slug enforcement):
 *   Fetches vehicle metadata, builds canonical slug, 301 to:
 *   /vehicle/details/{slug}/{id}
 *
 * Slug rule (must match src/lib/vehicleSlug.js):
 *   town present → {town}-{city}; else {city}
 */

import { NextResponse } from "next/server";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function slugifyPart(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildVehicleSlug(v) {
  const brand = slugifyPart(v.makerName || v.makeName || "");
  const model = slugifyPart(v.modelName || "");
  const year = v.yearOfMfg || v.year || "";
  const city = slugifyPart(
    (
      v.vehicleAddress?.city ||
      v.cityName ||
      v.city ||
      v.address?.city ||
      v.location ||
      ""
    )
      .split(",")[0]
      .trim()
  );
  const town = slugifyPart(
    (
      v.vehicleAddress?.town ||
      v.townName ||
      v.town ||
      v.address?.town ||
      ""
    )
      .split(",")[0]
      .trim()
  );
  const location =
    town && city && town !== city ? `${town}-${city}` : city || town || "";
  const kind = (v.vehicleType || "").toUpperCase().includes("TWO")
    ? "two-wheelers"
    : "cars";

  return `buy-used-${brand}-${model}-${year}-${kind}-${location}`
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchVehicle(id) {
  const backendUrl = process.env.BACKEND_URL || "https://api.reecomm.online";
  const res = await fetch(
    `${backendUrl}/api/v1/website/vehicle/detail-page/${id}`,
    {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined,
    }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data || null;
}

function redirectToCanonical(request, pathname, vehicle) {
  const slug = buildVehicleSlug(vehicle) || "vehicle";
  const canonicalPath = `/vehicle/details/${slug}/${vehicle.id}`;
  if (canonicalPath === pathname) return null;
  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.pathname = canonicalPath;
  return NextResponse.redirect(canonicalUrl, { status: 301 });
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return NextResponse.next();

  // ── 1. Virtual Rewrite for 3-Segment Consultant URLs ─────────────────────
  // /vehicle/details/{consultant-username}/{slug}/{id} -> /vehicle/details/{slug}/{id}
  // then canonicalize the slug via the same UUID path handling below.
  if (parts.length === 5 && parts[0] === "vehicle" && parts[1] === "details") {
    const consultantUsername = parts[2];
    const slug = parts[3];
    const id = parts[4];

    if (UUID_REGEX.test(id) || id.length > 5) {
      try {
        const vehicle = await fetchVehicle(id);
        if (vehicle?.id) {
          const slugCanon = buildVehicleSlug(vehicle) || "vehicle";
          const canonicalPath = `/vehicle/details/${slugCanon}/${vehicle.id}`;
          if (canonicalPath !== `/vehicle/details/${slug}/${id}`) {
            const canonicalUrl = request.nextUrl.clone();
            canonicalUrl.pathname = canonicalPath;
            canonicalUrl.searchParams.set(
              "consultantUsername",
              consultantUsername
            );
            return NextResponse.redirect(canonicalUrl, { status: 301 });
          }
        }
      } catch {
        /* fall through to rewrite */
      }

      const targetUrl = new URL(`/vehicle/details/${slug}/${id}`, request.url);
      targetUrl.searchParams.set("consultantUsername", consultantUsername);
      return NextResponse.rewrite(targetUrl);
    }
  }

  const isShortRoute =
    (parts[0] === "c" || parts[0] === "car") && parts.length >= 2;
  const isUuidDetailsRoute =
    parts.length === 3 &&
    parts[0] === "vehicle" &&
    parts[1] === "details" &&
    UUID_REGEX.test(parts[2]);
  const isSlugDetailsRoute =
    parts.length === 4 &&
    parts[0] === "vehicle" &&
    parts[1] === "details" &&
    UUID_REGEX.test(parts[3]);

  if (isShortRoute || isUuidDetailsRoute || isSlugDetailsRoute) {
    const maybeId = isShortRoute
      ? parts[1]
      : isUuidDetailsRoute
        ? parts[2]
        : parts[3];

    if (UUID_REGEX.test(maybeId)) {
      try {
        const vehicle = await fetchVehicle(maybeId);
        if (vehicle?.id) {
          const redirect = redirectToCanonical(request, pathname, vehicle);
          if (redirect) return redirect;
          return NextResponse.next();
        }
      } catch {
        // Continue fallback below
      }

      // Safe fallback for short links only
      if (isShortRoute) {
        const targetPath = `/vehicle/details/${maybeId}`;
        if (pathname !== targetPath) {
          const fallbackUrl = request.nextUrl.clone();
          fallbackUrl.pathname = targetPath;
          return NextResponse.redirect(fallbackUrl, { status: 302 });
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vehicle/details/:path*", "/car/:id*", "/c/:id*"],
};
