"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function PromoBanner() {
    return (
        <div className="relative w-full h-60 sm:h-[280px] rounded-xl overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    dynamicBullets: false,
                }}
                loop={true}
                className="w-full h-full promo-swiper"
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

function BannerImage({ src }) {
    return (
        <div className="relative w-full h-full">
            <Image
                src={src}
                alt="banner"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 z-10" />
        </div>
    );
}
