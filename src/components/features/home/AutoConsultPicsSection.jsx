"use client";

import React, { useEffect, useState } from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import { getHomeFeedConsult } from "@/services/user.service";

export default function AutoConsultPicsSection({ limit }) {
  const consultantsDmy = [
    {
      id: 1,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png",
      logo: "/cs.png",
      isSponsored: true,
      priceRange: "1L - 2L",
    },
    {
      id: 2,
      name: "Premium Auto Hub",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      vehicleCount: 80,
      image: "/cs.png",
      logo: "/cs.png",
      isSponsored: false,
      priceRange: "2L - 5L",
    },
    {
      id: 3,
      name: "PRO Auto Hub",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      vehicleCount: 80,
      image: "/cs.png",
      logo: "/cs.png",
      isSponsored: false,
      priceRange: "2L - 5L",
    },
    {
      id: 4,
      name: "Helllo Auto Hub",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      vehicleCount: 80,
      image: "/cs.png",
      logo: "/cs.png",
      isSponsored: false,
      priceRange: "2L - 5L",
    },
  ];

  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const res = await getHomeFeedConsult({ pageNo: 1, size: 4 });

        if (res?.data?.length > 0) {
          const formatted = res.data.map((item) => ({
            id: item.id,

            name: item.consultationName,
            image: item.bannerUrl || "/cs.png",
            logo: item.logoUrl || "/cs.png",

            rating: item.averageRating,
            reviews: item.totalReviews,

            vehicleCount: item.availableVehicles,

            location: item.address?.city
              ? `${item.address.city}, ${item.address.country}`
              : "Location not available",

            priceRange:
              item.minVehiclePrice && item.maxVehiclePrice
                ? `₹${item.minVehiclePrice} - ₹${item.maxVehiclePrice}`
                : "Not disclosed",

            vehicleTypes: item.vehicleTypes,
            services: item.services,

            tierTitle: item.tierTitle,
            tierBadgeUrl: item.tierBadgeUrl,

            isSponsored: item.isActiveTier,
          }));

          setConsultants(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch consultants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const finalConsultants =
    consultants.length > 0 ? consultants : consultantsDmy;

  const visibleConsultants = limit
    ? finalConsultants.slice(0, limit)
    : finalConsultants;

  return (
    <div className="w-full  py-10 px-4">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex items-start gap-4">
          {/* VERTICAL ACCENT LINE */}
          <span className="w-2 h-[52px] rounded-full bg-gradient-to-b from-blue-500 to-white-400" />

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
              Top Auto Consultants Picks For You
            </h2>

            <p className="text-third mt-1">
              Lorem ipsum dolor sit amet consectetur dolor sit amet
              consectetur..
            </p>
          </div>
        </div>
      </div>

      {loading && consultants.length === 0 && (
        <p className="text-third text-sm">Loading consultants...</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleConsultants.map((consultant) => (
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
