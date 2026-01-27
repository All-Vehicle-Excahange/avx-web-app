"use client";

import { useRef, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

function ReletedCar() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    // Attach navigation AFTER mount
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();
  }, []);


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
    <div className="w-full bg-secondary relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold ">
          Top Releted Vehicle Picks For You
        </h2>

        {/* ✅ TOP RIGHT BUTTONS */}
        <div className="flex gap-3">
          <Button variant="roundedOutline" ref={prevRef}>
            <ChevronLeft className="w-5 h-5 text-primary hover:text-secondary" />
          </Button>

          <Button variant="roundedOutline" ref={nextRef}>
            <ChevronRight className="w-5 h-5 text-primary hover:text-secondary" />
          </Button>
        </div>
      </div>

      {/* CAR CONTAINER */}
      <div className="w-full h-full pb-6 overflow-visible">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4, // ✅ GUARANTEED 4 on big screens
            },
          }}
        >
          {cardData.map((card, i) => (
            <SwiperSlide key={i}>
              <VehicleCard data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReletedCar;
