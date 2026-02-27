/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import Chip from "@/components/ui/chip";
import { FilterIcon } from "lucide-react";
import ConsultantGridSection from "./ConsultantGridSection";
import ConsultantSliderSection from "./ConsultantSliderSection";
import FilterSection from "../../search/FilterSection";
import { getAllConsultService } from "@/services/consult.filter.service";
import { getCities, getState } from "@/services/user.service";

/* ================= MOBILE DETECTION ================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    setIsMobile(media.matches);

    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

export default function FilterWithCard() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Vehicle Type");
  const [selectedMobileChips, setSelectedMobileChips] = useState([]);
  const [avxAssumed, setAvxAssumed] = useState(true);

  // ── New state for Services chips (from API) ──
  const [services, setServices] = useState([
    // fallback dummy in case API fails or slow
    { value: "finance", label: "Finance" },
    { value: "inspection", label: "Inspection" },
  ]);

  const isMobile = useIsMobile();

  const toggleMobileChip = (chip) => {
    setSelectedMobileChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip],
    );
  };

  // Call API once on mount and populate services chips
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllConsultService({ pageNo: 1, size: 20 }); // adjust size if needed

        if (res.success && Array.isArray(res.data)) {
          const apiServices = res.data.map((service) => ({
            value: service.toLowerCase(),
            label: service
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
              )
              .join(" "),
          }));
          setServices(apiServices);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        // keep dummy fallback
      }
    };

    fetchServices();
  }, []); // empty dependency → runs only once on page open

  /* ================= CONSULTANT DATA ================= */
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
    // ... rest same (duplicates removed for brevity)
  ];

  /* ================= FILTER CHIP DATA ================= */
  const vehicleTypes = [
    { value: "TWO_WHEELER", label: "Two-Wheeler" },
    { value: "FOUR_WHEELER", label: "Four-Wheeler" },
  ];

  const consultantTypes = [
    { value: "premium", label: "Premium Consultant" },
    { value: "verified", label: "Verified Seller" },
    { value: "pro", label: "Pro Consultant" },
  ];

  const ratings = [
    { value: "4.5", label: "⭐ 4.5+ Rating" },
    { value: "4.0", label: "⭐ 4.0+ Rating" },
    { value: "unrated", label: "Unrated Vendors" },
  ];

  const inventorySizes = [
    { value: "1-10", label: "1–10 vehicles" },
    { value: "10-30", label: "10–30+ vehicles" },
    { value: "30+", label: "30+ vehicles" },
  ];

  const distances = [
    { value: "0-10", label: "0–10 Km" },
    { value: "10-30", label: "10–30 Km" },
    { value: "30-50", label: "30–50 Km" },
    { value: "city", label: "Entire City" },
  ];

  /* ================= MOBILE FILTER MAP ================= */
  const mobileFilterMap = {
    "Vehicle Type": vehicleTypes.map((v) => v.label),
    "Consultant Type": consultantTypes.map((c) => c.label),
    Rating: ratings.map((r) => r.label),
    "Inventory Size": inventorySizes.map((i) => i.label),
    Services: services.map((s) => s.label), // ← now uses API data
    Distance: distances.map((d) => d.label),
  };

  return (
    <div className="w-full pt-12 md:pt-20 md:pb-8 min-h-screen flex flex-col lg:flex-row text-secondary">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden lg:flex
          w-[340px]
          border border-third/40
          p-4
          flex-col
          gap-6
          shrink-0
          rounded-xl
          h-fit
          sticky
          top-[84px]
          self-start
        "
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Filter Your Result
          </h2>

          <InputField placeholder="Enter your location" variant="colored" />

          {/* Desktop AVX Toggle */}
          <div className="flex my-6 items-center justify-between px-4 py-3 rounded-xl border border-white/20">
            <span className="text-primary font-semibold text-sm">
              AVX Premium Consultants
            </span>
            <button
              onClick={() => setAvxAssumed(!avxAssumed)}
              className={`relative w-12 h-6 rounded-full ${
                avxAssumed ? "bg-primary" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-secondary transition-transform ${
                  avxAssumed ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div className="space-y-4">
            <FilterSection title={"Distance"}>
              <ChipGroup title="" items={distances} />
            </FilterSection>

            <FilterSection title="Inventory Size">
              <ChipGroup title="" items={inventorySizes} />
            </FilterSection>

            <FilterSection title="Vehicle Type">
              <ChipGroup title="" items={vehicleTypes} />
            </FilterSection>

            <FilterSection title="Rating">
              <ChipGroup title="" items={ratings} />
            </FilterSection>

            <FilterSection title={"Services Provided"}>
              <ChipGroup title="" items={services} />{" "}
              {/* ← Now uses API-loaded services */}
            </FilterSection>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Button variant="outline" showIcon={false} className="flex-1">
              Apply filter
            </Button>

            <Button
              variant="ghost"
              showIcon={false}
              className="text-primary/70 hover:text-primary rounded-3xl"
            >
              Clear filters
            </Button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 lg:pl-6 min-w-0">
        {/* MOBILE FILTER BAR (unchanged) */}
        <div className="flex lg:hidden items-center gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
          <div className="shrink-0">
            <Button
              variant="ghost"
              showIcon={false}
              onClick={() => setMobileFilterOpen(true)}
            >
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/5">
            <span className="text-xs text-white font-semibold whitespace-nowrap">
              AVX Premium Consultants
            </span>
            <button
              onClick={() => setAvxAssumed(!avxAssumed)}
              className={`relative w-9 h-5 rounded-full ${
                avxAssumed ? "bg-primary" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${
                  avxAssumed ? "translate-x-4" : ""
                }`}
              />
            </button>
          </div>

          {[
            "Premium Consultant",
            "⭐ 4.5+ Rating",
            "Car",
            "AVX Certified Inspection",
          ].map((chip) => (
            <div key={chip} className="shrink-0">
              <Chip
                label={chip}
                selected={selectedMobileChips.includes(chip)}
                variant="outline"
                onClick={() => toggleMobileChip(chip)}
              />
            </div>
          ))}
        </div>

        <ConsultantGridSection
          title="Featured Premium Consultant"
          data={consultants}
          showViewAll
        />

        <ConsultantSliderSection
          title="Sponsored Consultant"
          data={consultants}
        />

        <ConsultantGridSection
          title="Consult near you "
          data={consultants}
          i={6}
        />
      </main>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-primary lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-third/40">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              variant="ghost"
              showIcon={false}
              onClick={() => setMobileFilterOpen(false)}
            >
              ✕
            </Button>
          </div>

          <div className="flex h-[calc(100vh-120px)]">
            <div className="w-[40%] border-r border-third/40">
              {Object.keys(mobileFilterMap).map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveFilterTab(item)}
                  className={`px-4 py-3 text-sm cursor-pointer ${
                    activeFilterTab === item
                      ? "bg-secondary/10 font-semibold"
                      : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex-1 p-4">
              <div className="flex flex-wrap gap-3">
                {mobileFilterMap[activeFilterTab]?.map((chip) => (
                  <Chip
                    key={chip}
                    label={chip}
                    selected={selectedMobileChips.includes(chip)}
                    variant="outlineDark"
                    onClick={() => toggleMobileChip(chip)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
