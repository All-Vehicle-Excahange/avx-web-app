"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, ShoppingBag, Store, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";

const userRoles = [
  {
    id: "buyer",
    title: "For Vehicle Buyers",
    subtitle: "Buy with 100% confidence & zero guesswork",
    icon: Search,
    benefits: [
      "Access multi-point technical inspection reports with diagnostic scores.",
      "Filter verified listings by exact budget, mileage, fuel type & city.",
      "Save favorite cars & bikes and get real-time price drop alerts.",
      "Chat directly with verified consultants with full communication records."
    ]
  },
  {
    id: "seller",
    title: "For Individual Sellers",
    subtitle: "Sell your vehicle fast at a fair market price",
    icon: ShoppingBag,
    benefits: [
      "Publish your vehicle listing directly to thousands of active buyers.",
      "Connect with verified consultants for instant consignment or valuation.",
      "Avoid spam phone calls with integrated in-app messaging.",
      "Track listing views, inquiry counts, and buyer interest metrics."
    ]
  },
  {
    id: "consultant",
    title: "For Independent Consultants",
    subtitle: "Build a professional digital showroom without a website",
    icon: Store,
    benefits: [
      "Claim a custom digital storefront URL (reecomm.com/storefront/your-name).",
      "Upload and manage your active vehicle inventory on mobile or web.",
      "Collect authentic customer reviews and build digital credibility.",
      "Generate high-intent buyer inquiries and manage leads in one place."
    ]
  },
  {
    id: "dealer",
    title: "For Multi-Vehicle Dealerships",
    subtitle: "Scale your dealership inventory & team productivity",
    icon: Building2,
    benefits: [
      "Bulk upload inventory with automated specification mapping.",
      "Assign leads and inquiry management to team sales representatives.",
      "Feature top inventory with boosted marketplace placement.",
      "Access business analytics on lead conversion and inventory turnaround."
    ]
  },
  {
    id: "inspector",
    title: "For Vehicle Inspectors",
    subtitle: "Standardize vehicle audits & earn credibility",
    icon: ShieldCheck,
    benefits: [
      "Upload standardized multi-point technical checklists.",
      "Attach diagnostic OBD-II error codes and high-res condition photos.",
      "Issue official 'Reecomm Inspected' trust marks to verified listings.",
      "Build a verified reputation as an authorized automotive auditor."
    ]
  }
];

export default function UserRolesExpandable() {
  const [activeRole, setActiveRole] = useState("buyer");

  return (
    <section id="roles" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            Section 16 — User Experience Tailored
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Designed for Every Stakeholder
          </h2>
          <p className="text-lg text-third">
            Click any role below to see how Reecomm empowers buyers, sellers, consultants, dealerships, and inspectors.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-[1000px] mx-auto space-y-4">
          {userRoles.map((role) => {
            const Icon = role.icon;
            const isOpen = activeRole === role.id;

            return (
              <div
                key={role.id}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveRole(isOpen ? "" : role.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl border ${isOpen ? 'bg-fourth/20 text-fourth border-fourth/40' : 'bg-white/5 text-third border-white/10'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{role.title}</h3>
                      <p className="text-xs text-third">{role.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-third transition-transform duration-300 ${isOpen ? 'rotate-180 text-fourth' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-white/5 pt-4 bg-black/30"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {role.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-primary/90">
                            <CheckCircle2 className="w-4 h-4 text-fourth shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
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
