"use client";

function ExperienceSection() {
  const storyData = {
    storyTitle: "Our Experience",
    storyText: `
      For over 12 years, Adarsh Auto Consultants has been helping buyers
      discover reliable vehicles across Gujarat.

      Our goal is to maintain a diverse vehicle inventory and provide
      accurate information so buyers can make confident decisions when
      purchasing their next vehicle.
    `,
    storyImages: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    ],
  };

  return (
    <section className="w-full py-12 bg-primary border-y border-secondary/10">
      <div className=" container max-w-7xl mx-2 px-4 sm:px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* ── LEFT CONTENT ───────────────── */}
        <div className="flex flex-col gap-6">

          <p className="text-sm tracking-[0.4em] uppercase text-secondary/70 font-semibold">
            Consultant Story
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
            Our <span className="text-fourth">Experience</span>
          </h2>

          {storyData.storyText.trim().split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg"
            >
              {para.trim()}
            </p>
          ))}

          {/* subtle stat */}
         

        </div>

        {/* ── RIGHT IMAGES (CLEAN GRID) ───────────────── */}
        <div className="grid grid-cols-2 gap-4">

          {/* big image */}
          <div className="col-span-2 h-60 overflow-hidden rounded-xl border border-secondary/10">
            <img
              src={storyData.storyImages[0]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* small images */}
          <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
            <img
              src={storyData.storyImages[1]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
            <img
              src={storyData.storyImages[2]}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default ExperienceSection;