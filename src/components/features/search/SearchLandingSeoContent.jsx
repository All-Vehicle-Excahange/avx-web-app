import React, { useState } from "react";
import Link from "next/link";
import { formatVehicleListingLine } from "@/lib/searchLandingSeo";

export default function SearchLandingSeoContent({
  intro,
  faqItems = [],
  vehicles = [],
  cityName = "",
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const topVehicles = (vehicles || []).slice(0, 8);

  if (!intro && faqItems.length === 0 && topVehicles.length === 0) return null;

  return (
    <section className="container mx-auto px-4 md:px-8 py-10 md:py-14">
      {intro && (
        <div className="mb-10">
          <p className="text-sm text-primary/80 leading-relaxed font-medium">
            {intro}
          </p>
        </div>
      )}

      {topVehicles.length > 0 && (
        <div className="mb-10">
          <h2 className="text-base md:text-lg font-bold text-primary font-primary mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-fourth rounded-full inline-block"></span>
            Featured listings{cityName ? ` in ${cityName}` : ""}
          </h2>
          <ul className="space-y-2 text-sm text-primary/85">
            {topVehicles.map((v) => {
              const href =
                v.slug && v.id
                  ? `/vehicle/details/${v.slug}/${v.id}`
                  : `/vehicle/details/${v.id}`;
              return (
                <li key={`seo-${v.id || href}`}>
                  <Link href={href} className="hover:text-fourth font-medium">
                    {formatVehicleListingLine(v)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {faqItems.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-bold text-primary font-primary mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-fourth rounded-full inline-block"></span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-2.5">
            {faqItems.map((item, idx) => (
              <details
                key={idx}
                open={openIndex === idx}
                className="group rounded-2xl border border-primary/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-primary/30 open:bg-white/10 open:border-primary/30 overflow-hidden"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIndex(openIndex === idx ? null : idx);
                  }}
                  className="cursor-pointer font-semibold text-primary group-open:text-fourth transition-colors list-none flex justify-between items-center text-sm md:text-base px-5 py-3.5 w-full"
                >
                  {item.question}
                  <span className="text-fourth ml-4 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 bg-fourth/20 p-1.5 rounded-full">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 border-t border-primary/10 pt-3">
                  <p className="text-sm md:text-base text-primary/80 leading-relaxed font-medium">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
