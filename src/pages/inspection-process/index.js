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
import ReInspectionOptions from "@/components/features/inspection-process/ReInspectionOptions";
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
        <title>Reecomm Inspection Process | Reecomm</title>
        <meta
          name="description"
          content="Learn more about Reecomm's mission, our vision for a transparent vehicle marketplace, and how we empower consultants and buyers."
        />
      </Head>
      <Navbar />
      <HeroSection />
      <Layout>
        <InspectionMatters />
        <InspectionCovers />
        <InspectionInitiated />
        <InspectionWorkFlow />
        <InspectionReportFormat />
        <ReInspectionOptions />
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
        consultantLink="/vehicles"
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
