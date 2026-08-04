"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import {
  User,
  Store,
  Search,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  BarChart3,
  PhoneCall,
  Mail,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

export default function StartLandingPage() {

  const cardsData = [
    {
      id: "sell-personal",
      badgeIcon: <User className="h-5 w-5 text-white" />,
      badgeLabel: "Personal",
      title: "Sell My Personal Vehicle",
      description:
        "Selling your own car or bike? List it on Reecomm. No dealership required.",
      image: "/seller1.webp",
      buttonText: "Sell My Vehicle",
      href: "/become-seller",
      buttonVariant: "ghost",
      features: [
        { icon: <Clock className="w-3.5 h-3.5 text-fourth" />, text: "List in minutes" },
        { icon: <Users className="w-3.5 h-3.5 text-fourth" />, text: "Reach genuine buyers" },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-fourth" />, text: "Safe & secure" },
      ],
    },
    {
      id: "dealer-consultant",
      badgeIcon: <Store className="h-5 w-5 text-white" />,
      badgeLabel: "Business",
      title: "I'm a Dealer / Consultant",
      description:
        "Grow your business online. Create your own digital showroom. Get more enquiries.",
      image: "/storefront.webp",
      buttonText: "Start Selling Professionally",
      href: "/become-consultant",
      buttonVariant: "ghost",
      features: [
        { icon: <Store className="w-3.5 h-3.5 text-fourth" />, text: "Digital showroom" },
        { icon: <TrendingUp className="w-3.5 h-3.5 text-fourth" />, text: "More enquiries" },
        { icon: <BarChart3 className="w-3.5 h-3.5 text-fourth" />, text: "Business growth" },
      ],
    },
    {
      id: "buy-vehicle",
      badgeIcon: <Search className="h-5 w-5 text-white" />,
      badgeLabel: "Buyer",
      title: "Buy a Vehicle",
      description:
        "Browse trusted listings. Find verified consultants. Buy with confidence.",
      image: "/reach-verified-buyers-2.webp",
      buttonText: "Explore Vehicles",
      href: "/search",
      buttonVariant: "ghost",
      features: [
        { icon: <CheckCircle className="w-3.5 h-3.5 text-fourth" />, text: "Verified listings" },
        { icon: <Users className="w-3.5 h-3.5 text-fourth" />, text: "Trusted consultants" },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-fourth" />, text: "Safe deals" },
      ],
    },
    {
      id: "join-community",
      badgeIcon: <FaWhatsapp className="h-5 w-5 text-white" />,
      badgeLabel: "Community",
      title: "Join the Reecomm Community",
      description:
        "Connect with dealers, consultants, and industry pros. Get exclusive business tips, updates, and early access to Reecomm.",
      image: "/growing-business.webp",
      buttonText: "Join on WhatsApp",
      href: "https://whatsapp.com/channel/0029Vb8nchQDuMRksRpT4Y1B",
      target: "_blank",
      rel: "noopener noreferrer",
      buttonVariant: "ghost",
      features: [
        { icon: <Users className="w-3.5 h-3.5 text-fourth" />, text: "Dealer network" },
        { icon: <TrendingUp className="w-3.5 h-3.5 text-fourth" />, text: "Business tips" },
        { icon: <CheckCircle className="w-3.5 h-3.5 text-fourth" />, text: "Early access" },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent text-primary overflow-x-hidden font-secondary selection:bg-fourth selection:text-white">
      {/* Subtle Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-fourth/15 via-white/5 to-fourth/15 blur-[120px] rounded-full opacity-70" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-fourth/10 blur-[140px] rounded-full opacity-50" />

      {/* TOP HEADER */}
      <header className="pt-10 sm:pt-14 pb-6 text-center relative z-10 px-4">
        <Link
          href="/"
          className="inline-flex flex-col items-center group cursor-pointer"
        >
          <div className="relative">
            <Image
              src="/logo/logo.webp"
              alt="Reecomm Logo"
              width={170}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300"
              priority
            />
          </div>
          <p className="mt-2 text-xs sm:text-sm font-medium tracking-[0.15em] text-white/70 uppercase">
            Buy Smart. Sell Fair. Move Forward.
          </p>
        </Link>
      </header>

      {/* MAIN CONTAINER */}
      <main className="container pb-16 relative z-10">
        {/* HERO TITLE & SUBTITLE */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-primary tracking-tight text-primary leading-tight"
          >
            What would you like to do today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base md:text-lg text-third max-w-xl mx-auto leading-relaxed"
          >
            Choose the option that matches you. We&apos;ll take you to the right place.
          </motion.p>
        </div>

        {/* FOUR CORE ACTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-14">
          {cardsData.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group/card relative flex flex-col justify-between rounded-2xl bg-[#141414]/90 border-2 border-third/30 hover:border-third/60 p-4 sm:p-5 shadow-2xl hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)] transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Image Container */}
                <div className="hidden sm:flex relative w-full h-36 sm:h-40 rounded-xl bg-[#1a1b20] border border-[#262830] overflow-hidden items-center justify-center mb-3 group-hover/card:border-[#3a3d4a] transition-colors duration-300">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover/card:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Badge Icon */}
                <div className="flex items-center justify-center mb-2">
                  <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover/card:bg-fourth/10 group-hover/card:border-fourth/30 transition-colors duration-300">
                    {card.badgeIcon}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold font-primary text-center text-primary mb-1.5 group-hover/card:text-fourth transition-colors duration-300 leading-snug">
                  {card.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-[12.5px] text-third text-center leading-relaxed mb-3 min-h-[36px] px-1 line-clamp-2">
                  {card.description}
                </p>
              </div>

              <div>
                {/* CTA Button */}
                <div className="w-full">
                  <Button
                    href={card.href}
                    target={card.target}
                    rel={card.rel}
                    variant={card.buttonVariant}
                    size="sm"
                    full
                    showIcon
                    className="w-full font-semibold cursor-pointer py-2 px-2 text-xs sm:text-[12px] xl:text-[13px] whitespace-nowrap tracking-tight shadow-lg group-hover/card:scale-[1.01] transition-transform duration-200"
                  >
                    {card.buttonText}
                  </Button>
                </div>

                {/* Bottom Feature Pills */}
                <div className="border-t border-white/10 pt-3 mt-3 grid grid-cols-3 gap-2 text-center">
                  {card.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex flex-col items-center justify-center gap-1 px-1 py-1"
                    >
                      <div className="p-1 rounded-full bg-white/5 text-primary">
                        {feat.icon}
                      </div>
                      <span className="text-[11px] font-medium text-third/90 leading-tight">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HELP & SUPPORT BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-[#16171b] via-[#1a1b22] to-[#16171b] border border-[#262832] p-6 sm:p-10 mb-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1 text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-bold font-primary text-primary">
              Still not sure? We&apos;re here to help!
            </h3>
            <p className="text-third text-sm sm:text-base mt-2">
              Talk to our team and we&apos;ll guide you.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mt-6">
              <Link
                href="https://wa.me/918460160697"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#333] bg-[#1c1d22] text-primary hover:bg-[#25D366]/20 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300 cursor-pointer font-medium text-sm sm:text-base shadow-md group"
              >
                <FaWhatsapp className="text-lg text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </Link>

              <Link
                href="tel:+919876543210"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#333] bg-[#1c1d22] text-primary hover:bg-fourth/20 hover:border-[#FACC15] hover:text-fourth transition-all duration-300 cursor-pointer font-medium text-sm sm:text-base shadow-md group"
              >
                <PhoneCall className="h-4 w-4 text-fourth group-hover:scale-110 transition-transform" />
                <span>Call Us</span>
              </Link>

              <Link
                href="mailto:support@reecomm.com"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#333] bg-[#1c1d22] text-primary hover:bg-white/15 hover:border-white hover:text-white transition-all duration-300 cursor-pointer font-medium text-sm sm:text-base shadow-md group"
              >
                <Mail className="h-4 w-4 text-third group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>Email Us</span>
              </Link>

              <Link
                href="/help"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#333] bg-[#1c1d22] text-primary hover:bg-fourth/20 hover:border-fourth hover:text-fourth transition-all duration-300 cursor-pointer font-medium text-sm sm:text-base shadow-md group"
              >
                <HelpCircle className="h-4 w-4 text-fourth group-hover:scale-110 transition-transform" />
                <span>Help Center</span>
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex relative w-64 sm:w-72 md:w-80 h-36 sm:h-44 md:h-48 items-center justify-center shrink-0">
            <Image
              src="/cs.webp"
              alt="Reecomm Help & Support"
              fill
              sizes="(max-width: 768px) 250px, 320px"
              className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>

        {/* MOBILE APP DOWNLOAD BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl w-full min-h-[220px] sm:min-h-[300px] md:min-h-[380px] bg-gradient-to-r from-[#14151a] via-[#1a1c24] to-[#14151a] sm:bg-[url('/app-downlaod-bg.webp')] bg-cover bg-center bg-no-repeat border border-[#262832] p-6 sm:p-8 md:p-10 mb-14 shadow-2xl relative overflow-hidden flex items-center justify-between"
        >
          <div className="flex-1 text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-primary text-primary leading-tight max-w-[600px]">
              <span className="font-bold">Chat. Track. Manage.</span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-semibold mt-1.5 text-primary/95">
                Everything happens in the Reecomm app
              </span>
            </h3>
            <p className="text-third text-xs sm:text-sm md:text-base mt-3 max-w-[580px] leading-relaxed">
              Connect with vehicle dealers, consultants, and industry professionals. <br />
              Track inspection reports, buy, sell, and manage listings — all from your phone.
            </p>

            <div className="flex flex-row flex-nowrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 mt-6">
              {/* Google Play Button */}
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace&pcampaignid=web_share",
                    "_blank"
                  )
                }
                className="px-3.5 sm:px-6 py-2 flex items-center justify-center bg-primary text-secondary hover:bg-secondary hover:text-primary sm:bg-secondary sm:text-primary sm:hover:bg-primary sm:hover:text-secondary transition-all duration-300 rounded-lg cursor-pointer border border-primary/10 whitespace-nowrap"
              >
                <div className="mr-2 sm:mr-3 shrink-0">
                  <svg viewBox="30 336.7 120.9 129.2" className="w-5 sm:w-[25px]">
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
                </div>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold">GET IT ON</div>
                  <div className="text-sm sm:text-lg font-semibold leading-none">
                    Google Play
                  </div>
                </div>
              </button>

              {/* App Store Button */}
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/in/app/reecomm/id6789502528",
                    "_blank"
                  )
                }
                className="px-3.5 sm:px-6 py-2 flex items-center justify-center bg-primary text-secondary hover:bg-secondary hover:text-primary sm:bg-secondary sm:text-primary sm:hover:bg-primary sm:hover:text-secondary transition-all duration-300 rounded-lg cursor-pointer border border-primary/10 whitespace-nowrap"
              >
                <div className="mr-2 sm:mr-3 shrink-0">
                  <svg viewBox="0 0 384 512" className="w-4 sm:w-[23px]">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold">Download on the</div>
                  <div className="text-sm sm:text-lg font-semibold leading-none">
                    App Store
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-third mb-5">
            Follow us on
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Link
              href="https://www.instagram.com/reecommindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="h-11 w-11 rounded-full border border-[#2e2e2e] bg-[#1a1a1a] flex items-center justify-center text-white hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
            >
              <FaInstagram className="text-lg" />
            </Link>

            <Link
              href="https://www.facebook.com/reecommindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-11 w-11 rounded-full border border-[#2e2e2e] bg-[#1a1a1a] flex items-center justify-center text-white hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
            >
              <FaFacebookF className="text-lg" />
            </Link>

            <Link
              href="https://youtube.com/@reecomm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="h-11 w-11 rounded-full border border-[#2e2e2e] bg-[#1a1a1a] flex items-center justify-center text-white hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
            >
              <FaYoutube className="text-lg" />
            </Link>

            <Link
              href="https://www.linkedin.com/company/reecomm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-11 w-11 rounded-full border border-[#2e2e2e] bg-[#1a1a1a] flex items-center justify-center text-white hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
            >
              <FaLinkedinIn className="text-lg" />
            </Link>

            <Link
              href="https://www.x.com/Reecommindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="h-11 w-11 rounded-full border border-[#2e2e2e] bg-[#1a1a1a] flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-secondary transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
            >
              <FaXTwitter className="text-lg" />
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-third font-medium mb-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/aboutus"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              About Reecomm
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Visit Website
            </Link>
          </div>

          <p className="text-xs text-third/60">
            &copy; {new Date().getFullYear()} Reecomm. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
