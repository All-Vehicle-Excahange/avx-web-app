import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SearchHeader from "@/components/features/search/SearchHeader";
import SearchWithCard from "@/components/features/search/SearchWithCard";
import ReletedCar from "@/components/features/search/ReletedCar";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import Footer from "@/components/layout/Footer";
import TopPicsSection from "@/components/features/home/TopPicsSection";
import ScrollDownArrow from "@/components/ui/ScrollDownArrow";
import FooterLink from "@/components/layout/FooterLink";
import ReletedToSearch from "@/components/features/search/ReletedToSearch";
import AutoConsualt from "@/components/features/search/AutoConsualt";

export default function Index() {
  const [pageResponse, setPageResponse] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    currentElements: 0,
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [consultants, setConsultants] = useState([]);

  return (
    <>
      <SearchHeader pageResponse={pageResponse} activeFilters={activeFilters} />

      <Layout>
        <SearchWithCard
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
          onRelatedChange={setRelatedVehicles}
          onConsultChange={setConsultants}
        />
      </Layout>

      <Layout>
        <ReletedToSearch data={relatedVehicles} />
      </Layout>
      <Layout>
        <AutoConsualt limit={4} data={consultants} />
      </Layout>

      <DownloadAppSection />

      <FooterLink />
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
