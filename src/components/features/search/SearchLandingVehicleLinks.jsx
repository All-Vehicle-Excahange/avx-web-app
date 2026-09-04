import React from "react";
import Link from "next/link";
import { formatVehicleListingLine } from "@/lib/searchLandingSeo";

/**
 * Server-rendered crawlable links to individual vehicle detail pages.
 * Helps Google discover VDPs from city/brand search landing pages.
 */
export default function SearchLandingVehicleLinks({
  vehicles = [],
  cityName = "",
  heading = "Cars available",
}) {
  if (!vehicles.length) return null;

  return (
    <section className="container mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="border-t border-primary/10 pt-8">
        <h2 className="text-base md:text-lg font-bold text-primary font-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-fourth rounded-full inline-block"></span>
          {heading}
          {cityName ? ` in ${cityName}` : ""}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {vehicles.map((v) => {
            const label = formatVehicleListingLine(v);
            const href =
              v.slug && v.id
                ? `/vehicle/details/${v.slug}/${v.id}`
                : `/vehicle/details/${v.id}`;

            return (
              <li key={v.id || href}>
                <Link
                  href={href}
                  className="group flex items-start gap-2 py-1.5 text-primary hover:text-fourth transition-colors"
                >
                  <svg
                    className="w-4 h-4 mt-0.5 text-third/70 flex-shrink-0 group-hover:text-fourth group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-snug">
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
