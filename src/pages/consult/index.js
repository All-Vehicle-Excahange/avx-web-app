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

function index() {
  return (
    <>
      <Head>
        <title>Become a Consultant | Reecomm</title>
        <meta name="description" content="Join Reecomm as a consultant and earn through vehicle inspections while growing your business with our advanced tools." />
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
        <ConsultCta />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
