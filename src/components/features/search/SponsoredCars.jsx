import Button from "@/components/ui/button";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import CommonSwiper from "@/components/ui/CommonSwiper";

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

const SponsoredCars = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        

        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Trending Vehicles
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            Trending <span className="text-fourth">Vehicles</span>
          </h2>

           <div className="flex items-center gap-1 text-xs text-third">
              <span>Sponsored</span>

              <button
                type="button"
                className="w-4 h-4 flex items-center justify-center rounded-full border border-third/40 hover:bg-third/10 transition"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button variant="roundedOutline" ref={prevRef}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button variant="roundedOutline" ref={nextRef}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Swiper */}
      <CommonSwiper
        data={smallCars}
        CardComponent={VehicleCard}
        prevRef={prevRef}
        nextRef={nextRef}
      />
    </div>
  );
};

export default SponsoredCars;
