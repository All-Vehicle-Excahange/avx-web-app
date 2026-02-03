import React from 'react'

const stats = [
    { label: "Satisfied clients", value: "130K" },
    { label: "Revenue in 2023", value: "$129M" },
    { label: "Average Monthly Users", value: "1.1M" },
    { label: "Employees", value: "1230" },
    { label: "Worldwide offices", value: "342" },
    { label: "Languages", value: "10" },
];

const AboutSection = () => {
    return (
        <section className="w-full h-full text-primary">
            <div className="px-6">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold mb-16">
                    Company overview
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-14 gap-x-12">
                    {stats.map((item, index) => (
                        <div key={index} className="w-full">
                            {/* Label */}
                            <p className="text-sm md:text-base font-semibold tracking-wider text-gray-300 mb-3">
                                {item.label}
                            </p>

                            {/* Divider */}
                            <div className="w-full h-[2px] bg-primary/70 mb-6" />

                            {/* Value */}
                            <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutSection
