"use client";

import { ShieldCheck, Globe, TrendingUp, Cpu, Target, Eye } from "lucide-react";

const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu, Target, Eye };

const data = {
  /* ── HERO ── */
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
  `,
  heroImages: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop",
  ],
  heroVideo: "/store-front-template2.mp4",

  /* ── MISSION & VISION ── */
  missionTitle: "Our Mission",
  missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  missionImage:
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format",

  visionTitle: "Our Vision",
  visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  visionImage:
    "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format",

  /* ── STATS ── */
  statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+", label: "Transactions Processed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "100+", label: "Team Members" },
  ],

  /* ── SERVICES ── */
  servicesTitle: "What We Do",
  servicesDesc: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
  services: [
    {
      icon: "ShieldCheck",
      title: "Secure Payments",
      desc: "PCI-DSS compliant global payment systems.",
    },
    {
      icon: "Globe",
      title: "Global Infrastructure",
      desc: "99.99% uptime cloud deployment in 12 regions.",
    },
    {
      icon: "TrendingUp",
      title: "Growth Tools",
      desc: "Smart CRM, analytics and automation funnels.",
    },
    {
      icon: "Cpu",
      title: "AI Optimization",
      desc: "AI powered performance & conversion engines.",
    },
  ],
};


const EyeBrow = ({ children }) => (
  <p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </p>
);

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;

const missionVisionCards = [
  {
    tag: "01",
    icon: "Target",
    prefix: "Our",
    keyword: "Mission",
    desc: data.missionDesc,
    image: data.missionImage,
    flip: false,
  },
  {
    tag: "02",
    icon: "Eye",
    prefix: "Our",
    keyword: "Vision",
    desc: data.visionDesc,
    image: data.visionImage,
    flip: true,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section className="relative px-2 lg:px-4 overflow-hidden">
        {/* BACKGROUND VIDEO */}
        <div className="absolute inset-0 h-screen">
          <video
            src={data.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container relative z-10 h-screen flex items-center">
          {/* content (CENTERED container, LEFT text) */}
          <div className="w-full flex justify-center">
            <div className="flex flex-col gap-6 max-w-2xl text-left">
              <div className="flex flex-col gap-6">
                <EyeBrow>About Us</EyeBrow>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[Montserrat] font-bold text-white leading-[1.02]">
                  Our Story Built for{" "}
                  <span className="text-fourth">Buy &amp; Selling</span> a
                  Vehicle
                </h1>

                <div className="w-12 h-0.5 bg-fourth" />
              </div>

              {/* description */}
              <div>
                <div className="font-[Poppins] text-[14.5px] text-white/80 leading-[1.9]">
                  <p>{data.heroDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          MISSION & VISION
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="">
            {/* heading row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
              <div>
                <EyeBrow>What Drives Us</EyeBrow>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] text-primary font-[Montserrat]">
                  Mission &amp; <span className="text-fourth">Vision</span>
                </h2>
              </div>

              <div className="max-w-md">
                <Divider />
                <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins] mt-4">
                  The principles behind everything we build and every decision
                  we make.
                </p>
              </div>
            </div>

            {/* cards */}
            <div className="flex flex-col gap-16">
              {missionVisionCards.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={item.tag}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative
              ${item.flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
                  >
                    {/* IMAGE */}
                    <div className="relative group">
                      <div className="relative rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
                        <img
                          src={item.image}
                          alt={item.keyword}
                          className="w-full h-80 lg:h-[380px] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-6 relative">
                      {/* big background number */}
                      <span className="absolute -top-10 left-0 text-[120px] font-bold text-primary/5 leading-none select-none">
                        {item.tag === "Mission" ? "01" : "02"}
                      </span>

                      <h3 className="text-3xl lg:text-4xl font-semibold font-[Montserrat] leading-[1.05] relative z-10">
                        <span className="text-primary">{item.prefix} </span>
                        <span className="text-fourth">{item.keyword}</span>
                      </h3>

                      <div className="w-10 h-0.5 bg-fourth/60" />

                      <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins] max-w-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS
          ════════════════════════════════════════ */}
      <section className="py-12">
        <div className="relative  overflow-hidden bg-fourth/95 border border-primary/10 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
          {/* subtle glow background */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
          <div className="px-2 lg:px-4">
            <div className="container">
              {/* ── TOP ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 border-b border-primary/10 relative z-10">
                {/* left */}
                <div className="flex flex-col justify-center gap-6">
                  <EyeBrow>By The Numbers</EyeBrow>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[Montserrat] font-bold text-primary leading-[1.02]">
                    Our Growth{" "}
                    <span className="text-secondary">in Numbers</span>
                  </h2>

                  <div className="w-12 h-0.5 bg-primary/40" />
                </div>

                {/* right */}
                <div className="flex flex-col justify-center max-w-md">
                  <div className="font-[Poppins] text-[14.5px] text-primary/70 leading-[1.9]">
                    <p>{data.statsDesc}</p>
                  </div>
                </div>
              </div>

              {/* ── STATS ── */}
              <div className="grid grid-cols-2 lg:grid-cols-4 relative z-10">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="group relative  py-5 border-primary/10 border-r border-b lg:border-b-0 last:border-r-0 overflow-hidden"
                  >
                    {/* background hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/10 via-transparent to-transparent" />

                    {/* large ghost number */}
                    <span className="absolute -top-2 right-6 text-[80px] font-bold text-primary/5 leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* stat number */}
                    <span
                      className="relative font-[Montserrat] font-bold text-primary leading-none tracking-tight transition-transform duration-300 group-hover:scale-110"
                      style={{ fontSize: "clamp(34px, 3.5vw, 48px)" }}
                    >
                      {stat.number}
                    </span>

                    {/* underline accent */}
                    <div className="mt-3 w-8 h-0.5 bg-primary/30 group-hover:w-14 transition-all duration-300" />

                    {/* label */}
                    <span className="block mt-2 font-[Poppins] text-[11px] text-primary/55 uppercase tracking-[0.25em] font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 overflow-hidden">
        <div className="container">
          {/* heading */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
            <div className="flex flex-col gap-5">
              <EyeBrow>Services</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[Montserrat] font-bold text-primary leading-[1.02]">
                What We <span className="text-fourth">Do</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p className="font-[Poppins] text-[14.5px] text-third/70 leading-[1.9]">
                {data.servicesDesc}
              </p>
            </div>
          </div>

          {/* cards row */}
          <div className="flex flex-col lg:flex-row gap-4 lg:h-60">
            {data.services.map((svc, i) => {
              const Icon = iconMap[svc.icon];

              return (
                <div
                  key={i}
                  className="group relative w-full lg:flex-1 lg:hover:flex-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-2xl overflow-hidden cursor-pointer h-[200px] lg:h-auto"
                >
                  {/* background */}
                  <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/20 to-black/40 lg:group-hover:from-black/20 transition duration-500" />

                  {/* content wrapper */}
                  <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                    {/* icon */}
                    <div className="absolute top-5 left-5 lg:top-6 lg:left-6 w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 lg:group-hover:scale-110 transition duration-300">
                      <Icon
                        size={18}
                        className="lg:group-hover:text-fourth text-primary"
                      />
                    </div>

                    {/* content */}
                    <div className="opacity-100 lg:opacity-0 lg:translate-y-10 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-fourth font-[Montserrat] text-[18px] lg:text-[22px] font-semibold mb-2 lg:mb-3">
                        {svc.title}
                      </h3>

                      <div className="w-8 lg:w-10 h-0.5 bg-white/60 mb-2 lg:mb-3 lg:group-hover:w-16 transition-all duration-300" />

                      <p className="text-white/80 text-[13px] lg:text-[14px] leading-[1.7] lg:leading-[1.8] max-w-sm">
                        {svc.desc}
                      </p>
                    </div>

                    {/* ghost number */}
                    <span className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 text-[50px] lg:text-[80px] font-bold text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
