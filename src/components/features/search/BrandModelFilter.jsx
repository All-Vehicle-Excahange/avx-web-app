"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Search, ChevronDown, Check, Minus, Loader2 } from "lucide-react";
import {
  getBrandsWithModels,
  getAndSearchMakers,
  getAndSearchModel,
} from "@/services/filter";
import InputField from "@/components/ui/inputField";

export default function BrandModelFilter({
  selectedBrands = [],
  onBrandChange,
  selectedModels = [],
  onModelChange,
  apiBodyType = "FOUR_WHEELER",
  isMobile = false,
  onBrandsLoaded,
  onModelsLoaded,
  onModelsByBrandLoaded,
  allLoadedModels = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState(new Set());
  const [modelsByBrand, setModelsByBrand] = useState({});
  const [loadingModels, setLoadingModels] = useState({});

  // ── Stable Refs to break re-render dependency cycles ──
  const allBrandsRef = useRef([]);
  const initialModelsByBrandRef = useRef({});
  const modelsByBrandRef = useRef({});
  const loadingModelsRef = useRef({});
  const onBrandsLoadedRef = useRef(onBrandsLoaded);
  const onModelsLoadedRef = useRef(onModelsLoaded);
  const onModelsByBrandLoadedRef = useRef(onModelsByBrandLoaded);
  const onModelChangeRef = useRef(onModelChange);
  const onBrandChangeRef = useRef(onBrandChange);
  const selectedModelsRef = useRef(selectedModels);
  const selectedBrandsRef = useRef(selectedBrands);
  const abortControllerRef = useRef(null);
  const lastSearchKeyRef = useRef("");

  useEffect(() => {
    onBrandsLoadedRef.current = onBrandsLoaded;
  }, [onBrandsLoaded]);

  useEffect(() => {
    onModelsLoadedRef.current = onModelsLoaded;
  }, [onModelsLoaded]);

  useEffect(() => {
    onModelsByBrandLoadedRef.current = onModelsByBrandLoaded;
  }, [onModelsByBrandLoaded]);

  useEffect(() => {
    onModelChangeRef.current = onModelChange;
  }, [onModelChange]);

  useEffect(() => {
    onBrandChangeRef.current = onBrandChange;
  }, [onBrandChange]);

  useEffect(() => {
    selectedModelsRef.current = selectedModels;
  }, [selectedModels]);

  useEffect(() => {
    selectedBrandsRef.current = selectedBrands;
  }, [selectedBrands]);

  useEffect(() => {
    modelsByBrandRef.current = modelsByBrand;
  }, [modelsByBrand]);

  // 1. Fetch all initial brands for vehicle type
  useEffect(() => {
    let isMounted = true;
    const fetchInitialData = async () => {
      setBrandsLoading(true);
      try {
        let list = null;

        // Attempt new brands-with-models endpoint first
        try {
          const res = await getBrandsWithModels({
            bodyType: apiBodyType,
            page: 1,
            limit: 100,
            sortDir: "asc",
          });

          if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
            list = res.data
              .map((item) => {
                const bModels = Array.isArray(item.models)
                  ? item.models
                      .map((m) => ({
                        value: m.modelId.toString(),
                        label: m.modelDisplayName || m.modelName,
                        count:
                          typeof m.vehicleCount === "number"
                            ? m.vehicleCount
                            : typeof m.count === "number"
                              ? m.count
                              : null,
                      }))
                      .filter((m) => m.label && m.label.trim() !== "")
                  : [];

                return {
                  value: item.makeId.toString(),
                  label: item.makeDisplay || item.makeName,
                  logo: item.logo,
                  count:
                    typeof item.vehicleCount === "number"
                      ? item.vehicleCount
                      : typeof item.count === "number"
                        ? item.count
                        : null,
                  models: bModels,
                };
              })
              .filter((item) => item.label && item.label.trim() !== "");

            // Cache returned models
            const modelsMap = {};
            list.forEach((b) => {
              if (b.models && b.models.length > 0) {
                modelsMap[b.value] = b.models;
                onModelsLoadedRef.current?.(b.models);
              }
            });
            if (Object.keys(modelsMap).length > 0 && isMounted) {
              initialModelsByBrandRef.current = { ...modelsMap };
              setModelsByBrand((prev) => ({ ...prev, ...modelsMap }));
              onModelsByBrandLoadedRef.current?.(modelsMap);
            }
          }
        } catch {
          // If brands-with-models is still deploying / 404, fallback handles it
        }

        // Fallback: If new API returned nothing or threw error, use getAndSearchMakers
        if (!list) {
          const fallbackRes = await getAndSearchMakers({
            page: 1,
            limit: 100,
            bodyType: apiBodyType,
          });

          if (fallbackRes?.success && Array.isArray(fallbackRes.data)) {
            list = fallbackRes.data
              .map((item) => ({
                value: item.makeId.toString(),
                label: item.makeDisplay || item.makeName,
                logo: item.logo,
                count:
                  typeof item.vehicleCount === "number"
                    ? item.vehicleCount
                    : typeof item.count === "number"
                      ? item.count
                      : null,
              }))
              .filter((item) => item.label && item.label.trim() !== "");
          }
        }

        if (list && isMounted) {
          list.sort((a, b) => {
            if (
              typeof a.count === "number" &&
              typeof b.count === "number" &&
              b.count !== a.count
            ) {
              return b.count - a.count;
            }
            return a.label.localeCompare(b.label);
          });

          allBrandsRef.current = list;
          setAllBrands(list);
          setBrands(list);
          onBrandsLoadedRef.current?.(list);
        }
      } catch (err) {
        console.error("Failed to load brands in BrandModelFilter:", err);
      } finally {
        if (isMounted) setBrandsLoading(false);
      }
    };

    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, [apiBodyType]);

  // 2. Fetch models for a brand on demand
  const fetchModelsForBrand = useCallback(
    async (brandId, force = false) => {
      if (!force && modelsByBrandRef.current[brandId] && modelsByBrandRef.current[brandId].length > 1) {
        return modelsByBrandRef.current[brandId];
      }
      if (loadingModelsRef.current[brandId]) {
        return modelsByBrandRef.current[brandId] || [];
      }
      loadingModelsRef.current[brandId] = true;
      setLoadingModels((prev) => ({ ...prev, [brandId]: true }));
      try {
        const res = await getAndSearchModel({
          maker_id: brandId,
          page: 1,
          limit: 100,
          bodyType: apiBodyType,
        });

        if (res?.success && Array.isArray(res.data)) {
          const mapped = res.data
            .map((item) => ({
              value: item.modelId.toString(),
              label: item.modelDisplayName || item.modelName,
              makerId: brandId.toString(),
              count:
                typeof item.vehicleCount === "number"
                  ? item.vehicleCount
                  : typeof item.count === "number"
                    ? item.count
                    : null,
            }))
            .filter((item) => item.label && item.label.trim() !== "");

          mapped.sort((a, b) => {
            if (
              typeof a.count === "number" &&
              typeof b.count === "number" &&
              b.count !== a.count
            ) {
              return b.count - a.count;
            }
            return a.label.localeCompare(b.label);
          });

          initialModelsByBrandRef.current[brandId] = mapped;
          modelsByBrandRef.current[brandId] = mapped;
          setModelsByBrand((prev) => ({ ...prev, [brandId]: mapped }));
          onModelsLoadedRef.current?.(mapped);
          onModelsByBrandLoadedRef.current?.({ [brandId]: mapped });
          return mapped;
        }
        return [];
      } catch (err) {
        console.error(`Failed to load models for brand ${brandId}:`, err);
        return [];
      } finally {
        delete loadingModelsRef.current[brandId];
        setLoadingModels((prev) => ({ ...prev, [brandId]: false }));
      }
    },
    [apiBodyType],
  );

  // 3. Auto-load models if brand is in selectedBrands
  const selectedBrandsStr = selectedBrands.join(",");
  useEffect(() => {
    selectedBrands.forEach((bId) => {
      if (!modelsByBrandRef.current[bId] && !loadingModelsRef.current[bId]) {
        fetchModelsForBrand(bId);
      }
    });
  }, [selectedBrandsStr, fetchModelsForBrand, selectedBrands]);

  // 4. If selectedModels are set, auto-expand parent brand
  useEffect(() => {
    if (selectedModels.length > 0 && selectedBrands.length > 0) {
      setExpandedBrands((prev) => {
        const next = new Set(prev);
        selectedBrands.forEach((bId) => next.add(bId));
        return next;
      });
    }
  }, [selectedModels, selectedBrands]);

  // 5. Expand / Collapse brand accordion
  const handleToggleExpand = useCallback(
    (brandId) => {
      setExpandedBrands((prev) => {
        const next = new Set(prev);
        if (next.has(brandId)) {
          next.delete(brandId);
        } else {
          next.add(brandId);
          const hasFullModels =
            (modelsByBrandRef.current[brandId] && modelsByBrandRef.current[brandId].length > 1) ||
            (initialModelsByBrandRef.current[brandId] && initialModelsByBrandRef.current[brandId].length > 1);
          if (!hasFullModels && !loadingModelsRef.current[brandId]) {
            fetchModelsForBrand(brandId, true);
          }
        }
        return next;
      });
    },
    [fetchModelsForBrand],
  );

  // 6. Parent Brand Checkbox Toggle
  const handleToggleBrand = useCallback(
    (brand) => {
      const brandId = String(brand.value);
      const isCurrentlySelected = selectedBrands.some((id) => String(id) === brandId);

      const brandModels =
        (modelsByBrandRef.current[brandId] && modelsByBrandRef.current[brandId].length > 1)
          ? modelsByBrandRef.current[brandId]
          : (initialModelsByBrandRef.current[brandId] && initialModelsByBrandRef.current[brandId].length > 1)
            ? initialModelsByBrandRef.current[brandId]
            : brand.models || [];
      const bModelIds = new Set((brandModels || []).map((m) => String(m.value)));

      const hasModelRestrictions =
        selectedModels.some((id) => bModelIds.has(String(id))) ||
        (allLoadedModels || []).some(
          (m) =>
            String(m.makerId) === brandId &&
            selectedModels.some((id) => String(id) === String(m.value || m.modelId)),
        );
      const allModelsSelected =
        brandModels.length > 0 &&
        brandModels.every((m) => selectedModels.some((id) => String(id) === String(m.value)));

      const isFullyChecked = isCurrentlySelected && (!hasModelRestrictions || allModelsSelected);

      if (isFullyChecked) {
        // Deselect only this brand and remove only its models
        const nextBrands = selectedBrands.filter((id) => String(id) !== brandId);
        const nextModels = selectedModels.filter(
          (id) =>
            !bModelIds.has(String(id)) &&
            !(allLoadedModels || []).some(
              (m) => String(m.makerId) === brandId && String(m.value || m.modelId) === String(id),
            ),
        );
        onBrandChange?.(nextBrands);
        onModelChange?.(nextModels);
      } else {
        // Select this brand fully: add to selectedBrands and clear specific model restrictions for this brand
        const nextBrands = [...selectedBrands.filter((id) => String(id) !== brandId), brandId];
        const nextModels = selectedModels.filter(
          (id) =>
            !bModelIds.has(String(id)) &&
            !(allLoadedModels || []).some(
              (m) => String(m.makerId) === brandId && String(m.value || m.modelId) === String(id),
            ),
        );
        onBrandChange?.(nextBrands);
        onModelChange?.(nextModels);
        setExpandedBrands((prev) => new Set(prev).add(brandId));
        if (!modelsByBrandRef.current[brandId] || modelsByBrandRef.current[brandId].length <= 1) {
          fetchModelsForBrand(brandId, true);
        }
      }
    },
    [onBrandChange, onModelChange, selectedBrands, selectedModels, allLoadedModels, fetchModelsForBrand],
  );

  // 7. Individual Model Checkbox Toggle
  const handleToggleModel = useCallback(
    (brand, model) => {
      const brandId = String(brand.value);
      const modelId = String(model.value);

      const brandModels =
        (modelsByBrandRef.current[brandId] && modelsByBrandRef.current[brandId].length > 1)
          ? modelsByBrandRef.current[brandId]
          : (initialModelsByBrandRef.current[brandId] && initialModelsByBrandRef.current[brandId].length > 1)
            ? initialModelsByBrandRef.current[brandId]
            : brand.models || [];
      const allModelIds = (brandModels || []).map((m) => String(m.value));

      const hasModelRestrictions =
        selectedModels.some((id) => allModelIds.includes(String(id))) ||
        (allLoadedModels || []).some(
          (m) =>
            String(m.makerId) === brandId &&
            selectedModels.some((id) => String(id) === String(m.value || m.modelId)),
        );
      const isBrandFullySelected =
        selectedBrands.some((id) => String(id) === brandId) && !hasModelRestrictions;

      const isModelCurrentlyChecked =
        selectedModels.some((id) => String(id) === modelId) || isBrandFullySelected;

      let nextModels;
      let nextBrands = selectedBrands.some((id) => String(id) === brandId)
        ? [...selectedBrands]
        : [...selectedBrands, brandId];

      if (isModelCurrentlyChecked) {
        if (isBrandFullySelected && allModelIds.length > 0) {
          // Unchecking a model from a fully selected brand: select all other models of this brand explicitly
          const remaining = allModelIds.filter((id) => id !== modelId);
          nextModels = Array.from(new Set([...selectedModels.map(String), ...remaining]));
        } else {
          // Uncheck this model
          nextModels = selectedModels.filter((id) => String(id) !== modelId);
          const remainingInBrand = (brandModels || []).filter((m) =>
            nextModels.some((id) => String(id) === String(m.value)),
          );
          if (remainingInBrand.length === 0 && !isBrandFullySelected) {
            nextBrands = nextBrands.filter((id) => String(id) !== brandId);
          }
        }
      } else {
        // Check this model
        nextModels = Array.from(new Set([...selectedModels.map(String), modelId]));
        if (!nextBrands.some((id) => String(id) === brandId)) {
          nextBrands.push(brandId);
        }
      }

      // Ensure full models for this brand are loaded in background so all models are visible
      if (!modelsByBrandRef.current[brandId] || modelsByBrandRef.current[brandId].length <= 1) {
        fetchModelsForBrand(brandId, true);
      }

      onModelChange?.(nextModels);
      onBrandChange?.(nextBrands);
    },
    [onBrandChange, onModelChange, selectedBrands, selectedModels, fetchModelsForBrand, allLoadedModels],
  );

  // 8. Single Solid Debounced Search Effect (350ms delay + AbortController + Duplicate Guard)
  useEffect(() => {
    const clean = searchTerm.trim().toLowerCase();

    const timer = setTimeout(async () => {
      const searchKey = `${apiBodyType}_${clean}`;
      if (lastSearchKeyRef.current === searchKey) {
        return;
      }
      lastSearchKeyRef.current = searchKey;

      // Abort any existing in-flight search request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (!clean) {
        // Search cleared -> restore all brands immediately
        setIsSearching(false);
        setBrands(allBrandsRef.current);
        return;
      }

      setIsSearching(true);
      try {
        let apiHandled = false;
        try {
          const res = await getBrandsWithModels(
            {
              bodyType: apiBodyType,
              search: clean,
              page: 1,
              limit: 50,
              sortDir: "asc",
            },
            { signal: controller.signal },
          );

          if (res?.success && Array.isArray(res.data) && !controller.signal.aborted) {
            apiHandled = true;
            const searchResults = res.data
              .map((item) => {
                const bModels = Array.isArray(item.models)
                  ? item.models
                      .map((m) => ({
                        value: m.modelId.toString(),
                        label: m.modelDisplayName || m.modelName,
                        count:
                          typeof m.vehicleCount === "number"
                            ? m.vehicleCount
                            : typeof m.count === "number"
                              ? m.count
                              : null,
                      }))
                      .filter((m) => m.label && m.label.trim() !== "")
                  : [];

                return {
                  value: item.makeId.toString(),
                  label: item.makeDisplay || item.makeName,
                  logo: item.logo,
                  count:
                    typeof item.vehicleCount === "number"
                      ? item.vehicleCount
                      : typeof item.count === "number"
                        ? item.count
                        : null,
                  matchingModels: bModels,
                  forceExpand: bModels.length > 0,
                };
              })
              .filter((item) => item.label && item.label.trim() !== "");

            // Auto-expand brands with matching models and pre-fetch their full model lists
            const toExpand = [];
            searchResults.forEach((b) => {
              if (b.matchingModels && b.matchingModels.length > 0) {
                toExpand.push(b.value);
                onModelsLoadedRef.current?.(b.matchingModels);
                if (!modelsByBrandRef.current[b.value] || modelsByBrandRef.current[b.value].length <= 1) {
                  fetchModelsForBrand(b.value);
                }
              }
            });
            if (toExpand.length > 0) {
              setExpandedBrands((prev) => {
                const next = new Set(prev);
                toExpand.forEach((id) => next.add(id));
                return next;
              });
            }

            setBrands(searchResults);
          }
        } catch {
          // If aborted or endpoint not ready, handled below
        }

        // Resilient Fallback: Client-side search across allBrandsRef & modelsByBrandRef
        if (!apiHandled && !controller.signal.aborted) {
          const clientMatches = allBrandsRef.current
            .map((brand) => {
              const brandMatch = brand.label.toLowerCase().includes(clean);
              const brandModels = modelsByBrandRef.current[brand.value] || [];
              const matchingModels = brandModels.filter((m) =>
                m.label.toLowerCase().includes(clean),
              );

              if (brandMatch || matchingModels.length > 0) {
                return {
                  ...brand,
                  matchingModels,
                  forceExpand: matchingModels.length > 0,
                };
              }
              return null;
            })
            .filter(Boolean);

          setBrands(clientMatches);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Search error in BrandModelFilter:", err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 350); // 350ms clean debounce

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, apiBodyType]);

  const cleanSearch = searchTerm.trim().toLowerCase();

  const filteredBrands = useMemo(() => {
    let list = [...brands];

    // Priority sort: Selected brands appear at the TOP!
    list.sort((a, b) => {
      const aSelected =
        selectedBrands.includes(a.value) ||
        (modelsByBrand[a.value] || []).some((m) => selectedModels.includes(m.value));
      const bSelected =
        selectedBrands.includes(b.value) ||
        (modelsByBrand[b.value] || []).some((m) => selectedModels.includes(m.value));

      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;

      return a.label.localeCompare(b.label);
    });

    return list;
  }, [brands, modelsByBrand, selectedBrands, selectedModels]);

  return (
    <div className={`w-full flex flex-col ${isMobile ? "text-secondary" : "text-primary"}`}>
      {/* ── TOP UNIFIED SEARCH BAR ── */}
      <div className="mb-3">
        <InputField
          variant={isMobile ? "default" : "colored"}
          placeholder="Search Brand or Model..."
          icon={isSearching ? Loader2 : Search}
          className={isSearching ? "[&_svg]:animate-spin" : ""}
          clearable={true}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
        />
      </div>

      {/* ── BRANDS & MODELS LIST ── */}
      <div
        className={`space-y-1 overflow-y-auto custom-scrollbar pr-1 select-none ${
          isMobile ? "max-h-[calc(100vh-280px)]" : "max-h-[380px]"
        }`}
      >
        {brandsLoading && brands.length === 0 ? (
          <div className="space-y-2 py-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5 animate-pulse">
                <div className={`w-4 h-4 rounded ${isMobile ? "bg-secondary/10" : "bg-white/10"}`} />
                <div className={`w-5 h-5 rounded ${isMobile ? "bg-secondary/10" : "bg-white/10"}`} />
                <div className={`h-4 w-24 rounded ${isMobile ? "bg-secondary/10" : "bg-white/10"}`} />
              </div>
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className={`text-center py-6 text-xs ${isMobile ? "text-secondary/60" : "text-third"}`}>
            No brands or models match &ldquo;{searchTerm}&rdquo;
          </div>
        ) : (
          filteredBrands.map((brand) => {
            const brandId = brand.value;
            const fullBrandModels =
              (modelsByBrand[brandId] && modelsByBrand[brandId].length > 1)
                ? modelsByBrand[brandId]
                : (initialModelsByBrandRef.current[brandId] && initialModelsByBrandRef.current[brandId].length > 1)
                  ? initialModelsByBrandRef.current[brandId]
                  : (brand.models && brand.models.length > 1)
                    ? brand.models
                    : (modelsByBrandRef.current[brandId] && modelsByBrandRef.current[brandId].length > 1)
                      ? modelsByBrandRef.current[brandId]
                      : modelsByBrand[brandId] || initialModelsByBrandRef.current[brandId] || brand.models || [];
            const isLoadingThisBrandModels = loadingModels[brandId];

            const modelsToRender =
              cleanSearch && brand.matchingModels !== undefined
                ? brand.matchingModels.length > 0
                  ? brand.matchingModels
                  : fullBrandModels
                : fullBrandModels;

            const selectedModelsInBrand = (fullBrandModels || []).filter((m) =>
              selectedModels.some((id) => String(id) === String(m.value)),
            );

            // Determine Parent Checkbox state:
            // 1) Checked: Brand is in selectedBrands AND (all loaded models are checked OR no model restrictions exist)
            // 2) Indeterminate: Some models are checked, but not all
            // 3) Unchecked: Brand not in selectedBrands AND no models checked
            const hasModelRestrictions =
              selectedModelsInBrand.length > 0 ||
              (allLoadedModels || []).some(
                (m) =>
                  String(m.makerId) === String(brandId) &&
                  selectedModels.some((id) => String(id) === String(m.value || m.modelId)),
              );
            const isBrandSelected =
              selectedBrands.some((id) => String(id) === String(brandId)) ||
              hasModelRestrictions;
            const allModelsSelected =
              fullBrandModels.length > 0 &&
              fullBrandModels.every((m) => selectedModels.some((id) => String(id) === String(m.value)));
            const someModelsSelected =
              hasModelRestrictions && !allModelsSelected;

            const isChecked =
              isBrandSelected &&
              (!hasModelRestrictions || allModelsSelected);
            const isIndeterminate = isBrandSelected && someModelsSelected;

            const isExpanded =
              expandedBrands.has(brandId) || (cleanSearch && brand.forceExpand);

            const sortedModelsToRender =
              selectedModelsInBrand.length > 0 && !allModelsSelected
                ? [...modelsToRender].sort((a, b) => {
                  const aChecked = selectedModels.includes(a.value);
                  const bChecked = selectedModels.includes(b.value);
                  if (aChecked && !bChecked) return -1;
                  if (!aChecked && bChecked) return 1;
                  return a.label.localeCompare(b.label);
                })
                : modelsToRender;

            return (
              <div key={brandId} className="rounded-lg transition-all group">
                {/* Brand Row (Entire row clickable with cursor-pointer) */}
                <div
                  onClick={() => handleToggleExpand(brandId)}
                  className="flex items-center justify-between py-1.5 px-1 rounded-lg transition-colors bg-transparent cursor-pointer select-none"
                >
                  {/* Left: Checkbox + Logo + Brand Name */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Checkbox (stopPropagation so checkbox only selects/deselects) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBrand(brand);
                      }}
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        isChecked || isIndeterminate
                          ? "bg-fourth text-white border border-fourth shadow-sm"
                          : isMobile
                            ? "border border-secondary/40 bg-black/5 hover:border-fourth"
                            : "border border-third/50 bg-white/5 hover:border-fourth"
                      }`}
                      aria-label={`Select ${brand.label}`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
                      {isIndeterminate && <Minus size={11} strokeWidth={3.5} />}
                    </button>

                    {/* Logo & Name Area */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {brand.logo ? (
                        <div
                          className={`w-7 h-5 rounded bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs border overflow-hidden ${
                            isMobile ? "border-secondary/20" : "border-white/20"
                          }`}
                        >
                          <img
                            src={brand.logo}
                            alt={brand.label}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              const parent = e.currentTarget.parentElement;
                              if (parent) parent.style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-7 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 border ${
                            isMobile
                              ? "bg-secondary/10 text-secondary border-secondary/20"
                              : "bg-white/10 text-third border-white/10"
                          }`}
                        >
                          {brand.label.charAt(0)}
                        </div>
                      )}
                      <span
                        className={`text-xs font-medium truncate ${
                          isChecked || isIndeterminate
                            ? isMobile
                              ? "text-secondary font-semibold"
                              : "text-primary font-semibold"
                            : isMobile
                              ? "text-secondary/90 group-hover:text-secondary"
                              : "text-primary/90 group-hover:text-primary"
                        }`}
                      >
                        {brand.label}
                      </span>
                    </div>
                  </div>

                  {/* Right: Dynamic Vehicle Count & Chevron Arrow */}
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {typeof brand.count === "number" && brand.count > 0 && (
                      <span
                        className={`text-[11px] font-normal select-none ${
                          isMobile ? "text-secondary/60" : "text-third"
                        }`}
                      >
                        ({brand.count})
                      </span>
                    )}
                    <div
                      className={`p-1 transition-transform ${
                        isMobile
                          ? "text-secondary/60 group-hover:text-secondary"
                          : "text-third group-hover:text-primary"
                      }`}
                      aria-label={isExpanded ? "Collapse models" : "Expand models"}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-fourth" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-item Models (Indented with smooth accordion transition) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`ml-5 pl-3 py-1 space-y-1 mt-1 ${
                        isMobile ? "border-l border-secondary/20" : "border-l border-third/20"
                      }`}
                    >
                      {isLoadingThisBrandModels && sortedModelsToRender.length === 0 ? (
                        <div className="space-y-1.5 py-1 px-1">
                          <div
                            className={`h-3.5 w-24 animate-pulse rounded ${
                              isMobile ? "bg-secondary/10" : "bg-white/10"
                            }`}
                          />
                          <div
                            className={`h-3.5 w-20 animate-pulse rounded ${
                              isMobile ? "bg-secondary/10" : "bg-white/10"
                            }`}
                          />
                        </div>
                      ) : sortedModelsToRender.length === 0 ? (
                        <div
                          className={`text-[11px] py-1 px-1 ${
                            isMobile ? "text-secondary/60" : "text-third/70"
                          }`}
                        >
                          No models found
                        </div>
                      ) : (
                        sortedModelsToRender.map((model) => {
                          const isModelChecked =
                            selectedModels.some((id) => String(id) === String(model.value)) ||
                            (!hasModelRestrictions && isBrandSelected);

                          return (
                            <div
                              key={model.value}
                              onClick={() => handleToggleModel(brand, model)}
                              className="flex items-center justify-between py-1 px-1 rounded-md transition-colors cursor-pointer group/model bg-transparent"
                            >
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                {/* Model Checkbox */}
                                <div
                                  className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 transition-all ${
                                    isModelChecked
                                      ? "bg-fourth text-white border border-fourth shadow-xs"
                                      : isMobile
                                        ? "border border-secondary/40 bg-black/5 group-hover/model:border-fourth"
                                        : "border border-third/50 bg-white/5 group-hover/model:border-fourth"
                                  }`}
                                >
                                  {isModelChecked && <Check size={10} strokeWidth={3} />}
                                </div>
                                <span
                                  className={`text-xs truncate ${
                                    isModelChecked
                                      ? isMobile
                                        ? "text-secondary font-medium"
                                        : "text-primary font-medium"
                                      : isMobile
                                        ? "text-secondary/80 group-hover/model:text-secondary"
                                        : "text-third group-hover/model:text-primary"
                                  }`}
                                >
                                  {model.label}
                                </span>
                              </div>

                              {/* Dynamic Model Count */}
                              {typeof model.count === "number" && model.count > 0 && (
                                <span
                                  className={`text-[11px] ml-2 shrink-0 select-none ${
                                    isMobile ? "text-secondary/60" : "text-third/70"
                                  }`}
                                >
                                  ({model.count})
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
