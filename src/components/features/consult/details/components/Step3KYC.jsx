"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step3KYC({ onChange, initialData }) {
  // ===== VALIDATION LOGIC =====
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const validateGST = (gst) => gstRegex.test(gst);

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const validatePAN = (pan) => panRegex.test(pan);

  const validateAadhaar = (aadhaar) => {
    const clean = aadhaar.replace(/\s/g, "");
    return /^\d{12}$/.test(clean);
  };

  const [gstPreview, setGstPreview] = useState(
    initialData?.gstCertificateUrl || null,
  );
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
    gstPhoto: null,
    panNumber: initialData?.panCardNumber || "",
    panPhoto: null,
    aadharNumber: initialData?.aadharCardNumber || "",
    aadharFront: null,
    aadharBack: null,
  });

  const [errors, setErrors] = useState({
    gst: null,
    pan: null,
    aadhar: null,
  });

  const handleInput = (key, value) => {
    let val = value;

    // Auto-uppercase and strict length limiting
    if (key === "gstNumber") {
      val = val.toUpperCase().slice(0, 15);
    } else if (key === "panNumber") {
      val = val.toUpperCase().slice(0, 10);
    } else if (key === "aadharNumber") {
      // Remove any non-numeric character, then strictly limit to 12 chars
      val = val.replace(/[^0-9]/g, "").slice(0, 12);
    }

    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));

    // Real-time validation
    if (key === "gstNumber") {
      if (val && !validateGST(val)) {
        setErrors((prev) => ({ ...prev, gst: "Invalid GST Number format" }));
      } else {
        setErrors((prev) => ({ ...prev, gst: null }));
      }
    } else if (key === "panNumber") {
      if (val && !validatePAN(val)) {
        setErrors((prev) => ({ ...prev, pan: "Invalid PAN format (e.g. ABCDE1234F)" }));
      } else {
        setErrors((prev) => ({ ...prev, pan: null }));
      }
    } else if (key === "aadharNumber") {
      if (val && !validateAadhaar(val)) {
        setErrors((prev) => ({ ...prev, aadhar: "Invalid Aadhaar (must be 12 digits)" }));
      } else {
        setErrors((prev) => ({ ...prev, aadhar: null }));
      }
    }
  };

  const createPayload = useCallback(() => {
    const payload = new FormData();

    payload.append("gstNumber", form.gstNumber);
    payload.append("panCardNumber", form.panNumber);
    payload.append("aadharCardNumber", form.aadharNumber);

    if (form.gstPhoto) {
      payload.append("gstCertificateImage", form.gstPhoto);
    }

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

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (onChange) {
      onChange(createPayload(), !isFirstRender.current);
      if (isFirstRender.current) isFirstRender.current = false;
    }
  }, [createPayload, onChange]);

  return (
    <div className="space-y-6">
      <div>
        <InputField
          label="GST Number"
          variant="colored"
          value={form.gstNumber}
          maxLength={15}
          onChange={(e) => handleInput("gstNumber", e.target.value)}
        />
        {errors.gst && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.gst}</p>
        )}
      </div>

      <DropzoneUpload
        label="GST Certificate Photo"
        preview={gstPreview}
        onChange={(file) => {
          const f = Array.isArray(file) ? file[0] : file;
          if (f) {
            setGstPreview(typeof f === "string" ? f : URL.createObjectURL(f));
            handleInput("gstPhoto", f);
          }
        }}
      />

      <div>
        <InputField
          label="PAN Card Number"
          variant="colored"
          value={form.panNumber}
          maxLength={10}
          onChange={(e) => handleInput("panNumber", e.target.value)}
        />
        {errors.pan && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.pan}</p>
        )}
      </div>

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

      <div>
        <InputField
          label="Aadhar Card Number"
          variant="colored"
          value={form.aadharNumber}
          maxLength={12}
          onChange={(e) => handleInput("aadharNumber", e.target.value)}
        />
        {errors.aadhar && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.aadhar}</p>
        )}
      </div>

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
