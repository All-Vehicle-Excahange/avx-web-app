import FilterWithCard from "@/components/features/consult/search/FilterWithCard";
import SearchWithHeader from "@/components/features/consult/search/SearchWithHeader";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
  return (
    <>
      <SearchWithHeader />

      <Layout>
        <FilterWithCard />
      </Layout>

      <SellVehicleBanner fullWidth />
      <Layout>
        <AvxProcess />
      </Layout>
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
