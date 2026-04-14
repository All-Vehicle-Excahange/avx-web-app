/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import React, { useState } from "react";
import EditorInput from "../atoms/EditorInput";
import RichTextEditor from "../atoms/RichTextEditor";
import Button from "@/components/ui/button";
import GlobalLoader from "@/components/ui/GlobalLoader";
import {
  setAboutHero,
  setAboutMission,
  setAboutVision,
  setState,
  setAboutServices
} from "@/services/theme.service";
import Select from "react-select";
import { ABOUT_BASIC_1 } from "@/core/engine/schemas/about/basic/about_basic_1";

const SVG_OPTIONS = [
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
    label: "Search"
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
    label: "Cancel"
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
    label: "Layout"
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
    label: "Code"
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
    label: "Clock"
  }
];

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    minHeight: "44px"
  }),

  indicatorSeparator: () => ({
    display: "none"
  }),

  singleValue: (base) => ({
    ...base,
    color: "white"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgba(255,255,255,0.1)" : "#1e1e1e",
    color: "white",
    cursor: "pointer"
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    border: "1px solid rgba(255, 255, 255, 0.2)"
  })
};



const formatOptionLabel = ({ value, label }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: value }} />
    <span className="text-sm">{label}</span>
  </div>
);

const DEFAULT_DATA = ABOUT_BASIC_1[0].data;

function AboutBasic1({ data: rawData, isEditing, onUpdate, onNextTab }) {
  const [isSaving, setIsSaving] = useState(false);
  const data = {
    ...DEFAULT_DATA, ...Object.fromEntries(
      Object.entries(rawData || {}).filter(([, v]) => v !== undefined && v !== null)
    )
  };

  if (!rawData) return null;

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    newArray[index][field] = value;
    updateField(arrayName, newArray);
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    try {
      const heroData = new FormData();
      heroData.append("heroTitle", data.heroTitle || "");
      heroData.append("heroDescription", data.heroDescription || "");

      const missionData = new FormData();
      missionData.append("missionTitle", data.missionTitle || "");
      missionData.append("missionDescription", data.missionDesc || "");

      const visionData = new FormData();
      visionData.append("visionTitle", data.visionTitle || "");
      visionData.append("visionDescription", data.visionDesc || "");

      const statsData = new FormData();
      statsData.append("aboutUsDescription", data.aboutUsDescription || "");
      if (data.stats && Array.isArray(data.stats)) {
        data.stats.forEach((stat, i) => {
          statsData.append(`stats[${i}].number`, stat.number || "");
          statsData.append(`stats[${i}].label`, stat.label || "");
        });
      }

      const servicesData = new FormData();
      servicesData.append("serviceTitle", data.servicesTitle || "");
      servicesData.append("serviceDescription", data.servicesDesc || "");
      if (data.services && Array.isArray(data.services)) {
        data.services.forEach((service, i) => {
          servicesData.append(`services[${i}].title`, service.title || "");
          servicesData.append(`services[${i}].desc`, service.desc || "");
          servicesData.append(`services[${i}].icon`, service.icon || "");
        });
      }

      await Promise.all([
        setAboutHero(heroData),
        setAboutMission(missionData),
        setAboutVision(visionData),
        setState(statsData),
        setAboutServices(servicesData),
      ]);

      if (onNextTab) {
        onNextTab();
      }
    } catch (error) {
      console.error("Failed to save sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // ================= EDIT MODE =================
  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        <GlobalLoader isLoading={isSaving} />
        {/* HERO */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Hero Title</h3>
          <EditorInput
            label="Hero Title"
            value={data.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
          />

          <h3 className="text-primary font-bold mb-4">Hero Description</h3>
          <RichTextEditor
            label="Hero Description"
            value={data.heroDescription}
            onChange={(v) => updateField("heroDescription", v)}
          />
        </div>

        <hr className="border-white/10" />

        {/* MISSION */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Mission Title</h3>

          <EditorInput
            bold
            value={data.missionTitle}
            onChange={(e) => updateField("missionTitle", e.target.value)}
          />

          <h3 className="text-primary font-bold mb-4">Mission Description</h3>
          <RichTextEditor
            value={data.missionDesc}
            onChange={(v) => updateField("missionDesc", v)}
          />
        </div>

        {/* VISION */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Vision Title</h3>

          <EditorInput
            bold
            value={data.visionTitle}
            onChange={(e) => updateField("visionTitle", e.target.value)}
          />

          <h3 className="text-primary font-bold mb-4">Vision Description</h3>
          <RichTextEditor
            value={data.visionDesc}
            onChange={(v) => updateField("visionDesc", v)}
          />
        </div>

        <hr className="border-white/10" />

        {/* STATS */}
        <div>
          <h3 className="text-primary font-bold mb-4">Stats Description</h3>

          <RichTextEditor
            value={data.aboutUsDescription || data.statsDesc}
            onChange={(v) => updateField("aboutUsDescription", v)}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            {data.stats.map((s, i) => (
              <div key={i} className="space-y-3">

                {/* Number Field */}
                <div>
                  <p className="text-sm font-medium mb-1">Number</p>
                  <EditorInput
                    value={s.number}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, "");
                      updateArrayItem("stats", i, "number", numericValue);
                    }}
                  />
                </div>

                {/* Title Field */}
                <div>
                  <p className="text-sm font-medium mb-1">Title</p>
                  <EditorInput
                    value={s.label}
                    onChange={(e) =>
                      updateArrayItem("stats", i, "label", e.target.value)
                    }
                  />
                </div>

              </div>
            ))}
          </div>

        </div>

        <hr className="border-white/10" />

        {/* SERVICES */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Services Title</h3>

          <EditorInput
            bold
            value={data.servicesTitle}
            onChange={(e) => updateField("servicesTitle", e.target.value)}
          />

          <h3 className="text-primary font-bold mb-4">Services Description</h3>
          <RichTextEditor
            value={data.servicesDesc}
            onChange={(v) => updateField("servicesDesc", v)}
          />

          <h3 className="text-primary font-bold mb-4">Services Cards</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {data.services.map((s, i) => (
              <div key={i} className="border border-third/30 p-4 rounded bg-primary/5">

                {/* Icon */}
                <div className="flex flex-col gap-2 relative mt-2">
                  <label className="text-sm font-medium text-primary">
                    Select Icon
                  </label>
                  <Select
                    options={SVG_OPTIONS}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    value={SVG_OPTIONS.find(opt => opt.value === s.icon) || null}
                    onChange={(selectedOption) => {
                      updateArrayItem("services", i, "icon", selectedOption.value);
                    }}
                  />
                </div>

                {/* Title */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Title
                  </label>
                  <EditorInput
                    value={s.title}
                    onChange={(e) =>
                      updateArrayItem("services", i, "title", e.target.value)
                    }
                  />
                </div>

                {/* Description */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Description
                  </label>
                  <EditorInput
                    value={s.desc}
                    onChange={(e) =>
                      updateArrayItem("services", i, "desc", e.target.value)
                    }
                  />
                </div>

              </div>
            ))}
          </div>


        </div>

        <div className="flex justify-end mt-8 border-t border-third/30 pt-6">
          <Button 
            onClick={handleSaveAndNext} 
            disabled={isSaving}
            variant="ghost"
          >
            {isSaving ? "Saving..." : "Save and Next"}
          </Button>
        </div>
      </div>
    );
  }

  // ================= FRONT =================
  return (
    <>
      <section className="relative flex items-center justify-center py-12 min-h-screen">
        <div className="w-full mx-auto flex flex-col items-center text-center gap-10">
          {/* Top Label */}
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Our Story
          </p>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat] max-w-3xl">
            {data.heroTitle}
          </h1>

          {/* Description */}
          <div className="flex flex-col gap-5 max-w-7xl">
            <div
              className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.heroDescription }}
            />
          </div>
        </div>
      </section>

      <section className="relative py-12 px-2 lg:px-4 ">
        <div className=" w-full flex flex-col gap-16">
          {/* ── MAIN HEADING ───────────────── */}
          <div className="flex flex-col  gap-6 max-w-2xl text-center">
            <p className=" text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Mission &<span className="text-primary"> Vision</span>
            </h2>
          </div>

          {/* Mission Row */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start  pt-12">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.missionTitle}
              </h2>
            </div>
            <div className="w-full lg:w-2/3">
              <div
                className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.missionDesc }}
              />
            </div>
          </div>

          {/* Vision Row */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-20 items-start pt-12">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.visionTitle}

              </h2>
            </div>
            <div className="w-full lg:w-2/3">
              <div
                className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.visionDesc }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 px-2 lg:px-4   bg-primary text-secondary">
        <div className=" container  w-full flex flex-col items-center gap-16 text-center">
          {/* ── HEADING ───────────────── */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
              Impact
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] font-[Montserrat]">
              Our Stats
            </h2>

            <div
              className="text-secondary/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.aboutUsDescription }}
            />
          </div>

          {/* ── STATS BOX LAYOUT ───────────────── */}
          <div className="w-full max-w-5xl grid sm:grid-cols-2 gap-8">
            {data.stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 border border-secondary/10 p-8 rounded-2xl"
              >
                <h3 className="text-4xl lg:text-5xl font-semibold font-[Montserrat]">
                  {item.number}
                </h3>

                <p className="text-secondary/70 text-base font-[Poppins]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 px-2 lg:px-4   ">
        <div className=" w-full flex flex-col gap-16">
          {/* Header Section: Vertical Stack */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Services
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              What <span className="text-primary">We Do</span>
            </h2>
            <div
              className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed border-l-2 border-primary/30 pl-6"
              dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
            />
          </div>

          {/* Services Layout: Asymmetrical Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {data.services.map((service, index) => {
              // Logic to make boxes asymmetrical: 1st and 4th are wider, 2nd and 3rd are narrower
              const colSpan =
                index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5";

              return (
                <div
                  key={index}
                  className={`${colSpan} flex flex-col justify-between p-8 lg:p-12 border border-third/10 bg-primary/5 hover:bg-primary/10     transition-all duration-300 min-h-[300px]`}
                >
                  <div className="flex flex-col gap-6">
                    {typeof service.icon === 'string' && service.icon.startsWith('<svg') ? (
                      <div
                        className="text-third [&>svg]:w-10 [&>svg]:h-10 transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: service.icon }}
                      />
                    ) : (
                      // Fallback for older configurations where string icon values were used
                      <div className="w-10 h-10 bg-third/20 rounded flex items-center justify-center text-xs text-third">
                        Icon
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-semibold text-primary font-[Montserrat]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-third/60 text-md md:text-lg font-[Poppins] max-w-xs">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutBasic1;
