/**
 * Next.js Edge Middleware — Vehicle share link & App Store redirect
 *
 * 1. Handles /car/{id}:
 *    - If opened on mobile browser (App Not Installed):
 *        • Android -> Play Store search for "reecomm"
 *        • iOS -> App Store search for "reecomm"
 *        • Desktop -> Web vehicle details page
 *
 * 2. Handles /vehicle/details/{uuid}:
 *    - Redirects UUID-only share link to canonical /vehicle/details/{slug}/{uuid}
 */

import { NextResponse } from "next/server";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return NextResponse.next();

  const userAgent = request.headers.get("user-agent") || "";
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);

  // Handle /car/{id} share links when opened in browser (App NOT Installed)
  if (parts[0] === "car" && parts.length >= 2) {
    if (isAndroid) {
      return NextResponse.redirect(
        "https://play.google.com/store/search?q=reecomm&c=apps",
        { status: 302 }
      );
    }
    if (isIOS) {
      return NextResponse.redirect(
        "https://apps.apple.com/us/search?term=reecomm",
        { status: 302 }
      );
    }
    // Desktop browser fallback
    const webUrl = request.nextUrl.clone();
    webUrl.pathname = `/vehicle/details/${parts[1]}`;
    return NextResponse.redirect(webUrl, { status: 302 });
  }

  // Handle /vehicle/details/{uuid} UUID-only redirects
  if (parts.length === 3 && parts[0] === "vehicle" && parts[1] === "details") {
    const maybeId = parts[2];
    if (UUID_REGEX.test(maybeId)) {
      try {
        const backendUrl =
          process.env.BACKEND_URL || "https://api.reecomm.online";

        const res = await fetch(
          `${backendUrl}/api/v1/website/vehicle/detail-page/${maybeId}`,
          {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined,
          }
        );

        if (res.ok) {
          const json = await res.json();
          const vehicle = json?.data;
          if (vehicle?.id) {
            const slug = buildVehicleSlug(vehicle) || "vehicle";
            const canonicalUrl = request.nextUrl.clone();
            canonicalUrl.pathname = `/vehicle/details/${slug}/${maybeId}`;
            return NextResponse.redirect(canonicalUrl, { status: 301 });
          }
        }
      } catch {
        // Continue naturally
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vehicle/details/:id*", "/car/:id*"],
};
