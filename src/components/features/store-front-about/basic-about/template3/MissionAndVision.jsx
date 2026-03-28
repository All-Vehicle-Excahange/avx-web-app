"use client";
import React from "react";

const missionVisionData = {
  missionTitle: "Our Mission",
  missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
  visionTitle: "Our Vision",
  visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
};

export default function MissionAndVision() {
  return (
    <section className="relative flex flex-col items-center py-12">

      <div className="mx-auto w-full flex flex-col gap-16">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Mission / Vision
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Direction We
            <span className="text-fourth/80"> Move</span>
          </h2>
        </div>

        {/* TIMELINE */}
        <div className="relative max-w-4xl mx-auto flex flex-col gap-16">

          {/* vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full bg-third/20 -translate-x-1/2" />

          {/* MISSION (LEFT) */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* LEFT CONTENT */}
            <div className="lg:col-start-1 flex flex-col gap-4 pr-0 lg:pr-10 text-left lg:text-right">

              <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
                Mission
              </p>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat]">
                {missionVisionData.missionTitle.split("Mission")[0]}
                <span className="text-fourth/80">Mission</span>
              </h3>

              <p className="text-third/70 text-sm sm:text-base font-[Poppins] leading-relaxed max-w-md">
                {missionVisionData.missionDesc}
              </p>

            </div>

            {/* DOT CENTER */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <div className="w-3 h-3 rounded-full bg-third" />
            </div>

          </div>

          {/* VISION (RIGHT) */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* EMPTY LEFT SPACE (important for alignment) */}
            <div className="hidden lg:block" />

            {/* RIGHT CONTENT */}
            <div className="lg:col-start-2 flex flex-col gap-4 pl-0 lg:pl-10 text-left">

              <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
                Vision
              </p>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat]">
                {missionVisionData.visionTitle.split("Vision")[0]}
                <span className="text-fourth/80">Vision</span>
              </h3>

              <p className="text-third/70 text-sm sm:text-base font-[Poppins] leading-relaxed max-w-md">
                {missionVisionData.visionDesc}
              </p>

            </div>

            {/* DOT CENTER */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <div className="w-3 h-3 rounded-full bg-third" />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}