"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  X,
  Check,
  Camera,
  Loader2,
  Trash2,
  Building2,
  User,
  Mail,
  Calendar,
  Bike,
  Car,
  ShoppingBag,
  DollarSign,
  ArrowLeftRight,
  Coins,
  Briefcase,
  Globe,
  Tag,
} from "lucide-react";
import Image from "next/image";
import CustomSelect from "@/components/ui/custom-select";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import SleekInput from "@/components/ui/sleekInput";
import { useDebounceValue } from "@/hooks/useDebounce";
import { checkIsUserNameAvailbale } from "@/services/consult.profile.service";
import { motion, AnimatePresence } from "framer-motion";

export default function Step1Business({
  onChange,
  initialData,
  readOnly = false,
  isUpdateMode = false,
  backendError = "",
}) {
  const logoRef = useRef();

  // Initialize state directly from initialData to avoid useEffect cascading renders
  const [logo, setLogo] = useState(initialData?.logoUrl || null);
  const [bannerPreview, setBannerPreview] = useState(
    initialData?.bannerUrl || null,
  );

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1975 + 1 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { label: year, value: year };
  });

  const [form, setForm] = useState({
    logo: null,
    banner: null,
    consultationName: initialData?.consultationName || "",
    username: initialData?.username || "",
    ownerName: initialData?.ownerName || "",
    companyEmail: initialData?.companyEmail || "",
    establishmentYear: initialData?.establishmentYear
      ? String(initialData.establishmentYear)
      : "",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleClear = () => {
    const emptyForm = {
      logo: null,
      banner: null,
      consultationName: "",
      username: "",
      ownerName: "",
      companyEmail: "",
      establishmentYear: "",
      vehicleTypes: [],
      services: [],
    };
    setForm(emptyForm);
    setLogo(null);
    setBannerPreview(null);
    setCustomServices([]);
    setErrors({
      companyEmail: "",
      establishmentYear: "",
      services: "",
    });
    setUsernameStatus({ loading: false, available: null, message: "" });
    if (onChange) onChange(emptyForm, true);
  };

  const validateEmail = (companyEmail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(companyEmail);
  };

  const validateYear = (year) => {
    const num = parseInt(year);
    return year.length === 4 && num > 1850;
  };

  // Framer Motion staggered animations configuration
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
      {/* BRAND IDENTITY PANEL */}
      {(!readOnly || logo || !readOnly || bannerPreview) && (
        <motion.div
          variants={itemVariants}
          className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl hover:border-white/8 transition-all duration-300 relative z-10"
        >
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} className="text-primary/70" />
              Brand & Identity
            </h3>
            <p className="text-xs text-third/60 mt-1">
              Upload your company logo and banner image to customize your store
              presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Logo column */}
            <div className="flex flex-col items-center gap-3 md:col-span-1">
              <span className="text-xs font-semibold text-third/70 uppercase tracking-wider">
                Logo
              </span>
              <div className="relative group">
                <div
                  onClick={() => !readOnly && logoRef.current.click()}
                  className={`relative w-28 h-28 rounded-full border-2 border-white/10 bg-white/2 backdrop-blur-sm overflow-hidden flex items-center justify-center transition-colors duration-200 ${
                    !readOnly ? "cursor-pointer hover:border-primary group" : ""
                  }`}
                >
                  {!logo ? (
                    <span className="text-third/65 transition-transform duration-300 group-hover:scale-110">
                      <Camera size={28} strokeWidth={1.5} />
                    </span>
                  ) : (
                    <>
                      <Image
                        src={
                          typeof logo === "string"
                            ? logo
                            : URL.createObjectURL(logo)
                        }
                        alt="logo"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {!readOnly && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Camera className="text-white w-6 h-6" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {logo && !readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLogo(null);
                      handleInput("logo", null);
                      if (logoRef.current) logoRef.current.value = "";
                    }}
                    className="cursor-pointer absolute bottom-0 right-0 p-1.5 bg-rose-500/80 hover:bg-rose-600 text-white rounded-full transition-colors duration-200 z-10 shadow-lg"
                    title="Clear Logo"
                  >
                    <Trash2 size={12} />
                  </button>
                )}

                <input
                  ref={logoRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fileExt = "." + file.name.split(".").pop().toLowerCase();
                      const allowedExts = [".jpg", ".jpeg", ".png", ".webp"];
                      if (!allowedExts.includes(fileExt)) {
                        alert("Only JPG, JPEG, PNG, and WEBP formats are supported for the logo.");
                        e.target.value = "";
                        return;
                      }
                      setLogo(file);
                      handleInput("logo", file);
                    }
                  }}
                />
              </div>
            </div>

            {/* Banner column */}
            <div className="md:col-span-2">
              <DropzoneUpload
                label="Banner Image"
                preview={bannerPreview}
                readOnly={readOnly}
                accept=".jpg,.jpeg,.png,.webp"
                supportedText="Supports: JPG, JPEG, PNG, WEBP"
                onChange={(file) => {
                  if (!file) {
                    setBannerPreview(null);
                    handleInput("banner", null);
                    return;
                  }
                  const f = Array.isArray(file) ? file[0] : file;
                  if (f) {
                    setBannerPreview(
                      typeof f === "string" ? f : URL.createObjectURL(f),
                    );
                    handleInput("banner", f);
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* BUSINESS DETAILS PANEL */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl hover:border-white/6 transition-all duration-300 relative z-20"
      >
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <Building2 size={16} className="text-primary/70" />
            Business Details
          </h3>
          <p className="text-xs text-third/60 mt-1">
            Provide the name, email, and establishment year of your consulting
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(!readOnly || form.consultationName) && (
            <SleekInput
              label="Consultation Name"
              placeholder="e.g. Acme Motors"
              readOnly={readOnly}
              value={form.consultationName}
              icon={Building2}
              onChange={(e) => handleInput("consultationName", e.target.value)}
            />
          )}

          {isUpdateMode && (!readOnly || form.username) && (
            <div className="flex flex-col w-full">
              <SleekInput
                label="Username"
                placeholder="e.g. acmemotors"
                readOnly={readOnly}
                value={form.username}
                icon={Globe}
                onChange={(e) =>
                  handleInput("username", e.target.value.toLowerCase().trim())
                }
              />
              {usernameStatus.message && (
                <div
                  className={`flex items-center gap-1 text-[10px] mt-1 ml-1 font-medium ${
                    usernameStatus.available
                      ? "text-emerald-400"
                      : "text-rose-400"
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
                <div className="flex items-center gap-1 text-[10px] mt-1 ml-1 text-third/60">
                  <Loader2 size={10} className="animate-spin" />
                  Checking availability...
                </div>
              )}
            </div>
          )}

          {(!readOnly || form.ownerName) && (
            <SleekInput
              label="Owner Name"
              placeholder="e.g. John Doe"
              readOnly={readOnly}
              value={form.ownerName}
              icon={User}
              onChange={(e) => handleInput("ownerName", e.target.value)}
            />
          )}

          {(!readOnly || form.companyEmail) && (
            <SleekInput
              label="Company Email"
              type="email"
              placeholder="e.g. info@acmemotors.com"
              readOnly={readOnly}
              value={form.companyEmail}
              icon={Mail}
              error={errors.companyEmail}
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
          )}

          {(!readOnly || form.establishmentYear) && (
            <div className="flex flex-col space-y-1.5 w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                Establishment Year
              </span>
              <div className="relative">
                {readOnly ? (
                  <SleekInput
                    readOnly={true}
                    value={form.establishmentYear}
                    icon={Calendar}
                  />
                ) : (
                  <CustomSelect
                    value={form.establishmentYear}
                    onChange={(val) => {
                      handleInput("establishmentYear", val);
                      setErrors((p) => ({ ...p, establishmentYear: "" }));
                    }}
                    options={yearOptions}
                    placeholder="Select Year"
                    variant="transparent"
                    className="h-11 rounded-xl bg-white/2 border-white/8 hover:border-white/20 hover:bg-white/3 focus-within:bg-white/4"
                  />
                )}
              </div>
              {errors.establishmentYear && (
                <span className="text-rose-500 text-[10px] mt-1 ml-1">
                  {errors.establishmentYear}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* OPERATIONS & SERVICES PANEL */}
      {(!readOnly ||
        form.vehicleTypes.length > 0 ||
        !readOnly ||
        form.services.length > 0) && (
        <motion.div
          variants={itemVariants}
          className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-8 shadow-2xl hover:border-white/6 transition-all duration-300 relative z-10"
        >
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <Tag size={16} className="text-primary/70" />
              Operations & Offerings
            </h3>
            <p className="text-xs text-third/60 mt-1">
              Select the vehicle segments and business services your
              consultation supports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vehicle Types */}
            {(!readOnly || form.vehicleTypes.length > 0) && (
              <div className="flex flex-col space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                  Vehicle Types
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    {
                      label: "Two Wheelers",
                      value: "TWO_WHEELER",
                      icon: Bike,
                    },
                    {
                      label: "Four Wheelers",
                      value: "FOUR_WHEELER",
                      icon: Car,
                    },
                  ].map((item) => {
                    const isSelected = form.vehicleTypes.includes(item.value);
                    const Icon = item.icon;
                    if (readOnly && !isSelected) return null;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        disabled={readOnly}
                        onClick={() => {
                          const updated = isSelected
                            ? form.vehicleTypes.filter((v) => v !== item.value)
                            : [...form.vehicleTypes, item.value];
                          handleInput("vehicleTypes", updated);
                        }}
                        className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border transition-all duration-300 rounded-xl
                          ${
                            isSelected
                              ? "bg-primary text-secondary border-primary shadow-[0_0_15px_rgba(255,254,247,0.03)]"
                              : readOnly
                                ? "hidden"
                                : "bg-white/2 text-third border-white/6 hover:border-white/20 hover:bg-white/2 hover:cursor-pointer"
                          }
                        `}
                      >
                        <Icon size={14} strokeWidth={2} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Services */}
            {(!readOnly || form.services.length > 0) && (
              <div className="flex flex-col space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                  Services
                </h4>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {[
                    { label: "Buy", value: "BUY", icon: ShoppingBag },
                    { label: "Sell", value: "SELL", icon: DollarSign },
                    {
                      label: "Exchange",
                      value: "EXCHANGE",
                      icon: ArrowLeftRight,
                    },
                    { label: "Finance", value: "FINANCE", icon: Coins },
                  ].map((item) => {
                    const isSelected = form.services.includes(item.value);
                    const Icon = item.icon;
                    if (readOnly && !isSelected) return null;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        disabled={readOnly}
                        onClick={() => {
                          const isAlreadySelected = form.services.includes(
                            item.value,
                          );
                          if (!isAlreadySelected && form.services.length >= 4) {
                            setErrors((prev) => ({
                              ...prev,
                              services:
                                "You can select a maximum of 4 services.",
                            }));
                            return;
                          }
                          setErrors((prev) => ({ ...prev, services: "" }));
                          const updated = isAlreadySelected
                            ? form.services.filter((s) => s !== item.value)
                            : [...form.services, item.value];
                          handleInput("services", updated);
                        }}
                        className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border transition-all duration-300 rounded-xl
                          ${
                            isSelected
                              ? "bg-primary text-secondary border-primary shadow-[0_0_15px_rgba(255,254,247,0.03)]"
                              : readOnly
                                ? "hidden"
                                : "bg-white/2 text-third border-white/6 hover:border-white/20 hover:bg-white/2 hover:cursor-pointer"
                          }
                        `}
                      >
                        <Icon size={14} strokeWidth={2} />
                        {item.label}
                      </button>
                    );
                  })}

                  {/* Custom Services */}
                  <AnimatePresence>
                    {customServices.map((item) => {
                      const isSelected = form.services.includes(item.value);
                      if (readOnly && !isSelected) return null;
                      return (
                        <motion.div
                          key={item.value}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-300
                            ${
                              isSelected
                                ? "bg-primary text-secondary border-primary shadow-[0_0_15px_rgba(255,254,247,0.03)]"
                                : readOnly
                                  ? "hidden"
                                  : "bg-white/2 text-third border-white/6"
                            }
                          `}
                        >
                          <button
                            type="button"
                            disabled={readOnly}
                            onClick={() => {
                              const isAlreadySelected = form.services.includes(
                                item.value,
                              );
                              if (
                                !isAlreadySelected &&
                                form.services.length >= 4
                              ) {
                                setErrors((prev) => ({
                                  ...prev,
                                  services:
                                    "You can select a maximum of 4 services.",
                                }));
                                return;
                              }
                              setErrors((prev) => ({ ...prev, services: "" }));
                              const updated = isAlreadySelected
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
                              onClick={() =>
                                handleRemoveCustomService(item.value)
                              }
                              className="ml-0.5 opacity-60 hover:opacity-100 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Add Service Trigger Button or Input */}
                  {!readOnly && (
                    <div className="relative">
                      <AnimatePresence mode="wait">
                        {addingService ? (
                          <motion.div
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1.5"
                          >
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
                              className="h-8.5 px-3 text-xs rounded-xl border border-white/6 bg-white/2 text-primary outline-none w-32 focus:border-primary transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={handleAddCustomService}
                              className="w-7.5 h-7.5 rounded-xl cursor-pointer bg-primary text-secondary flex items-center justify-center hover:opacity-85 transition"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setAddingService(false);
                                setServiceInput("");
                              }}
                              className="w-7.5 h-7.5 cursor-pointer rounded-xl border border-white/6 text-third/80 flex items-center justify-center hover:bg-white/2 transition"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="button"
                            type="button"
                            onClick={() => setAddingService(true)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed border-white/6 text-third/75 text-xs hover:border-primary hover:text-primary transition-all duration-300 hover:cursor-pointer bg-white/2"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Custom
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {errors.services && (
                  <p className="text-rose-500 text-[10px] mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
                    {errors.services}
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ===== BACKEND ERROR ===== */}
      {backendError && (
        <p className="text-rose-500 text-sm font-medium mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
          {backendError}
        </p>
      )}
    </motion.div>
  );
}
