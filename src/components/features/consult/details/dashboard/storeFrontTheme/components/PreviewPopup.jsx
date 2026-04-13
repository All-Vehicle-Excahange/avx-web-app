"use client";
import Image from "next/image";
import Button from "@/components/ui/button";
import { LockIcon, LockOpen, X } from "lucide-react";
import {
  checkIsEligibleToCreate,
  setConsualtTheme,
} from "@/services/theme.service";
import { useEffect, useState } from "react";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";

export default function PreviewPopup({ theme, onClose, onSelect }) {
  const [isEligible, setIsEligible] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const matchedTheme = THEME_STORE.find((t) => t.id === theme.themeId || t.id === theme.id);
  const schema = matchedTheme?.schema || [];
  const filteredSections = schema.filter((section) =>
    section.type.includes(activeTab)
  );

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        // const isEligible = await checkIsEligibleToCreate(theme.id);
        // setIsEligible(isEligible.data);
        setIsEligible(true);
      } catch (error) {
        console.error("Failed to fetch eligibility:", error);
      }
    };
    fetchEligibility();
  }, [theme.id]);

  const handleUseTheme = async () => {
    try {
      const res = await setConsualtTheme(theme.themeId);

      console.log("Theme set:", res);
      onSelect?.(theme);
      onClose?.();
    } catch (error) {
      console.error("Failed to set theme:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-third/30 bg-black/95 shrink-0">
        <h2 className="text-xl font-semibold text-primary">{theme.name}</h2>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={isEligible ? handleUseTheme : undefined}
            className={`transition-all ${
              !isEligible
                ? "opacity-50 cursor-not-allowed text-gray-400 border border-dashed border-gray-500 pointer-events-none"
                : " hover:text-primary"
            }`}
          >
            Use This Theme
            {!isEligible && <LockIcon className="ml-2" />}
          </Button>

          <button onClick={onClose} className="opacity-60 hover:opacity-100 text-primary">
            <X />
          </button>
        </div>
      </div>

      {/* TABS */}
      {schema.length > 0 && (
        <div className="border-b border-third/30 bg-black/95 px-6 pt-2 shrink-0">
          <div className="flex gap-8">
            {[
              { id: "about", label: "About Us" },
              { id: "why_buy", label: "Why Choose Us" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium transition-colors relative cursor-pointer ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-third hover:text-primary"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable Preview Area */}
      <div className="flex-1 overflow-y-auto bg-secondary custom-scrollbar">
        <div className="w-full h-full mx-auto p-6 max-w-[1400px]">
          {schema.length > 0 ? (
            <EngineRenderer
              sections={filteredSections}
              mode={"preview"}
              onUpdate={() => {}}
            />
          ) : (
            <div className="flex justify-center">
              <Image
                src={theme.preview || theme.thumbnail}
                alt={theme.name}
                width={1400}
                height={4000}
                className="w-full h-auto object-contain rounded-xl"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
