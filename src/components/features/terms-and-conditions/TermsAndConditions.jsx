"use client";
import {
  ShieldCheck,
  CreditCard,
  UserCheck,
  Mail,
  ChevronDown,
  ArrowUpRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "ownership", num: "01", title: "Ownership & Identity" },
  { id: "eligibility", num: "02", title: "User Account Eligibility" },
  { id: "marketplace", num: "03", title: "Marketplace Role" },
  { id: "listings", num: "04", title: "Listings & Quality" },
  { id: "pricing", num: "05", title: "Pricing & Market Data" },
  { id: "payments", num: "06", title: "Payments & Invoicing" },
  { id: "ppc", num: "07", title: "Sponsored PPC Listings" },
  { id: "conduct", num: "08", title: "Prohibited Activities" },
  { id: "liability", num: "09", title: "Limitation of Liability" },
  { id: "termination", num: "10", title: "Account Termination" },
  { id: "governing", num: "11", title: "Governing Law" },
  { id: "contact", num: "12", title: "Contact Information" },
];

const summaryCards = [
  {
    title: "Marketplace Role",
    points: [
      "Solely a technology connector",
      "Not a dealer, broker, or owner",
      "No involvement in user negotiations"
    ]
  },
  {
    title: "Quality & Verification",
    points: [
      "Inspections for listing quality",
      "No condition/performance warranties",
      "Buyers must do independent checking"
    ]
  },
  {
    title: "Payments & PPC",
    points: [
      "Processed via Razorpay (Quba Infotech)",
      "PPC visibility depends on market",
      "GST invoices issued by Quba Infotech"
    ]
  },
  {
    title: "Legal & Liability",
    points: [
      "No purchase or sale warranties",
      "Governed by Indian Law (Gujarat)",
      "Strict listing rules & guidelines"
    ]
  },
];

const trustItems = [
  { text: "Technology Connector Platform", icon: <ShieldCheck size={18} /> },
  { text: "Secure Razorpay Processing", icon: <CreditCard size={18} /> },
  { text: "Indian Governing Jurisdiction", icon: <UserCheck size={18} /> },
];

// ── small reusable pieces ──────────────────────────────────────────────────

function SectionNum({ n }) {
  return (
    <p className="text-sm tracking-[0.2em] uppercase text-primary/20 mb-1.5">
      {n}
    </p>
  );
}

function SectionTitle({ children }) {
  // Split the title into words
  const words = children.split(" ");
  const firstWord = words[0];
  const restOfTitle = words.slice(1).join(" ");

  return (
    <h2 className="text-2xl font-semibold text-primary mb-5 tracking-tight">
      {firstWord} {restOfTitle && (
        <span className="text-fourth/80">{restOfTitle}</span>
      )}
    </h2>
  );
}

// Custom font weight mapping and layout helper for Body
function Body({ children, className = "" }) {
  return (
    <p className={`text-lg leading-[1.9] text-primary/50 font-light ${className}`}>
      {children}
    </p>
  );
}

function SubLabel({ children }) {
  return (
    <p className="text-sm tracking-[0.18em] uppercase text-primary/25 mt-6 mb-2.5">
      {children}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 text-md leading-[1.85] text-primary/50 font-light">
          <span className="text-primary/18 shrink-0 mt-px">–</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── main component ─────────────────────────────────────────────────────────

export default function TermsAndConditions() {
  const [active, setActive] = useState("ownership");
  const [tocOpen, setTocOpen] = useState(false);
  const obs = useRef(null);

  useEffect(() => {
    obs.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.current.observe(el);
    });
    return () => obs.current?.disconnect();
  }, []);

  const goto = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Offset for the sticky mobile header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setTocOpen(false);
  };

  return (
    <div className="text-primary font-['Poppins'] min-h-screen">      

      <div className=" mx-auto">

        {/* ── HERO ── */}
        <header className="pt-16 pb-14 border-b border-primary/8">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            Legal · Terms of Service
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-4">
            Terms & <span className="text-fourth/80">Conditions</span>
          </h1>
          <p className="text-lg font-light text-primary/50 leading-[1.85] max-w-[480px] mb-7">
           {"Your guidelines, your agreement. Please read the Terms of Service for using the Reecomm marketplace platform — transparent and direct rules."}
          </p>
          <div className="flex items-center gap-5 text-sm tracking-wide text-primary/45">
            <span>Last Updated: January 2026</span>
            <span className="w-px h-3 bg-primary/15" />
            <span>Effective Immediately</span>
          </div>

          {/* Trust strip with Icons */}
          <div className="flex border border-primary/8 rounded-md overflow-hidden mt-9 max-md:flex-col">
            {trustItems.map((t, i) => (
              <div
                key={i}
                className="flex-1 flex items-center gap-3 px-5 py-3.5 border-r border-primary/8 last:border-r-0 text-base text-primary/45 font-light max-md:border-r-0 max-md:border-b max-md:last:border-b-0"
              >
                <span className="text-primary/25">{t.icon}</span>
                {t.text}
              </div>
            ))}
          </div>
        </header>

        {/* ── QUICK SUMMARY with Key Points ── */}
        <section className="py-12 border-b border-primary/8">
          <p className="text-xl font-semibold text-primary tracking-tight mb-5">
            Quick  <span className="text-fourth/80">Summary</span>
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
            {summaryCards.map((c, i) => (
              <div
                key={i}
                className="bg-primary/3 border border-primary/8 rounded-md p-5 hover:border-primary/15 transition-colors duration-200"
              >
                <p className="text-md font-semibold text-primary/70 mb-3">{c.title}</p>
                <ul className="space-y-2">
                  {c.points.map((p, idx) => (
                    <li key={idx} className="text-[14px] leading-normal text-primary/55 font-light flex gap-2">
                      <span className="text-primary/20">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── BODY LAYOUT ── */}
        <div className="flex gap-14 items-start  py-12 pb-20 max-md:flex-col max-md:gap-0">

          {/* ── TOC SIDEBAR (desktop) ── */}
          <aside className="w-[196px] max-h-[83vh] overflow-y-scroll shrink-0 sticky top-20 max-md:hidden [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/15 [&::-webkit-scrollbar-thumb]:rounded-full">
            <p className="text-[14px] tracking-[0.2em] uppercase text-primary/40 mb-3 pl-3.5">
              Contents
            </p>
            {sections.map((s) => (
              <div
                key={s.id}
                onClick={() => goto(s.id)}
                className={`
                  flex items-center gap-2.5 px-3.5 py-3 cursor-pointer transition-all duration-150
                  border-l-[1.5px] rounded-r-sm
                  ${active === s.id
                    ? "border-primary/55 bg-primary/2"
                    : "border-transparent hover:border-primary/20 hover:bg-primary/2"}
                `}
              >
                <span className={`text-[13px] min-w-[22px] ${active === s.id ? "text-primary/45" : "text-primary/20"}`}>
                  {s.num}
                </span>
                <span className={`text-[15px] font-light leading-snug ${active === s.id ? "text-primary/78" : "text-primary/30"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0">

            {/* Sticky Mobile TOC */}
            <div className="hidden max-md:block mb-7 sticky top-20 z-30">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex justify-between items-center px-5 py-3  backdrop-blur-md border border-primary/10 rounded-md shadow-sm text-sm tracking-wide uppercase text-primary/60 cursor-pointer"
              >
                <span>Table of Contents</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${tocOpen ? "rotate-180" : ""}`} />
              </button>
              {tocOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 backdrop-blur-md border border-primary/10 rounded-md shadow-xl overflow-hidden max-h-[60vh] overflow-y-auto z-40">
                  {sections.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => goto(s.id)}
                      className={`flex gap-3.5 items-center px-5 py-4 border-b border-primary/5 last:border-b-0 cursor-pointer text-sm transition-colors duration-150
                        ${active === s.id ? "bg-primary/4 text-primary" : "text-primary/50 backdrop-blur-xl "}`}
                    >
                      <span className="text-[11px] text-primary/30 min-w-[22px]">{s.num}</span>
                      {s.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── SECTIONS ── */}
            <div id="ownership" className="py-11 border-b border-primary/7">
              <SectionNum n="01" />
              <SectionTitle>Ownership & Identity</SectionTitle>
              <Body>{"Reecomm is a vehicle marketplace platform designed to connect buyers and sellers."}</Body>
              <SubLabel>Company Ownership</SubLabel>
              <BulletList items={[
                "Reecomm is a product of Quba Infotech, a registered proprietorship firm founded and operated by Loriya Anas.",
                "All operational decisions, product management, and commercial operations of Reecomm are managed by Quba Infotech."
              ]} />
              <SubLabel>App Store Publication</SubLabel>
              <BulletList items={[
                "Due to Apple App Store publisher verification rules for sole proprietorships, our iOS applications are published under the individual developer account name 'Loriya Anas'.",
                "Loriya Anas is the founder and sole proprietor of Quba Infotech. References to 'Reecomm', 'we', 'our', or 'us' refer collectively to the Reecomm marketplace, Quba Infotech, and Loriya Anas."
              ]} />
            </div>

            <div id="eligibility" className="py-11 border-b border-primary/7">
              <SectionNum n="02" />
              <SectionTitle>User Account Eligibility</SectionTitle>
              <Body className="mb-5">{"Access guidelines for users of the Reecomm marketplace."}</Body>
              <BulletList items={[
                "You must be at least 18 years of age to register an account or create listings.",
                "You agree to provide true, current, and accurate details during account registration.",
                "You are responsible for keeping your login credentials secure, and for all activities under your account."
              ]} />
              <SubLabel>App Device Permissions</SubLabel>
              <BulletList items={[
                "To use the Reecomm mobile application on iOS or Android, you may be required to grant the Platform permission to access specific device features: Location services (for showing nearby vehicles), Camera (for taking vehicle photos/documents), Photo Library (for uploading gallery media and saving edited images), Microphone (for video listings), and Push Notifications (for instant alerts).",
                "You may revoke these permissions at any time through your device settings, but doing so may limit your ability to use core features of the Platform."
              ]} />
            </div>

            <div id="marketplace" className="py-11 border-b border-primary/7">
              <SectionNum n="03" />
              <SectionTitle>Marketplace Role</SectionTitle>
              <Body className="mb-5">{"Clarification of Reecomm's exact role in your vehicle search and transactions."}</Body>
              <BulletList items={[
                "Reecomm is solely a technology platform that connects buyers and sellers. Reecomm is not a dealer, broker, auctioneer, agent, financier, insurer, transporter, or owner of the listed vehicles.",
                "Unless expressly stated, Reecomm does not participate in the negotiation, ownership transfer, payment settlement between users (except processing platform service payments such as PPC promotions), delivery, or registration of vehicles.",
                "All transaction terms, including condition and ownership checks, are strictly between the buyer and the seller."
              ]} />
            </div>

            <div id="listings" className="py-11 border-b border-primary/7">
              <SectionNum n="04" />
              <SectionTitle>Listings & Quality</SectionTitle>
              <Body>We try to keep our platform clean and double-check listings for quality, but we operate with strict disclaimers.</Body>
              <SubLabel>Seller Obligations</SubLabel>
              <BulletList items={[
                "Sellers must verify vehicle ownership before listing.",
                "All photos, prices, specifications, and descriptions must be accurate and authentic."
              ]} />
              <SubLabel>Verification Disclaimer</SubLabel>
              <BulletList items={[
                "Reecomm may conduct inspections and verification procedures to improve marketplace quality.",
                "Such verification does not constitute a guarantee, certification, or warranty regarding the vehicle's condition, ownership, legality, or future performance.",
                "Buyers are encouraged to conduct their own independent inspection before completing any transaction."
              ]} />
            </div>

            <div id="pricing" className="py-11 border-b border-primary/7">
              <SectionNum n="05" />
              <SectionTitle>Pricing & Market Data</SectionTitle>
              <Body className="mb-5">Discovering prices on our marketplace platform.</Body>
              <BulletList items={[
                "Reecomm is designed to help buyers and sellers discover competitive market prices through listings, inspection insights, and marketplace tools.",
                "Reecomm does not guarantee that any listed price is the lowest, highest, or most favorable available in the market.",
                "Market data values are estimates and should not replace independent appraisals."
              ]} />
            </div>

            <div id="payments" className="py-11 border-b border-primary/7">
              <SectionNum n="06" />
              <SectionTitle>Payments & Invoicing</SectionTitle>
              <Body className="mb-5">Information on payments made to the platform for services.</Body>
              <BulletList items={[
                "Online payments for eligible platform services (PPC promotions, subscription plans, etc.) are securely processed through Razorpay.",
                "Payment processing is provided under the merchant account of Quba Infotech, the proprietor and operator of the Reecomm platform, and applicable GST invoices are issued by Quba Infotech where required.",
              ]} />
            </div>

            <div id="ppc" className="py-11 border-b border-primary/7">
              <SectionNum n="07" />
              <SectionTitle>Sponsored PPC Listings</SectionTitle>
              <Body className="mb-5">Our Pay-Per-Click advertising system guidelines.</Body>
              <BulletList items={[
                "Sponsored (PPC) listings are intended to increase the visibility of eligible vehicle listings.",
                "Actual impressions, clicks, inquiries, and sales depend on multiple factors including user preferences, market demand, listing quality, and competition.",
                "Reecomm does not guarantee any minimum number of views, leads, or sales."
              ]} />
            </div>

            <div id="conduct" className="py-11 border-b border-primary/7">
              <SectionNum n="08" />
              <SectionTitle>Prohibited Activities</SectionTitle>
              <Body className="mb-5">Help us keep the marketplace safe and professional.</Body>
              <BulletList items={[
                "Do not post spam, fake listings, or duplicate vehicles.",
                "Do not scrape the platform using bots or automated scripts.",
                "Do not submit false buyer inquiries or manipulate listed price points."
              ]} />
            </div>

            <div id="liability" className="py-11 border-b border-primary/7">
              <SectionNum n="09" />
              <SectionTitle>Limitation of Liability</SectionTitle>
              <Body className="mb-5">Legal liability caps regarding vehicle listings and deals.</Body>
              <BulletList items={[
                "Reecomm, Quba Infotech, and Loriya Anas are not involved in any guarantee or warranty of purchase and sell transactions.",
                "We are not liable for any vehicle defects, ownership disputes, registration problems, or monetary losses resulting from deals negotiated on the platform.",
                "Platform services are provided 'as is' without warranties of any kind."
              ]} />
            </div>

            <div id="termination" className="py-11 border-b border-primary/7">
              <SectionNum n="10" />
              <SectionTitle>Account Termination</SectionTitle>
              <Body className="mb-5">Guidelines for account closure or restriction.</Body>
              <BulletList items={[
                "We reserve the right to restrict or suspend accounts that violate these Terms or list fraudulent vehicles.",
                "You can request deletion of your account and vehicle listings at any time through our contact channels."
              ]} />
            </div>

            <div id="governing" className="py-11 border-b border-primary/7">
              <SectionNum n="11" />
              <SectionTitle>Governing Law</SectionTitle>
              <Body className="mb-5">Legal jurisdiction details.</Body>
              <BulletList items={[
                "These Terms & Conditions are governed by the laws of India.",
                "Any disputes arising from these terms or platform usage shall be subject to the exclusive jurisdiction of courts in Gujarat, India."
              ]} />
            </div>

            <div id="contact" className="py-11">
              <SectionNum n="12" />
              <SectionTitle>Contact Information</SectionTitle>
              <Body className="mb-4">{"Reach out to us for terms-related questions."}</Body>
              <div className="border border-primary/8 rounded-md overflow-hidden">
                <div className="flex items-center gap-5 px-5 py-4 border-b border-primary/7">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary/22 min-w-[68px]">Entity</span>
                  <span className="text-lg text-primary/55 font-light">Quba Infotech (Proprietor: Loriya Anas)</span>
                </div>
                <div className="flex items-center gap-5 px-5 py-4 border-b border-primary/7">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary/22 min-w-[68px]">Email</span>
                  <span className="text-lg text-primary/55 font-light">info@reecomm.com</span>
                </div>

                <div className="flex items-center gap-5 px-5 py-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary/22 min-w-[68px]">Address</span>
                  <span className="text-lg text-primary/55 font-light">Gujarat, India</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative rounded-2xl overflow-hidden p-4 md:p-8 mb-10 bg-fourth">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-md font-black uppercase tracking-wide font-primary text-primary">
                      Have questions about terms?
                    </p>
                    <p className="text-[13px] mt-0.5 font-secondary text-primary/70">
                      We are here to clear any doubts about platform operations.
                    </p>
                  </div>
                </div>

                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-black font-primary text-secondary bg-primary shadow-lg shadow-fourth/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Contact Support <ArrowUpRight size={11} />
                </button>
              </div>
            </div>

          </main>
        </div>
      </div>

    </div>
  );
}
