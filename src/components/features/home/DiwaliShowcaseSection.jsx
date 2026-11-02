import React, { useEffect, useState } from "react";
import DiwaliVehicleCard from "@/components/ui/const/DiwaliVehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { getOfferVehicles } from "@/services/vehicle.service";
import { ArrowRight, Sparkles, Flame, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import DiwaliFirecrackerCanvas from "./DiwaliFirecrackerCanvas";

const DiwaliShowcaseSection = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchVehicles = async () => {
      try {
        const data = {
          pageNo: 1,
          size: 4,
        };
        const res = await getOfferVehicles(data);

        const list = Array.isArray(res?.data?.vehicles)
          ? res.data.vehicles
          : Array.isArray(res?.data?.content)
            ? res.data.content
            : Array.isArray(res?.data)
              ? res.data
              : [];

        if (isMounted) {
          setVehicles(list);
          setTotalCount(res?.pageResponse?.totalElements || res?.pagination?.total || list.length);
        }
      } catch (error) {
        console.error("Error fetching Diwali offer vehicles:", error);
        if (isMounted) {
          setVehicles([]);
          setTotalCount(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVehicles();

    return () => {
      isMounted = false;
    };
  }, []);

  // If not loading and no vehicles available, return null to avoid blank container
  if (!loading && (!Array.isArray(vehicles) || vehicles.length === 0)) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 my-8 md:my-12">

      {/* ============================================================== */}
      {/* 1. SEAMLESS DIWALI HERO BANNER (REFINED LIGHT ORANGE ACCENTS) */}
      {/* ============================================================== */}
      <section
        aria-label="Diwali Festive Hero Banner"
        className="w-full relative overflow-hidden rounded-tl-[48px] rounded-tr-2xl rounded-br-[48px] rounded-bl-2xl border border-[#FB923C]/30 bg-[#120E0A] shadow-[0_16px_45px_rgba(251,146,60,0.1),0_4px_24px_rgba(0,0,0,0.85)]"
      >
        {/* Real-time Simultaneous Firecracker Particle Canvas Animation */}
        <DiwaliFirecrackerCanvas className="z-20 pointer-events-auto" />

        {/* Top Border Subtle Festive Lights Accent */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 pointer-events-none z-10 overflow-hidden opacity-75 select-none">
          <img
            src="/images/diwali/diwali-festive-frame.jpg"
            alt="Diwali Lighting Accent"
            className="w-full h-full object-cover object-top mix-blend-screen filter brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#120E0A]/80" />
        </div>

        {/* Ambient Subtle Light Golden & Soft Orange Glow Orbs */}
        <div className="absolute top-1/4 -left-16 w-80 h-80 bg-[#FB923C]/12 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FDE047]/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Panoramic Festive Hero Banner Image (Cars + Bikes + Diyas & Fireworks) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/diwali/diwali-hero-banner.jpg"
            alt="Diwali Festive Cars, Bikes & Celebrations"
            className="w-full h-full object-cover object-right md:object-center transform scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Warm Vignette for Flawless Left Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#120E0A] via-[#120E0A]/75 md:via-[#120E0A]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A]/90 via-transparent to-[#120E0A]/30" />
        </div>

        {/* Banner Content (Left Aligned for Optimal Framing) */}
        <div className="relative z-10 w-full min-h-[340px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] flex flex-col justify-between p-5 sm:p-8 md:p-10 lg:p-12">

          {/* Top Row: Festive Pill & Interactive Hint */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#FB923C]/35 backdrop-blur-md shadow-[0_0_12px_rgba(251,146,60,0.2)]">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#FDE047]">
                SHUBH DEEPAWALI SPECIAL
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#FB923C]/25 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047] animate-bounce" />
              <span className="text-xs font-semibold text-[#FDE047]">
                Click anywhere to burst crackers ✨
              </span>
            </div>
          </div>

          {/* Headline & CTA Area */}
          <div className="max-w-xl sm:max-w-2xl flex flex-col items-start gap-2.5 sm:gap-3.5 pt-6 pb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg">
              Aa Diwali, Ghar Laao{" "}
              <span className="bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(251,146,60,0.5)]">
                Nayi Sawari
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-amber-100/90 font-medium max-w-lg leading-relaxed drop-shadow">
              Celebrate the festival of lights with certified pre-owned cars &amp; bikes at exclusive festive pricing, verified inspections, and exchange bonuses.
            </p>

            {/* Action Buttons & Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/diwali-offers"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] hover:brightness-105 shadow-[0_4px_16px_rgba(251,146,60,0.3)] transition-all duration-300 group cursor-pointer"
              >
                <span>Explore Festive Offers</span>
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="px-3.5 py-2 sm:py-2.5 rounded-xl bg-black/60 border border-[#FB923C]/30 backdrop-blur-md">
                <span className="text-xs sm:text-sm font-semibold text-[#FDE047]">
                  {totalCount > 0 ? `${totalCount}+ Deals Available` : "Exclusive Deals"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. REFINED FEATURED DIWALI VEHICLES SECTION (REFINED LIGHT ORANGE) */}
      {/* ============================================================== */}
      <section
        aria-label="Featured Diwali Vehicles"
        className="w-full relative overflow-hidden rounded-tl-[48px] rounded-tr-2xl rounded-br-[48px] rounded-bl-2xl bg-gradient-to-b from-[#18130E] via-[#110D09] to-[#0B0907] border border-[#FB923C]/25 hover:border-[#FB923C]/45 shadow-[0_0_30px_rgba(251,146,60,0.08),0_16px_45px_rgba(0,0,0,0.85)] px-4 sm:px-6 md:px-8 py-7 md:py-9 transition-all duration-300"
      >
        {/* Real-time Simultaneous Firecracker Particle Canvas Animation */}
        <DiwaliFirecrackerCanvas className="z-5 pointer-events-none" />

        {/* Top Center Golden Crown Trim */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 max-w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#FDE047]/70 to-transparent pointer-events-none z-10" />

        {/* Subtle Warm Golden Festive Rangoli / Ember Background Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-15 select-none">
          <img
            src="/images/diwali/diwali-overlay-bg.jpg"
            alt="Diwali Decorative Texture"
            className="w-full h-full object-cover mix-blend-screen"
          />
        </div>

        {/* Matching Asymmetrical Royal Corner Glow Accents */}
        <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-[#FB923C]/12 to-transparent rounded-tl-[48px] pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FB923C]/08 to-transparent rounded-tr-2xl pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FB923C]/08 to-transparent rounded-bl-2xl pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-[#FB923C]/12 to-transparent rounded-br-[48px] pointer-events-none z-0" />

        {/* Ambient Subtle Light Golden & Warm Amber Radial Glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FB923C]/08 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FDE047]/08 rounded-full blur-[160px] pointer-events-none" />

        {/* Clean, Sharp Header Row (Zero Clashing Backgrounds) */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FB923C] shadow-[0_0_8px_#FB923C] animate-pulse" />
              <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#FB923C] font-semibold">
                FEATURED DIWALI VEHICLES
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              Handpicked Festive Deals
              <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full bg-[#FB923C]/15 border border-[#FB923C]/30 text-[#FDE047]">
                {totalCount > 0 ? `${totalCount}+ Deals` : "Limited Edition"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              100% inspected, verified documents, and hassle-free ownership transfer for your festive purchase.
            </p>
          </div>

          {/* Desktop Direct Link */}
          <Link
            href="/diwali-offers"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#FDE047] hover:text-white transition-colors duration-200 group"
          >
            <span>View All {totalCount > 0 ? totalCount : ""} Offers</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#FB923C]" />
          </Link>
        </div>

        {/* 4 Vehicle Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={`diwali-skel-${i}`} className="w-full">
                <VehicleCardSkeleton />
              </div>
            ))
            : vehicles.slice(0, 4).map((car) => (
              <DiwaliVehicleCard
                key={car.id}
                data={car}
                source="diwali-home"
              />
            ))}
        </div>

        {/* Bottom CTA Button - Refined Normal Light Orange */}
        <div className="relative z-10 mt-8 flex justify-center items-center">
          <Link
            href="/diwali-offers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3 rounded-xl font-semibold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] hover:brightness-105 shadow-[0_4px_16px_rgba(251,146,60,0.25)] hover:shadow-[0_6px_22px_rgba(251,146,60,0.35)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-zinc-950 fill-zinc-950" />
            <span className="tracking-wide uppercase">Explore All Diwali Offers</span>
            <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default DiwaliShowcaseSection;
