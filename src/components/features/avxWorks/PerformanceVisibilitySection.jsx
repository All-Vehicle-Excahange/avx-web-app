"use client";

import { Star, Clock, AreaChart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PerformanceVisibilitySection() {
    return (
        <section className="relative py-16  overflow-hidden">
            {/* ambient glow */}
            <div className="absolute left-1/2 top-0 w-175 h-175  rounded-full" />

            <div className="relative w-full mx-auto ">
                <div>
                    <p className="text-xs tracking-[0.35em] uppercase text-third font-semibold mb-4">
                        Performance Visibility
                    </p>

                    <h2 className="text-3xl md:text-[42px] font-bold text-primary leading-tight">
                        Consultant Storefronts with
                        <span className="block text-fourth">Accountability</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="max-w-xl space-y-8">
                        <div>
                            <p className="text-[15px] text-third mt-4 leading-relaxed">
                                Every consultant operates through a transparent public profile
                                where buyers can evaluate performance metrics, reliability
                                signals, and responsiveness before making decisions.
                            </p>
                        </div>

                        {/* LIST */}
                        <div className="space-y-3 pt-2">
                            {[
                                "Active inventory visibility",
                                "Ratings & reviews transparency",
                                "Inspection performance ratios",
                                "Response time indicators",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-fourth rounded-full" />
                                    <p className="text-sm text-primary/90">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-primary/10">
                            <p className="text-sm text-third leading-relaxed">
                                Transparency ensures buyers understand both the vehicle
                                condition and the consultant behind it before engaging.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT METRICS GRID */}
                    <div className="grid sm:grid-cols-2 mt-[16] gap-5">
                        <Metric
                            icon={<AreaChart />}
                            title="Active Inventory"
                            desc="View current listings available from the consultant."
                        />

                        <Metric
                            icon={<Star />}
                            title="Ratings & Reviews"
                            desc="See feedback and satisfaction signals from buyers."
                        />

                        <Metric
                            icon={<ShieldCheck />}
                            title="Inspection Ratios"
                            desc="Understand quality and inspection performance levels."
                        />

                        <Metric
                            icon={<Clock />}
                            title="Response Time"
                            desc="Know how quickly consultants engage with buyers."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Metric({ icon, title, desc }) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-xl border hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] border-primary/10 bg-secondary/80 backdrop-blur-xl hover:border-blue-400/40 transition hover:bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]"
        >
            <div className="text-3xl mb-3">{icon}</div>

            <p className="text-primary font-semibold text-sm">{title}</p>
            <p className="text-[13px] text-third mt-1 leading-relaxed">{desc}</p>
        </motion.div>
    );
}