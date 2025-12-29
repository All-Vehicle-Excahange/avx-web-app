"use client";
import { useState } from "react";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { Star, MapPin, Pencil, X } from "lucide-react";
import Image from "next/image";
import StorefrontEditor from "./components/StorefrontEditor";
import { ProfileItem } from "./ProfileComponent";

export default function StoreFrontComponent() {
  const [openEditor, setOpenEditor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    businessName: "Adarsh Auto Consultants",
    ownerName: "Adarsh Patel",
    email: "adarsh@adarshautoconsultants.com",
    phone: "+91 98765 43210",
    city: "Ahmedabad, Gujarat",
    businessType: "Pre-owned Vehicle Consultant",
    aadhaar: "1234 1234 1234",
    pan: "ABCDE1234F",
    gst: "27ABCDE1234F1Z5",
  });

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

      {/* PROFILE CARD */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Business Profile</h2>
          {!isEditing && (
            <Button variant="ghost" onClick={() => setIsEditing(true)}>
              Update Profile
            </Button>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <ProfileItem label="Business Name" value={profile.businessName} />
            <ProfileItem label="Owner Name" value={profile.ownerName} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Phone" value={profile.phone} />
            <ProfileItem label="City" value={profile.city} />
            <ProfileItem label="Business Type" value={profile.businessType} />
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Business Name" variant="colored" />
            <InputField label="Owner Name" variant="colored" />
            <InputField label="Email" variant="colored" type="email" />
            <ProfileItem label="Phone" value={profile.phone} />
            <InputField label="City" variant="colored" />
            <InputField label="Business Type" variant="colored" />
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end gap-4">
            <Button
              variant="outlineSecondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button variant="ghost">Save Changes</Button>
          </div>
        )}
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
