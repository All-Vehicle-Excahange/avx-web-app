"use client";
import {
  ShieldCheck,
  EyeOff,
  UserCheck,
  Mail,
  ChevronDown,
  ArrowUpRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "collect", num: "01", title: "Information We Collect" },
  { id: "use", num: "02", title: "How We Use It" },
  { id: "sharing", num: "03", title: "Sharing of Information" },
  { id: "security", num: "04", title: "Data Security" },
  { id: "rights", num: "05", title: "Your Rights & Control" },
  { id: "cookies", num: "06", title: "Cookies & Tracking" },
  { id: "third", num: "07", title: "Third-Party Services" },
  { id: "retention", num: "08", title: "Data Retention" },
  { id: "children", num: "09", title: "Children's Privacy" },
  { id: "changes", num: "10", title: "Changes to Policy" },
  { id: "contact", num: "11", title: "Contact Us" },
];

const summaryCards = [
  {
    title: "What we collect",
    points: ["Basic profile info (name, phone, email)", "Vehicle listings & preferences", "Inquiry activity"]
  },
  {
    title: "How we use it",
    points: ["Connect buyers and sellers", "Improve recommendations", "Ensure platform safety"]
  },
  {
    title: "What we don't do",
    points: ["Never sell your personal data", "No sharing without purpose", "No hidden tracking"]
  },
  {
    title: "Your control",
    points: ["Update or delete data anytime", "No friction or waiting", "Manage notification settings"]
  },
];

const trustItems = [
  { text: "Your data is protected", icon: <ShieldCheck size={18} /> },
  { text: "No data selling. Ever.", icon: <EyeOff size={18} /> },
  { text: "Full control, always.", icon: <UserCheck size={18} /> },
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

export default function PrivacyPolicy() {
  const [active, setActive] = useState("collect");
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
            Legal · Privacy
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-4">
            Privacy <spam className="text-fourth/80">Policy</spam>
          </h1>
          <p className="text-lg font-light text-primary/50 leading-[1.85] max-w-[480px] mb-7">
           {" Your data, your control. Here's how AVX collects, uses, and protects your information — plain language, no legal maze."}
          </p>
          <div className="flex items-center gap-5 text-sm tracking-wide text-primary/45">
            <span>Last Updated: January 2025</span>
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
            <div id="collect" className="py-11 border-b border-primary/7">
              <SectionNum n="01" />
              <SectionTitle>Information We Collect</SectionTitle>
              <Body>{"We collect what's needed to run AVX services — nothing extra."}</Body>
              <SubLabel>Personal Info</SubLabel>
              <BulletList items={["Name, phone number, email address", "Location (city / region)"]} />
              <SubLabel>Account Info</SubLabel>
              <BulletList items={["Profile details and preferences", "Saved vehicles and watchlists"]} />
              <SubLabel>Activity Data</SubLabel>
              <BulletList items={["Listings you create or manage", "Inquiries sent and received", "Inspection requests and history"]} />
              <SubLabel>Device & Usage</SubLabel>
              <BulletList items={["IP address, browser type", "Pages visited and interaction patterns"]} />
            </div>

            <div id="use" className="py-11 border-b border-primary/7">
              <SectionNum n="02" />
              <SectionTitle>How We Use It</SectionTitle>
              <Body className="mb-5">{"Your data powers the platform — that's it."}</Body>
              <BulletList items={[
                "Connect buyers with sellers",
                "Enable communication between users",
                "Improve search and recommendations",
                "Provide customer support",
                "Detect fraud and misuse",
                "Improve platform performance",
              ]} />
            </div>

            <div id="sharing" className="py-11 border-b border-primary/7">
              <SectionNum n="03" />
              <SectionTitle>Sharing of Information</SectionTitle>
              <Body>We do not sell your personal data. We share only when necessary.</Body>
              <SubLabel>Other Users</SubLabel>
              <BulletList items={["When you send or receive inquiries", "When listing vehicles publicly"]} />
              <SubLabel>Service Providers</SubLabel>
              <BulletList items={["Hosting and infrastructure", "Analytics (aggregated and anonymised)", "Communication tools"]} />
              <SubLabel>Legal Requirements</SubLabel>
              <BulletList items={["When required by applicable law", "To protect platform integrity and user safety"]} />
            </div>

            <div id="security" className="py-11 border-b border-primary/7">
              <SectionNum n="04" />
              <SectionTitle>Data Security</SectionTitle>
              <Body className="mb-5">We use industry-standard measures to protect your data.</Body>
              <BulletList items={[
                "Encrypted servers and secure data transfer",
                "Strict access control and monitoring",
                "Regular system updates and audits",
              ]} />
              <Body className="mt-5">No system is fully immune. Protect your credentials and report anything suspicious.</Body>
            </div>

            <div id="rights" className="py-11 border-b border-primary/7">
              <SectionNum n="05" />
              <SectionTitle>Your Rights & Control</SectionTitle>
              <Body className="mb-5">You own your data.</Body>
              <BulletList items={[
                "Update your profile anytime",
                "Delete your account and all associated data",
                "Manage notification preferences",
                "Request a copy of your data",
              ]} />
              <Body className="mt-5">
                For requests, reach us at{" "}
                <span className="text-primary/65">support@avx.com</span>
              </Body>
            </div>

            <div id="cookies" className="py-11 border-b border-primary/7">
              <SectionNum n="06" />
              <SectionTitle>Cookies & Tracking</SectionTitle>
              <Body className="mb-5">Minimal cookies, clear purpose.</Body>
              <BulletList items={[
                "Site performance and load optimisation",
                "Remembering user preferences",
                "Aggregated usage analytics",
              ]} />
              <Body className="mt-5">You can control or disable cookies through your browser settings.</Body>
            </div>

            <div id="third" className="py-11 border-b border-primary/7">
              <SectionNum n="07" />
              <SectionTitle>Third-Party Services</SectionTitle>
              <Body className="mb-5">AVX uses third-party tools for core infrastructure only.</Body>
              <BulletList items={[
                "Hosting and content delivery",
                "Analytics and performance monitoring",
                "Communication and notification services",
              ]} />
              <Body className="mt-5">Each provider has their own privacy policy. We vet all partners.</Body>
            </div>

            <div id="retention" className="py-11 border-b border-primary/7">
              <SectionNum n="08" />
              <SectionTitle>Data Retention</SectionTitle>
              <Body className="mb-5">We keep data only as long as needed.</Body>
              <BulletList items={[
                "Active accounts — data retained while account is live",
                "Deleted accounts — data removed within 30 days",
                "Some data may be kept longer for legal compliance",
              ]} />
            </div>

            <div id="children" className="py-11 border-b border-primary/7">
              <SectionNum n="09" />
              <SectionTitle>{"Children's Privacy"}</SectionTitle>
              <Body>
                AVX is not intended for users under 18. We do not knowingly collect data from minors. If discovered, such data is deleted immediately.
              </Body>
            </div>

            <div id="changes" className="py-11 border-b border-primary/7">
              <SectionNum n="10" />
              <SectionTitle>Changes to Policy</SectionTitle>
              <Body className="mb-5">We may update this policy as AVX evolves.</Body>
              <BulletList items={[
                "Users notified of material changes",
                "Last Updated date reflects the latest version",
                "Continued use means acceptance of updates",
              ]} />
            </div>

            <div id="contact" className="py-11">
              <SectionNum n="11" />
              <SectionTitle>Contact Us</SectionTitle>
              <Body className="mb-4">{"Questions? We're reachable."}</Body>
              <div className="border border-primary/8 rounded-md overflow-hidden">
                <div className="flex items-center gap-5 px-5 py-4 border-b border-primary/7">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary/22 min-w-[68px]">Email</span>
                  <span className="text-lg text-primary/55 font-light">support@avx.com</span>
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
                      Still have questions?
                    </p>
                    <p className="text-[13px] mt-0.5 font-secondary text-primary/70">
                      Real answers from our support team — no bots, no queues.
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