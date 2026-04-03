"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA  (flat structure matching WHY_BUY_HERE_PREMIUM_1 schema)
───────────────────────────────────────────── */
const data = {
  /* HERO */
  heroTitle: "Why Choose Adarsh Auto Consultants",
  heroDescription:
    "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.",
  heroVideo: "/store-front-template2.mp4",

  /* HOW BUYING WORKS */
  processTitle: "How Buying Works",
  processDescription:
    "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",
  processSteps: [
    {
      title: "Discover Vehicles",
      description:
        "Browse our inventory and shortlist vehicles that match your requirements.",
      icon: "Search",
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=700&auto=format",
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: "MessageCircle",
      image:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=700&auto=format",
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: "ShieldCheck",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: "Handshake",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=700&auto=format",
    },
  ],

  /* VEHICLE SELECTION APPROACH */
  selectionTitle: "Our Approach to Vehicle Selection",
  selectionDescription:
    "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",
  selectionImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format",
  ],

  /* AVX INSPECTION */
  inspectionTitle: "AVX Inspection Assurance",
  inspectionText:
    "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
  inspectionPoints: [
    {
      title: "Exterior condition check",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
    },
    {
      title: "Interior condition check",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=700&auto=format",
    },
    {
      title: "Visible mechanical components",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
    },
    {
      title: "Photo & video documentation",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=700&auto=format",
    },
  ],

  /* CONSULTANT STORY */
  storyTitle: "Our Experience",
  storyText:
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",
  storyImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
  ],

  /* CUSTOMER COMMITMENT */
  commitmentTitle: "Customer Commitment",
  commitmentText:
    "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
  commitmentImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format",
  ],

  /* GALLERY */
  galleryTitle: "Our Showroom & Team",
  galleryImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=600&auto=format",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&auto=format",
  ],

  /* TESTIMONIALS */
  testimonialsTitle: "Customer Experience",
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

/* ─────────────────────────────────────────────
   ICON MAP
───────────────────────────────────────────── */
const iconMap = { Search, MessageCircle, ShieldCheck, Handshake };

/* ─────────────────────────────────────────────
   PAGE — SINGLE DEFAULT EXPORT
───────────────────────────────────────────── */
export default function WhyBuyHerePremium2() {
  /* ── Inspection tab state ── */
  const [activeInspection, setActiveInspection] = useState(0);

  /* ── Commitment accordion state ── */
  const [activeCommitment, setActiveCommitment] = useState(1);

  /* ── Testimonials slider state ── */
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const slidesPerView = isDesktop ? 2 : 1;
  const total = data.testimonials.length;
  const maxIndex = total - slidesPerView;

  /* ── RENDER ── */
  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 1 — HERO (video background)
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 relative min-h-screen flex items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={data.heroVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

        <div className="container">
          <div className="relative z-10 w-full max-w-6xl">
            <div className="max-w-xl">
              <h1 className="sm:text-4xl lg:text-5xl text-4xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-6">
                Why Choose <span className="text-fourth">Adarsh</span> Auto
                Consultants
              </h1>
              <p className="text-white/80 leading-[1.9] text-[15px]">
                {data.heroDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — STORY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            {/* text */}
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-primary/60 mb-4">
                Our Story
              </p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-primary leading-[1.1] mb-6">
                Our <span className="text-secondary">Experience</span>
              </h2>
              <p className="text-primary/85 text-[15px] leading-loose whitespace-pre-line max-w-md">
                {data.storyText}
              </p>
            </div>

            {/* visual — dominant image + floating inset */}
            <div className="relative w-full h-[420px]">
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img
                  src={data.storyImages[0]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-6 right-6 w-[140px] h-[100px] overflow-hidden border rounded-2xl border-white/20">
                <img
                  src={data.storyImages[1]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — SELECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT — text */}
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
                Selection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                Our Approach to <br />
                <span className="text-fourth/80">Vehicle Selection</span>
              </h2>
              <div className="w-10 h-px bg-primary/20 my-4" />
              <p className="text-third/70 text-[15px] leading-[1.9] max-w-md">
                {data.selectionDescription}
              </p>
            </div>

            {/* RIGHT — overlapping image composition */}
            <div className="relative w-full h-80 lg:h-[380px]">
              <div className="absolute top-0 left-0 w-[75%] h-full overflow-hidden">
                <img
                  src={data.selectionImages[0]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-0 right-0 w-[38%] h-[48%] overflow-hidden">
                <img
                  src={data.selectionImages[1]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[38%] h-[48%] overflow-hidden">
                <img
                  src={data.selectionImages[2]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — PROCESS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mb-16 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third mb-3">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-4">
              How Buying <span className="text-fourth/80">Works</span>
            </h2>
            <p className="text-third/60 text-[15px] leading-[1.9]">
              {data.processDescription}
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {data.processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`grid lg:grid-cols-2 gap-10 items-center ${
                    !isLeft ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* image */}
                  <div className="w-full h-[260px] lg:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={step.image}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* content */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-primary/20 flex items-center justify-center">
                        <Icon size={18} className="text-fourth" />
                      </div>
                      <span className="text-[11px] tracking-[0.2em] text-third/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {step.title}
                    </h3>
                    <p className="text-third/65 text-[14px] leading-[1.8] max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — INSPECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          {/* header */}
          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third mb-3">
                Inspection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary leading-[1.1]">
                AVX Inspection <br />
                <span className="text-fourth/80">Assurance</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-third/70 text-[15px] leading-[1.9] max-w-md">
                {data.inspectionText}
              </p>
            </div>
          </div>

          {/* main */}
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            {/* LEFT — animated image */}
            <div
              key={activeInspection}
              className="w-full h-60 sm:h-[300px] md:h-[340px] lg:h-[270px] rounded-2xl overflow-hidden"
            >
              <img
                src={data.inspectionPoints[activeInspection].image}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT — stacked clickable titles */}
            <div className="flex flex-col gap-8">
              {data.inspectionPoints.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveInspection(i)}
                  className="cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-[14px] font-bold ${
                        i === activeInspection
                          ? "text-fourth"
                          : "text-primary/40 group-hover:text-primary"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[16px] leading-[1.6] transition ${
                        i === activeInspection
                          ? "text-primary font-medium"
                          : "text-primary/60 group-hover:text-primary"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div
                    className={`mt-3 h-px transition-all duration-300 ${
                      i === activeInspection
                        ? "bg-fourth w-full"
                        : "bg-primary/10 w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — COMMITMENT
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5 items-center">
            {/* text */}
            <div className="max-w-md">
              <p className="text-xs tracking-[0.35em] uppercase text-primary/60 mb-4">
                Commitment
              </p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-primary leading-[1.1] mb-6">
                Customer <span className="text-secondary">Commitment</span>
              </h2>
              <p className="text-primary/90 text-[15px] leading-loose">
                {data.commitmentText}
              </p>
            </div>

            {/* interactive accordion images */}
            <div className="flex gap-3 h-80">
              {data.commitmentImages.map((img, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveCommitment(i)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500"
                  style={{ flex: i === activeCommitment ? 3 : 1 }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover transition duration-700"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 transition duration-500 ${
                      i === activeCommitment ? "bg-black/10" : "bg-black/30"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — GALLERY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-14">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Our Showroom <span className="text-fourth/80">& Team</span>
            </h2>
          </div>

          {/* mosaic */}
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-12 lg:grid-rows-[400px_220px] lg:gap-3">
            {/* hero */}
            <div className="relative overflow-hidden rounded-2xl h-[300px] lg:h-auto lg:col-span-6 lg:row-span-2">
              <img
                src={data.galleryImages[0]}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* top-right pair */}
            <div className="flex gap-3 lg:contents">
              <div className="relative overflow-hidden rounded-2xl h-[180px] flex-1 lg:h-auto lg:col-span-4 lg:row-span-1">
                <img
                  src={data.galleryImages[1]}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="relative overflow-hidden rounded-2xl h-[180px] w-[30%] lg:h-auto lg:w-auto lg:col-span-2 lg:row-span-1">
                <img
                  src={data.galleryImages[4]}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* bottom row */}
            <div className="flex gap-3 lg:contents">
              <div className="relative overflow-hidden h-40 rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1">
                <img
                  src={data.galleryImages[2]}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="relative overflow-hidden h-40 rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1">
                <img
                  src={data.galleryImages[3]}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8 — TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-3">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                Reviews
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                Customer <span className="text-fourth/80">Experience</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-2xl overflow-hidden"
          >
            {data.testimonials.map((t, i) => (
              <SwiperSlide key={`${t.name}-${i}`}>
                <div className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                  <Quote
                    size={22}
                    className="text-fourth mb-4 relative z-10"
                    strokeWidth={1.4}
                  />
                  <p className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6">
                    {t.review}
                  </p>
                  <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-fourth/30 to-fourth/10 flex items-center justify-center font-bold text-[14px] text-fourth">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-third/50">
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-primary/60" : "w-2 bg-primary/15"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}