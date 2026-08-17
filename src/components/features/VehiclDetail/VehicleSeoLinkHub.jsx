import React from "react";
import Link from "next/link";
import { Tag, MapPin, Car, Store, ChevronRight } from "lucide-react";

export default function VehicleSeoLinkHub({ vehicleOverview }) {
  if (!vehicleOverview) return null;

  const brand = vehicleOverview.makerName || "";
  const model = vehicleOverview.modelName || "";
  const city = (
    vehicleOverview.cityName ||
    vehicleOverview.address?.city ||
    vehicleOverview.location ||
    ""
  )
    .split(",")[0]
    .trim();
  const state = (vehicleOverview.stateName || vehicleOverview.address?.state || "").trim();
  const consultantUsername =
    vehicleOverview.consultantUsername ||
    vehicleOverview.consultantSlug ||
    vehicleOverview.vehicleOwner?.username ||
    vehicleOverview.username;
  const consultantName = vehicleOverview.consultantName || vehicleOverview.sellerName;

  const toSlug = (s) =>
    (s || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const brandSlug = toSlug(brand);
  const modelSlug = toSlug(model);
  const citySlug = toSlug(city);
  const stateSlug = toSlug(state);

  const links = [];

  if (brand && city) {
    links.push({
      label: `Used ${brand} Cars in ${city}`,
      href: `/search/buy-used-${brandSlug}-cars-${citySlug}`,
      icon: MapPin,
    });
  }

  if (brand && model) {
    links.push({
      label: `Used ${brand} ${model} Cars`,
      href: `/search/buy-used-${brandSlug}-${modelSlug}-cars`,
      icon: Car,
    });
  }

  if (city) {
    links.push({
      label: `All Used Cars in ${city}`,
      href: `/search/buy-used-cars-${citySlug}`,
      icon: MapPin,
    });
  }

  if (state) {
    links.push({
      label: `Used Cars in ${state}`,
      href: `/search/buy-used-cars-${stateSlug}`,
      icon: MapPin,
    });
  }

  if (brand) {
    links.push({
      label: `All Used ${brand} Cars`,
      href: `/search/buy-used-${brandSlug}-cars`,
      icon: Tag,
    });
  }

  if (consultantUsername) {
    links.push({
      label: `View ${consultantName || "Consultant"}'s Showroom`,
      href: `/auto-consultant/${consultantUsername}`,
      icon: Store,
    });
  }

  if (links.length === 0) return null;

  return (
    <div className="w-full bg-neutral-900 border-t border-neutral-800 py-8 my-8 text-neutral-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-fourth" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Related SEO Keyword Links
          </h3>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={idx}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-fourth/20 hover:text-fourth border border-neutral-700/60 text-xs font-medium text-gray-300 transition-all group"
              >
                <Icon className="w-3.5 h-3.5 text-fourth/80 group-hover:text-fourth" />
                <span>{link.label}</span>
                <ChevronRight className="w-3 h-3 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
