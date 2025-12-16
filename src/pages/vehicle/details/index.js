import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import VehiclDetail from "@/components/features/VehiclDetail/VehiclDetail";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import React from "react";

function index() {
  return (
    <>
      <Layout>
        <VehiclDetail />
      </Layout>
      <DownloadAppSection fullWidth />
      <Footer fullWidth />
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}

export default index;
