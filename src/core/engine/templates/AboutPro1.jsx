import Button from "@/components/ui/button";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

function AboutPro1({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (array, i, key, value) => {
    const copy = [...data[array]];
    copy[i][key] = value;
    updateField(array, copy);
  };

  const addArrayItem = (array, item) => {
    const copy = [...(data[array] || [])];
    copy.push(item);
    updateField(array, copy);
  };

  const removeArrayItem = (array, i) => {
    const copy = [...data[array]];
    copy.splice(i, 1);
    updateField(array, copy);
  };

  if (isEditing) {
    return (
      <div className="bg-secondary p-8 rounded-xl border border-third/30 w-full max-w-[1480px] mx-auto space-y-12 shadow-xl">
        <h3 className="text-primary font-bold text-xl mb-4">Hero Section</h3>
        <div className="grid grid-cols-2 gap-6">
          <ImageUploader
            label="Hero Image"
            fieldKey="hero"
            src={data.heroImage}
            onChange={(v) => updateField("heroImage", v)}
          />
          <div className="space-y-4">
            <EditorInput
              bold
              value={data.headline}
              onChange={(e) => updateField("headline", e.target.value)}
              placeholder="Headline"
            />
            <RichTextEditor
              value={data.subText}
              onChange={(v) => updateField("subText", v)}
            />
          </div>
        </div>

        <hr className="border-third/30" />

        <h3 className="text-primary font-bold text-xl mb-4">Stats & Intro</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 border border-third/20 p-2 rounded"
              >
                <EditorInput
                  bold
                  center
                  size="sm"
                  value={s.number}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "number", e.target.value)
                  }
                />
                <EditorInput
                  center
                  size="sm"
                  value={s.label}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "label", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <span className="text-third text-sm mb-2 block">
              Right Side Text
            </span>
            <RichTextEditor
              value={data.aboutText}
              onChange={(v) => updateField("aboutText", v)}
            />
          </div>
        </div>

        <hr className="border-third/30" />

        <h3 className="text-primary font-bold text-xl mb-4">
          Mission (Zig Zag 1)
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <ImageUploader
            label="Mission Circular Image"
            src={data.missionImage}
            fieldKey={"mission"}
            onChange={(v) => updateField("missionImage", v)}
          />
          <div className="space-y-2">
            <EditorInput
              bold
              value={data.missionTitle}
              onChange={(e) => updateField("missionTitle", e.target.value)}
            />
            <RichTextEditor
              value={data.missionText}
              onChange={(v) => updateField("missionText", v)}
            />
          </div>
        </div>

        <h3 className="text-primary font-bold text-xl mb-4">
          Vision (Zig Zag 2)
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <EditorInput
              bold
              value={data.visionTitle}
              onChange={(e) => updateField("visionTitle", e.target.value)}
            />
            <RichTextEditor
              value={data.visionText}
              onChange={(v) => updateField("visionText", v)}
            />
          </div>
          <ImageUploader
            label="Vision Circular Image"
            fieldKey={"vision"}
            src={data.visionImage}
            onChange={(v) => updateField("visionImage", v)}
          />
        </div>

        <hr className="border-third/30" />

        <h3 className="text-primary font-bold text-xl mb-4">Services</h3>
        <EditorInput
          bold
          value={data.servicesTitle}
          onChange={(e) => updateField("servicesTitle", e.target.value)}
        />
        <EditorInput
          value={data.servicesSubtitle}
          onChange={(e) => updateField("servicesSubtitle", e.target.value)}
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
                className="text-red-500 p-2"
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

  return (
    <div className="bg-secondary text-primary overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-[1480px] mx-auto grid lg:grid-cols-2 gap-12 items-center py-10 px-6">
        <div className="relative overflow-hidden group">
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src={data.heroImage || "/cs.png"}
              alt="Hero"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-4xl font-extrabold leading-tight mb-6 text-primary">
            {data.headline}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: data.subText }}
            className="text-third text-lg leading-relaxed prose prose-invert"
          />
        </div>
      </section>

      {/* 2. STATS & TEXT LAYOUT */}
      <section className="w-full max-w-[1480px] mx-auto py-10 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Stats Grid */}
          <div className="grid grid-cols-2 gap-y-12 gap-x-8">
            {data.stats.map((s, i) => (
              <div key={i} className="flex flex-col  pl-6">
                <h3 className="text-4xl md:text-4xl font-bold mb-2 text-primary">
                  {s.number}
                </h3>
                <p className="text-third text-sm uppercase tracking-wider font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          {/* Right: Intro Text */}
          <div
            className="text-third text-lg leading-relaxed prose prose-invert"
            dangerouslySetInnerHTML={{ __html: data.aboutText }}
          />
        </div>
      </section>

      {/* 3. ZIG-ZAG MISSION & VISION - UPDATED GRADIENTS */}
      <section className="w-full max-w-[1480px] mx-auto py-10 px-6 space-y-12">
        {/* Row 1: Image Left (Circle) */}
        <div className="grid md:grid-cols-2 gap-16 items-center relative">
          {/* Gradient background effect stretched behind text */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3/6 h-full bg-linear-to-r from-[#5b5b5b] to-transparent rounded-l-full z-10 hidden md:block pointer-events-none opacity-100 "></div>

          <div className="z-30 relative flex justify-center md:justify-start">
            <div className="p-3 rounded-full ">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden ">
                <div className="relative w-full h-full">
                  <Image
                    src={data.missionImage || "/cs.png"}
                    alt="Mission"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-left pl-4 z-30">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              {data.missionTitle}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.missionText }}
              className="text-third prose prose-invert text-lg"
            />
          </div>
        </div>

        {/* Row 2: Image Right (Circle) */}
        <div className="grid md:grid-cols-2 gap-16 items-center relative">
          {/* Gradient background effect stretched behind text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/6 h-full bg-linear-to-l from-[#5b5b5b] to-transparent rounded-r-full z-10 hidden md:block pointer-events-none opacity-100"></div>

          <div className="z-30 text-left order-2 md:order-1 pr-4">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              {data.visionTitle}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.visionText }}
              className="text-third prose prose-invert text-lg"
            />
          </div>
          <div className="relative flex justify-center md:justify-end order-1 md:order-2">
            <div className="p-3 z-30 rounded-full">
              {/* Image with slight dark border for definition */}
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={data.visionImage || "/cs.png"}
                    alt="Vision"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES CARDS */}
      <section className="py-10 px-6 relative">
        <div className="relative w-full max-w-[1480px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              {data.servicesTitle}
            </h2>
            <p className="text-third max-w-7xl mx-auto">
              {data.servicesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr items-start">
            {data.services?.map((s, i) => (
              <div
                key={i}
                className={`bg-primary/5 p-10 border border-primary/10 rounded-xl
                hover:bg-primary/15 hover:text-secondary transition-colors duration-300
              ${i % 4 === 1 || i % 4 === 3 ? "lg:mt-10" : ""}`}
              >
                <div className="text-5xl mb-6 text-primary group-hover:text-secondary transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide text-primary group-hover:text-secondary">
                  {s.title}
                </h3>
                <p className="text-third group-hover:text-secondary/70 text-sm leading-relaxed transition-colors duration-300">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPro1;
