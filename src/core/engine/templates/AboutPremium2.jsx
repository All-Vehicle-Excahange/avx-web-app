import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
import RichTextEditor from "../atoms/RichTextEditor";
import Image from "next/image";

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
      </div>
    );
  }

  /* ================= VIEW ================= */
  return (
    <section className="relative max-w-[1480px] mx-auto w-full h-[55vh] bg-secondary overflow-hidden">
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
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-full text-center space-y-6">
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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
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
  );
}

export default AboutPremium2;
