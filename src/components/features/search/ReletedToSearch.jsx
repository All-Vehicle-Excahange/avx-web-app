/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useRef, useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { getTopPicsFour, getTopPicsTwo, getUserHomeFeed } from "@/services/user.service";
import CommonSwiper from "@/components/ui/CommonSwiper";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ReletedToSearch({ data }) {
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
          <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
        </p>

        <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
          <span className="text-fourth"> Top Related</span> to Your Search
        </h2>

        <p className="text-third mt-1">
          Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
        </p>
      </div>

      <div
        className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-1">
        {cardData.map((vehicle) => (
          <div key={vehicle.id} className="lg:col-span-1 lg:row-span-1 h-full">
            <VehicleCard data={vehicle} source="home" />
          </div>
        ))}
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
