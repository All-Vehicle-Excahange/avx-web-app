import React, {useEffect, useState} from "react";
import {Car, Bike} from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import {getFourWheelWithTag, getTwoWheelWithTag} from "@/services/user.service";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ============================= */
/* VEHICLE TAG MAPPING (NEW) */
/* ============================= */

const vehicleTagMap = {
    "4-Wheeler": {
        "urban-rides": "URBAN_RIDE",
        "city-compact": "CITY_COMPACT",
        "comfort-sedans": "COMFORT_SEDAN",
        "compact-suvs": "COMPACT_SUV",
        "fullsize-suvs-muvs": "FULL_SIZE_SUV_MUV",
        "premium-luxury": "PREMIUM_LUXURY",
    },
    "2-Wheeler": {
        "scooters": "SCOOTER",
        "commuter-bikes": "COMMUTER_BIKE",
        "sports-bikes": "SPORTS_BIKE",
        "cruiser-retro": "CRUISER_AND_RETRO",
        "adventure-touring": "ADVENTURE_AND_TOURING",
        "electric-2w": "ELECTRIC_2WHEELER",
    },
};

const categoriesByType = {
    "4-Wheeler": [
        {id: "urban-rides", label: "Urban Rides", icon: Car},
        {id: "city-compact", label: "City Compact", icon: Car},
        {id: "comfort-sedans", label: "Comfort Sedans", icon: Car},
        {id: "compact-suvs", label: "Compact SUVs", icon: Car},
        {id: "fullsize-suvs-muvs", label: "Full-Size SUVs & MUVs", icon: Car},
        {id: "premium-luxury", label: "Premium & Luxury", icon: Car},
    ],
    "2-Wheeler": [
        {id: "scooters", label: "Scooters", icon: Bike},
        {id: "commuter-bikes", label: "Commuter Bikes", icon: Bike},
        {id: "sports-bikes", label: "Sports Bikes", icon: Bike},
        {id: "cruiser-retro", label: "Cruiser & Retro", icon: Bike},
        {id: "adventure-touring", label: "Adventure & Touring", icon: Bike},
        {id: "electric-2w", label: "Electric 2W", icon: Bike},
    ],
};

const CategoriesSections = () => {
    const [activeType, setActiveType] = useState("4-Wheeler");
    const [active, setActive] = useState("urban-rides");
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const selectedTag = vehicleTagMap[activeType]?.[active];
                if (!selectedTag) return;

                const data = {
                    pageNo: 1,
                    size: 4,
                    vehicleTag: selectedTag,
                };

                let res;

                if (activeType === "4-Wheeler") {
                    res = await getFourWheelWithTag(data);
                } else {
                    res = await getTwoWheelWithTag(data);
                }

                setVehicles(res.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchVehicles();
    }, [activeType, active]);

    return (
        <section className="w-full h-full flex flex-col text-primary">
            <div className="container">
                <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
                    <div className="flex items-start gap-4">
                        <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400"/>

                        <div>
                            <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
                                Not sure what to buy? Start here
                            </h2>

                            <p className="text-third mt-1">
                                Lorem ipsum dolor sit amet consectetur dolor sit amet
                                consectetur..
                            </p>
                        </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex gap-1 sm:gap-2 mt-auto justify-end w-full sm:w-fit">
                        <button
                            onClick={() => {
                                setActiveType("4-Wheeler");
                                setActive("urban-rides");
                            }}
                            className={cn(
                                "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
                                activeType === "4-Wheeler"
                                    ? "bg-fourth text-primary border-fourth shadow-sm"
                                    : "text-primary"
                            )}
                        >
                            <Car size={16}/> 4-Wheeler
                        </button>

                        <button
                            onClick={() => {
                                setActiveType("2-Wheeler");
                                setActive("scooters");
                            }}
                            className={cn(
                                "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
                                activeType === "2-Wheeler"
                                    ? "bg-fourth text-primary border-fourth shadow-sm"
                                    : "text-primary"
                            )}
                        >
                            <Bike size={16}/> 2-Wheeler
                        </button>
                    </div>

                </div>

                {/* Categories */}
                <div className="w-full my-6">
                    <div
                        className="flex sm:flex md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
                        {categoriesByType[activeType].map((cat) => {
                            const isActive = active === cat.id;

                            return (
                                <button
                                    onClick={() => setActive(cat.id)}
                                    key={cat.id}
                                    className={cn(
                                        "shrink-0 px-4 py-2 text-sm font-semibold rounded-3xl border-2 cursor-pointer flex items-center justify-center gap-2 transition-all whitespace-nowrap",
                                        isActive
                                            ? "bg-fourth text-primary border-fourth shadow-sm"
                                            : "text-primary"
                                    )}
                                >
                                    {cat.icon && <cat.icon size={18}/>}
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Vehicle Grid */}
                {/* Vehicle Grid */}
                <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vehicles.length === 0 ? (
                        <div className="col-span-full text-center py-10">
                            <p className="text-lg font-semibold text-primary">
                                No Vehicles Found
                            </p>
                            <p className="text-sm text-third mt-2">
                                Try selecting another category.
                            </p>
                        </div>
                    ) : (
                        vehicles.map((car) => (
                            <VehicleCard
                                key={car.id}
                                data={car}
                                className="lg:col-span-3"
                            />
                        ))
                    )}
                </div>


                {/* Bottom Button */}
                <div className="mt-2 flex justify-end">
                    <Button href="/search" variant="outlineAnimated" size="md">
                        Explore All Vehicles
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSections;
