"use client";
import { useState } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";
import { Car, User2 } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const slidesData = [
  { id: 1, prefix: "Seller", text: "Hand over the keys, not the headache." },
  { id: 2, prefix: "Buyer", text: "See the real condition, before you decide." },
  { id: 3, prefix: "Inspection", text: "Every vehicle, independently checked." },
  { id: 4, prefix: "Consultant", text: "Your business, your storefront, your growth." }
];

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicles");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <section className="relative h-screen w-full">
      {/* Swiper Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          allowTouchMove={false}
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              {/* Desktop Image */}
              <Image
                src={`/${slide.id}.webp`}
                fill
                className="hidden md:block w-full h-full object-cover"
                alt={`Hero background ${slide.title}`}
                priority={index === 0}
              />
              {/* Mobile Image */}
              <Image
                src={`/sm${slide.id}.webp`}
                fill
                className="block md:hidden w-full h-full object-cover"
                alt={`Hero background mobile ${slide.title}`}
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* 🔥 TOP GRADIENT SCRIM (KEY FIX) */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-1
    bg-linear-to-b from-black/70 via-black/40 to-transparent"
      />

      {/* Navbar */}
      <StickyHeroNavbar onScrollChange={setCollapsed} />

      {/* Hero Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full transition-opacity duration-300 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center max-w-3xl px-4 select-none flex flex-col items-center gap-2 mb-4 animate-fade-up h-auto justify-center">
          <span className="text-xs text-fourth md:text-sm uppercase tracking-[0.3em]  font-semibold drop-shadow-md">
            One Ecosystem. Every Side.
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-black text-white leading-tight md:leading-snug w-full max-w-5xl tracking-tight drop-shadow-xl font-primary transition-all duration-300">
            <span className="block md:inline text-primary mb-1 md:mb-0">{slidesData[activeSlideIndex].prefix}</span>
            <span className="hidden md:inline"> </span>
            <span className="block md:inline text-3xl md:text-3xl lg:text-3xl xl:text-5xl">{slidesData[activeSlideIndex].text}</span>
          </h1>
          <p className="text-base md:text-base lg:text-base xl:text-xl text-white/80 font-medium tracking-wide drop-shadow-md transition-all duration-300">
           One trusted marketplace.
          </p>
        </div>

        {/* Tab Links with Bottom Border */}
        <div className="mt-2 hidden lg:flex items-center gap-8 select-none">
          <button
            onClick={() => setActiveTab("vehicles")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 cursor-pointer ${
              activeTab === "vehicles"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-primary/60 hover:text-primary hover:border-primary/50"
            }`}
          >
            <Car size={20} />
            <span className="text-base tracking-wide">Vehicle</span>
          </button>

          <button
            onClick={() => setActiveTab("consult")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 cursor-pointer ${
              activeTab === "consult"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-primary/60 hover:text-primary hover:border-primary/50"
            }`}
          >
            <User2 size={20} />
            <span className="text-base tracking-wide">Consultant</span>
          </button>
        </div>
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
