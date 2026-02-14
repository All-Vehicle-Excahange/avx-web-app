import React, { useState } from "react";
import {
  MapPin,
  MessageCircle,
  Star,
  Users,
  Briefcase,
  Car,
  CheckCircle,
  IndianRupee,
  CornerUpRight,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function StoreFrontHeroSection() {
  // Mocking ID from params
  const id = "consultant-123";

  const [comsultDetails, setComsultDetails] = useState({
    consultationName: "Adarsh Vehicles Consultants",
    bannerUrl:
      "https://images.pexels.com/photos/35415243/pexels-photo-35415243.jpeg",
    logoUrl: "https://images.pexels.com/photos/168938/pexels-photo-168938.jpeg",
    address: {
      address: "Main Road",
      city: "Mumbai",
      state: "MH",
      country: "India",
    },
    averageRating: 4.8,
    availableVehicles: 24,
    soldVehiclesCount: 150,
    minVehiclePrice: "2L",
    maxVehiclePrice: "15L",
    tierTitle: "1992",
    followersCount: 1200,
    services: [
      "VEHICLE_INSPECTION",
      "RTO_HELP",
      "LOAN_ASSISTANCE",
      "INSURANCE",
    ],
  });

  const [isFollower, setIsFollower] = useState(false);

  // Re-implemented follow logic
  const handleFollowToggle = async () => {
    try {
      if (isFollower) {
        setIsFollower(false);
        setComsultDetails((prev) => ({
          ...prev,
          followersCount: (prev.followersCount || 0) - 1,
        }));
      } else {
        setIsFollower(true);
        setComsultDetails((prev) => ({
          ...prev,
          followersCount: (prev.followersCount || 0) + 1,
        }));
      }
    } catch (error) {
      console.log("Follow toggle error:", error);
    }
  };

  const formatServiceName = (service) =>
    service
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <section className="w-full max-w-[1480px] mt-10 mx-auto border border-third/40 rounded-[2.5rem] overflow-hidden  shadow-sm">
      {/* ================= BANNER ================= */}
      <div
        className="w-full h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${comsultDetails.bannerUrl})`,
        }}
      />

      {/* ================= CONTENT AREA ================= */}
      <div className="px-6 md:px-10 py-4 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN: Logo, Subscriber Info & Subscribe Button */}
          <div className="flex flex-col items-center -mt-20 z-30 w-full lg:w-48 shrink-0">
            {/* Logo */}
            <div className="relative w-42 h-42 rounded-full overflow-hidden bg-primary border-4 border-white shadow-xl">
              <Image
                src={comsultDetails.logoUrl || "/placeholder-logo.png"}
                alt="Consultant Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Subscriber Count Card */}

            <div className="mt-6 w-full flex flex-col items-center gap-3">
              {/* First Row — Centered Followers Count */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>

                <p className="text-base font-bold text-primary leading-none">
                  {comsultDetails.followersCount?.toLocaleString() || "0"}
                </p>
              </div>

              {/* Second Row — Full Width Button */}
              <Button
                onClick={handleFollowToggle}
                size="sm"
                variant="outline"
                full
              >
                {isFollower ? "Unsubscribe" : "Subscribe"}
              </Button>
            </div>
          </div>

          {/* CENTER COLUMN: Name & Stats */}
          <div className="flex-1 space-y-4 pt-2">
            <div>
              <h1 className="text-3xl font-semibold text-primary">
                {comsultDetails.consultationName}
              </h1>
              <p className="flex items-center gap-1.5 text-third mt-1">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm">
                  {comsultDetails?.address
                    ? [
                        comsultDetails.address.address,
                        comsultDetails.address.city,
                        comsultDetails.address.state,
                        comsultDetails.address.country,
                      ]
                        .filter(Boolean)
                        .join(", ")
                    : "N/A"}
                </span>
              </p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-6 py-4">
              {[
                {
                  label: "Rating",
                  value: comsultDetails.averageRating || 0,
                  icon: Star,
                },
                {
                  label: "Available Vehicles",
                  value: comsultDetails.availableVehicles || 0,
                  icon: Car,
                },
                {
                  label: "Sold Vehicles",
                  value: comsultDetails.soldVehiclesCount || 0,
                  icon: CheckCircle,
                },
                {
                  label: "Price Range",
                  value:
                    comsultDetails.minVehiclePrice &&
                    comsultDetails.maxVehiclePrice
                      ? `${comsultDetails.minVehiclePrice} - ${comsultDetails.maxVehiclePrice}`
                      : "0 - 0",
                  icon: IndianRupee,
                },
                {
                  label: "Since",
                  value: comsultDetails.tierTitle || "N/A",
                  icon: Briefcase,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
                    <Icon className="w-4 h-4 text-third" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-third font-semibold leading-none mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-primary leading-none">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Services & Actions */}
          <div className="w-full lg:w-80 space-y-6 pt-2">
            {/* SERVICES SECTION (TOP) */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-third">
                Services Provided
              </p>
              <div className="flex flex-wrap gap-2">
                {comsultDetails?.services?.length > 0 ? (
                  comsultDetails.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1.5 text-[11px] font-medium border border-third rounded-full text-primary hover:bg-primary/5 transition-colors cursor-default"
                    >
                      {formatServiceName(service)}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-third italic">
                    No services listed
                  </span>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS (BOTTOM) */}
            <div className="flex gap-3 pt-6">
              <Button size="sm" variant="ghost">
                Start Chat
                <MessageCircle className="ml-2 w-4 h-4 " />
              </Button>
              <Button size="sm" variant="ghost">
                Get Directions
                <CornerUpRight className="ml-2 w-4 h-4 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
