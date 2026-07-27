import React from "react";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";

// 20 Modular Section Components
import LaunchHero from "@/components/features/introducingReecomm/HeroSection";
import JourneyPillars from "@/components/features/introducingReecomm/JourneyPillars";
import ProblemSection from "@/components/features/introducingReecomm/ProblemSection";
import ConnectedEcosystem from "@/components/features/introducingReecomm/ConnectedEcosystem";
import MarketplaceShowcase from "@/components/features/introducingReecomm/MarketplaceShowcase";
import StorefrontShowcase from "@/components/features/introducingReecomm/StorefrontShowcase";
import ListingExperience from "@/components/features/introducingReecomm/ListingExperience";
import InspectionShowcase from "@/components/features/introducingReecomm/InspectionShowcase";
import VerifiedConsultants from "@/components/features/introducingReecomm/VerifiedConsultants";
import InquiryWorkflow from "@/components/features/introducingReecomm/InquiryWorkflow";
import MobileExperience from "@/components/features/introducingReecomm/MobileExperience";
import TrustArchitecture from "@/components/features/introducingReecomm/TrustArchitecture";
import FeaturesGrid from "@/components/features/introducingReecomm/FeaturesGrid";
import ComparisonTable from "@/components/features/introducingReecomm/ComparisonTable";
import UserRolesExpandable from "@/components/features/introducingReecomm/UserRolesExpandable";
import LaunchFeatures from "@/components/features/introducingReecomm/LaunchFeatures";
import RoadmapSection from "@/components/features/introducingReecomm/RoadmapSection";
import FaqSection from "@/components/features/introducingReecomm/FaqSection";
import FinalCta from "@/components/features/introducingReecomm/FinalCta";

export default function IntroducingReecommPage() {
  return (
    <>
      <Head>
        <title>Introducing Reecomm — The Future of India&apos;s Used Vehicle Marketplace</title>
        <meta
          name="description"
          content="Introducing Reecomm: India&apos;s trusted used vehicle marketplace uniting buyers, sellers, verified consultants, and inspectors. Launching on Web, Android & iOS."
        />
        <meta
          name="keywords"
          content="Introducing Reecomm, used car marketplace India, verified vehicle consultants, vehicle inspection report, consultant storefront"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reecomm.com/introducing-reecomm" />
        <meta property="og:title" content="Introducing Reecomm — Buy smarter. Sell fairly. Grow digitally." />
        <meta
          property="og:description"
          content="Explore the 2026 Release of Reecomm — India&apos;s trusted vehicle ecosystem. Multi-point inspections, digital storefronts, verified consultants, and native mobile apps."
        />
        <meta property="og:image" content="https://reecomm.com/hero_main_image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="Introducing Reecomm — The Future of Used Vehicle Buying" />
        <meta
          name="twitter:description"
          content="Reecomm organizes India&apos;s used vehicle market. Verified consultants, inspection-backed listings, and professional storefronts."
        />
        <meta name="twitter:image" content="https://reecomm.com/hero_main_image.png" />
      </Head>

      <Navbar scrolled={true} />

      <main className="bg-transparent text-primary font-[Montserrat] overflow-x-hidden">
        {/* Section 1: Launch Hero */}
        <div id="hero">
          <LaunchHero />
        </div>

        {/* Section 2: Journey Pillars */}
        <JourneyPillars />

        {/* Section 3: The Problem */}
        <ProblemSection />

        {/* Section 4: Connected Ecosystem */}
        <ConnectedEcosystem />

        {/* Section 5: Marketplace Showcase */}
        <MarketplaceShowcase />

        {/* Section 6: Consultant Storefront */}
        <StorefrontShowcase />

        {/* Section 7: Vehicle Listing Experience */}
        <ListingExperience />

        {/* Section 8: Reecomm Inspection */}
        <InspectionShowcase />

        {/* Section 9: Verified Consultants */}
        <VerifiedConsultants />

        {/* Section 10: Inquiry Experience */}
        <InquiryWorkflow />

        {/* Section 11 & 12: Mobile & Available Everywhere */}
        <MobileExperience />

        {/* Section 13: Built Around Trust */}
        <TrustArchitecture />

        {/* Section 14: 24 Features Matrix */}
        <FeaturesGrid />

        {/* Section 15: Comparison Table */}
        <ComparisonTable />

        {/* Section 16: Expandable User Roles */}
        <UserRolesExpandable />

        {/* Section 17: Live Launch Features */}
        <LaunchFeatures />

        {/* Section 18: Roadmap */}
        <RoadmapSection />

        {/* Section 19: FAQ */}
        <FaqSection />

        {/* Section 20: Final CTA & SEO Hub */}
        <FinalCta />
      </main>

      <FooterLink />
      <Footer />
    </>
  );
}

IntroducingReecommPage.fullWidth = true;
