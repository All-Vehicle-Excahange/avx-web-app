import {
    UserCheck,
    Building2,
    Eye,
    ShieldCheck,
} from "lucide-react";

export default function AvxStructure() {
    return (
        <section className="relative  overflow-hidden">
            <div className="mx-auto max-w-6xl px-6">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-15 mt-[30]">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        The AVX Structure
                    </p>

                    <h2 className="mt-6 text-5xl xl:text-6xl font-medium leading-tight">
                        Built on verification,
                        <span className="block text-fourth">
              not just listings
            </span>
                    </h2>

                    <p className="mt-8 text-lg leading-relaxed text-third">
                        Posting on AVX follows a required verification flow.
                        Access exists under platform ownership and control.
                    </p>
                </div>

                {/* SYSTEM CORE */}
                <div className="relative flex flex-col items-center min-h-190">

                    {/* FLOW LINES */}
                    <FlowLines />

                    {/* TOP NODE */}
                    <TrustNode
                        icon={<UserCheck size={22} />}
                        title="Identity verification"
                        desc="Personal identity must be verified before platform access."
                        className="mb-28"
                    />

                    {/* MIDDLE */}
                    <div className="relative flex items-center gap-36">

                        {/* LEFT */}
                        <TrustNode
                            icon={<Building2 size={22} />}
                            title="Business validation"
                            desc="Only legitimate businesses are approved to operate."
                        />

                        {/* CORE */}
                        <div className="relative z-20 flex items-center justify-center h-85 w-80 rounded-[130px]
              border border-neutral-500
            ">

                            {/* Outer containment ring */}
                            <div className="absolute -inset-5 rounded-full border border-neutral-700 opacity-50" />

                            {/* Inner pressure ring */}
                            <div className="absolute inset-4 rounded-full border border-neutral-800 opacity-60" />

                            <div className="text-center px-10">
                                <p className="text-xs tracking-[0.35em] uppercase text-neutral-500">
                                    AVX Core
                                </p>

                                <p className="mt-4 text-2xl font-semibold leading-tight">
                                    Platform-owned
                                    <span className="block text-fourth">
                    marketplace
                  </span>
                                </p>

                                <p className="mt-4 text-sm leading-relaxed text-third">
                                    All activity operates under AVX rules,
                                    visibility logic, and enforcement.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <TrustNode
                            icon={<Eye size={22} />}
                            title="Public ownership"
                            desc="Listings appear only under visible consultant profiles."
                        />
                    </div>

                    {/* BOTTOM NODE */}
                    <TrustNode
                        icon={<ShieldCheck size={22} />}
                        title="Structured participation"
                        desc="Posting, visibility, and performance are governed by platform rules."
                        className="mt-28"
                    />

                </div>
            </div>
        </section>
    );
}

/* ===================== */
/* FLOW LINES (ENFORCED) */
/* ===================== */

function FlowLines() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* TOP → CORE */}
            <line x1="400" y1="140" x2="400" y2="242" stroke="#1e40af" strokeWidth="4" />
            <line x1="400" y1="140" x2="400" y2="242" stroke="#60a5fa" strokeWidth="1" />

            {/* LEFT → CORE */}
            <line x1="170" y1="400" x2="284" y2="400" stroke="#1e40af" strokeWidth="4" />
            <line x1="170" y1="400" x2="284" y2="400" stroke="#60a5fa" strokeWidth="1" />

            {/* RIGHT → CORE */}
            <line x1="630" y1="400" x2="512" y2="400" stroke="#1e40af" strokeWidth="4" />
            <line x1="630" y1="400" x2="512" y2="400" stroke="#60a5fa" strokeWidth="1" />

            {/* CORE → BOTTOM */}
            <line x1="400" y1="558" x2="400" y2="655" stroke="#1e40af" strokeWidth="4" />
            <line x1="400" y1="558" x2="400" y2="655" stroke="#60a5fa" strokeWidth="1" />
        </svg>
    );
}

/* ===================== */
/* TRUST NODE */
/* ===================== */

function TrustNode({ icon, title, desc, className = "" }) {
    return (
        <div className={`relative z-10 flex flex-col items-center text-center max-w-xs ${className}`}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full
        border border-neutral-700
       text-fourth
        mb-4">
                {icon}
            </div>

            <h3 className="text-m font-semibold uppercase tracking-widest text-fourth ">
                {title}
            </h3>

            <p className="mt-2 text-m leading-relaxed text-third">
                {desc}
            </p>
        </div>
    );
}