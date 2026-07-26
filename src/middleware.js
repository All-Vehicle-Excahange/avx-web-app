/**
 * Next.js Edge Middleware — Vehicle UUID-only share link redirect
 *
 * Problem:
 *   The mobile app shares links as:
 *     https://www.reecomm.com/vehicle/details/{uuid}
 *   But the canonical web page lives at:
 *     https://www.reecomm.com/vehicle/details/{slug}/{uuid}
 *
 * Solution:
 *   This middleware intercepts requests at /vehicle/details/{uuid},
 *   detects the UUID-only pattern, fetches the vehicle from the backend
 *   to build the slug, and issues a 308 redirect to the canonical URL.
 *
 *   Using middleware instead of a page route avoids the Next.js conflict
 *   between having a dynamic [id] file and a dynamic [title] directory
 *   at the same path depth.
 *
 * NOTE: Middleware runs on the Edge Runtime — keep dependencies minimal.
 */

import { NextResponse } from "next/server";

// Matches: /vehicle/details/{uuid}  (exactly 3 path segments, last is UUID)
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Build a slug from the vehicle API response — mirrors generateVehicleSlug in helper.js */
function buildVehicleSlug(v) {
  const toSlug = (s) =>
    (s || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const brand = toSlug(v.makerName || "");
  const model = toSlug(v.modelName || "");
  const year = v.yearOfMfg || v.year || "";
  const city = toSlug(
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
  const kind =
    (v.vehicleType || "").toUpperCase().includes("TWO")
      ? "two-wheelers"
      : "cars";

  return `buy-used-${brand}-${model}-${year}-${kind}-${city}`
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only intercept /vehicle/details/{something} where {something} is a UUID.
  // Paths like /vehicle/details/{slug}/{uuid} already have 4 segments — skip them.
  const parts = pathname.split("/").filter(Boolean);
  // Expected: ['vehicle', 'details', '{uuid}']
  if (parts.length !== 3) return NextResponse.next();
  if (parts[0] !== "vehicle" || parts[1] !== "details") return NextResponse.next();

  const maybeId = parts[2];
  if (!UUID_REGEX.test(maybeId)) return NextResponse.next();

  // It's a UUID-only vehicle URL — redirect to canonical slug URL
  try {
    const backendUrl =
      process.env.BACKEND_URL || "https://api.reecomm.online";

    const res = await fetch(
      `${backendUrl}/api/v1/website/vehicle/detail-page/${maybeId}`,
      {
        headers: { Accept: "application/json" },
        // Edge has no AbortSignal.timeout in all runtimes — use signal manually
        signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined,
      }
    );

    if (!res.ok) return NextResponse.next();

    const json = await res.json();
    const vehicle = json?.data;

    if (!vehicle?.id) return NextResponse.next();

    const slug = buildVehicleSlug(vehicle) || "vehicle";

    // 301 = permanent — crawlers update their index to the canonical URL
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.pathname = `/vehicle/details/${slug}/${maybeId}`;

    return NextResponse.redirect(canonicalUrl, { status: 301 });
  } catch {
    // API error / timeout — let Next.js serve a 404 naturally
    return NextResponse.next();
  }
}

export const config = {
  // Run only on vehicle detail paths — avoids touching any other routes
  matcher: ["/vehicle/details/:id*"],
};
