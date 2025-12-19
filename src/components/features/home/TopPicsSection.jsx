import React, { useState } from "react";
import FeaturedVehicleCard from "./FeaturedVehicleCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Mock Data ---
const featuredCar = {
  id: "featured-1",
  title: "BMW 8-serie 2-door coupe grey",
  subtitle: "35 D6 Powerful lorem isump",
  year: "2022",
  transmission: "Manual",
  fuel: "Diesel",
  seats: "5",
  drivetrain: "Front Wheel Drive",
  rating: "4.3",
  price: "6,75,998",
  image: "/big_card_car.jpg",
  sponsored: false,
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
    image: "/small_car.jpg",
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
    image: "/small_car.jpg",
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
    image: "/small_car.jpg",
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
    image: "/small_car.jpg",
    sponsored: false,
  },
];

export default function TopPicsSection() {
  const [activeType, setActiveType] = useState("4-Wheeler");

  return (
    <div className="w-full h-full   flex flex-col bg-secondary text-primary font-sans overflow-hidden">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Top picks Vehicle for you
          </h2>

          <p className="text-third mt-1">
            Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="bg-primary p-1 rounded-lg flex items-center">
          <button
            onClick={() => setActiveType("4-Wheeler")}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-md transition-all cursor-pointer",
              activeType === "4-Wheeler"
                ? "bg-secondary text-primary shadow-sm"
                : "text-secondary/60 hover:text-secondary"
            )}
          >
            4-Wheeler
          </button>

          <button
            onClick={() => setActiveType("2-Wheeler")}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-md transition-all cursor-pointer",
              activeType === "2-Wheeler"
                ? "bg-secondary text-primary shadow-sm"
                : "text-secondary/60 hover:text-secondary"
            )}
          >
            2-Wheeler
          </button>

          <button
            onClick={() => setActiveType("Commercial")}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-md transition-all cursor-pointer",
              activeType === "Commercial"
                ? "bg-secondary text-primary shadow-sm"
                : "text-secondary/60 hover:text-secondary"
            )}
          >
            Commercial
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div
        className="
    flex-1 min-h-0
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-4
    lg:grid-rows-2
    gap-4
    pb-1
  "
      >
        {/* Featured Vehicle */}
        <div className="lg:col-span-2 lg:row-span-2 3xl:col-span-2 h-full">
          <FeaturedVehicleCard data={featuredCar} />
        </div>

        {/* Small Vehicles */}
        {smallCars.map((car) => (
          <div key={car.id} className="lg:col-span-1 lg:row-span-1 h-full">
            <VehicleCard data={car} />
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="mt-8 flex justify-end">
        <Button variant="outline" size="md">Explore All Vehicles</Button>
      </div>
    </div>
  );
}
