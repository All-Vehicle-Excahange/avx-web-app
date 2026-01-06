"use client";
import React from "react";
import Image from "next/image";
import EditorInput from "../atoms/EditorInput";
import RichTextEditor from "../atoms/RichTextEditor";
import { ImageUploader } from "../atoms/ImageUploader ";
import Button from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

function AboutPro3({ data, isEditing, onUpdate }) {
  if (!data) return null;
  const update = (k, v) => onUpdate({ ...data, [k]: v });

  /* ================= EDITOR ================= */
  if (isEditing) {
    return (
      <div className="bg-secondary w-full  max-w-[1480px] mx-auto p-8 rounded-xl space-y-8">
        {/* ================= HERO SECTION ================= */}
        <div>
          <h3 className="text-primary font-bold mb-4">Hero Section</h3>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Left: Text Inputs */}
            <div className="space-y-4">
              <EditorInput
                bold
                label="Hero Title"
                value={data.heroTitle}
                onChange={(e) => update("heroTitle", e.target.value)}
              />
              <RichTextEditor
                label="Hero Subtitle"
                value={data.heroSubtitle}
                onChange={(v) => update("heroSubtitle", v)}
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Hero Image
              </p>

              <div className="border  rounded-xl p-4 h-60 flex items-center justify-center">
                <ImageUploader
                  src={data.heroImage}
                  onChange={(v) => update("heroImage", v)}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* ================= STATS (UPDATED LAYOUT) ================= */}
        <div>
          <h3 className="text-primary font-bold mb-4">Stats Section</h3>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <RichTextEditor
                label="Stats Description"
                value={data.statsDescription}
                onChange={(v) => update("statsDescription", v)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((s, i) => (
                <div key={i} className="space-y-2">
                  <EditorInput
                    placeholder="Number"
                    value={s.number}
                    onChange={(e) => {
                      const c = [...data.stats];
                      c[i].number = e.target.value;
                      update("stats", c);
                    }}
                  />
                  <EditorInput
                    placeholder="Label"
                    value={s.label}
                    onChange={(e) => {
                      const c = [...data.stats];
                      c[i].label = e.target.value;
                      update("stats", c);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="space-y-4">
          <h3 className="text-primary text-xl font-bold">
            Mission (Zig Zag 1)
          </h3>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* LEFT IMAGE */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Mission Image
              </p>

              <div className=" rounded-xl p-4 h-40 flex items-center justify-center bg-white/5">
                <ImageUploader
                  src={data.missionImage}
                  onChange={(v) => update("missionImage", v)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <EditorInput
                value={data.missionTitle}
                onChange={(e) => update("missionTitle", e.target.value)}
                placeholder="Mission Title"
              />

              <RichTextEditor
                value={data.missionDesc}
                onChange={(v) => update("missionDesc", v)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-primary text-xl font-bold">Vision (Zig Zag 2)</h3>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* LEFT TEXT */}
            <div className="space-y-4">
              <EditorInput
                value={data.visionTitle}
                onChange={(e) => update("visionTitle", e.target.value)}
                placeholder="Vision Title"
              />

              <RichTextEditor
                value={data.visionDesc}
                onChange={(v) => update("visionDesc", v)}
              />
            </div>

            {/* RIGHT IMAGE */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Vision Circular Image
              </p>
              {/* UPDATED: Added h-40 for smaller height */}
              <div className=" rounded-xl p-4 h-40 flex items-center justify-center bg-white/5">
                <ImageUploader
                  src={data.visionImage}
                  onChange={(v) => update("visionImage", v)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-4 pt-4 border-t border-white/10">
          <h3 className="text-primary font-bold">Services</h3>
          {data.services?.map((s, i) => (
            <div
              key={i}
              className="flex gap-4 items-start border border-third/20 p-4 rounded bg-primary/5"
            >
              <div className="w-20">
                <EditorInput
                  label="Icon"
                  value={s.icon}
                  onChange={(e) =>
                    updateArrayItem("services", i, "icon", e.target.value)
                  }
                />
              </div>
              <div className="w-full space-y-2">
                <EditorInput
                  bold
                  value={s.title}
                  onChange={(e) =>
                    updateArrayItem("services", i, "title", e.target.value)
                  }
                />
                <EditorInput
                  size="sm"
                  value={s.desc}
                  onChange={(e) =>
                    updateArrayItem("services", i, "desc", e.target.value)
                  }
                />
              </div>
              <button
                onClick={() => removeArrayItem("services", i)}
                className="text-red-500 p-2 hover:bg-red-500/10 rounded transition"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
          <Button
            onClick={() =>
              addArrayItem("services", {
                icon: "★",
                title: "New Service",
                desc: "Description",
              })
            }
            variant="ghost"
          >
            <Plus size={16} /> Add Service
          </Button>
        </div>
      </div>
    );
  }

  /* ================= LIVE ================= */
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="max-w-[1480px] mx-auto py-10 grid lg:grid-cols-2 gap-16 px-6 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">{data.heroTitle}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: data.heroSubtitle }}
            className="text-gray-400 text-lg"
          />
        </div>
        <div className="relative h-[420px] rounded-[40px] overflow-hidden rotate-6">
          <Image src={data.heroImage} fill className="object-cover" alt="" />
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-[1200px] mx-auto px-6 mt-6">
        <div className="bg-[#111] rounded-3xl p-12 grid md:grid-cols-2 gap-12 items-center shadow-2xl">
          <div
            dangerouslySetInnerHTML={{ __html: data.statsDescription }}
            className="text-gray-400 prose prose-invert"
          />
          <div className="grid grid-cols-2 gap-10">
            {data.stats.map((s, i) => (
              <div key={i}>
                <h2 className="text-5xl font-extrabold">{s.number}</h2>
                <p className="text-gray-500 uppercase text-xs mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-[1480px] mx-auto py-10 grid md:grid-cols-2 gap-20 px-6 items-center">
        <Image
          src={data.missionImage}
          width={500}
          height={500}
          alt=""
          className="rounded-[40px] -rotate-6"
        />
        <div>
          <h2 className="text-4xl font-bold mb-4">{data.missionTitle}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: data.missionDesc }}
            className="text-gray-400"
          />
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-[1480px] mx-auto py-10 grid md:grid-cols-2 gap-20 px-6 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">{data.visionTitle}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: data.visionDesc }}
            className="text-gray-400"
          />
        </div>
        <Image
          src={data.visionImage}
          width={500}
          height={500}
          alt=""
          className="rounded-[40px] rotate-6"
        />
      </section>

      {/* SERVICES */}
      <section className="py-10 px-6">
        <div className="max-w-[1480px] mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            {data.servicesTitle}
          </h2>
          <p className="text-third">{data.servicesSubtitle}</p>
        </div>

        <div className="max-w-[1480px] mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.services.map((s, i) => (
            <div
              key={i}
              className={`bg-primary/5 p-10 border border-primary/10 rounded-xl `}
            >
              <div className="text-5xl mb-6 text-primary">{s.icon}</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">
                {s.title}
              </h3>
              <p className="text-third text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPro3;
