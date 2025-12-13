import React from "react";
import { MapPin, Star, ArrowUpRight, ArrowRight } from "lucide-react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";

export default function AutoConsultPicsSection() {
  const consultants = [
    {
      id: 1,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png", // Yellow car placeholder
      isSponsored: true,
      priceRange: "1,00,000 - 2,00,000",
      logo: "/cs.png",
    },
    {
      id: 2,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "1,00,000 - 2,00,000",
      isSponsored: true,
    },
    {
      id: 3,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4,
      vehicleCount: 116,
      priceRange: "1,00,000 - 2,00,000",
      image: "/cs.png",
      isSponsored: true,
    },
    {
      id: 4,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      priceRange: "1,00,000 - 2,00,000",
      vehicleCount: 116,
      image: "/cs.png",
      isSponsored: true,
    },

    {
      id: 1,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png", // Yellow car placeholder
      isSponsored: true,
      priceRange: "1,00,000 - 2,00,000",
      logo: "/cs.png",
    },
    {
      id: 2,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "1,00,000 - 2,00,000",
      isSponsored: true,
    },
    {
      id: 3,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4,
      vehicleCount: 116,
      priceRange: "1,00,000 - 2,00,000",
      image: "/cs.png",
      isSponsored: true,
    },
    {
      id: 4,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      priceRange: "1,00,000 - 2,00,000",
      vehicleCount: 116,
      image: "/cs.png",
      isSponsored: true,
    },
  ];

  return (
    <div className="w-full bg-primary">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Top Auto Consultants Picks For You
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {consultants.map((consultant) => (
          <ConsultantCard key={consultant.id} {...consultant} />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex justify-end">
        <Button>See All</Button>
      </div>
    </div>
  );
}
