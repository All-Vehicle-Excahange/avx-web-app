import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import { Plus, Trash, ArrowRight } from "lucide-react";
import Image from "next/image";

function AboutPro2({ data, isEditing, onUpdate }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const getCardStyle = (index, total) => {
    if (!isDesktop) return {};

    const center = Math.floor(total / 2); // e.g. 2
    const dist = index - center; // -2, -1, 0, 1, 2

    // Stronger rotation (15 degrees per step)
    const rotation = dist * 15;

    // Parabolic drop (Square the distance so outer cards drop MUCH lower)
    // 0 -> 0px
    // 1 -> 40px
    // 2 -> 160px
    const yOffset = Math.abs(dist) * Math.abs(dist) * 28;

    return {
      transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
      zIndex: 10 - Math.abs(dist), // Center card is highest priority (10), outer are lower (8, 9)
    };
  };

  /* ================== EDITOR ================== */
  if (isEditing) {
    return (
      <div className="bg-secondary p-8 rounded-xl border border-third/30 w-full max-w-[1480px] mx-auto space-y-10">
        {/* HERO EDITOR */}
        <h3 className="text-primary text-xl font-bold">Hero Section</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <EditorInput
              bold
              value={data.headline}
              onChange={(e) => update("headline", e.target.value)}
              placeholder="Headline"
            />
            <RichTextEditor
              value={data.subText}
              onChange={(v) => update("subText", v)}
            />
          </div>
          <div className="h-52 relative">
            <ImageUploader
              label="Hero Main Image"
              src={data.heroImage}
              onChange={(v) => update("heroImage", v)}
            />
          </div>
        </div>
        <hr className="border-third/20" />

        {/* ABOUT TEXT EDITOR */}
        <h3 className="text-primary text-xl font-bold">About & Stats</h3>
        <RichTextEditor
          label="About Description (Top)"
          value={data.aboutText}
          onChange={(v) => update("aboutText", v)}
        />
        <div className="p-4 bg-primary/5 rounded-lg border border-third/10">
          <h4 className="text-primary font-semibold mb-4">
            Stats Numbers (Bottom)
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {data.stats.map((s, i) => (
              <div key={i} className="space-y-2">
                <EditorInput
                  bold
                  value={s.number}
                  onChange={(e) =>
                    updateArr("stats", i, "number", e.target.value)
                  }
                />
                <EditorInput
                  value={s.label}
                  onChange={(e) =>
                    updateArr("stats", i, "label", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <hr className="border-third/20" />

        {/* MISSION EDITOR */}
        <h3 className="text-primary text-xl font-bold">Mission Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Images</p>
            <div className="flex gap-4">
              <div className="h-40 w-1/2 relative">
                <ImageUploader
                  label="Main Mission Image"
                  src={data.missionImage}
                  onChange={(v) => update("missionImage", v)}
                />
              </div>
              <div className="h-40 w-1/2 relative">
                <ImageUploader
                  label="Small/Overlay Image"
                  src={data.missionOverlayImage}
                  onChange={(v) => update("missionOverlayImage", v)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <EditorInput
              bold
              value={data.missionTitle}
              onChange={(e) => update("missionTitle", e.target.value)}
              placeholder="Mission Title"
            />
            <RichTextEditor
              label="Mission Description"
              value={data.missionDescription}
              onChange={(v) => update("missionDescription", v)}
            />

            <div className="p-4 bg-primary/5 rounded border border-third/10">
              <h4 className="font-semibold text-primary mb-3">
                Mission Points
              </h4>
              <div className="space-y-2">
                {data.missionPoints?.map((point, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <EditorInput
                      value={point}
                      onChange={(e) => {
                        const copy = [...data.missionPoints];
                        copy[i] = e.target.value;
                        update("missionPoints", copy);
                      }}
                      placeholder={`Point ${i + 1}`}
                    />
                    <button
                      onClick={() => {
                        const copy = [...data.missionPoints];
                        copy.splice(i, 1);
                        update("missionPoints", copy);
                      }}
                      className="text-red-500 p-2"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
                <Button
                  onClick={() =>
                    update("missionPoints", [
                      ...(data.missionPoints || []),
                      "New Point",
                    ])
                  }
                  variant="ghost"
                >
                  <Plus size={16} /> Add Point
                </Button>
              </div>
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
              placeholder="Vision Title"
            />
            <RichTextEditor
              label="Vision Description"
              value={data.visionDescription}
              onChange={(v) => update("visionDescription", v)}
            />

            <div className="p-4 bg-primary/5 rounded border border-third/10">
              <h4 className="font-semibold text-primary mb-3">Vision Points</h4>
              <div className="space-y-2">
                {data.visionPoints?.map((point, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <EditorInput
                      value={point}
                      onChange={(e) => {
                        const copy = [...data.visionPoints];
                        copy[i] = e.target.value;
                        update("visionPoints", copy);
                      }}
                      placeholder={`Point ${i + 1}`}
                    />
                    <button
                      onClick={() => {
                        const copy = [...data.visionPoints];
                        copy.splice(i, 1);
                        update("visionPoints", copy);
                      }}
                      className="text-red-500 p-2"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
                <Button
                  onClick={() =>
                    update("visionPoints", [
                      ...(data.visionPoints || []),
                      "New Point",
                    ])
                  }
                  variant="ghost"
                >
                  <Plus size={16} /> Add Point
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">Images</p>
            <div className="flex gap-4">
              <div className="h-40 w-1/2 relative">
                <ImageUploader
                  label="Main Vision Image"
                  src={data.visionImage}
                  onChange={(v) => update("visionImage", v)}
                />
              </div>
              <div className="h-40 w-1/2 relative">
                <ImageUploader
                  label="Small/Overlay Image"
                  src={data.visionOverlayImage}
                  onChange={(v) => update("visionOverlayImage", v)}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-third/20" />

        {/* SERVICES EDITOR */}
        <h3 className="text-primary font-bold text-xl mb-4">Services</h3>
        <EditorInput
          bold
          value={data.servicesTitle}
          onChange={(e) => update("servicesTitle", e.target.value)}
        />
        <EditorInput
          value={data.servicesSubtitle}
          onChange={(e) => update("servicesSubtitle", e.target.value)}
        />
        <div className="space-y-4 mt-4">
          {data.services?.map((s, i) => (
            <div
              key={i}
              className="flex gap-4 items-start border border-third/20 p-4 rounded bg-primary/5"
            >
              <div className="w-1/3">
                <EditorInput
                  label="Icon/Emoji"
                  value={s.icon}
                  onChange={(e) =>
                    updateArr("services", i, "icon", e.target.value)
                  }
                />
              </div>
              <div className="w-full space-y-2">
                <EditorInput
                  bold
                  value={s.title}
                  onChange={(e) =>
                    updateArr("services", i, "title", e.target.value)
                  }
                />
                <EditorInput
                  size="sm"
                  value={s.desc}
                  onChange={(e) =>
                    updateArr("services", i, "desc", e.target.value)
                  }
                />
              </div>
              <button
                onClick={() => removeArr("services", i)}
                className="text-red-500 p-2"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
          <Button
            onClick={() =>
              addArr("services", {
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

  /* ================== LIVE PREVIEW ================== */
  return (
    <div className="bg-black text-white w-full overflow-hidden">
      {/* 1. HERO */}
      <section className="w-full max-w-[1480px] mx-auto grid lg:grid-cols-2 gap-16 py-10 px-6 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
            {data.headline}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: data.subText }}
            className="text-gray-400 prose prose-invert prose-lg leading-relaxed"
          />
        </div>
        <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2 group">
          <Image
            src={data.heroImage || "/cs.png"}
            alt="Hero"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. STATS & ABOUT */}
      <section className="max-w-[1480px] mx-auto py-10 px-6 border-y border-white/10">
        <div
          className="max-w-[1000px] mx-auto mb-16 prose prose-invert prose-xl text-center text-gray-300 prose-ul:list-none prose-li:pl-0 [&>ul]:flex [&>ul]:flex-col [&>ul]:items-center [&>ul>li]:flex [&>ul>li]:items-center [&>ul>li]:gap-3 [&>ul>li]:before:content-['✓'] [&>ul>li]:before:text-white [&>ul>li]:before:bg-transparent [&>ul>li]:before:border [&>ul>li]:before:border-gray-500 [&>ul>li]:before:rounded-full [&>ul>li]:before:w-6 [&>ul>li]:before:h-6 [&>ul>li]:before:flex [&>ul>li]:before:items-center [&>ul>li]:before:justify-center [&>ul>li]:before:text-[10px] [&>ul>li]:mb-2"
          dangerouslySetInnerHTML={{ __html: data.aboutText }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((s, i) => (
            <div key={i} className="text-center">
              <h3 className="text-4xl font-extrabold mb-1 text-white">
                {s.number}
              </h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MISSION */}
      <section className="max-w-[1480px] mx-auto py-10 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative h-[450px] w-[90%] md:w-[85%] rounded-2xl overflow-hidden z-10 bg-white/5">
              <Image
                src={data.missionImage || "/cs.png"}
                fill
                className="object-cover"
                alt="Mission"
              />
            </div>
            <div className="absolute bottom-[10%] -right-4 md:right-4 w-[180px] h-[180px] bg-yellow-500 rounded-[30px] z-20 shadow-2xl overflow-hidden border-4 border-black">
              <Image
                src={data.missionOverlayImage || "/cs.png"}
                fill
                className="object-cover"
                alt="Mission Overlay"
              />
            </div>
          </div>
          <div className="pl-0 md:pl-10">
            <h3 className="text-4xl font-bold mb-6 text-white">
              {data.missionTitle || "Our Mission"}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: data.missionDescription }}
              className="text-gray-400 text-lg leading-relaxed prose prose-invert mb-6"
            />
            {data.missionPoints && data.missionPoints.length > 0 && (
              <ul className="space-y-3">
                {data.missionPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="shrink-0 w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* 5. VISION */}
      <section className="max-w-[1480px] mx-auto py-10 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 pr-0 md:pr-10">
            <h3 className="text-4xl font-bold mb-6 text-white">
              {data.visionTitle || "Our Vision"}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: data.visionDescription }}
              className="text-gray-400 text-lg leading-relaxed prose prose-invert mb-6"
            />
            {data.visionPoints && data.visionPoints.length > 0 && (
              <ul className="space-y-3">
                {data.visionPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="shrink-0 w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative order-1 md:order-2 flex justify-end">
            <div className="relative h-[450px] w-[90%] md:w-[85%] rounded-2xl overflow-hidden z-10 bg-white/5">
              <Image
                src={data.visionImage || "/cs.png"}
                fill
                className="object-cover"
                alt="Vision"
              />
            </div>
            <div className="absolute bottom-[10%] left-0 md:left-4 w-[180px] h-[180px] bg-yellow-500 rounded-[30px] z-20 shadow-2xl overflow-hidden border-4 border-black">
              <Image
                src={data.visionOverlayImage || "/cs.png"}
                fill
                className="object-cover"
                alt="Vision Overlay"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-10 overflow-hidden flex flex-col items-center min-h-[660px] border-t border-white/5">
        {/* CARDS CONTAINER */}
        <div className="relative z-10 w-full max-w-[1480px] mx-auto h-[400px] flex justify-center items-center mt-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full px-0">
            {data.services.map((s, i) => (
              <div
                key={i}
                style={getCardStyle(i, data.services.length)}
                className="
                  relative
                  w-full md:w-[280px] h-60
                  bg-[#111] 
                  border border-white/10 
                  rounded-xl
                  p-8 
                  flex flex-col items-center text-center justify-center
                  transition-all duration-500 ease-out
                  shadow-[0_0_20px_rgba(0,0,0,0.5)]
                  group
                "
              >
                {/* Icon Box */}
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-5xl drop-shadow-lg text-white/90 font-bold">
                    {s.icon}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                  {s.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-80">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full flex justify-center z-20 pointer-events-none md:pointer-events-auto">
          <div
            className="
    w-full max-w-[560px] 
    md:max-w-[560px]
    h-[60px] md:h-[280px]
    bg-primary/80
    rounded-t-full
    flex flex-col justify-end items-center
    pb-10 md:pb-16 px-10 text-center
    shadow-[0_-50px_100px_rgba(0,0,0,0.5)]
    md:translate-y-[10%]
  "
          >
            <div className="relative z-30 -top-10">
              <h2 className="text-4xl md:text-4xl font-extrabold text-black mb-3">
                {data.servicesTitle}
              </h2>
              <p className="text-gray-700 max-w-md mx-auto text-sm md:text-base font-semibold">
                {data.servicesSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPro2;
