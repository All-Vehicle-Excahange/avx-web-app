/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState } from "react";
import { ABOUT_PREMIUM_1 } from "../schemas";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import { Plus, Trash } from "lucide-react";
import Select from "react-select";
import Button from "@/components/ui/button";
import GlobalLoader from "@/components/ui/GlobalLoader";
import {
  setAboutHero,
  setAboutMission,
  setAboutVision,
  setState,
  setAboutServices,
} from "@/services/theme.service";
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
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
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
const DEFAULT_DATA = ABOUT_PREMIUM_1[0].data;
export default function AboutPremium1({
  data,
  isEditing,
  onUpdate,
  onNextTab,
  errors,
  rules,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const d = {
    ...DEFAULT_DATA,
    ...Object.fromEntries(
      Object.entries(data || {}).filter(
        ([_, v]) => v !== undefined && v !== null,
      ),
    ),
  };

  // Map backend fields to UI fields if UI fields are missing
  if (!data?.missionDesc && data?.missionDescription) {
    d.missionDesc = data.missionDescription;
  }
  if (!data?.visionDesc && data?.visionDescription) {
    d.visionDesc = data.visionDescription;
  }
  if (!data?.servicesTitle && data?.serviceTitle) {
    d.servicesTitle = data.serviceTitle;
  }
  if (!data?.servicesDesc && data?.serviceDescription) {
    d.servicesDesc = data.serviceDescription;
  }

  // Map backend image objects if UI fields are missing
  if (!data?.heroTemplate1 && data?.heroImageTemplateId1) {
    d.heroTemplate1 = data.heroImageTemplateId1;
  }
  if (!data?.missionTemplate1 && data?.missionTemplateId1) {
    d.missionTemplate1 = data.missionTemplateId1;
  }
  if (!data?.visionTemplate1 && data?.visionTemplateId1) {
    d.visionTemplate1 = data.visionTemplateId1;
  }

  // Synchronize transformed draft data with the parent state once on load
  React.useEffect(() => {
    if (!data || !onUpdate) return;

    let hasChanges = false;
    const updatedData = { ...d };

    if (!data.missionDesc && data.missionDescription) {
      updatedData.missionDesc = data.missionDescription;
      hasChanges = true;
    }
    if (!data.visionDesc && data.visionDescription) {
      updatedData.visionDesc = data.visionDescription;
      hasChanges = true;
    }
    if (!data.servicesTitle && data.serviceTitle) {
      updatedData.servicesTitle = data.serviceTitle;
      hasChanges = true;
    }
    if (!data.servicesDesc && data.serviceDescription) {
      updatedData.servicesDesc = data.serviceDescription;
      hasChanges = true;
    }

    // Sync image mappings
    if (!data.heroTemplate1 && data.heroImageTemplateId1) {
      updatedData.heroTemplate1 = data.heroImageTemplateId1;
      hasChanges = true;
    }
    if (!data.missionTemplate1 && data.missionTemplateId1) {
      updatedData.missionTemplate1 = data.missionTemplateId1;
      hasChanges = true;
    }
    if (!data.visionTemplate1 && data.visionTemplateId1) {
      updatedData.visionTemplate1 = data.visionTemplateId1;
      hasChanges = true;
    }

    if (hasChanges) {
      onUpdate(updatedData);
    }
  }, [data]);
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
    if (typeof copy[i] === "object" && copy[i] !== null) {
      copy[i] = { ...copy[i], [f]: v };
    } else {
      copy[i] = v;
    }
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
      if (d.customHeroImage1) {
        const blob = await getBlobFromUrl(d.customHeroImage1);
        if (blob) heroData.append("customHeroImage1", blob, "hero1.png");
      } else if (d.heroTemplate1?.id) {
        heroData.append("heroImageTemplateId1", d.heroTemplate1.id);
      }

      // Mission
      const missionData = new FormData();
      missionData.append("missionTitle", d.missionTitle || "");
      missionData.append("missionDescription", d.missionDesc || "");
      if (d.customMissionImage1) {
        const blob = await getBlobFromUrl(d.customMissionImage1);
        if (blob) missionData.append("customMission1", blob, "mission1.png");
      } else if (d.missionTemplate1?.id) {
        missionData.append("missionTemplateId1", d.missionTemplate1.id);
      }

      // Vision
      const visionData = new FormData();
      visionData.append("visionTitle", d.visionTitle || "");
      visionData.append("visionDescription", d.visionDesc || "");
      if (d.customVisionImage1) {
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

      await setAboutHero(heroData);
      await setAboutMission(missionData);
      await setAboutVision(visionData);
      await setState(statsData);
      await setAboutServices(servicesData);

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
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <EditorInput
              bold
              value={d.heroTitle}
              onChange={(e) => update("heroTitle", e.target.value)}
              placeholder="Hero Title"
              maxLength={rules?.heroTitle?.max}
              error={!!errors?.heroTitle}
              errorMsg={errors?.heroTitle}
            />
            <RichTextEditor
              label="Hero Description"
              value={d.heroDescription}
              onChange={(v) => update("heroDescription", v)}
              maxLength={rules?.heroDescription?.max}
              error={!!errors?.heroDescription}
              errorMsg={errors?.heroDescription}
            />
          </div>
          <div className="h-52 relative">
            <ImageUploader
              label="Hero Background Image"
              src={
                d.customHeroImage1 ||
                d.customHeroImageUrl1 ||
                d.heroTemplate1?.imageUrl
              }
              fieldKey="HEADER"
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
              maxLength={rules?.missionTitle?.max}
              error={!!errors?.missionTitle}
              errorMsg={errors?.missionTitle}
            />
            <RichTextEditor
              label="Mission Description"
              value={d.missionDesc}
              onChange={(v) => update("missionDesc", v)}
              maxLength={rules?.missionDesc?.max}
              error={!!errors?.missionDesc}
              errorMsg={errors?.missionDesc}
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
              maxLength={rules?.visionTitle?.max}
              error={!!errors?.visionTitle}
              errorMsg={errors?.visionTitle}
            />
            <RichTextEditor
              label="Vision Description"
              value={d.visionDesc}
              onChange={(v) => update("visionDesc", v)}
              maxLength={rules?.visionDesc?.max}
              error={!!errors?.visionDesc}
              errorMsg={errors?.visionDesc}
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
          maxLength={rules?.aboutUsDescription?.max}
          error={!!errors?.aboutUsDescription}
          errorMsg={errors?.aboutUsDescription}
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
                  maxLength={rules?.arrayRules?.stats?.number?.max}
                  error={!!errors?.stats?.[i]?.number}
                  errorMsg={errors?.stats?.[i]?.number}
                />
                <EditorInput
                  value={s.label}
                  onChange={(e) =>
                    updateArr("stats", i, "label", e.target.value)
                  }
                  placeholder="Label"
                  maxLength={rules?.arrayRules?.stats?.label?.max}
                  error={!!errors?.stats?.[i]?.label}
                  errorMsg={errors?.stats?.[i]?.label}
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
            maxLength={rules?.servicesTitle?.max}
            error={!!errors?.servicesTitle}
            errorMsg={errors?.servicesTitle}
          />
          <RichTextEditor
            label="Services Description"
            value={d.servicesDesc}
            onChange={(v) => update("servicesDesc", v)}
            maxLength={rules?.servicesDesc?.max}
            error={!!errors?.servicesDesc}
            errorMsg={errors?.servicesDesc}
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
                  maxLength={rules?.arrayRules?.services?.title?.max}
                  error={!!errors?.services?.[i]?.title}
                  errorMsg={errors?.services?.[i]?.title}
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
                  maxLength={rules?.arrayRules?.services?.desc?.max}
                  error={!!errors?.services?.[i]?.desc}
                  errorMsg={errors?.services?.[i]?.desc}
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
      {/* ═════════ HERO ═════════ */}
      <section className="w-full min-h-screen flex items-center justify-center py-12 pt-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <p className="mb-4 text-xs tracking-[0.5em] uppercase text-third font-semibold">
              Hero
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              {d.heroTitle}
            </h1>
            <div
              className="mt-6 text-third/70 text-lg font-[Poppins] leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{ __html: d.heroDescription }}
            />
          </div>
          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={
                  d.customHeroImage1 ||
                  d.customHeroImageUrl1 ||
                  d.heroImageTemplate1?.imageUrl
                }
                alt="Hero"
                className="w-full h-[300px] sm:h-[400px] lg:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ MISSION & VISION ═════════ */}
      <section className="relative py-12 px-2 lg:px-4 overflow-hidden">
        <div className="container">
          <div className="max-w-[1600px] mx-auto relative z-10">
            {/* ── HEADING ── */}
            <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Purpose
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {d.missionTitle} & {d.visionTitle}
              </h2>
            </div>
            {/* ── MAIN LAYOUT ── */}
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-0 items-stretch">
              {/* LEFT: MISSION */}
              <div className="lg:w-1/2 relative group">
                <div className="relative h-[800px] lg:h-[600px] w-full lg:w-[95%] overflow-hidden rounded-tr-[100px] lg:rounded-tr-[200px] border-r border-t border-primary/10">
                  <img
                    src={
                      d.customMissionImage1 ||
                      d.customMissionUrl1 ||
                      d.missionTemplate1?.imageUrl
                    }
                    className="w-full h-full object-cover grayscale transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:grayscale-0 group-hover:-translate-y-5 group-hover:brightness-110 group-hover:saturate-125"
                    alt="Mission"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent" />
                </div>
                {/* CONTENT */}
                <div className="absolute bottom-12 left-0 w-[520px] p-5 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">
                  <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
                    {d.missionTitle}
                  </h3>
                  <div
                    className="text-third text-lg font-light leading-relaxed italic"
                    dangerouslySetInnerHTML={{ __html: d.missionDesc }}
                  />
                </div>
              </div>
              {/* RIGHT: VISION */}
              <div className="lg:w-1/2 lg:mt-64 relative group">
                <div className="relative h-[400px] lg:h-[550px] w-full overflow-hidden rounded-bl-[100px] lg:rounded-bl-[200px] border-b border-l border-primary/10">
                  <img
                    src={
                      d.customVisionImage1 ||
                      d.customVisionUrl1 ||
                      d.visionTemplate1?.imageUrl
                    }
                    className="w-full h-full object-cover transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                    alt="Vision"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-transparent" />
                </div>
                {/* CONTENT */}
                <div className="mt-12 lg:mt-0 lg:absolute -top-24 right-0 lg:right-12 max-w-md p-10 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">
                  <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
                    {d.visionTitle}
                  </h3>
                  <div
                    className="text-third text-lg font-light leading-relaxed italic"
                    dangerouslySetInnerHTML={{ __html: d.visionDesc }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ STATS ═════════ */}
      <section className="relative py-12 bg-primary text-secondary overflow-hidden">
        <div className="container">
          <div className="px-4 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
                Impact
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-[Montserrat]">
                Our <span className="text-secondary">Numbers</span>
              </h2>
              <div
                className="text-secondary/70 text-lg font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: d.aboutUsDescription }}
              />
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-[320px] h-80 sm:w-[400px] sm:h-[400px]">
                {d.stats.map((item, index) => {
                  const pos = [
                    "top-0 left-1/2 -translate-x-1/2",
                    "right-0 top-1/2 -translate-y-1/2",
                    "bottom-0 left-1/2 -translate-x-1/2",
                    "left-0 top-1/2 -translate-y-1/2",
                  ];
                  return (
                    <div
                      key={index}
                      className={`absolute ${pos[index]} flex flex-col items-center`}
                    >
                      <h3 className="text-3xl sm:text-4xl font-semibold font-[Montserrat]">
                        {item.number}
                      </h3>
                      <p className="text-secondary/60 text-sm text-center max-w-[120px]">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-fourth/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ SERVICES ═════════ */}
      <section className="relative py-20 px-4 text-primary font-[Poppins]">
        <div className="container mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="max-w-2xl mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
              Services
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {d.servicesTitle}
            </h2>
            <div
              className="mt-6 text-third/70 text-lg leading-relaxed border-l-2 border-primary/30 pl-6"
              dangerouslySetInnerHTML={{ __html: d.servicesDesc }}
            />
          </div>
          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT: CARDS */}
            <div className="grid sm:grid-cols-2 gap-6">
              {d.services.map((service, i) => {
                const isActive = current === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 
                    ${
                      isActive
                        ? "border-primary/40 bg-primary/5"
                        : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-xl 
                        ${isActive ? "bg-primary text-secondary" : "bg-primary/5 text-third"}`}
                        dangerouslySetInnerHTML={{ __html: service.icon }}
                      />
                      <h4 className="text-lg font-semibold font-[Montserrat]">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-third/60 text-sm leading-relaxed">
                      {service.desc.substring(0, 70)}...
                    </p>
                  </div>
                );
              })}
            </div>
            {/* RIGHT: CONTENT PANEL */}
            <div className="relative">
              <div className="rounded-3xl border border-primary/20 p-8 lg:p-10 bg-primary/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500">
                <p className="text-xs tracking-[0.4em] uppercase text-third mb-3">
                  Selected Service
                </p>
                <h3 className="text-2xl lg:text-4xl font-bold font-[Montserrat] mb-6">
                  {d.services[current].title}
                </h3>
                <p className="text-third/70 text-lg leading-relaxed border-l-2 border-primary pl-6">
                  {d.services[current].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
