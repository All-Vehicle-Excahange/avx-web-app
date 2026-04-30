/* eslint-disable react-hooks/exhaustive-deps */
import ConsultantCard from "@/components/ui/const/ConsultCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Settings2, Car, Fuel, MapPin, Wallet, LayoutGrid, Edit3 } from "lucide-react";
import { getWishList, getFollowedConsultant, getUserPreference, updatePreference } from "@/services/user.service";
import { VehicleCardSkeleton, ConsultantCardSkeleton } from "@/components/ui/skeleton";
import PreferencesPopup from "@/components/features/user/PreferencesPopup";
import { toast } from "react-hot-toast";
function Wishlist() {
  const [activeTab, setActiveTab] = useState("wishlist");

  const tabs = [
    { id: "wishlist", label: "Wishlist" },
    { id: "subscribed", label: "Subscribed Consultants" },
    { id: "preference", label: "Preferences" },
  ];

  const [userPref, setUserPref] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [cardData, setCardData] = useState([]);
  const [wishlistPage, setWishlistPage] = useState(1);
  const [hasMoreWishlist, setHasMoreWishlist] = useState(true);

  const [followedConsualt, setFollowedConsualt] = useState([]);
  const [consultantPage, setConsultantPage] = useState(1);
  const [hasMoreConsultant, setHasMoreConsultant] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPreferences = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getUserPreference();
      if (res.success && res.data) {
        setUserPref(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdatePreference = async (payload) => {
    try {
      const res = await updatePreference(payload);
      if (res.success) {
        toast.success("Preferences updated successfully");
        fetchPreferences(); // Refetch to get updated data
      }
    } catch (error) {
      console.error("Failed to update preferences:", error);
      toast.error("Failed to update preferences");
    }
  };

  const fetchWishList = useCallback(async (page = 1) => {
    try {
      if (page === 1) setIsLoading(true);
      const pageNumber = typeof page === 'number' ? page : 1;
      const res = await getWishList({ pageNo: pageNumber, size: 8 });
      if (res.success && res.data) {
        if (pageNumber === 1) {
          setCardData(res.data);
        } else {
          setCardData((prev) => [...prev, ...res.data]);
        }
        setHasMoreWishlist(res.data.length === 8);
      } else {
        setHasMoreWishlist(false);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setHasMoreWishlist(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFollowedConsultant = useCallback(async (page = 1) => {
    try {
      if (page === 1) setIsLoading(true);
      const pageNumber = typeof page === 'number' ? page : 1;
      const data = { pageNo: pageNumber, size: 4 };
      const res = await getFollowedConsultant(data);

      if (res?.data && Array.isArray(res.data)) {
        const formattedConsultants = res.data.map((item) => ({
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
              ? `₹${Number(item.minVehiclePrice).toLocaleString()} - ₹${Number(item.maxVehiclePrice).toLocaleString()}`
              : "-",
          isSponsored: item.isActiveTier || false,
        }));

        if (pageNumber === 1) {
          setFollowedConsualt(formattedConsultants);
        } else {
          setFollowedConsualt((prev) => [...prev, ...formattedConsultants]);
        }
        setHasMoreConsultant(formattedConsultants.length === 4);
      } else {
        setHasMoreConsultant(false);
      }
    } catch (error) {
      console.error("Failed to fetch followed consultants:", error);
      setHasMoreConsultant(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "wishlist") {
      fetchWishList(1);
      setWishlistPage(1);
    } else if (activeTab === "subscribed") {
      fetchFollowedConsultant(1);
      setConsultantPage(1);
    } else if (activeTab === "preference") {
      fetchPreferences();
    }
  }, [activeTab, fetchWishList, fetchFollowedConsultant, fetchPreferences]);

  const handleLoadMoreWishlist = () => {
    const nextPage = wishlistPage + 1;
    setWishlistPage(nextPage);
    fetchWishList(nextPage);
  };

  const handleLoadMoreConsultant = () => {
    const nextPage = consultantPage + 1;
    setConsultantPage(nextPage);
    fetchFollowedConsultant(nextPage);
  };



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
                ${activeTab === tab.id
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
            <h1 className="text-3xl font-extrabold mb-6 hidden">Vehicle Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <VehicleCardSkeleton key={i} />
                ))
              ) : cardData.length > 0 ? (
                cardData.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="lg:col-span-1 lg:row-span-1 h-full"
                  >
                    <VehicleCard data={vehicle} onWishlistChange={() => { setWishlistPage(1); fetchWishList(1); }} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5 mt-4">
                  <h3 className="text-xl font-bold mb-2 text-primary">Your wishlist is empty.</h3>
                  <p className="text-third text-sm max-w-sm">
                    Browse our vehicle marketplace and add your favorites to your wishlist.
                  </p>
                </div>
              )}
            </div>
            {hasMoreWishlist && cardData.length > 0 && !isLoading && (
              <div className="flex justify-end mt-6">
                <Button variant="outline" showIcon={false} onClick={handleLoadMoreWishlist}>
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
              {isLoading ? (
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
                  <h3 className="text-xl font-bold mb-2 text-primary">You haven&apos;t subscribed to any consultants yet.</h3>
                  <p className="text-third text-sm max-w-sm">
                    Follow  consultants to get expert advice and exclusive deal updates.
                  </p>
                </div>
              )}
            </div>
            {hasMoreConsultant && followedConsualt.length > 0 && !isLoading && (
              <div className="flex justify-end mt-6">
                <Button variant="outline" showIcon={false} onClick={handleLoadMoreConsultant}>
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
                  We will use these details to show you the most relevant vehicles.
                </p>
              </div>
              <Button
                variant="outline"
                showIcon={false}
                onClick={() => setEditMode(true)}
                className="shrink-0"
              >
                <Edit3 size={16} className="mr-2" />
                {userPref && Object.keys(userPref).length > 0 ? "Edit Preferences" : "Set Preferences"}
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-6 rounded-2xl border border-third/10 bg-primary/5 animate-pulse">
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
                {(userPref.makerDetails?.length > 0 || userPref.modelDetails?.length > 0) && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors group">
                    <Car className="text-third mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-primary mb-4">Brands & Models</h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.makerDetails?.map(m => (
                        <span key={m.makerId} className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {m.makerName}
                        </span>
                      ))}
                      {userPref.modelDetails?.map(m => (
                        <span key={m.modelId} className="px-3 py-1.5 text-xs font-medium border border-primary/20 text-primary/70 rounded-full">
                          {m.modelName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vehicle Types */}
                {userPref.vehicleTypes?.length > 0 && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors group">
                    <LayoutGrid className="text-third mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-primary mb-4">Body Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.vehicleTypes.map(t => (
                        <span key={t} className="px-3 py-1.5 text-xs font-medium bg-third/10 text-third rounded-full capitalize">
                          {t.replace('_', ' ').toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fuel & Transmission */}
                {(userPref.fuelTypes?.length > 0 || userPref.transmissionTypes?.length > 0) && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors group">
                    <Fuel className="text-third mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-primary mb-4">Specs</h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.fuelTypes?.map(f => (
                        <span key={f} className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary border border-primary/10 rounded-full capitalize">
                          {f.toLowerCase()}
                        </span>
                      ))}
                      {userPref.transmissionTypes?.map(t => (
                        <span key={t} className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary border border-primary/10 rounded-full capitalize">
                          {t.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget */}
                {(userPref.minPrice || userPref.maxPrice) && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors group">
                    <Wallet className="text-third mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-primary mb-4">Budget Range</h3>
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 text-primary font-semibold">
                        {userPref.minPrice ? `₹${userPref.minPrice.toLocaleString()}` : '₹0'}
                      </div>
                      <span className="text-third/50 font-bold">-</span>
                      <div className="px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 text-primary font-semibold">
                        {userPref.maxPrice ? `₹${userPref.maxPrice.toLocaleString()}` : 'Any'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Locations */}
                {userPref.cityDetails?.length > 0 && (
                  <div className="p-6 rounded-2xl border border-third/20 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors group md:col-span-2 lg:col-span-1">
                    <MapPin className="text-third mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-semibold text-primary mb-4">Locations</h3>
                    <div className="flex flex-wrap gap-2">
                      {userPref.cityDetails.map(c => (
                        <span key={c.cityId || c.cityName} className="px-3 py-1.5 text-xs font-medium bg-third/5 text-third border border-third/20 rounded-full">
                          {c.cityName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-third/30 bg-primary/[0.02]">
                <Settings2 size={48} className="text-third/40 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-primary">No preferences set</h3>
                <p className="text-primary/50 text-sm max-w-sm mb-6">
                  Tell us what kind of vehicles you&apos;re looking for, and we&apos;ll personalize your experience.
                </p>
                <Button variant="primary" showIcon={false} onClick={() => setEditMode(true)}>
                  Set Preferences
                </Button>
              </div>
            )}

            {/* Reusing the popup for editing */}
            <PreferencesPopup 
              isOpen={editMode} 
              onClose={() => setEditMode(false)}
              initialData={userPref}
              onSubmit={handleUpdatePreference}
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Wishlist;
