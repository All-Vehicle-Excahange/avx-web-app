"use client";
import React from "react";
import { 
  Search, ShieldCheck, Heart, Bell, MessageSquare, Star, Store, User, 
  CreditCard, BarChart2, CheckCircle2, Zap, Layers, Share2, Bookmark, 
  SearchCheck, FileText, Headphones, Smartphone, Globe, Lock, Filter, Compass, Sliders
} from "lucide-react";

const all24Features = [
  { name: "Vehicle Marketplace", desc: "Browse thousands of pre-owned cars and bikes across India.", icon: Search },
  { name: "Technical Inspection", desc: "100+ point diagnostic & physical inspection report.", icon: ShieldCheck },
  { name: "Saved Vehicles", desc: "Bookmark favorite listings to compare prices and specs.", icon: Heart },
  { name: "Real-time Notifications", desc: "Push alerts for price drops, new listings & inquiries.", icon: Bell },
  { name: "Direct Buyer Chat", desc: "In-app messaging between buyers and verified consultants.", icon: MessageSquare },
  { name: "Customer Ratings & Reviews", desc: "Verifiable ratings for consultants and seller storefronts.", icon: Star },
  { name: "Digital Storefront", desc: "Custom online showroom URL for vehicle consultants.", icon: Store },
  { name: "User & Consultant Profile", desc: "Manage personal preferences, saved searches & listings.", icon: User },
  { name: "Subscription Plans", desc: "Tiered storefront & lead management subscriptions.", icon: CreditCard },
  { name: "Business Analytics", desc: "Track storefront impressions, lead counts & sales conversions.", icon: BarChart2 },
  { name: "Consultant Verification", desc: "Identity, GST & physical premise verification audit.", icon: CheckCircle2 },
  { name: "Boost Vehicle Listings", desc: "Promote top inventory for maximum buyer visibility.", icon: Zap },
  { name: "Inventory Management", desc: "Bulk upload, edit & organize vehicle stock seamlessly.", icon: Layers },
  { name: "One-Tap Listing Share", desc: "Instant WhatsApp & social media listing sharing.", icon: Share2 },
  { name: "Custom Bookmarks", desc: "Save specific search filters for quick re-use.", icon: Bookmark },
  { name: "Automated Search Alerts", desc: "Email & App alerts matching your target vehicle budget.", icon: SearchCheck },
  { name: "Vehicle History Records", desc: "Accident history, ownership count & service logs.", icon: FileText },
  { name: "Dedicated Help & Support", desc: "24/7 customer support & dispute resolution team.", icon: Headphones },
  { name: "Native Mobile Apps", desc: "iOS & Android apps optimized for speed.", icon: Smartphone },
  { name: "Web Discovery Platform", desc: "SEO-optimized web search engine accessible anywhere.", icon: Globe },
  { name: "Secure Data Privacy", desc: "Encrypted messaging & masked phone contact options.", icon: Lock },
  { name: "Advanced Spec Filters", desc: "Filter by mileage, fuel, transmission, body type & budget.", icon: Filter },
  { name: "Location-Based Search", desc: "Find verified vehicle listings within your city radius.", icon: Compass },
  { name: "Interactive Spec Comparison", desc: "Side-by-side vehicle comparison tool for smart choices.", icon: Sliders }
];

export default function FeaturesGrid() {
  return (
    <section id="all-features" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            Section 14 — Feature Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Everything You Can Do on Reecomm
          </h2>
          <p className="text-lg text-third">
            24 powerful tools and capabilities built into one unified automotive marketplace.
          </p>
        </div>

        {/* 24 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {all24Features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-fourth/10 text-fourth shrink-0 border border-fourth/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary">{feat.name}</h3>
                </div>
                <p className="text-xs text-third leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
