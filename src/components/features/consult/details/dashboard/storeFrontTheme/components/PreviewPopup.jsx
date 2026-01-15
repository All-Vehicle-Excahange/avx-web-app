"use client";
import Image from "next/image";
import Button from "@/components/ui/button";
import { LockIcon, LockOpen, X } from "lucide-react";
import { checkIsEligibleToCreate } from "@/services/theme.service";
import { useEffect, useState } from "react";

export default function PreviewPopup({ theme, onClose, onSelect }) {

  // TODO Change default value to false when API will be integrated
  const [isEligible, setIsEligible] = useState(false);

  // TODO Make API call to check eligibility of theme right now we using static value JUST UNCOMMNET IT WHEN needed from DB

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const isEligible = await checkIsEligibleToCreate(theme.id);
        setIsEligible(isEligible.data);
      } catch (error) {
        console.error("Failed to fetch eligibility:", error);
      }
    };
    fetchEligibility();
  }, [theme.id]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-third/30 bg-black/95 sticky top-0 z-10">
        <h2 className="text-xl font-semibold">{theme.name}</h2>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={isEligible ? onSelect : undefined}
            className={`transition-all ${!isEligible
              ? "opacity-50 cursor-not-allowed text-gray-400 border border-dashed border-gray-500 pointer-events-none"
              : " hover:text-secondary"
              }`}
          >
            Use This Theme
            {!isEligible && <LockIcon className="ml-2" />}
          </Button>

          <button onClick={onClose} className="opacity-60 hover:opacity-100">
            <X />
          </button>
        </div>
      </div>

      {/* Scrollable Preview Area */}
      <div className="flex-1 overflow-y-auto flex justify-center p-6">
        <div className="relative w-full max-w-[1400px]">
          <Image
            src={theme.preview || theme.thumbnail}
            alt={theme.name}
            width={1400}
            height={4000}
            className="w-full h-auto object-contain rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
