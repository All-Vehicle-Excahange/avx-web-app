/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import React, { useEffect, useRef } from "react";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import { Plus, Trash } from "lucide-react";
import Button from "@/components/ui/button";
import Select from "react-select";
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

function AboutPro1({ data, isEditing, onUpdate }) {
  const activeRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const imgs = document.querySelectorAll(".bg-slide");
    imgs[0]?.classList.add("active-slide");

    intervalRef.current = setInterval(() => {
      imgs[activeRef.current]?.classList.remove("active-slide");
      activeRef.current = (activeRef.current + 1) % imgs.length;
      imgs[activeRef.current]?.classList.add("active-slide");
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);



  if (!data) return null;

  const update = (k, v) => onUpdate({ ...data, [k]: v });

  const updateArr = (k, i, f, v) => {
    const copy = [...data[k]];
    copy[i][f] = v;
    update(k, copy);
  };

  const addArr = (k, item) => update(k, [...data[k], item]);
  const removeArr = (k, i) => {
    const copy = [...data[k]];
    copy.splice(i, 1);
    update(k, copy);
  };

  /* ================== API HANDLERS ================== */
  const handleHeroBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("heroTitle", data.heroTitle || "");
      formData.append("heroDescription", data.heroDescription || "");
      if (data.heroTemplate1?.id) {
        formData.append("heroTemplateId1", data.heroTemplate1.id);
      }
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
      if (data.missionTemplate1?.id) {
        formData.append("missionTemplateId1", data.missionTemplate1.id);
      }
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
      if (data.visionTemplate1?.id) {
        formData.append("visionTemplateId1", data.visionTemplate1.id);
      }
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

  /* ================== EDITOR ================== */
  if (isEditing) {
    return (
      <div className=" p-8 rounded-xl border border-third/30 w-full max-w-[1480px] mx-auto space-y-10">
        {/* HERO EDITOR */}
        <h3 className="text-primary text-xl font-bold">Hero Section</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <EditorInput
              bold
              value={data.heroTitle}
              onChange={(e) => update("heroTitle", e.target.value)}
              onBlur={handleHeroBlur}
              placeholder="Hero Title"
            />
            <RichTextEditor
              label="Hero Description"
              value={data.heroDescription}
              onChange={(v) => update("heroDescription", v)}
              onBlur={handleHeroBlur}
            />
          </div>
          <div className="h-52 relative">
            <ImageUploader
              label="Hero Background Image"
              src={data.heroTemplate1?.imageUrl}
              fieldKey="hero"
              onChange={({ imageUrl, id }) => {
                update("heroTemplate1", {
                  ...data.heroTemplate1,
                  imageUrl,
                  id: id ?? data.heroTemplate1?.id,
                });
                // Auto-save when image is selected
                setTimeout(handleHeroBlur, 100);
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
              value={data.missionTitle}
              onChange={(e) => update("missionTitle", e.target.value)}
              onBlur={handleMissionBlur}
              placeholder="Mission Title"
            />
            <RichTextEditor
              label="Mission Description"
              value={data.missionDesc}
              onChange={(v) => update("missionDesc", v)}
              onBlur={handleMissionBlur}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Mission Image"
                src={data.missionTemplate1?.imageUrl}
                fieldKey="mission"
                onChange={({ imageUrl, id }) => {
                  update("missionTemplate1", {
                    ...data.missionTemplate1,
                    imageUrl,
                    id: id ?? data.missionTemplate1?.id,
                  });
                  setTimeout(handleMissionBlur, 100);
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
              value={data.visionTitle}
              onChange={(e) => update("visionTitle", e.target.value)}
              onBlur={handleVisionBlur}
              placeholder="Vision Title"
            />
            <RichTextEditor
              label="Vision Description"
              value={data.visionDesc}
              onChange={(v) => update("visionDesc", v)}
              onBlur={handleVisionBlur}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Image</p>
            <div className="h-52 relative">
              <ImageUploader
                label="Vision Image"
                src={data.visionTemplate1?.imageUrl}
                fieldKey="vision"
                onChange={({ imageUrl, id }) => {
                  update("visionTemplate1", {
                    ...data.visionTemplate1,
                    imageUrl,
                    id: id ?? data.visionTemplate1?.id,
                  });
                  setTimeout(handleVisionBlur, 100);
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
          value={data.aboutUsDescription}
          onChange={(v) => update("aboutUsDescription", v)}
          onBlur={handleStatsBlur}
        />
        <div className="p-4 bg-primary/5 rounded-lg border border-third/10">
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
                  onBlur={handleStatsBlur}
                  placeholder="Number"
                />
                <EditorInput
                  value={s.label}
                  onChange={(e) =>
                    updateArr("stats", i, "label", e.target.value)
                  }
                  onBlur={handleStatsBlur}
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
            value={data.servicesTitle}
            onChange={(e) => update("servicesTitle", e.target.value)}
            onBlur={handleServicesBlur}
            placeholder="Services Title"
          />
          <RichTextEditor
            label="Services Description"
            value={data.servicesDesc}
            onChange={(v) => update("servicesDesc", v)}
            onBlur={handleServicesBlur}
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
                    handleServicesBlur();
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
                  onBlur={handleServicesBlur}
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
                  onBlur={handleServicesBlur}
                  placeholder="Service Description"
                />
              </div>

              {/* Delete */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => removeArr("services", i)}
                  className="text-red-500 p-2 hover:bg-red-500/10 rounded transition"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  /* ================== LIVE PREVIEW ================== */
  return (
    <>
     

      {/* HERO */}
      <section className="relative w-full min-h-screen overflow-hidden flex  px-4 lg:px-8 py-12">
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${data.heroTemplate1?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 w-full flex items-center justify-center text-center flex-col gap-2 m-w-7xl">
          <p className="mb-6 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Hero
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary font-[Montserrat] max-w-[1200px]">
            {data.heroTitle}
          </h2>

          <div
            className="mt-8 text-third/70 text-lg lg:text-xl font-[Poppins] leading-relaxed "
            dangerouslySetInnerHTML={{ __html: data.heroDescription }}
          />
        </div>
      </section>

      {/* ═════════ MISSION / VISION (UNCHANGED) ═════════ */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
              Mission & <span className="text-fourth/80">Vision</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* MISSION */}
            <div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">
              <img
                src={data.missionTemplate1?.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-primary font-[Montserrat]">
                  {data.missionTitle}
                </h2>

                <div
                  className="text-third/70 text-base md:text-lg font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: data.missionDesc,
                  }}
                />
              </div>
            </div>

            {/* VISION */}
            <div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">
              <img
                src={data.visionTemplate1?.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-primary font-[Montserrat]">
                  {data.visionTitle}
                </h2>

                <div
                  className="text-third/70 text-base md:text-lg font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: data.visionDesc,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ STATS (WITH HOVER BACK) ═════════ */}
      <section className="relative py-12 px-2 lg:px-4 bg-primary text-secondary overflow-hidden">
        <div className="container">
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-fourth/10 blur-[140px] rounded-full"></div>
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="flex flex-col gap-6 mb-20">
              <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
                Impact
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-[Montserrat]">
                Our <span className="text-fourth/80">Numbers</span>
              </h2>

              <div
                className="text-secondary/70 text-lg font-[Poppins]"
                dangerouslySetInnerHTML={{
                  __html: data.aboutUsDescription,
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border border-secondary/10">
              {(data.stats || []).map((item, index) => (
                <div
                  key={index}
                  className="relative p-10 group border border-secondary/10 hover:bg-secondary/5 transition-all duration-500"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 border border-fourth/30"></div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[Montserrat] mb-4">
                    {item.number}
                  </h3>

                  <p className="text-secondary/60 text-sm md:text-base font-[Poppins]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ SERVICES (HOVER FIXED BACK) ═════════ */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6 max-w-2xl">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Services
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
                {data.servicesTitle}
              </h2>

              <div
                className="text-third/70 text-lg font-[Poppins] border-l-2 border-primary/30 pl-6"
                dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {(data.services || []).map((service, index) => {
                const colSpan =
                  index === 0 || index === 3
                    ? "md:col-span-7"
                    : "md:col-span-5";

                return (
                  <div
                    key={index}
                    className={`${colSpan} flex flex-col justify-between p-8 lg:p-12 border border-third/10 bg-primary/5 hover:bg-primary/10 transition-all duration-300 min-h-[300px]`}
                  >
                    <div className="flex flex-col gap-6">
                      {typeof service.icon === "string" &&
                        service.icon.startsWith("<svg") ? (
                        <div
                          className="text-third [&>svg]:w-10 [&>svg]:h-10 transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: service.icon }}
                        />
                      ) : (
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
        </div>
      </section>
    </>
  );
}

export default AboutPro1;
