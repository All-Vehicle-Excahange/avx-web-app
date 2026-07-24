import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, X, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import CustomSelect from "@/components/ui/custom-select";

const REASON_OPTIONS = [
  { label: "Privacy concerns", value: "Privacy concerns" },
  { label: "No longer using the app", value: "No longer using the app" },
  { label: "Found a better alternative", value: "Found a better alternative" },
  { label: "Too many notifications", value: "Too many notifications" },
  { label: "Other", value: "Other" },
];

function DeleteProfilePopup({ isOpen, onClose, onSubmit, loading }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedReason("");
      setCustomReason("");
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  const handleSubmit = () => {
    const finalReason = selectedReason === "Other" ? customReason : selectedReason;
    if (!finalReason.trim()) return;
    onSubmit(finalReason.trim());
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md overflow-visible shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="text-red-500" /> Delete Profile
            </h3>
            <button
              onClick={handleClose}
              className="text-third hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-third">
              Are you sure you want to delete your profile? This action cannot be undone. Please select a reason for deleting your profile.
            </p>
            <div className="relative z-50">
              <label className="text-xs text-third mb-1.5 block">Reason</label>
              <CustomSelect
                value={selectedReason}
                options={REASON_OPTIONS}
                placeholder="Select a reason..."
                variant="colored"
                onChange={(val) => setSelectedReason(val)}
              />
            </div>
            
            {selectedReason === "Other" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <InputField
                  label="Please specify"
                  variant="colored"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Enter reason..."
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outlineSecondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              className="!text-red-500 hover:!bg-red-500/10"
              onClick={handleSubmit}
              disabled={
                loading || 
                !selectedReason || 
                (selectedReason === "Other" && !customReason.trim())
              }
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Profile"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default DeleteProfilePopup;
