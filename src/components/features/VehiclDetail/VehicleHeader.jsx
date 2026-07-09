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
    <header className="w-full space-y-3 pt-9 md:pt-6 bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-third flex items-center gap-1 flex-wrap">
        <Link
          href="/"
          className="hover:text-primary transition-colors duration-200 cursor-pointer uppercase tracking-wide"
        >
          Home
        </Link>

        {source === "search" && (
          <>
            <ChevronRight size={14} className="shrink-0" />
            <Link
              href={searchUrl}
              className="hover:text-primary transition-colors duration-200 cursor-pointer uppercase tracking-wide"
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
              className="hover:text-primary transition-colors duration-200 cursor-pointer uppercase tracking-wide"
            >
              {vehicle.makerName}
            </Link>
          </>
        )}

        <ChevronRight size={14} className="shrink-0" />
        <span className="text-primary font-medium uppercase tracking-wide truncate max-w-[200px] sm:max-w-none flex items-center gap-1">
          {vehicleNameBase}
          {cityName && (
            <>
              <span className="lowercase">in</span>
              <Link
                href={searchUrl}
                className="hover:text-primary transition-colors duration-200 cursor-pointer underline decoration-primary/50 underline-offset-2"
              >
                {cityName}
              </Link>
            </>
          )}
        </span>
      </nav>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {vehicle?.inspectionStatus === "AVX_INSPECTED" ? (
          <>
            <span className="text-sm text-primary font-medium">
              Reecomm Inspection Rating:
            </span>
            <div className="relative w-16 h-14 flex items-center justify-center">
              <Image
                src="/inspection_vector.svg"
                alt="Reecomm Inspected"
                fill
                className="object-contain"
              />
              <span className="absolute left-7 z-10 text-white font-bold text-xs pb-0.5">
                {vehicle?.avxInspectionRating || "-"}
              </span>
            </div>
          </>
        ) : vehicle?.avxInspectionRating ? (
          <>
            <Star className="text-yellow-400" size={16} />
            <span className="text-sm text-primary font-medium">
              {vehicle?.inspectionStatus === "SELF_INSPECTED"
                ? "Self Inspection Rating:"
                : "Inspection Rating:"}{" "}
              {vehicle?.avxInspectionRating}
            </span>
          </>
        ) : null}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* LEFT SIDE */}
        <h1 className="text-2xl text-primary sm:text-3xl 3xl:text-4xl font-bold">
          {[
            vehicle?.makerName,
            vehicle?.modelName,
            vehicle?.variantName,
            vehicle?.yearOfMfg,
          ]
            .filter(Boolean)
            .join(" ") || "-"}
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 ml-auto ">
          {/* SHARE */}
          <Button
            onClick={() => setIsShareOpen(true)}
            size="sm"
            className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full p-0 text-primary/80 hover:text-primary "
          >
            <Share2 className="h-6 w-6" />
          </Button>

          {/* PRICE */}
          <div className="hidden lg:block bg-primary text-secondary px-4 py-2 rounded-lg text-right">
            <p className="text-lg font-semibold">
              ₹{vehicle?.price?.toLocaleString("en-IN") || "0"}
            </p>
          </div>
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
