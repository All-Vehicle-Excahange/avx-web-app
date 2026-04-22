"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import InputField from "@/components/ui/inputField";
import { ChevronDown, Search } from "lucide-react";
import { getState, getCities } from "@/services/user.service";

export default function Step2Address({ onChange, initialData, readOnly = false }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const stateRef = useRef();
  const cityRef = useRef();

  // ✅ Initialize state directly from initialData
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
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


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
          <div ref={stateRef}>
            <label className="text-sm font-semibold text-primary mb-1.5 ml-1">
              State
            </label>

            <div
              onClick={() => !readOnly && !stateOpen && setStateOpen(true)}
              className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-primary/10 text-primary transition-colors ${
                readOnly ? "" : "cursor-text"
              }`}
            >
              {stateOpen ? (
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-primary placeholder:text-primary/60"
                />
              ) : (
                <span className={!form.stateName ? "text-primary/60" : ""}>
                  {form.stateName || "Select State"}
                </span>
              )}
              {!readOnly && (
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    stateOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {stateOpen && (
              <div className="mt-1 border border-primary bg-primary/10 rounded-md overflow-hidden relative z-10 shadow-lg">
                <div className="max-h-40 overflow-y-auto">
                  {states
                    .filter((s) =>
                      s.label.toLowerCase().includes(stateSearch.toLowerCase()),
                    )
                    .map((s) => (
                      <div
                        key={s.value}
                        onClick={() => {
                          const updated = {
                            ...form,
                            stateId: s.value,
                            stateName: s.label,
                            cityId: null,
                            cityName: "",
                          };
                          setForm(updated);
                          if (onChange) onChange(updated);
                          setStateOpen(false);
                          setStateSearch(""); // clear search on select
                        }}
                        className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                      >
                        {s.label}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== CITY ===== */}
        {(!readOnly || form.cityName) && (
          <div ref={cityRef}>
            <label className="text-sm font-semibold text-primary mb-1.5 ml-1">
              City
            </label>

            <div
              onClick={() =>
                !readOnly && form.stateId && !cityOpen && setCityOpen(true)
              }
              className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-primary/10 text-primary transition-colors ${
                !form.stateId && !readOnly
                  ? "opacity-60 cursor-not-allowed"
                  : readOnly
                    ? ""
                    : "cursor-text"
              }`}
            >
              {cityOpen ? (
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-primary placeholder:text-primary/60"
                />
              ) : (
                <span className={!form.cityName ? "text-primary/60" : ""}>
                  {form.cityName ||
                    (form.stateId ? "Select City" : "Select state first")}
                </span>
              )}
              {!readOnly && (
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    cityOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {cityOpen && (
              <div className="mt-1 border border-primary bg-primary/10 rounded-md overflow-hidden relative z-10 shadow-lg">
                <div className="max-h-40 overflow-y-auto">
                  {cities
                    .filter((c) =>
                      c.label.toLowerCase().includes(citySearch.toLowerCase()),
                    )
                    .map((c) => (
                      <div
                        key={c.value}
                        onClick={() => {
                          const updated = {
                            ...form,
                            cityId: c.value,
                            cityName: c.label,
                          };
                          setForm(updated);
                          if (onChange) onChange(updated);
                          setCityOpen(false);
                          setCitySearch(""); // clear search on select
                        }}
                        className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                      >
                        {c.label}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
