/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import PromoCardRow from "./PromoCardRow";
import Chip from "@/components/ui/chip";
import { ChevronLeft, ChevronRight, FilterIcon } from "lucide-react";
import SponsoredCars from "./SponsoredCars";
import FilterSection from "./FilterSection";
import PriceBased from "./PriceBased";
import { useSearchParams } from "next/navigation";
import {
  getAndSearchMakers,
  getAndSearchModel,
  getFilteredVehicles,
  getFuelTypeByModelId,
  getTransmissionTypeByModelId,
  getAndSearchVariant,
} from "@/services/filter";

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

export default function SearchWithCard() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Suggested Filters");
  const [selectedMobileChips, setSelectedMobileChips] = useState([]);
  const [avxAssumed, setAvxAssumed] = useState(true);
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [kmDistance, setKmDistance] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  // ── Brand states ──
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [brandPage, setBrandPage] = useState(1);
  const [brandHasMore, setBrandHasMore] = useState(true);
  const [brandLoading, setBrandLoading] = useState(false);

  // ── Model states ──
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelSearch, setModelSearch] = useState("");
  const [modelPage, setModelPage] = useState(1);
  const [modelHasMore, setModelHasMore] = useState(true);
  const [modelLoading, setModelLoading] = useState(false);

  // ── Fuel Type states ──
  const [fuelTypes, setFuelTypes] = useState([
    { value: "Petrol", label: "Petrol" },
    { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "LPG", label: "LPG" },
    { value: "CNG", label: "CNG" },
  ]);
  const [fuelLoading, setFuelLoading] = useState(false);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);

  // ── Transmission Type states ──
  const [transmissionTypes, setTransmissionTypes] = useState([
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
  ]);
  const [transmissionLoading, setTransmissionLoading] = useState(false);

  // ── Variant states ──
  const [variants, setVariants] = useState([]);
  const [variantSearch, setVariantSearch] = useState("");
  const [variantPage, setVariantPage] = useState(1);
  const [variantHasMore, setVariantHasMore] = useState(false);
  const [variantLoading, setVariantLoading] = useState(false);

  // Debounce refs
  const brandSearchTimeoutRef = useRef(null);
  const modelSearchTimeoutRef = useRef(null);
  const variantSearchTimeoutRef = useRef(null);

  const MIN = 50000;
  const MAX = 2000000;
  const MAX_KM = 200000;

  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  const vehicleType = searchParams.get("vehicleType");
  const bodyType = searchParams.get("bodyType");
  const fuelType = searchParams.get("fuelType");
  const brandParam = searchParams.get("brand");
  const makerId = searchParams.get("makerId");
  const budget = searchParams.get("budget");

  let mPrice = 0;
  let mxPrice = 0;
  let budgetMid = 0;
  if (budget) {
    const [min, max] = budget.replace(/\s/g, "").split("-");

    mPrice = parseFloat(min) * 100000;
    mxPrice = parseFloat(max) * 100000;

    budgetMid = (mPrice + mxPrice) / 2;
  }

  // Fetch vehicles (unchanged)
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const payload = {
          fuelType: "PETROL",
          minPrice: 300000,
          maxPrice: 800000,
          budgetMid: 550000,
        };
        const response = await getFilteredVehicles(payload);
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [fuelType, makerId]);

  // ── Load Brands with search ──
  const loadBrands = async (page = 1, searchTerm = brandSearch) => {
    if (brandLoading) return;
    setBrandLoading(true);

    try {
      const res = await getAndSearchMakers({
        searchTerm: searchTerm.trim() || undefined,
        page,
        limit: 10,
      });

      if (!res.success) return;

      const newBrands = res.data.map((item) => ({
        value: item.makeId.toString(),
        label: item.makeDisplay || item.makeName,
      }));

      setBrands((prev) => (page === 1 ? newBrands : [...prev, ...newBrands]));
      const meta = res.pagination;
      setBrandHasMore(meta ? page < meta.totalPages : false);
      setBrandPage(page);
    } catch (err) {
      console.error("Brands error:", err);
      setBrandHasMore(false);
    } finally {
      setBrandLoading(false);
    }
  };

  useEffect(() => {
    if (brandSearchTimeoutRef.current)
      clearTimeout(brandSearchTimeoutRef.current);

    brandSearchTimeoutRef.current = setTimeout(() => {
      setBrands([]);
      setBrandPage(1);
      setBrandHasMore(true);
      loadBrands(1, brandSearch);
    }, 400);

    return () => clearTimeout(brandSearchTimeoutRef.current);
  }, [brandSearch]);

  useEffect(() => {
    loadBrands(1, "");
  }, []);

  const handleLoadMoreBrands = () => {
    if (brandLoading || !brandHasMore) return;
    loadBrands(brandPage + 1, brandSearch);
  };

  const handleBrandChange = (values) => {
    setSelectedBrands(values.length > 0 ? [values[values.length - 1]] : []);
  };

  // ── Load Models with search ──
  const loadModels = async (page = 1, searchTerm = modelSearch) => {
    if (modelLoading) return;
    setModelLoading(true);

    try {
      const payload = {
        searchTerm: searchTerm.trim() || undefined,
        page,
        limit: 10,
      };

      if (selectedBrands.length > 0) {
        payload.maker_id = selectedBrands[0];
      }

      const res = await getAndSearchModel(payload);

      if (!res.success) return;

      const newModels = res.data.map((item) => ({
        value: item.modelId.toString(),
        label: item.modelDisplayName || item.modelName,
      }));

      setModels((prev) => (page === 1 ? newModels : [...prev, ...newModels]));
      const meta = res.pagination;
      setModelHasMore(meta ? page < meta.totalPages : false);
      setModelPage(page);
    } catch (err) {
      console.error("Models error:", err);
      setModelHasMore(false);
    } finally {
      setModelLoading(false);
    }
  };

  useEffect(() => {
    if (modelSearchTimeoutRef.current)
      clearTimeout(modelSearchTimeoutRef.current);

    modelSearchTimeoutRef.current = setTimeout(() => {
      setModels([]);
      setModelPage(1);
      setModelHasMore(true);
      loadModels(1, modelSearch);
    }, 400);

    return () => clearTimeout(modelSearchTimeoutRef.current);
  }, [modelSearch, selectedBrands]);

  useEffect(() => {
    setModels([]);
    setModelPage(1);
    setModelHasMore(true);
    loadModels(1, modelSearch);
  }, [selectedBrands]);

  const handleLoadMoreModels = () => {
    if (modelLoading || !modelHasMore) return;
    loadModels(modelPage + 1, modelSearch);
  };

  const handleModelChange = (values) => {
    setSelectedModels(values.length > 0 ? [values[values.length - 1]] : []);
  };

  // ── Load Fuel Types ── (unchanged)
  const loadFuelTypes = async () => {
    if (fuelLoading) return;
    setFuelLoading(true);

    try {
      if (selectedModels.length > 0) {
        const modelId = selectedModels[0];

        const res = await getFuelTypeByModelId(modelId);

        if (res.success && Array.isArray(res.data)) {
          const realFuelTypes = res.data.map((fuel) => {
            const standardized =
              fuel.charAt(0).toUpperCase() + fuel.slice(1).toLowerCase();
            return {
              value: standardized,
              label: standardized,
            };
          });
          setFuelTypes(realFuelTypes);
        } else {
          setFuelTypes([
            { value: "Petrol", label: "Petrol" },
            { value: "Diesel", label: "Diesel" },
            { value: "Electric", label: "Electric" },
            { value: "Hybrid", label: "Hybrid" },
            { value: "LPG", label: "LPG" },
            { value: "CNG", label: "CNG" },
          ]);
        }
      } else {
        setFuelTypes([
          { value: "Petrol", label: "Petrol" },
          { value: "Diesel", label: "Diesel" },
          { value: "Electric", label: "Electric" },
          { value: "Hybrid", label: "Hybrid" },
          { value: "LPG", label: "LPG" },
          { value: "CNG", label: "CNG" },
        ]);
      }
    } catch (err) {
      console.error("Fuel types error:", err);
      setFuelTypes([
        { value: "Petrol", label: "Petrol" },
        { value: "Diesel", label: "Diesel" },
        { value: "Electric", label: "Electric" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "LPG", label: "LPG" },
        { value: "CNG", label: "CNG" },
      ]);
    } finally {
      setFuelLoading(false);
    }
  };

  useEffect(() => {
    loadFuelTypes();
  }, [selectedModels]);

  const handleFuelChange = (values) => {
    setSelectedFuelTypes(values);
  };

  // ── Load Transmission Types ── (unchanged)
  const loadTransmissionTypes = async () => {
    if (transmissionLoading) return;
    setTransmissionLoading(true);

    try {
      if (selectedModels.length > 0) {
        const modelId = selectedModels[0];

        const res = await getTransmissionTypeByModelId(modelId);

        if (res.success && Array.isArray(res.data)) {
          const realTransmissions = res.data.map((type) => {
            let label = type;
            let value = type.toLowerCase();

            if (type === "AT") {
              label = "Automatic";
              value = "automatic";
            } else if (type === "MT") {
              label = "Manual";
              value = "manual";
            }

            return { value, label };
          });

          setTransmissionTypes(realTransmissions);
        } else {
          setTransmissionTypes([
            { value: "automatic", label: "Automatic" },
            { value: "manual", label: "Manual" },
          ]);
        }
      } else {
        setTransmissionTypes([
          { value: "automatic", label: "Automatic" },
          { value: "manual", label: "Manual" },
        ]);
      }
    } catch (err) {
      console.error("Transmission types error:", err);
      setTransmissionTypes([
        { value: "automatic", label: "Automatic" },
        { value: "manual", label: "Manual" },
      ]);
    } finally {
      setTransmissionLoading(false);
    }
  };

  useEffect(() => {
    loadTransmissionTypes();
  }, [selectedModels]);

  // ── Load Variants with search ──
  const loadVariants = async (page = 1, searchTerm = variantSearch) => {
    if (variantLoading) return;
    setVariantLoading(true);

    try {
      if (selectedModels.length === 0 || selectedFuelTypes.length === 0) {
        setVariants([]);
        setVariantHasMore(false);
        setVariantPage(1);
        setVariantLoading(false);
        return;
      }

      // Standardize fuel type (first letter capital)
      let fuelTypeToSend = selectedFuelTypes[0];
      fuelTypeToSend =
        fuelTypeToSend.charAt(0).toUpperCase() +
        fuelTypeToSend.slice(1).toLowerCase();

      const payload = {
        searchTerm: searchTerm.trim() || undefined,
        page,
        limit: 10,
        modelId: selectedModels[0],
        fuelType: fuelTypeToSend,
      };

      const res = await getAndSearchVariant(payload);

      if (!res.success) {
        setVariants([]);
        setVariantHasMore(false);
        return;
      }

      const newVariants = res.data.map((item) => ({
        value: item.variantId.toString(),
        label: item.variantDisplayName || item.variantName,
      }));

      setVariants((prev) =>
        page === 1 ? newVariants : [...prev, ...newVariants],
      );
      const meta = res.meta || res.pagination;
      setVariantHasMore(meta ? page < meta.totalPages : false);
      setVariantPage(page);
    } catch (err) {
      console.error("Variants error:", err);
      setVariants([]);
      setVariantHasMore(false);
    } finally {
      setVariantLoading(false);
    }
  };

  useEffect(() => {
    if (variantSearchTimeoutRef.current)
      clearTimeout(variantSearchTimeoutRef.current);

    variantSearchTimeoutRef.current = setTimeout(() => {
      setVariants([]);
      setVariantPage(1);
      setVariantHasMore(true);
      loadVariants(1, variantSearch);
    }, 400);

    return () => clearTimeout(variantSearchTimeoutRef.current);
  }, [variantSearch, selectedModels, selectedFuelTypes]);

  useEffect(() => {
    setVariants([]);
    setVariantPage(1);
    setVariantHasMore(true);
    loadVariants(1, variantSearch);
  }, [selectedModels, selectedFuelTypes]);

  const handleLoadMoreVariants = () => {
    if (variantLoading || !variantHasMore) return;
    loadVariants(variantPage + 1, variantSearch);
  };

  const toggleMobileChip = (chip) => {
    setSelectedMobileChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip],
    );
  };

  const getTrackBackground = () => {
    const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;

    return `linear-gradient(
    to right,
    #e5e7eb 0%,
    #e5e7eb ${minPercent}%,
    var(--color-fourth) ${minPercent}%,
    var(--color-fourth) ${maxPercent}%,
    #e5e7eb ${maxPercent}%,
    #e5e7eb 100%
  )`;
  };

  const getKmTrackBackground = () => {
    const percent = (kmDistance / MAX_KM) * 100;

    return `linear-gradient(
    to right,
    var(--color-fourth) 0%,
    var(--color-fourth) ${percent}%,
    #e5e7eb ${percent}%,
    #e5e7eb 100%
  )`;
  };

  const vehicleTypes = [
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "hatchback", label: "Hatchback" },
    { value: "muv", label: "MUV" },
    { value: "truck", label: "Truck" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
  ];

  const ratings = [
    { value: "4.5", label: "⭐ 4.5+ Rating" },
    { value: "4.0", label: "⭐ 4.0+ Rating" },
  ];

  const mobileFilterMap = {
    "Suggested Filters": [
      "⭐ 4 & Up",
      "Under ₹5L",
      "₹5L - ₹10L",
      "SUV",
      "Diesel",
    ],
    Brand: brands.map((b) => b.label),
    Model: models.map((m) => m.label),
    "Fuel Type": fuelTypes.map((f) => f.label),
    Transmission: transmissionTypes.map((t) => t.label),
    Variant: variants.map((v) => v.label),
    "Vehicle Type": vehicleTypes.map((v) => v.label),
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20; // change later from API

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row text-secondary mt-[60px]">
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
          <h2 className="text-xl font-bold text-primary mb-4">
            Filter Your Result
          </h2>

          <div className="flex flex-col gap-2">
            <InputField placeholder="Enter your location" variant="colored" />

            <div className="hidden lg:flex items-center justify-between px-4 py-3 rounded-xl border border-white/20 backdrop-blur-md bg-transparent">
              <span className="text-primary font-semibold text-sm">
                AVX Inspected
              </span>

              <button
                onClick={() => setAvxAssumed(!avxAssumed)}
                className={`relative w-12 h-6 rounded-full transition cursor-pointer ${avxAssumed ? "bg-primary/90" : "bg-white/20"}`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-secondary transition-transform ${avxAssumed ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>

            <FilterSection title="Brand">
              <ChipGroup
                title=""
                items={brands}
                showMore={false}
                searchable={true}
                serverPagination={true}
                hasMore={brandHasMore}
                onLoadMore={handleLoadMoreBrands}
                onChange={handleBrandChange}
                searchValue={brandSearch}
                onSearchChange={(val) => {
                  console.log("Brand search input:", val);
                  setBrandSearch(val);
                }}
                isLoading={brandLoading}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection title="Model">
              <ChipGroup
                title=""
                items={models}
                showMore={false}
                searchable={true}
                serverPagination={true}
                hasMore={modelHasMore}
                onLoadMore={handleLoadMoreModels}
                onChange={handleModelChange}
                searchValue={modelSearch}
                onSearchChange={setModelSearch}
                isLoading={modelLoading}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection title="Fuel Type">
              <ChipGroup
                title=""
                items={fuelTypes}
                onChange={handleFuelChange}
                isLoading={fuelLoading}
              />
            </FilterSection>

            <FilterSection title="Transmission">
              <ChipGroup
                title=""
                items={transmissionTypes}
                isLoading={transmissionLoading}
              />
            </FilterSection>

            <FilterSection title="Variant">
              <ChipGroup
                title=""
                items={variants}
                showMore={false}
                searchable={true}
                serverPagination={true}
                hasMore={variantHasMore}
                onLoadMore={handleLoadMoreVariants}
                searchValue={variantSearch}
                onSearchChange={setVariantSearch}
                isLoading={variantLoading}
                customEmptyMessage={
                  selectedModels.length === 0 || selectedFuelTypes.length === 0
                    ? "Please first select Model and Fuel Type"
                    : undefined
                }
              />
            </FilterSection>

            <FilterSection title="Budget" defaultOpen={true}>
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between text-xs text-primary/70 mb-1">
                  <span>Min Price</span>
                  <span>Max Price</span>
                </div>

                <div className="relative h-6 flex items-center">
                  <div
                    className="absolute w-full h-1.5 rounded-full transition-all duration-300 ease-out"
                    style={{ background: getTrackBackground() }}
                  />

                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={50000}
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(Math.min(+e.target.value, maxPrice - 50000))
                    }
                    className="dual-range z-30"
                  />

                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={50000}
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Math.max(+e.target.value, minPrice + 50000))
                    }
                    className="dual-range z-40"
                  />
                </div>

                <div className="flex justify-between text-xs text-primary/70 mb-1">
                  <span>₹{minPrice}</span>
                  <span>₹{maxPrice}</span>
                </div>
              </div>
            </FilterSection>

            <FilterSection title=" KM Driven" defaultOpen={true}>
              <div className="flex flex-col gap-2 mt-3">
                <div className="relative h-6 flex items-center">
                  <div
                    className="absolute w-full h-1.5 rounded-full transition-all duration-300 ease-out"
                    style={{ background: getKmTrackBackground() }}
                  />

                  <input
                    type="range"
                    min={0}
                    max={MAX_KM}
                    step={5000}
                    value={kmDistance}
                    onChange={(e) => setKmDistance(Number(e.target.value))}
                    className="dual-range z-30"
                  />
                </div>

                <div className="flex justify-between text-xs text-primary/70 mb-1">
                  <span>
                    <strong className="text-primary/60">
                      {kmDistance.toLocaleString()} km
                    </strong>
                  </span>
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Vehicle Type">
              <ChipGroup title="" items={vehicleTypes} />
            </FilterSection>

            <FilterSection title="Rating">
              <ChipGroup title="" items={ratings} />
            </FilterSection>

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
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 auto-rows-max sm:px-5 md:px-0 lg:px-6 py-4 sm:py-5 lg:py-0">
          <div className="col-span-full mb-10">
            <PromoCardRow />
          </div>

          {/* MOBILE FILTER BAR */}
          <div className="col-span-full lg:hidden">
            <div className="flex lg:hidden items-center gap-3 overflow-x-auto scrollbar-hide">
              <Button
                variant="ghost"
                showIcon={false}
                className="gap-2 shrink-0"
                onClick={() => setMobileFilterOpen(true)}
              >
                <FilterIcon className="h-4 w-4" />
                Filter
              </Button>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-third/40 shrink-0">
                <span className="text-sm text-primary font-semibold">
                  AVX Assumed
                </span>
                <button
                  onClick={() => setAvxAssumed(!avxAssumed)}
                  className={`relative w-9 h-5 rounded-full ${avxAssumed ? "bg-primary" : "bg-white/20"}`}
                >
                  <span
                    className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${avxAssumed ? "translate-x-4" : ""}`}
                  />
                </button>
              </div>

              {["Under ₹5L", "SUV", "Diesel", "⭐ 4+"].map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  selected={selectedMobileChips.includes(chip)}
                  variant="outline"
                  onClick={() => toggleMobileChip(chip)}
                />
              ))}
            </div>
          </div>

          <div className="col-span-full mb-10">
            <SponsoredCars />
          </div>

          <div className="col-span-full mb-10">
            <PriceBased />
          </div>

          <div className="col-span-full">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Top Vehicle Near You
            </h2>
          </div>

          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} data={vehicle} />
          ))}

          <div className="col-span-full">
            <div className="mt-4">
              <div className="flex items-center justify-center gap-4 w-full">
                <div>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="grid place-content-center cursor-pointer text-white hover:text-black rounded-full w-8 h-8 sm:w-10 sm:h-10 border-[1.5px] border-white transition-colors hover:bg-primary hover:border-primary disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500 disabled:hover:bg-transparent"
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>

                <ul className="flex items-center">
                  {currentPage > 3 && (
                    <li
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full mx-1 text-white text-sm sm:text-lg font-medium cursor-pointer hover:bg-primary hover:text-black"
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </li>
                  )}

                  {currentPage > 4 && <li className="mx-1 text-white">…</li>}

                  {[
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                  ]
                    .filter((page) => page > 0 && page <= totalPages)
                    .map((page) => (
                      <li
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full mx-1 text-sm sm:text-lg font-medium cursor-pointer transition-all ${
                          currentPage === page
                            ? "bg-primary text-black"
                            : "text-white hover:bg-primary hover:text-black"
                        }`}
                      >
                        {page}
                      </li>
                    ))}
                </ul>

                <div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="grid place-content-center cursor-pointer text-white hover:text-black rounded-full w-8 h-8 sm:w-10 sm:h-10 border-[1.5px] border-white hover:border-primary transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500 disabled:hover:bg-transparent"
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      {/* MOBILE FILTER DRAWER — unchanged */}
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
            <div className="w-[40%] border-r border-third/40 overflow-y-auto">
              {Object.keys(mobileFilterMap).map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveFilterTab(item)}
                  className={`px-4 py-3 cursor-pointer text-sm ${
                    activeFilterTab === item
                      ? "bg-secondary/10 font-semibold"
                      : "hover:bg-secondary/5"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="text-sm font-semibold mb-3">{activeFilterTab}</h3>

              <div className="flex flex-wrap gap-3">
                {(mobileFilterMap[activeFilterTab] || []).map((chip) => (
                  <Chip
                    key={chip}
                    label={chip}
                    selected={selectedMobileChips.includes(chip)}
                    variant={isMobile ? "outlineDark" : "outline"}
                    onClick={() => toggleMobileChip(chip)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-third/40 bg-primary">
            <Button
              variant="default"
              showIcon={false}
              className="w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Show results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
