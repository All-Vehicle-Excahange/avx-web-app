import CommunicationAccountability from "@/components/features/safetyAndtransparency/CommunicationAccountability";
import ConsultantPerformance from "@/components/features/safetyAndtransparency/ConsultantPerformance";
import DataPrivacy from "@/components/features/safetyAndtransparency/DataPrivacy";
import DisputeReporting from "@/components/features/safetyAndtransparency/DisputeReporting";
import FraudPrevention from "@/components/features/safetyAndtransparency/FraudPrevention";
import InspectionTransparency from "@/components/features/safetyAndtransparency/Inspection";
import MarketplaceModel from "@/components/features/safetyAndtransparency/MarketplaceModal";
import SafetyCta from "@/components/features/safetyAndtransparency/SafetyCta";
import SafetyHero from "@/components/features/safetyAndtransparency/SafetyHero";
import SellerVerification from "@/components/features/safetyAndtransparency/SellerVarification";
import UserResponsibility from "@/components/features/safetyAndtransparency/UserResponsibility";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
  return (
    <>
      <Navbar />

      <SafetyHero />

      <Layout>
        <MarketplaceModel />
        <SellerVerification />
        <InspectionTransparency />
        <ConsultantPerformance />
        <CommunicationAccountability />
        <FraudPrevention />
        <DisputeReporting />
        <UserResponsibility />
        <DataPrivacy />
        <SafetyCta />
      </Layout>
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
