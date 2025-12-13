"use client";

import NavbarDark from "../../layout/NavbarDark";

export default function SearchHeader() {
  return (
    <>
      <NavbarDark />

     
      <section
        className="
          w-full
          bg-secondary
          flex flex-col
          items-center
          px-4
          font-sans
          pt-24       
          pb-6        
          md:pt-28
          md:pb-8
        "
      >
        {/* TEXT CONTENT */}
        <div className="w-full max-w-7xl text-left pl-2 md:pl-0">
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
