import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SeoInternalLinkHub({ vehicleOverview, vehicleSummary }) {
  if (!vehicleOverview) return null;

  const brand = vehicleOverview.makerName || "";
  const model = vehicleOverview.modelName || "";
  const year = vehicleOverview.yearOfMfg || vehicleOverview.year || "";
  const fuel = vehicleOverview.fuelType || "";
  const body = vehicleOverview.bodyType || "";
  const price = vehicleOverview.price || 0;

  const consultantUsername =
    vehicleOverview.consultantUsername ||
    vehicleOverview.vehicleOwner?.username ||
    vehicleOverview.username ||
    "";
  const consultantName =
    vehicleOverview.consultantName ||
    vehicleOverview.consultationName ||
    vehicleOverview.vehicleOwner?.consultationName ||
    "";

  const city = (
    vehicleSummary?.address?.city ||
    vehicleOverview?.vehicleAddress?.city ||
    vehicleOverview?.cityName ||
    vehicleOverview?.address?.city ||
    vehicleOverview?.location ||
    ""
  )
    .split(",")[0]
    .trim();

  const state = (
    vehicleSummary?.address?.state ||
    vehicleOverview?.vehicleAddress?.state ||
    vehicleOverview?.stateName ||
    vehicleOverview?.address?.state ||
    (vehicleOverview?.location && vehicleOverview.location.includes(",")
      ? vehicleOverview.location.split(",").pop().trim()
      : "") ||
    ""
  );

  const isTwoWheeler = String(vehicleOverview.vehicleType || "")
    .toUpperCase()
    .includes("TWO");
  const kindSlug = isTwoWheeler ? "two-wheelers" : "cars";
  const kindLabel = isTwoWheeler ? "Two Wheelers" : "Cars";

  const brandSlug = brand.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const modelSlug = model.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const citySlug = city.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const stateSlug = state.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const fuelSlug = fuel.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const bodySlug = body.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const priceLakhs = price ? Math.ceil(price / 100000) : 0;

  const links = [];

  // 1. Brand × City hub (priority for broad GEO SERPs, e.g. Used Toyota Cars in Ahmedabad)
  if (brandSlug && citySlug) {
    links.push({
      label: `Used ${brand} ${kindLabel} in ${city}`,
      href: `/search/buy-used-${brandSlug}-${kindSlug}-${citySlug}`,
    });
  }

  // 2. Brand + Model + City
  if (brandSlug && modelSlug && citySlug) {
    links.push({
      label: `Used ${brand} ${model} ${kindLabel} in ${city}`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-${kindSlug}-${citySlug}`,
    });
  }

  // 3. Brand + Model + State
  if (brandSlug && modelSlug && stateSlug && stateSlug !== citySlug) {
    links.push({
      label: `Used ${brand} ${model} ${kindLabel} in ${state}`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-${kindSlug}-${stateSlug}`,
    });
  }

  // 4. Brand + Model
  if (brandSlug && modelSlug) {
    links.push({
      label: `Used ${brand} ${model} ${kindLabel}`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-${kindSlug}`,
    });
  }

  // 5. Brand only
  if (brandSlug) {
    links.push({
      label: `Buy Used ${brand} ${kindLabel}`,
      href: `/search/buy-used-${brandSlug}-${kindSlug}`,
    });
  }

  // 6. Brand + State
  if (brandSlug && stateSlug && stateSlug !== citySlug) {
    links.push({
      label: `Used ${brand} ${kindLabel} in ${state}`,
      href: `/search/buy-used-${brandSlug}-${kindSlug}-${stateSlug}`,
    });
  }

  // City only
  if (citySlug) {
    links.push({
      label: `Used ${kindLabel} in ${city}`,
      href: `/search/buy-used-${kindSlug}-${citySlug}`,
    });
  }

  // Fuel / body / price — car inventory filters (skip noisy bike fuel labels)
  if (fuel && !isTwoWheeler) {
    links.push({
      label: `Used ${fuel} Cars`,
      href: `/search/buy-used-${fuelSlug}-cars`,
    });
  }

  if (body && !isTwoWheeler) {
    links.push({
      label: `Used ${body} Cars`,
      href: `/search/buy-used-${bodySlug}-cars`,
    });
  }

  if (priceLakhs > 0 && !isTwoWheeler) {
    links.push({
      label: `Used Cars under ₹${priceLakhs} Lakhs`,
      href: `/search/buy-used-cars-under-${priceLakhs}-lakhs`,
    });
  }

  // 9. Consultant storefront ↔ city GEO cross-link
  if (consultantUsername) {
    links.push({
      label: consultantName
        ? `${consultantName} storefront`
        : "Seller auto consultant",
      href: `/auto-consultant/${consultantUsername}`,
    });
  }

  // 10. Master hubs + buy guide (GEO pillars come from vehicle context above)
  links.push(
    { label: "Used Cars for Sale", href: "/search/buy-used-cars" },
    { label: "Used Bikes for Sale", href: "/search/buy-used-two-wheelers" },
    {
      label: "How to Buy a Used Car Safely",
      href: "/blog/how-to-buy-used-car-safely-india",
    }
  );

  // Filter out duplicates
  const uniqueLinks = Array.from(
    new Map(links.map((item) => [item.href, item])).values()
  );

  return (
    <section className="w-full rounded-2xl">
      <div className="flex flex-col gap-1.5 mb-5">
        <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
          Popular Searches
          <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
        </p>
        <h3 className="text-xl font-bold text-primary font-primary">
          Explore Related Pre-Owned Vehicles
        </h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {uniqueLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full text-primary border-2 border-third/30 hover:bg-third/10 transition-colors duration-300 ease-in-out group"
          >
            {link.label}
            <ArrowUpRight className="w-4 h-4 text-third/70 group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}
