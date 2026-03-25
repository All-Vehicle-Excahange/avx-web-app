"use client";

const data = {
    inspectionTitle: "AVX Inspection Assurance",
    inspectionText: `AVX inspection services provide additional transparency by documenting
key aspects of the vehicle's condition before purchase.`,
    inspectionPoints: [
        "Exterior condition check",
        "Interior condition check",
        "Visible mechanical components",
        "Photo & video documentation",
    ],
};

function AvxInspection() {
    return (
        <section className="py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* ── Main block ───────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">

                    {/* Left: heading + description + large accent */}
                    <div className="flex flex-col gap-8">
                        <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
                            Avx Inspection
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.inspectionTitle.split("Assurance")[0]}
                            <span className="text-fourth/80">Assurance</span>
                        </h2>
                        <p className="text-third/55 text-base font-[Poppins] leading-[1.9] max-w-md">
                            {data.inspectionText}
                        </p>

                      
                    </div>

                    {/* Right: inspection points */}
                    <div className="flex flex-col divide-y divide-third/10">
                        {data.inspectionPoints.map((point, i) => (
                            <div
                                key={i}
                                className="group flex items-center justify-between gap-6 py-5 hover:translate-x-1 transition-transform duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold tracking-[2px] text-third/25 font-[Montserrat] shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-primary/80 text-base font-[Poppins]">
                                        {point}
                                    </span>
                                </div>
                                <svg
                                    className="w-4.5 h-4.5 text-third/20 group-hover:text-third/90 shrink-0 transition-colors duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default AvxInspection;