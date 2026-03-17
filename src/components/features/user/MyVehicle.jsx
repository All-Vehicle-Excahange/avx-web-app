"use client";

import React, { useEffect, useState } from "react";
import UserVehicleCard from "./UserVehicleCard";
import { getSellerInventory } from "@/services/user.service";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import DetailsFromPopup from "../userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/button";
import { Clock } from "lucide-react";

function MyVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [activeType, setActiveType] = useState("all");
  const [visibleCount, setVisibleCount] = useState(4);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "live", label: "Live" },
    { id: "sold", label: "Sold" },
  ];

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const payload = {
          pageNo: 1,
          size: 100, // fetching a larger batch to handle frontend pagination/tabs
        };

        if (activeType !== "all") {
          payload.listingStatus = activeType.toUpperCase();
        }

        const res = await getSellerInventory(payload);
        setVehicles(res?.data || []);
        setVisibleCount(4);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // ✅ Map API → Card Structure
  const mappedVehicles = vehicles.map((v) => ({
    id: v.id,
    title: `${v.makerName || "-"} ${v.modelName || "-"} ${
        v.variantName || ""
    }`,
    year: v.yearOfMfg || "-",
    transmission: v.transmissionType || "-",
    fuel: v.fuelType || "-",
    seats: "-",
    rating: "-",
    price: v.price
        ? new Intl.NumberFormat("en-IN").format(v.price)
        : "-",
    image: v.thumbnailUrl || "/big_card_car.jpg",
    status: v.listingStatus?.toLowerCase() || "draft",
    inquiries: v.totalInquiries ?? 0,
    chats: v.approvedInquiries ?? 0,
    avxInspected: v.inspectionStatus === "AVX_INSPECTED",
    soldDate: v.closingPrice ? "-" : undefined,
    location: `${v.address?.city || "-"}, ${v.address?.state || "-"}`,
  }));

  const filtered =
      activeType === "all"
          ? mappedVehicles
          : mappedVehicles.filter((v) => v.status === activeType);

  return (
      <section className="w-full container rounded-2xl p-6 space-y-6">
        {/* APPLICATION STATUS WARNING */}
        {user?.userRole === "USER_SELLER_APPLICANT" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <Clock className="w-5 h-5 text-yellow-600 shrink-0" />
            <p className="text-sm font-semibold">
              You have applied to become a user seller. Please wait until we process your application.
            </p>
          </div>
        )}

        {/* FILTER */}
        {vehicles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {vehicleTypes.map((type) => (
                <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`px-4 py-2 rounded-full border border-third/50 text-sm font-medium transition
                ${
                        activeType === type.id
                            ? "bg-primary text-secondary"
                            : "bg-third/10 text-primary hover:bg-third/20"
                    }`}
                >
                  {type.label}
                </button>
            ))}
          </div>
        )}

        {/* GRID or EMPTY STATE */}
        {filtered.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {filtered.slice(0, visibleCount).map((car) => (
                  <UserVehicleCard
                      key={car.id}
                      data={car}
                      status={car.status}
                      avxInspected={car.avxInspected}
                      inquiries={car.inquiries}
                      chats={car.chats}
                      soldDate={car.soldDate}
                  />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
            {vehicles.length === 0 ? (
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
                
                <p className="text-sm text-third/70 max-w-sm">
                  It takes less than 3 minutes.<br />
                  Add photos, vehicle details and start receiving inquiries.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2">No {activeType.toLowerCase()} vehicles found.</h3>
                <p className="text-third max-w-sm">
                  You don't have any vehicles with this status.
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