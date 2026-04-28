import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import { useEffect, useState } from "react";
import StoreFrontAboutSkeleton from "@/components/ui/skeleton/StoreFrontAboutSkeleton";
import { getWhyBuyHereStoreFrontByUserName } from "@/services/user.service";
import { useParams } from "next/navigation";

function mapApiToTemplateData(api) {
  const mapped = {
    ...api,

    // Process
    processSteps: api.processes?.map((p) => ({
      title: p.title,
      description: p.desc,
      icon: p.icon,
    })),

    // Inspection text
    inspectionText: api.inspectionDescription,

    // Testimonials (Featured Reviews)
    testimonials: api.featuredReviews?.map((r) => ({
      name: r.reviewerName,
      review: r.reviewText,
    })),
  };

  // Only override hero templates with custom URLs if they actually exist
  if (api.customWhyBuyHeroUrl1) mapped.whyBuyHeroTemplate1 = { imageUrl: api.customWhyBuyHeroUrl1 };
  if (api.customWhyBuyHeroUrl2) mapped.whyBuyHeroTemplate2 = { imageUrl: api.customWhyBuyHeroUrl2 };
  if (api.customWhyBuyHeroUrl3) mapped.whyBuyHeroTemplate3 = { imageUrl: api.customWhyBuyHeroUrl3 };

  // Only override inspection templates with custom URLs if they actually exist
  if (api.customInspectionUrl1) mapped.inspectionTemplate1 = { imageUrl: api.customInspectionUrl1 };
  if (api.customInspectionUrl2) mapped.inspectionTemplate2 = { imageUrl: api.customInspectionUrl2 };
  if (api.customInspectionUrl3) mapped.inspectionTemplate3 = { imageUrl: api.customInspectionUrl3 };

  return mapped;
}

export default function WhyBuyHere({ storeData = null }) {
  const id = useParams()?.id;

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      let apiData = storeData;

      if (!apiData && id) {
        try {
          const res = await getWhyBuyHereStoreFrontByUserName(id);
          apiData = res?.data;
        } catch (error) {
          console.error("Error fetching why buy here data:", error);
        }
      }

      if (!apiData) return;

      const matchedTheme =
        THEME_STORE.find((t) => t.id === apiData.themeId) || THEME_STORE[0];

      const mappedData = mapApiToTemplateData(apiData);

      // Build empty shell from schema shape — no dummy content
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
          } else if (value !== null && typeof value === "object") {
            empty[key] = {};
          } else {
            empty[key] = "";
          }
        });
        return empty;
      };

      const hydratedSections = matchedTheme.schema
        .filter((section) => section.type.includes("why_buy"))
        .map((section) => ({
          ...section,
          data: {
            ...getEmptyData(section.data), // empty shell — no dummy images/text
            ...Object.fromEntries(
              Object.entries(mappedData).filter(([, v]) => v !== undefined && v !== null),
            ),
          },
        }));

      setSections(hydratedSections);
    };

    fetchTheme().finally(() => setLoading(false));
  }, [storeData, id]);

  if (loading) return <StoreFrontAboutSkeleton />;

  return (
    <section className="w-full container rounded-2xl p-6 space-y-8">
      <EngineRenderer
        sections={sections}
        mode={"preview"}
        onUpdate={(i, newData) => {
          const updated = [...sections];
          updated[i].data = newData;
          setSections(updated);
        }}
      />
    </section>
  );
}
