import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { postBecameSeller } from "@/services/user.service";
import Button from "@/components/ui/button";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";

function DetailsFromPopup({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    panCardNumber: "",
    panCardFrontImage: null,
    aadharCardNumber: "",
    aadharCardFrontImage: null,
    aadharCardBackImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [preview, setPreview] = useState({
    pan: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsSuccess(false);
      setError("");
      setValidationErrors({});
      onClose();
    }, 250);
  }, [onClose]);

  // 🔒 SIMPLE OVERFLOW HIDDEN + ESC
  useEffect(() => {
    if (!isOpen) return;

    // Lock body
    document.body.style.overflow = "hidden";

    // ESC key handler
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore scroll
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  const handleInput = (key, value) => {
    setError("");
    setValidationErrors((prev) => ({ ...prev, [key]: undefined }));
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      await postBecameSeller(form);

      setIsSuccess(true);
      setTimeout(() => handleClose(), 60000); // auto close after 1 minute
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

      if (firstErrKey) {
        setTimeout(() => {
          const el = document.getElementById(`field-${firstErrKey}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else if (msg) {
        setTimeout(() => {
          const container = document.getElementById("form-container");
          if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      }
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60  backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}
    >
      <div
        className="relative flex w-full max-w-[1200px] max-h-[70vh] overflow-hidden rounded-2xl shadow-2xl bg-primary-white"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}
      >
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative bg-black shrink-0">
          <Image
            src="/cs.png"
            alt="Document Verification"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Become a
              <br />
              Seller
            </h2>
          </div>
        </div>

        {/* RIGHT CONTENT (FORM) */}
        <div
          id="form-container"
          className={`w-full md:w-7/12 p-8 md:p-12 bg-secondary overflow-y-auto custom-scrollbar ${isSuccess ? "flex flex-col justify-center" : ""
            }`}
        >
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {/* Success State Icon */}
              <div className="flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="text-green-500 w-20 h-20" />
              </div>

              {/* Headlines */}
              <div className="space-y-1 text-center">
                <h3 className="text-3xl font-bold text-primary tracking-tight">
                  Request Sent
                </h3>
                <p className="text-third max-w-sm mt-2">
                  Your verification details have been successfully submitted.
                </p>
              </div>

              {/* Details Box */}
              <div className="text-center space-y-2 mt-4 max-w-sm w-full">
                <p className="text-primary font-medium text-base">
                  Our team will review your details shortly.
                </p>
                <p className="text-third text-sm leading-relaxed">
                  You will be notified once you are successfully verified as a seller.
                </p>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-6 text-primary">Document Verification</h3>
              {error && Object.keys(validationErrors).length === 0 && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <div id="field-panCardNumber">
                  <InputField
                    label="PAN Card Number"
                    variant="colored"
                    value={form.panCardNumber}
                    onChange={(e) => handleInput("panCardNumber", e.target.value)}
                  />
                  {validationErrors.panCardNumber && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.panCardNumber}</p>
                  )}
                </div>

                <div id="field-panCardFrontImage">
                  <DropzoneUpload
                    label="PAN Card Front Image"
                    preview={preview.pan}
                    onChange={(file) => {
                      const f = Array.isArray(file) ? file[0] : file;
                      if (f) {
                        setPreview((p) => ({
                          ...p,
                          pan: typeof f === "string" ? f : URL.createObjectURL(f),
                        }));
                        handleInput("panCardFrontImage", f);
                      }
                    }}
                  />
                  {validationErrors.panCardFrontImage && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.panCardFrontImage}</p>
                  )}
                </div>

                <div id="field-aadharCardNumber">
                  <InputField
                    label="Aadhaar Card Number"
                    variant="colored"
                    value={form.aadharCardNumber}
                    onChange={(e) => handleInput("aadharCardNumber", e.target.value)}
                  />
                  {validationErrors.aadharCardNumber && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.aadharCardNumber}</p>
                  )}
                </div>

                <div id="field-aadharCardFrontImage">
                  <DropzoneUpload
                    label="Aadhaar Front Image"
                    preview={preview.aadhaarFront}
                    onChange={(file) => {
                      const f = Array.isArray(file) ? file[0] : file;
                      if (f) {
                        setPreview((p) => ({
                          ...p,
                          aadhaarFront:
                            typeof f === "string" ? f : URL.createObjectURL(f),
                        }));
                        handleInput("aadharCardFrontImage", f);
                      }
                    }}
                  />
                  {validationErrors.aadharCardFrontImage && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.aadharCardFrontImage}</p>
                  )}
                </div>

                <div id="field-aadharCardBackImage">
                  <DropzoneUpload
                    label="Aadhaar Back Image"
                    preview={preview.aadhaarBack}
                    onChange={(file) => {
                      const f = Array.isArray(file) ? file[0] : file;
                      if (f) {
                        setPreview((p) => ({
                          ...p,
                          aadhaarBack:
                            typeof f === "string" ? f : URL.createObjectURL(f),
                        }));
                        handleInput("aadharCardBackImage", f);
                      }
                    }}
                  />
                  {validationErrors.aadharCardBackImage && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.aadharCardBackImage}</p>
                  )}
                </div>
                {/* 🔥 Buttons */}
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    onClick={handleClose}
                    className="px-6 h-11 rounded-xl border border-gray-300"
                  >
                    Cancel
                  </button>

                  <Button onClick={handleSubmit} variant="ghost" showIcon={false}>
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default DetailsFromPopup;
