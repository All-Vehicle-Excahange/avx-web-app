import { useState, Suspense } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
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
import { buildSlugFromSearchQuery } from "@/lib/seo";

function Index({ seo }) {
  const [pageResponse, setPageResponse] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    currentElements: 0,
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [consultPayload, setConsultPayload] = useState(null);

  return (
    <>
      <Head>
        <title>{seo?.title || "Used Cars | Reecomm"}</title>
        <meta
          name="description"
          content={
            seo?.description || "Browse verified used vehicles for sale."
          }
        />
        {/* Canonical */}
        <link key="canonical" rel="canonical" href="https://www.reecomm.com/search" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reecomm" />
        <meta property="og:url" content="https://www.reecomm.com/search" />
        <meta property="og:title" content={seo?.title || "Used Cars | Reecomm"} />
        <meta
          property="og:description"
          content={seo?.description || "Browse verified used vehicles for sale on Reecomm."}
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content={seo?.title || "Used Cars | Reecomm"} />
        <meta
          name="twitter:description"
          content={seo?.description || "Browse verified used vehicles for sale on Reecomm."}
        />
        <meta name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />
      </Head>
      <Suspense fallback={null}>
        <SearchContent
          pageResponse={pageResponse}
          setPageResponse={setPageResponse}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          relatedVehicles={relatedVehicles}
          setRelatedVehicles={setRelatedVehicles}
          consultants={consultants}
          setConsultants={setConsultants}
          consultPayload={consultPayload}
          setConsultPayload={setConsultPayload}
        />
      </Suspense>
    </>
  );
}

Index.fullWidth = true;

export default Index;

function SearchContent({
  pageResponse,
  setPageResponse,
  activeFilters,
  setActiveFilters,
  relatedVehicles,
  setRelatedVehicles,
  consultants,
  setConsultants,
  consultPayload,
  setConsultPayload,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [removeFilterHandler, setRemoveFilterHandler] = useState(null);
  const [clearAllHandler, setClearAllHandler] = useState(null);

  return (
    <>
      <SearchHeader
        pageResponse={pageResponse}
        activeFilters={activeFilters}
        onRemoveFilter={removeFilterHandler}
        onClearAll={clearAllHandler}
      />

      <Layout>
        <SearchWithCard
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
          onRemoveFilterHandlerChange={setRemoveFilterHandler}
          onClearAllHandlerChange={setClearAllHandler}
          onRelatedChange={setRelatedVehicles}
          onConsultChange={setConsultants}
          onConsultPayloadChange={setConsultPayload}
          onLoadingChange={setIsLoading}
        />
      </Layout>

      <Layout>
        <ReletedToSearch data={relatedVehicles} loading={isLoading} />
      </Layout>
      <Layout>
        <AutoConsualt
          limit={4}
          data={consultants}
          filterPayload={consultPayload}
          loading={isLoading}
        />
      </Layout>

      <DownloadAppSection />

      <FooterLink />
      <Footer />

      <ScrollDownArrow />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  // ?cityName=Palanpur&brand=Ford → /search/buy-used-ford-cars-palanpur (301)
  const slugFromQuery = buildSlugFromSearchQuery(query);
  if (slugFromQuery) {
    return {
      redirect: {
        destination: `/search/${slugFromQuery}`,
        permanent: true,
      },
    };
  }

  const vehicleType = query.vehicleType || "";
  const vtLower = vehicleType.toLowerCase();
  const isTwoWheeler = vtLower.includes("2") || vtLower.includes("two");
  const targetSlug = isTwoWheeler ? "buy-used-two-wheelers" : "buy-used-cars";

  return {
    redirect: {
      destination: `/search/${targetSlug}`,
      permanent: true,
    },
  };
}
