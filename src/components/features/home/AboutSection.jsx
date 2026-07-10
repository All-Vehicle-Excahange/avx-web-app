import React from "react";
import Image from "next/image";

const stats = [
  { label: "Satisfied clients", value: "130K" },
  { label: "Revenue in 2023", value: "$129M" },
  { label: "Average Monthly Users", value: "1.1M" },
  { label: "Employees", value: "1230" },
  { label: "Worldwide offices", value: "342" },
  { label: "Languages", value: "10" },
];

const AboutSection = () => {
  return (
    <section className="w-full text-primary relative">
      {/* IMPROVED E-COMMERCE SECTION */}
      <div className="my-10 lg:my-13  overflow-hidden">
        <div className="grid lg:grid-cols-12 grid-cols-1 items-stretch">
          {/* LEFT SIDE: Image Features */}
          <div className="relative min-h-[300px] md:min-h-[450px] lg:min-h-full lg:col-span-6 group overflow-hidden">
            <Image
              src="/about-us-built-to-fix-whats-broken-01.webp"
              alt="Reecomm Platform"
              fill
              className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

            {/* Logo Overlay on Image */}
            {/* <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-secondary backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/20">
              <Image
                src="/logo/logo.webp"
                alt="Reecomm Logo"
                width={160}
                height={40}
                className="h-6 md:h-10 w-auto object-contain"
              />
            </div> */}
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="flex flex-col justify-center gap-5 py-4 lg:py-0 lg:p-8 lg:col-span-6">
            <div>
              <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                About Us
                <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
              </p>
              <h2 className="text-3xl mt-2 md:text-4xl lg:text-4xl font-semibold text-primary tracking-tight leading-tight">
                <span className="text-fourth"> Built</span> to fix what&apos;s
                broken.
              </h2>
            </div>
            <p className="text-primary/70 text-sm leading-relaxed text-justify">
              India&apos;s used vehicle market runs on WhatsApp groups, referrals,
              and walk-ins — fragmented, and hard to trust. Buyers can&apos;t verify
              what they&apos;re told. Consultants can&apos;t grow past their own network.
              Reecomm exists to organize that. One platform built on a single
              idea: the same trust that protects buyers is the trust that grows
              consultant businesses. Every vehicle inspected. Every consultant
              verified. Every transaction transparent. Starting in Gujarat. Buy
              smart. Sell fair. Move forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
