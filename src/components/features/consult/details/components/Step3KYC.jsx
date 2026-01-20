"use client";
import { useEffect, useState } from "react";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step3KYC({ onChange, initialData }) {
  // previews for existing images
  const [panPreview, setPanPreview] = useState(null);
  const [aadharFrontPreview, setAadharFrontPreview] = useState(null);
  const [aadharBackPreview, setAadharBackPreview] = useState(null);

  const [form, setForm] = useState({
    gstNumber: "",
    panNumber: "",
    panPhoto: null,

    aadharNumber: "",
    aadharFront: null,
    aadharBack: null,
  });

  // ===== PREFILL FROM API =====
  useEffect(() => {
    if (!initialData) return;

    setForm({
      gstNumber: initialData.gstNumber || "",
      panNumber: initialData.panCardNumber || "",
      aadharNumber: initialData.aadharCardNumber || "",

      // files cannot be prefilled
      panPhoto: null,
      aadharFront: null,
      aadharBack: null,
    });

    // SHOW EXISTING IMAGES
    if (initialData?.panCardFrontUrl) {
      setPanPreview(initialData.panCardFrontUrl);
    }

    if (initialData?.aadharCardFrontUrl) {
      setAadharFrontPreview(initialData.aadharCardFrontUrl);
    }

    if (initialData?.aadharCardBackUrl) {
      setAadharBackPreview(initialData.aadharCardBackUrl);
    }
  }, [initialData]);

  const handleInput = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ----- CREATE FORM DATA PAYLOAD -----
  const createPayload = () => {
    const payload = new FormData();

    payload.append("gstNumber", form.gstNumber);
    payload.append("panCardNumber", form.panNumber);
    payload.append("aadharCardNumber", form.aadharNumber);

    if (form.panPhoto) {
      payload.append("panCardFrontImage", form.panPhoto);
    }

    if (form.aadharFront) {
      payload.append("aadharCardFrontImage", form.aadharFront);
    }

    if (form.aadharBack) {
      payload.append("aadharCardBackImage", form.aadharBack);
    }

    return payload;
  };

  useEffect(() => {
    onChange && onChange(createPayload());
  }, [form]);

  return (
    <div className="space-y-6">
      <InputField
        label="GST Number"
        variant="colored"
        value={form.gstNumber}
        onChange={(e) => handleInput("gstNumber", e.target.value)}
      />

      <InputField
        label="PAN Card Number"
        variant="colored"
        value={form.panNumber}
        onChange={(e) => handleInput("panNumber", e.target.value)}
      />

      <DropzoneUpload
        label="PAN Card Photo"
        preview={panPreview}
        onChange={(file) => {
          const f = Array.isArray(file) ? file[0] : file;

          setPanPreview(typeof f === "string" ? f : URL.createObjectURL(f));

          handleInput("panPhoto", f);
        }}
      />

      <InputField
        label="Aadhar Card Number"
        variant="colored"
        value={form.aadharNumber}
        onChange={(e) => handleInput("aadharNumber", e.target.value)}
      />

      <DropzoneUpload
        label="Aadhar Front Photo"
        preview={aadharFrontPreview}
        onChange={(file) => {
          const f = Array.isArray(file) ? file[0] : file;

          setAadharFrontPreview(
            typeof f === "string" ? f : URL.createObjectURL(f),
          );

          handleInput("aadharFront", f);
        }}
      />

      <DropzoneUpload
        label="Aadhar Back Photo"
        preview={aadharBackPreview}
        onChange={(file) => {
          const f = Array.isArray(file) ? file[0] : file;

          setAadharBackPreview(
            typeof f === "string" ? f : URL.createObjectURL(f),
          );

          handleInput("aadharBack", f);
        }}
      />
    </div>
  );
}
