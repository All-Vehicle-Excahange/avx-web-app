"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, ArrowLeft } from "lucide-react";
import SupportFlow from "./SupportFlow";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-999 py-2 pt-18 flex items-center justify-center backdrop-blur-sm bg-black/60"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
        className="relative w-[95%] md:w-[85%] lg:w-[75%] max-w-6xl max-h-[calc(90vh-40px)] bg-secondary border border-primary/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Close bar */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-white/10 bg-secondary/95">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-fourth/10">
              <MessageSquare size={14} className="text-fourth" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] font-primary text-primary">
                Contact Support
              </p>
              <p className="text-[10px] font-secondary mt-0.5 text-primary/40">
                Well get back to you within 48 hours
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-white/10 cursor-pointer p-1.5 rounded-full hover:bg-white/20 text-primary transition shrink-0"
          >
            <X size={18} />
          </button>
        </div>
        {/* Scrollable SupportFlow content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <SupportFlow onTicketCreated={handleTicketCreated} onBack={onClose} />
        </div>
      </motion.div>
    </motion.div>
  );
}
