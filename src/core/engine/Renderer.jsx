import React from "react";
import { TEMPLATE_REGISTRY } from "./registry";

export const EngineRenderer = ({ sections, mode, onUpdate }) => {
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
            isEditing={mode === "editor"}
            onUpdate={(newData) => onUpdate(index, newData)}
          />
        );
      })}
    </div>
  );
};
