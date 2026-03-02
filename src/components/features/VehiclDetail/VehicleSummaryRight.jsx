"use client";

import Button from "@/components/ui/button";
import { Heart, Star, MapPin, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { addWishList, removeWishList } from "@/services/user.service";

import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";

export default function VehicleSummaryRight({ vehicle, summary }) {
  const vehicleId = vehicle?.id;
  const vehicleOwnerRole = vehicle?.vehicleOwner?.userRole || "USER";
  const [isFavorite, setIsFavorite] = useState(vehicle?.isWishlisted || false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    setIsFavorite(vehicle?.isWishlisted || false);
  }, [vehicle?.isWishlisted]);

  const handleWishlistToggle = async () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    if (!vehicleId || loading) return;

    try {
      setLoading(true);

      const newValue = !isFavorite;
      setIsFavorite(newValue);

      if (newValue) {
        await addWishList(vehicleId);
      } else {
        await removeWishList(vehicleId);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      setIsFavorite((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <aside className="relative text-primary rounded-2xl shadow-xl overflow-hidden border border-third/60">
        <div className="relative z-10 p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-third">
                Register {vehicle?.yearOfMfg || 2025}
              </p>

              <h2 className="text-2xl font-bold leading-tight">
                {vehicle?.makerName || "Tata"}{" "}
                {vehicle?.modelName || "Harrier XZ Plus"}{" "}
                {vehicle?.variantName || ""}
              </h2>
            </div>

            <button
              onClick={handleWishlistToggle}
              disabled={loading}
              className="text-primary p-2 rounded-full hover:scale-105 transition cursor-pointer border"
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                }`}
              />
            </button>
          </div>

          <div className="border-t border-third/40" />

          {/* DEALER INFO */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div className="space-y-2">
              <h3 className="text-md font-semibold">
                {summary?.consultationName || "Adarsh Auto Consultants"}
              </h3>

              <div className="flex items-center gap-2 text-sm">
                <Star className="text-yellow-400" size={16} />
                <span className="font-medium text-primary">
                  {summary?.averageRating || 0}
                </span>
                <span className="text-third">
                  | {summary?.soldVehiclesCount || 0} Sold Vehicles
                </span>
              </div>

              <p className="flex items-start gap-2 text-sm text-third">
                <MapPin size={14} className="mt-0.5 shrink-0" />

                <span className="line-clamp-2">
                  {summary?.address
                    ? `${summary.address.city}, ${summary.address.state}`
                    : "Location not available"}
                </span>
              </p>

              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-primary">
                  What’s Included
                </p>

                <ul className="text-sm text-third">
                  {summary?.services?.length > 0 ? (
                    summary.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        {service.replaceAll("_", " ")}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      No services listed
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {vehicleOwnerRole === "CONSULTATION" && (
              <div className="shrink-0">
                <Button
                  href={`/store-front/${summary?.username || 1}`}
                  variant="outline"
                  showIcon
                >
                  View Storefront
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-third/40" />

          {/* INQUIRY STATUS */}
          <div className="space-y-2">
            {(() => {
              const MAX_INQUIRIES = 15;
              const inquiries = vehicle?.activeInquiryCount || 0;

              const safeValue = Math.min(inquiries, MAX_INQUIRIES);
              let percentage = (safeValue / MAX_INQUIRIES) * 100;

              if (inquiries > 0 && percentage < 12) {
                percentage = 12;
              }

              return (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-third">Current Inquiries</span>
                    <span className="font-semibold text-primary">
                      {inquiries}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-third/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-sm text-third">
                    {inquiries >= MAX_INQUIRIES
                      ? "Very high demand – Almost booked!"
                      : inquiries > 10
                        ? "High demand – Book soon!"
                        : inquiries > 0
                          ? "Getting attention"
                          : "Available now"}
                  </p>
                </>
              );
            })()}
          </div>

          <div className="border-t border-third/40" />

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="ghost"
              size="md"
              showIcon={false}
              className="rounded-full"
            >
              Book NOW
            </Button>

            <Button variant="outline" size="md" showIcon={false}>
              Inquiry Chat
            </Button>
          </div>
        </div>
      </aside>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={() => setIsLoginOpen(false)}
      />
    </>
  );
}
