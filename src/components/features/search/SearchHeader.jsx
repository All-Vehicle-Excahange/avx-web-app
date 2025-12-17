"use client";

import NavbarDark from "../../layout/NavbarDark";

export default function SearchHeader() {
  return (
    <>
      <NavbarDark />

      {/* FULL WIDTH BACKGROUND */}
      <section
        className="
          w-full
          bg-secondary
          font-sans
          pt-24
          pb-6
          md:pt-28
          md:pb-8
        "
      >
        {/* CENTERED CONTENT (AMAZON STYLE) */}
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
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
