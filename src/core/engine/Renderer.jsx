import React from "react";
import { TEMPLATE_REGISTRY } from "./registry";

export const EngineRenderer = ({
  sections,
  mode,
  onUpdate,
  onNextTab,
  errors,
  rules,
}) => {
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
          />
        );
      })}
    </div>
  );
};
