import React from "react";
import Link from "next/link";

export default function SeoInternalLinkHub({ vehicleOverview, vehicleSummary }) {
  if (!vehicleOverview) return null;

  const brand = vehicleOverview.makerName || "";
  const model = vehicleOverview.modelName || "";
  const year = vehicleOverview.yearOfMfg || vehicleOverview.year || "";
  const fuel = vehicleOverview.fuelType || "";
  const body = vehicleOverview.bodyType || "";
  const price = vehicleOverview.price || 0;

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

  const brandSlug = brand.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const modelSlug = model.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const citySlug = city.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const stateSlug = state.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const fuelSlug = fuel.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  const bodySlug = body.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const priceLakhs = price ? Math.ceil(price / 100000) : 0;

  const links = [];

  // 1. Dynamic Brand + Model + City (e.g. Used Hyundai Creta Cars in Palanpur)
  if (brandSlug && modelSlug && citySlug) {
    links.push({
      label: `Used ${brand} ${model} Cars in ${city}`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-cars-${citySlug}`,
    });
  }

  // 2. Dynamic Brand + Model + State (e.g. Used Hyundai Creta Cars in Gujarat)
  if (brandSlug && modelSlug && stateSlug && stateSlug !== citySlug) {
    links.push({
      label: `Used ${brand} ${model} Cars in ${state}`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-cars-${stateSlug}`,
    });
  }

  // 3. Dynamic Brand + Model (e.g. Used Hyundai Creta Cars)
  if (brandSlug && modelSlug) {
    links.push({
      label: `Used ${brand} ${model} Cars`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-cars`,
    });
  }

  // 4. Dynamic Brand Only (e.g. Buy Used Hyundai Cars)
  if (brandSlug) {
    links.push({
      label: `Buy Used ${brand} Cars`,
      href: `/search/buy-used-${brandSlug}-cars`,
    });
  }

  // 5. Dynamic Brand + State (e.g. Used Hyundai Cars in Gujarat)
  if (brandSlug && stateSlug && stateSlug !== citySlug) {
    links.push({
      label: `Used ${brand} Cars in ${state}`,
      href: `/search/buy-used-${brandSlug}-cars-${stateSlug}`,
    });
  }

  // 6. Dynamic Brand + City (e.g. Used Hyundai Cars in Palanpur)
  if (brandSlug && citySlug) {
    links.push({
      label: `Used ${brand} Cars in ${city}`,
      href: `/search/buy-used-${brandSlug}-cars-${citySlug}`,
    });
  }

  // 5. Dynamic City Only
  if (citySlug) {
    links.push({
      label: `Used Cars in ${city}`,
      href: `/search/buy-used-cars-${citySlug}`,
    });
  }

  // 6. Dynamic Fuel Type
  if (fuel) {
    links.push({
      label: `Used ${fuel} Cars`,
      href: `/search/buy-used-cars?fuelType=${encodeURIComponent(fuel.toUpperCase())}`,
    });
  }

  // 7. Dynamic Body Type
  if (body) {
    links.push({
      label: `Used ${body} Cars`,
      href: `/search/buy-used-cars?bodyType=${encodeURIComponent(body.toUpperCase())}`,
    });
  }

  // 8. Dynamic Price Band
  if (priceLakhs > 0) {
    links.push({
      label: `Used Cars under ₹${priceLakhs} Lakhs`,
      href: `/search/buy-used-cars-under-${priceLakhs}-lakhs`,
    });
  }

  // 9. High Authority Master Pillar Links
  links.push(
    { label: "Browse All Used Cars", href: "/search/buy-used-cars" },
    { label: "Used Two Wheelers", href: "/search/buy-used-two-wheelers" },
    { label: "Used Cars in Ahmedabad", href: "/search/buy-used-cars-ahmedabad" },
    { label: "Used Cars in Surat", href: "/search/buy-used-cars-surat" },
    { label: "Used Cars in Palanpur", href: "/search/buy-used-cars-palanpur" }
  );

  // Filter out duplicates
  const uniqueLinks = Array.from(
    new Map(links.map((item) => [item.href, item])).values()
  );

  return (
    <section className="w-full mt-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-xs">
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-fourth">
          Popular Searches
        </span>
        <h3 className="text-lg font-bold text-gray-900 font-primary">
          Explore Related Pre-Owned Vehicles
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {uniqueLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 hover:bg-fourth/10 hover:text-fourth border border-gray-200/60 transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
