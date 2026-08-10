import React from "react";
import Cta from "@/components/features/about/Cta";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/about/HeroSection";
import ProblemWeAreSolve from "@/components/features/about/ProblemWeAreSolve";
import WhyAvxDifferent from "@/components/features/about/WhyAvxDifferent";
import HowAvxWorks from "@/components/features/about/HowAvxWorks";
import ConsultantsAndBuyers from "@/components/features/about/ConsultantsAndBuyers";
import TrustSignals from "@/components/features/about/TrustSignal";
import VisionAndApproach from "@/components/features/about/OurVisionAndApproach";
import ComplianceAndTransparency from "@/components/features/about/ComplianceAndTransparency";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import BecameBanner from "@/components/features/home/BecameBanner";
import ConsultBanner from "@/components/features/home/ConsultBanner";
import Head from "next/head";
import OurTeam from "@/components/features/about/OurTeam";

function index() {
  return (
    <>
      <Head>
        <title>About Reecomm — India&apos;s Trusted Used Vehicle Marketplace</title>
        <meta
          name="description"
          content="Reecomm is building India&apos;s most trusted used vehicle marketplace — connecting verified consultants with confident buyers through transparency, inspections, and professional digital storefronts."
        />
        <meta
          name="keywords"
          content="used vehicle marketplace India, trusted used car platform India"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reecomm.com/aboutus" />
        <meta property="og:title" content="About Reecomm — We didn&apos;t build another listing site" />
        <meta
          property="og:description"
          content="India&apos;s used vehicle market is massive and unstructured. Reecomm is the trust infrastructure that organizes it — verified consultants, inspection-backed listings, and professional growth tools."
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta
          property="og:image:alt"
          content="Reecomm — India&apos;s trusted used vehicle marketplace connecting verified consultants and confident buyers"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="About Reecomm — India&apos;s Trusted Used Vehicle Platform" />
        <meta
          name="twitter:description"
          content="We&apos;re building the trust infrastructure India&apos;s used vehicle market has needed for years. Verified consultants. Confident buyers. One organized ecosystem."
        />
        <meta name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta name="twitter:image:alt" content="Reecomm — India&apos;s trusted used vehicle marketplace" />
      </Head>
      <Navbar scrolled={true} />

      <Layout>
        <HeroSection />
      </Layout>

      <Layout>
        <ProblemWeAreSolve />
      </Layout>
      <Layout>
        <WhyAvxDifferent />
      </Layout>
      <Layout>
        <HowAvxWorks />
      </Layout>
      <Layout>
        <ConsultantsAndBuyers />
      </Layout>
      <Layout>
        {/* <TrustSignals /> */}
        <OurTeam />
      </Layout>
      <Layout>
        <VisionAndApproach />
      </Layout>
      <Layout>
        <ComplianceAndTransparency />
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
