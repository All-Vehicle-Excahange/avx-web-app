/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import PromoCardRow from "./PromoCardRow";
import Chip from "@/components/ui/chip";
import Pagination from "@/components/ui/Pagination";
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronUpIcon,
  FilterIcon,
  MapPin,
} from "lucide-react";
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
  getYearByModelId,
} from "@/services/filter";
import { getState, getCities } from "@/services/user.service";
import { getUserCityAndStateByLatLong } from "@/services/consult.filter.service";

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

export default function SearchWithCard({ onPageResponseChange, onFilterChange }) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Suggested Filters");
  const [selectedMobileChips, setSelectedMobileChips] = useState([]);
  const [avxAssumed, setAvxAssumed] = useState(false);
  const [minPrice, setMinPrice] = useState(50000);
  const [maxPrice, setMaxPrice] = useState(2000000);
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

  // ── State & City states ──
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedYear, setSelectedYear] = useState([]);
  const [years, setYears] = useState([]);
  const [yearLoading, setYearLoading] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedSellerType, setSelectedSellerType] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const stateRef = useRef(null);
  const cityRef = useRef(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [highlightedStateIndex, setHighlightedStateIndex] = useState(-1);
  const [highlightedCityIndex, setHighlightedCityIndex] = useState(-1);

  // ── Add these ──
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    [],
  );
  const [selectedVariants, setSelectedVariants] = useState([]);

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
  const autoFetchTimerRef = useRef(null);
  const hasMountedForAutoFetch = useRef(false);

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
  const modelIdParam = searchParams.get("modelId");
  const budget = searchParams.get("budget");
  const sort = searchParams.get("sort");

  let mPrice = 0;
  let mxPrice = 0;
  let budgetMid = 0;
  if (budget) {
    const [min, max] = budget.replace(/\s/g, "").split("-");

    mPrice = parseFloat(min) * 100000;
    mxPrice = parseFloat(max) * 100000;

    budgetMid = (mPrice + mxPrice) / 2;
  }

  /* ================= BUILD PAYLOAD ================= */
  const buildPayload = () => {
    const payload = {};

    if (selectedCityId) payload.cityId = selectedCityId;
    if (selectedStateId) payload.stateId = selectedStateId;

    if (selectedBodyType.length > 0) payload.vehicleSubTypes = selectedBodyType;

    if (selectedBrands.length > 0)
      payload.makerIds = selectedBrands.map(Number);

    if (selectedModels.length > 0)
      payload.modelIds = selectedModels.map(Number);

    if (selectedVariants.length > 0)
      payload.variantIds = selectedVariants.map(Number);

    if (selectedFuelTypes.length > 0)
      payload.fuelTypes = selectedFuelTypes.map((f) => f.toUpperCase());

    if (selectedTransmissionTypes.length > 0)
      payload.transmissionTypes = selectedTransmissionTypes.map((t) =>
        t.toUpperCase(),
      );

    if (minPrice > MIN) payload.minPrice = minPrice;
    if (maxPrice < MAX) payload.maxPrice = maxPrice;

    if (selectedYear.length > 0) payload.mfgYear = Number(selectedYear[0]);

    if (kmDistance > 0) {
      payload.minKmDriven = 0;
      payload.maxKmDriven = kmDistance;
    }

    if (selectedSellerType.length > 0)
      payload.sellerType = selectedSellerType[0].toUpperCase();

    if (selectedRating.length > 0)
      payload.minInspectionRating = parseFloat(selectedRating[0]);

    if (avxAssumed) payload.avxInspected = true;

    return payload;
  };

  /* ================= FETCH VEHICLES ================= */
  const fetchVehicles = async (page = currentPage, payload = null) => {
    try {
      const body = payload ?? buildPayload();
      const params = {
        pageNo: page,
        size: 9,
        sortBy: sort || "listingDate",
        direction: sort === "price_low_high" ? "asc" : "desc",
      };
      const response = await getFilteredVehicles(body, params);
      setVehicles(response.data || []);

      // Update page response for header display
      if (response.pagination) {
        if (onPageResponseChange) onPageResponseChange(response.pagination);
        setTotalPages(response.pagination.totalPages || 0);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setVehicles([]);
    }
  };

  /* ================= INITIAL FETCH FROM URL PARAMS ================= */
  useEffect(() => {
    const initialPayload = {};

    // Location from URL
    const qCityId = searchParams.get("cityId");
    const qStateId = searchParams.get("stateId");
    if (qCityId) initialPayload.cityId = Number(qCityId);
    if (qStateId) initialPayload.stateId = Number(qStateId);

    // Body type from URL
    if (bodyType) {
      initialPayload.vehicleSubTypes = [bodyType];
      setSelectedBodyType([bodyType]);
    }

    // Brand / maker from URL
    if (makerId) {
      initialPayload.makerIds = [Number(makerId)];
      setSelectedBrands([makerId]);
    }

    // Model from URL (e.g. from VDP navigation)
    if (modelIdParam) {
      initialPayload.modelIds = [Number(modelIdParam)];
      setSelectedModels([modelIdParam]);
    }

    // Fuel type from URL
    if (fuelType) {
      initialPayload.fuelTypes = [fuelType.toUpperCase()];
      setSelectedFuelTypes([fuelType]);
    }

    // Budget from URL
    if (budget) {
      if (mPrice > 0) initialPayload.minPrice = mPrice;
      if (mxPrice > 0) initialPayload.maxPrice = mxPrice;
    }

    fetchVehicles(1, initialPayload);
  }, []);

  /* ================= RE-FETCH ON SORT CHANGE ================= */
  const prevSortRef = useRef(sort);
  useEffect(() => {
    if (prevSortRef.current === sort) return;
    prevSortRef.current = sort;
    setCurrentPage(1);
    fetchVehicles(1);
  }, [sort]);

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

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getState();
        if (res?.data) {
          setStates(
            res.data.map((s) => ({
              label: s.name,
              value: s.id,
            })),
          );
        }
      } catch (err) {
        console.error("Failed to load states:", err);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedStateId) {
        setCities([]);
        return;
      }

      try {
        const res = await getCities(selectedStateId);
        if (res?.data) {
          setCities(
            res.data.map((c) => ({
              label: c.name,
              value: c.id,
            })),
          );
        }
      } catch (err) {
        console.error("Failed to load cities:", err);
        setCities([]);
      }
    };

    fetchCities();
  }, [selectedStateId]);

  useEffect(() => {
    // Priority 1: Read location from URL query params (from homepage filter bar or VDP)
    const qCityId = searchParams.get("cityId");
    const qStateId = searchParams.get("stateId");
    const qLocation = searchParams.get("location");
    const qStateName = searchParams.get("stateName");
    const qCityName = searchParams.get("cityName");

    if (qStateId) {
      setSelectedStateId(Number(qStateId));
      if (qCityId) setSelectedCityId(Number(qCityId));

      // Parse "cityName, stateName" from location param (homepage filter bar)
      if (qLocation) {
        const parts = qLocation.split(",").map((s) => s.trim());
        setSelectedCityName(parts[0] || "");
        setSelectedStateName(parts[1] || "");
      } else {
        // Fallback: read individual name params (from VDP navigation)
        if (qStateName) setSelectedStateName(qStateName);
        if (qCityName) setSelectedCityName(qCityName);
      }
      return; // skip localStorage fallback
    }

    // Priority 2: Fallback to localStorage
    try {
      const saved = localStorage.getItem("avx_saved_location");
      if (saved) {
        const { stateId, stateName, cityId, cityName } = JSON.parse(saved);
        if (stateId && stateName) {
          setSelectedStateId(stateId);
          setSelectedStateName(stateName);
          setSelectedCityId(cityId || null);
          setSelectedCityName(cityName || "");
        }
      }
    } catch (e) {
      console.warn("Failed to read saved location:", e);
    }
  }, []);

  // Detect location via geolocation — only when user clicks the icon
  const handleDetectLocation = async () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0,
        });
      });

      const { latitude: lat, longitude: lon } = position.coords;

      setLatitude(lat);
      setLongitude(lon);

      const res = await getUserCityAndStateByLatLong({
        latitude: lat,
        longitude: lon,
      });

      if (res?.status === "OK" && res?.data) {
        const { stateId, stateName, cityId, cityName } = res.data;

        setSelectedStateId(stateId);
        setSelectedStateName(stateName);
        setSelectedCityId(cityId);
        setSelectedCityName(cityName);
      }
    } catch (err) {
      console.error("Geolocation error:", err);
    }
  };

  const handleLoadMoreBrands = () => {
    if (brandLoading || !brandHasMore) return;
    loadBrands(brandPage + 1, brandSearch);
  };

  const handleBrandChange = (values) => {
    setSelectedBrands(values);
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
    setSelectedModels(values);
    // Reset year when model changes
    setSelectedYear([]);
    setYears([]);
  };

  // ── Load Years by Model ──
  const loadYears = async () => {
    if (yearLoading) return;

    if (selectedModels.length === 0) {
      setYears([]);
      return;
    }

    setYearLoading(true);
    try {
      const modelId = selectedModels[0];
      const res = await getYearByModelId(modelId);

      if (res.success && Array.isArray(res.data)) {
        const yearItems = res.data.map((y) => ({
          value: y.toString(),
          label: y.toString(),
        }));
        setYears(yearItems);
      } else {
        setYears([]);
      }
    } catch (err) {
      console.error("Years error:", err);
      setYears([]);
    } finally {
      setYearLoading(false);
    }
  };

  useEffect(() => {
    loadYears();
  }, [selectedModels]);

  const handleYearChange = (values) => {
    setSelectedYear(values);
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
        year: selectedYear.length > 0 ? selectedYear[0] : undefined,
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
  }, [variantSearch, selectedModels, selectedFuelTypes, selectedYear]);

  useEffect(() => {
    setVariants([]);
    setVariantPage(1);
    setVariantHasMore(true);
    loadVariants(1, variantSearch);
  }, [selectedModels, selectedFuelTypes, selectedYear]);

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

  const sellerType = [
    { value: "CONSULTANT", label: "Consultant" },
    { value: "USER_SELLER", label: "Individual" },
  ];

  // year data is now fetched dynamically via getYearByModelId

  const handleTransmissionChange = (values) => {
    setSelectedTransmissionTypes(values);
  };

  const handleVariantChange = (values) => {
    setSelectedVariants(values);
  };

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
  const [totalPages, setTotalPages] = useState(0);

  // ── Real-time filter tag emission ──
  useEffect(() => {
    const tags = [];
    const brandLabels = brands.filter(b => selectedBrands.includes(b.value)).map(b => b.label);
    const modelLabels = models.filter(m => selectedModels.includes(m.value)).map(m => m.label);
    const variantLabels = variants.filter(v => selectedVariants.includes(v.value)).map(v => v.label);
    if (brandLabels.length > 0) tags.push(...brandLabels);
    if (modelLabels.length > 0) tags.push(...modelLabels);
    if (variantLabels.length > 0) tags.push(...variantLabels);
    if (selectedFuelTypes.length > 0) tags.push(...selectedFuelTypes);
    if (selectedTransmissionTypes.length > 0) tags.push(...selectedTransmissionTypes);
    if (selectedBodyType.length > 0) tags.push(...selectedBodyType.map(b => b.charAt(0).toUpperCase() + b.slice(1).toLowerCase()));
    if (selectedYear.length > 0) tags.push(...selectedYear);
    // Show both city and state
    const locationParts = [];
    if (selectedCityName) locationParts.push(selectedCityName);
    if (selectedStateName) locationParts.push(selectedStateName);
    if (locationParts.length > 0) tags.push(locationParts.join(', '));
    if (minPrice > MIN || maxPrice < MAX) tags.push(`₹${(minPrice / 100000).toFixed(1)}L–₹${(maxPrice / 100000).toFixed(1)}L`);
    if (kmDistance > 0) tags.push(`≤${kmDistance.toLocaleString()} km`);
    if (selectedRating.length > 0) tags.push(`${selectedRating[0]}+ ⭐`);
    if (selectedSellerType.length > 0) tags.push(selectedSellerType[0] === 'CONSULTANT' ? 'Consultant' : 'Individual');
    onFilterChange?.(tags);
  }, [
    selectedBrands, selectedModels, selectedVariants, selectedFuelTypes, selectedTransmissionTypes,
    selectedBodyType, selectedYear, selectedCityName, selectedStateName,
    minPrice, maxPrice, kmDistance, selectedRating, selectedSellerType,
    brands, models, variants
  ]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchVehicles(page);
    console.log("7")

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Auto-fetch when any filter changes ──
  useEffect(() => {
    // Skip the very first render (initial fetch already handles it)
    if (!hasMountedForAutoFetch.current) {
      hasMountedForAutoFetch.current = true;
      return;
    }
    if (autoFetchTimerRef.current) clearTimeout(autoFetchTimerRef.current);
    autoFetchTimerRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchVehicles(1);
    }, 300);
    return () => { if (autoFetchTimerRef.current) clearTimeout(autoFetchTimerRef.current); };
  }, [
    selectedBrands, selectedModels, selectedVariants, selectedFuelTypes,
    selectedTransmissionTypes, selectedBodyType, selectedYear,
    selectedCityId, selectedStateId,
    minPrice, maxPrice, kmDistance,
    selectedRating, selectedSellerType, avxAssumed,
  ]);


  // Save/overwrite selected location to localStorage on Apply
  const handleApplyFilter = async () => {
    if (selectedStateId && selectedStateName) {
      const locationData = {
        stateId: selectedStateId,
        stateName: selectedStateName,
        cityId: selectedCityId,
        cityName: selectedCityName,
      };
      localStorage.setItem("avx_saved_location", JSON.stringify(locationData));
    }

    setCurrentPage(1);
    await fetchVehicles(1);
  };

  const handleClearFilters = async () => {
    // Remove saved location from localStorage
    localStorage.removeItem("avx_saved_location");
    // Reset brand & model
    setSelectedBrands([]);
    setSelectedModels([]);
    setBrandSearch("");
    setModelSearch("");
    setBrands([]);
    setModels([]);
    setBrandPage(1);
    setModelPage(1);
    setBrandHasMore(true);
    setModelHasMore(true);

    // Reset state & city
    setSelectedStateId(null);
    setSelectedStateName("");
    setSelectedCityId(null);
    setSelectedCityName("");

    setStateSearch("");
    setCitySearch("");

    setStateOpen(false);
    setCityOpen(false);

    setHighlightedStateIndex(-1);
    setHighlightedCityIndex(-1);

    setCities([]);

    // Reset fuel & transmission
    setSelectedFuelTypes([]);
    setSelectedTransmissionTypes([]);
    setTransmissionTypes([
      { value: "automatic", label: "Automatic" },
      { value: "manual", label: "Manual" },
    ]);

    // Reset body type, rating, seller type
    setSelectedBodyType([]);
    setSelectedRating([]);
    setSelectedSellerType([]);
    setAvxAssumed(false);

    // Reset year
    setSelectedYear([]);
    setYears([]);

    // Reset variants
    setVariants([]);
    setVariantSearch("");
    setVariantPage(1);
    setVariantHasMore(false);

    // Reset price & km
    setMinPrice(50000);
    setMaxPrice(2000000);
    setKmDistance(0);

    // Reset mobile chips
    setSelectedMobileChips([]);

    // Reset pagination
    setCurrentPage(1);

    // Reload vehicles with empty payload and scroll to top
    await fetchVehicles(1, {});
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reload brands
    loadBrands(1, "");
  };

  const filteredStates = states.filter((s) =>
    s.label.toLowerCase().includes(stateSearch.toLowerCase()),
  );

  const filteredCities = cities.filter((c) =>
    c.label.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const handleStateKeyDown = (e) => {
    if (!filteredStates.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedStateIndex((prev) =>
        prev < filteredStates.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedStateIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (highlightedStateIndex >= 0) {
        const selected = filteredStates[highlightedStateIndex];

        setSelectedStateId(selected.value);
        setSelectedStateName(selected.label);
        setSelectedCityId(null);
        setSelectedCityName("");

        setStateSearch("");
        setStateOpen(false);
        setHighlightedStateIndex(-1);
      }
    }
  };

  const handleCityKeyDown = (e) => {
    if (!filteredCities.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedCityIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedCityIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (highlightedCityIndex >= 0) {
        const selected = filteredCities[highlightedCityIndex];

        setSelectedCityId(selected.value);
        setSelectedCityName(selected.label);

        setCitySearch("");
        setCityOpen(false);
        setHighlightedCityIndex(-1);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row relative text-secondary mt-[20px]">
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
            {/* ================= STATE & CITY SELECTOR ================= */}
            <div className="space-y-4">
              {/* ---------- STATE DROPDOWN ---------- */}
              <div ref={stateRef} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-third">State</label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary cursor-pointer transition-colors"
                    title="Use my current location"
                  >
                    <MapPin size={14} />
                    <span>Detect</span>
                  </button>
                </div>

                {stateOpen ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={stateSearch}
                      onKeyDown={handleStateKeyDown}
                      onChange={(e) => {
                        setStateSearch(e.target.value);
                        setHighlightedStateIndex(0);
                      }}
                      placeholder={
                        selectedStateName || "Search or select state..."
                      }
                      className="w-full pl-3 pr-10 py-2.5 bg-transparent border border-primary/60 rounded-md text-primary placeholder:text-primary/60 focus:outline-none focus:border-primary text-sm"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setStateOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/70"
                    >
                      <ChevronUpIcon />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setStateOpen(true)}
                    className="h-10 px-3 flex items-center justify-between rounded-md border border-primary/60 bg-transparent text-primary cursor-pointer backdrop-blur-sm"
                  >
                    <span className="truncate">
                      {selectedStateName || "Select State"}
                    </span>
                    <span>
                      <ChevronDownIcon />
                    </span>
                  </div>
                )}

                {stateOpen && (
                  <div className="absolute z-50 mt-1 w-full border border-primary/60 rounded-md bg-black/40 backdrop-blur-md text-primary shadow-xl max-h-64 overflow-hidden">
                    <div className="max-h-52 overflow-y-auto pt-1">
                      {filteredStates.map((s, index) => (
                        <div
                          key={s.value}
                          onClick={() => {
                            setSelectedStateId(s.value);
                            setSelectedStateName(s.label);
                            setSelectedCityId(null);
                            setSelectedCityName("");
                            setStateSearch("");
                            setStateOpen(false);
                          }}
                          className={`px-4 py-2.5 cursor-pointer text-sm ${highlightedStateIndex === index
                            ? "bg-primary/30"
                            : "hover:bg-primary/20"
                            }`}
                        >
                          {s.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ---------- CITY DROPDOWN ---------- */}
              <div ref={cityRef} className="relative">
                <label className="text-xs text-third block mb-1">City</label>

                {cityOpen && selectedStateId ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={citySearch}
                      onKeyDown={handleCityKeyDown}
                      onChange={(e) => {
                        setCitySearch(e.target.value);
                        setHighlightedCityIndex(0);
                      }}
                      placeholder={
                        selectedCityName || "Search or select city..."
                      }
                      className="w-full pl-3 pr-10 py-2.5 bg-transparent border border-primary/60 rounded-md text-primary placeholder:text-primary/60 focus:outline-none focus:border-primary text-sm"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setCityOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/70"
                    >
                      <ChevronUpIcon />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => selectedStateId && setCityOpen(true)}
                    className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary/60 bg-transparent text-primary ${!selectedStateId
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                      } backdrop-blur-sm`}
                  >
                    <span className="truncate">
                      {selectedCityName ||
                        (selectedStateId
                          ? "Select City"
                          : "Select state first")}
                    </span>
                    <span>
                      <ChevronDownIcon />
                    </span>
                  </div>
                )}

                {cityOpen && selectedStateId && (
                  <div className="absolute z-50 mt-1 w-full border border-primary/60 rounded-md bg-black/40 backdrop-blur-md text-primary shadow-xl max-h-64 overflow-hidden">
                    <div className="max-h-52 overflow-y-auto pt-1">
                      {filteredCities.map((c, index) => (
                        <div
                          key={c.value}
                          onClick={() => {
                            setSelectedCityId(c.value);
                            setSelectedCityName(c.label);
                            setCitySearch("");
                            setCityOpen(false);
                          }}
                          className={`px-4 py-2.5 cursor-pointer text-sm ${highlightedCityIndex === index
                            ? "bg-primary/30"
                            : "hover:bg-primary/20"
                            }`}
                        >
                          {c.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

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


            <FilterSection title="Brand">
              <ChipGroup
                title=""
                items={brands}
                selected={selectedBrands}
                showMore={false}
                searchable={true}
                serverPagination={true}
                hasMore={brandHasMore}
                onLoadMore={handleLoadMoreBrands}
                onChange={handleBrandChange}
                searchValue={brandSearch}
                onSearchChange={(val) => {
                  setBrandSearch(val);
                }}
                isLoading={brandLoading}
                allowMultiple={true}
              />
            </FilterSection>

            <FilterSection title="Model">
              <ChipGroup
                title=""
                items={models}
                selected={selectedModels}
                showMore={false}
                searchable={true}
                serverPagination={true}
                hasMore={modelHasMore}
                onLoadMore={handleLoadMoreModels}
                onChange={handleModelChange}
                searchValue={modelSearch}
                onSearchChange={setModelSearch}
                isLoading={modelLoading}
                allowMultiple={true}
              />
            </FilterSection>

            <FilterSection title="Fuel Type">
              <ChipGroup
                title=""
                selected={selectedFuelTypes}
                items={fuelTypes}
                onChange={handleFuelChange}
                isLoading={fuelLoading}
              />
            </FilterSection>

            <FilterSection title="Transmission">
              <ChipGroup
                title=""
                items={transmissionTypes}
                selected={selectedTransmissionTypes}
                onChange={handleTransmissionChange}
                isLoading={transmissionLoading}
              />
            </FilterSection>

            <FilterSection title="Year">
              <ChipGroup
                title=""
                items={years}
                selected={selectedYear}
                onChange={handleYearChange}
                allowMultiple={true}
                isLoading={yearLoading}
                customEmptyMessage={
                  selectedModels.length === 0
                    ? "Please first select a Model"
                    : undefined
                }
              />
            </FilterSection>

            <FilterSection title="Variant">
              <ChipGroup
                title=""
                items={variants}
                selected={selectedVariants}
                onChange={handleVariantChange}
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



            <FilterSection title="Body Type">
              <ChipGroup
                title=""
                items={vehicleTypes}
                selected={selectedBodyType}
                onChange={setSelectedBodyType}
              />
            </FilterSection>

            <FilterSection title="Inspection Rating">
              <ChipGroup
                title=""
                items={ratings}
                selected={selectedRating}
                onChange={setSelectedRating}
                allowMultiple={true}
              />
            </FilterSection>

            <FilterSection title="Seller Type">
              <ChipGroup
                title=""
                items={sellerType}
                selected={selectedSellerType}
                onChange={setSelectedSellerType}
                allowMultiple={true}
              />
            </FilterSection>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                className="text-primary px-5 py-2"
                showIcon={false}
                onClick={handleApplyFilter}
              >
                Apply Filter
              </Button>

              <button
                className="flex items-center gap-2 px-2 py-2 underline
    text-sm font-semibold
    text-primary/60 hover:text-primary
    transition-all duration-200
    cursor-pointer"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
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
            <div className="flex items-start gap-4">
              <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400" />

              <div>
                <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
                  Top Vehicle Near You
                </h2>
                <p className="text-third mt-1">
                  Lorem ipsum dolor sit amet consectetur dolor sit amet
                  consectetur..
                </p>
              </div>
            </div>
          </div>

          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} data={vehicle} />
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed top-[64px] inset-x-0 bottom-0 z-[100] bg-primary text-secondary flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-third/40 shrink-0">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            showIcon={false}
            onClick={() => setMobileFilterOpen(false)}
            className="text-secondary text-xl font-bold p-2"
          >
            ✕
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[40%] border-r border-third/40 overflow-y-auto">
            {Object.keys(mobileFilterMap).map((item) => (
              <div
                key={item}
                onClick={() => setActiveFilterTab(item)}
                className={`px-4 py-3 cursor-pointer text-sm ${activeFilterTab === item
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

        <div className="w-full p-4 border-t border-third/40 bg-primary shrink-0">
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
    </div>
  );
}
