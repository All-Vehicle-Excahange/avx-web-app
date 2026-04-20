/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useEffect, useState, useMemo } from "react";
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

const getSectionProgress = (section, defaultSection) => {
  let totalFields = 0;
  let filledFields = 0;
  const errors = {};

  const { rules, arrayRules, data } = section;
  const defaultData = defaultSection?.data || {};

  const getCleanString = (val) => {
    if (!val) return "";
    if (typeof val === "object" && val.imageUrl) return val.imageUrl.trim();
    return String(val).replace(/<[^>]*>/g, "").trim();
  };

  // Normal field validation
  if (rules) {
    Object.entries(rules).forEach(([field, rule]) => {
      const value = data[field] || "";
      const defaultValue = defaultData[field] || "";

      const cleanValue = getCleanString(value);
      const cleanDefault = getCleanString(defaultValue);

      totalFields++;

      const isImageField =
        field.toLowerCase().includes("image") ||
        field.toLowerCase().includes("template");

      let errorMsg = null;
      const currentLen = cleanValue.length;

      if (isImageField) {
        if (cleanValue === cleanDefault || currentLen === 0) {
          errorMsg = "Image selection required";
        }
      } else {
        const min = rule.min ?? 0;
        if (currentLen === 0) {
          errorMsg = `Minimum ${min} characters required`;
        } else if (currentLen < min) {
          errorMsg = `Need ${min - currentLen} more characters`;
        }
      }

      if (!errorMsg) {
        filledFields++;
      } else {
        errors[field] = errorMsg;
      }
    });
  }

  // Array field validation
  if (arrayRules) {
    Object.entries(arrayRules).forEach(([arrayField, fieldRules]) => {
      const arrayData = data[arrayField];
      const defaultArrayData = defaultData[arrayField] || [];

      if (Array.isArray(arrayData)) {
        errors[arrayField] = [];
        arrayData.forEach((item, index) => {
          const defaultItem = defaultArrayData[index] || {};
          const itemErrors = {};

          Object.entries(fieldRules).forEach(([field, rule]) => {
            const isStringItem = typeof item === "string";
            const value = isStringItem ? item : item[field] || "";
            const defaultValue = isStringItem
              ? defaultItem || ""
              : defaultItem[field] || "";

            const cleanValue = getCleanString(value);
            const cleanDefault = getCleanString(defaultValue);

            totalFields++;

            const isImageField =
              !isStringItem &&
              (field.toLowerCase().includes("image") ||
                field.toLowerCase().includes("template") ||
                field.toLowerCase().includes("icon"));

            let errorMsg = null;
            const currentLen = cleanValue.length;

            if (isImageField) {
              if (cleanValue === cleanDefault || currentLen === 0) {
                errorMsg = "Image selection required";
              }
            } else {
              const min = rule.min ?? 0;
              if (currentLen === 0) {
                errorMsg = `Minimum ${min} characters required`;
              } else if (currentLen < min) {
                errorMsg = `Need ${min - currentLen} more characters`;
              }
            }

            if (!errorMsg) {
              filledFields++;
            } else {
              itemErrors[field] = errorMsg;
            }
          });
          errors[arrayField][index] = itemErrors;
        });
      }
    });
  }

  const percentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
  return {
    percentage,
    isValid: filledFields === totalFields,
    errors
  };
};

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

  const sectionProgress = useMemo(() => {
    return sections.map((sec, i) => {
      const result = getSectionProgress(sec, theme.schema[i]);
      return {
        id: sec.id,
        label: sec.type.includes("about") ? "About Us" : "Why Buy",
        value: result.percentage,
        isValid: result.isValid,
        errors: result.errors,
      };
    });
  }, [sections, theme]);

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
      {/* Progress Bar (Dynamic based on Tab) */}
      {sectionProgress[activeTab] && (
        <div className=" border-b border-third/30 p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-third">
                Section Completion:
              </span>
              <span className="text-sm font-bold text-primary">
                {sectionProgress[activeTab].label}
              </span>
            </div>
            <span className="text-sm font-bold text-primary">
              {sectionProgress[activeTab].value}% Completed
            </span>
          </div>
          <div className="w-full bg-third/20 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${sectionProgress[activeTab].value === 100 ? "bg-green-500" : "bg-primary"
                }`}
              style={{ width: `${sectionProgress[activeTab].value}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-2 p-3 border-b border-third/30">
        {sections.map((sec, i) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-1 rounded-full text-sm ${activeTab === i
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
            className={`px-4 py-1 rounded-full text-sm transition ${mode === "editor"
                ? "bg-primary text-secondary font-bold"
                : "text-third"
              }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`px-4 py-1 rounded-full text-sm transition ${mode === "preview"
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
            errors={sectionProgress[activeTab]?.errors}
            rules={sections[activeTab]?.rules}
            onNextTab={() =>
              setActiveTab((prev) => Math.min(prev + 1, sections.length - 1))
            }
            onUpdate={(i, newData) => {
              const updated = [...sections];
              updated[activeTab].data = newData;
              setSections(updated);
            }}
          />
        )}

        {/* Final Submit Button (Only on Why Buy tab) */}
        {sections.length > 0 &&
          sections[activeTab]?.type?.includes("why_buy") && (
            <div className="absolute inset-x-0 bottom-0  backdrop-blur-sm p-4 border-t border-third/30 flex justify-end z-10">
              <Button
                onClick={handleFinalSubmit}
                disabled={isSubmitting || !sectionProgress[activeTab]?.isValid}
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
