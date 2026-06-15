import React from "react";

const features = [
  {
    id: "01",
    title: "For buyers",
    desc: "Confidence shouldn't be optional. Every buyer deserves to know who they're dealing with, what they're buying, what an independent inspection reveals, and what their options are if something goes wrong. We build for that clarity.",
  },
  {
    id: "02",
    title: "For consultants",
    desc: "Growth shouldn't depend on who you know. The best consultants in India's used vehicle market are often invisible online. Reecomm gives them a professional identity, a structured storefront, and tools to make their expertise visible and scalable.",
  },
  {
    id: "03",
    title: "For the market",
    desc: "Structure creates scale. An organized, accountable marketplace benefits everyone — buyers make better decisions, consultants build real businesses, and the industry earns the trust it needs to grow.",
  },
];

export default function WhyAvxDifferent() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className=" mb-28">
          <p className="mb-6 text-sm tracking-[0.4em] uppercase text-third font-semibold ">
            What We Believe
          </p>

          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
          >
            Trust is infrastructure,
            <br />
            <span className="text-fourth/80"> not a feature</span>
          </h2>

          <p className="mt-8 text-xl text-third  leading-relaxed">
            Every decision we make at Reecomm comes back to one question: does
            this build trust — for buyers, for consultants, and for the market?
          </p>
        </div>

        {/* Feature Strips */}
        <div className="space-y-24">
          {features.map((item, index) => {
            const isLeftContent = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col ${
                  isLeftContent ? "md:flex-row" : "md:flex-row-reverse"
                } gap-16 items-center`}
              >
                {/* Number */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 text-[10rem] font-bold select-none pointer-events-none transition-colors duration-300
          ${isLeftContent ? "md:right-0 md:left-auto" : "md:left-0 md:right-auto"}
          text-primary/15 group-hover:text-primary/30`}
                >
                  {item.id}
                </div>

                {/* Content */}
                <div className="relative max-w-xl border rounded-2xl border-transparent p-6 transition-colors duration-300 group-hover:border-primary/20">
                  <h3 className="text-2xl md:text-3xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg w-6xl text-third leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
