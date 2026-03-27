import React, { useEffect, useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";
import { getTopPicsFour, getTopPicsTwo, getUserHomeFeed } from "@/services/user.service";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function TopPicsSection() {
    const [activeType, setActiveType] = useState("4-Wheeler");
    const [cardData, setCardData] = useState([]);


    useEffect(() => {
        const fetchHomeFeed = async () => {
            try {
                const data = {
                    pageNo: 1,
                    size: 4,
                }
                let res;
                if (activeType === "4-Wheeler") {
                    res = await getTopPicsFour(data)
                } else {
                    res = await getTopPicsTwo(data)
                }
                setCardData(res.data)
            } catch (error) {
                console.error("Failed to fetch themes:", error);
            }
        };

        fetchHomeFeed();
    }, [activeType]);

    return (
        <div className="w-full h-full flex flex-col  text-primary">
            {/* Header Section */}
            <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">

                <div className="flex flex-col items-start gap-2">
                    <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                        Top Picks
                        <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                        <span className="text-fourth"> Top picks</span> Vehicle For You
                    </h2>

                    <p className="text-third ">
                        Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="flex gap-1 sm:gap-2 mt-auto justify-end w-full sm:w-fit">
                    <button
                        onClick={() => setActiveType("4-Wheeler")}
                        className={cn(
                            "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
                            activeType === "4-Wheeler"
                                ? "bg-fourth text-primary border-fourth shadow-sm"
                                : "text-primary border-white/20 hover:border-primary/40"
                        )}
                    >
                        <Car size={18} /> 4-Wheeler
                    </button>
                    <button
                        onClick={() => setActiveType("2-Wheeler")}
                        className={cn(
                            "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
                            activeType === "2-Wheeler"
                                ? "bg-fourth text-primary border-fourth shadow-sm"
                                : "text-primary border-white/20 hover:border-primary/40"
                        )}
                    >
                        <Bike size={18} /> 2-Wheeler
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div
                className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-1">
                {cardData.map((vehicle) => (
                    <div key={vehicle.id} className="lg:col-span-1 lg:row-span-1 h-full">
                        <VehicleCard data={vehicle} source="home" />
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <Button href="/search" variant="outlineAnimated" size="md">
                    Explore All Vehicles
                </Button>
            </div>
        </div>
    );
}
