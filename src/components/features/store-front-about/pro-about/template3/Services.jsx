"use client"
import React from "react"
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react"

const data = [
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
]

function Services() {
    return (
        <section className="relative py-12">

            <div className="mx-auto w-full px-2 lg:px-4 max-w-6xl">

                {/* HEADER */}
                <div className="mb-8 max-w-3xl">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-8">
                        Our Services
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        What We
                        <span className="text-fourth/80"> Do</span>
                    </h2>
                </div>

                {/* GRID (NO SCROLL) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {data.map((item, i) => {
                        const Icon = item.icon

                        return (
                            <div
                                key={i}
                                className="group flex flex-col justify-between  border border-third/10 rounded-2xl p-6  backdrop-blur-lg hover:border-third/30 transition"
                            >

                                {/* TOP */}
                                <div>

                                    {/* ICON */}
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-third/10 mb-6">
                                        <Icon className="w-5 h-5 text-third" />
                                    </div>

                                    <span className="text-third/40 text-sm mb-3 block">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <h3 className="text-xl font-semibold text-primary font-[Montserrat] leading-tight mb-2  transition">
                                        {item.title}
                                    </h3>

                                </div>

                                {/* BOTTOM */}
                                <p className="text-third/60 text-sm font-[Poppins] leading-relaxed">
                                    {item.desc}
                                </p>

                            </div>
                        )
                    })}

                </div>

            </div>

        </section>
    )
}

export default Services