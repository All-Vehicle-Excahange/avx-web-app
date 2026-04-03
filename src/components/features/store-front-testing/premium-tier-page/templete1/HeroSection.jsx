"use client";

import {
  ArrowRight,
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  Star
} from "lucide-react";

import { useState, useEffect, useRef, useCallback } from "react";

export default function FullPage() {

  const data = {

    /* ───────── HERO ───────── */
      heroTitle: "Why Choose Adarsh Auto Consultants",
      heroDescription: `
    Buyers trust Adarsh Auto Consultants for transparent communication,
    reliable vehicle options, and a smooth buying experience. Our goal
    is to help every buyer make confident vehicle decisions with clear
    information and professional support.
  `,
    heroVideo: "/store-front-template-1.mp4",
    galleryImage: [
      { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80" },
      { src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80" },
      { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80" },
    ],

    /* ───────── EXPERIENCE ───────── */
      storyText: `
      For over 12 years, Adarsh Auto Consultants has been helping buyers
      discover reliable vehicles across Gujarat.

      Our goal is to maintain a diverse vehicle inventory and provide
      accurate information so buyers can make confident decisions when
      purchasing their next vehicle.
    `,
      storyImages: [
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      ],

    /* ───────── SELECTION ───────── */
      selectionTitle: "Our Approach to Vehicle Selection",
      selectionDescription: `
      Every vehicle listed through our storefront goes through a basic
      internal evaluation before being presented to buyers. This helps
      ensure that vehicles listed are suitable for serious buyers and
      provides a smoother vehicle buying experience.
    `,
      selectionImages: [
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200",
        "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200",
      ],

    /* ───────── PROCESS ───────── */
    processTitle: "How Buying Works",
      processDescription: `
        Buying a vehicle through our storefront is designed to be simple,
        transparent, and convenient for buyers.
      `,
    steps: [
      {
        title: "Discover Vehicles",
        description:
          "Browse our inventory and shortlist vehicles that match your requirements.",
        icon: Search,
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Connect With Our Team",
        description:
          "Use AVX chat to discuss vehicle condition, pricing, and availability.",
        icon: MessageCircle,
        image:
          "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "AVX Inspection Option",
        description:
          "Buyers can request AVX inspection to receive an independent condition report.",
        icon: ShieldCheck,
        image:
          "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Decision & Purchase",
        description:
          "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
        icon: Handshake,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      },
    ],

    /* ───────── INSPECTION ───────── */
      inspectionTitle: "AVX Inspection Assurance",
      inspectionText: `
      AVX inspection services provide additional transparency by documenting
      key aspects of the vehicle's condition before purchase.
    `,
      inspectionPoints: [
        "Exterior condition check",
        "Interior condition check",
        "Visible mechanical components",
        "Photo & video documentation",
      ],
      inspectionImages: [
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      ],

    /* ───────── GALLERY ───────── */
    galleryImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
    ],

    commitmentTitle: "Customer Commitment",
    commitmentText: `
      Our goal is to maintain transparent communication and assist buyers
      throughout the vehicle discovery and purchase process. We aim to
      provide honest guidance and reliable information for every buyer.
    `,
    commitmentImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200&auto=format&fit=crop",
    ],

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

  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const rightRef = useRef(null);

  /* AUTO SCROLL (selection) */
  useEffect(() => {
    let scrollAmount = 0;
    const scroll = () => {
      if (!scrollRef.current) return;
      scrollAmount += 0.25;
      scrollRef.current.scrollLeft = scrollAmount;
      if (scrollAmount >= scrollRef.current.scrollWidth / 2) scrollAmount = 0;
      requestAnimationFrame(scroll);
    };
    scroll();
  }, []);


  const n = data.galleryImages.length;
  const animating = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);

  const mod = (v, m) => ((v % m) + m) % m;

  const goTo = useCallback((idx) => {
    if (animating.current) return;
    animating.current = true;
    setActive(mod(idx, n));
    setTimeout(() => { animating.current = false; }, 650);
  }, [n]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // AUTO SLIDE
  useEffect(() => {
    timerRef.current = setInterval(next, 2500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // TOUCH SWIPE
  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    const dist = touchStartX.current - touchEndX.current;
    if (dist > 50) next();
    else if (dist < -50) prev();
  };

  const getPosition = (i) => {
    const diff = mod(i - active, n);
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === n - 1) return "left";
    return diff < n / 2 ? "hidden-right" : "hidden-left";
  };

  const positionStyles = {
    center: "w-[60%] h-[300px] sm:h-[380px] md:h-[420px] left-1/2 -translate-x-1/2 opacity-100 scale-100 z-30 cursor-default",
    left: "hidden md:block w-[25%] h-[260px] left-0 translate-x-0 opacity-40 scale-95 z-20 cursor-pointer",
    right: "hidden md:block w-[25%] h-[260px] right-0 translate-x-0 opacity-40 scale-95 z-20 cursor-pointer",
    "hidden-left": "w-[25%] h-[260px] left-0 -translate-x-full opacity-0 scale-90 z-10",
    "hidden-right": "w-[25%] h-[260px] right-0 translate-x-full opacity-0 scale-90 z-10",
  };


  return (
    <>

      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden px-2 lg:px-4 py-12">

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Trusted Auto Consultants
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Why Choose Adarsh
              <span className="text-fourth/80"> Auto Consultants</span>
            </h2>

            <p className="text-[#a89f94] text-base md:text-lg leading-relaxed font-[Poppins] max-w-lg mb-10">
              {data.heroDescription.trim()}
            </p>

            {/* CTA */}
            <div className="mt-10">
              <a className="group inline-flex items-center gap-2 border border-primary px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:gap-4 hover:shadow-[0_0_25px_rgba(184,150,62,0.25)] font-[Montserrat]">
                See How It Works
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </a>
            </div>

          </div>

          {/* RIGHT SIDE (NOW ALWAYS VISIBLE) */}
          <div className="flex flex-col gap-5 mt-10 lg:mt-0">

            {/* VIDEO */}
            <div className="group relative rounded-2xl overflow-hidden border border-secondary/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(184,150,62,0.25)]">

              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
                src={data.heroVideo}
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c]/70 to-transparent" />
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {data.galleryImage.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden border border-secondary/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                >
                  <img
                    src={img.src}
                    className="w-full h-[110px] sm:h-[130px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c]/70 via-secondary/10 to-transparent opacity-70 group-hover:opacity-90 transition duration-300" />

                  <div className="absolute inset-0 border border-transparent group-hover:border-secondary/40 transition-all duration-300 rounded-xl" />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="w-full py-12 bg-primary border-y border-secondary/10 px-4 lg:px-8">
        <div className=" conatiner max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT (UNCHANGED) */}
          <div className="flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-secondary/70 font-semibold">
              Consultant Story
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              Our <span className="text-fourth">Experience</span>
            </h2>

            <div className="w-10 h-px bg-secondary/30" />

            {data.storyText.trim().split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg"
              >
                {para.trim()}
              </p>
            ))}
          </div>

          {/* RIGHT */}
          <div
            ref={rightRef}
            onMouseLeave={() => setHovered(null)}
            className="relative h-[500px] hidden md:block"
          >

            {data.storyImages.map((src, i) => {
              const positions = [
                "top-0 left-0 w-[68%] h-[62%]",
                "bottom-0 right-0 w-[60%] h-[58%]",
                "top-[28%] left-[22%] w-[52%] h-[44%]",
              ];

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  className={`
                  absolute ${positions[i]}
                  rounded-xl overflow-hidden
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${hovered === i ? "z-20 scale-[1.03]" : "z-10"}
                `}
                  style={{
                    transform:
                      hovered === i
                        ? "translateY(-10px) rotate(0deg)"
                        : i === 0
                          ? "rotate(-2deg)"
                          : i === 1
                            ? "rotate(2deg)"
                            : "rotate(-1deg)",
                  }}
                >
                  {/* IMAGE */}
                  <img
                    src={src}
                    alt=""
                    className={`
                    w-full h-full object-cover
                    transition-all duration-700
                    ${hovered === i ? "brightness-105 saturate-110 scale-105" : "brightness-90 saturate-90"}
                  `}
                  />

                  {/* BORDER */}
                  <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />

                  {/* OVERLAY */}
                  <div
                    className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${hovered === i ? "opacity-0" : "opacity-100"
                      }`}
                  />
                </div>
              );
            })}

            {/* YEAR BADGE */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end z-30 pointer-events-none">
              <span className="text-[52px] font-light text-white/10 leading-none tracking-tight">
                12
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                Years
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* SELECTION */}
      <section className="relative w-full py-12 overflow-hidden px-2 sm:px-4 ">
<div className="container">
        {/* 🔥 BACKGROUND IMAGE STRIP (SOFT) */}
        <div
          ref={scrollRef}
          className="  absolute inset-0 flex  overflow-hidden pointer-events-none"
        >
          {[...data.selectionImages, ...data.selectionImages].map((img, i) => (
            <div
              key={i}
              className="min-w-[350px] h-full overflow-hidden rounded-2xl opacity-[0.3]"
            >
              <img
                src={img}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          ))}
        </div>

        {/* 🔥 LEFT + RIGHT FADE (IMPORTANT PREMIUM TOUCH) */}
        <div className="absolute inset-0   " />

        {/* ── CONTENT ───────────────── */}
        <div className="relative z-20 max-w-7xl mx-auto  flex flex-col gap-10">

          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Our Standards
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Our Approach to{" "}
            <span className="text-fourth/80">Vehicle Selection</span>
          </h2>

          <div className="max-w-2xl border-l-2 border-primary/40 pl-5">
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
        </div>
      </section>

      {/* PROCESS */}
      <section className="w-full py-12 px-2 sm:px-4">
        <div className=" container max-w-7xl mx-auto  flex flex-col gap-12 lg:gap-20">

          {/* HEADER */}
          <div className="max-w-2xl flex flex-col gap-4">
            <p className="text-xs tracking-[0.5em] uppercase text-third/60 font-semibold">
              Simple Process
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
              How Buying <span className="text-fourth/80">Works</span>
            </h2>

            <p className="text-third text-sm sm:text-base lg:text-lg font-[Poppins] leading-relaxed">
              {data.processDescription}
            </p>
          </div>

          {/* MOBILE VIEW (STACKED) */}
          <div className="flex flex-col gap-6 lg:hidden">
            {data.steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <div key={i} className="relative rounded-2xl overflow-hidden">

                  <img
                    src={step.image}
                    className="w-full h-[220px] object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-white/10">
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-semibold text-white font-[Montserrat] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/80 font-[Poppins] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* DESKTOP VIEW (INTERACTIVE) */}
          <div className="hidden lg:flex h-[420px] gap-4">
            {data.steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out
                  ${isActive ? "flex-3" : "flex-1"}
                `}
                >

                  <img
                    src={step.image}
                    className={`absolute inset-0 w-full h-full object-cover transition duration-700
                    ${isActive ? "scale-105" : "scale-100 grayscale"}
                  `}
                  />

                  <div className={`absolute inset-0 transition duration-500
                  ${isActive
                      ? "bg-linear-to-t from-black/70 via-black/40 to-transparent"
                      : "bg-black/40"}
                `} />

                  <div className="relative z-10 h-full p-6 flex flex-col justify-end">

                    <div className="absolute top-6 left-6">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition
                      ${isActive ? "border-white/40 bg-white/10" : "border-white/20"}
                    `}>
                        <Icon size={18} className="text-white" />
                      </div>
                    </div>

                    <div className={`transition-all duration-500
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}>
                      <h3 className="text-lg font-semibold text-white font-[Montserrat] mb-2">
                        {step.title}
                      </h3>

                      <p className="text-sm text-white/80 font-[Poppins] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* INSPECTION */}
      <section className="w-full py-12  overflow-hidden px-2 sm:px-4">
        <div className=" container max-w-7xl mx-auto ">

          {/* ── TOP HEADER (Center-Aligned for Premium Focus) ───────────────── */}
          <div className="flex flex-col items-center text-center mb-20 gap-4">
            <p className="text-sm tracking-[0.5em] uppercase text-third font-semibold">
              Independent Verification
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat] max-w-3xl">
              AVX Inspection{" "}
              <span className="text-fourth/80">Assurance</span>
            </h2>
            <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* ── LEFT: DYNAMIC IMAGE ARCHITECTURE ───────────────── */}
            <div className="lg:col-span-7 relative h-[500px] lg:h-[650px]">

              {/* 1. The "Base" Image (Large, Back Layer) */}
              <div className="absolute top-0 left-0 w-[75%] h-[70%] rounded-4xl overflow-hidden shadow-2xl z-10 group">
                <img
                  src={data.inspectionImages[0]}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt="Main"
                />
                <div className="absolute inset-0  group-hover:bg-transparent transition-colors" />
              </div>

              {/* 2. The "Focus" Image (Vertical, Middle Layer) */}
              <div className="absolute top-[20%] right-0 w-[45%] h-[60%] rounded-4xl overflow-hidden border-12 border-white shadow-[-20px_20px_60px_rgba(0,0,0,0.15)] z-20 group">
                <img
                  src={data.inspectionImages[1]}
                  className="w-full h-full object-cover"
                  alt="Detail"
                />

              </div>

              {/* 3. The "Abstract" Image (Small, Front Layer) */}
              <div className="absolute bottom-0 left-[15%] w-[35%] h-[25%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-30 transition-transform hover:-translate-y-2.5">
                <img
                  src={data.inspectionImages[2]}
                  className="w-full h-full object-cover"
                  alt="Mini Detail"
                />
              </div>


            </div>

            {/* ── RIGHT: INFO & INTERACTIVE LIST ───────────────── */}
            <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-12">

              <p className="text-third text-[18px] font-[Poppins] leading-relaxed italic border-l-4 border-primary/30 pl-6">
                {data.inspectionText.trim()}
              </p>

              {/* ICON-BASED POINTS */}
              <div className="flex flex-col gap-6">
                {data.inspectionPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-5 group cursor-default">
                    <div className="shrink-0 w-12 h-12 rounded-2xl  border border-fourth/10 flex items-center justify-center  group-hover:rotate-10 transition-all duration-300">
                      <CheckCircle2
                        className="text-primary group-hover:text-white transition-colors"
                        size={22}
                      />
                    </div>
                    <div className="flex flex-col">

                      <p className="text-third font-[Poppins] font-medium text-[16px] group-hover:text-primary transition-colors">
                        {pt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PREMIUM DATA BADGE */}


            </div>

          </div>
        </div>
      </section>

{/* commintment section  */}
        <section className="relative w-full min-h-[800px] flex items-center px-3 justify-center py-12 overflow-hidden bg-secondary">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.commitmentImages[0]}
          className="w-full h-full object-cover opacity-40"
          alt="Main Background"
        />
        <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-secondary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ── LEFT SIDE: CONTENT (NOW LEFT) */}
        <div className="flex flex-col items-start gap-6 text-left">
          
          <div className="flex flex-col gap-2">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Our Promise
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
              Customer <span className="text-fourth/80">Commitment</span>
            </h2>
            <div className="w-20 h-1 bg-primary mt-2 rounded-full" />
          </div>

          <div className="backdrop-blur-md p-8 rounded-3xl border border-primary/10 shadow-xl">
            <p className="text-primary/90 text-base sm:text-lg md:text-[16px] font-[Poppins] leading-relaxed">
              {data.commitmentText}
            </p>
          </div>

        </div>

        {/* ── RIGHT SIDE: IMAGE STACK (NOW RIGHT) */}
        <div className="relative h-[500px] hidden md:block">
          
          {/* Main image */}
          <div className="absolute top-0 left-0 w-4/5 h-[350px] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl z-20 group">
            <img
              src={data.commitmentImages[1]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt=""
            />

            {/* Circle overlap */}
            <div className="absolute bottom-4 left-4 w-28 h-28 rounded-full border-4 border-primary overflow-hidden z-40 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1 shadow-xl">
              <img
                src={data.commitmentImages[3]}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>

          {/* Offset image */}
          <div className="absolute bottom-0 right-0 w-3/5 h-[280px] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl z-30 transform translate-x-4 -translate-y-10">
            <img
              src={data.commitmentImages[2]}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Small accent */}
          <div className="absolute -top-6 right-20 w-24 h-24 rounded-2xl rotate-12 border-2 border-primary overflow-hidden z-10 opacity-60">
            <img
              src={data.commitmentImages[4]}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>

      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fourth/10 rounded-full blur-[120px] pointer-events-none" />
    </section>

      {/* GALLERY */}
      <section className="w-full py-12 overflow-hidden px-4 sm:px-8 ">
        <div className=" conatiner max-w-7xl mx-auto  flex flex-col gap-12">

          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Gallery</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Our Showroom & <span className="text-fourth/80">Team</span>
            </h2>
          </div>

          {/* STAGE */}
          <div
            className="relative flex items-center justify-center h-[300px] sm:h-[380px] md:h-[420px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => clearInterval(timerRef.current)}
            onMouseLeave={() => { timerRef.current = setInterval(next, 2500); }}
          >
            {data.galleryImages.map((src, i) => {
              const pos = getPosition(i);
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (pos === "right") next();
                    else if (pos === "left") prev();
                  }}
                  className={`absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-600 ease-in-out will-change-transform ${positionStyles[pos]}`}
                >
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-3">
            {data.galleryImages.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-500 ${active === i ? "bg-primary scale-125" : "bg-primary/30"
                  }`}
              />
            ))}
          </div>

        </div>
      </section>



       {/* Testinomal section */}
      
            <section className="w-full py-12 bg-primary px-2 lg:px-4">
              <div className=" container max-w-7xl mx-3  flex flex-col gap-12">
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