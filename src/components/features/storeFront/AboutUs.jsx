import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import { useEffect, useState } from "react";
import StoreFrontAboutSkeleton from "@/components/ui/skeleton/StoreFrontAboutSkeleton";
import { getAboutUsStoreFrontByUserName } from "@/services/user.service";
import { useParams } from "next/navigation";

/**
 * Maps raw API response fields → template field names expected by theme components.
 */
function mapApiToTemplateData(api) {
  const images = {
    hero1: api.customHeroImageUrl1 || api.heroImageTemplate1?.imageUrl,
    hero2: api.customHeroImageUrl2 || api.heroImageTemplate2?.imageUrl,
    mission: api.customMissionUrl1 || api.missionTemplate1?.imageUrl,
    vision: api.customVisionUrl1 || api.visionTemplate1?.imageUrl,
    story: api.customStoryUrl1 || api.storyImageTemplate1?.imageUrl,
  };

  return {
    // Hero
    headline: api.heroTitle, // Basic1
    heroTitle: api.heroTitle, // Premium3
    subHeadline: api.aboutUsDescription, // Basic1
    heroDesc: api.aboutUsDescription, // Premium3
    heroImageUrl: images.hero1,
    heroTemplate1: { imageUrl: images.hero1 },
    heroTemplate2: { imageUrl: images.hero2 },

    // Story Images (Premium3 gallery) — only include images that exist
    storyImages: [
      images.hero1,
      images.hero2,
      images.mission,
      images.vision,
      images.story,
    ].filter(Boolean),

    // About Us
    aboutUsTitle: api.aboutUsTitle,
    aboutUsDescription: api.aboutUsDescription,

    // Stats
    stats: api.stats,
    statsDescription: api.aboutUsDescription, // Basic1
    statsDesc: api.aboutUsDescription, // Premium3

    // Mission
    missionTitle: api.missionTitle,
    missionDescription: api.missionDescription, // Basic1
    missionDesc: api.missionDescription, // Premium3
    missionImageUrl: images.mission,
    missionImage: images.mission, // Premium3
    missionTemplate1: { imageUrl: images.mission },

    // Vision
    visionTitle: api.visionTitle,
    visionDescription: api.visionDescription, // Basic1
    visionDesc: api.visionDescription, // Premium3
    visionImage: images.vision || "", // Premium3
    visionTemplate1: { imageUrl: images.vision },

    // Services
    servicesTitle: api.serviceTitle,
    servicesSubtitle: api.serviceDescription, // Basic1
    servicesDesc: api.serviceDescription, // Premium3
    services: api.services,
  };
}

export default function AboutUs({ storeData = null }) {
  const id = useParams()?.id;


  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      let apiData = storeData;

      if (!apiData && id) {
        try {
          const res = await getAboutUsStoreFrontByUserName(id);
          apiData = res?.data;
        } catch (error) {
          console.error("Error fetching about us data:", error);
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
          ...section.data, // schema defaults as fallback for any unmapped fields
          ...mappedData, // real API values with correct field names
        },
      }));

      setSections(hydratedSections);
    };

    fetchTheme().finally(() => setLoading(false));
  }, [storeData, id]);

  const filteredSections = sections.filter((section) =>
    section.type.includes("about"),
  );

  if (loading) return <StoreFrontAboutSkeleton />;

  return (
    <section className="w-full container rounded-2xl p-6 space-y-8">
      <EngineRenderer
        sections={filteredSections}
        mode={"preview"}
        onUpdate={(i, newData) => {
          const sectionId = filteredSections[i].id;
          const updated = sections.map((sec) =>
            sec.id === sectionId ? { ...sec, data: newData } : sec,
          );
          setSections(updated);
        }}
      />
    </section>
  );
}
