import Image from "next/image";
import EditorInput from "../atoms/EditorInput";
import RichTextEditor from "../atoms/RichTextEditor";
import { ImageUploader } from "../atoms/ImageUploader ";
import * as Icons from "lucide-react";

function AboutPremium3({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const update = (k, v) => onUpdate({ ...data, [k]: v });
  const updateImage = (i, v) => {
    const imgs = [...data.storyImages];
    imgs[i] = v;
    update("storyImages", imgs);
  };

  /* ================= EDITOR ================= */
  if (isEditing) {
    return (
      <div className="bg-secondary border border-third/30 rounded-xl p-8 max-w-[1480px] w-full mx-auto space-y-8">
        <h3 className="text-primary font-bold text-xl">
          Story Gallery Section
        </h3>

        <EditorInput
          bold
          value={data.heroTitle}
          onChange={(e) => update("storyTitle", e.target.value)}
        />

        <RichTextEditor
          value={data.heroDesc}
          onChange={(v) => update("storyDesc", v)}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.storyImages.map((img, i) => (
            <ImageUploader
              key={i}
              label={`Story Image ${i + 1}`}
              src={img}
              onChange={(v) => updateImage(i, v)}
            />
          ))}
        </div>
        {/* MISSION / VISION EDITOR */}
        <hr className="border-third/20" />
        <h3 className="text-primary font-bold text-xl">Mission & Vision</h3>

        <div className="grid lg:grid-cols-2 gap-12">
          <ImageUploader
            label="Mission Image"
            src={data.missionImage}
            onChange={(v) => update("missionImage", v)}
          />

          <div className="space-y-6">
            <EditorInput
              bold
              value={data.missionTitle}
              onChange={(e) => update("missionTitle", e.target.value)}
            />
            <RichTextEditor
              value={data.missionDesc}
              onChange={(v) => update("missionDesc", v)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          <div className="space-y-6">
            <EditorInput
              bold
              value={data.visionTitle}
              onChange={(e) => update("visionTitle", e.target.value)}
            />
            <RichTextEditor
              value={data.visionDesc}
              onChange={(v) => update("visionDesc", v)}
            />
          </div>

          <ImageUploader
            label="Vision Image"
            src={data.visionImage}
            onChange={(v) => update("visionImage", v)}
          />
        </div>

        <hr className="border-third/20" />
        <h3 className="text-primary font-bold text-xl">Stats</h3>

        <RichTextEditor
          value={data.statsDesc}
          onChange={(v) => update("statsDesc", v)}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data.stats.map((s, i) => (
            <div
              key={i}
              className="bg-primary/5 border border-third/20 rounded-2xl p-6 space-y-4"
            >
              <EditorInput
                bold
                center
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

        <hr className="border-third/20" />
        <h3 className="text-primary font-bold text-xl">Services</h3>

        <EditorInput
          bold
          value={data.servicesTitle}
          onChange={(e) => update("servicesTitle", e.target.value)}
        />

        <RichTextEditor
          value={data.servicesDesc}
          onChange={(v) => update("servicesDesc", v)}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data.services.map((s, i) => (
            <div
              key={i}
              className="bg-primary/5 border border-third/20 rounded-2xl p-6 space-y-4"
            >
              <EditorInput
                label="Lucide Icon"
                center
                value={s.icon}
                onChange={(e) =>
                  updateArrayItem("services", i, "icon", e.target.value)
                }
              />
              <EditorInput
                bold
                center
                value={s.title}
                onChange={(e) =>
                  updateArrayItem("services", i, "title", e.target.value)
                }
              />
              <EditorInput
                center
                size="sm"
                value={s.desc}
                onChange={(e) =>
                  updateArrayItem("services", i, "desc", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= VIEW ================= */
  return (
    <>
      <section className="bg-secondary py-10 px-6">
        <div className="max-w-[1480px] mx-auto space-y-20">
          {/* Title */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
              {data.heroTitle}
            </h2>
            <div
              className="text-third text-lg"
              dangerouslySetInnerHTML={{ __html: data.heroDesc }}
            />
          </div>

          {/* Gallery */}
          <div className="grid relative bottom-8 grid-cols-4 gap-8 max-w-7xl mx-auto">
            {data.storyImages.map((img, i) => (
              <div
                key={i}
                className={`relative  h-[380px] rounded-3xl overflow-hidden transition-all duration-700 ${
                  i === 1 || i === 2 ? "mt-18" : ""
                }`}
              >
                <Image
                  src={img || "/cs.png"}
                  alt={`Story ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-[1480px] mx-auto text-center space-y-20">
          {/* Description */}
          <div
            className="max-w-7xl mx-auto text-third text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.statsDesc }}
          />

          {/* Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
            {data.stats.map((s, i) => (
              <div key={i}>
                <div className="text-7xl md:text-8xl font-bold text-primary mb-4">
                  {s.number}
                </div>
                <div className="text-third text-sm tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-[1480px] w-full mx-auto space-y-12">
          {/* MISSION */}
          <div className="grid lg:grid-cols-2 items-center gap-24">
            <div className="space-y-6 ">
              <h2 className="text-4xl font-extrabold text-primary">
                {data.missionTitle}
              </h2>
              <div
                className="text-third text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.missionDesc }}
              />
            </div>

            <div className="relative h-[260px] rounded-3xl overflow-hidden">
              <Image
                src={data.missionImage || "/cs.png"}
                alt="Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* VISION */}
          <div className="grid lg:grid-cols-2 items-center gap-24">
            <div className="relative h-[260px] rounded-3xl overflow-hidden">
              <Image
                src={data.visionImage || "/cs.png"}
                alt="Vision"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 s ml-auto">
              <h2 className="text-4xl font-extrabold text-primary">
                {data.visionTitle}
              </h2>
              <div
                className="text-third text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.visionDesc }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-[1480px] mx-auto space-y-20">
          {/* Title */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-5xl font-extrabold text-primary">
              {data.servicesTitle}
            </h2>
            <div
              className="text-third text-lg"
              dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
            />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">
            {data.services.map((s, i) => {
              const Icon = Icons[s.icon] || Icons.Star;

              return (
                <div
                  key={i}
                  className="bg-primary/5 border border-third/20 rounded-3xl p-10 space-y-6 hover:bg-primary/10 transition-all"
                >
                  <Icon size={40} className="text-primary" />
                  <h3 className="text-xl font-bold text-primary">{s.title}</h3>
                  <p className="text-third text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPremium3;
