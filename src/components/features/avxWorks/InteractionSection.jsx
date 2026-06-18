"use client";
import Image from "next/image";

export default function InteractionSection() {
  return (
    <section className=" py-16 overflow-hidden">
      <div className="mx-auto w-full">
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-10">
          Reecomm Inspection Layer
        </p>

        {/* HEADER */}
        <div className="max-w-3xl mb-15">
          <h2 className="text-5xl font-semibold leading-tight text-primary">
            Direct Communication.
            <span className="block text-fourth">Platform Accountability.</span>
          </h2>

          <p className="mt-6 w-4xl text-lg text-third leading-relaxed">
            All buyer-consultant communication on Reecomm happens within the
            platform. This isn&apos;t just convenience — it&apos;s accountability. Every
            conversation is logged, structured, and tied to a verified profile.
          </p>
        </div>

        {/* STAIR VISUALS */}
        <div className="relative flex items-end justify-center gap-2">
          {/* LEFT IMAGE + POINTS */}
          <div className="flex flex-col gap-10">
            <div className="w-65 h-auto rounded-3xl overflow-hidden -translate-y-27.5 ">
              {/* left image */}
              <Image
                src="/chat-image-1.webp"
                alt="Chat UI"
                width={800}
                height={500}
                className="w-full h-full object-cover "
              />
            </div>

            {/* POINT LIST (belongs to left image) */}
            <ul className="space-y-4 text-primary text-base pl-2">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-fourth" />
                Conversations linked to verified consultant profiles
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-500" />
                Inquiry history visible to both parties
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-500" />
                Platform support accessible at every step
              </li>
              {/* <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-500" />
                Compare vehicles
              </li> */}
            </ul>
          </div>

          {/* CENTER CHAT (ANCHOR) */}
          <div className="w-[320px] h-150 rounded-3xl overflow-hidden  shadow-2xl ">
            {/* chat UI image */}

            <Image
              src="/chat-image2.jpeg"
              alt="Chat UI"
              width={800}
              height={500}
              className="w-full h-full object-fit-cover"
            />
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-65 h-auto rounded-3xl overflow-hidden translate-y-10">
            {/* right image */}
            <Image
              src="/chat-image-3.webp"
              alt="Chat UI"
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* FOOTNOTE */}
        <p className="mt-16 max-w-3xl text-sm text-third leading-relaxed">
          Reecomm facilitates structured communication — but negotiations and
          final decisions happen directly between buyer and consultant.
        </p>
      </div>
    </section>
  );
}
