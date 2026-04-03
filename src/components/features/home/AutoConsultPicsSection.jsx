"use client";

import React, { useEffect, useState } from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import { getHomeFeedConsult } from "@/services/user.service";
import ConsultantCardSkeleton from "@/components/ui/skeleton/ConsultantCardSkeleton";

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
                  ? `${(item.minVehiclePrice / 100000).toFixed(1)}L - ${(item.maxVehiclePrice / 100000).toFixed(1)}L`
                  : "-",
              isSponsored: item.isActiveTier || false,
            })),
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
  const finalConsultants = consultants;

  return (
    <div className="w-full py-10 ">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
          Top Picks
          <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
        </p>

        <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
          Top <span className="text-fourth">Auto Consultants</span> Picks For You
        </h2>
        <p className="text-third ">
          Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
        </p>
      </div>

      {loading && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(safeLimit)].map((_, i) => (
            <ConsultantCardSkeleton key={`skel-${i}`} />
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {finalConsultants.length === 0 ? (
          <div className="col-span-full flex justify-center py-16">
            <h3 className="text-lg font-semibold text-primary/40">
              No auto consult found
            </h3>
          </div>
        ) : (
          finalConsultants
            .slice(0, safeLimit)
            .map((consultant) => (
              <ConsultantCard key={consultant.id} {...consultant} />
            ))
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button href="/consult/discovery" variant="outlineAnimated">
          Explore All
        </Button>
      </div>
    </div>
  );
}
