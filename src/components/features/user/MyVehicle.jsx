import VehicleCard from "@/components/ui/const/VehicleCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

function MyVehicle() {
  const cardData = [
    {
      id: "1",
      title: "BMW 8-2-Door",
      subtitle: "35 D6 Powerful lorem isump",
      year: "2022",
      transmission: "Manual",
      fuel: "Diesel",
      seats: "5",
      drivetrain: "Front Wheel Drive",
      rating: "4.3",
      price: "6,75,998",
      image: "/big_card_car.jpg",
    },
    {
      id: "2",
      title: "Audi A6 Sedan",
      subtitle: "Luxury comfort performance",
      year: "2021",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: "5",
      drivetrain: "All Wheel Drive",
      rating: "4.5",
      price: "5,40,000",
      image: "/big_card_car.jpg",
    },
    {
      id: "3",
      title: "Mercedes C-Class",
      subtitle: "Premium driving experience",
      year: "2020",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: "5",
      drivetrain: "Rear Wheel Drive",
      rating: "4.2",
      price: "4,95,000",
      image: "/big_card_car.jpg",
    },
    {
      id: "3",
      title: "Mercedes C-Class",
      subtitle: "Premium driving experience",
      year: "2020",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: "5",
      drivetrain: "Rear Wheel Drive",
      rating: "4.2",
      price: "4,95,000",
      image: "/big_card_car.jpg",
    },
  ];

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "live", label: "Live" },
    { id: "sold", label: "Sold" },
  ];

  const [activeType, setActiveType] = useState("all");

  return (
    <>
      <section className="w-full container rounded-2xl bg-secondary p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex  flex-wrap gap-2">
            {vehicleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 border border-third/50 py-2 rounded-full text-sm font-medium transition
                ${
                  activeType === type.id
                    ? "bg-primary text-secondary"
                    : "bg-third/10 text-primary hover:bg-third/20"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cardData.map((car, index) => (
            <VehicleCard key={`${car.id}-${index}`} data={car} />
          ))}
        </div>
      </section>
    </>
  );
}

export default MyVehicle;
