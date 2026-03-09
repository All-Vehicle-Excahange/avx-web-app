"use client";

import { ChevronRight, Star } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VehicleHeader({ vehicle, ratting }) {
    const router = useRouter();
    const source = router.query.source; // "home" | "search" | undefined

    const vehicleName = [vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
        .filter(Boolean)
        .join(" ") || "Vehicle";

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
                            href="/search"
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
                            href={`/search?maker=${vehicle.makerName}`}
                            className="hover:text-primary transition-colors duration-200 cursor-pointer uppercase tracking-wide"
                        >
                            {vehicle.makerName}
                        </Link>
                    </>
                )}

                <ChevronRight size={14} className="shrink-0" />
                <span className="text-primary font-medium uppercase tracking-wide truncate max-w-[200px] sm:max-w-none">
                    {vehicleName}
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
                <h1 className="text-2xl text-primary sm:text-3xl 3xl:text-4xl font-bold">
                    {vehicle?.makerName || "Tata"}{" "}
                    {vehicle?.modelName || "Harrier XZ Plus"}{" "}
                    {vehicle?.variantName || "Harrier XZ Plus"}

                </h1>

                <div className="bg-primary text-secondary px-4 py-2 rounded-lg text-right    w-fit">
                    <p className="text-lg font-semibold">
                        ₹{(vehicle?.price / 100000).toFixed(2)} Lakh
                    </p>
                </div>
            </div>
        </header>
    );
}
