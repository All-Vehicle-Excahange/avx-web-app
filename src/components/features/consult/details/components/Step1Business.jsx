"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, X, Check } from "lucide-react";
import Image from "next/image";
import InputField from "@/components/ui/inputField";
import ChipGroup from "@/components/ui/chipGroup";
import { Camera } from "lucide-react";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step1Business({ onChange, initialData }) {
  const logoRef = useRef();

  // Initialize state directly from initialData to avoid useEffect cascading renders
  const [logo, setLogo] = useState(initialData?.logoUrl || null);
  const [bannerPreview, setBannerPreview] = useState(
    initialData?.bannerUrl || null,
  );

  const [form, setForm] = useState({
    logo: null,
    banner: null,
    consultationName: initialData?.consultationName || "",
    ownerName: initialData?.ownerName || "",
    email: initialData?.companyEmail || "",
    establishmentYear: initialData?.establishmentYear || "",
    vehicleTypes: initialData?.vehicleTypes || [],
    services: initialData?.services || [],
  });

  const [errors, setErrors] = useState({
    email: "",
    establishmentYear: "",
  });

  // ===== CUSTOM SERVICES =====
  const PRESET_SERVICES = ["BUY", "SELL", "EXCHANGE", "FINANCE", "OTHER"];
  // Derive any pre-existing custom services from initialData
  const [customServices, setCustomServices] = useState(() => {
    const existing = initialData?.services || [];
    return existing
      .filter((s) => !PRESET_SERVICES.includes(s))
      .map((s) => ({ label: s, value: s }));
  });
  const [addingService, setAddingService] = useState(false);
  const [serviceInput, setServiceInput] = useState("");
  const serviceInputRef = useRef(null);

  const handleAddCustomService = () => {
    const trimmed = serviceInput.trim().toUpperCase();
    if (!trimmed) return;
    // Avoid duplicates
    if (form.services.includes(trimmed)) {
      setAddingService(false);
      setServiceInput("");
      return;
    }
    const newItem = { label: serviceInput.trim(), value: trimmed };
    setCustomServices((prev) => [...prev, newItem]);
    setForm((prev) => ({ ...prev, services: [...prev.services, trimmed] }));
    setServiceInput("");
    setAddingService(false);
  };

  const handleRemoveCustomService = (value) => {
    setCustomServices((prev) => prev.filter((s) => s.value !== value));
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== value),
    }));
  };

  const handleInput = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear error when user types
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateYear = (year) => {
    const num = parseInt(year);
    return year.length === 4 && num > 1850;
  };

  const createPayload = useCallback(() => {
    const payload = new FormData();
    if (form.logo) payload.append("logo", form.logo);
    if (form.banner) payload.append("banner", form.banner);

    payload.append("consultationName", form.consultationName);
    payload.append("ownerName", form.ownerName);
    payload.append("companyEmail", form.email);
    payload.append("establishmentYear", form.establishmentYear);

    form.vehicleTypes.forEach((type, i) =>
      payload.append(`vehicleTypes[${i}]`, type),
    );

    form.services.forEach((s, i) => payload.append(`services[${i}]`, s));

    return payload;
  }, [form]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (onChange) {
      onChange(createPayload(), !isFirstRender.current);
      if (isFirstRender.current) isFirstRender.current = false;
    }
  }, [createPayload, onChange]);

  return (
    <div className="space-y-8">
      {/* ===== LOGO ===== */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-sm  font-semibold text-primary uppercase tracking-wider">
          Business Logo
        </h3>
        <div className="relative">
          <div
            onClick={() => logoRef.current.click()}
            className="relative w-32 h-32 rounded-full border-4 border-primary/60 bg-primary/10 overflow-hidden cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:shadow-lg group"
          >
            {!logo ? (
              <span className="text-third transition-transform group-hover:scale-110">
                <Camera size={32} strokeWidth={1.5} />
              </span>
            ) : (
              <Image
                src={
                  typeof logo === "string" ? logo : URL.createObjectURL(logo)
                }
                alt="logo"
                fill
                className="object-cover"
                unoptimized
              />
            )}

            {/* Overlay on hover when logo exists */}
            {logo && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="text-white w-8 h-8" />
              </div>
            )}
          </div>

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setLogo(file);
                handleInput("logo", file);
              }
            }}
          />
        </div>
      </div>

      {/* ===== BANNER ===== */}
      <DropzoneUpload
        label="Banner Image"
        preview={bannerPreview}
        onChange={(file) => {
          const f = Array.isArray(file) ? file[0] : file;
          if (f) {
            setBannerPreview(
              typeof f === "string" ? f : URL.createObjectURL(f),
            );
            handleInput("banner", f);
          }
        }}
      />

      {/* ===== FIELDS ===== */}
      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
          Business Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Consultation Name"
            variant="colored"
            value={form.consultationName}
            onChange={(e) => handleInput("consultationName", e.target.value)}
          />

          <InputField
            label="Owner Name"
            variant="colored"
            value={form.ownerName}
            onChange={(e) => handleInput("ownerName", e.target.value)}
          />

          <div className="flex flex-col">
            <InputField
              label="Company Email"
              type="email"
              variant="colored"
              value={form.email}
              onChange={(e) => handleInput("email", e.target.value)}
              onBlur={(e) => {
                if (e.target.value && !validateEmail(e.target.value)) {
                  setErrors((p) => ({ ...p, email: "Invalid email format" }));
                }
              }}
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <InputField
              label="Establishment Year"
              variant="colored"
              value={form.establishmentYear}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (/^\d+$/.test(val) && val.length <= 4)) {
                  handleInput("establishmentYear", val);
                }
              }}
              onBlur={(e) => {
                if (e.target.value && !validateYear(e.target.value)) {
                  setErrors((p) => ({
                    ...p,
                    establishmentYear: "Must be 4 digits & > 1850",
                  }));
                }
              }}
            />
            {errors.establishmentYear && (
              <span className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.establishmentYear}
              </span>
            )}
          </div>
        </div>
      </div>

      <ChipGroup
        title="Vehicle Types"
        items={[
          { label: "Two Wheelers", value: "TWO_WHEELER" },
          { label: "Four Wheelers", value: "FOUR_WHEELER" },
        ]}
        selected={form.vehicleTypes} // Use 'selected' instead of 'value'
        onChange={(v) => handleInput("vehicleTypes", v)}
      />

      {/* ===== SERVICES ===== */}
      <div className="flex flex-col mb-2">
        <h3 className="text-md font-semibold text-primary mb-2">Services</h3>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Preset chips via ChipGroup — rendered inline */}
          {[
            { label: "Buy", value: "BUY" },
            { label: "Sell", value: "SELL" },
            { label: "Exchange", value: "EXCHANGE" },
            { label: "Finance", value: "FINANCE" },
            { label: "Other", value: "OTHER" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                const updated = form.services.includes(item.value)
                  ? form.services.filter((s) => s !== item.value)
                  : [...form.services, item.value];
                handleInput("services", updated);
              }}
              className={`px-4 py-1.5  text-sm font-medium border transition-all duration-200 hover:cursor-pointer rounded-xl
                ${
                  form.services.includes(item.value)
                    ? "bg-primary text-secondary border-primary"
                    : "bg-transparent text-primary border-primary/50 hover:border-primary "
                }`}
            >
              {item.label}
            </button>
          ))}

          {/* Custom service chips */}
          {customServices.map((item) => (
            <div
              key={item.value}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  form.services.includes(item.value)
                    ? "bg-primary text-secondary border-primary"
                    : "bg-transparent text-primary border-primary/50"
                }`}
            >
              <button
                type="button"
                onClick={() => {
                  const updated = form.services.includes(item.value)
                    ? form.services.filter((s) => s !== item.value)
                    : [...form.services, item.value];
                  handleInput("services", updated);
                }}
              >
                {item.label}
              </button>
              <button
                type="button"
                onClick={() => handleRemoveCustomService(item.value)}
                className="ml-0.5 opacity-70 hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Inline add-service input */}
          {addingService ? (
            <div className="flex items-center gap-1.5">
              <input
                ref={serviceInputRef}
                autoFocus
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCustomService();
                  if (e.key === "Escape") {
                    setAddingService(false);
                    setServiceInput("");
                  }
                }}
                placeholder="Service name..."
                className="h-8 px-3 text-sm rounded-full border border-primary bg-primary/10 text-primary outline-none w-36"
              />
              <button
                type="button"
                onClick={handleAddCustomService}
                className="w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center hover:opacity-80 transition"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingService(false);
                  setServiceInput("");
                }}
                className="w-8 h-8 rounded-full border border-primary/40 text-primary flex items-center justify-center hover:opacity-80 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAddingService(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-primary/50 text-primary/70 text-sm hover:border-primary hover:text-primary transition-all duration-200 hover:cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Service
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
