"use client";

import React, { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import ChipGroup from "@/components/ui/chipGroup";
import Button from "@/components/ui/button";

import { getMakers, getModelByMakerId } from "@/services/preference.service";

function PreferencesPopup({ isOpen, onClose }) {
  // ✅ Location States
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  // ✅ Brand Selection
  const [selectedBrands, setSelectedBrands] = useState([]);

  // ✅ Budget
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ✅ Popup Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ✅ Makers Pagination State
  const [makers, setMakers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMakers, setLoadingMakers] = useState(false);

  // ✅ Models State
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);

  // ✅ Fetch Makers API (Pagination)
  const fetchMakers = async (pageNumber = 1) => {
    try {
      setLoadingMakers(true);

      const response = await getMakers({
        page: pageNumber,
        limit: 10,
      });

      // ✅ Append Makers Data
      setMakers((prev) => [...prev, ...response.data]);

      // ✅ Save Total Pages
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch makers:", error);
    } finally {
      setLoadingMakers(false);
    }
  };

  // ✅ Load Makers on Popup Open
  useEffect(() => {
    if (isOpen) {
      setMakers([]);
      setPage(1);
      fetchMakers(1);
    }
  }, [isOpen]);

  // ✅ Load More Makers Button
  const loadMoreMakers = () => {
    if (page < totalPages && !loadingMakers) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMakers(nextPage);
    }
  };

  // ✅ Fetch Models Based on Selected Brands
  useEffect(() => {
    if (selectedBrands.length === 0) {
      setModels([]);
      return;
    }

    const fetchModels = async () => {
      try {
        setLoadingModels(true);
        setModels([]);

        let allModels = [];

        // ✅ Fetch Models One Brand at a Time
        for (let makerId of selectedBrands) {
          const response = await getModelByMakerId({
            makerId,
            page: 1,
            limit: 50,
          });

          allModels = [...allModels, ...response.data];
        }

        // ✅ Remove Duplicate Models
        const uniqueModels = Array.from(
          new Map(allModels.map((m) => [m.modelId, m])).values(),
        );

        setModels(uniqueModels);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [selectedBrands]);

  if (!isOpen) return null;

  // ✅ Convert Makers to Chip Items
  const brandItems = makers.map((maker) => ({
    value: maker.makeId,
    label: maker.makeDisplay,
  }));

  // ✅ Convert Models to Chip Items
  const modelItems = models.map((model) => ({
    value: model.modelId,
    label: model.modelName,
  }));

  // ✅ Static Filters
  const fuelTypes = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "cng", label: "CNG" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const transmissionTypes = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "amt", label: "AMT" },
    { value: "cvt", label: "CVT" },
    { value: "dct", label: "DCT" },
  ];

  const variants = [
    { value: "base", label: "Base" },
    { value: "mid", label: "Mid Variant" },
    { value: "top", label: "Top Variant" },
    { value: "sports", label: "Sports Edition" },
    { value: "premium", label: "Premium" },
    { value: "limited", label: "Limited Edition" },
  ];

  const vehicleTypes = [
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "hatchback", label: "Hatchback" },
    { value: "muv", label: "MUV" },
    { value: "truck", label: "Truck" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
  ];

  // ✅ Location Data
  const states = [
    { value: "gujarat", label: "Gujarat" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "delhi", label: "Delhi (NCT)" },
    { value: "punjab", label: "Punjab" },
    { value: "haryana", label: "Haryana" },
  ];

  const cities = [
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "surat", label: "Surat" },
    { value: "vadodara", label: "Vadodara" },
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
    { value: "delhi", label: "New Delhi" },
  ];

  // ✅ Location Handlers
  const handleSelectState = (e) => {
    const val = e.target.value;
    if (val && !selectedStates.includes(val)) {
      setSelectedStates([...selectedStates, val]);
    }
    e.target.value = "";
  };

  const handleSelectCity = (e) => {
    const val = e.target.value;
    if (val && !selectedCities.includes(val)) {
      setSelectedCities([...selectedCities, val]);
    }
    e.target.value = "";
  };

  const removeChip = (value, type) => {
    if (type === "state") {
      setSelectedStates(selectedStates.filter((s) => s !== value));
    }
    if (type === "city") {
      setSelectedCities(selectedCities.filter((c) => c !== value));
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-secondary border border-third/30 shadow-2xl flex flex-col max-h-[90vh]">
        {/* ✅ Header */}
        <div className="flex items-center justify-between p-6 border-b border-third/10">
          <h2 className="text-xl font-bold text-primary">User Preferences</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-third/20 transition-colors"
          >
            <X size={20} className="text-primary" />
          </button>
        </div>

        {/* ✅ Content */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <div className="flex flex-col gap-8 pb-10">
            {/* ✅ Brand */}
            <ChipGroup
              title="Brand"
              items={brandItems}
              serverPagination={true}
              hasMore={page < totalPages}
              onLoadMore={loadMoreMakers}
              onChange={(values) => setSelectedBrands(values)}
            />

            {/* ✅ Model */}
            {loadingModels && (
              <p className="text-sm text-primary/50">Loading models...</p>
            )}

            <ChipGroup title="Model" items={modelItems} showMore searchable />

            {/* ✅ Others */}
            <ChipGroup title="Fuel Type" items={fuelTypes} />
            <ChipGroup title="Transmission" items={transmissionTypes} />
            <ChipGroup title="Variant" items={variants} showMore />
            <ChipGroup title="Vehicle Type" items={vehicleTypes} />

            {/* ✅ Location Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary">Location</h3>

              {/* ✅ State */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-primary/50">
                  Select State
                </label>

                <div className="relative w-full">
                  <select
                    onChange={handleSelectState}
                    defaultValue=""
                    className="w-full appearance-none px-4 py-2.5 text-sm rounded-xl bg-secondary border border-third/30 text-primary"
                  >
                    <option value="" disabled>
                      Choose a state...
                    </option>
                    {states.map((item) => (
                      <option key={item.value} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50"
                  />
                </div>

                {/* ✅ Selected States */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedStates.map((state) => (
                    <div
                      key={state}
                      onClick={() => removeChip(state, "state")}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer"
                    >
                      {state}
                      <X size={14} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ City */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-primary/50">
                  Select City
                </label>

                <div className="relative w-full">
                  <select
                    onChange={handleSelectCity}
                    defaultValue=""
                    className="w-full appearance-none px-4 py-2.5 text-sm rounded-xl bg-secondary border border-third/30 text-primary"
                  >
                    <option value="" disabled>
                      Choose a city...
                    </option>
                    {cities.map((item) => (
                      <option key={item.value} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50"
                  />
                </div>

                {/* ✅ Selected Cities */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => removeChip(city, "city")}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer"
                    >
                      {city}
                      <X size={14} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ✅ Budget */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">
                Budget Range
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min ₹"
                  className="w-full px-4 py-3 rounded-xl border border-third/30"
                />

                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max ₹"
                  className="w-full px-4 py-3 rounded-xl border border-third/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-third/10">
          <Button onClick={onClose} variant="outlineSecondary">
            Cancel
          </Button>
          <Button variant="ghost">Apply Preferences</Button>
        </div>
      </div>
    </div>
  );
}

export default PreferencesPopup;
