"use client";
import { Search, MessageCircle, ShieldCheck, Handshake, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {

    const data = {
        //  =====Hero Section =====
        HeroTitle: "Why Choose Adarsh Auto Consultants",
        HeroTitle: " Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience. Our goal is to help every buyer make confident vehicle decisions with clear information and professional support.",

        //  =====AboutUs Section =====
        aboutTitle: "Our Experience",
        aboutDescription: "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat. Our goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",

        //  =====Vehicle Approach Section =====
        selectionTitle: "Our Approach to Vehicle Selection",
        selectionDescription: `Every vehicle listed through our storefront goes through a basic
internal evaluation before being presented to buyers. This helps
ensure that vehicles listed are suitable for serious buyers and
provides a smoother vehicle buying experience.`,

        // ===== How Buying Work Section =====
        processTitle: "How Buying Works",
        processDescription: `Buying a vehicle through our storefront is designed to be simple,
transparent, and convenient for buyers.`,
        processSteps: [
            {
                title: "Discover Vehicles",
                description: "Browse our inventory and shortlist vehicles that match your requirements.",
                icon: Search,
            },
            {
                title: "Connect With Our Team",
                description: "Use AVX chat to discuss vehicle condition, pricing, and availability.",
                icon: MessageCircle,
            },
            {
                title: "AVX Inspection Option",
                description: "Buyers can request AVX inspection to receive an independent condition report.",
                icon: ShieldCheck,
            },
            {
                title: "Decision & Purchase",
                description: "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
                icon: Handshake,
            },
        ],

        // ===== Avx Inspection Section =====
        inspectionTitle: "AVX Inspection Assurance",
        inspectionText: `AVX inspection services provide additional transparency by documenting
key aspects of the vehicle's condition before purchase.`,
        inspectionPoints: [
            "Exterior condition check",
            "Interior condition check",
            "Visible mechanical components",
            "Photo & video documentation",
        ],

        // ===== Customer Section =====
        commitmentTitle: "Customer Commitment",
        commitmentText: `Our goal is to maintain transparent communication and assist buyers
throughout the vehicle discovery and purchase process. We aim to
provide honest guidance and reliable information for every buyer.`,

        // ===== Testimonials Section =====
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
        ],
    };



    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(true);
    const total = data.testimonials.length;
    const timeoutRef = useRef(null);

    const transition = (newIndex) => {
        setVisible(false);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setActive(newIndex);
            setVisible(true);
        }, 350);
    };

    const prev = () => transition((active - 1 + total) % total);
    const next = () => transition((active + 1) % total);

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const item = data.testimonials[active];

    return (
        <>
            {/* ===== Hero Section ===== */}
            <section className="relative  flex items-center justify-center overflow-hidden min-h-screen   py-12">



                {/* ── Content ──────────────────────────────────────────────────── */}
                <div className="relative flex flex-col items-center text-center gap-8 max-w-3xl">

                    {/* Eyebrow */}
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Why Choose Us
                    </p>

                    {/* Headline */}

                    <h2
                        className="
             text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
                    >
                        Why Choose
                        <span className="text-fourth/80"> Adarsh Auto</span>{" "}
                        <br />
                        <span className=" text-primary">Consultants
                        </span>
                    </h2>
                    {/* Description */}
                    <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-xl">
                        Buyers trust Adarsh Auto Consultants for transparent communication,
                        reliable vehicle options, and a smooth buying experience. Our goal
                        is to help every buyer make confident vehicle decisions with clear
                        information and professional support.
                    </p>

                    {/* CTA — text link style, no button */}
                    <a
                        href="#"
                        className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
                    >
                        Explore Listings →
                    </a>

                </div>

            </section>

            {/* ===== AboutUs Section ===== */}
            <section className="relative flex flex-col justify-center items-center py-12">

                <div className="mx-auto w-full flex flex-col gap-13">

                    {/* Upper Row: Title and Description aligned horizontally */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <div className="flex flex-col  gap-6">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                About Us
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                Our
                                <span className="text-fourth/80"> Experience</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-6">
                                <p className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
                                    {data.aboutDescription.split('. ')[0]}.
                                </p>

                                <p className="text-third/50 text-md font-[Poppins] leading-relaxed max-w-md">
                                    {data.aboutDescription.split('. ')[1]}
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

            </section>

            {/* =====Vehicle Approach Section ===== */}
            <section className="relative py-12 ">
                {/* Background Gradient from Global CSS */}

                <div className="max-w-6xl mx-auto">

                    {/* ── Main All-Side Border Frame ────────────────────────────── */}
                    <div className="border border-third/10 rounded-3xl p-10 md:p-16 relative shadow-2xl">



                        {/* ── Centered Content ─────────────────────────────────────── */}
                        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
                            <div className="flex items-center gap-3 ">
                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Vehicle Approach</p>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {data.selectionTitle.split("Vehicle Selection")[0]}
                                <span className="text-fourth/80">Vehicle Selection</span>
                            </h2>

                            <p className="text-third/60 text-base md:text-lg font-[Poppins] leading-[1.9] max-w-2xl">
                                {data.selectionDescription}
                            </p>

                        </div>



                    </div>

                </div>
            </section>

            {/* ===== How Buying Work Section ===== */}
            <section className="py-12 ">
                <div className="max-w-7xl mx-auto flex flex-col gap-15">

                    {/* ── Header ───────────────────────────────────────────────── */}
                    <div className="flex flex-col  sm:justify-between gap-8 pb-12 border-b border-third/10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                    Buying Process
                                </p>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {data.processTitle.split("Works")[0]}
                                <span className="text-fourth/80">
                                    Works
                                </span>
                            </h2>
                        </div>
                        <p className="text-third/55 text-base font-[Poppins] leading-relaxed max-w-xs ">
                            {data.processDescription}
                        </p>
                    </div>

                    {/* ── Alternating steps ────────────────────────────────────── */}
                    <div className="flex flex-col gap-2">
                        {data.processSteps.map((step, i) => {
                            const Icon = step.icon;
                            const isEven = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className={`group flex flex-col sm:flex-row items-stretch gap-0 border border-third/10 rounded-2xl overflow-hidden hover:border-third/25 transition-all duration-300 ${isEven ? "" : "sm:flex-row-reverse"}`}
                                >
                                    {/* Step number + icon panel */}
                                    <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 px-8 py-6 sm:py-10 sm:w-48 border-b sm:border-b-0 border-third/10 sm:border-r group-hover:bg-primary/4 transition-colors duration-300" style={isEven ? {} : { borderRight: 'none', borderLeft: '1px solid rgba(190,190,190,0.1)' }}>
                                        <span className="text-[13px] font-bold tracking-[3px] text-third/25 font-[Montserrat]">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="w-10 h-10 rounded-xl border border-third/15 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                                            <Icon className="w-4 h-4 text-third/40 group-hover:text-primary/60 transition-colors duration-300" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col justify-center gap-2 px-8 py-8 flex-1">
                                        <h3 className="text-lg font-semibold text-primary font-[Montserrat]">
                                            {step.title}
                                        </h3>
                                        <p className="text-third/55 text-sm font-[Poppins] leading-relaxed max-w-lg">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ===== Avx Inspection Section ===== */}
            <section className="py-12 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col gap-16">

                    {/* ── Main block ───────────────────────────────────────────── */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">

                        {/* Left: heading + description + large accent */}
                        <div className="flex flex-col gap-8">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
                                Avx Inspection
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {data.inspectionTitle.split("Assurance")[0]}
                                <span className="text-fourth/80">Assurance</span>
                            </h2>
                            <p className="text-third/55 text-base font-[Poppins] leading-[1.9] max-w-md">
                                {data.inspectionText}
                            </p>


                        </div>

                        {/* Right: inspection points */}
                        <div className="flex flex-col divide-y divide-third/10">
                            {data.inspectionPoints.map((point, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center justify-between gap-6 py-5 hover:translate-x-1 transition-transform duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold tracking-[2px] text-third/25 font-[Montserrat] shrink-0">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-primary/80 text-base font-[Poppins]">
                                            {point}
                                        </span>
                                    </div>
                                    <svg
                                        className="w-4.5 h-4.5 text-third/20 group-hover:text-third/90 shrink-0 transition-colors duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* ===== Customer Commitment Section ===== */}
            <section className="py-12 overflow-hidden">
                <div className="max-w-7xl mx-auto">

                    {/* ── Full bleed container ──────────────────────────────────── */}
                    <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0 border border-third/10 rounded-2xl overflow-hidden">

                        {/* Left: large accent label */}
                        <div className="flex flex-col justify-between gap-8 p-10 lg:p-14 lg:w-[45%] border-b lg:border-b-0 lg:border-r border-third/10">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
                                        Our Promise
                                    </p>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    {data.commitmentTitle.split("Commitment")[0]}
                                    <span className="text-fourth/80">Commitment</span>
                                </h2>
                            </div>

                            {/* Bottom accent */}
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-linear-to-r from-third/30 to-transparent" />
                                <span className="text-[10px] tracking-[0.3em] uppercase text-third/30 font-[Poppins] whitespace-nowrap">
                                    Every Buyer
                                </span>
                            </div>
                        </div>

                        {/* Right: text + decorative quote mark */}
                        <div className="relative flex flex-col justify-center gap-8 p-10 lg:p-14 flex-1 overflow-hidden">

                            {/* Ghost quotation icon */}
                            <Quote size={40} className="absolute top-6 right-8   text-third/20" />

                            <p className="relative text-third/55 text-base font-[Poppins] leading-[1.9] max-w-md">
                                {data.commitmentText}
                            </p>

                            {/* Bottom row */}
                            <div className="flex items-center gap-3 pt-4 border-t border-third/10">
                                <div className="w-6 h-6 rounded-full border border-third/20 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-third/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-xs tracking-[0.2em] uppercase text-third/35 font-[Poppins]">
                                    Adarsh Auto Consultants
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ===== Testimonials Section ===== */}
            <section className="relative py-12">
                <div className=" mx-auto w-full ">
                    <div className="flex flex-col items-center gap-10">

                        {/* ── Header ─────────────────────────────────────────────── */}
                        <div className="flex flex-col items-center gap-4 text-center">
                            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Feedback
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {data.testimonialsTitle.split("Experience")[0]}
                                <span className="text-fourth/80">Experience</span>
                            </h2>
                        </div>

                        {/* ── Slide ──────────────────────────────────────────────── */}
                        <div
                            className="w-full"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0px)" : "translateY(12px)",
                                transition: "opacity 0.35s ease, transform 0.35s ease",
                            }}
                        >
                            {/* Bordered review card */}
                            <div className="relative flex flex-col items-center text-center gap-8 px-10 py-12 border border-third/15 rounded-2xl">

                                {/* Quote icon — top right */}
                                <div className="absolute top-5 right-6 w-9 h-9 rounded-full   flex items-center justify-center">
                                    <Quote className="w-6 h-6 text-third/30" />
                                </div>

                                <span className="text-[13px] font-bold text-third/30 font-[Montserrat] tracking-[0.5em]">
                                    {String(active + 1).padStart(2, "0")}
                                </span>

                                <p className="text-xl md:text-2xl lg:text-3xl font-light text-primary/70 font-[Poppins] leading-[1.6] max-w-3xl italic">
                                    {item.review}
                                </p>

                                <span className="text-xs font-semibold text-primary/90 font-[Montserrat] uppercase tracking-widest">
                                    {item.name}
                                </span>

                            </div>
                        </div>

                        {/* ── Controls ───────────────────────────────────────────── */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={prev}
                                className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
                            >
                                <ChevronLeft className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
                            </button>

                            <div className="flex items-center gap-2">
                                {data.testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => transition(i)}
                                        className={`rounded-full transition-all duration-500 ${i === active
                                            ? "w-6 h-1.5 bg-primary"
                                            : "w-1.5 h-1.5 bg-third/20 hover:bg-third/40"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
                            >
                                <ChevronRight className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
                            </button>
                        </div>


                    </div>
                </div>
            </section>
        </>

    );
}   