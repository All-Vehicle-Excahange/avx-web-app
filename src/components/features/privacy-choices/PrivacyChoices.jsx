"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Trash2,
  Clock,
  User,
  Mail,
  FileText,
  CheckCircle,
  Copy,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Lock,
  Settings,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const sections = [
  { id: "intro", num: "01", title: "Introduction & Scope" },
  { id: "deletion-wizard", num: "02", title: "Deletion & Access Wizard" },
  { id: "retention", num: "03", title: "Data Retention Timeline" },
  { id: "user-rights", num: "04", title: "Your Rights & Controls" },
  { id: "contact", num: "05", title: "Privacy Support Office" },
];

function SectionNum({ n }) {
  return (
    <p className="text-sm tracking-[0.2em] uppercase text-primary/20 mb-1.5 font-secondary">
      {n}
    </p>
  );
}

function SectionTitle({ children }) {
  const words = children.split(" ");
  const firstWord = words[0];
  const restOfTitle = words.slice(1).join(" ");

  return (
    <h2 className="text-2xl font-semibold text-primary mb-5 tracking-tight font-primary">
      {firstWord} {restOfTitle && (
        <span className="text-fourth/80">{restOfTitle}</span>
      )}
    </h2>
  );
}

function Body({ children, className = "" }) {
  return (
    <p className={`text-md leading-[1.8] text-primary/60 font-light font-secondary ${className}`}>
      {children}
    </p>
  );
}

export default function PrivacyChoices() {
  const { user, isLoggedIn } = useAuthStore();
  const [activeSection, setActiveSection] = useState("intro");
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef(null);

  // Wizard state
  const [requestType, setRequestType] = useState("delete-account");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [details, setDetails] = useState("");
  const [generatedBody, setGeneratedBody] = useState("");
  const [copied, setCopied] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState(0);

  // Autofill user details when logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setUserEmail(user.email || user.phoneNumber || "");
      setUserName(user.name || "Reecomm User");
    } else {
      setUserEmail("");
      setUserName("");
    }
  }, [isLoggedIn, user]);

  // Generate dynamic email body
  useEffect(() => {
    let typeLabel = "Account Deletion Request";
    let bodyText = "";

    const userIdentifier = userEmail ? userEmail : "[Enter Email]";
    const namePlaceholder = userName ? userName : "[Enter Name]";
    const extraDetails = details ? `\n\nAdditional comments:\n"${details}"` : "";

    if (requestType === "delete-account") {
      typeLabel = "Account & Profile Deletion";
      bodyText = `Hello Reecomm Privacy Team,

I am writing to request the permanent deletion of my account on the Reecomm marketplace.

Account Details:
- Name: ${namePlaceholder}
- Email/Phone: ${userIdentifier}

I request that you delete my profile credentials, vehicle search preferences, watchlists, and any associated registration info. I understand that this action is irreversible and I will lose access to my listings.${extraDetails}

Please process this request within the 30-day statutory window under the privacy policy rules.

Regards,
${namePlaceholder}`;
    } else if (requestType === "delete-data") {
      typeLabel = "Activity & Vehicle Listing Purge";
      bodyText = `Hello Reecomm Privacy Team,

I am writing to request the deletion of all active listings, inquiry history, and usage logs linked to my account.

Account Details:
- Name: ${namePlaceholder}
- Email/Phone: ${userIdentifier}

I would like to keep my account registration active, but purge all vehicle data, active vehicle listings, and inquiry statistics logs.${extraDetails}

Please let me know once this data has been completely erased.

Regards,
${namePlaceholder}`;
    } else if (requestType === "data-access") {
      typeLabel = "Data Access & Portability Request";
      bodyText = `Hello Reecomm Privacy Team,

I am writing to request a machine-readable copy of the personal data you store regarding my profile.

Account Details:
- Name: ${namePlaceholder}
- Email/Phone: ${userIdentifier}

Please provide a summary of my profile metadata, listed vehicles history, and transaction references in compliance with my right to portability.${extraDetails}

Thank you for your assistance.

Regards,
${namePlaceholder}`;
    }

    setGeneratedBody(bodyText);
  }, [requestType, userEmail, userName, details]);

  // Setup intersection observer for table of contents
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observerRef.current.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // Header spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setTocOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Privacy Request: ${requestType.toUpperCase().replace("-", " ")} - ${userName || userEmail}`);
    const body = encodeURIComponent(generatedBody);
    return `mailto:info@reecomm.com?subject=${subject}&body=${body}`;
  };

  const userRightsData = [
    {
      title: "Right to Erasure (Right to be Forgotten)",
      desc: "You have the right to request that we delete all your personal data, listings, and credentials from our servers. Once processed, your account is purged and cannot be recovered.",
      icon: <Trash2 className="text-red-400 shrink-0" size={20} />,
    },
    {
      title: "Right of Access & Portability",
      desc: "You can request an export of all information we hold about you. We will deliver this data in a structured, standard machine-readable format (JSON/CSV) within 30 days.",
      icon: <FileText className="text-fourth shrink-0" size={20} />,
    },
    {
      title: "Right to Rectification",
      desc: "If any profile information, phone numbers, or metadata is inaccurate or outdated, you can edit them directly in your Profile Dashboard or file a support ticket.",
      icon: <RefreshCw className="text-yellow-400 shrink-0" size={20} />,
    },
    {
      title: "Right to Restrict Processing",
      desc: "You have the right to revoke mobile app permissions (Location, Camera, Push notifications) via your iOS or Android settings at any time, or opt out of optional telemetry.",
      icon: <Settings className="text-green-400 shrink-0" size={20} />,
    },
  ];

  return (
    <div className="text-primary min-h-screen">
      <div className="mx-auto">
        
        {/* HERO SECTION */}
        <header className="pt-16 pb-14 border-b border-primary/8">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4 font-primary">
            Legal · Control Panel
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-primary mb-4">
            Your Privacy <span className="text-fourth/80">Choices</span>
          </h1>
          <p className="text-lg font-light text-primary/50 leading-[1.85] max-w-[620px] mb-7 font-secondary">
            {`Reecomm (operated by Quba Infotech under founder Loriya Anas) respects your rights over your data. Manage your personal information, request database deletions, and inspect how we process your marketplace records below.`}
          </p>
          <div className="flex items-center gap-5 text-sm tracking-wide text-primary/45 font-secondary">
            <span>Effective: January 2026</span>
            <span className="w-px h-3 bg-primary/15" />
            <span>Compliance: DPDP Act (India) & CCPA/GDPR Principles</span>
          </div>
        </header>

        {/* BODY LAYOUT */}
        <div className="flex gap-14 items-start py-12 pb-20 max-md:flex-col max-md:gap-0">
          
          {/* TOC SIDEBAR (desktop) */}
          <aside className="w-[220px] max-h-[80vh] overflow-y-auto shrink-0 sticky top-24 max-md:hidden [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/10 [&::-webkit-scrollbar-thumb]:rounded-full">
            <p className="text-[12px] tracking-[0.25em] uppercase text-primary/40 mb-4 pl-3 font-primary font-semibold">
              Choice Center
            </p>
            {sections.map((s) => (
              <div
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`
                  flex items-center gap-3.5 px-4 py-3.5 cursor-pointer transition-all duration-200
                  border-l-2 rounded-r-md font-secondary
                  ${activeSection === s.id
                    ? "border-fourth bg-fourth/5 text-primary"
                    : "border-transparent text-primary/40 hover:border-primary/20 hover:bg-primary/2 hover:text-primary/70"}
                `}
              >
                <span className={`text-[12px] font-bold ${activeSection === s.id ? "text-fourth" : "text-primary/20"}`}>
                  {s.num}
                </span>
                <span className="text-[14px] leading-snug font-medium">
                  {s.title}
                </span>
              </div>
            ))}
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            
            {/* Sticky Mobile TOC */}
            <div className="hidden max-md:block mb-7 sticky top-20 z-30 font-secondary">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex justify-between items-center px-5 py-3.5 bg-secondary/80 backdrop-blur-md border border-primary/10 rounded-lg shadow-md text-sm tracking-wide uppercase text-primary/70 cursor-pointer"
              >
                <span>Navigate Choices</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${tocOpen ? "rotate-180" : ""}`} />
              </button>
              {tocOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-secondary/95 backdrop-blur-xl border border-primary/10 rounded-lg shadow-xl overflow-hidden max-h-[60vh] overflow-y-auto z-40">
                  {sections.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`flex gap-3.5 items-center px-5 py-4 border-b border-primary/5 last:border-b-0 cursor-pointer text-sm transition-colors duration-150
                        ${activeSection === s.id ? "bg-fourth/10 text-primary font-semibold" : "text-primary/60 hover:bg-primary/2"}`}
                    >
                      <span className="text-[11px] text-fourth font-bold min-w-[20px]">{s.num}</span>
                      {s.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTIONS */}
            
            {/* 01: INTRODUCTION */}
            <section id="intro" className="pb-12 border-b border-primary/8">
              <SectionNum n="01" />
              <SectionTitle>Introduction & Scope</SectionTitle>
              <Body className="mb-5">
                {`Welcome to the Reecomm Privacy Choice Center. We believe that your data belongs entirely to you. Consistent with our commitments in our main Privacy Policy, this page outlines specific actionable protocols to execute your right to deletion, right to limit processing, and data portability.`}
              </Body>
              <div className="bg-primary/3 border border-primary/8 rounded-xl p-5 flex gap-4 max-sm:flex-col items-start mt-6">
                <ShieldCheck className="text-fourth shrink-0 mt-0.5" size={24} />
                <div>
                  <h4 className="text-md font-semibold text-primary mb-1.5 font-primary">Our Data Protection Promise</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-sm text-primary/50 font-secondary">
                    <li><strong>No Sale of Data:</strong> We never rent or sell your profile data or vehicle inquiries to brokers.</li>
                    <li><strong>Minimal Collection:</strong> We collect only core parameters required to connect used car and two-wheeler buyers with verified sellers/consultants.</li>
                    <li><strong>Frictionless Opt-Out:</strong> Deletion and access requests are processed without administrative hurdles or hidden steps.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 02: WIZARD */}
            <section id="deletion-wizard" className="py-12 border-b border-primary/8">
              <SectionNum n="02" />
              <SectionTitle>Deletion & Access Wizard</SectionTitle>
              <Body className="mb-6">
                {`Use this interactive builder to quickly construct a formal request and transmit it securely to our privacy office. Our team processes requests within 30 days.`}
              </Body>

              <div className="bg-primary/2 border border-primary/8 rounded-xl p-6 md:p-8 font-secondary">
                {/* Status Indicator */}
                <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-primary/5">
                  <div className={`w-3.5 h-3.5 rounded-full ${isLoggedIn ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {isLoggedIn ? "Authenticated User Identified" : "Guest Mode / Not Logged In"}
                    </p>
                    <p className="text-xs text-primary/40 mt-0.5">
                      {isLoggedIn 
                        ? `Logged in as ${user?.name || "Reecomm User"} (${user?.email || user?.phoneNumber || "No ID"})` 
                        : "You can still request deletion by supplying your email/phone below."}
                    </p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-6">
                  {/* Step 1: Select Request */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-primary/50 font-bold mb-3 font-primary">
                      Step 1: Choose Your Request Action
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => setRequestType("delete-account")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                          requestType === "delete-account"
                            ? "border-fourth bg-fourth/5 text-primary shadow-md shadow-fourth/5"
                            : "border-primary/8 bg-transparent text-primary/50 hover:border-primary/20 hover:text-primary/80"
                        }`}
                      >
                        <Trash2 className="mb-2" size={20} />
                        <span className="text-xs font-bold font-primary">Delete Entire Account</span>
                        <span className="text-[10px] text-primary/30 mt-1">Purge credentials & credentials</span>
                      </button>

                      <button
                        onClick={() => setRequestType("delete-data")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                          requestType === "delete-data"
                            ? "border-fourth bg-fourth/5 text-primary shadow-md shadow-fourth/5"
                            : "border-primary/8 bg-transparent text-primary/50 hover:border-primary/20 hover:text-primary/80"
                        }`}
                      >
                        <AlertTriangle className="mb-2" size={20} />
                        <span className="text-xs font-bold font-primary">Purge Active Listings</span>
                        <span className="text-[10px] text-primary/30 mt-1">Keep account, erase listings</span>
                      </button>

                      <button
                        onClick={() => setRequestType("data-access")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                          requestType === "data-access"
                            ? "border-fourth bg-fourth/5 text-primary shadow-md shadow-fourth/5"
                            : "border-primary/8 bg-transparent text-primary/50 hover:border-primary/20 hover:text-primary/80"
                        }`}
                      >
                        <FileText className="mb-2" size={20} />
                        <span className="text-xs font-bold font-primary">Request Data Export</span>
                        <span className="text-[10px] text-primary/30 mt-1">Export JSON profile records</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-primary/50 font-bold mb-2 font-primary">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-primary/3 border border-primary/10 rounded-lg px-4 py-3 text-sm text-primary placeholder-primary/20 focus:outline-none focus:border-fourth"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-primary/50 font-bold mb-2 font-primary">
                        Registered Email or Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="john.doe@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-primary/3 border border-primary/10 rounded-lg px-4 py-3 text-sm text-primary placeholder-primary/20 focus:outline-none focus:border-fourth"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-primary/50 font-bold mb-2 font-primary">
                      Optional Message/Reason
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Optional details regarding your request (e.g. 'I am deleting this account because I have sold my vehicle.')"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-primary/3 border border-primary/10 rounded-lg px-4 py-3 text-sm text-primary placeholder-primary/20 focus:outline-none focus:border-fourth resize-y"
                    />
                  </div>

                  {/* Generated template block */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs uppercase tracking-wider text-primary/50 font-bold font-primary">
                        Generated Email Content Template
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 text-xs text-fourth hover:text-fourth/80 cursor-pointer"
                      >
                        <Copy size={12} />
                        {copied ? "Copied!" : "Copy request"}
                      </button>
                    </div>
                    <pre className="w-full bg-secondary/80 border border-primary/5 rounded-lg p-4 font-mono text-xs text-primary/70 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto">
                      {generatedBody}
                    </pre>
                  </div>

                  {/* Action button */}
                  <div className="flex gap-4 max-sm:flex-col pt-2">
                    <a
                      href={getMailtoLink()}
                      className="flex-1 flex items-center justify-center gap-2 bg-fourth text-white hover:bg-fourth/90 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-fourth/20 hover:shadow-fourth/30 transition-all font-primary text-center"
                    >
                      <Mail size={16} />
                      Send Deletion Request Email
                      <ArrowUpRight size={14} />
                    </a>
                    
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary/5 border border-primary/10 hover:bg-primary/10 text-primary px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all font-primary cursor-pointer"
                    >
                      <Copy size={16} />
                      Copy Request to Clipboard
                    </button>
                  </div>

                  <p className="text-[11px] text-primary/30 text-center leading-normal">
                    {`Clicking "Send Deletion Request Email" will launch your device default mail program pre-populated with our address (info@reecomm.com) and the request headers. If you use a browser-based mailer, please copy the template and send manually.`}
                  </p>
                </div>
              </div>
            </section>

            {/* 03: TIMELINE */}
            <section id="retention" className="py-12 border-b border-primary/8">
              <SectionNum n="03" />
              <SectionTitle>Data Retention Timeline</SectionTitle>
              <Body className="mb-8">
                {`We store your listings and metadata only as long as necessary to run the platform or as mandated under standard financial bookkeeping laws in India.`}
              </Body>

              {/* Retention Timeline Layout */}
              <div className="relative border-l border-primary/10 pl-6 ml-3 space-y-10 font-secondary">
                {/* Dot 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-fourth border-4 border-secondary" />
                  <h4 className="text-md font-semibold text-primary mb-1 font-primary flex items-center gap-2">
                    <Clock size={16} className="text-fourth" /> Active Status (Operational Period)
                  </h4>
                  <p className="text-xs text-fourth/75 font-semibold mb-2">Duration: Account Lifespan</p>
                  <Body className="text-sm">
                    All user profile metadata, vehicle listings, bookmark watchlists, and consultant configuration settings are retained while the user account is active.
                  </Body>
                </div>

                {/* Dot 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary/20 border-4 border-secondary" />
                  <h4 className="text-md font-semibold text-primary mb-1 font-primary flex items-center gap-2">
                    <Lock size={16} className="text-primary/40" /> Suspension Window (Grace Phase)
                  </h4>
                  <p className="text-xs text-primary/45 font-semibold mb-2">Duration: 1 – 15 Days from Request</p>
                  <Body className="text-sm">
                    Upon receiving your deletion email, we disable active logins and unpublish all active vehicle listings from the marketplace. Listings cease to appear in search suggestions or list feeds.
                  </Body>
                </div>

                {/* Dot 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary/20 border-4 border-secondary" />
                  <h4 className="text-md font-semibold text-primary mb-1 font-primary flex items-center gap-2">
                    <Trash2 size={16} className="text-primary/40" /> Complete Database Purge
                  </h4>
                  <p className="text-xs text-primary/45 font-semibold mb-2">Duration: Within 30 Days from Request</p>
                  <Body className="text-sm">
                    Profile rows, wishlists, and metadata are hard-deleted from all main production systems. Database backup tapes cycle out and expire the encrypted information within an additional backup loop.
                  </Body>
                </div>

                {/* Dot 4 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary/20 border-4 border-secondary" />
                  <h4 className="text-md font-semibold text-primary mb-1 font-primary flex items-center gap-2 text-yellow-500/90">
                    <AlertTriangle size={16} className="text-yellow-500/80" /> Legal Compliance Exclusions
                  </h4>
                  <p className="text-xs text-yellow-500/75 font-semibold mb-2">Duration: Up to 7 Years (Financial Audits)</p>
                  <Body className="text-sm">
                    If you conducted paid promotions (PPC listings, inspections, subscription invoice plans), invoice transactions processed under Razorpay and GST reports must be archived for auditing records as required by Indian taxation authorities. This data is strictly restricted from any marketing or product interactions.
                  </Body>
                </div>
              </div>
            </section>

            {/* 04: USER RIGHTS ACCORDION */}
            <section id="user-rights" className="py-12 border-b border-primary/8">
              <SectionNum n="04" />
              <SectionTitle>Your Rights & Controls</SectionTitle>
              <Body className="mb-6">
                Under modern global regulations and the Digital Personal Data Protection Act of India, you hold standard rights concerning how Quba Infotech manages your marketplace data:
              </Body>

              <div className="space-y-3 font-secondary">
                {userRightsData.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-primary/8 rounded-lg overflow-hidden bg-primary/1 hover:border-primary/12 transition-all"
                  >
                    <button
                      onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-primary cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        {item.icon}
                        <span className="text-base font-primary font-bold">{item.title}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-primary/45 transition-transform duration-300 ${
                          openAccordion === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        openAccordion === idx ? "max-h-48 border-t border-primary/5" : "max-h-0"
                      }`}
                    >
                      <div className="p-5 text-sm text-primary/50 leading-relaxed font-light">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05: CONTACT INFO */}
            <section id="contact" className="pt-12">
              <SectionNum n="05" />
              <SectionTitle>Privacy Support Office</SectionTitle>
              <Body className="mb-6">
                {`For formal inquiries, data portability exports, or manual questions related to account suspensions, please get in touch directly.`}
              </Body>

              <div className="border border-primary/8 rounded-xl overflow-hidden bg-primary/2 font-secondary">
                <div className="flex items-center gap-6 px-6 py-4.5 border-b border-primary/5 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-primary/20 min-w-[100px] font-bold">
                    Entity Firm
                  </span>
                  <span className="text-md text-primary/75 font-medium">
                    Quba Infotech (Proprietor: Loriya Anas)
                  </span>
                </div>
                <div className="flex items-center justify-between gap-6 px-6 py-4.5 border-b border-primary/5 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                  <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-primary/20 min-w-[100px] font-bold">
                      Privacy Email
                    </span>
                    <span className="text-md text-primary/75 font-medium select-all">
                      info@reecomm.com
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("info@reecomm.com");
                      alert("Email address copied to clipboard!");
                    }}
                    className="flex items-center gap-1.5 text-xs text-fourth bg-fourth/10 px-3 py-1.5 rounded-md hover:bg-fourth/20 transition-all font-bold cursor-pointer"
                  >
                    <Copy size={12} />
                    Copy Email
                  </button>
                </div>
                <div className="flex items-center gap-6 px-6 py-4.5 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-primary/20 min-w-[100px] font-bold">
                    Jurisdiction
                  </span>
                  <span className="text-md text-primary/75 font-medium">
                    Gujarat, India
                  </span>
                </div>
              </div>

              {/* Call-to-action banner */}
              <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 mt-12 bg-fourth font-secondary">
                <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:text-center">
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-wide font-primary text-primary">
                      Looking for general assistance?
                    </h4>
                    <p className="text-sm mt-1 text-primary/80 font-light max-w-[480px]">
                      {`Need help listing vehicles, scheduling inspection appointments, or managing billing? Our FAQs cover standard issues.`}
                    </p>
                  </div>
                  <a
                    href="/help"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs uppercase tracking-[0.15em] font-black font-primary text-secondary bg-primary hover:bg-primary/95 shadow-lg shadow-fourth/25 transition-all shrink-0"
                  >
                    Help Center & FAQs <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
