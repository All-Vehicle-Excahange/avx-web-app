"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import PromoCardRow from "./PromoCardRow";
import Chip from "@/components/ui/chip";
import Pagination from "@/components/ui/Pagination";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { FilterIcon, MapPin, X } from "lucide-react";
import SponsoredCars from "./SponsoredCars";
import FilterSection from "./FilterSection";
import PriceBased from "./PriceBased";
import CustomSelect from "@/components/ui/custom-select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getFilteredVehiclesQuery,
  getFilterConsualtQuery,
} from "@/queries/user.queries";
import {
  getAndSearchMakers,
  getAndSearchModel,
  getFilteredVehicles,
  getFuelTypeByModelId,
  getTransmissionTypeByModelId,
  getAndSearchVariant,
  getYearByModelId,
  getFilterConsualt,
} from "@/services/filter";
import { MAKER_NAME_MAPPING } from "@/data/makers";
import { getState, getCities, getAllTown } from "@/services/user.service";
import { getUserCityAndStateByLatLong } from "@/services/consult.filter.service";
import { addClickEvent, getAddRecomandedVehicle } from "@/services/ppc.service";
import { generateSeoSlug } from "@/lib/seo";

/* ================= MOBILE DETECTION ================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const listener = (e) => setIsMobile(e.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

export default function SearchWithCard({
  onPageResponseChange,
  onFilterChange,
  onRelatedChange,
  onConsultChange,
  onConsultPayloadChange,
  onLoadingChange,
  initialFilters = {},
}) {
  const MIN = 50000;
  const MAX = 2000000;
  const MAX_KM = 200000;

  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const vehicleType = searchParams.get("vehicleType");
  const bodyType = searchParams.get("bodyType");
  const apiBodyType = useMemo(() => {
    if (!vehicleType) return "FOUR_WHEELER";
    const normalized = vehicleType.toLowerCase();
    if (normalized.includes("2") || normalized.includes("two")) {
      return "TWO_WHEELER";
    }
    return "FOUR_WHEELER";
  }, [vehicleType]);
  const fuelType = searchParams.get("fuelType");

  const rawBrand = searchParams.get("brand") || initialFilters.brand;
  const rawMakerId = searchParams.get("makerId") || initialFilters.makerId;
  const isNumeric = (val) => val && !isNaN(val) && val.trim() !== "";

  // 1. Resolve makerId (the numeric ID needed by the API)
  let makerId = rawMakerId;
  if (!makerId) {
    if (isNumeric(rawBrand)) {
      makerId = rawBrand;
    } else if (rawBrand) {
      // Reverse lookup: Name -> ID
      const entries = Object.entries(MAKER_NAME_MAPPING);
      const found = entries.find(
        ([id, name]) => name.toLowerCase() === rawBrand.toLowerCase(),
      );
      if (found) makerId = found[0];
    }
  }

  // 2. Resolve brandParam (the string name needed for UI labels)
  let brandParam = searchParams.get("brandName") || initialFilters.brandName;
  if (!brandParam) {
    if (isNumeric(rawBrand)) {
      brandParam = MAKER_NAME_MAPPING[rawBrand];
    } else {
      brandParam = rawBrand;
    }
  }
  const modelIdParam = searchParams.get("modelId") || initialFilters.modelId;
  const modelParam = searchParams.get("model") || initialFilters.model;
  const variantIdParam =
    searchParams.get("variantId") || initialFilters.variantId;
  const variantParam = searchParams.get("variant") || initialFilters.variant;
  const budget = searchParams.get("budget") || initialFilters.budget;
  const sortBy = searchParams.get("sortBy") || initialFilters.sortBy;
  const direction = searchParams.get("direction") || initialFilters.direction;
  const transmission =
    searchParams.get("transmission") || initialFilters.transmission;

  let mPrice = 0;
  let mxPrice = 0;
  let budgetMid = 0;
  if (budget) {
    const [min, max] = budget.replace(/\s/g, "").split("-");

    mPrice = parseFloat(min) * 100000;
    mxPrice = parseFloat(max) * 100000;

    budgetMid = (mPrice + mxPrice) / 2;
  }

  // States
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Location");
  const [avxAssumed, setAvxAssumed] = useState(() => {
    return searchParams.get("reccomInspected") === "true";
  });

  const [minPrice, setMinPrice] = useState(() => (mPrice > 0 ? mPrice : 50000));
  const [maxPrice, setMaxPrice] = useState(() =>
    mxPrice > 0 ? mxPrice : 2000000,
  );
  const [kmDistance, setKmDistance] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // ── Brand states ──
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(() =>
    makerId ? [makerId] : [],
  );
  const [brandSearch, setBrandSearch] = useState("");
  const [brandPage, setBrandPage] = useState(1);
  const [brandHasMore, setBrandHasMore] = useState(true);
  const [brandLoading, setBrandLoading] = useState(false);

  // ── Model states ──
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState(() =>
    modelIdParam ? [modelIdParam] : [],
  );
  const [modelSearch, setModelSearch] = useState("");
  const [modelPage, setModelPage] = useState(1);
  const [modelHasMore, setModelHasMore] = useState(true);
  const [modelLoading, setModelLoading] = useState(false);

  // ── State & City states ──
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(() => {
    const qStateId = searchParams.get("stateId") || initialFilters.stateId;
    return qStateId ? Number(qStateId) : null;
  });
  const [selectedStateName, setSelectedStateName] = useState(
    () => initialFilters.stateName || "",
  );
  const [selectedCityId, setSelectedCityId] = useState(() => {
    const qCityId = searchParams.get("cityId") || initialFilters.cityId;
    return qCityId ? Number(qCityId) : null;
  });
  const [selectedCityName, setSelectedCityName] = useState(
    () => initialFilters.cityName || "",
  );
  const [towns, setTowns] = useState([]);
  const [selectedTownId, setSelectedTownId] = useState(null);
  const [selectedTownName, setSelectedTownName] = useState("");
  const [selectedYear, setSelectedYear] = useState([]);
  const [years, setYears] = useState([]);
  const [yearLoading, setYearLoading] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState(() =>
    bodyType
      ? [bodyType.toLowerCase()]
      : initialFilters.bodyType
        ? [initialFilters.bodyType.toLowerCase()]
        : [],
  );
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedSellerType, setSelectedSellerType] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // ── Add these ──
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    () => (transmission ? [transmission.toLowerCase()] : []),
  );
  const [selectedVariants, setSelectedVariants] = useState(() =>
    variantIdParam ? [variantIdParam] : [],
  );

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
  const [selectedFuelTypes, setSelectedFuelTypes] = useState(() =>
    fuelType ? [fuelType] : [],
  );

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

  // ── Lock body scroll when mobile filter is open ──
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  /* ================= BUILD PAYLOAD ================= */
  /* ================= BUILD PAYLOAD ================= */
  const buildPayload = () => {
    const payload = {};

    if (selectedCityId) payload.cityId = selectedCityId;
    if (selectedStateId) payload.stateId = selectedStateId;
    if (selectedTownId) payload.townId = selectedTownId;

    if (selectedBodyType.length > 0)
      payload.vehicleSubTypes = selectedBodyType.map((b) => b.toUpperCase());

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

  /* ================= BUILD CONSULT PAYLOAD ================= */
  const buildConsultPayload = () => {
    const payload = {};
    if (selectedCityId) payload.cityId = selectedCityId;
    if (selectedStateId) payload.stateId = selectedStateId;
    if (selectedTownId) payload.townId = selectedTownId;
    if (selectedBodyType.length > 0)
      payload.vehicleSubTypes = selectedBodyType.map((b) => b.toUpperCase());
    if (selectedBrands.length > 0)
      payload.makerIds = selectedBrands.map(Number);
    if (selectedModels.length > 0)
      payload.modelIds = selectedModels.map(Number);

    if (selectedFuelTypes.length > 0)
      payload.fuelTypes = selectedFuelTypes.map((f) => f.toUpperCase());

    if (selectedTransmissionTypes.length > 0)
      payload.transmissionTypes = selectedTransmissionTypes.map((t) =>
        t.toUpperCase(),
      );

    if (minPrice > MIN) payload.minPrice = minPrice;
    if (maxPrice < MAX) payload.maxPrice = maxPrice;
    return payload;
  };

  /* ================= DEBOUNCED PAYLOADS ================= */
  const [debouncedPayload, setDebouncedPayload] = useState(() =>
    buildPayload(),
  );
  const [debouncedConsultPayload, setDebouncedConsultPayload] = useState(() =>
    buildConsultPayload(),
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPayload(buildPayload());
      setDebouncedConsultPayload(buildConsultPayload());
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [
    selectedBrands,
    selectedModels,
    selectedVariants,
    selectedFuelTypes,
    selectedTransmissionTypes,
    selectedBodyType,
    selectedYear,
    selectedCityId,
    selectedStateId,
    selectedTownId,
    selectedRating,
    selectedSellerType,
    avxAssumed,
    minPrice,
    maxPrice,
    kmDistance,
  ]);

  const queryParams = useMemo(
    () => ({
      pageNo: currentPage,
      size: 9,
      vehicleType,
      ...(sortBy ? { sortBy, direction: direction || "desc" } : {}),
    }),
    [currentPage, sortBy, direction, vehicleType],
  );

  const { data: searchData, isFetching: vehiclesLoading } = useQuery(
    getFilteredVehiclesQuery(debouncedPayload, queryParams),
  );

  const { data: consultantData } = useQuery(
    getFilterConsualtQuery(debouncedConsultPayload),
  );

  // Resolve brand and model names for the PPC API
  const resolvedBrandName = useMemo(() => {
    if (selectedBrands.length === 0) return "";
    const makerId = selectedBrands[0];
    if (MAKER_NAME_MAPPING[makerId]) {
      return MAKER_NAME_MAPPING[makerId];
    }
    const found = brands.find((b) => String(b.value) === String(makerId));
    return found ? found.label : "";
  }, [selectedBrands, brands]);

  const resolvedModelName = useMemo(() => {
    if (selectedModels.length === 0) return "";
    const modelId = selectedModels[0];
    const found = models.find((m) => String(m.value) === String(modelId));
    return found ? found.label : "";
  }, [selectedModels, models]);

  const mappedVehicleTypeForAds = useMemo(() => {
    if (!vehicleType) return "FOUR_WHEELER";
    const normalized = vehicleType.toLowerCase();
    if (normalized.includes("2") || normalized.includes("two")) {
      return "TWO_WHEELER";
    }
    return "FOUR_WHEELER";
  }, [vehicleType]);

  const adParams = useMemo(() => {
    const params = {
      placement: "SEARCH_RESULT_PAGE",
      vehicleType: mappedVehicleTypeForAds,
      maxPrice: maxPrice,
      page: 0,
      size: 10,
    };
    if (resolvedBrandName) {
      params.make = resolvedBrandName.toUpperCase();
    }
    if (resolvedModelName) {
      params.model = resolvedModelName;
    }
    return params;
  }, [mappedVehicleTypeForAds, resolvedBrandName, resolvedModelName, maxPrice]);

  const { data: recommendedAdsData, isFetching: isAdsLoading } = useQuery({
    queryKey: ["recommended-vehicles-ads", adParams],
    queryFn: async () => {
      const res = await getAddRecomandedVehicle(adParams);
      return res;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const recommendedVehicles = useMemo(() => {
    const data = recommendedAdsData?.data;
    const list = Array.isArray(data) ? data : [];
    return list.map((item) => ({
      ...item.vehicle,
      sponsored: item.sponsored,
      adId: item.adId,
      billingType: item.billingType,
      placement: item.placement,
    }));
  }, [recommendedAdsData]);

  const vehicles = searchData?.topPicksVehicles?.vehicles || [];
  const relatedVehicles = searchData?.similarVehicles || [];
  const priceBasedVehicles = searchData?.priceMatchVehicles || [];
  const topPicksPageResponse =
    searchData?.topPicksVehicles?.pageResponse || null;

  // Sync selected filters to the browser URL (Faceted SEO routing)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const brandName = resolvedBrandName;
    const modelName = resolvedModelName;
    const locationName = selectedCityName || selectedStateName;

    // Build the target SEO slug
    const targetSlug = generateSeoSlug({ brandName, modelName, cityName: locationName });
    const currentSlug = pathname.split("/").pop();

    if (!brandName && !locationName) {
      // If we are currently on an SEO slug page but filters are empty, go back to base search
      if (currentSlug && currentSlug.startsWith("buy-used-")) {
        replace("/search", { scroll: false });
      }
      return;
    }

    if (targetSlug !== currentSlug) {
      replace(`/search/${targetSlug}`, { scroll: false });
    }
  }, [resolvedBrandName, resolvedModelName, selectedCityName, selectedStateName, pathname]);

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(vehiclesLoading);
  }, [vehiclesLoading, onLoadingChange]);

  // Sync callbacks & set totalPages when searchData returns
  useEffect(() => {
    if (!searchData) return;

    const similar = searchData.similarVehicles || [];
    const priceBased = searchData.priceMatchVehicles || [];
    const topPicksPR = searchData.topPicksVehicles?.pageResponse || {};

    setTotalPages(topPicksPR.totalPages || 0);

    if (onRelatedChange) onRelatedChange(similar);

    const combinedTotal =
      (priceBased.length || 0) +
      (topPicksPR.totalElements || 0) +
      (similar.length || 0);

    const combinedPageResponse = {
      ...topPicksPR,
      totalElements: combinedTotal,
    };

    if (onPageResponseChange) onPageResponseChange(combinedPageResponse);
  }, [searchData]);

  // Emit consultants callback
  useEffect(() => {
    if (consultantData && onConsultChange) {
      onConsultChange(consultantData);
    }
  }, [consultantData, onConsultChange]);

  const handlePriceChangeRelease = () => {
    setCurrentPage(1);
    setDebouncedPayload(buildPayload());
  };

  // Synchronize options lists from URL params on mount/change
  useEffect(() => {
    const reccomInspectedVal = searchParams.get("reccomInspected");
    if (reccomInspectedVal === "true") {
      setAvxAssumed(true);
    }
    if (makerId && brandParam) {
      setBrands((prev) => {
        if (!prev.find((b) => b.value === makerId)) {
          return [{ value: makerId, label: brandParam }, ...prev];
        }
        return prev;
      });
    }
    if (modelIdParam && modelParam) {
      setModels((prev) => {
        if (!prev.find((m) => m.value === modelIdParam)) {
          return [{ value: modelIdParam, label: modelParam }, ...prev];
        }
        return prev;
      });
    }
    if (variantIdParam && variantParam) {
      setVariants((prev) => {
        if (!prev.find((v) => v.value === variantIdParam)) {
          return [{ value: variantIdParam, label: variantParam }, ...prev];
        }
        return prev;
      });
    }
  }, [searchParams]);

  /* ================= SYNC CONSULT PAYLOAD FOR AUTO-CONSULT ================= */
  useEffect(() => {
    if (!onConsultPayloadChange) return;

    const payload = buildConsultPayload();
    const safeStr = (v) => (v != null ? String(v) : "");

    const brandLabel =
      selectedBrands.length > 0
        ? brands.find((b) => safeStr(b.value) === safeStr(selectedBrands[0]))
            ?.label || ""
        : "";

    const modelLabel =
      selectedModels.length > 0
        ? models.find((m) => safeStr(m.value) === safeStr(selectedModels[0]))
            ?.label || ""
        : "";

    const bodyTypeLabel =
      selectedBodyType.length > 0
        ? selectedBodyType[0].charAt(0).toUpperCase() +
          selectedBodyType[0].slice(1).toLowerCase()
        : "";

    onConsultPayloadChange({
      ...payload,
      _labels: { brandLabel, modelLabel, bodyTypeLabel },
    });
  }, [
    selectedBrands,
    selectedModels,
    selectedBodyType,
    brands,
    models,
    minPrice,
    maxPrice,
    selectedCityId,
    selectedStateId,
  ]);

  // ── Load Brands with search ──
  const loadBrands = async (page = 1, searchTerm = brandSearch) => {
    if (brandLoading) return;
    setBrandLoading(true);

    try {
      const res = await getAndSearchMakers({
        searchTerm: searchTerm.trim() || undefined,
        page,
        limit: 10,
        bodyType: apiBodyType,
      });

      if (!res.success) return;

      const newBrands = res.data
        .map((item) => ({
          value: item.makeId.toString(),
          label: item.makeDisplay || item.makeName,
        }))
        .filter((item) => item.label && item.label.trim() !== "");

      setBrands((prev) => {
        if (page === 1) {
          const keep = prev.filter((p) => selectedBrands.includes(p.value));
          const filteredNew = newBrands.filter(
            (nb) => !keep.some((k) => k.value === nb.value),
          );
          return [...keep, ...filteredNew];
        }
        return [...prev, ...newBrands];
      });
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
      // Don't clear brands[] here — loadBrands(page=1) will preserve selected items
      setBrandPage(1);
      setBrandHasMore(true);
      loadBrands(1, brandSearch);
    }, 400);

    return () => clearTimeout(brandSearchTimeoutRef.current);
  }, [brandSearch, apiBodyType]);

  useEffect(() => {
    setBrandPage(1);
    setBrandHasMore(true);
    loadBrands(1, "");
  }, [apiBodyType]);

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
    const fetchTowns = async () => {
      if (!selectedCityId) {
        setTowns([]);
        setSelectedTownId(null);
        setSelectedTownName("");
        return;
      }
      try {
        const res = await getAllTown(selectedCityId);
        if (res?.data) {
          setTowns(
            res.data.map((t) => ({
              label: t.name,
              value: t.id,
            })),
          );
        }
      } catch (err) {
        console.error("Failed to load towns:", err);
        setTowns([]);
      }
    };
    fetchTowns();
  }, [selectedCityId]);

  useEffect(() => {
    // Priority 1: Read location from URL query params or initialFilters
    const qCityId = searchParams.get("cityId") || initialFilters.cityId;
    const qStateId = searchParams.get("stateId") || initialFilters.stateId;
    const qLocation = searchParams.get("location") || initialFilters.location;
    const qStateName =
      searchParams.get("stateName") || initialFilters.stateName;
    const qCityName = searchParams.get("cityName") || initialFilters.cityName;

    // Handle location names even without IDs
    if (qLocation) {
      const parts = qLocation.split(",").map((s) => s.trim());
      if (parts[0]) setSelectedCityName(parts[0]);
      if (parts[1]) setSelectedStateName(parts[1]);
    } else {
      if (qStateName) setSelectedStateName(qStateName);
      if (qCityName) setSelectedCityName(qCityName);
    }

    if (qStateId) {
      setSelectedStateId(Number(qStateId));
      if (qCityId) setSelectedCityId(Number(qCityId));
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
        bodyType: apiBodyType,
      };

      if (selectedBrands.length > 0) {
        payload.maker_id = selectedBrands[0];
      }

      const res = await getAndSearchModel(payload);

      if (!res.success) return;

      const newModels = res.data
        .map((item) => ({
          value: item.modelId.toString(),
          label: item.modelDisplayName || item.modelName,
        }))
        .filter((item) => item.label && item.label.trim() !== "");

      setModels((prev) => {
        if (page === 1) {
          const keep = prev.filter((p) => selectedModels.includes(p.value));
          const filteredNew = newModels.filter(
            (nm) => !keep.some((k) => k.value === nm.value),
          );
          return [...keep, ...filteredNew];
        }
        return [...prev, ...newModels];
      });
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
      // Don't clear models[] here — loadModels(page=1) will preserve selected items
      setModelPage(1);
      setModelHasMore(true);
      loadModels(1, modelSearch);
    }, 400);

    return () => clearTimeout(modelSearchTimeoutRef.current);
  }, [modelSearch, selectedBrands, apiBodyType]);

  useEffect(() => {
    setModelPage(1);
    setModelHasMore(true);
    loadModels(1, modelSearch);
  }, [selectedBrands, apiBodyType]);

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
      const res = await getYearByModelId({ modelId, bodyType: apiBodyType });

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
  }, [selectedModels, apiBodyType]);

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

        const res = await getFuelTypeByModelId({
          modelId,
          bodyType: apiBodyType,
        });

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
  }, [selectedModels, apiBodyType]);

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

        const res = await getTransmissionTypeByModelId({
          modelId,
          bodyType: apiBodyType,
        });

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
  }, [selectedModels, apiBodyType]);

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

      // Standardize fuel type (ALL CAPS for backend)
      let fuelTypeToSend = selectedFuelTypes[0].toUpperCase();

      const payload = {
        searchTerm: searchTerm.trim() || undefined,
        page,
        limit: 10,
        modelId: selectedModels[0],
        fuelType: fuelTypeToSend,
        year: selectedYear.length > 0 ? selectedYear[0] : undefined,
        bodyType: apiBodyType,
      };

      const res = await getAndSearchVariant(payload);

      if (!res.success) {
        setVariants([]);
        setVariantHasMore(false);
        return;
      }

      const newVariants = res.data
        .map((item) => ({
          value: item.variantId.toString(),
          label: item.variantDisplayName || item.variantName,
        }))
        .filter((item) => item.label && item.label.trim() !== "");

      setVariants((prev) => {
        if (page === 1) {
          const keep = prev.filter((p) => selectedVariants.includes(p.value));
          const filteredNew = newVariants.filter(
            (nv) => !keep.some((k) => k.value === nv.value),
          );
          return [...keep, ...filteredNew];
        }
        return [...prev, ...newVariants];
      });
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
      // Don't clear variants[] here — loadVariants(page=1) will preserve selected items
      setVariantPage(1);
      setVariantHasMore(true);
      loadVariants(1, variantSearch);
    }, 400);

    return () => clearTimeout(variantSearchTimeoutRef.current);
  }, [
    variantSearch,
    selectedModels,
    selectedFuelTypes,
    selectedYear,
    apiBodyType,
  ]);

  useEffect(() => {
    setVariantPage(1);
    setVariantHasMore(true);
    loadVariants(1, variantSearch);
  }, [selectedModels, selectedFuelTypes, selectedYear, apiBodyType]);

  const handleLoadMoreVariants = () => {
    if (variantLoading || !variantHasMore) return;
    loadVariants(variantPage + 1, variantSearch);
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

  // ── Real-time filter tag emission ──
  useEffect(() => {
    const tags = [];
    const brandLabels = brands
      .filter((b) => selectedBrands.includes(b.value))
      .map((b) => b.label);
    const modelLabels = models
      .filter((m) => selectedModels.includes(m.value))
      .map((m) => m.label);
    const variantLabels = variants
      .filter((v) => selectedVariants.includes(v.value))
      .map((v) => v.label);
    if (brandLabels.length > 0) tags.push(...brandLabels);
    if (modelLabels.length > 0) tags.push(...modelLabels);
    if (variantLabels.length > 0) tags.push(...variantLabels);
    if (selectedFuelTypes.length > 0) tags.push(...selectedFuelTypes);
    if (selectedTransmissionTypes.length > 0)
      tags.push(...selectedTransmissionTypes);
    if (selectedBodyType.length > 0)
      tags.push(
        ...selectedBodyType.map(
          (b) => b.charAt(0).toUpperCase() + b.slice(1).toLowerCase(),
        ),
      );
    if (selectedYear.length > 0) tags.push(...selectedYear);
    // Show both city and state
    const locationParts = [];
    if (selectedCityName) locationParts.push(selectedCityName);
    if (selectedStateName) locationParts.push(selectedStateName);
    if (selectedTownName) locationParts.push(selectedTownName);
    if (locationParts.length > 0) tags.push(locationParts.join(", "));
    if (minPrice > MIN || maxPrice < MAX)
      tags.push(
        `₹${(minPrice / 100000).toFixed(1)}L–₹${(maxPrice / 100000).toFixed(1)}L`,
      );
    if (kmDistance > 0) tags.push(`≤${kmDistance.toLocaleString()} km`);
    if (selectedRating.length > 0) tags.push(`${selectedRating[0]}+ ⭐`);
    if (selectedSellerType.length > 0)
      tags.push(
        selectedSellerType[0] === "CONSULTANT" ? "Consultant" : "Individual",
      );
    onFilterChange?.(tags);
  }, [
    selectedBrands,
    selectedModels,
    selectedVariants,
    selectedFuelTypes,
    selectedTransmissionTypes,
    selectedBodyType,
    selectedYear,
    selectedCityName,
    selectedStateName,
    selectedTownName,
    minPrice,
    maxPrice,
    kmDistance,
    selectedRating,
    selectedSellerType,
    brands,
    models,
    variants,
  ]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    setDebouncedPayload(buildPayload());
    setDebouncedConsultPayload(buildConsultPayload());
  };

  const handleClearFilters = async () => {
    // Remove query parameters from URL to clear top search bar
    replace(pathname, { scroll: false });

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

    // Reset state, city & town
    setSelectedStateId(null);
    setSelectedStateName("");
    setSelectedCityId(null);
    setSelectedCityName("");
    setSelectedTownId(null);
    setSelectedTownName("");
    setTowns([]);

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

    // Reset pagination
    setCurrentPage(1);

    // Reload vehicles with empty payload and scroll to top
    setDebouncedPayload({});
    setDebouncedConsultPayload({});
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reload brands
    loadBrands(1, "");
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row relative text-secondary mt-5 gap-4">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden lg:flex
          w-[328px]
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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary mb-4">
              Filter Your Result
            </h2>

            <button
              className="flex items-center gap-2 mb-4 px-2 py-2 underline
    text-sm font-semibold
    text-primary/60 hover:text-primary
    transition-all duration-200
    cursor-pointer"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {/* ================= STATE & CITY SELECTOR ================= */}
            <div className="space-y-4">
              {/* ---------- STATE DROPDOWN ---------- */}
              <div className="relative">
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
                <CustomSelect
                  value={selectedStateId}
                  options={states}
                  placeholder="Select State"
                  variant="transparent"
                  onChange={(val) => {
                    const s = states.find((st) => st.value === val);
                    setSelectedStateId(val);
                    setSelectedStateName(s ? s.label : "");
                    setSelectedCityId(null);
                    setSelectedCityName("");
                  }}
                />
              </div>

              {/* ---------- CITY DROPDOWN ---------- */}
              <div className="relative">
                <label className="text-xs text-third block mb-1">City</label>
                <CustomSelect
                  value={selectedCityId}
                  options={cities}
                  placeholder={
                    selectedStateId ? "Select City" : "Select state first"
                  }
                  variant="transparent"
                  disabled={!selectedStateId}
                  onChange={(val) => {
                    const c = cities.find((ct) => ct.value === val);
                    setSelectedCityId(val);
                    setSelectedCityName(c ? c.label : "");
                  }}
                />
              </div>

              {/* ---------- TOWN DROPDOWN ---------- */}
              <div className="relative">
                <label className="text-xs text-third block mb-1">Town</label>
                <CustomSelect
                  value={selectedTownId}
                  options={towns}
                  placeholder={
                    selectedCityId ? "Select Town" : "Select city first"
                  }
                  variant="transparent"
                  disabled={!selectedCityId}
                  onChange={(val) => {
                    const t = towns.find((tn) => tn.value === val);
                    setSelectedTownId(val);
                    setSelectedTownName(t ? t.label : "");
                  }}
                />
              </div>

              <div className="hidden lg:flex items-center justify-between px-4 py-3 rounded-xl border border-white/20 backdrop-blur-md bg-transparent">
                <span className="text-primary font-semibold text-sm">
                  Reecomm Inspected
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
                      step={1}
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(Math.min(+e.target.value, maxPrice - 50000))
                      }
                      onMouseUp={handlePriceChangeRelease}
                      onTouchEnd={handlePriceChangeRelease}
                      className="dual-range z-30"
                    />

                    <input
                      type="range"
                      min={MIN}
                      max={MAX}
                      step={1}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Math.max(+e.target.value, minPrice + 50000))
                      }
                      onMouseUp={handlePriceChangeRelease}
                      onTouchEnd={handlePriceChangeRelease}
                      className="dual-range z-40"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-primary/70 mb-1">
                    <span>₹{minPrice}</span>
                    <span>₹{maxPrice}</span>
                  </div>
                </div>
              </FilterSection>
            </div>

            <FilterSection title="Brand" selectedCount={selectedBrands.length}>
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

            <FilterSection title="Model" selectedCount={selectedModels.length}>
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
                customEmptyMessage={
                  selectedBrands.length === 0
                    ? "Please select a brand first"
                    : undefined
                }
              />
            </FilterSection>

            <FilterSection
              title="Fuel Type"
              selectedCount={selectedFuelTypes.length}
            >
              <ChipGroup
                title=""
                selected={selectedFuelTypes}
                items={fuelTypes}
                onChange={handleFuelChange}
                isLoading={fuelLoading}
              />
            </FilterSection>

            <FilterSection
              title="Transmission"
              selectedCount={selectedTransmissionTypes.length}
            >
              <ChipGroup
                title=""
                items={transmissionTypes}
                selected={selectedTransmissionTypes}
                onChange={handleTransmissionChange}
                isLoading={transmissionLoading}
              />
            </FilterSection>

            <FilterSection title="Year" selectedCount={selectedYear.length}>
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

            <FilterSection
              title="Variant"
              selectedCount={selectedVariants.length}
            >
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
                    step={1}
                    value={kmDistance}
                    onChange={(e) => setKmDistance(Number(e.target.value))}
                    onMouseUp={handlePriceChangeRelease}
                    onTouchEnd={handlePriceChangeRelease}
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

            <FilterSection
              title="Body Type"
              selectedCount={selectedBodyType.length}
            >
              <ChipGroup
                title=""
                items={vehicleTypes}
                selected={selectedBodyType}
                onChange={setSelectedBodyType}
              />
            </FilterSection>

            <FilterSection
              title="Inspection Rating"
              selectedCount={selectedRating.length}
            >
              <ChipGroup
                title=""
                items={ratings}
                selected={selectedRating}
                onChange={setSelectedRating}
                allowMultiple={true}
              />
            </FilterSection>

            <FilterSection
              title="Seller Type"
              selectedCount={selectedSellerType.length}
            >
              <ChipGroup
                title=""
                items={sellerType}
                selected={selectedSellerType}
                onChange={setSelectedSellerType}
                allowMultiple={true}
              />
            </FilterSection>

            {/* <div className="mt-4 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                className="text-primary px-5 py-2"
                showIcon={false}
                onClick={handleApplyFilter}
              >
                Apply Filter
              </Button>
            </div> */}
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-4 auto-rows-max py-4 sm:py-5 lg:py-0">
          <div className="col-span-full mb-10">
            <PromoCardRow />
          </div>

          {/* MOBILE FILTER BAR */}
          <div className="col-span-full lg:hidden sticky top-16 z-40 py-2" style={{ background: "linear-gradient(90deg, #313131 0%, #1a1919 45%, #000000 100%)" }}>
            <div className="flex lg:hidden items-center gap-3 overflow-x-auto scrollbar-hide">
              <div className="shrink-0">
                <Button
                  variant="ghost"
                  className="rounded-lg"
                  showIcon={false}
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <FilterIcon className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-third/40 shrink-0">
                <span className="text-sm text-primary font-semibold">
                  Reecomm Inspected
                </span>
                <button
                  onClick={() => setAvxAssumed(!avxAssumed)}
                  className={`relative w-9 h-5 rounded-full cursor-pointer ${avxAssumed ? "bg-primary" : "bg-white/20"}`}
                >
                  <span
                    className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${avxAssumed ? "translate-x-4" : ""}`}
                  />
                </button>
              </div>

              <Chip
                label="Under ₹5L"
                selected={maxPrice <= 500000}
                variant="outline"
                onClick={() => {
                  const nextMaxPrice = maxPrice <= 500000 ? MAX : 500000;
                  setMinPrice(MIN);
                  setMaxPrice(nextMaxPrice);
                  setCurrentPage(1);
                  setDebouncedPayload((prev) => {
                    const next = { ...prev };
                    if (MIN > MIN) next.minPrice = MIN;
                    else delete next.minPrice;
                    if (nextMaxPrice < MAX) next.maxPrice = nextMaxPrice;
                    else delete next.maxPrice;
                    return next;
                  });
                }}
              />
              <Chip
                label="SUV"
                selected={selectedBodyType.includes("suv")}
                variant="outline"
                onClick={() => {
                  setSelectedBodyType((prev) =>
                    prev.includes("suv")
                      ? prev.filter((b) => b !== "suv")
                      : [...prev, "suv"],
                  );
                }}
              />
              <Chip
                label="Diesel"
                selected={selectedFuelTypes.includes("Diesel")}
                variant="outline"
                onClick={() => {
                  setSelectedFuelTypes((prev) =>
                    prev.includes("Diesel")
                      ? prev.filter((f) => f !== "Diesel")
                      : [...prev, "Diesel"],
                  );
                }}
              />
              <Chip
                label="⭐ 4+"
                selected={selectedRating.includes("4.0")}
                variant="outline"
                onClick={() => {
                  setSelectedRating((prev) =>
                    prev.includes("4.0")
                      ? prev.filter((r) => r !== "4.0")
                      : [...prev, "4.0"],
                  );
                }}
              />
            </div>
          </div>

          <div className="col-span-full mb-10">
            <SponsoredCars loading={isAdsLoading} data={recommendedVehicles} />
          </div>

          <div className="col-span-full mb-10 ">
            {(() => {
              // --- Price range label ---
              const userSetPrice = minPrice > MIN || maxPrice < MAX;
              let priceMin = minPrice;
              let priceMax = maxPrice;

              if (!userSetPrice && priceBasedVehicles.length > 0) {
                const prices = priceBasedVehicles
                  .map((v) => v.price)
                  .filter(Boolean);
                priceMin = Math.min(...prices);
                priceMax = Math.max(...prices);
              }

              const toL = (v) => `₹${(v / 100000).toFixed(0)}L`;
              const priceLabel = `Between ${toL(priceMin)} – ${toL(priceMax)}`;

              // --- Subject label ---
              const safeStr = (v) => (v != null ? String(v) : "");
              const brandLabel =
                selectedBrands.length > 0
                  ? brands.find(
                      (b) => safeStr(b.value) === safeStr(selectedBrands[0]),
                    )?.label || ""
                  : "";

              // Resolve model label from selected model id
              const modelLabel =
                selectedModels.length > 0
                  ? models.find(
                      (m) => safeStr(m.value) === safeStr(selectedModels[0]),
                    )?.label || ""
                  : "";

              // Resolve body type label (capitalise first letter)
              const bodyTypeLabel =
                selectedBodyType.length > 0
                  ? selectedBodyType[0].charAt(0).toUpperCase() +
                    selectedBodyType[0].slice(1).toLowerCase()
                  : "";

              let subject = "Vehicles";
              if (bodyTypeLabel) {
                subject = `${bodyTypeLabel}s`;
              } else if (brandLabel && modelLabel) {
                subject = `${brandLabel} ${modelLabel}`;
              } else if (brandLabel) {
                subject = `${brandLabel} Cars`;
              }

              const dynamicTitle = (
                <>
                  {subject} Between{" "}
                  <span className="text-fourth font-semibold">
                    {toL(priceMin)} – {toL(priceMax)}
                  </span>
                </>
              );
              return (
                <PriceBased
                  data={priceBasedVehicles}
                  title={dynamicTitle}
                  loading={vehiclesLoading}
                />
              );
            })()}
          </div>

          {vehiclesLoading ? (
            <>
              <div className="col-span-full">
                <div className="flex flex-col items-start gap-2">
                  <div className="skeleton-shimmer h-4 w-28 rounded-md mb-2" />
                  <div className="skeleton-shimmer h-8 w-64 rounded-md" />
                  <div className="skeleton-shimmer h-4 w-80 rounded-md" />
                </div>
              </div>
              {[...Array(6)].map((_, i) => (
                <VehicleCardSkeleton key={`skel-${i}`} />
              ))}
            </>
          ) : vehicles?.length > 0 ? (
            <>
              <div className="col-span-full">
                <div className="flex flex-col items-start gap-2">
                  <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                    Top Vehicle
                    <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                    <span className="text-fourth"> Top Vehicle</span> For You
                  </h2>

                  <p className="text-third">
                    Lorem ipsum dolor sit amet consectetur dolor sit amet
                    consectetur..
                  </p>
                </div>
              </div>

              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} data={vehicle} />
              ))}

              {topPicksPageResponse?.totalElements > 9 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : vehicles?.length === 0 && priceBasedVehicles?.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-secondary/5 rounded-xl border border-third/10 my-4 px-4">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                {selectedCityName
                  ? `No vehicles listed directly in ${selectedCityName} yet`
                  : brandParam
                    ? `No ${brandParam} vehicles listed directly yet`
                    : "No vehicles listed directly yet"}
              </h3>
              <p className="text-sm text-third mt-2 max-w-md mx-auto">
                We are actively verifying new consultants and pre-owned listings
                here. In the meantime, browse the top verified matches and
                recommendations near you below.
              </p>
            </div>
          ) : null}
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed top-16 inset-x-0 bottom-0 z-100 bg-primary text-secondary flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          mobileFilterOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-third/40 shrink-0">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            showIcon={false}
            onClick={() => setMobileFilterOpen(false)}
            className="text-primary bg-secondary hover:bg-secondary/50 hover:text-primary/80 text-xl font-bold p-1"
          >
            <X size={20} />
          </Button>
        </div>

        {/* ── Two-column layout: tabs + content ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Left Tabs ── */}
          <div className="w-[40%] border-r border-third/40 overflow-y-auto">
            {[
              {
                name: "Location",
                count: selectedStateId ? (selectedCityId ? 2 : 1) : 0,
              },
              { name: "Budget", count: 0 },
              { name: "Brand", count: selectedBrands.length },
              { name: "Model", count: selectedModels.length },
              { name: "Fuel Type", count: selectedFuelTypes.length },
              { name: "Transmission", count: selectedTransmissionTypes.length },
              { name: "Year", count: selectedYear.length },
              { name: "Variant", count: selectedVariants.length },
              { name: "KM Driven", count: 0 },
              { name: "Body Type", count: selectedBodyType.length },
              { name: "Rating", count: selectedRating.length },
              { name: "Seller Type", count: selectedSellerType.length },
            ].map((tab) => (
              <div
                key={tab.name}
                onClick={() => setActiveFilterTab(tab.name)}
                className={`px-4 py-3 cursor-pointer text-sm flex items-center justify-between ${
                  activeFilterTab === tab.name
                    ? "bg-secondary/10 font-semibold"
                    : "hover:bg-secondary/5"
                }`}
              >
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-secondary text-[10px] font-bold leading-none">
                    {tab.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── Right Content ── */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3">{activeFilterTab}</h3>

            {/* ── LOCATION ── */}
            {activeFilterTab === "Location" && (
              <div className="space-y-4">
                {/* State */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-secondary/60">State</label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      className="flex items-center gap-1 text-xs text-secondary/70 hover:text-secondary cursor-pointer transition-colors"
                    >
                      <MapPin size={14} />
                      <span>Detect</span>
                    </button>
                  </div>
                  <CustomSelect
                    value={selectedStateId}
                    options={states}
                    placeholder="Select State"
                    variant="default"
                    onChange={(val) => {
                      const s = states.find((st) => st.value === val);
                      setSelectedStateId(val);
                      setSelectedStateName(s ? s.label : "");
                      setSelectedCityId(null);
                      setSelectedCityName("");
                    }}
                  />
                </div>

                {/* City */}
                <div className="relative">
                  <label className="text-xs text-secondary/60 block mb-1">
                    City
                  </label>
                  <CustomSelect
                    value={selectedCityId}
                    options={cities}
                    placeholder={
                      selectedStateId ? "Select City" : "Select state first"
                    }
                    variant="default"
                    disabled={!selectedStateId}
                    onChange={(val) => {
                      const c = cities.find((ct) => ct.value === val);
                      setSelectedCityId(val);
                      setSelectedCityName(c ? c.label : "");
                    }}
                  />
                </div>
              </div>
            )}

            {/* ── BUDGET ── */}
            {activeFilterTab === "Budget" && (
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between text-xs text-secondary/70 mb-1">
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
                    step={1}
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(Math.min(+e.target.value, maxPrice - 50000))
                    }
                    onTouchEnd={handlePriceChangeRelease}
                    className="dual-range z-30"
                  />
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={1}
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Math.max(+e.target.value, minPrice + 50000))
                    }
                    onTouchEnd={handlePriceChangeRelease}
                    className="dual-range z-40"
                  />
                </div>
                <div className="flex justify-between text-xs text-secondary/70 mb-1">
                  <span>₹{minPrice.toLocaleString()}</span>
                  <span>₹{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* ── BRAND ── */}
            {activeFilterTab === "Brand" && (
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
                onSearchChange={(val) => setBrandSearch(val)}
                isLoading={brandLoading}
                allowMultiple={true}
                variant="outlineDark"
              />
            )}

            {/* ── MODEL ── */}
            {activeFilterTab === "Model" && (
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
                variant="outlineDark"
              />
            )}

            {/* ── FUEL TYPE ── */}
            {activeFilterTab === "Fuel Type" && (
              <ChipGroup
                title=""
                selected={selectedFuelTypes}
                items={fuelTypes}
                onChange={handleFuelChange}
                isLoading={fuelLoading}
                variant="outlineDark"
              />
            )}

            {/* ── TRANSMISSION ── */}
            {activeFilterTab === "Transmission" && (
              <ChipGroup
                title=""
                items={transmissionTypes}
                selected={selectedTransmissionTypes}
                onChange={handleTransmissionChange}
                isLoading={transmissionLoading}
                variant="outlineDark"
              />
            )}

            {/* ── YEAR ── */}
            {activeFilterTab === "Year" && (
              <ChipGroup
                title=""
                items={years}
                selected={selectedYear}
                onChange={handleYearChange}
                allowMultiple={true}
                isLoading={yearLoading}
                variant="outlineDark"
                customEmptyMessage={
                  selectedModels.length === 0
                    ? "Please first select a Model"
                    : undefined
                }
              />
            )}

            {/* ── VARIANT ── */}
            {activeFilterTab === "Variant" && (
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
                variant="outlineDark"
                customEmptyMessage={
                  selectedModels.length === 0 || selectedFuelTypes.length === 0
                    ? "Please first select Model and Fuel Type"
                    : undefined
                }
              />
            )}

            {/* ── KM DRIVEN ── */}
            {activeFilterTab === "KM Driven" && (
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
                    step={1}
                    value={kmDistance}
                    onChange={(e) => setKmDistance(Number(e.target.value))}
                    onTouchEnd={handlePriceChangeRelease}
                    className="dual-range z-30"
                  />
                </div>
                <div className="flex justify-between text-xs text-secondary/70 mb-1">
                  <span>
                    <strong>{kmDistance.toLocaleString()} km</strong>
                  </span>
                </div>
              </div>
            )}

            {/* ── BODY TYPE ── */}
            {activeFilterTab === "Body Type" && (
              <ChipGroup
                title=""
                items={vehicleTypes}
                selected={selectedBodyType}
                onChange={setSelectedBodyType}
                variant="outlineDark"
              />
            )}

            {/* ── RATING ── */}
            {activeFilterTab === "Rating" && (
              <ChipGroup
                title=""
                items={ratings}
                selected={selectedRating}
                onChange={setSelectedRating}
                allowMultiple={true}
                variant="outlineDark"
              />
            )}

            {/* ── SELLER TYPE ── */}
            {activeFilterTab === "Seller Type" && (
              <ChipGroup
                title=""
                items={sellerType}
                selected={selectedSellerType}
                onChange={setSelectedSellerType}
                allowMultiple={true}
                variant="outlineDark"
              />
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="w-full p-4 border-t border-third/40 bg-primary shrink-0 flex gap-3">
          <Button
            variant="outline"
            showIcon={false}
            className="flex-1 text-secondary border-secondary/40 hover:bg-secondary/10"
            onClick={() => {
              handleClearFilters();
              setMobileFilterOpen(false);
            }}
          >
            Clear All
          </Button>
          <Button
            variant="default"
            showIcon={false}
            className="flex-1"
            onClick={() => setMobileFilterOpen(false)}
          >
            Show Results
          </Button>
        </div>
      </div>
    </div>
  );
}
