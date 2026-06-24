/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import SleekInput from "@/components/ui/sleekInput";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { CreditCard, Fingerprint, ReceiptText, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function Step3KYC({
  onChange,
  initialData,
  readOnly = false,
  isUpdateMode = false,
  submitAttempted = false,
  backendError = "",
}) {
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
    atLeastOne: null,
  });

  // ===== CROSS-FIELD VALIDATION =====
  useEffect(() => {
    const newErrors = { gst: null, pan: null, aadhar: null, atLeastOne: null };

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
      newErrors.aadhar =
        "Both Aadhaar number and front/back images are required.";
    } else if (!hasAadharNum && (hasAadharFront || hasAadharBack)) {
      newErrors.aadhar =
        "Both Aadhaar number and front/back images are required.";
    } else if (hasAadharNum && !validateAadhaar(form.aadharNumber)) {
      newErrors.aadhar = "Invalid Aadhaar (must be 12 digits)";
    }

    // 4. At-least-one: PAN or Aadhaar must be fully provided
    const panComplete = hasPanNum && hasPanImg && !newErrors.pan;
    const aadharComplete = hasAadharNum && hasAllAadharImg && !newErrors.aadhar;
    if (!panComplete && !aadharComplete) {
      newErrors.atLeastOne =
        "At least one identity document is required — please provide either your PAN Card or Aadhaar Card (number + photo).";
    }

    setErrors(newErrors);

    if (onChange) {
      const isChanged = JSON.stringify(form) !== JSON.stringify(initialData);
      onChange(form, isChanged, newErrors);
    }
  }, [form, gstPreview, panPreview, aadharFrontPreview, aadharBackPreview]);

  const handleInput = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
  };

  const handleClear = () => {
    const emptyForm = {
      gstNumber: "",
      gstPhoto: null,
      panNumber: "",
      panPhoto: null,
      aadharNumber: "",
      aadharFront: null,
      aadharBack: null,
    };
    setForm(emptyForm);
    setGstPreview(null);
    setPanPreview(null);
    setAadharFrontPreview(null);
    setAadharBackPreview(null);
    if (onChange) onChange(emptyForm, true);
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
      {/* PAN Card Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl hover:border-white/6 transition-all duration-300 relative z-10"
      >
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <CreditCard size={16} className="text-primary/70" />
            PAN Card Verification
          </h3>
          <p className="text-xs text-third/60 mt-1">
            Provide your 10-digit Permanent Account Number and upload the document.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <SleekInput
            label="PAN Card Number"
            placeholder="e.g. ABCDE1234F"
            readOnly={readOnly}
            value={form.panNumber}
            icon={CreditCard}
            maxLength={10}
            onChange={(e) => {
              const val = e.target.value.toUpperCase().slice(0, 10);
              handleInput("panNumber", val);
            }}
          />

          <DropzoneUpload
            label="PAN Card Photo"
            preview={panPreview}
            readOnly={readOnly}
            accept=".jpg,.jpeg,.png,.webp"
            supportedText="Supports: JPG, JPEG, PNG, WEBP"
            onChange={(file) => {
              if (!file) {
                setPanPreview(null);
                handleInput("panPhoto", null);
                return;
              }
              const f = Array.isArray(file) ? file[0] : file;
              if (f) {
                setPanPreview(typeof f === "string" ? f : URL.createObjectURL(f));
                handleInput("panPhoto", f);
              }
            }}
          />
        </div>

        {errors.pan && (
          <p className="text-rose-500 text-sm font-medium mt-1 ml-1">
            {errors.pan}
          </p>
        )}
      </motion.div>

      {/* OR Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-secondary px-4 text-xs font-semibold text-third/35 uppercase tracking-widest  py-1 rounded-full border border-white/5 backdrop-blur-sm">
            OR
          </span>
        </div>
      </div>

      {/* Aadhaar Card Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl hover:border-white/6 transition-all duration-300 relative z-10"
      >
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <Fingerprint size={16} className="text-primary/70" />
            Aadhaar Card Verification
          </h3>
          <p className="text-xs text-third/60 mt-1">
            Provide your 12-digit Aadhaar number and upload front and back photos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <SleekInput
            label="Aadhaar Card Number"
            placeholder="1234-5678-9012"
            readOnly={readOnly}
            value={formatAadhaar(form.aadharNumber)}
            icon={Fingerprint}
            maxLength={14}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              if (raw.length <= 12) {
                handleInput("aadharNumber", raw);
              }
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DropzoneUpload
              label="Aadhaar Front Photo"
              preview={aadharFrontPreview}
              readOnly={readOnly}
              accept=".jpg,.jpeg,.png,.webp"
              supportedText="Supports: JPG, JPEG, PNG, WEBP"
              onChange={(file) => {
                if (!file) {
                  setAadharFrontPreview(null);
                  handleInput("aadharFront", null);
                  return;
                }
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
              label="Aadhaar Back Photo"
              preview={aadharBackPreview}
              readOnly={readOnly}
              accept=".jpg,.jpeg,.png,.webp"
              supportedText="Supports: JPG, JPEG, PNG, WEBP"
              onChange={(file) => {
                if (!file) {
                  setAadharBackPreview(null);
                  handleInput("aadharBack", null);
                  return;
                }
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
        </div>

        {errors.aadhar && (
          <p className="text-rose-500 text-sm font-medium mt-1 ml-1">
            {errors.aadhar}
          </p>
        )}
        {!errors.aadhar && submitAttempted && errors.atLeastOne && (
          <p className="text-rose-500 text-sm font-medium mt-1 ml-1 flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
            <ShieldAlert size={16} className="text-rose-500" />
            {errors.atLeastOne}
          </p>
        )}
      </motion.div>

      {/* GST Certificate Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl hover:border-white/6 transition-all duration-300 relative z-10"
      >
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <ReceiptText size={16} className="text-primary/70" />
            GST Registration <span className="text-third/40 text-[10px]  normal-case tracking-normal ml-1">(Optional)</span>
          </h3>
          <p className="text-xs text-third/60 mt-1">
            If your business is GST registered, provide details and certificate upload.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <SleekInput
            label="GST Number"
            placeholder="e.g. 07ABCDE1234F1Z5"
            readOnly={readOnly}
            value={form.gstNumber}
            icon={ReceiptText}
            maxLength={15}
            onChange={(e) => {
              const val = e.target.value.toUpperCase().slice(0, 15);
              handleInput("gstNumber", val);
            }}
          />

          <DropzoneUpload
            label="GST Certificate Photo"
            preview={gstPreview}
            readOnly={readOnly}
            accept=".jpg,.jpeg,.png,.webp"
            supportedText="Supports: JPG, JPEG, PNG, WEBP"
            onChange={(file) => {
              if (!file) {
                setGstPreview(null);
                handleInput("gstPhoto", null);
                return;
              }
              const f = Array.isArray(file) ? file[0] : file;
              if (f) {
                setGstPreview(typeof f === "string" ? f : URL.createObjectURL(f));
                handleInput("gstPhoto", f);
              }
            }}
          />
        </div>

        {errors.gst && (
          <p className="text-rose-500 text-sm font-medium mt-1 ml-1">
            {errors.gst}
          </p>
        )}
      </motion.div>

      {/* ===== BACKEND ERROR ===== */}
      {backendError && (
        <p className="text-rose-500 text-sm font-medium mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
          {backendError}
        </p>
      )}
    </motion.div>
  );
}
