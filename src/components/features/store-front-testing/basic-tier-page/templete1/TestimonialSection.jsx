"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Patel",
    review:
      "Great experience buying my car here. The team explained everything clearly and helped me through the entire process.",
  },
  {
    name: "Amit Shah",
    review:
      "Transparent communication and good vehicle options. I appreciated the AVX inspection support.",
  },
];

function TestimonialSection() {
  return (
    <section className="w-full py-12 bg-primary ">
      <div className=" container max-w-7xl mx-3 px-4 sm:px-6 flex flex-col gap-12">

        {/* HEADER */}
        <div className="flex flex-col gap-4 max-w-2xl">

          <p className="text-sm tracking-[0.35em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
            Real Buyers
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
            Customer <span className="text-fourth">Experience</span>
          </h2>

        </div>

        {/* TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 md:p-7 rounded-xl border border-secondary/15 bg-primary flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={15} className="text-fourth" />
                ))}
              </div>

              {/* Review */}
              <p className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]">
                {t.review}
              </p>

              {/* Name */}
              <h4 className="text-secondary font-[Montserrat] font-semibold text-sm tracking-wide">
                {t.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;