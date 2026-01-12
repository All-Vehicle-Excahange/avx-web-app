import Button from "@/components/ui/button";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import Image from "next/image";
import { BarChart3, Target, TrendingUp } from "lucide-react";
import * as Icons from "lucide-react";

function AboutPremium1({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const update = (k, v) => onUpdate({ ...data, [k]: v });

  const updateArrayItem = (array, i, key, value) => {
    const copy = [...data[array]];
    copy[i][key] = value;
    onUpdate({ ...data, [array]: copy });
  };

  /* ================= EDITOR ================= */
  if (isEditing) {
    return (
      <div className="bg-secondary p-8  w-full rounded-xl border border-third/30 max-w-[1480px] mx-auto space-y-12">
        <h3 className="text-primary font-bold text-xl">Premium Hero</h3>

        <EditorInput
          bold
          value={data.headline}
          onChange={(e) => update("headline", e.target.value)}
          placeholder="Hero Headline"
        />

        <RichTextEditor
          value={data.subText}
          onChange={(v) => update("subText", v)}
        />

        {/* Image Layout Editor */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {/* Left Big Image */}
          <ImageUploader
            label="Main Hero Image"
            src={data.heroImage1}
            fieldKey="hero1"
            onChange={(v) => update("heroImage1", v)}
          />

          {/* Right stacked images */}
          <div className="space-y-6">
            <ImageUploader
              label="Side Image 1"
              src={data.heroImage2}
              fieldKey="hero2"
              onChange={(v) => update("heroImage2", v)}
            />
            <ImageUploader
              label="Side Image 2"
              src={data.heroImage3}
              fieldKey="hero3"
              onChange={(v) => update("heroImage3", v)}
            />
          </div>
        </div>

        <hr className="border-third/30" />
        <h3 className="text-primary font-bold text-xl">Who We Are / Impact</h3>

        <RichTextEditor
          value={data.aboutText}
          onChange={(v) => update("aboutText", v)}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data.stats.map((s, i) => (
            <div
              key={i}
              className="bg-primary/5 border border-third/20 rounded-2xl p-6 space-y-4"
            >
              <EditorInput
                label="Icon / Emoji"
                center
                value={s.icon || ""}
                onChange={(e) =>
                  updateArrayItem("stats", i, "icon", e.target.value)
                }
              />

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

        <hr className="border-third/30" />
        <h3 className="text-primary font-bold text-xl">Mission & Vision</h3>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Image */}
          <ImageUploader
            label="Main Image"
            src={data.missionImage}
            fieldKey="mission"
            onChange={(v) => update("missionImage", v)}
          />

          {/* Right Content */}
          <div className="space-y-16">
            {/* Mission */}
            <div className="space-y-3">
              <EditorInput
                bold
                value={data.missionTitle}
                onChange={(e) => update("missionTitle", e.target.value)}
              />
              <RichTextEditor
                value={data.missionText}
                onChange={(v) => update("missionText", v)}
              />
            </div>

            <hr className="border-third/20" />

            {/* Vision */}
            <div className="space-y-3">
              <EditorInput
                bold
                value={data.visionTitle}
                onChange={(e) => update("visionTitle", e.target.value)}
              />
              <RichTextEditor
                value={data.visionText}
                onChange={(v) => update("visionText", v)}
              />
            </div>
          </div>
        </div>

        <hr className="border-third/30" />
        <h3 className="text-primary font-bold text-xl">Our Services</h3>

        <EditorInput
          bold
          value={data.servicesTitle}
          onChange={(e) => update("servicesTitle", e.target.value)}
        />

        <EditorInput
          value={data.servicesSubtitle}
          onChange={(e) => update("servicesSubtitle", e.target.value)}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data.services.map((s, i) => (
            <div
              key={i}
              className="bg-primary/5 border border-third/20 rounded-2xl p-6 space-y-4"
            >
              <EditorInput
                label="Lucide Icon Name (e.g. Rocket, Shield, Code)"
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
    <section className="bg-secondary py-10 px-6">
      <div className="max-w-[1480px] mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight">
            {data.headline}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: data.subText }}
            className="text-third text-lg"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative h-[520px] rounded-3xl overflow-hidden group">
            <Image
              src={data.heroImage1 || "/cs.png"}
              alt="Hero Main"
              fill
              className="object-cover "
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative h-[250px] rounded-3xl overflow-hidden group">
              <Image
                src={data.heroImage2 || "/cs.png"}
                alt="Hero Side 1"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-[250px] rounded-3xl overflow-hidden group">
              <Image
                src={data.heroImage3 || "/cs.png"}
                alt="Hero Side 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-secondary py-18 ">
        <div className="max-w-[1480px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          {/* LEFT STORY */}
          <div
            className="text-third text-xl leading-relaxed text-center flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: data.aboutText }}
          />

          {/* RIGHT STAT CARDS */}
          <div className="grid grid-cols-2 gap-8">
            {data.stats.map((s, i) => (
              <div
                key={i}
                className="bg-primary/5 border border-third/20 rounded-3xl p-10 backdrop-blur-xl hover:bg-primary/10 transition-all duration-300"
              >
                <div className="text-4xl mb-6 text-primary">
                  {s.icon || "★"}
                </div>

                <div className="text-5xl font-extrabold text-primary mb-4">
                  {s.number}
                </div>

                <div className="text-third text-sm leading-relaxed">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-28">
        <div className="max-w-[1480px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          {/* LEFT IMAGE - Kept existing rounded style */}
          <div className="relative h-[560px] rounded-3xl overflow-hidden">
            <Image
              src={data.missionImage || "/cs.png"}
              alt="Story"
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT CONTENT - Redesigned Alignment */}
          <div className="space-y-10">
            <div className="space-y-6 rounded-2xl  border border-third/20 bg-primary/5 px-4  py-4">
              <div className="flex items-center justify-between gap-6">
                {/* Icon */}
                <Target strokeWidth={1.5} className="w-16 h-16 text-primary" />

                {/* Stacked Text */}
                <div className="flex flex-col">
                  <span className="text-4xl font-semibold text-primary leading-none">
                    Our
                  </span>
                  <h2 className="text-4xl font-extrabold text-primary leading-tight">
                    {data.missionTitle}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div
                className="text-third text-xl leading-relaxed px-4  py-4"
                dangerouslySetInnerHTML={{ __html: data.missionText }}
              />
            </div>

            <div className="space-y-6 rounded-2xl  border border-third/20 bg-primary/5">
              <div className="flex items-center justify-between rounded-3xl px-4  py-4 backdrop-blur-xl">
                {/* Stacked Text */}
                <div className="flex flex-col">
                  <span className="text-4xl font-semibold text-primary leading-none">
                    Our
                  </span>
                  <h2 className="text-4xl font-extrabold text-primary leading-tight">
                    {data.visionTitle}
                  </h2>
                </div>

                {/* Icon */}
                <BarChart3
                  strokeWidth={1.5}
                  className="w-16 h-16 text-primary"
                />
              </div>

              {/* Description */}
              <div
                className="text-third text-xl leading-relaxed px-4  py-4"
                dangerouslySetInnerHTML={{ __html: data.visionText }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-8">
        <div className="max-w-[1480px] mx-auto space-y-20">
          {/* Title */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold text-primary mb-4">
              {data.servicesTitle}
            </h2>
            <p className="text-third text-lg">{data.servicesSubtitle}</p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {data.services.map((s, i) => {
              const Icon = Icons[s.icon] || Icons.Star;

              return (
                <div
                  key={i}
                  className="bg-primary/5 border border-third/20 rounded-3xl p-10 space-y-6 hover:bg-primary/10 transition-all"
                >
                  <Icon size={36} className="text-primary" />
                  <h3 className="text-xl font-bold text-primary">{s.title}</h3>
                  <p className="text-third text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}

export default AboutPremium1;
