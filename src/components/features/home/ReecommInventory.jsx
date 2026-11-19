"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ReecommInventoryCard from "@/components/ui/const/ReecommInventoryCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAvxTierVehiclesQuery } from "@/queries/user.queries";
import { useLocationStore } from "@/stores/useLocationStore";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ReecommInventory() {
  const { cityId, stateId } = useLocationStore();

  const queryPayload = useMemo(
    () => ({
      pageNo: 1,
      size: 8,
      ...(cityId ? { cityId } : {}),
      ...(stateId ? { stateId } : {}),
    }),
    [cityId, stateId]
  );

  // Fetch dedicated AVX tier (Reecomm Inventory) vehicles for both types
  const { data: fourWheelerData = [], isLoading: fourLoading } = useQuery(
    getAvxTierVehiclesQuery("4-Wheeler", queryPayload)
  );

  const { data: twoWheelerData = [], isLoading: twoLoading } = useQuery(
    getAvxTierVehiclesQuery("2-Wheeler", queryPayload)
  );

  const fourWheelerVehicles = useMemo(() => {
    return Array.isArray(fourWheelerData)
      ? fourWheelerData
      : fourWheelerData?.elements || fourWheelerData?.content || [];
  }, [fourWheelerData]);

  const twoWheelerVehicles = useMemo(() => {
    return Array.isArray(twoWheelerData)
      ? twoWheelerData
      : twoWheelerData?.elements || twoWheelerData?.content || [];
  }, [twoWheelerData]);

  const [userSelectedType, setUserSelectedType] = useState(null);

  const activeType = useMemo(() => {
    if (userSelectedType) return userSelectedType;
    if (fourWheelerVehicles.length > 0) return "4-Wheeler";
    if (twoWheelerVehicles.length > 0) return "2-Wheeler";
    return "4-Wheeler";
  }, [userSelectedType, fourWheelerVehicles.length, twoWheelerVehicles.length]);

  const displayVehicles = useMemo(() => {
    const list = activeType === "2-Wheeler" ? twoWheelerVehicles : fourWheelerVehicles;
    return list.slice(0, 4);
  }, [activeType, twoWheelerVehicles, fourWheelerVehicles]);

  const totalCount = fourWheelerVehicles.length + twoWheelerVehicles.length;
  const isLoading = activeType === "2-Wheeler" ? twoLoading : fourLoading;

  // If queries finished loading and there is NO data in either category, hide the entire section!
  if (!fourLoading && !twoLoading && totalCount === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col text-primary pt-6 sm:pt-8 md:pt-10">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-6 gap-6">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Reecomm Online
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-fourth to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fourth to-blue-600">
              Reecomm
            </span>{" "}
            Online
          </h2>

          <p className="text-third">
            Certified pre-owned vehicles directly inspected and verified by Reecomm.
          </p>
        </div>

        {/* 4-Wheeler / 2-Wheeler Toggle (shown when both types have vehicles or during initial load) */}
        {(fourLoading || twoLoading || (fourWheelerVehicles.length > 0 && twoWheelerVehicles.length > 0)) && (
          <div className="flex p-0.5 bg-neutral-950/80 border border-fourth/20 rounded-full w-fit mt-auto ml-auto sm:ml-0 shrink-0">
            <button
              type="button"
              onClick={() => setUserSelectedType("4-Wheeler")}
              className={cn(
                "relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
                activeType === "4-Wheeler"
                  ? "text-white shadow-md"
                  : "text-third hover:text-primary"
              )}
            >
              {activeType === "4-Wheeler" && (
                <motion.div
                  layoutId="reecommInventoryTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-sky-500 via-fourth to-blue-600 rounded-full shadow-[0_2px_10px_rgba(0,123,255,0.4)]"
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Car size={18} /> 4-Wheeler
              </span>
            </button>

            <button
              type="button"
              onClick={() => setUserSelectedType("2-Wheeler")}
              className={cn(
                "relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
                activeType === "2-Wheeler"
                  ? "text-white shadow-md"
                  : "text-third hover:text-primary"
              )}
            >
              {activeType === "2-Wheeler" && (
                <motion.div
                  layoutId="reecommInventoryTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-sky-500 via-fourth to-blue-600 rounded-full shadow-[0_2px_10px_rgba(0,123,255,0.4)]"
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Bike size={18} /> 2-Wheeler
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Vehicle Grid */}
      <div className="grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <VehicleCardSkeleton key={`reecomm-skel-${i}`} />
          ))
        ) : displayVehicles.length > 0 ? (
          displayVehicles.map((car, idx) => (
            <ReecommInventoryCard
              key={car.id ? `reecomm-card-${car.id}` : `reecomm-card-${idx}`}
              data={car}
              source="home"
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center py-16">
            <h3 className="text-lg font-semibold text-primary/40">
              No Vehicles Found
            </h3>
          </div>
        )}
      </div>

      {/* Explore All Button */}
      {displayVehicles.length >= 4 && (
        <div className="mt-6 flex justify-end">
          <Button
            href={
              activeType === "2-Wheeler"
                ? "/search/buy-used-two-wheelers?reecommInventory=true"
                : "/search/buy-used-cars?reecommInventory=true"
            }
            variant="outlineAnimated"
            size="md"
          >
            Explore All Reecomm Inventory
          </Button>
        </div>
      )}
    </div>
  );
}
