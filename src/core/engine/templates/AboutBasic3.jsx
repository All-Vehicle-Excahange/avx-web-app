"use client";
import React, { useState } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";
import EditorInput from "@/core/engine/atoms/EditorInput";
import RichTextEditor from "@/core/engine/atoms/RichTextEditor";
import Select from "react-select";
import {
  setAboutHero,
  setAboutMission,
  setAboutVision,
  setState,
  setAboutServices
} from "@/services/theme.service";
import { ABOUT_BASIC_3 } from "@/core/engine/schemas/about/basic/about_basic_3";
const SVG_OPTIONS = [
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m646-160-42-42 98-98q-37-53-90.5-84.5T480-420q-83 0-156 31.5T197-331q-54 54-85.5 127T80-480q0 83 31.5 156T197-197q54 54 127 85.5T480-80q64 0 117.5-31.5T706-178l98-98-42-42-98 98q-38 33-80.5-6.5T480-300q-54 0-99-45t-45-99q0-54 45-99t99-45q54 0 99 45t45 99q0 51.5-26.5 94T560-360Z"/></svg>`,
    label: "ShieldCheck",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320q93 0 156.5-63.5T700-540q0-93-63.5-156.5T480-760q-93 0-156.5 63.5T260-540q0 93 63.5 156.5T480-320Zm0-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm0 374q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-106Zm0 106Q319 217 239.5 334.5T160-552q0 150 96.5 255T480-200q150 0 246-105t96-255q0-100-80.5-217.5T480-500Z"/></svg>`,
    label: "Globe",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M472-160q-104 0-178-74t-74-178q0-63 27.5-115.5T340-614l-18 76q-30 14-47.5 42.5T260-440q0 59 40.5 99.5T400-300h72q29 0 51.5-14t38-38l58-110q71 32 132.5 79T840-256q33 0 63-8t57-24l-52-60q-23 15-48 23.5t-51 8.5zm5-220q36 0 61-25t25-61q0-36-25-61t-61-25q-36 0-61 25t-25 61q0 36 25 61t61 25Zm-97 220-24-50q-30 30-70 46t-80 16q-42 0-80-16t-70-46l-24 50q39 45 93.5 71.5T480-80Z"/></svg>`,
    label: "TrendingUp",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280v-280q0-17-11.5-28.5T400-600h80q17 0 28.5 11.5T520-560v168q0 13-3.5 25t-10.5 21-17 13-21.5 4.5H440Zm-80-320v-40h160v40h-40v160h-80v-160h-40Zm400-80h-80v-80h-80v80h-80v-80h-80v120q0 17 11.5 28.5T240-460h240q17 0 28.5-11.5T520-500v-80Z"/></svg>`,
    label: "Cpu",
  },
];
const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    minHeight: "44px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  singleValue: (base) => ({ ...base, color: "white" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgba(255,255,255,0.1)" : "#1e1e1e",
    color: "white",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  }),
};
const formatOptionLabel = ({ value, label }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
      dangerouslySetInnerHTML={{ __html: value }}
    />
    <span className="text-sm">{label}</span>
  </div>
);
const DEFAULT_DATA = ABOUT_BASIC_3[0].data;

function AboutBasic3({ isEditing, data: rawData, onUpdate }) {
  const data = {
    ...DEFAULT_DATA, ...Object.fromEntries(
      Object.entries(rawData || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
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
  const handleHeroBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("heroTitle", data.heroTitle || "");
      formData.append("heroDescription", data.heroDescription || "");
      const res = await setAboutHero(formData);
      if (res?.data?.success) console.log("Hero updated successfully");
    } catch (error) {
      console.error("Failed to update Hero section:", error);
    }
  };

  const handleMissionBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("missionTitle", data.missionTitle || "");
      formData.append("missionDescription", data.missionDesc || "");
      const res = await setAboutMission(formData);
      if (res?.data?.success) console.log("Mission updated successfully");
    } catch (error) {
      console.error("Failed to update Mission section:", error);
    }
  };

  const handleVisionBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("visionTitle", data.visionTitle || "");
      formData.append("visionDescription", data.visionDesc || "");
      const res = await setAboutVision(formData);
      if (res?.data?.success) console.log("Vision updated successfully");
    } catch (error) {
      console.error("Failed to update Vision section:", error);
    }
  };

  const handleStatsBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("aboutUsDescription", data.aboutUsDescription || "");
      if (data.stats && Array.isArray(data.stats)) {
        data.stats.forEach((stat, i) => {
          formData.append(`stats[${i}].number`, stat.number || "");
          formData.append(`stats[${i}].label`, stat.label || "");
        });
      }
      const res = await setState(formData);
      if (res?.data?.success) console.log("Stats updated successfully");
    } catch (error) {
      console.error("Failed to update Stats section:", error);
    }
  };

  const handleServicesBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("serviceTitle", data.servicesTitle || "");
      formData.append("serviceDescription", data.servicesDesc || "");
      if (data.services && Array.isArray(data.services)) {
        data.services.forEach((service, i) => {
          formData.append(`services[${i}].title`, service.title || "");
          formData.append(`services[${i}].desc`, service.desc || "");
          formData.append(`services[${i}].icon`, service.icon || "");
        });
      }
      const res = await setAboutServices(formData);
      if (res?.data?.success) console.log("Services updated successfully");
    } catch (error) {
      console.error("Failed to update Services section:", error);
    }
  };
  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Hero Section</h3>
          <EditorInput
            label="Hero Title"
            value={data.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
            onBlur={handleHeroBlur}
          />
          <RichTextEditor
            label="Hero Description"
            value={data.heroDescription}
            onChange={(v) => updateField("heroDescription", v)}
            onBlur={handleHeroBlur}
          />
        </div>
        <hr className="border-white/10" />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Mission Section</h3>
          <EditorInput
            label="Mission Title"
            value={data.missionTitle}
            onChange={(e) => updateField("missionTitle", e.target.value)}
            onBlur={handleMissionBlur}
          />
          <RichTextEditor
            label="Mission Description"
            value={data.missionDesc}
            onChange={(v) => updateField("missionDesc", v)}
            onBlur={handleMissionBlur}
          />
        </div>
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Vision Section</h3>
          <EditorInput
            label="Vision Title"
            value={data.visionTitle}
            onChange={(e) => updateField("visionTitle", e.target.value)}
            onBlur={handleVisionBlur}
          />
          <RichTextEditor
            label="Vision Description"
            value={data.visionDesc}
            onChange={(v) => updateField("visionDesc", v)}
            onBlur={handleVisionBlur}
          />
        </div>
        <hr className="border-white/10" />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Stats Section</h3>
          <RichTextEditor
            label="About Us Description"
            value={data.aboutUsDescription}
            onChange={(v) => updateField("aboutUsDescription", v)}
            onBlur={handleStatsBlur}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {(data.stats || []).map((s, i) => (
              <div
                key={i}
                className="space-y-3 border border-white/10 p-4 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium mb-1 text-white">Number</p>
                  <EditorInput
                    value={s.number}
                    onChange={(e) =>
                      updateArrayItem("stats", i, "number", e.target.value)
                    }
                    onBlur={handleStatsBlur}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-white">Label</p>
                  <EditorInput
                    value={s.label}
                    onChange={(e) =>
                      updateArrayItem("stats", i, "label", e.target.value)
                    }
                    onBlur={handleStatsBlur}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-white/10" />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Services Section</h3>
          <EditorInput
            label="Services Title"
            value={data.servicesTitle}
            onChange={(e) => updateField("servicesTitle", e.target.value)}
            onBlur={handleServicesBlur}
          />
          <RichTextEditor
            label="Services Description"
            value={data.servicesDesc}
            onChange={(v) => updateField("servicesDesc", v)}
            onBlur={handleServicesBlur}
          />
          <h4 className="text-white font-semibold mt-6 mb-4">Service Cards</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {(data.services || []).map((s, i) => (
              <div
                key={i}
                className="border border-white/10 p-4 rounded-lg space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Select Icon
                  </label>
                  <Select
                    options={SVG_OPTIONS}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    value={
                      SVG_OPTIONS.find((opt) => opt.value === s.icon) || null
                    }
                    onChange={(selectedOption) => {
                      updateArrayItem(
                        "services",
                        i,
                        "icon",
                        selectedOption.value,
                      );
                      handleServicesBlur();
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-1 block">
                    Title
                  </label>
                  <EditorInput
                    value={s.title}
                    onChange={(e) =>
                      updateArrayItem("services", i, "title", e.target.value)
                    }
                    onBlur={handleServicesBlur}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-1 block">
                    Description
                  </label>
                  <EditorInput
                    value={s.desc}
                    onChange={(e) =>
                      updateArrayItem("services", i, "desc", e.target.value)
                    }
                    onBlur={handleServicesBlur}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <section className="relative flex flex-col justify-center min-h-screen items-center py-12">
        <div className="mx-auto w-full flex flex-col gap-14">
          <div className="flex flex-col items-center text-center gap-10 max-w-3xl mx-auto">
            <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold">
              Hero
            </p>
            <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.heroTitle}
            </h2>
            <div
              className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{ __html: data.heroDescription }}
            />

          </div>
        </div>
      </section>
      <section className="relative flex flex-col items-center py-12">
        <div className="mx-auto w-full flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Mission / Vision
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Direction We<span className="text-primary"> Move</span>
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto flex flex-col gap-16">
            <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full bg-third/20 -translate-x-1/2" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="lg:col-start-1 flex flex-col gap-4 pr-0 lg:pr-10 text-left lg:text-right">
                <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
                  Mission
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat]">
                  {data.missionTitle}
                </h3>
                <div
                  className="text-third/70 text-sm sm:text-base font-[Poppins] leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{ __html: data.missionDesc }}
                />
              </div>
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-third" />
              </div>
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="hidden lg:block" />
              <div className="lg:col-start-2 flex flex-col gap-4 pl-0 lg:pl-10 text-left">
                <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
                  Vision
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat]">
                  {data.visionTitle}
                </h3>
                <div
                  className="text-third/70 text-sm sm:text-base font-[Poppins] leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{ __html: data.visionDesc }}
                />
              </div>
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-third" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col justify-center items-center py-12">
        <div className="relative z-10 mx-auto w-full flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Stats
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Numbers that<span className="text-primary"> speak for us</span>
            </h2>
            <div
              className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md"
              dangerouslySetInnerHTML={{ __html: data.aboutUsDescription }}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {data.stats.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                  {item.number}
                </h3>
                <p className="text-third/60 text-sm sm:text-base font-[Poppins]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative flex flex-col justify-center items-center py-12">
        <div className="mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6 max-w-xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.servicesTitle}
            </h2>
            <div
              className="text-third/70 text-md font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
            />
          </div>
          <div className="flex flex-col gap-12">
            {data.services.map((service, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 ${i % 2 !== 0 ? "lg:ml-10" : ""}`}
              >
                <div className="w-12 h-12 flex items-center justify-center border border-third/10 rounded-xl">
                  {typeof service.icon === "string" &&
                    service.icon.startsWith("<svg") ? (
                    <div
                      className="text-third [&>svg]:w-5 [&>svg]:h-5"
                      dangerouslySetInnerHTML={{ __html: service.icon }}
                    />
                  ) : (
                    <div className="w-5 h-5 text-third">Icon</div>
                  )}
                </div>
                <div className="flex flex-col gap-2 max-w-sm">
                  <h3 className="text-xl font-semibold text-primary font-[Montserrat]">
                    {service.title}
                  </h3>
                  <p className="text-third/60 text-sm font-[Poppins] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default AboutBasic3;
