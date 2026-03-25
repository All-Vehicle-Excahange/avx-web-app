"use client";

const sellers = [
  {
    title: "Individual Vehicle Owners",
    description: "Own a car and want to sell it directly — no agents, no middlemen.",
  },
  {
    title: "First-Time Sellers",
    description: "Never sold before? AVX walks you through every step simply.",
  },
  {
    title: "Buyers Selling Their Own Car",
    description: "Upgrading? Sell your current car before or after your next purchase.",
  },
];

function WhoCanSell() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto  flex flex-col gap-16">

        {/* ── Header — centered ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Eligibility
            </p>
          </div>
          <h2 className="   text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]">
            Who Can Sell
            <br />
            <span className="text-fourth/80">on AVX?</span>
          </h2>
          <p className="text-third/60 text-lg font-[Poppins] leading-relaxed max-w-md">
            AVX is built for real people selling their own vehicles — not dealers or aggregators.
          </p>
        </div>


        {/* ── 3 seller types — horizontal pills ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
          {sellers.map((seller, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 p-8   hover:border-primary/40 transition-all duration-300 border border-third/10 rounded-2xl"
           >
              {/* Number */}
              <span className="text-[13px] font-bold tracking-[2px] text-third font-[Montserrat]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Check + Title */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-third/15 border border-third/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-third" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary font-[Montserrat] leading-snug">
                  {seller.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-third/65 text-md leading-[1.8] font-[Poppins]">
                {seller.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Important note — full width dark strip ────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 border rounded-xl border-primary/10 ">
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-third shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-third/70 text-md font-[Poppins] leading-relaxed">
              Individual sellers can list{" "}
              <span className="text-primary font-semibold">1 active vehicle at a time.</span>{" "}
              Once sold or removed, you can list again immediately.
            </p>
          </div>
          <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2 border rounded-md border-third/30 bg-third/10">
            <span className="w-1.5 h-1.5 rounded-full bg-third" />
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-third font-[Poppins] whitespace-nowrap">
              Individual Only
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhoCanSell;