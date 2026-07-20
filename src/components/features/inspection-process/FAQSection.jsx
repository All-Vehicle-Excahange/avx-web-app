"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(2);

  const faqs = [
    {
      q: "What does the Reecomm inspection report include?",
      a: "The report includes a 150+ point evaluation covering engine health, transmission, suspension, brake wear, electrical systems, body panels, exterior paint depth, interior cabin quality, and an on-road test summary.",
    },
    {
      q: "Who performs the vehicle inspections?",
      a: "Inspections are performed by certified, independent Reecomm inspectors with extensive training in automotive mechanics and diagnostics. They use digital tools and standardized templates to guarantee objective reports.",
    },
    {
      q: "How long does a vehicle inspection take?",
      a: "A standard comprehensive inspection takes between 45 to 60 minutes, depending on the vehicle class, condition, and configuration.",
    },
    {
      q: "Can I inspect the vehicle before buying?",
      a: "Yes. The Reecomm report is a resource to help you verify condition before making an offer. We strongly encourage buyers to review the digital report, schedule a call with the consultant, and view the vehicle in person.",
    },
    {
      q: "Are the reports updated if a repair is completed?",
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
              <Image src="/FAQ2.jpeg" loading="lazy" alt="Frequently asked questions illustration" width={800} height={500} className="
                  w-full h-auto object-contain
                  rounded-xl
                  shadow-lg
                " />
            </div>

            {/* RIGHT FAQ */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-4 leading-tight">
                Frequently Asked Questions
              </h2>

            <p className="text-third mb-10 max-w-xl mx-auto text-sm sm:text-base">
              Quick answers to the most common questions about inspections and
              reports.
            </p>

            <div className="space-y-4 text-left">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i;

                return (
                  <div
                    key={i}
                    className={`
                      rounded-xl
                      border border-primary/10
                      bg-primary/2
                      transition-all duration-300 ease-in-out
                      hover:border-primary/20 
                      
                      ${isOpen ? "shadow-md bg-primary/4" : ""}
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
                            border border-primary/20
                            transition-transform duration-300
                            hover:bg-fourth text-primary
                            ${isOpen
                              ? "bg-fourth border-fourth text-primary"
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
