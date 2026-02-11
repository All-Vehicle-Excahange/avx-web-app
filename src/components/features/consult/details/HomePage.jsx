import Button from "@/components/ui/button";
import {
  Briefcase,
  TrendingUp,
  Star,
  Eye,
  CheckCircle,
  BarChart3,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Building2,
  Award,
  Target,
  Megaphone,
  ClipboardCheck,
  ChevronRight,
  Activity,
  MessageSquare,
  RefreshCw,
  Crown,
  Rocket,
  Search,
} from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ConsultantProgramPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/consult/account");
  };

  const handleViewPricing = () => {
    router.push("/pricing");
  };

  return (
    <div className="w-full min-h-screen text-primary">
      {/* ══════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/hero_bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative z-10 w-full px-6 md:px-12">
          <div className="max-w-full 3xl:max-w-[1480px] mx-auto">
            <div className="max-w-2xl space-y-8 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                Grow Your Automotive Business on AVX
              </h1>
              <p className="text-third text-lg md:text-xl leading-relaxed">
                AVX helps automotive consultants build visibility, generate
                serious inquiries, and operate with structured performance
                transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
                <Button onClick={handleGetStarted} variant="ghost" size="md">
                  Become a Consultant
                </Button>
                <Button
                  onClick={handleViewPricing}
                  variant="outlineSecondary"
                  size="md"
                  className="border-third/30 text-primary hover:border-fourth"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SECTION 1 — WHO THIS IS FOR */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-[1480px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
                Who This Is For
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
                Built for Professional Automotive Consultants
              </h2>
              <p className="text-third/70 text-base md:text-lg leading-relaxed max-w-md">
                If you sell vehicles seriously, AVX is structured for scale.
                Purpose-built for professionals who want more than just a
                listing.
              </p>
            </div>

            {/* Right — List */}
            <div>
              {[
                {
                  icon: <Users size={20} />,
                  title: "Independent Car Consultants",
                  desc: "Solo operators building their personal brand and client base in the automotive space.",
                },
                {
                  icon: <Building2 size={20} />,
                  title: "Multi-Vehicle Dealerships",
                  desc: "Established businesses with diverse inventory that need professional digital presence.",
                },
                {
                  icon: <TrendingUp size={20} />,
                  title: "Growing Automotive Businesses",
                  desc: "Scaling operations looking for structured tools to manage growth efficiently.",
                },
                {
                  icon: <Award size={20} />,
                  title: "City-Level Automotive Operators",
                  desc: "Regional market players aiming for dominance in their local automotive ecosystem.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 py-7 border-b border-third/8 last:border-b-0 cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg border border-third/15 flex items-center justify-center text-fourth shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary text-[15px] mb-1.5 group-hover:text-fourth transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-third/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-third/15 mt-2 shrink-0 group-hover:text-fourth/50 transition-colors duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* SECTION 2 — WHAT YOU GET */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16 space-y-4">
            <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
              What You Get
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
              Your Digital Storefront — Structured & Visible
            </h2>
            <p className="text-third/60 text-base md:text-lg leading-relaxed">
              Every consultant on AVX receives a complete business presence.
              Your brand lives beyond a listing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {[
              {
                icon: <CheckCircle size={22} />,
                title: "Public Storefront Page",
                text: "Your dedicated space to showcase your brand, story, and complete vehicle inventory to every visitor.",
              },
              {
                icon: <Shield size={22} />,
                title: "Verified Business Identity",
                text: "Build instant trust with verified credentials, business documents, and authenticity badges.",
              },
              {
                icon: <BarChart3 size={22} />,
                title: "Structured Inventory Display",
                text: "Professionally organized vehicle listings with filters, specs, and rich media that convert.",
              },
              {
                icon: <Star size={22} />,
                title: "Ratings & Review Visibility",
                text: "Transparent performance feedback from real clients that builds reputation over time.",
              },
              {
                icon: <Eye size={22} />,
                title: "Inquiry Dashboard",
                text: "Manage all customer inquiries, responses, and follow-ups in one centralized command hub.",
              },
              {
                icon: <Zap size={22} />,
                title: "Brand Beyond Listings",
                text: "Establish a lasting digital presence that works for you around the clock in the marketplace.",
              },
            ].map((item, i) => (
              <div key={i} className="group space-y-4">
                <div className="w-10 h-10 rounded-lg border border-third/15 flex items-center justify-center text-fourth">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-primary text-base group-hover:text-fourth transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-third/50 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* SECTION 3 — PERFORMANCE DASHBOARD */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Right context — appears first on mobile */}
            <div className="space-y-6 lg:order-2 lg:sticky lg:top-28">
              <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
                Performance Dashboard
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
                Operate with Data, Not Guesswork
              </h2>
              <p className="text-third/60 text-base md:text-lg leading-relaxed">
                AVX provides visibility tools to measure growth. Every metric
                is designed to give you actionable insights — not vanity
                numbers. Know what works, double down on it.
              </p>
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 text-fourth text-sm font-medium group cursor-pointer">
                  <span className="group-hover:underline">
                    Explore the dashboard
                  </span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>

            {/* Left — Metric list */}
            <div className="lg:order-1">
              {[
                {
                  num: "01",
                  icon: <Eye size={18} />,
                  label: "Vehicle Views",
                  desc: "Track how many eyes land on each of your listings — know which vehicles attract the most attention.",
                },
                {
                  num: "02",
                  icon: <MessageSquare size={18} />,
                  label: "Inquiry Count",
                  desc: "Monitor the volume of serious buyer inquiries in real-time across all your inventory.",
                },
                {
                  num: "03",
                  icon: <Search size={18} />,
                  label: "Inspection Engagement",
                  desc: "See how buyers interact with your inspection reports and vehicle documentation.",
                },
                {
                  num: "04",
                  icon: <Activity size={18} />,
                  label: "Response Performance",
                  desc: "Measure your response speed and quality metrics against platform benchmarks.",
                },
                {
                  num: "05",
                  icon: <TrendingUp size={18} />,
                  label: "Conversion Trends",
                  desc: "Analyze your inquiry-to-sale conversion over time with detailed breakdowns.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 py-6 border-b border-third/8 last:border-b-0"
                >
                  <span className="text-third/20 font-mono font-bold text-lg shrink-0 w-8 mt-0.5 group-hover:text-fourth/50 transition-colors duration-300">
                    {item.num}
                  </span>
                  <div className="w-9 h-9 rounded-lg border border-third/12 flex items-center justify-center text-fourth/60 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary text-[15px] mb-1 group-hover:text-fourth transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-third/40 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* SECTION 4 — INSPECTION ADVANTAGE */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header — left aligned */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="space-y-4 max-w-xl">
              <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
                Inspection Advantage
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
                Build Trust with Transparency
              </h2>
            </div>
            <p className="text-third/50 text-sm md:text-base max-w-sm leading-relaxed md:text-right md:pb-1">
              Vehicles with inspection transparency perform better in search
              visibility and convert at higher rates.
            </p>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: "01",
                title: "Request AVX Inspection",
                desc: "Initiate professional third-party vehicle assessments directly through the platform. Our certified inspectors ensure every detail is documented for buyer confidence.",
                icon: <ClipboardCheck size={22} />,
              },
              {
                num: "02",
                title: "Inspection-Backed Vehicles",
                desc: "Increase buyer confidence with verified, comprehensive reports attached to your listings. Stand out from unverified sellers in every search result.",
                icon: <Shield size={22} />,
              },
              {
                num: "03",
                title: "Re-Inspection on Demand",
                desc: "Provide re-inspection options for returning buyers or extended inventory stays. Maintain ongoing transparency and trust throughout the sales cycle.",
                icon: <RefreshCw size={22} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group py-8 md:py-0 md:px-8 lg:px-10 ${i < 2
                    ? "border-b md:border-b-0 md:border-r border-third/8"
                    : ""
                  } ${i === 0 ? "md:pl-0" : ""} ${i === 2 ? "md:pr-0" : ""}`}
              >
                <span className="text-third/12 font-mono font-bold text-sm mb-6 block">
                  {item.num}
                </span>
                <div className="w-10 h-10 rounded-lg border border-third/12 flex items-center justify-center text-fourth mb-5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-primary text-lg mb-3 group-hover:text-fourth transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-third/45 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* SECTION 5 — GROWTH TOOLS */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16 space-y-4">
            <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
              Growth Tools
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
              Boost Your Visibility
            </h2>
            <p className="text-third/60 text-base md:text-lg leading-relaxed">
              AVX provides structured growth tools — measurable and
              performance-based. Every tool is designed to drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Zap size={22} />,
                title: "Sponsored Vehicle Placements",
                text: "Feature your top inventory at the forefront of search results. Get maximum visibility on your best vehicles with data-driven placement.",
                tag: "Visibility",
              },
              {
                icon: <Crown size={22} />,
                title: "Featured Consultant Slots",
                text: "Gain premium positioning in consultant directories. Be the first name buyers see when searching for trusted automotive professionals.",
                tag: "Brand",
              },
              {
                icon: <Megaphone size={22} />,
                title: "PPC Campaigns",
                text: "Targeted advertising to reach serious buyers actively searching. Every rupee spent is tracked, measured, and optimized for results.",
                tag: "Advertising",
              },
              {
                icon: <Target size={22} />,
                title: "Category-Level Prominence",
                text: "Dominate specific vehicle categories with strategic placement. Own your niche — whether it is SUVs, luxury, or budget vehicles.",
                tag: "Strategy",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-xl border border-third/8 p-7 md:p-8 flex flex-col gap-5 hover:border-third/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg border border-third/12 flex items-center justify-center text-fourth">
                    {item.icon}
                  </div>
                  <span className="text-third/25 text-[11px] font-semibold tracking-widest uppercase">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-fourth transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-third/45 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* TIER-BASED PRICING */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
              Subscription Tiers
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary">
              Choose Your Scale
            </h2>
            <p className="text-third/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              Each tier unlocks expanded listing limits and visibility tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Basic */}
            <div className="rounded-xl border border-third/10 p-7 md:p-8 flex flex-col gap-6 hover:border-third/20 transition-colors duration-300">
              <div>
                <p className="text-third/30 text-[11px] font-semibold tracking-widest uppercase mb-2">
                  Starter
                </p>
                <h3 className="font-bold text-2xl text-primary mb-1">Basic</h3>
                <p className="text-third/40 text-sm">
                  Entry-level presence for new consultants
                </p>
              </div>
              <div className="h-px bg-third/8" />
              <ul className="space-y-3 flex-1">
                {[
                  "Public storefront",
                  "Basic analytics",
                  "Limited listings",
                  "Standard support",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-third/50"
                  >
                    <div className="w-1 h-1 rounded-full bg-third/25 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleGetStarted}
                variant="outlineSecondary"
                size="md"
                className="w-full border-third/15 text-third hover:border-fourth/50 hover:text-primary"
              >
                Get Started
              </Button>
            </div>

            {/* Pro — Highlighted */}
            <div className="relative rounded-xl border-2 border-fourth p-7 md:p-8 flex flex-col gap-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-fourth text-secondary text-[10px] font-bold tracking-wider uppercase">
                Popular
              </div>
              <div>
                <p className="text-fourth/50 text-[11px] font-semibold tracking-widest uppercase mb-2">
                  Growth
                </p>
                <h3 className="font-bold text-2xl text-primary mb-1">Pro</h3>
                <p className="text-third/40 text-sm">
                  Growth-focused visibility for scaling businesses
                </p>
              </div>
              <div className="h-px bg-fourth/15" />
              <ul className="space-y-3 flex-1">
                {[
                  "Enhanced storefront",
                  "Advanced analytics",
                  "Increased listings",
                  "Priority support",
                  "Sponsored placements",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-third/70"
                  >
                    <CheckCircle
                      size={14}
                      className="text-fourth shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleGetStarted}
                variant="ghost"
                size="md"
                className="w-full"
              >
                Get Started
              </Button>
            </div>

            {/* Premium */}
            <div className="rounded-xl border border-third/10 p-7 md:p-8 flex flex-col gap-6 hover:border-third/20 transition-colors duration-300">
              <div>
                <p className="text-third/30 text-[11px] font-semibold tracking-widest uppercase mb-2">
                  Enterprise
                </p>
                <h3 className="font-bold text-2xl text-primary mb-1">
                  Premium
                </h3>
                <p className="text-third/40 text-sm">
                  Brand-level dominance for market leaders
                </p>
              </div>
              <div className="h-px bg-third/8" />
              <ul className="space-y-3 flex-1">
                {[
                  "Premium storefront",
                  "Full analytics suite",
                  "Unlimited listings",
                  "Dedicated support",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-third/50"
                  >
                    <div className="w-1 h-1 rounded-full bg-third/25 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleGetStarted}
                variant="outlineSecondary"
                size="md"
                className="w-full border-third/15 text-third hover:border-fourth/50 hover:text-primary"
              >
                Contact Sales
              </Button>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleViewPricing}
              className="inline-flex items-center gap-2 text-fourth text-sm font-medium hover:underline group cursor-pointer"
            >
              Compare all tiers in detail
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* ONBOARDING PROCESS */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary">
              Onboarding Process
            </h2>
            <p className="text-third/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              Six structured steps to marketplace quality.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-px bg-third/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-4">
              {[
                { num: "01", text: "Register as consultant" },
                { num: "02", text: "Submit KYC & business details" },
                { num: "03", text: "Choose subscription tier" },
                { num: "04", text: "Admin verification" },
                { num: "05", text: "Activate storefront" },
                { num: "06", text: "Start growing" },
              ].map((step, i) => (
                <div
                  key={i}
                  className="group text-center space-y-3"
                >
                  <div className="mx-auto w-10 h-10 rounded-full border border-third/15 flex items-center justify-center relative z-10 group-hover:border-fourth/50 transition-colors duration-300">
                    <span className="text-fourth/50 font-mono font-bold text-xs group-hover:text-fourth transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-third/45 text-sm leading-snug group-hover:text-third/70 transition-colors duration-300">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-px bg-third/8" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* ACCOUNTABILITY & TRUST */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left */}
            <div className="space-y-6">
              <p className="text-fourth text-xs font-semibold tracking-[0.2em] uppercase">
                Trust Framework
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
                Accountability & Trust
              </h2>
              <p className="text-third/60 text-base md:text-lg leading-relaxed max-w-md">
                Trust is not optional — it is structured into every layer of
                the AVX system. From identity verification to performance
                tracking, everything is transparent.
              </p>
            </div>

            {/* Right — Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <Shield size={20} />,
                  title: "Verified Identities",
                  desc: "Every consultant goes through KYC verification",
                },
                {
                  icon: <Star size={20} />,
                  title: "Review Transparency",
                  desc: "Real ratings from real client experiences",
                },
                {
                  icon: <BarChart3 size={20} />,
                  title: "Performance Signals",
                  desc: "Data-backed performance indicators visible to all",
                },
                {
                  icon: <Eye size={20} />,
                  title: "Recorded Inquiries",
                  desc: "Every interaction is platform-tracked and logged",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-third/8 p-6 space-y-3 hover:border-third/20 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-lg border border-third/12 flex items-center justify-center text-fourth">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-primary text-sm group-hover:text-fourth transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-third/40 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FINAL CTA */}
      {/* ══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-primary leading-[1.15]">
            Ready to build your presence on AVX?
          </h2>
          <p className="text-third/60 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Join a growing network of professional automotive consultants.
            Your next customer is already searching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button onClick={handleGetStarted} variant="ghost" size="md">
              Become a Consultant
            </Button>
            <Button
              onClick={handleViewPricing}
              variant="outlineSecondary"
              size="md"
              className="border-third/30 text-primary hover:border-fourth"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
