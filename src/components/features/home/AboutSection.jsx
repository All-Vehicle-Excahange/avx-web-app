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
    <section className="w-full py-5 text-primary relative">
      <div className="mx-auto">

        {/* Title */}
        <div className="mb-10 max-w-3xl">
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-start gap-4">
              {/* VERTICAL ACCENT LINE */}
              <span className="w-2 h-[52px] rounded-full bg-gradient-to-b from-blue-500 to-white-400" />

              {/* TEXT */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                  Company Overview
                </h2>
              </div>
            </div>
          </div>

          <p className="text-primary/70 text-lg">
            Our growth reflects our commitment to innovation, global reach,
            and delivering impactful digital solutions for businesses
            worldwide.
          </p>
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

