import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

export default function VehicleGalleryModal({ isOpen, onClose, media, initialSlide, imageAltBase }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide || 0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveIndex(initialSlide || 0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialSlide]);

  useEffect(() => {
    if (isOpen && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(initialSlide, 0);
    }
  }, [isOpen, initialSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !media?.length) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col select-none">
      {/* Top Bar - Close Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <button
          onClick={onClose}
          className="bg-white/10 text-white p-2.5 rounded-full shadow-md hover:bg-white/20 transition cursor-pointer backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Area (Takes Remaining Space) */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center pt-12 sm:pt-4 pb-4 overflow-hidden">
        <Swiper
          ref={swiperRef}
          initialSlide={initialSlide}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          spaceBetween={0}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3, minRatio: 1 }}
          modules={[FreeMode, Navigation, Thumbs, Keyboard, Zoom]}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="w-full h-full"
        >
          {media.map((item, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center w-full h-full overflow-hidden">
              {({ isActive }) => (
                item.type === "image" ? (
                  <div className="swiper-zoom-container relative w-full h-full">
                    <Image
                      src={item.src}
                      alt={`${imageAltBase} — photo ${idx + 1}`}
                      fill
                      className="object-contain select-none"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-transparent">
                    <video
                      src={item.src}
                      autoPlay={isActive}
                      loop
                      playsInline
                      className="w-full h-full object-contain pointer-events-none"
                      ref={(el) => {
                        if (el) {
                          if (isActive) {
                            el.play().catch(() => {});
                          } else {
                            el.pause();
                          }
                        }
                      }}
                    />
                  </div>
                )
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Global Nav Arrows on Far Left/Right edges */}
        <button
          ref={prevRef}
          className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-transparent sm:bg-white/5 text-white p-2 sm:p-3 rounded-full sm:hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer sm:backdrop-blur-sm drop-shadow-lg"
        >
          <ChevronLeft className="w-8 h-8 sm:w-6 sm:h-6" />
        </button>
        <button
          ref={nextRef}
          className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-transparent sm:bg-white/5 text-white p-2 sm:p-3 rounded-full sm:hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer sm:backdrop-blur-sm drop-shadow-lg"
        >
          <ChevronRight className="w-8 h-8 sm:w-6 sm:h-6" />
        </button>

        {/* Counter floating at the absolute center bottom of main image */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white/10 text-white/90 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-widest backdrop-blur-md">
          {activeIndex + 1} / {media.length}
        </div>
      </div>

      {/* Bottom Area: Thumbnails */}
      <div className="w-full h-[80px] sm:h-[100px] shrink-0 flex items-center justify-start md:justify-center px-2 sm:px-6 pb-2">
        <div className="w-full md:w-auto md:min-w-[400px] max-w-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            centerInsufficientSlides={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-[50px] sm:h-[70px] !pl-1"
          >
            {media.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <SwiperSlide key={idx} className="!w-[70px] sm:!w-[100px] !h-full cursor-pointer">
                  <div
                    className="w-full h-full relative rounded overflow-hidden transition-all bg-black flex items-center justify-center"
                  >
                    {isActive && <div className="absolute inset-0 border-[2px] border-white rounded z-10 pointer-events-none" />}
                    {item.type === "image" ? (
                      <Image
                        src={item.thumbnail}
                        fill
                        alt="thumb"
                        className="object-cover pointer-events-none"
                      />
                    ) : (
                      <>
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            fill
                            alt="thumb"
                            className="object-cover pointer-events-none"
                          />
                        ) : (
                          <video src={item.src} className="w-full h-full object-cover pointer-events-none" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                          <Play className="text-white w-4 h-4" />
                        </div>
                      </>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
