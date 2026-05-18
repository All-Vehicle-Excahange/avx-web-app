export default function PricingHero({ yearly, setYearly }) {
  return (
    <section className="relative pt-24 md:pt-32 pb-120 overflow-hidden">
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
          <div className="relative flex bg-transparent border border-primary/30 backdrop-blur-md p-1.5 rounded-full w-[300px]">
            {/* Active Pill Background */}
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-full shadow-lg transition-all duration-300 ease-out ${
                yearly ? "left-[50%]" : "left-1.5"
              }`}
            />

            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 flex-1 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                !yearly
                  ? "text-secondary"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 flex-1 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 flex items-center justify-center gap-2 ${
                yearly
                  ? "text-secondary"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200"
              }`}
            >
              Yearly
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
