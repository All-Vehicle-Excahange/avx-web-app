"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, X, Check, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import InputField from "@/components/ui/inputField";
import ChipGroup from "@/components/ui/chipGroup";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { useDebounceValue } from "@/hooks/useDebounce";
import { checkIsUserNameAvailbale } from "@/services/consult.profile.service";

export default function Step1Business({
  onChange,
  initialData,
  readOnly = false,
  isUpdateMode = false,
}) {
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
    username: initialData?.username || "",
    ownerName: initialData?.ownerName || "",
    companyEmail: initialData?.companyEmail || "",
    establishmentYear: initialData?.establishmentYear || "",
    vehicleTypes: initialData?.vehicleTypes || [],
    services: initialData?.services || [],
  });

  const [usernameStatus, setUsernameStatus] = useState({
    loading: false,
    available: null,
    message: "",
  });

  const debouncedUsername = useDebounceValue(form.username, 500);

  useEffect(() => {
    const check = async () => {
      if (!debouncedUsername || debouncedUsername === initialData?.username) {
        setUsernameStatus({ loading: false, available: null, message: "" });
        return;
      }

      if (debouncedUsername.length < 3) {
        setUsernameStatus({
          loading: false,
          available: false,
          message: "Too short",
        });
        return;
      }

      setUsernameStatus({ loading: true, available: null, message: "" });
      try {
        const res = await checkIsUserNameAvailbale(debouncedUsername);
        if (res.data === true) {
          setUsernameStatus({
            loading: false,
            available: true,
            message: "Username available",
          });
        } else {
          setUsernameStatus({
            loading: false,
            available: false,
            message: "Username already taken",
          });
        }
      } catch (err) {
        setUsernameStatus({
          loading: false,
          available: false,
          message: "Error checking availability",
        });
      }
    };
    check();
  }, [debouncedUsername, initialData?.username]);

  const [errors, setErrors] = useState({
    companyEmail: "",
    establishmentYear: "",
    services: "",
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
    if (form.services.length >= 4) {
      setErrors((prev) => ({
        ...prev,
        services: "You can select a maximum of 4 services.",
      }));
      setAddingService(false);
      setServiceInput("");
      return;
    }
    setErrors((prev) => ({ ...prev, services: "" }));
    const newItem = { label: serviceInput.trim(), value: trimmed };
    setCustomServices((prev) => [...prev, newItem]);
    setForm((prev) => {
      const updated = { ...prev, services: [...prev.services, trimmed] };
      if (onChange) onChange(updated);
      return updated;
    });
    setServiceInput("");
    setAddingService(false);
  };

  const handleRemoveCustomService = (value) => {
    setCustomServices((prev) => prev.filter((s) => s.value !== value));
    setForm((prev) => {
      const updated = {
        ...prev,
        services: prev.services.filter((s) => s !== value),
      };
      setErrors((p) => ({ ...p, services: "" }));
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const handleInput = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
    if (onChange) {
      const isChanged =
        JSON.stringify(updatedForm) !== JSON.stringify(initialData);
      onChange(updatedForm, isChanged);
    }

    // Clear error when user types
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateEmail = (companyEmail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(companyEmail);
  };

  const validateYear = (year) => {
    const num = parseInt(year);
    return year.length === 4 && num > 1850;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ===== LOGO ===== */}
      {(!readOnly || logo) && (
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Business Logo
          </h3>
          <div className="relative">
            <div
              onClick={() => !readOnly && logoRef.current.click()}
              className={`relative w-32 h-32 rounded-full border-4 border-primary/60 bg-primary/10 overflow-hidden flex items-center justify-center transition-all ${
                !readOnly
                  ? "cursor-pointer hover:border-primary hover:shadow-lg group"
                  : ""
              }`}
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
              {logo && !readOnly && (
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
      )}

      {/* ===== BANNER ===== */}
      {(!readOnly || bannerPreview) && (
        <DropzoneUpload
          label="Banner Image"
          preview={bannerPreview}
          readOnly={readOnly}
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
      )}

      {/* ===== FIELDS ===== */}
      <div className="space-y-6">
        {!readOnly && (
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Business Details
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(!readOnly || form.consultationName) && (
            <InputField
              label="Consultation Name"
              variant="colored"
              readOnly={readOnly}
              value={form.consultationName}
              onChange={(e) => handleInput("consultationName", e.target.value)}
            />
          )}

          {isUpdateMode && (!readOnly || form.username) && (
            <div className="flex flex-col">
              <InputField
                label="Username"
                variant="colored"
                readOnly={readOnly}
                value={form.username}
                onChange={(e) =>
                  handleInput("username", e.target.value.toLowerCase().trim())
                }
              />
              {usernameStatus.message && (
                <div
                  className={`flex items-center gap-1 text-[10px] mt-1 ml-1 ${
                    usernameStatus.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {usernameStatus.available ? (
                    <Check size={10} />
                  ) : (
                    <X size={10} />
                  )}
                  {usernameStatus.message}
                </div>
              )}
              {usernameStatus.loading && (
                <div className="flex items-center gap-1 text-[10px] mt-1 ml-1 text-third">
                  <Loader2 size={10} className="animate-spin" />
                  Checking availability...
                </div>
              )}
            </div>
          )}

          {(!readOnly || form.ownerName) && (
            <InputField
              label="Owner Name"
              variant="colored"
              readOnly={readOnly}
              value={form.ownerName}
              onChange={(e) => handleInput("ownerName", e.target.value)}
            />
          )}

          {(!readOnly || form.companyEmail) && (
            <div className="flex flex-col">
              <InputField
                label="Company Email"
                type="email"
                variant="colored"
                readOnly={readOnly}
                value={form.companyEmail}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase().trim();
                  handleInput("companyEmail", val);
                  if (val && !validateEmail(val)) {
                    setErrors((p) => ({
                      ...p,
                      companyEmail: "Invalid email format",
                    }));
                  } else {
                    setErrors((p) => ({ ...p, companyEmail: "" }));
                  }
                }}
              />
              {errors.companyEmail && (
                <span className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.companyEmail}
                </span>
              )}
            </div>
          )}

          {(!readOnly || form.establishmentYear) && (
            <div className="flex flex-col">
              <InputField
                label="Establishment Year"
                variant="colored"
                readOnly={readOnly}
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
          )}
        </div>
      </div>

      {(!readOnly || form.vehicleTypes.length > 0) && (
        <ChipGroup
          title="Vehicle Types"
          readOnly={readOnly}
          items={[
            { label: "Two Wheelers", value: "TWO_WHEELER" },
            { label: "Four Wheelers", value: "FOUR_WHEELER" },
          ]}
          selected={form.vehicleTypes}
          onChange={(val) => handleInput("vehicleTypes", val)}
        />
      )}

      {/* ===== SERVICES ===== */}
      {(!readOnly || form.services.length > 0) && (
        <div className="flex flex-col mb-2">
          <h3 className="text-md font-semibold text-primary mb-2">Services</h3>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Preset chips via ChipGroup — rendered inline */}
            {[
              { label: "Buy", value: "BUY" },
              { label: "Sell", value: "SELL" },
              { label: "Exchange", value: "EXCHANGE" },
              { label: "Finance", value: "FINANCE" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                disabled={readOnly}
                onClick={() => {
                  const isSelected = form.services.includes(item.value);
                  if (!isSelected && form.services.length >= 4) {
                    setErrors((prev) => ({
                      ...prev,
                      services: "You can select a maximum of 4 services.",
                    }));
                    return;
                  }
                  setErrors((prev) => ({ ...prev, services: "" }));
                  const updated = isSelected
                    ? form.services.filter((s) => s !== item.value)
                    : [...form.services, item.value];
                  handleInput("services", updated);
                }}
                className={`px-4 py-1.5  text-sm font-medium border transition-all duration-200 rounded-xl
                ${
                  form.services.includes(item.value)
                    ? "bg-primary text-secondary border-primary"
                    : readOnly
                      ? "hidden"
                      : "bg-transparent text-primary border-primary/50 hover:border-primary hover:cursor-pointer"
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
                    : readOnly
                      ? "hidden"
                      : "bg-transparent text-primary border-primary/50"
                }`}
              >
                <button
                  type="button"
                  disabled={readOnly}
                  onClick={() => {
                    const isSelected = form.services.includes(item.value);
                    if (!isSelected && form.services.length >= 4) {
                      setErrors((prev) => ({
                        ...prev,
                        services: "You can select a maximum of 4 services.",
                      }));
                      return;
                    }
                    setErrors((prev) => ({ ...prev, services: "" }));
                    const updated = isSelected
                      ? form.services.filter((s) => s !== item.value)
                      : [...form.services, item.value];
                    handleInput("services", updated);
                  }}
                >
                  {item.label}
                </button>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomService(item.value)}
                    className="ml-0.5 opacity-70 hover:opacity-100 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {/* Inline add-service input */}
            {!readOnly && (
              <>
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
                      className="w-8 h-8 rounded-full cursor-pointer bg-primary text-secondary flex items-center justify-center hover:opacity-80 transition"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingService(false);
                        setServiceInput("");
                      }}
                      className="w-8 h-8 cursor-pointer rounded-full border border-primary/40 text-primary flex items-center justify-center hover:opacity-80 transition"
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
              </>
            )}
          </div>
          {errors.services && (
            <p className="text-red-500 text-[10px] mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
              {errors.services}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
