"use client";
import Image from "next/image";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

export default function PreviewPopup({ theme, onClose, onSelect }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center overflow-y-auto">
      <div className="w-full max-w-6xl py-10 px-4">
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur border-b border-third/30 py-4 z-10">
          <h2 className="text-xl font-semibold">{theme.name}</h2>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={onSelect}>
              Select Theme
            </Button>
            <button onClick={onClose} className="opacity-60 hover:opacity-100">
              <X />
            </button>
          </div>
        </div>

        {/* Preview Images */}
        <div className="space-y-10 pt-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-third/20"
            >
              <Image src={theme.preview} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
