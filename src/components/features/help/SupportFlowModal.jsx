"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, ArrowLeft } from "lucide-react";
import SupportFlow from "./SupportFlow";

export default function SupportFlowModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Prevent body scroll when overlay is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTicketCreated = (ticket) => {
    setSubmitted(true);
  };

  return (
    <div className="  fixed inset-0 z-999 p-4 sm:p-6 md:p-12  lg:px-0 flex items-center justify-center backdrop-blur-sm ">
      <div
        className="relative  max-w-7xl mx-auto bg-secondary border border-primary/30 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "calc(88vh - 40px)" }}
      >
        {/* Close bar */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(10,10,18,0.95)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(0,123,255,0.1)" }}
            >
              <MessageSquare size={14} className="text-fourth" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] font-primary text-primary">
                Contact Support
              </p>
              <p
                className="text-[10px] font-secondary mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Well get back to you within 48 hours
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/30 font-primary transition-colors hover:text-white cursor-pointer"
          >
            <X size={14} /> Close
          </button>
        </div>
        {/* Scrollable SupportFlow content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <SupportFlow onTicketCreated={handleTicketCreated} onBack={onClose} />
        </div>

        {submitted && (
          <div
            className="shrink-0 px-6 py-4 border-t flex justify-center"
            style={{
              borderColor: "rgba(255,255,255,0.07)",
              background: "rgba(10,10,18,0.95)",
            }}
          >
            <button
              onClick={onClose}
              className="text-[11px] font-black uppercase tracking-[0.25em] font-primary text-fourth hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <ArrowLeft size={11} /> Back to Requests
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
