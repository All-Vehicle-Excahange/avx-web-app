"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Select from "react-select";
import Button from "@/components/ui/button";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { sendInquary } from "@/services/vehicle.service";

function SendInquaryPopup({ onClose, consultName = "Consultant", vehicleId, onSuccess }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    }, [onClose]);

    const inquiryOptions = [
        { value: "Need call back", label: "Need call back" },
        { value: "Vehicle available", label: "Vehicle available" },
        { value: "Test Drive available", label: "Test Drive available" },
        { value: "Other", label: "Other" }
    ];

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = async () => {
        if (!vehicleId || isLoading) return;
        try {
            setIsLoading(true);
            const payload = {};
            if (title.trim()) payload.inquiryTitle = title.trim();
            if (description.trim()) payload.inquiryDescription = description.trim();
            await sendInquary(vehicleId, payload);
            setIsSuccess(true);
            if (onSuccess) onSuccess();
            setTimeout(() => handleClose(), 60000);
        } catch (error) {
            console.error("Send inquiry error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleClose} style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}>
            {/* Popup Box */}
            <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-secondary" onClick={(e) => e.stopPropagation()} style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}>

                {/* CLOSE */}
                <button
                    onClick={handleClose}
                    className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
                >
                    <X size={20} />
                </button>

                {/* LEFT IMAGE */}
                <div className="hidden md:block w-5/12 relative">
                    <Image src="/cs.png" alt="Cars" fill className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 pr-4">
                        <h2 className="text-3xl font-bold text-primary leading-tight">
                            Find your
                            <br />
                            dream car
                        </h2>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-secondary flex flex-col justify-center">

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
                                    Your request has been successfully sent to the consultant.
                                </p>
                            </div>

                            {/* Details Box */}
                            <div className="text-center space-y-2 mt-4 max-w-sm w-full">
                                <p className="text-primary font-medium text-base">
                                    They will contact you shortly through AVX chat.
                                </p>
                                <p className="text-third text-sm leading-relaxed">
                                    You can also continue the conversation in the AVX app anytime.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-6 space-y-2">
                                <h3 className="text-2xl font-bold text-primary leading-tight">
                                    You are requesting this vehicle from
                                </h3>
                                <p className="text-sm text-third">
                                    <span className="font-semibold text-primary">{consultName}</span> consultant will contact you shortly.
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">

                                {/* Selector Field */}
                                <div className="space-y-2">
                                    <label className="text-sm text-third font-medium">Select Inquiry Type</label>
                                    <Select
                                        instanceId="inquiry-type-select"
                                        options={inquiryOptions}
                                        value={inquiryOptions.find(opt => opt.value === title) || null}
                                        onChange={(option) => {
                                            setTitle(option.value);
                                            if (option.value !== "Other") setDescription("");
                                        }}
                                        placeholder="Select an option..."
                                        isSearchable={false}
                                        className="text-sm"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                backgroundColor: "#111111",
                                                borderColor: state.isFocused ? "#444" : "#2f2e2e",
                                                borderRadius: "12px",
                                                padding: "6px 8px",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    borderColor: "#555",
                                                },
                                            }),
                                            singleValue: (base) => ({
                                                ...base,
                                                color: "#ffffff",
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: "#aaaaaa",
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                backgroundColor: "#111111",
                                                borderRadius: "12px",
                                                overflow: "hidden",
                                                marginTop: "6px",
                                                zIndex: 9999,
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused
                                                    ? "#1f1f1f"
                                                    : state.isSelected
                                                        ? "#2a2a2a"
                                                        : "#111111",
                                                color: "#ffffff",
                                                cursor: "pointer",
                                                padding: "10px 14px",
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                color: "#ffffff",
                                                "&:hover": {
                                                    color: "#cccccc",
                                                },
                                            }),
                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                        }}
                                    />
                                </div>

                                {/* Description Field - Always Visible But Disabled if no Title */}
                                <div className="space-y-2 relative">
                                    <div className="w-full flex justify-start gap-1 items-center">
                                        <label className={`text-sm font-medium ${!title ? "text-third/50" : "text-third"}`}>
                                            Description
                                        </label>
                                        {!title && <span className="text-xs text-third/40">(Optional)</span>}
                                        {title && title !== "Other" && <span className="text-xs text-third/70">(Optional)</span>}
                                        {title === "Other" && <span className="text-xs text-red-500">* (Required for Other)</span>}
                                    </div>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        disabled={!title}
                                        placeholder={
                                            !title
                                                ? "Select an inquiry type first..."
                                                : title === "Other"
                                                    ? "Please describe your inquiry..."
                                                    : `Please provide more details on '${title}'...`
                                        }
                                        rows={4}
                                        className={`w-full rounded-xl border px-4 py-3 outline-none transition resize-none
                                            ${!title
                                                ? "bg-secondary/50 border-third/20 text-third/50 cursor-not-allowed"
                                                : "bg-secondary border-third/40 text-primary focus:border-primary"
                                            }
                                        `}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-6 mt-auto">
                                <Button showIcon={false} variant="outlineSecondary" onClick={handleClose} disabled={isLoading}>
                                    Cancel
                                </Button>
                                <Button
                                    showIcon={false}
                                    variant="ghost"
                                    onClick={handleSubmit}
                                    loading={isLoading}
                                    locked={!title || (title === "Other" && !description.trim())}
                                >
                                    Send Inquiry
                                </Button>
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

export default SendInquaryPopup;