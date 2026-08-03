"use client";
import Image from "next/image";

export default function InteractionSection() {
  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto w-full">
        <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase text-third font-semibold mb-6 sm:mb-10">
          Reecomm Inspection Layer
        </p>

        {/* HEADER */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary">
            Direct Communication.
            <span className="block text-fourth">Platform Accountability.</span>
          </h2>

          <p className="mt-4 sm:mt-6 w-full max-w-3xl text-sm sm:text-base lg:text-lg text-third leading-relaxed">
            All buyer-consultant communication on Reecomm happens within the
            platform. This isn&apos;t just convenience — it&apos;s
            accountability. Every conversation is logged, structured, and tied
            to a verified profile.
          </p>
        </div>

        {/* STAIR VISUALS (Flex Column on Mobile, Stair Row on Desktop) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-6">
          {/* LEFT IMAGE + POINTS */}
          <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:w-auto">
            <div className="w-[200px] sm:w-[240px] lg:w-64 h-auto rounded-2xl sm:rounded-3xl overflow-hidden lg:-translate-y-20 shadow-xl">
              {/* left image */}
              <Image
                src="/hello1.webp"
                alt="Chat feature preview"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* POINT LIST (belongs to left image) */}
            <ul className="space-y-3 sm:space-y-4 text-primary text-sm sm:text-base px-2 max-w-md">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-fourth shrink-0" />
                Conversations linked to verified consultant profiles
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-500 shrink-0" />
                Inquiry history visible to both parties
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-500 shrink-0" />
                Platform support accessible at every step
              </li>
            </ul>
          </div>

          {/* CENTER CHAT (ANCHOR) */}
          <div className="w-full max-w-[260px] sm:max-w-[300px] lg:w-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* chat UI image */}
            <Image
              src="/Chatscreensa.webp"
              alt="Main Chat Interface"
              width={800}
              height={500}
              className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl"
              priority
            />
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-[200px] sm:w-[240px] lg:w-64 h-auto rounded-2xl sm:rounded-3xl overflow-hidden lg:translate-y-8 shadow-xl">
            {/* right image */}
            <Image
              src="/hello2.webp"
              alt="Consultant interaction detail"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* FOOTNOTE */}
        <p className="mt-12 sm:mt-16 max-w-3xl text-xs sm:text-sm text-third leading-relaxed">
          Reecomm facilitates structured communication — but negotiations and
          final decisions happen directly between buyer and consultant.
        </p>
      </div>
    </section>
  );
}
