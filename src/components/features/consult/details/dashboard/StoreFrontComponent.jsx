"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Star, MapPin, Pencil, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreateStoreFront from "./CreateStoreFront";
import { getConsualtDraft } from "@/services/theme.service";
import { getStoreFront } from "@/services/theme.service";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";

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
  const [hasStoreFront, setHasStoreFront] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [sections, setSections] = useState([]);
  const [viewStoreFront, setViewStoreFront] = useState(false);

  // Fetch storefront draft on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiData = null;
        const draftRes = await getConsualtDraft();

        if (draftRes?.statusCode === 200 && draftRes?.data) {
          apiData = draftRes.data;
        } else {
          const liveRes = await getStoreFront();
          if (liveRes?.statusCode === 200 && liveRes?.data) {
            apiData = liveRes.data;
          }
        }

        if (apiData) {
          setStoreData(apiData);
          setHasStoreFront(true);
        } else {
          setHasStoreFront(false);
        }
      } catch (error) {
        console.error(error);
        setHasStoreFront(false);
      }
    };
    fetchData();
  }, []);

  // Hydrate engine sections once storeData is available
  useEffect(() => {
    const buildSections = () => {
      if (!storeData) return;

      const matchedTheme =
        THEME_STORE.find((t) => t.id === storeData.themeId) || THEME_STORE[0];

      const mappedData = mapApiToTemplateData(storeData);

      const hydratedSections = matchedTheme.schema.map((section) => ({
        ...section,
        data: {
          ...section.data, // schema defaults as fallback
          ...Object.fromEntries(
            Object.entries(mappedData).filter(([, v]) => v !== undefined && v !== null)
          ),
        },
      }));

      setSections(hydratedSections);
    };

    buildSections();
  }, [storeData]);

  if (hasStoreFront === null) {
    return (
      <section className="space-y-10">
        {/* HEADER SKELETON */}
        <div className="space-y-2">
          <SkeletonBox className="h-8 w-64" />
          <SkeletonBox className="h-4 w-96" />
        </div>

        {/* TIERS GRID SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-third/30 p-6 flex flex-col h-[340px] space-y-6"
            >
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <SkeletonBox className="h-7 w-24" />
                    <SkeletonBox className="h-4 w-32" />
                  </div>
                  <SkeletonBox className="h-6 w-6 rounded-full" />
                </div>

                <div className="space-y-3">
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-[90%]" />
                  <SkeletonBox className="h-4 w-[80%]" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-third/10">
                <SkeletonBox className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* INFO BOX SKELETON */}
        <div className="border border-third/30 rounded-xl p-8 space-y-6">
          <SkeletonBox className="h-7 w-64" />
          <SkeletonBox className="h-20 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <SkeletonBox className="h-24 w-full" />
            <SkeletonBox className="h-24 w-full" />
            <SkeletonBox className="h-24 w-full" />
          </div>
        </div>
      </section>
    );
  }

  // No draft data — show plain CreateStoreFront (tier selection only)
  if (!hasStoreFront) {
    return <CreateStoreFront />;
  }

  // Has draft data but user hasn't clicked "View" yet — show CreateStoreFront with table
  if (!viewStoreFront) {
    return (
      <CreateStoreFront
        storeData={storeData}
        onView={(tab) => {
          setActiveTab(tab || "about");
          setViewStoreFront(true);
        }}
      />
    );
  }

  // ── Full Storefront Preview ──
  // Filter sections for the active tab
  const filteredSections = sections.filter((section) =>
    section.type.includes(activeTab)
  );

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setViewStoreFront(false)}
          className="p-2 rounded-lg border border-third/30 hover:border-primary/50 transition-colors hover:cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Your Storefront</h1>
          <p className="text-third text-sm">Manage your public brand presence</p>
        </div>
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
