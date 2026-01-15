"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import PreviewPopup from "./components/PreviewPopup";
import { THEME_STORE } from "@/core/engine/themeStore";
import { useRouter } from "next/router";
import { getThemeListing } from "@/services/theme.service";
import toast from "react-hot-toast";

export default function ThemeListing() {
  const [previewTheme, setPreviewTheme] = useState(null);
  const [themes, setThemes] = useState([]);
  const router = useRouter();

  // call the API to get themes in frist load

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemeListing();
        setThemes(data.data || []);
        toast.success("Themes fetched successfully");
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      }
    };

    fetchThemes();
  }, []);

  const handleSelect = (theme) => {

    // !This is for APi must be uncommented when API will be integrated
    router.push(`/consult/dashboard/storefront/theme/create?theme=${theme.themeId}`);

    //  This is for local themes must be removed when API will be integrated
    // router.push(`/consult/dashboard/storefront/theme/create?theme=${theme.id}`);
  };
  return (
    <>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Select Theme to Continue</h1>
        <p className="text-third text-sm">
          Choose how your public storefront will look
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* TODO: Fetch themes from API right now we are using local just replace it with theme  */}
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setPreviewTheme(theme)}
              className="relative group rounded-3xl border border-third/30 overflow-hidden hover:border-primary transition cursor-pointer"
            >
              <div className="relative h-[170px]">
                <Image
                  src={theme.thumbnail}
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
          onSelect={() => handleSelect(previewTheme)}
        />
      )}
    </>
  );
}
