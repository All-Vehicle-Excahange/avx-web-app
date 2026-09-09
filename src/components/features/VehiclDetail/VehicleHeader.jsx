"use client";

import { ChevronRight, Star, ExternalLink, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCompareStore } from "@/stores/useCompareStore";
import Button from "@/components/ui/button";
import SharePopup from "@/components/ui/SharePopup";

export default function VehicleHeader({ vehicle, vehicleSummary }) {
  const searchParams = useSearchParams();
  const source = searchParams.get("source"); // "home" | "search" | undefined

  // Global Comparison Store
  const { openCompare, setSelectedVehicle } = useCompareStore();

  // Sync vehicle with store when viewing details
  useEffect(() => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
  }, [vehicle, setSelectedVehicle]);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  const vehicleNameBase =
    [vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
      .filter(Boolean)
      .join(" ") || "Vehicle";

  // city / state — prefer summary (CONSULTATION) then fall back to vehicleAddress (USER_SELLER)
  const cityName =
    vehicleSummary?.address?.city || vehicle?.vehicleAddress?.city;
  const stateName =
    vehicleSummary?.address?.state || vehicle?.vehicleAddress?.state;
  const cityId =
    vehicleSummary?.address?.cityId || vehicle?.vehicleAddress?.cityId;
  const stateId =
    vehicleSummary?.address?.stateId || vehicle?.vehicleAddress?.stateId;

  const rawPrice = Number(vehicle?.price) || 0;
  const rawDisplayPrice = vehicle?.displayPrice ? Number(vehicle?.displayPrice) : null;
  const discountPercent = (() => {
    if (!rawPrice || !rawDisplayPrice) return null;
    const max = Math.max(rawPrice, rawDisplayPrice);
    const min = Math.min(rawPrice, rawDisplayPrice);
    if (max === min) return null;
    return Math.round(((max - min) / max) * 100);
  })();

  // Build the query string for search links
  const searchQueryParams = new URLSearchParams();
  if (vehicle?.makerId || vehicle?.makeId)
    searchQueryParams.set("makerId", vehicle.makerId || vehicle.makeId);
  if (vehicle?.makerName) searchQueryParams.set("brand", vehicle.makerName);
  if (stateId) searchQueryParams.set("stateId", stateId);
  if (cityId) searchQueryParams.set("cityId", cityId);
  if (stateName) searchQueryParams.set("stateName", stateName);
  if (cityName) searchQueryParams.set("cityName", cityName);
  const searchUrl = `/search?${searchQueryParams.toString()}`;

  return (
    <header className="-mx-4 sm:mx-0 mt-4 sm:mt-0 pt-5 pb-3 sm:pt-4 sm:pb-4 mb-4 sm:mb-0 bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)] flex flex-col gap-1.5 shadow-sm">
      {/* Breadcrumb */}
      <nav className="text-[10px] sm:text-xs text-third flex items-center gap-1 flex-wrap px-4 sm:px-0">
        <Link
          href="/"
          className="hover:text-white transition-colors duration-200 cursor-pointer uppercase tracking-wide"
        >
          Home
        </Link>

        {source === "search" && (
          <>
            <ChevronRight size={14} className="shrink-0" />
            <Link
              href={searchUrl}
              className="hover:text-white transition-colors duration-200 cursor-pointer uppercase tracking-wide"
            >
              Search
            </Link>
          </>
        )}

        {source === "home" && vehicle?.makerName && (
          <>
            <ChevronRight size={14} className="shrink-0" />
            <Link
              href={searchUrl}
              className="hover:text-white transition-colors duration-200 cursor-pointer uppercase tracking-wide"
            >
              {vehicle.makerName}
            </Link>
          </>
        )}

        <ChevronRight size={14} className="shrink-0" />
        <span className="text-white font-medium uppercase tracking-wide truncate max-w-[200px] sm:max-w-none flex items-center gap-1">
          {vehicleNameBase}
          {cityName && (
            <>
              <span className="lowercase text-third font-normal mx-0.5">in</span>
              <Link
                href={searchUrl}
                className="hover:text-white transition-colors duration-200 cursor-pointer underline decoration-white/30 hover:decoration-white/80 underline-offset-2"
              >
                {cityName}
              </Link>
            </>
          )}
        </span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1 px-4 sm:px-0">
        {/* LEFT SIDE: Title & Rating */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="block w-full">
            {/* Mobile Share */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="sm:hidden float-right ml-3 mb-1.5 mt-1 bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full p-0 text-primary hover:bg-primary/30 hover:scale-105 transition-all shrink-0 cursor-pointer border border-primary/20 shadow-sm"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <h1 className="text-xl sm:text-2xl 3xl:text-3xl font-bold leading-tight text-white tracking-wide uppercase inline">
              {[
                vehicle?.makerName,
                vehicle?.modelName,
                vehicle?.variantName,
                vehicle?.yearOfMfg,
              ]
                .filter(Boolean)
                .join(" ") || "-"}
            </h1>
          </div>

          {/* Badges (Rating + Sold) */}
          {(vehicle?.inspectionStatus === "AVX_INSPECTED" || vehicle?.avxInspectionRating || vehicle?.isVehicleSold) && (
            <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
              {/* 1. Rating */}
              {vehicle?.inspectionStatus === "AVX_INSPECTED" ? (
                <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded border border-white/10 w-fit">
                  <span className="text-xs text-third font-medium">
                    Reecomm Inspection Rating:
                  </span>
                  <div className="relative w-12 h-5 shrink-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12">
                      <Image
                        src="/inspection_vector.svg"
                        alt="Reecomm Inspected"
                        fill
                        className="object-contain drop-shadow-md z-20"
                      />
                      <span className="absolute left-[25px] top-[17px] z-30 text-white font-bold text-[9px]">
                        {vehicle?.avxInspectionRating || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : vehicle?.avxInspectionRating ? (
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/10 w-fit">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs text-third font-medium">
                    {vehicle?.inspectionStatus === "SELF_INSPECTED"
                      ? "Self Inspection Rating:"
                      : "Inspection Rating:"}{" "}
                    <span className="font-bold text-white ml-0.5">{vehicle?.avxInspectionRating}</span>
                  </span>
                </div>
              ) : null}

              {/* 2. Sold Badge */}
              {vehicle?.isVehicleSold && (
                <span className="flex items-center justify-center bg-fourth text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded border border-transparent uppercase tracking-wider shrink-0 w-fit">
                  Sold
                </span>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Price & Share (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center justify-end gap-5">
          {/* PRICE */}
          <div className="hidden lg:flex flex-col items-end justify-center text-right pl-4">
            <div className="flex items-center gap-2.5">
              <p className="text-2xl sm:text-3xl font-bold leading-none text-white tracking-tight">
                ₹{rawPrice.toLocaleString("en-IN")}
              </p>
              {rawDisplayPrice && discountPercent !== null && discountPercent !== 0 && (
                <span className="inline-block bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold tracking-wide text-[10px] px-1.5 py-0.5 rounded shadow border border-yellow-400/20 leading-none">
                  {discountPercent}% off
                </span>
              )}
            </div>
            {rawDisplayPrice && (
              <p className="text-sm text-third line-through mt-1.5 leading-none font-medium">
                ₹{rawDisplayPrice.toLocaleString("en-IN")}
              </p>
            )}
          </div>

          {/* Desktop SHARE */}
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex bg-primary/20 h-10 w-10 items-center justify-center rounded-full p-0 text-primary hover:bg-primary/30 hover:scale-105 transition-all cursor-pointer shrink-0 border border-primary/20 shadow-sm"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={currentUrl}
        title={vehicleNameBase}
      />
    </header>
  );
}