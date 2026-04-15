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
} from "lucide-react";
import Button from "@/components/ui/button";
import {
  getInventoryVehicle,
  getTopPerformingVehicles,
  getInventorySnapShotCount,
  getNeedAttenctionVehicles,
  getSusPendedVehicles,
} from "@/services/Seller.service";
import TopPerformingCard from "./components/TopPerformingCard";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import TopPerformingCardSkeleton from "@/components/ui/skeleton/TopPerformingCardSkeleton";
import UserVehicleCardSkeleton from "@/components/ui/skeleton/UserVehicleCardSkeleton";

export default function InventoryComponent() {
  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "DRAFT", label: "Draft" },
    { id: "LIVE", label: "Live" },
    { id: "SOLD", label: "Sold" },
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
  });

  const [activeType, setActiveType] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [topPerforming, setTopPerforming] = useState([]);
  const [inventorySnapShotCount, setInventorySnapShotCount] = useState([]);

  // Loading states
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [topPerformingLoading, setTopPerformingLoading] = useState(false);
  const [snapshotLoading, setSnapshotLoading] = useState(false);

  // Need Attention vehicles state
  const [needAttentionVehicles, setNeedAttentionVehicles] = useState([]);
  const [needAttentionPage, setNeedAttentionPage] = useState(1);
  const [needAttentionTotalPages, setNeedAttentionTotalPages] = useState(1);
  const [needAttentionLoading, setNeedAttentionLoading] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Suspended vehicles state
  const [suspendedVehicles, setSuspendedVehicles] = useState([]);
  const [suspendedPage, setSuspendedPage] = useState(1);
  const [suspendedPageSize] = useState(9);
  const [suspendedTotalPages, setSuspendedTotalPages] = useState(1);
  const [suspendedLoading, setSuspendedLoading] = useState(false);

  const fetchVehicles = async () => {
    try {
      setVehiclesLoading(true);
      const status = activeType === "all" ? undefined : activeType;
      const res = await getInventoryVehicle(status);
      setVehicles(res.data || []);
      setVisibleCount(9);
    } catch (error) {
      console.log(error);
    } finally {
      setVehiclesLoading(false);
    }
  };

  const fetchSuspendedVehicles = async (pageNo = 1) => {
    try {
      setSuspendedLoading(true);
      const res = await getSusPendedVehicles({
        pageNo,
        pageSize: suspendedPageSize,
      });
      if (pageNo === 1) {
        setSuspendedVehicles(res.data || []);
      } else {
        setSuspendedVehicles((prev) => [...prev, ...(res.data || [])]);
      }
      setSuspendedTotalPages(res.pageResponse?.totalPages || 1);
      setSuspendedPage(pageNo);
    } catch (error) {
      console.log(error);
    } finally {
      setSuspendedLoading(false);
    }
  };

  useEffect(() => {
    if (activeType === "SUSPENDED") {
      setSuspendedVehicles([]);
      setSuspendedPage(1);
      fetchSuspendedVehicles(1);
    } else {
      fetchVehicles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  useEffect(() => {
    const fetchTopPerforming = async () => {
      try {
        setTopPerformingLoading(true);
        const res = await getTopPerformingVehicles();
        setTopPerforming(res.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setTopPerformingLoading(false);
      }
    };
    fetchTopPerforming();
  }, []);

  const fetchInventorySnapShotCount = async () => {
    try {
      setSnapshotLoading(true);
      const res = await getInventorySnapShotCount();
      setInventorySnapShotCount(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSnapshotLoading(false);
    }
  };

  useEffect(() => {
    fetchInventorySnapShotCount();
  }, []);

  // Fetch Need Attention Vehicles (paginated)
  const fetchNeedAttentionVehicles = async (pageNo = 1) => {
    try {
      setNeedAttentionLoading(true);
      const res = await getNeedAttenctionVehicles({ pageNo, size: 6 });
      if (pageNo === 1) {
        setNeedAttentionVehicles(res.data || []);
      } else {
        setNeedAttentionVehicles((prev) => [...prev, ...(res.data || [])]);
      }
      setNeedAttentionTotalPages(res.pageResponse?.totalPages || 1);
      setNeedAttentionPage(pageNo);
    } catch (error) {
      console.log(error);
    } finally {
      setNeedAttentionLoading(false);
    }
  };

  useEffect(() => {
    fetchNeedAttentionVehicles(1);
  }, []);

  const handleViewMoreNeedAttention = () => {
    if (needAttentionPage < needAttentionTotalPages) {
      fetchNeedAttentionVehicles(needAttentionPage + 1);
    }
  };

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

        {/* 2️⃣ NOTE */}
        <div className="rounded-xl bg-fourth text-white p-5 md:p-8 min-h-[150px] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md">
          {/* Left Content */}
          <div className="max-w-[500px]">
            <p className="text-sm md:text-base leading-relaxed">
              <span className="font-semibold">Note:</span> Adding and editing
              vehicles is available on the Reecomm mobile app. You can still
              view listings and mark vehicles as sold here.
            </p>
          </div>

          {/* Right Button */}
          <div className="w-full md:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDownloadOpen(true)}
              showIcon={false}
              className="w-auto md:w-auto justify-center"
            >
              <Smartphone className="mr-3" size={16} />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* 3️⃣ Inventory Health Snapshot  */}
        <div className="rounded-xl border border-third/30 bg-primary/5 p-5 space-y-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary" size={18} />
            <h3 className="font-semibold">Inventory Health Snapshot</h3>
            {/* <span className="px-3 py-1 rounded-full bg-primary/10 text-xs">
              Auto-generated
            </span> */}
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
                      // Using window.scrollTo or providing a simple anchor interaction
                      window.scrollTo({ top: 500, behavior: "smooth" });
                    }}
                    className="cursor-pointer"
                  >
                    Boost your vehicles
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-fourth p-5 md:p-6 flex flex-col gap-5 hover:shadow-lg transition-all">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-primary">
                  <BarChart3 className="w-5 h-5" />
                </div>

                {/* Title */}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold tracking-wide text-primary">
                    Insight
                  </span>
                  <span className="text-xs text-primary/60">
                    Performance metric
                  </span>
                </div>
              </div>

              {/* Badge */}
              <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-primary font-semibold">
                +2.3×
              </span>
            </div>

            {/* CONTENT */}
            <p className="text-sm md:text-base leading-relaxed text-white/90">
              <span className="text-primary font-semibold">AVX</span> inspected
              vehicles are converting significantly better than regular
              listings.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-white/90">
              <span className="text-primary font-semibold">AVX</span> inspected
              vehicles are converting significantly better than regular
              listings.
            </p>

            {/* FOOTER */}
            <div className="flex justify-start">
              <Button variant="ghost" showIcon={false} className="text-sm">
                Inspect More Vehicles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

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
                  {vehicles.slice(0, visibleCount).map((car) => (
                    <UserVehicleCard
                      key={car.id}
                      data={mapVehicle(car)}
                      status={car.listingStatus?.toLowerCase()}
                      avxInspected={car.inspectionStatus === "AI_INSPECTED"}
                      inquiries={car.totalInquiries}
                      chats={car.approvedInquiries}
                      onRefresh={() => {
                        fetchVehicles();
                        fetchInventorySnapShotCount();
                      }}
                    />
                  ))}
                </div>

                {visibleCount < vehicles.length && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setVisibleCount((prev) => prev + 9)}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      View More
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
                      Add vehicles in the AVX mobile app to start receiving
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
            {suspendedLoading && suspendedPage === 1 ? (
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
                      onRefresh={() => fetchSuspendedVehicles(1)}
                    />
                  ))}{" "}
                </div>

                {suspendedPage < suspendedTotalPages && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchSuspendedVehicles(suspendedPage + 1)}
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

          {needAttentionLoading && needAttentionPage === 1 ? (
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

              {needAttentionPage < needAttentionTotalPages && (
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
    </>
  );
}
