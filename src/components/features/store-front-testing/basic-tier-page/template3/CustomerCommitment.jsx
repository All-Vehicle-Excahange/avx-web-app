"use client";

import { Quote } from "lucide-react";

const data = {
  commitmentTitle: "Customer Commitment",
  commitmentText: `Our goal is to maintain transparent communication and assist buyers
throughout the vehicle discovery and purchase process. We aim to
provide honest guidance and reliable information for every buyer.`,
};

function CustomerCommitment() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Full bleed container ──────────────────────────────────── */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0 border border-third/10 rounded-2xl overflow-hidden">

          {/* Left: large accent label */}
          <div className="flex flex-col justify-between gap-8 p-10 lg:p-14 lg:w-[45%] border-b lg:border-b-0 lg:border-r border-third/10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
                  Our Promise
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.commitmentTitle.split("Commitment")[0]}
                <span className="text-fourth/80">Commitment</span>
              </h2>
            </div>

            {/* Bottom accent */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-linear-to-r from-third/30 to-transparent" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-third/30 font-[Poppins] whitespace-nowrap">
                Every Buyer
              </span>
            </div>
          </div>

          {/* Right: text + decorative quote mark */}
          <div className="relative flex flex-col justify-center gap-8 p-10 lg:p-14 flex-1 overflow-hidden">

            {/* Ghost quotation icon */}
               <Quote size={40} className="absolute top-6 right-8   text-third/20"/>

            <p className="relative text-third/55 text-base font-[Poppins] leading-[1.9] max-w-md">
              {data.commitmentText}
            </p>

            {/* Bottom row */}
            <div className="flex items-center gap-3 pt-4 border-t border-third/10">
              <div className="w-6 h-6 rounded-full border border-third/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-third/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs tracking-[0.2em] uppercase text-third/35 font-[Poppins]">
                Adarsh Auto Consultants
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CustomerCommitment;