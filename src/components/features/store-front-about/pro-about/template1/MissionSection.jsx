
"use client";

import React from "react";

export default function MissionSection() {
  const data = {
    missionTitle: "Our Mission",
    missionDesc: `
      <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. 
      
      </p>
    `,
    missionImage:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",

    visionTitle: "Our Vision",
    visionDesc: `
      <p>
       Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur.
      </p>
    `,
    visionImage:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
  };

  return (
    <section className="relative py-12 px-2 lg:px-4">

      {/* ── HEADING ── */}
      <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
          Purpose
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
          Mission &
          <span className="text-fourth/80"> Vision</span>
        </h2>
      </div>

      {/* ── SPLIT SCREEN ── */}
      <div className="grid lg:grid-cols-2 gap-6">


{/* LEFT: MISSION */}
<div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">

  <img
    src={data.missionImage}
    alt="mission"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">

    <h2 className="text-3xl sm:text-4xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
      {data.missionTitle.split(" ")[0]}{" "}
      <span className="text-fourth/80">
        {data.missionTitle.split(" ")[1]}
      </span>
    </h2>

    <div
      className="text-third/70 text-base md:text-lg font-[Poppins] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: data.missionDesc }}
    />

  </div>
</div>

{/* RIGHT: VISION */}
<div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">

  <img
    src={data.visionImage}
    alt="vision"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">

    <h2 className="text-3xl sm:text-4xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
      {data.visionTitle.split(" ")[0]}{" "}
      <span className="text-fourth/80">
        {data.visionTitle.split(" ")[1]}
      </span>
    </h2>

    <div
      className="text-third/70 text-base md:text-lg font-[Poppins] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: data.visionDesc }}
    />

  </div>
</div>



      </div>

    </section>
  );
}

