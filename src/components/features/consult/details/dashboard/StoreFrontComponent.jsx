"use client";
import { useState } from "react";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { Star, MapPin, Pencil, X } from "lucide-react";
import Image from "next/image";
import StorefrontEditor from "./components/StorefrontEditor";

export default function StoreFrontComponent() {
  const [openEditor, setOpenEditor] = useState(false);

  const [data, setData] = useState({
    name: "Adarsh Auto Consultants",
    city: "Ahmedabad",
    rating: "4.7",
    reviews: 116,
    description:
      "Premium automotive consultant specializing in verified pre-owned luxury and commercial vehicles.",
    about: "Trusted automotive consultants with over 15 years of experience.",
    why: "AVX certified inspection, transparent pricing, warranty.",
    mission: "To deliver verified & transparent vehicles.",
    vision: "To become India's most trusted auto marketplace.",

    banner: "/sfBg.png",
    logo: "/icons8-user-48.png",
    aboutImage: "/about2.png",
    whyImage: "/whowe.png",
    missionImage: "/about3.png",
    visionImage: "/about4.png",
  });

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Your Storefront</h1>
          <p className="text-third text-sm">
            Manage your public brand presence and storefront appearance
          </p>
        </div>
        <Button onClick={() => setOpenEditor(true)} variant="ghost">
          <Pencil size={16} /> Edit Storefront
        </Button>
      </div>

      {/* BANNER */}
      {/* BANNER */}
      <div className="rounded-3xl overflow-hidden border border-third/30 relative h-44 md:h-52">
        <Image
          src={data.banner}
          fill
          priority
          className="object-cover"
          alt="Banner"
        />
      </div>

      {/* STORE INFO */}
      <div className="bg-secondary border border-third/30 rounded-3xl p-6 space-y-4">
        <div className="flex items-start gap-6">
          <Image
            src={data.logo}
            width={100}
            height={100}
            className="rounded-xl"
            alt="logo"
          />
          <div>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <div className="flex gap-3 text-sm text-third mt-1">
              <Star size={14} className="text-yellow-400" />
              {data.rating} ({data.reviews}) <MapPin size={14} /> {data.city}
            </div>
            <p className="text-sm mt-3 max-w-3xl">{data.description}</p>
          </div>
        </div>
      </div>

      {/* STACKED CONTENT SECTIONS */}
      <Content title="About Us" text={data.about} img={data.aboutImage} />
      <Content title="Why Choose Us" text={data.why} img={data.whyImage} />
      <Content
        title="Our Mission"
        text={data.mission}
        img={data.missionImage}
      />
      <Content title="Our Vision" text={data.vision} img={data.visionImage} />

      {openEditor && (
        <StorefrontEditor
          data={data}
          setData={setData}
          onClose={() => setOpenEditor(false)}
        />
      )}
    </section>
  );
}

/* ---------------- STACKED SECTION ---------------- */

function Content({ title, text, img }) {
  return (
    <div className="bg-secondary border border-third/30 rounded-3xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-third leading-relaxed">{text}</p>
      <Image
        src={img}
        width={1200}
        height={400}
        className="rounded-xl w-full object-cover"
        alt=""
      />
    </div>
  );
}


