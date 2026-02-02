"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

function CloseInqPopup({ onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const closeReasons = ["Price mismatch", "Not reachable", "Timing issue", "Other"];
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleSubmit = () => {

    onConfirm({
      reason,
      comment: reason === "Other" ? comment : "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {/* ✅ Popup Box */}
      <div className="w-full max-w-lg rounded-2xl bg-secondary border border-third/30 p-6 shadow-lg space-y-5">
        {/* ✅ Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-primary">Close Inquiry</h2>

          {/* Cancel Icon */}
          <button
            onClick={onClose}
            className="text-third hover:text-primary transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* ✅ Question */}
        <div className="space-y-2">
          <p className="text-sm text-third font-medium">
            Why are you closing this inquiry?
          </p>

          {/* ✅ Selector */}
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl bg-secondary border border-third/40 px-4 py-3 text-primary outline-none focus:border-primary transition"
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
          <Button showIcon={false} variant="outlineSecondary" onClick={onClose}>
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
}

export default CloseInqPopup;
