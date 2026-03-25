"use client";

function ExperienceSection() {
  const storyText = `
    For over 12 years, Adarsh Auto Consultants has been helping buyers
    discover reliable vehicles across Gujarat.

    Our goal is to maintain a diverse vehicle inventory and provide
    accurate information so buyers can make confident decisions when
    purchasing their next vehicle.
  `;

  return (
    <section className="w-full py-12  bg-primary border-y border-secondary/10">
      <div className="max-w-7xl mx-1.5 px-4 sm:px-6 flex flex-col gap-6">

        {/* HEADER */}
        <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
          Consultant Story
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
          Our <span className="text-fourth">Experience</span>
        </h2>

        {/* TEXT */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {storyText.trim().split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-secondary/80 font-[Poppins] leading-relaxed text-sm sm:text-base md:text-lg"
            >
              {para.trim()}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ExperienceSection;