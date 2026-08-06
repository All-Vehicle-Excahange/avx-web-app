/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import UserVehicleCard from "@/components/features/user/UserVehicleCard";
import StatCard from "./components/StateCard";
import {
  Smartphone,
  TrendingUp,
  Flame,
  EyeOff,
  BarChart3,
  ArrowRight,
  Ban,
  ChevronDown,
  Info,
  AlertTriangle,
  Download,
  Zap,
  Rocket,
} from "lucide-react";
import Button from "@/components/ui/button";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getInventoryVehicleInfiniteQuery,
  getTopPerformingVehiclesQuery,
  getInventorySnapShotCountQuery,
  getSusPendedVehiclesInfiniteQuery,
  getSellerTierQuery,
  getListingLimitsQuery,
} from "@/queries/Seller.queries";
import TopPerformingCard from "./components/TopPerformingCard";
import AddSlotPopup from "./components/AddSlotPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import ListingPopup from "@/components/ui/const/ListingPopup";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import TopPerformingCardSkeleton from "@/components/ui/skeleton/TopPerformingCardSkeleton";
import UserVehicleCardSkeleton from "@/components/ui/skeleton/UserVehicleCardSkeleton";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

export default function InventoryComponent() {
  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "DRAFT", label: "Draft" },
    { id: "LIVE", label: "Live" },
    { id: "PENDING", label: "Pending" },
    { id: "SOLD", label: "Sold" },
    { id: "REJECTED", label: "Rejected" },
    { id: "REQUEST_CHANGES", label: "Request Changes" },
    { id: "SUSPENDED", label: "Suspended" },
  ];

  // Map API response to the shape UserVehicleCard expects
  const mapVehicle = (v) => ({
    id: v.id,
    title: `${v.makerName} ${v.modelName} ${v.variantName}`,
    year: v.yearOfMfg,
    transmission: v.transmissionType,
    fuel: v.fuelType,
    ownership: v.ownership,
    price: v.price,
    image: v.thumbnailUrl || "/big_card_car.jpg",
    location: v.address?.city || v.address?.state || "Location not set",
    verificationStatus: v.verificationStatus,
    inspectionStatus: v.inspectionStatus,
    inspectionBadgeUrl: v.inspectionBadgeUrl,
    consultantName: v.consultantName,
    closingPrice: v.closingPrice,
    isWishlisted: v.isWishlisted,
    suspendReason: v.suspendReason,
    adminRemark: v.adminRemark,
    vehicleSuspenseType: v.vehicleSuspenseType,
    listingStatus: v.listingStatus,
  });

  const [activeType, setActiveType] = useState("all");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [isListingOpen, setIsListingOpen] = useState(false);
  const [topPerformingPage, setTopPerformingPage] = useState(1);

  const queryClient = useQueryClient();
  const { push } = useRouter();

  // 1. Inventory Vehicles Query (Paginated / Load More via Infinite Query)
  let vehicleStatus;
  if (activeType === "all") {
    vehicleStatus = undefined;
  } else if (activeType === "PENDING") {
    vehicleStatus = "REQUESTED";
  } else {
    vehicleStatus = activeType;
  }

  const {
    data: vehiclesInfiniteData,
    isFetching: vehiclesLoading,
    fetchNextPage: fetchNextVehiclesPage,
    hasNextPage: hasNextVehiclesPage,
    refetch: refetchVehicles,
  } = useInfiniteQuery({
    ...getInventoryVehicleInfiniteQuery({
      listingStatus: vehicleStatus,
      pageSize: 9,
    }),
    enabled: activeType !== "SUSPENDED",
  });

  const vehicles =
    vehiclesInfiniteData?.pages.flatMap((page) => page.data || []) || [];

  // 2. Top Performing Vehicles Query
  const { data: topPerformingData, isLoading: topPerformingLoading } = useQuery(
    getTopPerformingVehiclesQuery({ pageNo: topPerformingPage, size: 3 }),
  );

  const topPerforming = topPerformingData?.data || [];

  // 3. Inventory Snapshot Count Query
  const {
    data: snapshotData,
    isLoading: snapshotLoading,
    refetch: refetchSnapshot,
  } = useQuery(getInventorySnapShotCountQuery());

  const inventorySnapShotCount = snapshotData || {};

  const { data: sellerTierData } = useQuery(getSellerTierQuery());

  // 6. Listing Limits Query
  const {
    data: listingLimitsData,
    isLoading: listingLimitsLoading,
    refetch: refetchListingLimits,
  } = useQuery(getListingLimitsQuery());

  const maxLimit = listingLimitsData?.maxVehicleListingCount ?? 0;
  const currentCount = listingLimitsData?.currentVehicleListingCount ?? 0;
  const percentage =
    maxLimit > 0 ? Math.min((currentCount / maxLimit) * 100, 100) : 0;
  const isNearLimit = maxLimit > 0 && maxLimit - currentCount <= 2;

  // 5. Suspended Vehicles Query (Paginated / Load More via Infinite Query)
  const {
    data: suspendedInfiniteData,
    isFetching: suspendedLoading,
    fetchNextPage: fetchNextSuspendedPage,
    hasNextPage: hasNextSuspendedPage,
  } = useInfiniteQuery(getSusPendedVehiclesInfiniteQuery({ pageSize: 9 }));

  const suspendedVehicles =
    suspendedInfiniteData?.pages.flatMap((page) => page.data || []) || [];
  const suspendedCount =
    suspendedInfiniteData?.pages[0]?.pagination?.totalElements ??
    suspendedInfiniteData?.pages[0]?.pageResponse?.totalElements ??
    0;

  // Reset page and list when activeType changes
  useEffect(() => {
    if (activeType === "SUSPENDED") {
      queryClient.invalidateQueries({
        queryKey: ["seller-suspended-vehicles-infinite"],
      });
    }
  }, [activeType]);

  return (
    <>
      <section className="w-full space-y-8">
        {/* 1️⃣ TITLE + BUTTON */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Inventory Activity</h1>
            <p className="text-third text-sm mt-1">
              Track inventory health & performance
            </p>
          </div>
        </div>

        {/* 2️ NOTE / MANAGE INVENTORY BANNER */}
        <div className="relative overflow-hidden rounded-2xl flex flex-col lg:flex-row items-center justify-between min-h-[280px] shadow-sm border border-third/10 bg-[#0A58F9]  ">
          {/* Background Image */}
          <Image
            src="/seller/chatsbg.webp"
            loading="lazy"
            alt="Background"
            fill
            className="object-cover pointer-events-none"
          />

          {/* Left Content */}
          <div className="relative z-10 flex flex-col p-6 md:p-10 w-full lg:w-3/5">
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-3 tracking-tight leading-[1.1] drop-shadow-sm">
              Manage Your Inventory
              <br />
              On the <span className="font-extrabold">Go</span>
            </h2>
            <p className="text-sm md:text-[15px] text-white/90 leading-relaxed font-medium mb-6 max-w-[500px] drop-shadow-sm">
              Adding and improve vehicle listing is available on the{" "}
              <span className="font-bold">Reecomm mobile app</span>. You can
              still view listings and mark vehicles as sold here.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="ghost"
                className="w-fit"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsListingOpen(true); // Or download link
                }}
              >
                <Download size={20} strokeWidth={2.5} />
                Download App
              </Button>
            </div>
          </div>

          {/* Right Content - Dual Phones */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none z-10 opacity-30 lg:opacity-100">
            {/* Phone 1 (Back) */}
            <Image
              src="/seller/mobile.webp"
              alt="Mobile App View"
              width={400}
              height={700}
              className="absolute right-[20%] lg:right-[42%] bottom-[-10%] lg:bottom-[-50%] h-[90%] lg:h-[120%] w-auto object-contain drop-shadow-2xl rotate-[15deg] scale-90 brightness-75 transition-transform duration-700"
            />
            {/* Phone 2 (Front) */}
            <Image
              src="/seller/mobile.webp"
              alt="Mobile App View"
              width={400}
              height={700}
              className="absolute right-[-10%] lg:right-[-5%] bottom-[-5%] lg:bottom-[-1%] h-[100%] lg:h-[130%] w-auto object-contain drop-shadow-2xl rotate-[15deg] z-10 transition-transform duration-700 "
            />
          </div>
        </div>

        {/* 3️⃣ Inventory Health Snapshot  */}
        <div className="rounded-xl bg-primary/5 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-5 border-b border-third/10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
              <TrendingUp className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">
                Inventory Health Snapshot
              </h3>
              <p className="text-xs text-third mt-0.5">
                Track inventory health & performance metrics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snapshotLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <div className="cursor-pointer">
                  <StatCard
                    icon={<Flame className="text-green-500" size={20} />}
                    label="High Demand"
                    value={`${inventorySnapShotCount.highDemandCount} `}
                  />
                </div>

                <div className="cursor-pointer">
                  <StatCard
                    icon={<EyeOff className="text-yellow-500" size={20} />}
                    label="Low Visibility"
                    value={`${inventorySnapShotCount.lowDemandCount} `}
                  />
                </div>

                <div className="cursor-pointer">
                  <StatCard
                    icon={<AlertTriangle className="text-red-500" size={20} />}
                    label="Needs Attention"
                    value={`${inventorySnapShotCount.needsAttentionCount} `}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* LISTING LIMIT PROGRESS */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-8 md:gap-16 lg:gap-24 rounded-2xl bg-primary/5 p-6 shadow-sm">
          <div className="flex-1 flex flex-col gap-3.5 w-full">
            <div className="flex items-center justify-between">
              <span className="text-third text-xs uppercase tracking-widest font-semibold">
                Listing Limit
              </span>
              {listingLimitsLoading ? (
                <span className="text-third text-xs">Loading limits...</span>
              ) : (
                <span
                  className={`font-bold text-base ${isNearLimit ? "text-red-500 animate-pulse" : "text-primary"}`}
                >
                  {currentCount}{" "}
                  <span className="text-third font-medium text-sm">
                    / {maxLimit} Listed
                  </span>
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-third/20 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  isNearLimit ? "bg-red-500" : "bg-primary"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {isNearLimit && (
            <Button
              variant="ghost"
              size="sm"
              showIcon={false}
              onClick={() => push("/consult/subscription")}
              className="w-full sm:w-auto shrink-0 shadow-md hover:shadow-lg transition-all cursor-pointer text-xs md:text-sm whitespace-nowrap"
            >
              Get More Slots
            </Button>
          )}
        </div>

        {/* 3️⃣ TOP PERFORMING VEHICLES */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="rounded-xl bg-primary/5 p-6 flex flex-col h-[400px] ">
            {/* HEADER (fixed) */}
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-primary" size={18} />
              <h3 className="font-semibold">Top Performing Vehicles</h3>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-3">
              {topPerformingLoading ? (
                <>
                  <TopPerformingCardSkeleton />
                  <TopPerformingCardSkeleton />
                  <TopPerformingCardSkeleton />
                </>
              ) : topPerforming.length > 0 ? (
                topPerforming.map((v, index) => (
                  <TopPerformingCard key={v.id} vehicle={v} rank={index + 1} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-6 px-4 space-y-2">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/20 flex items-center justify-center mb-1">
                    <Zap size={14} />
                  </div>
                  <p className="text-base font-semibold text-white">
                    No top performers yet
                  </p>
                  <p className="text-xs text-third leading-relaxed max-w-xs">
                    Listings that receive the most inquiries will appear here.
                    Add inspection reports and complete your listing details
                    to get more traction.
                  </p>
                  <Button
                    href="/consult/dashboard/ppc"
                    variant="ghost"
                    className="px-3 py-1.5 text-xs gap-1.5 mt-2"
                  >
                    <Rocket size={20} strokeWidth={2} />
                    Boost your vehicles
                  </Button>
                </div>
              )}
            </div>

            {topPerforming.length > 0 && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-third/10">
                <Button
                  variant="ghost"
                  onClick={() => {
                    push("/consult/dashboard/ppc");
                  }}
                  className="px-3 py-1.5 text-xs"
                >
                  Boost your vehicles
                </Button>
                <div className="transform scale-[0.8] origin-right -mt-4 -mr-2">
                  <Pagination
                    currentPage={topPerformingPage}
                    totalPages={topPerformingData?.pageResponse?.totalPages || 1}
                    onPageChange={setTopPerformingPage}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="rounded-xl overflow-hidden h-[400px] bg-fourth flex relative">
            <div className="z-10 flex flex-col justify-center pl-6 sm:pl-10 xl:pl-6 2xl:pl-10 h-full text-white">
              <h2 className="text-3xl md:text-[38px] lg:text-[42px] xl:text-3xl 2xl:text-[42px] font-black tracking-wide relative z-20">
                Book
                <br />
                Vehicle
                <br />
                Inspection
              </h2>

              <div className="w-[80%] max-w-[220px] xl:max-w-[160px] 2xl:max-w-[220px] h-[2px] bg-gradient-to-r from-white to-transparent my-4 2xl:my-6"></div>

              <p className="text-sm md:text-[15px] xl:text-[13px] 2xl:text-[15px] font-medium leading-relaxed max-w-[220px] xl:max-w-[180px] 2xl:max-w-[220px] mb-6 2xl:mb-8 relative z-20">
                verified vehicles receive more buyer attention.
              </p>

              <Button
                variant="ghost"
                className="w-fit text-fourth"
                onClick={() => push("/consult/dashboard/inspection")}
                showIcon={false}
              >
                Inspect now
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 h-full flex justify-end pointer-events-none overflow-hidden">
              <Image
                src="/seller/market.webp"
                alt="Market Insight"
                width={400}
                height={400}
                className="h-full w-auto max-w-none object-right"
              />
            </div>
          </div>
        </div>

        {/* LISTING LIMIT PROGRESS */}

        {/* 4️⃣ FILTER BAR */}
        <div className="rounded-xl bg-primary/5 p-6 flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {vehicleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 cursor-pointer rounded-full border text-sm transition
                  ${
                    activeType === type.id
                      ? "bg-primary text-secondary border-primary"
                      : "border-third/40 hover:bg-primary/10"
                  }`}
              >
                {type.id === "SUSPENDED" && (
                  <Ban size={12} className="inline mr-1.5 -mt-0.5" />
                )}
                {type.label}
                {type.id === "SUSPENDED" && ` (${suspendedCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* 5️⃣ VEHICLE GRID — normal tabs */}
        {activeType !== "SUSPENDED" && (
          <div className="w-full space-y-6">
            {vehiclesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
                {[...Array(6)].map((_, i) => (
                  <UserVehicleCardSkeleton key={i} />
                ))}
              </div>
            ) : vehicles?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
                  {vehicles.map((car) => (
                    <UserVehicleCard
                      key={car.id}
                      data={mapVehicle(car)}
                      status={car.listingStatus?.toLowerCase()}
                      avxInspected={car.inspectionStatus === "AI_INSPECTED"}
                      inquiries={car.totalInquiries}
                      chats={car.approvedInquiries}
                      onRefresh={() => {
                        refetchVehicles();
                        refetchSnapshot();
                        refetchListingLimits();
                      }}
                    />
                  ))}
                </div>

                {hasNextVehiclesPage && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextVehiclesPage()}
                      disabled={vehiclesLoading}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      {vehiclesLoading ? "Loading..." : "View More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border-2 border-dashed border-third/20 bg-third/5">
                {activeType === "all" ? (
                  <>
                    <h3 className="text-xl font-bold mb-2">
                      You havent listed any vehicles yet.
                    </h3>
                    <p className="text-third mb-6">
                      Add vehicles in the Reecomm mobile app to start receiving
                      inquiries.
                    </p>
                    <Button variant="ghost" size="sm" showIcon={false}>
                      Download App
                    </Button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2">
                      No vehicles found.
                    </h3>
                    <p className="text-third">
                      There are currently no vehicles with this status.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* 5️⃣ SUSPENDED VEHICLES SECTION */}
        {activeType === "SUSPENDED" && (
          <div className="w-full space-y-4">
            {suspendedLoading && suspendedVehicles.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <UserVehicleCardSkeleton key={i} />
                ))}
              </div>
            ) : suspendedVehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {suspendedVehicles.map((car) => (
                    <UserVehicleCard
                      key={car.id}
                      data={mapVehicle(car)}
                      status="suspended"
                      avxInspected={car.inspectionStatus === "AI_INSPECTED"}
                      inquiries={car.totalInquiries}
                      chats={car.approvedInquiries}
                      onRefresh={() => {
                        queryClient.invalidateQueries({
                          queryKey: ["seller-suspended-vehicles-infinite"],
                        });
                        refetchListingLimits();
                      }}
                    />
                  ))}{" "}
                </div>

                {hasNextSuspendedPage && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextSuspendedPage()}
                      disabled={suspendedLoading}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      {suspendedLoading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border-2 border-dashed border-red-500/20 bg-red-500/5">
                <Ban size={32} className="text-red-400/40 mb-3" />
                <h3 className="text-xl font-bold mb-2">
                  No suspended vehicles.
                </h3>
                <p className="text-third">
                  None of your listings are currently suspended.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
      <ListingPopup
        isOpen={isListingOpen}
        onClose={() => setIsListingOpen(false)}
      />
      <AddSlotPopup
        isOpen={isAddSlotOpen}
        onClose={() => setIsAddSlotOpen(false)}
      />
    </>
  );
}
