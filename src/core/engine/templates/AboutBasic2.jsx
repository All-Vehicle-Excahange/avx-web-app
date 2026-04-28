"use client";

import React, { useState } from "react";
import EditorInput from "@/core/engine/atoms/EditorInput";
import RichTextEditor from "@/core/engine/atoms/RichTextEditor";
import Button from "@/components/ui/button";
import GlobalLoader from "@/components/ui/GlobalLoader";
import Select from "react-select";
import {
  setAboutHero,
  setAboutMission,
  setAboutVision,
  setState,
  setAboutServices
} from "@/services/theme.service";
import { ABOUT_BASIC_2 } from "@/core/engine/schemas/about/basic/about_basic_2";

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
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m646-160-42-42 98-98q-37-53-90.5-84.5T480-420q-83 0-156 31.5T197-331q-54 54-85.5 127T80-480q0 83 31.5 156T197-197q54 54 127 85.5T480-80q64 0 117.5-31.5T706-178l98-98-42-42-98 98q-38 33-80.5-6.5T480-300q-54 0-99-45t-45-99q0-54 45-99t99-45q54 0 99 45t45 99q0 51.5-26.5 94T560-360Z"/></svg>`,
    label: "ShieldCheck",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320q93 0 156.5-63.5T700-540q0-93-63.5-156.5T480-760q-93 0-156.5 63.5T260-540q0 93 63.5 156.5T480-320Zm0-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm0 374q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-106Zm0 106Q319 217 239.5 334.5T160-552q0 150 96.5 255T480-200q150 0 246-105t96-255q0-100-80.5-217.5T480-500Z"/></svg>`,
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;

const EyeBrow = ({ children }) => (
  <p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-4"
  >
    {children}
  </p>
);

const DEFAULT_DATA = ABOUT_BASIC_2[0].data;

function AboutBasic2({ data: rawData, isEditing, onUpdate, onNextTab, errors, rules, storeIcons }) {
  const [isSaving, setIsSaving] = useState(false);

  const iconOptions = storeIcons?.length > 0
    ? storeIcons.map((icon) => ({ value: icon.svgIcon, label: icon.title }))
    : SVG_OPTIONS;

  // Merge schema defaults with incoming data so missing fields use dummy values
  const data = {
    ...DEFAULT_DATA, ...Object.fromEntries(
      Object.entries(rawData || {}).filter(([, v]) => v !== undefined && v !== null)
    )
  };

  // Map backend fields to UI fields if UI fields are missing
  if (!rawData?.missionDesc && rawData?.missionDescription) {
    data.missionDesc = rawData.missionDescription;
  }
  if (!rawData?.visionDesc && rawData?.visionDescription) {
    data.visionDesc = rawData.visionDescription;
  }
  if (!rawData?.servicesTitle && rawData?.serviceTitle) {
    data.servicesTitle = rawData.serviceTitle;
  }
  if (!rawData?.servicesDesc && rawData?.serviceDescription) {
    data.servicesDesc = rawData.serviceDescription;
  }

  // Synchronize transformed draft data with the parent state once on load
  React.useEffect(() => {
    if (!rawData) return;
    
    let hasChanges = false;
    const updatedData = { ...data };

    if (!rawData.missionDesc && rawData.missionDescription) {
      updatedData.missionDesc = rawData.missionDescription;
      hasChanges = true;
    }
    if (!rawData.visionDesc && rawData.visionDescription) {
      updatedData.visionDesc = rawData.visionDescription;
      hasChanges = true;
    }
    if (!rawData.servicesTitle && rawData.serviceTitle) {
      updatedData.servicesTitle = rawData.serviceTitle;
      hasChanges = true;
    }
    if (!rawData.servicesDesc && rawData.serviceDescription) {
      updatedData.servicesDesc = rawData.serviceDescription;
      hasChanges = true;
    }

    if (hasChanges && onUpdate) {
      onUpdate(updatedData);
    }
  }, [rawData]);

  if (!rawData) return null;

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    if (typeof newArray[index] === 'object' && newArray[index] !== null) {
      newArray[index] = { ...newArray[index], [field]: value };
    } else {
      newArray[index] = value;
    }
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

      await setAboutHero(heroData);
      await setAboutMission(missionData);
      await setAboutVision(visionData);
      await setState(statsData);
      await setAboutServices(servicesData);

      if (onNextTab) {
        onNextTab();
      }
    } catch (error) {
      console.error("Failed to save sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10 ">
        <GlobalLoader isLoading={isSaving} />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Hero Section</h3>
          <EditorInput
            label="Hero Title"
            value={data.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
            maxLength={rules?.heroTitle?.max}
            error={!!errors?.heroTitle}
            errorMsg={errors?.heroTitle}
          />
          <RichTextEditor
            label="Hero Description"
            value={data.heroDescription}
            onChange={(v) => updateField("heroDescription", v)}
            maxLength={rules?.heroDescription?.max}
            error={!!errors?.heroDescription}
            errorMsg={errors?.heroDescription}
          />
        </div>

        <hr className="border-white/10" />

        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Mission Section</h3>
          <EditorInput
            label="Mission Title"
            value={data.missionTitle}
            onChange={(e) => updateField("missionTitle", e.target.value)}
            maxLength={rules?.missionTitle?.max}
            error={!!errors?.missionTitle}
            errorMsg={errors?.missionTitle}
          />
          <RichTextEditor
            label="Mission Description"
            value={data.missionDesc}
            onChange={(v) => updateField("missionDesc", v)}
            maxLength={rules?.missionDesc?.max}
            error={!!errors?.missionDesc}
            errorMsg={errors?.missionDesc}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Vision Section</h3>
          <EditorInput
            label="Vision Title"
            value={data.visionTitle}
            onChange={(e) => updateField("visionTitle", e.target.value)}
            maxLength={rules?.visionTitle?.max}
            error={!!errors?.visionTitle}
            errorMsg={errors?.visionTitle}
          />
          <RichTextEditor
            label="Vision Description"
            value={data.visionDesc}
            onChange={(v) => updateField("visionDesc", v)}
            maxLength={rules?.visionDesc?.max}
            error={!!errors?.visionDesc}
            errorMsg={errors?.visionDesc}
          />
        </div>

        <hr className="border-white/10" />

        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Stats Section</h3>
          <RichTextEditor
            label="About Us Description"
            value={data.aboutUsDescription}
            onChange={(v) => updateField("aboutUsDescription", v)}
            maxLength={rules?.aboutUsDescription?.max}
            error={!!errors?.aboutUsDescription}
            errorMsg={errors?.aboutUsDescription}
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
                    maxLength={rules?.arrayRules?.stats?.number?.max}
                    error={!!errors?.stats?.[i]?.number}
                    errorMsg={errors?.stats?.[i]?.number}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-white">Label</p>
                  <EditorInput
                    value={s.label}
                    onChange={(e) =>
                      updateArrayItem("stats", i, "label", e.target.value)
                    }
                    maxLength={rules?.arrayRules?.stats?.label?.max}
                    error={!!errors?.stats?.[i]?.label}
                    errorMsg={errors?.stats?.[i]?.label}
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
            maxLength={rules?.servicesTitle?.max}
            error={!!errors?.servicesTitle}
            errorMsg={errors?.servicesTitle}
          />
          <RichTextEditor
            label="Services Description"
            value={data.servicesDesc}
            onChange={(v) => updateField("servicesDesc", v)}
            maxLength={rules?.servicesDesc?.max}
            error={!!errors?.servicesDesc}
            errorMsg={errors?.servicesDesc}
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
                    options={iconOptions}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    value={
                      iconOptions.find((opt) => opt.value === s.icon) || null
                    }

                    onChange={(selectedOption) => {
                      updateArrayItem(
                        "services",
                        i,
                        "icon",
                        selectedOption.value,
                      );
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
                    maxLength={rules?.arrayRules?.services?.title?.max}
                    error={!!errors?.services?.[i]?.title}
                    errorMsg={errors?.services?.[i]?.title}
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
                    maxLength={rules?.arrayRules?.services?.desc?.max}
                    error={!!errors?.services?.[i]?.desc}
                    errorMsg={errors?.services?.[i]?.desc}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8 border-t border-white/10 pt-6">
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
      <section className="relative flex items-center justify-center min-h-screen py-14 lg:py-24">
        <div className="px-5 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div
          >
            <EyeBrow>About Us</EyeBrow>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              {data.heroTitle}
            </h1>
          </div>

          <div
            className="w-10 h-px bg-primary/15"
          />

          <div
            className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]"
            dangerouslySetInnerHTML={{ __html: data.heroDescription }}
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="px-2 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
            <div
            >
              <EyeBrow>What Drives Us</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Mission & <span className="text-primary">Vision</span>
              </h2>
            </div>

            {/* <div
            >
              <Divider />
              <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
                The principles behind everything we build and every decision we
                make.
              </p>
            </div> */}
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            variants={stagger}
          >
            <div
              variants={fadeUp}
              className="group flex flex-col gap-5 p-8 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold font-[Montserrat]">
                  <span className="text-primary">
                    {data.missionTitle}
                  </span>

                </h3>
                <span className="text-[11px] tracking-[0.25em] text-fourth/60 font-[Montserrat] font-bold mt-1 shrink-0">
                  01
                </span>
              </div>
              <div className="w-8 h-0.5 bg-fourth/50" />
              <div
                className="text-third/65 text-[13.5px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.missionDesc }}
              />
            </div>

            <div
              variants={fadeUp}
              className="group flex flex-col gap-5 p-8 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold font-[Montserrat]">
                  <span className="text-primary">
                    {data.visionTitle}
                  </span>

                </h3>
                <span className="text-[11px] tracking-[0.25em] text-fourth/60 font-[Montserrat] font-bold mt-1 shrink-0">
                  02
                </span>
              </div>
              <div className="w-8 h-0.5 bg-fourth/50" />
              <div
                className="text-third/65 text-[13.5px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.visionDesc }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-fourth">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-10">
          <div
          >
            <EyeBrow>By The Numbers</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-4">
              Our Growth <span className="text-primary">in Numbers</span>
            </h2>
            <Divider />
            <div
              className="text-primary/80 text-[15px] leading-[1.9] font-[Poppins]"
              dangerouslySetInnerHTML={{ __html: data.aboutUsDescription }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(data.stats || []).map((stat, i) => (
              <div
                key={i}
                className="group flex flex-col gap-2 p-6 border border-primary/20 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <span className="text-3xl font-bold text-primary font-[Montserrat]">
                  {stat.number}
                </span>
                <span className="text-[12px] text-primary/70 font-[Poppins] leading-normal">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="px-2 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
            <div
            >
              <EyeBrow>Services</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.servicesTitle}
              </h2>
            </div>

            <div
            >
              <Divider />
              <div
                className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
              />
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={stagger}
          >
            {(data.services || []).map((svc, i) => {
              return (
                <div
                  key={i}
                  variants={fadeUp}
                  className="group flex flex-col gap-5 p-7 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl border border-third/10 flex items-center justify-center group-hover:border-fourth/40 transition-colors duration-300">
                      {typeof svc.icon === 'string' && svc.icon.startsWith('<svg') ? (
                        <div
                          className="text-fourth [&>svg]:w-5 [&>svg]:h-5"
                          dangerouslySetInnerHTML={{ __html: svc.icon }}
                        />
                      ) : (
                        <div className="w-5 h-5 bg-third/20 rounded flex items-center justify-center text-xs text-fourth">
                          Icon
                        </div>
                      )}
                    </div>
                    <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.2em] text-fourth/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary font-[Montserrat] group-hover:text-fourth transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-third/65 text-[13px] leading-[1.8] font-[Poppins]">
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

export default AboutBasic2;
