"use client";

import { motion } from "framer-motion";

const data = {
  /* ================= HERO ================= */
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
    </p>
  `,
  heroImages: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop",
  ],
};

export default function AboutHero() {
  return (
    <section className="py-14 lg:py-24 px-5 lg:px-10 overflow-hidden">

      {/* ── HEADER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end mb-10 lg:mb-14">

        <motion.h1
          className="font-[Montserrat] font-semibold text-primary leading-[1.08]"
          style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[11px] tracking-[0.5em] uppercase font-bold text-fourth mb-5">
            About Us
          </span>
          Our Story Built for{" "}
          <span className="text-fourth/80">Buy &amp; Selling</span>{" "}
          a Vehicle
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          <div className="w-8 h-px bg-fourth/50" />
          <div
            className="font-[Poppins] text-[14.5px] text-third/65 leading-[1.95]"
            dangerouslySetInnerHTML={{ __html: data.heroDesc }}
          />
        </motion.div>

      </div>

      {/* ── IMAGE GRID ── */}
      {/*
          Desktop layout:
          [ IMAGE 1 — tall, spans 2 rows ]  [ IMAGE 2 — top right    ]
                                            [ IMAGE 3 — bottom right ]
      */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] grid-rows-1 lg:grid-rows-[270px_270px] gap-3"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* IMAGE 1 — spans both rows on desktop */}
        <div className="relative lg:row-span-2 rounded-2xl overflow-hidden h-72 lg:h-full group">
          <img
            src={data.heroImages[0]}
            alt="Our story"
            className="w-full h-full object-cover object-center transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/65 via-transparent to-transparent" />
        </div>

        {/* IMAGE 2 — top right */}
        <div className="relative rounded-2xl overflow-hidden h-64 lg:h-full group">
          <img
            src={data.heroImages[1]}
            alt="Our fleet"
            className="w-full h-full object-cover object-center transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/55 to-transparent" />
        </div>

        {/* IMAGE 3 — bottom right */}
        <div className="relative rounded-2xl overflow-hidden h-64 lg:h-full group">
          <img
            src={data.heroImages[2]}
            alt="Our team"
            className="w-full h-full object-cover object-center transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/55 to-transparent" />
        </div>

      </motion.div>

    </section>
  );
}