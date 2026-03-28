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
    visionTitle: "Our Vision",
    visionDesc: `
      <p>
       Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur.
      </p>
    `,
  };

  return (
    <section className="relative py-12 px-2 lg:px-4 ">
      <div className=" w-full flex flex-col gap-16">

        {/* ── MAIN HEADING ───────────────── */}
        <div className="flex flex-col gap-6 max-w-2xl text-center">
          <p className=" text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Purpose
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Mission &
            <span className="text-fourth/80"> Vision</span>
          </h2>
        </div>
      

      {/* Mission Row */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start  pt-12">
        <div className="w-full lg:w-1/3">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            {data.missionTitle.split(" ")[0]}{" "}
            <span className="text-fourth/80">{data.missionTitle.split(" ")[1]}</span>
          </h2>
        </div>
        <div className="w-full lg:w-2/3">
          <div
            className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.missionDesc }}
          />
        </div>
      </div>

      {/* Vision Row */}
      <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-20 items-start pt-12">
        <div className="w-full lg:w-1/3">
         
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            {data.visionTitle.split(" ")[0]}{" "}
            <span className="text-fourth/80">{data.visionTitle.split(" ")[1]}</span>
          </h2>
        </div>
        <div className="w-full lg:w-2/3">
          <div
            className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.visionDesc }}
          />
        </div>
      </div>

    </div>
    </section >
  );
}