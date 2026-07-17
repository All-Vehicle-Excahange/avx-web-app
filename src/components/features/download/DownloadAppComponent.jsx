import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Car,
  Upload,
  FileText,
  Store,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  CheckSquare,
  Layers,
  Bell,
  Inbox,
  ChevronDown,
  ChevronUp,
  Check,
  CheckCircle2,
  UserCheck,
  Star,
  Users,
} from "lucide-react";

// Native sharp SVG QR Code generator styled for dark theme with premium container
const QRCodeMock = () => (
  <div className="w-24 h-24 p-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all duration-300">
    <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
      <rect
        x="0"
        y="0"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <rect x="8" y="8" width="14" height="14" fill="currentColor" />
      <rect
        x="70"
        y="0"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <rect x="78" y="8" width="14" height="14" fill="currentColor" />
      <rect
        x="0"
        y="70"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <rect x="8" y="78" width="14" height="14" fill="currentColor" />
      <rect x="78" y="78" width="14" height="14" fill="currentColor" />
      <path
        d="M 40,10 H 50 V 20 H 40 Z M 40,30 H 45 V 35 H 40 Z M 55,5 H 60 V 15 H 55 Z M 50,25 H 60 V 30 H 50 Z M 5,40 H 15 V 45 H 5 Z M 20,40 H 30 V 50 H 20 Z M 10,55 H 20 V 60 H 10 Z M 35,40 H 45 V 60 H 35 Z M 50,40 H 65 V 45 H 50 Z M 55,50 H 60 V 70 H 55 Z M 40,65 H 50 V 75 H 40 Z M 30,70 H 35 V 85 H 30 Z M 40,80 H 45 V 95 H 40 Z M 50,80 H 60 V 90 H 50 Z M 65,55 H 75 V 65 H 65 Z M 70,35 H 85 V 40 H 70 Z M 80,45 H 95 V 50 H 80 Z M 70,70 H 75 V 75 H 70 Z M 85,60 H 90 V 75 H 85 Z M 90,80 H 95 V 95 H 90 Z M 65,85 H 75 V 90 H 65 Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

// Active Styled Play Store Button (Matching Popups)
const PlayStoreButton = () => (
  <button
    type="button"
    onClick={() =>
      window.open(
        "https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace",
        "_blank",
      )
    }
    className="flex items-center justify-center px-5 py-3 bg-black text-white rounded-xl border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 cursor-pointer group/btn shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-[190px] shrink-0"
  >
    <div className="mr-3 transition-transform duration-300 group-hover/btn:scale-110">
      <svg viewBox="30 336.7 120.9 129.2" width="22">
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
    <div className="text-left leading-tight">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-white/50">
        Get it on
      </div>
      <div className="text-[14px] font-bold text-white font-[Montserrat]">
        Google Play
      </div>
    </div>
  </button>
);

// Active Styled App Store Button (Matching Popups)
const AppStoreButton = () => (
  <button
    type="button"
    onClick={() => window.open("https://www.apple.com/app-store", "_blank")}
    className="flex items-center justify-center px-5 py-3 bg-black text-white rounded-xl border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 cursor-pointer group/btn shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-[190px] shrink-0"
  >
    <div className="mr-3 text-white transition-transform duration-300 group-hover/btn:scale-110">
      <svg viewBox="0 0 384 512" width="20">
        <path
          fill="currentColor"
          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
        ></path>
      </svg>
    </div>
    <div className="text-left leading-tight">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-white/50">
        Download on the
      </div>
      <div className="text-[14px] font-bold text-white font-[Montserrat]">
        App Store
      </div>
    </div>
  </button>
);

function DownloadAppComponent() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is the Reecomm app free to download?",
      a: "Yes. The Reecomm app is free to download on both Android (Google Play) and iOS (App Store). Listing a vehicle and browsing listings are free. Inspection services are paid separately.",
    },
    {
      q: "What can I do on the Reecomm app that I cannot do on the website?",
      a: "The Reecomm app is required for chatting with sellers and consultants, listing your vehicle for sale, tracking your inspection report live, managing your consultant inventory, and receiving instant inquiry notifications.",
    },
    {
      q: "Can I track my vehicle inspection on the Reecomm app?",
      a: "Yes. Once you book a Reecomm inspection, the app shows you every stage in real time — from inspector assignment to on-site inspection to final report publication.",
    },
    {
      q: "Is the Reecomm app available for iPhone?",
      a: "Yes. The Reecomm app is available on both iOS (App Store) and Android (Google Play).",
    },
    {
      q: "Can consultants manage their inventory on the Reecomm app?",
      a: "Yes. Verified Reecomm consultants can add, edit, update, and manage their full vehicle inventory directly from the app — including photos, pricing, and availability.",
    },
  ];

  return (
    <div className="bg-transparent min-h-screen text-primary font-[Poppins] overflow-hidden">
      {/* SECTION 1 — HERO */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Mockup Image with pulsating radial glow */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="absolute -z-10 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full  blur-[100px] opacity-75 animate-pulse pointer-events-none" />
              <Image
                src="/moblie_app_banner.gif"
                width={420}
                height={630}
                alt="Reecomm app mockup"
                className="w-[290px] sm:w-[360px] md:w-[420px] h-auto object-contain hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
                unoptimized
              />
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              
              <h1 className="text-4xl sm:text-6xl font-black leading-[1.08] tracking-tight text-primary font-[Montserrat]">
                Chat. Track. Manage. <br />
                <span className="text-fourth drop-shadow-[0_2px_10px_rgba(0,123,255,0.15)]">
                  Everything happens here.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-third max-w-xl leading-relaxed">
                The Reecomm app is where buyers connect with sellers,
                consultants manage their inventory, and inspection reports land
                the moment they are ready. Not on the website — here.
              </p>

              {/* Trust Micro-Badges */}
              <div className="flex flex-wrap gap-4 py-3.5 border-y border-white/5 w-full max-w-xl bg-white/[0.01] px-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold text-primary">
                    4.8 Rating
                  </span>
                  <span className="text-[10px] text-third font-medium">
                    on Play Store
                  </span>
                </div>
                <div className="w-px h-4 bg-third/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold text-primary">
                    4.9 Rating
                  </span>
                  <span className="text-[10px] text-third font-medium">
                    on App Store
                  </span>
                </div>
                <div className="w-px h-4 bg-third/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-fourth" />
                  <span className="text-xs font-bold text-primary">
                    100k+ Installs
                  </span>
                  <span className="text-[10px] text-third font-medium">
                    in India
                  </span>
                </div>
              </div>

              {/* QR and Active Store Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <PlayStoreButton />
                  <AppStoreButton />
                </div>
                <div className="hidden sm:flex items-center gap-6 border-l border-third/15 pl-6">
                  <div className="flex flex-col items-center gap-1.5 group">
                    <QRCodeMock />
                    <span className="text-[10px] text-third/75 font-bold uppercase tracking-wider transition-colors group-hover:text-fourth">
                      Android
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 group">
                    <QRCodeMock />
                    <span className="text-[10px] text-third/75 font-bold uppercase tracking-wider transition-colors group-hover:text-fourth">
                      iOS App
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-third/40 font-medium pt-1">
                Free to download. Available on Android and iOS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 2 — WHO IT IS FOR */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-sm tracking-[0.3em] uppercase text-fourth font-extrabold">
              Built for every side
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
              One app. <br />
              <span className="text-fourth">Three types of users.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Card 1 */}
            <div className="bg-white/[0.02] border border-white/5 hover:border-fourth/30 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-5 text-left group shadow-lg hover:shadow-[0_20px_50px_rgba(0,123,255,0.08)]">
              <div className="w-12 h-12 bg-fourth/10 border border-fourth/20 rounded-2xl flex items-center justify-center text-fourth group-hover:scale-110 transition duration-300 group-hover:bg-fourth group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,123,255,0.4)]">
                <Car className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-primary">Buyers</h3>
                <span className="text-xs font-black uppercase text-fourth tracking-wider">
                  Find and buy with confidence
                </span>
              </div>
              <p className="text-sm text-third leading-relaxed font-medium">
                Browse verified listings, connect with consultants directly, and
                track your inspection report — from request to final report, all
                in one place.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/[0.02] border border-white/5 hover:border-fourth/30 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-5 text-left group shadow-lg hover:shadow-[0_20px_50px_rgba(0,123,255,0.08)]">
              <div className="w-12 h-12 bg-fourth/10 border border-fourth/20 rounded-2xl flex items-center justify-center text-fourth group-hover:scale-110 transition duration-300 group-hover:bg-fourth group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,123,255,0.4)]">
                <Upload className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-primary">Sellers</h3>
                <span className="text-xs font-black uppercase text-fourth tracking-wider">
                  List your vehicle in minutes
                </span>
              </div>
              <p className="text-sm text-third leading-relaxed font-medium">
                Add your vehicle details, upload photos, and go live to verified
                buyers — managed entirely from your phone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/[0.02] border border-white/5 hover:border-fourth/30 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-5 text-left group shadow-lg hover:shadow-[0_20px_50px_rgba(0,123,255,0.08)]">
              <div className="w-12 h-12 bg-fourth/10 border border-fourth/20 rounded-2xl flex items-center justify-center text-fourth group-hover:scale-110 transition duration-300 group-hover:bg-fourth group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,123,255,0.4)]">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-primary">Consultants</h3>
                <span className="text-xs font-black uppercase text-fourth tracking-wider">
                  Run your business on the go
                </span>
              </div>
              <p className="text-sm text-third leading-relaxed font-medium">
                Manage your full inventory, respond to buyer inquiries, and
                track your inspection requests — without being tied to a desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 3 — FEATURE BREAKDOWN */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-sm tracking-[0.3em] uppercase text-fourth font-extrabold">
              What's inside
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
              Every feature you need. <br />
              <span className="text-fourth">Nothing you don't.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex flex-col items-start text-left gap-4 hover:border-fourth/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md">
              <div className="p-3 bg-fourth/10 border border-fourth/20 rounded-xl text-fourth">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Direct Chat with Sellers
              </h3>
              <p className="text-sm text-third leading-relaxed font-medium">
                Message consultants and sellers directly — every conversation is
                logged, verified, and tied to a real profile. No spam, no
                anonymous contacts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex flex-col items-start text-left gap-4 hover:border-fourth/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md">
              <div className="p-3 bg-fourth/10 border border-fourth/20 rounded-xl text-fourth">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Inspection Report Tracking
              </h3>
              <p className="text-sm text-third leading-relaxed font-medium">
                Book an inspection and track every stage live — from inspector
                assignment to report publication — without refreshing a page.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex flex-col items-start text-left gap-4 hover:border-fourth/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md">
              <div className="p-3 bg-fourth/10 border border-fourth/20 rounded-xl text-fourth">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Verified Listings
              </h3>
              <p className="text-sm text-third leading-relaxed font-medium">
                Every listing you browse on the app is from a verified
                consultant or identity-checked seller. No fake listings, no
                unverified contacts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex flex-col items-start text-left gap-4 hover:border-fourth/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md">
              <div className="p-3 bg-fourth/10 border border-fourth/20 rounded-xl text-fourth">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Inventory Management
              </h3>
              <p className="text-sm text-third leading-relaxed font-medium">
                Add, edit, and manage your vehicle listings from anywhere.
                Update prices, photos, and availability on the go.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex flex-col items-start text-left gap-4 hover:border-fourth/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md">
              <div className="p-3 bg-fourth/10 border border-fourth/20 rounded-xl text-fourth">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Inquiry Management
              </h3>
              <p className="text-sm text-third leading-relaxed font-medium">
                See all your buyer inquiries in one place. Respond fast, track
                conversations, and never lose a lead to a missed notification.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 flex flex-col items-start text-left gap-4 hover:border-fourth/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md">
              <div className="p-3 bg-fourth/10 border border-fourth/20 rounded-xl text-fourth">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">
                Instant Notifications
              </h3>
              <p className="text-sm text-third leading-relaxed font-medium">
                Get notified the moment a buyer responds, an inspector is
                assigned, or your report is ready — in real time, not hours
                later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 4 — INSPECTION TRACKING (Deep Dive) */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="max-w-2xl mx-auto mb-16 flex flex-col gap-3 items-center">
            <span className="text-sm tracking-[0.3em] uppercase text-fourth font-extrabold">
              Only in the app
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
              Book. Track. Receive. <br />
              <span className="text-fourth">Your inspection, end to end.</span>
            </h2>
            <p className="text-base text-third leading-relaxed font-medium mt-4">
              Once you request a Reecomm inspection, the app becomes your live
              tracker. Watch your request move from confirmation to inspector
              assignment to on-site inspection to final report — every step
              visible, every update instant.
            </p>
          </div>

          {/* 5-Step Tracker Visual (Responsive) with Icons & Glowing States */}
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center w-full max-w-4xl mx-auto py-10 px-6 bg-white/[0.02] border border-white/5 rounded-3xl gap-8 lg:gap-4 my-10 shadow-2xl">
            {[
              {
                num: 1,
                title: "Owner approval",
                desc: "Consultant confirms access to the vehicle",
                icon: <UserCheck size={18} />,
              },
              {
                num: 2,
                title: "Request confirmed",
                desc: "Payment confirmed, inspector assigned",
                icon: <CheckCircle2 size={18} />,
              },
              {
                num: 3,
                title: "Inspector assigned",
                desc: "Your inspector contacts to schedule",
                icon: <ShieldCheck size={18} />,
              },
              {
                num: 4,
                title: "Inspection in progress",
                desc: "Inspector on-site checking 200+ points",
                icon: <Search size={18} />,
              },
              {
                num: 5,
                title: "Report ready",
                desc: "Your full report is published and ready",
                icon: <FileText size={18} />,
              },
            ].map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center gap-4 lg:gap-3 flex-1 relative z-10 group">
                  {/* Circle Badge with Icon & Pulsing active glow */}
                  <div className="w-11 h-11 rounded-full bg-fourth text-white flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(0,123,255,0.4)] shrink-0 border-2 border-fourth ring-4 ring-fourth/20 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  {/* Label Text */}
                  <div className="flex flex-col lg:items-center">
                    <span className="font-extrabold text-sm text-primary leading-tight">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-third/50 font-semibold mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                </div>
                {/* Horizontal dash connector for desktop */}
                {idx < 4 && (
                  <div className="hidden lg:block flex-1 h-0.5 border-t-2 border-dashed border-fourth/30 self-center mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs text-third/60 font-bold uppercase tracking-wider">
            No waiting for a call. No chasing updates. Just open the app.
          </p>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 5 — CHAT FEATURE (Deep Dive) */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Mockup Image of chat.webp simulating the seller screen */}
            <div className="flex justify-center items-center w-full">
              <div className="relative mx-auto w-[250px] h-[500px] rounded-[2.5rem] border-8 border-slate-950 bg-slate-955 shadow-2xl flex-shrink-0 select-none overflow-hidden ring-4 ring-white/5 hover:scale-[1.03] transition-transform duration-500 ease-out">
                <Image
                  src="/chat.webp"
                  width={300}
                  height={550}
                  alt="Direct chat between buyer and verified seller on Reecomm app"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="flex flex-col items-start text-left space-y-6">
              <span className="px-4 py-1.5 bg-fourth/10 border border-fourth/20 text-fourth text-xs font-bold rounded-full uppercase tracking-wider">
                Secure, verified communication
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-primary leading-tight tracking-tight font-[Montserrat]">
                Say hello to the seller <br />
                <span className="text-fourth">before you buy.</span>
              </h2>
              <p className="text-base text-third leading-relaxed font-medium">
                Every conversation on Reecomm happens inside the app — between
                verified profiles, logged by the platform, and tied to the
                specific vehicle you are interested in. Ask questions, negotiate
                price, and arrange a visit — all without sharing your personal
                number.
              </p>

              {/* Trust Points */}
              <div className="flex flex-col gap-3 pt-2">
                {[
                  "Every seller is identity-verified before they can receive messages",
                  "Every conversation is platform-logged for accountability",
                  "No anonymous contacts, no fake profiles",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-fourth/10 flex items-center justify-center text-fourth shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-third">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 6 — DOWNLOAD CTA (MID PAGE) */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-[Montserrat]">
            Ready to get started?
          </h2>
          <p className="text-base text-third max-w-md">
            Everything you need to buy, sell, or grow your vehicle business — in
            your pocket.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <QRCodeMock />
                <span className="text-[10px] text-third/75 font-bold uppercase tracking-wider">
                  Android
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <QRCodeMock />
                <span className="text-[10px] text-third/75 font-bold uppercase tracking-wider">
                  iOS App
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs text-third font-bold uppercase tracking-wider sm:text-left">
                Scan QR to download
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <PlayStoreButton />
                <AppStoreButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 7 — WHY THE APP, NOT JUST THE WEBSITE */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3 items-center">
            <span className="text-sm tracking-[0.3em] uppercase text-fourth font-extrabold">
              App vs website
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
              Some things only <br />
              <span className="text-fourth">happen in the app.</span>
            </h2>
          </div>

          {/* Comparison Table with Highlights */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-white/[0.03] text-primary border-b border-white/5 font-[Montserrat] text-sm uppercase tracking-wider">
                    <th className="py-4.5 px-6 font-extrabold">Feature</th>
                    <th className="py-4.5 px-6 font-extrabold text-center w-36">
                      Website
                    </th>
                    <th className="py-4.5 px-6 text-center w-36 bg-fourth/10 text-primary relative">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-fourth text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow">
                        RECOMMENDED
                      </div>
                      <span className="block pt-3 font-extrabold">App</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-sm text-third">
                  {[
                    { f: "Browse verified listings", w: true, a: true },
                    { f: "View inspection reports", w: true, a: true },
                    { f: "Chat with sellers / consultants", w: false, a: true },
                    { f: "List your vehicle", w: false, a: true },
                    { f: "Track inspection live", w: false, a: true },
                    { f: "Manage inventory (consultants)", w: false, a: true },
                    { f: "Instant inquiry notifications", w: false, a: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-6 text-primary">{row.f}</td>
                      <td className="py-4 px-6 text-center">
                        {row.w ? (
                          <Check className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] mx-auto" />
                        ) : (
                          <span className="text-third/30 font-bold">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-fourth/[0.02] ring-1 ring-fourth/10">
                        <Check className="w-5 h-5 text-fourth font-black drop-shadow-[0_0_8px_rgba(0,123,255,0.4)] mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-xs text-third/50 font-bold uppercase tracking-wider mt-8">
            The website is where you discover. The app is where things happen.
          </p>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 8 — FAQ SECTION (Accordion) */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-sm tracking-[0.3em] uppercase text-fourth font-extrabold">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
              Have questions? <br />
              <span className="text-fourth">We have answers.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left font-bold text-primary hover:bg-white/[0.04] hover:text-fourth transition cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-fourth shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-third/50 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="py-5 px-6 bg-white/[0.01] border-t border-white/5 text-sm text-third leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Decorative separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-third/10 to-transparent max-w-7xl mx-auto w-full" />

      {/* SECTION 9 — BOTTOM DOWNLOAD CTA */}
      <section className="py-24 bg-transparent text-primary">
        <div className="container mx-auto px-6 max-w-5xl text-center flex flex-col items-center gap-8">
          <h2 className="text-3xl sm:text-5xl font-black font-[Montserrat] leading-tight tracking-tight">
            Download Reecomm. <br />
            <span className="text-fourth">
              Buy smart. Sell fair. Move forward.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <QRCodeMock />
                <span className="text-[10px] text-third/75 font-bold uppercase tracking-wider">
                  Android
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <QRCodeMock />
                <span className="text-[10px] text-third/75 font-bold uppercase tracking-wider">
                  iOS App
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <span className="text-xs text-third/75 font-bold uppercase tracking-wider">
                Scan to download instantly
              </span>
              <div className="flex flex-row gap-4">
                <PlayStoreButton />
                <AppStoreButton />
              </div>
            </div>
          </div>
          <p className="text-xs text-third/40 max-w-md leading-relaxed pt-4">
            By downloading, you agree to Reecomm's{" "}
            <a
              href="/terms-and-conditions"
              className="hover:text-fourth transition underline"
            >
              Terms
            </a>{" "}
            &{" "}
            <a
              href="/privacy-policy"
              className="hover:text-fourth transition underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

export default DownloadAppComponent;
