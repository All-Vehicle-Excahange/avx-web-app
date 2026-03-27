import React from 'react'

function OurStory() {

    const data = {
        storyTitle: "Our Experience",
        storyText: `For over 12 years, Adarsh Auto Consultants has been helping buyers
        discover reliable vehicles across Gujarat.

        Our goal is to maintain a diverse vehicle inventory and provide
        accurate information so buyers can make confident decisions when
        purchasing their next vehicle.`,
        storyImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
            "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
            "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&q=80",
        ],
    }

    const paragraphs = data.storyText
        .split('\n\n')
        .map(p => p.trim())
        .filter(Boolean)

    return (
        <>

            <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden">



                <div className="relative z-10  mx-auto w-full px-4">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* ── LEFT: Text ── */}
                        <div className="flex flex-col gap-6">

                            <div className="anim-label flex items-center gap-3">
                                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                    About Us
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    Our{" "}
                                    <span className="text-fourth/80">Experience</span>
                                </h2>

                            </div>

                            <div className="flex flex-col gap-6">
                                {paragraphs[0] && (
                                    <p className=" text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
                                        {paragraphs[0]}
                                    </p>
                                )}
                                {paragraphs[1] && (
                                    <p className=" text-third/50 text-base font-[Poppins] leading-relaxed max-w-md">
                                        {paragraphs[1]}
                                    </p>
                                )}
                            </div>


                        </div>

                        {/* ── RIGHT: 2 images, intentional overlap ── */}
                        <div className=" relative h-[460px] sm:h-[520px]">

                            {/* Main large image — floats gently */}
                            <div className="img-float img-hover absolute top-0 left-0 w-[75%] h-[72%] rounded-2xl border border-third/10 shadow-2xl overflow-hidden">
                                <img
                                    src={data.storyImages[0]}
                                    alt="Our story"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-secondary/55 to-transparent pointer-events-none" />
                            </div>

                            {/* Second image — offset bottom-right, slight tilt, accent border */}
                            <div className="img-float-slow img-hover absolute bottom-0 right-0 w-[58%] h-[55%] rounded-2xl   shadow-2xl overflow-hidden">
                                <img
                                    src={data.storyImages[1]}
                                    alt="Our story"
                                    className="w-full h-full object-cover rounded-2xl "
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-secondary/55 to-transparent pointer-events-none" />
                            </div>


                        </div>

                    </div>
                </div>


            </section>
        </>
    )
}

export default OurStory