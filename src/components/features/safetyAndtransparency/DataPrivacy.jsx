"use client";

import { motion, useInView } from "framer-motion";
import { Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─── DATA ─── */

const measures = [
  {
    title: ["Secure", "Authentication"],
    highlightIndex: 1,
    desc: "Multi-factor authentication and encrypted session handling across all user accounts.",
  },
  {
    title: ["Data", "Encryption"],
    highlightIndex: 1,
    desc: "Sensitive data is encrypted at rest and in transit using modern encryption standards.",
  },
  {
    title: ["Controlled", "Access"],
    highlightIndex: 1,
    desc: "Permission-based access ensures documents are only visible to authorised users.",
  },
  {
    title: ["Admin", "Permissions"],
    highlightIndex: 1,
    desc: "Granular admin roles with audit logging maintain operational accountability.",
  },
];

/* ─── TYPEWRITER LINE ─── */

function TypewriterLine({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || started) return;

    const timeout = setTimeout(() => {
      setStarted(true);
      let i = 0;

      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, 18);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, delay, text, started]);

  return (
    <div ref={ref} className="text-third">
      {displayed}
    </div>
  );
}

/* ─── CURSOR ─── */

function Cursor() {
  return (
    <motion.span
      className="inline-block w-[2] h-[14] bg-fourth ml-1"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  );
}

/* ─── MAIN COMPONENT ─── */

export default function DataPrivacy() {
  return (
    <section className="py-10">
      <div className="w-full mx-auto ">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <div className="mb-20 text-left">
            <div className="inline-flex items-center gap-2 mb-4 text-third font-semibold uppercase tracking-[0.35em] text-sm">
              <Shield className="w-4 h-4 text-fourth" />
              Data Privacy & Security
            </div>

            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
              Built to Protect <span className="text-fourth">Every Layer</span>
            </h2>

            <p className="text-[16px] text-third leading-relaxed">
              AVX maintains secure infrastructure covering authentication,
              encryption, document access control, and role-based admin
              permissions to protect sensitive user data.
            </p>
          </div>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT CARDS */}
          <div className="grid sm:grid-cols-2 gap-6">
            {measures.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-secondary/20 border border-primary/10 hover:border-fourth/40 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
              >
                <h4 className="text-lg font-semibold text-primary mb-2">
                  {m.title.map((word, idx) => (
                    <span
                      key={idx}
                      className={idx === m.highlightIndex ? "text-fourth" : ""}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </h4>

                <p className="text-third text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* TERMINAL */}
            <div className="rounded-2xl overflow-hidden border border-[#1f2937] bg-[#0b0d12] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f2937]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-third font-mono tracking-wide">
                  security-monitor
                </span>
              </div>

              <div className="p-5 space-y-2 font-mono text-xs">
                <TypewriterLine
                  text="Initializing security services…"
                  delay={0.2}
                />
                <TypewriterLine
                  text="Authentication service → active"
                  delay={1.2}
                />
                <TypewriterLine
                  text="Encryption layer → operational"
                  delay={2.2}
                />
                <TypewriterLine text="RBAC permissions → loaded" delay={3.2} />
                <TypewriterLine text="Audit logging → running" delay={4.2} />

                <motion.div
                  className="text-fourth mt-2 flex items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 5 }}
                  viewport={{ once: true }}
                >
                  System status: secure <Cursor />
                </motion.div>
              </div>
            </div>

            {/* COMPLIANCE */}
            <div className="rounded-2xl border border-[#1f2937] p-5">
              <p className="text-xs tracking-[0.35em] uppercase text-third mb-3">
                Compliance
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  ["SOC", "2"],
                  ["GDPR", "Ready"],
                  ["CCPA"],
                  ["ISO", "27001"],
                ].map((badge, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full border border-[#1f2937] text-third"
                  >
                    {badge.map((word, idx) => (
                      <span
                        key={idx}
                        className={idx === 0 ? "text-fourth" : ""}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
