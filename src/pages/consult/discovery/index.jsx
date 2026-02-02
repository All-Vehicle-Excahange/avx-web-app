import FilterWithCard from "@/components/features/consult/search/FilterWithCard";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
  return (
    <>
      <Navbar heroMode scrolled />

      <Layout>
        <FilterWithCard />
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
