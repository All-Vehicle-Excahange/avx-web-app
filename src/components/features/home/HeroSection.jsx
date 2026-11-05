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
    mobileImage: "/images/diwali/diwali-hero-1.webp",
    alt: "Carwali Diwali - Ek chhota sa sapna, apni gaadi ka",
  },
  {
    id: "fallback-2",
    desktopImage: "/images/diwali/diwali-hero-2.webp",
    mobileImage: "/images/diwali/diwali-hero-2.webp",
    alt: "Iss Diwali, kaunsi wali gaadi? - Ek nahi, kayi options",
  },
  {
    id: "fallback-3",
    desktopImage: "/images/diwali/diwali-hero-3.webp",
    mobileImage: "/images/diwali/diwali-hero-3.webp",
    alt: "Pasand dil se. Faisla report se - Reecomm Inspection",
  },
];

// Helper to determine if a banner item is designated for mobile screens
const isMobileBanner = (item) => {
  const title = (item?.title || "").toLowerCase();
  const url = (item?.imageUrl || "").toLowerCase();
  return title.includes("mobile") || url.includes("mobile");
};

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
        .filter((item) => !item.status || item.status === "ACTIVE")
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

      if (activeBanners.length > 0) {
        // Group by displayOrder so corresponding Desktop & Mobile banners pair up
        const orderMap = new Map();

        activeBanners.forEach((item) => {
          const order = item.displayOrder ?? 0;
          if (!orderMap.has(order)) {
            orderMap.set(order, []);
          }
          orderMap.get(order).push(item);
        });

        const slides = [];

        orderMap.forEach((group, order) => {
          const mobileItem = group.find((it) => isMobileBanner(it));
          const desktopItem = group.find((it) => !isMobileBanner(it));

          if (desktopItem && mobileItem) {
            slides.push({
              id: `${desktopItem.id}-${mobileItem.id}`,
              desktopImage: desktopItem.imageUrl,
              mobileImage: mobileItem.imageUrl,
              alt: desktopItem.title || mobileItem.title || `Hero banner ${order}`,
              redirectUrl: desktopItem.redirectUrl || mobileItem.redirectUrl || null,
            });
          } else if (desktopItem) {
            slides.push({
              id: desktopItem.id,
              desktopImage: desktopItem.imageUrl,
              mobileImage: desktopItem.imageUrl,
              alt: desktopItem.title || `Hero banner ${order}`,
              redirectUrl: desktopItem.redirectUrl || null,
            });
          } else if (mobileItem) {
            slides.push({
              id: mobileItem.id,
              desktopImage: mobileItem.imageUrl,
              mobileImage: mobileItem.imageUrl,
              alt: mobileItem.title || `Hero banner ${order}`,
              redirectUrl: mobileItem.redirectUrl || null,
            });
          } else {
            group.forEach((item, idx) => {
              slides.push({
                id: item.id || `banner-${order}-${idx}`,
                desktopImage: item.imageUrl,
                mobileImage: item.imageUrl,
                alt: item.title || `Hero banner ${order}`,
                redirectUrl: item.redirectUrl || null,
              });
            });
          }
        });

        if (slides.length > 0) {
          return slides;
        }
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
          {slidesData.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
              {slide.redirectUrl ? (
                <a
                  href={slide.redirectUrl}
                  target={slide.redirectUrl.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="block w-full h-full relative cursor-pointer"
                >
                  {/* Desktop / Large Screen Banner */}
                  <Image
                    src={slide.desktopImage}
                    fill
                    unoptimized
                    className="hidden md:block w-full h-full object-cover select-none"
                    alt={slide.alt || "Hero background banner"}
                    priority={index === 0}
                  />
                  {/* Mobile / Small Screen Banner */}
                  <Image
                    src={slide.mobileImage || slide.desktopImage}
                    fill
                    unoptimized
                    className="block md:hidden w-full h-full object-cover select-none"
                    alt={slide.alt || "Hero background mobile banner"}
                    priority={index === 0}
                  />
                </a>
              ) : (
                <>
                  {/* Desktop / Large Screen Banner */}
                  <Image
                    src={slide.desktopImage}
                    fill
                    unoptimized
                    className="hidden md:block w-full h-full object-cover select-none"
                    alt={slide.alt || "Hero background banner"}
                    priority={index === 0}
                  />
                  {/* Mobile / Small Screen Banner */}
                  <Image
                    src={slide.mobileImage || slide.desktopImage}
                    fill
                    unoptimized
                    className="block md:hidden w-full h-full object-cover select-none"
                    alt={slide.alt || "Hero background mobile banner"}
                    priority={index === 0}
                  />
                </>
              )}
            </SwiperSlide>
          ))}
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
