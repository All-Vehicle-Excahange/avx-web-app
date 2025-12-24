import React, { useState } from "react";

import MyVehicle from "./MyVehicle";
import MyProfile from "./MyProfile";
import Inquiries from "./Inquiries";
import Inspection from "./Inspection";
import Wishlist from "./WishList";


function UserDetails() {
  const [activeTab, setActiveTab] = useState("myvehicle");

  return (
    <>
      <section className="pt-12">
        <div>
          <h1 className="text-2xl  font-bold">Manage Your Activities</h1>
          <section className="w-full">
            <div className="flex flex-col  w-full">
              <div className="bg-secondary 3xl:container">
                <div className="flex gap-10 border-b border-third/30">
                  {[
                    { id: "myvehicle", label: "My Vehicles" },
                    { id: "inquaries", label: "Inquiries" },
                    { id: "inspections", label: "AVX Inspections" },
                    { id: "wishlist", label: "WishList" },
                    { id: "myprofile", label: "My Profile" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative py-4 text-sm font-medium transition
                               ${
                                 activeTab === tab.id
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
              </div>

              {/* TAB CONTENT */}
              {activeTab === "myvehicle" && <MyVehicle />}
              {activeTab === "inquaries" && <Inquiries />}
              {activeTab === "inspections" && <Inspection />}
              {activeTab === "wishlist" && <Wishlist />}
              {activeTab === "myprofile" && <MyProfile />}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default UserDetails;
