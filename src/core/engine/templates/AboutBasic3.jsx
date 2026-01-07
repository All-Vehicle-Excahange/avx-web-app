import React from "react";
import RichTextEditor from "../atoms/RichTextEditor";
import { Star, Eye, Target } from "lucide-react";
import EditorInput from "../atoms/EditorInput";
import Image from "next/image";

function AboutBasic3({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const updateField = (field, value) => onUpdate({ ...data, [field]: value });

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    newArray[index][field] = value;
    updateField(arrayName, newArray);
  };
  if (isEditing) {
    return (
      <div className="bg-secondary w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        {/* ================= HERO ================= */}
        <div>
          <h3 className="text-primary font-bold mb-4">Hero Section</h3>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* LEFT – Inputs */}
            <div className="space-y-4">
              <EditorInput
                bold
                label="Hero Title"
                value={data.headline}
                onChange={(e) => updateField("headline", e.target.value)}
              />
              <RichTextEditor
                label="Hero Description"
                value={data.subHeadline}
                onChange={(v) => updateField("subHeadline", v)}
              />
            </div>

            {/* RIGHT – Static Banner Preview */}
            <div className="relative h-60  overflow-hidden border border-white/10 bg-black/40">
              <Image
                src="/banner_Basic.jpeg"
                alt="Hero Banner Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* ================= STATS ================= */}
        <div>
          <h3 className="text-primary font-bold mb-4">Stats Section</h3>
          <RichTextEditor
            label="Stats Paragraph"
            value={data.statsDescription}
            onChange={(v) => updateField("statsDescription", v)}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {data.stats.map((s, i) => (
              <div key={i} className="space-y-2">
                <EditorInput
                  placeholder="Number"
                  value={s.number}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "number", e.target.value)
                  }
                />
                <EditorInput
                  placeholder="Label"
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

        {/* ================= MISSION ================= */}
        <div>
          <h3 className="text-primary font-bold mb-4">Mission</h3>
          <EditorInput
            bold
            value={data.missionTitle}
            onChange={(e) => updateField("missionTitle", e.target.value)}
            placeholder="Mission Title"
          />
          <RichTextEditor
            label="Mission Description"
            value={data.missionDescription}
            onChange={(v) => updateField("missionDescription", v)}
          />
        </div>

        {/* ================= VISION ================= */}
        <div>
          <h3 className="text-primary font-bold mb-4">Vision</h3>
          <EditorInput
            bold
            value={data.visionTitle}
            onChange={(e) => updateField("visionTitle", e.target.value)}
            placeholder="Vision Title"
          />
          <RichTextEditor
            label="Vision Description"
            value={data.visionDescription}
            onChange={(v) => updateField("visionDescription", v)}
          />
        </div>

        <hr className="border-white/10" />

        {/* ================= SERVICES ================= */}
        <div className="space-y-4">
          <h3 className="text-primary font-bold">Services</h3>

          {data.services.map((s, i) => (
            <div
              key={i}
              className="flex gap-4 items-start border border-third/20 p-4 rounded bg-primary/5"
            >
              <div className="w-24">
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
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= FRONT ================= */

  return (
    <div className="bg-secondary text-primary py-14">
      <div className="max-w-[1480px] mx-auto space-y-16">
        {/* HERO */}
        <section className="text-center py-10 w-full mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-6">
            {data.headline}
          </h1>
          <div
            className="text-primary/70 prose prose-invert max-w-5xl mx-auto"
            dangerouslySetInnerHTML={{ __html: data.subHeadline }}
          />
        </section>

        {/* STATS + PARA */}
        <section className="px-4 w-full py-16 bg-primary grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-8">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-primary rounded-3xl p-2 text-center text-secondary "
              >
                <h2 className="text-4xl font-extrabold">{stat.number}</h2>
                <p className="text-secondary/70 uppercase tracking-widest text-sm mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className="text-secondary/70 prose prose-invert"
            dangerouslySetInnerHTML={{ __html: data.statsDescription }}
          />
        </section>

        {/* MISSION & VISION */}
        <section className="w-full py-16 px-4">
          <h2 className="text-center text-4xl font-bold tracking-widest mb-16">
            MISSION & VISION
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-primary/5 p-12 rounded-3xl border border-primary/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center">
                  <Target size={22} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-widest">
                  {data.missionTitle}
                </h3>
              </div>
              <div
                className="text-third"
                dangerouslySetInnerHTML={{ __html: data.missionDescription }}
              />
            </div>

            <div className="bg-primary/5 p-12 rounded-3xl border border-primary/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center">
                  <Eye size={22} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-widest">
                  {data.visionTitle}
                </h3>
              </div>
              <div
                className="text-third"
                dangerouslySetInnerHTML={{ __html: data.visionDescription }}
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-primary w-full py-12 px-6 text-secondary">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{data.servicesTitle}</h2>
            <p className="text-secondary/70">{data.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.services.map((s, i) => (
              <div
                key={i}
                className="bg-secondary/10 p-10 border border-secondary/20 rounded-xl"
              >
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">
                  {s.title}
                </h3>
                <p className="text-secondary/70 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutBasic3;
