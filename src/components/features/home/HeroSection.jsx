"use client";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import VehicleFilterBar from "./VehicleFilterBar";

export default function HeroSection() {
  return (
    <>
      <section className="px-4 md:px-12 lg:px-6 lg:py-4">
          <main className="relative h-[96vh] w-full overflow-visible bg-secondary font-sans rounded-sm ">
          {/* Background Image */}
          <div className="absolute h-[78vh] inset-0 z-0">
            <Image
              src="/hero_bg.jpg"
              alt="Hero Background"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Main Heading */}
          <section className="relative z-10 flex flex-col items-center justify-start min-h-screen pb-40 pt-24 px-4">
            <div className="text-center space-y-2 max-w-6xl">
              {/* Welcome Text */}
              <p className="text-primary text-base md:text-lg font-medium tracking-widest uppercase">
                Welcome to AVX
              </p>

              {/* Title */}
              <div className="relative">
                <h1 className="text-2xl md:text-6xl lg:text-6xl font-bold text-primary leading-tight tracking-tight drop-shadow-2xl">
                  Pick Your Vehicle
                </h1>
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <VehicleFilterBar />
        </main>
      </section>
    </>
  );
}
