import React, {useEffect, useState} from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import {Bike, Car} from "lucide-react";
import {getTopPicsFour, getTopPicsTwo, getUserHomeFeed} from "@/services/user.service";

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
                <div className="flex items-start gap-4">
                    {/* VERTICAL ACCENT LINE */}
                    <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400"/>

                    {/* TEXT */}
                    <div>
                        <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
                            Top picks Vehicle for you
                        </h2>

                        <p className="text-third mt-1">
                            Lorem ipsum dolor sit amet consectetur dolor sit amet
                            consectetur..
                        </p>
                    </div>
                </div>

                {/* Toggle Switch */}
                <div className="w-[300px] flex gap-2 mt-auto">
                    <button
                        onClick={() => setActiveType("4-Wheeler")}
                        className={cn(
                            "w-full py-2 text-sm font-semibold rounded-[24px] border-2  cursor-pointer flex items-center justify-center gap-2 transition-all",
                            activeType === "4-Wheeler"
                                ? "bg-fourth text-primary border-fourth shadow-sm"
                                : "text-primary",
                        )}
                    >
                        <Car size={18}/> 4-Wheeler
                    </button>
                    <button
                        onClick={() => setActiveType("2-Wheeler")}
                        className={cn(
                            "w-full py-2 text-sm font-semibold rounded-3xl border-2  cursor-pointer flex items-center justify-center gap-2 transition-all",
                            activeType === "2-Wheeler"
                                ? "bg-fourth text-primary border-fourth shadow-sm"
                                : "text-primary",
                        )}
                    >
                        <Bike size={18}/> 2-Wheeler
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div
                className="
    flex-1 min-h-0
    grid
    sm:items-center
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-4
    gap-4
    pb-1
  "
            >
                {cardData.map((vehicle) => (
                    <div key={vehicle.id} className="lg:col-span-1 lg:row-span-1 h-full">
                        <VehicleCard data={vehicle}/>
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
