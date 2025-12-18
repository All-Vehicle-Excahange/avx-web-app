import PremiumFilterWithCard from "@/components/features/consult/premium/PremiumFilterWithCard";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import NavbarDark from "@/components/layout/NavbarDark";
import React from "react";

function index() {
  return (
    <>
      <NavbarDark />

      <Layout>
        <PremiumFilterWithCard />
      </Layout>

      <SellVehicleBanner fullWidth />

      <DownloadAppSection />

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
