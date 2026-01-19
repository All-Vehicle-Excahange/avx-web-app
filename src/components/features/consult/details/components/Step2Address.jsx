"use client";

import { useEffect, useState, useRef } from "react";
import InputField from "@/components/ui/inputField";
import { ChevronDown } from "lucide-react";
import { getState, getCities } from "@/services/user.service";

export default function Step2Address({ onChange }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const stateRef = useRef();
  const cityRef = useRef();

  const [form, setForm] = useState({
    address: "",
    cityId: "",
    cityName: "",
    stateId: "",
    stateName: "",
    country: "",
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
        console.log(err);
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
        console.log(err);
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
      <InputField
        label="Address"
        variant="colored"
        value={form.address}
        onChange={(e) =>
          setForm((p) => {
            const updated = { ...p, address: e.target.value };
            onChange && onChange(updated);
            return updated;
          })
        }
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
                  const updated = {
                    ...form,
                    stateId: s.value,
                    stateName: s.label,

                    // reset city
                    cityId: "",
                    cityName: "",
                  };

                  setForm(updated);
                  onChange && onChange(updated);

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
                  const updated = {
                    ...form,
                    cityId: c.value,
                    cityName: c.label,
                  };

                  setForm(updated);
                  onChange && onChange(updated);

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

      <InputField
        label="Country"
        variant="colored"
        value={form.country}
        onChange={(e) =>
          setForm((p) => {
            const updated = { ...p, country: e.target.value };
            onChange && onChange(updated);
            return updated;
          })
        }
      />
    </div>
  );
}
