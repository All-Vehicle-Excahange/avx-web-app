/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import { Plus, Trash } from "lucide-react";
import Button from "@/components/ui/button";
import Select from "react-select";
import GlobalLoader from "@/components/ui/GlobalLoader";
import {
  setAboutHero,
  setAboutMission,
  setAboutVision,
  setState,
  setAboutServices,
} from "@/services/theme.service";
import { ABOUT_PREMIUM_2 } from "../schemas";
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
  indicatorSeparator: () => ({
    display: "none",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
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
const EyeBrow = ({ children }) => (
  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-4">
    {children}
  </p>
);
const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;
const DEFAULT_DATA = ABOUT_PREMIUM_2[0].data;

export default function AboutPremium2({
  data,
  isEditing,
  onUpdate,
  onNextTab,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const fallbackData = { ...DEFAULT_DATA };
  const d = data || fallbackData;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const current = hovered !== null ? hovered : active;
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
          {/* BACKGROUND MEDIA (Video/Image) */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">
              Background Media (Hero 1)
            </p>
            <div className="h-52 relative">
              <ImageUploader
                label="Hero Background"
                src={
                  d.customHeroImage1 ||
                  d.customHeroImageUrl1 ||
                  d.heroTemplate1?.imageUrl
                }
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
                    delete updatedData.heroTemplate1;
                    delete updatedData.customHeroImageUrl1;
                  }
                  onUpdate(updatedData);
                }}
              />
            </div>
          </div>
          {/* SIDE IMAGE */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">
              Side Image (Hero 2)
            </p>
            <div className="h-52 relative">
              <ImageUploader
                label="Hero Side Image"
                src={
                  d.customHeroImage2 ||
                  d.customHeroImageUrl2 ||
                  d.heroTemplate2?.imageUrl
                }
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
                    delete updatedData.heroTemplate2;
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
                src={
                  d.customMissionImage1 ||
                  d.customMissionUrl1 ||
                  d.missionTemplate1?.imageUrl
                }
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
                    delete updatedData.missionTemplate1;
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
                src={
                  d.customVisionImage1 ||
                  d.customVisionUrl1 ||
                  d.visionTemplate1?.imageUrl
                }
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
                    delete updatedData.visionTemplate1;
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
  /* ================== LIVE PREVIEW ================== */
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section className="relative px-2 lg:px-4 overflow-hidden">
        {/* HERO BACKGROUND (VIDEO/IMAGE) */}
        <div className="absolute inset-0 h-screen overflow-hidden">
          {(
            d.customHeroImage1 ||
            d.customHeroImageUrl1 ||
            d.heroTemplate1?.imageUrl
          )?.includes(".mp4") ? (
            <video
              src={
                d.customHeroImage1 ||
                d.customHeroImageUrl1 ||
                d.heroTemplate1?.imageUrl
              }
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={
                d.customHeroImage1 ||
                d.customHeroImageUrl1 ||
                d.heroTemplate1?.imageUrl
              }
              className="w-full h-full object-cover"
              alt="Background"
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container relative z-10 h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* HERO TEXT */}
            <div className="flex flex-col gap-6 max-w-2xl text-left">
              <div className="flex flex-col gap-6">
                <EyeBrow>About Us</EyeBrow>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[Montserrat] font-bold text-white leading-[1.02]">
                  {d.heroTitle}
                </h1>
                <div className="w-12 h-0.5 bg-fourth" />
              </div>
              <div
                className="font-[Poppins] text-[14.5px] text-white/80 leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: d.heroDescription }}
              />
            </div>
            {/* SIDE IMAGE */}
            <div className="hidden lg:block">
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] bg-primary/5">
                  <img
                    src={
                      d.customHeroImage2 ||
                      d.customHeroImageUrl2 ||
                      d.heroTemplate2?.imageUrl
                    }
                    alt="Hero side"
                    className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          MISSION & VISION
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          {/* heading row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
            <div>
              <EyeBrow>What Drives Us</EyeBrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] text-primary font-[Montserrat]">
                Mission & <span className="text-primary">Vision</span>
              </h2>
            </div>
            <div className="max-w-md">
              <Divider />
              <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins] mt-4">
                The principles behind everything we build and every decision we
                make.
              </p>
            </div>
          </div>
          {/* cards */}
          <div className="flex flex-col gap-16">
            {/* MISSION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
              {/* IMAGE */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] bg-primary/5">
                  <img
                    src={
                      d.customMissionImage1 ||
                      d.customMissionUrl1 ||
                      d.missionTemplate1?.imageUrl
                    }
                    alt={d.missionTitle}
                    className="w-full h-80 lg:h-[380px] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                </div>
              </div>
              {/* CONTENT */}
              <div className="flex flex-col gap-6 relative">
                <span className="absolute -top-10 left-0 text-[120px] font-bold text-primary/5 leading-none select-none">
                  01
                </span>
                <h3 className="text-3xl lg:text-4xl font-semibold font-[Montserrat] leading-[1.05] relative z-10">
                  <span className="text-primary">{d.missionTitle}</span>
                </h3>
                <div className="w-10 h-0.5 bg-fourth/60" />
                <div
                  className="text-third/70 text-[15px] leading-[1.9] font-[Poppins] max-w-lg"
                  dangerouslySetInnerHTML={{ __html: d.missionDesc }}
                />
              </div>
            </div>
            {/* VISION (flipped) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1">
              {/* IMAGE */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] bg-primary/5">
                  <img
                    src={
                      d.customVisionImage1 ||
                      d.customVisionUrl1 ||
                      d.visionTemplate1?.imageUrl
                    }
                    alt={d.visionTitle}
                    className="w-full h-80 lg:h-[380px] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                </div>
              </div>
              {/* CONTENT */}
              <div className="flex flex-col gap-6 relative">
                <span className="absolute -top-10 left-0 text-[120px] font-bold text-primary/5 leading-none select-none">
                  02
                </span>
                <h3 className="text-3xl lg:text-4xl font-semibold font-[Montserrat] leading-[1.05] relative z-10">
                  <span className="text-primary">{d.visionTitle}</span>
                </h3>
                <div className="w-10 h-0.5 bg-fourth/60" />
                <div
                  className="text-third/70 text-[15px] leading-[1.9] font-[Poppins] max-w-lg"
                  dangerouslySetInnerHTML={{ __html: d.visionDesc }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          STATS
          ════════════════════════════════════════ */}
      <section className="py-12">
        <div className="relative overflow-hidden bg-fourth/95 border border-primary/10 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
          <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
          <div className="px-2 lg:px-4">
            <div className="container">
              {/* TOP */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 border-b border-primary/10 relative z-10">
                <div className="flex flex-col justify-center gap-6">
                  <EyeBrow>By The Numbers</EyeBrow>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[Montserrat] font-bold text-primary leading-[1.02]">
                    Our Growth <span className="text-primary">in Numbers</span>
                  </h2>
                  <div className="w-12 h-0.5 bg-primary/40" />
                </div>
                <div className="flex flex-col justify-center max-w-md">
                  <div
                    className="font-[Poppins] text-[14.5px] text-primary/70 leading-[1.9]"
                    dangerouslySetInnerHTML={{ __html: d.aboutUsDescription }}
                  />
                </div>
              </div>
              {/* STATS GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-4 relative z-10">
                {(d.stats || []).map((stat, i) => (
                  <div
                    key={i}
                    className="group relative py-5 border-primary/10 border-r border-b lg:border-b-0 last:border-r-0 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/10 via-transparent to-transparent" />
                    <span className="absolute -top-2 right-6 text-[80px] font-bold text-primary/5 leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="relative font-[Montserrat] font-bold text-primary leading-none tracking-tight transition-transform duration-300 group-hover:scale-110"
                      style={{ fontSize: "clamp(34px, 3.5vw, 48px)" }}
                    >
                      {stat.number}
                    </span>
                    <div className="mt-3 w-8 h-0.5 bg-primary/30 group-hover:w-14 transition-all duration-300" />
                    <span className="block mt-2 font-[Poppins] text-[11px] text-primary/55 uppercase tracking-[0.25em] font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          SERVICES
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 overflow-hidden">
        <div className="container">
          {/* heading */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
            <div className="flex flex-col gap-5">
              <EyeBrow>Services</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[Montserrat] font-bold text-primary leading-[1.02]">
                {d.servicesTitle}
              </h2>
            </div>
            <div className="max-w-md">
              <div
                className="font-[Poppins] text-[14.5px] text-third/70 leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: d.servicesDesc }}
              />
            </div>
          </div>
          {/* cards row */}
          <div className="flex flex-col lg:flex-row gap-4 lg:h-60">
            {(d.services || []).map((svc, i) => {
              return (
                <div
                  key={i}
                  className="group relative w-full lg:flex-1 lg:hover:flex-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-2xl overflow-hidden cursor-pointer h-[200px] lg:h-auto"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/20 to-black/40 lg:group-hover:from-black/20 transition duration-500" />
                  <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                    {/* icon */}
                    <div className="absolute top-5 left-5 lg:top-6 lg:left-6 w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 lg:group-hover:scale-110 transition duration-300">
                      {typeof svc.icon === "string" &&
                      svc.icon.startsWith("<svg") ? (
                        <div
                          className="lg:group-hover:text-fourth text-primary [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-[18px] lg:[&>svg]:h-[18px]"
                          dangerouslySetInnerHTML={{ __html: svc.icon }}
                        />
                      ) : (
                        <span className="text-xs text-primary">Icon</span>
                      )}
                    </div>
                    {/* content */}
                    <div className="opacity-100 lg:opacity-0 lg:translate-y-10 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-fourth font-[Montserrat] text-[18px] lg:text-[22px] font-semibold mb-2 lg:mb-3">
                        {svc.title}
                      </h3>
                      <div className="w-8 lg:w-10 h-0.5 bg-white/60 mb-2 lg:mb-3 lg:group-hover:w-16 transition-all duration-300" />
                      <p className="text-white/80 text-[13px] lg:text-[14px] leading-[1.7] lg:leading-[1.8] max-w-sm">
                        {svc.desc}
                      </p>
                    </div>
                    {/* ghost number */}
                    <span className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 text-[50px] lg:text-[80px] font-bold text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
