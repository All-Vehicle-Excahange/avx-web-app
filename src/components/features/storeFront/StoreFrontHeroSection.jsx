import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { MapPin, MessageCircle, Navigation2 } from "lucide-react";
import {
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

  const formatServiceName = (service) => {
    return service
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="w-full bg-secondary 3xl:max-w-[1480px] 3xl:mx-auto">
      <div
        className="relative w-full h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${comsultDetails.bannerUrl || "https://www.shutterstock.com/image-vector/car-rental-logo-vector-template-260nw-2589285967.jpg"} )`,
        }}
      />

      <div className="relative 3xl:container border-b border-third/30 overflow-hidden">
        <div className="absolute z-10 inset-0 bg-[url('/bg_blur.jpg')] bg-cover opacity-40 blur-lg " />

        <div className="relative z-10 bg-transparent">
          <div className="px-4 md:px-10 lg:px-14">
            <div className="flex items-start py-4">
              <div className="relative z-10">
                <div className="relative overflow-hidden    w-50 h-50 rounded-full mt-4 ml-10 bg-primary flex items-center justify-center text-secondary font-black text-2xl">
                  <Image
                    className="object-cover"
                    fill
                    src={comsultDetails.logoUrl}
                    alt="AVX"
                  />
                </div>
              </div>

              <div className="flex-1 ml-16 space-y-3">
                <h1 className="text-2xl font-semibold text-primary">
                  {comsultDetails.consultationName ||
                    " Adarsh Vehicles Consultants"}
                </h1>

                <p className="flex items-center gap-1 text-sm text-third">
                  <MapPin className="w-4 h-4 shrink-0" />

                  {comsultDetails?.address?.address ||
                  comsultDetails?.address?.city ||
                  comsultDetails?.address?.state ||
                  comsultDetails?.address?.country
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
                      <span className="text-primary font-semibold">
                        {value}
                      </span>
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

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 pt-1">
                  <Button size="md" showIcon={false} variant="ghost">
                    Chat <MessageCircle className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="md" showIcon={false} variant="ghost">
                    Direction
                    <CornerUpRight className="w-5 h-5 ml-2 rounded-full" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center mt-1 ml-8">
                <Button
                  onClick={handleFollowToggle}
                  size="sm"
                  variant="outline"
                  showIcon={false}
                >
                  {isFollower ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
