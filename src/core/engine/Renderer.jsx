import React, { useEffect, useState } from "react";
import { TEMPLATE_REGISTRY } from "./registry";
import { getStoreIcons } from "@/services/theme.service";

export const EngineRenderer = ({
  sections,
  mode,
  onUpdate,
  onNextTab,
  errors,
  rules,
}) => {
  const [storeIcons, setStoreIcons] = useState([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const res = await getStoreIcons();
        if (res?.data) {
          setStoreIcons(res.data);
        }
      } catch (error) {
        console.error("Error fetching store icons:", error);
      }
    };
    if (mode === "editor") {
      fetchIcons();
    }
  }, [mode]);

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, index) => {
        const Component = TEMPLATE_REGISTRY[section.type];

        if (!Component)
          return (
            <div key={index} className="text-red-500">
              Unknown Module: {section.type}
            </div>
          );

        return (
          <Component
            key={section.id}
            data={section.data}
            errors={errors}
            rules={rules}
            isEditing={mode === "editor"}
            onUpdate={(newData) => onUpdate(index, newData)}
            onNextTab={onNextTab}
            storeIcons={storeIcons}
          />
        );
      })}
    </div>
  );
};
