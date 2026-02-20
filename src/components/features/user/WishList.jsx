import ConsultantCard from "@/components/ui/const/ConsultCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { getWishList ,getFollowedConsultant  } from "@/services/user.service";

function Wishlist() {
  const [prefs, setPrefs] = useState({
    suvUnder15: true,
    avx: true,
    ahmedabad: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [followedConsualt, setFollowedConsualt] = useState([])

  const toggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const fetchWishList = useCallback(async () => {
    try {
      const res = await getWishList({ pageNo: 1, size: 10 });
      if (res.success) {
        setCardData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await fetchWishList();
    };

    initialize();
  }, [fetchWishList]);

  useEffect(() => {
    const fetchFollowedConsultant = async () => {
      try {
        const data = { pageNo: 1, size: 10 };
        const res = await getFollowedConsultant(data);

        // Map the real data to match what the card expects
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

          setFollowedConsualt(formattedConsultants);
        }
      } catch (error) {
        console.error("Failed to fetch followed consultants:", error);
      }
    };

    fetchFollowedConsultant();
  }, []);


  const consultants = [
    {
      id: 1,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "10L - 18L",
      isSponsored: false,
    },
    {
      id: 2,
      name: "Shree Motors",
      location: "Ahmedabad, Gujarat",
      rating: 4.2,
      vehicleCount: 90,
      image: "/cs.png",
      priceRange: "80K - 1.5L",
      isSponsored: true,
    },
    {
      id: 3,
      name: "Prime Auto Hub",
      location: "Mehsana, Gujarat",
      rating: 4.6,
      vehicleCount: 140,
      image: "/cs.png",
      priceRange: "5L - 20L",
      isSponsored: false,
    },
    {
      id: 4,
      name: "Adarsh Auto Consultants",
      location: "Chhapi, Gujarat",
      rating: 4.5,
      vehicleCount: 116,
      image: "/cs.png",
      priceRange: "10L - 18L",
      isSponsored: false,
    },
  ];

  return (
    <>
      <section className="w-full container rounded-2xl  p-6 space-y-12">
        {/* VEHICLE WISHLIST */}
        <div>
          <h1 className="text-3xl font-extrabold mb-6">Vehicle Wishlist</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cardData.map((vehicle) => (
              <div
                key={vehicle.id}
                className="lg:col-span-1 lg:row-span-1 h-full"
              >
                <VehicleCard data={vehicle} onWishlistChange={fetchWishList} />
              </div>
            ))}
          </div>
        </div>

        {/* CONSULTANT WISHLIST */}
        <div>
          <h1 className="text-3xl font-extrabold mb-6">
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
        </div>

        {/* 🔔 NOTIFICATION PREFERENCES */}
        <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 max-w-xl">
          <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
          <p className="text-third text-sm mb-4">Notify me for:</p>

          <div className="space-y-4 text-sm">
            {[
              { key: "suvUnder15", label: "SUVs under ₹15L" },
              { key: "avx", label: "AVX Inspected vehicles" },
              { key: "ahmedabad", label: "Vehicles in Ahmedabad" },
            ].map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-4 cursor-pointer ${
                  !editMode && "opacity-60 pointer-events-none"
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
      </section>
    </>
  );
}

export default Wishlist;
