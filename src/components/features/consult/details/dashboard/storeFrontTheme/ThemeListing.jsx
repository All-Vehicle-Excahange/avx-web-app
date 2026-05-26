"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import PreviewPopup from "./components/PreviewPopup";
import { THEME_STORE } from "@/core/engine/themeStore";
import { useRouter } from "next/router";
import { getThemeListing } from "@/services/theme.service";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";

const getThemeMetadata = (theme) => {
  const idStr = String(theme.themeId || theme.id || "").toLowerCase();

  if (idStr.includes("premium")) {
    return {
      description: "Premium layout with high-converting custom widgets",
      tier: "Premium",
      usedCount: "512+",
    };
  } else if (idStr.includes("pro")) {
    return {
      description: "Professional multi-column grid with deep customizations",
      tier: "Pro",
      usedCount: "284+",
    };
  } else {
    return {
      description: "Simple clean layout for starters",
      tier: "Basic",
      usedCount: "346+",
    };
  }
};

export default function ThemeListing() {
  const [previewTheme, setPreviewTheme] = useState(null);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // call the API to get themes in frist load

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const data = await getThemeListing();
        setThemes(data.data || []);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleSelect = (theme) => {
    // !This is for APi must be uncommented when API will be integrated
    router.push(
      `/consult/dashboard/storefront/theme/create?theme=${theme.themeId}`,
    );

    //  This is for local themes must be removed when API will be integrated
    // router.push(`/consult/dashboard/storefront/theme/create?theme=${theme.id}`);
  };
  return (
    <>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-primary">
          Select Theme to Continue
        </h1>
        <p className="text-third text-sm">
          Choose how your public storefront will look
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-3xl border border-third/30 overflow-hidden"
                >
                  <SkeletonBox
                    className="h-[260px] w-full"
                    rounded="rounded-none"
                  />
                </div>
              ))
            : themes.map((theme) => {
                const meta = getThemeMetadata(theme);
                return (
                  <div
                    key={theme.id}
                    onClick={() => setPreviewTheme(theme)}
                    className="relative group h-[260px] rounded-3xl overflow-hidden border border-third/30 hover:border-primary transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg bg-secondary"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={theme.thumbnail}
                        alt={theme.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black" />

                    {/* Top-Right Pill (Theme Tier) */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-xs border border-white/10 select-none">
                      <Award size={12} className="text-white/80" />
                      <span className="font-semibold">{meta.tier}</span>
                    </div>

                    {/* Bottom-Left Information */}
                    <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-1 pr-14 select-none">
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {theme.name}
                      </h3>
                      <p className="text-xs text-white/70 font-normal line-clamp-1">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      {previewTheme && (
        <PreviewPopup
          theme={previewTheme}
          onClose={() => setPreviewTheme(null)}
          onSelect={() => handleSelect(previewTheme)}
        />
      )}
    </>
  );
}
