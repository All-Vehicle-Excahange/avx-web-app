import { useState } from "react";

const faqs = [
  {
    q: "Can I upgrade my subscription anytime?",
    a: "Yes — you can upgrade your plan at any time from your consultant dashboard. The new tier activates immediately and you'll only be charged the difference for the remaining billing period.",
  },
  {
    q: "Can I downgrade my subscription?",
    a: "Downgrading is not available mid-cycle. You can choose a lower tier at renewal — the change will take effect at the start of your next billing period.",
  },
  {
    q: "What happens if my subscription expires?",
    a: "If your subscription lapses, your storefront and all active listings will be hidden from the marketplace immediately. No data is lost — everything is restored as soon as you renew.",
  },
  {
    q: "Is the AVX inspection mandatory?",
    a: "No, inspection is optional. However, vehicles with verified inspection badges consistently rank higher in search and attract more serious buyers. We recommend it for competitive listings.",
  },
  {
    q: "Are transactions processed through AVX?",
    a: "No. AVX is a visibility and connection platform — all payments, negotiations, and transactions happen directly between you and the buyer. We never sit in the middle of your money.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-10 md:py-10 overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 md:px-6">
        {/* HEADER */}
        <h2 className="text-center text-[36px] sm:text-[48px] md:text-[58px] font-bold leading-tight mb-14 md:mb-16">
          Frequently asked{" "}
          <span className="bg-fourth bg-clip-text text-transparent">
            questions
          </span>
        </h2>

        {/* ACCORDION */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="rounded-2xl bg-transparent border border-primary/15 overflow-hidden "
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-6 px-7 py-6 text-left group hover:cursor-pointer"
                >
                  <span className="text-[15px] md:text-[16px] font-medium text-primary leading-snug transition-colors duration-150">
                    {faq.q}
                  </span>

                  {/* animated +/- sign */}
                  <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
                    {/* horizontal bar — always visible */}
                    <div className="absolute w-[14] h-[1.5] bg-primary rounded-full" />

                    {/* vertical bar — rotates out when open */}
                    <div
                      className={`absolute w-[1.5px] h-[14] bg-primary rounded-full transition-all duration-300 ease-in-out ${
                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      }`}
                    />
                  </div>
                </button>

                {/* answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-[14px] text-primary/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
