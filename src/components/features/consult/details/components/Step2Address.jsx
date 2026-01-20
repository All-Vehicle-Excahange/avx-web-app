"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import InputField from "@/components/ui/inputField";
import { ChevronDown } from "lucide-react";
import { getState, getCities } from "@/services/user.service";

export default function Step2Address({ onChange, initialData }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const stateRef = useRef();
  const cityRef = useRef();

  // ✅ Initialize state directly from initialData
  const [form, setForm] = useState({
    address: initialData?.address || "",
    cityId: initialData?.cityId || null,
    stateId: initialData?.stateId || null,
    countryId: initialData?.countryId || 101,
    latitude: initialData?.latitude || 12.12,
    longitude: initialData?.longitude || 12.12,
    stateName: initialData?.stateName || "",
    cityName: initialData?.cityName || "",
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

  // ✅ Memoized payload creation to prevent infinite loops
  const syncWithParent = useCallback(() => {
    if (!onChange) return;
    const payload = {
      address: form.address,
      cityId: form.cityId,
      stateId: form.stateId,
      countryId: form.countryId,
      latitude: form.latitude,
      longitude: form.longitude,
    };
    onChange(payload, false); // Pass 'false' for initial sync
  }, [form, onChange]);

  useEffect(() => {
    syncWithParent();
  }, [syncWithParent]);

  return (
    <div className="space-y-6">
      <InputField
        label="Address"
        variant="colored"
        value={form.address}
        onChange={(e) => {
          const val = e.target.value;
          setForm((p) => ({ ...p, address: val }));
        }}
      />

      {/* ===== STATE ===== */}
      <div ref={stateRef}>
        <label className="text-sm font-semibold text-text-black mb-1.5 ml-1">
          State
        </label>

        <div
          onClick={() => setStateOpen(!stateOpen)}
          className="h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-primary/10 text-primary cursor-pointer"
        >
          <span>{form.stateName || "Select State"}</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {stateOpen && (
          <div className="mt-1 border border-primary bg-primary/10 rounded-md max-h-40 overflow-y-auto">
            {states.map((s) => (
              <div
                key={s.value}
                onClick={() => {
                  setForm((p) => ({
                    ...p,
                    stateId: s.value,
                    stateName: s.label,
                    cityId: null,
                    cityName: "",
                  }));
                  setStateOpen(false);
                }}
                className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
              >
                {s.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== CITY ===== */}
      <div ref={cityRef}>
        <label className="text-sm font-semibold text-text-black mb-1.5 ml-1">
          City
        </label>

        <div
          onClick={() => form.stateId && setCityOpen(!cityOpen)}
          className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-primary/10 text-primary ${
            !form.stateId ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <span>
            {form.cityName ||
              (form.stateId ? "Select City" : "Select state first")}
          </span>

          <ChevronDown className="w-4 h-4" />
        </div>

        {cityOpen && (
          <div className="mt-1 border border-primary bg-primary/10 rounded-md max-h-40 overflow-y-auto">
            {cities.map((c) => (
              <div
                key={c.value}
                onClick={() => {
                  setForm((p) => ({
                    ...p,
                    cityId: c.value,
                    cityName: c.label,
                  }));
                  setCityOpen(false);
                }}
                className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
              >
                {c.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
