/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import SleekInput from "@/components/ui/sleekInput";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import CustomSelect from "@/components/ui/custom-select";
import { ReceiptText, Trash2, FileBadge, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ID_OPTIONS = [
  { label: "PAN Card", value: "PAN Card" },
  { label: "Driving Licence", value: "Driving Licence" },
  { label: "Voter ID", value: "Voter ID" },
];

export default function Step3KYC({
  onChange,
  initialData,
  readOnly = false,
  isUpdateMode = false,
  submitAttempted = false,
  backendError = "",
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [gstPreview, setGstPreview] = useState(initialData?.gstCertificateUrl || null);

  // Convert old structure to new structure if needed, or start fresh
  const [form, setForm] = useState(() => {
    // Helper to sanitize "null" strings from backend
    const sanitize = (val) => (val === "null" || val === null || val === undefined) ? "" : val;
    const sanitizeUrl = (val) => (val === "null" || val === null || val === undefined) ? null : val;

    const initForm = {
      gstNumber: sanitize(initialData?.gstNumber),
      gstPhoto: null,
      documents: []
    };

    // Map existing initialData to documents if any
    if (sanitize(initialData?.panCardNumber) || sanitizeUrl(initialData?.panCardFrontUrl)) {
      initForm.documents.push({
        id: Date.now() + Math.random(),
        type: "PAN Card",
        number: sanitize(initialData?.panCardNumber),
        photo: null,
        preview: sanitizeUrl(initialData?.panCardFrontUrl),
        isExisting: !!sanitizeUrl(initialData?.panCardFrontUrl)
      });
    }
    if (sanitize(initialData?.drivingLicense) || sanitizeUrl(initialData?.drivingLicenseFrontUrl)) {
      initForm.documents.push({
        id: Date.now() + Math.random(),
        type: "Driving Licence",
        number: sanitize(initialData?.drivingLicense),
        photo: null,
        preview: sanitizeUrl(initialData?.drivingLicenseFrontUrl),
        isExisting: !!sanitizeUrl(initialData?.drivingLicenseFrontUrl)
      });
    }
    if (sanitize(initialData?.voterIdNumber) || sanitizeUrl(initialData?.voterIdFrontUrl)) {
      initForm.documents.push({
        id: Date.now() + Math.random(),
        type: "Voter ID",
        number: sanitize(initialData?.voterIdNumber),
        photo: null,
        preview: sanitizeUrl(initialData?.voterIdFrontUrl),
        isExisting: !!sanitizeUrl(initialData?.voterIdFrontUrl)
      });
    }
    if (initForm.documents.length === 0) {
      initForm.documents.push({
        id: Date.now(),
        type: "PAN Card",
        number: "",
        photo: null,
        preview: null,
        isExisting: false
      });
    }

    return initForm;
  });

  const [errors, setErrors] = useState({
    gst: null,
    documents: [],
    general: null
  });

  // Validation
  useEffect(() => {
    const newErrors = { gst: null, documents: [], general: null };
    let hasValidDoc = false;

    // GST Validation
    const hasGstNum = !!form.gstNumber.trim();
    const hasGstImg = !!(form.gstPhoto || gstPreview);

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (hasGstNum && !gstRegex.test(form.gstNumber)) {
      newErrors.gst = "Invalid GST Number format";
    } else if (submitAttempted) {
      if (hasGstNum && !hasGstImg) newErrors.gst = "GST image is required if number is provided.";
      if (!hasGstNum && hasGstImg) newErrors.gst = "GST number is required if image is provided.";
    }

    // Documents Validation
    const docErrors = [];
    form.documents.forEach((doc, index) => {
      const docErr = {};
      const hasNum = !!doc.number.trim();
      const hasImg = !!(doc.photo || doc.preview);

      let isValidNumber = true;
      let validationMsg = "";

      if (hasNum) {
        if (doc.type === "PAN Card") {
          isValidNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(doc.number);
          validationMsg = "Invalid PAN Card format (e.g., ABCDE1234F)";
        } else if (doc.type === "Driving Licence") {
          isValidNumber = /^[A-Z0-9]{15}$/.test(doc.number);
          validationMsg = "Invalid Driving Licence format (15 characters)";
        } else if (doc.type === "Voter ID") {
          isValidNumber = /^[A-Z]{3}[0-9]{7}$/.test(doc.number);
          validationMsg = "Invalid Voter ID format (e.g., ABC1234567)";
        }
      }

      if (hasNum && !isValidNumber) {
        docErr.error = validationMsg;
      } else if (submitAttempted && (hasNum || hasImg) && (!hasNum || !hasImg)) {
        docErr.error = "Both Document Number and Upload Front image are required.";
      }

      if (hasNum && isValidNumber && hasImg) hasValidDoc = true;

      docErrors[index] = docErr;
    });
    newErrors.documents = docErrors;

    if (submitAttempted && !hasValidDoc) {
      newErrors.general = "Please provide at least one complete identity document.";
    }

    setErrors(newErrors);

    if (onChange) {
      onChange(form, true, newErrors);
    }
  }, [form, gstPreview, submitAttempted]);

  const getPlaceholder = (type) => {
    switch (type) {
      case "PAN Card":
        return "e.g., ABCDE1234F";
      case "Driving Licence":
        return "e.g., GJ0120110000000";
      case "Voter ID":
        return "e.g., ABC1234567";
      default:
        return "Enter Document Number";
    }
  };

  const getMaxLength = (type) => {
    switch (type) {
      case "PAN Card": return 10;
      case "Voter ID": return 10;
      case "Driving Licence": return 15;
      default: return 20;
    }
  };

  const updateDoc = (id, field, value) => {
    setForm(prev => ({
      ...prev,
      documents: prev.documents.map(d => d.id === id ? { ...d, [field]: value } : d)
    }));
  };

  const addDoc = () => {
    setForm(prev => {
      const selectedTypes = prev.documents.map(d => d.type).filter(Boolean);
      const nextType = ID_OPTIONS.find(opt => !selectedTypes.includes(opt.value))?.value || "";
      return {
        ...prev,
        documents: [
          ...prev.documents,
          { id: Date.now(), type: nextType, number: "", photo: null, preview: null, isExisting: false }
        ]
      };
    });
  };

  const removeDoc = (id) => {
    setForm(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  };

  const backendGstError = backendError?.toLowerCase().includes("gst") ? backendError : null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 relative"
    >

      {/* Identity Verification Header */}
      <motion.div variants={itemVariants} className="pt-2">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2 mb-4">
          <FileBadge size={16} className="text-primary/70" />
          Identity Verification
        </h2>
      </motion.div>

      {/* Dynamic Documents List */}
      <AnimatePresence>
        {form.documents.map((doc, index) => {
          const selectedValues = form.documents.map(d => d.type).filter(Boolean);
          const availableOptions = ID_OPTIONS.filter(opt => opt.value === doc.type || !selectedValues.includes(opt.value));

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-transparent sm:bg-white/2 sm:backdrop-blur-md border-0 sm:border border-white/5 rounded-2xl px-0 py-4 sm:p-6 shadow-none sm:shadow-2xl sm:hover:border-white/6 transition-all duration-300 relative z-10">

                {index > 0 && !readOnly && !doc.isExisting && (
                  <button
                    type="button"
                    onClick={() => removeDoc(doc.id)}
                    className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 transition-colors z-20 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="grid grid-cols-1 gap-5 mt-1">
                  {/* ID Type Dropdown */}
                  <div className="flex flex-col space-y-1.5 w-full">
                    <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                      ID Type <span className="text-rose-500">*</span>
                    </span>
                    <div className="relative">
                      {readOnly || doc.isExisting ? (
                        <SleekInput readOnly={true} value={doc.type} />
                      ) : (
                        <CustomSelect
                          value={doc.type}
                          options={availableOptions}
                          placeholder="Select ID Type"
                          variant="transparent"
                          readOnly={readOnly}
                          onChange={(val) => updateDoc(doc.id, "type", val)}
                        />
                      )}
                    </div>
                  </div>

                  <SleekInput
                    label="Document Number *"
                    placeholder={getPlaceholder(doc.type)}
                    readOnly={readOnly}
                    value={doc.number}
                    maxLength={getMaxLength(doc.type)}
                    error={errors.documents?.[index]?.error}
                    onChange={(e) => updateDoc(doc.id, "number", e.target.value.toUpperCase().slice(0, getMaxLength(doc.type)))}
                  />

                  <DropzoneUpload
                    label="Upload Front *"
                    preview={doc.preview}
                    readOnly={readOnly}
                    accept=".jpg,.jpeg,.png,.webp"
                    supportedText="Supports: JPG, JPEG, PNG, WEBP"
                    onChange={(file) => {
                      if (!file) {
                        updateDoc(doc.id, "preview", null);
                        updateDoc(doc.id, "photo", null);
                        return;
                      }
                      const f = Array.isArray(file) ? file[0] : file;
                      if (f) {
                        updateDoc(doc.id, "preview", typeof f === "string" ? f : URL.createObjectURL(f));
                        updateDoc(doc.id, "photo", f);
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {!readOnly && form.documents.length < ID_OPTIONS.length && (
        <motion.div variants={itemVariants} className="flex justify-end !mt-2">
          <button
            type="button"
            onClick={addDoc}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Plus size={16} /> Add Another Document
          </button>
        </motion.div>
      )}

      {/* GST Certificate Card (Optional) */}
      <motion.div
        variants={itemVariants}
        className="bg-transparent sm:bg-white/2 sm:backdrop-blur-md border-0 sm:border border-white/5 rounded-2xl px-0 py-4 sm:p-6 shadow-none sm:shadow-2xl sm:hover:border-white/6 transition-all duration-300 relative z-20 mt-8"
      >
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <ReceiptText size={16} className="text-primary/70" />
            GST Registration <span className="text-third/40 text-[10px] normal-case tracking-normal ml-1">(Optional)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-3">
          <SleekInput
            label="GST Number"
            placeholder="e.g. 07ABCDE1234F1Z5"
            readOnly={readOnly}
            value={form.gstNumber}
            icon={ReceiptText}
            maxLength={15}
            error={errors.gst || backendGstError}
            onChange={(e) => {
              const val = e.target.value.toUpperCase().slice(0, 15);
              setForm(prev => ({ ...prev, gstNumber: val }));
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
                setForm(prev => ({ ...prev, gstPhoto: null }));
                return;
              }
              const f = Array.isArray(file) ? file[0] : file;
              if (f) {
                setGstPreview(typeof f === "string" ? f : URL.createObjectURL(f));
                setForm(prev => ({ ...prev, gstPhoto: f }));
              }
            }}
          />
        </div>
      </motion.div>

      {(errors.general || (backendError && !backendGstError)) && (
        <p className="text-rose-500 text-sm font-medium mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
          {errors.general || (backendError?.includes("Aadhaar") ? "Please provide at least one complete identity document." : backendError)}
        </p>
      )}
    </motion.div>
  );
}
