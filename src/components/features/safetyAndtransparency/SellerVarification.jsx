"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Phone,
  FileText,
  BadgeCheck
} from "lucide-react";

const cards = [
  {
    title: "Structured Verification Framework",
    highlight: "Verification",
    desc: "AVX maintains a layered verification process designed to ensure consultants meet identity, operational, and documentation standards before becoming visible to buyers.",
    span: "lg:row-span-5",
    icon: ShieldCheck,
    big: true,
  },
  {
    title: "Business Address Confirmation",
    highlight: "Address",
    desc: "Registered business locations are verified to ensure operational legitimacy.",
    span: "lg:row-span-3",
    icon: MapPin,
  },
  {
    title: "Contact Validation",
    highlight: "Validation",
    desc: "Communication channels are authenticated for reliable interaction.",
    span: "lg:row-span-2",
    icon: Phone,
  },
  {
    title: "Documentation Submission",
    highlight: "Documentation",
    desc: "Required compliance and business documents are reviewed before activation.",
    span: "lg:row-span-3",
    icon: FileText,
  },
  {
    title: "Identity Verification",
    highlight: "Identity",
    desc: "Consultants complete credential validation to confirm identity.",
    span: "lg:row-span-2",
    icon: BadgeCheck,
  },
];

function HighlightedTitle({ title, highlight, big, Icon }) {

  const parts = title.split(highlight);

  return (
    <div className="flex items-start gap-3 mb-2">

      {/* ICON */}
      <Icon className="w-5 h-5 text-primary mt-[3px]" />

      {/* TITLE */}
      <h3 className={`font-semibold text-primary ${big ? "text-lg" : "text-[20px]"}`}>
        {parts[0]}
        <span className="text-primary/90">{highlight}</span>
        {parts[1]}
      </h3>

    </div>
  );
}

export default function SellerVerification() {
  return (
    <section className="py-10 relative overflow-hidden ">

      <div className="w-full mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Seller Verification
          </span>

          <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] mt-2 text-primary">
            Verified{" "}
            <span className="text-fourth/80">
              Consultant Participation
            </span>
          </h2>

          <p className="mt-5 text-third text-[15px] leading-relaxed w-full md:w-[50%]">
            Consultants on AVX undergo structured verification checks to reduce
            anonymous listings and improve accountability across the marketplace.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={i}
                className={`${card.span} relative rounded-2xl border border-primary/20 p-6 
                 
                hover:border-primary/30
                hover:shadow-[0_10px_40px_-10px_rgba(250,250,250,0.08)]
                transition-all duration-300`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
              >

                <HighlightedTitle
                  title={card.title}
                  highlight={card.highlight}
                  big={card.big}
                  Icon={Icon}
                />

                <p className="text-third text-[15px] leading-relaxed">
                  {card.desc}
                </p>

                {card.big && (
                  <>
                    <div className="mt-6 h-px bg-linear-to-r from-primary/40  " />
                    <p className="text-primary text-[15px] mt-4">
                This framework strengthens marketplace credibility by ensuring that only verified and accountable consultants participate.
                    </p>
                  </>
                )}

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}