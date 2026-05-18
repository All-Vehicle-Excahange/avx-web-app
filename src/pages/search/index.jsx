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
        <title>{seo?.title || "Used Cars  | Reecomm"}</title>
        <meta
          name="description"
          content={
            seo?.description || "Browse verified used vehicles for sale."
          }
        />
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

  return (
    <>
      <SearchHeader pageResponse={pageResponse} activeFilters={activeFilters} />

      <Layout>
        <SearchWithCard
          onPageResponseChange={setPageResponse}
          onFilterChange={setActiveFilters}
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

  const brand = query.brand || "";
  const model = query.model || "";
  const bodyType = query.bodyType || "";
  const vehicleType = query.vehicleType || "";
  const location = query.location || "";

  const vtLower = vehicleType.toLowerCase();
  const isTwoWheeler = vtLower.includes("2") || vtLower.includes("two");

  const label = isTwoWheeler ? "Two-Wheelers" : "Cars";
  const locPart = location ? ` in ${location}` : "";

  const brandPart = brand ? `${brand} ` : "";
  const modelPart = model ? `${model} ` : "";
  const bodyPart = bodyType ? `${bodyType} ` : "";

  const dynamicTitle = `Used ${brandPart}${modelPart}${bodyPart}${label} | Reecomm`;

  const descLocPart = location ? ` across ${location}` : "";
  let dynamicDescription = "";
  if (isTwoWheeler) {
    dynamicDescription = `Browse verified used two-wheelers${descLocPart}. Inspected scooters, commuter bikes, and sports bikes — all with transparent pricing.`;
  } else {
    dynamicDescription = `Browse verified used cars${descLocPart}. Every Reecomm listing is certified, inspected, and fairly priced. Find your next car today.`;
  }

  return {
    props: {
      seo: {
        title: dynamicTitle,
        description: dynamicDescription,
      },
    },
  };
}
