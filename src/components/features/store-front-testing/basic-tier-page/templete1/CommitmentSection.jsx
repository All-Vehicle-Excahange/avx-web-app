"use client";

function CommitmentSection() {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-4 flex justify-center">

        {/* ── CENTER BLOCK ───────────────── */}
        <div className="max-w-2xl text-center flex flex-col gap-6">

          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
            Our Promise
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Customer <span className="text-fourth/80">Commitment</span>
          </h2>

          {/* subtle divider */}
          <div className="w-12 h-px bg-primary/40 mx-auto" />

          <p className="text-third text-lg font-[Poppins] leading-relaxed">
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