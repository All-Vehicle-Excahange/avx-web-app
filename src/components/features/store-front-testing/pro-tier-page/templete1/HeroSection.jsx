"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  Globe,
  TrendingUp,
  Cpu,
  Star
} from "lucide-react";

export default function FullPage() {

  const data = {
    whyBuyHeroTitle: "Why Choose Adarsh Auto Consultants",
    whyBuyHeroDescription:
      "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.",
    whyBuyHeroTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format" },
    whyBuyHeroTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    whyBuyHeroTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format" },
    storyTitle: "Our Experience",
    storyDescription:
      "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",
    storyTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    storyTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format" },
    storyTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
    storyTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    vehicleSelectionTitle: "Our Approach to Vehicle Selection",
    vehicleSelectionDescription:
      `Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.`,
    vehicleSelectionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    vehicleSelectionTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format" },
    processTitle: "How Buying Works",
    processDescription:
      "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",
    processTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format" },
    processTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=500&auto=format" },
    processTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    processTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format" },
    processSteps: [
      {
        title: "Discover Vehicles",
        description:
          "Browse our inventory and shortlist vehicles that match your requirements.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
      },
      {
        title: "Connect With Our Team",
        description:
          "Use AVX chat to discuss vehicle condition, pricing, and availability.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>`,
      },
      {
        title: "AVX Inspection Option",
        description:
          "Buyers can request AVX inspection to receive an independent condition report.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-76 112 198-198-57-56-141 142-70-71-57 56 127 127Z"/></svg>`,
      },
      {
        title: "Decision & Purchase",
        description:
          "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L131-462q-16-16-16-38t16-38l68-68q16-16 38-16t38 16l113 113q14-36 43-62t67-36v-235q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v235q38 10 67 36t43 62l113-113q16-16 38-16t38 16l68 68q16-16 16 38t-16 38L616-228q2 6 3 13.5t1 14.5q0 50-35 85t-85 35Zm0-240q33 0 56.5-23.5T560-400q0-33-23.5-56.5T480-480q-33 0-56.5 23.5T400-400q0 33 23.5 56.5T480-320ZM237-567l113 113q5 5 7.5 11t2.5 12q0 6-2.5 12t-7.5 11q-16 16-38 16t-38-16L161-531l76-36Zm486 0-76 36-113-113q-5-5-7.5-11t-2.5-12q0-6 2.5-12t7.5-11q16-16 38-16t38 16l113 113ZM480-720v-80 80Zm0 520q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Z"/></svg>`,
      },
    ],
    inspectionTitle: "AVX Inspection Assurance",
    inspectionText:
      "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
    inspectionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    inspectionTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
    inspectionTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    inspectionTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format" },
    inspectionPoints: [
      "Exterior condition check",
      "Interior condition check",
      "Visible mechanical components",
      "Photo & video documentation",
    ],
    customerCommitmentTitle: "Customer Commitment",
    customerCommitmentDescription:
      "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
    customerCommitmentTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
    customerCommitmentTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format" },
    customerCommitmentTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
    galleryTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
    galleryTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7" },
    galleryTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c" },
    galleryTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a" },
    galleryTemplate5: { id: 5, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027" },
    testimonialTitle: "Customer Experience",
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
      {
        name: "Priya Mehta",
        review:
          "Very professional service. They answered all my questions patiently and helped me find the right vehicle within my budget.",
      },
      {
        name: "Suresh Joshi",
        review:
          "Honest and transparent throughout the entire process. The AVX inspection gave me confidence in my purchase.",
      },
    ],
  };



  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let scrollAmount = 0;
    const scroll = () => {
      if (!scrollRef.current) return;
      scrollAmount += 1;
      scrollRef.current.scrollLeft = scrollAmount;
      if (scrollAmount >= scrollRef.current.scrollWidth / 2) scrollAmount = 0;
      requestAnimationFrame(scroll);
    };
    scroll();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative px-4 w-full min-h-screen flex items-center overflow-hidden py-12 md:py-32">

        <div className="container relative grid md:grid-cols-2 gap-1 items-center">

          {/* ── LEFT CONTENT ───────────────── */}
          <div className="relative z-10 md:pr-10">

            <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Trusted Auto Consultants
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.whyBuyHeroTitle}
            </h2>

            <p
              className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins] mt-2"
              dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
            />
            {/* ── MOBILE IMAGES (ONLY 2) ───────────────── */}
            <div className="grid grid-cols-2 gap-3 mt-8 md:hidden">
              {[data.whyBuyHeroTemplate1, data.whyBuyHeroTemplate2].map((img, i) => (
                <div key={i} className="w-full h-36 rounded-xl overflow-hidden">
                  <img
                    src={img?.imageUrl}
                    className="w-full h-full object-cover"
                    alt={`car-${i}`}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT VISUAL (DESKTOP COLLAGE ONLY) ───────────────── */}
          <div className="relative hidden md:block h-[500px]">

            {/* center main */}
            <div className="absolute top-[10%] left-[20%] w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-xl z-10">
              <img src={data.whyBuyHeroTemplate1?.imageUrl} className="w-full h-full object-cover" />
            </div>

            {/* tilted right */}
            <div className="absolute top-[5%] right-[0%] w-[38%] h-[42%] rounded-2xl overflow-hidden rotate-6 opacity-90">
              <img src={data.whyBuyHeroTemplate2?.imageUrl} className="w-full h-full object-cover" />
            </div>

            {/* bottom left */}
            <div className="absolute bottom-[0%] left-[10%] w-[40%] h-[35%] rounded-2xl overflow-hidden rotate-[4deg] opacity-90">
              <img src={data.whyBuyHeroTemplate3?.imageUrl} className="w-full h-full object-cover" />
            </div>

          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="w-full py-12 bg-primary border-y border-secondary/10 px-4">
        <div className=" container max-w-7xl  sm:px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* ── LEFT CONTENT ───────────────── */}
          <div className="flex flex-col gap-6">

            <p className="text-sm tracking-[0.4em] uppercase text-secondary/70 font-semibold">
              Consultant Story
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.storyTitle}
            </h2>

            <div
              className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg space-y-4"
              dangerouslySetInnerHTML={{ __html: data.storyDescription }}
            />

            {/* subtle stat */}


          </div>

          {/* ── RIGHT IMAGES (CLEAN GRID) ───────────────── */}
          <div className="grid grid-cols-2 gap-4">

            {/* big image */}
            <div className="col-span-2 h-60 overflow-hidden rounded-xl border border-secondary/10">
              <img
                src={data.storyTemplate1?.imageUrl}
                className="w-full h-full object-cover"
              />
            </div>

            {/* small images */}
            <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
              <img
                src={data.storyTemplate2?.imageUrl}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
              <img
                src={data.storyTemplate3?.imageUrl}
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* SELECTION */}
      <section className="w-full py-12 px-2 lg:px-4">
        <div className="container">
          <div className="max-w-7xl    flex flex-col gap-10">

            {/* ── HEADER ───────────────── */}
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Our Standards
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.vehicleSelectionTitle}

            </h2>

            {/* ── CONTENT GRID ───────────────── */}
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* LEFT TEXT */}
              <div
                className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5 text-third text-lg font-[Poppins] leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: data.vehicleSelectionDescription }}
              />

              {/* RIGHT IMAGES (AUTO SCROLL) */}
              <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-scroll no-scrollbar"
              >
                {[
                  data.vehicleSelectionTemplate1?.imageUrl,
                  data.vehicleSelectionTemplate2?.imageUrl,
                  data.vehicleSelectionTemplate1?.imageUrl,
                  data.vehicleSelectionTemplate2?.imageUrl,

                ].map((img, i) => (
                  <div
                    key={i}
                    className="min-w-[180px] h-[220px] overflow-hidden rounded-lg border border-third/10 shrink-0"
                  >
                    <img
                      src={img}
                      alt="selection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* ── HIDE SCROLLBAR STYLE ───────────────── */}

        </div>
      </section>

      {/* PROCESS */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 lg:gap-16">

          {/* HEADER */}
          <div className="max-w-2xl flex flex-col gap-4">

            <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-third font-semibold">
              Simple Process
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
              {data.processTitle}
            </h2>

            <p
              className="text-sm sm:text-base lg:text-lg text-third font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />

          </div>

          {/* PROCESS GRID */}
          <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-5 sm:gap-6
        ">

            {data.processSteps.map((step, i) => {
              const stepImage = data[`processTemplate${i + 1}`]?.imageUrl;

              return (
                <div
                  key={i}
                  className="group flex flex-col justify-between border border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
                >

                  {/* CONTENT */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">

                    <div className="flex items-center justify-between">

                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-primary/20 rounded-full">
                        {typeof step.icon === 'string' && step.icon.startsWith('<svg') ? (
                          <div
                            className="text-primary [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]"
                            dangerouslySetInnerHTML={{ __html: step.icon }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-xs text-primary">
                            Icon
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] sm:text-xs tracking-[2px] text-third font-[Montserrat]">
                        0{i + 1}
                      </span>

                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-primary font-[Montserrat]">
                      {step.title}
                    </h3>

                    <p
                      className="text-xs sm:text-sm text-third font-[Poppins] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />

                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* inspection section */}
      <section className="w-full py-12 px-2 lg:px-4">
        <div className="container max-w-7xl mx-auto  grid md:grid-cols-2 gap-16 items-center">

          {/* ── LEFT CONTENT ───────────────── */}
          <div className="flex flex-col gap-6">

            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Independent Verification
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
              {data.inspectionTitle}
            </h2>

            <p
              className="text-third text-[17px] font-[Poppins] leading-relaxed max-w-lg"
              dangerouslySetInnerHTML={{ __html: data.inspectionText }}
            />

            {/* POINTS */}
            <div className="flex flex-col gap-4 mt-2">
              {data.inspectionPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <CheckCircle2
                    className="text-primary mt-0.5 group-hover:scale-110 transition"
                    size={18}
                  />
                  <p
                    className="text-third font-[Poppins] leading-relaxed text-[15px]"
                    dangerouslySetInnerHTML={{ __html: pt }}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT VISUAL ───────────────── */}
          <div className="relative h-[400px] hidden md:block">

            {/* main image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-third/10 shadow-sm">
              <img
                src={data.inspectionTemplate1?.imageUrl}
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="relative w-full py-12 overflow-hidden">

        {/* ── BACKGROUND ───────────────── */}
        <div className="absolute inset-0">

          {/* image */}
          <img
            src={data.customerCommitmentTemplate1?.imageUrl}
            className="w-full h-full object-cover scale-105"
            alt="background"
          />

          {/* dark overlay */}
          <div className="absolute inset-0 " />

          {/* left fade */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

          {/* center soft glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        {/* ── CONTENT ───────────────── */}
        <div className="relative z-10 flex items-center justify-center text-center px-4">

          <div className="max-w-3xl flex flex-col items-center gap-6">

            {/* small label */}
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Commitment
            </p>

            {/* heading */}
            <h2 className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              {data.customerCommitmentTitle}
            </h2>

            {/* divider */}
            <div className="w-16 bg-white/30" />

            {/* description */}
            <p
              className="text-white/80 text-base sm:text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl"
              dangerouslySetInnerHTML={{ __html: data.customerCommitmentDescription }}
            />

          </div>

        </div>
      </section>

      {/* GALLERY */}
      <section className="w-full py-12 px-2 lg:px-4 ">
        <div className="container max-w-7xl  flex flex-col gap-10">

          {/* ── HEADER (CSS UNCHANGED) ── */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Our Showroom & <span className="text-primary">Team</span>
            </h2>
          </div>

          {/* ── UNIQUE ARCHITECTURAL GRID ── */}
          <div className="flex flex-col md:grid md:grid-cols-12 md:grid-rows-2 gap-3 h-auto md:h-[600px]">

            {/* Image 1: The Tall Vertical Anchor (Left) */}
            <div className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryTemplate1?.imageUrl}
                alt="Showroom Vertical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 2: The Main Landscape Feature (Top Right) */}
            <div className="md:col-span-9 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryTemplate2?.imageUrl}
                alt="Main Showroom"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 3: Detail Shot (Bottom Middle) */}
            <div className="md:col-span-5 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryTemplate3?.imageUrl}
                alt="Team Detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Image 4: The Wide End Cap (Bottom Right) */}
            <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryTemplate4?.imageUrl}
                alt="Interior View"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-fourth/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

          </div>
        </div>
      </section>

      {/* Testinomal section */}

      <section className="w-full py-12 bg-primary px-4">
        <div className=" container max-w-7xl mx-3 px-4 sm:px-6 flex flex-col gap-12">
          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.35em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
              Real Buyers
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.testimonialTitle}
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
                <p
                  className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]"
                  dangerouslySetInnerHTML={{ __html: t.review }}
                />

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