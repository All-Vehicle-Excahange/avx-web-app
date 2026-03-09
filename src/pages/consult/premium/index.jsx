import { useState } from "react";
import PremiumFilterWithCard from "@/components/features/consult/premium/PremiumFilterWithCard";
import SearchWithHeader from "@/components/features/consult/search/SearchWithHeader";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import React from "react";

function index() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [pageResponse, setPageResponse] = useState({ totalElements: 0, totalPages: 0, currentPage: 1 });

  return (
    <>
      <SearchWithHeader activeFilters={activeFilters} pageResponse={pageResponse} />

      <Layout>
        <PremiumFilterWithCard onFilterChange={setActiveFilters} onPageResponseChange={setPageResponse} />
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
