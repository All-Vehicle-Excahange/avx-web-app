"use client";

import React, { useEffect, useState } from "react";
import UserVehicleCard from "./UserVehicleCard";
import { getSellerInventory } from "@/services/user.service";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import DetailsFromPopup from "../userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/button";
import { Clock, Ban } from "lucide-react";
import { UserVehicleCardSkeleton } from "@/components/ui/skeleton";
import { getSusPendedVehicles } from "@/services/Seller.service";

function MyVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [activeType, setActiveType] = useState("all");
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const user = useAuthStore((state) => state.user);

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "live", label: "Live" },
    { id: "sold", label: "Sold" },
    { id: "rejected", label: "Rejected" },
    { id: "request_changes", label: "Request Changes" },
    { id: "suspended", label: "Suspended" },
  ];

  const fetchVehicles = async (page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setIsFetchingMore(true);
      else {
        setIsLoading(true);
        setVehicles([]); // Clear list on tab change
      }

      let res;
      if (activeType === "suspended") {
        res = await getSusPendedVehicles({
          pageNo: page,
          pageSize: 4,
        });
      } else {
        const payload = {
          pageNo: page,
          size: 4,
          listingStatus: activeType === "all" ? null : activeType.toUpperCase(),
        };
        res = await getSellerInventory(payload);
      }

      const newData = res?.data || [];
      const pagination = res?.pagination;

      if (isLoadMore) {
        setVehicles((prev) => [...prev, ...newData]);
      } else {
        setVehicles(newData);
      }

      setTotalPages(Number(pagination?.totalPages) || 1);
      setPageNo(Number(page));
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchVehicles(1, false);
  }, [activeType]);

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
      {!isLoading && pageNo < totalPages && (
        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            disabled={isFetchingMore}
            onClick={() => fetchVehicles(pageNo + 1, true)}
            className="px-8 py-2 rounded-full text-sm font-semibold shadow-md border-primary text-primary hover:bg-primary hover:text-white transition-all"
          >
            {isFetchingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && mappedVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
          {activeType === "all" ? (
            <>
              <h3 className="text-xl font-bold mb-2">No vehicles listed yet</h3>
              <p className="text-third mb-6">Sell your first vehicle on AVX.</p>
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
              <h3 className="text-xl font-bold mb-2">
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
