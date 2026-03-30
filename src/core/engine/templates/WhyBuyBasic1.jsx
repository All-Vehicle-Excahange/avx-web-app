"use client";

import {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  Star,
} from "lucide-react";
import RichTextEditor from "../atoms/RichTextEditor";
import EditorInput from "../atoms/EditorInput";
const ICON_MAP = {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
};
function WhyBuyBasic1({ data, isEditing, onUpdate }) {
  if (!data) return null;
  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    newArray[index][field] = value;
    updateField(arrayName, newArray);
  };

  if (isEditing) {
    return (
      <div className="bg-secondary w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        {/* HERO */}
        <div>
          <h3 className="text-primary font-bold mb-4">Hero Section</h3>

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

        {/* STORY */}
        <div>
          <h3 className="text-primary font-bold mb-4">Story</h3>

          <EditorInput
            bold
            label="Story Title"
            value={data.storyTitle}
            onChange={(e) => updateField("storyTitle", e.target.value)}
          />

          <RichTextEditor
            label="Story Text"
            value={data.storyText}
            onChange={(v) => updateField("storyText", v)}
          />
        </div>

        <hr className="border-white/10" />

        {/* PROCESS */}
        <div>
          <h3 className="text-primary font-bold mb-4">Process Section</h3>

          <EditorInput
            bold
            label="Process Title"
            value={data.processTitle}
            onChange={(e) => updateField("processTitle", e.target.value)}
          />

          <RichTextEditor
            label="Process Description"
            value={data.processDescription}
            onChange={(v) => updateField("processDescription", v)}
          />

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {data.processSteps.map((step, i) => (
              <div
                key={i}
                className="border p-4 rounded bg-primary/5 space-y-2"
              >
                <EditorInput
                  label="Title"
                  value={step.title}
                  onChange={(e) =>
                    updateArrayItem("processSteps", i, "title", e.target.value)
                  }
                />

                <EditorInput
                  label="Description"
                  value={step.description}
                  onChange={(e) =>
                    updateArrayItem(
                      "processSteps",
                      i,
                      "description",
                      e.target.value,
                    )
                  }
                />

                <EditorInput
                  label="Icon (Search, MessageCircle...)"
                  value={step.icon}
                  onChange={(e) =>
                    updateArrayItem("processSteps", i, "icon", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* INSPECTION */}
        <div>
          <h3 className="text-primary font-bold mb-4">Inspection</h3>

          <EditorInput
            bold
            value={data.inspectionTitle}
            onChange={(e) => updateField("inspectionTitle", e.target.value)}
          />

          <RichTextEditor
            value={data.inspectionText}
            onChange={(v) => updateField("inspectionText", v)}
          />

          {data.inspectionPoints.map((pt, i) => (
            <EditorInput
              key={i}
              value={pt}
              onChange={(e) => {
                const newArr = [...data.inspectionPoints];
                newArr[i] = e.target.value;
                updateField("inspectionPoints", newArr);
              }}
            />
          ))}
        </div>

        <hr className="border-white/10" />

        {/* TESTIMONIALS */}
        <div>
          <h3 className="text-primary font-bold mb-4">Testimonials</h3>

          {data.testimonials.map((t, i) => (
            <div key={i} className="border p-4 rounded bg-primary/5 space-y-2">
              <EditorInput
                label="Name"
                value={t.name}
                onChange={(e) =>
                  updateArrayItem("testimonials", i, "name", e.target.value)
                }
              />

              <EditorInput
                label="Review"
                value={t.review}
                onChange={(e) =>
                  updateArrayItem("testimonials", i, "review", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative container w-full overflow-hidden flex items-center min-h-fit py-12 md:py-36">
        <div className="container relative">
          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Trusted Auto Consultants
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]"
          >
            {data.heroTitle}
            <span className="text-fourth/80"> Auto Consultants</span>
          </h2>

          <div
            className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins]"
            dangerouslySetInnerHTML={{ __html: data.heroDescription }}
          />
        </div>
      </section>

      <section className="w-full py-12  bg-primary border-y border-secondary/10">
        <div className="w-full max-w-[1480px]   mx-auto px-4 sm:px-6 flex flex-col gap-6 ">
          {/* HEADER */}
          <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
            Consultant Story
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
            Our <span className="text-fourth">{data.storyTitle}</span>
          </h2>

          {/* TEXT */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div
              className="text-secondary/80 font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.storyText }}
            />
          </div>
        </div>
      </section>

      <section className="container w-full py-12">
        <div className="max-w-7xl mx-4 flex flex-col gap-8">
          {/* ── HEADER ───────────────── */}
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
            Our Standards
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            {data.selectionTitle}
            <span className="text-fourth/80">Vehicle Selection</span>
          </h2>

          {/* ── DESCRIPTION ───────────────── */}
          <div className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5">
            {data.selectionDescription
              .trim()
              .split("\n\n")
              .map((para, i) => (
                <p
                  key={i}
                  className="text-third text-lg font-[Poppins] leading-relaxed"
                >
                  {para.trim()}
                </p>
              ))}
          </div>
        </div>
      </section>

      <section className="container w-full py-12 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:gap-16">
          {/* HEADER */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xl md:max-w-2xl">
            <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Simple Process
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              {data.processTitle} <span className="text-fourth/80">Works</span>
            </h2>

            <div
              className="text-sm sm:text-base md:text-lg text-third leading-relaxed font-[Poppins]"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>

          {/* STEPS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {data.processSteps.map((step, i) => {
              const Icon = ICON_MAP[step.icon];
              return (
                <div
                  key={i}
                  className="flex flex-col gap-3 md:gap-4 p-5 sm:p-6 md:p-6 lg:p-8 border border-primary/20 rounded-xl md:rounded-2xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* ICON */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center border border-primary/20 rounded-lg">
                      <Icon className="text-primary" size={18} />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-base sm:text-lg font-semibold text-primary font-[Montserrat] leading-snug">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm md:text-[15px] text-third/70 leading-relaxed font-[Poppins]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className=" container w-full py-12">
        <div className="max-w-7xl mx-4 grid md:grid-cols-2 gap-12">
          {/* ── LEFT SIDE ───────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Independent Verification
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.inspectionTitle}{" "}
              <span className="text-fourth/80">Assurance</span>
            </h2>

            <div
              className="text-third text-lg font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.inspectionText }}
            />
          </div>

          {/* ── RIGHT SIDE (FILLED CLEANLY) ───────────────── */}
          <div className="flex flex-col gap-4">
            {data.inspectionPoints.map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 border border-third/10 rounded-lg"
              >
                <CheckCircle2 className="text-primary mt-1" size={16} />

                <p className="text-third font-[Poppins] leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container w-full py-12">
        <div className="max-w-7xl mx-4 flex justify-center">
          {/* ── CENTER BLOCK ───────────────── */}
          <div className="max-w-2xl text-center flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Our Promise
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.commitmentTitle}{" "}
              <span className="text-fourth/80">Commitment</span>
            </h2>

            {/* subtle divider */}
            <div className="w-12 h-px bg-primary/40 mx-auto" />

            <div
              className="text-third text-lg font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.commitmentText }}
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-primary px-4">
        <div className=" container max-w-7xl mx-3 px-4 sm:px-6 flex flex-col gap-12">
          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.35em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
              Real Buyers
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.testimonialsTitle}
              <span className="text-fourth">Experience</span>
            </h2>
          </div>

          {/* TESTIMONIALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 md:p-7 rounded-xl border border-secondary/15 bg-primary flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={15} className="text-fourth" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]">
                  {t.review}
                </p>

                {/* Name */}
                <h4 className="text-secondary font-[Montserrat] font-semibold text-sm tracking-wide">
                  {t.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyBuyBasic1;
