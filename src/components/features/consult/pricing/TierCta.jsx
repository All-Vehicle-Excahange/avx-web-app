import Button from "@/components/ui/button";

export default function TierCta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* ===== HEADING ===== */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-semibold leading-[1.15] text-primary font-[Montserrat]">
            Choose your tier and start
            <span className="block mt-3 text-fourth">building visibility</span>
          </h2>
        </div>

        {/* ===== CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* ===== BASIC ===== */}
          <div className="group relative flex flex-col rounded-3xl border border-primary/10 bg-primary/3 px-10 py-12 text-center transition-all duration-500 hover:border-primary/20 hover:bg-white/6 hover:-translate-y-1">
            {/* badge */}
            <span className="inline-block self-center bg-primary/[0.07] border border-primary/10 text-primary/50 text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-full mb-8">
              Starter
            </span>

            {/* title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-fourth mb-5">
              Start as Basic
            </h3>

            {/* divider */}
            <div className="w-10 h-px bg-primary/10 mx-auto mb-5" />

            {/* description */}
            <p className="text-primary/55 leading-relaxed text-sm flex-1">
              Perfect for consultants beginning their journey with essential
              visibility tools.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Button
                href="/consultant/register?plan=basic"
                variant="outline"
                size="sm"
                showIcon
              >
                Choose Basic
              </Button>
            </div>
          </div>

          {/* ===== PRO — highlighted ===== */}
          <div
            className="group relative flex flex-col rounded-3xl px-10 py-12 text-center transition-all duration-500 hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(160deg, rgba(0,123,255,0.10) 0%, rgba(0,60,150,0.06) 100%)",
              boxShadow: "0 0 0 1px rgba(0,123,255,0.30)",
            }}
          >
            {/* badge */}
            <span className="inline-block self-center bg-fourth/20 border border-fourth/35 text-fourth text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-full mb-8">
              Most Popular
            </span>

            {/* title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-fourth mb-5">
              Upgrade to Pro
            </h3>

            {/* divider */}
            <div className="w-10 h-px bg-fourth/20 mx-auto mb-5" />

            {/* description */}
            <p className="text-primary/65 leading-relaxed text-sm flex-1">
              Unlock advanced analytics, higher visibility, and performance
              tools.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Button
                href="/consult/pricing"
                variant="ghost"
                size="sm"
                showIcon
              >
                Choose Pro
              </Button>
            </div>
          </div>

          {/* ===== PREMIUM ===== */}
          <div className="group relative flex flex-col rounded-3xl border border-primary/10 bg-white/3 px-10 py-12 text-center transition-all duration-500 hover:border-primary/20 hover:bg-white/6 hover:-translate-y-1">
            {/* badge */}
            <span className="inline-block self-center bg-primary/[0.07] border border-primary/10 text-primary/50 text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-full mb-8">
              Enterprise
            </span>

            {/* title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-fourth mb-5">
              Go Premium
            </h3>

            {/* divider */}
            <div className="w-10 h-px bg-primary/10 mx-auto mb-5" />

            {/* description */}
            <p className="text-primary/55 leading-relaxed text-sm flex-1">
              Maximum visibility, customization, and priority placement across
              Reecomm.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Button
                href="/consultant/register?plan=premium"
                variant="outline"
                size="sm"
                showIcon
              >
                Choose Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
