"use client";
import React from "react";
import Image from "next/image";

const founderParagraphs = [
  "Every marketplace changes one thing.\nAmazon changed availability.\nUber changed transportation.\nAirbnb changed accommodation.",
  "Yet one of the largest purchases people make still depends on guesswork.",
  "I kept seeing the same problems.\nBuyers couldn't tell who to trust.\nConsultants with genuine businesses looked exactly like everyone else.\nGood vehicles disappeared among poor listings.",
  "The industry didn't need another marketplace.\nIt needed infrastructure.\nThat became Reecomm.",
  "Everything we build starts with one question.\nDoes this make buying and selling used vehicles more trustworthy?",
  "If the answer is no,\nwe don't build it.",
];

const timelineEvents = [
  "Observed the market",
  "Talked to buyers",
  "Met consultants",
  "Found one common problem",
  "Started Reecomm",
];

const pillarCards = [
  {
    num: "01",
    title: "For Buyers",
    desc: "Reduce uncertainty before making one of life's biggest purchases.",
  },
  {
    num: "02",
    title: "For Consultants",
    desc: "Help honest businesses build digital credibility and grow online.",
  },
  {
    num: "03",
    title: "For The Market",
    desc: "Build transparent infrastructure that raises trust across the entire ecosystem.",
  },
];

export default function OurTeam() {
  return (
    <section className="py-20 bg-transparent text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="mb-[24px] pt-4">
          <p className="text-[12px] tracking-[4px] font-medium text-[#8B8B8B] uppercase">
            ABOUT THE FOUNDER
          </p>
        </div>

        {/* HEADLINE */}
        <h2 className="max-w-[760px] text-3xl sm:text-5xl lg:text-[64px] font-bold leading-tight lg:leading-[74px] text-white mb-[32px]">
          We didn&apos;t build another marketplace.{" "}
          <span className="text-[#2F80FF] block sm:inline">
            We rebuilt trust.
          </span>
        </h2>

        {/* INTRO PARAGRAPH */}
        <div className="max-w-[700px] text-lg lg:text-[22px] leading-relaxed lg:leading-[38px] text-[#BDBDBD] mb-[60px] lg:mb-[80px]">
          <p className="mb-4">
            The idea behind Reecomm wasn&apos;t to create another place to
            list vehicles.
          </p>
          <p>
            It came from watching buyers struggle with uncertainty,
            consultants struggle to earn credibility, and an industry that had
            grown without the infrastructure needed to create trust.
          </p>
        </div>

        {/* MAIN CONTENT: TWO COLUMNS */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 xl:gap-[100px] mb-[100px] lg:mb-[120px]">
          {/* LEFT COLUMN */}
          <div className="w-full lg:flex-1 shrink">
            {/* LARGE QUOTATION MARK */}
            <div className="text-[90px] lg:text-[110px] leading-none text-[#2F80FF]/15 select-none font-serif -mb-8 lg:-mb-12 -ml-1">
              &ldquo;
            </div>

            {/* FOUNDER LETTER PARAGRAPHS */}
            <div className="space-y-6 lg:space-y-8 text-base lg:text-[20px] font-normal leading-relaxed lg:leading-[40px] text-[#E5E5E5]">
              {founderParagraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {/* FOUNDER SIGNATURE */}
            <div className="mt-12 pt-8  max-w-[320px]">
              <h4 className="text-[24px] font-semibold text-white tracking-wide">
                Anas Loriya
              </h4>
              <p className="text-[16px] text-[#8B8B8B] mt-1 font-medium">
                Founder, Reecomm
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-[420px] shrink flex flex-col items-center lg:items-start">
            {/* LARGE PORTRAIT */}
            <div className="w-full lg:w-[420px] h-[460px] sm:h-[520px] lg:h-[560px] rounded-[18px] overflow-hidden relative border border-[#1D1D1D] bg-[#111111] shadow-2xl">
              <Image
                src="/founder_img.webp"
                alt="Anas Loriya - Founder Reecomm"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
              {/* Soft shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* SMALL CARD UNDER IMAGE */}
            <div className="w-full p-[24px] bg-transparent border border-primary/10 rounded-[16px] mt-6 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-primary/10">
                <span className="text-xs uppercase tracking-widest text-[#8B8B8B] font-medium">
                  Founded Reecomm
                </span>
                <span className="text-sm font-bold text-[#2F80FF] bg-[#2F80FF]/10 px-2.5 py-0.5 rounded-full">
                  2026
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#8B8B8B] uppercase tracking-wider font-semibold">
                  One belief
                </p>
                <p className="text-base font-semibold text-white">
                  Trust should never be optional.
                </p>
              </div>
            </div>

            {/* VERTICAL TIMELINE */}
            <div className="w-full lg:w-[260px] mt-10 px-2">
              <p className="text-xs tracking-[2px] uppercase text-[#8B8B8B] font-semibold mb-6">
                Journey Timeline
              </p>
              <div className="space-y-6">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative flex items-center">
                    {/* Connecting Line Segment from dot 1 to dot 2, etc. */}
                    {idx < timelineEvents.length - 1 && (
                      <div className="absolute left-[4px] top-[10px] bottom-[-24px] w-[2px] bg-[#2F80FF]" />
                    )}

                    {/* Centered Bullet Dot */}
                    <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-[#2F80FF] shrink-0" />

                    {/* Text Label */}
                    <span className="ml-4 text-sm font-medium text-[#D1D1D1]">
                      {evt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION TWO */}
        <div>
          {/* LARGE CENTERED STATEMENT */}
          <h3 className="max-w-[920px] mx-auto text-center text-2xl sm:text-3xl lg:text-[42px] font-semibold leading-snug lg:leading-[52px] text-white mb-[60px]">
            Every feature in Reecomm exists because of this story.
          </h3>

          {/* THREE CARDS (Equal Width ~390px, Height 220px, Radius 18px, Border primary/10) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[35px] max-w-[1280px] mx-auto mb-[100px] lg:mb-[140px]">
            {pillarCards.map((card, idx) => (
              <div
                key={idx}
                className="w-full lg:w-[390px] h-[220px] rounded-[18px] border border-primary/10 bg-transparent p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-bold text-[#2F80FF] block mb-2 font-mono">
                    {card.num}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {card.title}
                  </h4>
                </div>
                <p className="text-[#A8A8A8] text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CLOSING */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-bold text-white leading-tight mb-4">
            Building India&apos;s{" "}
            <span className="text-[#2F80FF]">trust infrastructure</span> for
            used vehicles.
          </h2>
          <p className="text-[18px] text-[#A8A8A8] font-medium">
            The marketplace is only the beginning.
          </p>
        </div>
      </div>
    </section>
  );
}
