"use client";
import React from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { useSearchParams } from "next/navigation";
import { MAKER_NAME_MAPPING } from "@/data/makers";

// // --- Utility for Tailwind classes ---
// const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ReletedToSearch({ data, loading = false }) {
  const cardData = data || [];
  const searchParams = useSearchParams();
  const brandParam = searchParams?.get("brand");
  const modelParam = searchParams?.get("model");

  const resolvedBrandName = MAKER_NAME_MAPPING?.[brandParam] || brandParam;
  const searchContext = [resolvedBrandName, modelParam].filter(Boolean).join(" ");
  
  const title = searchContext 
    ? `No related vehicles found for ${searchContext}` 
    : "No related vehicles found";

  return (
    <div className="">
      <div className="flex flex-col items-start gap-2">
        <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
          Top Related
          <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
        </p>

        <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
          <span className="text-fourth"> Top Related</span> to Your Search
        </h2>

        <p className="text-third">
          Listings similar to what you&apos;re looking for — verified,
          inspected, and ready to view.
        </p>
      </div>

      <div className="flex-1 min-h-0 mt-6 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-1">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={`skel-${i}`}
              className="lg:col-span-1 lg:row-span-1 h-full"
            >
              <VehicleCardSkeleton />
            </div>
          ))
        ) : cardData.length === 0 ? (
          <EmptyState
            title={title}
            description="We are actively sourcing more vehicles that match your preferences. Please check back later."
          />
        ) : (
          cardData.map((vehicle) => (
            <div
              key={vehicle.id}
              className="lg:col-span-1 lg:row-span-1 h-full"
            >
              <VehicleCard data={vehicle} source="home" />
            </div>
          ))
        )}
      </div>

      {/* Common Swiper */}
      {/* <CommonSwiper
        data={cardData}
        CardComponent={VehicleCard}
        prevRef={prevRef}
        nextRef={nextRef}
      /> */}
    </div>
  );
}
