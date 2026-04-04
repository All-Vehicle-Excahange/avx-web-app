/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useRef, useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ReletedToSearch({ data, loading = false }) {
  const [cardData, setCardData] = useState(data || []);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setCardData(data || []);
  }, [data]);



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
          Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
        </p>
      </div>

      <div
        className="flex-1 min-h-0 mt-6 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-1">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={`skel-${i}`} className="lg:col-span-1 lg:row-span-1 h-full">
              <VehicleCardSkeleton />
            </div>
          ))
        ) : cardData.length === 0 ? (
          <div className="col-span-full flex justify-center py-16">
            <h3 className="text-lg font-semibold text-primary/40">
              No vehicles found
            </h3>
          </div>
        ) : (
          cardData.map((vehicle) => (
            <div key={vehicle.id} className="lg:col-span-1 lg:row-span-1 h-full">
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
