import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import React from "react";

function MyProfile() {
  return (
    <>
      <section className="w-full py-12 rounded-2xl bg-secondary space-y-10">
        {/* ================= PROFILE INFO ================= */}
        <div className="rounded-2xl border border-third/40 bg-secondary text-primary px-6">
          <h2 className="text-lg font-semibold py-6">Profile Info</h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="First Name"
              placeholder="Enter first name"
              variant="colored"
            />
            <InputField
              label="Last Name"
              placeholder="Enter last name"
              variant="colored"
            />
            <InputField
              label="Email"
              placeholder="Enter email"
              variant="colored"
              type="email"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outlineSecondary">Cancel</Button>
            <Button variant="ghost">Update</Button>
          </div>
        </div>

        {/* ================= PROFILE META ================= */}
        <div className="rounded-2xl border border-third/40 bg-secondary text-primary px-6">
          <h2 className="text-lg font-semibold py-6">Profile Meta</h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="Age"
              placeholder="Enter age"
              variant="colored"
              type="number"
            />
            <InputField
              label="City"
              placeholder="Enter city"
              variant="colored"
            />
            <InputField
              label="State"
              placeholder="Enter state"
              variant="colored"
            />
            <InputField
              label="Country"
              placeholder="Enter country"
              variant="colored"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outlineSecondary">Cancel</Button>
            <Button variant="ghost">Update</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyProfile;
