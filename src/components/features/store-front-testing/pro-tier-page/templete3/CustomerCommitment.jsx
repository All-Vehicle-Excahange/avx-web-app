"use client";

import React from "react";

const data = {
  commitmentTitle: "Customer Commitment",
  commitmentText: `Our goal is to maintain transparent communication and assist buyers
throughout the vehicle discovery and purchase process. We aim to
provide honest guidance and reliable information for every buyer.`,
};

function CustomerCommitment() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-2 lg:px-4">
        
        {/* Container with background color, border, and shadow */}
        <div className="bg-secondary/10 border border-third/10 rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

          <div className="flex flex-col gap-6 items-center">

            {/* Label */}
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Our Promise
            </p>

            {/* Title using only data content and specified styles */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.commitmentTitle.split("Commitment")[0]}
                <span className="text-fourth/80">Commitment</span>
              </h2>

            {/* Text using specified styles */}
            <p className="text-third/55 text-base md:text-lg font-[Poppins] leading-[1.9] max-w-3xl italic">
              {data.commitmentText}
            </p>

            {/* Simple decoration to maintain professional feel */}
            <div className="h-px w-1/4 bg-linear-to-r from-transparent via-third/10 to-transparent mt-4" />
            
          </div>

        </div>

      </div>
    </section>
  );
}

export default CustomerCommitment;