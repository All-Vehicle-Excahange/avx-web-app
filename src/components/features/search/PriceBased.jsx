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

const PriceBased = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">

        <div className="flex items-start gap-4">
          <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400" />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
              SUVs Between ₹8L – ₹12L
            </h2>
            <p className="text-third mt-1">
              Lorem ipsum dolor sit amet consectetur dolor sit amet
              consectetur..
            </p>
          </div>
        </div>

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

export default PriceBased;
