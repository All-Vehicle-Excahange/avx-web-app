

import Button from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";

export default function NoCommissionModel() {
    return (
        <section className="relative py-20 sm:py-20 lg:py-20 overflow-hidden">
            {/* decorative 0% watermark */}
            <div className="absolute right-[-80] top-1/2 -translate-y-1/2 text-[220px] md:text-[300px] font-black text-white/[0.018] select-none pointer-events-none hidden lg:block leading-none">
                0%
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">
                <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-14 lg:gap-0 items-start">
                    {/* ── LEFT ── */}
                    <div className="lg:pr-16">
                        <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
                            Revenue Model
                        </span>

                        {/* big number */}
                        <div className="mb-6 mt-0">
                            <span className="text-[88px] sm:text-[110px] md:text-[128px] font-black leading-none text-primary tracking-tight">
                                0<span className="text-fourth">%</span>
                            </span>

                            {/* strikethrough label — more intentional */}
                            <div className="mt-3 flex items-center gap-3">
                                <div className="h-px w-6 bg-fourth/50 shrink-0" />
                                <span className="text-[15px] tracking-[0.4em] uppercase text-third font-medium">
                                    Commission
                                </span>
                            </div>
                        </div>

                        <p className="text-third text-[15px] leading-[1.8] max-w-sm mb-8">
                            Every sale you close is entirely yours. AVX earns through
                            subscription — not by taking a cut of your work.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 pt-3 w-fit">
                            <Button variant="ghost" href={"/consult/pricing"}>
                                View Pricing
                                <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>

                    <div className="hidden lg:block w-px bg-linear-to-b from-transparent via-[#1f2937] to-transparent mx-8 self-stretch" />

                    <div className="lg:pl-6 ">
                        {[
                            {
                                label: "01",
                                title: "Full Pricing Control",
                                body: "Set your own prices and negotiate on your terms. AVX never interferes with how you close deals.",
                            },
                            {
                                label: "02",
                                title: "Direct Transactions",
                                body: "All payments happen independently. AVX connects buyers and sellers without sitting in the middle.",
                            },
                            {
                                label: "03",
                                title: "Predictable Costs",
                                body: "One flat subscription. No surprise deductions, no scaling fees — what you pay is what you pay.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-6 py-7  cursor-default"
                            >
                                <span className="text-[18px] text-third md:text-third lg:text-third font-bold transition-colors duration-200 pt-1 shrink-0 tabular-nums w-5">
                                    {item.label}
                                </span>

                                <div>
                                    <h3 className="text-[15px] font-semibold text-primary transition-colors duration-200 mb-1.5">
                                        {item.title}
                                    </h3>
                                    <p className="text-[13px] text-third leading-relaxed">
                                        {item.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}