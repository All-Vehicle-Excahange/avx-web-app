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

    heroData: {
      heroTitle: "Why Choose Adarsh Auto Consultants",
      heroDescription: `
    Buyers trust Adarsh Auto Consultants for transparent communication,
    reliable vehicle options, and a smooth buying experience. Our goal
    is to help every buyer make confident vehicle decisions with clear
    information and professional support.
  `,
      heroImages: [
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200",
        "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200",
      ],
    },

    storyData: {
      storyTitle: "Our Experience",
      storyText: `
      For over 12 years, Adarsh Auto Consultants has been helping buyers
      discover reliable vehicles across Gujarat.

      Our goal is to maintain a diverse vehicle inventory and provide
      accurate information so buyers can make confident decisions when
      purchasing their next vehicle.
    `,
      storyImages: [
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
      ],
    },
    selectionData: {
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
    },

    steps: [
      {
        title: "Discover Vehicles",
        description:
          "Browse our inventory and shortlist vehicles that match your requirements.",
        icon: Search,
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
      },
      {
        title: "Connect With Our Team",
        description:
          "Use AVX chat to discuss vehicle condition, pricing, and availability.",
        icon: MessageCircle,
        image:
          "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200",
      },
      {
        title: "AVX Inspection Option",
        description:
          "Buyers can request AVX inspection to receive an independent condition report.",
        icon: ShieldCheck,
        image:
          "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1200",
      },
      {
        title: "Decision & Purchase",
        description:
          "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
        icon: Handshake,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200",
      },
    ],

    commitment: {
      label: "Our Promise",
      title: "Customer Commitment",
      highlight: "Commitment",
      description: `
    Our goal is to maintain transparent communication and assist buyers
    throughout the vehicle discovery and purchase process. We aim to
    provide honest guidance and reliable information for every buyer.
  `,
      backgroundImage:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    },

    galleryImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
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


     inspectionData : {
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
},
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
              Why Choose Adarsh
              <span className="text-fourth/80"> Auto Consultants</span>
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins] mt-2">
              {data.heroData.heroDescription}
            </p>

            <div className="mt-10">
              <a className="group inline-flex items-center gap-2 border border-primary px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 font-[Montserrat]">
                See How It Works
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            {/* ── MOBILE IMAGES (ONLY 2) ───────────────── */}
            <div className="grid grid-cols-2 gap-3 mt-8 md:hidden">

              {data.heroData.heroImages.slice(0, 2).map((img, i) => (
                <div key={i} className="w-full h-36 rounded-xl overflow-hidden">
                  <img
                    src={img}
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
              <img src={data.heroData.heroImages[0]} className="w-full h-full object-cover" />
            </div>

            {/* tilted left */}
            <div className="absolute top-[0%] left-[0%] w-[38%] h-[38%] rounded-2xl overflow-hidden rotate-[-8deg] opacity-90">
              <img src={data.heroData.heroImages[1]} className="w-full h-full object-cover" />
            </div>

            {/* tilted right */}
            <div className="absolute top-[5%] right-[0%] w-[38%] h-[42%] rounded-2xl overflow-hidden rotate-6 opacity-90">
              <img src={data.heroData.heroImages[2]} className="w-full h-full object-cover" />
            </div>

            {/* bottom left */}
            <div className="absolute bottom-[0%] left-[10%] w-[40%] h-[35%] rounded-2xl overflow-hidden rotate-[4deg] opacity-90">
              <img src={data.heroData.heroImages[3]} className="w-full h-full object-cover" />
            </div>

            {/* floating top card */}
            <div className="absolute top-[55%] right-[10%] w-[30%] h-[30%] rounded-2xl overflow-hidden shadow-2xl -rotate-6 z-20">
              <img src={data.heroData.heroImages[4]} className="w-full h-full object-cover" />
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
              Our <span className="text-fourth">Experience</span>
            </h2>

            {data.storyData.storyText.trim().split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg"
              >
                {para.trim()}
              </p>
            ))}

            {/* subtle stat */}


          </div>

          {/* ── RIGHT IMAGES (CLEAN GRID) ───────────────── */}
          <div className="grid grid-cols-2 gap-4">

            {/* big image */}
            <div className="col-span-2 h-60 overflow-hidden rounded-xl border border-secondary/10">
              <img
                src={data.storyData.storyImages[0]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* small images */}
            <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
              <img
                src={data.storyData.storyImages[1]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
              <img
                src={data.storyData.storyImages[2]}
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
              Our Approach to{" "}
              <span className="text-fourth/80">Vehicle Selection</span>
            </h2>

            {/* ── CONTENT GRID ───────────────── */}
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* LEFT TEXT */}
              <div className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5">
                {data.selectionData.selectionDescription
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

              {/* RIGHT IMAGES (AUTO SCROLL) */}
              <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-scroll no-scrollbar"
              >
                {[...data.selectionData.selectionImages, ...data.selectionData.selectionImages].map((img, i) => (
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
              How Buying <span className="text-fourth/80">Works</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-third font-[Poppins] leading-relaxed">
              Buying a vehicle through our storefront is designed to be simple,
              transparent, and convenient for buyers.
            </p>

          </div>

          {/* PROCESS GRID */}
          <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-5 sm:gap-6
        ">

            {data.steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <div
                  key={i}
                  className="group flex flex-col justify-between border border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
                >

                  {/* CONTENT */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">

                    <div className="flex items-center justify-between">

                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-primary/20 rounded-full">
                        <Icon size={16} className="text-primary sm:size-[18px]" />
                      </div>

                      <span className="text-[10px] sm:text-xs tracking-[2px] text-third font-[Montserrat]">
                        0{i + 1}
                      </span>

                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-primary font-[Montserrat]">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-third font-[Poppins] leading-relaxed">
                      {step.description}
                    </p>

                  </div>

                  {/* IMAGE */}
                  <div className="h-36 sm:h-40 w-full overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            AVX Inspection{" "}
            <span className="text-fourth/80">Assurance</span>
          </h2>

          <p className="text-third text-[17px] font-[Poppins] leading-relaxed max-w-lg">
            {data.inspectionData.inspectionText.trim()}
          </p>

          {/* POINTS */}
          <div className="flex flex-col gap-4 mt-2">
            {data.inspectionData.inspectionPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <CheckCircle2
                  className="text-primary mt-0.5 group-hover:scale-110 transition"
                  size={18}
                />
                <p className="text-third font-[Poppins] leading-relaxed text-[15px]">
                  {pt}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT VISUAL ───────────────── */}
        <div className="relative h-[400px] hidden md:block">

          {/* main image */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-third/10 shadow-sm">
            <img
              src={data.inspectionData.inspectionImages[0]}
              className="w-full h-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* small floating image 1 */}
          <div className="absolute top-6 right-6 w-32 h-24 rounded-xl overflow-hidden border border-third/10 shadow-lg backdrop-blur-sm">
            <img
              src={data.inspectionData.inspectionImages[1]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* small floating image 2 */}
          <div className="absolute bottom-6 left-6 w-36 h-28 rounded-xl overflow-hidden border border-third/10 shadow-lg backdrop-blur-sm">
            <img
              src={data.inspectionData.inspectionImages[2]}
              className="w-full h-full object-cover"
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
            src={data.commitment.backgroundImage}
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
              {data.commitment.label}
            </p>

            {/* heading */}
            <h2 className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              {data.commitment.title.split(" ")[0]}{" "}
              <span className="text-fourth/80">
                {data.commitment.highlight}
              </span>
            </h2>

            {/* divider */}
            <div className="w-16 bg-white/30" />

            {/* description */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl">
              {data.commitment.description}
            </p>

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
              Our Showroom & <span className="text-fourth/80">Team</span>
            </h2>
          </div>

          {/* ── UNIQUE ARCHITECTURAL GRID ── */}
          <div className="flex flex-col md:grid md:grid-cols-12 md:grid-rows-2 gap-3 h-auto md:h-[600px]">

            {/* Image 1: The Tall Vertical Anchor (Left) */}
            <div className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryImages[0]}
                alt="Showroom Vertical"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 2: The Main Landscape Feature (Top Right) */}
            <div className="md:col-span-9 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryImages[1]}
                alt="Main Showroom"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 3: Detail Shot (Bottom Middle) */}
            <div className="md:col-span-5 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryImages[2]}
                alt="Team Detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Image 4: The Wide End Cap (Bottom Right) */}
            <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
              <img
                src={data.galleryImages[3]}
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