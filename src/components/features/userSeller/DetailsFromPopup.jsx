import { useEffect, useState } from "react";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import {postBecameSeller} from "@/services/user.service";
import Button from "@/components/ui/button";

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

    // 🔒 PROPER SCROLL LOCK + ESC
    useEffect(() => {
        if (!isOpen) return;

        // Save current scroll position
        const scrollY = window.scrollY;

        // Lock body
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

        // ESC key handler
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            // Restore scroll
            const storedScrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo(0, parseInt(storedScrollY || "0") * -1);

            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

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

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div
                    className="relative bg-secondary w-2xl  max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* ❌ Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-xl font-bold text-primary hover:text-black"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-semibold mb-6">
                        Document Verification
                    </h2>

                    <div className="space-y-5">
                        <InputField
                            label="PAN Card Number"
                            variant="colored"
                            value={form.panCardNumber}
                            onChange={(e) =>
                                handleInput("panCardNumber", e.target.value)
                            }
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
                            onChange={(e) =>
                                handleInput("aadharCardNumber", e.target.value)
                            }
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
                                            typeof f === "string"
                                                ? f
                                                : URL.createObjectURL(f),
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
                                            typeof f === "string"
                                                ? f
                                                : URL.createObjectURL(f),
                                    }));
                                    handleInput("aadharCardBackImage", f);
                                }
                            }}
                        />

                        {/* 🔥 Buttons */}
                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                onClick={onClose}
                                className="px-6 h-11 rounded-xl border border-gray-300"
                            >
                                Cancel
                            </button>

                            <Button
                                onClick={handleSubmit}
                                variant="ghost"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsFromPopup;