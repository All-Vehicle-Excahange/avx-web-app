import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import SleekInput from "@/components/ui/sleekInput";
import CustomSelect from "@/components/ui/custom-select";
import { postBecameSeller, updateBecameSeller } from "@/services/user.service";
import Button from "@/components/ui/button";
import Image from "next/image";
import { X, CheckCircle2, Loader2, AlertCircle, Trash2, Plus, ReceiptText, FileBadge } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

const ID_OPTIONS = [
  { label: "PAN Card", value: "PAN Card" },
  { label: "Driving Licence", value: "Driving Licence" },
  { label: "Voter ID", value: "Voter ID" },
];

function DetailsFromPopup({
  isOpen,
  onClose,
  onSubmit,
  existing,
  viewOnly = false,
}) {
  const { push } = useRouter();
  const isViewOnly = viewOnly || existing?.verificationStatus === "REJECTED";

  const [form, setForm] = useState({ documents: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (existing) {
      const docs = [];
      if (existing.panCardNumber || existing.panCardFrontUrl) {
        docs.push({
          id: Date.now() + Math.random(),
          type: "PAN Card",
          number: existing.panCardNumber || "",
          photo: null,
          preview: existing.panCardFrontUrl || null,
          isExisting: !!existing.panCardFrontUrl
        });
      }
      if (existing.drivingLicense || existing.drivingLicenseFrontUrl) {
        docs.push({
          id: Date.now() + Math.random(),
          type: "Driving Licence",
          number: existing.drivingLicense || "",
          photo: null,
          preview: existing.drivingLicenseFrontUrl || null,
          isExisting: !!existing.drivingLicenseFrontUrl
        });
      }
      if (existing.voterIdNumber || existing.voterIdFrontUrl) {
        docs.push({
          id: Date.now() + Math.random(),
          type: "Voter ID",
          number: existing.voterIdNumber || "",
          photo: null,
          preview: existing.voterIdFrontUrl || null,
          isExisting: !!existing.voterIdFrontUrl
        });
      }
      if (docs.length === 0) {
        docs.push({ id: Date.now(), type: "PAN Card", number: "", photo: null, preview: null, isExisting: false });
      }
      setForm({ documents: docs });
    } else {
      setForm({
        documents: [{ id: Date.now(), type: "PAN Card", number: "", photo: null, preview: null, isExisting: false }]
      });
    }
  }, [existing, isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsSuccess(false);
      setError("");
      setValidationErrors({});
      setSubmitAttempted(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const addDoc = () => {
    if (isViewOnly) return;
    setForm(prev => {
      const selectedTypes = prev.documents.map(d => d.type).filter(Boolean);
      const nextType = ID_OPTIONS.find(opt => !selectedTypes.includes(opt.value))?.value || "";
      return {
        ...prev,
        documents: [...prev.documents, { id: Date.now(), type: nextType, number: "", photo: null, preview: null, isExisting: false }]
      };
    });
  };

  const removeDoc = (id) => {
    if (isViewOnly) return;
    setForm(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }));
  };

  const updateDoc = (id, field, value) => {
    if (isViewOnly) return;
    setForm(prev => ({
      ...prev,
      documents: prev.documents.map(d => {
        if (d.id !== id) return d;
        let finalValue = value;
        if (field === "type") {
          return { ...d, type: value, number: "", photo: null, preview: null, isExisting: false };
        }
        if (field === "number") {
          if (d.type === "PAN Card") finalValue = value.toUpperCase().slice(0, 10);
          else if (d.type === "Driving Licence") finalValue = value.toUpperCase().slice(0, 15);
          else if (d.type === "Voter ID") finalValue = value.toUpperCase().slice(0, 10);
        }
        return { ...d, [field]: finalValue };
      })
    }));
  };

  const getPlaceholder = (type) => {
    switch (type) {
      case "PAN Card": return "e.g., ABCDE1234F";
      case "Driving Licence": return "e.g., GJ0120110000000";
      case "Voter ID": return "e.g., ABC1234567";
      default: return "Enter Document Number";
    }
  };

  const getMaxLength = (type) => {
    switch (type) {
      case "PAN Card": return 10;
      case "Driving Licence": return 15;
      case "Voter ID": return 10;
      default: return 20;
    }
  };

  const getDocIcon = (type) => {
    switch (type) {
      case "PAN Card": return <ReceiptText className="w-4 h-4" />;
      case "Driving Licence": return <FileBadge className="w-4 h-4" />;
      case "Voter ID": return <FileBadge className="w-4 h-4" />;
      default: return <FileBadge className="w-4 h-4" />;
    }
  };

  const isFormChanged = existing ? (() => {
    const origPanNum = existing.panCardNumber || "";
    const origDlNum = existing.drivingLicense || "";
    const origVoterNum = existing.voterIdNumber || "";
    let changed = false;
    form.documents.forEach(doc => {
      if (doc.type === "PAN Card") { if (doc.number !== origPanNum || doc.photo) changed = true; }
      else if (doc.type === "Driving Licence") { if (doc.number !== origDlNum || doc.photo) changed = true; }
      else if (doc.type === "Voter ID") { if (doc.number !== origVoterNum || doc.photo) changed = true; }
    });
    return changed;
  })() : true;

  const validate = useCallback((isSubmit = false) => {
    let hasValidDoc = false;
    const errors = {};
    const checkSubmit = isSubmit || submitAttempted;

    form.documents.forEach((doc, idx) => {
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
        errors[`doc_${idx}`] = validationMsg;
      } else if (checkSubmit && (hasNum || hasImg) && (!hasNum || !hasImg)) {
        errors[`doc_${idx}`] = "Both Document Number and Upload Front image are required.";
      }

      if (hasNum && isValidNumber && hasImg) hasValidDoc = true;
    });

    if (checkSubmit && !hasValidDoc) {
      errors.general = "Please provide at least one complete identity document.";
    }

    return errors;
  }, [form.documents, submitAttempted]);

  // Live Validation
  useEffect(() => {
    setValidationErrors(validate());
  }, [validate]);

  const handleSubmit = async () => {
    if (isViewOnly) return;
    setSubmitAttempted(true);

    const currentErrors = validate(true);
    setValidationErrors(currentErrors);
    
    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = new FormData();
      form.documents.forEach((doc) => {
        const num = doc.number?.trim();
        if (num) {
          if (doc.type === "PAN Card") {
            if (num !== existing?.panCardNumber || !existing) payload.append("panCardNumber", num);
            if (doc.photo) payload.append("panCardFrontImage", doc.photo);
          } else if (doc.type === "Driving Licence") {
            if (num !== existing?.drivingLicense || !existing) payload.append("drivingLicense", num);
            if (doc.photo) payload.append("drivingLicenseFrontImage", doc.photo);
          } else if (doc.type === "Voter ID") {
            if (num !== existing?.voterIdNumber || !existing) payload.append("voterIdNumber", num);
            if (doc.photo) payload.append("voterIdFrontImage", doc.photo);
          }
        }
      });

      let isEmpty = true;
      for (let key of payload.keys()) {
        isEmpty = false;
        break;
      }

      if (isEmpty && existing) {
        handleClose();
        return;
      }

      if (existing) {
        await updateBecameSeller(payload);
      } else {
        await postBecameSeller(payload);
      }

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
        push("/user/details/myprofile");
      }, 2000);

    } catch (err) {
      console.error("Seller verification failed:", err);
      const api = err?.response?.data;
      let firstErrKey = null;
      if (api?.data?.validationErrors) {
        setValidationErrors(api.data.validationErrors);
        firstErrKey = Object.keys(api.data.validationErrors)[0];
      }

      const msg = api?.message || "Failed to submit verification.";
      setError(msg);

      if (firstErrKey || msg) {
        setTimeout(() => {
          const container = document.getElementById("form-container");
          if (container) container.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overscroll-contain"
      onClick={handleClose}
      onWheel={(e) => {
        if (!modalRef.current || !modalRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (!modalRef.current || !modalRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        ref={modalRef}
        className="relative flex w-full max-w-[1200px] max-h-[85vh] md:max-h-[70vh] flex-col md:flex-row overflow-hidden rounded-[32px] shadow-2xl bg-secondary border border-white/10"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN (SWIPER) */}
        <div className="hidden md:block w-5/12 relative bg-black shrink-0">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full h-full"
            loop
          >
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image src="/seller1.webp" alt="Seller Banner" fill className="object-cover opacity-90" priority sizes="(max-width: 768px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-12 left-8 right-8 z-10">
                  <h2 className="text-white text-3xl font-bold leading-tight">
                    Start selling<br />your cars today
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image src="/seller2.webp" alt="Seller Banner 2" fill className="object-cover opacity-90" priority sizes="(max-width: 768px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-12 left-8 right-8 z-10">
                  <h2 className="text-white text-3xl font-bold leading-tight">
                    Become a<br />Seller
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <div className="custom-swiper-pagination absolute bottom-4 left-0 w-full flex justify-center z-10 gap-2" />
          </Swiper>
        </div>

        {/* RIGHT CONTENT (FORM) */}
        <div id="form-container" className={`w-full md:w-7/12 p-8 md:p-12 bg-secondary overflow-y-auto overscroll-contain custom-scrollbar ${isSuccess ? "flex flex-col justify-center" : ""}`}>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="text-green-500 w-20 h-20" />
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-3xl font-bold text-primary tracking-tight">Request Sent</h3>
                <p className="text-third max-w-sm mt-2">Your verification details have been successfully submitted.</p>
              </div>
              <div className="text-center space-y-2 mt-4 max-w-sm w-full">
                <p className="text-primary font-medium text-base">Our team will review your details shortly.</p>
                <p className="text-third text-sm leading-relaxed">You will be notified once you are successfully verified as a seller.</p>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-6 text-primary">Document Verification</h3>
              {existing?.verificationStatus === "REJECTED" && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="mt-0.5 text-red-500 shrink-0"><AlertCircle className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-red-500 font-semibold text-sm">Application Rejected</h4>
                    <p className="text-third text-xs mt-1 leading-relaxed">You cannot become a seller with this document. Please change your details to proceed.</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <AnimatePresence>
                  {form.documents.map((doc, idx) => {
                    const docErr = validationErrors[`doc_${idx}`];
                    const selectedValues = form.documents.map(d => d.type).filter(Boolean);
                    const availableOptions = ID_OPTIONS.filter(opt => opt.value === doc.type || !selectedValues.includes(opt.value));
                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                        className="bg-[#1C1C1E] border border-white/5 p-5 rounded-2xl relative"
                      >
                        {idx > 0 && !isViewOnly && (
                          <button
                            type="button"
                            onClick={() => removeDoc(doc.id)}
                            className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 transition-colors z-20 cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}

                        <div className="grid grid-cols-1 gap-5 mt-1">
                          <div className="flex flex-col space-y-1.5 w-full">
                            <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                              ID Type <span className="text-rose-500">*</span>
                            </span>
                            <div className="relative">
                              {isViewOnly ? (
                                <SleekInput readOnly={true} value={doc.type} />
                              ) : (
                                <CustomSelect
                                  value={doc.type}
                                  onChange={(val) => updateDoc(doc.id, "type", val)}
                                  options={availableOptions}
                                  placeholder="Select ID Type"
                                  variant="transparent"
                                  readOnly={isViewOnly}
                                />
                              )}
                            </div>
                          </div>

                          <SleekInput
                            label="Document Number *"
                            value={doc.number}
                            onChange={(e) => updateDoc(doc.id, "number", e.target.value)}
                            placeholder={getPlaceholder(doc.type)}
                            readOnly={!doc.type || isViewOnly}
                            maxLength={getMaxLength(doc.type)}
                            error={docErr}
                          />

                          {doc.type && (
                            <DropzoneUpload
                              label="Upload Front Image *"
                              preview={doc.preview}
                              accept=".jpg,.jpeg,.png,.webp"
                              supportedText="Supports: JPG, PNG, WEBP"
                              readOnly={isViewOnly}
                              onChange={(file) => {
                                if (isViewOnly) return;
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
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {!isViewOnly && form.documents.length < ID_OPTIONS.length && (
                  <div className="flex justify-end !mt-2">
                    <button
                      type="button"
                      onClick={addDoc}
                      className="flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <Plus size={16} /> Add Another Document
                    </button>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col space-y-4 pt-6">
                  {(validationErrors.general || error) && (
                    <p className="text-rose-500 text-sm font-medium animate-in fade-in slide-in-from-top-1 ml-1">
                      {validationErrors.general || error}
                    </p>
                  )}
                  <div className="flex justify-end gap-4">
                  {isViewOnly ? (
                    <Button onClick={handleClose} variant="ghost" className="px-8">Close</Button>
                  ) : (
                    <>
                      <Button onClick={handleClose} variant="outlineSecondary">Cancel</Button>
                      {(!existing || (existing.verificationStatus !== "REQUEST_CHANGES" && existing.verificationStatus !== "REJECTED") || isFormChanged) && (
                        <Button onClick={handleSubmit} variant="ghost" showIcon={false} locked={loading} className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                          {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>) : "Submit"}
                        </Button>
                      )}
                    </>
                  )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes modalBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalBackdropOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modalCardIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modalCardOut { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.95) translateY(10px); } }
      `}} />
    </div>
  );
  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}

export default DetailsFromPopup;
