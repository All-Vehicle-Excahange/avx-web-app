"use client";

import { useRef, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import CommonSwiper from "@/components/ui/CommonSwiper";

function ReletedCar() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);


  const cardData = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ]

  return (
    <div className="w-full  relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Top related
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth">Top Releted </span> Vehicles For You
          </h2>
          <p className="text-third">
            Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
          </p>
        </div>

        {/* ✅ TOP RIGHT BUTTONS */}
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
        data={cardData}
        CardComponent={VehicleCard}
        prevRef={prevRef}
        nextRef={nextRef}
      />
    </div>
  );
}

export default ReletedCar;
