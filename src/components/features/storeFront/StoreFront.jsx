"use client";

import { useState } from "react";
import NavbarDark from "@/components/layout/NavbarDark";
import StoreFrontHeroSection from "./StoreFrontHeroSection";

// LEFT (COMMENTED)
// import StoreSummaryAside from "./StoreSummaryAside";

// RIGHT CONTENT
import Inventory from "./Inventory";
import AboutUs from "./AboutUs";
import WhyBuyHere from "./WhyBuyHere";

export default function StoreFront() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <>
      <NavbarDark />

      <main className="bg-secondary text-primary pt-12">
        {/* HERO */}
        <StoreFrontHeroSection />

        <div className="px-4 md:px-6 py-6">
          {/* ❌ GRID REMOVED */}
          <section className="w-full">
            {/* ❌ LEFT ASIDE REMOVED */}
            {/*
            <aside className="flex flex-col gap-6 xl:sticky xl:top-24 h-fit">
              <StoreSummaryAside />
            </aside>
            */}

            {/* ✅ RIGHT CONTENT → FULL WIDTH */}
            <div className="flex flex-col gap-6 w-full">
              {/* TABS */}
              <div className="bg-secondary">
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
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
