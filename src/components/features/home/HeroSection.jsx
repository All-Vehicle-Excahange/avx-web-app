"use client";
import { useState, useMemo } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";
import { Car, User2 } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getDisplayImageQuery } from "@/queries/user.queries";

import "swiper/css";
import "swiper/css/effect-fade";

// ==============================================================
// FALLBACK HERO BANNERS (USED IF API IS LOADING OR EMPTY)
// ==============================================================
const fallbackSlidesData = [
  {
    id: "fallback-1",
    desktopImage: "/images/diwali/diwali-hero-1.webp",
    tabletImage: "/images/diwali/diwali-hero-1.webp",
    mobileImage: "/images/diwali/diwali-hero-1.webp",
    hasTabletImage: false,
    alt: "Carwali Diwali - Ek chhota sa sapna, apni gaadi ka",
    redirectUrl: null,
  },
  {
    id: "fallback-2",
    desktopImage: "/images/diwali/diwali-hero-2.webp",
    tabletImage: "/images/diwali/diwali-hero-2.webp",
    mobileImage: "/images/diwali/diwali-hero-2.webp",
    hasTabletImage: false,
    alt: "Iss Diwali, kaunsi wali gaadi? - Ek nahi, kayi options",
    redirectUrl: null,
  },
  {
    id: "fallback-3",
    desktopImage: "/images/diwali/diwali-hero-3.webp",
    tabletImage: "/images/diwali/diwali-hero-3.webp",
    mobileImage: "/images/diwali/diwali-hero-3.webp",
    hasTabletImage: false,
    alt: "Pasand dil se. Faisla report se - Reecomm Inspection",
    redirectUrl: null,
  },
];

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicles");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Fetch dynamic display images for HOME_PAGE on WEB platform
  const { data: displayImages = [] } = useQuery(
    getDisplayImageQuery({ placement: "HOME_PAGE", platform: "WEB" })
  );

  const slidesData = useMemo(() => {
    if (Array.isArray(displayImages) && displayImages.length > 0) {
      const activeBanners = displayImages
        .filter((item) => {
          const isActive = !item.status || item.status === "ACTIVE";
          const hasImage = Boolean(
            item.webDesktopImageUrl ||
            item.webTabletImageUrl ||
            item.webMobileImageUrl ||
            item.imageUrl
          );
          return isActive && hasImage;
        })
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

      if (activeBanners.length > 0) {
        return activeBanners.map((item, idx) => {
          const desktop =
            item.webDesktopImageUrl ||
            item.imageUrl ||
            item.webTabletImageUrl ||
            item.webMobileImageUrl ||
            fallbackSlidesData[idx % fallbackSlidesData.length].desktopImage;

          // If tablet not URL comes in this API, show desktop URL
          const tablet = item.webTabletImageUrl || desktop;
          // If mobile not URL comes in this API, show desktop URL
          const mobile = item.webMobileImageUrl || desktop;

          return {
            id: item.id || `hero-banner-${item.displayOrder ?? idx + 1}`,
            desktopImage: desktop,
            tabletImage: tablet,
            mobileImage: mobile,
            hasTabletImage: Boolean(item.webTabletImageUrl),
            alt: item.title || `Hero banner ${item.displayOrder ?? idx + 1}`,
            redirectUrl: item.redirectUrl || null,
          };
        });
      }
    }
    return fallbackSlidesData;
  }, [displayImages]);

  return (
    <section className="relative h-screen w-full">
      {/* Swiper Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Swiper
          key={slidesData.map((s) => s.id).join("-")}
          modules={[Autoplay]}
          speed={1200}
          autoplay={
            slidesData.length > 1
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                  waitForTransition: true,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          loop={slidesData.length > 1}
          allowTouchMove={slidesData.length > 1}
          grabCursor={slidesData.length > 1}
          resistance={true}
          resistanceRatio={0.85}
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
        >
          {slidesData.map((slide, index) => {
            const isFirst = index === 0;
            const slideImages = (
              <>
                {/* Desktop / Large Screen Banner (lg+ if tablet exists, else md+) */}
                <Image
                  src={slide.desktopImage}
                  fill
                  unoptimized
                  className={`${
                    slide.hasTabletImage ? "hidden lg:block" : "hidden md:block"
                  } w-full h-full object-cover select-none`}
                  alt={slide.alt || "Hero background banner"}
                  priority={isFirst}
                />

                {/* Tablet Screen Banner (md to lg - only rendered when dedicated tablet image exists) */}
                {slide.hasTabletImage && (
                  <Image
                    src={slide.tabletImage}
                    fill
                    unoptimized
                    className="hidden md:block lg:hidden w-full h-full object-cover select-none"
                    alt={slide.alt || "Hero background tablet banner"}
                    priority={isFirst}
                  />
                )}

                {/* Mobile Screen Banner (< md) */}
                <Image
                  src={slide.mobileImage}
                  fill
                  unoptimized
                  className="block md:hidden w-full h-full object-cover select-none"
                  alt={slide.alt || "Hero background mobile banner"}
                  priority={isFirst}
                />
              </>
            );

            return (
              <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
                {slide.redirectUrl ? (
                  <a
                    href={slide.redirectUrl}
                    target={slide.redirectUrl.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="block w-full h-full relative cursor-pointer"
                  >
                    {slideImages}
                  </a>
                ) : (
                  slideImages
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Dark overlay (commented out for vibrant HD Diwali banners) */}
      {/* <div className="absolute inset-0 bg-black/45 z-0" /> */}

      {/*  TOP GRADIENT SCRIM (KEY FIX) */}
      <div className="absolute top-0 left-0 right-0 h-32 z-1 bg-linear-to-b from-black/70 via-black/40 to-transparent" />

      {/* Navbar */}
      <StickyHeroNavbar onScrollChange={setCollapsed} />

      {/* Hero Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full transition-opacity duration-300 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* <div className="text-center max-w-3xl px-4 select-none flex flex-col items-center gap-2 mb-4 animate-fade-up h-auto justify-center lg:-mt-32">
          <span className="text-xs text-fourth md:text-sm uppercase tracking-[0.3em]  font-semibold drop-shadow-md">
            One Ecosystem. Every Side.
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white  w-full max-w-5xl tracking-tight drop-shadow-xl font-primary transition-all duration-300">
            <span className="block md:inline text-primary mb-1 md:mb-0">{slidesData[activeSlideIndex]?.prefix}</span>
            <span className="hidden md:inline"> </span>
            <span className="block md:inline text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{slidesData[activeSlideIndex]?.text}</span>
          </h1>
          <p className="text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl text-white/80 font-medium tracking-wide drop-shadow-md transition-all duration-300">
            One trusted marketplace.
          </p>
        </div> */}
      </div>

      {/* Royal Festive Capsule Tab Switcher */}
      <div
        className={`absolute bottom-[calc(20vh+5.25rem)] left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-[rgba(16,9,26,0.88)] backdrop-blur-xl border border-[#F59E0B]/50 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.2)] select-none transition-opacity duration-300 ${
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          onClick={() => setActiveTab("vehicles")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
            activeTab === "vehicles"
              ? "bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] text-zinc-950 shadow-[0_2px_14px_rgba(245,158,11,0.5)]"
              : "text-zinc-300 hover:text-amber-300 hover:bg-white/5"
          }`}
        >
          <Car size={18} className={activeTab === "vehicles" ? "stroke-[2.5]" : ""} />
          <span>Vehicle</span>
        </button>

        <button
          onClick={() => setActiveTab("consult")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
            activeTab === "consult"
              ? "bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] text-zinc-950 shadow-[0_2px_14px_rgba(245,158,11,0.5)]"
              : "text-zinc-300 hover:text-amber-300 hover:bg-white/5"
          }`}
        >
          <User2 size={18} className={activeTab === "consult" ? "stroke-[2.5]" : ""} />
          <span>Consultant</span>
        </button>
      </div>

      {/* Filter Bar – sticks to bottom INSIDE hero */}
      <div className="absolute -bottom-6 left-0 right-0 z-20">
        <VehicleFilterBar activeType={activeTab} />
      </div>

      {/* Scroll Indicator - hints user to scroll */}
      {/* <div className="absolute bottom-2 left-1/2 scroll-indicator z-20">
        <ChevronDown className="text-primary/70 w-6 h-6" />
      </div> */}
    </section>
  );
}
