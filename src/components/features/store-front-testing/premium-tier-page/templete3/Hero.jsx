import { ChevronLeft, ChevronRight, Handshake, MessageCircle, Quote, Search, ShieldCheck } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function Hero() {

    const iconMap = {
        Search: Search,
        MessageCircle: MessageCircle,
        ShieldCheck: ShieldCheck,
        Handshake: Handshake,
    };

    const data = {
        //  =====Hero Section =====
        heroTitle: "Why Choose Adarsh Auto Consultants",
        heroDescription: `
      Buyers trust Adarsh Auto Consultants for transparent communication,
      reliable vehicle options, and a smooth buying experience. Our goal
      is to help every buyer make confident vehicle decisions with clear
      information and professional support.
    `,
        heroImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
            "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9",
            "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        ],
        heroVideo: "/video.mp4",

        //  =====AboutUs Section =====
        storyTitle: "Our Experience",
        storyText: `For over 12 years, Adarsh Auto Consultants has been helping buyers
        discover reliable vehicles across Gujarat.

        Our goal is to maintain a diverse vehicle inventory and provide
        accurate information so buyers can make confident decisions when
        purchasing their next vehicle.`,
        storyImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
            "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
            "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&q=80",
        ],

        //  =====Vehicle Approach Section =====
        selectionTitle: "Our Approach to Vehicle Selection",
        selectionDescription: `Every vehicle listed through our storefront goes through a basic
        internal evaluation before being presented to buyers. This helps
        ensure that vehicles listed are suitable for serious buyers and
        provides a smoother vehicle buying experience.`,
        selectionImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=85",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85",
            "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1400&q=85",
            "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1400&q=85",
        ],

        // ===== How Buying Work Section =====
        processTitle: "How Buying Works",
        processDescription: `
      Buying a vehicle through our storefront is designed to be simple,
      transparent, and convenient for buyers.
    `,
        processSteps: [
            {
                title: "Discover Vehicles",
                description:
                    "Browse our inventory and shortlist vehicles that match your requirements.",
                icon: "Search",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            },
            {
                title: "Connect With Our Team",
                description:
                    "Use AVX chat to discuss vehicle condition, pricing, and availability.",
                icon: "MessageCircle",
                image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
            },
            {
                title: "AVX Inspection Option",
                description:
                    "Buyers can request AVX inspection to receive an independent condition report.",
                icon: "ShieldCheck",
                image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
            },
            {
                title: "Decision & Purchase",
                description:
                    "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
                icon: "Handshake",
                image: "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9",
            },
        ],

        // ===== Avx Inspection Section =====
        inspectionTitle: "AVX Inspection Assurance",
        inspectionText:
            "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
        inspectionPoints: [
            {
                label: "Exterior condition check",
                image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=85",
                tag: "01 — Exterior",
            },
            {
                label: "Interior condition check",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
                tag: "02 — Interior",
            },
            {
                label: "Visible mechanical components",
                image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=85",
                tag: "03 — Mechanical",
            },
            {
                label: "Photo & video documentation",
                image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=85",
                tag: "04 — Documentation",
            },
        ],

        // ===== Customer Section =====
        commitmentTitle: "Customer Commitment",
        commitmentText:
            "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
        commitmentImages: [
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600&q=90",
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=90",
            "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=1600&q=90",
        ],

        // ===== Gallery Section =====
        galleryTitle: "Our Showroom & Team",
        galleryImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
            "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9",
        ],
        captions: [
            "Showroom Floor",
            "Vehicle Detail",
            "Our Team",
            "Showroom Interior",
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

    const fanConfig = [
        { rotate: -8, translateX: -180, translateY: 12, scale: 0.88, zIndex: 1 },
        { rotate: -3, translateX: -70, translateY: 4, scale: 0.93, zIndex: 2 },
        { rotate: 3, translateX: 70, translateY: 4, scale: 0.93, zIndex: 3 },
        { rotate: 8, translateX: 180, translateY: 12, scale: 0.88, zIndex: 4 },
    ];

    const paragraphs = data.storyText
        .split('\n\n')
        .map(p => p.trim())
        .filter(Boolean)


    const AUTOPLAY_DURATION = 4000;
    const { inspectionText, inspectionPoints } = data;
    const { commitmentTitle, commitmentText, commitmentImages } = data;
    const { galleryTitle, galleryImages } = data;
    const [activeIndex, setActiveIndex] = useState(0)
    const [howBuyingWorksActive, setHowBuyingWorksActive] = useState(0);
    const [avxInspectionActive, setAvxInspectionActive] = useState(0);
    const [commitmentActive, setCommitmentActive] = useState(0);
    const [testimonialsactive, setTestimonialsActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(null)
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [spread, setSpread] = useState(false);
    const [visible, setVisible] = useState(true);
    const progressRef = useRef(null);
    const startTimeRef = useRef(null);
    const elapsedRef = useRef(0);
    const timeoutRef = useRef(null);
    const testimonialsTotal = data.testimonials.length;

    const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex

    const nextStep = () => {
        if (howBuyingWorksActive < data.processSteps.length - 1) {
            setHowBuyingWorksActive(howBuyingWorksActive + 1);
        }
    };

    const prevStep = () => {
        if (howBuyingWorksActive > 0) {
            setHowBuyingWorksActive(howBuyingWorksActive - 1);
        }
    };

    const ActiveIcon = iconMap[data.processSteps[howBuyingWorksActive].icon];
    const startProgress = () => {
        startTimeRef.current = performance.now() - elapsedRef.current;
        progressRef.current = requestAnimationFrame(function tick(now) {
            const elapsed = now - startTimeRef.current;
            const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
            setProgress(pct);
            elapsedRef.current = elapsed;
            if (pct < 100) {
                progressRef.current = requestAnimationFrame(tick);
            } else {
                elapsedRef.current = 0;
                setAvxInspectionActive((prev) => (prev + 1) % inspectionPoints.length);
            }
        });
    };

    const stopProgress = () => {
        if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };

    useEffect(() => {
        if (!paused) startProgress();
        return () => stopProgress();
    }, [avxInspectionActive, paused]);

    const handleSelect = (i) => {
        stopProgress();
        elapsedRef.current = 0;
        setProgress(0);
        setAvxInspectionActive(i);
        setPaused(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCommitmentActive((prev) => (prev + 1) % commitmentImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const current = inspectionPoints[avxInspectionActive];

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
            <section className="w-full flex flex-col">

                <div className=" w-full flex flex-col items-center">

                    {/* VIDEO HERO */}
                    <div className="relative w-full h-screen min-h-screen  ">

                        {/* VIDEO */}
                        <video
                            src={data.heroVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30"></div>

                        {/* CONTENT */}
                        <div className="relative z-10 h-full flex items-center justify-center">
                            <div className="max-w-5xl px-6 sm:px-10 lg:px-16 flex flex-col gap-6  items-center text-center">

                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                    Why Choose Us
                                </p>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] max-w-3xl">
                                    {data.heroTitle.split("Adarsh Auto")[0]}
                                    <span className="text-fourth">Adarsh Auto</span>
                                    {data.heroTitle.split("Adarsh Auto")[1]}
                                </h2>

                                <p className="text-primary/55 text-base sm:text-lg font-[Poppins] leading-relaxed">
                                    {data.heroDescription}
                                </p>

                                <a
                                    href="#"
                                    className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary w-fit border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
                                >
                                    Explore Listings →
                                </a>

                            </div>
                        </div>

                        {/* FLOATING IMAGE STRIP (INSIDE HERO) */}
                        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-2 md:px-6 lg:px-4 ">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2 lg:px-4 ">

                                    {data.heroImages.slice(1).map((img, index) => (
                                        <div
                                            key={index}
                                            className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
                                        >
                                            <div className="aspect-4/3 ">
                                                <img
                                                    src={img}
                                                    alt="premium"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SPACING FIX (so overlap doesn't break layout) */}
                    <div className="h-40"></div>


                </div>
            </section>
            {/* ===== AboutUs Section ===== */}
            <section className="relative flex flex-col justify-center items-center py-12 px-2 lg:px-4  overflow-hidden">
                <div className="container ">
                    <div className="relative z-10  mx-auto w-full  ">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                            {/* ── LEFT: Text ── */}
                            <div className="flex flex-col gap-6">

                                <div className="anim-label flex items-center gap-3">
                                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                        About Us
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                        Our{" "}
                                        <span className="text-fourth/80">Experience</span>
                                    </h2>

                                </div>

                                <div className="flex flex-col gap-6">
                                    {paragraphs[0] && (
                                        <p className=" text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
                                            {paragraphs[0]}
                                        </p>
                                    )}
                                    {paragraphs[1] && (
                                        <p className=" text-third/50 text-base font-[Poppins] leading-relaxed max-w-md">
                                            {paragraphs[1]}
                                        </p>
                                    )}
                                </div>


                            </div>

                            {/* ── RIGHT: 2 images, intentional overlap ── */}
                            <div className=" relative h-[460px] sm:h-[520px]">

                                {/* Main large image — floats gently */}
                                <div className="img-float img-hover absolute top-0 left-0 w-[75%] h-[72%] rounded-2xl border border-third/10 shadow-2xl overflow-hidden">
                                    <img
                                        src={data.storyImages[0]}
                                        alt="Our story"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-secondary/55 to-transparent pointer-events-none" />
                                </div>

                                {/* Second image — offset bottom-right, slight tilt, accent border */}
                                <div className="img-float-slow img-hover absolute bottom-0 right-0 w-[58%] h-[55%] rounded-2xl   shadow-2xl overflow-hidden">
                                    <img
                                        src={data.storyImages[1]}
                                        alt="Our story"
                                        className="w-full h-full object-cover rounded-2xl "
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-secondary/55 to-transparent pointer-events-none" />
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* =====Vehicle Approach Section ===== */}
            <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden">
                <div className="container">
                    <div className="mx-auto w-full px-2 lg:px-4 ">

                        {/* ══ MAIN CINEMATIC BLOCK ══ */}
                        <div className="relative w-full h-[500px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden">

                            {/* All images stacked — only active one is visible */}
                            {data.selectionImages.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`Vehicle ${i + 1}`}
                                    className={`bg-crossfade absolute inset-0 w-full h-full object-cover object-center ${displayIndex === i ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            ))}

                            {/* Layered overlays */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/10" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                            {/* ── CONTENT — pinned bottom ── */}
                            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 px-8 sm:px-12 lg:px-14 pb-8">

                                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                                    {/* Left — label + title + desc */}
                                    <div className="flex flex-col gap-5 max-w-xl">

                                        <div className="anim-label flex items-center gap-3">
                                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Vehicle Approach</p>
                                        </div>

                                        <h2 className="anim-title text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                            Our Approach to{" "}
                                            <span className="text-fourth/80">Vehicle Selection</span>
                                        </h2>



                                        <p className="anim-desc text-third/60 text-sm sm:text-base font-[Poppins] leading-relaxed">
                                            {data.selectionDescription.trim()}
                                        </p>

                                    </div>

                                    {/* Right — thumbnail strip */}
                                    <div className="anim-thumbs flex gap-3 shrink-0 overflow-x-scroll  no-scrollbar">
                                        {data.selectionImages.map((img, i) => (
                                            <div
                                                key={i}
                                                className={`thumb-img relative overflow-hidden rounded-xl border shrink-0 cursor-pointer transition-all duration-300 ${activeIndex === i
                                                    ? 'border-primary/30 w-24 h-[76px] sm:w-[108px] sm:h-[86px]'
                                                    : 'border-white/10 hover:border-third/40 w-[74px] h-[60px] sm:w-[84px] sm:h-[68px] opacity-50 hover:opacity-90'
                                                    }`}
                                                onClick={() => setActiveIndex(i)}
                                                onMouseEnter={() => setHoverIndex(i)}
                                                onMouseLeave={() => setHoverIndex(null)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Thumb ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />

                                                {/* Active indicator bar */}
                                                {activeIndex === i && (
                                                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-third/80" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </section>
            {/* ===== How Buying Work Section ===== */}
            <section className="w-full py-12 flex justify-center px-2 lg:px-4">

                <div className="container">
                    <div className=" w-full   flex flex-col gap-8">

                        {/* HEADER */}
                        <div className="max-w-2xl flex flex-col gap-4">

                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Buying Process
                            </p>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {data.processTitle.split("Works")[0]}
                                <span className="text-fourth/80">
                                    Works
                                </span>
                            </h2>

                            <p className="text-white/60 text-lg font-[Poppins] ">
                                {data.processDescription}
                            </p>

                        </div>

                        {/* STACK REVEAL */}
                        <div className="relative w-full max-h-[350px] h-[60vh] overflow-hidden rounded-3xl">

                            {data.processSteps.map((step, index) => {
                                const Icon = iconMap[step.icon];

                                return (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === howBuyingWorksActive
                                            ? "translate-y-0 z-20"
                                            : index < howBuyingWorksActive
                                                ? "-translate-y-full z-10"
                                                : "translate-y-full z-0"
                                            }`}
                                    >

                                        {/* IMAGE */}
                                        <img
                                            src={step.image}
                                            alt="step"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* OVERLAY */}
                                        <div className="absolute inset-0 bg-black/60"></div>

                                        {/* CONTENT */}
                                        <div className="absolute bottom-10 left-10 max-w-md flex flex-col gap-4">

                                            <div className="flex items-center gap-3">

                                                <p className="text-white/30 text-sm font-[Poppins]">
                                                    {`0${index + 1}`}
                                                </p>

                                                {Icon && (
                                                    <Icon className="w-5 h-5 text-white/70" />
                                                )}

                                            </div>

                                            <h3 className="text-2xl sm:text-3xl font-semibold text-white font-[Montserrat]">
                                                {step.title}
                                            </h3>

                                            <p className="text-white/60 text-sm sm:text-base font-[Poppins] leading-relaxed">
                                                {step.description}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                        {/* CONTROLS */}
                        <div className="flex justify-between items-center">

                            <div className="text-white/40 text-sm">
                                {`0${howBuyingWorksActive + 1} / 0${data.processSteps.length}`}
                            </div>

                            <div className="flex gap-4">

                                <button
                                    onClick={prevStep}
                                    disabled={howBuyingWorksActive === 0}
                                    className={`text-sm px-5 py-2 rounded-full border transition ${howBuyingWorksActive === 0
                                        ? "border-white/10 text-white/20 cursor-not-allowed"
                                        : "border-white/20 text-white hover:bg-white/10"
                                        }`}
                                >
                                    Prev
                                </button>

                                <button
                                    onClick={nextStep}
                                    disabled={howBuyingWorksActive === data.processSteps.length - 1}
                                    className={`text-sm px-5 py-2 rounded-full border transition ${howBuyingWorksActive === data.processSteps.length - 1
                                        ? "border-white/10 text-white/20 cursor-not-allowed"
                                        : "border-white/20 text-white hover:bg-white/10"
                                        }`}
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

            </section>
            {/* ===== Avx Inspection Section ===== */}
            <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden  px-2 lg:px-4">
                {/* ambient glow */}
                <div className="container">
                    <div className=" mx-auto w-full flex flex-col gap-8 relative z-10">

                        {/* ── Top header ── */}
                        <div className="flex flex-col gap-4">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Avx Inspection
                            </p>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    {data.inspectionTitle.split("Assurance")[0]}
                                    <span className="text-fourth/80">Assurance</span>
                                </h2>
                                <p className="text-third/60 text-base font-[Poppins] leading-relaxed max-w-md ">
                                    {inspectionText}
                                </p>
                            </div>
                        </div>

                        {/* ── Cinematic main block ── */}
                        <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-stretch">

                            {/* Left — full-bleed cinematic image frame */}
                            <div
                                className="relative overflow-hidden rounded-2xl aspect-16/10 lg:aspect-auto bg-secondary cursor-pointer"
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}
                            >
                                {inspectionPoints.map((point, i) => (
                                    <img
                                        key={i}
                                        src={point.image}
                                        alt={point.label}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === avxInspectionActive ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                ))}

                                {/* cinematic overlays */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                                <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />

                                {/* Top-left: live tag */}
                                <div className="absolute top-5 left-5 flex items-center gap-2">
                                    <span className="text-xs font-[Poppins] text-primary/80 tracking-[0.3em] uppercase">
                                        {current.tag}
                                    </span>
                                </div>

                                {/* Top-right: pause/play indicator */}
                                <div className="absolute top-5 right-5">
                                    <div className="w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                                        {paused ? (
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M4.5 2.5v7M7.5 2.5v7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                                                <path d="M1.5 1.5l7 4.5-7 4.5V1.5z" fill="white" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom: label + scrubber + dots */}
                                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex flex-col gap-3">
                                    <p className="text-primary font-[Montserrat] font-semibold text-lg sm:text-xl">
                                        {current.label}
                                    </p>
                                    <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${progress}%`, transition: "none" }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {inspectionPoints.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSelect(i)}
                                                className={`rounded-full transition-all duration-300 ${i === avxInspectionActive
                                                    ? "w-6 h-1.5 bg-primary"
                                                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right — vertical checklist with thumbnails */}
                            <div className="flex flex-col justify-between gap-3">
                                {inspectionPoints.map((point, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        className={`relative flex items-start gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 overflow-hidden border cursor-pointer ${i === avxInspectionActive
                                            ? "border-third/30 bg-third/5"
                                            : "border-white/6 bg-white/2 hover:border-white/12"
                                            }`}
                                    >
                                        {/* avxInspectionActive left accent bar */}
                                        <div
                                            className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300 ${i === avxInspectionActive ? "bg-third" : "bg-transparent"
                                                }`}
                                        />

                                        {/* thumbnail */}
                                        <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                                            <img
                                                src={point.image}
                                                alt={point.label}
                                                className={`w-full h-full object-cover transition-all duration-500 ${i === avxInspectionActive ? "scale-110" : "scale-100 grayscale opacity-50"
                                                    }`}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                                            <span
                                                className={`text-[10px] tracking-[0.3em] uppercase font-[Poppins] font-medium transition-colors duration-300 ${i === avxInspectionActive ? "text-primary/90" : "text-third/40"
                                                    }`}
                                            >
                                                {point.tag}
                                            </span>
                                            <span
                                                className={`text-sm font-[Poppins] leading-snug transition-colors duration-300 ${i === avxInspectionActive ? "text-primary" : "text-third/60"
                                                    }`}
                                            >
                                                {point.label}
                                            </span>
                                        </div>
                                    </button>
                                ))}

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* ===== Customer Commitment Section ===== */}
            <section className="py-12 px-2 lg:px-4">
                <div className="container">
                    <div className="relative flex items-center justify-center ">

                        {/* ── Background layer — overflow-hidden isolated here so padding on parent works ── */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl ">
                            {commitmentImages.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    aria-hidden
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === commitmentActive ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                                        }`}
                                />
                            ))}
                            <div className="absolute inset-0 bg-black/55" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
                        </div>

                        {/* ── Centered content ── */}
                        <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center gap-8 px-4 py-20 text-center">

                            <div className="flex items-center gap-3">
                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                    Our Promise
                                </p>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {commitmentTitle.split("Commitment")[0]}
                                <span className="text-fourth/80">Commitment</span>
                            </h2>


                            <p className="text-white/70 text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl">
                                {commitmentText}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ===== Gallery Section ===== */}
            <section className="w-full flex justify-center pt-12 px-4 sm:px-6 lg:px-0">
                <div className='container'>
                    <div className=" w-full flex flex-col gap-9 lg:gap-3 ">

                        {/* HEADER */}
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Gallery
                            </p>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                {galleryTitle.split("&")[0].trim()}
                                <span className="text-fourth/80">
                                    {" "}
                                    &amp; {galleryTitle.split("&")[1].trim()}
                                </span>
                            </h2>
                        </div>

                        {/* DESKTOP FAN */}
                        <div
                            className="hidden md:flex relative items-center justify-center h-80 lg:h-[380px]"
                            onMouseEnter={() => setSpread(true)}
                            onMouseLeave={() => {
                                setSpread(false);
                                setHovered(null);
                            }}
                        >
                            {galleryImages.map((src, i) => {
                                const fan = fanConfig[i];
                                const isHovered = hovered === i;

                                const tx = spread ? fan.translateX * 1.8 : fan.translateX * 1;
                                const ty = spread ? (isHovered ? -28 : fan.translateY) : fan.translateY;
                                const rot = spread ? (isHovered ? 0 : fan.rotate * 1) : fan.rotate;
                                const sc = spread ? (isHovered ? 1.05 : fan.scale) : fan.scale;

                                return (
                                    <div
                                        key={i}
                                        className="absolute transition-all duration-500 w-[260px] h-80"
                                        style={{
                                            zIndex: isHovered ? 10 : fan.zIndex,
                                            transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${sc})`,
                                        }}
                                        onMouseEnter={() => setHovered(i)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
                                            <img src={src} alt="" className="w-full h-full object-cover" />

                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                                            <div className="absolute bottom-4 left-4 right-4">
                                                <p className="text-primary font-[Montserrat] font-semibold text-base">
                                                    {data.captions[i]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* MOBILE SCROLL (REAL FIX) */}
                        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">

                            {galleryImages.map((img, i) => (
                                <div
                                    key={i}
                                    className="min-w-[260px] h-80 rounded-2xl overflow-hidden shrink-0"
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>
            {/* ===== Testimonials Section ===== */}
            <section className="relative py-12 px-2 lg:px-4">
                <div className='container'>
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
    )
}

export default Hero