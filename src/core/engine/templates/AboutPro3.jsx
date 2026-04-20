/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { ABOUT_PRO_3 } from "@/core/engine/schemas/about/pro/about_pro_3";
import Select from "react-select";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
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
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
    label: "Globe",
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

const DEFAULT_DATA = ABOUT_PRO_3[0].data;

export default function AboutPro3({
  data: rawData,
  isEditing,
  onUpdate,
  onNextTab,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const data = rawData
    ? {
        ...DEFAULT_DATA,
        ...Object.fromEntries(
          Object.entries(rawData || {}).filter(
            ([, v]) => v !== undefined && v !== null,
          ),
        ),
      }
    : DEFAULT_DATA;

  const update = (k, v) => {
    if (onUpdate) onUpdate({ ...data, [k]: v });
  };

  const updateArr = (k, i, f, v) => {
    const copy = [...data[k]];
    copy[i][f] = v;
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

      const missionData = new FormData();
      missionData.append("missionTitle", data.aboutMissionTitle || "");
      missionData.append(
        "missionDescription",
        data.aboutMissionDescription || "",
      );
      if (data.aboutMissionTemplate1?.id)
        missionData.append("missionTemplateId1", data.aboutMissionTemplate1.id);

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
      <div className="w-full max-w-[1480px] mx-auto space-y-10">
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
            />
            <RichTextEditor
              label="Hero Description"
              value={data.aboutHeroDescription}
              onChange={(v) => update("aboutHeroDescription", v)}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Hero Image</p>
            <div className="h-40 relative">
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
            />
            <RichTextEditor
              label="Mission Description"
              value={data.aboutMissionDescription}
              onChange={(v) => update("aboutMissionDescription", v)}
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
            />
            <RichTextEditor
              label="Vision Description"
              value={data.aboutVisionDescription}
              onChange={(v) => update("aboutVisionDescription", v)}
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
            value={data.aboutServicesTitle}
            onChange={(e) => update("aboutServicesTitle", e.target.value)}
            placeholder="Services Title"
          />
          <RichTextEditor
            label="Services Description"
            value={data.aboutServicesDescription}
            onChange={(v) => update("aboutServicesDescription", v)}
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
      {/* HERO */}
      <section className="relative min-h-screen py-12 flex flex-col overflow-hidden">
        <img
          src={
            data.aboutHeroTemplate1?.imageUrl ||
            data.customHeroImage1 ||
            data.customHeroImageUrl1 ||
            data.heroImageTemplate1?.imageUrl
          }
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-secondary/65" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/20 via-secondary/40 to-secondary" />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 text-center px-2 lg:px-4 pt-16 pb-6">
          <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold ">
            Hero
          </p>
          <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] ">
            <span>{data.aboutHeroTitle}</span>
          </h2>
          <div
            className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-6xl "
            dangerouslySetInnerHTML={{ __html: data.aboutHeroDescription }}
          />
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="relative py-8 overflow-hidden px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col items-center gap-3 mb-12 ">
            <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Mission / Vision
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Mission <span className="text-primary">& Vision</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">
              <img
                src={data.aboutMissionTemplate1?.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Mission"
              />
              <div className="absolute inset-0 bg-linear-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
              <div className="relative z-10 px-8 sm:px-12 lg:px-16 max-w-2xl flex flex-col gap-4">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  01
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                  {data.aboutMissionTitle}
                </h2>
                <div
                  className="text-third/70"
                  dangerouslySetInnerHTML={{
                    __html: data.aboutMissionDescription,
                  }}
                />
              </div>
            </div>
            <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">
              <img
                src={data.aboutVisionTemplate1?.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Vision"
              />
              <div className="absolute inset-0 bg-linear-to-l from-secondary/95 via-secondary/85 to-secondary/70" />
              <div className="relative z-10 px-8 sm:px-12 lg:px-16 text-right ml-auto max-w-2xl flex flex-col gap-4 w-full">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  02
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                  {data.aboutVisionTitle}
                </h2>
                <div
                  className="text-third/70"
                  dangerouslySetInnerHTML={{
                    __html: data.aboutVisionDescription,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden px-2 lg:px-4">
        <div className="container">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Stats
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
                Numbers that <br />
                <span className="text-primary">speak for us</span>
              </h2>
              <div
                className="text-third/70"
                dangerouslySetInnerHTML={{ __html: data.aboutStatsDescription }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(data.stats || []).map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 border border-third/10 rounded-2xl p-6 lg:p-8 hover:border-third/20 hover:bg-third/3 shadow-2xl"
                >
                  <span className="text-xl lg:text-3xl text-primary">
                    {stat.number}
                  </span>
                  <span className="text-sm text-third/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-8">
                Our Services
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
                {data.aboutServicesTitle}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(data.services || []).map((item, i) => {
                return (
                  <div
                    key={i}
                    className="group flex flex-col justify-between border border-third/10 rounded-2xl p-6 backdrop-blur-lg hover:border-third/30 transition"
                  >
                    <div>
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-third/10 mb-6">
                        <span
                          className="w-5 h-5 text-third [&>svg]:w-full [&>svg]:h-full"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                      </div>
                      <span className="text-third/40 text-sm mb-3 block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold text-primary font-[Montserrat] mb-2">
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className="text-third/60 text-sm"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
