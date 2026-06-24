/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import SleekInput from "@/components/ui/sleekInput";
import CustomSelect from "@/components/ui/custom-select";
import { MapPin, Globe, Compass, Link } from "lucide-react";
import {
  getState,
  getCities,
  getAllTown,
  addNewTown,
} from "@/services/user.service";
import { motion } from "framer-motion";
import MiniMap from "@/components/ui/MiniMap";

export default function Step2Address({
  onChange,
  initialData,
  readOnly = false,
  isUpdateMode = false,
  backendError = "",
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [isCreatingTown, setIsCreatingTown] = useState(false);

  const [form, setForm] = useState({
    address: initialData?.address || "",
    cityId: initialData?.city?.id || initialData?.cityId || null,
    stateId: initialData?.state?.id || initialData?.stateId || null,
    townId: initialData?.town?.id || initialData?.townId || null,
    countryId: initialData?.country?.id || initialData?.countryId || 101,
    latitude: initialData?.latitude || 22.2587,
    longitude: initialData?.longitude || 71.1924,
    stateName: initialData?.state?.name || initialData?.stateName || "",
    cityName: initialData?.city?.name || initialData?.cityName || "",
    townName: initialData?.town?.name || initialData?.townName || "",
    mapUrl: initialData?.mapUrl || "",
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

  // ===== Fetch Towns When State Changes =====
  useEffect(() => {
    const fetchTowns = async () => {
      if (!form.cityId) return;
      try {
        const res = await getAllTown(form.cityId);
        const options = res.data.map((t) => ({
          label: t.name,
          value: t.id,
        }));
        setTowns(options);
      } catch (err) {
        console.error("Error fetching towns:", err);
      }
    };
    fetchTowns();
  }, [form.cityId]);

  const handleFormChange = (updated) => {
    setForm(updated);
    if (onChange) {
      const isChanged =
        (updated.address || "") !== (initialData?.address || "") ||
        (updated.stateId || null) !==
          (initialData?.state?.id || initialData?.stateId || null) ||
        (updated.cityId || null) !==
          (initialData?.city?.id || initialData?.cityId || null) ||
        (updated.townId || null) !==
          (initialData?.town?.id || initialData?.townId || null) ||
        (updated.mapUrl || "") !== (initialData?.mapUrl || "") ||
        Number(updated.latitude || 0) !== Number(initialData?.latitude || 0) ||
        Number(updated.longitude || 0) !== Number(initialData?.longitude || 0);

      const payload = { ...updated };
      if (!payload.mapUrl) {
        delete payload.mapUrl;
      }
      onChange(payload, isChanged);
    }
  };

  // ===== Create a new town if not found in list =====
  const handleCreateTown = async (townName) => {
    if (!form.cityId || !form.stateId || !form.countryId) return;
    setIsCreatingTown(true);
    try {
      const res = await addNewTown({
        countryId: form.countryId,
        stateId: form.stateId,
        cityId: form.cityId,
        name: townName,
      });
      const newTown = res.data;
      const newOption = { label: newTown.name, value: newTown.id };
      setTowns((prev) => [...prev, newOption]);
      const updated = {
        ...form,
        townId: newTown.id,
        townName: newTown.name,
      };
      handleFormChange(updated);
    } catch (err) {
      console.error("Error creating town:", err);
    } finally {
      setIsCreatingTown(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 relative"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl hover:border-white/6 transition-all duration-300 relative z-20"
      >
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <MapPin size={16} className="text-primary/70" />
            Address Details
          </h3>
          <p className="text-xs text-third/60 mt-1">
            Specify the physical location of your consulting showroom or office.
          </p>
        </div>

        {(!readOnly || form.address) && (
          <SleekInput
            label="Address"
            placeholder="e.g. 123 Main Street, Suite 400"
            readOnly={readOnly}
            value={form.address}
            icon={MapPin}
            onChange={(e) => {
              const val = e.target.value;
              const updated = { ...form, address: val };
              handleFormChange(updated);
            }}
          />
        )}

        <MiniMap
          initialLat={form.latitude}
          initialLng={form.longitude}
          readOnly={readOnly}
          onChangeLocation={(lat, lng) => {
            const updated = {
              ...form,
              latitude: lat,
              longitude: lng,
              mapUrl: `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`,
            };
            handleFormChange(updated);
          }}
        />

        {(!readOnly || form.mapUrl) && (
          <SleekInput
            label="Map URL"
            placeholder="e.g. https://maps.google.com/..."
            readOnly={readOnly}
            value={form.mapUrl}
            icon={Link}
            onChange={(e) => {
              const val = e.target.value;
              const updated = { ...form, mapUrl: val };
              handleFormChange(updated);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ===== STATE ===== */}
          {(!readOnly || form.stateName) && (
            <div className="flex flex-col space-y-1.5 w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                State
              </span>
              <div className="relative">
                {readOnly ? (
                  <SleekInput
                    readOnly={true}
                    value={form.stateName}
                    icon={Globe}
                  />
                ) : (
                  <CustomSelect
                    value={form.stateId}
                    options={states}
                    placeholder="Search state..."
                    variant="transparent"
                    readOnly={readOnly}
                    onChange={(val) => {
                      const s = states.find((st) => st.value === val);
                      const updated = {
                        ...form,
                        stateId: val,
                        stateName: s ? s.label : "",
                        cityId: null,
                        cityName: "",
                      };
                      handleFormChange(updated);
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* ===== CITY ===== */}
          {(!readOnly || form.cityName) && (
            <div className="flex flex-col space-y-1.5 w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                City
              </span>
              <div className="relative">
                {readOnly ? (
                  <SleekInput
                    readOnly={true}
                    value={form.cityName}
                    icon={Compass}
                  />
                ) : (
                  <CustomSelect
                    value={form.cityId}
                    options={cities}
                    placeholder={
                      form.stateId ? "Search city..." : "Select state first"
                    }
                    variant="transparent"
                    readOnly={readOnly}
                    disabled={!form.stateId}
                    onChange={(val) => {
                      const c = cities.find((ct) => ct.value === val);
                      const updated = {
                        ...form,
                        cityId: val,
                        cityName: c ? c.label : "",
                      };
                      handleFormChange(updated);
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* ===== TOWN ===== */}
          {(!readOnly || form.townName) && (
            <div className="flex flex-col space-y-1.5 w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                Town
              </span>
              <div className="relative">
                {readOnly ? (
                  <SleekInput
                    readOnly={true}
                    value={form.townName}
                    icon={Compass}
                  />
                ) : (
                  <CustomSelect
                    value={form.townId}
                    options={towns}
                    placeholder={
                      form.cityId ? "Search town..." : "Select city first"
                    }
                    variant="transparent"
                    readOnly={readOnly}
                    disabled={!form.cityId}
                    onCreateNew={handleCreateTown}
                    isCreating={isCreatingTown}
                    onChange={(val) => {
                      const t = towns.find((tn) => tn.value === val);
                      const updated = {
                        ...form,
                        townId: val,
                        townName: t ? t.label : "",
                      };
                      handleFormChange(updated);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ===== BACKEND ERROR ===== */}
      {backendError && (
        <p className="text-rose-500 text-sm font-medium mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
          {backendError}
        </p>
      )}
    </motion.div>
  );
}
