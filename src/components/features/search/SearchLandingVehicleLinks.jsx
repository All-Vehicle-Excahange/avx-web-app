import React from "react";
import Link from "next/link";

function formatPrice(price) {
  if (price == null || price === "") return "";
  const num = Number(price);
  if (Number.isNaN(num)) return String(price);
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2).replace(/\.00$/, "")}L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

/**
 * Server-rendered crawlable links to individual vehicle detail pages.
 * Helps Google discover VDPs from city/brand search landing pages.
 */
export default function SearchLandingVehicleLinks({
  vehicles = [],
  cityName = "",
  heading = "Browse listings",
}) {
  if (!vehicles.length) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-6 border-t border-gray-100">
      <h2 className="text-base md:text-lg font-bold text-primary font-primary mb-3">
        {heading}
        {cityName ? ` in ${cityName}` : ""}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {vehicles.map((v) => {
          const name =
            `${v.yearOfMfg || v.year || ""} ${v.makerName || v.makeName || ""} ${v.modelName || ""}`.trim() ||
            "Used Vehicle";
          const href =
            v.slug && v.id
              ? `/vehicle/details/${v.slug}/${v.id}`
              : `/vehicle/details/${v.id}`;
          const priceLabel = formatPrice(v.price);

          return (
            <li key={v.id || href}>
              <Link
                href={href}
                className="text-sm text-primary hover:text-fourth underline-offset-2 hover:underline block truncate"
              >
                {name}
                {priceLabel ? ` — ${priceLabel}` : ""}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
