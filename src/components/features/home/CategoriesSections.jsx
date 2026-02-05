import React, { useState } from "react";
import { Car, Bike } from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const categories = [
  { id: "city", label: "City Compact", icon: Car },
  { id: "family", label: "Family Comfort", icon: Car },
  { id: "suv", label: "SUVs & Big Vehicles", icon: Car },
  { id: "entry-bikes", label: "Entry Bikes & Scooters", icon: Bike },
  { id: "performance", label: "Performance Bikes", icon: Bike },
  { id: "almost-new", label: "Almost New", icon: Car },
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
    <section className="w-full h-full flex flex-col  text-primary">
      <div className="container">
        <div className="flex items-start gap-4">
          {/* VERTICAL ACCENT LINE */}
          <span className="w-2 h-[52px] rounded-full bg-gradient-to-b from-blue-500 to-white-400" />

          {/* TEXT */}
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

        <div className="w-full my-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-auto">
            {categories.map((cat) => {
              const isActive = active === cat.id;

              return (
                <button
                  onClick={() => setActive(cat.id)}
                  key={cat.id}
                  className={cn(
                    "w-full py-2 text-sm font-semibold rounded-3xl border-2 cursor-pointer flex items-center justify-center gap-2 transition-all",
                    isActive
                      ? "bg-fourth text-primary border-fourth shadow-sm"
                      : "text-primary",
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
  );
};

export default CategoriesSections;
