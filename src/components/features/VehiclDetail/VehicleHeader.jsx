/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import { ChevronRight, Star } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useCompareStore } from "@/stores/useCompareStore";

export default function VehicleHeader({ vehicle, ratting, vehicleSummary }) {
    const router = useRouter();
    const source = router.query.source; // "home" | "search" | undefined
    const [mounted, setMounted] = useState(false);

    // Global Comparison Store
    const { openCompare, setSelectedVehicle } = useCompareStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync vehicle with store when viewing details
    useEffect(() => {
        if (vehicle) {
            setSelectedVehicle(vehicle);
        }
    }, [vehicle,]);

    const vehicleNameBase = [vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
        .filter(Boolean)
        .join(" ") || "Vehicle";

    // city / state — prefer summary (CONSULTATION) then fall back to vehicleAddress (USER_SELLER)
    const cityName = vehicleSummary?.address?.city || vehicle?.vehicleAddress?.city;
    const stateName = vehicleSummary?.address?.state || vehicle?.vehicleAddress?.state;
    const cityId = vehicleSummary?.address?.cityId || vehicle?.vehicleAddress?.cityId;
    const stateId = vehicleSummary?.address?.stateId || vehicle?.vehicleAddress?.stateId;

    // Build the query string for search links
    const searchQueryParams = new URLSearchParams();
    if (vehicle?.makerId || vehicle?.makeId) searchQueryParams.set("makerId", vehicle.makerId || vehicle.makeId);
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
                            <span className="lowercase normal-case">in</span>
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
                <Star className="text-yellow-400" size={16} />
                <span className="text-sm text-primary font-medium">
                    Inspection Rating: {vehicle?.avxInspectionRating || "-"}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* LEFT SIDE */}
                <h1 className="text-2xl text-primary sm:text-3xl 3xl:text-4xl font-bold">
                    {[vehicle?.makerName, vehicle?.modelName, vehicle?.variantName].filter(Boolean).join(" ") || "-"}
                </h1>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3 ml-auto">

                    {/* PRICE */}
                    <div className="hidden lg:block bg-primary text-secondary px-4 py-2 rounded-lg text-right">
                        <p className="text-lg font-semibold">
                            ₹{vehicle?.price?.toLocaleString("en-IN")}
                        </p>
                    </div>

                </div>

            </div>

        </header>
    );
}   
