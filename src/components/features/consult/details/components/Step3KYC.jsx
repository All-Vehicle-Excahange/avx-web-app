"use client";
import { useEffect, useState, useCallback } from "react";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step3KYC({ onChange, initialData, readOnly = false }) {
  // ===== VALIDATION LOGIC =====
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const validateGST = (gst) => gstRegex.test(gst);

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const validatePAN = (pan) => panRegex.test(pan);

  const validateAadhaar = (aadhaar) => {
    const clean = aadhaar.replace(/[\s-]/g, "");
    return /^\d{12}$/.test(clean);
  };

  // Format raw 12-digit aadhaar → XXXX-XXXX-XXXX for display only
  const formatAadhaar = (raw) => {
    const digits = raw.replace(/\D/g, "");
    return digits.replace(/(\d{4})(?=\d)/g, "$1-");
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
    // Store raw 12 digits — no dashes
    aadharNumber: (initialData?.aadharCardNumber || "").replace(/\D/g, ""),
    aadharFront: null,
    aadharBack: null,
  });

  const [errors, setErrors] = useState({
    gst: null,
    pan: null,
    aadhar: null,
  });

  // ===== CROSS-FIELD VALIDATION =====
  useEffect(() => {
    const newErrors = { gst: null, pan: null, aadhar: null };

    // 1. GST Dependency
    const hasGstNum = !!form.gstNumber.trim();
    const hasGstImg = !!gstPreview;
    if (hasGstNum && !hasGstImg) {
      newErrors.gst = "Both GST number and image are required.";
    } else if (!hasGstNum && hasGstImg) {
      newErrors.gst = "Both GST number and image are required.";
    } else if (hasGstNum && !validateGST(form.gstNumber)) {
      newErrors.gst = "Invalid GST Number format (e.g. 07ABCDE1234F1Z5)";
    }

    // 2. PAN Dependency
    const hasPanNum = !!form.panNumber.trim();
    const hasPanImg = !!panPreview;
    if (hasPanNum && !hasPanImg) {
      newErrors.pan = "Both PAN number and image are required.";
    } else if (!hasPanNum && hasPanImg) {
      newErrors.pan = "Both PAN number and image are required.";
    } else if (hasPanNum && !validatePAN(form.panNumber)) {
      newErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    }

    // 3. Aadhaar Dependency
    const hasAadharNum = !!form.aadharNumber.trim();
    const hasAadharFront = !!aadharFrontPreview;
    const hasAadharBack = !!aadharBackPreview;
    const hasAllAadharImg = hasAadharFront && hasAadharBack;

    if (hasAadharNum && !hasAllAadharImg) {
      newErrors.aadhar = "Both Aadhaar number and front/back images are required.";
    } else if (!hasAadharNum && (hasAadharFront || hasAadharBack)) {
      newErrors.aadhar = "Both Aadhaar number and front/back images are required.";
    } else if (hasAadharNum && !validateAadhaar(form.aadharNumber)) {
      newErrors.aadhar = "Invalid Aadhaar (must be 12 digits)";
    }


    setErrors(newErrors);
  }, [
    form.gstNumber,
    form.panNumber,
    form.aadharNumber,
    gstPreview,
    panPreview,
    aadharFrontPreview,
    aadharBackPreview,
  ]);

  const handleInput = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
    if (onChange) {
      const isChanged =
        JSON.stringify(updatedForm) !== JSON.stringify(initialData);
      onChange(updatedForm, isChanged);
    }
  };


  return (
    <div className="space-y-6">
      {/* GST SECTION */}
      <div className="space-y-4">
        <div className="space-y-1">
          <InputField
            label="GST Number"
            variant="colored"
            readOnly={readOnly}
            value={form.gstNumber}
            maxLength={15}
            onChange={(e) => {
              const val = e.target.value.toUpperCase().slice(0, 15);
              handleInput("gstNumber", val);
            }}
          />
        </div>

        <DropzoneUpload
          label="GST Certificate Photo"
          preview={gstPreview}
          readOnly={readOnly}
          onChange={(file) => {
            const f = Array.isArray(file) ? file[0] : file;
            if (f) {
              setGstPreview(typeof f === "string" ? f : URL.createObjectURL(f));
              handleInput("gstPhoto", f);
            }
          }}
        />
        {errors.gst && (
          <p className="text-red-500 text-sm font-medium mt-1 ml-1">
            {errors.gst}
          </p>
        )}
      </div>

      <div className="h-px bg-primary/10 my-6" />

      {/* PAN SECTION */}
      <div className="space-y-4">
        <div className="space-y-1">
          <InputField
            label="PAN Card Number"
            variant="colored"
            readOnly={readOnly}
            value={form.panNumber}
            maxLength={10}
            onChange={(e) => {
              const val = e.target.value.toUpperCase().slice(0, 10);
              handleInput("panNumber", val);
            }}
          />
        </div>

        <DropzoneUpload
          label="PAN Card Photo"
          preview={panPreview}
          readOnly={readOnly}
          onChange={(file) => {
            const f = Array.isArray(file) ? file[0] : file;
            if (f) {
              setPanPreview(typeof f === "string" ? f : URL.createObjectURL(f));
              handleInput("panPhoto", f);
            }
          }}
        />
        {errors.pan && (
          <p className="text-red-500 text-sm font-medium mt-1 ml-1">
            {errors.pan}
          </p>
        )}
      </div>

      <div className="h-px bg-primary/10 my-6" />

      {/* AADHAAR SECTION */}
      <div className="space-y-4">
        <div className="space-y-1">
          <InputField
            label="Aadhar Card Number"
            variant="colored"
            readOnly={readOnly}
            placeholder="1234-5678-9012"
            value={formatAadhaar(form.aadharNumber)}
            maxLength={14}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              if (raw.length <= 12) {
                handleInput("aadharNumber", raw);
              }
            }}
          />
        </div>

        <DropzoneUpload
          label="Aadhar Front Photo"
          preview={aadharFrontPreview}
          readOnly={readOnly}
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
          readOnly={readOnly}
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
        {errors.aadhar && (
          <p className="text-red-500 text-sm font-medium mt-1 ml-1">
            {errors.aadhar}
          </p>
        )}
      </div>
    </div>
  );
}
