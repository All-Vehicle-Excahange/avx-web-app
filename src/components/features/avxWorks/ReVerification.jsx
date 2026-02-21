import React from "react";
import { ShieldCheck, Video, Scan, ArrowUpRight } from "lucide-react";

const ReVerification = () => {
    return (
        <section className="relative overflow-hidden">
            {/* ambient glow */}

            <div className="w-full py-16 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* LEFT — Narrative */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8">
                <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Optional Re-Verification
                </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                            Additional assurance,
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-fourth to-[#60a5fa]">
                    when you need it.
                </span>
                        </h2>

                        <p className="text-third leading-relaxed max-w-md">
                            Even if a vehicle already includes an inspection report, buyers
                            can request deeper verification for total peace of mind.
                        </p>

                        <p className="text-sm italic text-third mt-6 border-l border-fourth pl-4">
                            Because confidence is not one-size-fits-all.
                        </p>
                    </div>

                    {/* RIGHT — Premium cards */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* CARD */}
                        <div className="group relative rounded-2xl p-px bg-linear-to-br from-primary/30 via-primary/5 to-transparent hover:from-fourth/40 transition-all duration-500">
                            <div className="relative rounded-2xl bg-secondary p-7 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">

                                {/* icon */}
                                <div className="w-16 h-16 shrink-0 bg-fourth/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-fourth/20">
                                    <Scan className="text-fourth" size={30} />
                                </div>

                                {/* content */}
                                <div className="grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-fourth animate-pulse" />
                                        <span className="text-[10px] tracking-widest uppercase text-fourth font-semibold">
                        Available
                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-primary mb-2">
                                        Fresh inspection
                                    </h3>

                                    <p className="text-sm text-third leading-relaxed">
                                        Request a newly conducted professional inspection to verify
                                        the vehicle’s real-time mechanical condition.
                                    </p>
                                </div>

                                {/* arrow */}
                                <button className="shrink-0 p-3 rounded-xl border border-primary/10 text-third transition-all duration-300 group-hover:text-primary group-hover:border-fourth group-hover:bg-fourth/10">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="group relative rounded-2xl p-px bg-linear-to-br from-primary/10 via-primary/5 to-transparent hover:from-fourth/40 transition-all duration-500">
                            <div className="relative rounded-2xl bg-secondary p-7 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">

                                {/* icon */}
                                <div className="w-16 h-16 shrink-0 bg-fourth/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-fourth/20">
                                    <Video className="text-fourth" size={30} />
                                </div>

                                {/* content */}
                                <div className="grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                        <span className="text-[10px] tracking-widest uppercase text-red-400 font-semibold">
                        Personalized
                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-primary mb-2">
                                        Video walkthrough
                                    </h3>

                                    <p className="text-sm text-third leading-relaxed">
                                        Get a personalized video focusing on the exact areas you
                                        want to inspect before making your decision.
                                    </p>
                                </div>

                                {/* arrow */}
                                <button className="shrink-0 p-3 rounded-xl border border-primary/10 text-third transition-all duration-300 group-hover:text-primary group-hover:border-fourth group-hover:bg-fourth/10">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* footer */}
                        <div className="flex items-center gap-2 pt-2 opacity-70">
                            <ShieldCheck size={15} className="text-fourth" />
                            <span className="text-[11px] tracking-wide uppercase text-third">
                    Verified by AVX
                </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReVerification;