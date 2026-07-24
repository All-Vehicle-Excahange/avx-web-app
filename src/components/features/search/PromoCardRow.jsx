"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function PromoBanner() {
  return (
    <div className="relative w-full h-[140px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md bg-neutral-900">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        loop={true}
        className="w-full h-full promo-swiper"
      >
        <SwiperSlide>
          <BannerImage src="/banner1.webp" />
        </SwiperSlide>

        <SwiperSlide>
          <BannerImage src="/banner2.webp" />
        </SwiperSlide>

        <SwiperSlide>
          <BannerImage src="/banner3.webp" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function BannerImage({ src }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt="banner"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  );
}
