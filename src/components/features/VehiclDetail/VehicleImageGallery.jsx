"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function VehicleImageGallery({ vehicle }) {


    const media = useMemo(() => {
        const items = [];


        if (vehicle?.thumbnailUrl) {
            items.push({
                type: "image",
                src: vehicle.thumbnailUrl,
                thumbnail: vehicle.thumbnailUrl,
            });
        }

        if (vehicle?.vehicleImages?.length) {
            const sorted = [...vehicle.vehicleImages]
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((item) => ({
                    type: item.isVideo ? "video" : "image",
                    src: item.imageUrl,
                    thumbnail: item.isVideo
                        ? item.videoThumbnailUrl
                        : item.imageUrl,
                }));

            items.push(...sorted);
        }

        return items;
    }, [vehicle]);



    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    if (!media.length) {
        return (
            <section className="w-full rounded-xl p-4 shadow border border-third/60">
                <div className="relative w-full aspect-video bg-third/10 rounded-lg overflow-hidden flex flex-col items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-third/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-third/60 font-medium">No images uploaded by the seller</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full rounded-xl p-4 shadow border border-third/60">
            {/* ===== MAIN PREVIEW ===== */}
            <div className="relative w-full aspect-video bg-black/5 rounded-lg overflow-hidden group">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={{
                        prevEl: ".gallery-prev",
                        nextEl: ".gallery-next",
                    }}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full h-full"
                >
                    {media.map((item, idx) => (
                        <SwiperSlide key={idx} className="w-full h-full flex items-center justify-center">
                            {item.type === "image" ? (
                                <Image
                                    src={item.src}
                                    alt="Vehicle"
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <video
                                    src={item.src}
                                    controls
                                    className="w-full h-full object-contain bg-black"
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* NAV BUTTONS */}
                <button className="gallery-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-primary/90 text-secondary p-2 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hidden md:block">
                    <ChevronLeft />
                </button>

                <button className="gallery-next absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-primary/90 text-secondary p-2 rounded-full hover:scale-105 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hidden md:block">
                    <ChevronRight />
                </button>
            </div>

            {/* ===== THUMBNAILS ===== */}
            <div className="mt-4">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView="auto"
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumbs-slider"
                >
                    {media.map((item, idx) => (
                        <SwiperSlide
                            key={idx}
                            className="w-20! sm:w-24! shrink-0 rounded-md overflow-hidden cursor-pointer transition-all
  [&.swiper-slide-thumb-active_div]:border-primary/90 [&.swiper-slide-thumb-active_div]:border-2"                        >
                            <div className="w-20 h-14 sm:w-24 sm:h-16 bg-black/5 flex items-center justify-center relative border transition rounded-md overflow-hidden border-primary/40 [&.swiper-slide-thumb-active>div]:border-primary/90">
                                {item.type === "image" ? (
                                    <Image
                                        src={item.thumbnail}
                                        width={100}
                                        height={100}
                                        alt={`thumb-${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <Image
                                            src={item.thumbnail}
                                            width={100}
                                            height={100}
                                            alt={`thumb-video-${idx}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30" />
                                        <Play size={18} className="absolute text-white" />
                                    </>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
