import React from "react";
import { ShieldCheck, Video, Scan, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ReVerification = () => {
  return (
    <section className="relative overflow-hidden py-16 bg-transparent">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs tracking-[0.4em] uppercase text-white/40 font-bold">
                Professional Business Identity
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-primary">
              Reecomm Assurance
              <br />
              <span className=" bg-clip-text text-fourth">Layer</span>
            </h2>

            <p className="text-third text-sm md:text-base leading-relaxed max-w-md">
              For buyers who want more certainty, Reecomm provides optional
              post-inspection support tools — including dispute resolution
              access, re-inspection requests, and documented transaction
              records.{" "}
            </p>

            {/* <div className="pt-6 border-t border-white/5 max-w-sm">
              <p className="text-sm italic text-zinc-300 border-l-2 border-fourth/60 pl-4 py-0.5 leading-relaxed font-medium">
                Because confidence is not one-size-fits-all.
              </p>
            </div> */}
          </div>

          {/* RIGHT — Premium cards */}
          <div className="lg:col-span-7 space-y-5">
            {/* CARD 1 - Fresh Inspection */}
            <motion.div
              className="group relative rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-fourth/30 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-300"
            >
              {/* Icon container */}
              <div className="w-14 h-14 shrink-0 bg-fourth/10 border border-fourth/10 text-fourth rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-fourth/15 group-hover:border-fourth/20">
                <Scan size={26} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="grow space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fourth animate-pulse shadow-[0_0_8px_rgba(0,123,255,1)]" />
                  <span className="text-[9px] tracking-widest uppercase text-fourth font-extrabold">
                    Available
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight font-primary">
                  Final Inspection
                </h3>

                <p className="text-xs md:text-sm text-third leading-relaxed max-w-lg">
                  A structured final walkthrough checklist, completed before the
                  deal closes. Confirms the vehicle matches its listing and
                  inspection report.
                </p>
              </div>

              {/* Button arrow */}
              <div className="shrink-0 p-3 rounded-xl border border-white/5 bg-white/2 text-zinc-400 transition-all duration-300 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5">
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </div>
            </motion.div>

            {/* CARD 2 - Video Walkthrough */}
            <motion.div
              
              className="group relative rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-fourth/30 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-300"
            >
              {/* Icon container */}
              <div className="w-14 h-14 shrink-0 bg-fourth/10 border border-fourth/10 text-fourth rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-fourth/15 group-hover:border-fourth/20">
                <Video size={26} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="grow space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,1)]" />
                  <span className="text-[9px] tracking-widest uppercase text-red-400 font-extrabold">
                    Personalized
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight font-primary">
                  Video Walkthrough
                </h3>

                <p className="text-xs md:text-sm text-third leading-relaxed max-w-lg">
                  Request a live or recorded video walkthrough from the
                  consultant before committing to an in-person visit. Saves
                  time. Reduces surprises.
                </p>
              </div>

              {/* Button arrow */}
              <div className="shrink-0 p-3 rounded-xl border border-white/5 bg-white/2 text-zinc-400 transition-all duration-300 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5">
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </div>
            </motion.div>

            {/* Verification Badge Footer */}
            <div className="flex items-center gap-2 pt-3 pl-1 opacity-60">
              <ShieldCheck size={14} className="text-fourth" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-300">
                Verified by Reecomm Integrity Protocol
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReVerification;
