import React, { useState } from "react";
import { Car, Bike } from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";

const cn = (...classes) => classes.filter(Boolean).join(" ");


const categories = [
    { id: "city", label: "City Compact", icon: Car, },
    { id: "family", label: "Family Comfort", icon: Car, },
    { id: "suv", label: "SUVs & Big Vehicles", icon: Car, },
    { id: "entry-bikes", label: "Entry Bikes & Scooters", icon: Bike, },
    { id: "performance", label: "Performance Bikes", icon: Bike, },
    { id: "almost-new", label: "Almost New", icon: Car, },
];

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
    const [active, setActive] = useState("city");
    return (
        <section className="w-full h-full flex flex-col bg-primary text-secondary">
            <div className="container">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                        Not sure what to buy? Start here
                    </h2>
                    <p className="text-sm font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, nam.</p>
                </div>

                {/* tab deisgn */}
                <div className="w-full my-6">
                    <div className="flex gap-2 mt-auto">
                        {categories.map((cat) => {
                            const isActive = active === cat.id;

                            return (
                                <button
                                    onClick={() => setActive(cat.id)}
                                    className={cn(
                                        "w-full py-2 text-sm font-semibold rounded-[24px] border-2 border-secondary cursor-pointer flex items-center justify-center gap-2 transition-all",
                                        isActive
                                            ? "bg-secondary text-primary shadow-sm"
                                            : "text-secondary"
                                    )}
                                >
                                    {cat.icon && <cat.icon size={16} />}
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>



                {/* Grid Layout */}
                <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {smallCars.map((car) => (
                        <VehicleCard key={car.id} data={car} className="lg:col-span-3" />
                    ))}
                </div>

                {/* Bottom Button */}
                <div className="mt-2 flex justify-end">
                    <Button href="/" variant="outlineAnimated" size="md">
                        Explore All Vehicles
                    </Button>
                </div>

            </div>
        </section>
    )
}

export default CategoriesSections
