import React, { useEffect, useState } from "react";
import NavrariVehicleCard from "@/components/ui/const/NavrariVehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { getOfferVehicles } from "@/services/vehicle.service";
import { CarFront, Sparkles } from "lucide-react";

const NavratriSectionExplore = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalDeals, setTotalDeals] = useState(0);

  const fetchVehicles = async (page) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const data = { pageNo: page, size: 12 };
      const res = await getOfferVehicles(data);

      // Hide the section if the backend explicitly sets isLive to false
      if (res?.data?.isLive === false) {
        setVehicles([]);
        setHasMore(false);
        return;
      }

      const list = Array.isArray(res?.data?.vehicles)
        ? res.data.vehicles
        : Array.isArray(res?.data?.content)
          ? res.data.content
          : Array.isArray(res?.data)
            ? res.data
            : [];

      setTotalDeals(res?.pageResponse?.totalElements || res?.data?.totalElements || list.length);

      if (res?.pageResponse) {
        setHasMore(page < res.pageResponse.totalPages);
      } else {
        setHasMore(list.length === 12);
      }

      setVehicles((prev) => (page === 1 ? list : [...prev, ...list]));
    } catch (error) {
      console.error("Error fetching Navratri vehicles:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVehicles(1);
  }, []);

  const handleViewMore = () => {
    const nextPage = pageNo + 1;
    setPageNo(nextPage);
    fetchVehicles(nextPage);
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-[#140E24] via-[#0F0B1A] to-[#120C20] py-5 md:py-8 mt-20 mb-10 rounded-2xl border border-[#F59E0B]/35 shadow-[0_8px_24px_rgba(245,158,11,0.09),0_10px_20px_rgba(0,0,0,0.6)] min-h-[80vh] flex flex-col items-center">

      {/* Background Mandalas and Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-15 pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#9333EA] fill-current animate-[spin_60s_linear_infinite]">
          <path d="M50 0C50 0 55 20 70 20C85 20 100 0 100 0C100 0 80 5 80 20C80 35 100 50 100 50C100 50 80 45 80 60C80 75 100 100 100 100C100 100 85 80 70 80C55 80 50 100 50 100C50 100 45 80 30 80C15 80 0 100 0 100C0 100 20 75 20 60C20 45 0 50 0 50C0 50 20 45 20 30C20 15 0 0 0 0C0 0 15 20 30 20C45 20 50 0 50 0Z" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#9333EA] rounded-full blur-[130px] opacity-20 pointer-events-none translate-x-1/2"></div>
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-[#F59E0B] rounded-full blur-[150px] opacity-15 pointer-events-none"></div>

      {/* Decorative Festive Images */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto pointer-events-none z-0">
        <div className="absolute top-1 sm:top-2 left-0 sm:left-1 md:left-2 w-25 sm:w-32 md:w-40 lg:w-43.5 h-auto opacity-95 pointer-events-none">
          <img src="/navratri-main.png" alt="Navratri Decoration Left" className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.25)]" />
        </div>
        <div className="absolute top-1 sm:top-2 right-0 sm:right-1 md:right-2 md:-top-4 lg:-top-5 w-52 sm:w-64 md:w-[360px] lg:w-[400px] xl:w-[440px] h-auto opacity-95 pointer-events-none z-0">
          <img src="/navratri-dance.png" alt="Navratri Garba Decoration" className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]" />
        </div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-2 relative z-10 flex flex-col items-start">

        {/* Page Header (Left-aligned after main image) */}
        <div className="flex flex-col items-start text-left gap-1 mb-5 md:mb-6 relative z-10 w-full mt-16 sm:mt-20 md:mt-0 ml-0 md:ml-32 lg:ml-40">
          <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-[#FBBF24] animate-pulse">
              <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="currentColor" />
            </svg>
            <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#FBBF24] font-extrabold">
              EXCLUSIVE DEALS
            </p>
            <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-[#FBBF24] to-transparent shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-primary tracking-tight text-white leading-tight">
            <span className="text-[#FBBF24]">Navratri</span> Mega Offers
          </h1>
          <p className="text-[#E2E8F0] max-w-2xl text-xs sm:text-sm md:text-base text-left leading-relaxed mt-0.5 sm:mt-1">
            Explore verified vehicles with festive discounts this season.
          </p>
        </div>

        {/* Interactive Explore Section wrapper (Unified) */}
        <div className="w-full relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-5 gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-[#FBBF24] animate-pulse" /> Explore All Vehicles
            </h2>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {loading
              ? [...Array(8)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
              : vehicles.map((car) => (
                <div
                  key={car.id}
                  className="relative rounded-2xl border border-[#F59E0B]/35 shadow-[0_6px_16px_rgba(0,0,0,0.4),0_2px_14px_rgba(245,158,11,0.05)] hover:border-[#FBBF24] transition-all duration-300 overflow-hidden bg-[#161324] group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#9333EA]/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none z-10" />
                  <div className="relative z-0 h-full w-full">
                    <NavrariVehicleCard data={car} source="navratri-page" />
                  </div>
                </div>
              ))
            }

            {/* Show skeletons at the bottom while loading more data */}
            {loadingMore && [...Array(4)].map((_, i) => (
              <VehicleCardSkeleton key={`skel-more-${i}`} />
            ))}

            {!loading && vehicles.length === 0 && (
              <div className="col-span-full py-24 text-center text-zinc-400 bg-black/50 rounded-2xl border border-white/5 flex flex-col items-center">
                <CarFront className="w-16 h-16 text-zinc-500 mb-4" />
                <p className="text-2xl font-bold text-white mb-2">No Navratri offers available at the moment.</p>
                <p className="text-lg">Please check back later for exciting deals!</p>
              </div>
            )}

            {hasMore && !loading && vehicles.length > 0 && (
              <div className="col-span-full flex justify-center mt-6 mb-4">
                <button
                  onClick={handleViewMore}
                  disabled={loadingMore}
                  className="cursor-pointer bg-gradient-to-r from-[#7C3AED] via-[#5B21B6] to-[#4C1D95] hover:from-[#8B5CF6] hover:via-[#6D28D9] hover:to-[#5B21B6] border border-[#C084FC]/45 hover:border-[#C084FC]/80 text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.55)] rounded-full px-6 py-2 text-base font-semibold flex items-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <span className="animate-pulse">Loading more deals...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FBBF24] animate-pulse" />
                      <span className="tracking-wide">View More Deals</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavratriSectionExplore;
