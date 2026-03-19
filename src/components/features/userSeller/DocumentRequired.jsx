"use client";

import { useEffect, useRef, useState } from "react";
import { User, CreditCard, Car, ShieldCheck } from "lucide-react";

const docs = [
    { name: "Aadhaar Card", icon: User, required: true },
    { name: "PAN Card", icon: CreditCard, required: true },
    { name: "Vehicle RC", icon: Car, required: true },
    { name: "Insurance", icon: ShieldCheck, required: false },
];

export default function DocumentsRequired() {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setInView(true),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative   overflow-hidden">
            <div className="container">

                {/* Heading */}
                <div className={`mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                    <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Verification Protocol
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mt-4">
                        Documents <span className="text-fourth/80">Required</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {docs.map((doc, i) => {
                        const Icon = doc.icon;

                        return (
                            <div
                                key={i}
                                className={`group relative p-8 rounded-2xl border border-primary/20  
                    hover:border-primary/40 `}

                            >


                                {/* icon */}
                                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-xl  border border-primary/20 text-primary ">
                                    <Icon className="w-5 h-5" />
                                </div>

                                {/* text */}
                                <h3 className="text-lg font-semibold text-primary mb-1 uppercase tracking-tight">
                                    {doc.name}
                                </h3>
                                <p className="text-[10px] tracking-widest uppercase text-third font-bold">
                                    {doc.required ? "Mandatory" : "Optional"}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className={`mt-12 p-6 rounded-xl border-l-2 border-primary  flex items-center justify-between flex-wrap gap-4 transition-all duration-1000 delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <p className="text-third text-sm md:text-base italic max-w-2xl">
                        {`KYC helps improve listing authenticity and ensures a secure structural marketplace for all sellers.`}
                    </p>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-third font-bold  px-3 py-1 rounded-full border border-primary/20">
                        Trust Layer Verified
                    </span>
                </div>

            </div>
        </section>
    );
}