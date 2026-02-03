"use client";

import Navbar from "@/components/layout/Navbar";

export default function SearchHeader() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[1000]">
        <Navbar heroMode scrolled={true} />
      </div>
    </>
  );
}
