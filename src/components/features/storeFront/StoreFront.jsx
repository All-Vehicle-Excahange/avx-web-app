import NavbarDark from "@/components/layout/NavbarDark";
import React from "react";
import StoreFrontHeroSection from "./StoreFrontHeroSection";

function StoreFront() {
  return (
    <>
      <NavbarDark />

      <div className="pt-12">
        <StoreFrontHeroSection />
      </div>
    </>
  );
}

export default StoreFront;
