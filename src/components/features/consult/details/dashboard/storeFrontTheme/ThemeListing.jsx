"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import PreviewPopup from "./components/PreviewPopup";
import { useRouter } from "next/navigation";

const THEMES = [
  { id: "dark", name: "Dark Classic", preview: "/home3.jpg" },
  { id: "light", name: "Light Clean", preview: "/themes/light.png" },
  { id: "dealer", name: "Auto Dealer", preview: "/themes/dealer.png" },
  { id: "luxury", name: "Luxury Black", preview: "/themes/luxury.png" },
  { id: "minimal", name: "Minimal White", preview: "/themes/minimal.png" },
  { id: "sport", name: "Sport Red", preview: "/themes/sport.png" },
  { id: "modern", name: "Modern Grid", preview: "/themes/modern.png" },
  { id: "bold", name: "Bold Contrast", preview: "/themes/bold.png" },
  { id: "neo", name: "Neo Glass", preview: "/themes/neo.png" },
];

export default function ThemeListing() {
  const [active, setActive] = useState(null);
  const [previewTheme, setPreviewTheme] = useState(null);

  return (
    <>
      <section className="space-y-4">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Select Theme to Continue</h1>
          <p className="text-third text-sm">
            Choose how your public storefront will look
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {THEMES.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setPreviewTheme(theme)}
              className="relative group rounded-3xl border border-third/30 overflow-hidden hover:border-primary transition cursor-pointer"
            >
              <div className="relative h-[170px]">
                <Image
                  src={theme.preview}
                  alt={theme.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} /> Preview Theme
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {previewTheme && (
        <PreviewPopup
          theme={previewTheme}
          onClose={() => setPreviewTheme(null)}
          onSelect={() => setActive(previewTheme.id)}
        />
      )}
    </>
  );
}
