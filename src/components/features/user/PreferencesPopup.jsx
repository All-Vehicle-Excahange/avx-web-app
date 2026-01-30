"use client";

import React, { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import ChipGroup from "@/components/ui/chipGroup";
import Button from "@/components/ui/button";

import { getMakers, getModelByMakerId } from "@/services/preference.service";
import { addUserPefrence, getCities, getState } from "@/services/user.service";

function PreferencesPopup({ isOpen, onClose }) {
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const [makers, setMakers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMakers, setLoadingMakers] = useState(false);

  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    [],
  );
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);

  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    const close = () => {
      setShowStateDropdown(false);
      setShowCityDropdown(false);
    };

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchStates = async () => {
      try {
        const response = await getState();
        setStates(response.data);
      } catch (error) {
        console.log("Failed to fetch states", error);
      }
    };

    fetchStates();
  }, [isOpen]);

  const fetchMakers = async (pageNumber = 1) => {
    try {
      setLoadingMakers(true);

      const response = await getMakers({
        page: pageNumber,
        limit: 10,
      });

      setMakers((prev) => [...prev, ...response.data]);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch makers:", error);
    } finally {
      setLoadingMakers(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setMakers([]);
      setPage(1);
      fetchMakers(1);
    }
  }, [isOpen]);

  const loadMoreMakers = () => {
    if (page < totalPages && !loadingMakers) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMakers(nextPage);
    }
  };

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

        for (let makerId of selectedBrands) {
          const response = await getModelByMakerId({
            makerId,
            page: 1,
            limit: 50,
          });

          allModels = [...allModels, ...response.data];
        }

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

  const brandItems = makers.map((maker) => ({
    value: maker.makeId,
    label: maker.makeDisplay,
  }));

  const modelItems = models.map((model) => ({
    value: model.modelId,
    label: model.modelName,
  }));

  const fuelTypes = [
    { value: "PETROL", label: "Petrol" },
    { value: "DIESEL", label: "Diesel" },
    { value: "CNG", label: "CNG" },
    { value: "ELECTRIC", label: "Electric" },
    { value: "HYBRID", label: "Hybrid" },
  ];

  const transmissionTypes = [
    { value: "MANUAL", label: "Manual" },
    { value: "AUTOMATIC", label: "Automatic" },
  ];

  const variants = [
    { value: "BASE", label: "Base" },
    { value: "MID", label: "Mid Variant" },
    { value: "TOP", label: "Top Variant" },
  ];

  const vehicleTypes = [
    { value: "OTHER", label: "Other" },
    { value: "COMMERCIAL", label: "Commercial" },
    { value: "TWO_WHEELER", label: "Two Wheeler" },
    { value: "FOUR_WHEELER", label: "Four Wheeler" },
  ];  

  // ✅ Select State + Fetch Cities (MERGE FIX)
  const handleSelectState = async (e) => {
    const stateId = e.target.value;

    if (!stateId) return;

    if (!selectedStates.includes(stateId)) {
      setSelectedStates([...selectedStates, stateId]);
    }

    try {
      const response = await getCities(stateId);

      // ✅ Merge Cities Instead of Replace
      setCities((prev) => {
        const merged = [...prev, ...response.data];

        return Array.from(new Map(merged.map((c) => [c.id, c])).values());
      });
    } catch (error) {
      console.log("Failed to fetch cities", error);
    }

    setStateSearch("");
    e.target.value = "";
  };

  // ✅ Remove Chips
  const removeChip = (id, type) => {
    if (type === "state") {
      setSelectedStates(selectedStates.filter((s) => s !== id));
    }

    if (type === "city") {
      setSelectedCities(selectedCities.filter((c) => c !== id));
    }
  };

  const handleApplyPreferences = async () => {
    const payload = {
      vehicleTypes: selectedVehicleTypes,
      vehicleSubTypes: selectedVariants,
      fuelTypes: selectedFuelTypes,
      transmissionTypes: selectedTransmissionTypes,

      makerDetails: selectedBrands.map((id) => {
        const maker = makers.find((m) => m.makeId === id);
        return {
          makerId: id,
          makerName: maker?.makeDisplay || "",
        };
      }),

      modelDetails: selectedModels.map((id) => {
        const model = models.find((m) => m.modelId === id);
        return {
          modelId: id,
          modelName: model?.modelName || "",
        };
      }),

      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,

      cityIds: selectedCities.map(Number),
      stateIds: selectedStates.map(Number),
    };

    console.log("Final Payload ✅", payload);

    try {
      await addUserPefrence(payload);
      alert("Preferences Saved ✅");
      onClose();
    } catch (error) {
      console.error("Failed to save preferences", error);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-secondary border border-third/30 shadow-2xl flex flex-col max-h-[90vh]">
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
          <div className="flex flex-col gap-8 pb-30">
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

            <ChipGroup
              title="Model"
              items={modelItems}
              showMore
              searchable
              onChange={(values) => setSelectedModels(values)}
            />

            {/* ✅ Others */}
            <ChipGroup
              title="Fuel Type"
              items={fuelTypes}
              onChange={(values) => setSelectedFuelTypes(values)}
            />
            <ChipGroup
              title="Transmission"
              items={transmissionTypes}
              onChange={(values) => setSelectedTransmissionTypes(values)}
            />
            <ChipGroup
              title="Variant"
              items={variants}
              showMore
              onChange={(values) => setSelectedVariants(values)}
            />
            <ChipGroup
              title="Vehicle Type"
              items={vehicleTypes}
              onChange={(values) => setSelectedVehicleTypes(values)}
            />

            {/* ✅ Location */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary">Location</h3>

              {/* ✅ State */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-primary/50">
                  Select State
                </label>

                {/* ✅ Custom Search Dropdown Wrapper */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  {/* ✅ Input */}
                  <input
                    type="text"
                    placeholder="Search & Select State..."
                    value={stateSearch}
                    onFocus={() => setShowStateDropdown(true)}
                    onChange={(e) => {
                      setStateSearch(e.target.value);
                      setShowStateDropdown(true);
                    }}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-secondary border border-third/30"
                  />

                  {/* ✅ Dropdown INSIDE Popup */}
                  {showStateDropdown && (
                    <div className="absolute z-50 mt-2 w-full max-h-52 overflow-y-auto rounded-xl border border-third/20 bg-secondary shadow-lg">
                      {states.filter((s) =>
                        s.name
                          .toLowerCase()
                          .includes(stateSearch.toLowerCase()),
                      ).length === 0 ? (
                        <p className="p-3 text-sm text-primary/40">
                          No state found...
                        </p>
                      ) : (
                        states
                          .filter((s) =>
                            s.name
                              .toLowerCase()
                              .includes(stateSearch.toLowerCase()),
                          )
                          .map((state) => (
                            <div
                              key={state.id}
                              onClick={() => {
                                if (!selectedStates.includes(state.id)) {
                                  setSelectedStates([
                                    ...selectedStates,
                                    state.id,
                                  ]);
                                }

                                // ✅ Fetch Cities When State Selected
                                handleSelectState({
                                  target: { value: state.id },
                                });

                                setStateSearch("");
                                setShowStateDropdown(false);
                              }}
                              className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition"
                            >
                              {state.name}
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>

                {/* ✅ Selected States Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedStates.map((stateId) => {
                    const stateObj = states.find(
                      (s) => s.id === Number(stateId),
                    );

                    return (
                      <div
                        key={stateId}
                        onClick={() => removeChip(stateId, "state")}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl
          bg-primary/10 border border-primary/20 text-sm font-medium
          hover:bg-primary/20 transition cursor-pointer"
                      >
                        {stateObj?.name}
                        <X size={14} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ✅ City */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-primary/50">
                  Select City
                </label>

                {/* ✅ Custom Search Dropdown Wrapper */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  {/* ✅ Input */}
                  <input
                    type="text"
                    placeholder="Search & Select City..."
                    value={citySearch}
                    onFocus={() => setShowCityDropdown(true)}
                    onChange={(e) => {
                      setCitySearch(e.target.value);
                      setShowCityDropdown(true);
                    }}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-secondary border border-third/30"
                  />

                  {/* ✅ Dropdown INSIDE Popup */}
                  {showCityDropdown && (
                    <div className="absolute z-50 mt-2 w-full max-h-52 overflow-y-auto rounded-xl border border-third/20 bg-secondary shadow-lg">
                      {cities.filter((c) =>
                        c.name.toLowerCase().includes(citySearch.toLowerCase()),
                      ).length === 0 ? (
                        <p className="p-3 text-sm text-primary/40">
                          No city found...
                        </p>
                      ) : (
                        cities
                          .filter((c) =>
                            c.name
                              .toLowerCase()
                              .includes(citySearch.toLowerCase()),
                          )
                          .map((city) => (
                            <div
                              key={city.id}
                              onClick={() => {
                                if (!selectedCities.includes(city.id)) {
                                  setSelectedCities([
                                    ...selectedCities,
                                    city.id,
                                  ]);
                                }

                                setCitySearch("");
                                setShowCityDropdown(false);
                              }}
                              className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition"
                            >
                              {city.name}
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>

                {/* ✅ Selected Cities Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedCities.map((cityId) => {
                    const cityObj = cities.find((c) => c.id === Number(cityId));

                    return (
                      <div
                        key={cityId}
                        onClick={() => removeChip(cityId, "city")}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl
          bg-primary/10 border border-primary/20 text-sm font-medium
          hover:bg-primary/20 transition cursor-pointer"
                      >
                        {cityObj?.name}
                        <X size={14} />
                      </div>
                    );
                  })}
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
          <Button variant="ghost" onClick={handleApplyPreferences}>
            Apply Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PreferencesPopup;
