"use client";

import Link from "next/link";
import { Car, MapPin, Search, ChevronRight } from "lucide-react";

export default function ZeroInventoryFallback({
  brandName,
  modelName,
  cityName,
  stateName,
  vehicleType = "cars",
  fuelType,
  bodyType,
}) {
  const displayBrand = brandName || "";
  const displayModel = modelName || "";
  const displayLocation = cityName || stateName || "";
  const vehicleLabel = vehicleType === "two-wheelers" ? "two-wheelers" : "cars";

  return (
    <div className="w-full bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm my-6">
      {/* HEADER NOTICE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-primary/10 pb-6 mb-6">
        <div className="w-12 h-12 rounded-xl bg-fourth flex items-center justify-center text-secondary shrink-0">
          <Car size={24} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-primary">
            No {displayBrand} {displayModel} {vehicleLabel} currently listed{displayLocation ? ` in ${displayLocation}` : ""}
          </h2>
          <p className="text-sm text-primary/70 mt-1">
            Listings change daily! In the meantime, explore available vehicles nearby or browse related categories below.
          </p>
        </div>
      </div>

      {/* QUICK SUGGESTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* CARD 1: STATE / REGIONAL SEARCH */}
        {stateName && (
          <Link
            href={`/search/buy-used-${vehicleLabel}-${stateName.toLowerCase().replace(/\s+/g, "-")}`}
            className="group p-4 rounded-xl bg-fourth/50 border border-primary/10 hover:border-secondary/40 hover:bg-fourth transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                <MapPin size={12} /> Regional Inventory
              </div>
              <h3 className="font-bold text-primary text-sm group-hover:text-secondary transition-colors">
                Used {vehicleLabel === "two-wheelers" ? "Two-Wheelers" : "Cars"} in {stateName}
              </h3>
              <p className="text-xs text-primary/60 mt-1">
                Explore all verified listings across {stateName}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-secondary mt-3 group-hover:translate-x-1 transition-transform">
              Browse State Vehicles <ChevronRight size={14} />
            </div>
          </Link>
        )}

        {/* CARD 2: BRAND VEHICLES ACROSS INDIA */}
        {displayBrand && (
          <Link
            href={`/search/buy-used-${displayBrand.toLowerCase().replace(/\s+/g, "-")}-${vehicleLabel}`}
            className="group p-4 rounded-xl bg-fourth/50 border border-primary/10 hover:border-secondary/40 hover:bg-fourth transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                <Car size={12} /> All Brand Inventory
              </div>
              <h3 className="font-bold text-primary text-sm group-hover:text-secondary transition-colors">
                All Used {displayBrand} {vehicleLabel === "two-wheelers" ? "Two-Wheelers" : "Cars"}
              </h3>
              <p className="text-xs text-primary/60 mt-1">
                View all available {displayBrand} vehicles on Reecomm
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-secondary mt-3 group-hover:translate-x-1 transition-transform">
              Browse {displayBrand} Cars <ChevronRight size={14} />
            </div>
          </Link>
        )}

        {/* CARD 3: CITY ALL CARS */}
        {cityName && (
          <Link
            href={`/search/buy-used-${vehicleLabel}-${cityName.toLowerCase().replace(/\s+/g, "-")}`}
            className="group p-4 rounded-xl bg-fourth/50 border border-primary/10 hover:border-secondary/40 hover:bg-fourth transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
                <Search size={12} /> Local City Cars
              </div>
              <h3 className="font-bold text-primary text-sm group-hover:text-secondary transition-colors">
                All Used Vehicles in {cityName}
              </h3>
              <p className="text-xs text-primary/60 mt-1">
                See all active certified cars listed in {cityName}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-secondary mt-3 group-hover:translate-x-1 transition-transform">
              View {cityName} Inventory <ChevronRight size={14} />
            </div>
          </Link>
        )}
      </div>

      {/* POPULAR CATEGORY QUICK LINKS */}
      <div className="pt-4 border-t border-primary/10">
        <h4 className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-3">
          Popular Search Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/search/buy-used-suv-cars"
            className="px-3 py-1.5 rounded-lg bg-fourth hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
          >
            Used SUVs
          </Link>
          <Link
            href="/search/buy-used-sedan-cars"
            className="px-3 py-1.5 rounded-lg bg-fourth hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
          >
            Used Sedans
          </Link>
          <Link
            href="/search/buy-used-hatchback-cars"
            className="px-3 py-1.5 rounded-lg bg-fourth hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
          >
            Used Hatchbacks
          </Link>
          <Link
            href="/search/buy-used-cars-under-5-lakhs"
            className="px-3 py-1.5 rounded-lg bg-fourth hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
          >
            Cars Under ₹5 Lakhs
          </Link>
          <Link
            href="/search/buy-used-electric-cars"
            className="px-3 py-1.5 rounded-lg bg-fourth hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
          >
            Electric Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
}
