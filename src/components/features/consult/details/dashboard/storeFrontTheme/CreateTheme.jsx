/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import { getConsualtDraft, getStoreFront, makeAsFinalSubmit } from "@/services/theme.service";
import Button from "@/components/ui/button";

function mapApiToTemplateData(api) {
  return {
    // Hero
    headline: api.heroTitle,
    heroTitle: api.heroTitle,
    subHeadline: api.heroDescription,
    heroDesc: api.heroDescription,
    heroImageUrl: api.customHeroImageUrl1 || api.heroImageTemplate1?.imageUrl,

    // Story Images (gallery) — only include images that exist
    storyImages: [
      api.customHeroImageUrl1 || api.heroImageTemplate1?.imageUrl,
      api.customHeroImageUrl2 || api.heroImageTemplate2?.imageUrl,
      api.customMissionUrl1,
      api.customStoryUrl1,
    ].filter(Boolean),

    // About Us
    aboutUsTitle: api.aboutUsTitle,
    aboutUsDescription: api.aboutUsDescription,

    // Stats
    stats: api.stats,
    statsDescription: api.aboutUsDescription,
    statsDesc: api.aboutUsDescription,

    // Mission
    missionTitle: api.missionTitle,
    missionDescription: api.missionDescription,
    missionDesc: api.missionDescription,
    missionImageUrl: api.customMissionUrl1,
    missionImage: api.customMissionUrl1,

    // Vision
    visionTitle: api.visionTitle,
    visionDescription: api.visionDescription,
    visionDesc: api.visionDescription,
    visionImage: api.visionTemplate1?.imageUrl || "",

    // Services
    servicesTitle: api.serviceTitle,
    servicesSubtitle: api.serviceDescription,
    servicesDesc: api.serviceDescription,
    services: api.services,

    // WhyBuy (spread all remaining fields)
    ...api,
  };
}

export default function CreateTheme() {
  const params = useSearchParams();
  const router = useRouter();
  const themeId = params.get("theme");

  const theme = THEME_STORE.find((t) => t.id === themeId) || THEME_STORE[0];
  const [mode, setMode] = useState("editor");
  const [activeTab, setActiveTab] = useState(0);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await makeAsFinalSubmit();
      if (res?.statusCode === 200 || res?.status === "SUCCESS" || res?.status === "OK") {
        router.push("/consult/dashboard/storefront/");
      } else {
        console.error("Failed to submit:", res);
      }
    } catch (error) {
      console.error("Error on final submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchThemeData = async () => {
      setIsLoading(true);
      let apiData = null;

      try {
        const draftRes = await getConsualtDraft();
        if (draftRes?.statusCode === 200 && draftRes?.data) {
          apiData = draftRes.data;
        } else {
          const storefrontRes = await getStoreFront();
          if (storefrontRes?.statusCode === 200 && storefrontRes?.data) {
            apiData = storefrontRes.data;
          }
        }
      } catch (error) {
        console.error("Failed to fetch existing theme data", error);
      }

      if (apiData) {
        const mappedData = mapApiToTemplateData(apiData);
        const hydratedSections = theme.schema.map((section) => ({
          ...section,
          data: {
            ...section.data, // defaults as fallback
            ...mappedData,   // API values populated properly
          },
        }));
        setSections(hydratedSections);
      } else {
        setSections(theme.schema);
      }
      setIsLoading(false);
    };

    fetchThemeData();
  }, [themeId, theme]);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-third/30 h-full flex items-center justify-center text-third">
        <div className="animate-pulse">Loading saved storefront data...</div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-third/30 overflow-hidden h-full flex flex-col  text-primary">
      <div className="flex gap-2 p-3 border-b border-third/30">
        {sections.map((sec, i) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-1 rounded-full text-sm ${
              activeTab === i
                ? "bg-primary text-secondary font-bold"
                : "border border-third/30 text-third"
            }`}
          >
            {sec.type.includes("about")
              ? "About Us"
              : sec.type.includes("why_buy")
                ? "Why Buy"
                : sec.type}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="p-4 border-b border-third/30 flex justify-between items-center">
        <div>
          <h3 className="font-bold">Editing: {theme.name}</h3>
          <span className="text-xs uppercase text-third">
            {theme.category} Theme
          </span>
        </div>

        {/* Mode Switch */}
        <div className="flex  rounded-full p-1 border border-third/30">
          <button
            onClick={() => setMode("editor")}
            className={`px-4 py-1 rounded-full text-sm transition ${
              mode === "editor"
                ? "bg-primary text-secondary font-bold"
                : "text-third"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`px-4 py-1 rounded-full text-sm transition ${
              mode === "preview"
                ? "bg-primary text-secondary font-bold"
                : "text-third"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Renderer */}
      <div className="flex-1 overflow-auto p-4 flex flex-col relative pb-24">
        {sections.length > 0 && sections[activeTab] && (
          <EngineRenderer
            sections={[sections[activeTab]]}
            mode={mode}
            onUpdate={(i, newData) => {
              const updated = [...sections];
              updated[activeTab].data = newData;
              setSections(updated);
            }}
          />
        )}

        {/* Final Submit Button (Only on Why Buy tab) */}
        {sections.length > 0 && sections[activeTab]?.type?.includes("why_buy") && (
          <div className="absolute inset-x-0 bottom-0 bg-secondary/90 backdrop-blur-sm p-4 border-t border-third/30 flex justify-end z-10">
            <Button
               onClick={handleFinalSubmit}
               disabled={isSubmitting}
               variant="ghost"
             >
               {isSubmitting ? "Submitting..." : "Final Submit"}
             </Button>
          </div>
        )}
      </div>
    </section>
  );
}
