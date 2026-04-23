/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { ABOUT_PRO_2 } from "../schemas";

import React, { useEffect, useRef, useState } from "react";
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

const DEFAULT_DATA = ABOUT_PRO_2[0].data;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const EyeBrow = ({ children }) => (
  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-4">
    {children}
  </p>
);
const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;

export default function AboutPro2({
  data: rawData,
  isEditing,
  onUpdate,
  onNextTab,
  errors,
  rules,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const data = {
    ...DEFAULT_DATA,
    ...Object.fromEntries(
      Object.entries(rawData || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
    ),
  };

  const missionVisionCards = [
    {
      tag: "01",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      prefix: "Our",
      keyword: "Mission",
      title: data.aboutMissionTitle,
      desc: data.aboutMissionDescription,
      image: data.aboutMissionTemplate1?.imageUrl,
      flip: false,
    },
    {
      tag: "02",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      prefix: "Our",
      keyword: "Vision",
      title: data.aboutVisionTitle,
      desc: data.aboutVisionDescription,
      image: data.aboutVisionTemplate1?.imageUrl,
      flip: true,
    },
  ];

  const update = (k, v) => {
    if (onUpdate) onUpdate({ ...data, [k]: v });
  };

  const updateArr = (k, i, f, v) => {
    const copy = [...data[k]];
    if (typeof copy[i] === 'object' && copy[i] !== null) {
      copy[i] = { ...copy[i], [f]: v };
    } else {
      copy[i] = v;
    }
    update(k, copy);
  };
  const addArr = (k, item) => update(k, [...(data[k] || []), item]);
  const removeArr = (k, i) => {
    const copy = [...data[k]];
    copy.splice(i, 1);
    update(k, copy);
  };

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    try {
      const heroData = new FormData();
      heroData.append("heroTitle", data.aboutHeroTitle || "");
      heroData.append("heroDescription", data.aboutHeroDescription || "");
      if (data.aboutHeroTemplate1?.id)
        heroData.append("heroImageTemplateId1", data.aboutHeroTemplate1.id);
      if (data.aboutHeroTemplate2?.id)
        heroData.append("heroImageTemplateId2", data.aboutHeroTemplate2.id);
      if (data.aboutHeroTemplate3?.id)
        heroData.append("heroImageTemplateId3", data.aboutHeroTemplate3.id);
      // Mission
      const missionData = new FormData();
      missionData.append("missionTitle", data.aboutMissionTitle || "");
      missionData.append(
        "missionDescription",
        data.aboutMissionDescription || "",
      );
      if (data.aboutMissionTemplate1?.id)
        missionData.append("missionTemplateId1", data.aboutMissionTemplate1.id);

      // Vision
      const visionData = new FormData();
      visionData.append("visionTitle", data.aboutVisionTitle || "");
      visionData.append("visionDescription", data.aboutVisionDescription || "");
      if (data.aboutVisionTemplate1?.id)
        visionData.append("visionTemplateId1", data.aboutVisionTemplate1.id);

      const statsData = new FormData();
      statsData.append("aboutUsDescription", data.aboutStatsDescription || "");
      if (data.stats && Array.isArray(data.stats)) {
        data.stats.forEach((stat, i) => {
          statsData.append(`stats[${i}].number`, stat.number || "");
          statsData.append(`stats[${i}].label`, stat.label || "");
        });
      }

      const servicesData = new FormData();
      servicesData.append("serviceTitle", data.aboutServicesTitle || "");
      servicesData.append(
        "serviceDescription",
        data.aboutServicesDescription || "",
      );
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

      if (onNextTab) onNextTab();
    } catch (error) {
      console.error("Error saving About sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className=" p-8 rounded-xl border border-third/30 w-full max-w-[1480px] mx-auto space-y-10">
        <GlobalLoader isLoading={isSaving} />
        {/* HERO EDITOR */}
        <h3 className="text-primary text-xl font-bold">Hero Section</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <EditorInput
              bold
              value={data.aboutHeroTitle}
              onChange={(e) => update("aboutHeroTitle", e.target.value)}
              placeholder="Hero Title"
              maxLength={rules?.aboutHeroTitle?.max}
              error={!!errors?.aboutHeroTitle}
              errorMsg={errors?.aboutHeroTitle}
            />
            <RichTextEditor
              label="Hero Description"
              value={data.aboutHeroDescription}
              onChange={(v) => update("aboutHeroDescription", v)}
              maxLength={rules?.aboutHeroDescription?.max}
              error={!!errors?.aboutHeroDescription}
              errorMsg={errors?.aboutHeroDescription}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Hero Images</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 relative col-span-2">
                <ImageUploader
                  label="Hero Image 1"
                  src={data.aboutHeroTemplate1?.imageUrl}
                  fieldKey="hero1"
                  imageType="HERO"
                  onChange={({ imageUrl, id }) => {
                    update("aboutHeroTemplate1", {
                      ...data.aboutHeroTemplate1,
                      imageUrl,
                      id: id ?? data.aboutHeroTemplate1?.id,
                    });
                  }}
                />
              </div>
              <div className="h-40 relative">
                <ImageUploader
                  label="Hero Image 2"
                  src={data.aboutHeroTemplate2?.imageUrl}
                  fieldKey="hero2"
                  imageType="HERO"
                  onChange={({ imageUrl, id }) => {
                    update("aboutHeroTemplate2", {
                      ...data.aboutHeroTemplate2,
                      imageUrl,
                      id: id ?? data.aboutHeroTemplate2?.id,
                    });
                  }}
                />
              </div>
              <div className="h-40 relative">
                <ImageUploader
                  label="Hero Image 3"
                  src={data.aboutHeroTemplate3?.imageUrl}
                  fieldKey="hero3"
                  imageType="HERO"
                  onChange={({ imageUrl, id }) => {
                    update("aboutHeroTemplate3", {
                      ...data.aboutHeroTemplate3,
                      imageUrl,
                      id: id ?? data.aboutHeroTemplate3?.id,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-third/20" />

        {/* MISSION EDITOR */}
        <h3 className="text-primary text-xl font-bold">Mission Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <EditorInput
              bold
              value={data.aboutMissionTitle}
              onChange={(e) => update("aboutMissionTitle", e.target.value)}
              placeholder="Mission Title"
              maxLength={rules?.aboutMissionTitle?.max}
              error={!!errors?.aboutMissionTitle}
              errorMsg={errors?.aboutMissionTitle}
            />
            <RichTextEditor
              label="Mission Description"
              value={data.aboutMissionDescription}
              onChange={(v) => update("aboutMissionDescription", v)}
              maxLength={rules?.aboutMissionDescription?.max}
              error={!!errors?.aboutMissionDescription}
              errorMsg={errors?.aboutMissionDescription}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Mission Image"
                src={data.aboutMissionTemplate1?.imageUrl}
                fieldKey="mission"
                onChange={({ imageUrl, id }) => {
                  update("aboutMissionTemplate1", {
                    ...data.aboutMissionTemplate1,
                    imageUrl,
                    id: id ?? data.aboutMissionTemplate1?.id,
                  });
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
              value={data.aboutVisionTitle}
              onChange={(e) => update("aboutVisionTitle", e.target.value)}
              placeholder="Vision Title"
              maxLength={rules?.aboutVisionTitle?.max}
              error={!!errors?.aboutVisionTitle}
              errorMsg={errors?.aboutVisionTitle}
            />
            <RichTextEditor
              label="Vision Description"
              value={data.aboutVisionDescription}
              onChange={(v) => update("aboutVisionDescription", v)}
              maxLength={rules?.aboutVisionDescription?.max}
              error={!!errors?.aboutVisionDescription}
              errorMsg={errors?.aboutVisionDescription}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Vision Image"
                src={data.aboutVisionTemplate1?.imageUrl}
                fieldKey="vision"
                onChange={({ imageUrl, id }) => {
                  update("aboutVisionTemplate1", {
                    ...data.aboutVisionTemplate1,
                    imageUrl,
                    id: id ?? data.aboutVisionTemplate1?.id,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <hr className="border-third/20" />

        {/* STATS EDITOR */}
        <h3 className="text-primary text-xl font-bold">Stats Section</h3>
        <RichTextEditor
          label="Stats Description"
          value={data.aboutStatsDescription}
          onChange={(v) => update("aboutStatsDescription", v)}
          maxLength={rules?.aboutStatsDescription?.max}
          error={!!errors?.aboutStatsDescription}
          errorMsg={errors?.aboutStatsDescription}
        />
        <div className="p-4 bg-primary/5 rounded-lg border border-third/10 mt-4">
          <h4 className="text-primary font-semibold mb-4">Stats Numbers</h4>
          <div className="grid grid-cols-4 gap-4">
            {(data.stats || []).map((s, i) => (
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
            value={data.aboutServicesTitle}
            onChange={(e) => update("aboutServicesTitle", e.target.value)}
            placeholder="Services Title"
            maxLength={rules?.aboutServicesTitle?.max}
            error={!!errors?.aboutServicesTitle}
            errorMsg={errors?.aboutServicesTitle}
          />
          <RichTextEditor
            label="Services Description"
            value={data.aboutServicesDescription}
            onChange={(v) => update("aboutServicesDescription", v)}
            maxLength={rules?.aboutServicesDescription?.max}
            error={!!errors?.aboutServicesDescription}
            errorMsg={errors?.aboutServicesDescription}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {(data.services || []).map((s, i) => (
            <div
              key={i}
              className="border border-third/30 p-4 rounded bg-primary/5"
            >
              {/* Icon Selector */}
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

              {/* Title */}
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

              {/* Description */}
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

  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section className="relative h-screen px-2 lg:px-4 overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src={
              data.aboutHeroTemplate1.imageUrl ||
              data.customHeroImage1 ||
              data.customHeroImageUrl1 ||
              data.heroImageTemplate1?.imageUrl
            }
            alt="Our story"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 h-full flex flex-col justify-center">
          {/* heading + description (stacked) */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-5">
              <EyeBrow>About Us</EyeBrow>
              <h1
                className="font-[Montserrat] font-bold text-white leading-[1.08]"
                style={{ fontSize: "clamp(30px, 4vw, 60px)" }}
              >
                {data.aboutHeroTitle}
              </h1>
              <div className="w-10 h-0.5 bg-fourth/70" />
            </div>
            {/* description */}
            <div>
              <div
                className="font-[Poppins] text-[14px] text-white/80 leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: data.aboutHeroDescription }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          MISSION & VISION
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="">
            {/* heading row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
              <div>
                <EyeBrow>What Drives Us</EyeBrow>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  Mission & <span className="text-fourth/80">Vision</span>
                </h2>
              </div>
              <div>
                <Divider />
                <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
                  The principles behind everything we build and every decision
                  we make.
                </p>
              </div>
            </div>
            {/* alternating rows */}
            <div className="flex flex-col gap-5">
              {missionVisionCards.map((item) => {
                return (
                  <div
                    key={item.tag}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-third/10 rounded-2xl overflow-hidden
                    hover:border-primary/20 transition-colors duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
                    ${item.flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
                  >
                    {/* image side */}
                    <div className="relative overflow-hidden min-h-[260px]">
                      <img
                        src={item.image}
                        alt={item.keyword}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-secondary/60 to-transparent" />
                      <div className="absolute bottom-5 left-5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl border border-fourth/50 bg-secondary/60 backdrop-blur-sm flex items-center justify-center">
                          <span
                            className="text-fourth"
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          />
                        </div>
                        <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.28em] uppercase text-primary/60">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    {/* content side */}
                    <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
                      <h3 className="text-2xl sm:text-3xl font-semibold font-[Montserrat] leading-[1.1]">
                        <span className="text-primary">{item.prefix} </span>
                        <span className="text-fourth">{item.keyword}</span>
                      </h3>
                      <div className="w-8 h-0.5 bg-fourth/50" />
                      <p className="text-third/65 text-[14px] leading-[1.95] font-[Poppins]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          STATS
          ════════════════════════════════════════ */}
      <section className="py-12  ">
        <div className=" overflow-hidden bg-fourth">
          <div className="container">
            <div className="px-2 lg:px-4">
              {/* ── TOP: heading + description ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-primary/10">
                {/* left — eyebrow + title */}
                <div className="flex flex-col justify-center gap-5 py-14 lg:border-r border-primary/10">
                  <EyeBrow>By The Numbers</EyeBrow>
                  <h2
                    className="font-[Montserrat] font-bold text-primary leading-[1.08]"
                    style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                  >
                    Our Growth{" "}
                    <span className="text-secondary">in Numbers</span>
                  </h2>
                  <div className="w-8 h-px bg-primary/30" />
                </div>
                {/* right — statsDesc from json */}
                <div className="flex flex-col justify-center px-2 lg:px-4 py-14">
                  <div
                    className="font-[Poppins] text-[13.5px] text-primary/65 leading-[1.9]"
                    dangerouslySetInnerHTML={{
                      __html: data.aboutStatsDescription,
                    }}
                  />
                </div>
              </div>
              {/* ── BOTTOM: 4-col stat strip (unchanged) ── */}
              <div className="lg:px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-primary/10">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="group relative flex flex-col gap-2 px-10 py-9 transition-colors duration-300 overflow-hidden"
                  >
                    {/* top accent line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/0  transition-all duration-300" />
                    {/* step tag */}
                    <span className="absolute top-6 right-7 font-[Montserrat] font-bold text-[9px] tracking-[0.3em] uppercase text-primary/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-[Montserrat] font-bold text-primary leading-none"
                      style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
                    >
                      {stat.number}
                    </span>
                    <span className="font-[Poppins] text-[11px] text-primary/55 uppercase tracking-widest font-medium">
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
      <section className="py-12 px-2 lg:px-4">
        {/* ── heading row — split with border ── */}
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2  mb-5">
            <div className="flex flex-col gap-4 pb-10 lg:pr-16 ">
              <EyeBrow>Services</EyeBrow>
              <h2
                className="font-[Montserrat] font-bold text-primary leading-[1.08]"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                {data.aboutServicesTitle}
              </h2>
            </div>
            <div className="flex flex-col justify-center pb-10 lg:pl-16">
              <p className="font-[Poppins] text-[13.5px] text-third/65 leading-[1.9]">
                {data.aboutServicesDescription}
              </p>
            </div>
          </div>
          {/* ── 2×2 pro cards ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-[25px]"
            variants={stagger}
          >
            {data.services.map((svc, i) => {
              return (
                <div
                  key={i}
                  variants={fadeUp}
                  className="group relative flex flex-col gap-5 p-7 border border-third/10 rounded-2xl overflow-hidden
                 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
                >
                  {/* top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-fourth transition-all duration-300" />
                  {/* icon + step */}
                  <div className="flex items-center justify-between">
                    <div className="w-[42px] h-[42px] rounded-xl border border-third/10 flex items-center justify-center group-hover:border-fourth/50 transition-colors duration-300">
                      <span
                        className="text-fourth"
                        dangerouslySetInnerHTML={{ __html: svc.icon }}
                      />
                    </div>
                    <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.2em] text-fourth/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* title */}
                  <h3 className="font-[Montserrat] font-semibold text-[15px] text-primary group-hover:text-fourth transition-colors duration-300">
                    {svc.title}
                  </h3>
                  {/* desc */}
                  <p className="font-[Poppins] text-[13px] text-third/65 leading-[1.8]">
                    {svc.desc}
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
