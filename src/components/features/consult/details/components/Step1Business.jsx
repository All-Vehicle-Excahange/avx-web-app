"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/inputField";
import ChipGroup from "@/components/ui/chipGroup";
import { Camera } from "lucide-react";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step1Business({ onChange, initialData }) {
  const logoRef = useRef();

  const [logo, setLogo] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [form, setForm] = useState({
    logo: null,
    banner: null,

    consultationName: "",
    ownerName: "",
    email: "",
    establishmentYear: "",

    vehicleTypes: [],
    services: [],
  });

  const handleInput = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const createPayload = () => {
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
  };

  // send to parent
  useEffect(() => {
    onChange && onChange(createPayload());
  }, [form]);

  // ===== AUTOFILL FROM API =====
  useEffect(() => {
    if (!initialData) return;

    setForm({
      logo: null,
      banner: null,

      consultationName: initialData.consultationName || "",
      ownerName: initialData.ownerName || "",
      email: initialData.companyEmail || "",
      establishmentYear: initialData.establishmentYear || "",

      vehicleTypes: initialData.vehicleTypes || [],
      services: initialData.services || [],
    });

    // SHOW EXISTING IMAGES
    if (initialData?.logoUrl) {
      setLogo(initialData.logoUrl);
    }

    if (initialData?.bannerUrl) {
      setBannerPreview(initialData.bannerUrl);
    }
  }, [initialData]);

  return (
    <div className="space-y-6">
      {/* ===== LOGO ===== */}
      <div className="flex justify-center">
        <div className="relative">
          <div
            onClick={() => logoRef.current.click()}
            className="relative w-32 h-32 rounded-full border-4 border-primary/60 bg-primary/10 overflow-hidden cursor-pointer flex items-center justify-center"
          >
            {!logo ? (
              <span className="text-third text-xs text-center px-3">
                Upload Logo
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
          </div>

          <div className="absolute bottom-1 right-1 bg-secondary p-2 rounded-full border cursor-pointer">
            <Camera />
          </div>

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              setLogo(file);
              handleInput("logo", file);
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

          setBannerPreview(typeof f === "string" ? f : URL.createObjectURL(f));

          handleInput("banner", f);
        }}
      />

      {/* ===== FIELDS ===== */}
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

      <InputField
        label="Company Email"
        type="email"
        variant="colored"
        value={form.email}
        onChange={(e) => handleInput("email", e.target.value)}
      />

      <InputField
        label="Establishment Year"
        variant="colored"
        value={form.establishmentYear}
        onChange={(e) => handleInput("establishmentYear", e.target.value)}
      />

      <ChipGroup
        title="Vehicle Types"
        items={[
          { label: "Two Wheelers", value: "TWO_WHEELER" },
          { label: "Four Wheelers", value: "FOUR_WHEELER" },
          { label: "Other", value: "OTHER" },
        ]}
        onChange={(v) => handleInput("vehicleTypes", v)}
      />

      <ChipGroup
        title="Services"
        items={[
          { label: "Buy", value: "BUY" },
          { label: "Sell", value: "SELL" },
          { label: "Exchange", value: "EXCHANGE" },
          { label: "Finance", value: "FINANCE" },
        ]}
        onChange={(v) => handleInput("services", v)}
      />
    </div>
  );
}
