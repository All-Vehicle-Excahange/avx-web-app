import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import { getStoreFront } from "@/services/theme.service";
import { useEffect, useState } from "react";

/**
 * Maps raw API response fields → template field names expected by theme components.
 */
function mapApiToTemplateData(api) {
  return {
    // Hero
    headline: api.heroTitle,                    // Basic1
    heroTitle: api.heroTitle,                   // Premium3
    subHeadline: api.heroDescription,           // Basic1
    heroDesc: api.heroDescription,              // Premium3
    heroImageUrl: api.customHeroImageUrl1 || api.heroImageTemplate1?.imageUrl,

    // Story Images (Premium3 gallery) — only include images that exist
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
    statsDescription: api.aboutUsDescription,   // Basic1
    statsDesc: api.aboutUsDescription,          // Premium3

    // Mission
    missionTitle: api.missionTitle,
    missionDescription: api.missionDescription, // Basic1
    missionDesc: api.missionDescription,        // Premium3
    missionImageUrl: api.customMissionUrl1,
    missionImage: api.customMissionUrl1,        // Premium3

    // Vision
    visionTitle: api.visionTitle,
    visionDescription: api.visionDescription,   // Basic1
    visionDesc: api.visionDescription,          // Premium3
    visionImage: api.visionTemplate1?.imageUrl || "", // Premium3

    // Services
    servicesTitle: api.serviceTitle,
    servicesSubtitle: api.serviceDescription,   // Basic1
    servicesDesc: api.serviceDescription,       // Premium3
    services: api.services,
  };
}

export default function AboutUs({ storeData = null }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchTheme = async () => {
      let apiData = storeData;

      if (!apiData) {
        try {
          const res = await getStoreFront();
          apiData = res?.data;
        } catch (error) {
          console.error(error);
        }
      }

      if (!apiData) return;

      // Find the matching theme schema from THEME_STORE using themeId from API
      const matchedTheme =
        THEME_STORE.find((t) => t.id === apiData.themeId) || THEME_STORE[0];

      // Map API fields to template field names, then merge with schema defaults as fallback
      const mappedData = mapApiToTemplateData(apiData);

      const hydratedSections = matchedTheme.schema.map((section) => ({
        ...section,
        data: {
          ...section.data,  // schema defaults as fallback for any unmapped fields
          ...mappedData,    // real API values with correct field names
        },
      }));

      setSections(hydratedSections);
    };

    fetchTheme();
  }, [storeData]);

  const filteredSections = sections.filter((section) => section.type.includes("about"));

  return (
    <section className="w-full container rounded-2xl p-6 space-y-8">
      <EngineRenderer
        sections={filteredSections}
        mode={"preview"}
        onUpdate={(i, newData) => {
          const sectionId = filteredSections[i].id;
          const updated = sections.map((sec) =>
            sec.id === sectionId ? { ...sec, data: newData } : sec
          );
          setSections(updated);
        }}
      />
    </section>
  );
}
