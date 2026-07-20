"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function PromoBanner() {

    return (
        <div className="relative w-full  h-48 sm:h-[280px]  rounded-xl overflow-hidden">
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
                    <BannerImage src="/banner 1.webp" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerImage src="/banner 2.webp" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerImage src="/banner 3.webp" />
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
        </div>
    );
}