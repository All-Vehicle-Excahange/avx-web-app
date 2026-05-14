// import React from 'react'

// const stats = [
//     { label: "Satisfied clients", value: "130K" },
//     { label: "Revenue in 2023", value: "$129M" },
//     { label: "Average Monthly Users", value: "1.1M" },
//     { label: "Employees", value: "1230" },
//     { label: "Worldwide offices", value: "342" },
//     { label: "Languages", value: "10" },
// ];

// const AboutSection = () => {
//     return (
//         <section className="w-full h-full text-primary">
//             <div className="px-6">
//                 {/* Title */}
//                 <h2 className="text-4xl md:text-5xl font-bold mb-16">
//                     Company overview
//                 </h2>

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-14 gap-x-12">
//                     {stats.map((item, index) => (
//                         <div key={index} className="w-full">
//                             {/* Label */}
//                             <p className="text-sm md:text-base font-semibold tracking-wider text-gray-300 mb-3">
//                                 {item.label}
//                             </p>

//                             {/* Divider */}
//                             <div className="w-full h-[2px] bg-primary/70 mb-6" />

//                             {/* Value */}
//                             <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
//                                 {item.value}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default AboutSection

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
          <div className="relative min-h-[350px] lg:min-h-full lg:col-span-6 group overflow-hidden">
            <Image
              src="/business-verification.webp"
              alt="Reecomm Platform"
              fill
              className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

            {/* Logo Overlay on Image */}
            <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-secondary backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/20">
              <Image src="/logo/logo.webp" alt="Reecomm Logo" width={160} height={40} className="h-6 md:h-10 w-auto object-contain" />
            </div>
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="flex flex-col justify-center gap-5 py-4 lg:py-0 lg:p-8 lg:col-span-6">
            <div>
              <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                About Us
                <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
              </p>
              <h2 className="text-3xl mt-2 md:text-4xl lg:text-4xl font-semibold text-primary tracking-tight leading-tight">
                <span className="text-fourth"> Built</span>  to fix what&apos;s broken.
              </h2>
            </div>
            <p className="text-primary/70 text-sm leading-relaxed text-justify">
              India&apos;s used car market is massive — but buying or selling a second-hand vehicle has always felt like a gamble. Buyers can&apos;t trust what they see. Sellers don&apos;t get what their car is worth. And the auto consultants who&apos;ve spent years building expertise? They&apos;re still running their entire business on phone calls.
              <br />
              We started Reecomm in 2025 to change all three. A platform where every vehicle is verified, every price is transparent, and every consultant has the digital tools to grow their business properly.
              <br />
              We&apos;re starting in Gujarat and Maharashtra — and we&apos;re just getting started.
            </p>
          </div>

        </div>
      </div>

      <div className="mx-auto">

        {/* Title */}
        <div className="mb-8 max-w-3xl">
          <div className="flex flex-col items-start gap-2">
            <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
              Company
              <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
              Company <span className="text-fourth">Overview</span>
            </h2>

            <p className="text-third">
              Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
            </p>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative border border-primary/20 rounded-2xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >

              {/* Label */}
              <p className="text-sm tracking-wider text-primary/60 uppercase mb-6">
                {item.label}
              </p>

              {/* Divider */}
              <div className="w-full h-[2px] bg-gradient-to-r from-primary/60 to-transparent mb-6 transition-all group-hover:from-primary" />

              {/* Value */}
              <p className="text-4xl md:text-5xl font-bold tracking-tight transition-transform">
                {item.value}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AboutSection;

