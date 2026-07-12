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
import { useAuthStore } from "@/stores/useAuthStore";

function UserDetails() {
  const params = useParams();
  const { push } = useRouter();
  const user = useAuthStore((state) => state.user);
  const isConsultant = user?.userRole === "CONSULTATION";
  const activeTab = params?.id || (isConsultant ? "myprofile" : "myvehicle");
  const resolvedTab = activeTab === "inventory" ? "myvehicle" : activeTab;

  React.useEffect(() => {
    if (isConsultant && activeTab === "myvehicle") {
      push("/user/details/sent-inquiries");
    }
  }, [isConsultant, activeTab, push]);

  return (
    <section className="pt-12">
      <h1 className="text-2xl font-bold">Manage Your Activities</h1>

      <div className="flex  gap-10 border-b border-third/30 overflow-x-auto no-scrollbar whitespace-nowrap">
        {[
          { id: "myvehicle", label: "My Vehicles" },
          { id: "received-inquiries", label: "Receive Inquiries" },
          { id: "sent-inquiries", label: "Send Inquiry" },
          { id: "inspections", label: "Reecomm Inspections" },
          { id: "wishlist", label: "My Activity & Preference" },
          { id: "myprofile", label: "My Profile" },
        ]
          .filter((tab) => {
            if (isConsultant) {
              if (tab.id === "myvehicle" || tab.id === "received-inquiries") {
                return false;
              }
            }
            if (tab.id === "received-inquiries") {
              const allowedRoles = ["USER_SELLER", "USER_SELLER_APPLICANT", "CONSULTATION"];
              return allowedRoles.includes(user?.userRole);
            }
            return true;
          })
          .map((tab) => (
          <button
            key={tab.id}
            onClick={() => push(`/user/details/${tab.id}`, undefined, { shallow: true })}
            className={`relative py-4 text-sm font-medium transition hover:cursor-pointer ${resolvedTab === tab.id
              ? "text-primary"
              : "text-third hover:text-primary"
              }`}
          >
            {tab.label}

            {resolvedTab === tab.id && (
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {resolvedTab === "myvehicle" && <MyVehicle />}
      {resolvedTab === "received-inquiries" && <Inquiries />}
      {resolvedTab === "sent-inquiries" && <MyInquary />}
      {resolvedTab === "inspections" && <Inspection />}
      {resolvedTab === "wishlist" && <Wishlist />}
      {resolvedTab === "myprofile" && <MyProfile />}
    </section>
  );
}

export default UserDetails;
