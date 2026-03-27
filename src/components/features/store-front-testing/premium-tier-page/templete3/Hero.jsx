import React from 'react'

function Hero() {

    const data = {
        heroTitle: "Why Choose Adarsh Auto Consultants",
        heroDescription: `
      Buyers trust Adarsh Auto Consultants for transparent communication,
      reliable vehicle options, and a smooth buying experience. Our goal
      is to help every buyer make confident vehicle decisions with clear
      information and professional support.
    `,
        heroImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
            "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9",
            "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        ],
        heroVideo: "/video.mp4"
    };

    return (
        <div className="w-full flex flex-col items-center">

            <section className="w-full flex flex-col">

                {/* VIDEO HERO */}
                <div className="relative w-full h-screen min-h-screen  ">

                    {/* VIDEO */}
                    <video
                        src={data.heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30"></div>

                    {/* CONTENT */}
                    <div className="relative z-10 h-full flex items-center justify-center">
                        <div className="max-w-5xl px-6 sm:px-10 lg:px-16 flex flex-col gap-6  items-center text-center">

                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Why Choose Us
                            </p>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] max-w-3xl">
                                {data.heroTitle.split("Adarsh Auto")[0]}
                                <span className="text-fourth">Adarsh Auto</span>
                                {data.heroTitle.split("Adarsh Auto")[1]}
                            </h2>

                            <p className="text-primary/55 text-base sm:text-lg font-[Poppins] leading-relaxed">
                                {data.heroDescription}
                            </p>

                            <a
                                href="#"
                                className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary w-fit border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
                            >
                                Explore Listings →
                            </a>

                        </div>
                    </div>

                    {/* FLOATING IMAGE STRIP (INSIDE HERO) */}
                    <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-2 md:px-6 lg:px-4 ">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2 lg:px-4 ">

                                {data.heroImages.slice(1).map((img, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
                                    >
                                        <div className="aspect-4/3 ">
                                            <img
                                                src={img}
                                                alt="premium"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>

                {/* SPACING FIX (so overlap doesn't break layout) */}
                <div className="h-40"></div>

            </section>

        </div>
    )
}

export default Hero