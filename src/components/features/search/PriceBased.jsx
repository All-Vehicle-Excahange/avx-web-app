import Button from "@/components/ui/button";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

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
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        {/* Title + Sponsored line */}
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            SUVs Between ₹8L – ₹12L
          </h2>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-2">
          <Button variant="roundedOutline" ref={prevRef}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button variant="roundedOutline" ref={nextRef}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        grabCursor
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
      >
        {smallCars.map((story) => (
          <SwiperSlide key={story.id}>
            <VehicleCard data={story} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PriceBased;
