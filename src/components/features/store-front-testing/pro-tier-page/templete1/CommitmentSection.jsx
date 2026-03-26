"use client";

function CommitmentSection() {
  return (
    <section className="relative w-full py-12 overflow-hidden">

      {/* ── BACKGROUND ───────────────── */}
      <div className="absolute inset-0">

        {/* image */}
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105"
          alt="background"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 " />

        {/* left fade */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

        {/* center soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      {/* ── CONTENT ───────────────── */}
      <div className="relative z-10 flex items-center justify-center text-center px-4">

        <div className="max-w-3xl flex flex-col items-center gap-6">

          {/* small label */}
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Our Promise
          </p>

          {/* heading */}
          <h2 className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Customer{" "}
            <span className="text-blue-500">Commitment</span>
          </h2>

          {/* divider */}
          <div className="w-16  bg-white/30" />

          {/* description */}
          <p className="text-white/80 text-base sm:text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl">
            Our goal is to maintain transparent communication and assist buyers
            throughout the vehicle discovery and purchase process. We aim to
            provide honest guidance and reliable information for every buyer.
          </p>

        </div>

      </div>
    </section>
  );
}

export default CommitmentSection;