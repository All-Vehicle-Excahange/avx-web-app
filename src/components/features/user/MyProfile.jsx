import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import React, { useState } from "react";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Nihal",
    lastName: "Chaudhary",
    email: "nihal@gmail.com",
    age: 22,
    location: "Chhapi, Gujarat, India",
    addharNo: "1234 1234 1234",
    panNo: "1234 1234 1234",
    city: "Chhapi",
    state: "Gujarat",
    country: "India",
  });

  return (
    <section className="w-full py-12 rounded-2xl bg-secondary space-y-10">
      {/* PROFILE INFO */}
      <div className="rounded-2xl border border-third/40 bg-secondary text-primary px-6 pb-6">
        <div className="flex items-center justify-between py-6">
          <h2 className="text-lg font-semibold">Profile Info</h2>
          {!isEditing && (
            <Button variant="ghost" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ProfileItem label="First Name" value={profile.firstName} />
            <ProfileItem label="Last Name" value={profile.lastName} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Location" value={profile.location} />
            <ProfileItem label="Adhar No" value={profile.addharNo} />
            <ProfileItem label="Pan No" value={profile.panNo} />
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              variant="colored"
              placeholder="First name"
            />
            <InputField
              label="Last Name"
              variant="colored"
              placeholder="Last name"
            />
            <InputField
              label="Email"
              variant="colored"
              type="email"
              placeholder="Email"
            />
            <InputField
              label="Location"
              variant="colored"
              type="text"
              placeholder="Location"
            />
            <InputField
              label="Adhar No"
              variant="colored"
              type="text"
              placeholder="Adhar No"
            />
            <InputField
              label="Pan No"
              variant="colored"
              type="text"
              placeholder="Pan No"
            />
          </div>
        )}
      </div>

      {/* PROFILE META */}
      <div className="rounded-2xl border border-third/40 bg-secondary text-primary px-6 pb-6">
        <h2 className="text-lg font-semibold py-6">Profile Meta</h2>

        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ProfileItem label="Age" value={profile.age} />
            <ProfileItem label="City" value={profile.city} />
            <ProfileItem label="State" value={profile.state} />
            <ProfileItem label="Country" value={profile.country} />
          </div>
        )}

        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Age"
              variant="colored"
              type="number"
              placeholder="Age"
            />
            <InputField label="City" variant="colored" placeholder="City" />
            <InputField label="State" variant="colored" placeholder="State" />
            <InputField
              label="Country"
              variant="colored"
              placeholder="Country"
            />
          </div>
        )}

        {/* ACTIONS */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-8">
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
    </section>
  );
}

export default MyProfile;

/* ========== VIEW ITEM ========== */

function ProfileItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-third">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
