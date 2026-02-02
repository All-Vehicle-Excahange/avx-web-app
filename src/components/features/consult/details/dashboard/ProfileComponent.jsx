"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import {
  ShieldCheck,
  FileText,
  BadgeCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function ProfileComponent() {
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

  return (
    <section className="w-full space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Profile & Verification</h1>
        <p className="text-third text-sm">
          Manage identity, verification & storefront credibility
        </p>
      </div>

      {/* ✅ PROFILE STRENGTH */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        {/* Top Line */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-primary">
            Profile Strength:{" "}
            <span className="text-green-400 font-bold">82%</span>
          </p>

          <span className="flex items-center gap-2 text-sm text-green-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            Strong
          </span>
        </div>

        {/* Checklist */}
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Verified business
          </p>

          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            KYC complete
          </p>

          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Logo & cover uploaded
          </p>

          <p className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle size={16} />
            About Us missing
          </p>
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
        {/* ✅ Buyer Visibility Note */}
        <div className="mt-4 rounded-xl bg-primary/5 border border-third/20 px-4 py-3">
          <p className="text-xs text-third flex items-center gap-2">
            <Info size={14} className="text-primary/70" />
            This information is visible to buyers
          </p>
        </div>
      </div>

      {/* VERIFICATION STATUS */}
      <div className="rounded-2xl border border-third/40 bg-primary/5 p-6 space-y-4">
        <h2 className="font-semibold">Verification Status</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <StatusCard
            title="Verification Status"
            value="Verified"
            icon={<ShieldCheck />}
            green
          />
          <StatusCard
            title="Verified On"
            value="12 July 2024"
            icon={<BadgeCheck />}
          />
        </div>
      </div>

      {/* KYC DOCUMENTS */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
        <h2 className="font-semibold">KYC Documents</h2>

        <KycRow title="PAN" status="Verified on 10 July 2024" />
        <KycRow title="Aadhaar" status="Verified on 10 July 2024" />
        <KycRow title="GST" status="Verified on 11 July 2024" />
      </div>
    </section>
  );
}

/* ================= SUB ================= */

export function ProfileItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-third">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatusCard({ title, value, icon, green }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl p-5 border border-third/30 ${
        green ? "bg-green-500/10" : "bg-secondary"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          green
            ? "bg-green-500/20 text-green-400"
            : "bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-third">{title}</p>
        <p className={`font-semibold ${green && "text-green-400"}`}>{value}</p>
      </div>
    </div>
  );
}

function KycRow({ title, status }) {
  return (
    <div className="flex justify-between items-center rounded-xl border border-third/30 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <FileText className="text-primary" size={18} />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-third">{status}</p>
        </div>
      </div>
      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
        Verified
      </span>
    </div>
  );
}
