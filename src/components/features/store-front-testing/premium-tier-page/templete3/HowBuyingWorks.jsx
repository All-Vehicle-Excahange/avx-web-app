import React, { useState } from 'react'
import { Search, MessageCircle, ShieldCheck, Handshake } from 'lucide-react'

function HowBuyingWorks() {

    const iconMap = {
        Search: Search,
        MessageCircle: MessageCircle,
        ShieldCheck: ShieldCheck,
        Handshake: Handshake,
    };

    const data = {
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
    };

    const [active, setActive] = useState(0);

    const nextStep = () => {
        if (active < data.processSteps.length - 1) {
            setActive(active + 1);
        }
    };

    const prevStep = () => {
        if (active > 0) {
            setActive(active - 1);
        }
    };

    const ActiveIcon = iconMap[data.processSteps[active].icon];

    return (
        <section className="w-full py-12 flex justify-center">

            <div className="max-w-7xl w-full px-2 lg:px-4  flex flex-col gap-8">

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
                <div className="relative w-full h-[60vh] overflow-hidden rounded-3xl">

                    {data.processSteps.map((step, index) => {
                        const Icon = iconMap[step.icon];

                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                    index === active
                                        ? "translate-y-0 z-20"
                                        : index < active
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
                        {`0${active + 1} / 0${data.processSteps.length}`}
                    </div>

                    <div className="flex gap-4">

                        <button
                            onClick={prevStep}
                            disabled={active === 0}
                            className={`text-sm px-5 py-2 rounded-full border transition ${
                                active === 0
                                    ? "border-white/10 text-white/20 cursor-not-allowed"
                                    : "border-white/20 text-white hover:bg-white/10"
                            }`}
                        >
                            Prev
                        </button>

                        <button
                            onClick={nextStep}
                            disabled={active === data.processSteps.length - 1}
                            className={`text-sm px-5 py-2 rounded-full border transition ${
                                active === data.processSteps.length - 1
                                    ? "border-white/10 text-white/20 cursor-not-allowed"
                                    : "border-white/20 text-white hover:bg-white/10"
                            }`}
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default HowBuyingWorks