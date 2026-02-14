import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
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
      <Layout>
        <AvxProcess />
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
