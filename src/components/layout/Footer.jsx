import { Facebook, Instagram, X, Youtube, ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const footerLinks = {
  buy: [
    { label: "Browse all vehicles", href: "#" },
    { label: "Cars", href: "#" },
    { label: "Two-wheelers", href: "#" },
    { label: "Reecomm Inspected", href: "#" },
    { label: "Budget under ₹3 lakh", href: "#" },
    { label: "Budget ₹3L – ₹8L", href: "#" },
    { label: "Used car buying guide", href: "#" },
  ],
  sell: [
    { label: "List your car", href: "#" },
    { label: "List your two-wheeler", href: "#" },
    { label: "Request an inspection", href: "#" },
    { label: "Seller pricing guide", href: "#" },
    { label: "RC transfer service", href: "#" },
    { label: "Doorstep inspection", href: "#" },
  ],
  consultants: [
    { label: "Become a consultant", href: "/consult" },
    { label: "Consultant pricing", href: "/consult/pricing" },
    { label: "Manage my inventory", href: "/consult/subscription" },
    { label: "Consultant success guide", href: "#" },
    { label: "Partner with Reecomm", href: "#" },
  ],
  company: [
    { label: "About us", href: "/aboutus" },
    { label: "How Reecomm works", href: "/reecomm-works" },
    { label: "Inspection process", href: "/inspection-process" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Help & FAQ", href: "/help" },
  ],
  legal: [
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className=" text-white font-sans">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between mb-16">
          {/* Brand & Description Column */}
          <div className="lg:w-[25%] flex flex-col gap-6">
            <Link href="/" className="flex items-center  gap-2">
              <div className="p-2 bg-secondary">
                <Image
                  src="/logo/logo.webp"
                  alt="Reecomm Logo"
                  width={130}
                  height={32}
                  className="h-6 md:h-8 w-auto object-contain block"
                />
              </div>
            </Link>

            <p className="text-white/90 font-medium text-[15px]">
              Buy smart. Sell fair. Move forward.
            </p>

            <p className="text-primary/60 text-[13px] leading-relaxed lg:pr-4">
              India&apos;s trusted marketplace for used cars and two-wheelers.
              Verified listings, transparent prices, and real auto consultants —
              all in one place.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mt-2">
              {/* Google Play */}
              <Link
                href="#"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded-lg w-fit"
              >
                <svg viewBox="30 336.7 120.9 129.2" width="16">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  ></path>
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  ></path>
                </svg>
                <div className="text-left">
                  <div className="text-[7px] font-bold leading-none uppercase">
                    Get it on
                  </div>
                  <div className="text-[11px] font-semibold leading-none">
                    Google Play
                  </div>
                </div>
              </Link>

              {/* App Store */}
              <Link
                href="#"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded-lg w-fit"
              >
                <svg viewBox="0 0 384 512" width="14" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="text-left">
                  <div className="text-[7px] font-bold leading-none uppercase">
                    Download on the
                  </div>
                  <div className="text-[11px] font-semibold leading-none">
                    App Store
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:w-[70%] grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {" "}
                Buy
              </h2>
              <ul className="flex flex-col gap-3">
                {footerLinks.buy.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-primary/60 hover:text-white text-[13px] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 relative lg:pr-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {" "}
                Sell
              </h2>
              <ul className="flex flex-col gap-3">
                {footerLinks.sell.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-primary/60 hover:text-white text-[13px] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Vertical line separator for desktop */}
              <div className="hidden lg:block absolute right-[-1rem] top-0 bottom-0 w-px bg-[#ffffff20]"></div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 lg:pl-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {" "}
                Consultants
              </h2>
              <ul className="flex flex-col gap-3">
                {footerLinks.consultants.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-primary/60 hover:text-white text-[13px] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {" "}
                Company
              </h2>
              <ul className="flex flex-col gap-3">
                {footerLinks.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-primary/60 hover:text-white text-[13px] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#ffffff20] text-[13px] text-primary/60">
          <div className="flex gap-6 mb-4 md:mb-0">
            {footerLinks.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-primary/60 hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </Link>
              <Link
                href="#"
                className="text-primary/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </Link>
              <Link
                href="#"
                className="text-primary/60 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="text-primary/60 hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="text-primary/60 hover:text-white transition-colors flex items-center justify-center"
              >
                {/* Tiktok SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </Link>
            </div>
            {/* <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-10 h-10 cursor-pointer rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={18} />
                        </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
