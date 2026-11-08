import React from "react";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { formatVehicleListingLine } from "@/lib/searchLandingSeo";
import { getCdnImageUrl } from "@/lib/cdnImage";

/**
 * Server-rendered crawlable links (+ thumbs) to individual vehicle detail pages.
 * Helps Google discover VDPs and Images from city/brand search landing pages.
 */
export default function SearchLandingVehicleLinks({
  vehicles = [],
  cityName = "",
  heading = "Cars available",
}) {
  if (!vehicles.length) return null;

  const featured = vehicles.slice(0, 6);

  return (
    <section className="container mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="border-t border-primary/10 pt-8">
        <h2 className="text-base md:text-lg font-bold text-primary font-primary mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-fourth rounded-full inline-block"></span>
          {heading}
          {cityName ? ` in ${cityName}` : ""}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {featured.map((v) => {
            const label = formatVehicleListingLine(v);
            const href =
              v.slug && v.id
                ? `/vehicle/details/${v.slug}/${v.id}`
                : `/vehicle/details/${v.id}`;
            const rawImg =
              v.thumbnailUrl ||
              v.imageUrl ||
              (Array.isArray(v.vehiclePhotos)
                ? v.vehiclePhotos[0]?.url || v.vehiclePhotos[0]?.photoUrl
                : null) ||
              null;
            const imgSrc = rawImg
              ? getCdnImageUrl(rawImg, { preset: "thumb" }) || rawImg
              : null;
            const alt = `${label}${cityName ? ` in ${cityName}` : ""} | Reecomm`;

            return (
              <li key={v.id || href}>
                <NoPrefetchLink
                  href={href}
                  className="group flex items-start gap-3 py-1.5 text-primary hover:text-fourth transition-colors"
                >
                  {imgSrc ? (
                    <span className="relative w-16 h-12 shrink-0 rounded overflow-hidden bg-black/20 border border-primary/10">
                      <Image
                        src={imgSrc}
                        alt={alt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
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
                  )}
                  <span className="text-sm font-semibold leading-snug pt-0.5">
                    {label}
                  </span>
                </NoPrefetchLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
