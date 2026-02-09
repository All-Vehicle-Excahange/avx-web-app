"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function PromoBanner() {
  return (
    <div className="w-full h-60 sm:h-[280px] rounded-xl overflow-hidden relative">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        <SwiperSlide>
          <BannerImage src="/banner_Basic.jpeg" />
        </SwiperSlide>

        <SwiperSlide>
          <BannerImage src="/about2.png" />
        </SwiperSlide>

        <SwiperSlide>
          <BannerImage src="/about3.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

/* Banner Content */
function BannerImage({ src, title, desc }) {
  return (
    <div className="relative w-full h-full">
      <Image src={src} alt={title} fill className="object-cover" priority />

    
      <div className="absolute inset-0 bg-black/20" />

      {/* Text */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        <p className="text-xs sm:text-sm text-white/80">{desc}</p>
      </div>
    </div>
  );
}
