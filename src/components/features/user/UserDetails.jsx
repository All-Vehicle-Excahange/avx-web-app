"use client";

import React from "react";
import MyVehicle from "./MyVehicle";
import MyProfile from "./MyProfile";
import Inquiries from "./Inquiries";
import MyInquary from "./MyInquary";
import Inspection from "./Inspection";
import Wishlist from "./WishList";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

function UserDetails() {
  const params = useParams();
  const router = useRouter();
  const activeTab = params?.id || "myvehicle";

  return (
    <section className="pt-12">
      <h1 className="text-2xl font-bold">Manage Your Activities</h1>

      <div className="flex  gap-10 border-b border-third/30 overflow-x-auto no-scrollbar whitespace-nowrap">
        {[
          { id: "myvehicle", label: "My Vehicles" },
          { id: "inquaries", label: "Recive Inquiries" },
          { id: "myinquary", label: "Send Inquiry" },
          { id: "inspections", label: "AVX Inspections" },
          { id: "wishlist", label: "My Activity & Preference" },
          { id: "myprofile", label: "My Profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => router.push(`/user/details/${tab.id}`, undefined, { shallow: true })}
            className={`relative py-4 text-sm font-medium transition hover:cursor-pointer ${activeTab === tab.id
              ? "text-primary"
              : "text-third hover:text-primary"
              }`}
          >
            {tab.label}

            {activeTab === tab.id && (
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "myvehicle" && <MyVehicle />}
      {activeTab === "inquaries" && <Inquiries />}
      {activeTab === "myinquary" && <MyInquary />}
      {activeTab === "inspections" && <Inspection />}
      {activeTab === "wishlist" && <Wishlist />}
      {activeTab === "myprofile" && <MyProfile />}
    </section>
  );
}

export default UserDetails;
