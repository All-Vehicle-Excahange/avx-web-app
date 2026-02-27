"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react"; // Fixed the import here

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(2);

  const faqs = [
    {
      q: "Is inspection mandatory?",
      a: "No. It is optional but recommended.",
    },
    {
      q: "Who pays for inspection?",
      a: "The party requesting inspection.",
    },
    {
      q: "How long does inspection take?",
      a: "Typically 24–72 hours depending on city.",
    },
    {
      q: "Can I see inspection before contacting seller?",
      a: "Yes, if already available on listing.",
    },
    {
      q: "Can inspection be edited?",
      a: "No. Reports are locked after publication.",
    },
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section>
      <div className="relative pt-14 pb-10 lg:pt-10 overflow-hidden">
        <div className="w-full mx-auto">
          {/* Changed items-center to items-start so the image stays put when height changes */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* LEFT IMAGE */}
            <div className="lg:col-span-5 lg:sticky lg:top-10">
              <img
                src="/FAQ2.jpeg"
                alt="Frequently asked questions illustration"
                className="
                  w-full h-auto object-contain
                  rounded-xl
                  shadow-lg
                "
              />
            </div>

            {/* RIGHT FAQ */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-4 leading-tight">
                Frequently Asked Questions
              </h2>

              <p className="text-third mb-10 max-w-xl text-sm sm:text-base">
                Quick answers to the most common questions about inspections and reports.
              </p>

              <div className="space-y-4 h-120.25 overflow-hidden">
                {faqs.map((item, i) => {
                  const isOpen = openIndex === i;

                  return (
                    <div
                      key={i}
                      className={`
                        rounded-xl
                        border border-white/10
                        bg-white/2
                        transition-all duration-300 ease-in-out
                        hover:border-white/20 
                        
                        ${isOpen ? "shadow-md bg-white/4" : ""}
                      `}
                    >
                      {/* QUESTION */}
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
                      >
                        <span className="text-base sm:text-lg font-medium text-primary  pr-4  ">
                          {item.q}
                        </span>

                        <div
                          className={`
                            flex items-center justify-center
                            w-8 h-8 rounded-full
                            border border-white/20
                            transition-transform duration-300
                            hover:bg-fourth text-white
                            ${
                              isOpen
                                ? "bg-fourth border-fourth text-white"
                                : "text-third"
                            }
                          `}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {/* ANSWER - CSS Grid transition to prevent jumping */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen 
                            ? "grid-rows-[1fr] opacity-100" 
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-6 text-sm sm:text-[15px] text-third leading-relaxed">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}