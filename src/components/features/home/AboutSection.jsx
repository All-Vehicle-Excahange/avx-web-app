import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="container !px-0">
      <div className="w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT SIDE: Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-6">
              <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                About Us
                <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight leading-[1.1] mb-5">
              <span className="text-fourth block mb-1">Built to fix <span className="text-white">what&apos;s broken</span></span>
            </h2>

            <div className="space-y-4 text-[13px] md:text-[14px] leading-relaxed text-neutral-400">
              <p>
                India&apos;s used vehicle market runs on WhatsApp groups,
                referrals, and walk-ins — fragmented, and hard to trust.
                Buyers can&apos;t verify what they&apos;re told. Consultants can&apos;t
                grow past their own network.
              </p>

              <p>
                <strong className="text-white font-medium">Reecomm exists to organize that. One platform built on a single idea:</strong> the same trust that protects buyers is the trust that grows consultant businesses.
              </p>

              <p>
                Every vehicle inspected. Every consultant verified. Every transaction transparent.
              </p>

              <p>
                Starting in Gujarat. Buy smart. Sell fair. Move forward.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Image */}
          <div className="relative order-1 lg:order-2 w-full aspect-video lg:aspect-[16/10] xl:aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src="/about-us-built-to-fix-whats-broken-01.webp"
              alt="Reecomm Platform"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
