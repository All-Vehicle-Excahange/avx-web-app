"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqList = [
  { q: "What is Reecomm?", a: "Reecomm is India's trusted pre-owned vehicle marketplace connecting buyers, individual sellers, verified automotive consultants, and independent inspectors into one transparent digital ecosystem." },
  { q: "How does Reecomm verify vehicle consultants?", a: "Consultants undergo a strict verification process including identity validation, business registration (GST/PAN), physical premise verification, and track record assessment before receiving the 'Verified Consultant' badge." },
  { q: "What is included in a Reecomm Vehicle Inspection?", a: "Our inspection covers a 100+ point technical checklist including engine health, transmission, chassis integrity, body panel paint audit, electrical diagnostics, OBD-II error code scan, and genuine odometer audit." },
  { q: "Is Reecomm free for buyers?", a: "Yes! Browsing vehicle listings, downloading inspection reports, saving favorite vehicles, and contacting verified consultants on Reecomm is 100% free for buyers." },
  { q: "How do I create a Consultant Digital Storefront?", a: "Sign up as a consultant on Reecomm, upload your business verification documents, and instantly get your customized digital showroom (e.g. reecomm.com/storefront/your-name) to showcase inventory." },
  { q: "Can individual sellers list cars or bikes directly?", a: "Yes. Individual owners can publish their vehicle for sale directly to verified consultants or buyers with complete privacy controls." },
  { q: "How do buyer inquiries work on Reecomm?", a: "When a buyer submits an inquiry on a listing, the consultant receives an instant app notification and SMS alert. Communication continues in-app with recorded interaction history." },
  { q: "Where can I download the Reecomm mobile app?", a: "The official Reecomm app is available for download on the Google Play Store for Android, Apple App Store for iOS, or directly via APK on our download page." },
  { q: "Are customer reviews on Reecomm genuine?", a: "Yes. Customer reviews can only be submitted after a verified inquiry or completed vehicle transaction, eliminating fake testimonials." },
  { q: "How does Reecomm prevent odometer tampering?", a: "Our inspection process compares ECU computer diagnostics with service history logs and wear analysis to verify genuine odometer readings." },
  { q: "What vehicle categories are available on Reecomm?", a: "Reecomm supports pre-owned hatchbacks, sedans, SUVs, luxury cars, commercial vehicles, motorcycles, scooters, and electric vehicles (EVs)." },
  { q: "Can multi-vehicle dealerships join Reecomm?", a: "Yes. We offer dedicated Dealership Subscriptions with bulk inventory management, team lead assignment, and advanced business analytics." },
  { q: "How do I request a pre-purchase vehicle inspection?", a: "You can request an inspection directly on any vehicle listing page or select an authorized inspector near your location." },
  { q: "Is my personal contact information safe on Reecomm?", a: "Absolute privacy is maintained. Phone numbers are protected, and initial inquiries occur through encrypted in-app messaging." },
  { q: "Does Reecomm offer auto finance or loan options?", a: "Integrated EMI calculators and partner bank auto loan applications are launching in our upcoming Q3 release." },
  { q: "What is the difference between traditional classifieds and Reecomm?", a: "Traditional classifieds contain unverified listings and spam. Reecomm offers verified consultants, standardized technical inspection audits, and dedicated digital storefronts." },
  { q: "How do I boost my vehicle listing visibility?", a: "Consultants can apply listing boosts to feature top vehicles at the top of buyer search results and homepage discovery." },
  { q: "Can I save custom search filters on Reecomm?", a: "Yes. Set your budget, city, fuel type, and brand preferences, and receive automatic alerts when matching vehicles are listed." },
  { q: "What should I do if I find an issue with a vehicle?", a: "Our support team provides dispute resolution and report verification. You can flag listings directly within the app." },
  { q: "How does Reecomm help honest consultants grow online?", a: "By replacing informal WhatsApp status forwards with a permanent, searchable digital showroom with customer reviews, verified badges, and structured lead tracking." }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            <HelpCircle className="w-4 h-4" />
            Section 19 — Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-third">
            20 comprehensive answers about Reecomm, marketplace verification, inspections, and storefronts.
          </p>
        </div>

        {/* 20 Accordions Grid */}
        <div className="max-w-[900px] mx-auto space-y-3">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-base font-bold text-primary flex items-center gap-3">
                    <span className="text-xs font-mono text-fourth">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    {item.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-third shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-fourth' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 pt-2 text-sm text-third leading-relaxed border-t border-white/5 bg-black/30"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
