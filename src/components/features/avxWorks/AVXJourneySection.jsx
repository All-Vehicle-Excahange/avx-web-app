"use client"

import { motion } from "framer-motion"

const steps = [
    {
        title: "Discover verified vehicles",
        desc: "Browse consultant listed vehicles verified through platform quality and listing standards."
    },
    {
        title: "Evaluate structured information",
        desc: "Review standardized vehicle data, history insights, and consultant performance indicators."
    },
    {
        title: "Review inspection data",
        desc: "Access inspection reports, condition insights, and transparency driven documentation."
    },
    {
        title: "Connect with consultants",
        desc: "Interact directly with consultants through structured platform communication channels."
    },
    {
        title: "Request additional assurance (optional)",
        desc: "Request additional inspections or supporting validation before final decision making."
    },
    {
        title: "Complete the deal directly",
        desc: "Finalize pricing, negotiation, and transaction directly with the consultant."
    },
]

export default function AVXJourneySection() {
    return (
        <section className="relative overflow-hidden py-16">

            <div className="relative max-w-5xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
                        The Complete Journey
                    </p>

                    <h2 className="text-3xl md:text-[42px] font-bold text-primary mb-4">
                        The AVX Buying Flow
                    </h2>

                    <p className="text-fourth max-w-xl mx-auto text-[14px]">
                        Structured. Transparent. Accountable.
                    </p>
                </div>

                {/* FLOW RAIL */}
                <div className="relative">

                    {/* CENTER RAIL */}
                    <div className="
            absolute left-1/2 top-0 bottom-0
            w-0.5
            bg-fourth
            opacity-60
          " />

                    {/* STEPS */}
                    <div className="space-y-12">

                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className={`
                  relative flex items-center
                  ${i % 2 === 0 ? "justify-start pr-12" : "justify-end pl-12"}
                `}
                            >

                                {/* STEP CARD */}
                                <div className="
                  w-100
                 rounded-2xl
                  border border-blue-400/20
                  bg-blue-500/5
                  backdrop-blur-xl
                  p-6
                  bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]
                  hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
                  hover:border-blue-400/40
                  transition
                ">

                                    <p className="text-fourth text-sm font-medium">
                                        Step {i + 1}
                                    </p>

                                    <p className="text-primary text-[22px] font-semibold mt-2">
                                        {step.title}
                                    </p>

                                    <p className="text-[15px] text-third mt-2 leading-relaxed">
                                        {step.desc}
                                    </p>

                                </div>

                                {/* NODE DOT */}
                                <div className="
                  absolute left-1/2 -translate-x-1/2
                  w-3.5 h-3.5 rounded-full
                  bg-blue-400
                  shadow-[0_0_18px_rgba(96,165,250,0.9)]
                " />

                            </motion.div>
                        ))}

                    </div>

                </div>

            </div>

        </section>
    )
}