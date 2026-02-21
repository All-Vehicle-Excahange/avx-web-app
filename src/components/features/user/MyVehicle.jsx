"use client";

import React, { useEffect, useState } from "react";
import UserVehicleCard from "./UserVehicleCard";
import { getSellerInventory } from "@/services/user.service";

function MyVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [activeType, setActiveType] = useState("all");

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
          size: 10,
          listingStatus : "LIVE",
        };

        const res = await getSellerInventory(payload);
        setVehicles(res?.data || []);
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
        {/* FILTER */}
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

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((car) => (
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
      </section>
  );
}

export default MyVehicle;