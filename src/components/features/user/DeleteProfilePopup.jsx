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

function DeleteProfilePopup({ isOpen, onClose, onSubmit, loading, username = "delete my account" }) {
    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [confirmInput, setConfirmInput] = useState("");
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSelectedReason("");
            setCustomReason("");
            setConfirmInput("");
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

    const confirmText = "delete my account";
    const isConfirmValid = confirmInput.trim().toLowerCase() === confirmText.trim().toLowerCase();

    const handleSubmit = () => {
        if (!isConfirmValid) return;
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
                            className="text-third hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Compact Warning Callout */}
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs leading-normal flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-semibold">This action cannot be undone.</span>
                                {" "}This will permanently delete your profile, listings, and account data.
                            </div>
                        </div>

                        <p className="text-sm text-third">
                            Please select a reason for deleting your profile:
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

                        {/* GitHub-style Text Confirmation Prompt */}
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 pt-3">
                            <p className="text-xs text-third leading-relaxed">
                                To confirm, type <span className="font-mono font-bold text-red-400 select-all bg-red-500/10 px-1.5 py-0.5 rounded">{confirmText}</span> in the box below:
                            </p>
                            <InputField
                                variant="colored"
                                value={confirmInput}
                                onChange={(e) => setConfirmInput(e.target.value)}
                                placeholder={`type "${confirmText}"`}
                            />
                        </div>
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
                                (selectedReason === "Other" && !customReason.trim()) ||
                                !isConfirmValid
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