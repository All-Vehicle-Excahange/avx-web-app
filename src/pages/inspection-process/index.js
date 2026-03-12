import Cta from "@/components/features/about/Cta";
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
import Footer from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
  return (
    <>
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
        <Cta />
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
