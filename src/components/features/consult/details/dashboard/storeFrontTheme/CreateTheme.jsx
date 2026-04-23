/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import {
  getConsualtDraft,
  getStoreFront,
  makeAsFinalSubmit,
} from "@/services/theme.service";
import Button from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  Zap,
  BarChart3,
  Image as LucideImage,
  FileText,
  LayoutGrid,
} from "lucide-react";

const QUALITY_LEVELS = [
  {
    min: 0,
    max: 20,
    label: "Very Weak",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    icon: AlertTriangle,
    message:
      "Your content quality is very low. It needs significant improvement.",
    suggestions: [
      "Add at least one relevant image",
      "Write a clear and descriptive title",
      "Increase content length (minimum basic details required)",
      "Avoid empty or incomplete sections",
    ],
  },
  {
    min: 21,
    max: 40,
    label: "Weak",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    icon: AlertTriangle,
    message:
      "Your content is weak. Adding more details will improve visibility and engagement.",
    suggestions: [
      "Add images or media to support your content",
      "Improve description with more useful information",
      "Use proper headings or structure",
      "Ensure all required fields are filled",
    ],
  },
  {
    min: 41,
    max: 60,
    label: "Average",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    icon: BarChart3,
    message:
      "Your content is average. A few improvements can make it much better.",
    suggestions: [
      "Add more detailed explanations",
      "Include high-quality images",
      "Improve formatting (headings, spacing)",
      "Make content more user-friendly",
    ],
  },
  {
    min: 61,
    max: 75,
    label: "Good",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    icon: Zap,
    message: "Your content is good. You're close to excellent quality.",
    suggestions: [
      "Add additional visuals or examples",
      "Optimize wording for clarity",
      "Remove any unnecessary or repeated content",
      "Enhance readability",
    ],
  },
  {
    min: 76,
    max: 90,
    label: "Very Good",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    icon: CheckCircle2,
    message: "Your content is very good. Just a few refinements needed.",
    suggestions: [
      "Fine-tune formatting and structure",
      "Add minor details or supporting points",
      "Ensure consistency across sections",
    ],
  },
  {
    min: 91,
    max: 100,
    label: "Excellent",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    icon: CheckCircle2,
    message:
      "Excellent! Your content is highly optimized and ready to perform well.",
    suggestions: [
      "Keep content updated regularly",
      "Monitor performance and user engagement",
    ],
  },
];

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
    return String(val)
      .replace(/<[^>]*>/g, "")
      .trim();
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

  const percentage =
    totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
  return {
    totalFields,
    filledFields,
    percentage,
    isValid: filledFields === totalFields,
    errors,
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
        totalFields: result.totalFields,
        filledFields: result.filledFields,
        isValid: result.isValid,
        errors: result.errors,
      };
    });
  }, [sections, theme]);

  const globalProgress = useMemo(() => {
    let total = 0;
    let filled = 0;
    sectionProgress.forEach((sec) => {
      total += sec.totalFields;
      filled += sec.filledFields;
    });
    return total === 0 ? 0 : Math.round((filled / total) * 100);
  }, [sectionProgress]);

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);

      const res = await makeAsFinalSubmit(globalProgress);
      if (
        res?.statusCode === 200 ||
        res?.status === "SUCCESS" ||
        res?.status === "OK"
      ) {
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

      const getEmptyData = (defaultData) => {
        const empty = {};
        Object.entries(defaultData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            empty[key] = value.map((item) => {
              if (typeof item === "string") return "";
              const emptyItem = {};
              Object.keys(item).forEach((k) => (emptyItem[k] = ""));
              return emptyItem;
            });
          } else {
            empty[key] = "";
          }
        });
        return empty;
      };

      if (apiData) {
        const mappedData = mapApiToTemplateData(apiData);
        const hydratedSections = theme.schema.map((section) => ({
          ...section,
          data: {
            ...getEmptyData(section.data), // Initialize explicit empty fields
            ...Object.fromEntries(
              Object.entries(mappedData).filter(
                ([, v]) => v !== undefined && v !== null,
              ),
            ), // API values populated properly
          },
        }));
        setSections(hydratedSections);
      } else {
        const hydratedSections = theme.schema.map((section) => ({
          ...section,
          data: getEmptyData(section.data),
        }));
        setSections(hydratedSections);
      }
      setIsLoading(false);
    };

    fetchThemeData();
  }, [themeId, theme]);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-third/30 overflow-hidden h-full flex flex-col bg-secondary/5">
        {/* Skeleton Header */}
        <div className="p-4 border-b border-third/30 space-y-4 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-third/20 rounded" />
            <div className="h-4 w-16 bg-third/20 rounded" />
          </div>
          <div className="h-2 w-full bg-third/10 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-third/20 rounded-full" />
          </div>
          <div className="h-10 w-full bg-third/5 rounded-xl border border-third/10" />
        </div>

        {/* Skeleton Tabs */}
        <div className="flex gap-2 p-3 border-b border-third/30 animate-pulse">
          <div className="h-8 w-24 bg-third/20 rounded-full" />
          <div className="h-8 w-24 bg-third/10 rounded-full" />
        </div>

        {/* Skeleton Form Content */}
        <div className="flex-1 p-6 space-y-8 animate-pulse">
          <div className="space-y-3">
            <div className="h-4 w-40 bg-third/20 rounded" />
            <div className="h-12 w-full bg-third/10 rounded-lg" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-32 bg-third/20 rounded" />
            <div className="h-32 w-full bg-third/10 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-third/20 rounded" />
              <div className="h-12 w-full bg-third/10 rounded-lg" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-24 bg-third/20 rounded" />
              <div className="h-12 w-full bg-third/10 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-third/30 text-primary bg-secondary/5 relative">
      <div className="flex flex-col relative">
        {/* Overall Progress Bar - Sticky inside the scroll container */}
        {sections.length > 0 && (
          <div className="sticky -top-10 z-40  backdrop-blur-md border-b border-third/30 p-4">
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-third">
                    Overall Completion:
                  </span>
                  <span className="text-sm font-black text-primary">
                    {globalProgress}%
                  </span>
                </div>

                {/* Ultra-minimal Content Quality Inline */}
                {(() => {
                  const level =
                    QUALITY_LEVELS.find((l) => globalProgress <= l.max) ||
                    QUALITY_LEVELS[0];
                  return (
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${level.bgColor} ${level.color}`}
                      >
                        {level.label}
                      </span>
                      <p className="text-[11px] text-third/80 m-0">
                        {level.message}{" "}
                        <span className="font-semibold text-primary/80 ml-1">
                          {level.suggestions[0]}
                        </span>
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Subtle Gamification Badges */}
              {globalProgress < 100 &&
                (() => {
                  const remaining = 100 - globalProgress;

                  let imgC = 0,
                    txtC = 0,
                    otherC = 0;
                  sectionProgress.forEach((sec) => {
                    const processErrs = (errs) => {
                      if (!errs) return;
                      Object.values(errs).forEach((e) => {
                        if (!e) return;
                        if (typeof e === "string") {
                          const lower = e.toLowerCase();
                          if (lower.includes("image")) imgC++;
                          else if (lower.includes("character")) txtC++;
                          else otherC++;
                        } else if (typeof e === "object") {
                          processErrs(e);
                        }
                      });
                    };
                    processErrs(sec.errors);
                  });

                  const totalErrs = imgC + txtC + otherC;
                  if (totalErrs === 0) return null;

                  let imgPts = Math.round((imgC / totalErrs) * remaining);
                  let txtPts = Math.round((txtC / totalErrs) * remaining);
                  let otherPts = remaining - imgPts - txtPts;

                  // Handle edge cases where rounding leaves a 0 but count is > 0
                  if (imgC > 0 && imgPts === 0) {
                    imgPts = 1;
                    otherPts -= 1;
                  }
                  if (txtC > 0 && txtPts === 0) {
                    txtPts = 1;
                    otherPts -= 1;
                  }
                  if (otherC > 0 && otherPts <= 0) {
                    otherPts = 1;
                    if (imgPts > 1) imgPts -= 1;
                    else txtPts -= 1;
                  }

                  return (
                    <div className="hidden md:flex items-center gap-1.5">
                      {imgC > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded border border-third/20 text-third/70 flex items-center gap-1">
                          <LucideImage
                            size={10}
                            className="text-orange-500/80"
                          />{" "}
                          +{imgPts} pts
                        </span>
                      )}
                      {txtC > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded border border-third/20 text-third/70 flex items-center gap-1">
                          <FileText size={10} className="text-blue-500/80" /> +
                          {txtPts} pts
                        </span>
                      )}
                      {otherC > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded border border-third/20 text-third/70 flex items-center gap-1">
                          <LayoutGrid
                            size={10}
                            className="text-purple-500/80"
                          />{" "}
                          +{otherPts} pts
                        </span>
                      )}
                    </div>
                  );
                })()}
            </div>

            <div className="w-full bg-third/20 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  globalProgress === 100 ? "bg-green-500" : "bg-primary"
                }`}
                style={{ width: `${globalProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2 p-3 border-b border-third/30 bg-secondary/30 backdrop-blur-sm">
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
        <div className="p-4 border-b border-third/30 flex justify-between items-center bg-secondary/10">
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
        <div className="flex-1 p-4 flex flex-col relative pb-24">
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
                  disabled={
                    isSubmitting || !sectionProgress.every((s) => s.isValid)
                  }
                  variant="ghost"
                >
                  {isSubmitting ? "Submitting..." : "Final Submit"}
                </Button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
