import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard, Zoom } from "swiper/modules";
import useEscapeKey from "@/hooks/useEscapeKey";
import { isCleanImageUrl } from "@/lib/vehicleImage";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

export default function VehicleGalleryModal({ isOpen, onClose, media, initialSlide, imageAltBase }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide || 0);
  const [failedSrcs, setFailedSrcs] = useState(() => new Set());
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const swiperRef = useRef(null);

  const markFailed = (src) => {
    if (!src) return;
    setFailedSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  useEscapeKey(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  if (!isOpen || !media?.length) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col select-none">
      {/* Top Floating Close Button — Safely positioned on top-left away from navbar Account dropdown */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-6 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all text-xs sm:text-sm font-medium cursor-pointer shadow-lg active:scale-95 border border-white/20"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/20 text-[10px] text-white/90 font-mono">
            ESC
          </kbd>
        </button>
      </div>

      {/* Main Image Area (Takes Remaining Space) */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <Swiper
          ref={swiperRef}
          initialSlide={initialSlide}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onClick={(swiper, e) => {
            if (swiper.zoom) {
              swiper.zoom.toggle(e);
            }
          }}
          spaceBetween={0}
          loop={true}
          navigation={{ prevEl, nextEl }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3, minRatio: 1 }}
          modules={[FreeMode, Navigation, Thumbs, Keyboard, Zoom]}
          className="w-full h-full"
        >
          {media.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="flex items-center justify-center w-full h-full overflow-hidden [&:not(.swiper-slide-zoomed)_.swiper-zoom-container]:cursor-zoom-in [&.swiper-slide-zoomed_.swiper-zoom-container]:cursor-zoom-out"
            >
              {({ isActive }) => (
                item.type === "image" ? (
                  failedSrcs.has(item.src) ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/90 text-center p-4 select-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-14 h-14 text-white/30 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-white/40 font-medium">Image unavailable</p>
                    </div>
                  ) : (
                    <div className="swiper-zoom-container relative w-full h-full">
                      <Image
                        src={item.src}
                        alt={`${imageAltBase} — photo ${idx + 1}`}
                        fill
                        className="object-contain select-none"
                        priority={idx <= 3}
                        sizes="100vw"
                        onError={() => markFailed(item.src)}
                      />
                    </div>
                  )
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
                            el.play().catch(() => { });
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
          ref={(node) => setPrevEl(node)}
          className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-transparent sm:bg-white/5 text-white p-2 sm:p-3 rounded-full sm:hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer sm:backdrop-blur-sm drop-shadow-lg"
        >
          <ChevronLeft className="w-8 h-8 sm:w-6 sm:h-6" />
        </button>
        <button
          ref={(node) => setNextEl(node)}
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
            loop={true}
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
                      failedSrcs.has(item.thumbnail || item.src) ? (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-white/30 text-[10px] font-medium">
                          No Img
                        </div>
                      ) : (
                        <Image
                          src={item.thumbnail}
                          fill
                          sizes="100px"
                          alt="thumb"
                          className="object-cover pointer-events-none"
                          onError={() => markFailed(item.thumbnail || item.src)}
                        />
                      )
                    ) : (
                      <>
                        {isCleanImageUrl(item.thumbnail) &&
                          !/\.(mp4|mov|webm|ogg|m4v)(\?.*)?$/i.test(item.thumbnail) &&
                          item.thumbnail !== item.src &&
                          !failedSrcs.has(item.thumbnail) ? (
                          <Image
                            src={item.thumbnail}
                            fill
                            sizes="100px"
                            alt="thumb"
                            className="object-cover pointer-events-none"
                            onError={() => markFailed(item.thumbnail)}
                          />
                        ) : (
                          <video
                            src={item.src ? `${item.src}#t=0.001` : undefined}
                            preload="metadata"
                            muted
                            playsInline
                            className="w-full h-full object-cover pointer-events-none"
                          />
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
