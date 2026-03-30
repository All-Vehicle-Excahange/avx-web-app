"use client";

import React from "react";
import EditorInput from "../atoms/EditorInput";
import RichTextEditor from "../atoms/RichTextEditor";


function AboutBasic1({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    newArray[index][field] = value;
    updateField(arrayName, newArray);
  };

  // ================= EDIT MODE =================
  if (isEditing) {
    return (
      <div className="bg-secondary w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        {/* HERO */}
        <div>
          <h3 className="text-primary font-bold mb-4">Hero</h3>

          <EditorInput
            bold
            label="Hero Title"
            value={data.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
          />

          <RichTextEditor
            label="Hero Description"
            value={data.heroDescription}
            onChange={(v) => updateField("heroDescription", v)}
          />
        </div>

        <hr className="border-white/10" />

        {/* MISSION */}
        <div>
          <h3 className="text-primary font-bold mb-4">Mission</h3>

          <EditorInput
            bold
            value={data.missionTitle}
            onChange={(e) => updateField("missionTitle", e.target.value)}
          />

          <RichTextEditor
            value={data.missionDesc}
            onChange={(v) => updateField("missionDesc", v)}
          />
        </div>

        {/* VISION */}
        <div>
          <h3 className="text-primary font-bold mb-4">Vision</h3>

          <EditorInput
            bold
            value={data.visionTitle}
            onChange={(e) => updateField("visionTitle", e.target.value)}
          />

          <RichTextEditor
            value={data.visionDesc}
            onChange={(v) => updateField("visionDesc", v)}
          />
        </div>

        <hr className="border-white/10" />

        {/* STATS */}
        <div>
          <h3 className="text-primary font-bold mb-4">Stats</h3>

          <RichTextEditor
            value={data.statsDesc}
            onChange={(v) => updateField("statsDesc", v)}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            {data.stats.map((s, i) => (
              <div key={i}>
                <EditorInput
                  value={s.number}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "number", e.target.value)
                  }
                />
                <EditorInput
                  value={s.label}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "label", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* SERVICES */}
        <div>
          <h3 className="text-primary font-bold mb-4">Services</h3>

          <EditorInput
            bold
            value={data.servicesTitle}
            onChange={(e) => updateField("servicesTitle", e.target.value)}
          />

          <RichTextEditor
            value={data.servicesDesc}
            onChange={(v) => updateField("servicesDesc", v)}
          />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {data.services.map((s, i) => (
              <div key={i} className="border p-4 rounded bg-primary/5">
                <EditorInput
                  label="Icon (ShieldCheck, Globe...)"
                  value={s.icon}
                  onChange={(e) =>
                    updateArrayItem("services", i, "icon", e.target.value)
                  }
                />

                <EditorInput
                  value={s.title}
                  onChange={(e) =>
                    updateArrayItem("services", i, "title", e.target.value)
                  }
                />

                <EditorInput
                  value={s.desc}
                  onChange={(e) =>
                    updateArrayItem("services", i, "desc", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
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
            <span className="text-fourth/80"> Buy & Selling</span> a Vehicle
          </h1>

          {/* Description */}
          <div className="flex flex-col gap-5 max-w-7xl">
            <p className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
              {data.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-12 px-2 lg:px-4 ">
        <div className=" w-full flex flex-col gap-16">
          {/* ── MAIN HEADING ───────────────── */}
          <div className="flex flex-col gap-6 max-w-2xl text-center">
            <p className=" text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Mission &<span className="text-fourth/80"> Vision</span>
            </h2>
          </div>

          {/* Mission Row */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start  pt-12">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.missionTitle.split(" ")[0]}{" "}
                <span className="text-fourth/80">
                  {data.missionTitle.split(" ")[1]}
                </span>
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
                {data.visionTitle.split(" ")[0]}{" "}
                <span className="text-fourth/80">
                  {data.visionTitle.split(" ")[1]}
                </span>
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
              Our
              <span className="text-fourth/80"> Numbers</span>
            </h2>

            <div
              className="text-secondary/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.statsDesc }}
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
              What <span className="text-fourth/80">We Do</span>
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
                    <service.icon
                      size={40}
                      strokeWidth={1.2}
                      className="text-third"
                    />
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
