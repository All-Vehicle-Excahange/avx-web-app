"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import { ProfileSkeleton } from "@/components/ui/skeleton";
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
import {
  getVerificationStatus,
  getDocumentStatus,
  getConsualtAdress,
  getConsualtProfile,
} from "@/services/profile.service";

// Helper to format vehicleTypes array into readable text
const formatVehicleTypes = (types) => {
  if (!types || types.length === 0) return "Not Specified";
  const labelMap = {
    TWO_WHEELER: "Two Wheeler",
    THREE_WHEELER: "Three Wheeler",
    FOUR_WHEELER: "Four Wheeler",
    COMMERCIAL: "Commercial",
    HEAVY_VEHICLE: "Heavy Vehicle",
  };
  return types.map((t) => labelMap[t] || t.replace(/_/g, " ")).join(", ");
};

export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [loading, setLoading] = useState(true);

  const [verificationData, setVerificationData] = useState({
    status: "Pending",
    verifiedAt: "Not verified yet",
  });

  const [documentData, setDocumentData] = useState({
    gst: "PENDING",
    panCard: "PENDING",
    aadharCard: "PENDING",
  });

  const [businessLocation, setBusinessLocation] = useState({
    address: "Chaapi",
    city: "Ahmedabad",
    state: "Gujarat",
  });

  const [profile, setProfile] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessType: "",
    establishmentYear: 0,
  });

  const [accountDetails, setAccountDetails] = useState({
    accountType: "Consultant",
    tier: "Premium Partner",
    joinedOn: "",
    storefrontStatus: "Live",
    inventoryVisibility: "Active",
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      setLoading(true);
      try {
        const [verificationRes, documentRes, addressRes, profileRes] =
          await Promise.all([
            getVerificationStatus().catch(() => null),
            getDocumentStatus().catch(() => null),
            getConsualtAdress().catch(() => null),
            getConsualtProfile().catch(() => null),
          ]);

        if (verificationRes?.data) {
          const { verificationStatus, verifiedAt } = verificationRes.data;

          let formattedDate = "Not verified yet";
          if (verifiedAt) {
            const dateObj = new Date(verifiedAt);
            formattedDate =
              dateObj.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }) +
              " at " +
              dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
          }

          setVerificationData({
            status:
              verificationStatus === "VERIFIED"
                ? "Verified"
                : verificationStatus || "Pending",
            verifiedAt: formattedDate,
          });
        }

        if (documentRes?.data) {
          setDocumentData({
            gst: documentRes.data.gst || "PENDING",
            panCard: documentRes.data.panCard || "PENDING",
            aadharCard: documentRes.data.aadharCard || "PENDING",
          });
        }

        if (addressRes?.data) {
          const { address, city, state } = addressRes.data;
          setBusinessLocation({
            address: address || "",
            city: city?.name || "",
            state: state?.name || "",
          });
        }

        // Populate Business Profile from getConsultProfile API
        if (profileRes?.data) {
          const d = profileRes.data;
          setProfile({
            businessName: d.consultationName || "",
            ownerName: d.ownerName || "",
            email: d.companyEmail || "",
            phone: d.phone || "",
            businessType: formatVehicleTypes(d.vehicleTypes),
            establishmentYear: d.establishmentYear || 0,
          });

          // Format createdAt for Joined On
          let joinedFormatted = "";
          if (d.createdAt) {
            const dateObj = new Date(d.createdAt);
            joinedFormatted = dateObj.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
          }

          setAccountDetails((prev) => ({
            ...prev,
            joinedOn: joinedFormatted,
            storefrontStatus:
              d.status === "ACTIVE" ? "Live" : d.status || "Live",
            tier: d.isActiveTier ? "Premium Partner" : "Standard",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch statuses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatuses();

    // Read user data from localStorage for Account & Role Details
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setAccountDetails((prev) => ({
            ...prev,
            accountType: userData.role
              ? userData.role.charAt(0).toUpperCase() +
                userData.role.slice(1).toLowerCase()
              : "Consultant",
          }));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  const getDocStatusText = (status) => {
    if (status === "VERIFIED") return "Verified successfully";
    if (status === "PENDING") return "Verification Pending";
    if (status === "REJECTED") return "Verification Failed";
    return "Not Uploaded Yet";
  };

  return (
    <section className="w-full space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Profile & Verification</h1>
        <p className="text-third text-sm">
          Manage identity, verification & storefront credibility
        </p>
      </div>

      <div className="w-full lg:w-1/2 rounded-xl border border-third/40  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
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

        <Button href={"/consult/dashboard/profile/update"} variant="outlineSecondary" size="sm">
          Improve Profile
        </Button>
      </div>

      {/* PROFILE CARD */}
      <div className="rounded-xl border border-third/40  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Business Profile</h2>
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <ProfileItem label="Business Name" value={profile.businessName} />
            <ProfileItem label="Owner Name" value={profile.ownerName} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Phone" value={profile.phone} />
            {/* <ProfileItem label="City" value={profile.city} /> */}
            <ProfileItem label="Business Type" value={profile.businessType} />
            <ProfileItem
              label="Establishment Year"
              value={profile.establishmentYear}
            />
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Business Name" variant="colored" />
            <InputField label="Owner Name" variant="colored" />
            <InputField label="Email" variant="colored" type="email" />
            <ProfileItem label="Phone" value={profile.phone} />
            {/* <InputField label="City" variant="colored" /> */}
            <InputField label="Business Type" variant="colored" />
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end gap-4">
            <Button
              variant="outlineSecondary"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button variant="ghost" size="sm">
              Save Changes
            </Button>
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
      <div className="rounded-xl border border-third/40  p-6 space-y-4">
        <h2 className="font-semibold">Verification Status</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <StatusCard
            title="Verification Status"
            value={verificationData.status}
            icon={<ShieldCheck />}
            green={verificationData.status === "Verified"}
          />
          <StatusCard
            title="Verified On"
            value={verificationData.verifiedAt}
            icon={<BadgeCheck />}
          />
        </div>
      </div>

      {/* KYC DOCUMENTS */}
      <div className="rounded-xl border border-third/40  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
        <h2 className="font-semibold">KYC Documents</h2>

        {Object.values(documentData).some((s) => s !== "VERIFIED") && (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 space-y-1">
            <p className="flex items-center gap-2 text-yellow-400 font-medium text-sm">
              <AlertTriangle size={16} />
              Verification Action Required
            </p>
            <p className="text-xs text-third">
              Missing/Pending:{" "}
              <span className="text-primary font-medium">
                {[
                  documentData.gst !== "VERIFIED" && "GST",
                  documentData.panCard !== "VERIFIED" && "PAN",
                  documentData.aadharCard !== "VERIFIED" && "Aadhaar",
                ]
                  .filter(Boolean)
                  .join(" / ")}
              </span>
            </p>
            <Button variant="outlineSecondary" size="sm" className="mt-2">
              Complete Verification
            </Button>
          </div>
        )}

        <KycRow
          title="PAN"
          status={getDocStatusText(documentData.panCard)}
          state={documentData.panCard.toLowerCase()}
        />

        <KycRow
          title="Aadhaar"
          status={getDocStatusText(documentData.aadharCard)}
          state={documentData.aadharCard.toLowerCase()}
        />

        <KycRow
          title="GST"
          status={getDocStatusText(documentData.gst)}
          state={documentData.gst.toLowerCase()}
        />
      </div>

      {/* BUSINESS LOCATION & MAP (TRUST BOOST) */}
      <div className="rounded-xl border border-third/40  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Business Location & Map</h2>
        </div>

        {/* VIEW MODE */}
        {!isEditingLocation && (
          <div className="space-y-4 text-sm">
            {/* Address */}
            <div>
              <p className="text-xs text-third">Business Address</p>
              <p className="font-medium">
                {[
                  businessLocation.address,
                  businessLocation.city,
                  businessLocation.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "Not Available"}
              </p>
            </div>

            {/* Map Preview */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${businessLocation.address} ${businessLocation.city} ${businessLocation.state}`,
              )}`}
              target="_blank"
              className="block rounded-xl border border-third/30  px-4 py-4 hover:bg-primary/10 transition"
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
              <span className="font-medium text-primary">
                {businessLocation.city || "Ahmedabad"} + 30km
              </span>
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
            <InputField
              label="Full Address"
              variant="colored"
              defaultValue={businessLocation.address}
            />
            <InputField
              label="City"
              variant="colored"
              defaultValue={businessLocation.city}
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="outlineSecondary"
                size="sm"
                onClick={() => setIsEditingLocation(false)}
              >
                Cancel
              </Button>
              <Button variant="ghost" size="sm">
                Save Location
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ACCOUNT & ROLE DETAILS (ADMIN-FRIENDLY) */}
      <div className="rounded-xl border border-third/40  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
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
              <p className="font-semibold">{accountDetails.accountType}</p>
            </div>
          </div>

          {/* Tier */}
          <div className="flex items-start gap-3">
            <Crown className="text-yellow-400" size={18} />
            <div>
              <p className="text-xs text-third">Tier</p>
              <p className="font-semibold">{accountDetails.tier}</p>
            </div>
          </div>

          {/* Joined On */}
          <div className="flex items-start gap-3">
            <CalendarDays className="text-primary" size={18} />
            <div>
              <p className="text-xs text-third">Joined On</p>
              <p className="font-semibold">{accountDetails.joinedOn || "—"}</p>
            </div>
          </div>

          {/* Storefront Status */}
          <div className="flex items-start gap-3">
            <Store className="text-green-400" size={18} />
            <div>
              <p className="text-xs text-third">Storefront Status</p>
              <span
                className={`inline-flex items-center px-3 py-1 mt-1 rounded-full text-xs font-medium ${
                  accountDetails.storefrontStatus === "Live"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {accountDetails.storefrontStatus}
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
        </div>
      </div>

      {/* RESTRICTIONS & PLATFORM RULES (TRANSPARENCY) */}
      <div className="rounded-xl border border-third/40  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
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
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Smartphone size={16} className="mr-1" />
            Open Mobile App
          </Button>
        </div>
      </div>
      {/* FOOTER ACTIONS (CONTEXTUAL) */}
      <div className="rounded-xl border border-third/30  p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        {/* ✅ Text Section: Centered on mobile, left-aligned on desktop */}
        <div className="space-y-1 text-left">
          <p className="font-medium text-sm md:text-base text-primary">
            Need help updating your profile?
          </p>
          <p className="text-xs md:text-sm text-third max-w-md">
            Contact AVX Support or view platform guidelines for assistance.
          </p>
        </div>

        {/* ✅ Actions Section: Always one line */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <Button
            variant="outlineSecondary"
            size="sm"
            className="flex items-center justify-center gap-2 whitespace-nowrap shrink-0 px-4"
          >
            <Headphones size={16} className="mr-1" />
            <span>Contact Support</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center justify-center gap-2 whitespace-nowrap shrink-0 px-4"
          >
            <FileText size={16} className="mr-1" />
            <span>View Guidelines</span>
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
      className={`flex items-center gap-4 rounded-xl p-5 border border-third/30 ${
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
    <div className="flex justify-between items-center rounded-xl border border-third/30  p-4">
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
