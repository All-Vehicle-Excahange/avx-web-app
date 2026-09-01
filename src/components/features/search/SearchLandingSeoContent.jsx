import React from "react";

export default function SearchLandingSeoContent({ intro, faqItems = [] }) {
  if (!intro && faqItems.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8 md:py-10">
      {intro && (
        <div className="mb-8">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {intro}
          </p>
        </div>
      )}

      {faqItems.length > 0 && (
        <div>
          <h2 className="text-lg md:text-xl font-bold text-primary font-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm"
              >
                <summary className="cursor-pointer font-semibold text-primary list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-third ml-2 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
