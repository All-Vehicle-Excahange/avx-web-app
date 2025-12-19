"use client";

import { useRef } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";

function ReletedCar() {
  const scrollRef = useRef(null);

  const cars = Array.from({ length: 8 });
  const enableScroll = cars.length > 4;

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const cardData = {
    id: "featured-1",
    title: "BMW 8-serie 2-door",
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

  return (
    <div className="w-full bg-secondary relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold ">
          Top Releted Vehicle Picks For You
        </h2>

        {/* ✅ TOP RIGHT BUTTONS */}
        {enableScroll && (
          <div className="flex gap-2">
            <Button
              onClick={() => scroll("left")}
              showIcon={false}
              variant="roundedOutline"
            >
              <ChevronLeft size={18} />
            </Button>

            <Button
              onClick={() => scroll("right")}
              showIcon={false}
              variant="roundedOutline"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>

      {/* CAR CONTAINER */}
      <div
        ref={scrollRef}
        className={
          enableScroll
            ? `
      flex gap-6
      overflow-x-auto
      scrollbar-hide
    `
            : `
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      3xl:grid-cols-4
      gap-6
    `
        }
      >
        {cars.map((_, i) => (
          <div key={i} className={enableScroll ? "flex-none w-[360px]" : ""}>
            <VehicleCard data={cardData} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReletedCar;
