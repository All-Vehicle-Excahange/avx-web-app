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
  MapPin,
  MessageCircle,
  Eye,
  Store,
  CalendarDays,
  Crown,
  UserCog,
  Smartphone,
  XCircle,
  Headphones,
} from "lucide-react";

export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

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

      <div className="w-full lg:w-1/2 rounded-2xl border border-third/40 bg-secondary p-6 space-y-4">
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

        <Button variant="outlineSecondary">Improve Profile</Button>
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

        {/* ⚠ Pending Banner */}
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 space-y-1">
          <p className="flex items-center gap-2 text-yellow-400 font-medium text-sm">
            <AlertTriangle size={16} />
            Verification Pending
          </p>

          <p className="text-xs text-third">
            Missing:{" "}
            <span className="text-primary font-medium">
              GST / Address Proof
            </span>
          </p>

          <Button variant="outlineSecondary" className="mt-2">
            Complete Verification
          </Button>
        </div>

        {/* ✅ Verified */}
        <KycRow
          title="PAN"
          status="Verified on 10 July 2024"
          state="verified"
        />

        {/* ✅ Verified */}
        <KycRow
          title="Aadhaar"
          status="Verified on 10 July 2024"
          state="verified"
        />

        {/* ⚠ Pending */}
        <KycRow title="GST" status="Not Uploaded Yet" state="pending" />

        {/* ❌ Rejected */}
        <KycRow
          title="Address Proof"
          status="Verification Failed"
          state="rejected"
          reason="Image unclear"
        />
      </div>

      {/* BUSINESS LOCATION & MAP (TRUST BOOST) */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Business Location & Map</h2>

          {!isEditingLocation && (
            <Button variant="ghost" onClick={() => setIsEditingLocation(true)}>
              Edit Address
            </Button>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEditingLocation && (
          <div className="space-y-4 text-sm">
            {/* Address */}
            <div>
              <p className="text-xs text-third">Business Address</p>
              <p className="font-medium">Chaapi, Ahmedabad, Gujarat</p>
            </div>

            {/* Map Preview */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.address + " " + profile.city,
              )}`}
              target="_blank"
              className="block rounded-xl border border-third/30 bg-primary/5 px-4 py-4 hover:bg-primary/10 transition"
            >
              <p className="flex items-center gap-2 font-medium text-primary">
                <MapPin size={16} className="text-primary" />
                Map Preview (Click to Open)
              </p>

              <p className="text-xs text-third mt-1">
                Read-only preview — opens directly in Google Maps
              </p>
            </a>

            {/* Service Area */}
            <p className="text-xs text-third">
              Service Area:{" "}
              <span className="font-medium text-primary">Ahmedabad + 30km</span>
            </p>

            {/* Trust Note */}
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3">
              <p className="text-xs text-green-400 flex items-center gap-2">
                <CheckCircle2 size={14} />
                This reassures buyers that your business is verified & real.
              </p>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditingLocation && (
          <div className="space-y-4">
            <InputField label="Full Address" variant="colored" />
            <InputField label="City" variant="colored" />

            <div className="flex justify-end gap-4">
              <Button
                variant="outlineSecondary"
                onClick={() => setIsEditingLocation(false)}
              >
                Cancel
              </Button>
              <Button variant="ghost">Save Location</Button>
            </div>
          </div>
        )}
      </div>

      {/* ACCOUNT & ROLE DETAILS (ADMIN-FRIENDLY) */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-semibold">Account & Role Details</h2>
          <p className="text-xs text-third">
            Administrative account information & storefront status
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          {/* Account Type */}
          <div className="flex items-start gap-3">
            <UserCog className="text-primary" size={18} />
            <div>
              <p className="text-xs text-third">Account Type</p>
              <p className="font-semibold">Consultant</p>
            </div>
          </div>

          {/* Tier */}
          <div className="flex items-start gap-3">
            <Crown className="text-yellow-400" size={18} />
            <div>
              <p className="text-xs text-third">Tier</p>
              <p className="font-semibold">Premium Partner</p>
            </div>
          </div>

          {/* Joined On */}
          <div className="flex items-start gap-3">
            <CalendarDays className="text-primary" size={18} />
            <div>
              <p className="text-xs text-third">Joined On</p>
              <p className="font-semibold">05 June 2024</p>
            </div>
          </div>

          {/* Storefront Status */}
          <div className="flex items-start gap-3">
            <Store className="text-green-400" size={18} />
            <div>
              <p className="text-xs text-third">Storefront Status</p>
              <span className="inline-flex items-center px-3 py-1 mt-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                Live
              </span>
            </div>
          </div>

          {/* Inventory Visibility */}
          <div className="flex items-start gap-3">
            <Eye className="text-primary" size={18} />
            <div>
              <p className="text-xs text-third">Inventory Visibility</p>
              <span className="inline-flex items-center px-3 py-1 mt-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Active
              </span>
            </div>
          </div>

          {/* Chat Enabled */}
          <div className="flex items-start gap-3">
            <MessageCircle className="text-primary" size={18} />
            <div>
              <p className="text-xs text-third">Chat Enabled</p>
              <p className="font-semibold">
                Yes <span className="text-xs text-third">(Mobile App)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RESTRICTIONS & PLATFORM RULES (TRANSPARENCY) */}
      <div className="rounded-2xl border border-third/40 bg-secondary p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-semibold">Restrictions & Platform Rules</h2>
          <p className="text-xs text-third">
            This avoids confusion later by clearly defining platform
            capabilities.
          </p>
        </div>

        {/* Capabilities List */}
        <div className="space-y-3 text-sm">
          {/* Allowed */}
          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            dignissimos repellendus{" "}
          </p>

          <p className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            dignissimos repellendus{" "}
          </p>

          {/* Restricted */}
          <p className="flex items-center gap-2 text-red-400">
            <XCircle size={16} />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            dignissimos repellendus{" "}
          </p>

          <p className="flex items-center gap-2 text-red-400">
            <XCircle size={16} />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            dignissimos repellendus{" "}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <Smartphone size={16} />
            Open Mobile App
          </Button>
        </div>
      </div>
      {/* FOOTER ACTIONS (CONTEXTUAL) */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Text */}
        <div>
          <p className="font-medium text-sm">
            Need help updating your profile?
          </p>
          <p className="text-xs text-third">
            Contact AVX Support or view platform guidelines for assistance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outlineSecondary"
            className="flex items-center gap-2"
          >
            <Headphones size={16} />
            Contact Support
          </Button>

          <Button variant="ghost" className="flex items-center gap-2">
            <FileText size={16} />
            View Guidelines
          </Button>
        </div>
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

function KycRow({ title, status, state, reason }) {
  return (
    <div className="flex justify-between items-center rounded-xl border border-third/30 bg-primary/5 p-4">
      {/* Left Info */}
      <div className="flex items-center gap-3">
        <FileText className="text-primary" size={18} />

        <div>
          <p className="font-medium">{title}</p>

          {/* Status Text */}
          <p className="text-xs text-third">{status}</p>

          {/* ❌ Rejection Reason */}
          {state === "rejected" && reason && (
            <p className="text-xs text-red-400 mt-1">Reason: {reason}</p>
          )}
        </div>
      </div>

      {/* Right Badge */}
      {state === "verified" && (
        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
          Verified
        </span>
      )}

      {state === "pending" && (
        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
          Pending
        </span>
      )}

      {state === "rejected" && (
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
          Rejected
        </span>
      )}
    </div>
  );
}
