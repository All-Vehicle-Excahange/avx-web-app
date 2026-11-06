import React, { useEffect, useState } from "react";
import DiwaliVehicleCard from "@/components/ui/const/DiwaliVehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { getOfferVehicles } from "@/services/vehicle.service";
import { ArrowRight, Flame, ShieldCheck } from "lucide-react";
import Link from "next/link";
import DiwaliFirecrackerCanvas from "./DiwaliFirecrackerCanvas";

// Dedicated Realistic Glowing Diya SVG for Mobile View
const DiyaIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Diya Ambient Warm Glow */}
    <circle cx="24" cy="13" r="11" fill="#F59E0B" opacity="0.3" className="animate-pulse" />
    
    {/* Diya Flame Outer Layer */}
    <path
      d="M24 3 C27.5 8.5 29.5 12.5 27.5 16.5 C25.5 20.5 23 20.5 21 16.5 C19 12.5 20.5 8.5 24 3 Z"
      fill="url(#diyaFlameGrad)"
      className="animate-pulse"
    />
    {/* Diya Flame Inner Core (Luminous White-Gold) */}
    <path
      d="M24 7 C25.5 10 26.5 12.5 25.5 14.5 C24.5 16.5 23.5 16.5 22.5 14.5 C21.5 12.5 22.5 10 24 7 Z"
      fill="#FFFBEB"
    />
    {/* Brass Sculpted Diya Body */}
    <path
      d="M6 24 C6 33 14 38 24 38 C34 38 42 33 42 24 C36 27.5 30 28.5 24 28.5 C18 28.5 12 27.5 6 24 Z"
      fill="url(#diyaBrassBody)"
      stroke="#FDE047"
      strokeWidth="1.2"
    />
    {/* Golden Rim Highlight */}
    <ellipse cx="24" cy="25" rx="16.5" ry="2.2" fill="#FDE047" opacity="0.55" />
    {/* Pedestal Base */}
    <path
      d="M17 38 L15 42 C15 43 19 44 24 44 C29 44 33 43 33 42 L31 38 Z"
      fill="url(#diyaBrassBase)"
      stroke="#F59E0B"
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="diyaFlameGrad" x1="24" y1="3" x2="24" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.55" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
      <linearGradient id="diyaBrassBody" x1="6" y1="24" x2="42" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.45" stopColor="#D97706" />
        <stop offset="1" stopColor="#78350F" />
      </linearGradient>
      <linearGradient id="diyaBrassBase" x1="15" y1="38" x2="33" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#92400E" />
      </linearGradient>
    </defs>
  </svg>
);

// Hanging Golden Lanterns (Kandils on Golden Chains) for Top-Left Festive Accent
const HangingFestiveLanterns = ({ className = "" }) => (
  <svg
    viewBox="0 0 160 220"
    fill="none"
    className={`pointer-events-none select-none ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="festiveChainGold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="35%" stopColor="#FDE047" />
        <stop offset="70%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="festiveGlassGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="30%" stopColor="#FDE047" />
        <stop offset="70%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <radialGradient id="festiveCoreLight" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#FDE047" stopOpacity="0.8" />
        <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
      <filter id="festiveGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Chains */}
    <line x1="26" y1="0" x2="26" y2="65" stroke="url(#festiveChainGold)" strokeWidth="1.6" strokeDasharray="3 2" />
    <line x1="82" y1="0" x2="82" y2="118" stroke="url(#festiveChainGold)" strokeWidth="1.8" strokeDasharray="3 2" />
    <line x1="138" y1="0" x2="138" y2="52" stroke="url(#festiveChainGold)" strokeWidth="1.6" strokeDasharray="3 2" />
    {/* Swag garlands */}
    <path d="M 0 16 Q 40 42, 82 22" stroke="url(#festiveChainGold)" strokeWidth="1.2" strokeDasharray="2 2" fill="none" opacity="0.75" />
    <path d="M 82 22 Q 115 48, 142 18" stroke="url(#festiveChainGold)" strokeWidth="1.2" strokeDasharray="2 2" fill="none" opacity="0.65" />

    {/* LANTERN 1 (Left - Medium) */}
    <g transform="translate(26, 65)">
      <circle cx="0" cy="18" r="26" fill="url(#festiveCoreLight)" opacity="0.85" />
      <polygon points="0,-6 -10,3 10,3" fill="url(#festiveChainGold)" stroke="#FFFBEB" strokeWidth="0.5" />
      <circle cx="0" cy="-6" r="2.5" fill="#FFFBEB" />
      <polygon points="0,3 12,18 0,33 -12,18" fill="url(#festiveGlassGlow)" stroke="#FFFBEB" strokeWidth="0.8" opacity="0.95" />
      <line x1="-12" y1="18" x2="12" y2="18" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />
      <line x1="0" y1="3" x2="0" y2="33" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />
      <circle cx="0" cy="18" r="3.5" fill="#FFFFFF" />
      <polygon points="-6,33 6,33 0,39" fill="url(#festiveChainGold)" />
      <line x1="0" y1="39" x2="0" y2="50" stroke="url(#festiveChainGold)" strokeWidth="1.2" />
      <circle cx="0" cy="51" r="2" fill="#FDE047" />
    </g>

    {/* LANTERN 2 (Center - Majestic Main Lantern) */}
    <g transform="translate(82, 118)">
      <circle cx="0" cy="24" r="42" fill="url(#festiveCoreLight)" filter="url(#festiveGlowFilter)" opacity="0.95" />
      <circle cx="0" cy="-8" r="3" fill="#FFFBEB" />
      <path d="M -14 5 C -10 -4, 10 -4, 14 5 Z" fill="url(#festiveChainGold)" stroke="#FFFBEB" strokeWidth="0.6" />
      <polygon points="-14,5 -18,22 -10,42 10,42 18,22 14,5" fill="url(#festiveGlassGlow)" stroke="#FFFBEB" strokeWidth="1" />
      <line x1="-18" y1="22" x2="18" y2="22" stroke="#78350F" strokeWidth="1" opacity="0.65" />
      <line x1="-6" y1="5" x2="-8" y2="42" stroke="#78350F" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="5" x2="8" y2="42" stroke="#78350F" strokeWidth="0.8" opacity="0.5" />
      <circle cx="0" cy="22" r="5.5" fill="#FFFFFF" />
      <polygon points="-10,42 10,42 0,50" fill="url(#festiveChainGold)" stroke="#FDE047" strokeWidth="0.5" />
      <line x1="0" y1="50" x2="0" y2="66" stroke="url(#festiveChainGold)" strokeWidth="1.5" />
      <circle cx="0" cy="68" r="2.5" fill="#FFFBEB" />
    </g>

    {/* LANTERN 3 (Right - Small Accent) */}
    <g transform="translate(138, 52)">
      <circle cx="0" cy="16" r="22" fill="url(#festiveCoreLight)" opacity="0.8" />
      <polygon points="0,-5 -8,2 8,2" fill="url(#festiveChainGold)" stroke="#FFFBEB" strokeWidth="0.5" />
      <circle cx="0" cy="-5" r="2" fill="#FFFBEB" />
      <polygon points="0,2 10,15 0,28 -10,15" fill="url(#festiveGlassGlow)" stroke="#FFFBEB" strokeWidth="0.8" opacity="0.95" />
      <line x1="-10" y1="15" x2="10" y2="15" stroke="#78350F" strokeWidth="0.8" opacity="0.5" />
      <line x1="0" y1="2" x2="0" y2="28" stroke="#78350F" strokeWidth="0.8" opacity="0.5" />
      <circle cx="0" cy="15" r="3" fill="#FFFFFF" />
      <polygon points="-5,28 5,28 0,33" fill="url(#festiveChainGold)" />
      <line x1="0" y1="33" x2="0" y2="44" stroke="url(#festiveChainGold)" strokeWidth="1.2" />
      <circle cx="0" cy="45" r="1.8" fill="#FDE047" />
    </g>
  </svg>
);

// Majestic Golden Jharokha Arch with Glowing Apex Diya
const FestiveJharokhaArch = ({
  className = "",
  title = "SHUBH DEEPAWALI",
  subtitle = "SPECIAL FEST",
}) => {
  const words = (title || "").trim().split(/\s+/);
  const line1 = words.length > 1 ? words[0] : "";
  const line2 = words.length > 1 ? words.slice(1).join(" ") : words[0] || "";

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Background SVG Arch Frame & Scaled Festive Typography */}
      <svg
        viewBox="0 0 360 162"
        className="w-full h-auto drop-shadow-[0_6px_24px_rgba(245,158,11,0.45)] select-none pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="jharokhaGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="20%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FFFBEB" />
          </linearGradient>
          <linearGradient id="jharokhaGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="jharokhaTextGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="archOuterGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="festiveTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#F59E0B" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Ambient Warm Golden Fill Behind Arch */}
        <path
          d="M 24 158 C 24 135, 42 120, 68 108 C 60 86, 88 62, 122 48 C 134 26, 160 18, 180 18 C 200 18, 226 26, 238 48 C 272 62, 300 86, 292 108 C 318 120, 336 135, 336 158 Z"
          fill="url(#jharokhaGlowGrad)"
        />

        {/* Outer Glow Arch Outline */}
        <path
          d="M 24 158 C 24 135, 42 120, 68 108 C 60 86, 88 62, 122 48 C 134 26, 160 18, 180 18 C 200 18, 226 26, 238 48 C 272 62, 300 86, 292 108 C 318 120, 336 135, 336 158"
          stroke="#F59E0B"
          strokeWidth="6"
          opacity="0.4"
          filter="url(#archOuterGlow)"
          strokeLinecap="round"
        />

        {/* Main Golden Sculpted Arch Frame */}
        <path
          d="M 24 158 C 24 135, 42 120, 68 108 C 60 86, 88 62, 122 48 C 134 26, 160 18, 180 18 C 200 18, 226 26, 238 48 C 272 62, 300 86, 292 108 C 318 120, 336 135, 336 158"
          stroke="url(#jharokhaGoldBorder)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Inner Fine Beaded Golden Hairline */}
        <path
          d="M 34 158 C 34 138, 50 126, 74 115 C 68 95, 94 73, 126 59 C 136 39, 160 29, 180 29 C 200 29, 224 39, 234 59 C 266 73, 292 95, 286 115 C 310 126, 326 138, 326 158"
          stroke="url(#jharokhaGoldBorder)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.85"
        />

        {/* Corner Finials */}
        <circle cx="24" cy="158" r="3" fill="#FDE047" />
        <circle cx="336" cy="158" r="3" fill="#FDE047" />

        {/* Text Inside Arch - 100% Vector Proportional Scaling */}
        {line1 && (
          <text
            x="180"
            y="67"
            textAnchor="middle"
            fill="url(#jharokhaTextGold)"
            filter="url(#festiveTextShadow)"
            fontSize="18"
            fontWeight="900"
            letterSpacing="4"
            fontFamily="Cinzel, Georgia, serif, system-ui"
          >
            {line1}
          </text>
        )}

        <text
          x="180"
          y={line1 ? "97" : "85"}
          textAnchor="middle"
          fill="url(#jharokhaTextGold)"
          filter="url(#festiveTextShadow)"
          fontSize={line1 ? "22" : "24"}
          fontWeight="900"
          letterSpacing="3"
          fontFamily="Cinzel, Georgia, serif, system-ui"
        >
          {line2}
        </text>

        {subtitle && (
          <g>
            <text
              x="180"
              y="123"
              textAnchor="middle"
              fill="#FDE047"
              filter="url(#festiveTextShadow)"
              fontSize="9.5"
              fontWeight="800"
              letterSpacing="2.8"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {subtitle}
            </text>

            {/* Flanking Golden Accent Lines */}
            <line x1="78" y1="120" x2="114" y2="120" stroke="#FDE047" strokeWidth="1" opacity="0.8" />
            <line x1="246" y1="120" x2="282" y2="120" stroke="#FDE047" strokeWidth="1" opacity="0.8" />

            {/* Subtle Center Decorative Diamond Underneath */}
            <polygon points="180,136 183.5,139.5 180,143 176.5,139.5" fill="#FDE047" opacity="0.9" />
            <circle cx="166" cy="139.5" r="1.5" fill="#FDE047" opacity="0.65" />
            <circle cx="194" cy="139.5" r="1.5" fill="#FDE047" opacity="0.65" />
            <line x1="138" y1="139.5" x2="160" y2="139.5" stroke="#FDE047" strokeWidth="0.8" opacity="0.5" />
            <line x1="200" y1="139.5" x2="222" y2="139.5" stroke="#FDE047" strokeWidth="0.8" opacity="0.5" />
          </g>
        )}
      </svg>

      {/* Glowing Diya Sitting Proudly at the Apex Top */}
      <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <DiyaIcon className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_0_12px_rgba(253,224,71,0.9)]" />
      </div>
    </div>
  );
};

const DiwaliShowcaseSection = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchVehicles = async () => {
      try {
        const data = {
          pageNo: 1,
          size: 4,
        };
        const res = await getOfferVehicles(data);

        // If backend explicitly marks offer as not live, hide section
        if (res?.data?.isLive === false) {
          if (isMounted) {
            setIsLive(false);
            setVehicles([]);
            setTotalCount(0);
          }
          return;
        }

        const list = Array.isArray(res?.data?.vehicles)
          ? res.data.vehicles
          : Array.isArray(res?.data?.content)
            ? res.data.content
            : Array.isArray(res?.data)
              ? res.data
              : [];

        if (isMounted) {
          setIsLive(true);
          setVehicles(list);
          setTotalCount(
            res?.pageResponse?.totalElements ||
            res?.pagination?.totalElements ||
            res?.pagination?.total ||
            list.length
          );
        }
      } catch (error) {
        console.error("Error fetching Diwali offer vehicles:", error);
        if (isMounted) {
          setIsLive(false);
          setVehicles([]);
          setTotalCount(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVehicles();

    return () => {
      isMounted = false;
    };
  }, []);

  // If not loading and no vehicles available or offer is not live, return null to avoid blank container
  if (!loading && (!isLive || !Array.isArray(vehicles) || vehicles.length === 0)) {
    return null;
  }

  

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 my-8 md:my-12">

      {/* ============================================================== */}
      {/* 1. PANORAMIC DIWALI HERO BANNER                                */}
      {/* ============================================================== */}
      <section
        aria-label="Diwali Festive Hero Banner"
        className="w-full relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#F59E0B]/40 shadow-[0_6px_28px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#011b3e] via-[#3d2460] to-[#1f092f] min-h-[390px] xs:min-h-[410px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[450px]"
      >
        {/* Real-time Simultaneous Firecracker Particle Canvas Animation */}
        <DiwaliFirecrackerCanvas className="z-10 pointer-events-auto" />

        {/* Panoramic Festive Hero Banner Visual */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/diwali/diwali-panoramic-hero-gradient.jpg"
            alt="Diwali Drives. Brighter Deals."
            className="w-full h-full object-cover object-right sm:object-center select-none"
            fetchPriority="high"
          />
        </div>

        {/* Festive Royal Indigo-to-Plum Gradient Overlay (Matches Bottom Banner Gradient, Preserving Palace & Light) */}
        <div className="hidden sm:block absolute inset-0 z-5 bg-gradient-to-r from-[#011b3e]/65 via-[#3d2460]/25 via-transparent to-transparent pointer-events-none" />
        
        {/* Mobile Gradient Vignette */}
        <div className="sm:hidden absolute inset-0 z-5 bg-gradient-to-b from-[#011b3e]/80 via-transparent to-[#1f092f]/80 pointer-events-none" />

        {/* Corner Hanging Festive Kandils (Lanterns on Chains) */}
        <HangingFestiveLanterns className="absolute top-0 left-0 w-28 sm:w-36 md:w-44 h-auto z-15" />

        {/* Banner Content */}
        <div className="relative z-20 pointer-events-none w-full h-full min-h-[390px] xs:min-h-[410px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[450px] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">

          {/* Top Row: Golden Jharokha Arch Badge (Left) + TRUSTED VALUE (Right) */}
          <div className="flex items-start justify-between gap-2 sm:gap-3 pointer-events-auto">
            <div className="pl-6 sm:pl-10 -mt-1 sm:-mt-1.5">
              <FestiveJharokhaArch
                title="SHUBH DEEPAWALI"
                subtitle="SPECIAL FEST"
                className="w-[180px] sm:w-[210px] md:w-[230px]"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] text-zinc-950 border border-[#F59E0B] shadow-[0_2px_12px_rgba(245,158,11,0.3)] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626] shrink-0" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase text-zinc-950">TRUSTED VALUE</span>
                <span className="text-[7px] sm:text-[8px] font-bold text-zinc-700">BY Reecomm</span>
              </div>
            </div>
          </div>

          {/* Headline & Subtitle Area (Original Content Restored with Clean Festive Styling) */}
          <div className="max-w-md sm:max-w-xl flex flex-col items-start gap-1.5 sm:gap-2.5 py-1 sm:py-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
              Aa Diwali, Ghar Laao{" "}
              <span className="block text-[#FDE047] drop-shadow-[0_2px_14px_rgba(253,224,71,0.5)]">
                Nayi Sawari
              </span>
            </h1>

            <p className="text-[11px] sm:text-sm text-zinc-100 font-medium max-w-sm sm:max-w-md leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Celebrate the festival of lights with certified pre-owned cars &amp; bikes at exclusive festive pricing, verified inspections, and exchange bonuses.
            </p>

            {/* Interactive hint */}
            <p className="text-[10px] sm:text-xs text-[#FDE047] font-semibold flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              <span>✨</span>
              <span>Tap anywhere to burst festive fireworks</span>
              <span>✨</span>
            </p>

            {/* Bottom Action Capsule: Diya + Text + Explore Festive Offers Button */}
            <div className="pointer-events-auto w-full sm:w-fit rounded-2xl sm:rounded-full bg-black/70 backdrop-blur-md border border-[#F59E0B]/60 p-2 sm:p-2 sm:pl-3.5 sm:pr-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-5 shadow-[0_4px_22px_rgba(0,0,0,0.6)] mt-2 sm:mt-1">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="text-base sm:text-lg shrink-0">🪔</span>
                <span className="text-xs sm:text-sm font-bold text-white sm:whitespace-nowrap leading-tight">
                  Iss Diwali, Apni Gaadi Ki Baari!
                </span>
              </div>

              <Link
                href="/diwali-offers"
                className="relative z-30 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-2.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] hover:brightness-110 shadow-[0_4px_18px_rgba(245,158,11,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer shrink-0 whitespace-nowrap text-center"
              >
                <span>Explore Festive Offers</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-950 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom-Right Corner Badge (Desktop) */}
          <div className="hidden lg:inline-flex absolute bottom-4 right-6 z-10 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#F59E0B]/40 backdrop-blur-md text-xs font-bold text-[#FDE047] shadow-md">
            <span>🪔</span>
            <span>Shubh Deepawali</span>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. "THE DIWALI DEAL EDIT" SECTION (ORIGINAL BANNER ONLY)       */}
      {/* ============================================================== */}
      <section
        aria-label="The Diwali Deal Edit"
        className="w-full relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#F59E0B]/35 shadow-[0_4px_16px_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#011b3e] via-[#3d2460] via-[#85346e] to-[#1f092f] px-3.5 sm:px-6 md:px-8 pt-7 sm:pt-10 pb-6 sm:pb-8"
      >
        {/* Desktop: HD Crystal-Sharp Festive Frame Artwork with Exact Reference Gradient */}
        <img
          src="/images/diwali/diwali-royal-violet-frame.jpg"
          alt="The Diwali Deal Edit Banner"
          className="hidden sm:block absolute inset-0 w-full h-full object-fill pointer-events-none z-0 select-none"
        />

        {/* Mobile: Top Ornate Royal Festive Frame (Exact same royal festive framing as desktop anchored to top) */}
        <div className="sm:hidden absolute top-0 left-0 right-0 w-full h-[210px] xs:h-[240px] overflow-hidden pointer-events-none z-0 select-none">
          <img
            src="/images/diwali/diwali-royal-violet-frame.jpg"
            alt="The Diwali Deal Edit Mobile Festive Frame"
            className="w-full h-full object-cover object-top select-none"
          />
          {/* Seamless blend into the section background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#011b3e]/10 to-[#3d2460]" />
        </div>

        {/* Real-time Simultaneous Firecracker Particle Canvas Animation */}
        <DiwaliFirecrackerCanvas className="z-5 pointer-events-none" />

        {/* Header Row: Centered Title + View All Link on Right */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-1 sm:mt-3 mb-5 sm:mb-7">
          
          {/* Mobile Top Glowing Diya Motif */}
          <div className="sm:hidden flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#FBBF24]" />
            <DiyaIcon className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.85)]" />
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#FBBF24]" />
          </div>

          <span className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.2em] text-[#FDE047] drop-shadow-[0_2px_8px_rgba(253,224,71,0.35)]">
            DIWALI VEHICLE FEST
          </span>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-wide mt-1 sm:mt-1.5 mb-1 sm:mb-1.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Iss{" "}
            <span className="text-[#FDE047] drop-shadow-[0_0_12px_rgba(253,224,71,0.45)]">
              Diwali
            </span>
            , deal ho jaaye{" "}
            <span className="text-[#FDE047] drop-shadow-[0_0_14px_rgba(253,224,71,0.55)]">
              kamaal ki!
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-200/90 max-w-2xl mt-1 leading-relaxed px-2 sm:px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Explore festive offers on pre-owned cars and find the one that feels right for you.
          </p>
        </div>

        {/* 4 Vehicle Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={`diwali-skel-${i}`} className="w-full">
                <VehicleCardSkeleton />
              </div>
            ))
            : vehicles.slice(0, 4).map((car) => (
              <DiwaliVehicleCard
                key={car.id}
                data={car}
                source="diwali-home"
              />
            ))}
        </div>

        {/* Desktop Bottom CTA & Decorative Line Row (100% UNTOUCHED FOR BIG SCREEN) */}
        <div className="hidden sm:flex relative z-10 w-full items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 mb-1 px-4 sm:px-8 bg-transparent">
          {/* Left Decorative Gold Line + Dot + Flower Motif */}
          <div className="flex items-center flex-1 justify-end min-w-0 max-w-[280px] lg:max-w-[340px]">
            {/* Solid Line tapering from left */}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#FBBF24]/50 to-[#FBBF24]" />
            {/* Dotted Segment */}
            <div className="w-8 md:w-14 border-b border-dotted border-[#FBBF24] mx-1 opacity-90 shrink-0" />
            {/* Terminal Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mr-2" />
            {/* Golden 8-Petal Lotus Flower Motif */}
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 md:w-6 md:h-6 text-[#FBBF24] shrink-0 fill-[#FBBF24]/20 stroke-[#FBBF24]"
              strokeWidth="1.5"
            >
              <path d="M16 3 C17 8.5 21 11 26 12 C21 13 17 15.5 16 21 C15 15.5 11 13 6 12 C11 11 15 8.5 16 3 Z" />
              <path d="M22 6 C21 11 19 14 16 16 C19 18 21 21 22 26 C20 21 17 19 16 16 C15 13 18 10 22 6 Z" />
              <path d="M10 6 C11 11 13 14 16 16 C13 18 11 21 10 26 C12 21 15 19 16 16 C17 13 14 10 10 6 Z" />
              <circle cx="16" cy="16" r="2" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
            </svg>
          </div>

          {/* Theme Centered Button */}
          <Link
            href="/diwali-offers"
            className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] hover:brightness-105 shadow-[0_4px_22px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer shrink-0 z-20"
          >
            <span>Explore All Diwali Deals</span>
            <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* Right Decorative Gold Line + Dot + Flower Motif */}
          <div className="flex items-center flex-1 justify-start min-w-0 max-w-[280px] lg:max-w-[340px]">
            {/* Golden 8-Petal Lotus Flower Motif */}
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 md:w-6 md:h-6 text-[#FBBF24] shrink-0 fill-[#FBBF24]/20 stroke-[#FBBF24]"
              strokeWidth="1.5"
            >
              <path d="M16 3 C17 8.5 21 11 26 12 C21 13 17 15.5 16 21 C15 15.5 11 13 6 12 C11 11 15 8.5 16 3 Z" />
              <path d="M22 6 C21 11 19 14 16 16 C19 18 21 21 22 26 C20 21 17 19 16 16 C15 13 18 10 22 6 Z" />
              <path d="M10 6 C11 11 13 14 16 16 C13 18 11 21 10 26 C12 21 15 19 16 16 C17 13 14 10 10 6 Z" />
              <circle cx="16" cy="16" r="2" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
            </svg>
            {/* Terminal Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 ml-2" />
            {/* Dotted Segment */}
            <div className="w-8 md:w-14 border-b border-dotted border-[#FBBF24] mx-1 opacity-90 shrink-0" />
            {/* Solid Line tapering to right */}
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#FBBF24]/50 to-[#FBBF24]" />
          </div>
        </div>

        {/* Mobile Bottom CTA: Glowing Traditional Diyas Flanking the Button */}
        <div className="sm:hidden relative z-10 w-full flex items-center justify-center gap-2 mt-3 mb-1 px-1">
          {/* Left Glowing Diya & Tapered Line */}
          <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#FBBF24]/80" />
            <DiyaIcon className="w-7 h-7 shrink-0 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
          </div>

          {/* Theme Centered Button for Mobile */}
          <Link
            href="/diwali-offers"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] hover:brightness-105 shadow-[0_4px_18px_rgba(245,158,11,0.45)] active:scale-95 transition-all shrink-0 z-20"
          >
            <span>Explore All Diwali Deals</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
          </Link>

          {/* Right Glowing Diya & Tapered Line */}
          <div className="flex items-center gap-1.5 flex-1 justify-start min-w-0">
            <DiyaIcon className="w-7 h-7 shrink-0 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#FBBF24]/80" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default DiwaliShowcaseSection;
