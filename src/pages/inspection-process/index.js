import Cta from "@/components/features/about/Cta";
import { CarFront } from "lucide-react";
import DisputeHandling from "@/components/features/inspection-process/DisputeHandling";
import FAQSection from "@/components/features/inspection-process/FAQSection";
import HeroSection from "@/components/features/inspection-process/HeroSection";
import InspectionCovers from "@/components/features/inspection-process/InspectionCovers";
import InspectionInitiated from "@/components/features/inspection-process/InspectionInitiated";
import InspectionMatters from "@/components/features/inspection-process/InspectionMatters";
import InspectionNotCovered from "@/components/features/inspection-process/InspectionNotCovered";
import InspectionReportFormat from "@/components/features/inspection-process/InspectionReportFormat";
import InspectionWorkFlow from "@/components/features/inspection-process/InspectionWorkFlow";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>Reecomm Inspection Process — Standardized Used Vehicle Evaluations</title>
        <meta
          name="description"
          content="Explore Reecomm's transparent and structured inspection process. Certified inspectors run multi-point checks on engine, body panels, tyres, and OBD diagnostics."
        />
        <meta
          name="keywords"
          content="vehicle inspection process, used car inspection India, Reecomm inspection standards, multi-point vehicle evaluation"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reecomm.com/inspection-process" />
        <meta property="og:title" content="Reecomm Inspection Process — Standardized Used Vehicle Evaluations" />
        <meta
          property="og:description"
          content="Every Reecomm vehicle inspection runs through a strict, transparent multi-point evaluation by independent certified inspectors. Read the full review protocols and what is covered."
        />
        <meta property="og:image" content="https://reecomm.com/logo/logo.webp" />
        <meta
          property="og:image:alt"
          content="Reecomm — India's trusted used vehicle marketplace standardized inspection process"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="Reecomm Inspection Process — Standardized Used Vehicle Evaluations" />
        <meta
          name="twitter:description"
          content="No guesswork, no bias. Learn about our structured on-site inspection protocol that evaluates engine, powertrain, body panels, mechanics, and modifications."
        />
        <meta name="twitter:image" content="https://reecomm.com/logo/logo.webp" />
        <meta name="twitter:image:alt" content="Reecomm — India's trusted used vehicle marketplace" />
      </Head>
      <Navbar />
      <HeroSection />
      <Layout>
        <InspectionMatters />
        <InspectionCovers />
        <InspectionInitiated />
        <InspectionWorkFlow />
        <InspectionReportFormat />
        <InspectionNotCovered />
        <DisputeHandling />
        <FAQSection />
      </Layout>
      <Cta
        consultantLabel="Inspected Cars"
        consultantTitle={
          <>
            View Inspected <br /> Cars
          </>
        }
        consultantDescription="Explore our inventory of professionally checked and verified vehicles to buy with absolute confidence."
        consultantLink="/search"
        consultantButtonText="View Inspected Cars"
        consultantIcon={CarFront}
      />

      <FooterLink />
      <Footer />
    </>
  );
}

index.fullWidth = true;

export default index;
