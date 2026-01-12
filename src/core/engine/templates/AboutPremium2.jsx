import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import Image from "next/image";
import * as Icons from "lucide-react";

function AboutPremium2({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const update = (k, v) => onUpdate({ ...data, [k]: v });

  /* ================= EDITOR ================= */
  if (isEditing) {
    return (
      <div className="bg-secondary p-8 rounded-xl border border-third/30 max-w-[1480px] mx-auto space-y-6 w-full">
        <h3 className="text-primary font-bold text-xl">Hero Background</h3>

        <ImageUploader
          label="Hero Background Image"
          src={data.heroBg}
          fieldKey="hero-bg"
          onChange={(v) => update("heroBg", v)}
        />

        <EditorInput
          bold
          value={data.heroTitle}
          onChange={(e) => update("heroTitle", e.target.value)}
          placeholder="Hero Title"
        />

        <RichTextEditor
          value={data.heroDesc}
          onChange={(v) => update("heroDesc", v)}
        />

        <hr className="border-third/30" />
        <h3 className="text-primary font-bold text-xl">Impact Section</h3>

        <RichTextEditor
          value={data.aboutText}
          onChange={(v) => update("aboutText", v)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {data.stats.map((s, i) => (
            <div key={i} className="border border-third/20 rounded-xl p-4">
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
        <h3 className="text-primary text-xl font-bold">
          Mission & Vision (Editorial Mosaic)
        </h3>

        {/* ===================== MISSION ===================== */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* IMAGE MOSAIC */}
          <div className="grid grid-cols-2 gap-6 h-[460px]">
            <ImageUploader
              label="Mission Main Image"
              src={data.missionImageMain}
              onChange={(v) => update("missionImageMain", v)}
            />

            <div className="grid grid-rows-2 gap-6">
              <ImageUploader
                label="Mission Small 1"
                src={data.missionImageSmall1}
                onChange={(v) => update("missionImageSmall1", v)}
              />
              <ImageUploader
                label="Mission Small 2"
                src={data.missionImageSmall2}
                onChange={(v) => update("missionImageSmall2", v)}
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="space-y-6">
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
        </div>

        <hr className="border-third/20 my-24" />

        {/* ===================== VISION ===================== */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* TEXT */}
          <div className="space-y-6">
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

          {/* IMAGE MOSAIC */}
          <div className="grid grid-cols-2 gap-6 h-[460px]">
            <ImageUploader
              label="Vision Main Image"
              src={data.visionImageMain}
              onChange={(v) => update("visionImageMain", v)}
            />

            <div className="grid grid-rows-2 gap-6">
              <ImageUploader
                label="Vision Small 1"
                src={data.visionImageSmall1}
                onChange={(v) => update("visionImageSmall1", v)}
              />
              <ImageUploader
                label="Vision Small 2"
                src={data.visionImageSmall2}
                onChange={(v) => update("visionImageSmall2", v)}
              />
            </div>
          </div>
        </div>

        <hr className="border-third/30" />
        <h3 className="text-primary font-bold text-xl">Services Section</h3>

        <EditorInput
          bold
          value={data.servicesTitle}
          onChange={(e) => update("servicesTitle", e.target.value)}
          placeholder="Services Title"
        />

        <EditorInput
          value={data.servicesSubtitle}
          onChange={(e) => update("servicesSubtitle", e.target.value)}
          placeholder="Services Subtitle"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data.services.map((s, i) => (
            <div
              key={i}
              className="bg-primary/5 border border-third/20 rounded-3xl p-6 space-y-4"
            >
              <EditorInput
                label="Lucide Icon Name (e.g. ShieldCheck, Globe, Cpu)"
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
                value={s.desc.replace(/<[^>]*>?/gm, "")}
                onChange={(e) =>
                  updateArrayItem(
                    "services",
                    i,
                    "desc",
                    `<p>${e.target.value}</p>`
                  )
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
      <section className="relative max-w-[1480px] mx-auto w-full  h-[65vh]  bg-secondary overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={data.heroBg || "/home2.webp"}
            alt="Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full  flex items-center justify-center px-6">
          <div className="w-6xl text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary">
              {data.heroTitle}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: data.heroDesc }}
              className="text-third text-lg leading-relaxed"
            />
          </div>
        </div>

        {/* Bottom SVG Curve */}
        <div className="absolute -bottom-2 left-0 w-full overflow-hidden leading-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-[140px]"
          >
            <path
              fill="#000"
              fillOpacity="1"
              d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,128C672,128,768,192,864,186.7C960,181,1056,107,1152,90.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      <section className="bg-secondary py-10 px-6">
        <div className="max-w-[1480px] mx-auto">
          {/* Title and Description */}
          <div className="mb-20 text-center ">
            <p className="text-third text-lg leading-relaxed max-w-6xl text-center mx-auto">
              More than 50,000 users in 25+ countries trust us with their
              payments and financial growth. More than 50,000 users in 25+
              countries trust us with their payments and financial growth. More
              than 50,000 users in 25+ countries trust us with their payments
              and financial growth. More than 50,000 users in 25+ countries
              trust us with their payments and financial growth.
            </p>
          </div>

          <div className="w-full">
            {/* ───────── TOP ROW ───────── */}
            <div className="w-full flex">
              {/* STAT 1 – FAR LEFT */}
              <div className="w-1/2 flex justify-start">
                <div className="max-w-xs text-left ">
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-6">
                    {data.stats[0]?.number}
                  </div>
                  <div className="text-third text-base">
                    {data.stats[0]?.label}
                  </div>
                </div>
              </div>

              {/* STAT 2 – PULLED INWARD */}
              <div className="w-1/3 flex justify-center">
                <div className="max-w-xs text-left">
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-6">
                    {data.stats[1]?.number}
                  </div>
                  <div className="text-third text-base">
                    {data.stats[1]?.label}
                  </div>
                </div>
              </div>
            </div>

            {/* ───────── BOTTOM ROW ───────── */}
            <div className="w-full flex">
              {/* STAT 3 – PULLED INWARD */}
              <div className="w-1/1 flex justify-center">
                <div className="max-w-xs text-left">
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-6">
                    {data.stats[2]?.number}
                  </div>
                  <div className="text-third text-base">
                    {data.stats[2]?.label}
                  </div>
                </div>
              </div>

              {/* STAT 4 – FAR RIGHT */}
              <div className="w-1/2 flex justify-end">
                <div className="max-w-xs text-right">
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-6">
                    {data.stats[3]?.number}
                  </div>
                  <div className="text-third text-base">
                    {data.stats[3]?.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-[1480px] mx-auto space-y-20">
          {/* ===================== MISSION ===================== */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* IMAGE MOSAIC */}
            <div className="grid grid-cols-2 gap-6 h-[460px]">
              {/* BIG */}
              <div className="relative rounded-3xl overflow-hidden h-full bg-primary/5">
                <Image
                  src={data.missionImageMain || "/cs.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* STACK */}
              <div className="grid grid-rows-2 gap-6 h-full">
                <div className="relative rounded-2xl overflow-hidden bg-primary/5">
                  <Image
                    src={data.missionImageSmall1 || "/cs.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-primary/5">
                  <Image
                    src={data.missionImageSmall2 || "/cs.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="space-y-6">
              <h2 className="text-5xl font-extrabold text-primary">
                {data.missionTitle}
              </h2>
              <div
                className="text-third text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.missionText }}
              />
            </div>
          </div>

          {/* ===================== VISION ===================== */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* TEXT */}
            <div className="space-y-6">
              <h2 className="text-5xl font-extrabold text-primary">
                {data.visionTitle}
              </h2>
              <div
                className="text-third text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.visionText }}
              />
            </div>

            {/* IMAGE MOSAIC */}
            <div className="grid grid-cols-2 gap-6 h-[460px]">
              {/* BIG */}
              <div className="relative rounded-3xl overflow-hidden h-full bg-primary/5">
                <Image
                  src={data.visionImageMain || "/cs.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* STACK */}
              <div className="grid grid-rows-2 gap-6 h-full">
                <div className="relative rounded-2xl overflow-hidden bg-primary/5">
                  <Image
                    src={data.visionImageSmall1 || "/cs.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-primary/5">
                  <Image
                    src={data.visionImageSmall2 || "/cs.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-[1480px] mx-auto space-y-20">
          {/* TITLE */}
          <div className="w-full text-center">
            <h2 className="text-5xl font-extrabold text-primary mb-4">
              {data.servicesTitle}
            </h2>
            <p className="text-third text-lg">{data.servicesSubtitle}</p>
          </div>

          {/* SERVICES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {data.services.map((s, i) => {
              const Icon = Icons[s.icon] || Icons.Star;

              return (
                <div
                  key={i}
                  className="relative overflow-hidden   rounded-3xl p-10 space-y-6 "
                >
                  <div className="absolute top-0 right-0  aspect-square inverted-service pointer-events-none opacity-60 " />

                  <Icon size={36} className="text-primary relative z-10" />
                  <h3 className="text-xl font-bold text-primary relative z-10">
                    {s.title}
                  </h3>
                  <div
                    className="text-third text-sm leading-relaxed relative z-10"
                    dangerouslySetInnerHTML={{ __html: s.desc }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPremium2;
