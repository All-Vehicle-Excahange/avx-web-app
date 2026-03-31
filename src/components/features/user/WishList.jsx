/* eslint-disable react-hooks/exhaustive-deps */
import ConsultantCard from "@/components/ui/const/ConsultCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { getWishList, getFollowedConsultant } from "@/services/user.service";

function Wishlist() {
  const [activeTab, setActiveTab] = useState("wishlist");

  const tabs = [
    { id: "wishlist", label: "Wishlist" },
    { id: "subscribed", label: "Subscribed Consultants" },
    { id: "preference", label: "Preferences" },
  ];

  const [prefs, setPrefs] = useState({
    suvUnder15: true,
    avx: true,
    ahmedabad: true,
  });
  const [editMode, setEditMode] = useState(false);

  const [cardData, setCardData] = useState([]);
  const [wishlistPage, setWishlistPage] = useState(1);
  const [hasMoreWishlist, setHasMoreWishlist] = useState(true);

  const [followedConsualt, setFollowedConsualt] = useState([]);
  const [consultantPage, setConsultantPage] = useState(1);
  const [hasMoreConsultant, setHasMoreConsultant] = useState(true);

  const toggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const fetchWishList = useCallback(async (page = 1) => {
    try {
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
    }
  }, []);

  const fetchFollowedConsultant = useCallback(async (page = 1) => {
    try {
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
    }
  }, []);

  useEffect(() => {
    if (activeTab === "wishlist") {
      fetchWishList(1);
      setWishlistPage(1);
    } else if (activeTab === "subscribed") {
      fetchFollowedConsultant(1);
      setConsultantPage(1);
    }
  }, [activeTab, fetchWishList, fetchFollowedConsultant]);

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
              {cardData.length > 0 ? (
                cardData.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="lg:col-span-1 lg:row-span-1 h-full"
                  >
                    <VehicleCard data={vehicle} onWishlistChange={() => { setWishlistPage(1); fetchWishList(1); }} />
                  </div>
                ))
              ) : (
                <p className="text-third">Your wishlist is empty.</p>
              )}
            </div>
            {hasMoreWishlist && cardData.length > 0 && (
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
              {followedConsualt.length > 0 ? (
                followedConsualt.map((item) => (
                  <ConsultantCard
                    key={item.id}
                    {...item} // Using the spread operator since we already formatted the exact props!
                  />
                ))
              ) : (
                <p className="text-third">You havent subscribed to any consultants yet.</p>
              )}
            </div>
            {hasMoreConsultant && followedConsualt.length > 0 && (
              <div className="flex justify-end mt-6">
                <Button variant="outline" showIcon={false} onClick={handleLoadMoreConsultant}>
                  See More
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 🔔 NOTIFICATION PREFERENCES */}
        {activeTab === "preference" && (
          <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 max-w-xl">
            <h2 className="text-xl font-bold mb-4 hidden">Notification Preferences</h2>
            <p className="text-third text-sm mb-4">Notify me for:</p>

            <div className="space-y-4 text-sm">
              {[
                { key: "suvUnder15", label: "SUVs under ₹15L" },
                { key: "avx", label: "AVX Inspected vehicles" },
                { key: "ahmedabad", label: "Vehicles in Ahmedabad" },
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex items-center gap-4 cursor-pointer ${!editMode && "opacity-60 pointer-events-none"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={prefs[item.key]}
                    onChange={() => toggle(item.key)}
                    className="w-5 h-5 accent-white"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex gap-4">
              {!editMode && (
                <Button
                  variant="ghost"
                  showIcon={false}
                  onClick={() => setEditMode(true)}
                >
                  Update Preferences
                </Button>
              )}

              {editMode && (
                <>
                  <Button
                    variant="ghost"
                    showIcon={false}
                    onClick={() => setEditMode(false)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlineSecondary"
                    showIcon={false}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Wishlist;
