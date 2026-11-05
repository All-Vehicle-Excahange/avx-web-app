import React, { useEffect, useState, useRef } from "react";
import DiwaliVehicleCard from "@/components/ui/const/DiwaliVehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { getOfferVehicles } from "@/services/vehicle.service";
import DiwaliFirecrackerCanvas from "@/components/features/home/DiwaliFirecrackerCanvas";
import {
  Sparkles,
  Flame,
  ShieldCheck,
} from "lucide-react";

const PAGE_SIZE = 16;

const DiwaliOffersExplore = () => {
  const [allFetchedVehicles, setAllFetchedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalElements, setTotalElements] = useState(0);

  const cardsContainerRef = useRef(null);

  // Fetch offer vehicles
  const fetchVehicles = async (page) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await getOfferVehicles({
        pageNo: page,
        size: PAGE_SIZE,
      });

      // If campaign is explicitly marked not live, clear and stop
      if (res?.data?.isLive === false) {
        setAllFetchedVehicles([]);
        setTotalElements(0);
        setHasMore(false);
        return;
      }

      const list = Array.isArray(res?.data?.vehicles)
        ? res.data.vehicles
        : Array.isArray(res?.data?.content)
          ? res.data.content
          : Array.isArray(res?.data?.data)
            ? res.data.data
            : Array.isArray(res?.data)
              ? res.data
              : [];

      // Extract pagination details from all possible API response formats
      const pagination =
        res?.pagination ||
        res?.pageResponse ||
        res?.data?.pageResponse ||
        res?.data?.pagination ||
        {};

      const total =
        pagination?.totalElements ??
        pagination?.total ??
        res?.data?.totalElements ??
        res?.data?.totalCount ??
        (page === 1 ? list.length : totalElements);

      const totalPages =
        pagination?.totalPages ??
        res?.data?.totalPages ??
        (total > 0 ? Math.ceil(total / PAGE_SIZE) : 1);

      const isLast =
        pagination?.last ??
        res?.data?.last;

      // Check if more items can be fetched
      let moreAvailable = false;
      if (typeof isLast === "boolean") {
        moreAvailable = !isLast && list.length > 0;
      } else if (totalPages && totalPages > 1) {
        moreAvailable = page < totalPages && list.length > 0;
      } else {
        // Fallback: if we got a full page of items, next page likely has more
        moreAvailable = list.length >= PAGE_SIZE;
      }

      setTotalElements(total);
      setHasMore(moreAvailable);
      setPageNo(page);

      setAllFetchedVehicles((prev) => {
        if (page === 1) return list;
        // Deduplicate vehicles by id to prevent duplicate keys
        const existingIds = new Set(prev.map((v) => v.id));
        const uniqueList = list.filter((v) => !existingIds.has(v.id));
        return [...prev, ...uniqueList];
      });
    } catch (error) {
      console.error("Error fetching Diwali offers:", error);
      if (page === 1) {
        setAllFetchedVehicles([]);
        setTotalElements(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVehicles(1);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = pageNo + 1;
    fetchVehicles(nextPage);
  };

  return (
    <div className="w-full relative min-h-screen pt-20 sm:pt-24 md:pt-28 pb-16">
      
      {/* ============================================================== */}
      {/* --- HERO BANNER SECTION (CINEMATIC PANORAMIC ROYAL HERO) ---   */}
      {/* ============================================================== */}
      <section
        aria-label="Diwali Festive Hero Banner"
        className="w-full relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#F59E0B]/40 shadow-[0_16px_50px_rgba(0,0,0,0.85)] bg-black min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] aspect-[1024/380] sm:aspect-[1024/341] mb-8 md:mb-12"
      >
        {/* Real-time Simultaneous Firecracker Canvas Animation */}
        <DiwaliFirecrackerCanvas className="z-20 pointer-events-auto" />

        {/* Panoramic Festive Hero Banner Visual (Matching Royal Indigo-to-Magenta Gradient) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/diwali/diwali-panoramic-hero-gradient.jpg"
            alt="Shubh Deepawali, Shubh Muhurat Deals"
            className="w-full h-full object-cover object-right sm:object-center select-none"
            fetchPriority="high"
          />
        </div>

        {/* Banner Content Overlay */}
        <div className="relative z-10 w-full h-full min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] flex flex-col justify-between p-5 sm:p-7 md:p-9 lg:p-11">

          {/* Top Pill: REECOMM DIWALI FESTIVAL */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-[#F59E0B]/60 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#FDE047]">
                REECOMM DIWALI FESTIVAL 2026
              </span>
            </div>
          </div>

          {/* Headline & Subtitle Area */}
          <div className="max-w-md sm:max-w-xl flex flex-col items-start gap-2.5 sm:gap-3 py-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
              Shubh Deepawali,{" "}
              <span className="block bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                Shubh Muhurat Deals.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-zinc-100 font-medium leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Bring home your dream car or bike this auspicious festive season. Handpicked verified pre-owned vehicles with festive exchange bonuses and immediate paperwork.
            </p>

            {/* Live Count & Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/75 border border-[#F59E0B]/50 backdrop-blur-md text-xs sm:text-sm font-bold text-[#FDE047] shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                <Sparkles className="w-4 h-4 text-[#FDE047] animate-pulse" />
                <span>
                  {totalElements > 0 ? `${totalElements} Festive Deals Available` : "Exclusive Festive Deals"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/75 border border-emerald-500/50 backdrop-blur-md text-xs sm:text-sm font-bold text-emerald-300 shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Inspected &amp; Verified</span>
              </div>
            </div>
          </div>

          {/* Bottom spacing anchor */}
          <div />
        </div>
      </section>

      {/* --- RESULTS HEADER --- */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
          <span>Explore All Diwali Offers</span>
          <span className="text-xs sm:text-sm font-normal text-purple-200/70">
            ({totalElements > 0 && totalElements > allFetchedVehicles.length
              ? `Showing ${allFetchedVehicles.length} of ${totalElements}`
              : `${allFetchedVehicles.length} vehicles available`})
          </span>
        </h2>
      </div>

      {/* --- VEHICLE GRID --- */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        {loading
          ? Array.from({ length: 16 }).map((_, i) => (
              <div key={`explore-skel-${i}`} className="w-full">
                <VehicleCardSkeleton />
              </div>
            ))
          : allFetchedVehicles.map((car) => (
              <DiwaliVehicleCard
                key={car.id}
                data={car}
                source="diwali-explore"
              />
            ))}

        {/* Skeleton cards shown at the bottom while loading more data */}
        {loadingMore &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={`explore-skel-more-${i}`} className="w-full">
              <VehicleCardSkeleton />
            </div>
          ))}
      </div>

      {/* --- EMPTY STATE --- */}
      {!loading && allFetchedVehicles.length === 0 && (
        <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-[#FFD700]/30 bg-[#1b0536]/80 my-6 shadow-[0_8px_30px_rgba(20,2,38,0.7)]">
          <div className="w-14 h-14 rounded-full bg-[#DC2626]/20 border border-[#FFD700]/40 flex items-center justify-center mb-4">
            <Flame className="w-7 h-7 text-[#FFD700]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1.5">No Festive Deals Found</h3>
          <p className="text-sm text-purple-200/70 max-w-md mb-5">
            Festive vehicles are currently being refreshed. Please check back soon!
          </p>
        </div>
      )}

      {/* --- LOAD MORE BUTTON --- */}
      {!loading && hasMore && allFetchedVehicles.length > 0 && (
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] hover:brightness-110 shadow-[0_4px_22px_rgba(245,158,11,0.45)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loadingMore ? (
              <>
                <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>Loading More Deals...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-zinc-950" />
                <span>Load More Diwali Offers</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* End of results indicator */}
      {!loading && !hasMore && allFetchedVehicles.length > 16 && (
        <div className="mt-8 text-center text-xs sm:text-sm text-purple-200/50">
          ✦ You've reached the end of all Diwali offers ✦
        </div>
      )}

    </div>
  );
};

export default DiwaliOffersExplore;
