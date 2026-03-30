"use client"
import React from "react"
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react"

const data = {
    services: [
        {
            icon: ShieldCheck,
            title: "Secure Payments",
            desc: "PCI-DSS compliant global payment systems.",
        },
        {
            icon: Globe,
            title: "Global Infrastructure",
            desc: "99.99% uptime cloud deployment in 12 regions.",
        },
        {
            icon: TrendingUp,
            title: "Growth Tools",
            desc: "Smart CRM, analytics and automation funnels.",
        },
        {
            icon: Cpu,
            title: "AI Optimization",
            desc: "AI powered performance & conversion engines.",
        },
    ],
}

function Services() {
    return (
        <section className="relative py-12">

            <div className="mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-16">

                {/* ── LEFT: STRONG TEXT ── */}
                <div className="flex flex-col gap-6 max-w-xl">

                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Our Services
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        What We
                        <span className="text-fourth/80"> Do</span>
                    </h2>

                    <p className="text-third/70 text-md font-[Poppins] leading-relaxed">
                        We provide a complete infrastructure designed for scale, security,
                        and intelligent growth. Every system is engineered to perform under
                        real-world demand.
                    </p>

                </div>

                {/* ── RIGHT: STAGGERED SERVICES ── */}
                <div className="flex flex-col gap-12">

                    {data.services.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={i}
                                className={`flex items-start gap-5 ${i % 2 !== 0 ? "lg:ml-10" : ""
                                    }`}
                            >

                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center border border-third/10 rounded-xl">
                                    <Icon className="w-5 h-5 text-third" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-2 max-w-sm">

                                    <h3 className="text-xl font-semibold text-primary font-[Montserrat]">
                                        {item.title}
                                    </h3>

                                    <p className="text-third/60 text-sm font-[Poppins] leading-relaxed">
                                        {item.desc}
                                    </p>

                                </div>

                            </div>
                        )
                    })}

                </div>

            </div>

        </section>
    )
}

export default Services