"use client";

import { Camera, Check, ChevronLeft, ChevronRight, Handshake, MessageCircle, Quote, Search, ShieldCheck } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

const data = {
    //  =====Hero Section =====
    heroTitle: "Why Choose Adarsh Auto Consultants",
    heroDescription: `Buyers trust Adarsh Auto Consultants for transparent communication,
reliable vehicle options, and a smooth buying experience. Our goal
is to help every buyer make confident vehicle decisions with clear
information and professional support.`,
    heroImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=90",
    ],

    //  =====AboutUs Section =====
    storyTitle: "Our Experience",
    storyText: [
        "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.",
        "Our goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle."
    ],
    storyImages: [
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    ],

    //  =====Vehicle Approach Section =====
    selectionTitle: "Our Approach to Vehicle Selection",
    selectionDescription: `Every vehicle listed through our storefront goes through a basic
internal evaluation before being presented to buyers. This helps
ensure that vehicles listed are suitable for serious buyers and
provides a smoother vehicle buying experience.`,
    selectionImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=90",
    ],

    // ===== How Buying Work Section =====
    processTitle: "How Buying Works",
    processDescription: `Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.`,
    processSteps: [
        {
            title: "Discover Vehicles",
            description: "Browse our inventory and shortlist vehicles that match your requirements.",
            icon: "Search",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        },
        {
            title: "Connect With Our Team",
            description: "Use AVX chat to discuss vehicle condition, pricing, and availability.",
            icon: "MessageCircle",
            image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        },
        {
            title: "AVX Inspection Option",
            description: "Buyers can request AVX inspection to receive an independent condition report.",
            icon: "ShieldCheck",
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=90",
        },
        {
            title: "Decision & Purchase",
            description: "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
            icon: "Handshake",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
        },
    ],
    
    // ===== Avx Inspection Section =====
    inspectionTitle: "AVX Inspection Assurance",
    inspectionText: `AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.`,
    inspectionPoints: [
        "Exterior condition check",
        "Interior condition check",
        "Visible mechanical components",
        "Photo & video documentation",
    ],
    inspectionImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
    ],

    // ===== Customer Section =====
    commitmentTitle: "Customer Commitment",
    commitmentText: `Our goal is to maintain transparent communication and assist buyers
throughout the vehicle discovery and purchase process. We aim to
provide honest guidance and reliable information for every buyer.`,

    // ===== Gallery Section =====
    galleryTitle: "Our Showroom & Team",
    galleryImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
    ],

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
const iconMap = { Search, MessageCircle, ShieldCheck, Handshake };

const INTERVAL = 5000;

function Hero() {
    const [active, setActive] = useState(0);
    const [fading, setFading] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [avxInspectionHovered, setAvxInspectionHovered] = useState(0);
    const [testimonialsactive, setTestimonialsActive] = useState(0);
    const [visible, setVisible] = useState(true);
    const testimonialsTotal = data.testimonials.length;
    const activeHovered = hovered ?? 0;
    const activeRef = useRef(0);
    const timeoutRef = useRef(null);
    const total = data.heroImages.length;

    const goTo = useCallback((index) => {
        setFading(true);
        setTimeout(() => {
            setActive(index);
            activeRef.current = index;
            setFading(false);
        }, 500);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            goTo((activeRef.current + 1) % total);
        }, INTERVAL);
        return () => clearInterval(id);
    }, []);

    const transition = (newIndex) => {
        setVisible(false);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setTestimonialsActive(newIndex);
            setVisible(true);
        }, 350);
    };

    const prev = () => transition((testimonialsactive - 1 + testimonialsTotal) % testimonialsTotal);
    const next = () => transition((testimonialsactive + 1) % testimonialsTotal);

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const item = data.testimonials[testimonialsactive];

    return (
        <>
            {/* ===== Hero Section ===== */}
            <section className="relative w-full overflow-hidden min-h-screen">

                {/* ── Background image ─────────────────────────────────────────── */}
                <img
                    src={data.heroImages[active]}
                    alt="vehicle"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        opacity: fading ? 0 : 1,
                        transform: fading ? "scale(1.04)" : "scale(1)",
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                />

                {/* ── Gradient overlay — dark center, lighter edges ─────────────── */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-black/30" />

                {/* ── Centered text — no card, no box ──────────────────────────── */}
                <div className="absolute inset-0 flex items-center justify-center px-8">
                    <div className="max-w-3xl w-full flex flex-col items-center text-center gap-6">

                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold ">
                            Why Choose Us
                        </p>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            Why Choose
                            <span className="text-fourth"> Adarsh Auto</span>
                            <br />
                            <span className="text-primary">Consultants</span>
                        </h2>

                        <p className="text-primary/70 text-base font-[Poppins] leading-relaxed">
                            {data.heroDescription}
                        </p>

                        <div className="pt-4">
                            <a
                                href="#"
                                className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
                            >
                                Explore Listings →
                            </a>
                        </div>


                    </div>
                </div>

            </section>
            {/* ===== AboutUs Section ===== */}
            <section className="relative py-12  px-2 lg:px-4">
                <div className="container">
                    <div className=" mx-auto">

                        {/* ── Flex row replacing grid ───────────────────────────────── */}
                        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">

                            {/* LEFT: text — ~41% width */}
                            <div
                                className="flex flex-col justify-center lg:w-[44%] animate-[fadeInLeft_0.8s_ease_forwards]"
                            >
                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                    About Us
                                </p>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mt-4">
                                    Our <span className="text-fourth/80">Experience</span>
                                </h2>

                                <div className="flex flex-col gap-6 mt-8 max-w-md">
                                    <p className="text-primary/75 text-lg leading-relaxed font-[Poppins]">
                                        {data.storyText[0]}
                                    </p>
                                    <p className="text-third/50 text-md leading-relaxed font-[Poppins]">
                                        {data.storyText[1]}
                                    </p>
                                </div>
                            </div>

                            {/* CENTER: big image — ~26.5% width */}
                            <div
                                className="relative overflow-hidden rounded-2xl group lg:w-[26.5%] min-h-[500px] animate-[fadeInUp_0.8s_ease_0.15s_forwards] opacity-0"
                            >
                                <img
                                    src={data.storyImages[0]}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />

                            </div>

                            {/* RIGHT: two stacked images — ~26% width */}
                            <div
                                className="flex lg:flex-col gap-4 lg:w-[26%] animate-[fadeInRight_0.8s_ease_0.3s_forwards] opacity-0"
                            >
                                {data.storyImages.slice(1, 3).map((src, i) => (
                                    <div
                                        key={i}
                                        className="relative flex-1 overflow-hidden rounded-2xl group min-h-60"
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/60" />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
                </div>
            </section>
            {/* =====Vehicle Approach Section ===== */}
            <section className="relative py-12 px-2 lg:px-4">
                <div className=" container">
                    <div className="mx-auto">

                        {/* ── Content ───────────────── */}
                        <div className="flex flex-col   gap-6 max-w-3xl mx-auto mb-14">
                            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Vehicle Approach
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {data.selectionTitle.split("Vehicle Selection")[0]}
                                <span className="text-fourth/80">Vehicle Selection</span>
                            </h2>

                            <p className="text-primary/70 text-base font-[Poppins] leading-relaxed max-w-2xl">
                                {data.selectionDescription}
                            </p>
                        </div>

                        {/* ── Split Focus Band ───────── */}

                        <div className="flex gap-4 h-[260px]">

                            {/* Left Big */}
                            <div className="w-[48%] md:w-[35%] rounded-3xl overflow-hidden border border-third/10">
                                <img src={data.selectionImages[0]} className="w-full h-full object-cover" />
                            </div>

                            {/* Middle Stack */}
                            <div className="w-[25%] flex flex-col gap-4 hidden md:block">
                                <div className="h-1/2 rounded-2xl overflow-hidden border border-third/10">
                                    <img src={data.selectionImages[1]} className="w-full h-full object-cover" />
                                </div>
                                <div className="h-1/2 rounded-2xl overflow-hidden border border-third/10">
                                    <img src={data.selectionImages[2]} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Right Big */}
                            <div className="w-[48%] md:w-[40%] rounded-3xl overflow-hidden border border-third/10">
                                <img src={data.selectionImages[3]} className="w-full h-full object-cover" />
                            </div>

                        </div>



                    </div>
                </div>
            </section>
            {/* ===== How Buying Work Section ===== */}
            <section className="relative py-12  px-2 lg:px-4">
                <div className="container">
                    <div className=" mx-auto">

                        {/* ── OUTSIDE HEADER — top left ───────────────────────────────── */}
                        <div className="flex flex-col gap-4 mb-8 max-w-lg">
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

                        {/* ── MAIN BLOCK ──────────────────────────────────────────────── */}
                        <div className="border border-third/10 rounded-3xl shadow-2xl overflow-hidden">

                            {/* ── IMAGE — smaller height ───────────────────────────────── */}
                            <div className="relative w-full h-[280px] md:h-80">

                                {/* Background images */}
                                {data.processSteps.map((step, i) => (
                                    <img
                                        key={i}
                                        src={step.image}
                                        alt={step.title}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                                    ${activeHovered === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
                                    />
                                ))}

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                                {/* ── CENTERED text inside image ───────────────────────── */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {data.processSteps.map((step, i) => {
                                        const Icon = iconMap[step.icon];
                                        return (
                                            <div
                                                key={i}
                                                className={`absolute flex flex-col items-center gap-3 text-center px-8 max-w-sm transition-all duration-500
                                            ${activeHovered === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                            >
                                                <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-third/50 bg-third/10">
                                                    <Icon size={18} strokeWidth={1.5} className="text-third/90" />
                                                </div>
                                                <h3 className="text-white text-xl md:text-2xl font-semibold font-[Montserrat] tracking-tighter leading-tight">
                                                    {step.title}
                                                </h3>
                                                <p className="text-white/55 text-sm font-[Poppins] leading-[1.8]">
                                                    {step.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>

                            {/* ── STEP CARDS ───────────────────────────────────────────── */}
                            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-third/10">
                                {data.processSteps.map((step, i) => {
                                    const Icon = iconMap[step.icon];
                                    const isHovered = hovered === i;

                                    return (
                                        <button
                                            key={i}
                                            onMouseEnter={() => setHovered(i)}
                                            onMouseLeave={() => setHovered(null)}
                                            className={`group relative flex flex-col gap-2 px-5 py-5 text-left transition-all duration-400 cursor-pointer
                                        ${isHovered ? "bg-third/5" : "hover:bg-third/5"}`}
                                        >
                                            {/* Top accent */}
                                            <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500
                                        ${isHovered ? "bg-primary/60" : "bg-transparent"}`} />

                                            {/* Icon + number */}
                                            <div className="flex items-center justify-between">
                                                <div className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-400
                                            ${isHovered
                                                        ? "border-third/40 bg-third/10 text-third/80"
                                                        : "border-third/15 text-third/35"}`}>
                                                    <Icon size={14} strokeWidth={1.5} />
                                                </div>
                                                <span className={`text-[10px] font-bold font-[Montserrat] tabular-nums transition-colors duration-300
                                            ${isHovered ? "text-third/60" : "text-third/25"}`}>
                                                    0{i + 1}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className={`text-xs font-semibold font-[Montserrat] leading-snug transition-colors duration-300
                                        ${isHovered ? "text-primary" : "text-third/45"}`}>
                                                {step.title}
                                            </h3>

                                            {/* Divider */}
                                            {i < data.processSteps.length - 1 && (
                                                <div className="absolute top-4 bottom-4 right-0 w-px bg-third/10" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* ===== Avx Inspection Section ===== */}
            <section className="py-12 px-2 lg:px-4">
                <div className=" container">
                    <div className="mx-auto">

                        {/* ── TOP HEADER ────────────────────────────────────────── */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                        Avx Inspection
                                    </p>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    {data.inspectionTitle.split("Assurance")[0]}
                                    <span className="text-fourth/80">Assurance</span>
                                </h2>
                                <p className="max-w-xs text-third/55 text-sm font-[Poppins] leading-[1.8] border-l border-third/10 ">
                                    {data.inspectionText}
                                </p>
                            </div>

                        </div>

                        {/* ── VERTICAL STEP GRID ──────────────────────────────────── */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-third/10 border border-third/10 rounded-2xl overflow-hidden">
                            {data.inspectionPoints.map((point, i) => (
                                <div
                                    key={i}
                                    onMouseEnter={() => setAvxInspectionHovered(i)}
                                    className="relative bg-secondary/10 p-10 flex flex-col gap-12 transition-colors group cursor-default h-full min-h-60"
                                >
                                    {/* Background Image Layer */}
                                    <img
                                        src={data.inspectionImages[i]}
                                        alt={point}
                                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.15] group-hover:brightness-[0.45] transition-all duration-700"
                                    />

                                    {/* Content Layer */}
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="flex justify-between items-start">
                                            <span className="text-2xl font-black font-[Montserrat] text-third/10 group-hover:text-third/20 transition-colors">
                                                0{i + 1}
                                            </span>
                                            <div className={`w-10 h-10 rounded-xl border border-third/10 flex items-center justify-center transition-all ${avxInspectionHovered === i ? 'bg-third/5 border-third' : 'bg-black/40 backdrop-blur-md'}`}>
                                                <Check size={16} className={avxInspectionHovered === i ? 'text-primary' : 'text-third/20'} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold font-[Montserrat] text-primary uppercase tracking-tight leading-tight">
                                                {point.split(" ").slice(0, 2).join(" ")}
                                            </h3>
                                            <p className="text-xs text-third/40 font-[Poppins] leading-relaxed uppercase tracking-wider">
                                                {point}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className={`absolute bottom-0 left-0 h-1 bg-third   transition-all duration-500 ${avxInspectionHovered === i ? 'w-full' : 'w-0'}`} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
            {/* ===== Customer Commitment Section ===== */}
            <section className="py-12 px-2 lg:px-4">
                <div className="container">
                    <div className=" mx-auto ">

                        {/* Container with background color, border, and shadow */}
                        <div className="bg-secondary/10 border border-third/10 rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                            <div className="flex flex-col gap-6 items-center">

                                {/* Label */}
                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                    Our Promise
                                </p>

                                {/* Title using only data content and specified styles */}
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    {data.commitmentTitle.split("Commitment")[0]}
                                    <span className="text-fourth/80">Commitment</span>
                                </h2>

                                {/* Text using specified styles */}
                                <p className="text-third/55 text-base md:text-lg font-[Poppins] leading-[1.9] max-w-3xl italic">
                                    {data.commitmentText}
                                </p>

                                {/* Simple decoration to maintain professional feel */}
                                <div className="h-px w-1/4 bg-linear-to-r from-transparent via-third/10 to-transparent mt-4" />

                            </div>

                        </div>

                    </div>
                </div>
            </section>
            {/* ===== Gallery Section ===== */}
            <section className="py-12 overflow-hidden px-2 lg:px-4">
                <div className=" container">
                    <div className=" mx-auto ">

                        {/* ── HEADER ────────────────────────────────────────────── */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex flex-col gap-6">
                                <div className="">
                                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold ">
                                        Gallery
                                    </p>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    {data.galleryTitle.split(" & ")[0]} <br />
                                    <span className="text-fourth/80">& {data.galleryTitle.split(" & ")[1]}</span>
                                </h2>
                            </div>
                            <Camera size={32} className="text-third/10 hidden md:block" />
                        </div>

                        {/* ── MAPPED MASONRY GRID ────────────────────────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.galleryImages.map((img, i) => (
                                <div
                                    key={i}
                                    className={`relative rounded-2xl overflow-hidden border border-third/10 group
                                ${i % 3 === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}
                            `}
                                >
                                    {/* Image with no grayscale */}
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover brightness-50 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000"
                                        alt={`Gallery item ${i + 1}`}
                                    />


                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </section>
            {/* ===== Testimonials Section ===== */}
            <section className="relative py-12  px-2 lg:px-4">
                <div className="container">
                    <div className=" mx-auto w-full">
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
                                        {String(testimonialsactive + 1).padStart(2, "0")}
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
                                            className={`rounded-full transition-all duration-500 ${i === testimonialsactive
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
                </div>
            </section>
        </>
    );
}

export default Hero;