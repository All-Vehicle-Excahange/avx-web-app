"use client";

import {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  Star,
} from "lucide-react";

const data = {
  heroTitle: `Why Choose Adarsh`,
  heroDescription: ` Buyers trust Adarsh Auto Consultants for transparent communication,reliable vehicle options, and a smooth buying experience.`,
  storyTitle: `Experience`,
  storyText: `
    For over 12 years, Adarsh Auto Consultants has been helping buyers
    discover reliable vehicles across Gujarat.

    Our goal is to maintain a diverse vehicle inventory and provide
    accurate information so buyers can make confident decisions when
    purchasing their next vehicle.
  `,
  selectionTitle: `Our Approach to`,
  selectionDescription: `
            Every vehicle listed through our storefront goes through a basic
            internal evaluation before being presented to buyers.

            This helps ensure that vehicles listed are suitable for serious buyers
            and provides a smoother vehicle buying experience.
          `,

  processTitle: `How Buying`,
  processDescription: `Buying a vehicle through our storefront is designed to be simple,
              transparent, and convenient — so you can move forward with
              clarity, not confusion.`,
  processSteps: [
    {
      title: "Discover Vehicles",
      description:
        "Browse our inventory and shortlist vehicles that match your requirements.",
      icon: Search,
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: MessageCircle,
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: ShieldCheck,
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: Handshake,
    },
  ],
  inspectionTitle: `AVX Inspection`,
  inspectionText: `AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.`,
  inspectionPoints: [
    "Exterior condition check",
    "Interior condition check",
    "Visible mechanical components",
    "Photo & video documentation",
  ],
  commitmentTitle: `Our`,
  commitmentText: `
   Our goal is to maintain transparent communication and assist
              buyers throughout the vehicle discovery and purchase process. We
              aim to provide honest guidance and reliable information for every
              buyer.`,
  testimonialsTitle: "Customer",
  testimonials: [
    {
      name: "Rahul Patel",
      review:
        "Great experience buying my car here. The team explained everything clearly and helped me through the entire process.",
    },
    {
      name: "Amit Shah",
      review:
        "Transparent communication and good vehicle options. I appreciated the AVX inspection support.",
    },
  ],
};

function HeroSection() {
  return (
    <>
      <section className="relative container w-full overflow-hidden flex items-center min-h-fit py-12 md:py-36">
        <div className="container relative">
          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Trusted Auto Consultants
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]"
          >
            {data.heroTitle}
            <span className="text-fourth/80"> Auto Consultants</span>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins]">
            {data.heroDescription}
          </p>
        </div>
      </section>

      <section className="w-full py-12  bg-primary border-y border-secondary/10">
        <div className="w-full max-w-[1480px]   mx-auto px-4 sm:px-6 flex flex-col gap-6 ">
          {/* HEADER */}
          <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
            Consultant Story
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
            Our <span className="text-fourth">{data.storyTitle}</span>
          </h2>

          {/* TEXT */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {data.storyText
              .trim()
              .split("\n\n")
              .map((para, i) => (
                <p
                  key={i}
                  className="text-secondary/80 font-[Poppins] leading-relaxed text-sm sm:text-base md:text-lg"
                >
                  {para.trim()}
                </p>
              ))}
          </div>
        </div>
      </section>

      <section className="container w-full py-12">
        <div className="max-w-7xl mx-4 flex flex-col gap-8">
          {/* ── HEADER ───────────────── */}
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
            Our Standards
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            {data.selectionTitle}
            <span className="text-fourth/80">Vehicle Selection</span>
          </h2>

          {/* ── DESCRIPTION ───────────────── */}
          <div className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5">
            {data.selectionDescription
              .trim()
              .split("\n\n")
              .map((para, i) => (
                <p
                  key={i}
                  className="text-third text-lg font-[Poppins] leading-relaxed"
                >
                  {para.trim()}
                </p>
              ))}
          </div>
        </div>
      </section>

      <section className="container w-full py-12 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:gap-16">
          {/* HEADER */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xl md:max-w-2xl">
            <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Simple Process
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              {data.processTitle} <span className="text-fourth/80">Works</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-third leading-relaxed font-[Poppins]">
              {data.processDescription}
            </p>
          </div>

          {/* STEPS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {data.processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col gap-3 md:gap-4 p-5 sm:p-6 md:p-6 lg:p-8 border border-primary/20 rounded-xl md:rounded-2xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* ICON */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center border border-primary/20 rounded-lg">
                      <Icon className="text-primary" size={18} />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-base sm:text-lg font-semibold text-primary font-[Montserrat] leading-snug">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm md:text-[15px] text-third/70 leading-relaxed font-[Poppins]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className=" container w-full py-12">
        <div className="max-w-7xl mx-4 grid md:grid-cols-2 gap-12">
          {/* ── LEFT SIDE ───────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Independent Verification
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.inspectionTitle}{" "}
              <span className="text-fourth/80">Assurance</span>
            </h2>

            <p className="text-third text-lg font-[Poppins] leading-relaxed">
              {data.inspectionText}
            </p>
          </div>

          {/* ── RIGHT SIDE (FILLED CLEANLY) ───────────────── */}
          <div className="flex flex-col gap-4">
            {data.inspectionPoints.map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 border border-third/10 rounded-lg"
              >
                <CheckCircle2 className="text-primary mt-1" size={16} />

                <p className="text-third font-[Poppins] leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container w-full py-12">
        <div className="max-w-7xl mx-4 flex justify-center">
          {/* ── CENTER BLOCK ───────────────── */}
          <div className="max-w-2xl text-center flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Our Promise
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.commitmentTitle}{" "}
              <span className="text-fourth/80">Commitment</span>
            </h2>

            {/* subtle divider */}
            <div className="w-12 h-px bg-primary/40 mx-auto" />

            <p className="text-third text-lg font-[Poppins] leading-relaxed">
              {data.commitmentText}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-primary px-4">
        <div className=" container max-w-7xl mx-3 px-4 sm:px-6 flex flex-col gap-12">
          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.35em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
              Real Buyers
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.testimonialsTitle}
              <span className="text-fourth">Experience</span>
            </h2>
          </div>

          {/* TESTIMONIALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 md:p-7 rounded-xl border border-secondary/15 bg-primary flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={15} className="text-fourth" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]">
                  {t.review}
                </p>

                {/* Name */}
                <h4 className="text-secondary font-[Montserrat] font-semibold text-sm tracking-wide">
                  {t.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
