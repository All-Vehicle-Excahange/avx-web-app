import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FooterLink from "@/components/layout/FooterLink";
import Button from "@/components/ui/button";
import { Car, Home, Search } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Reecomm</title>
        <meta
          name="description"
          content="The page you are looking for does not exist on Reecomm."
        />
        <style>{`
          @keyframes pendulum {
            0%, 100% { transform: rotate(12deg); }
            50% { transform: rotate(-12deg); }
          }
        `}</style>
      </Head>

      <div className="fixed top-0 inset-x-0 z-50">
        <Navbar scrolled={true} />
      </div>

      <main className="pt-40 pb-16 flex flex-col items-center justify-start relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
          <div className="relative mb-6 flex justify-center items-center gap-1 md:gap-2 select-none group">
            <span
              className="px-6 -mx-6 text-[7rem] md:text-[11rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#222] via-[#666] to-[#111] dark:from-[#eee] dark:via-[#999] dark:to-[#ccc] leading-none cursor-default drop-shadow-2xl relative italic"
            >
              4
            </span>
            <div className="relative flex items-center justify-center w-28 h-28 md:w-44 md:h-44 -mt-2 -mx-2 md:-mx-6 z-20">
              <div
                className="absolute bottom-0 w-full flex flex-col justify-end items-center pointer-events-none z-10"
                style={{
                  height: '400px',
                  animation: 'pendulum 6s ease-in-out infinite',
                  transformOrigin: 'top center'
                }}
              >
                {/* Rope */}
                <div className="w-1.5 flex-1 bg-gradient-to-b from-transparent via-third/50 to-third dark:from-transparent dark:via-third/50 dark:to-third relative z-0">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPjxwYXRoIGQ9J00wLDQgTDQsMCcgc3Ryb2tlPSdibGFjaycgc3Ryb2tlLW9wYWNpdHk9JzAuNCcgc3Ryb2tlLXdpZHRoPScxJy8+PC9zdmc+')]"></div>
                </div>

                {/* Tire tied to rope */}
                <div className="relative z-10 -mt-2">
                  {/* The Knot */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-third/80 dark:bg-third/60 rounded-full z-20 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] flex flex-col items-center justify-evenly py-0.5 overflow-hidden border border-black/20">
                    <div className="w-full h-[1px] bg-black/40"></div>
                    <div className="w-full h-[1px] bg-black/40"></div>
                    <div className="w-full h-[1px] bg-black/40"></div>
                  </div>

                  {/* Realistic Swinging Tire Image */}
                  <img
                    src="/404 tyre.png"
                    alt="Hanging Tire"
                    className="w-28 h-28 md:w-44 md:h-44 drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Floor Shadow */}
              <div className="absolute -bottom-8 w-28 md:w-44 h-3 bg-black/20 dark:bg-white/10 blur-md rounded-full" style={{ animation: 'pendulum 6s ease-in-out infinite', transformOrigin: 'center -300px' }}></div>
            </div>
            <span
              className="px-6 -mx-6 text-[7rem] md:text-[11rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#222] via-[#666] to-[#111] dark:from-[#eee] dark:via-[#999] dark:to-[#ccc] leading-none cursor-default drop-shadow-2xl relative italic"
            >
              4
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-normal text-black/90 dark:text-white/90 mb-3 tracking-tight">
            Oops! Looks like you've driven off the map!
          </h2>
          <p className="text-third/80 max-w-xl mx-auto mb-6 text-sm md:text-base">
            We can't seem to find the page you're looking for. The vehicle may have been sold, removed, or the link might be broken.
          </p>

          <div className="flex flex-row items-center justify-center gap-4 mt-2 w-full max-w-md mx-auto">
            <Link
              href="/"
              className="inline-flex items-center justify-center font-medium select-none relative z-10 group overflow-hidden px-5 py-2.5 text-sm hover:cursor-pointer bg-primary border border-primary text-secondary rounded-full transition-all duration-200 ease-in-out hover:bg-primary/80 hover:shadow-md hover:border-primary/80 w-auto"
            >
              <Home size={16} className="mr-2" />
              Return Home
            </Link>
            <Link
              href="/search/buy-used-cars"
              className="inline-flex items-center justify-center font-medium select-none relative z-10 group overflow-hidden px-5 py-2.5 text-sm hover:cursor-pointer text-third rounded-full border border-third transition-all duration-300 hover:text-white w-auto"
            >
              <Search size={16} className="mr-2" />
              Browse Vehicles
            </Link>
          </div>
        </div>
      </main>

      <FooterLink />
      <Footer />
    </>
  );
}

Custom404.fullWidth = true;
