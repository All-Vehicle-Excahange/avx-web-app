import HomePage from "@/components/features/consult/details/HomePage";
import AccountabilityTrust from "@/components/features/consult/landing/AccountabilityTrust";
import ConsultantHeroSection from "@/components/features/consult/landing/ConsultantHero";
import ConsultCta from "@/components/features/consult/landing/ConsultCta";
import GrowthTools from "@/components/features/consult/landing/GrowthTools";
import OnboardingProcess from "@/components/features/consult/landing/OnBoardingProcess";
import PerformanceDashboard from "@/components/features/consult/landing/PerformanceDashboard";
import TierStructure from "@/components/features/consult/landing/TierStructure";
import WhatYouGetSpotlight from "@/components/features/consult/landing/WhatYouGet";
import WhoItsFor from "@/components/features/consult/landing/WhoItsFor";
import InspectionAdvantage from "@/components/features/why-choose-us/InspectionAdvantage";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Head from "next/head";
import React from "react";
import BecameBanner from "@/components/features/home/BecameBanner";
import ConsultBanner from "@/components/features/home/ConsultBanner";

function index() {
  return (
    <>
      <Head>
        <title>Become a Consultant — Scale Your Automotive Business on Reecomm</title>
        <meta
          name="description"
          content="Join Reecomm as a professional consultant. Scale your business, access advanced storefront tools, manage your inventory from a single dashboard, and reach verified buyers."
        />
        <meta
          name="keywords"
          content="become car consultant Reecomm, automotive consultant tools, professional vehicle storefront, digital dealership tools"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reecomm.com/become-consultant" />
        <meta property="og:title" content="Become a Reecomm Consultant — Scale Your Automotive Business" />
        <meta
          property="og:description"
          content="Reecomm is the platform built for professional automotive consultants. Scale your business, list and track your vehicles, build client trust, and work at any scale."
        />
        <meta property="og:image" content="https://reecomm.com/logo/logo.webp" />
        <meta
          property="og:image:alt"
          content="Reecomm — India's trusted used vehicle marketplace become a consultant guide"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="Become a Reecomm Consultant — Scale Your Automotive Business" />
        <meta
          name="twitter:description"
          content="Access advanced storefront tools, manage your inventory from a single dashboard, and reach verified buyers."
        />
        <meta name="twitter:image" content="https://reecomm.com/logo/logo.webp" />
        <meta name="twitter:image:alt" content="Reecomm — India's trusted used vehicle marketplace" />
      </Head>
      <Navbar />

      <ConsultantHeroSection />
      <Layout>
        <WhoItsFor />
        <WhatYouGetSpotlight />
      </Layout>
      <PerformanceDashboard />
      <Layout>
        <InspectionAdvantage />
        <GrowthTools />
        <TierStructure />
        <OnboardingProcess />
        <AccountabilityTrust />
      </Layout>

      <div className="hidden md:block">
        <BecameBanner />
      </div>
      <div className="block md:hidden">
        <ConsultBanner />
      </div>

      <FooterLink />
      <Footer />
    </>
  );
}
index.fullWidth = true;
export default index;
