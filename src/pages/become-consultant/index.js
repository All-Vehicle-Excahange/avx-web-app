import AccountabilityTrust from "@/components/features/consult/landing/AccountabilityTrust";
import ConsultantHeroSection from "@/components/features/consult/landing/ConsultantHero";
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
import React, { useEffect } from "react";
import BecameBanner from "@/components/features/home/BecameBanner";
import ConsultBanner from "@/components/features/home/ConsultBanner";
import MetaPixelTracker from "@/components/analytics/MetaPixelTracker";
import { trackBecomeConsultantPageViewed } from "@/lib/amplitude";

const CONSULT_PAGE_VIEW_PARAMS = {
  content_name: "Become a Consultant",
  content_category: "consultant",
};

function index() {
  useEffect(() => {
    trackBecomeConsultantPageViewed({
      content_name: "Become a Consultant",
    });
  }, []);
  return (
    <>
      <Head>
        <title>Become a Consultant on Reecomm</title>
        <meta
          name="description"
          content="Grow your dealership on Reecomm — digital storefront, inquiries, and verified listings."
        />
        <meta
          name="keywords"
          content="become car consultant Reecomm, automotive consultant tools, professional vehicle storefront, digital dealership tools"
        />
        <link rel="canonical" href="https://www.reecomm.com/become-consultant" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/become-consultant" />
        <meta property="og:title" content="Become a Consultant on Reecomm" />
        <meta
          property="og:description"
          content="Grow your dealership on Reecomm — digital storefront, inquiries, and verified listings."
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta
          property="og:image:alt"
          content="Reecomm — India's trusted used vehicle marketplace become a consultant guide"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="Become a Consultant on Reecomm" />
        <meta
          name="twitter:description"
          content="Grow your dealership on Reecomm — digital storefront, inquiries, and verified listings."
        />
        <meta name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta name="twitter:image:alt" content="Reecomm — India's trusted used vehicle marketplace" />
      </Head>
      <MetaPixelTracker
        eventName="ConsultPageView"
        params={CONSULT_PAGE_VIEW_PARAMS}
      />
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
