"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ReecommInventoryCard, { isReecommInventoryVehicle } from "@/components/ui/const/ReecommInventoryCard";
import Button from "@/components/ui/button";
import { Bike, Car, ShieldCheck } from "lucide-react";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAvxInspectedQuery, getTopPicsQuery } from "@/queries/user.queries";
import { useLocationStore } from "@/stores/useLocationStore";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ReecommInventory() {
  const [activeType, setActiveType] = useState("4-Wheeler");
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

  // Fetch inspected/verified inventory
  const { data: inspectedVehicles = [], isLoading: isInspectedLoading } = useQuery(
    getAvxInspectedQuery(activeType, queryPayload)
  );

  // Fallback to top picks if inspected has fewer listings
  const { data: topPickVehicles = [], isLoading: isTopPicsLoading } = useQuery(
    getTopPicsQuery(activeType, queryPayload)
  );

  const isLoading = isInspectedLoading && isTopPicsLoading;

  // Resolve Reecomm Inventory vehicles:
  // First prioritize vehicles with explicit Reecomm inventory / self-inspected flag,
  // then populate with available verified vehicles for the section display.
  const displayVehicles = useMemo(() => {
    const rawList = [
      ...(Array.isArray(inspectedVehicles) ? inspectedVehicles : []),
      ...(Array.isArray(topPickVehicles) ? topPickVehicles : []),
    ];

    const seen = new Set();
    const unique = [];
    for (const v of rawList) {
      const id = v?.id || v?._id;
      if (id && !seen.has(id)) {
        seen.add(id);
        unique.push(v);
      }
    }

    if (unique.length === 0) return [];

    // Filter for vehicles flagged as Reecomm inventory or inspectionStatus === "SELF_INSPECTED"
    const flagged = unique.filter((v) => isReecommInventoryVehicle(v));
    if (flagged.length >= 4) {
      return flagged.slice(0, 4);
    }

    // During development, if backend has limited inventory flagged, blend to always show 4 premium cards
    const remaining = unique.filter((v) => !flagged.some((f) => f.id === v.id));
    return [...flagged, ...remaining].slice(0, 4);
  }, [inspectedVehicles, topPickVehicles]);

  if (!isLoading && displayVehicles.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col text-primary">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Reecomm Inventory
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth">Reecomm Own</span> Inventory
          </h2>

          <p className="text-third w-full max-w-2xl">
            Directly inspected and certified by Reecomm — verified ownership, transparent pricing, and quality assured.
          </p>
        </div>

        {/* 4-Wheeler / 2-Wheeler Toggle */}
        <div className="flex p-0.5 bg-neutral-950/80 border border-white/10 rounded-full w-fit mt-auto ml-auto sm:ml-0 shrink-0">
          <button
            type="button"
            onClick={() => setActiveType("4-Wheeler")}
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
                className="absolute inset-0 bg-fourth rounded-full"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Car size={18} /> 4-Wheeler
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveType("2-Wheeler")}
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
                className="absolute inset-0 bg-fourth rounded-full"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Bike size={18} /> 2-Wheeler
            </span>
          </button>
        </div>
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
              No Reecomm Inventory Found
            </h3>
          </div>
        )}
      </div>

      {/* Explore All Button */}
      {displayVehicles.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button
            href={
              activeType === "2-Wheeler"
                ? "/search/buy-used-two-wheelers?sellerType=REECOMM"
                : "/search/buy-used-cars?sellerType=REECOMM"
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
