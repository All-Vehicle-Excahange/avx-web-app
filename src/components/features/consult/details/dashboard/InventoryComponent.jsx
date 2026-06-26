/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useState, useEffect } from "react";
import UserVehicleCard from "@/components/features/user/UserVehicleCard";
import StatCard from "./components/StateCard";
import {
  Smartphone,
  TrendingUp,
  Flame,
  EyeOff,
  AlertTriangle,
  BarChart3,
  ArrowRight,
  Ban,
  ChevronDown,
  Info,
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
  getNeedAttenctionVehiclesInfiniteQuery,
  getSusPendedVehiclesInfiniteQuery,
  getSellerTierQuery,
  getListingLimitsQuery,
} from "@/queries/Seller.queries";
import TopPerformingCard from "./components/TopPerformingCard";
import AddSlotPopup from "./components/AddSlotPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import TopPerformingCardSkeleton from "@/components/ui/skeleton/TopPerformingCardSkeleton";
import UserVehicleCardSkeleton from "@/components/ui/skeleton/UserVehicleCardSkeleton";
import { useRouter } from "next/navigation";

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
    getTopPerformingVehiclesQuery(),
  );

  const topPerforming = topPerformingData || [];

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

  // 4. Need Attention Vehicles Query (Paginated / Load More via Infinite Query)
  const {
    data: needAttentionInfiniteData,
    isFetching: needAttentionLoading,
    fetchNextPage: fetchNextNeedAttentionPage,
    hasNextPage: hasNextNeedAttentionPage,
  } = useInfiniteQuery(getNeedAttenctionVehiclesInfiniteQuery({ pageSize: 6 }));

  const needAttentionVehicles =
    needAttentionInfiniteData?.pages.flatMap((page) => page.data || []) || [];

  const handleViewMoreNeedAttention = () => {
    if (hasNextNeedAttentionPage) {
      fetchNextNeedAttentionPage();
    }
  };

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

        {/* 2️ NOTE */}
        <div className="relative overflow-hidden rounded-xl bg-fourth text-white p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-lg shadow-fourth/20">
          {/* Abstract elements for a premium feel */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 -mb-10 w-32 h-32 bg-black opacity-10 rounded-full blur-xl pointer-events-none"></div>

          {/* Left Content */}
          <div className="flex items-center gap-4 relative z-10 max-w-2xl">
            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-white/10 items-center justify-center backdrop-blur-sm border border-white/10">
              <Info size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <span className="sm:hidden"><Info size={18} /></span> Note
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                Adding and editing vehicles is available on the <span className="text-white font-semibold">Reecomm mobile app</span>. You can still view listings and mark vehicles as sold here.
              </p>
            </div>
          </div>

          {/* Right Button */}
          <div className="w-full lg:w-auto shrink-0 relative z-10">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsDownloadOpen(true)}
              showIcon={false}
              className="w-auto md:w-auto justify-center"
            >
              <Smartphone className="mr-2" size={18} />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* 3️⃣ Inventory Health Snapshot  */}
        <div className="rounded-xl border border-third/20 bg-primary/5 p-5 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-5 border-b border-third/10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
              <TrendingUp className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">Inventory Health Snapshot</h3>
              <p className="text-xs text-third mt-0.5">Track inventory health & performance metrics</p>
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
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-8 md:gap-16 lg:gap-24 rounded-2xl border border-third/30 bg-linear-to-r from-primary/10 to-primary/5 p-5 sm:p-6 shadow-sm">
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

          {/* <Button
            variant="ghost"
            showIcon={false}
            onClick={() => setIsAddSlotOpen(true)}
            className="w-full sm:w-auto shrink-0 shadow-md hover:shadow-lg transition-all"
          >
            Add Top-up
          </Button> */}
        </div>

        {/* 3️⃣ TOP PERFORMING VEHICLES */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="rounded-xl border border-third/30 bg-primary/5 p-5 flex flex-col h-[400px] ">
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
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                  <p className="text-sm text-third">
                    No top performing vehicles yet.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    showIcon={false}
                    onClick={() => {
                      push("/consult/dashboard/ppc");
                    }}
                    className="cursor-pointer"
                  >
                    Boost your vehicles
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-fourth/30 bg-gradient-to-br from-fourth to-fourth/90 p-6 md:p-8 flex flex-col gap-5 shadow-xl shadow-fourth/10 transition-transform duration-300 hover:-translate-y-1 group/card">

            {/* HEADER */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>

                {/* Title */}
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold tracking-wide text-white">
                    Market Insight
                  </span>
                  <span className="text-xs text-white/70 font-medium uppercase tracking-wider">
                    Performance Metric
                  </span>
                </div>
              </div>

              {/* Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
                <span className="text-xs font-bold text-white tracking-wide">
                  +2.3x Conversion
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col gap-3">
              <p className="text-sm md:text-base leading-relaxed text-white/90">
                <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-md">Reecomm</span>{" "}
              <span className="">  inspected vehicles are converting significantly better than
                regular listings.</span>
              </p>
               <p className="text-sm md:text-base leading-relaxed text-white/90">
                <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-md">Reecomm</span>{" "}
                inspected vehicles are converting significantly better than
                regular listings.
              </p>
               <p className="text-sm md:text-base leading-relaxed text-white/90">
                <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-md">Reecomm</span>{" "}
                inspected vehicles are converting significantly better than
                regular listings.
              </p>
               <p className="text-sm md:text-base leading-relaxed text-white/90">
                <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-md">Reecomm</span>{" "}
                inspected vehicles are converting significantly better than
                regular listings.  inspected vehicles are converting 
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-start">
              <Button
                variant="ghost"
                href={"/consult/dashboard/inspection"}
                showIcon={false}
                className="text-sm"
                size="md"
              >
                Inspect More Vehicles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* LISTING LIMIT PROGRESS */}

        {/* 4️⃣ FILTER BAR */}
        <div className="rounded-xl border border-third/30 p-5 flex flex-col lg:flex-row gap-4 justify-between">
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
        <div className="rounded-xl border border-third/30 bg-primary/5 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={18} />
            <h3 className="font-semibold">Vehicles Needing Attention</h3>
          </div>

          {needAttentionLoading && needAttentionVehicles.length === 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              <TopPerformingCardSkeleton />
              <TopPerformingCardSkeleton />
            </div>
          ) : needAttentionVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                {needAttentionVehicles.map((v) => (
                  <TopPerformingCard key={v.id} vehicle={v} />
                ))}
              </div>

              {hasNextNeedAttentionPage && (
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={handleViewMoreNeedAttention}
                    disabled={needAttentionLoading}
                    className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                  >
                    {needAttentionLoading ? "Loading..." : "View More"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-third">No vehicles needing attention.</p>
          )}
        </div>
      </section>
      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
      <AddSlotPopup
        isOpen={isAddSlotOpen}
        onClose={() => setIsAddSlotOpen(false)}
      />
    </>
  );
}
