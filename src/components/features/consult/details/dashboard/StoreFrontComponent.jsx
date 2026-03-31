"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Star, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreateStoreFront from "./CreateStoreFront";
import { getConsualtDraft } from "@/services/theme.service";
import { getStoreFront } from "@/services/theme.service";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";

/**
 * Maps raw API response fields → template field names expected by theme components.
 */
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

export default function StoreFrontComponent() {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [hasStoreFront, setHasStoreFront] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [sections, setSections] = useState([]);

  const [data, setData] = useState({
    name: "Adarsh Auto Consultants",
    city: "Ahmedabad",
    rating: "4.7",
    reviews: 116,
    description:
      "Premium automotive consultant specializing in verified pre-owned luxury and commercial vehicles.",
    banner: "/sfBg.png",
    logo: "/icons8-user-48.png",
  });

  // Fetch storefront draft on mount
  useEffect(() => {
    const getConsultDraft = async () => {
      try {
        const res = await getConsualtDraft();
        if (res?.statusCode === 200) {
          setHasStoreFront(true);
          setStoreData(res?.data);
        } else {
          setHasStoreFront(false);
        }
      } catch (error) {
        console.log(error);
        setHasStoreFront(false);
      }
    };
    getConsultDraft();
  }, []);

  // Hydrate engine sections once storeData is available
  useEffect(() => {
    const buildSections = async () => {
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

      const matchedTheme =
        THEME_STORE.find((t) => t.id === apiData.themeId) || THEME_STORE[0];

      const mappedData = mapApiToTemplateData(apiData);

      const hydratedSections = matchedTheme.schema.map((section) => ({
        ...section,
        data: {
          ...section.data,   // schema defaults as fallback
          ...mappedData,     // real API values with correct field names
        },
      }));

      setSections(hydratedSections);
    };

    buildSections();
  }, [storeData]);

  if (hasStoreFront === null) {
    return null;
  }

  if (!hasStoreFront) {
    return <CreateStoreFront />;
  }

  // Filter sections for the active tab
  const filteredSections = sections.filter((section) =>
    section.type.includes(activeTab)
  );

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Your Storefront</h1>
        <p className="text-third text-sm">Manage your public brand presence</p>
      </div>



      {/* THEME CONTENT TABS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-third/30">
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-10 min-w-max">
              {[
                { id: "about", label: "About Us" },
                { id: "why_buy", label: "Why Choose Us" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`hover:cursor-pointer relative py-4 text-sm font-medium transition whitespace-nowrap ${activeTab === tab.id
                    ? "text-primary"
                    : "text-third hover:text-primary"
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          {storeData &&
            (!storeData.isSubmitted ||
              storeData.verificationStatus === "REQUEST_CHANGES") && (
              <Button
                onClick={() =>
                  router.push(`storefront/theme/create?theme=${storeData.themeId}`)
                }
                variant="outlineSecondary"
                size="sm"
                className="shrink-0 mb-2 sm:mb-0"
              >
                <Pencil size={13} className="mr-2" />
                Edit Storefront
              </Button>
            )}
        </div>

        {/* TAB CONTENT — inline engine render, filtered by active tab */}
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
      </div>
    </section>
  );
}
