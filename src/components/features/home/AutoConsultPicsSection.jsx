import React from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";

export default function AutoConsultPicsSection({ limit }) {
  const consultants = [
    {
      id: 1,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png",
      isSponsored: true,
      priceRange: "1L - 2L",
      logo: "/cs.png",
    },
    {
      id: 2,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "1L - 2L",
      isSponsored: false,
    },
    {
      id: 3,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4,
      vehicleCount: 116,
      priceRange: "1L - 2L",
      image: "/cs.png",
      isSponsored: true,
    },
    {
      id: 4,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      priceRange: "1L - 2L",
      vehicleCount: 116,
      image: "/cs.png",
      isSponsored: true,
    },
    {
      id: 5,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.2,
      vehicleCount: 90,
      image: "/cs.png",
      isSponsored: false,
      priceRange: "80K - 1.50L",
    },
    {
      id: 6,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      priceRange: "1L - 2.5L",
      vehicleCount: 116,
      image: "/cs.png",
      isSponsored: true,
    },
    {
      id: 7,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.2,
      vehicleCount: 90,
      image: "/cs.png",
      isSponsored: false,
      priceRange: "80K - 1.5L",
    },
    {
      id: 8,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      priceRange: "1L - 2.5L",
      vehicleCount: 116,
      image: "/cs.png",
      isSponsored: true,
    },
  ];

  // ✅ Apply limit ONLY if provided
  const visibleConsultants = limit ? consultants.slice(0, limit) : consultants;

  return (
    <div className="w-full bg-primary">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Top Auto Consultants Picks For You
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
        {visibleConsultants.map((consultant) => (
          <ConsultantCard key={consultant.id} {...consultant} />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-8 flex justify-end">
        <Button>See All</Button>
      </div>
    </div>
  );
}
