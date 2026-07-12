"use client";

import React, { useState, useEffect } from "react";
import UserVehicleCard from "./UserVehicleCard";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import DetailsFromPopup from "../userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/button";
import { Clock, Ban } from "lucide-react";
import { UserVehicleCardSkeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSellerInventoryInfiniteQuery } from "@/queries/user.queries";
import { getSusPendedVehiclesInfiniteQuery } from "@/queries/Seller.queries";
import Image from "next/image";

function MyVehicle() {
  const [activeType, setActiveType] = useState("all");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "live", label: "Live" },
    { id: "PENDING", label: "Pending" },
    { id: "sold", label: "Sold" },
    { id: "rejected", label: "Rejected" },
    { id: "request_changes", label: "Request Changes" },
    { id: "suspended", label: "Suspended" },
  ];

  const isSuspendedTab = activeType === "suspended";

  const [totalPosted, setTotalPosted] = useState(0);

  // Suspended tab infinite query
  const {
    data: suspendedData,
    fetchNextPage: fetchNextPageSuspended,
    hasNextPage: hasNextPageSuspended,
    isLoading: isLoadingSuspended,
    isFetchingNextPage: isFetchingNextPageSuspended,
  } = useInfiniteQuery({
    ...getSusPendedVehiclesInfiniteQuery({
      pageSize: 4,
    }),
    enabled: isSuspendedTab,
    staleTime: 15 * 60 * 1000,
  });

  // Regular seller inventory infinite query
  const {
    data: inventoryData,
    fetchNextPage: fetchNextPageInventory,
    hasNextPage: hasNextPageInventory,
    isLoading: isLoadingInventory,
    isFetchingNextPage: isFetchingNextPageInventory,
  } = useInfiniteQuery({
    ...getSellerInventoryInfiniteQuery({
      size: 4,
      listingStatus:
        activeType === "all"
          ? null
          : activeType === "PENDING"
            ? "REQUESTED"
            : activeType.toUpperCase(),
    }),
    enabled: !isSuspendedTab,
  });

  useEffect(() => {
    if (activeType === "all" && inventoryData?.pages?.[0]) {
      const page = inventoryData.pages[0];
      const total =
        page.pagination?.totalElements ||
        page.pageResponse?.totalElements ||
        page.totalElements ||
        (page.data && page.data.length) ||
        0;
      setTotalPosted(total);
    }
  }, [activeType, inventoryData]);

  const vehicles = isSuspendedTab
    ? suspendedData?.pages?.flatMap((page) => page?.data || []) || []
    : inventoryData?.pages?.flatMap((page) => page?.data || []) || [];

  const isLoading = isSuspendedTab ? isLoadingSuspended : isLoadingInventory;
  const isFetchingMore = isSuspendedTab
    ? isFetchingNextPageSuspended
    : isFetchingNextPageInventory;
  const hasNextPage = isSuspendedTab
    ? hasNextPageSuspended
    : hasNextPageInventory;
  const fetchNextPage = isSuspendedTab
    ? fetchNextPageSuspended
    : fetchNextPageInventory;

  // Map API → Card Structure
  const mappedVehicles = vehicles.map((v) => ({
    id: v.id,
    title: `${v.makerName || "-"} ${v.modelName || "-"} ${v.variantName || ""}`,
    year: v.yearOfMfg || "-",
    transmission: v.transmissionType || "-",
    fuel: v.fuelType || "-",
    ownership: v.ownership
      ? `${v.ownership}${v.ownership === 1 ? "st" : v.ownership === 2 ? "nd" : "rd"} Owner`
      : "-",
    price: v.price ? new Intl.NumberFormat("en-IN").format(v.price) : "-",
    closingPrice: v.closingPrice
      ? new Intl.NumberFormat("en-IN").format(v.closingPrice)
      : null,
    image: v.thumbnailUrl || "/big_card_car.jpg",
    inspectionBadgeUrl: v.inspectionBadgeUrl || null,
    status: v.listingStatus?.toLowerCase() || "draft",
    verificationStatus: v.verificationStatus || null,
    inspectionStatus: v.inspectionStatus || null,
    inquiries: v.totalInquiries ?? 0,
    chats: v.approvedInquiries ?? 0,
    avxInspected: v.inspectionStatus === "AVX_INSPECTED",
    consultantName: v.consultantName || null,
    location: v.address?.city
      ? `${v.address.city}, ${v.address.state}`
      : "Location not set",
    adminRemark: v.adminRemark || null,
    suspendReason: v.suspendReason || null,
    vehicleSuspenseType: v.vehicleSuspenseType || null,
    sponsored: v.sponsored || false,
  }));

  const filtered = mappedVehicles;

  return (
    <section className="w-full container rounded-2xl p-6 space-y-6">
      {/* APPLICATION STATUS WARNING */}
      {/* {user?.userRole === "USER_SELLER_APPLICANT" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <Clock className="w-5 h-5 text-yellow-600 shrink-0" />
            <p className="text-sm font-semibold">
              You have applied to become a user seller. Please wait until we process your application.
            </p>
          </div>
        )} */}

      {/* SELLER LIMIT PROGRESS BAR */}
      {user?.userRole === "USER_SELLER" && (
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden backdrop-blur-md">
          {/* Subtle background glow */}
          <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-primary">
                Vehicle Listing Limit
              </h3>
              <p className="text-third text-xs mt-1">
                You can post up to 3 vehicles as a normal seller.
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">
                  {totalPosted}
                </span>
                <span className="text-third text-sm">/ 3</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-primary/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(Math.min(totalPosted, 3) / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* FILTER TABS */}
      {!isLoading && !(activeType === "all" && mappedVehicles.length === 0) && (
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-6 py-2 rounded-full border text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2
                ${
                  activeType === type.id
                    ? "bg-primary text-secondary border-primary "
                    : "bg-third/5 text-primary border-third/20 hover:bg-third/10"
                }`}
            >
              {type.id === "suspended" && <Ban size={14} />}
              {type.label}
            </button>
          ))}
        </div>
      )}

      {/* GRID or EMPTY STATE */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <UserVehicleCardSkeleton key={i} />
          ))
        ) : mappedVehicles.length > 0 ? (
          <>
            {mappedVehicles.map((car) => (
              <UserVehicleCard
                key={car.id}
                data={car}
                status={car.status}
                avxInspected={car.avxInspected}
                inquiries={car.inquiries}
                chats={car.chats}
              />
            ))}
            {isFetchingMore &&
              Array.from({ length: 4 }).map((_, i) => (
                <UserVehicleCardSkeleton key={`more-${i}`} />
              ))}
          </>
        ) : null}
      </div>

      {/* Load More Button */}
      {!isLoading && hasNextPage && (
        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            loading={isFetchingMore}
            onClick={() => fetchNextPage()}
            className="px-8 py-2 rounded-full text-sm font-semibold shadow-md border-primary text-primary hover:bg-primary hover:text-white transition-all"
          >
            Load More
          </Button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && mappedVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 sm:py-15 text-center w-full">
          {activeType === "all" ? (
            <>
              <div className="relative w-32 h-32 mb-2 opacity-60">
                <Image
                  src="/empty2.svg"
                  alt="Empty State"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Ready to sell your vehicle?
              </h3>
              <p className="text-third max-w-sm px-4 mb-6">
                Reach verified buyers, list for free, and sell directly — no
                middlemen, no broker fees. You can have 1 active listing at a
                time, up to 3 vehicles total.
              </p>
              <Button
                onClick={() => {
                  if (user?.userRole === "USER") {
                    setIsDetailsOpen(true);
                  } else {
                    setIsDownloadOpen(true);
                  }
                }}
                className="mb-4"
                variant="ghost"
              >
                + List Vehicle
              </Button>
            </>
          ) : (
            <>
              <div className="relative w-32 h-32 mb-2 opacity-60">
                <Image
                  src="/empty2.svg"
                  alt="Empty State"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                No {activeType.replaceAll("_", " ")} vehicles found
              </h3>
              <p className="text-third max-w-sm px-4">
                You dont have any vehicles with{" "}
                {activeType.replaceAll("_", " ")} status.
              </p>
            </>
          )}
        </div>
      )}

      {/* POPUPS */}
      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      <DetailsFromPopup
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onSubmit={() => setIsDetailsOpen(false)}
      />
    </section>
  );
}

export default MyVehicle;
