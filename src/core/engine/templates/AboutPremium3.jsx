/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Cpu, Globe, ShieldCheck, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader "; 
import RichTextEditor from "../atoms/RichTextEditor";
import Select from "react-select";
import GlobalLoader from "@/components/ui/GlobalLoader";
import Button from "@/components/ui/button";
import {
  setAboutHero,
  setAboutMission,
  setAboutVision,
  setState,
  setAboutServices,
} from "@/services/theme.service";
import { ABOUT_PREMIUM_3 } from "../schemas";
const SVG_OPTIONS = [
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
    label: "Search",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
    label: "Cancel",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
    label: "Layout",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
    label: "Code",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
    label: "Clock",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-76 112 198-198-57-56-141 142-70-71-57 56 127 127Z"/></svg>`,
    label: "Shield",
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
const DEFAULT_DATA = ABOUT_PREMIUM_3[0].data;
export default function AboutPremium3({ data, isEditing, onUpdate, onNextTab }) {
  const [isSaving, setIsSaving] = useState(false);
  const fallbackData = { ...DEFAULT_DATA };
  const d = data || fallbackData;
  const [activeIndex, setActiveIndex] = useState(0);
  /* ================== HELPERS ================== */
  const getBlobFromUrl = async (url) => {
    if (!url || !url.startsWith("blob:")) return null;
    try {
      const response = await fetch(url);
      return await response.blob();
    } catch (e) {
      console.error("Error fetching blob from URL:", e);
      return null;
    }
  };
  const update = (k, v) => onUpdate({ ...d, [k]: v });
  const updateArr = (k, i, f, v) => {
    const copy = [...d[k]];
    copy[i][f] = v;
    update(k, copy);
  };
  const addArr = (k, item) => update(k, [...d[k], item]);
  const removeArr = (k, i) => {
    const copy = [...d[k]];
    copy.splice(i, 1);
    update(k, copy);
  };
  /* ================== API HANDLERS ================== */
  const handleSaveAndNext = async () => {
    setIsSaving(true);
    try {
      // Hero
      const heroData = new FormData();
      heroData.append("heroTitle", d.heroTitle || "");
      heroData.append("heroDescription", d.heroDescription || "");

      if (d.customHeroImage1 && d.customHeroImage1.startsWith("blob:")) {
        const blob = await getBlobFromUrl(d.customHeroImage1);
        if (blob) heroData.append("customHeroImage1", blob, "hero1.png");
      } else if (d.heroTemplate1?.id) {
        heroData.append("heroTemplateId1", d.heroTemplate1.id);
      }

      if (d.customHeroImage2 && d.customHeroImage2.startsWith("blob:")) {
        const blob = await getBlobFromUrl(d.customHeroImage2);
        if (blob) heroData.append("customHeroImage2", blob, "hero2.png");
      } else if (d.heroTemplate2?.id) {
        heroData.append("heroTemplateId2", d.heroTemplate2.id);
      }

      // Mission
      const missionData = new FormData();
      missionData.append("missionTitle", d.missionTitle || "");
      missionData.append("missionDescription", d.missionDesc || "");
      if (d.customMissionImage1 && d.customMissionImage1.startsWith("blob:")) {
        const blob = await getBlobFromUrl(d.customMissionImage1);
        if (blob) missionData.append("customMission1", blob, "mission1.png");
      } else if (d.missionTemplate1?.id) {
        missionData.append("missionTemplateId1", d.missionTemplate1.id);
      }

      // Vision
      const visionData = new FormData();
      visionData.append("visionTitle", d.visionTitle || "");
      visionData.append("visionDescription", d.visionDesc || "");
      if (d.customVisionImage1 && d.customVisionImage1.startsWith("blob:")) {
        const blob = await getBlobFromUrl(d.customVisionImage1);
        if (blob) visionData.append("customVision1", blob, "vision1.png");
      } else if (d.visionTemplate1?.id) {
        visionData.append("visionTemplateId1", d.visionTemplate1.id);
      }

      // Stats
      const statsData = new FormData();
      statsData.append("aboutUsDescription", d.aboutUsDescription || "");
      if (d.stats && Array.isArray(d.stats)) {
        d.stats.forEach((stat, i) => {
          statsData.append(`stats[${i}].number`, stat.number || "");
          statsData.append(`stats[${i}].label`, stat.label || "");
        });
      }

      // Services
      const servicesData = new FormData();
      servicesData.append("serviceTitle", d.servicesTitle || "");
      servicesData.append("serviceDescription", d.servicesDesc || "");
      if (d.services && Array.isArray(d.services)) {
        d.services.forEach((service, i) => {
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

      if (onNextTab) onNextTab();
    } catch (error) {
      console.error("Error saving sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  /* ================== EDITOR ================== */
  if (isEditing) {
    return (
      <div className="p-8 rounded-xl border border-third/30 w-full max-w-[1480px] mx-auto space-y-10">
        <GlobalLoader isLoading={isSaving} />
        {/* HERO EDITOR */}
        <h3 className="text-primary text-xl font-bold">Hero Section</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">
              Background Media
            </p>
            <div className="h-52 relative">
              <ImageUploader
                label="Hero Background"
                src={d.customHeroImage1 || d.customHeroImageUrl1 || d.heroTemplate1?.imageUrl}
                fieldKey="hero_bg"
                onChange={({ imageUrl, id }) => {
                  const updatedData = { ...d };
                  if (id) {
                    // Template selected
                    updatedData.heroTemplate1 = { imageUrl, id };
                    delete updatedData.customHeroImage1;
                    delete updatedData.customHeroImageUrl1;
                  } else {
                    // Custom image uploaded
                    updatedData.customHeroImage1 = imageUrl;
                    delete updatedData.heroTemplate1; // 🔥 IMPORTANT FIX
                    delete updatedData.customHeroImageUrl1;
                  }
                  onUpdate(updatedData);
                }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Side Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Hero Side Image"
                src={d.customHeroImage2 || d.customHeroImageUrl2 || d.heroTemplate2?.imageUrl}
                fieldKey="hero_side"
                onChange={({ imageUrl, id }) => {
                  const updatedData = { ...d };
                  if (id) {
                    // Template selected
                    updatedData.heroTemplate2 = { imageUrl, id };
                    delete updatedData.customHeroImage2;
                    delete updatedData.customHeroImageUrl2;
                  } else {
                    // Custom image uploaded
                    updatedData.customHeroImage2 = imageUrl;
                    delete updatedData.heroTemplate2; // 🔥 IMPORTANT FIX
                    delete updatedData.customHeroImageUrl2;
                  }
                  onUpdate(updatedData);
                }}
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <EditorInput
            bold
            value={d.heroTitle}
            onChange={(e) => update("heroTitle", e.target.value)}
            placeholder="Hero Title"
          />
          <RichTextEditor
            label="Hero Description"
            value={d.heroDescription}
            onChange={(v) => update("heroDescription", v)}
          />
        </div>
        <hr className="border-third/20" />
        {/* MISSION EDITOR */}
        <h3 className="text-primary text-xl font-bold">Mission Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <EditorInput
              bold
              value={d.missionTitle}
              onChange={(e) => update("missionTitle", e.target.value)}
              placeholder="Mission Title"
            />
            <RichTextEditor
              label="Mission Description"
              value={d.missionDesc}
              onChange={(v) => update("missionDesc", v)}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Mission Image"
                src={d.customMissionImage1 || d.customMissionUrl1 || d.missionTemplate1?.imageUrl}
                fieldKey="mission"
                onChange={({ imageUrl, id }) => {
                  const updatedData = { ...d };
                  if (id) {
                    // Template selected
                    updatedData.missionTemplate1 = { imageUrl, id };
                    delete updatedData.customMissionImage1;
                    delete updatedData.customMissionUrl1;
                  } else {
                    // Custom image uploaded
                    updatedData.customMissionImage1 = imageUrl;
                    delete updatedData.missionTemplate1; // 🔥 IMPORTANT FIX
                    delete updatedData.customMissionUrl1;
                  }
                  onUpdate(updatedData);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="border-third/20" />
        {/* VISION EDITOR */}
        <h3 className="text-primary text-xl font-bold">Vision Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <EditorInput
              bold
              value={d.visionTitle}
              onChange={(e) => update("visionTitle", e.target.value)}
              placeholder="Vision Title"
            />
            <RichTextEditor
              label="Vision Description"
              value={d.visionDesc}
              onChange={(v) => update("visionDesc", v)}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Vision Image"
                src={d.customVisionImage1 || d.customVisionUrl1 || d.visionTemplate1?.imageUrl}
                fieldKey="vision"
                onChange={({ imageUrl, id }) => {
                  const updatedData = { ...d };
                  if (id) {
                    // Template selected
                    updatedData.visionTemplate1 = { imageUrl, id };
                    delete updatedData.customVisionImage1;
                    delete updatedData.customVisionUrl1;
                  } else {
                    // Custom image uploaded
                    updatedData.customVisionImage1 = imageUrl;
                    delete updatedData.visionTemplate1; // 🔥 IMPORTANT FIX
                    delete updatedData.customVisionUrl1;
                  }
                  onUpdate(updatedData);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="border-third/20" />
        {/* STATS EDITOR */}
        <h3 className="text-primary text-xl font-bold">Stats Section</h3>
        <RichTextEditor
          label="About Us Description"
          value={d.aboutUsDescription}
          onChange={(v) => update("aboutUsDescription", v)}
        />
        <div className="p-4 bg-primary/5 rounded-lg border border-third/10">
          <h4 className="text-primary font-semibold mb-4">Stats Numbers</h4>
          <div className="grid grid-cols-4 gap-4">
            {(d.stats || []).map((s, i) => (
              <div key={i} className="space-y-2">
                <EditorInput
                  bold
                  value={s.number}
                  onChange={(e) =>
                    updateArr("stats", i, "number", e.target.value)
                  }
                  placeholder="Number"
                />
                <EditorInput
                  value={s.label}
                  onChange={(e) =>
                    updateArr("stats", i, "label", e.target.value)
                  }
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </div>
        <hr className="border-third/20" />
        {/* SERVICES EDITOR */}
        <h3 className="text-primary font-bold text-xl mb-4">
          Services Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditorInput
            bold
            value={d.servicesTitle}
            onChange={(e) => update("servicesTitle", e.target.value)}
            placeholder="Services Title"
          />
          <RichTextEditor
            label="Services Description"
            value={d.servicesDesc}
            onChange={(v) => update("servicesDesc", v)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {(d.services || []).map((s, i) => (
            <div
              key={i}
              className="border border-third/30 p-4 rounded bg-primary/5"
            >
              <div className="flex flex-col gap-2 relative mt-2">
                <label className="text-sm font-medium text-primary">
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
                    updateArr("services", i, "icon", selectedOption.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-primary mb-1 block">
                  Title
                </label>
                <EditorInput
                  bold
                  value={s.title}
                  onChange={(e) =>
                    updateArr("services", i, "title", e.target.value)
                  }
                  placeholder="Service Title"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-primary mb-1 block">
                  Description
                </label>
                <EditorInput
                  size="sm"
                  value={s.desc}
                  onChange={(e) =>
                    updateArr("services", i, "desc", e.target.value)
                  }
                  placeholder="Service Description"
                />
              </div>
            </div>
          ))}
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
  const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };
  /* ================== LIVE PREVIEW ================== */
  return (
    <>
      {/* ═════════ HERO ═════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          {(d.customHeroImage1 || d.customHeroImageUrl1 || d.heroTemplate1?.imageUrl)?.includes(
            ".mp4",
          ) ? (
            <video
              src={d.customHeroImage1 || d.customHeroImageUrl1 || d.heroTemplate1?.imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={d.customHeroImage1 || d.customHeroImageUrl1 || d.heroTemplate1?.imageUrl}
              className="w-full h-full object-cover"
              alt="Background"
            />
          )}
          <div className="absolute inset-0 bg-secondary/60" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-16 pb-8">
          <div className="flex flex-col gap-8 mb-6">
            <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold">
              Hero
            </p>
            <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {d.heroTitle}
            </h2>
            <div
              className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-6xl"
              dangerouslySetInnerHTML={{ __html: d.heroDescription }}
            />
          </div>
        </div>
      </section>
      {/* ═════════ MISSION & VISION ═════════ */}
      <section className="relative py-12 overflow-hidden px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full relative">
            <div className="flex flex-col items-center gap-3 mb-12">
              <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Mission / Vision
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  Mission <span className="text-primary">Vision</span>
                </h2>
              </div>
            </div>
            {/* MISSION */}
            <div className="relative mb-32">
              <div className="w-[85%] lg:w-[70%] md:w-[75%] h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={d.customMissionImage1 || d.customMissionUrl1 || d.missionTemplate1?.imageUrl}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="absolute right-0 -bottom-16 w-[90%] md:w-[75%] lg:w-[45%] backdrop-blur-md bg-secondary/40 border border-third/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat] mb-3">
                  {d.missionTitle}
                </h3>
                <div className="text-third/70 font-[Poppins] leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: d.missionDesc }} />
                </div>
              </div>
            </div>
            {/* VISION */}
            <div className="relative">
              <div className="ml-auto w-[85%] lg:w-[70%] md:w-[75%] h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={d.customVisionImage1 || d.customVisionUrl1 || d.visionTemplate1?.imageUrl}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="absolute left-0 -bottom-16 w-[90%] md:w-[75%] lg:w-[45%] backdrop-blur-md bg-secondary/40 border border-third/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat] mb-3">
                  {d.visionTitle}
                </h3>
                <div className="text-third/70 font-[Poppins] leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: d.visionDesc }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ STATS ═════════ */}
      <section className="relative flex flex-col justify-center items-center py-4 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Stats
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                    Numbers that
                    <br />
                    <span className="text-primary">speak for us</span>
                  </h2>
                </div>
                <div
                  className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{ __html: d.aboutUsDescription }}
                />
              </div>
              <div className="relative grid grid-cols-2">
                <div className="absolute top-1/2 left-0 w-full h-px bg-third/20 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-third/20 -translate-x-1/2" />
                <div className="absolute top-0 right-1/2 w-8 h-px bg-fourth" />
                <div className="absolute bottom-0 left-1/2 w-8 h-px bg-fourth" />
                <div className="absolute top-0 left-1/2 w-px h-8 bg-fourth" />
                <div className="absolute bottom-0 right-1/2 w-px h-8 bg-fourth" />
                {(d.stats || []).map((stat, index) => (
                  <div key={index} className="flex flex-col gap-3 p-8 lg:p-10">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-none text-primary font-[Montserrat]">
                      {stat.number}
                    </p>
                    <p className="text-third/60 text-sm font-[Poppins] leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ SERVICES ═════════ */}
      <section className="relative flex flex-col justify-center items-center px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full flex flex-col gap-6">
            <div className="grid gap-5 items-end">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Our Services
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  What We<span className="text-primary"> Actually Do</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 lg:pb-2">
                <div
                  className="text-third/70 text-lg md:text-md font-[Poppins] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: d.servicesDesc }}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-0 border border-third/10 rounded-2xl overflow-hidden">
              {/* Left: expandable rows — desktop only */}
              <div className="lg:col-span-5 hidden lg:flex flex-col border-r border-third/10">
                {(d.services || []).map((service, index) => {
                  const Icon = iconMap[service.icon];
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`group relative flex flex-col text-left border-b border-third/10 last:border-none transition-all duration-300 overflow-hidden ${isActive ? "bg-third/5 py-7 gap-3" : "py-7 gap-0 hover:bg-third/3"}`}
                    >
                      <span
                        className={`absolute left-0 top-0 w-0.5 h-full transition-all duration-300 ${isActive ? "bg-third" : "bg-transparent"}`}
                      />
                      <div className="flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-xs tracking-[0.4em] font-semibold font-[Poppins] transition-colors duration-300 ${isActive ? "text-third" : "text-third/30"}`}
                          >
                            0{index + 1}
                          </span>
                          <span
                            className={`transition-colors duration-300 ${isActive ? "text-third" : "text-third/30 group-hover:text-third/60"}`}
                          >
                            {Icon && <Icon size={16} strokeWidth={1.5} />}
                          </span>
                          <h3
                            className={`text-sm font-semibold font-[Montserrat] transition-colors duration-300 ${isActive ? "text-primary" : "text-third/50 group-hover:text-third/80"}`}
                          >
                            {service.title}
                          </h3>
                        </div>
                        <span
                          className={`text-sm font-[Poppins] transition-all duration-300 ${isActive ? "text-third" : "text-third/20"}`}
                        >
                          {isActive ? "—" : "+"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {/* Tab bar — mobile only */}
              <div className="lg:hidden flex flex-row w-full border-b border-third/10 overflow-x-auto">
                {(d.services || []).map((service, index) => {
                  const Icon = iconMap[service.icon];
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex items-center gap-2 px-5 py-4 whitespace-nowrap flex-1 justify-center transition-all duration-200 ${isActive ? "text-primary" : "text-third/40"}`}
                    >
                      {Icon && (
                        <Icon
                          size={14}
                          strokeWidth={1.5}
                          className={isActive ? "text-third" : ""}
                        />
                      )}
                      <span className="text-xs font-semibold font-[Poppins] tracking-wide">
                        {service.title}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 h-px w-full transition-all duration-300 ${isActive ? "bg-third" : "bg-transparent"}`}
                      />
                    </button>
                  );
                })}
              </div>
              {/* Right: large active display */}
              <div className="lg:col-span-7 flex flex-col justify-between p-10 lg:p-14 gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-third/20 bg-third/5">
                      {(() => {
                        const Icon = iconMap[d.services[activeIndex]?.icon];
                        return Icon ? (
                          <Icon
                            size={28}
                            strokeWidth={1.3}
                            className="text-third"
                          />
                        ) : null;
                      })()}
                    </div>
                    <p className="text-xs tracking-[0.5em] uppercase text-third/30 font-semibold font-[Poppins]">
                      0{activeIndex + 1} / 0{d.services?.length || 0}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                      {d.services[activeIndex]?.title}
                    </h3>
                    <p className="text-third/70 text-lg font-[Poppins] leading-relaxed max-w-sm">
                      {d.services[activeIndex]?.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {(d.services || []).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 h-1.5 bg-third" : "w-1.5 h-1.5 bg-third/30 hover:bg-third/60"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
