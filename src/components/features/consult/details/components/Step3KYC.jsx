"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

export default function Step3KYC({ onChange, initialData, readOnly = false }) {
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
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
    if (onChange) onChange(updatedForm);

    // Real-time validation
    if (key === "gstNumber") {
      if (value && !validateGST(value)) {
        setErrors((prev) => ({ ...prev, gst: "Invalid GST Number format" }));
      } else {
        setErrors((prev) => ({ ...prev, gst: null }));
      }
    } else if (key === "panNumber") {
      if (value && !validatePAN(value)) {
        setErrors((prev) => ({
          ...prev,
          pan: "Invalid PAN format (e.g. ABCDE1234F)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, pan: null }));
      }
    } else if (key === "aadharNumber") {
      if (value && !validateAadhaar(value)) {
        setErrors((prev) => ({
          ...prev,
          aadhar: "Invalid Aadhaar (must be 12 digits)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, aadhar: null }));
      }
    }
  };


  return (
    <div className="space-y-6">
      {(!readOnly || form.gstNumber) && (
        <div className="space-y-1">
          <InputField
            label="GST Number"
            variant="colored"
            readOnly={readOnly}
            value={form.gstNumber}
            maxLength={15}
            onChange={(e) => handleInput("gstNumber", e.target.value)}
          />
          {errors.gst && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.gst}</p>
          )}
        </div>
      )}

      {(!readOnly || gstPreview) && (
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
      )}

      {(!readOnly || form.panNumber) && (
        <div className="space-y-1">
          <InputField
            label="PAN Card Number"
            variant="colored"
            readOnly={readOnly}
            value={form.panNumber}
            maxLength={10}
            onChange={(e) => handleInput("panNumber", e.target.value)}
          />
          {errors.pan && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.pan}</p>
          )}
        </div>
      )}

      {(!readOnly || panPreview) && (
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
      )}

      {(!readOnly || form.aadharNumber) && (
        <div className="space-y-1">
          <InputField
            label="Aadhar Card Number"
            variant="colored"
            readOnly={readOnly}
            value={form.aadharNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ""); // Remove non-digits
              if (val.length <= 12) {
                handleInput("aadharNumber", val);
              }
            }}
          />
          {errors.aadhar && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.aadhar}</p>
          )}
        </div>
      )}

      {(!readOnly || aadharFrontPreview) && (
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
      )}

      {(!readOnly || aadharBackPreview) && (
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
      )}
    </div>
  );
}
