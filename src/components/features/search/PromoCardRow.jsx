"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import AdSenseAd from "@/components/common/AdSenseAd";

import "swiper/css";
import "swiper/css/pagination";

function PromoBanners() {
  return (
    <div className="relative w-full h-[140px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md bg-transparent">
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
          <BannerImage src="/banner1.webp" mobileSrc="/mobile-banner-1.png" />
        </SwiperSlide>

        <SwiperSlide>
          <BannerImage src="/banner2.webp" mobileSrc="/mobile-banner-2.png" />
        </SwiperSlide>

        <SwiperSlide>
          <BannerImage src="/banner3.webp" mobileSrc="/mobile-banner-3.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function BannerImage({ src, mobileSrc }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt="banner"
        fill
        className="hidden sm:block object-fill"
        priority
      />
      <Image
        src={mobileSrc || src}
        alt="banner mobile"
        fill
        className="block sm:hidden object-fill"
        priority
      />
    </div>
  );
}

export default function PromoBanner() {
  return (
    <AdSenseAd
      slot={process.env.NEXT_PUBLIC_ADSENSE_SEARCH_PROMO_SLOT}
      mode="fallback"
      fallback={<PromoBanners />}
      className="rounded-xl sm:rounded-2xl overflow-hidden min-h-[140px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px]"
    />
  );
}
