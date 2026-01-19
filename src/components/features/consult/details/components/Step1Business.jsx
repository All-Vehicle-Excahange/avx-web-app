"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/inputField";
import ChipGroup from "@/components/ui/chipGroup";
import { Camera } from "lucide-react";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step1Business({ onChange }) {
  const logoRef = useRef();
  const [logo, setLogo] = useState(null);
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

    if (form.logo) {
      payload.append("logo", form.logo);
    }

    if (form.banner) {
      payload.append("banner", form.banner);
    }

    payload.append("consultationName", form.consultationName);
    payload.append("ownerName", form.ownerName);
    payload.append("companyEmail", form.email);
    payload.append("establishmentYear", form.establishmentYear);

    form.vehicleTypes.forEach((type, index) => {
      payload.append(`vehicleTypes[${index}]`, type);
    });

    form.services.forEach((service, index) => {
      payload.append(`services[${index}]`, service);
    });

    return payload;
  };

  useEffect(() => {
    if (onChange) {
      onChange(createPayload());
    }
  }, [form]);

  return (
    <div className="space-y-6">
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
                src={URL.createObjectURL(logo)}
                alt="Logo"
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </div>

          {/* CAMERA ICON */}
          <div className="absolute bottom-1 right-1 bg-secondary p-2 rounded-full border border-secondary cursor-pointer">
            <Camera />
          </div>

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setLogo(e.target.files[0]);
              handleInput("logo", e.target.files[0]);
            }}
          />
        </div>
      </div>
      <DropzoneUpload
        label="Banner Image"
        onChange={(file) => {
          const bannerFile = Array.isArray(file) ? file[0] : file;
          handleInput("banner", bannerFile);
        }}
      />

      {/* OTHER FIELDS */}
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
        onChange={(val) => handleInput("vehicleTypes", val)}
      />

      <ChipGroup
        title="Services"
        items={[
          { label: "Buy", value: "BUY" },
          { label: "Sell", value: "SELL" },
          { label: "Exchange", value: "EXCHANGE" },
          { label: "Finance", value: "FINANCE" },
        ]}
        onChange={(val) => handleInput("services", val)}
      />
    </div>
  );
}
