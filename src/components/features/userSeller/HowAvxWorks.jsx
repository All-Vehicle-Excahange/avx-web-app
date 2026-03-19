"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    label: "Step 1",
    title: "Submit Basic Details",
    description:
      "Start by entering your vehicle's basic info — make, model, year, and asking price. Takes less than 2 minutes.",
  },
  {
    number: "02",
    label: "Step 2",
    title: "Upload Vehicle Info",
    description:
      "Add photos, mileage, condition notes, and service history. The more you share, the faster it sells.",
  },
  {
    number: "03",
    label: "Step 3",
    title: "Optional Inspection",
    description:
      "Boost buyer confidence with a third-party inspection. Completely optional, but highly recommended for faster sales.",
  },
  {
    number: "04",
    label: "Step 4",
    title: "Receive Inquiries",
    description:
      "Verified buyers reach out directly. You control who you respond to — no spam, no pressure.",
  },
  {
    number: "05",
    label: "Step 5",
    title: "Mark as Sold",
    description:
      "Once you've closed the deal, mark your listing as sold. Clean, simple, done.",
  },
];

export default function HowAvxWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative ">
      <div className="container">

        {/* heading */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Individual Seller Guide
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mt-4">
            How Selling     <span className="text-fourth/80">Works</span>
          </h2>

          <p className="mt-4 text-third max-w-lg">
            List your vehicle as an individual seller — no dealership, no middlemen.
          </p>
        </div>

        {/* top step indicators */}
        <div className="hidden lg:flex justify-between mb-10 relative">
          <div className="absolute top-6 left-0 w-full h-px bg-primary/10" />

          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="flex flex-col items-center gap-2 w-full"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-full border text-sm font-semibold transition
                ${i === activeStep
                  ? "border-primary text-primary bg-transparent   backdrop-blur-md"
                  : i < activeStep
                  ? "border-primary/20 text-primary/20   backdrop-blur-md"
                  : "border-primary/20 text-third   backdrop-blur-md"
                  

                }`}>
                {i + 1}
              </div>

              <span className={`text-[10px] tracking-widest uppercase
                ${i <= activeStep ? "text-primary" : "text-third"}`}>
                {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* active content */}
        <div className="border border-primary/10 rounded-xl p-8 md:p-10 ">
          <div className="flex items-start justify-between gap-6 flex-wrap md:flex-nowrap">

            {/* left content */}
            <div className="flex gap-6">
              <span className="text-6xl font-bold text-primary/20">
                {steps[activeStep].number}
              </span>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  {steps[activeStep].title}
                </h3>

                <p className="text-third max-w-xl leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>

            {/* arrows */}
        <div className="flex gap-3 shrink-0">

  {/* prev */}
  <button
    onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
    disabled={activeStep === 0}
    className="w-10 h-10 flex items-center justify-center rounded-full
    border border-primary/40 text-primary/60
    hover:text-primary hover:border-primary/30 
    disabled:opacity-70 transition"
  >
    ‹
  </button>

  {/* next */}
  <button
    onClick={() =>
      setActiveStep((p) => Math.min(steps.length - 1, p + 1))
    }
    disabled={activeStep === steps.length - 1}
    className="w-10 h-10 flex items-center justify-center rounded-full
    border border-primary text-primary
     hover:border-third
    disabled:opacity-30 transition"
  >
    ›
  </button>

</div>

          </div>

          {/* progress */}
          <div className="flex gap-2 mt-6">
            {steps.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-0.5 cursor-pointer transition-all
                  ${i === activeStep
                    ? "flex-3 bg-primary"
                    : i < activeStep
                    ? "flex-1 bg-primary/40"
                    : "flex-1 bg-primary/10"
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}