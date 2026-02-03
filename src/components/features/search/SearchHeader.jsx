"use client";

import Navbar from "@/components/layout/Navbar";

export default function SearchHeader() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[1000]">
        <Navbar heroMode scrolled={true} />
      </div>

      {/* FULL WIDTH BACKGROUND */}
      <section className="w-full bg-[url('/search-banner1.jpg')] bg-cover h-[300px] flex justify-center items-center">
        {/* CENTERED CONTENT (AMAZON STYLE) */}
        <div className="container">
          <h2 className="text-primary text-2xl md:text-3xl font-bold">
            Browse by Vehicle Type
          </h2>

          <p className="text-primary/70 text-sm mt-2">
            Select a category to filter your search
          </p>
        </div>
      </section>
    </>
  );
}
