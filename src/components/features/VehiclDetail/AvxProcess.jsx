import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * ProcessStep Sub-component
 * Handles individual step logic to avoid calling hooks inside a loop.
 */
function ProcessStep({ step, scrollYProgress, threshold, isLast }) {
  const isTextRight = step.contentAlign === "right";

  // Hooks called at the top level of the component
  const dotColor = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold],
    ["#ffffff", "#2563eb"], // Transition to bg-fourth (blue)
  );

  const dotScale = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.05],
    [1, 1.4, 1.2],
  );

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
      {/* Icon Column (Large Number) */}
      <div
        className={`w-full md:w-[45%] flex justify-center mb-6 md:mb-0 ${
          isTextRight
            ? "md:order-1 md:justify-end"
            : "md:order-3 md:justify-start"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative text-9xl font-semibold bg-linear-to-b from-primary to-transparent bg-clip-text text-transparent select-none"
        >
          {step.id}
        </motion.div>
      </div>

      {/* Center Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-white bg-white shadow-sm"
          style={{
            backgroundColor: dotColor,
            scale: dotScale,
          }}
        />
      </div>

      {/* Text Column */}
      <div
        className={`w-full md:w-[45%] text-center md:text-left ${
          isTextRight ? "md:order-3" : "md:order-1 md:text-right"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isTextRight ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div
            className={`flex items-center gap-3 md:gap-4 mb-3 ${
              !isTextRight
                ? "md:flex-row-reverse justify-center md:justify-start"
                : "justify-center md:justify-start"
            }`}
          >
            <h3 className="text-xl md:text-3xl font-bold text-primary">
              {step.title}
            </h3>
          </div>

          <p
            className={`text-primary opacity-70 text-base md:text-lg leading-relaxed max-w-lg ${
              !isTextRight ? "md:ml-auto" : "md:mr-auto"
            }`}
          >
            {step.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * AvxProcess Component
 * Main container handling the scroll progress and layout.
 */
export default function AvxProcess() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const steps = [
    {
      id: 1,
      title: "Estimate Your Rate",
      description:
        "Tell us what you need to insure, how much it's worth, and where you live and estimate your rate (with different options for deductibles) in less than one minute.",
      contentAlign: "right",
    },
    {
      id: 2,
      title: "Apply For Coverage",
      description:
        "Tell us a bit more about yourself and your jewelry and, in most cases, your coverage starts immediately. If someone else actually wears the jewelry, tell us about them too.",
      contentAlign: "left",
    },
    {
      id: 3,
      title: "Review Your Policy",
      description:
        "Take a moment to look over the details of your protection plan. We make sure everything is transparent and easy to understand before you commit.",
      contentAlign: "right",
    },
    {
      id: 4,
      title: "Security & Protection",
      description:
        "Your items are now protected against theft, loss, and damage. We provide world-class security for your most precious belongings.",
      contentAlign: "left",
    },
    {
      id: 5,
      title: "Instant Verification",
      description:
        "Receive your digital certificate of insurance instantly. Share it with jewelers or keep it for your records with a simple click.",
      contentAlign: "right",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full relative overflow-hidden py-12"
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header with Vertical Accent */}
        <div className="flex justify-between items-end mb-16">
          <div className="flex items-start gap-4">
            {/* VERTICAL ACCENT LINE */}
            <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-fourth " />

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                Avx Process
              </h2>
              <p className="text-primary/50 mt-1">
                A simple and transparent journey to protect your most valued
                possessions.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Central Background Track */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200" />

          {/* Animated Filling Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-fourth origin-top z-10"
            style={{
              scaleY,
              height: "100%",
            }}
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                scrollYProgress={scrollYProgress}
                threshold={index / (steps.length - 1)}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
