"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { MapPin, ChevronDown, Search, X, LocateFixed, Clock, Building2, ChevronRight, Check } from "lucide-react";
import { getPopularCityAndState, getAllCities } from "@/services/filter";
import { getUserCityAndStateByLatLong } from "@/services/consult.filter.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLocationStore } from "@/stores/useLocationStore";
import { checkIsMetaExist, createUserMeta, updateuserProfileMeta, getuserProfileMeta } from "@/services/user.service";
import { setPreferredLocation } from "@/lib/amplitude";
import { useQueryClient } from "@tanstack/react-query";
import useEscapeKey from "@/hooks/useEscapeKey";

function IndiaFlag({ className = "w-4 h-3" }) {
  return (
    <svg className={`rounded-[2px] shadow-xs shrink-0 ${className}`} viewBox="0 0 24 16" fill="none">
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
      <rect y="10.66" width="24" height="5.33" fill="#138808" />
      <circle cx="12" cy="8" r="2" stroke="#000080" strokeWidth="0.7" fill="none" />
      <circle cx="12" cy="8" r="0.6" fill="#000080" />
    </svg>
  );
}

export default function CitySelector({ heroMode = false, scrolled = false, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCity, stateName, cityId, stateId, setLocation } = useLocationStore();
  const [isLocating, setIsLocating] = useState(false);
  const [popularCities, setPopularCities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const modalRef = useRef(null);
  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 150);
  };

  // Close modal on Escape key press
  useEscapeKey(isOpen, handleClose);

  // Initialize selected city from logged-in user profile metadata if available
  useEffect(() => {
    const { isLoggedIn } = useAuthStore.getState();
    if (isLoggedIn) {
      getuserProfileMeta()
        .then((res) => {
          const userCity = res?.data?.city?.name || res?.data?.cityName;
          const userCityId = res?.data?.city?.id || res?.data?.cityId;
          const userStateId = res?.data?.state?.id || res?.data?.stateId;
          const userStateName = res?.data?.state?.name || res?.data?.stateName;
          if (userCity) {
            setLocation({
              cityName: userCity,
              cityId: userCityId || null,
              stateId: userStateId || null,
              stateName: userStateName || "",
            });
            if (typeof window !== "undefined") {
              localStorage.setItem("user_selected_city", userCity);
            }
          }
        })
        .catch(() => { });
    }
  }, [setLocation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popRes, allRes] = await Promise.allSettled([
          popularCities.length === 0 ? getPopularCityAndState() : Promise.resolve(null),
          allCities.length === 0 ? getAllCities() : Promise.resolve(null),
        ]);

        if (popRes.status === "fulfilled" && popRes.value?.data) {
          setPopularCities(Array.isArray(popRes.value.data) ? popRes.value.data : []);
        }
        if (allRes.status === "fulfilled" && allRes.value?.data) {
          setAllCities(Array.isArray(allRes.value.data) ? allRes.value.data : []);
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    if (isOpen || !stateName || !cityId || !stateId) {
      fetchData();
    }
  }, [isOpen, stateName, cityId, stateId]);

  // Dynamically resolve and sync cityId, stateId, and stateName from API data
  useEffect(() => {
    if (selectedCity && (!stateName || !cityId || !stateId) && (popularCities.length > 0 || allCities.length > 0)) {
      const cityList = [...popularCities, ...allCities];
      const match = cityList.find(
        (c) =>
          (c.cityName || c.name || c.city)?.toLowerCase() ===
          selectedCity.toLowerCase(),
      );
      if (match) {
        setLocation({
          cityName: match.cityName || match.name || match.city || selectedCity,
          cityId: match.cityId || match.id || cityId || null,
          stateId: match.stateId || match.state?.id || stateId || null,
          stateName: match.stateName || match.state || stateName || "",
        });
      }
    }
  }, [selectedCity, stateName, cityId, stateId, popularCities, allCities, setLocation]);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await getUserCityAndStateByLatLong({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          if (res.data && res.data.cityName) {
            handleSelect(res.data.cityName, res.data);
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLocating(false);
      }
    );
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent background scroll without hiding the scrollbar (prevents layout shift glitch)
  useEffect(() => {
    if (!isOpen) return;

    const preventBackgroundScroll = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isOpen]);

  const handleSelect = async (cityOrName, fullCityObj = null) => {
    const cityName = typeof cityOrName === "string" ? cityOrName : (cityOrName?.cityName || cityOrName?.name || "");
    let cityItem = fullCityObj || (typeof cityOrName === "object" ? cityOrName : null);

    if (!cityItem) {
      cityItem =
        allCities.find((c) => (c.cityName || c.name || c.city)?.toLowerCase() === cityName.toLowerCase()) ||
        popularCities.find((c) => (c.cityName || c.name || c.city)?.toLowerCase() === cityName.toLowerCase());
    }

    const stateNameVal = cityItem?.stateName || cityItem?.state || (cityName.toLowerCase() === "palanpur" ? "Gujarat" : "");
    const cityId = cityItem?.cityId || cityItem?.id;
    const stateId = cityItem?.stateId || cityItem?.state?.id;

    setLocation({
      cityName,
      cityId: cityId || null,
      stateId: stateId || null,
      stateName: stateNameVal || "",
    });
    handleClose();
    setSearchQuery("");

    // Persist in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user_selected_city", cityName);
      if (stateNameVal) localStorage.setItem("user_selected_state", stateNameVal);
      if (cityId) localStorage.setItem("user_selected_city_id", String(cityId));
      if (stateId) localStorage.setItem("user_selected_state_id", String(stateId));
    }

    // Track preferred location
    setPreferredLocation({
      city: cityName || undefined,
      state: stateNameVal || undefined,
    });

    // If user is logged in, sync with user profile metadata API
    const { isLoggedIn } = useAuthStore.getState();
    if (isLoggedIn && (cityId || stateId)) {
      try {
        const metaExistRes = await checkIsMetaExist();
        const isMetaExist = metaExistRes?.data === true;

        const payload = {};
        if (cityId) payload.cityId = cityId;
        if (stateId) payload.stateId = stateId;

        if (isMetaExist) {
          await updateuserProfileMeta(payload);
        } else {
          await createUserMeta(payload);
        }

        if (queryClient) {
          queryClient.invalidateQueries({ queryKey: ["user-profile-meta"] });
          queryClient.invalidateQueries({ queryKey: ["user-meta-exists"] });
        }
      } catch (err) {
        console.error("Failed to update user profile meta:", err);
      }
    }
  };

  const isSearching = searchQuery.trim().length > 0;

  const popularCityNames = useMemo(() => {
    return new Set(
      popularCities.map((c) => (c.cityName || c.name || c.city || "").toLowerCase())
    );
  }, [popularCities]);

  const filteredCities = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.toLowerCase().trim();

    return allCities
      .map((city) => {
        const name = (city.cityName || city.name || city.city || "").toLowerCase();
        const state = (city.stateName || city.state || "").toLowerCase();
        const isPop = popularCityNames.has(name);

        let priority = -1;
        if (name === q) {
          priority = 0; // Exact match
        } else if (name.startsWith(q)) {
          priority = isPop ? 1 : 2; // Popular cities starting with query come before lesser-known towns
        } else if (name.split(/\s+/).some((w) => w.startsWith(q))) {
          priority = isPop ? 3 : 4; // Word in name starts with query (e.g. Navi Mumbai)
        } else if (name.includes(q)) {
          priority = 5; // Contains query
        } else if (state.startsWith(q)) {
          priority = 6; // State starts with query
        }

        return { city, priority, name, isPop };
      })
      .filter((item) => item.priority !== -1)
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.name.localeCompare(b.name);
      })
      .map((item) => item.city)
      .slice(0, 10); // Limit to top 10 most relevant records
  }, [allCities, searchQuery, isSearching, popularCityNames]);

  const displayLocation = useMemo(() => {
    if (!selectedCity) return "Select Location";
    const cityClean = selectedCity.trim();
    if (stateName && stateName.trim()) {
      return `${cityClean}, ${stateName.trim()}`;
    }
    const found =
      popularCities.find(
        (c) =>
          (c.cityName || c.name || c.city)?.toLowerCase() ===
          cityClean.toLowerCase(),
      ) ||
      allCities.find(
        (c) =>
          (c.cityName || c.name || c.city)?.toLowerCase() ===
          cityClean.toLowerCase(),
      );
    if (found?.stateName || found?.state) {
      return `${cityClean}, ${found.stateName || found.state}`;
    }
    if (cityClean.toLowerCase() === "palanpur") {
      return "Palanpur, Gujarat";
    }
    return cityClean;
  }, [selectedCity, stateName, popularCities, allCities]);

  return (
    <>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 md:gap-2 px-2 py-0.5 md:py-1 rounded hover:bg-white/10 active:bg-white/15 transition-all duration-200 text-xs sm:text-[13px] font-medium text-primary cursor-pointer shrink-0 select-none ${className}`}
        aria-label="Select City"
      >
        <IndiaFlag className="w-4 h-3" />
        <span className="truncate max-w-[160px] sm:max-w-[240px] md:max-w-[320px] font-secondary font-semibold text-primary">
          {displayLocation}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-third shrink-0" />
      </button>

      {/* Modal Overlay via Portal */}
      {(isOpen || isClosing) && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm overscroll-contain"
          style={{
            animation: isClosing
              ? "modalBackdropOut 0.15s ease-in forwards"
              : "modalBackdropIn 0.15s ease-out",
          }}
        >
          {/* Modal Content */}
          <div
            ref={modalRef}
            className="bg-white w-full max-w-2xl h-[80vh] sm:h-auto sm:max-h-[85vh] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] flex flex-col border border-gray-100 overflow-hidden relative overscroll-contain"
            style={{
              animation: isClosing
                ? "modalCardOut 0.15s ease-in forwards"
                : "modalCardIn 0.15s ease-out",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-fourth/10 text-fourth flex items-center justify-center rounded-xl shrink-0 border border-fourth/15">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight font-primary">Select your location</h2>
                  <p className="text-xs text-gray-500 font-medium font-secondary">Find vehicles and consultants near you</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar & Current Location */}
            <div className="px-4 sm:px-6 py-3.5 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg py-2 pl-9 pr-9 focus:outline-none focus:border-fourth focus:ring-2 focus:ring-fourth/10 transition-all text-xs sm:text-[13px] font-medium font-secondary shadow-xs"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={handleCurrentLocation}
                disabled={isLocating}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-fourth/10 border border-fourth/20 rounded-lg hover:bg-fourth/15 hover:border-fourth/30 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                title="Detect current location"
              >
                <LocateFixed className={`w-4 h-4 text-fourth ${isLocating ? 'animate-spin' : ''}`} />
                <span className="text-fourth font-bold text-xs sm:text-[13px] whitespace-nowrap font-primary">
                  {isLocating ? "Locating..." : "Detect Location"}
                </span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 custom-scrollbar space-y-4 overscroll-contain">
              {isSearching ? (
                /* Search Results View */
                <div>
                  <div className="flex items-center justify-between mb-3 px-0.5">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider font-primary">
                      Search Results {filteredCities.length > 0 && <span className="text-gray-400 font-normal">({filteredCities.length})</span>}
                    </h3>
                  </div>

                  {filteredCities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {filteredCities.map((city, idx) => {
                        const cityName = city.cityName || city.name || city.city;
                        const stateName = city.stateName || city.state || "";
                        const cityId = city.cityId || city.id || `${cityName}-${idx}`;
                        const isSelected = selectedCity?.toLowerCase() === cityName?.toLowerCase();

                        return (
                          <button
                            key={cityId}
                            onClick={() => handleSelect(cityName, city)}
                            className={`relative flex items-center p-3 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                              ? "bg-fourth/[0.08] border-fourth shadow-xs"
                              : "bg-white border-gray-100 hover:border-fourth/40 hover:bg-gray-50/80"
                              }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                              <div
                                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-fourth/20 text-fourth" : "bg-gray-100 text-gray-400"
                                  }`}
                              >
                                <Building2 className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={`text-xs sm:text-[13px] font-bold font-primary whitespace-nowrap transition-colors ${isSelected ? "text-fourth" : "text-gray-900"}`}>
                                  {cityName}
                                </div>
                                {stateName && <div className="text-[11px] text-gray-400 font-medium font-secondary whitespace-nowrap">{stateName}</div>}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-fourth rounded-full flex items-center justify-center shrink-0 shadow-xs">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-10 flex flex-col items-center justify-center text-center">
                      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2.5">
                        <Search className="w-5 h-5" />
                      </div>
                      <p className="text-gray-900 text-xs sm:text-sm font-semibold font-primary">No cities found</p>
                      <p className="text-gray-400 text-xs mt-0.5 font-secondary">No match for &ldquo;{searchQuery}&rdquo;</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Popular Cities View */
                <div>
                  <div className="flex items-center justify-between mb-3 px-0.5">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider font-primary">Popular Cities</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {isLoadingCities ? (
                      Array(9).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-100 border border-gray-200/60 rounded-xl h-[54px]"></div>
                      ))
                    ) : (
                      popularCities.map((city) => {
                        const isSelected = selectedCity === city.cityName;
                        return (
                          <button
                            key={city.cityId}
                            onClick={() => handleSelect(city.cityName, city)}
                            className={`relative flex items-center p-3 rounded-xl border text-left transition-all cursor-pointer group ${isSelected
                              ? "bg-fourth/[0.08] border-fourth shadow-xs"
                              : "bg-white border-gray-100 hover:border-fourth/40 hover:bg-gray-50/80 hover:shadow-xs"
                              }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                              <div
                                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-fourth/20 text-fourth" : "bg-gray-100 text-gray-400 group-hover:text-fourth group-hover:bg-fourth/10"
                                  }`}
                              >
                                <Building2 className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={`text-xs sm:text-[13px] font-bold font-primary whitespace-nowrap transition-colors ${isSelected ? "text-fourth font-extrabold" : "text-gray-800 group-hover:text-gray-900"
                                  }`}>
                                  {city.cityName}
                                </div>
                                <div className={`text-[11px] font-medium font-secondary whitespace-nowrap transition-colors ${isSelected ? "text-fourth/80" : "text-gray-400"
                                  }`}>
                                  {city.stateName}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-fourth rounded-full flex items-center justify-center shrink-0 shadow-xs">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>, document.body
      )}
    </>
  );
}
