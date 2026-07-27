"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  Car,
  MapPin,
  Wallet,
  Search,
  Fuel,
  Cog,
  Layers,
  Truck,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import ChipGroup from "@/components/ui/chipGroup";
import Button from "@/components/ui/button";

import { getAndSearchMakers, getAndSearchModel } from "@/services/filter";
import {
  addUserPefrence,
  getCities,
  getState,
  getAllTown,
} from "@/services/user.service";

/* ─── step config ─── */
const STEPS = [
  { id: 0, label: "Vehicle", icon: Car },
  { id: 1, label: "Specs", icon: Cog },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Budget", icon: Wallet },
];

/* ─── hero images per step ─── */
const STEP_IMAGES = [
  "/final-location.webp",
  "/car_inspection.webp",
  "/vehicle_and_men.webp",
  "/budget-final.webp",
];

const STEP_TAGLINES = [
  { title: "Choose Your\nDream Vehicle", sub: "Select brand & model" },
  { title: "Fine-tune\nYour Search", sub: "Fuel, transmission & more" },
  { title: "Where Are\nYou Looking?", sub: "State & city preferences" },
  { title: "Set Your\nBudget", sub: "Min & max price range" },
];

function PreferencesPopup({
  isOpen,
  onClose,
  initialData = null,
  onSubmit = null,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [modelError, setModelError] = useState("");

  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTowns, setSelectedTowns] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [townSearch, setTownSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const brandSearchTimeoutRef = useRef(null);
  const modelSearchTimeoutRef = useRef(null);
  const [makers, setMakers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMakers, setLoadingMakers] = useState(false);
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [modelPage, setModelPage] = useState(1);
  const [modelTotalPages, setModelTotalPages] = useState(1);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showTownDropdown, setShowTownDropdown] = useState(false);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    [],
  );
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  /* ─── close with animation ─── */
  const handleClose = useCallback(() => {
    setIsClosing(true);
    localStorage.setItem("hasShownPreferencesPopup", "true");
    setTimeout(() => {
      setIsClosing(false);
      setActiveStep(0);
      if (onClose) onClose();
    }, 250);
  }, [onClose]);

  /* ─── sync initialData ─── */
  useEffect(() => {
    if (isOpen && initialData) {
      const sIds =
        initialData.states?.map((s) => String(s.id || s.stateId || s)) ||
        initialData.stateIds?.map(String) ||
        [];
      const cIds =
        initialData.cities?.map((c) => String(c.id || c.cityId || c)) ||
        initialData.cityIds?.map(String) ||
        [];
      const tIds =
        initialData.towns?.map((t) => String(t.id || t.townId || t)) ||
        initialData.townIds?.map(String) ||
        [];

      setSelectedStates(sIds);
      setSelectedCities(cIds);
      setSelectedTowns(tIds);

      if (initialData.states?.length > 0) {
        setStates((prev) => {
          const map = new Map(prev.map((item) => [Number(item.id), item]));
          initialData.states.forEach((s) =>
            map.set(Number(s.id || s.stateId), {
              id: Number(s.id || s.stateId),
              name: s.name || s.stateName,
            })
          );
          return Array.from(map.values());
        });
      }
      if (initialData.cities?.length > 0) {
        setCities((prev) => {
          const map = new Map(prev.map((item) => [Number(item.id), item]));
          initialData.cities.forEach((c) =>
            map.set(Number(c.id || c.cityId), {
              id: Number(c.id || c.cityId),
              name: c.name || c.cityName,
            })
          );
          return Array.from(map.values());
        });
      }
      if (initialData.towns?.length > 0) {
        setTowns((prev) => {
          const map = new Map(prev.map((item) => [Number(item.id), item]));
          initialData.towns.forEach((t) =>
            map.set(Number(t.id || t.townId), {
              id: Number(t.id || t.townId),
              name: t.name || t.townName,
            })
          );
          return Array.from(map.values());
        });
      }

      if (initialData.makerDetails?.length > 0) {
        setMakers((prev) => {
          const map = new Map(
            prev.map((item) => [item.makeId || item.id, item])
          );
          initialData.makerDetails.forEach((m) =>
            map.set(m.makerId, {
              makeId: m.makerId,
              id: m.makerId,
              makeDisplay: m.makerName,
              makeName: m.makerName,
            })
          );
          return Array.from(map.values());
        });
      }
      if (initialData.modelDetails?.length > 0) {
        setModels((prev) => {
          const map = new Map(
            prev.map((item) => [item.modelId || item.id, item])
          );
          initialData.modelDetails.forEach((m) =>
            map.set(m.modelId, {
              modelId: m.modelId,
              id: m.modelId,
              modelDisplayName: m.modelName,
              modelName: m.modelName,
            })
          );
          return Array.from(map.values());
        });
      }

      setSelectedBrands(initialData.makerDetails?.map((m) => m.makerId) || []);
      setSelectedModels(initialData.modelDetails?.map((m) => m.modelId) || []);
      setSelectedFuelTypes(initialData.fuelTypes || []);
      setSelectedTransmissionTypes(initialData.transmissionTypes || []);
      setSelectedVehicleTypes(initialData.vehicleTypes || []);
      setMinPrice(initialData.minPrice ? String(initialData.minPrice) : "");
      setMaxPrice(initialData.maxPrice ? String(initialData.maxPrice) : "");
    } else if (isOpen && !initialData) {
      // Reset if opened without initial data
      setSelectedStates([]);
      setSelectedCities([]);
      setSelectedTowns([]);
      setSelectedBrands([]);
      setSelectedModels([]);
      setSelectedFuelTypes([]);
      setSelectedTransmissionTypes([]);
      setSelectedVehicleTypes([]);
      setMinPrice("");
      setMaxPrice("");
    }
  }, [isOpen, initialData]);

  /* ─── dropdown close on outside click ─── */
  useEffect(() => {
    const close = () => {
      setShowStateDropdown(false);
      setShowCityDropdown(false);
      setShowTownDropdown(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* ─── lock body scroll ─── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* ─── fetch states ─── */
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

  /* ─── fetch cities for selected states ─── */
  useEffect(() => {
    if (selectedStates.length === 0) {
      return;
    }
    const fetchAllCities = async () => {
      try {
        const responses = await Promise.all(
          selectedStates.map((stateId) => getCities(stateId)),
        );
        const allCities = responses.flatMap((res) => res.data || []);
        const uniqueCities = Array.from(
          new Map(allCities.map((c) => [Number(c.id), c])).values(),
        );
        setCities((prev) => {
          const merged = [...prev, ...uniqueCities];
          return Array.from(
            new Map(merged.map((c) => [Number(c.id), c])).values(),
          );
        });
      } catch (err) {
        console.error("Error fetching cities for preferences:", err);
      }
    };
    fetchAllCities();
  }, [selectedStates]);

  /* ─── fetch towns for selected cities ─── */
  useEffect(() => {
    if (selectedCities.length === 0) {
      return;
    }
    const fetchAllTowns = async () => {
      try {
        const responses = await Promise.all(
          selectedCities.map((cityId) => getAllTown(cityId)),
        );
        const allTowns = responses.flatMap((res) => res.data || []);
        const uniqueTowns = Array.from(
          new Map(allTowns.map((t) => [Number(t.id), t])).values(),
        );
        setTowns((prev) => {
          const merged = [...prev, ...uniqueTowns];
          return Array.from(
            new Map(merged.map((t) => [Number(t.id), t])).values(),
          );
        });
      } catch (err) {
        console.error("Error fetching towns for preferences:", err);
      }
    };
    fetchAllTowns();
  }, [selectedCities]);

  /* ─── fetch makers ─── */
  const fetchMakers = async (pageNumber = 1, search = brandSearch) => {
    try {
      setLoadingMakers(true);
      const response = await getAndSearchMakers({
        searchTerm: search.trim() || undefined,
        page: pageNumber,
        limit: 10,
      });
      if (response.success && response.data) {
        setMakers((prev) => {
          if (pageNumber === 1) {
            const keep = prev.filter((p) =>
              selectedBrands.includes(p.makeId || p.id),
            );
            const filteredNew = response.data.filter(
              (nb) =>
                !keep.some((k) => (k.makeId || k.id) === (nb.makeId || nb.id)),
            );
            return [...keep, ...filteredNew];
          }
          const merged = [...prev, ...response.data];
          return Array.from(
            new Map(merged.map((m) => [m.makeId || m.id, m])).values(),
          );
        });
        const meta = response.pagination || response.meta;
        setTotalPages(meta ? meta.totalPages : 1);
        setPage(pageNumber);
      }
    } catch (error) {
      console.error("Failed to fetch makers:", error);
    } finally {
      setLoadingMakers(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (brandSearchTimeoutRef.current)
      clearTimeout(brandSearchTimeoutRef.current);

    brandSearchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchMakers(1, brandSearch);
    }, 400);

    return () => clearTimeout(brandSearchTimeoutRef.current);
  }, [brandSearch, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setBrandSearch("");
      setModelSearch("");
      setMakers([]);
      setModels([]);
      setPage(1);
      fetchMakers(1, "");
    }
  }, [isOpen]);

  const loadMoreMakers = () => {
    if (page < totalPages && !loadingMakers) {
      const nextPage = page + 1;
      fetchMakers(nextPage, brandSearch);
    }
  };

  /* ─── fetch models ─── */
  const fetchModels = async (pageNumber = 1, search = modelSearch) => {
    if (selectedBrands.length === 0) {
      setModels([]);
      return;
    }
    try {
      setLoadingModels(true);

      let allModels = [];
      let maxPages = 1;

      for (let makerId of selectedBrands) {
        const response = await getAndSearchModel({
          maker_id: makerId,
          searchTerm: search.trim() || undefined,
          page: pageNumber,
          limit: 10,
        });
        if (response.success && response.data) {
          allModels = [...allModels, ...response.data];
          const meta = response.pagination || response.meta;
          if (meta && meta.totalPages > maxPages) {
            maxPages = meta.totalPages;
          }
        }
      }

      setModels((prev) => {
        if (pageNumber === 1) {
          const keep = prev.filter((p) =>
            selectedModels.includes(p.modelId || p.id),
          );
          const filteredNew = allModels.filter(
            (nm) =>
              !keep.some((k) => (k.modelId || k.id) === (nm.modelId || nm.id)),
          );
          return [...keep, ...filteredNew];
        }
        const merged = [...prev, ...allModels];
        return Array.from(
          new Map(merged.map((m) => [m.modelId || m.id, m])).values(),
        );
      });
      setModelTotalPages(maxPages);
      setModelPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch models:", error);
    } finally {
      setLoadingModels(false);
    }
  };

  useEffect(() => {
    if (!isOpen || selectedBrands.length === 0) return;
    if (modelSearchTimeoutRef.current)
      clearTimeout(modelSearchTimeoutRef.current);

    modelSearchTimeoutRef.current = setTimeout(() => {
      setModelPage(1);
      fetchModels(1, modelSearch);
    }, 400);

    return () => clearTimeout(modelSearchTimeoutRef.current);
  }, [modelSearch, selectedBrands, isOpen]);

  const loadMoreModels = () => {
    if (modelPage < modelTotalPages && !loadingModels) {
      const nextPage = modelPage + 1;
      fetchModels(nextPage, modelSearch);
    }
  };

  if (!isOpen) return null;

  /* ─── static data ─── */
  const brandItems = Array.from(
    new Map(
      makers.map((m) => [
        m.makeId || m.id,
        {
          value: m.makeId || m.id,
          label: m.makeDisplay || m.makeName,
          logo: m.logo,
        },
      ]),
    ).values(),
  );
  const modelItems = Array.from(
    new Map(
      models.map((m) => [
        m.modelId || m.id,
        {
          value: m.modelId || m.id,
          label: m.modelDisplayName || m.modelName,
        },
      ]),
    ).values(),
  );

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

  const vehicleTypes = [
    { value: "TWO_WHEELER", label: "Two Wheeler" },
    { value: "FOUR_WHEELER", label: "Four Wheeler" },
  ];

  /* ─── handlers ─── */
  const handleSelectState = async (e) => {
    const stateId = e.target.value;
    if (!stateId) return;
    if (!selectedStates.includes(stateId)) {
      setSelectedStates([...selectedStates, stateId]);
    }
    try {
      const response = await getCities(stateId);
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

  const removeChip = (id, type) => {
    if (type === "state")
      setSelectedStates(selectedStates.filter((s) => String(s) !== String(id)));
    if (type === "city")
      setSelectedCities(selectedCities.filter((c) => String(c) !== String(id)));
    if (type === "town")
      setSelectedTowns(selectedTowns.filter((t) => String(t) !== String(id)));
  };

  const handleApplyPreferences = async () => {
    const payload = {
      vehicleTypes: selectedVehicleTypes,
      fuelTypes: selectedFuelTypes,
      transmissionTypes: selectedTransmissionTypes,
      makerDetails: selectedBrands.map((id) => {
        const maker = makers.find(
          (m) =>
            (m.makeId || m.id) === id ||
            String(m.makeId || m.id) === String(id),
        );
        return {
          makerId: id,
          makerName: maker?.makeDisplay || maker?.makeName || "",
        };
      }),
      modelDetails: selectedModels.map((id) => {
        const model = models.find(
          (m) =>
            (m.modelId || m.id) === id ||
            String(m.modelId || m.id) === String(id),
        );
        return {
          modelId: id,
          modelName: model?.modelDisplayName || model?.modelName || "",
        };
      }),
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      cityIds: selectedCities.map(Number),
      stateIds: selectedStates.map(Number),
      townIds: selectedTowns.map(Number),
    };
    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await addUserPefrence(payload);
      }
      handleClose();
    } catch (error) {
      console.error("Failed to save preferences", error);
    }
  };

  /* ─── count selections per step ─── */
  const stepCounts = [
    selectedBrands.length + selectedModels.length,
    selectedFuelTypes.length +
      selectedTransmissionTypes.length +
      selectedVehicleTypes.length,
    selectedStates.length + selectedCities.length + selectedTowns.length,
    (minPrice ? 1 : 0) + (maxPrice ? 1 : 0),
  ];

  /* ─── step content renderers ─── */
  const renderStep0 = () => (
    <div className="space-y-6">
      <ChipGroup
        title="Brand"
        items={brandItems}
        serverPagination={true}
        hasMore={page < totalPages}
        onLoadMore={loadMoreMakers}
        selected={selectedBrands}
        searchable={true}
        searchValue={brandSearch}
        onSearchChange={setBrandSearch}
        isLoading={loadingMakers}
        onChange={(values) => setSelectedBrands(values)}
      />
      <div className="pt-2 border-t border-primary/5">
        {loadingModels && (
          <p className="text-sm text-third animate-pulse mb-2">
            Loading models...
          </p>
        )}
        <ChipGroup
          title="Model"
          items={modelItems}
          serverPagination={true}
          hasMore={modelPage < modelTotalPages}
          onLoadMore={loadMoreModels}
          searchable={true}
          searchValue={modelSearch}
          onSearchChange={setModelSearch}
          isLoading={loadingModels}
          selected={selectedModels}
          onChange={(values) => {
            if (values.length > 5) {
              setModelError("You can select max 5 models");
              setTimeout(() => setModelError(""), 3000);
              return;
            }
            setModelError("");
            setSelectedModels(values);
          }}
          customEmptyMessage={
            selectedBrands.length === 0 ? "Select a brand first" : undefined
          }
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <ChipGroup
        title="Fuel Type"
        items={fuelTypes}
        selected={selectedFuelTypes}
        onChange={(values) => setSelectedFuelTypes(values)}
      />
      <ChipGroup
        title="Transmission"
        items={transmissionTypes}
        selected={selectedTransmissionTypes}
        onChange={(values) => setSelectedTransmissionTypes(values)}
      />

      <ChipGroup
        title="Vehicle Type"
        items={vehicleTypes}
        selected={selectedVehicleTypes}
        onChange={(values) => setSelectedVehicleTypes(values)}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* State */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-primary/50">
          Select State
        </label>
        <div className="relative group" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-primary/40 group-focus-within:text-third transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Search state..."
            value={stateSearch}
            onFocus={() => {
              setShowStateDropdown(true);
              setShowCityDropdown(false);
              setShowTownDropdown(false);
            }}
            onChange={(e) => {
              setStateSearch(e.target.value);
              setShowStateDropdown(true);
              setShowCityDropdown(false);
              setShowTownDropdown(false);
            }}
            className="w-full pl-11 pr-10 py-3 text-sm rounded-xl bg-primary/3 border border-primary/10 focus:border-third focus:ring-2 focus:ring-third/10 outline-none transition-all placeholder:text-primary/30 text-primary"
          />
          <div
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            onClick={() => {
              setShowStateDropdown(!showStateDropdown);
              setShowCityDropdown(false);
              setShowTownDropdown(false);
            }}
          >
            <ChevronDown
              size={18}
              className="text-primary/50 hover:text-primary transition-colors"
            />
          </div>
          {showStateDropdown && (
            <div className="absolute z-50 mt-2 w-full max-h-52 overflow-y-auto rounded-xl border border-primary/10 bg-secondary shadow-2xl custom-scrollbar py-1">
              {states.filter((s) =>
                s.name.toLowerCase().includes(stateSearch.toLowerCase()),
              ).length === 0 ? (
                <p className="p-4 text-sm text-primary/40 text-center">
                  No state found
                </p>
              ) : (
                states
                  .filter((s) =>
                    s.name.toLowerCase().includes(stateSearch.toLowerCase()),
                  )
                  .map((state) => (
                    <div
                      key={state.id}
                      onClick={() => {
                        if (!selectedStates.includes(String(state.id))) {
                          setSelectedStates([
                            ...selectedStates,
                            String(state.id),
                          ]);
                        }
                        handleSelectState({ target: { value: state.id } });
                        setStateSearch("");
                        setShowStateDropdown(false);
                      }}
                      className="px-4 py-2.5 text-sm cursor-pointer hover:bg-third/5 hover:text-third transition-colors font-medium text-primary/70"
                    >
                      {state.name}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
        {selectedStates.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedStates.map((stateId) => {
              const stateObj = states.find(
                (s) => Number(s.id) === Number(stateId),
              );
              return (
                <div
                  key={stateId}
                  onClick={() => removeChip(stateId, "state")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-third/10 text-third text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer group"
                >
                  {stateObj?.name || `State #${stateId}`}
                  <X size={12} className="group-hover:text-red-500" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-primary/50">
          Select City
        </label>
        <div className="relative group" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-primary/40 group-focus-within:text-third transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Search city..."
            value={citySearch}
            onFocus={() => {
              setShowCityDropdown(true);
              setShowStateDropdown(false);
              setShowTownDropdown(false);
            }}
            onChange={(e) => {
              setCitySearch(e.target.value);
              setShowCityDropdown(true);
              setShowStateDropdown(false);
              setShowTownDropdown(false);
            }}
            className="w-full pl-11 pr-10 py-3 text-sm rounded-xl bg-primary/3 border border-primary/10 focus:border-third focus:ring-2 focus:ring-third/10 outline-none transition-all placeholder:text-primary/30 text-primary"
          />
          <div
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            onClick={() => {
              setShowCityDropdown(!showCityDropdown);
              setShowStateDropdown(false);
              setShowTownDropdown(false);
            }}
          >
            <ChevronDown
              size={18}
              className="text-primary/50 hover:text-primary transition-colors"
            />
          </div>
          {showCityDropdown && (
            <div className="absolute z-50 mt-2 w-full max-h-52 overflow-y-auto rounded-xl border border-primary/10 bg-secondary shadow-2xl custom-scrollbar py-1">
              {cities.filter((c) =>
                c.name.toLowerCase().includes(citySearch.toLowerCase()),
              ).length === 0 ? (
                <p className="p-4 text-sm text-primary/40 text-center">
                  No city found
                </p>
              ) : (
                cities
                  .filter((c) =>
                    c.name.toLowerCase().includes(citySearch.toLowerCase()),
                  )
                  .map((city) => (
                    <div
                      key={city.id}
                      onClick={() => {
                        if (!selectedCities.includes(String(city.id))) {
                          setSelectedCities([
                            ...selectedCities,
                            String(city.id),
                          ]);
                        }
                        setCitySearch("");
                        setShowCityDropdown(false);
                      }}
                      className="px-4 py-2.5 text-sm cursor-pointer hover:bg-third/5 hover:text-third transition-colors font-medium text-primary/70"
                    >
                      {city.name}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
        {selectedCities.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedCities.map((cityId) => {
              const cityObj = cities.find(
                (c) => Number(c.id) === Number(cityId),
              );
              return (
                <div
                  key={cityId}
                  onClick={() => removeChip(cityId, "city")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-third/10 text-third text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer group"
                >
                  {cityObj?.name || `City #${cityId}`}
                  <X size={12} className="group-hover:text-red-500" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Town */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-primary/50">
          Select Town
        </label>
        <div className="relative group" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-primary/40 group-focus-within:text-third transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder={
              selectedCities.length > 0 ? "Search town..." : "Select city first"
            }
            value={townSearch}
            disabled={selectedCities.length === 0}
            onFocus={() => {
              setShowTownDropdown(true);
              setShowStateDropdown(false);
              setShowCityDropdown(false);
            }}
            onChange={(e) => {
              setTownSearch(e.target.value);
              setShowTownDropdown(true);
              setShowStateDropdown(false);
              setShowCityDropdown(false);
            }}
            className="w-full pl-11 pr-10 py-3 text-sm rounded-xl bg-primary/3 border border-primary/10 focus:border-third focus:ring-2 focus:ring-third/10 outline-none transition-all placeholder:text-primary/30 text-primary disabled:opacity-50"
          />
          <div
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            onClick={() => {
              if (selectedCities.length > 0) {
                setShowTownDropdown(!showTownDropdown);
                setShowStateDropdown(false);
                setShowCityDropdown(false);
              }
            }}
          >
            <ChevronDown
              size={18}
              className="text-primary/50 hover:text-primary transition-colors"
            />
          </div>
          {showTownDropdown && selectedCities.length > 0 && (
            <div className="absolute z-50 mt-2 w-full max-h-52 overflow-y-auto rounded-xl border border-primary/10 bg-secondary shadow-2xl custom-scrollbar py-1">
              {towns.filter((t) =>
                t.name.toLowerCase().includes(townSearch.toLowerCase()),
              ).length === 0 ? (
                <p className="p-4 text-sm text-primary/40 text-center">
                  No town found
                </p>
              ) : (
                towns
                  .filter((t) =>
                    t.name.toLowerCase().includes(townSearch.toLowerCase()),
                  )
                  .map((town) => (
                    <div
                      key={town.id}
                      onClick={() => {
                        if (!selectedTowns.includes(String(town.id))) {
                          setSelectedTowns([...selectedTowns, String(town.id)]);
                        }
                        setTownSearch("");
                        setShowTownDropdown(false);
                      }}
                      className="px-4 py-2.5 text-sm cursor-pointer hover:bg-third/5 hover:text-third transition-colors font-medium text-primary/70"
                    >
                      {town.name}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
        {selectedTowns.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedTowns.map((townId) => {
              const townObj = towns.find(
                (t) => Number(t.id) === Number(townId),
              );
              return (
                <div
                  key={townId}
                  onClick={() => removeChip(townId, "town")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-third/10 text-third text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer group"
                >
                  {townObj?.name || `Town #${townId}`}
                  <X size={12} className="group-hover:text-red-500" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-widest text-primary/50">
          Minimum Price
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-primary/40 font-semibold group-focus-within:text-third transition-colors text-base">
              ₹
            </span>
          </div>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 500000"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-primary/3 border border-primary/10 focus:border-third focus:ring-2 focus:ring-third/10 outline-none transition-all placeholder:text-primary/30 text-primary font-medium"
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-widest text-primary/50">
          Maximum Price
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-primary/40 font-semibold group-focus-within:text-third transition-colors text-base">
              ₹
            </span>
          </div>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1500000"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-primary/3 border border-primary/10 focus:border-third focus:ring-2 focus:ring-third/10 outline-none transition-all placeholder:text-primary/30 text-primary font-medium"
          />
        </div>
      </div>
    </div>
  );

  const stepRenderers = [renderStep0, renderStep1, renderStep2, renderStep3];

  const isLastStep = activeStep === STEPS.length - 1;
  const isFirstStep = activeStep === 0;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* ─── Main Card ─── */}
      <div
        className="relative flex w-full max-w-[1000px] h-[90vh] md:h-[650px] max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl bg-secondary"
        onClick={(e) => {
          e.stopPropagation();
          setShowStateDropdown(false);
          setShowCityDropdown(false);
          setShowTownDropdown(false);
        }}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* ────── LEFT IMAGE PANEL ────── */}
        <div className="hidden md:flex w-5/12 relative flex-col h-full">
          {/* Image with transition */}
          <div className="absolute inset-0 overflow-hidden">
            {STEP_IMAGES.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: activeStep === i ? 1 : 0 }}
              >
                <Image
                  src={src}
                  loading="lazy"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20 z-10" />

          {/* Step nav dots - top */}
          <div className="relative z-20 p-6 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === i
                    ? "w-8 bg-white"
                    : stepCounts[i] > 0
                      ? "w-4 bg-white/60"
                      : "w-4 bg-white/25"
                }`}
              />
            ))}
          </div>

          {/* Tagline - bottom */}
          <div className="relative z-20 mt-auto p-8">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
              Step {activeStep + 1} of {STEPS.length}
            </p>
            <h2 className="text-4xl font-bold text-white leading-tight whitespace-pre-line">
              {STEP_TAGLINES[activeStep].title}
            </h2>
            <p className="text-white/70 mt-3 text-sm">
              {STEP_TAGLINES[activeStep].sub}
            </p>
          </div>
        </div>

        {/* ────── RIGHT FORM PANEL ────── */}
        <div className="w-full md:w-8/12 flex flex-col h-full">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>

          {/* Step tabs */}
          <div className="flex items-center border-b border-primary/5 px-4 pt-4 overflow-x-auto custom-scrollbar scrollbar-hide">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              const count = stepCounts[i];
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "text-third"
                      : "text-primary/40 hover:text-primary/70"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{step.label}</span>
                  {count > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-third/10 text-third text-[10px] font-bold">
                      {count}
                    </span>
                  )}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-third rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile step tagline */}
          <div className="md:hidden px-6 pt-4 pb-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-third/70">
              Step {activeStep + 1} of {STEPS.length}
            </p>
            <h3 className="text-xl font-bold text-primary mt-1 whitespace-pre-line">
              {STEP_TAGLINES[activeStep].title}
            </h3>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
            {stepRenderers[activeStep]()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-primary/5 bg-secondary">
            {!isFirstStep ? (
              <Button
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                variant="outlineSecondary"
                size="sm"
                className="cursor-pointer"
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {modelError && (
              <div className="text-center text-red-500 text-sm font-medium animate-pulse flex-1 mx-4">
                {modelError}
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* <Button
                onClick={handleClose}
                variant="outlineSecondary"
                size="sm"
              >
                Cancel
              </Button> */}

              {isLastStep ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleApplyPreferences}
                >
                  <Sparkles size={16} className="mr-2" />
                  Apply Preferences
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setActiveStep((s) => Math.min(STEPS.length - 1, s + 1))
                  }
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default PreferencesPopup;
