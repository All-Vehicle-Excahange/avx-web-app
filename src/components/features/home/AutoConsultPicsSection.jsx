"use client";

import React, { useEffect, useState } from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import { getHomeFeedConsult } from "@/services/user.service";

export default function AutoConsultPicsSection(props) {
  // ✅ HARD SAFE DEFAULT
  const safeLimit = typeof props.limit === "number" ? props.limit : 4;


  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchConsultants = async () => {
      try {
        const res = await getHomeFeedConsult({
          pageNo: 1,
          size: safeLimit,
        });

        if (mounted && Array.isArray(res?.data) && res.data.length > 0) {
          setConsultants(
              res.data.map((item) => ({
                id: item.id,
                username: item.username,
                name: item.consultationName || "-",
                image: item.bannerUrl || "/cs.png",
                logo: item.logoUrl || "/cs.png",
                rating: item.averageRating ?? 0,
                reviews: item.totalReviews ?? 0,
                vehicleCount: item.availableVehicles ?? 0,
                services: item.services || [],
                vehicleTypes: item.vehicleTypes || [],
                location:
                    item.address?.city && item.address?.country
                        ? `${item.address.city}, ${item.address.country}`
                        : "-",
                priceRange:
                    item.minVehiclePrice && item.maxVehiclePrice
                        ? `₹${Number(item.minVehiclePrice).toLocaleString()} - ₹${Number(item.maxVehiclePrice).toLocaleString()}`
                        : "-",
                isSponsored: item.isActiveTier || false,
              }))
          );

        }
      } catch (err) {
        console.error("Consultant fetch failed:", err);
      } finally {
        mounted && setLoading(false);
      }
    };

    fetchConsultants();
    return () => (mounted = false);
  }, [safeLimit]);

  // ✅ FINAL DATA SOURCE
  const finalConsultants =
 consultants

  return (
    <div className="w-full py-10 px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">
          Top Auto Consultants Picks For You
        </h2>
        <p className="text-third mt-1">
          Discover trusted consultants curated for you.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-third mb-4">Loading consultants...</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {finalConsultants.slice(0, safeLimit).map((consultant) => (
          <ConsultantCard key={consultant.id} {...consultant} />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button href="/consultants" variant="outlineAnimated">
          See All
        </Button>
      </div>
    </div>
  );
}
