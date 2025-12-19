import React from "react";
import { MessageCircle, Navigation, Star, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/button";

export default function StoreFrontHeroSection({
  backgroundImage = "./sfBg.png",
  storeData,
}) {
  const data = storeData || {
    name: "Adarsh Vehicles Consultants",
    description: "Your trusted partner for premium pre-owned luxury vehicles.",
    badge: "Premium Verified Consultant",
    stats: {
      experience: "10 Year",
      location: "Chhapi, Gujarat",
      vehiclesAvailable: "200+",
      soldVehicles: "240+",
      categories: "Car, SUVs",
      priceRange: "5L-10L",
      rating: 4.5,
      reviews: 116,
      subscribers: "245+",
    },
    services: ["Test Drive", "Financing", "Exchange", "Warranty"],
  };

  return (
    <div className="relative w-full min-h-[700px] flex flex-col justify-end overflow-hidden pb-12 lg:pb-16 bg-secondary">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-third text-secondary rounded-full text-sm font-bold shadow-lg">
            <Star className="w-4 h-4 fill-secondary" />
            {data.badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight tracking-tight drop-shadow-lg">
            {data.name}
          </h1>
        </div>

        {/* 🔥 GLASS STATS CARD */}
        <div className="relative w-full border border-third/40 rounded-2xl shadow-2xl overflow-hidden">
          {/* Glass background image */}
          <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" />

          <div className="absolute inset-0 bg-secondary/40 backdrop-blur-xl z-1" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left */}
            <div className="p-6 lg:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-third/20 min-w-[200px]">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center p-2 mb-4">
                <div className="text-center leading-none">
                  <span className="block text-2xl font-black text-secondary">
                    AVX
                  </span>
                  <span className="text-[7px] font-bold text-third uppercase">
                    All Vehicle Exchange
                  </span>
                </div>
              </div>

              <Button full variant="outline" size="sm" showIcon={false}>
                Subscribe
              </Button>
            </div>

            {/* Middle */}
            <div className="p-6 lg:p-8 flex-1 border-b lg:border-b-0 lg:border-r border-third/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 mb-8">
                {[
                  ["Experience", data.stats.experience],
                  ["Location", data.stats.location],
                  ["Vehicles Available", data.stats.vehiclesAvailable],
                  ["Sold Vehicles", data.stats.soldVehicles],
                  ["Price Range", data.stats.priceRange],
                  ["Categories", data.stats.categories],
                  ["Subscriber", data.stats.subscribers],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-third text-xs uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-primary font-bold text-lg">{value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-third uppercase tracking-wider">
                  Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full border border-third/30 text-third text-xs hover:text-primary hover:border-third transition-colors cursor-default"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="p-6 lg:p-8 min-w-[280px] flex flex-col justify-between space-y-6 bg-primary/5">
              <div>
                <p className="text-third text-xs uppercase tracking-wider mb-1">
                  Reviews
                </p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-third text-third" />
                  <span className="text-primary font-bold text-xl">
                    {data.stats.rating}
                  </span>
                  <span className="text-third text-sm">
                    ({data.stats.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button full variant="ghost" showIcon={false}>
                  Chat
                  <MessageCircle className="w-4 h-4 ml-2" />
                </Button>

                <Button full variant="outlineSecondary" showIcon={false}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Direction
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-primary text-secondary rounded-full w-fit self-end text-xs font-bold mt-auto">
                <ShieldCheck className="w-3 h-3" />
                AVX Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
