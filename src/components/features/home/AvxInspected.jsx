import React, { useRef, useState, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";

import "swiper/css";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

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
];

export default function AvxInspected() {
  const [activeType, setActiveType] = useState("4-Wheeler");

  return (
    <div className="w-full h-full flex flex-col bg-primary text-secondary rounded-lg">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row items-center justify-between mb-4 gap-4 pt-3 pr-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-secondary text-primary p-3 pr-12 inline-block clip-slanted">
            AVX Inspected Vehicles
          </h2>
        </div>
        <div className="bg-secondary p-[4px] rounded-[20px] w-[300px] flex gap-1 mt-auto">
          <button
            onClick={() => setActiveType("4-Wheeler")}
            className={cn(
              "w-full py-2 text-sm font-semibold rounded-[24px] cursor-pointer flex items-center justify-center gap-2 transition-all",
              activeType === "4-Wheeler"
                ? "bg-primary text-secondary shadow-sm"
                : "text-primary/60 hover:text-primary"
            )}
          >
            <Car size={18} /> 4-Wheeler
          </button>

          <button
            onClick={() => setActiveType("2-Wheeler")}
            className={cn(
              "w-full py-2 text-sm font-semibold rounded-[24px] cursor-pointer flex items-center justify-center gap-2 transition-all",
              activeType === "2-Wheeler"
                ? "bg-primary text-secondary shadow-sm"
                : "text-primary/60 hover:text-primary"
            )}
          >
            <Bike size={18} /> 2-Wheeler
          </button>
        </div>

      </div>

      {/* Grid Layout */}
      <div className=" flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
        {smallCars.map((car) => (
          <VehicleCard key={car.id} data={car} className="lg:col-span-3" />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="mt-2 mb-3 mr-3 flex justify-end">
        <Button href="/" variant="outlineAnimated" size="md">
          Explore All Vehicles
        </Button>
      </div>
    </div>
  );
}
