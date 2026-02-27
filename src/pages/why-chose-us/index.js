import Cta from "@/components/features/about/Cta";
import AVXComparison from "@/components/features/why-choose-us/AVXComparison";
import PerspectiveSwitcher from "@/components/features/why-choose-us/BuyersConsultantsSplit";
import ConsultantAccountability from "@/components/features/why-choose-us/ConsultantAccountability";
import CoreDifferentiatorsMatrix from "@/components/features/why-choose-us/CoreDifferentiators";
import AvxHero from "@/components/features/why-choose-us/Hero";
import InspectionAdvantage from "@/components/features/why-choose-us/InspectionAdvantage";
import RankingDiagram from "@/components/features/why-choose-us/PerformanceRanking";
import TrustVerification from "@/components/features/why-choose-us/TrustVerification";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
  return (
    <>
      <Navbar />
      <AvxHero />
      <CoreDifferentiatorsMatrix />
      <TrustVerification />
      <InspectionAdvantage />
      <RankingDiagram />
      <ConsultantAccountability />
      <AVXComparison />
      <PerspectiveSwitcher />
      <Cta />
      <Footer />
    </>
  );
}

export default index;
