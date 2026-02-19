import React, {useState} from "react";
import {Car, Bike} from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const categoriesByType = {
    "4-Wheeler": [
        {
            id: "urban-rides",
            label: "Urban Rides",
            icon: Car,
        },
        {
            id: "city-compact",
            label: "City Compact",
            icon: Car,
        },
        {
            id: "comfort-sedans",
            label: "Comfort Sedans",
            icon: Car,
        },
        {
            id: "compact-suvs",
            label: "Compact SUVs",
            icon: Car,
        },
        {
            id: "fullsize-suvs-muvs",
            label: "Full-Size SUVs & MUVs",
            icon: Car,
        },
        {
            id: "premium-luxury",
            label: "Premium & Luxury",
            icon: Car,
        }
    ],

    "2-Wheeler": [
        {
            id: "scooters",
            label: "Scooters",
            icon: Bike,
        },
        {
            id: "commuter-bikes",
            label: "Commuter Bikes",
            icon: Bike,
        },
        {
            id: "sports-bikes",
            label: "Sports Bikes",
            icon: Bike,
        },
        {
            id: "cruiser-retro",
            label: "Cruiser & Retro",
            icon: Bike,
        },
        {
            id: "adventure-touring",
            label: "Adventure & Touring",
            icon: Bike,
        },
        {
            id: "electric-2w",
            label: "Electric 2W",
            icon: Bike,
        },
    ],
};


const smallCars = [
    {
        id: "1",
        title: "Maruti Fronx",
        subtitle: "35 D6 Powerful lorem isump",
        year: "2022",
        transmission: "Manual",
        fuel: "Diesel",
        seats: "5",
        rating: "4.3",
        price: "6,75,998",
        image: "/olx1.png",
        sponsored: false,
    },
    {
        id: "2",
        title: "Maruti Fronx",
        subtitle: "35 D6 Powerful lorem isump",
        year: "2022",
        transmission: "Manual",
        fuel: "Diesel",
        seats: "5",
        rating: "4.3",
        price: "6,75,998",
        image: "/olx2.png",
        sponsored: false,
    },
    {
        id: "3",
        title: "Maruti Fronx",
        subtitle: "35 D6 Powerful lorem isump",
        year: "2022",
        transmission: "Manual",
        fuel: "Diesel",
        seats: "5",
        rating: "4.3",
        price: "6,75,998",
        image: "/olx3.png",
        sponsored: false,
    },
    {
        id: "4",
        title: "Maruti Fronx",
        subtitle: "35 D6 Powerful lorem isump",
        year: "2022",
        transmission: "Manual",
        fuel: "Diesel",
        seats: "5",
        rating: "4.3",
        price: "6,75,998",
        image: "/olx1.png",
        sponsored: false,
    },
];

const CategoriesSections = () => {
    const [activeType, setActiveType] = useState("4-Wheeler");
    const [active, setActive] = useState("city");

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
                    <div className="w-[300px] flex gap-2 mt-auto">
                        <button
                            onClick={() => {
                                setActiveType("4-Wheeler");
                                setActive("city");
                            }}
                            className={cn(
                                "w-full py-2 text-sm font-semibold rounded-3xl border-2 cursor-pointer flex items-center justify-center gap-2 transition-all",
                                activeType === "4-Wheeler"
                                    ? "bg-fourth text-primary border-fourth shadow-sm"
                                    : "text-primary"
                            )}
                        >
                            <Car size={18}/> 4-Wheeler
                        </button>

                        <button
                            onClick={() => {
                                setActiveType("2-Wheeler");
                                setActive("entry-bikes");
                            }}
                            className={cn(
                                "w-full py-2 text-sm font-semibold rounded-3xl border-2 cursor-pointer flex items-center justify-center gap-2 transition-all",
                                activeType === "2-Wheeler"
                                    ? "bg-fourth text-primary border-fourth shadow-sm"
                                    : "text-primary"
                            )}
                        >
                            <Bike size={18}/> 2-Wheeler
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="w-full my-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-auto">
                        {categoriesByType[activeType].map((cat) => {
                            const isActive = active === cat.id;

                            return (
                                <button
                                    onClick={() => setActive(cat.id)}
                                    key={cat.id}
                                    className={cn(
                                        "w-full py-2 text-sm font-semibold rounded-3xl border-2 cursor-pointer flex items-center justify-center gap-2 transition-all",
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
                <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {smallCars.map((car) => (
                        <VehicleCard key={car.id} data={car} className="lg:col-span-3"/>
                    ))}
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
