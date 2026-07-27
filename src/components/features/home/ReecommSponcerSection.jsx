import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAddRecomandedVehicle } from "@/services/ppc.service";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ReecommSponcerSection() {
  const [activeType, setActiveType] = useState("4-Wheeler");

  const mappedVehicleType =
    activeType === "4-Wheeler" ? "FOUR_WHEELER" : "TWO_WHEELER";

  const adParams = useMemo(
    () => ({
      placement: "HOMEPAGE_FEATURED",
      vehicleType: mappedVehicleType,
      page: 0,
      size: 10,
    }),
    [mappedVehicleType],
  );

  const { data: recommendedAdsData, isLoading: isAdsLoading } = useQuery({
    queryKey: ["homepage-featured-ads", adParams],
    queryFn: async () => {
      const res = await getAddRecomandedVehicle(adParams);
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });

  const cardData = useMemo(() => {
    const list = recommendedAdsData?.data?.content || recommendedAdsData?.data || [];
    return (Array.isArray(list) ? list : []).map((item) => ({
      ...item.vehicle,
      sponsored: item.sponsored,
      adId: item.adId,
      billingType: item.billingType,
      placement: item.placement,
    }));
  }, [recommendedAdsData]);

  const showSkeleton = isAdsLoading;

  if (!isAdsLoading && (!Array.isArray(cardData) || cardData.length === 0)) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col  text-primary">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Trending
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth"> Trending</span> Vehicles For You
          </h2>

          <p className="text-third w-full max-w-2xl">
            Trending vehicles across all India — updated every day.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex p-0.5 bg-neutral-950/80 border border-white/10 rounded-full w-fit mt-auto ml-auto sm:ml-0 shrink-0">
          <button
            onClick={() => setActiveType("4-Wheeler")}
            className={cn(
              "relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
              activeType === "4-Wheeler"
                ? "text-white shadow-md"
                : "text-third hover:text-primary",
            )}
          >
            {activeType === "4-Wheeler" && (
              <motion.div
                layoutId="sponcerTabBg"
                className="absolute inset-0 bg-fourth rounded-full"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5"><Car size={18} /> 4-Wheeler</span>
          </button>
          <button
            onClick={() => setActiveType("2-Wheeler")}
            className={cn(
              "relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
              activeType === "2-Wheeler"
                ? "text-white shadow-md"
                : "text-third hover:text-primary",
            )}
          >
            {activeType === "2-Wheeler" && (
              <motion.div
                layoutId="sponcerTabBg"
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
        {showSkeleton ? (
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
              No data found
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
          <Button href="/search" variant="outlineAnimated" size="md">
            Explore All Vehicles
          </Button>
        </div>
      )}
    </div>
  );
}
