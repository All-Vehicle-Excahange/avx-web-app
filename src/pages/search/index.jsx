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
  const [consultPayload, setConsultPayload] = useState(null);

  return (
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
  );
}

function SearchContent({
  pageResponse, setPageResponse,
  activeFilters, setActiveFilters,
  relatedVehicles, setRelatedVehicles,
  consultants, setConsultants,
  consultPayload, setConsultPayload
}) {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const brand = searchParams.get("brand");
  const bodyType = searchParams.get("bodyType");
  const vehicleType = searchParams.get("vehicleType");
  const location = searchParams.get("location");
  const fuelType = searchParams.get("fuelType");

  const getDynamicTitle = () => {
    const count = pageResponse.totalElements || 0;
    const parts = [];

    // Constructing the primary vehicle description
    let vehicleDesc = "";
    if (brand) vehicleDesc += brand + " ";
    if (bodyType) vehicleDesc += bodyType + " ";
    if (fuelType) vehicleDesc += fuelType + " ";
    vehicleDesc += vehicleType || "Used Cars";

    // Format: "Used [Brand] [BodyType] Cars in [Location] for Sale | Reecomm"
    const titleParts = [];

    let mainTitle = `${vehicleDesc.trim()} Used`;
    if (location) {
      mainTitle += ` in ${location}`;
    }
    mainTitle += " for Sale";

    titleParts.push(mainTitle);

    return `${titleParts.join(" ")} | Reecomm`;
  };

  const dynamicTitle = getDynamicTitle();

  return (
    <>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={`Explore ${pageResponse.totalElements || ""} ${brand || ""} ${bodyType || ""} ${vehicleType || "used cars"} for sale${location ? ` in ${location}` : ""}. Certified and verified with Reecomm.`} />
      </Head>
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
        <AutoConsualt limit={4} data={consultants} filterPayload={consultPayload} loading={isLoading} />
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
