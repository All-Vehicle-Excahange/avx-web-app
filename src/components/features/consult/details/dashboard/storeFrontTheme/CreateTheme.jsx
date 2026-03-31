/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EngineRenderer } from "@/core/engine/Renderer";
import { THEME_STORE } from "@/core/engine/themeStore";

export default function CreateTheme() {
  const params = useSearchParams();
  const themeId = params.get("theme");

  const theme = THEME_STORE.find((t) => t.id === themeId) || THEME_STORE[0];
  const [mode, setMode] = useState("editor");
  const [activeTab, setActiveTab] = useState(0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(theme.schema);
  }, [themeId]);

  return (
    <section className="rounded-2xl border border-third/30 overflow-hidden h-full flex flex-col  text-primary">
      <div className="flex gap-2 p-3 border-b border-third/30">
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
        {sections.length > 0 && sections[activeTab] && (
          <EngineRenderer
            sections={[sections[activeTab]]}
            mode={mode}
            onUpdate={(i, newData) => {
              const updated = [...sections];
              updated[activeTab].data = newData;
              setSections(updated);
            }}
          />
        )}
      </div>
    </section>
  );
}
