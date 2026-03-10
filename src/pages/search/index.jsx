import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SearchHeader from "@/components/features/search/SearchHeader";
import SearchWithCard from "@/components/features/search/SearchWithCard";
import ReletedCar from "@/components/features/search/ReletedCar";
import AutoConsultPicsSection from "@/components/features/home/AutoConsultPicsSection";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import Footer from "@/components/layout/Footer";
import TopPicsSection from "@/components/features/home/TopPicsSection";
import ScrollDownArrow from "@/components/ui/ScrollDownArrow";

export default function Index() {
  const [pageResponse, setPageResponse] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    currentElements: 0,
  });
  const [activeFilters, setActiveFilters] = useState([]);

  return (
    <>
      <SearchHeader pageResponse={pageResponse} activeFilters={activeFilters} />

      <Layout>
        <SearchWithCard
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
        />
      </Layout>

      <Layout>
        <TopPicsSection />
      </Layout>
      <Layout>
        <AutoConsultPicsSection limit={4} />
      </Layout>

      <DownloadAppSection />

      <Footer />

      <ScrollDownArrow />
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
