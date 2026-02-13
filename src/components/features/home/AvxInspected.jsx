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

export default function AvxInspected() {
  const [activeType, setActiveType] = useState("4-Wheeler");

  return (
    <div className="w-full h-full flex flex-col  text-secondary">
      {/* Header Section */}
      <div className="container">
        <div className="shrink-0 flex flex-col md:flex-row items-center justify-between mb-4 gap-4 pt-3 pr-3">
          <div className="flex items-start gap-4">
            {/* VERTICAL ACCENT LINE */}
            <span className="w-2 h-[52px] rounded-full bg-gradient-to-b from-blue-500 to-white-400" />

            {/* TEXT */}
            <div>
              <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
                AVX Inspected Vehicles
              </h2>

              <p className="text-third mt-1">
                Lorem ipsum dolor sit amet consectetur dolor sit amet
                consectetur..
              </p>
            </div>
          </div>

          <div className="w-[300px] flex gap-2 mt-auto">
            {/* 4-Wheeler */}
            <button
              onClick={() => setActiveType("4-Wheeler")}
              className={cn(
                "w-full py-2 text-sm font-semibold rounded-[24px] border-2 cursor-pointer flex items-center justify-center gap-2 transition-all",

                activeType === "4-Wheeler"
                  ? "bg-fourth text-primary border-fourth shadow-sm"
                  : "text-primary border-primary bg-transparent",
              )}
            >
              <Car size={18} /> 4-Wheeler
            </button>

            {/* 2-Wheeler */}
            <button
              onClick={() => setActiveType("2-Wheeler")}
              className={cn(
                "w-full py-2 text-sm font-semibold rounded-[24px] border-2 cursor-pointer flex items-center justify-center gap-2 transition-all",

                activeType === "2-Wheeler"
                  ? "bg-fourth text-primary border-fourth shadow-sm"
                  : "text-primary border-primary bg-transparent",
              )}
            >
              <Bike size={18} /> 2-Wheeler
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className=" flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {smallCars.map((car) => (
            <VehicleCard key={car.id} data={car} className="lg:col-span-3" />
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-2 flex justify-end">
          <Button href="/search" variant="outlineAnimated" size="md">
            Explore All Vehicles
          </Button>
        </div>
      </div>
    </div>
  );
}
