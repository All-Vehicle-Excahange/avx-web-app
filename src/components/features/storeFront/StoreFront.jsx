"use client";

import { useState } from "react";
import StoreFrontHeroSection from "./StoreFrontHeroSection";

// RIGHT CONTENT
import Inventory from "./Inventory";
import AboutUs from "./AboutUs";
import WhyBuyHere from "./WhyBuyHere";
import Review from "./Review";
import Navbar from "@/components/layout/Navbar";


export default function StoreFront() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-1000">
        <Navbar heroMode scrolled={true} />
      </div>

      <main className=" text-primary pt-12">
        {/* HERO */}
        <StoreFrontHeroSection />

        <div className="px-4 md:px-6 py-6">
          <section className="w-full">
            {/*             
            <aside className="flex flex-col gap-6 xl:sticky xl:top-24 h-fit">
              <StoreSummaryAside />
            </aside>
            */}

            <div className="flex flex-col gap-6 3xl:max-w-[1480px] 3xl:mx-auto ">
              {/* TABS */}
              <div className="w-[1480px] px-2 mx-auto 3xl:container ">
                <div className="flex gap-10 border-b border-third/30">
                  {[
                    { id: "inventory", label: "Inventory" },
                    { id: "aboutus", label: "About Us" },
                    { id: "reviews", label: "Reviews" },
                    { id: "whybuyhere", label: "Why Buy Here" },
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
              {activeTab === "inventory" && <Inventory />}
              {activeTab === "aboutus" && <AboutUs />}
              {activeTab === "whybuyhere" && <WhyBuyHere />}
              {activeTab === "reviews" && <Review />}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
