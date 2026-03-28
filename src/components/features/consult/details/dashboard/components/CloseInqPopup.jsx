"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

function CloseInqPopup({ onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const closeReasons = ["Price mismatch", "Not reachable", "Timing issue", "Other"];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  const handleSubmit = () => {
    onConfirm({
      reason,
      comment: reason === "Other" ? comment : "",
    });
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={triggerClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* ✅ Popup Box */}
      <div
        className="relative w-lg rounded-2xl bg-secondary border border-third/30 p-6 shadow-lg space-y-5"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* ✅ Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-primary">Close Inquiry</h2>

          {/* Close Icon — same as Login Popup */}
          <button
            onClick={triggerClose}
            className="bg-white cursor-pointer p-1 rounded-full hover:opacity-70 text-secondary transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* ✅ Question */}
        <div className="space-y-2">
          <p className="text-sm text-third font-medium">
            Why are you closing this inquiry?
          </p>

          {/* ✅ Selector with custom dropdown arrow */}
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="custom-select w-full rounded-xl bg-secondary border border-third/40 px-4 py-3 text-primary outline-none focus:border-primary transition"
          >
            <option value="">Select a reason...</option>
            {closeReasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Optional Comment Box */}
        {reason === "Other" && (
          <div className="space-y-2">
            <p className="text-sm text-third">Add a comment (optional)</p>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your reason here..."
              rows={4}
              className="w-full rounded-xl bg-secondary border border-third/40 px-4 py-3 text-primary outline-none focus:border-primary transition resize-none"
            />
          </div>
        )}

        {/* ✅ Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          {/* Cancel */}
          <Button showIcon={false} variant="outlineSecondary" onClick={triggerClose}>
            Cancel
          </Button>

          {/* Close Inquiry */}
          <Button showIcon={false} variant="ghost" onClick={handleSubmit}>
            Close Inquiry
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default CloseInqPopup;
