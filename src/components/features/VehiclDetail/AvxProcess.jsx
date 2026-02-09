import Image from "next/image";

export default function AvxProcess() {
  return (
    <section className="w-full bg-primary py-8">
      <div className="mx-auto max-w-[1480px] px-6">
        <div className="flex bg-secondary flex-col overflow-hidden rounded-2xl border border-secondary/20 shadow-xl lg:flex-row">
          {/* LEFT SECTION */}
          <div className="w-full lg:max-w-[500px] p-6 flex flex-col">
            {/* TITLE AT TOP */}
            <div className="mb-6 text-left">
              <h2 className="mt-2 text-[28px]   font-bold  text-primary">
                How AVX Protects Your Purchase
              </h2>
              <p className="mt-2 text-sm text-primary/80">
                From listing to delivery — structured, verified, transparent.
              </p>
            </div>

            {/* IMAGE CENTERED */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative h-[410px] w-full rounded-xl overflow-hidden">
                <Image
                  src="/7bd2443d707bd0d0fec3442adc407d609a19243e.jpg"
                  alt="AVX vehicle"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT STEPS */}

          {/* RIGHT STEPS */}
          <div className="flex-1 px-8 py-10">
            <ul className="group space-y-4">
              {/* STEP 01 – DEFAULT ACTIVE, DIM ON OTHER HOVER */}
              <li className="relative rounded-lg p-3 bg-primary/5 shadow-sm transition-all duration-300 group-hover:bg-transparent group-hover:shadow-none">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl font-bold text-primary transition-all duration-300 group-hover:text-primary/40">
                    01
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary transition-colors duration-300 group-hover:text-primary/60">
                      Seller Verification
                    </h3>
                    <p className="mt-0.5 text-xs text-primary/80 transition-colors duration-300 group-hover:text-primary/50 leading-relaxed">
                      Every consultant and seller on AVX undergoes identity,
                      KYC, and business verification before listing vehicles.
                    </p>
                  </div>
                </div>

                {/* ACTIVE BAR */}
                <span className="absolute left-0 top-0 h-full w-[2px] bg-primary rounded-full transition-opacity duration-300 group-hover:opacity-0" />
              </li>

              <div className="border-t border-dashed border-secondary/70" />

              {/* STEP 02 */}
              <li className="group/item relative rounded-lg p-3 transition-all duration-300 hover:bg-primary/5 hover:shadow-sm">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl font-bold text-primary/60 transition-all duration-300 group-hover/item:text-primary">
                    02
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      Transparent Vehicle Data
                    </h3>
                    <p className="mt-0.5 text-xs text-primary/80 leading-relaxed">
                      Every vehicle listing follows a standardized format
                      including ownership history, condition disclosure, and
                      documentation details.
                    </p>
                  </div>
                </div>

                <span className="absolute left-0 top-0 h-full w-[2px] bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover/item:scale-y-100 rounded-full" />
              </li>

              <div className="border-t border-dashed border-secondary/70" />

              {/* STEP 03 */}
              <li className="group/item relative rounded-lg p-3 transition-all duration-300 hover:bg-primary/5 hover:shadow-sm">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl font-bold text-primary/60 transition-all duration-300 group-hover/item:text-primary">
                    03
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      AVX Technical Inspection
                    </h3>
                    <p className="mt-0.5 text-xs text-primary/80 leading-relaxed">
                      Certified inspectors evaluate engine, drivetrain,
                      structure, safety systems, and cosmetic condition across
                      200+ checkpoints.
                    </p>
                  </div>
                </div>

                <span className="absolute left-0 top-0 h-full w-[2px] bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover/item:scale-y-100 rounded-full" />
              </li>

              <div className="border-t border-dashed border-secondary/70" />

              {/* STEP 04 */}
              <li className="group/item relative rounded-lg p-3 transition-all duration-300 hover:bg-primary/5 hover:shadow-sm">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl font-bold text-primary/60 transition-all duration-300 group-hover/item:text-primary">
                    04
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      Direct & Secure Communication
                    </h3>
                    <p className="mt-0.5 text-xs text-primary/80 leading-relaxed">
                      Buyers can chat, request test drives, or book
                      consultations directly through AVX — ensuring transparency
                      and accountability.
                    </p>
                  </div>
                </div>

                <span className="absolute left-0 top-0 h-full w-[2px] bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover/item:scale-y-100 rounded-full" />
              </li>

              <div className="border-t border-dashed border-secondary/70" />

              {/* STEP 05 */}
              <li className="group/item relative rounded-lg p-3 transition-all duration-300 hover:bg-primary/5 hover:shadow-sm">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl font-bold text-primary/60 transition-all duration-300 group-hover/item:text-primary">
                    05
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      Re-Assurance Inspection
                    </h3>
                    <p className="mt-0.5 text-xs text-primary/80 leading-relaxed">
                      Already inspected? You can request a fresh inspection or
                      live video walkthrough for additional confidence before
                      closing the deal.
                    </p>
                  </div>
                </div>

                <span className="absolute left-0 top-0 h-full w-[2px] bg-primary scale-y-0 origin-top transition-transform duration-300 group-hover/item:scale-y-100 rounded-full" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
