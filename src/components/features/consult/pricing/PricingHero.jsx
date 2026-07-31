export default function PricingHero({ yearly, setYearly }) {
  return (
    <section className="relative pt-24 md:pt-30 pb-8 sm:pb-10 lg:pb-12 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* LABEL */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-sm tracking-[0.35em] uppercase text-third font-semibold bg-[#044596]/10 backdrop-blur-md mb-6">
          Pricing & Tiers
        </span>

        {/* HEADING */}
        <h1 className="text-[34px] sm:text-[48px] md:text-[60px] font-semibold leading-[1.08] text-white">
          Simple, Structured{" "}
          <span className="bg-linear-to-r from-fourth via-[#60a5fa] to-fourth bg-clip-text text-transparent font-bold">
            Pricing
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-5 text-white/60 text-[15px] md:text-[16px] leading-relaxed max-w-2xl mx-auto">
          Choose a subscription tier that fits your inventory size and growth
          ambitions. Built for transparency, scalability, and long-term
          visibility.
        </p>

        {/* TOGGLE */}
        <div className="mt-8 flex items-center justify-center">
          <div className="relative flex bg-transparent border border-primary/30 backdrop-blur-md p-1 sm:p-1.5 rounded-full w-[230px] sm:w-[300px]">
            {/* Active Pill Background */}
            <div
              className={`absolute top-1 bottom-1 sm:top-1.5 sm:bottom-1.5 w-[calc(50%-4px)] sm:w-[calc(50%-6px)] bg-primary rounded-full shadow-lg transition-all duration-300 ease-out ${
                yearly ? "left-[50%]" : "left-1 sm:left-1.5"
              }`}
            />

            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 flex-1 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${
                !yearly
                  ? "text-secondary"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 flex-1 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer duration-300 flex items-center justify-center gap-2 ${
                yearly
                  ? "text-secondary"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* GST NOTE */}
        <p className="mt-3.5 text-xs text-white/50 font-medium">
          *All plan prices are exclusive of 18% GST.
        </p>
      </div>
    </section>
  );
}
