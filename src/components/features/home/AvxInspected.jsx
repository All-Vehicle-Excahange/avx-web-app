"use client"

import React, {useState, useEffect} from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import {Bike, Car} from "lucide-react";

import "swiper/css";
import {
    getAvxIsnpectedFourWheel,
    getAvxIsnpectedTwoWheel,
} from "@/services/user.service";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function AvxInspected() {
    const [activeType, setActiveType] = useState("4-Wheeler");
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = {pageNo: 1, size: 4};
                let res;

                if (activeType === "2-Wheeler") {
                    res = await getAvxIsnpectedTwoWheel(data);
                } else {
                    res = await getAvxIsnpectedFourWheel(data);
                }

                setVehicles(res?.data || []);
            } catch (error) {
                console.log("API ERROR:", error);
            }
        };

        fetchVehicles();
    }, [activeType]);


    return (
        <div className="w-full h-full flex flex-col text-secondary">
            <div className="container">
                {/* Header */}
                <div className="shrink-0 flex flex-col md:flex-row items-center justify-between mb-4 gap-4 pt-3 pr-3">
                    <div className="flex items-start gap-4">
                        <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400"/>

                        <div>
                            <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
                                AVX Inspected Vehicles
                            </h2>

                            <p className="text-third mt-1">
                                Lorem ipsum dolor sit amet consectetur..
                            </p>
                        </div>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="w-[300px] flex gap-2 mt-auto">
                        <button
                            onClick={() => setActiveType("4-Wheeler")}
                            className={cn(
                                "w-full py-2 text-sm font-semibold rounded-[24px] border-2 flex items-center justify-center gap-2 transition-all",
                                activeType === "4-Wheeler"
                                    ? "bg-fourth text-primary border-fourth shadow-sm"
                                    : "text-primary border-primary bg-transparent"
                            )}
                        >
                            <Car size={18}/> 4-Wheeler
                        </button>

                        <button
                            onClick={() => setActiveType("2-Wheeler")}
                            className={cn(
                                "w-full py-2 text-sm font-semibold rounded-[24px] border-2 flex items-center justify-center gap-2 transition-all",
                                activeType === "2-Wheeler"
                                    ? "bg-fourth text-primary border-fourth shadow-sm"
                                    : "text-primary border-primary bg-transparent"
                            )}
                        >
                            <Bike size={18}/> 2-Wheeler
                        </button>
                    </div>
                </div>

                {/* Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                data={vehicle}
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
