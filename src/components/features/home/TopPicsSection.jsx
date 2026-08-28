import React, { useState } from "react";
import { motion } from "framer-motion";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTopPicsQuery } from "@/queries/user.queries";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function TopPicsSection() {
  const [activeType, setActiveType] = useState("4-Wheeler");
  const hasManuallySelected = React.useRef(false);
  const checkedFourWheelerEmpty = React.useRef(false);

  const queryPayload = {
    pageNo: 1,
    size: 4,
  };

  const { data: cardData = [], isLoading } = useQuery(
    getTopPicsQuery(activeType, queryPayload),
  );

  React.useEffect(() => {
    if (hasManuallySelected.current) return;
    if (!isLoading && (!Array.isArray(cardData) || cardData.length === 0) && activeType === "4-Wheeler") {
      checkedFourWheelerEmpty.current = true;
      setActiveType("2-Wheeler");
    }
  }, [cardData, isLoading, activeType]);

  if (
    !isLoading &&
    (!Array.isArray(cardData) || cardData.length === 0) &&
    activeType === "2-Wheeler" &&
    checkedFourWheelerEmpty.current &&
    !hasManuallySelected.current
  ) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col  text-primary">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Top Picks
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth"> Top picks</span> Vehicle For You
          </h2>

          <p className="text-third w-full max-w-2xl">
            Handpicked verified vehicles across all India — updated every day.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex p-0.5 bg-neutral-950/80 border border-white/10 rounded-full w-fit mt-auto ml-auto sm:ml-0 shrink-0">
          <button
            onClick={() => {
              hasManuallySelected.current = true;
              setActiveType("4-Wheeler");
            }}
            className={cn(
              "relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
              activeType === "4-Wheeler"
                ? "text-white shadow-md"
                : "text-third hover:text-primary",
            )}
          >
            {activeType === "4-Wheeler" && (
              <motion.div
                layoutId="topPicsTabBg"
                className="absolute inset-0 bg-fourth rounded-full"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5"><Car size={18} /> 4-Wheeler</span>
          </button>
          <button
            onClick={() => {
              hasManuallySelected.current = true;
              setActiveType("2-Wheeler");
            }}
            className={cn(
              "relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
              activeType === "2-Wheeler"
                ? "text-white shadow-md"
                : "text-third hover:text-primary",
            )}
          >
            {activeType === "2-Wheeler" && (
              <motion.div
                layoutId="topPicsTabBg"
                className="absolute inset-0 bg-fourth rounded-full"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5"><Bike size={18} /> 2-Wheeler</span>
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-1">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={`skel-${i}`}
              className="lg:col-span-1 lg:row-span-1 h-full"
            >
              <VehicleCardSkeleton />
            </div>
          ))
        ) : cardData.length === 0 ? (
          <div className="col-span-full flex justify-center py-16">
            <h3 className="text-lg font-semibold text-primary/40">
              No Vehicles Found
            </h3>
          </div>
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

      {cardData.length >= 4 && (
        <div className="mt-8 flex justify-end">
          <Button href={`/search?vehicleType=${activeType}`} variant="outlineAnimated" size="md">
            Explore All Vehicles
          </Button>
        </div>
      )}
    </div>
  );
}
