import ConsultantCard from "@/components/ui/const/ConsultCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useState } from "react";
import Button from "@/components/ui/button";
import {
  Settings2,
  Car,
  Fuel,
  MapPin,
  Wallet,
  LayoutGrid,
  Edit3,
} from "lucide-react";
import { updatePreference } from "@/services/user.service";
import {
  VehicleCardSkeleton,
  ConsultantCardSkeleton,
} from "@/components/ui/skeleton";
import PreferencesPopup from "@/components/features/user/PreferencesPopup";
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserWishlistInfiniteQuery,
  getFollowedConsultantsInfiniteQuery,
  getUserPreferencesQuery,
} from "@/queries/user.queries";

function Wishlist() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("wishlist");
  const [editMode, setEditMode] = useState(false);

  const tabs = [
    { id: "wishlist", label: "Wishlist" },
    { id: "subscribed", label: "Subscribed Consultants" },
    { id: "preference", label: "Preferences" },
  ];

  // Queries
  const {
    data: wishlistInfiniteData,
    fetchNextPage: fetchNextPageWishlist,
    hasNextPage: hasNextPageWishlist,
    isLoading: isLoadingWishlist,
    isFetchingNextPage: isFetchingNextPageWishlist,
  } = useInfiniteQuery(
    getUserWishlistInfiniteQuery({ size: 8 })
  );

  const {
    data: consultantsInfiniteData,
    fetchNextPage: fetchNextPageConsultants,
    hasNextPage: hasNextPageConsultants,
    isLoading: isLoadingConsultants,
    isFetchingNextPage: isFetchingNextPageConsultants,
  } = useInfiniteQuery(
    getFollowedConsultantsInfiniteQuery({ size: 4 })
  );

  const {
    data: userPref,
    isLoading: isLoadingPref,
  } = useQuery(getUserPreferencesQuery());

  // Mutations
  const updatePreferenceMutation = useMutation({
    mutationFn: updatePreference,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["user-preferences"] });
        setEditMode(false);
      }
    },
    onError: (error) => {
      console.error("Failed to update preferences:", error);
    },
  });

  // Extract / Map Data
  const cardData = wishlistInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  const rawConsultants = consultantsInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  const followedConsualt = rawConsultants.map((item) => ({
    id: item.id,
    username: item.username,
    name: item.consultationName || "-",
    image: item.bannerUrl || "/cs.webp",
    logo: item.logoUrl || "/cs.webp",
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
  }));

  return (
    <>
      <section className="w-full container rounded-2xl p-6 space-y-6">
        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${
                  activeTab === tab.id
                    ? "bg-primary text-secondary border-primary"
                    : "border-third/50 text-primary hover:bg-third/20"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* VEHICLE WISHLIST */}
        {activeTab === "wishlist" && (
          <div>
            <h1 className="text-3xl font-extrabold mb-6 hidden">
              Vehicle Wishlist
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {isLoadingWishlist ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <VehicleCardSkeleton key={i} />
                ))
              ) : cardData.length > 0 ? (
                cardData.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="lg:col-span-1 lg:row-span-1 h-full"
                  >
                    <VehicleCard
                      data={vehicle}
                      onWishlistChange={() => {
                        queryClient.invalidateQueries({
                          queryKey: ["user-wishlist-infinite"],
                        });
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5 mt-4">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    Your wishlist is empty.
                  </h3>
                  <p className="text-third text-sm max-w-sm">
                    Browse our vehicle marketplace and add your favorites to
                    your wishlist.
                  </p>
                </div>
              )}
            </div>
             {hasNextPageWishlist && cardData.length > 0 && !isLoadingWishlist && (
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  showIcon={false}
                  onClick={() => fetchNextPageWishlist()}
                  loading={isFetchingNextPageWishlist}
                >
                  See More
                </Button>
              </div>
            )}
          </div>
        )}

        {/* CONSULTANT WISHLIST */}
        {activeTab === "subscribed" && (
          <div>
            <h1 className="text-3xl font-extrabold mb-6 hidden">
              Subscribed Consultant
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoadingConsultants ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <ConsultantCardSkeleton key={i} />
                ))
              ) : followedConsualt.length > 0 ? (
                followedConsualt.map((item) => (
                  <ConsultantCard
                    key={item.id}
                    {...item} // Using the spread operator since we already formatted the exact props!
                  />
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5 mt-4">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    You haven&apos;t subscribed to any consultants yet.
                  </h3>
                  <p className="text-third text-sm max-w-sm">
                    Follow consultants to get expert advice and exclusive deal
                    updates.
                  </p>
                </div>
              )}
            </div>
            {hasNextPageConsultants && followedConsualt.length > 0 && !isLoadingConsultants && (
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  showIcon={false}
                  onClick={() => fetchNextPageConsultants()}
                  loading={isFetchingNextPageConsultants}
                >
                  See More
                </Button>
              </div>
            )}
          </div>
        )}

        {/* PREFERENCES */}
        {activeTab === "preference" && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Settings2 className="text-third" size={24} />
                  Your Preferences
                </h2>
                <p className="text-sm text-third mt-1">
                  We will use these details to show you the most relevant
                  vehicles.
                </p>
              </div>
              <Button
                variant="outline"
                showIcon={false}
                onClick={() => setEditMode(true)}
                className="shrink-0"
              >
                <Edit3 size={16} className="mr-2" />
                {userPref && Object.keys(userPref).length > 0
                  ? "Edit Preferences"
                  : "Set Preferences"}
              </Button>
            </div>

            {isLoadingPref ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-third/10 bg-primary/5 animate-pulse"
                  >
                    <div className="h-6 w-8 bg-third/20 rounded mb-4"></div>
                    <div className="h-5 w-1/2 bg-third/20 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-8 w-16 bg-third/10 rounded-full"></div>
                      <div className="h-8 w-20 bg-third/10 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : userPref && Object.keys(userPref).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Brands & Models */}
                {(userPref.makerDetails?.length > 0 ||
                  userPref.modelDetails?.length > 0) && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/2 hover:bg-primary/4 transition-colors group">
                    <Car
                      className="text-third mb-3 group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <h3 className="font-semibold text-primary mb-4">
                      Brands & Models
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.makerDetails?.map((m) => (
                        <span
                          key={m.makerId}
                          className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {m.makerName}
                        </span>
                      ))}
                      {userPref.modelDetails?.map((m) => (
                        <span
                          key={m.modelId}
                          className="px-3 py-1.5 text-xs font-medium border border-primary/20 text-primary/70 rounded-full"
                        >
                          {m.modelName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vehicle Types */}
                {userPref.vehicleTypes?.length > 0 && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/2 hover:bg-primary/4 transition-colors group">
                    <LayoutGrid
                      className="text-third mb-3 group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <h3 className="font-semibold text-primary mb-4">
                      Body Types
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.vehicleTypes.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs font-medium bg-third/10 text-third rounded-full capitalize"
                        >
                          {t.replace("_", " ").toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fuel & Transmission */}
                {(userPref.fuelTypes?.length > 0 ||
                  userPref.transmissionTypes?.length > 0) && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/2 hover:bg-primary/4 transition-colors group">
                    <Fuel
                      className="text-third mb-3 group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <h3 className="font-semibold text-primary mb-4">Specs</h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.fuelTypes?.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary border border-primary/10 rounded-full capitalize"
                        >
                          {f.toLowerCase()}
                        </span>
                      ))}
                      {userPref.transmissionTypes?.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary border border-primary/10 rounded-full capitalize"
                        >
                          {t.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget */}
                {(userPref.minPrice || userPref.maxPrice) && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/2 hover:bg-primary/4 transition-colors group">
                    <Wallet
                      className="text-third mb-3 group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <h3 className="font-semibold text-primary mb-4">
                      Budget Range
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 text-primary font-semibold">
                        {userPref.minPrice
                          ? `₹${userPref.minPrice.toLocaleString()}`
                          : "₹0"}
                      </div>
                      <span className="text-third/50 font-bold">-</span>
                      <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 text-primary font-semibold">
                        {userPref.maxPrice
                          ? `₹${userPref.maxPrice.toLocaleString()}`
                          : "Any"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Locations */}
                {userPref.cityDetails?.length > 0 && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/2 hover:bg-primary/4 transition-colors group md:col-span-2 lg:col-span-1">
                    <MapPin
                      className="text-third mb-3 group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <h3 className="font-semibold text-primary mb-4">
                      Locations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.cityDetails.map((c) => (
                        <span
                          key={c.cityId || c.cityName}
                          className="px-3 py-1.5 text-xs font-medium bg-third/5 text-third border border-third/20 rounded-full"
                        >
                          {c.cityName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-third/30 bg-primary/2">
                <Settings2 size={48} className="text-third/40 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-primary">
                  No preferences set
                </h3>
                <p className="text-primary/50 text-sm max-w-sm mb-6">
                  Tell us what kind of vehicles you&apos;re looking for, and
                  we&apos;ll personalize your experience.
                </p>
                <Button
                  variant="primary"
                  showIcon={false}
                  onClick={() => setEditMode(true)}
                >
                  Set Preferences
                </Button>
              </div>
            )}

            {/* Reusing the popup for editing */}
            <PreferencesPopup
              isOpen={editMode}
              onClose={() => setEditMode(false)}
              initialData={userPref}
              onSubmit={(payload) => updatePreferenceMutation.mutate(payload)}
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Wishlist;
