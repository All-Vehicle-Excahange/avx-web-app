"use client"

import React, { useState, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

import "swiper/css";
import {
    getAvxIsnpectedFourWheel,
    getAvxIsnpectedTwoWheel,
} from "@/services/user.service";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function AvxInspected() {
    const [activeType, setActiveType] = useState("4-Wheeler");
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const data = { pageNo: 1, size: 4 };
                let res;

                if (activeType === "2-Wheeler") {
                    res = await getAvxIsnpectedTwoWheel(data);
                } else {
                    res = await getAvxIsnpectedFourWheel(data);
                }

                setVehicles(res?.data || []);
            } catch (error) {
                console.log("API ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [activeType]);


    return (
        <div className="w-full h-full flex flex-col text-secondary">
            <div className="container">
                {/* Header */}
                <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 pt-3 pr-3">

                    <div className="flex flex-col items-start gap-2">
                        <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                            Vehicles
                            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                            Reecomm <span className="text-fourth">Inspected</span> Vehicles
                        </h2>
                        <p className="text-third ">
                            Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
                        </p>
                    </div>

                    {/* Toggle Buttons */}
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

                {/* Grid */}
                <div className="grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <VehicleCardSkeleton key={`skel-${i}`} />
                        ))
                    ) : vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                data={vehicle}
                                source="home"
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-primary/60 py-10">
                            No vehicles found
                        </div>
                    )}
                </div>


                {/* Bottom Button */}
                <div className="mt-4 flex justify-end">
                    <Button href="/search" variant="outlineAnimated" size="md">
                        Explore All Vehicles
                    </Button>
                </div>
            </div>
        </div>
    );
}
