"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Structured Verification Framework",
    highlight: "Verification",
    desc: "AVX maintains a layered verification process designed to ensure consultants meet identity, operational, and documentation standards before becoming visible to buyers.",
    span: "lg:row-span-5",
    image: "/verification.jpg",
    big: true,
  },
  {
    title: "Business Address Confirmation",
    highlight: "Address",
    desc: "Registered business locations are verified to ensure operational legitimacy.",
    span: "lg:row-span-3",
    image: "/business-address.jpg",
  },
  {
    title: "Contact Validation",
    highlight: "Validation",
    desc: "Communication channels are authenticated for reliable interaction.",
    span: "lg:row-span-2",
    image: "/contact-validation.webp",
  },
  {
    title: "Documentation Submission",
    highlight: "Documentation",
    desc: "Required compliance and business documents are reviewed before activation.",
    span: "lg:row-span-3",
    image: "/document-confirm.jpg",
  },
  {
    title: "Identity Verification",
    highlight: "Identity",
    desc: "Consultants complete credential validation to confirm identity.",
    span: "lg:row-span-2",
    image: "/identity-varification.png",
  },
];

function HighlightedTitle({ title, highlight, big }) {
  if (!highlight || !title.includes(highlight)) {
    return (
      <h3 className={`font-semibold text-primary mb-2 ${big ? "text-lg" : "text-[20px]"}`}>
        {title}
      </h3>
    );
  }

  const parts = title.split(highlight);

  return (
    <h3 className={`font-semibold text-primary mb-2 ${big ? "text-lg" : "text-[20px]"}`}>
      {parts[0]}
      <span className="text-fourth">
        {highlight}
      </span>
      {parts[1]}
    </h3>
  );
}

export default function SellerVerification() {
  return (
    <section className="py-10 relative overflow-hidden">

      <div className="w-full mx-auto ">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4 block">
            Seller Verification
          </span>

          <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
            Verified{" "}
            <span className="text-fourth">
              Consultant Participation
            </span>
          </h2>

          <p className="mt-5 text-third text-[15px] leading-relaxed">
            Consultants on AVX undergo structured verification checks to reduce
            anonymous listings and improve accountability across the marketplace.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[300]">

          {cards.map((card, i) => (
            <motion.div
              key={i}
              className={`${card.span} relative rounded-2xl overflow-hidden border border-[#1f2937] hover:cursor-pointer group hover:shadow-[0_10px_40px_-10px_rgba(250,250,250,0.25)]`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              {/* IMAGE */}
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                // style={{ filter: "grayscale(30%) brightness(0.9) contrast(1.05)" }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-[#0b0f17]/70 group-hover:bg-[#0b0f17]/60  transition-colors duration-300" />

              {/* CONTENT */}
              <div className="relative p-6 flex flex-col h-full">

                <HighlightedTitle
                  title={card.title}
                  highlight={card.highlight}
                  big={card.big}
                />

                <p className="text-third text-[15px] leading-relaxed">
                  {card.desc}
                </p>

                {card.big && (
                  <>
                    <div className="mt-auto h-px bg-linear-to-r from-fourth/40 via-[#1f2937] to-transparent" />
                    <p className="text-primary text-[13px] mt-4">
                      This helps reduce anonymous listings and improves accountability.
                    </p>
                  </>
                )}
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}