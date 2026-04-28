/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef } from "react";
import InputField from "@/components/ui/inputField";
import { ChevronDown, X } from "lucide-react";
import { getState, getCities } from "@/services/user.service";

export default function Step2Address({
  onChange,
  initialData,
  readOnly = false,
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [stateFocusedIndex, setStateFocusedIndex] = useState(-1);
  const [cityFocusedIndex, setCityFocusedIndex] = useState(-1);

  // These drive the visible text in the input as well as filtering
  const [stateSearch, setStateSearch] = useState(
    initialData?.state?.name || initialData?.stateName || "",
  );
  const [citySearch, setCitySearch] = useState(
    initialData?.city?.name || initialData?.cityName || "",
  );

  const stateRef = useRef();
  const cityRef = useRef();

  const [form, setForm] = useState({
    address: initialData?.address || "",
    cityId: initialData?.city?.id || initialData?.cityId || null,
    stateId: initialData?.state?.id || initialData?.stateId || null,
    countryId: initialData?.country?.id || initialData?.countryId || 101,
    latitude: initialData?.latitude || 12.12,
    longitude: initialData?.longitude || 12.12,
    stateName: initialData?.state?.name || initialData?.stateName || "",
    cityName: initialData?.city?.name || initialData?.cityName || "",
  });

  // ===== Fetch States =====
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getState();
        const options = res.data.map((s) => ({
          label: s.name,
          value: s.id,
        }));
        setStates(options);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  // ===== Fetch Cities When State Changes =====
  useEffect(() => {
    const fetchCities = async () => {
      if (!form.stateId) return;
      try {
        const res = await getCities(form.stateId);
        const options = res.data.map((c) => ({
          label: c.name,
          value: c.id,
        }));
        setCities(options);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, [form.stateId]);

  // ===== Close dropdowns on outside click =====
  useEffect(() => {
    const handleClick = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setStateOpen(false);
        // Reset text to the committed value if user blurs without selecting
        setStateSearch(form.stateName);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityOpen(false);
        setCitySearch(form.cityName);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [form.stateName, form.cityName]);

  // ===== Filtered lists =====
  const filteredStates = states.filter((s) =>
    s.label.toLowerCase().includes(stateSearch.toLowerCase()),
  );

  const filteredCities = cities.filter((c) =>
    c.label.toLowerCase().includes(citySearch.toLowerCase()),
  );

  // ===== KEYBOARD NAVIGATION HANDLERS =====
  const handleStateKeyDown = (e) => {
    if (!stateOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") setStateOpen(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setStateFocusedIndex((prev) =>
          prev < filteredStates.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setStateFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (stateFocusedIndex >= 0 && stateFocusedIndex < filteredStates.length) {
          const s = filteredStates[stateFocusedIndex];
          const updated = {
            ...form,
            stateId: s.value,
            stateName: s.label,
            cityId: null,
            cityName: "",
          };
          setForm(updated);
          if (onChange) onChange(updated);
          setStateSearch(s.label);
          setCitySearch("");
          setStateOpen(false);
        }
        break;
      case "Escape":
        setStateOpen(false);
        break;
    }
  };

  const handleCityKeyDown = (e) => {
    if (!cityOpen) {
      if (e.key === "ArrowDown" || (e.key === "Enter" && form.stateId))
        setCityOpen(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setCityFocusedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setCityFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (cityFocusedIndex >= 0 && cityFocusedIndex < filteredCities.length) {
          const c = filteredCities[cityFocusedIndex];
          const updated = {
            ...form,
            cityId: c.value,
            cityName: c.label,
          };
          setForm(updated);
          if (onChange) onChange(updated);
          setCitySearch(c.label);
          setCityOpen(false);
        }
        break;
      case "Escape":
        setCityOpen(false);
        break;
    }
  };

  // Reset indices when filtering
  useEffect(() => {
    setStateFocusedIndex(-1);
  }, [stateSearch, stateOpen]);

  useEffect(() => {
    setCityFocusedIndex(-1);
  }, [citySearch, cityOpen]);


  return (
    <div className="space-y-6">
      {(!readOnly || form.address) && (
        <InputField
          label="Address"
          variant="colored"
          readOnly={readOnly}
          value={form.address}
          onChange={(e) => {
            const val = e.target.value;
            const updated = { ...form, address: val };
            setForm(updated);
            if (onChange) onChange(updated);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ===== STATE ===== */}
        {(!readOnly || form.stateName) && (
          <div ref={stateRef} className="relative">
            <label className="text-sm font-semibold text-primary mb-1.5 ml-1 block">
              State
            </label>

            <div className="relative">
              <input
                type="text"
                readOnly={readOnly}
                value={stateSearch}
                placeholder="Search state..."
                onKeyDown={handleStateKeyDown}
                onChange={(e) => {
                  setStateSearch(e.target.value);
                  setStateOpen(true);
                }}
                onFocus={() => !readOnly && setStateOpen(true)}
                className={`w-full h-10 px-3 pr-8 rounded-md border border-primary bg-primary/10 text-primary text-sm outline-none placeholder:text-primary/60 transition-colors ${
                  readOnly ? "cursor-default" : "cursor-text"
                }`}
              />
              {!readOnly && stateSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setStateSearch("");
                    setStateOpen(true);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {!readOnly && !stateSearch && (
                <ChevronDown
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 transition-transform ${
                    stateOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {stateOpen && !readOnly && filteredStates.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-primary bg-primary/10 backdrop-blur-sm rounded-md overflow-hidden z-20 shadow-lg">
                <div className="max-h-44 overflow-y-auto">
                  {filteredStates.map((s, index) => (
                    <div
                      key={s.value}
                      onMouseDown={(e) => {
                        // Use mousedown to fire before onBlur
                        e.preventDefault();
                        const updated = {
                          ...form,
                          stateId: s.value,
                          stateName: s.label,
                          cityId: null,
                          cityName: "",
                        };
                        setForm(updated);
                        if (onChange) onChange(updated);
                        setStateSearch(s.label);
                        setCitySearch("");
                        setStateOpen(false);
                      }}
                      onMouseEnter={() => setStateFocusedIndex(index)}
                      className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                        stateFocusedIndex === index
                          ? "bg-primary/30 text-primary"
                          : form.stateId === s.value
                            ? "bg-primary/20 font-medium text-primary"
                            : "text-primary"
                      }`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stateOpen && !readOnly && filteredStates.length === 0 && stateSearch && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-primary/30 bg-primary/5 rounded-md z-20 shadow-lg">
                <p className="px-3 py-2 text-sm text-primary/50">No states found</p>
              </div>
            )}
          </div>
        )}

        {/* ===== CITY ===== */}
        {(!readOnly || form.cityName) && (
          <div ref={cityRef} className="relative">
            <label className="text-sm font-semibold text-primary mb-1.5 ml-1 block">
              City
            </label>

            <div className="relative">
              <input
                type="text"
                readOnly={readOnly || !form.stateId}
                value={citySearch}
                placeholder={
                  readOnly
                    ? ""
                    : form.stateId
                      ? "Search city..."
                      : "Select state first"
                }
                onKeyDown={handleCityKeyDown}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setCityOpen(true);
                }}
                onFocus={() => !readOnly && form.stateId && setCityOpen(true)}
                className={`w-full h-10 px-3 pr-8 rounded-md border border-primary bg-primary/10 text-primary text-sm outline-none placeholder:text-primary/60 transition-colors ${
                  !form.stateId && !readOnly
                    ? "opacity-60 cursor-not-allowed"
                    : readOnly
                      ? "cursor-default"
                      : "cursor-text"
                }`}
              />
              {!readOnly && citySearch && form.stateId && (
                <button
                  type="button"
                  onClick={() => {
                    setCitySearch("");
                    setCityOpen(true);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {!readOnly && !citySearch && (
                <ChevronDown
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 transition-transform ${
                    cityOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {cityOpen && !readOnly && form.stateId && filteredCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-primary bg-primary/10 backdrop-blur-sm rounded-md overflow-hidden z-20 shadow-lg">
                <div className="max-h-44 overflow-y-auto">
                  {filteredCities.map((c, index) => (
                    <div
                      key={c.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const updated = {
                          ...form,
                          cityId: c.value,
                          cityName: c.label,
                        };
                        setForm(updated);
                        if (onChange) onChange(updated);
                        setCitySearch(c.label);
                        setCityOpen(false);
                      }}
                      onMouseEnter={() => setCityFocusedIndex(index)}
                      className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                        cityFocusedIndex === index
                          ? "bg-primary/30 text-primary"
                          : form.cityId === c.value
                            ? "bg-primary/20 font-medium text-primary"
                            : "text-primary"
                      }`}
                    >
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cityOpen && !readOnly && form.stateId && filteredCities.length === 0 && citySearch && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-primary/30 bg-primary/5 rounded-md z-20 shadow-lg">
                <p className="px-3 py-2 text-sm text-primary/50">No cities found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
