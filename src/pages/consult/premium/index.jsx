import { useState, Suspense } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import PremiumFilterWithCard from "@/components/features/consult/premium/PremiumFilterWithCard";
import SearchWithHeader from "@/components/features/consult/search/SearchWithHeader";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import SellVehicleBanner from "@/components/features/home/SellVehicleBanner";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import Layout from "@/components/layout/Layout";
import React from "react";
import ScrollDownArrow from "@/components/ui/ScrollDownArrow";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";

function Index() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [pageResponse, setPageResponse] = useState({ totalElements: 0, totalPages: 0, currentPage: 1 });

  return (
    <Suspense fallback={null}>
      <SearchContent
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        pageResponse={pageResponse}
        setPageResponse={setPageResponse}
      />
    </Suspense>
  );
}

function SearchContent({ activeFilters, setActiveFilters, pageResponse, setPageResponse }) {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const serviceParam = searchParams.get("service");

  const getDynamicTitle = () => {
    let serviceText = "";
    if (serviceParam) {
      serviceText = serviceParam
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ") + " ";
    }

    let title = `${serviceText}Premium Auto Consultants`;
    if (location) {
      title += ` in ${location}`;
    }
    return `${title} | Reecomm`;
  };

  const dynamicTitle = getDynamicTitle();

  return (
    <>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={`Experience elite expertise with ${serviceParam || "premium auto consultants"}${location ? ` in ${location}` : ""}. Reliable and top-rated car buying help with Reecomm.`} />
      </Head>
      <SearchWithHeader activeFilters={activeFilters} pageResponse={pageResponse} />

      <Layout>
        <PremiumFilterWithCard onFilterChange={setActiveFilters} onPageResponseChange={setPageResponse} />
      </Layout>

      <SellVehicleBanner fullWidth />
      <Layout>
        <AvxProcess />
      </Layout>
      <DownloadAppSection />

      <FooterLink />
      <Footer />

      <ScrollDownArrow />
    </>
  );
}

export default Index;


export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
