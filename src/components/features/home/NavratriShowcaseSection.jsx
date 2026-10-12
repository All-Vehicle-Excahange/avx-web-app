import React, { useEffect, useState } from "react";
import NavrariVehicleCard from "@/components/ui/const/NavrariVehicleCard";
import Button from "@/components/ui/button";
import { getOfferVehicles } from "@/services/vehicle.service";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { ArrowRight, Sparkles } from "lucide-react";

const NavratriShowcaseSection = () => {
  const [vehicle, setVehicle] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = {
          pageNo: 1,
          size: 4,
        };
        const res = await getOfferVehicles(data);

        // Hide the section if the backend explicitly sets isLive to false
        if (res?.data?.isLive === false) {
          setVehicle([]);
          setTotalCount(0);
          return;
        }

        const list = Array.isArray(res?.data?.vehicles)
          ? res.data.vehicles
          : Array.isArray(res?.data?.content)
            ? res.data.content
            : Array.isArray(res?.data)
              ? res.data
              : [];

        setVehicle(list);
        setTotalCount(res?.pagination?.totalElements || res?.pagination?.total || list.length);
      } catch (error) {
        console.error("Error fetching Navratri vehicles:", error);
        setVehicle([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (!loading && (!Array.isArray(vehicle) || vehicle.length === 0)) return null;

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-[#140E24] via-[#0F0B1A] to-[#120C20] py-6 md:py-10 my-6 md:my-8 rounded-2xl border border-[#F59E0B]/35 shadow-[0_8px_24px_rgba(245,158,11,0.09),0_10px_20px_rgba(0,0,0,0.6)]">

      {/* --- BACKGROUND DECORATIONS (Festive Images) --- */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto pointer-events-none z-0">
        {/* Top Left Festive Mandala Art (navratri-main.png) */}
        <div className="absolute top-1 sm:top-2 left-0 sm:left-1 md:left-2 w-28 sm:w-36 md:w-48 lg:w-56 h-auto opacity-95 pointer-events-none">
          <img src="/navratri-main.png" alt="Navratri Decoration Left" className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.25)]" />
        </div>

        {/* Top Right Garba Dancers (navratri-dance.png) */}
        <div className="absolute top-1 sm:top-2 right-0 sm:right-1 md:right-2 md:-top-4 lg:-top-5 w-52 sm:w-64 md:w-[360px] lg:w-[400px] xl:w-[440px] h-auto opacity-95 pointer-events-none z-0">
          <img src="/navratri-dance.png" alt="Navratri Garba Dancers" className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]" />
        </div>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#9333EA] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-10 right-40 w-96 h-96 bg-[#F59E0B] rounded-full blur-[150px] opacity-15 pointer-events-none"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-2 relative z-10">

        {/* Header Matching Image */}
        <div className="flex flex-col items-start gap-1 mb-5 md:mb-6 mt-20 sm:mt-24 md:mt-0 ml-0 md:ml-36 lg:ml-48 relative z-10">
          <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-[#FBBF24] animate-pulse">
              <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="currentColor" />
            </svg>
            <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#FBBF24] font-extrabold">
              NAVRATRI SPECIAL
            </p>
            <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-[#FBBF24] to-transparent shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-primary tracking-tight text-white leading-tight">
            Aa Navratri, Kaik Navu Kariye.<br />
            <span className="text-[#FBBF24]">
              Gaadi thi sharu kariye?
            </span>
          </h2>
          <p className="text-zinc-300 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed mt-0.5 sm:mt-1">
            Your dream car or bike could be closer than you think. Explore festive deals on selected vehicles.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
          {loading
            ? [...Array(4)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
            : vehicle.map((car) => (
              <div
                key={car.id}
                className="relative rounded-2xl border border-[#F59E0B]/35 shadow-[0_6px_16px_rgba(0,0,0,0.4),0_2px_14px_rgba(245,158,11,0.05)] hover:border-[#FBBF24] transition-all duration-300 overflow-hidden bg-[#161324] group"
              >
                {/* Use the newly styled NavrariVehicleCard */}
                <div className="relative z-0 h-full w-full">
                  <NavrariVehicleCard data={car} source="navratri-home" />
                </div>
              </div>
            ))
          }
        </div>

        {/* Bottom Button (Same height as Explore All Vehicles) */}
        <div className="mt-6 md:mt-7 relative flex justify-end">
          {/* Festive Navratri CTA Button */}
          <div className="relative z-10">
            <Button
              href="/navratri-offers"
              size="md"
              className="bg-gradient-to-r from-[#7C3AED] via-[#5B21B6] to-[#4C1D95] hover:from-[#8B5CF6] hover:via-[#6D28D9] hover:to-[#5B21B6] border border-[#C084FC]/45 hover:border-[#C084FC]/80 text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.55)] rounded-full font-semibold transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-[#FBBF24] animate-pulse" />
              <span className="tracking-wide">Explore Navratri Deals</span>
              <ArrowRight className="w-4 h-4 ml-0.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavratriShowcaseSection;
