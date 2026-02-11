"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
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
import { useParams } from "next/navigation";
import {
  followConsultant,
  getComsultDetailsById,
  unFollowConsultant,
} from "@/services/user.service";
import Image from "next/image";

export default function StoreFrontHeroSection() {
  const id = useParams()?.id;

  const [comsultDetails, setComsultDetails] = useState({});
  const [isFollower, setIsFollower] = useState(false);

  useEffect(() => {
    const getComsultDetails = async () => {
      const res = await getComsultDetailsById(id);
      setComsultDetails(res.data);
      setIsFollower(res.data.isFollower);
    };
    getComsultDetails();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollower) {
        await unFollowConsultant(id);
        setIsFollower(false);
        setComsultDetails((prev) => ({
          ...prev,
          followersCount: prev.followersCount - 1,
        }));
      } else {
        await followConsultant(id);
        setIsFollower(true);
        setComsultDetails((prev) => ({
          ...prev,
          followersCount: prev.followersCount + 1,
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
    <section className="w-[1480px] mt-10 mx-auto border border-third/40 rounded-4xl overflow-hidden">
      {/* ================= BANNER + LOGO ================= */}
      <div className="relative w-full">
        <div
          className="w-full h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              comsultDetails.bannerUrl ||
              "https://images.pexels.com/photos/35415243/pexels-photo-35415243.jpeg"
            })`,
          }}
        />

        {/* Logo + Subscribe */}
        <div className="absolute -bottom-46 left-6 z-30 w-42">
          <div className="relative w-42 h-42 rounded-full overflow-hidden bg-primary border border-primary/10 shadow-xl">
            <Image
              fill
              className="object-cover"
              src={
                comsultDetails.logoUrl ||
                "https://images.pexels.com/photos/168938/pexels-photo-168938.jpeg"
              }
              alt="Consultant Logo"
            />
          </div>

          <div className="mt-3 relative top-4 flex justify-center">
            <Button
              onClick={handleFollowToggle}
              size="sm"
              variant="outline"
              showIcon={false}
              full
              // className="w-30"
            >
              {isFollower ? "Unsubscribe" : "Subscribe"}
            </Button>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative border-t border-third/30  h-[30vh]">
        <div className="px-4 md:px-10 lg:px-12 pt-2 pb-6 lg:pl-[220px]">
          <div className="flex items-start gap-6">
            {/* MAIN CONTENT */}
            <div className="flex-1 space-y-3">
              <h1 className="text-2xl font-semibold text-primary">
                {comsultDetails.consultationName ||
                  "Adarsh Vehicles Consultants"}
              </h1>

              <p className="flex items-center gap-1 text-sm text-third">
                <MapPin className="w-4 h-4 shrink-0" />
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
              </p>

              {/* STATS */}
              <div className="flex gap-6 text-sm flex-wrap">
                {[
                  {
                    label: "Rating",
                    value: comsultDetails.averageRating || 0,
                    icon: Star,
                  },
                  {
                    label: "Subscribers",
                    value: comsultDetails.followersCount || 0,
                    icon: Users,
                  },
                  {
                    label: "Vehicle Available",
                    value: comsultDetails.availableVehicles || 0,
                    icon: Car,
                  },
                  {
                    label: "Sold Vehicle",
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
                    label: "Tier",
                    value: comsultDetails.tierTitle || "",
                    icon: Briefcase,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-third" />
                    <span className="text-third">{label}:</span>
                    <span className="text-primary font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              {/* SERVICES */}
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wide text-third">
                  Services
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {comsultDetails?.services?.length > 0 ? (
                    comsultDetails.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 text-xs border border-third rounded-full text-primary"
                      >
                        {formatServiceName(service)}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 text-xs border border-third rounded-full text-third">
                      N/A
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (RIGHT SIDE, STACKED) */}
            <div className="flex flex-col gap-3 pt-1 shrink-0">
              <Button size="md" showIcon={false} variant="ghost">
                Chat <MessageCircle className="w-5 h-5 ml-2" />
              </Button>
              <Button size="md" showIcon={false} variant="ghost">
                Direction <CornerUpRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
