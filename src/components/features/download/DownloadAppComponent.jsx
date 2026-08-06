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

// Premium QR Code component using official scannable QR image
const QRCodeMock = ({ src = "/app-qr.webp" }) => (
  <div className="flex flex-col items-center gap-1 group/qr cursor-pointer">
    <div className="w-28 h-28 p-2 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] border border-white/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/qr:shadow-[0_6px_20px_rgba(0,123,255,0.2)]">
      <Image
        src={src}
        alt="Reecomm App QR Code"
        width={112}
        height={112}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">
      Scan QR
    </span>
  </div>
);


import {
  GooglePlayButton as PlayStoreButtonComponent,
  AppStoreButton as AppStoreButtonComponent,
} from "@/components/ui/AppDownloadButtons";

const PlayStoreButton = () => <PlayStoreButtonComponent variant="white" disableRedirect />;
const AppStoreButton = () => <AppStoreButtonComponent variant="white" disableRedirect />;

function DownloadAppComponent() {
  const [openFaq, setOpenFaq] = useState(0);

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
      <section className="relative overflow-hidden bg-transparent">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-10 lg:mb-8">
            {/* Left Column: Mockup Image with pulsating radial glow */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="absolute -z-10 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full  blur-[100px] opacity-75 animate-pulse pointer-events-none" />
              <Image
                src="/downloadpagemockup.webp"
                width={420}
                height={630}
                alt="Reecomm app mockup"
                className="w-[290px] sm:w-[360px] md:w-[420px] h-auto object-contain hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
                unoptimized
              />
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-primary ">
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

              {/* QR and Active Store Buttons Grouped by Platform */}
              <div className="flex flex-row gap-3 pt-4 w-full">
                {/* Android Group */}
                <div className="flex-1 flex items-center gap-4">
                  <PlayStoreButton />
                  <div className="hidden sm:flex flex-col items-center gap-1.5 group shrink-0">
                    <QRCodeMock />
                  </div>
                </div>

                {/* iOS Group */}
                <div className="flex-1 flex items-center gap-4">
                  <AppStoreButton />
                  <div className="hidden sm:flex flex-col items-center gap-1.5 group shrink-0">
                    <QRCodeMock src="/ios-qr.webp" />
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

      {/* SECTION 2 — WHO IT IS FOR */}
      <section className="container bg-transparent">

        <div className="text-center -mt-5 lg:-mt-8 max-w-2xl mx-auto mb-12 flex flex-col gap-3">
          <span className="text-sm tracking-[0.3em] uppercase text-fourth font-semibold">
            Built for every side
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary tracking-tight">
            One app. <br />
            <span className="text-fourth">Three types of users.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  sm:gap-8">
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

      </section>

      {/* SECTION 3 — FEATURE BREAKDOWN */}
      <section className="container bg-transparent">
        <div className="text-center py-4 max-w-2xl mx-auto mb-10 flex flex-col gap-3">
          <span className="text-sm tracking-[0.3em] uppercase text-fourth font-semibold">
            What's inside
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary tracking-tight">
            Every feature you need. <br />
            <span className="text-fourth">Nothing you don't.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      </section>

      {/* SECTION 4 — INSPECTION TRACKING (Deep Dive) */}
      <section className="container bg-transparent">

        <div className="max-w-2xl py-4 text-center mx-auto mb-10 flex flex-col gap-3 items-center">
          <span className="text-sm tracking-[0.3em] uppercase text-fourth font-semibold">
            Only in the app
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary tracking-tight">
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

      </section>

      {/* SECTION 5 — CHAT FEATURE (Deep Dive) */}
      <section className="container bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Mockup Image of chat.webp simulating the seller screen */}
          <div className="flex justify-center items-center w-full">
            <div className="relative mx-auto w-[250px] rounded-2xl shadow-2xl flex-shrink-0 select-none overflow-hidden hover:scale-[1.03] transition-transform duration-500 ease-out">
              <Image
                src="/Chatscreensa.webp"
                width={300}
                height={550}
                alt="Direct chat between buyer and verified seller on Reecomm app"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="flex flex-col items-start text-left space-y-6">
            <span className="px-4 py-1.5 bg-fourth/10 border border-fourth/20 text-fourth text-xs font-bold rounded-full uppercase tracking-wider">
              Secure, verified communication
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-primary">
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

      </section>

      {/* SECTION 6 — DOWNLOAD CTA (MID PAGE) */}

      {/* SECTION 7 — WHY THE APP, NOT JUST THE WEBSITE */}
      <section className="container bg-transparent">

        <div className="text-center py-4 max-w-xl mx-auto mb-10 flex flex-col gap-3 items-center">
          <span className="text-sm tracking-[0.3em] uppercase text-fourth font-semibold">
            App vs website
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-primary">
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

      </section>

      {/* SECTION 8 — FAQ SECTION (Accordion) */}
      <section className="container bg-transparent">

        <div className="text-center py-4 max-w-2xl mx-auto mb-10 flex flex-col gap-3">
          <span className="text-sm tracking-[0.3em] uppercase text-fourth font-semibold">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-primary">
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
                  className="w-full py-5 px-6 flex justify-between items-center text-left font-semibold text-sm md:text-base text-primary hover:bg-white/[0.04] hover:text-fourth transition cursor-pointer gap-4"
                >
                  <span>{faq.q}</span>
                  <div className="shrink-0 transition-transform duration-300">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-fourth" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-third/50" />
                    )}
                  </div>
                </button>

                {/* Smooth height/opacity collapse transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="py-5 px-6 bg-white/[0.01] border-t border-white/5 text-sm text-third leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* SECTION 9 — BOTTOM DOWNLOAD CTA */}
      <section className="py-8 bg-fourth text-primary">
        <div className="container text-center flex flex-col items-center gap-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-primary">
            Download Reecomm. <br />
            <span className="text-primary">
              Buy smart. Sell fair. Move forward.
            </span>
          </h2>
          <div className="flex flex-row justify-center gap-3 pt-4 w-full max-w-sm sm:max-w-none">
            {/* Android Group */}
            <div className="flex-1 sm:flex-none flex items-center gap-4">
              <PlayStoreButton />
              <div className="hidden sm:flex flex-col items-center gap-1.5 group shrink-0">
                <QRCodeMock />
              </div>
            </div>

            {/* iOS Group */}
            <div className="flex-1 sm:flex-none flex items-center gap-4">
              <AppStoreButton />
              <div className="hidden sm:flex flex-col items-center gap-1.5 group shrink-0">
                <QRCodeMock src="/ios-qr.webp" />
              </div>
            </div>
          </div>
          <p className="text-xs text-primary/80 max-w-md leading-relaxed pt-4">
            By downloading, you agree to Reecomm's{" "}
            <a
              href="/terms-and-conditions"
              className="hover:text-secondary transition underline"
            >
              Terms
            </a>{" "}
            &{" "}
            <a
              href="/privacy-policy"
              className="hover:text-secondary transition underline"
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
