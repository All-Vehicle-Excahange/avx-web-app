"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";

export default function CreateTheme() {
  const params = useSearchParams();
  const themeId = params.get("theme");

  const theme = THEME_STORE.find((t) => t.id === themeId) || THEME_STORE[0];
  console.log(theme)
  const [sections, setSections] = useState(theme.schema);
  const [mode, setMode] = useState("editor");

  return (
    <section className="rounded-2xl border border-third/30 overflow-hidden h-full flex flex-col bg-secondary text-primary">
      {/* Header */}
      <div className="p-4 border-b border-third/30 flex justify-between items-center">
        <div>
          <h3 className="font-bold">Editing: {theme.name}</h3>
          <span className="text-xs uppercase text-third">
            {theme.category} Theme
          </span>
        </div>

        {/* Mode Switch */}
        <div className="flex bg-secondary rounded-full p-1 border border-third/30">
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
      <div className="flex-1 overflow-auto p-4">
        <EngineRenderer
          sections={sections}
          mode={mode}
          onUpdate={(i, newData) => {
            const updated = [...sections];
            updated[i].data = newData;
            setSections(updated);
          }}
        />
      </div>
    </section>
  );
}
