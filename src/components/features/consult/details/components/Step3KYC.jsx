"use client";
import { useEffect, useState, useCallback } from "react";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step3KYC({ onChange, initialData }) {
  const [panPreview, setPanPreview] = useState(
    initialData?.panCardFrontUrl || null,
  );
  const [aadharFrontPreview, setAadharFrontPreview] = useState(
    initialData?.aadharCardFrontUrl || null,
  );
  const [aadharBackPreview, setAadharBackPreview] = useState(
    initialData?.aadharCardBackUrl || null,
  );
  const [form, setForm] = useState({
    gstNumber: initialData?.gstNumber || "",
    panNumber: initialData?.panCardNumber || "",
    panPhoto: null,
    aadharNumber: initialData?.aadharCardNumber || "",
    aadharFront: null,
    aadharBack: null,
  });

  const handleInput = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const createPayload = useCallback(() => {
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
  }, [form]);

  useEffect(() => {
    if (onChange) {
      onChange(createPayload(), false);
    }
  }, [createPayload, onChange]);

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
          if (f) {
            setPanPreview(typeof f === "string" ? f : URL.createObjectURL(f));
            handleInput("panPhoto", f);
          }
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
          if (f) {
            setAadharFrontPreview(
              typeof f === "string" ? f : URL.createObjectURL(f),
            );
            handleInput("aadharFront", f);
          }
        }}
      />

      <DropzoneUpload
        label="Aadhar Back Photo"
        preview={aadharBackPreview}
        onChange={(file) => {
          const f = Array.isArray(file) ? file[0] : file;
          if (f) {
            setAadharBackPreview(
              typeof f === "string" ? f : URL.createObjectURL(f),
            );
            handleInput("aadharBack", f);
          }
        }}
      />
    </div>
  );
}
