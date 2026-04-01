
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ArrowLeftRight, ChevronRight, Star, StatArrowLeftRight } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import VehicleComparePopup from "./VehicleComparePopup";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function VehicleHeader({ vehicle, ratting, vehicleSummary }) {
    const router = useRouter();
    const source = router.query.source; // "home" | "search" | undefined
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dragConstraintsRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const vehicleNameBase = [vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
        .filter(Boolean)
        .join(" ") || "Vehicle";
    const cityName = vehicleSummary?.address?.city;
    const vehicleName = cityName ? `${vehicleNameBase} in ${cityName}` : vehicleNameBase;

    // Build the query string for search links
    const searchQueryParams = new URLSearchParams();
    if (vehicle?.makerId || vehicle?.makeId) searchQueryParams.set("makerId", vehicle.makerId || vehicle.makeId);
    if (vehicle?.makerName) searchQueryParams.set("brand", vehicle.makerName);
    if (vehicleSummary?.address?.stateId) searchQueryParams.set("stateId", vehicleSummary?.address?.stateId);
    if (vehicleSummary?.address?.cityId) searchQueryParams.set("cityId", vehicleSummary?.address?.cityId);
    if (vehicleSummary?.address?.state) searchQueryParams.set("stateName", vehicleSummary?.address?.state);
    if (cityName) searchQueryParams.set("cityName", cityName);
    const searchUrl = `/search?${searchQueryParams.toString()}`;

    const floatingButton = (
        <div className="fixed inset-0 pointer-events-none z-[999]" ref={dragConstraintsRef}>
            <motion.button
                drag
                dragConstraints={dragConstraintsRef}
                dragElastic={0.05}
                dragMomentum={false}
                onClick={() => setIsCompareOpen(true)}
                className="absolute right-4 bottom-24 sm:right-6 sm:bottom-24 bg-fourth text-primary p-3 sm:p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:bg-fourth/90 border border-primary/20 flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors pointer-events-auto"
                whileTap={{ scale: 0.95 }}
                title="Compare Vehicles (Drag me!)"
            >
                <ArrowLeftRight size={24} />
            </motion.button>
        </div>
    );

    return (
        <header className="w-full space-y-3 pt-6 bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]">
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
                    {vehicle?.makerName || "Tata"}{" "}
                    {vehicle?.modelName || "Harrier XZ Plus"}{" "}
                    {vehicle?.variantName || "Harrier XZ Plus"}
                </h1>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3 ml-auto">

                    {/* PRICE */}
                    <div className="bg-primary text-secondary px-4 py-2 rounded-lg text-right">
                        <p className="text-lg font-semibold">
                            ₹{vehicle?.price?.toLocaleString("en-IN")}
                        </p>
                    </div>

                </div>

            </div>

            <VehicleComparePopup
                isOpen={isCompareOpen}
                onClose={() => setIsCompareOpen(false)}
                selectedVehicle={vehicle}
            />

            {mounted && typeof document !== "undefined" && createPortal(floatingButton, document.body)}
        </header>

    );
}   
