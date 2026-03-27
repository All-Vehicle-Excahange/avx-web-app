"use client";

import { useState, useEffect } from "react";
import UserVehicleCard from "@/components/features/user/UserVehicleCard";
import StatCard from "./components/StateCard";
import {
  SlidersHorizontal,
  ChevronDown,
  Smartphone,
  TrendingUp,
  MessageSquare,
  Flame,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import Button from "@/components/ui/button";
import {
  getInventoryVehicle, getTopPerformingVehicles, getInventorySnapShotCount,
  getNeedAttenctionVehicles
} from "@/services/Seller.service";
import TopPerformingCard from "./components/TopPerformingCard";


export default function InventoryComponent() {
  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "DRAFT", label: "Draft" },
    { id: "LIVE", label: "Live" },
    { id: "SOLD", label: "Sold" },
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
  });

  const [activeType, setActiveType] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [topPerforming, setTopPerforming] = useState([]);
  const [inventorySnapShotCount, setInventorySnapShotCount] = useState([]);

  // Need Attention vehicles state
  const [needAttentionVehicles, setNeedAttentionVehicles] = useState([]);
  const [needAttentionPage, setNeedAttentionPage] = useState(1);
  const [needAttentionTotalPages, setNeedAttentionTotalPages] = useState(1);
  const [needAttentionLoading, setNeedAttentionLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const status = activeType === "all" ? undefined : activeType;

        const res = await getInventoryVehicle(status);
        setVehicles(res.data || []);
        setVisibleCount(9);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicles();
  }, [activeType]);

  useEffect(() => {
    const fetchTopPerforming = async () => {
      try {
        const res = await getTopPerformingVehicles();
        setTopPerforming(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopPerforming();
  }, []);

  useEffect(() => {
    const fetchInventorySnapShotCount = async () => {
      try {
        const res = await getInventorySnapShotCount();
        setInventorySnapShotCount(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };
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

          <Button className="" variant="ghost" showIcon={false}>
            <Smartphone className="mr-3" size={16} />
            Add Vehicle
          </Button>
        </div>

        {/* 2️⃣ NOTE */}
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <p className="text-sm">
            <span className="font-semibold">Note:</span> Adding and editing
            vehicles is available on the AVX mobile app. You can view listings
            and mark vehicles as sold here.
          </p>
        </div>

        {/* 3️⃣ Inventory Health Snapshot  */}
        <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary" size={18} />
            <h3 className="font-semibold">Inventory Health Snapshot</h3>
            {/* <span className="px-3 py-1 rounded-full bg-primary/10 text-xs">
              Auto-generated
            </span> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="cursor-pointer"
            >
              <StatCard
                icon={<Flame className="text-green-500" size={20} />}
                label="High Demand"
                value={`${inventorySnapShotCount.highDemandCount} Vehicles`}
              />
            </div>

            <div
              className="cursor-pointer"
            >
              <StatCard
                icon={<EyeOff className="text-yellow-500" size={20} />}
                label="Low Visibility"
                value={`${inventorySnapShotCount.lowDemandCount} Vehicles`}
              />
            </div>

            <div
              className="cursor-pointer"
            >
              <StatCard
                icon={<AlertTriangle className="text-red-500" size={20} />}
                label="Needs Attention"
                value={`${inventorySnapShotCount.needsAttentionCount} Vehicles`}
              />
            </div>
          </div>
        </div>

        {/* 3️⃣ TOP PERFORMING VEHICLES */}
        {/* 3️⃣ TOP PERFORMING VEHICLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">

            <div className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={18} />
              <h3 className="font-semibold">Top Performing Vehicles</h3>

            </div>

            {topPerforming.length > 0 ? (
              topPerforming.map((v, index) => (
                <TopPerformingCard key={v.id} vehicle={v} rank={index + 1} />
              ))
            ) : (
              <p className="text-sm text-third">No top performing vehicles yet.</p>
            )}

          </div>

          {/* RIGHT SIDE (MATCHED DESIGN) */}
          <div className="rounded-2xl border border-third/30 bg-fourth p-6 space-y-5">



            {/* insight card */}
            <div className="rounded-xl border border-third/20 bg-primary/10 p-5 space-y-3">

              <p className="text-sm flex items-center gap-2">
                📈 <span className="font-semibold">Insight:</span>
              </p>

              <p className="text-sm leading-relaxed">
                <span className="text-orange-400 font-medium">AVX</span>{" "}
                Inspected vehicles are converting{" "}
                <span className="text-pink-400 font-semibold">2.3×</span> better
              </p>

              <p className="text-sm underline cursor-pointer">
                [ Inspect More Vehicles ]
              </p>

            </div>

            {/* footer */}
            <p className="text-sm text-muted-foreground">
              This directly drives{" "}
              <span className="font-medium text-foreground">
                inspection revenue.
              </span>
            </p>

          </div>

        </div>

        {/* 4️⃣ FILTER BAR */}
        <div className="rounded-2xl border border-third/30  p-5 flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {vehicleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-full border border-third/40 text-sm transition
                ${activeType === type.id
                    ? "bg-primary text-secondary"
                    : "hover:bg-primary/10"
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5️⃣ VEHICLE GRID */}
        <div className="w-full space-y-6">
          {vehicles?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
                {vehicles.slice(0, visibleCount).map((car) => (
                  <UserVehicleCard
                    key={car.id}
                    data={mapVehicle(car)}
                    status={car.listingStatus?.toLowerCase()}
                    avxInspected={car.inspectionStatus === "AI_INSPECTED"}
                    inquiries={car.totalInquiries}
                    chats={car.approvedInquiries}
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
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
              {activeType === "all" ? (
                <>
                  <h3 className="text-xl font-bold mb-2">You haven't listed any vehicles yet.</h3>
                  <p className="text-third mb-6">
                    Add vehicles in the AVX mobile app to start receiving inquiries.
                  </p>
                  <Button variant="ghost" showIcon={false}>
                    Download App
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">No vehicles found.</h3>
                  <p className="text-third">
                    There are currently no vehicles with this status.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={18} />
            <h3 className="font-semibold">Vehicles Needing Attention</h3>
          </div>

          {needAttentionVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

    </>
  );
}
