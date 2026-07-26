/**
 * Next.js Edge Middleware — Universal Vehicle Link Redirect
 *
 * Handles /c/{uuid}, /car/{uuid}, and /vehicle/details/{uuid} share links:
 *   - If opened on Web Browser (or app not installed):
 *       Fetches vehicle metadata to build slug and redirects to canonical web URL:
 *       /vehicle/details/{slug}/{uuid}
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

  const isShortRoute = (parts[0] === "c" || parts[0] === "car") && parts.length >= 2;
  const isUuidDetailsRoute = parts.length === 3 && parts[0] === "vehicle" && parts[1] === "details";

  if (isShortRoute || isUuidDetailsRoute) {
    const maybeId = isShortRoute ? parts[1] : parts[2];

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
        // Continue fallback below
      }

      // Fallback: If API fails, redirect to generic web details path
      const fallbackUrl = request.nextUrl.clone();
      fallbackUrl.pathname = `/vehicle/details/${maybeId}`;
      return NextResponse.redirect(fallbackUrl, { status: 302 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vehicle/details/:id*", "/car/:id*", "/c/:id*"],
};
