"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

import Button from "@/components/ui/button";

const sampleConsultants = [
  {
    name: "Apex Auto Consultants",
    location: "Mumbai, Maharashtra",
    experience: "12+ Years Exp.",
    rating: "4.9",
    reviews: "184 Reviews",
    vehiclesCount: "34 Active Vehicles",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "Verified Premium Consultant"
  },
  {
    name: "Royal Motor Works",
    location: "Bengaluru, Karnataka",
    experience: "8+ Years Exp.",
    rating: "4.8",
    reviews: "142 Reviews",
    vehiclesCount: "22 Active Vehicles",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "Verified Gold Consultant"
  },
  {
    name: "Vanguard Motors",
    location: "New Delhi, NCR",
    experience: "15+ Years Exp.",
    rating: "4.95",
    reviews: "296 Reviews",
    vehiclesCount: "48 Active Vehicles",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    badge: "Verified Diamond Consultant"
  }
];

export default function VerifiedConsultants() {
  return (
    <section id="consultants" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            <ShieldCheck className="w-4 h-4" />
            Section 09 — Verified Consultants
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Meet India&apos;s Verified Vehicle Consultants
          </h2>
          <p className="text-lg text-third">
            Reecomm vets every consultant before awarding official verification. Know who you are dealing with before taking your next step.
          </p>
        </div>

        {/* 3 Consultant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {sampleConsultants.map((c, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badge */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-fourth shrink-0">
                    <Image src={c.image} alt={c.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-fourth font-semibold mb-1">
                      <ShieldCheck className="w-4 h-4 fill-fourth/20" />
                      <span>{c.badge}</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary">{c.name}</h3>
                    <p className="text-xs text-third flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-third/60" /> {c.location}
                    </p>
                  </div>
                </div>

                {/* Rating & Stats Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-center mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-third uppercase">Rating</span>
                    <p className="text-sm font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {c.rating}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-third uppercase">Experience</span>
                    <p className="text-xs font-semibold text-primary mt-0.5">{c.experience}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-third uppercase">Inventory</span>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">{c.vehiclesCount.split(" ")[0]} Cars</p>
                  </div>
                </div>
              </div>

              <Button variant="ghost" href="/become-consultant" size="sm" full={true}>
                View Digital Storefront
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
