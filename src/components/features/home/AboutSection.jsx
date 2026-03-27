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
            <img
              src="/business-verification.webp"
              alt="Reecomm Platform"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

            {/* Logo Overlay on Image */}
            <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-secondary backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/20">
              <img src="/logo/logo.webp" alt="Reecomm Logo" className="h-6 md:h-10 w-auto object-contain" />
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
                <span className="text-fourth"> Driving </span> the Future of E-Commerce
              </h2>
            </div>
            <p className="text-primary/70 text-sm leading-relaxed text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, error unde? Cum eveniet vitae, non sapiente eligendi
              nihil. Numquam cumque aliquam consectetur, incidunt possimus
              doloribus maiores laboriosam ipsam est perferendis magni molestias
              facilis aliquid harum sit et ipsum dicta quidem quae dolor debitis
              porro, non nisi? At obcaecati odio repellat molestias architecto
              culpa eos. Veritatis nam tempora iure neque soluta sapiente
              numquam est excepturi, id ab unde cumque eaque ullam impedit
              veniam qui dignissimos ex obcaecati. Illo molestiae, officia nemo
              beatae minima architecto blanditiis odit soluta voluptatum
              sapiente dolor harum modi, aperiam illum deleniti quas veniam
              magni? Exercitationem, nemo hic.
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

