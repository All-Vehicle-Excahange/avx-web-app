"use client";

import { useState } from "react";
import NavbarDark from "../../layout/NavbarDark";
import { Grid2X2, Car, Bike, Bus } from "lucide-react";
import CategoryTab from "../../ui/tab";

export default function SearchHeader() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <NavbarDark />

      {/* FULL BLACK BACKGROUND */}
      <section className="w-full bg-secondary flex flex-col items-center justify-center px-4 font-sans pt-20 pb-6 md:pt-0 md:min-h-[42vh]">
        {/* LEFT-ALIGNED TEXT */}
        <div className="w-full max-w-7xl text-left pl-4 md:pl-2 mb-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            Browser by Vehicle Type
          </h2>

          <p className="text-white/70 text-sm mt-2">
            Select a Category to filter your search
          </p>
        </div>

        {/* CATEGORY BAR */}
        <div
          className="
            w-full max-w-7xl
            bg-secondary border border-white/40
            rounded-lg
            flex flex-col
            md:flex-row
            md:justify-between
            gap-3
            px-4 py-3
          "
        >
          <CategoryTab
            active={activeTab === "all"}
            icon={<Grid2X2 size={18} />}
            label="All Vehicles"
            count={256}
            onClick={() => setActiveTab("all")}
          />

          <CategoryTab
            active={activeTab === "4w"}
            icon={<Car size={18} />}
            label="4-Wheelers"
            count={50}
            onClick={() => setActiveTab("4w")}
          />

          <CategoryTab
            active={activeTab === "2w"}
            icon={<Bike size={18} />}
            label="2-Wheelers"
            count={10}
            onClick={() => setActiveTab("2w")}
          />

          <CategoryTab
            active={activeTab === "commercial"}
            icon={<Bus size={18} />}
            label="Commercial"
            count={220}
            onClick={() => setActiveTab("commercial")}
          />
        </div>
      </section>
    </>
  );
}
