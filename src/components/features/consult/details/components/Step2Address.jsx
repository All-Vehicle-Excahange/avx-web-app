/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/inputField";
import CustomSelect from "@/components/ui/custom-select";
import { X } from "lucide-react";
import { getState, getCities } from "@/services/user.service";

export default function Step2Address({
  onChange,
  initialData,
  readOnly = false,
  isUpdateMode = false,
  backendError = "",
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  const handleClear = () => {
    const emptyForm = {
      countryId: 101,
      stateId: "",
      stateName: "",
      cityId: "",
      cityName: "",
      address: "",
      latitude: "",
      longitude: "",
    };
    setForm(emptyForm);
    if (onChange) onChange(emptyForm, true);
  };

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

  return (
    <div className="space-y-6 relative">
      {/* CLEAR BUTTON */}
      {!readOnly && !isUpdateMode && !initialData && (
        <div className="absolute -top-6 right-0 z-10">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium border border-primary/40 rounded-2xl cursor-pointer text-red-500 hover:text-red-600 transition flex items-center gap-1  px-2 py-1 "
          >
            <X size={14} />
            Clear Form
          </button>
        </div>
      )}

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
          <div>
            <label className="text-sm font-semibold text-primary mb-1.5 ml-1 block">
              State
            </label>
            <CustomSelect
              value={form.stateId}
              options={states}
              placeholder="Search state..."
              variant="colored"
              readOnly={readOnly}
              onChange={(val) => {
                const s = states.find(st => st.value === val);
                const updated = {
                  ...form,
                  stateId: val,
                  stateName: s ? s.label : "",
                  cityId: null,
                  cityName: "",
                };
                setForm(updated);
                if (onChange) onChange(updated);
              }}
            />
          </div>
        )}

        {/* ===== CITY ===== */}
        {(!readOnly || form.cityName) && (
          <div>
            <label className="text-sm font-semibold text-primary mb-1.5 ml-1 block">
              City
            </label>
            <CustomSelect
              value={form.cityId}
              options={cities}
              placeholder={
                readOnly
                  ? ""
                  : form.stateId
                    ? "Search city..."
                    : "Select state first"
              }
              variant="colored"
              readOnly={readOnly}
              disabled={!form.stateId && !readOnly}
              onChange={(val) => {
                const c = cities.find(ct => ct.value === val);
                const updated = {
                  ...form,
                  cityId: val,
                  cityName: c ? c.label : "",
                };
                setForm(updated);
                if (onChange) onChange(updated);
              }}
            />
          </div>
        )}
      </div>

      {/* ===== BACKEND ERROR ===== */}
      {backendError && (
        <p className="text-red-500 text-sm font-medium mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
          {backendError}
        </p>
      )}
    </div>
  );
}
