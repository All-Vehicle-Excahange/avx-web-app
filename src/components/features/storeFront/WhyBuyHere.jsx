import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";
import { getStoreFront } from "@/services/theme.service";
import { useEffect, useState } from "react";
import StoreFrontAboutSkeleton from "@/components/ui/skeleton/StoreFrontAboutSkeleton";

function mapApiToTemplateData(api) {
  return {
    ...api,
  };
}

export default function WhyBuyHere({ storeData = null }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const matchedTheme =
        THEME_STORE.find((t) => t.id === apiData.themeId) || THEME_STORE[0];

      const mappedData = mapApiToTemplateData(apiData);

      const hydratedSections = matchedTheme.schema
        .filter((section) => section.type.includes("why_buy"))
        .map((section) => ({
          ...section,
          data: {
            ...section.data,
            ...mappedData,
          },
        }));

      setSections(hydratedSections);
    };

    fetchTheme().finally(() => setLoading(false));
  }, [storeData]);

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
