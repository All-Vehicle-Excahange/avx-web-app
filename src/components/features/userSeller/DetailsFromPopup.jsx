import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { postBecameSeller } from "@/services/user.service";
import Button from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";

function DetailsFromPopup({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    panCardNumber: "",
    panCardFrontImage: null,
    aadharCardNumber: "",
    aadharCardFrontImage: null,
    aadharCardBackImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    pan: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
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
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await postBecameSeller(form);

      onClose(); // close only if success
    } catch (error) {
      console.error("Seller verification failed:", error);
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
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-secondary overflow-y-auto custom-scrollbar">
          <h3 className="text-2xl font-bold mb-6 text-primary">Document Verification</h3>

          <div className="space-y-5">
            <InputField
              label="PAN Card Number"
              variant="colored"
              value={form.panCardNumber}
              onChange={(e) => handleInput("panCardNumber", e.target.value)}
            />

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

            <InputField
              label="Aadhaar Card Number"
              variant="colored"
              value={form.aadharCardNumber}
              onChange={(e) => handleInput("aadharCardNumber", e.target.value)}
            />

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

            {/* 🔥 Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={handleClose}
                className="px-6 h-11 rounded-xl border border-gray-300"
              >
                Cancel
              </button>

              <Button onClick={handleSubmit} variant="ghost">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default DetailsFromPopup;
